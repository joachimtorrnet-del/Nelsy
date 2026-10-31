-- =============================================================================
-- Migration: 20261030_01_protect_financial_fields.sql
-- Protect financial/Stripe columns on profiles from direct user writes.
-- These columns must only be written by server-side edge functions via
-- service_role. A user authenticating with the anon/JWT key cannot modify
-- them even if they construct a manual SQL request.
--
-- Also creates a public_profiles view to avoid leaking financial data
-- through the unrestricted SELECT policy.
-- =============================================================================


-- =============================================================================
-- SECTION 1: Harden profiles UPDATE policy
-- Replace the open "owner can update anything" policy with one that
-- explicitly forbids changes to Stripe / subscription / financial columns.
-- The WITH CHECK subquery re-reads the current DB values and ensures the
-- incoming row does not change any of the protected columns.
-- =============================================================================

DROP POLICY IF EXISTS "profiles_owner_update" ON profiles;

-- We keep the USING clause (auth.uid() = id) so the user can still
-- update their own profile. The WITH CHECK clause enforces that none
-- of the sensitive fields differ from what is currently in the DB.
CREATE POLICY "profiles_owner_update"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    -- Stripe Connect fields
    AND stripe_account_id IS NOT DISTINCT FROM (
      SELECT stripe_account_id FROM profiles WHERE profiles.id = auth.uid()
    )
    AND stripe_onboarding_complete IS NOT DISTINCT FROM (
      SELECT stripe_onboarding_complete FROM profiles WHERE profiles.id = auth.uid()
    )
    -- Stripe Billing / subscription fields
    AND stripe_customer_id IS NOT DISTINCT FROM (
      SELECT stripe_customer_id FROM profiles WHERE profiles.id = auth.uid()
    )
    AND stripe_subscription_id IS NOT DISTINCT FROM (
      SELECT stripe_subscription_id FROM profiles WHERE profiles.id = auth.uid()
    )
    AND subscription_status IS NOT DISTINCT FROM (
      SELECT subscription_status FROM profiles WHERE profiles.id = auth.uid()
    )
    AND current_period_end IS NOT DISTINCT FROM (
      SELECT current_period_end FROM profiles WHERE profiles.id = auth.uid()
    )
    AND trial_ends_at IS NOT DISTINCT FROM (
      SELECT trial_ends_at FROM profiles WHERE profiles.id = auth.uid()
    )
    AND plan IS NOT DISTINCT FROM (
      SELECT plan FROM profiles WHERE profiles.id = auth.uid()
    )
  );

-- service_role bypasses RLS entirely — no separate policy needed for
-- edge functions that legitimately write these fields.


-- =============================================================================
-- SECTION 2: Create public_profiles view
-- The existing profiles_public_read policy does FOR SELECT USING (true)
-- which exposes ALL columns including financial ones to any anon query.
-- This view limits what the public can read.
-- Callers should SELECT from public_profiles for public-facing pages.
-- =============================================================================

DROP VIEW IF EXISTS public_profiles;

CREATE VIEW public_profiles AS
  SELECT
    id,
    slug,
    full_name,
    salon_name,
    bio,
    logo_url,
    instagram_url,
    tiktok_url,
    color_accent,
    timezone,
    plan
  FROM profiles;

-- Grant read access to anon and authenticated roles
GRANT SELECT ON public_profiles TO anon;
GRANT SELECT ON public_profiles TO authenticated;


-- =============================================================================
-- SECTION 3: Add booking_session_token column to bookings
-- Used by create-payment-intent (LOT 3) to prevent one client's
-- PaymentIntent from being returned to a different client booking the same slot.
-- =============================================================================

ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS booking_session_token UUID;

-- Index for fast lookup by token during idempotency check
CREATE INDEX IF NOT EXISTS idx_bookings_session_token
  ON bookings (booking_session_token)
  WHERE booking_session_token IS NOT NULL;


-- =============================================================================
-- Rollback:
-- DROP INDEX IF EXISTS idx_bookings_session_token;
-- ALTER TABLE bookings DROP COLUMN IF EXISTS booking_session_token;
-- DROP VIEW IF EXISTS public_profiles;
-- REVOKE SELECT ON public_profiles FROM anon;
-- REVOKE SELECT ON public_profiles FROM authenticated;
-- DROP POLICY IF EXISTS "profiles_owner_update" ON profiles;
-- CREATE POLICY "profiles_owner_update"
--   ON profiles FOR UPDATE USING (auth.uid() = id);
-- =============================================================================
