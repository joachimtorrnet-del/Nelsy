# Trial activation emails

Four short emails from Nelsy to a new pro during her 14-day free trial. Each one is sent at most
once, and only while the step it talks about is still not done. They fill the gap between signup
and the existing `trial_will_end` email (3 days before the end, in `stripe-webhooks`).

Status: code is ready, **nothing is applied or deployed**. See "Go-live steps".

## The four emails

Days are counted from the trial start: `profiles.trial_ends_at` minus 14 days (no start date is
stored on the profile; a `trial_started_at` value is used if that column ever exists).

| key | due | subject | sent unless | button |
|---|---|---|---|---|
| `day0_welcome` | day 0 to 2 (normally within the hour after signup) | Welcome to Nelsy, your page is live | always sent. With an active service already, the "add your first service" paragraph is replaced | Add my first service / Open my dashboard → `/dashboard` |
| `day2_instagram` | day 2 to 4 | Put your Nelsy link in your Instagram bio | her page had a visit from Instagram, or she has any booking | View my page → `getnelsy.com/<slug>` |
| `day5_deposits` | day 5 to 7 | Take deposits to stop no-shows | Stripe is connected and enabled | Connect Stripe → `/dashboard/stripe` |
| `day10_recap` | day 10 to 11 | Your first 10 days on Nelsy | always sent. With a card saved, the card ask is replaced by "your card is saved" | Add a card → `/dashboard?add_card=1` / Open my dashboard |

Each email has a window. An email whose window has passed is never sent late, so switching the job
on (or a pro switching the emails back on) never produces a burst of old emails. The day 10 window
closes on day 11 because that is when Stripe sends `trial_will_end`, which already asks for the card.

How each condition is read:

- **Has a service**: at least one row in `services` with `active = true`.
- **Visit from Instagram**: a `page_views` row with `source = 'instagram'` or a referrer containing
  `instagram` (the studio page sets `source` from `utm_source=instagram` or an `instagram.com`
  referrer, see `detectPageViewSource`). On 2026-11-28 all 40 rows were `direct` with no referrer.
- **Bookings**: `bookings.status` in `confirmed`, `paid`, `completed`, `no_show`. Unpaid (`pending`),
  `expired`, `cancelled` and `refunded` bookings are not counted, in the skip rule or in the recap.
- **Stripe enabled**: `stripe_account_id` is set and `stripe_onboarding_complete` is true. Same rule
  as the dashboard (`Home.tsx` `stripeReady`); `get-stripe-account` keeps that flag equal to
  `charges_enabled && payouts_enabled`.
