-- =============================================================================
-- Drop legacy permissive policies that OR'ed away the hardened ones.
-- Permissive policies combine with OR, so each of these voided a stricter rule.
-- =============================================================================
BEGIN;

-- Let pros rewrite subscription_status / stripe_account_id / business_currency
-- (profiles_owner_update keeps normal profile edits working).
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Profiles are created by the on_auth_user_created trigger (SECURITY DEFINER);
-- these allowed inserting a profile with any subscription/Stripe values.
DROP POLICY IF EXISTS "Enable insert for authentication" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;

-- Anyone (anon key) could insert bookings with any status/price for any pro.
-- Public bookings go through create-payment-intent (service_role); pros adding
-- an appointment by hand only insert their own.
DROP POLICY IF EXISTS "Anyone can create bookings" ON bookings;
DROP POLICY IF EXISTS "bookings_owner_insert" ON bookings;
CREATE POLICY "bookings_owner_insert"
  ON bookings FOR INSERT TO authenticated
  WITH CHECK (profile_id = auth.uid());

-- Anyone could write ledger rows (and pre-empt process_booking_payment).
DROP POLICY IF EXISTS "System can insert transactions" ON balance_transactions;

-- Exposed inactive/draft services; services_public_read (active only) remains.
DROP POLICY IF EXISTS "Public can view services" ON services;

-- Legacy 6-arg overload made the webhook's named-arg refund call ambiguous
-- (so refunds were never deducted) and writes a column that no longer exists.
DROP FUNCTION IF EXISTS deduct_from_balance(uuid, numeric, uuid, text, text, text);

COMMIT;
