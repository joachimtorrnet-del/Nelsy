# Launch test plan

Run before shipping digital products, courses, coaching and memberships, then after every change to payments.
Each scenario lists what to do and what must be true afterwards. Mark ✅ / ❌ with the date.

## Setup

- **Accounts:** one test pro account (Stripe Connect onboarded) and one client email you can read.
- **Payments:** production uses live Stripe keys, so test cards don't work there. Either:
  - run on a preview deployment with Stripe **test** keys and test cards (`4242 4242 4242 4242`, `4000 0025 0000 3155` for 3-D Secure, `4000 0000 0000 0002` declined), or
  - run in production with small real amounts and refund them afterwards.
- **Watch during each run:** Stripe dashboard (payment + webhook delivery), Supabase `bookings` / `booking_payments`, PostHog events and Error tracking, the client and pro inboxes.

## 1. Bookings

| # | Scenario | Expected |
|---|---|---|
| 1.1 | Book a **pay on arrival** service | Booking `confirmed`, `payment_status = unpaid`. Client email "Your booking is confirmed" with amount and payment methods. Pro email "New booking" with client phone. Slot no longer available. |
| 1.2 | Book a **deposit** service, pay | Booking `confirmed`, `deposit_paid` = deposit, `payment_status = deposit_paid`. Client and pro emails. Webhook 200 in Stripe. |
| 1.3 | Book a **full payment** service, pay | `payment_status = paid`, emails sent, pro balance updated. |
| 1.4 | Deposit booking, then record the balance in cash in the dashboard | `payment_status = paid`, cash not added to the online balance. |
| 1.5 | Start a deposit booking and abandon at payment | Booking expires, slot frees up after the expiry delay. |
| 1.6 | Two clients take the same slot at the same time | One succeeds, the other gets "This time slot is no longer available". |
| 1.7 | Declined card, then 3-D Secure card | Clear error, retry works, no duplicate booking. |
| 1.8 | Apple Pay / Google Pay (on a phone) | Payment sheet opens, booking confirmed. |
| 1.9 | Pro in another time zone / currency (e.g. USD, America/New_York) | Times and prices shown in the pro's time zone and currency on the page, in emails and in the dashboard. |

## 2. Digital products

| # | Scenario | Expected |
|---|---|---|
| 2.1 | Buy a digital product | Payment succeeds, client receives the file (email + download page), sale appears in Orders / Income. |
| 2.2 | Download link | Works for the buyer, not guessable, still works after a few days (or per your expiry rule). |
| 2.3 | EU buyer | Checkout asks for consent to immediate delivery and acknowledgement of losing the 14-day withdrawal right (see legal note). |
| 2.4 | Refund from the dashboard | Stripe refund issued, order marked refunded. |

## 3. Courses

| # | Scenario | Expected |
|---|---|---|
| 3.1 | Buy a course | Access email sent, course opens with the buyer's account, lessons play on mobile. |
| 3.2 | Non-buyer opens a lesson URL | Access denied. |

## 4. Coaching

| # | Scenario | Expected |
|---|---|---|
| 4.1 | Book and pay a coaching session | Same as 1.3, plus meeting details in the confirmation. |
| 4.2 | Coaching slot vs service slot at the same time | Cannot double-book the pro. |

## 5. Memberships

| # | Scenario | Expected |
|---|---|---|
| 5.1 | Join a membership | Subscription created on the pro's Stripe account, member gets access and a receipt. |
| 5.2 | Renewal (use Stripe test clock in test mode) | Charged again, access continues, receipt sent. |
| 5.3 | Failed renewal | Member notified, access rules applied after retries. |
| 5.4 | Member cancels | No further charges, access ends at period end. |

## 6. Nelsy subscription (the pro's own plan)

| # | Scenario | Expected |
|---|---|---|
| 6.1 | Sign up with the 14-day trial | $0 charged, card saved, trial end date shown. |
| 6.2 | Trial ends | First charge succeeds, plan active. |
| 6.3 | Cancel during trial | No charge at trial end. |
| 6.4 | Failed payment after trial | Pro notified, clear way to update the card. |

## 7. Signup and onboarding

| # | Scenario | Expected |
|---|---|---|
| 7.1 | US visitor | Dial code +1 with the US flag. |
| 7.2 | Weak password | Checklist shows which rules are missing; no surprise error at step 4. |
| 7.3 | Reserved username (`pricing`, `blog`…) | "This name is reserved". |
| 7.4 | Step 4 without ticking terms | Checkbox highlighted with a message; nothing is created. |
| 7.5 | Full signup to dashboard | `onboarding_step_completed` events for all 4 steps in PostHog. |

## 8. Privacy and tracking

| # | Scenario | Expected |
|---|---|---|
| 8.1 | Visitor in Europe | Cookie banner with Accept / Decline; no `ph_` cookie before accepting. |
| 8.2 | Visitor in the US | No banner. |
| 8.3 | Force a front-end error | It appears in PostHog > Error tracking. |

## Legal note for digital products (EU)

Consumers in the EU have a 14-day right of withdrawal. For digital content delivered immediately, that right only ends if the buyer **expressly consents** to immediate delivery **and acknowledges** losing the right, before paying. The checkout for digital products and courses needs a required checkbox for EU buyers, and the confirmation email should repeat it. Confirm the exact wording with your lawyer.
