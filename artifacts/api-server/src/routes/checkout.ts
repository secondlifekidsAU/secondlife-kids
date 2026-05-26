import { Router, raw } from "express";
import { db, bookingsTable, auditLogTable, quoteRequestsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { sendCustomerConfirmation, sendAdminNotification, sendAdminQuoteNotification } from "../lib/email";
import { logger } from "../lib/logger";

const router = Router();

function getStripe() {
  const key = process.env["STRIPE_SECRET_KEY"];
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  const Stripe = require("stripe");
  return new Stripe(key, { apiVersion: "2024-06-20" });
}

function getTierLabel(tierId: string): string {
  const labels: Record<string, string> = {
    small: "Small Collection ($45)",
    medium: "Medium Collection ($75)",
    large: "Large Collection ($110)",
  };
  return labels[tierId] ?? tierId;
}

router.post("/create-session", async (req, res) => {
  try {
    const schema = z.object({ bookingId: z.string() });
    const { bookingId } = schema.parse(req.body);

    const [booking] = await db
      .select()
      .from(bookingsTable)
      .where(eq(bookingsTable.id, bookingId))
      .limit(1);

    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }

    if (booking.tierId === "xl") {
      res.status(400).json({ error: "XL tier requires a quote request" });
      return;
    }

    let stripe: ReturnType<typeof getStripe>;
    try {
      stripe = getStripe();
    } catch {
      res.status(503).json({ error: "Payment processing not configured" });
      return;
    }

    const appUrl = process.env["APP_URL"] ?? `https://${process.env["REPLIT_DEV_DOMAIN"]}`;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: undefined,
      payment_intent_data: {
        metadata: {
          bookingId: booking.id,
          tierId: booking.tierId,
          tierName: booking.tierName,
          customerName: booking.customerName,
          email: booking.email,
          phone: booking.phone,
          pickupDate: booking.pickupDate,
          suburb: booking.suburb,
          postcode: booking.postcode,
        },
      },
      automatic_payment_methods: { enabled: true },
      line_items: [
        {
          price_data: {
            currency: "aud",
            product_data: {
              name: `Second Life Kids — ${getTierLabel(booking.tierId)}`,
              description: `Kids item collection on ${booking.pickupDate} from ${booking.suburb}, ${booking.state}`,
            },
            unit_amount: booking.priceCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      customer_email: booking.email,
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/cancel?booking_id=${booking.id}`,
      metadata: {
        bookingId: booking.id,
      },
    });

    await db
      .update(bookingsTable)
      .set({
        status: "PENDING_PAYMENT",
        stripeSessionId: session.id,
        updatedAt: new Date(),
      })
      .where(eq(bookingsTable.id, bookingId));

    await db.insert(auditLogTable).values({
      bookingId: booking.id,
      action: "CHECKOUT_SESSION_CREATED",
      details: `Stripe session: ${session.id}`,
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Validation error", details: err.message });
      return;
    }
    req.log.error({ err }, "Error creating checkout session");
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

// Webhook must receive raw body
router.post(
  "/webhook",
  raw({ type: "application/json" }),
  async (req, res) => {
    const webhookSecret = process.env["STRIPE_WEBHOOK_SECRET"];
    const sig = req.headers["stripe-signature"];

    let event: Record<string, unknown>;
    try {
      const stripe = getStripe();
      if (webhookSecret && sig) {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
      } else {
        event = JSON.parse(req.body.toString());
        logger.warn("Stripe webhook secret not configured — skipping signature verification");
      }
    } catch (err) {
      req.log.error({ err }, "Webhook signature verification failed");
      res.status(400).json({ error: "Invalid webhook signature" });
      return;
    }

    if (event["type"] === "checkout.session.completed") {
      const session = event["data"] as Record<string, unknown>;
      const sessionObj = session["object"] as Record<string, unknown>;
      const bookingId = (sessionObj["metadata"] as Record<string, string>)?.["bookingId"];
      const paymentIntentId = sessionObj["payment_intent"] as string | undefined;
      const paymentStatus = sessionObj["payment_status"] as string | undefined;

      if (bookingId) {
        await db
          .update(bookingsTable)
          .set({
            status: "PAID",
            stripePaymentIntentId: paymentIntentId ?? null,
            stripePaymentStatus: paymentStatus ?? "paid",
            updatedAt: new Date(),
          })
          .where(eq(bookingsTable.id, bookingId));

        await db.insert(auditLogTable).values({
          bookingId,
          action: "PAYMENT_CONFIRMED",
          details: `Payment intent: ${paymentIntentId ?? "N/A"}, Status: ${paymentStatus}`,
        });

        const [booking] = await db
          .select()
          .from(bookingsTable)
          .where(eq(bookingsTable.id, bookingId))
          .limit(1);

        if (booking) {
          await sendCustomerConfirmation(booking);
          await sendAdminNotification(booking);
        }
      }
    }

    res.json({ received: true });
  },
);

router.post("/quote-request", async (req, res) => {
  try {
    const schema = z.object({
      customerName: z.string().min(1),
      email: z.string().email(),
      phone: z.string().min(1),
      suburb: z.string().min(1),
      postcode: z.string().min(1),
      description: z.string().min(1),
      preferredDate: z.string().optional(),
    });

    const body = schema.parse(req.body);

    const [quote] = await db
      .insert(quoteRequestsTable)
      .values({
        ...body,
        preferredDate: body.preferredDate ?? null,
      })
      .returning();

    if (!quote) {
      res.status(500).json({ error: "Failed to save quote request" });
      return;
    }

    await sendAdminQuoteNotification(quote);

    res.status(201).json({
      id: quote.id,
      createdAt: quote.createdAt,
      customerName: quote.customerName,
      email: quote.email,
      status: quote.status,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Validation error", details: err.message });
      return;
    }
    req.log.error({ err }, "Error saving quote request");
    res.status(500).json({ error: "Failed to save quote request" });
  }
});

export default router;
