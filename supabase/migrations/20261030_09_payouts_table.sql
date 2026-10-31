-- =============================================================================
-- Migration: 20261030_09_payouts_table.sql
-- Track Stripe payouts initiated from Nelsy.
-- A Stripe payout aggregates multiple transfers into one bank deposit.
-- This table is updated by the stripe-webhooks Edge Function.
-- =============================================================================

CREATE TABLE IF NOT EXISTS payouts (
  id                  UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id          UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  stripe_payout_id    TEXT UNIQUE NOT NULL,
  amount              DECIMAL(14,2) NOT NULL,
  currency            TEXT NOT NULL DEFAULT 'eur',
  status              TEXT NOT NULL DEFAULT 'pending'
                        CHECK (status IN ('pending', 'in_transit', 'paid', 'failed', 'canceled')),
  -- Destination is masked by Stripe (e.g. "***6789") — safe to store
  destination_last4   TEXT,
  destination_bank    TEXT,
  estimated_arrival   TIMESTAMP WITH TIME ZONE,
  paid_at             TIMESTAMP WITH TIME ZONE,
  failure_code        TEXT,
  failure_message     TEXT,
  stripe_created_at   TIMESTAMP WITH TIME ZONE,
  created_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at          TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Index for dashboard listing (most recent first per profile)
CREATE INDEX IF NOT EXISTS idx_payouts_profile_created
  ON payouts (profile_id, created_at DESC);

-- Enable RLS
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;

-- Pro can read their own payouts
DROP POLICY IF EXISTS "payouts_owner_select" ON payouts;
CREATE POLICY "payouts_owner_select"
  ON payouts FOR SELECT
  USING (profile_id = auth.uid());

-- Service role has full access (webhooks write here)
DROP POLICY IF EXISTS "payouts_service_role_all" ON payouts;
CREATE POLICY "payouts_service_role_all"
  ON payouts FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_payouts_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS payouts_updated_at ON payouts;
CREATE TRIGGER payouts_updated_at
  BEFORE UPDATE ON payouts
  FOR EACH ROW EXECUTE FUNCTION update_payouts_updated_at();

-- Rollback:
-- DROP TABLE IF EXISTS payouts CASCADE;
