-- =============================================================================
-- Migration: 20261030_07_business_currency.sql
--
-- Adds business_currency to profiles so edge functions can use the correct
-- currency for PaymentIntents and Checkout Sessions.
-- The column is set by create-connect-account (service_role) during onboarding.
-- Authenticated users cannot write it directly (protected by UPDATE policy).
-- =============================================================================

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS business_currency CHAR(3);

-- Add business_currency to the financial-field protection on UPDATE.
-- We drop and recreate the policy from migration 01 to include this new column.
DROP POLICY IF EXISTS "profiles_owner_update" ON profiles;

CREATE POLICY "profiles_owner_update"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    -- Financial / Stripe fields must not change via client-side update.
    -- We guard by requiring each field to match the existing row value.
    AND stripe_account_id IS NOT DISTINCT FROM (
      SELECT stripe_account_id FROM public.profiles WHERE id = auth.uid()
    )
    AND stripe_onboarding_complete IS NOT DISTINCT FROM (
      SELECT stripe_onboarding_complete FROM public.profiles WHERE id = auth.uid()
    )
    AND stripe_customer_id IS NOT DISTINCT FROM (
      SELECT stripe_customer_id FROM public.profiles WHERE id = auth.uid()
    )
    AND stripe_subscription_id IS NOT DISTINCT FROM (
      SELECT stripe_subscription_id FROM public.profiles WHERE id = auth.uid()
    )
    AND subscription_status IS NOT DISTINCT FROM (
      SELECT subscription_status FROM public.profiles WHERE id = auth.uid()
    )
    AND current_period_end IS NOT DISTINCT FROM (
      SELECT current_period_end FROM public.profiles WHERE id = auth.uid()
    )
    AND trial_ends_at IS NOT DISTINCT FROM (
      SELECT trial_ends_at FROM public.profiles WHERE id = auth.uid()
    )
    AND plan IS NOT DISTINCT FROM (
      SELECT plan FROM public.profiles WHERE id = auth.uid()
    )
    AND business_currency IS NOT DISTINCT FROM (
      SELECT business_currency FROM public.profiles WHERE id = auth.uid()
    )
    AND business_country IS NOT DISTINCT FROM (
      SELECT business_country FROM public.profiles WHERE id = auth.uid()
    )
  );

-- Also add business_currency to the INSERT protection from migration 03.
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
    AND business_currency IS NULL
  );

-- Expose business_currency in the public_profiles view so studio pages
-- (and the booking confirmation page) can display amounts in the right currency.
DROP VIEW IF EXISTS public_profiles;

CREATE VIEW public_profiles
  WITH (security_invoker = false)
AS
  SELECT
    id, slug, full_name, salon_name, bio, logo_url, cover_url,
    specialty, location,
    instagram_url, tiktok_url, pinterest_url, website_url,
    color_accent, theme_preset,
    subscription_status, timezone, plan,
    business_currency
  FROM public.profiles;

GRANT SELECT ON public_profiles TO anon;
GRANT SELECT ON public_profiles TO authenticated;

-- =============================================================================
-- Rollback:
-- ALTER TABLE profiles DROP COLUMN IF EXISTS business_currency;
-- (restore earlier versions of the policies from migrations 01 and 03)
-- =============================================================================
