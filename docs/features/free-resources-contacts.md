# Free resources + contacts list (Creator plan)

A pro gives away a file (for example "Free nail aftercare guide") from their studio page in
exchange for an email address. Everyone who claims a free resource or buys a product lands in
the pro's **Audience** list, with a clear record of who agreed to receive marketing emails.

Builds on digital products (`docs/features/digital-products.md`, migration
`20261127_01_digital_products.sql`): a free resource is a row in `products` with
`type = 'free_resource'` and `price_cents = 0`, and uses the same buckets, cover, file and
download cap.

Status: code is ready, **nothing is applied or deployed**. See "Go-live steps".

## Data model

Migration: `supabase/migrations/20261128_01_free_resources_contacts.sql` (idempotent, run twice
on PGlite with RLS checks, see "Verification").

### `products` (new constraints only)
- `products_free_resource_is_free`: a `free_resource` always has `price_cents = 0`.
- `products_active_free_has_file`: an active `free_resource` must have a file.

`public_products` already exposes `type`, so the studio page knows which cards are free. No
change to the view (still no `file_path` / `file_name`).

### `contacts`
| column | notes |
|---|---|
| id, profile_id → profiles (cascade) | |
| email | stored lowercase (CHECK). Unique index on `(profile_id, lower(email))` |
| first_name | optional, ≤ 100 |
| source | `free_resource` \| `product_purchase` \| `booking`. First touch is kept |
| source_ref | product id (free resource) or order id (purchase) |
| consent_marketing | `true` only after an explicit tick of the unticked opt-in box |
| consent_at, consent_text | when and to which exact wording ("Send me emails from <studio>") |
| unsubscribed_at | set by `unsubscribe-contact` |
| last_activity_at, created_at | |

"Can receive emails" (Subscribed) = `consent_marketing AND unsubscribed_at IS NULL`.

### `free_resource_claims`
One row per (product, email): `id`, `product_id` (RESTRICT, so a claimed free resource is
archived rather than deleted and the emailed link keeps working), `profile_id`, `contact_id`,
`email`, `first_name`, `consent_marketing`, `download_count`, `emailed_at`, `created_at`.

### `rate_limit_hits`
`(bucket, hit_at)`. Bucket names are built from HMAC hashes, never raw IPs or emails. Old rows
are cleaned up opportunistically (older than 2 days).

### SQL functions (service_role only, EXECUTE revoked from anon/authenticated)
- `upsert_contact(profile_id, email, first_name, source, source_ref, consent, consent_text) → uuid`:
  insert or merge. Never downgrades consent. A new explicit opt-in refreshes `consent_at` /
  `consent_text` and clears a previous unsubscribe.
- `claim_free_resource_download(claim_id, max) → int`: atomic download counter (same contract
  as `claim_product_download`).
- `rate_limit_hit(bucket, window_seconds, max) → boolean`: sliding window, serialised per bucket
  with an advisory lock.

### RLS summary
| object | anon | authenticated pro | service_role |
|---|---|---|---|
| contacts | no access | SELECT own rows. INSERT/UPDATE/DELETE revoked | all |
| free_resource_claims | no access | SELECT own rows. Writes revoked | all |
| rate_limit_hits | no access | no access | all |
| products (free_resource) | via `public_products` only | CRUD own rows (unchanged) | all |

## Plan gating
- Free resources reuse the `digital_products` feature (Creator and Salon), checked in three
  places that already exist: `hasFeature` (client), `planHasFeature` (edge functions) and
  `plan_has_digital_products` (the `public_products` view). No new feature key, so the three
  mirrors cannot drift.
- `/dashboard/audience` uses the same gate. Locked state: upgrade panel with "Join the waitlist"
  (`mailto:hello@getnelsy.com?subject=Creator%20waitlist`), same pattern as Products.

## Flows

### Pro: create a free resource (`/dashboard/products`)
"New free resource" next to "New product". Same editor (title, description, cover, file up to
50 MB, visible toggle) with the price fixed at **Free**. The list shows "Free | Free resource".
Event `product_created` now carries `type`.

### Visitor: claim (studio page)
1. The Shop card shows **Free** and a **Get it** button.
2. The modal asks for email (required), first name (optional) and an **unticked** checkbox
   "Send me emails from <studio name>" (Tips and offers. Optional. Unsubscribe at any time.).
   A line explains the email is shared with the studio and links to `/privacy`.
3. `claim-free-resource` (public):
   - rate limits: 10 claims per IP per hour, 3 per email + product per day (fails closed if the
     limiter errors);
   - product must be an active, non-archived `free_resource` with a file and price 0, of a
     published studio (subscription not inactive/incomplete/canceled) whose plan has
     `digital_products`;
   - `upsert_contact` (source `free_resource`, consent only when `consent_marketing === true`);
   - records the claim (or reuses the existing one for the same email + product);
   - emails "Your free download is ready" with a link to `/r/<claim_id>` and an unsubscribe
     footer + `List-Unsubscribe` headers. All user text goes through `esc()`.
   - responds `{ ok: true }` only: no URL, no file path, same answer for new and repeat emails.
