-- =============================================================================
-- Migration: 20260402_balance_and_fixes.sql
-- Description: Balance tables, RPC functions, and fixes to existing tables
-- Safe to run multiple times (idempotent)
-- =============================================================================


-- =============================================================================
-- SECTION 1: Fix profiles — add missing columns
-- =============================================================================

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS tiktok_url TEXT,
  ADD COLUMN IF NOT EXISTS color_accent TEXT DEFAULT '#F52B8C',
  ADD COLUMN IF NOT EXISTS notification_preferences JSONB DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT,
  ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
  ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS current_period_end TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS plan TEXT,
  ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;

-- Drop and recreate subscription_status CHECK to expand allowed values
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_subscription_status_check;
ALTER TABLE profiles
  ADD CONSTRAINT profiles_subscription_status_check
  CHECK (subscription_status IN ('trial', 'trialing', 'active', 'past_due', 'cancelled', 'inactive'));


-- =============================================================================
-- SECTION 2: Fix bookings — add 'refunded' status
-- =============================================================================

ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_status_check;
ALTER TABLE bookings
  ADD CONSTRAINT bookings_status_check
  CHECK (status IN ('pending', 'confirmed', 'paid', 'completed', 'no_show', 'cancelled', 'refunded'));


-- =============================================================================
-- SECTION 3: Fix services — allow deposit_amount = 0
-- =============================================================================

ALTER TABLE services DROP CONSTRAINT IF EXISTS services_deposit_amount_check;
ALTER TABLE services
  ADD CONSTRAINT services_deposit_amount_check
  CHECK (deposit_amount >= 0 AND deposit_amount <= price_total);


-- =============================================================================
-- SECTION 4: Fix transactions — add missing columns used by stripe-webhooks
-- =============================================================================

ALTER TABLE transactions
  ADD COLUMN IF NOT EXISTS stripe_invoice_id TEXT,
  ADD COLUMN IF NOT EXISTS stripe_payment_id TEXT,
  ADD COLUMN IF NOT EXISTS stripe_refund_id TEXT,
  ADD COLUMN IF NOT EXISTS amount DECIMAL(10,2),
  ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'eur',
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'paid',
  ADD COLUMN IF NOT EXISTS description TEXT;

-- Drop and recreate type CHECK to expand allowed values
ALTER TABLE transactions DROP CONSTRAINT IF EXISTS transactions_type_check;
ALTER TABLE transactions
  ADD CONSTRAINT transactions_type_check
  CHECK (type IN ('deposit', 'remaining_payment', 'refund', 'payout', 'booking_payment', 'subscription'));


-- =============================================================================
-- SECTION 5: Create pro_balance table
-- =============================================================================

CREATE TABLE IF NOT EXISTS pro_balance (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  available_balance DECIMAL(10,2) DEFAULT 0 NOT NULL,
  pending_balance DECIMAL(10,2) DEFAULT 0 NOT NULL,
  total_earnings DECIMAL(10,2) DEFAULT 0 NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE pro_balance ENABLE ROW LEVEL SECURITY;

-- Owner can read their own balance
DROP POLICY IF EXISTS "pro_balance_owner_select" ON pro_balance;
CREATE POLICY "pro_balance_owner_select"
  ON pro_balance FOR SELECT
  USING (profile_id = auth.uid());

-- Service role bypass: full access for all operations
DROP POLICY IF EXISTS "pro_balance_service_role_all" ON pro_balance;
CREATE POLICY "pro_balance_service_role_all"
  ON pro_balance FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);


-- =============================================================================
-- SECTION 6: Create balance_transactions table (audit trail)
-- =============================================================================

CREATE TABLE IF NOT EXISTS balance_transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('booking_payment', 'refund', 'payout', 'adjustment')),
  amount DECIMAL(10,2) NOT NULL,
  stripe_payment_id TEXT,
  stripe_refund_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE balance_transactions ENABLE ROW LEVEL SECURITY;

-- Owner can read their own balance transactions
DROP POLICY IF EXISTS "balance_transactions_owner_select" ON balance_transactions;
CREATE POLICY "balance_transactions_owner_select"
  ON balance_transactions FOR SELECT
  USING (profile_id = auth.uid());

-- Service role bypass: full access for all operations
DROP POLICY IF EXISTS "balance_transactions_service_role_all" ON balance_transactions;
CREATE POLICY "balance_transactions_service_role_all"
  ON balance_transactions FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);


-- =============================================================================
-- SECTION 7: Create add_to_balance RPC
-- =============================================================================

CREATE OR REPLACE FUNCTION add_to_balance(
  p_profile_id UUID,
  p_amount DECIMAL,
  p_booking_id UUID,
  p_type TEXT,
  p_stripe_payment_id TEXT
)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO pro_balance (profile_id, available_balance, total_earnings)
  VALUES (p_profile_id, p_amount, p_amount)
  ON CONFLICT (profile_id) DO UPDATE SET
    available_balance = pro_balance.available_balance + p_amount,
    total_earnings = pro_balance.total_earnings + p_amount,
    updated_at = NOW();

  INSERT INTO balance_transactions (profile_id, booking_id, type, amount, stripe_payment_id)
  VALUES (p_profile_id, p_booking_id, p_type, p_amount, p_stripe_payment_id);
END;
$$;


-- =============================================================================
-- SECTION 8: Create deduct_from_balance RPC
-- =============================================================================

CREATE OR REPLACE FUNCTION deduct_from_balance(
  p_profile_id UUID,
  p_amount DECIMAL,
  p_booking_id UUID,
  p_type TEXT,
  p_stripe_refund_id TEXT
)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE pro_balance SET
    available_balance = GREATEST(0, available_balance - p_amount),
    total_earnings = GREATEST(0, total_earnings - p_amount),
    updated_at = NOW()
  WHERE profile_id = p_profile_id;

  INSERT INTO balance_transactions (profile_id, booking_id, type, amount, stripe_refund_id)
  VALUES (p_profile_id, p_booking_id, p_type, -p_amount, p_stripe_refund_id);
END;
$$;


-- =============================================================================
-- SECTION 9: Auto-create pro_balance row when profile is created
-- =============================================================================

CREATE OR REPLACE FUNCTION handle_new_profile_balance()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO pro_balance (profile_id, available_balance, pending_balance, total_earnings)
  VALUES (NEW.id, 0, 0, 0)
  ON CONFLICT (profile_id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_profile_created_init_balance ON profiles;
CREATE TRIGGER on_profile_created_init_balance
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_profile_balance();
