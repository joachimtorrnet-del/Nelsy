-- =============================================================================
-- Migration: 20261030_02_business_country_and_rpc_security.sql
--
-- 1. Add business_country to profiles (explicit country the professional operates in).
--    No default — existing users must set it when they first connect Stripe.
--    FR and PT are the supported markets for Stripe Connect.
--
-- 2. Lock down EXECUTE on financial RPCs.
--    add_to_balance and deduct_from_balance are SECURITY DEFINER but PostgreSQL
--    grants EXECUTE to PUBLIC by default, meaning any browser caller could invoke
--    them directly. Revoke that, grant only to service_role (used by edge functions).
-- =============================================================================


-- =============================================================================
-- SECTION 1: business_country column
-- =============================================================================

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS business_country CHAR(2);

COMMENT ON COLUMN profiles.business_country IS
  'ISO 3166-1 alpha-2 country code of the professional''s business (e.g. FR, PT). '
  'Set once at Stripe Connect creation; never changed after stripe_account_id is set.';


-- =============================================================================
-- SECTION 2: Protect financial RPCs from direct browser calls
--
-- add_to_balance and deduct_from_balance are called exclusively from the
-- stripe-webhooks edge function via service_role. No authenticated or
-- anonymous user should be able to call them directly.
-- =============================================================================

REVOKE EXECUTE ON FUNCTION add_to_balance(UUID, DECIMAL, UUID, TEXT, TEXT) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION deduct_from_balance(UUID, DECIMAL, UUID, TEXT, TEXT) FROM PUBLIC;

-- Grant back to service_role so edge functions retain access.
-- service_role is the Supabase privileged role used by edge functions.
GRANT EXECUTE ON FUNCTION add_to_balance(UUID, DECIMAL, UUID, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION deduct_from_balance(UUID, DECIMAL, UUID, TEXT, TEXT) TO service_role;


-- =============================================================================
-- Rollback:
-- ALTER TABLE profiles DROP COLUMN IF EXISTS business_country;
-- GRANT EXECUTE ON FUNCTION add_to_balance(UUID, DECIMAL, UUID, TEXT, TEXT) TO PUBLIC;
-- GRANT EXECUTE ON FUNCTION deduct_from_balance(UUID, DECIMAL, UUID, TEXT, TEXT) TO PUBLIC;
-- =============================================================================