4. The modal shows "Check your inbox". The file is only delivered by email, so the address must
   be real. Event `free_resource_claimed` (with `consent_marketing`).
5. `/r/:claimId` asks for the email the link was sent to, then `get-product-download` with
   `{ claim_id, email }` returns a 5 minute signed URL. Max 10 downloads per claim.

### Paid product buyers
In `markProductOrderPaid` (`_shared/product-orders.ts`), inside the existing once-only
`notified_at` block, the buyer is upserted as a contact (source `product_purchase`,
**consent false**: a purchase is not an opt-in). The buyer email now has the unsubscribe footer
and headers. Non-blocking: a contact failure never affects the order or the emails.
`stripe-webhooks/index.ts` itself is unchanged (it already calls `markProductOrderPaid`).

### Bookings: not wired (on purpose)
Booking clients are **not** added to contacts. Doing it safely means touching booking creation
(`create-payment-intent`, `stripe-webhooks` booking branches) or adding a trigger on `bookings`,
which the brief excludes. Booking clients remain visible in Dashboard > Customers. The schema
already accepts `source = 'booking'`; a follow-up can call `upsert_contact` after a booking is
confirmed (consent false), or run a one-off backfill.

### Audience page (`/dashboard/audience`, Sidebar > Grow)
Counts (Contacts, Can receive emails, From free resources), search by email or name, source
filter (All / Free resource / Purchase), consent badge (Subscribed / No consent / Unsubscribed),
**Export CSV** of the current filtered list (built in the browser from rows RLS already limits
to the pro; formula injection neutralised; UTF-8 BOM for Excel). Event `contacts_exported`.
Empty state links to creating a free resource. The other Grow items (Orders, Marketing,
Community, Referrals) keep their Soon badge.

### Unsubscribe
- Every email sent to a contact (free resource email, product buyer email) has an
  "Unsubscribe" link to `/u/<contact_id>?t=<token>` and RFC 8058 headers
  (`List-Unsubscribe: <…/functions/v1/unsubscribe-contact?c=…&t=…>`,
  `List-Unsubscribe-Post: List-Unsubscribe=One-Click`) so Gmail / Apple Mail show their
  native button.
- Token = base64url(HMAC-SHA256(`UNSUBSCRIBE_SECRET`, `unsub:v1:<contact_id>`)), compared in
  constant time. No expiry (an unsubscribe link must keep working).
- `/u/:contactId` needs one click on "Unsubscribe" (opening the page changes nothing, because
  email scanners open links). `unsubscribe-contact`: POST sets `unsubscribed_at` (first date
  kept); GET only redirects to the `/u` page.
- If `UNSUBSCRIBE_SECRET` is missing, emails still go out (they are transactional: the file the
  person asked for) but without the link, and the function logs an error. Set the secret before
  go-live.

## Edge functions
| function | auth | change |
|---|---|---|
| `claim-free-resource` | public (`--no-verify-jwt`) | **new** |
| `unsubscribe-contact` | public (`--no-verify-jwt`) | **new** |
| `get-product-download` | public (`--no-verify-jwt`) | adds the `claim_id` branch (early return, paid branch untouched) |
| `stripe-webhooks` | Stripe signature | no source change, but **redeploy** it: it bundles `_shared/product-orders.ts`, which now upserts contacts |
| `_shared/contacts.ts` | | **new**: `upsertContact`, HMAC token, unsubscribe links / headers / footer, `rateKey` |
| `_shared/email.ts` | | `sendEmail(to, subject, html, { headers })`: optional 4th argument, existing calls unchanged |
| `_shared/product-orders.ts` | | contact upsert + unsubscribe footer on the buyer email |

