-- =============================================================================
-- Migration: 20260905_05_add_booking_overlap_constraint.sql
-- Replace the simple UNIQUE index on (profile_id, booking_datetime) with a
-- proper temporal exclusion constraint using tstzrange.
-- This prevents overlapping bookings even when they have different start times.
-- Requires btree_gist extension and the 'expired' status (from migration 03).
-- =============================================================================

-- ── Pre-checks (run these BEFORE applying) ───────────────────────────────────
-- 1. Verify btree_gist is available:
-- SELECT default_version FROM pg_available_extensions WHERE name = 'btree_gist';

-- 2. Detect existing overlaps (conservative 60-min assumption):
-- SELECT a.id, b.id, a.profile_id, a.booking_datetime, b.booking_datetime
-- FROM bookings a JOIN bookings b
--   ON a.profile_id = b.profile_id AND a.id < b.id
--   AND a.status NOT IN ('cancelled','no_show','expired')
--   AND b.status NOT IN ('cancelled','no_show','expired')
-- WHERE tstzrange(a.booking_datetime, a.booking_datetime + interval '60 min', '[)') &&
--       tstzrange(b.booking_datetime, b.booking_datetime + interval '60 min', '[)');

-- 3. Check for bookings without a service (duration will default to 60):
-- SELECT count(*) FROM bookings WHERE service_id IS NULL
--   AND status NOT IN ('cancelled','no_show','expired');

-- ── 1. Extension ──────────────────────────────────────────────────────────────
-- btree_gist adds GiST index support for scalar types (UUID, int, etc.)
-- enabling the EXCLUDE constraint to combine profile_id (=) with tstzrange (&&).
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- ── 2. Drop the simple unique index from a previous migration ─────────────────
DROP INDEX IF EXISTS bookings_unique_active_slot;

-- ── 3. Add duration_minutes column ───────────────────────────────────────────
-- Snapshot of service.duration_minutes at booking creation time.
-- Critical: must not change if the service duration changes later.
-- Default 60 for historical data that predates this migration.
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS duration_minutes INTEGER NOT NULL DEFAULT 60;

-- Backfill duration from the associated service for existing bookings
UPDATE bookings b
SET duration_minutes = s.duration_minutes
FROM services s
WHERE b.service_id = s.id
  AND b.service_id IS NOT NULL;

-- ── 4. Add booking_end_datetime generated column ──────────────────────────────
-- Computed from booking_datetime + duration_minutes.
-- STORED means it is persisted on disk and updated automatically.
-- make_interval is IMMUTABLE → valid in a generated column expression.
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS booking_end_datetime TIMESTAMP WITH TIME ZONE
  GENERATED ALWAYS AS (
    booking_datetime + make_interval(mins => duration_minutes)
  ) STORED;

-- ── 5. EXCLUDE constraint using GiST on tstzrange ─────────────────────────────
-- Ensures no two active bookings for the same nail tech overlap in time.
-- '[)' = closed-open interval: a booking ending at 11:30 does NOT conflict
--        with a booking starting at 11:30 (back-to-back is allowed).
-- WHERE clause mirrors the application-level conflict check.
ALTER TABLE bookings
  ADD CONSTRAINT bookings_no_overlap
  EXCLUDE USING gist (
    profile_id                                              WITH =,
    tstzrange(booking_datetime, booking_end_datetime, '[)') WITH &&
  )
  WHERE (status NOT IN ('cancelled', 'no_show', 'expired'));

-- ── 6. Index for fast slot availability queries ───────────────────────────────
CREATE INDEX IF NOT EXISTS idx_bookings_slot_range
  ON bookings USING gist (
    profile_id,
    tstzrange(booking_datetime, booking_end_datetime, '[)')
  )
  WHERE status NOT IN ('cancelled', 'no_show', 'expired');

-- Rollback:
-- ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_no_overlap;
-- DROP INDEX IF EXISTS idx_bookings_slot_range;
-- ALTER TABLE bookings DROP COLUMN IF EXISTS booking_end_datetime;
-- ALTER TABLE bookings DROP COLUMN IF EXISTS duration_minutes;
-- DROP EXTENSION IF EXISTS btree_gist;
