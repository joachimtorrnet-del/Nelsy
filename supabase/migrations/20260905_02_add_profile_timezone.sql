-- =============================================================================
-- Migration: 20260905_02_add_profile_timezone.sql
-- Add timezone column to profiles so the server can correctly interpret
-- booking_datetime values in the salon's local time when checking
-- availabilities, closed_dates, and day_of_week constraints.
-- =============================================================================

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS timezone TEXT NOT NULL DEFAULT 'Europe/Paris';

-- Rollback:
-- ALTER TABLE profiles DROP COLUMN IF EXISTS timezone;
