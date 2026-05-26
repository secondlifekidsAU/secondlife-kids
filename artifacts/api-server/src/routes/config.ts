import { Router } from "express";
import { db } from "@workspace/db";
import { bookingsTable } from "@workspace/db";
import { sql, count } from "drizzle-orm";
import { PRICING_TIERS, PICKUP_DAYS, MAX_BOOKINGS_PER_DAY, IMPACT_BASELINE } from "../config/tiers";
import { addDays, format, getDay, isBefore, startOfDay, parseISO } from "date-fns";

const router = Router();

router.get("/tiers", (_req, res) => {
  res.json(PRICING_TIERS);
});

router.get("/available-dates", async (req, res) => {
  try {
    const fromStr = req.query["from"] as string | undefined;
    const toStr = req.query["to"] as string | undefined;

    const today = startOfDay(new Date());
    const from = fromStr ? parseISO(fromStr) : today;
    const to = toStr ? parseISO(toStr) : addDays(today, 60);

    const pickupDates: string[] = [];
    let current = from;
    while (isBefore(current, to)) {
      const dow = getDay(current);
      if (PICKUP_DAYS.includes(dow) && !isBefore(current, addDays(today, 1))) {
        pickupDates.push(format(current, "yyyy-MM-dd"));
      }
      current = addDays(current, 1);
    }

    const bookingCounts = await db
      .select({
        pickupDate: bookingsTable.pickupDate,
        cnt: count(),
      })
      .from(bookingsTable)
      .where(
        sql`${bookingsTable.status} IN ('PENDING_PAYMENT', 'PAID', 'COLLECTED') AND ${bookingsTable.pickupDate} = ANY(${sql`ARRAY[${sql.join(pickupDates.map((d) => sql`${d}`), sql`, `)}]::text[]`})`
      )
      .groupBy(bookingsTable.pickupDate);

    const countMap = new Map(bookingCounts.map((r) => [r.pickupDate, Number(r.cnt)]));

    const availableDates: string[] = [];
    const fullyBookedDates: string[] = [];

    for (const date of pickupDates) {
      const cnt = countMap.get(date) ?? 0;
      if (cnt >= MAX_BOOKINGS_PER_DAY) {
        fullyBookedDates.push(date);
      } else {
        availableDates.push(date);
      }
    }

    res.json({ availableDates, fullyBookedDates });
  } catch (err) {
    req.log.error({ err }, "Error fetching available dates");
    res.status(500).json({ error: "Failed to fetch available dates" });
  }
});

router.get("/impact", async (req, res) => {
  try {
    const result = await db
      .select({
        bags: sql<number>`COALESCE(SUM(${bookingsTable.estimatedBags}), 0)`,
        kg: sql<number>`COALESCE(SUM(${bookingsTable.estimatedKg}), 0)`,
      })
      .from(bookingsTable)
      .where(sql`${bookingsTable.status} IN ('PAID', 'COLLECTED')`);

    const bags = Number(result[0]?.bags ?? 0) + IMPACT_BASELINE.bags;
    const kg = Number(result[0]?.kg ?? 0) + IMPACT_BASELINE.kg;
    const items = Math.round(bags * 8);
    const co2e = Math.round(kg * 2.1 * 10) / 10;

    res.json({
      estimatedBagsCollected: bags,
      estimatedKgDiverted: kg,
      estimatedItemsSorted: items,
      estimatedCo2eAvoided: co2e,
      disclaimer:
        "Impact figures are estimates based on booked collection size and may change after sorting.",
    });
  } catch (err) {
    req.log.error({ err }, "Error fetching impact stats");
    res.status(500).json({ error: "Failed to fetch impact stats" });
  }
});

export default router;
