-- =============================================================================
-- Migration: 20261030_05_timezone_defaults.sql
--
-- The original timezone column was added with DEFAULT 'Europe/Paris'.
-- This is wrong for Portuguese professionals (Europe/Lisbon).
-- We:
--   1. Change the column DEFAULT to NULL so new rows without a timezone
--      are explicit about the absence of a value.
--   2. Preserve ALL existing timezone values — do NOT overwrite them.
--   3. Existing rows that have 'Europe/Paris' keep it unchanged; only the
--      server knows whether that was intentional or the accidental default.
--      The create-connect-account edge function now sets timezone based on
--      business_country at account creation time.
--   4. Update the column NOT NULL constraint to allow NULL temporarily
--      so the application can distinguish "not yet set" from "set to Paris".
--
-- NOTE: The create-payment-intent edge function already falls back to 'UTC'
--       when timezone is NULL (?? 'UTC'). This is a safe server fallback.
--       The professional sets their timezone in account settings.
-- =============================================================================

-- Change default from 'Europe/Paris' to NULL
-- This affects only NEW rows going forward; existing rows are unchanged.
ALTER TABLE profiles
  ALTER COLUMN timezone DROP DEFAULT;

ALTER TABLE profiles
  ALTER COLUMN timezone DROP NOT NULL;

-- The column is now nullable. Existing rows retain their value.
-- The application should treat NULL timezone as "not configured" and
-- prompt the professional to set it.

COMMENT ON COLUMN profiles.timezone IS
  'IANA timezone of the salon (e.g. Europe/Paris, Europe/Lisbon). '
  'NULL means the professional has not yet configured their timezone. '
  'The server falls back to UTC when this is NULL.';

-- =============================================================================
-- Rollback:
-- ALTER TABLE profiles ALTER COLUMN timezone SET DEFAULT 'Europe/Paris';
-- ALTER TABLE profiles ALTER COLUMN timezone SET NOT NULL;
-- UPDATE profiles SET timezone = 'Europe/Paris' WHERE timezone IS NULL;
-- =============================================================================
