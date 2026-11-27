-- 24-hour client email reminders (edge function send-booking-reminders).
-- Idempotent: safe to run more than once. Apply with:
--   npx supabase db query --remote -f supabase/migrations/20261128_04_booking_reminders.sql
-- See docs/features/booking-reminders.md.
--
-- Additive only: one nullable column, one partial index, one cron job.
-- No change to booking availability, overlap constraint, triggers or the financial ledger
-- (the existing bookings triggers fire on status / deposit_paid / nelsy_fee only).

-- ── 1. Idempotency marker ───────────────────────────────────────────────────
ALTER TABLE public.bookings
  ADD COLUMN IF NOT EXISTS reminder_sent_at timestamptz;

COMMENT ON COLUMN public.bookings.reminder_sent_at IS
  'When the 24h client reminder email was claimed/sent by send-booking-reminders. NULL = not sent. Set by a guarded UPDATE (WHERE reminder_sent_at IS NULL) before sending, reset to NULL only if the send failed.';

-- Hourly lookup: confirmed upcoming bookings without a reminder.
CREATE INDEX IF NOT EXISTS idx_bookings_reminder_due
  ON public.bookings (booking_datetime)
  WHERE reminder_sent_at IS NULL AND status IN ('confirmed', 'paid');

-- ── 2. Scheduling: pg_cron + pg_net ─────────────────────────────────────────
-- pg_cron is already enabled on the project. pg_net is available but was NOT enabled on
-- 2026-11-27: this enables it (same as Dashboard > Database > Extensions > pg_net).
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- The shared secret is NOT in this file. Store it once in Vault (same value as the
-- CRON_SECRET edge function secret):
--   select vault.create_secret('<long random value>', 'booking_reminders_cron_secret');
-- Until it exists, the job runs but makes no HTTP call.
--
-- Unschedule-then-schedule (same pattern as nelsy-expire-pending-bookings) so re-running this
-- migration keeps exactly one job. Runs at minute 5 of every hour (UTC).
SELECT cron.unschedule('nelsy-send-booking-reminders')
WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'nelsy-send-booking-reminders');

SELECT cron.schedule(
  'nelsy-send-booking-reminders',
  '5 * * * *',
  $cmd$
  SELECT net.http_post(
    url := 'https://qbrqsvdustqeoplebzwi.supabase.co/functions/v1/send-booking-reminders',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-cron-secret', s.decrypted_secret
    ),
    body := '{}'::jsonb,
    timeout_milliseconds := 60000
  )
  FROM (
    SELECT decrypted_secret
    FROM vault.decrypted_secrets
    WHERE name = 'booking_reminders_cron_secret'
    LIMIT 1
  ) s;
  $cmd$
);

-- Rollback (manual):
--   SELECT cron.unschedule('nelsy-send-booking-reminders');
--   DROP INDEX IF EXISTS public.idx_bookings_reminder_due;
--   ALTER TABLE public.bookings DROP COLUMN IF EXISTS reminder_sent_at;
