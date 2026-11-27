# 1:1 coaching by video (Creator plan)

A service can now take place **in person** (default, unchanged) or **online by video call**.
Online sessions reuse the existing booking system as is: same availability, same slots, same
payment modes (pay on arrival, deposit, full), same Stripe direct charges. Only display fields
were added (badge, location, video link, time zone line).

Status: code is ready, **nothing is applied or deployed**. See "Go-live steps".

## What the pro sees

Dashboard, service editor (Checkout Page tab), new section **3. Location**:

- **In person**: current behaviour.
- **Online video call** (Creator plan): then choose
  - **Use this link for every session**: Zoom, Google Meet or any `https://` link, validated
    (https only, real host, no spaces or quotes, max 2048 chars), or
  - **I'll send the link after booking**: no link is stored; the client is told the pro will
    send it, and the pro gets a reminder in the booking email and calendar.
- Payment hint for online sessions: we recommend **Full payment upfront** (one click to switch),
  but nothing is forced.
- Pros without the `coaching` feature (Independent plan, no plan) see a "Creator" tag on the
  option; clicking it opens the Creator upgrade panel (same pattern as Products: "Join the
  waitlist"). If a downgraded pro still has an online service, the editor shows the panel and
  asks to switch it to in person before saving.

Calendar (Bookings): online bookings show a **Video call** badge, a "Join link" on the card, and
the link (or "No link saved: send it to your client") in the details modal. Home "upcoming"
list shows "· Video call".

## What the client sees

- Studio page (every template: default list, featured card, collections, Split, Editorial,
  Spotlight, Creator layouts): a **Video call** pill on the online service.
- Booking sheet: header shows "60 min · Online"; the time step says
  "Video call. Times are in Europe/Paris (GMT+1)."; payment wording says "at the session"
  instead of "at the studio"; the confirmed step shows Time zone + Location: Video call and a
  note that the join link is in the confirmation email. The link itself is never shown on the
  public page.
- Booking confirmation page (`/booking-confirmed`, after 3D Secure): Location: Video call with
  the link (or "Your pro will send you the video link before the session"), a time zone line,
  and the link as `LOCATION` in the "Add to Calendar" .ics file.
- Emails (client and pro, both the pay-on-arrival and the paid flows): extra rows
  Location / Video link / Time zone and a short note. The client note says the time is in the
  pro's time zone so they can check it against theirs.

## Time zone

The codebase stores the pro's IANA time zone in `profiles.timezone` (fallback
`Europe/Paris`, same as everywhere else). Online sessions show it as
`Europe/Paris (GMT+1)` (offset computed for the session date). We do not know the client's
time zone server-side, so emails show the pro's zone with a note; nothing is invented.

## Data model

Migration: `supabase/migrations/20261128_02_online_services.sql` (idempotent, additive).

| object | change |
|---|---|
| `services.location_type` | `text NOT NULL DEFAULT 'in_person'`, CHECK in (`in_person`, `online`). Public (it drives the badge). Existing rows become `in_person`. |
| `service_video_links` (new) | `service_id` PK → services (cascade), `profile_id` → profiles, `video_url` (CHECK https, no whitespace/quotes/`<>`, 12..2048 chars), timestamps. |
| `plan_has_coaching(text)` | SQL mirror of `hasFeature(plan, 'coaching')` (Creator, Salon). |
| `trg_services_enforce_online_plan` | BEFORE INSERT / UPDATE OF location_type, profile_id: an `online` service needs a plan with coaching, else `Online sessions are part of the Creator plan`. Edits that do not touch `location_type` (toggle active, reorder) never fire it. |
| `trg_service_video_links_guard` | the link must belong to the service owner, plan must include coaching; stamps `updated_at`. |

**Why the link is not a column on `services`:** `services` is readable by anyone
(`services_public_read`), so a `video_url` column there would leak paid session links to
anyone with the anon key. `service_video_links` has owner-only RLS (SELECT/INSERT/UPDATE/DELETE
where `profile_id = auth.uid()`), no anon grant at all, and the edge functions read it with
service_role to put it in the emails and on the confirmation page (whose caller already proved
it paid: PaymentIntent id or Checkout Session).

`profiles.plan` cannot be changed by the pro (20261030_01_protect_financial_fields), so the
server-side gate cannot be bypassed from the client.

Tested in PGlite (Postgres 16 in WASM) with Supabase-like roles: applied twice, plus 19 checks
(creator can set online and save links; independent blocked on insert/update/link; price edits
on in-person services unaffected; http, `javascript:` and quote-injection links rejected; link
on someone else's service rejected; anon cannot read links; another pro sees 0 links; cascade
on service delete).

## Not changed (hard rule)

- Availability / slot algorithm (`getAvailableSlots`, `get_public_slots`, overlap constraint).
- `create-payment-intent` amounts, booking insert, Stripe calls.
- `stripe-webhooks` ledger: `process_booking_payment`, `balance_transactions`,
  `booking_payments`, refunds. The webhook's booking SELECT is untouched; the location is read
  in a **separate, best-effort** query inside the existing non-blocking email `try`, after the
  ledger write.
