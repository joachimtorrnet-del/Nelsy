-- =============================================================================
-- Migration: 20261030_08_booking_currency.sql
--
-- Adds a `currency` column to bookings so each booking permanently records the
-- currency it was charged in, independent of future profile changes.
-- Populated by create-payment-intent at booking creation time.
-- =============================================================================

ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'eur';

-- Index to allow fast refund/webhook lookups by payment_intent + currency together.
CREATE INDEX IF NOT EXISTS idx_bookings_currency ON bookings (currency);

-- =============================================================================
-- Rollback:
-- ALTER TABLE bookings DROP COLUMN IF EXISTS currency;
-- =============================================================================
