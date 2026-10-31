-- =============================================================================
-- Migration: 20261030_06_fix_slot_duration_check.sql
--
-- Fixes two bugs in get_available_slots (introduced in migration 04):
--
-- BUG 1 — Wrong overlap window:
--   The original check used a 1-second point probe (v_slot_ts + interval '1 second').
--   For a 45-min service at 10:00, a booking at 10:35 occupies [10:35, 11:05).
--   The 1-second probe at 10:00 does NOT intersect [10:35, 11:05), so 10:00 was
--   returned as "available" — but a 45-min booking at 10:00 would conflict.
--   The DB EXCLUDE constraint rejects the INSERT, causing a checkout error after
--   the user has already filled in their details. Affected durations: 45, 75 min
--   (any non-multiple of 30 that is offered by the service editor).
--
-- BUG 2 — End-of-day slot not excluded:
--   The loop exited when slot_start >= close_time, but did not check that
--   slot_start + duration_minutes <= close_time. A 90-min service at 17:30
--   (close 18:00) was returned, even though the service ends at 19:00.
--
-- FIX:
--   Add p_duration_minutes parameter (default 30 for backwards compatibility).
--   Use the full duration in the tstzrange overlap check.
--   Exit the loop when slot_start + duration > close_time.
-- =============================================================================

CREATE OR REPLACE FUNCTION get_available_slots(
  p_profile_id       UUID,
  p_date             DATE,
  p_timezone         TEXT    DEFAULT 'UTC',
  p_duration_minutes INTEGER DEFAULT 30
)
RETURNS TABLE (slot_time TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
DECLARE
  v_day_of_week  INTEGER;
  v_open_time    TEXT;
  v_close_time   TEXT;
  v_is_closed    BOOLEAN;
  v_slot         TEXT;
  v_slot_ts      TIMESTAMP WITH TIME ZONE;
  v_slot_end_ts  TIMESTAMP WITH TIME ZONE;
  v_h            INTEGER;
  v_m            INTEGER;
  v_close_h      INTEGER;
  v_close_m      INTEGER;
  v_close_mins   INTEGER;   -- close_time in minutes-since-midnight
BEGIN
  -- Validate duration
  IF p_duration_minutes <= 0 THEN
    RAISE EXCEPTION 'get_available_slots: p_duration_minutes must be positive, got %', p_duration_minutes;
  END IF;

  -- 1. Day of week in the salon's timezone (0=Sun … 6=Sat)
  SELECT EXTRACT(DOW FROM (p_date::TEXT || ' 00:00:00')::TIMESTAMP AT TIME ZONE p_timezone)::INTEGER
  INTO v_day_of_week;

  -- 2. Check closed_dates
  SELECT EXISTS(
    SELECT 1 FROM public.closed_dates
    WHERE profile_id = p_profile_id
      AND closed_date = p_date
  ) INTO v_is_closed;

  IF v_is_closed THEN
    RETURN;
  END IF;

  -- 3. Fetch availability window for this day of week
  SELECT a.start_time::TEXT, a.end_time::TEXT
  INTO v_open_time, v_close_time
  FROM public.availabilities a
  WHERE a.profile_id = p_profile_id
    AND a.day_of_week = v_day_of_week
    AND a.active = true
  LIMIT 1;

  IF v_open_time IS NULL THEN
    RETURN;
  END IF;

  -- Pre-compute close time in minutes-since-midnight for the end-of-day check
  v_close_h    := EXTRACT(HOUR   FROM v_close_time::TIME)::INTEGER;
  v_close_m    := EXTRACT(MINUTE FROM v_close_time::TIME)::INTEGER;
  v_close_mins := v_close_h * 60 + v_close_m;

  -- 4. Enumerate 30-minute slots within the window
  v_h := EXTRACT(HOUR   FROM v_open_time::TIME)::INTEGER;
  v_m := EXTRACT(MINUTE FROM v_open_time::TIME)::INTEGER;
  -- Round up to nearest 30-minute boundary
  IF v_m > 0 AND v_m < 30 THEN v_m := 30; ELSIF v_m > 30 THEN v_h := v_h + 1; v_m := 0; END IF;

  LOOP
    v_slot := LPAD(v_h::TEXT, 2, '0') || ':' || LPAD(v_m::TEXT, 2, '0');

    -- Exit when slot start is at or past closing, OR when slot + duration exceeds closing
    EXIT WHEN (v_h * 60 + v_m) >= v_close_mins
           OR (v_h * 60 + v_m + p_duration_minutes) > v_close_mins;

    -- Convert slot start to UTC for overlap check
    v_slot_ts    := (p_date::TEXT || ' ' || v_slot)::TIMESTAMP AT TIME ZONE p_timezone;
    v_slot_end_ts := v_slot_ts + make_interval(mins => p_duration_minutes);

    -- Skip slots that have already started
    IF v_slot_ts <= NOW() THEN
      GOTO next_slot;
    END IF;

    -- Check for conflicting bookings: does any active booking overlap [slot_start, slot_start+duration)?
    -- Previously checked only a 1-second point — this was wrong for durations > 30 min.
    IF NOT EXISTS (
      SELECT 1 FROM public.bookings
      WHERE profile_id = p_profile_id
        AND status NOT IN ('cancelled', 'no_show', 'expired')
        AND tstzrange(booking_datetime, booking_end_datetime, '[)') &&
            tstzrange(v_slot_ts, v_slot_end_ts, '[)')
    ) THEN
      slot_time := v_slot;
      RETURN NEXT;
    END IF;

    <<next_slot>>
    v_m := v_m + 30;
    IF v_m >= 60 THEN v_m := v_m - 60; v_h := v_h + 1; END IF;
  END LOOP;

  RETURN;
END;
$$;

-- Grants remain the same: anon/authenticated/service_role may call this function
GRANT EXECUTE ON FUNCTION get_available_slots(UUID, DATE, TEXT, INTEGER) TO anon;
GRANT EXECUTE ON FUNCTION get_available_slots(UUID, DATE, TEXT, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION get_available_slots(UUID, DATE, TEXT, INTEGER) TO service_role;

-- Drop the old 3-argument signature from migration 04 to avoid ambiguity
-- (the new signature has p_duration_minutes with DEFAULT 30, so callers that
-- pass only 3 args will still work with the overloaded resolution, but
-- removing the old one prevents confusion.)
DROP FUNCTION IF EXISTS get_available_slots(UUID, DATE, TEXT);


-- =============================================================================
-- Rollback:
-- DROP FUNCTION IF EXISTS get_available_slots(UUID, DATE, TEXT, INTEGER);
-- (restore migration 04 version with 3-argument signature)
-- =============================================================================
