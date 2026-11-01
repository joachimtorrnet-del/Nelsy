# NELSY — Project Context

> **Keep this file up to date.** Single source of truth for AI sessions, onboarding, and architectural decisions.
> Last verified: 2026-10-06

---

## 1. What is Nelsy?

SaaS **booking platform for nail artists**. Target user: independent nail techs who manage bookings through Instagram DMs.

**Core value props:**
- Custom booking page (`nelsy.app/yourname`) live in < 2 minutes
- Automated deposit collection via Stripe (eliminates no-shows)
- Professional dashboard: KPIs, revenue chart, booking management
- Frees ~3h/week spent on manual DM coordination

**Status:** Production-live with real Supabase auth, real Stripe LIVE mode subscriptions, real booking payments, and PostHog analytics instrumented.

---

## 2. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | React + TypeScript (strict) | **19.2.0** |
| Build | Vite | latest |
| Styling | Tailwind CSS **v3** (not v4) | v3 |
| Animation | Framer Motion | in use (studio components) |
| State | Zustand + `persist` | i18n store + booking store |
| Forms | React Hook Form + Zod | BookingModal only |
| Routing | React Router | **v7.13.1** |
| Backend | Supabase (Postgres + Edge Functions + Auth) | ^2.98.0 |
| Payments (subscription) | Stripe Elements — subscription-first (Architecture B) | pk_live / sk_live |
| Payments (bookings) | Stripe PaymentIntent (via `create-payment-intent` Edge Function) | live |
| Stripe Connect | UI wired; partially active (`application_fee_amount: 0` when no Connect) | conditional |
| Analytics | PostHog (eu.i.posthog.com) | ^1.369.3 |
| Email | Resend (via webhook Edge Function) | via `RESEND_API_KEY` |
| Dev server | `npm run dev` → http://localhost:5173 | |

> **TypeScript:** `verbatimModuleSyntax` is enabled → always `import type` for type-only imports.

---

## 3. Routes (App.tsx)

| Path | Component | Description |
|---|---|---|
| `/` | `LandingPremium` | Current production landing page |
| `/landing-old` | `Landing` | Old landing (kept for reference) |
| `/onboarding` | `Onboarding` | **Primary pro signup + Stripe subscription** |
| `/onboarding/success` | `OnboardingSuccess` | Post-onboarding success screen |
| `/onboarding-stripe` | `OnboardingStripe` | Stripe Connect onboarding flow |
| `/stripe/return` | `StripeReturn` | Post-Connect redirect |
| `/dashboard/*` | `Dashboard` | Authenticated pro dashboard |
| `/login` | `Login` | Email/password login |
| `/forgot-password` | `ForgotPassword` | Password reset email |
| `/reset-password` | `ResetPassword` | Password update form |
| `/booking-confirmed` | `BookingConfirmed` | Post-payment confirmation |
| `/terms` | `Terms` | |
| `/privacy` | `Privacy` | |
| `/studio/:slug` | `Studio` | Public studio page |
| `/:slug` | `Studio` | Slug shorthand (same component) |

Global: `<Elements stripe={getStripe()}>` wraps the entire app. `PageviewTracker` fires `$pageview` / `$pageleave` PostHog events on route change.

---

## 4. Authentication — Supabase Auth (LIVE)

- Email/password via `supabase.auth.signUp()` + `supabase.auth.signInWithPassword()`
- Sessions stored in Supabase; retrieved via `supabase.auth.getSession()`
- Auth status checked in `Dashboard.tsx`, `Onboarding.tsx` (Step4), all settings pages
- DB trigger creates `profiles` row on signup
- Password reset flow: `ForgotPassword` → `ResetPassword` (Supabase email link)
- **No mock auth** — all auth is real Supabase

---

## 5. Data — Real vs Mock

| Area | Data Source |
|---|---|
| Dashboard (Home, Calendar, Analytics, Settings) | **Real Supabase** — `profiles`, `services`, `bookings`, `availabilities`, `pro_balance` |
| Public Studio page | **Real Supabase** (falls back to `mockData.ts` only if Supabase is unconfigured) |
| Booking creation (public studio) | **Real Supabase** — created via `create-payment-intent` Edge Function |
| Time slots | `TIME_SLOTS` from `mockData.ts` (static constant, not real availability) |
| Mock merchants/bookings in `mockData.ts` | Kept as fallback/dev aid; not shown in production |

---

## 6. Onboarding Subscription Flow (Architecture B — Subscription-First)

