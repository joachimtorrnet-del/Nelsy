# 14-day free trial without a card, and the one-field-per-screen signup

PostHog showed about 80% of signups stopping at the card step (`trial_confirmation`). The web signup
now starts the 14-day trial with no card, and asks for one or two fields per screen, like the app.

## What changed

### Signup (`src/pages/Onboarding.tsx`)

Five screens, same order and feel as the app's native signup (`src/mobile/screens/Onboarding.tsx`):

| # | PostHog `step` | Screen | Notes |
|---|----------------|--------|-------|
| 1 | `claim_link` | Claim your link, `getnelsy.com/<slug>` | Live availability check on `public_profiles`, reserved slugs. Next is disabled until the link is free. |
| 2 | `name` | What's your name? | |
| 3 | `credentials` | Email + password, live rules, Show/Hide | **Creates the account** (button "Create my account"). Terms line under the form. |
| 4 | `phone` | Phone, optional, with Skip | Dial code picker as before. Saved to the auth user metadata (`phone`), same place as before. |
| 5 | `start_trial` | Start your free trial | "No card needed. 14 days free, then $29/month. We'll remind you 3 days before." Monthly / yearly switch, terms checkbox (with the nudge). |

Why the account is created on screen 3: the slug is already validated (screen 1) so there is never an
account without a slug, an email that is already registered is reported right there, and a pro who stops
on the phone or trial screen still has an account (draft page) that the dashboard banner and emails can
bring back. Everything after screen 3 is optional or one tap.

Kept: `onboarding_started`, `onboarding_step_viewed` / `onboarding_step_completed` /
`onboarding_validation_error` (new step names above; the phone step sends `skipped: true|false`),
`account_created`, `onboarding_backend_error`, `subscription_trial_started` (now with
`trial_type: 'no_card'`), `onboarding_completed`, `?plan=` (preselects the interval), `saveProfileTimezone`
at account creation, the signUp metadata (`full_name`, `slug`, `phone`, `instagram`, `tiktok`; phone is
empty at signUp and written by `auth.updateUser` on screen 4), the terms nudge. New:
`reactivation_checkout_opened`.

A signed-in pro who opens `/onboarding` (app `?resume=1`, dashboard "Start free trial", reactivation link)
lands directly on screen 5. Without a session, `?resume=1` still goes to `/login?next=...`. If her account
already used its trial, screen 5 reads "Reactivate your page" and the button goes to Stripe Checkout.

Funnel note: old events used `account_info` / `social_links` / `plan_selection` / `trial_confirmation`.
Build the new funnel on `claim_link` → `name` → `credentials` → `phone` → `start_trial`, or on
`onboarding_started` → `account_created` → `subscription_trial_started`.

### Backend

| Function | JWT | What |
|----------|-----|------|
| `start-trial` (new) | verify on | Creates the customer (or reuses the profile's, or finds it by `metadata.supabase_user_id`) and a subscription with `trial_period_days: 14`, `trial_settings.end_behavior.missing_payment_method: 'cancel'`, `payment_settings.save_default_payment_method: 'on_subscription'`, metadata `no_card_trial: '1'`. Writes `subscription_status: 'trialing'` and `trial_ends_at` on the profile right away, so the page is live with no webhook wait. `{ check: true }` only reports eligibility. |
| `trial-card` (new) | verify on | `{ action: 'status' }` → `{ status, trialEnd, hasCard }`. `{ action: 'checkout' }` → Stripe Checkout in **setup mode** to save a card. |
| `stripe-webhooks` | **off** | See below. |
| `create-subscription-checkout` | verify on | No trial when the account already used one. |
| `create-subscription-intent` | verify on | Unchanged: old card-first clients keep working. |

Shared, unit-tested logic: `supabase/functions/_shared/trial.ts` (`src/lib/__tests__/trial.test.ts`).

`stripe-webhooks` changes:
- `customer.subscription.created/updated`: status mapping moved to `profileStatusFor`. A no-card trial is
  `trialing` (live) even if Stripe attaches a `pending_setup_intent`; card-first trials still stay
  `inactive` until the card is saved. Events about a subscription that the profile already replaced
  (and that is not live) are ignored.
- `customer.subscription.deleted`: same guard; when a no-card trial ends without a card, sends
  "Your Nelsy page is paused" with a "Reactivate my page" button.
- `customer.subscription.trial_will_end` (3 days before): no card yet → "Add a card to keep your Nelsy
  page live after <date>" with a button to `https://getnelsy.com/dashboard?add_card=1` (opens Checkout
  directly). With a card, the email is unchanged.
