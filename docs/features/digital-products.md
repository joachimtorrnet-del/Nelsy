# Digital products (Creator plan)

Pros sell downloadable files (guides, templates, videos, up to 50 MB) from their studio page.
Buyers pay with Stripe (direct charge on the pro's connected account, 0% Nelsy commission) and get
a download link on screen and by email.

This is the base for later product types: `products.type` already accepts `course`, `coaching`,
`membership` and `free_resource`, and `products.settings` (jsonb) holds type-specific settings.

Status: code is ready, **nothing is applied or deployed**. See "Go-live steps" below.

## Data model

Migration: `supabase/migrations/20261127_01_digital_products.sql` (idempotent, tested twice in a
local Postgres with RLS checks).

### `products`
| column | notes |
|---|---|
| id, profile_id → profiles (cascade) | |
| type | `digital` now. Reserved: `course`, `coaching`, `membership`, `free_resource` |
| title (1..120), description (≤ 5000) | |
| price_cents | smallest currency unit (whole units for JPY/KRW), like Stripe |
| currency | forced by trigger to the pro's `business_currency` (lowercase) |
| cover_url | public URL in `product-covers` |
| file_path, file_name, file_size_bytes | object in PRIVATE `product-files`. CHECK: path must start with `<profile_id>/` |
| settings jsonb | for later types |
| is_active, position, archived_at, created_at, updated_at | |

Constraints: an active `digital` product must have a file; an active paid product must have a price > 0.

### `product_orders`
id, product_id (RESTRICT, so a sold product is archived rather than deleted), profile_id,
buyer_email, buyer_name, amount_cents, currency, stripe_payment_intent_id (UNIQUE),
stripe_account_id, status `pending|paid|refunded`, download_count, paid_at, refunded_at,
notified_at (email idempotency), created_at.

### `public_products` view
`security_invoker = false`, same pattern as `public_profiles`. Returns only public columns (no
`file_path` / `file_name`) for products that are active, not archived, of a published studio
(subscription not inactive/incomplete/canceled) whose plan includes digital products
(`plan_has_digital_products(plan)`: Creator or Salon). SELECT only for anon/authenticated.

### Functions
- `plan_has_digital_products(text)`: SQL mirror of `hasFeature(plan, 'digital_products')`.
- `claim_product_download(order_id, max)`: atomic `download_count + 1` for a paid order under
  the cap. Executable by service_role only.
- Triggers: `updated_at`, currency sync.

### RLS summary
| object | anon | authenticated pro | service_role |
|---|---|---|---|
| products | no access | full CRUD on own rows (`profile_id = auth.uid()`) | all |
| public_products | SELECT | SELECT | all |
| product_orders | no access | SELECT own rows only. INSERT/UPDATE/DELETE revoked | all (edge functions) |
| storage `product-files` (private) | none | read/write own folder `<uid>/...` | signs URLs |
| storage `product-covers` (public) | public URLs | write own folder | all |

### Storage
- `product-files`: private, 50 MB bucket limit (Supabase Free plan caps uploads at 50 MB; Pro allows more). The project-wide Storage upload limit must be at
  least the bucket limit (Dashboard > Storage > Settings), otherwise it caps the bucket.
- `product-covers`: public, 5 MB, png/jpeg/webp/gif.

## Flows

### Pro (dashboard `/dashboard/products`)
- Gate: `hasFeature(profile.plan, 'digital_products')`. Otherwise an upgrade panel explains that
  Products are part of the Creator plan, with "Join the waitlist"
  (`mailto:hello@getnelsy.com?subject=Creator%20waitlist`).
- List with up/down reordering, visible toggle, sales count; create/edit form (title,
  description, price, file up to 50 MB, cover, visible toggle); orders tab (paid + refunded).
- Delete: hard delete if no orders, otherwise archived (hidden, buyers keep their downloads).
- Warning banner when Stripe Connect is not complete.
- Event: `product_created`.

### Buyer (studio page)
1. "Shop" section after services on every template (default, Creator variants, Split,
   Editorial, Spotlight). Data from `public_products`.
2. Card opens a modal: details, email (+ optional name). `create-product-checkout` inserts a
   pending order and creates a PaymentIntent on the connected account
   (metadata `{kind:'product_order', product_id, order_id, profile_id}`). Event
   `product_checkout_started`.
3. Stripe Payment Element / Express Checkout (Stripe.js initialised with the connected account,
   same setup as bookings). On success: event `product_purchased`, success screen with Download.
4. Download calls `get-product-download` with `payment_intent_id + email` and redirects to a
   5 minute signed URL. If the webhook has not landed yet, the function re-reads the
   PaymentIntent from Stripe and marks the order paid through the same idempotent code.
5. Webhook `payment_intent.succeeded` (kind = product_order): order `paid`, then 2 emails once
   (`notified_at` claim): buyer "Your download" with a link to `/d/<order_id>`, pro
   "You just earned X". All user text is escaped with `esc()`.
6. Re-download: `/d/:orderId` asks for the checkout email (no PII in the URL). Max 10 downloads.
7. Full refund (`charge.refunded` with `charge.refunded = true`): order `refunded`, downloads stop.
   Partial refunds keep access.

Product sales are not written to `balance_transactions` (the booking ledger is untouched); they
show in the Products > Orders tab and in the pro's Stripe dashboard.

## Edge functions
| function | auth | purpose |
|---|---|---|
| `create-product-checkout` (new) | public (`--no-verify-jwt`) | validate product + plan + Stripe, pending order, PaymentIntent (direct charge) |
| `get-product-download` (new) | public (`--no-verify-jwt`) | verify order + email, cap, signed URL |
| `stripe-webhooks` (changed) | Stripe signature | new `product_order` branch in `payment_intent.succeeded`, new product branch at the top of `charge.refunded`. Booking/subscription code untouched |
| `_shared/plans.ts` (changed) | | adds `planHasFeature` / `tierFromProfilePlan`; `resolvePlan` unchanged |
| `_shared/product-orders.ts` (new) | | shared paid-marking + emails + money helpers |

## Go-live steps (founder approval required)

1. Apply the migration:
   ```bash
   npx supabase db push --linked        # applies 20261127_01_digital_products.sql
   # or paste the file in Dashboard > SQL editor
   ```
2. Storage: Dashboard > Storage > Settings, set the global upload file size limit to at least 100 MB.
3. Deploy the functions:
   ```bash
   npx supabase functions deploy create-product-checkout --no-verify-jwt --project-ref qbrqsvdustqeoplebzwi
   npx supabase functions deploy get-product-download   --no-verify-jwt --project-ref qbrqsvdustqeoplebzwi
   npx supabase functions deploy stripe-webhooks --project-ref qbrqsvdustqeoplebzwi
   ```
   (Deploy `stripe-webhooks` with the same flags it uses today.) Secrets already used by the
   other functions are reused: `STRIPE_SECRET_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`,
   `RESEND_API_KEY`, optional `APP_URL` (defaults to https://getnelsy.com).
4. Stripe webhooks: the **Connect** endpoint (Listen to events on Connected accounts, secret
   `STRIPE_WEBHOOK_SECRET_CONNECT`) must include `payment_intent.succeeded` and
   `charge.refunded`. Both are already needed for bookings; just confirm they are enabled.
5. Frontend deploy (Vercel) after 1 to 4. Until the migration is applied, `public_products`
   does not exist and the studio page simply shows no Shop section.
6. Nobody can sell until a profile has a Creator/Salon `plan`. Creator stays non-purchasable
   (`available: false`); to test in production, set `plan = 'creator_monthly'` on a test profile.

## Local development
- `/dev/products`, `/dev/products?empty=1`, `?gated=1`, `?nostripe=1`: dashboard sandbox with
  in-memory data (DEV builds only, not routed in production).
- `/dev/studio?preset=c_blush` (any template id): studio page with demo products.
- Without Supabase env vars, mock studios (e.g. `/studio-maya`) show demo products and the
  checkout runs a local demo (nothing charged).
- `?demo=1` on `/dashboard/products` (DEV only, or `VITE_PRODUCTS_DEMO=1`) unlocks the Creator
  gate against your local Supabase.

## Manual test plan (Stripe test mode)
Prereqs: test profile with `plan = 'creator_monthly'`, Stripe Connect test account complete.

1. Dashboard > Products shows the list (not the upgrade panel). With an Independent plan it shows
   the upgrade panel with "Join the waitlist" (no "soon" wording).
2. Create a product without a file: the visible toggle is disabled. Upload a 90 MB file and a
   cover, set 9.00, save. `product_created` fires. Try a 120 MB file: rejected.
3. Reorder with the arrows, refresh: order persists.
4. Open the studio page: Shop section after services, on at least 2 templates.
5. Buy with `4242 4242 4242 4242` (any future date, any CVC). Success screen; Download returns the
   file; order shows `paid` in Orders; buyer and pro emails received; pro email subject
   "You just earned €9.00".
6. 3DS: `4000 0025 0000 3155`, complete the challenge, same result.
7. Declined: `4000 0000 0000 0002` shows the error, order stays `pending`, no email.
8. Open `/d/<order_id>` from the email: wrong email gives "We could not find a purchase";
   right email downloads. Download 10 times; the 11th returns the limit message.
9. Refund the payment fully in the connected account's Stripe dashboard: order becomes
   `refunded`; download page refuses.
10. Replay the `payment_intent.succeeded` event from Stripe: no duplicate emails, order unchanged.
11. Price tampering: call `create-product-checkout` with an extra `amount` field: ignored, PI uses
    the DB price. Set the product inactive: checkout returns "not available".
12. Security: as anon, `select * from products` and `product_orders` are denied; a pro cannot read
    another pro's orders or upload into another pro's folder.

## Security notes
- **Price tampering**: amount and currency come only from `products` (currency forced to the pro's
  currency by trigger). The webhook re-checks PI amount/currency against the stored order.
- **File access**: private bucket, no anon policy, 5 minute signed URLs minted by service_role
  after verifying order + email, capped at 10 downloads with an atomic SQL claim. `file_path` is
  never exposed publicly and must sit in the owner's folder (CHECK), so a pro cannot sell another
  pro's file.
- **Idempotency**: order flip is `pending -> paid` conditional; emails are claimed via
  `notified_at IS NULL`; Stripe PI creation uses `product-order-pi-<order_id>`; refunded orders
  are never resurrected.
- **Enumeration**: `/d/:orderId` uses an unguessable UUID plus the email, and returns the same
  error for unknown order and wrong email.
- **Known limitations**: pending orders from abandoned checkouts are kept (no cron cleanup yet);
  no rate limiting on the public functions beyond Supabase defaults; uploads use standard
  (non-resumable) uploads, fine up to 50 MB but slow connections may need TUS later.
