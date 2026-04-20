-- ============================================================
-- RLS FIX + SCHEMA PATCHES
-- Run this in the Supabase SQL Editor
-- ============================================================

-- ============================================================
-- 1. VERIFICATION QUERIES (run first to see current state)
-- ============================================================

-- Check which tables have RLS enabled
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- See all existing policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ============================================================
-- 2. ADD MISSING STRIPE COLUMNS TO profiles
-- ============================================================

-- These columns are used by webhooks and onboarding but missing from original schema
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS stripe_subscription_id TEXT,
  ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'trial',
  ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS current_period_end TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS plan TEXT DEFAULT 'pro',
  ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;

-- ============================================================
-- 3. FIX bookings RLS — too permissive INSERT
-- ============================================================

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "bookings_public_insert" ON bookings;

-- New policy: anyone can insert but profile_id must exist in profiles
-- This prevents fake bookings for non-existent profiles
CREATE POLICY "bookings_public_insert"
  ON bookings FOR INSERT
  WITH CHECK (
    profile_id IN (SELECT id FROM profiles)
  );

-- ============================================================
-- 4. FIX services SELECT — owner should see own inactive services
-- ============================================================

-- The current setup: services_public_read (active=true) + services_owner_all (ALL)
-- Problem: services_owner_all covers ALL including SELECT, so owner sees inactive too.
-- But services_public_read blocks other authenticated users from seeing inactive.
-- This is actually CORRECT. No change needed.

-- However, non-owner authenticated users should also see active services.
-- Current policy only checks active=true (no profile restriction), which is correct.

-- ============================================================
-- 5. ADD MISSING profiles INSERT policy
-- ============================================================

-- Needed so the trigger (SECURITY DEFINER) can create profiles on signup.
-- Also allows the auth trigger to work correctly.
-- The trigger already has SECURITY DEFINER so it bypasses RLS,
-- but adding this makes the intent explicit and allows manual inserts in edge cases.

DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;

CREATE POLICY "profiles_insert_own"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================================
-- 6. ADD bookings DELETE policy for owners
-- ============================================================

DROP POLICY IF EXISTS "bookings_owner_delete" ON bookings;

CREATE POLICY "bookings_owner_delete"
  ON bookings FOR DELETE
  USING (profile_id = auth.uid());

-- ============================================================
-- 7. ADD transactions service-role INSERT (for Edge Functions)
-- ============================================================
-- Edge Functions use service_role_key which bypasses RLS entirely.
-- No policy needed. But adding an owner SELECT for completeness is done in schema.sql.

-- ============================================================
-- 8. VERIFY final state
-- ============================================================

SELECT tablename, policyname, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