- `checkout.session.completed`, `mode: 'setup'`, `metadata.purpose: 'trial_card'`: sets the saved card as
  the subscription's and the customer's default payment method. Subscription checkouts now read the real
  subscription (a reactivation has no trial, so the profile gets `active`, not a fake 14-day `trialing`).

### Dashboard and public page

- Banner during a no-card trial: "X days left in your free trial. Add a card to keep your page live
  after <date>" + **Add card**. `?card_added=1` (Checkout return) shows "Card saved".
- Settings > Account Settings: **Add a card** first in the list (section opens by itself during a no-card
  trial). "Subscribe to Nelsy" now goes to the trial screen.
- Draft banner (`inactive`): "Your page is not live yet. Start your 14-day free trial, no card needed."
- Ended plan (`cancelled`): "Your page is paused" screen, "Reactivate my page" → `/onboarding?step=plan`
  → Checkout with immediate payment.
- Public page (`useStudio`): `cancelled` / `canceled` / `incomplete` now hide the page like `inactive`
  (same rule as the products and kit RPCs). Before, a canceled plan kept its page public, which a no-card
  trial would have turned into a free plan forever. `trialing` is live.
- Copy that said a card is saved at signup was updated (Pricing FAQ, landing FAQ, nail techs page,
  app trial screen).

## Design decisions

**Cancel, not pause, at trial end.** `missing_payment_method: 'cancel'` fits the existing handling:
`customer.subscription.deleted` already sets `cancelled`, the dashboard already has an ended-plan screen,
and reactivation is a fresh Checkout subscription. `pause` would leave a `paused` subscription that the
current code maps to `inactive` (draft, looks like "never started"), never fires `deleted`, and needs a
resume flow (`subscriptions.resume` plus a card) that does not exist yet.

**Card collection: Stripe Checkout in setup mode.** Hosted, no Elements on our side, shows Apple Pay and
Google Pay, nothing is charged. The webhook then sets the card as default on the subscription itself, so
the trial end charges it whatever the portal configuration is. The Billing Portal would also work but
depends on its configuration (payment method update enabled) and only sets the customer default; it stays
the "Manage subscription" entry.

**One trial per account.** `trialAlreadyUsed` (Stripe is the source of truth, all subscriptions of the
customer): any earlier no-card trial (`metadata.no_card_trial`), any subscription that had a card, or any
`active` / `past_due` / `unpaid` / `paused` one. Then `start-trial` returns a Checkout URL with no trial,
and `create-subscription-checkout` drops the trial too. Old card-first subscriptions abandoned at the card
step (trialing, `pending_setup_intent`, no card) do not count: those pros never had a live page, so they get
the no-card trial now and `start-trial` cancels the abandoned subscription after saving the new one.
Limit: a new account with a new email gets a new trial (no cross-account check).

**Idempotency.** Live subscription → returned as is (and the profile repaired if it missed the write).
Customer creation and subscription creation use Stripe idempotency keys, so a double click or a retry
creates one subscription.

## Deploy

Backend first, then the frontend.

```bash
# new, JWT verification ON (default)
npx supabase functions deploy start-trial  --project-ref qbrqsvdustqeoplebzwi
npx supabase functions deploy trial-card   --project-ref qbrqsvdustqeoplebzwi
# changed
npx supabase functions deploy create-subscription-checkout --project-ref qbrqsvdustqeoplebzwi
# Stripe calls this one without a Supabase JWT: keep verification OFF
npx supabase functions deploy stripe-webhooks --no-verify-jwt --project-ref qbrqsvdustqeoplebzwi
```

