# NELSY — Project Context

> **Keep this file up to date.** Single source of truth for AI sessions, onboarding, and architectural decisions.

---

## 1. What is Nelsy?

SaaS **booking platform for nail artists**. Target user: independent nail techs who currently manage bookings through Instagram DMs.

**Core value props:**
- Custom booking page (`nelsy.app/yourname`) live in < 2 minutes
- Automated deposit collection via Stripe (eliminates no-shows)
- Professional dashboard: KPIs, revenue chart, booking management
- Frees ~3h/week spent on manual DM coordination

**MVP status:** functional demo with mock data, Stripe payment flow in bypass mode.

---

## 2. Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript (strict) |
| Build | Vite |
| Styling | Tailwind CSS **v3** (not v4) |
| Animation | Framer Motion |
| State | Zustand + `persist` middleware |
| Forms | React Hook Form + Zod |
| Routing | React Router v6 |
| Backend | Supabase (DB + Edge Functions) |
| Payments | Stripe (Elements + Connect) |
| Dev server | `npm run dev` → http://localhost:5173 |

---

## 3. Project Structure

```
nelsy/
├── src/
│   ├── pages/
│   │   ├── Landing.tsx          # / — "Glowy Luxe Beauty Tech", EN only
│   │   ├── Studio.tsx           # /studio/:slug or /:slug
│   │   ├── Dashboard.tsx        # /dashboard/* (nested routes)
│   │   ├── dashboard/
│   │   │   └── StripeSettings.tsx
│   │   ├── OnboardingStripe.tsx # /onboarding-stripe
│   │   └── StripeReturn.tsx     # /stripe/return
│   ├── components/
│   │   ├── ui/                  # Design system components
│   │   │   ├── Button.tsx       # primary/secondary/ghost/outline, sm/md/lg
│   │   │   ├── Badge.tsx        # primary/success/warning/info/gray
│   │   │   ├── Card.tsx         # optional hover effect
│   │   │   ├── KpiCard.tsx      # icon + gradient + trend badge
│   │   │   ├── Navigation.tsx   # sticky nav with mobile menu, uses i18n
│   │   │   ├── Footer.tsx       # 4-column dark footer
│   │   │   └── LanguageSwitcher.tsx
│   │   ├── dashboard/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── KPICard.tsx
│   │   │   ├── BookingCard.tsx
│   │   │   └── RevenueChart.tsx
│   │   ├── studio/
│   │   │   ├── BookingModal.tsx  # 5-step booking flow
│   │   │   └── PaymentForm.tsx   # Stripe Elements, accepts bookingId prop
│   │   └── shared/
│   │       └── Avatar.tsx
│   ├── store/
│   │   └── bookingStore.ts      # Zustand: openModal, selectedService, step
│   ├── hooks/
│   │   ├── useDashboard.ts      # KPIs + bookings from mockData
│   │   └── useStudio.ts         # Merchant data by slug
│   ├── lib/
│   │   ├── i18n.ts              # Zustand i18n store (FR/EN, 80+ keys)
│   │   ├── mockData.ts          # 3 merchants, 7 bookings, 30-day revenue
│   │   ├── supabase.ts          # Supabase client
│   │   └── utils.ts             # formatCurrency, cn, etc.
│   └── types/
│       └── index.ts             # Service, Merchant, Booking interfaces
├── supabase/
│   └── functions/
│       ├── create-payment-intent/index.ts
│       ├── create-connect-account/index.ts
│       └── stripe-webhooks/index.ts
├── index.html                   # Playfair Display + Inter loaded here
├── tailwind.config.js
├── vite.config.ts               # @/ alias → src/
└── .env.local                   # (git-ignored) — see section 8
```

---

## 4. Routes

| Path | Component | Notes |
|---|---|---|
| `/` | `Landing` | Marketing page, EN only, no i18n |
| `/studio/:slug` | `Studio` | Public booking page |
| `/:slug` | `Studio` | Short URL alias |
| `/dashboard` | `Dashboard` | KPI home |
| `/dashboard/calendar` | ComingSoon | |
| `/dashboard/services` | ComingSoon | |
| `/dashboard/stripe` | `StripeSettings` | Connect onboarding status |
| `/dashboard/cash-out` | ComingSoon | |
| `/dashboard/settings` | ComingSoon | |
| `/onboarding-stripe` | `OnboardingStripe` | Stripe Express account creation |
| `/stripe/return` | `StripeReturn` | Post-onboarding return URL |

**Demo studio slug:** `maya` → `/studio/maya`

---

## 5. Design System

### Landing — "Glowy Luxe Beauty Tech"

