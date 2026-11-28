-- Trial activation emails (edge function send-lifecycle-emails).
-- Idempotent: safe to run more than once. Apply with:
--   npx supabase db query --remote -f supabase/migrations/20261201_02_lifecycle_emails.sql
-- See docs/features/trial-emails.md.
--
-- Additive only: one new table and one cron job. No change to profiles, bookings, payments or
-- the financial ledger. The opt-out lives in the existing profiles.notification_preferences JSON
-- (key lifecycle_emails, absent = on), so no column is added.

-- ── 1. Sent log / idempotency ───────────────────────────────────────────────
-- One row per (pro, email). The function INSERTs the row before sending: the unique constraint
-- lets exactly one run win, and a failed send deletes the row so the next hourly run retries.
CREATE TABLE IF NOT EXISTS public.lifecycle_emails_sent (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid        NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  email_key  text        NOT NULL,
  sent_at    timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT lifecycle_emails_sent_profile_key_unique UNIQUE (profile_id, email_key)
);

COMMENT ON TABLE public.lifecycle_emails_sent IS
  'Trial activation emails already sent (or claimed) per pro. email_key: day0_welcome | day2_instagram | day5_deposits | day10_recap. Written only by the send-lifecycle-emails edge function (service role).';

-- Service role only: RLS on, no policy, no grants to the client roles.
ALTER TABLE public.lifecycle_emails_sent ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.lifecycle_emails_sent FROM anon, authenticated;

-- ── 2. Scheduling: pg_cron + pg_net ─────────────────────────────────────────
-- Same pattern as 20261128_04_booking_reminders.sql, and the SAME Vault secret
-- (`booking_reminders_cron_secret`, equal to the CRON_SECRET edge function secret).
-- The secret is NOT in this file. Until it exists in Vault, the job runs but makes no HTTP call.
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Unschedule-then-schedule so re-running this migration keeps exactly one job.
-- Runs at minute 20 of every hour (UTC); the function itself only sends between 9:00 and 19:00
-- in each pro's timezone.
SELECT cron.unschedule('nelsy-send-lifecycle-emails')
WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'nelsy-send-lifecycle-emails');

SELECT cron.schedule(
  'nelsy-send-lifecycle-emails',
  '20 * * * *',
  $cmd$
  SELECT net.http_post(
    url := 'https://qbrqsvdustqeoplebzwi.supabase.co/functions/v1/send-lifecycle-emails',
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
--   SELECT cron.unschedule('nelsy-send-lifecycle-emails');
--   DROP TABLE IF EXISTS public.lifecycle_emails_sent;
