-- =============================================================================
-- Migration: 20260905_03_add_booking_expiration.sql
-- Add 'expired' status and expires_at column to handle abandoned pending
-- bookings that should no longer block slots.
-- =============================================================================

-- ── 1. Add 'expired' to the bookings status CHECK ────────────────────────────
-- An expired booking is a pending booking whose payment window elapsed
-- before a PaymentIntent was created (abandoned at form step, not payment step).
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_status_check;
ALTER TABLE bookings
  ADD CONSTRAINT bookings_status_check
  CHECK (status IN (
    'pending', 'confirmed', 'paid', 'completed',
    'no_show', 'cancelled', 'refunded', 'expired'
  ));

-- ── 2. Add expires_at column ──────────────────────────────────────────────────
-- Populated by the Edge Function at booking creation time.
-- NULL for bookings without an expiry (pre-migration bookings stay pending).
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE;

-- Index for the cron job cleanup query
CREATE INDEX IF NOT EXISTS idx_bookings_expires_at
  ON bookings (expires_at)
  WHERE status = 'pending' AND expires_at IS NOT NULL;

-- ── 3. pg_cron cleanup job ────────────────────────────────────────────────────
-- Requires pg_cron extension (enabled by default in Supabase).
-- Run every 5 minutes. Only expires orphaned bookings (no PaymentIntent).
-- Bookings that have a stripe_payment_intent_id are NOT expired here —
-- those are kept as pending until the webhook confirms payment or they age out.

-- Enable extension if not already enabled (harmless if already enabled)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Remove any previous version of this job to keep schedules idempotent
SELECT cron.unschedule('nelsy-expire-pending-bookings')
  WHERE EXISTS (
    SELECT 1 FROM cron.job WHERE jobname = 'nelsy-expire-pending-bookings'
  );

SELECT cron.schedule(
  'nelsy-expire-pending-bookings',
  '*/5 * * * *',
  $$
    UPDATE bookings
    SET status = 'expired'
    WHERE status = 'pending'
      AND stripe_payment_intent_id IS NULL
      AND expires_at IS NOT NULL
      AND expires_at < NOW();
  $$
);

-- Rollback:
-- SELECT cron.unschedule('nelsy-expire-pending-bookings');
-- ALTER TABLE bookings DROP COLUMN IF EXISTS expires_at;
-- ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_status_check;
-- ALTER TABLE bookings ADD CONSTRAINT bookings_status_check
--   CHECK (status IN ('pending','confirmed','paid','completed','no_show','cancelled','refunded'));