- **Card saved**: read from Stripe exactly like `trial-card` (subscription `default_payment_method`,
  or the customer's default payment method or source). Read only. If Stripe cannot be read, the day
  10 email waits for the next hourly run instead of asking for a card she may already have added.
- **Recap numbers**: all `page_views` rows and counted bookings for her profile. Real numbers only.
  With zero visits and zero bookings the email says so and gives one next step: add a first service
  if she has none, otherwise put her link in her Instagram bio.
- **Price in the day 10 email**: taken from her Stripe subscription price (`$29 per month`,
  `$300 per year`). Left out if unknown.

The copy lives in `lifecycleEmailContent()` in `supabase/functions/_shared/lifecycle-emails.ts`.
Every email: under 120 words (tested), one pink button, signed "Joachim from Nelsy",
reply-to `hello@getnelsy.com`, an unsubscribe link in the footer.

## Who gets them

`supabase/functions/_shared/lifecycle-emails.ts` (pure, unit tested) decides:

| rule | detail |
|---|---|
| status | `profiles.subscription_status = 'trialing'` exactly. Never `cancelled`, `inactive` (paused or draft), `past_due`, `active`, `incomplete` or the legacy `trial` |
| trial running | `trial_ends_at` is set and in the future |
| opt-out | `profiles.notification_preferences.lifecycle_emails !== false` (absent = on) |
| email | a valid `profiles.email` |
| once | no row in `lifecycle_emails_sent` for (profile, email) |
| daytime | local hour from 9:00 to 18:59 in `profiles.timezone` (fallback `Europe/Paris`). The welcome email skips this rule for the first 3 hours after signup: she is awake, she just signed up |

Data notes from 2026-11-28 (read only): no profile is `trialing` yet (the no-card trial flow is new),
so going live sends nothing to old accounts. Every profile has `timezone = 'Europe/Paris'`, so
"daytime" is Paris daytime for everyone until timezones are set correctly at signup.

### Never twice

Before sending, the run inserts `(profile_id, email_key)` into `lifecycle_emails_sent`. The unique
constraint lets one run win; the others get a duplicate error and skip. If Resend rejects the
email, the row is deleted (only if it still carries this run's `sent_at`) and the next hourly run
retries while the window is open.

### Opt-out

- Dashboard > Settings > Notification Settings > "Setup Tips from Nelsy".
- The "Unsubscribe" link in each email opens `/u/emails/<profile id>?t=<token>`; one click on the
  button there calls `unsubscribe-lifecycle`, which sets `lifecycle_emails: false` and keeps the
  other preference keys. Opening the link alone changes nothing (mail scanners open links).
- Gmail and Apple Mail show their own Unsubscribe button (`List-Unsubscribe` one-click POST).
- Token = base64url(HMAC-SHA256(`UNSUBSCRIBE_SECRET`, `lifecycle-unsub:v1:<profile id>`)), the same
  secret and pattern as contact unsubscribe links (different message, so tokens are not
  interchangeable). If the secret is missing, emails still go out and the footer links to the
  Settings page instead; the dry run reports `unsubscribe_links: false`.

The mobile app Settings screen has no toggle for this yet (web Settings and the email link do).

## Data model

Migration `supabase/migrations/20261201_02_lifecycle_emails.sql` (idempotent, additive):

```
lifecycle_emails_sent
  id          uuid primary key default gen_random_uuid()
  profile_id  uuid not null references profiles(id) on delete cascade
  email_key   text not null      -- day0_welcome | day2_instagram | day5_deposits | day10_recap
  sent_at     timestamptz not null default now()
  unique (profile_id, email_key)
```

RLS is on with no policy and the client roles have no grants: only the service role reads or
writes it. Cron job `nelsy-send-lifecycle-emails`, `20 * * * *` (minute 20 of every hour, UTC),
calling the function with the Vault secret `booking_reminders_cron_secret` (the one the booking
reminders already use). No new column: the opt-out is a key in the existing
`profiles.notification_preferences` JSON.

## Edge functions

`send-lifecycle-emails`

- Auth: deployed with `--no-verify-jwt`; every call must send `x-cron-secret: <CRON_SECRET>`
  (constant-time compare). No secret configured = 500, wrong secret = 401.
- `POST {}` sends. `POST {"dry_run":true}` lists what would be sent (`would_send`: profile id,
  email key, subject) without claiming or sending. `{"dry_run":true,"now":"2026-12-10T14:00:00Z"}`
  does the same as if it were that time. `{"preview_to":"you@example.com"}` sends the four emails
  with sample data to that address and writes nothing.
- Refuses to run (500, nothing claimed) if `RESEND_API_KEY` is missing.
- Up to 500 trialing profiles per run. Returns `{ now, trialing, sent, failed, skipped: {reason: n}, dry_run, unsubscribe_links, would_send }`.
- Reads `profiles`, `services`, `page_views`, `bookings`, and for the day 10 email the Stripe
  subscription and customer. Writes only `lifecycle_emails_sent`. No Stripe writes.

`unsubscribe-lifecycle`: public (`--no-verify-jwt`), token checked, writes only
`profiles.notification_preferences.lifecycle_emails`.

Secrets used: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `CRON_SECRET`,
`UNSUBSCRIBE_SECRET`, `STRIPE_SECRET_KEY`. All of them already exist if booking reminders and
contact unsubscribe links are live; none is new.

`_shared/email.ts`: `sendEmail` gained an optional `replyTo` (Resend `reply_to`). Existing callers
are unchanged and do not need a redeploy.

## Go-live steps

1. Check the secrets exist (names only are listed): `npx supabase secrets list --project-ref qbrqsvdustqeoplebzwi`
   should show `CRON_SECRET`, `UNSUBSCRIBE_SECRET`, `RESEND_API_KEY`, `STRIPE_SECRET_KEY`.
   `CRON_SECRET` and the Vault secret `booking_reminders_cron_secret` come from
   `docs/features/booking-reminders.md`, `UNSUBSCRIBE_SECRET` from `docs/features/free-resources-contacts.md`.
2. Deploy the functions first (the cron job would get a 404 otherwise):
   ```bash
   npx supabase functions deploy send-lifecycle-emails --no-verify-jwt --project-ref qbrqsvdustqeoplebzwi
   npx supabase functions deploy unsubscribe-lifecycle --no-verify-jwt --project-ref qbrqsvdustqeoplebzwi
   ```
3. Deploy the frontend (Settings toggle and the `/u/emails/:profileId` page), so the unsubscribe
   link works before the first email goes out.
4. Apply the migration (do NOT use `db push`, the remote migration history is empty):
   ```bash
   npx supabase db query --remote -f supabase/migrations/20261201_02_lifecycle_emails.sql
   ```
   The function needs the table, so even the dry run fails ("Query failed") before this step.
   From the next hh:20 the job runs for real and emails every pro who is due. To test by hand
   first, comment out the two `cron` statements for the first run of the file, do the test plan,
   then run the full file.

## Test plan

With `CRON_SECRET` exported in your shell (do not paste it into files):

1. Auth and dry run:
   ```bash
   curl -s -X POST https://qbrqsvdustqeoplebzwi.supabase.co/functions/v1/send-lifecycle-emails \
     -H "x-cron-secret: $CRON_SECRET" -H "Content-Type: application/json" -d '{"dry_run":true}'
   ```
   Expect 200 with `trialing`, `skipped`, `would_send` and `unsubscribe_links: true`.
   Without the header, or with a wrong one: 401.
2. Look at the four emails in a real inbox (sample data, nothing written):
   ```bash
   curl -s -X POST https://qbrqsvdustqeoplebzwi.supabase.co/functions/v1/send-lifecycle-emails \
     -H "x-cron-secret: $CRON_SECRET" -H "Content-Type: application/json" -d '{"preview_to":"you@example.com"}'
   ```
   Check on a phone: button color, the link box in the Instagram email, reply goes to hello@getnelsy.com.
3. Real flow: sign up a test pro with your own email and start the free trial. Run the dry run:
   `would_send` has her id with `day0_welcome`. Run the same curl with `-d '{}'`: `sent: 1`, the
   welcome arrives. Run it again: she is under `skipped.already_sent`.
   `select * from lifecycle_emails_sent;` shows one row.
4. Later stages without waiting: dry run with a future time, for example 2 days and 3 hours after
   her trial start, during Paris daytime:
   ```bash
   -d '{"dry_run":true,"now":"2026-12-03T13:20:00Z"}'
   ```
   Expect `day2_instagram`. Open her page with `?utm_source=instagram` once (from a private
   window), dry run again: she is under `skipped.step_done`. Same idea for day 5 (connect Stripe on
   the test account, then `step_done`) and day 10 (subject "Your first 10 days on Nelsy").
5. Daytime: a dry run with `"now"` at 03:20 UTC on a day 2 date puts her under `skipped.outside_daytime`.
6. Opt-out: click "Unsubscribe" in the welcome email, confirm on the page. In Settings the
   "Setup Tips from Nelsy" switch is off. Dry run: `skipped.opted_out`. Switch it back on: she is due again.
7. Cron, after the next hh:20:
   ```sql
   select status, return_message, start_time from cron.job_run_details
   where jobid = (select jobid from cron.job where jobname = 'nelsy-send-lifecycle-emails')
   order by start_time desc limit 5;
   select status_code, content, created from net._http_response order by created desc limit 5;
   ```
   Expect `succeeded` and HTTP 200.
8. Clean up the test account as usual; its `lifecycle_emails_sent` rows go with the profile.

Unit tests: `npx vitest run src/lib/__tests__/lifecycleEmails.test.ts` (each email due and not due,
statuses, trial ended, opt-out, skip conditions, once only over a simulated trial of hourly runs,
timezone window, copy rules, escaping, unsubscribe token).

## Rollback

```sql
select cron.unschedule('nelsy-send-lifecycle-emails');
drop table if exists public.lifecycle_emails_sent;
```
Then `npx supabase functions delete send-lifecycle-emails` and `npx supabase functions delete unsubscribe-lifecycle`.
Unscheduling the job alone is enough to stop the emails.
