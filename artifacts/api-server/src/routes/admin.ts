import { Router, Request, Response, NextFunction } from "express";
import { db, bookingsTable, cancellationRequestsTable, auditLogTable, quoteRequestsTable } from "@workspace/db";
import { eq, desc, sql, count } from "drizzle-orm";
import { z } from "zod";

const router = Router();

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.isAdmin) {
    res.status(401).json({ error: "Unauthorised" });
    return;
  }
  next();
}

router.post("/login", async (req, res) => {
  try {
    const schema = z.object({ password: z.string() });
    const { password } = schema.parse(req.body);

    const adminPassword = process.env["ADMIN_PASSWORD"];
    if (!adminPassword) {
      res.status(503).json({ error: "Admin not configured" });
      return;
    }

    if (password !== adminPassword) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    req.session.isAdmin = true;

    res.json({ success: true, message: "Logged in successfully" });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Validation error" });
      return;
    }
    req.log.error({ err }, "Admin login error");
    res.status(500).json({ error: "Login failed" });
  }
});

router.post("/logout", (req, res) => {
  req.session.isAdmin = false;
  res.json({ success: true });
});

router.get("/bookings", requireAdmin, async (req, res) => {
  try {
    const status = req.query["status"] as string | undefined;
    const from = req.query["from"] as string | undefined;
    const to = req.query["to"] as string | undefined;

    let query = db
      .select()
      .from(bookingsTable)
      .orderBy(desc(bookingsTable.createdAt))
      .$dynamic();

    const conditions = [];
    if (status) {
      conditions.push(sql`${bookingsTable.status} = ${status}`);
    }
    if (from) {
      conditions.push(sql`${bookingsTable.pickupDate} >= ${from}`);
    }
    if (to) {
      conditions.push(sql`${bookingsTable.pickupDate} <= ${to}`);
    }
    if (conditions.length > 0) {
      query = query.where(sql.join(conditions, sql` AND `));
    }

    const bookings = await query;
    res.json(bookings);
  } catch (err) {
    req.log.error({ err }, "Error fetching admin bookings");
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

router.get("/bookings/export", requireAdmin, async (req, res) => {
  try {
    const bookings = await db
      .select()
      .from(bookingsTable)
      .orderBy(desc(bookingsTable.createdAt));

    const headers = [
      "ID", "Created At", "Status", "Tier", "Price (AUD)", "Pickup Date",
      "Customer Name", "Email", "Phone", "Address", "Suburb", "State", "Postcode",
      "Safe Place", "Item Notes", "Stripe Session ID", "Payment Intent ID", "Payment Status",
      "Est. Bags", "Est. Kg",
    ];

    const rows = bookings.map((b) => [
      b.id,
      b.createdAt.toISOString(),
      b.status,
      b.tierName,
      (b.priceCents / 100).toFixed(2),
      b.pickupDate,
      b.customerName,
      b.email,
      b.phone,
      `${b.addressLine1}${b.addressLine2 ? " " + b.addressLine2 : ""}`,
      b.suburb,
      b.state,
      b.postcode,
      b.safePlaceInstructions ?? "",
      b.itemNotes ?? "",
      b.stripeSessionId ?? "",
      b.stripePaymentIntentId ?? "",
      b.stripePaymentStatus ?? "",
      b.estimatedBags ?? "",
      b.estimatedKg ?? "",
    ]);

    const csv = [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=bookings.csv");
    res.send(csv);
  } catch (err) {
    req.log.error({ err }, "Error exporting bookings");
    res.status(500).json({ error: "Failed to export bookings" });
  }
});

router.get("/bookings/:id", requireAdmin, async (req, res) => {
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

    const cancellationRequests = await db
      .select()
      .from(cancellationRequestsTable)
      .where(eq(cancellationRequestsTable.bookingId, id))
      .orderBy(desc(cancellationRequestsTable.createdAt));

    const auditLog = await db
      .select()
      .from(auditLogTable)
      .where(eq(auditLogTable.bookingId, id))
      .orderBy(desc(auditLogTable.createdAt));

    res.json({ ...booking, cancellationRequests, auditLog });
  } catch (err) {
    req.log.error({ err }, "Error fetching admin booking detail");
    res.status(500).json({ error: "Failed to fetch booking" });
  }
});

router.patch("/bookings/:id/status", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params as { id: string };
    const schema = z.object({
      status: z.enum(["DRAFT", "PENDING_PAYMENT", "PAID", "CANCEL_REQUESTED", "CANCELLED", "COLLECTED", "REFUNDED"]),
      adminNotes: z.string().optional(),
    });
    const body = schema.parse(req.body);

    const [updated] = await db
      .update(bookingsTable)
      .set({
        status: body.status,
        adminNotes: body.adminNotes ?? undefined,
        updatedAt: new Date(),
      })
      .where(eq(bookingsTable.id, id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }

    await db.insert(auditLogTable).values({
      bookingId: id,
      action: "STATUS_UPDATED",
      details: `Status changed to ${body.status}${body.adminNotes ? ". Note: " + body.adminNotes : ""}`,
    });

    res.json(updated);
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Validation error" });
      return;
    }
    req.log.error({ err }, "Error updating booking status");
    res.status(500).json({ error: "Failed to update status" });
  }
});

router.get("/stats", requireAdmin, async (req, res) => {
  try {
    const allBookings = await db.select().from(bookingsTable);

    const statusCounts: Record<string, number> = {};
    let paidBookings = 0;
    let collectedBookings = 0;
    let totalRevenueCents = 0;
    let cancelRequests = 0;
    let estimatedBagsDiverted = 0;
    let estimatedKgDiverted = 0;

    for (const b of allBookings) {
      statusCounts[b.status] = (statusCounts[b.status] ?? 0) + 1;
      if (b.status === "PAID" || b.status === "COLLECTED") {
        totalRevenueCents += b.priceCents;
        estimatedBagsDiverted += b.estimatedBags ?? 0;
        estimatedKgDiverted += b.estimatedKg ?? 0;
      }
      if (b.status === "PAID") paidBookings++;
      if (b.status === "COLLECTED") collectedBookings++;
      if (b.status === "CANCEL_REQUESTED") cancelRequests++;
    }

    res.json({
      totalBookings: allBookings.length,
      paidBookings,
      collectedBookings,
      totalRevenueCents,
      cancelRequests,
      bookingsByStatus: statusCounts,
      estimatedBagsDiverted,
      estimatedKgDiverted,
    });
  } catch (err) {
    req.log.error({ err }, "Error fetching admin stats");
    res.status(500).json({ error: "Failed to fetch stats" });
  }
});

router.get("/quotes", requireAdmin, async (req, res) => {
  try {
    const quotes = await db
      .select()
      .from(quoteRequestsTable)
      .orderBy(desc(quoteRequestsTable.createdAt));
    res.json(quotes);
  } catch (err) {
    req.log.error({ err }, "Error fetching quotes");
    res.status(500).json({ error: "Failed to fetch quotes" });
  }
});

router.patch("/quotes/:id/status", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params as { id: string };
    const schema = z.object({ status: z.enum(["PENDING", "CONTACTED", "CLOSED"]) });
    const { status } = schema.parse(req.body);
    const [updated] = await db
      .update(quoteRequestsTable)
      .set({ status })
      .where(eq(quoteRequestsTable.id, id))
      .returning();
    if (!updated) { res.status(404).json({ error: "Quote not found" }); return; }
    res.json(updated);
  } catch (err) {
    if (err instanceof z.ZodError) { res.status(400).json({ error: "Validation error" }); return; }
    req.log.error({ err }, "Error updating quote status");
    res.status(500).json({ error: "Failed to update quote" });
  }
});

export default router;
