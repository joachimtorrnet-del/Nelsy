# Booking reminders (24-hour client email)

Every client with a confirmed upcoming booking gets one email reminder about 24 hours before the
appointment. Email only: no SMS, no custom timing.

Status: code is ready, **nothing is applied or deployed**. See "Go-live steps".

## What the client receives

Subject: `Reminder: <service> with <studio> tomorrow at 10:30 AM` ("today" when the appointment is
later the same calendar day in the studio's timezone).

Body (rendered with the shared `layout()` / `row()` helpers, same look as the confirmation emails):

- Studio name, service, date, time with zone abbreviation (for example `10:30 AM GMT+1`)
- Location: `profiles.location` when the pro filled it in. If a service is a video service
  (`services.location_type` in `video|online|virtual` and an `https://` `services.video_url`), the
  row reads "Video call" with a "Join the call" link instead. Those two service columns do not
  exist yet: the code reads them as optional fields, so nothing breaks while they are missing.
- Policy box: the pro's own written policy if one is stored (`profiles.cancellation_policy_text`,
  not a column yet), otherwise the neutral line
  "Need to change your appointment? Contact <studio> directly."
  `profiles.cancellation_policy` (`no_refund`) and `cancellation_hours` (`24`) exist in the DB but
  are untouched defaults with no UI to set them, so they are not shown as the pro's policy.
- Button to the studio page `https://getnelsy.com/<slug>`.

The same policy box replaced the hardcoded "Free cancellation up to 24h before your appointment"
in both client confirmation emails of `stripe-webhooks` (checkout.session.completed and
payment_intent.succeeded). Nothing else in the webhook changed.

## Who gets one

`supabase/functions/_shared/booking-reminders.ts` (pure, unit tested) decides:

| rule | detail |
|---|---|
| status | `confirmed` (pay on arrival) or `paid` (deposit/full paid). Never `pending`, `completed`, `no_show`, `cancelled`, `refunded`, `expired` |
| window | `booking_datetime` in `[now + 23h, now + 25h)` |
| not sent yet | `bookings.reminder_sent_at IS NULL` |
| not just booked | booking created more than 60 minutes ago (it just got its confirmation) |
| email | a valid `client_email` |
| pro toggle | `profiles.notification_preferences.client_reminders !== false` (absent = on) |

The pro toggle is the "Client Reminders" switch in Dashboard > Settings > Notification Settings.
It replaced the old "Appointment Reminders: get reminded 1h before each appointment" switch, a
pro-facing reminder that was never built. Its stored key `reminders` (default `false`) is left in
the JSON and ignored, because `false` there was the default, not a choice to stop client emails.

### Never twice

The function runs hourly and the window is 2 hours wide, so each booking is due in exactly two
consecutive runs (tested). Before sending, the run claims the booking with a guarded update:

```sql
UPDATE bookings SET reminder_sent_at = now()
WHERE id = $1 AND reminder_sent_at IS NULL AND status IN ('confirmed','paid')
RETURNING id
```

Only the run that gets the row back sends. If Resend rejects the email, the claim is released
(`reminder_sent_at = NULL` where it still equals the claim time) so the next hourly run retries.
Overlapping or manual runs cannot double-send.

### Timezone

Times are shown in `profiles.timezone`, falling back to `Europe/Paris` when it is missing or
invalid (same fallback as `create-payment-intent` and `stripe-webhooks`). The zone abbreviation is
printed next to the time. Data note: on 2026-11-27 every profile had `Europe/Paris`, including a
pro whose location is "Charlotte, NC", so the timezone default at signup should be checked
separately; the reminder is only as right as that column.

## Data model

Migration `supabase/migrations/20261128_04_booking_reminders.sql` (idempotent, additive):

- `bookings.reminder_sent_at timestamptz NULL`
- partial index `idx_bookings_reminder_due (booking_datetime) WHERE reminder_sent_at IS NULL AND status IN ('confirmed','paid')`
- `CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions` (pg_cron was already enabled; pg_net was available but not enabled on 2026-11-27)
- cron job `nelsy-send-booking-reminders`, `5 * * * *` (minute 5 of every hour, UTC)

No change to availability, the overlap constraint, booking triggers (they fire on
`status` / `deposit_paid` / `nelsy_fee` only) or the financial ledger.

## Edge function `send-booking-reminders`

- Auth: deployed with `--no-verify-jwt`; every call must send `x-cron-secret: <CRON_SECRET>`
  (constant-time compare). No secret configured = 500, wrong secret = 401.
