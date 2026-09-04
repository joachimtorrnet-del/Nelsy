-- =============================================================================
-- Migration: 20260905_01_harden_booking_rls.sql
-- Remove the permissive public INSERT policy on bookings.
-- Bookings must now go through create-payment-intent (service_role)
-- which validates profile, service, price, and availability server-side.
-- =============================================================================

-- Pre-check: list existing booking policies (informational)
-- SELECT policyname FROM pg_policies WHERE tablename = 'bookings';

-- Drop the permissive public insert policy.
-- After this, anonymous users cannot INSERT directly into bookings.
-- The create-payment-intent Edge Function uses SUPABASE_SERVICE_ROLE_KEY
-- and bypasses RLS entirely — it remains the only valid booking creation path.
DROP POLICY IF EXISTS "bookings_public_insert" ON bookings;

-- Verify owner policies remain intact.
-- bookings_owner_select  : profile_id = auth.uid()  ✓
-- bookings_owner_update  : profile_id = auth.uid()  ✓
-- Both are kept as-is; no change needed.

-- Rollback:
-- CREATE POLICY "bookings_public_insert"
--   ON bookings FOR INSERT WITH CHECK (true);
