import {
  pgTable,
  text,
  integer,
  timestamp,
  boolean,
  pgEnum,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const bookingStatusEnum = pgEnum("booking_status", [
  "DRAFT",
  "PENDING_PAYMENT",
  "PAID",
  "CANCEL_REQUESTED",
  "CANCELLED",
  "COLLECTED",
  "REFUNDED",
]);

export const cancellationStatusEnum = pgEnum("cancellation_status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);

export const quoteStatusEnum = pgEnum("quote_status", [
  "PENDING",
  "CONTACTED",
  "CLOSED",
]);

export const bookingsTable = pgTable("bookings", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  status: bookingStatusEnum("status").default("DRAFT").notNull(),
  tierId: text("tier_id").notNull(),
  tierName: text("tier_name").notNull(),
  priceCents: integer("price_cents").notNull(),
  pickupDate: text("pickup_date").notNull(),
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  addressLine1: text("address_line1").notNull(),
  addressLine2: text("address_line2"),
  suburb: text("suburb").notNull(),
  state: text("state").default("VIC").notNull(),
  postcode: text("postcode").notNull(),
  safePlaceInstructions: text("safe_place_instructions"),
  itemNotes: text("item_notes"),
  termsAccepted: boolean("terms_accepted").default(false).notNull(),
  stripeSessionId: text("stripe_session_id"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  stripePaymentStatus: text("stripe_payment_status"),
  estimatedKg: integer("estimated_kg"),
  estimatedBags: integer("estimated_bags"),
  adminNotes: text("admin_notes"),
});

export const cancellationRequestsTable = pgTable("cancellation_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingId: uuid("booking_id")
    .notNull()
    .references(() => bookingsTable.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  reason: text("reason"),
  eligibleForFullRefund: boolean("eligible_for_full_refund")
    .default(false)
    .notNull(),
  status: cancellationStatusEnum("status").default("PENDING").notNull(),
});

export const auditLogTable = pgTable("audit_log", {
  id: uuid("id").primaryKey().defaultRandom(),
  bookingId: uuid("booking_id")
    .notNull()
    .references(() => bookingsTable.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  action: text("action").notNull(),
  details: text("details"),
});

export const quoteRequestsTable = pgTable("quote_requests", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  suburb: text("suburb").notNull(),
  postcode: text("postcode").notNull(),
  description: text("description").notNull(),
  preferredDate: text("preferred_date"),
  status: quoteStatusEnum("status").default("PENDING").notNull(),
});

export const insertBookingSchema = createInsertSchema(bookingsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  stripeSessionId: true,
  stripePaymentIntentId: true,
  stripePaymentStatus: true,
  adminNotes: true,
});

export const insertCancellationRequestSchema = createInsertSchema(
  cancellationRequestsTable,
).omit({ id: true, createdAt: true });

export const insertAuditLogSchema = createInsertSchema(auditLogTable).omit({
  id: true,
  createdAt: true,
});

export const insertQuoteRequestSchema = createInsertSchema(
  quoteRequestsTable,
).omit({ id: true, createdAt: true, status: true });

export type Booking = typeof bookingsTable.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type CancellationRequest =
  typeof cancellationRequestsTable.$inferSelect;
export type AuditLogEntry = typeof auditLogTable.$inferSelect;
export type QuoteRequest = typeof quoteRequestsTable.$inferSelect;