## Environment variables
| name | where | notes |
|---|---|---|
| `UNSUBSCRIBE_SECRET` | Supabase Edge Function secrets | **new, required**. Random, at least 16 chars (use 32+ bytes). Signs unsubscribe tokens and keys rate-limit hashes. Rotating it invalidates every unsubscribe link already sent, so set it once. |
| `RESEND_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `APP_URL` (optional) | already set | reused |
| `STRIPE_SECRET_KEY` | already set | still required by `get-product-download` at boot |

## Go-live steps (founder approval required)
Project ref: `qbrqsvdustqeoplebzwi`. The remote migration history is empty, so do **not** use
`db push`: run the file directly.

1. Make sure `20261127_01_digital_products.sql` is applied first (this migration alters
   `products`). Then:
   ```bash
   npx supabase db query --remote -f supabase/migrations/20261128_01_free_resources_contacts.sql
   ```
   Check:
   ```bash
   npx supabase db query --remote "select to_regclass('public.contacts'), to_regclass('public.free_resource_claims'), to_regclass('public.rate_limit_hits');"
   ```
2. Secret:
   ```bash
   npx supabase secrets set UNSUBSCRIBE_SECRET="$(openssl rand -base64 32 | tr -d '=+/')" --project-ref qbrqsvdustqeoplebzwi
   ```
3. Deploy functions:
   ```bash
   npx supabase functions deploy claim-free-resource  --no-verify-jwt --project-ref qbrqsvdustqeoplebzwi
   npx supabase functions deploy unsubscribe-contact  --no-verify-jwt --project-ref qbrqsvdustqeoplebzwi
   npx supabase functions deploy get-product-download --no-verify-jwt --project-ref qbrqsvdustqeoplebzwi
   npx supabase functions deploy stripe-webhooks --project-ref qbrqsvdustqeoplebzwi
   ```
   (Deploy `stripe-webhooks` with the same flags it uses today.)
4. Frontend deploy (Vercel). New routes: `/r/:claimId`, `/u/:contactId`, `/dashboard/audience`.
   They are two-segment paths, so they never collide with studio slugs.
5. Until step 1 runs, the Audience page shows a load error and claims fail with a generic
   message; the rest of the app is unaffected. Do steps 1 to 3 before the frontend deploy.

## Local development
- `/dev/audience`, `/dev/audience?empty=1`, `/dev/audience?gated=1`: Audience sandbox with
  in-memory contacts (DEV builds only, not in the production bundle).
- `/dev/products`: the demo list includes a free resource; "New free resource" opens the form.
- `/dev/studio`: the Shop section includes a Free card; without Supabase the modal runs a local
  demo (nothing sent).

## Verification done
- `npx tsc --noEmit -p tsconfig.app.json`: clean. ESLint on touched files: clean.
- `npx vitest run src/lib/__tests__/contacts.test.ts`: consent state + CSV escaping.
- Edge functions: esbuild syntax check, and strict `tsc` with Deno/supabase-js/Stripe shims.
  HMAC token mint/verify/tamper and footer escaping exercised in Node.
- Migration on PGlite (Postgres 16 in WASM) with Supabase-like roles: products migration twice,
  this migration twice (idempotent), then: free resource with a price rejected; active free
  resource without file rejected; anon sees the free resource in `public_products`; email
  normalised and merged; consent never downgraded; new opt-in clears unsubscribe; duplicate
  claim rejected; download counter stops at 10; rate limiter allows 3 then refuses; pro sees
  only own contacts/claims; pro cannot insert/update contacts or call the service functions;
  anon cannot read contacts/claims or call any function; deleting a claimed free resource is
  blocked by the FK (the app archives it instead).

## Manual test plan (after go-live, test profile with `plan = 'creator_monthly'`)
1. Products: "New free resource", upload a PDF, save. The row shows "Free | Free resource".
   Try saving it visible without a file: blocked.
2. Studio page: the card says Free / Get it. Submit without ticking the box: "Check your inbox".
   Email received with Download button and Unsubscribe footer. Gmail shows "Unsubscribe" next to
   the sender.
3. `/r/<claim_id>`: wrong email gives "We could not find a purchase with these details"; right
   email downloads. 11th download refused.
4. Audience: the contact shows "No consent", source Free resource. Claim again with the box
   ticked: same contact (no duplicate), now "Subscribed". Claim a 4th time within a day: rate
   limit message.
5. Click Unsubscribe in the email, confirm: Audience shows "Unsubscribed"; "Can receive emails"
   drops by one. Opening the link again is harmless.
6. Buy a paid product (Stripe test card): buyer appears with source Purchase and "No consent";
   the buyer email has the unsubscribe footer. Replay the webhook: no duplicate contact.
7. Export CSV: only this pro's contacts; a first name starting with `=` is exported as text.
8. Independent plan profile: `/dashboard/audience` shows the upgrade panel; calling
   `claim-free-resource` for its products returns "not available".
9. Security: as anon, `select * from contacts` is denied; a pro cannot see another pro's contacts.

## Security notes
- **No file exposure**: `claim-free-resource` never returns a URL or path; the file only reaches
  the typed inbox, through a capped, 5 minute signed URL. `public_products` still hides
  `file_path`.
- **Abuse**: per-IP and per-email+product limits stop inbox flooding and scraping; the limiter
  fails closed. Keys are HMAC hashes (no raw IP or email stored in `rate_limit_hits`).
  Per-IP limits trust the first `x-forwarded-for` hop set by the Supabase gateway.
- **Enumeration**: same `{ ok: true }` for new and repeat claims; `/r` uses an unguessable UUID
  plus the email and returns the same error for unknown claim and wrong email.
- **Consent**: only a literal `true` counts; box unticked by default; wording and time stored;
  purchases never imply consent; unsubscribe always wins until a new explicit opt-in.
- **Unsubscribe tokens**: HMAC-SHA256, constant-time compare, scoped to one contact (one pro).
  GET never mutates (link scanners).
- **Email HTML**: titles, studio names and first names go through `esc()`.
- **CSV**: built client-side from RLS-limited rows; formula injection neutralised.
- **Known limitations**: no "new lead" email to the pro (avoids inbox noise; the Audience page is
  the source of truth); bookings do not feed contacts yet; Nelsy does not send marketing
  campaigns yet (Marketing stays a Soon item), the list is export-only for now.