**Entry point:** `/onboarding` → `src/pages/Onboarding.tsx`

### Steps

| # | Internal name | What happens |
|---|---|---|
| 1 | `account_info` | Username, full name, email, phone, password — client validation + async username/email uniqueness check |
| 2 | `social_links` | Instagram + TikTok (optional, skip-able) |
| 3 | `plan_selection` | Monthly ($29/mo) or Yearly ($25/mo) — initialised to `monthly` |
| 4a | `trial_confirmation` | CGU checkbox + "Start trial" CTA → triggers account creation + Stripe intent fetch |
| 4b | *(sub-step)* | Stripe Elements mount → user enters card → `stripe.confirmSetup()` |

### Step 4 async sequence

1. `supabase.auth.signUp()` → user created; DB trigger creates `profiles` row
2. `supabase.auth.signInWithPassword()` → session obtained
3. `POST /functions/v1/create-subscription-intent` → Stripe subscription created with `payment_behavior: 'default_incomplete'` + `trial_period_days: 14`; returns `pending_setup_intent.client_secret`
4. `<Elements clientSecret={seti_...}>` mount → `PaymentStep` renders card form
5. `stripe.confirmSetup()` → card attached, `pending_setup_intent` clears
6. Client writes `subscription_status: 'trialing'` immediately (race-condition guard)
7. Webhook (`customer.subscription.updated`) confirms + writes `trialing` + `trial_ends_at` (idempotent)

### Price IDs
Read from env vars at build time:
- `VITE_STRIPE_PRICE_MONTHLY` → live Stripe price ID
- `VITE_STRIPE_PRICE_YEARLY` → live Stripe price ID

---

## 7. Stripe Booking Payments

**Flow:** Public studio page → `BookingModal` (5 steps) → `PaymentForm` → `create-payment-intent` Edge Function

```
BookingModal steps:
  1. Service selection
  2. Date/time picker
  3. Client info (name, email, phone)
  4. Payment (Stripe PaymentIntent → stripe.confirmPayment())
  5. Confirmation
```

- `create-payment-intent` Edge Function: creates booking row + Stripe PaymentIntent
- If pro has `stripe_account_id` + `stripe_onboarding_complete`: uses Connect transfer (`application_fee_amount: 0, transfer_data`)
- If not: direct platform payment (`mode: 'direct_pre_connect'`)
- `payment_intent.succeeded` webhook: marks booking paid, credits `pro_balance`, sends emails via Resend
- `charge.refunded` webhook: cancels booking, debits `pro_balance`

---

## 8. Stripe Connect

- UI: `StripeSettings.tsx` → calls `create-connect-account` → links to Stripe Express onboarding
- `account.updated` webhook: sets `stripe_onboarding_complete = true` on profile
- Connect is **conditionally active**: payment intent uses Connect only when `stripe_onboarding_complete && stripe_account_id` are set

---

## 9. Edge Functions (Supabase)

All use `std@0.208.0`. All deployed via `supabase functions deploy <name>`.

| Function | Purpose |
|---|---|
| `create-subscription-intent` | Creates Stripe subscription + returns `pending_setup_intent.client_secret` |
| `stripe-webhooks` | Handles: `checkout.session.completed`, `customer.subscription.created/updated/deleted`, `invoice.payment_succeeded/failed`, `setup_intent.succeeded`, `account.updated`, `payment_intent.succeeded`, `charge.refunded` |
| `create-payment-intent` | Creates booking + Stripe PaymentIntent for studio booking flow |
| `create-connect-account` | Creates Stripe Express account + onboarding link |
| `create-billing-portal` | Stripe billing portal session |
| `create-stripe-dashboard-link` | Stripe Express dashboard link for payouts |
| `create-checkout` | Legacy checkout session (unused in current primary flow) |
| `create-subscription-checkout` | Legacy subscription checkout (unused in current primary flow) |
| `create-setup-intent` | Legacy setup intent (unused in current primary flow) |
| `cancel-subscription` | Cancels Stripe subscription |
| `verify-checkout` | Verifies checkout session status |
| `get-booking-from-session` | Retrieves booking by Stripe session ID |

**Webhook signing secret:** `STRIPE_WEBHOOK_SECRET` in Supabase secrets (live mode). Uses `stripe.webhooks.constructEventAsync()` (async — required in Deno).

---

## 10. Webhook → Email Flow

