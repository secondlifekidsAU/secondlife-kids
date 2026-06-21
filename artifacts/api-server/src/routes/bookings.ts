import { Router } from "express";
import { db, bookingsTable, cancellationRequestsTable, auditLogTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { z } from "zod";
import { CreateBookingBody } from "@workspace/api-zod";
import { differenceInHours, parseISO } from "date-fns";
import { sendAdminCancellationNotification } from "../lib/email";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const body = CreateBookingBody.parse(req.body);

    const [booking] = await db
      .insert(bookingsTable)
      .values({
        ...body,
        status: "DRAFT",
        pickupDate: body.pickupDate instanceof Date
          ? body.pickupDate.toISOString().split("T")[0]!
          : body.pickupDate,
      })
      .returning();

    if (!booking) {
      res.status(500).json({ error: "Failed to create booking" });
      return;
    }

    await db.insert(auditLogTable).values({
      bookingId: booking.id,
      action: "BOOKING_CREATED",
      details: `Tier: ${booking.tierName}, Date: ${booking.pickupDate}`,
    });

    res.status(201).json(booking);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Validation error", details: err.message });
      return;
    }
    req.log.error({ err }, "Error creating booking");
    res.status(500).json({ error: "Failed to create booking" });
  }
});

router.get("/by-session/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params as { sessionId: string };
    const [booking] = await db
      .select()
      .from(bookingsTable)
      .where(eq(bookingsTable.stripeSessionId, sessionId))
      .limit(1);

    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }

    res.json(booking);
  } catch (err) {
    req.log.error({ err }, "Error fetching booking by session");
    res.status(500).json({ error: "Failed to fetch booking" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params as { id: string };
    const [booking] = await db
      .select()
      .from(bookingsTable)
      .where(eq(bookingsTable.id, id))
      .limit(1);

    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }

    res.json(booking);
  } catch (err) {
    req.log.error({ err }, "Error fetching booking" );
    res.status(500).json({ error: "Failed to fetch booking" });
  }
});

router.post("/:id/cancel-request", async (req, res) => {
  try {
    const { id } = req.params as { id: string };
    const schema = z.object({
      email: z.string().email(),
      reason: z.string().optional(),
    });
    const body = schema.parse(req.body);

    const [booking] = await db
      .select()
      .from(bookingsTable)
      .where(eq(bookingsTable.id, id))
      .limit(1);

    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }

    if (booking.email.toLowerCase() !== body.email.toLowerCase()) {
      res.status(403).json({ error: "Email does not match booking" });
      return;
    }

    if (!["PAID", "PENDING_PAYMENT"].includes(booking.status)) {
      res.status(400).json({ error: "Booking cannot be cancelled in its current status" });
      return;
    }

    const pickupDateTime = parseISO(booking.pickupDate + "T08:30:00");
    const hoursUntilPickup = differenceInHours(pickupDateTime, new Date());
    const eligibleForFullRefund = hoursUntilPickup > 24;

    const [request] = await db
      .insert(cancellationRequestsTable)
      .values({
        bookingId: id,
        reason: body.reason ?? null,
        eligibleForFullRefund,
        status: "PENDING",
      })
      .returning();

    if (!request) {
      res.status(500).json({ error: "Failed to create cancellation request" });
      return;
    }

    await db
      .update(bookingsTable)
      .set({ status: "CANCEL_REQUESTED", updatedAt: new Date() })
      .where(eq(bookingsTable.id, id));

    await db.insert(auditLogTable).values({
      bookingId: id,
      action: "CANCEL_REQUESTED",
      details: `Eligible for full refund: ${eligibleForFullRefund}. Reason: ${body.reason ?? "None"}`,
    });

    // Notify admin — fire and forget, do not block the response
    sendAdminCancellationNotification(booking, body.reason, eligibleForFullRefund).catch(() => {});

    res.json(request);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Validation error", details: err.message });
      return;
    }
    req.log.error({ err }, "Error creating cancellation request");
    res.status(500).json({ error: "Failed to create cancellation request" });
  }
});

export default router;