After deploying `stripe-webhooks`, check Dashboard > Edge Functions > stripe-webhooks: "Enforce JWT
verification" must be off, as before.

Secrets used (already set for `create-subscription-intent`): `STRIPE_SECRET_KEY`, `STRIPE_PRICE_MONTHLY`,
`STRIPE_PRICE_YEARLY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`; optional `APP_URL` (fallback for
Checkout return URLs when the request has no Origin). No migration.

## Stripe settings to check

1. Developers > Webhooks > the `stripe-webhooks` endpoint listens to:
   `checkout.session.completed`, `customer.subscription.created`, `customer.subscription.updated`,
   `customer.subscription.deleted`, `customer.subscription.trial_will_end`, `invoice.payment_succeeded`,
   `invoice.payment_failed` (plus the existing booking, payout and Connect events).
2. Settings > Billing > Subscriptions and emails: Stripe's own "free trial reminder" email is optional; if
   it is on, pros get two reminders (Stripe's 7 days before, ours 3 days before). Turning it off is
   recommended.
3. Settings > Billing > Customer portal: "Update payment methods" on (used by "Manage subscription").
4. Search API (customers.search) must be available on the account (standard; used only as a fallback).

## Manual test plan (test mode first, then one real signup)

1. **Signup, no card.** Open `/onboarding?plan=independent_monthly` at phone width with a new test email.
   Check: taken and reserved links are refused; the account is created on screen 3; Skip on phone; screen 5
   says "No card needed..."; tick terms; Start my free trial → dashboard with the pink banner "14 days left".
   In Stripe: one customer, one subscription `trialing`, metadata `no_card_trial=1`, no payment method.
   In the profile: `subscription_status = trialing`, `trial_ends_at` in 14 days. The public page
   `getnelsy.com/<slug>` is visible.
2. **Idempotency.** Open `/onboarding` again while signed in → goes to the dashboard; no second subscription.
3. **Add a card.** Click Add card (banner or Settings) → Checkout (setup) with `4242 4242 4242 4242` →
   back on `/dashboard?card_added=1` ("Card saved"). In Stripe the subscription has a default payment
   method; reload: the banner is gone.
4. **Reminder email.** Trigger `customer.subscription.trial_will_end` (step 5 below with a clock, or
   `stripe trigger customer.subscription.trial_will_end` for the template only): without a card the email
   says "Add a card..." and its button opens Checkout from `/dashboard?add_card=1`.
5. **Trial ends without a card.** With Stripe test clocks: create a test clock and a customer on it in the
   Dashboard with metadata `supabase_user_id = <the test user's id>` and the same email, *before* step 5 of
   signup (wait about a minute: `start-trial` finds it through customer search when the profile has no
   customer yet). Start the trial, then advance the clock 11 days (trial_will_end email) and then past 14
   days. Expect `customer.subscription.deleted`, profile `cancelled`, "Your Nelsy page is paused" email,
   public page hidden, dashboard "Your page is paused". Without test clocks:
   `stripe subscriptions update <sub_id> --trial-end=now` ends the trial at once with the same result.
6. **Reactivation, no second trial.** From the paused screen, Reactivate my page → screen 5 reads
   "Reactivate your page" → Continue to payment → Checkout charges $29 today (no trial). After payment:
   profile `active`, page visible again.
7. **Old abandoned account.** An account stuck at the old card step (`inactive`, trialing subscription with
   a pending SetupIntent): dashboard banner "Start free trial" → screen 5 → trial starts; the old
   subscription is canceled in Stripe and the profile stays `trialing`.
8. **Mobile app.** App signup, last screen "Start my free trial" opens the website with `?resume=1` → after
   login, screen 5 → trial starts without a card.