`stripe-webhooks` sends transactional emails via **Resend** (`RESEND_API_KEY`) on:
- `checkout.session.completed` (booking path): client confirmation + pro notification
- `payment_intent.succeeded`: client confirmation + pro notification

From address: `Nelsy <hello@getnelsy.com>`

---

## 11. PostHog Analytics

Initialised in `main.tsx`:
```ts
posthog.init(VITE_PUBLIC_POSTHOG_KEY, {
  api_host: VITE_PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com',
  person_profiles: 'identified_only',
})
```

All events go through `src/lib/analytics.ts` wrapper (`track()` / `identify()`). No-ops if `VITE_PUBLIC_POSTHOG_KEY` is unset.

`$pageview` / `$pageleave` fired on every route change via `PageviewTracker` in `App.tsx`.

**Onboarding funnel events (current):**
- `onboarding_started`
- `onboarding_step_viewed` `{step, step_number, plan}`
- `onboarding_step_completed` `{step, step_number, plan}`
- `onboarding_validation_error` `{step, field, error_type}`
- `onboarding_backend_error` `{step, operation, error_type, http_status?}`
- `stripe_setup_started` `{plan}`
- `stripe_setup_succeeded` `{plan}`
- `subscription_trial_started` `{plan}`
- `onboarding_completed` `{plan}`
- `dashboard_first_view` `{plan}` (Dashboard.tsx, sessionStorage flag)

**Public studio funnel events:**
- `public_nelsy_view`, `service_view`, `booking_started`, `slot_selected`, `booking_details_completed`, `payment_started`, `booking_completed`
- `nelsy_plg_cta_view`, `nelsy_plg_cta_click`

**Dashboard:** `posthog.identify(userId, { email, name, slug })` on load.

---

## 12. Dashboard Architecture

`/dashboard/*` → `src/pages/Dashboard.tsx` — top-level shell with bottom nav and header.

Sub-tabs (rendered by `activeTab` state, not nested Routes):

| Tab | Component | Data source |
|---|---|---|
| home | `pages/dashboard/Home.tsx` | Real Supabase (`profiles`, `services`, `bookings`, `availabilities`, `pro_balance`) |
| calendar | `pages/dashboard/Calendar.tsx` | Real Supabase (`services`, `bookings`) |
| preview | `pages/dashboard/Preview.tsx` | Renders public studio view |
| analytics | `pages/dashboard/Analytics.tsx` | Real Supabase |
| settings | `pages/dashboard/Settings.tsx` + `StripeSettings.tsx` | Real Supabase |

Auth guard in `Dashboard.tsx`: redirects `inactive` / `incomplete` → `/onboarding`; shows blocked screen for `canceled`/`cancelled`.

---

## 13. Public Studio Page

`/studio/:slug` or `/:slug` → `src/pages/Studio.tsx` → `useStudio(slug)` hook

- Fetches real `profiles` + `services` from Supabase
- Falls back to `mockData.ts` only if Supabase is unconfigured
- Features: hero, services list, booking modal (5-step), gallery, testimonials, hours, PLG CTA
- Booking payment via `create-payment-intent` Edge Function → Stripe PaymentIntent

---

## 14. Env Vars

### Frontend (Vercel — `VITE_*` vars baked in at build time)

| Var | Purpose |
|---|---|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key |
| `VITE_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` |
| `VITE_STRIPE_PRICE_MONTHLY` | Live Stripe price ID (monthly) |
| `VITE_STRIPE_PRICE_YEARLY` | Live Stripe price ID (yearly) |
| `VITE_PUBLIC_POSTHOG_KEY` | PostHog project key |
| `VITE_PUBLIC_POSTHOG_HOST` | PostHog host (default: eu.i.posthog.com) |

### Backend (Supabase secrets)

| Secret | Purpose |
|---|---|
| `STRIPE_SECRET_KEY` | `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Live webhook signing secret |
| `RESEND_API_KEY` | Transactional email |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | DB access from Edge Functions |

---

## 15. Common Commands

```bash
# Dev server
npm run dev

# TypeScript check
npx tsc --noEmit

# Production build
npm run build

# Deploy a single Edge Function
supabase functions deploy create-subscription-intent

# Deploy all Edge Functions
supabase functions deploy stripe-webhooks create-subscription-intent create-payment-intent \
  create-connect-account create-billing-portal create-stripe-dashboard-link cancel-subscription

# List Supabase secrets
supabase secrets list

# Set a secret
supabase secrets set KEY=value
```
