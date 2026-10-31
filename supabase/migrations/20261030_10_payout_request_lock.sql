-- =============================================================================
-- Migration: 20261030_10_payout_request_lock.sql
-- Adds a unique constraint on (profile_id, currency) for active payouts,
-- preventing concurrent payout requests for the same currency.
-- A payout is "active" when status IN ('pending', 'in_transit').
-- =============================================================================

-- Partial unique index: only one active (pending/in_transit) payout per
-- profile+currency at a time. This is the DB-level guard against:
-- - Double-click: second request fails at DB level
-- - Concurrent requests: only one INSERT wins
-- - Client retries: server checks existence before calling Stripe
CREATE UNIQUE INDEX IF NOT EXISTS payouts_one_active_per_currency
  ON payouts (profile_id, currency)
  WHERE status IN ('pending', 'in_transit');

-- Also add a request_id column for Stripe idempotency key (stable per UI action)
ALTER TABLE payouts
  ADD COLUMN IF NOT EXISTS request_id UUID;

-- Unique index on request_id when set (prevents replay of exact same request)
CREATE UNIQUE INDEX IF NOT EXISTS payouts_unique_request_id
  ON payouts (request_id)
  WHERE request_id IS NOT NULL;

-- Rollback:
-- DROP INDEX IF EXISTS payouts_one_active_per_currency;
-- DROP INDEX IF EXISTS payouts_unique_request_id;
-- ALTER TABLE payouts DROP COLUMN IF EXISTS request_id;
