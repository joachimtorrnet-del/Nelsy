-- =============================================================================
-- Migration: 20261030_03_harden_profile_access.sql
--
-- 1. Restrict SELECT on profiles: drop the open "read everything" policy,
--    replace with a policy that exposes only non-financial columns to anon.
--    Authenticated users may read their own full row.
--
-- 2. Add INSERT protection: prevent any row from being inserted with
--    financial fields pre-populated.
--
-- 3. Reinforce RPC permissions: explicitly revoke EXECUTE from anon and
--    authenticated roles (not just PUBLIC), add SET search_path = '' and
--    schema-qualify all table references to prevent search_path injection.
--    Add financial parameter validation.
-- =============================================================================


-- =============================================================================
-- SECTION 1: Drop the open SELECT policy on profiles
-- The existing "profiles_public_read" / "Public profiles are viewable by everyone"
-- policy does USING (true) which exposes ALL columns including financial ones.
-- We replace it with two separate policies:
--   a) anon + authenticated: may only read the same columns as public_profiles view
--   b) authenticated owner: may read their own full row
-- =============================================================================

-- Drop all existing SELECT policies on profiles
DROP POLICY IF EXISTS "profiles_public_read" ON profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone." ON profiles;
DROP POLICY IF EXISTS "profiles_public_read_v2" ON profiles;

-- Policy A: restricted public read (same projection as public_profiles view)
-- Non-owner reads are blocked from financial columns by checking a safe set.
-- We express this as a row-level policy using a column masking helper view.
-- Since PostgreSQL row-level policies cannot mask columns, we enforce this by:
--   1) Keeping the public_profiles view as the canonical public API
--   2) Making the profiles table itself unreadable to anon
--   3) Allowing authenticated users to read only their own row
-- Public pages MUST use the public_profiles view.

CREATE POLICY "profiles_anon_select_none"
  ON profiles
  FOR SELECT
  TO anon
  USING (false);  -- anon cannot read profiles directly; use public_profiles view

CREATE POLICY "profiles_owner_select"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);


-- =============================================================================
-- SECTION 2: INSERT protection
-- Block any INSERT that pre-populates financial / Stripe columns.
-- Profiles are legitimately created by the auth trigger via service_role;
-- service_role bypasses RLS so legitimate creation is unaffected.
-- This blocks an authenticated user from manually inserting a row with
-- stripe_account_id, subscription_status, etc. already set.
-- =============================================================================

DROP POLICY IF EXISTS "profiles_owner_insert" ON profiles;

CREATE POLICY "profiles_owner_insert"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = id
    AND stripe_account_id IS NULL
    AND stripe_onboarding_complete = false
    AND stripe_customer_id IS NULL
    AND stripe_subscription_id IS NULL
    AND subscription_status IN ('inactive', 'incomplete')
    AND current_period_end IS NULL
    AND trial_ends_at IS NULL
    AND plan IS NULL
  );


-- =============================================================================
-- SECTION 3: Reinforce RPC security
--
-- REVOKE from PUBLIC already revokes from anon/authenticated because PUBLIC
-- is the base role. But explicit revokes are added here for clarity and to
-- guard against future GRANT ... TO authenticated that could re-open access.
--
-- SET search_path = '' prevents search_path injection attacks where an attacker
-- creates an object in a search path before the function body runs.
-- All table references are schema-qualified as public.<table>.
-- =============================================================================

-- Revoke from individual roles explicitly
REVOKE EXECUTE ON FUNCTION add_to_balance(UUID, DECIMAL, UUID, TEXT, TEXT) FROM anon;
REVOKE EXECUTE ON FUNCTION add_to_balance(UUID, DECIMAL, UUID, TEXT, TEXT) FROM authenticated;
REVOKE EXECUTE ON FUNCTION deduct_from_balance(UUID, DECIMAL, UUID, TEXT, TEXT) FROM anon;
REVOKE EXECUTE ON FUNCTION deduct_from_balance(UUID, DECIMAL, UUID, TEXT, TEXT) FROM authenticated;

