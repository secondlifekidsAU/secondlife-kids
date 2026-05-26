# Second Life Kids

A conversion-focused booking website for a paid kids' item collection service on the Mornington Peninsula, Victoria, Australia. Families book a pickup, pack outgrown children's items, and Second Life Kids collects and gives them a second life.

## Run & Operate

- `pnpm --filter @workspace/second-life-kids run dev` — run frontend (PORT assigned by workflow)
- `pnpm --filter @workspace/api-server run dev` — run API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL`, `SESSION_SECRET`
- Optional env: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `APP_URL`, `ADMIN_PASSWORD`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `NOTIFICATION_EMAIL`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, Framer Motion, wouter, react-hook-form
- API: Express 5 + express-session + Stripe
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod, drizzle-zod
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `lib/api-spec/openapi.yaml` — OpenAPI spec (source of truth for API contracts)
- `lib/db/src/schema/bookings.ts` — DB schema (bookings, cancellations, audit log, quotes)
- `artifacts/second-life-kids/src/pages/` — all frontend pages (home, book, success, cancel, admin)
- `artifacts/api-server/src/routes/` — API routes (bookings, checkout, admin, config)
- `artifacts/api-server/src/config/tiers.ts` — pricing tiers, pickup days, allowed suburbs (easy to edit)
- `artifacts/api-server/src/lib/email.ts` — email sending (console fallback if SMTP not set)

## Architecture decisions

- Frontend is a standalone React+Vite SPA at `/`; API server is at `/api` — both routed via shared proxy
- Admin auth uses express-session (password from `ADMIN_PASSWORD` env var); session stored server-side
- Stripe Checkout used for payments — no card details stored; webhook confirms payment and updates booking to PAID
- XL tier ("Request a quote") skips Stripe and goes through a separate quote request flow
- Emails gracefully degrade to console.log if SMTP env vars are not set

## Product

- Landing page with hero, story, how it works, pricing tiers, what we accept, impact stats, pickup schedule, FAQ, and final CTA
- 5-step booking flow: tier selection → date picker (Mon/Wed only) → contact details → rules confirmation → Stripe Checkout
- Payment success/cancel/cancellation request pages
- Password-protected admin dashboard with booking management, status updates, CSV export, and stats

## User preferences

- Service area: Mornington, Mount Martha, Mount Eliza, Dromana, Rosebud, Somerville + nearby Mornington Peninsula suburbs
- Australian English throughout all copy
- Not a charity, not rubbish removal — paid convenience + sustainability service

## Gotchas

- After editing `openapi.yaml`, always run codegen before using updated types
- `zod/v4` sub-path cannot be used in api-server routes (esbuild limitation) — use `import { z } from "zod"` instead
- The codegen script patches `lib/api-zod/src/index.ts` after orval runs to remove duplicate exports
- Stripe webhook needs raw body — handled before JSON parsing middleware in app.ts

## Pointers

- See `artifacts/api-server/src/config/tiers.ts` to edit pricing, pickup days, and allowed suburbs
- See `pnpm-workspace` skill for workspace structure and conventions