| Token | Hex | Tailwind |
|---|---|---|
| Pearl | `#FFFBFB` | `pearl` |
| Dusty Rose | `#F4C2C2` | `rose-300` |
| Ink | `#1A1A1A` | `ink` |
| Mist | `#F7F3F3` | `mist` |

**Typography:** `font-serif` = Playfair Display · `font-sans` = Inter

**GlowButton** — shimmer overlay + hover rose glow shadow:
```tsx
<button className="relative group overflow-hidden rounded-full bg-rose-300
  hover:bg-rose-400 hover:shadow-[0_0_28px_6px_rgba(244,194,194,0.65)]">
  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30
    to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
  {children}
</button>
```

**Custom Tailwind animations:** `animate-float`, `animate-glow-pulse`, `animate-shimmer`, `animate-marquee`

### Dashboard / Studio — "Modern Indigo"

- `primary-*` → Indigo `#6366F1`
- `secondary-*` → Pink `#EC4899`
- `espresso` → `#2D2424`

---

## 6. i18n System

```ts
import { useI18n } from '@/lib/i18n';
const { t, language, setLanguage } = useI18n();

t('dashboard.welcome')  // → "Bonjour" (fr) / "Hello" (en)
setLanguage('en')
```

- Zustand store with `persist` (localStorage key: `nelsy-language`)
- Default: `'fr'`
- **Landing page is EN-only** — i18n NOT used there
- Dashboard + Studio use i18n

---

## 7. State Management

**Booking flow** (`src/store/bookingStore.ts`):
```
Step 1 → Service selection
Step 2 → Date/time picker
Step 3 → Client info (name, email, phone)
Step 4 → Payment (Stripe Elements)
Step 5 → Confirmation
```

State: `openModal(service)`, `closeModal()`, `step`, `selectedService`, `clientInfo`, `paymentBookingId`

---

## 8. Backend — Supabase + Stripe

### .env.local
```
VITE_SUPABASE_URL=https://qbrqsvdustqeoplebzwi.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_51Qk...
```

### Edge Functions — ALL use `std@0.208.0`

| Function | Purpose | Returns |
|---|---|---|
| `create-payment-intent` | Creates booking + PaymentIntent | `{ client_secret, payment_intent_id, booking_id }` |
| `create-connect-account` | Creates Stripe Express account | `{ account_link_url }` |
| `stripe-webhooks` | `payment_intent.succeeded`, `account.updated` | 200 |

**Required CORS headers on all functions:**
```ts
'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
```

### Stripe — Dev Bypass Mode (current)

No Connect split — simple PaymentIntent directly to platform:
```ts
// create-payment-intent — NO application_fee_amount, NO transfer_data
const paymentIntent = await stripe.paymentIntents.create({
  amount: Math.round(totalAmount * 100),
  currency: 'eur',
  metadata: { booking_id, mode: 'bypass_connect_dev' },
  automatic_payment_methods: { enabled: true },
});
```

Booking status updated directly from frontend (bypasses webhook):
```ts
// PaymentForm.tsx — after stripe.confirmPayment succeeds
await supabase.from('bookings')
  .update({ status: 'paid', paid_at: new Date().toISOString() })
  .eq('id', bookingId);
```

### Stripe Connect (production — not yet active)

- Express accounts, `card_payments` + `transfers` capabilities
- Re-enable `application_fee_amount` + `transfer_data` on PaymentIntent
- Webhook `account.updated` → sets `stripe_onboarding_complete = true` on merchant profile

---

## 9. Critical TypeScript / Tailwind Patterns

```ts
// ✅ verbatimModuleSyntax — always use import type for type-only imports
import type { Variants } from 'framer-motion';
import type { Service } from '@/types';

// ✅ Framer Motion — use `as const` to avoid `ease: string` type error
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },  // ← NO ease: 'easeOut' (string not allowed)
} as const);

// ✅ Tailwind v3 — if re-initializing from scratch
node_modules/.bin/tailwindcss init -p
```

---

## 10. Common Commands

```bash
# Dev server
npm run dev

# Production build (TypeScript check + Vite bundle)
npm run build

# TypeScript check only
npx tsc --noEmit

# Deploy a single Edge Function
supabase functions deploy create-payment-intent

# Deploy all Edge Functions
supabase functions deploy create-payment-intent create-connect-account stripe-webhooks
```

---

## 11. Next Phase

1. **Supabase Auth** — email/password login, RLS policies scoped to `profile_id`
2. **Real data** — replace `mockData.ts` with Supabase queries
3. **Stripe Connect** — re-enable split payments + payout flows
4. **Email notifications** — Resend (booking confirmation, 24h reminders)
5. **Analytics** — PostHog (funnel tracking, feature flags)
6. **Mobile** — React Native or PWA