-- Recreate add_to_balance with search_path hardening, qualified names, and parameter validation
CREATE OR REPLACE FUNCTION add_to_balance(
  p_profile_id   UUID,
  p_amount       DECIMAL,
  p_booking_id   UUID,
  p_type         TEXT,
  p_stripe_payment_id TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Parameter validation: prevent negative or zero credits
  IF p_amount <= 0 THEN
    RAISE EXCEPTION 'add_to_balance: p_amount must be positive, got %', p_amount;
  END IF;
  IF p_profile_id IS NULL THEN
    RAISE EXCEPTION 'add_to_balance: p_profile_id cannot be null';
  END IF;
  IF p_stripe_payment_id IS NULL OR p_stripe_payment_id = '' THEN
    RAISE EXCEPTION 'add_to_balance: p_stripe_payment_id cannot be empty';
  END IF;

  INSERT INTO public.pro_balance (profile_id, available_balance, total_earnings)
  VALUES (p_profile_id, p_amount, p_amount)
  ON CONFLICT (profile_id) DO UPDATE SET
    available_balance = public.pro_balance.available_balance + p_amount,
    total_earnings    = public.pro_balance.total_earnings + p_amount,
    updated_at        = NOW();

  INSERT INTO public.balance_transactions
    (profile_id, booking_id, type, amount, stripe_payment_id)
  VALUES
    (p_profile_id, p_booking_id, p_type, p_amount, p_stripe_payment_id);
END;
$$;

-- Recreate deduct_from_balance with the same hardening
CREATE OR REPLACE FUNCTION deduct_from_balance(
  p_profile_id    UUID,
  p_amount        DECIMAL,
  p_booking_id    UUID,
  p_type          TEXT,
  p_stripe_refund_id TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF p_amount <= 0 THEN
    RAISE EXCEPTION 'deduct_from_balance: p_amount must be positive, got %', p_amount;
  END IF;
  IF p_profile_id IS NULL THEN
    RAISE EXCEPTION 'deduct_from_balance: p_profile_id cannot be null';
  END IF;

  UPDATE public.pro_balance SET
    available_balance = GREATEST(0, available_balance - p_amount),
    total_earnings    = GREATEST(0, total_earnings - p_amount),
    updated_at        = NOW()
  WHERE profile_id = p_profile_id;

  INSERT INTO public.balance_transactions
    (profile_id, booking_id, type, amount, stripe_refund_id)
  VALUES
    (p_profile_id, p_booking_id, p_type, -p_amount, p_stripe_refund_id);
END;
$$;

-- Restore service_role grant (SECURITY DEFINER runs as owner, but service_role must be
-- able to call it; grant explicitly after REVOKE FROM PUBLIC)
GRANT EXECUTE ON FUNCTION add_to_balance(UUID, DECIMAL, UUID, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION deduct_from_balance(UUID, DECIMAL, UUID, TEXT, TEXT) TO service_role;


-- =============================================================================
-- SECTION 4: Harden public_profiles view security
-- Ensure the view respects the new policies by using SECURITY INVOKER so it
-- runs with the caller's privileges (anon or authenticated).
-- SECURITY INVOKER means anon readers cannot see rows blocked by the anon policy.
-- Since profiles_anon_select_none blocks anon from profiles, they cannot read
-- the view's underlying table — but they CAN read the view if it is granted.
-- We want public_profiles to be the ONLY public read path, so we keep it as a
-- SECURITY DEFINER view that exposes only the safe columns.
-- =============================================================================

DROP VIEW IF EXISTS public_profiles;

CREATE VIEW public_profiles
  WITH (security_invoker = false)   -- SECURITY DEFINER behaviour (default)
AS
  SELECT
    -- Identity / display
    id,
    slug,
    full_name,
    salon_name,
    bio,
    logo_url,
    cover_url,
    specialty,
    location,
    -- Social links
    instagram_url,
    tiktok_url,
    pinterest_url,
    website_url,
    -- Design / theme
    color_accent,
    theme_preset,
    -- Operational (needed to gate inactive studios publicly)
    subscription_status,
    timezone,
    plan
  FROM public.profiles;

-- The view owner (postgres/service_role) can read the underlying table.
-- Anon and authenticated are granted SELECT on the view only.
GRANT SELECT ON public_profiles TO anon;
GRANT SELECT ON public_profiles TO authenticated;


-- =============================================================================
-- Rollback (ONLY if no code depends on the new SELECT restrictions):
--
-- DROP POLICY IF EXISTS "profiles_anon_select_none" ON profiles;
-- DROP POLICY IF EXISTS "profiles_owner_select" ON profiles;
-- DROP POLICY IF EXISTS "profiles_owner_insert" ON profiles;
-- CREATE POLICY "profiles_public_read" ON profiles FOR SELECT USING (true);
-- -- Restore original RPCs without search_path (original bodies from migration 20260402)
-- REVOKE EXECUTE ON FUNCTION add_to_balance(UUID,DECIMAL,UUID,TEXT,TEXT) FROM service_role;
-- GRANT EXECUTE ON FUNCTION add_to_balance(UUID,DECIMAL,UUID,TEXT,TEXT) TO PUBLIC;
-- REVOKE EXECUTE ON FUNCTION deduct_from_balance(UUID,DECIMAL,UUID,TEXT,TEXT) FROM service_role;
-- GRANT EXECUTE ON FUNCTION deduct_from_balance(UUID,DECIMAL,UUID,TEXT,TEXT) TO PUBLIC;
-- =============================================================================