- `POST {}` sends. `POST {"dry_run": true}` returns what would be sent, without claiming or sending.
- Refuses to run (500, nothing claimed) if `RESEND_API_KEY` is missing.
- Up to 300 bookings per run. Returns `{ window, candidates, sent, failed, skipped: {reason: n}, would_send }`.
- Writes only `bookings.reminder_sent_at`.

Secrets used: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (provided by Supabase), `RESEND_API_KEY`
(already set for confirmation emails), `CRON_SECRET` (new).

## Go-live steps

Do them in this order: backend first, so the website copy ("Email reminder 24 hours before each
appointment") is true when it ships.

1. Generate a secret: `openssl rand -hex 32`
2. Set it on the functions:
   `npx supabase secrets set CRON_SECRET=<value>`
3. Store the same value in Vault, in the Dashboard SQL editor (keeps it out of shell history):
   `select vault.create_secret('<value>', 'booking_reminders_cron_secret');`
   To change it later: `select vault.update_secret((select id from vault.secrets where name = 'booking_reminders_cron_secret'), '<new value>');`
4. Apply the migration (do NOT use `db push`, the remote migration history is empty):
   `npx supabase db query --remote -f supabase/migrations/20261128_04_booking_reminders.sql`
   If enabling pg_net from SQL is refused, enable it in Dashboard > Database > Extensions > pg_net,
   then run the file again.
5. Deploy:
   - `npx supabase functions deploy send-booking-reminders --no-verify-jwt --project-ref qbrqsvdustqeoplebzwi`
   - `npx supabase functions deploy stripe-webhooks --project-ref qbrqsvdustqeoplebzwi` (policy box text), with
     the same flags as in DEPLOY_CHECKLIST.md / today's deploy, so its JWT setting does not change
   - `npx supabase functions deploy create-payment-intent --project-ref qbrqsvdustqeoplebzwi` (only
     `_shared/email.ts` changed: `sendEmail` now returns a boolean; behavior is the same)
6. Deploy the frontend (Settings toggle and copy).

## Test plan

1. Dry run, nothing due yet:
   ```bash
   curl -s -X POST https://qbrqsvdustqeoplebzwi.supabase.co/functions/v1/send-booking-reminders \
     -H "x-cron-secret: $CRON_SECRET" -H "Content-Type: application/json" -d '{"dry_run":true}'
   ```
   Wrong or missing header must return 401.
2. Create a test booking about 24h ahead on a test studio, with your own email
   (`created_at` is backdated so the "just booked" rule does not skip it):
   ```sql
   insert into bookings (profile_id, service_id, booking_datetime, booking_end_datetime, duration_minutes,
     client_name, client_email, client_phone, status, price_total, deposit_paid, currency, payment_mode, created_at)
   select p.id, s.id,
     date_trunc('hour', now()) + interval '24 hours',
     date_trunc('hour', now()) + interval '25 hours', 60,
     'Reminder Test', 'you@example.com', '+33600000000', 'confirmed', s.price_total, 0,
     coalesce(p.business_currency, 'eur'), 'on_arrival', now() - interval '2 hours'
   from profiles p join services s on s.profile_id = p.id
   where p.slug = 'joa-test' and s.active
   limit 1
   returning id, booking_datetime;
   ```
   (Pick a time with no other booking for that studio, or the overlap constraint rejects it.)
3. Dry run again: the id is in `would_send`.
4. Real run (same curl without `dry_run`): `sent: 1`; the email arrives; check date, time, zone,
   location, policy line and studio link.
5. `select reminder_sent_at from bookings where id = '<id>';` is set. Run again: `candidates: 0`.
6. Toggle test: switch "Client Reminders" off in Settings for that studio, create a second test
   booking, run: it is counted under `skipped.pro_opted_out` and `reminder_sent_at` stays NULL.
7. Cron: after the next hh:05,
   ```sql
   select status, return_message, start_time from cron.job_run_details
   where jobid = (select jobid from cron.job where jobname = 'nelsy-send-booking-reminders')
   order by start_time desc limit 5;
   select status_code, content, created from net._http_response order by created desc limit 5;
   ```
   Expect `succeeded` and HTTP 200.
8. Clean up: `delete from bookings where client_name = 'Reminder Test';`

Unit tests: `npx vitest run src/lib/__tests__/bookingReminders.test.ts` (window edges, statuses,
toggle, never-twice over 72 simulated hourly runs, timezone formatting, escaping, video link).

## Rollback

```sql
select cron.unschedule('nelsy-send-booking-reminders');
drop index if exists public.idx_bookings_reminder_due;
alter table public.bookings drop column if exists reminder_sent_at;
```
Then `npx supabase functions delete send-booking-reminders`.