- Before the migration is applied, every new read falls back to "in person" and the emails are
  byte-for-byte what they were (the helper returns empty strings).

## Files

- `supabase/migrations/20261128_02_online_services.sql`
- `supabase/functions/_shared/online-session.ts` (new): `fetchOnlineSession`, `isSafeHttpsUrl`,
  `timezoneLabel`, `onlineSessionRows`, `onlineSessionNote`. All values go through `esc()`; links
  are emitted only when they pass `isSafeHttpsUrl`.
- `supabase/functions/create-payment-intent/index.ts`: pay-on-arrival confirmation emails.
- `supabase/functions/stripe-webhooks/index.ts`: `payment_intent.succeeded` client + pro emails.
- `supabase/functions/get-booking-from-session/index.ts`: returns `location_type`, `video_url`.
- `src/lib/onlineSessions.ts` (new), `src/components/studio/VideoCallBadge.tsx` (new)
- `src/pages/dashboard/OfferEditor.tsx`, `src/pages/dashboard/Calendar.tsx`, `src/pages/dashboard/Home.tsx`
- `src/components/studio/BookingModal.tsx`, `StudioServiceList.tsx`, `FeaturedService.tsx`,
  `ServiceCollectionCard.tsx`, `layouts/LayoutSplit|Editorial|Spotlight|Creator.tsx`
- `src/pages/BookingConfirmed.tsx`
- Types/mappers: `src/types/index.ts`, `src/lib/supabase.ts`, `src/lib/liveMerchant.ts`,
  `src/hooks/useStudio.ts`, `src/lib/supabase-queries.ts`
- DEV only: `src/pages/dev/CoachingSandbox.tsx`, route `/dev/coaching` in `src/App.tsx`
  (not in production builds).

Not covered:
- Booking **reminder** emails do not exist in the codebase yet (only the trial-ending reminder),
  so there was nothing to extend. When they are added, reuse `onlineSessionRows`.
- The legacy Checkout Session flow (`checkout.session.completed` in stripe-webhooks,
  `create-checkout`) is not used by the booking sheet and was left as is.
- `src/mobile` (Capacitor app) was not touched: online services show without the badge there.

## Go-live steps (founder)

1. Apply the migration (do NOT use `db push`):
   ```
   npx supabase db query --remote -f supabase/migrations/20261128_02_online_services.sql
   ```
2. Redeploy exactly these 3 edge functions (`_shared/online-session.ts` is bundled into each):
   ```
   npx supabase functions deploy create-payment-intent    --project-ref qbrqsvdustqeoplebzwi
   npx supabase functions deploy stripe-webhooks          --project-ref qbrqsvdustqeoplebzwi
   npx supabase functions deploy get-booking-from-session --project-ref qbrqsvdustqeoplebzwi
   ```
   Keep the "Verify JWT" setting each function has today (Dashboard > Edge Functions): add
   `--no-verify-jwt` only to the ones that already run without it. No new secrets.
3. Deploy the frontend as usual.
4. Order does not matter for safety: the frontend and functions work before the migration
   (everything reads as in person). Saving an online service needs the migration.

## Test plan

Local, no backend (`npm run dev`, DEV only):
- `/dev/coaching?view=editor&state=in_person` / `online` / `later` / `gated`: editor states.
- `/dev/coaching?view=studio` (add `&preset=minimal_nude`, `editorial`, `blush`, or a Creator
  preset): badge on the online service; tap it and go through date, time (time zone line),
  details, confirmed.
- `/dev/coaching?view=confirmed` and `&nolink=1`: confirmation page.

After applying (test account, Stripe test mode):
1. Independent account: Location shows "Online video call · Creator"; clicking opens the
   upgrade panel; a direct PostgREST `update services set location_type='online'` fails with
   "Online sessions are part of the Creator plan".
2. Creator account: create "1:1 coaching", Online, link `https://zoom.us/j/...`, Full payment.
   Save, reload: link and mode persist. Try `http://...`: inline error, nothing saved.
3. Switch to "I'll send the link after booking", save: the `service_video_links` row is deleted.
4. Public page: Video call pill on the service; no link anywhere in the page source or in
   `select * from services` as anon; `select * from service_video_links` as anon is denied.
5. Book with full payment (test card, then a 3DS card): client email has Location, Video link,
   Time zone and the note; pro email has the same plus the pro note; `/booking-confirmed`
   shows the link; the .ics has `LOCATION:`.
6. Book a pay-on-arrival online service: emails come from create-payment-intent with
   "To pay at the session".
7. Calendar: badge + Join link on the card, link in details. With "send after booking":
   "No link saved: send it to your client".
8. Regression: book an in-person service; emails, confirmation page and calendar look exactly
   as before; `balance_transactions` / `booking_payments` rows identical in shape to before.
