-- =============================================================================
-- Migration: 20261030_04_atomic_payment_and_public_slots.sql
--
-- 1. process_booking_payment: atomic function that transitions a booking to
--    'paid' and credits the pro balance in a single transaction.
--    Idempotent: safe to call again on a webhook retry.
--
-- 2. get_available_slots: public SECURITY DEFINER function that computes
--    available time slots for a given salon and date without exposing any
--    booking details (client data, booking_id, etc.).
-- =============================================================================


-- =============================================================================
-- SECTION 1: Atomic booking payment processing
--
-- The stripe-webhooks handler previously did:
--   1. UPDATE bookings SET status = 'paid'
--   2. CALL add_to_balance(...)
-- If step 2 failed, the booking was already paid but balance was never credited.
-- On retry, the handler skipped because booking.status != 'pending'.
--
-- This function combines both operations in one transaction and handles retries:
--   - If already fully processed (credit exists)  → returns 'already_processed'
--   - If booking is paid but credit is missing     → credits and returns 'credited'
--   - If booking is pending and no credit          → transitions + credits
--   - If booking is cancelled/expired              → returns 'skip_cancelled'
-- =============================================================================

CREATE OR REPLACE FUNCTION process_booking_payment(
  p_payment_intent_id  TEXT,
  p_booking_id         UUID,
  p_profile_id         UUID,
  p_gross_amount_eur   DECIMAL,   -- paymentIntent.amount / 100
  p_stripe_fee_eur     DECIMAL    -- caller computes: gross * 0.029 + 0.25
)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_booking_status    TEXT;
  v_credit_exists     BOOLEAN;
  v_net               DECIMAL;
BEGIN
  -- Validate inputs
  IF p_payment_intent_id IS NULL OR p_payment_intent_id = '' THEN
    RAISE EXCEPTION 'process_booking_payment: p_payment_intent_id is required';
  END IF;
  IF p_gross_amount_eur <= 0 THEN
    RAISE EXCEPTION 'process_booking_payment: gross amount must be positive';
  END IF;
  IF p_stripe_fee_eur < 0 OR p_stripe_fee_eur >= p_gross_amount_eur THEN
    RAISE EXCEPTION 'process_booking_payment: invalid stripe fee %', p_stripe_fee_eur;
  END IF;

  v_net := ROUND((p_gross_amount_eur - p_stripe_fee_eur)::NUMERIC, 2);

  -- Lock the booking row for this transaction to prevent concurrent processing
  SELECT status INTO v_booking_status
  FROM public.bookings
  WHERE id = p_booking_id
  FOR UPDATE;

  IF v_booking_status IS NULL THEN
    RETURN 'booking_not_found';
  END IF;

  -- Check if balance was already credited for this payment intent
  SELECT EXISTS(
    SELECT 1 FROM public.balance_transactions
    WHERE stripe_payment_id = p_payment_intent_id
  ) INTO v_credit_exists;

  IF v_credit_exists THEN
    RETURN 'already_processed';
  END IF;

  -- Skip non-payable states (but NOT 'paid' — that could be a retry)
  IF v_booking_status IN ('cancelled', 'expired', 'no_show') THEN
    RETURN 'skip_cancelled';
  END IF;

  -- Transition booking to 'paid' (idempotent — UPDATE is a no-op if already paid)
  UPDATE public.bookings
  SET
    status                    = 'paid',
    stripe_payment_intent_id  = p_payment_intent_id,
    paid_at                   = NOW()
  WHERE id = p_booking_id;

  -- Credit the pro balance (also updates pro_balance row)
  PERFORM public.add_to_balance(
    p_profile_id,
    v_net,
    p_booking_id,
    'booking_payment',
    p_payment_intent_id
  );

  RETURN 'credited';
END;
$$;

-- Only service_role (edge functions) may call this function
REVOKE EXECUTE ON FUNCTION process_booking_payment(TEXT, UUID, UUID, DECIMAL, DECIMAL) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION process_booking_payment(TEXT, UUID, UUID, DECIMAL, DECIMAL) FROM anon;
REVOKE EXECUTE ON FUNCTION process_booking_payment(TEXT, UUID, UUID, DECIMAL, DECIMAL) FROM authenticated;
GRANT  EXECUTE ON FUNCTION process_booking_payment(TEXT, UUID, UUID, DECIMAL, DECIMAL) TO service_role;


-- =============================================================================
-- SECTION 2: Public slot availability function
--
-- Replaces direct reads of the bookings table from the public booking page.
-- Returns time strings ('HH:MM') that are AVAILABLE for a given salon + date.
-- Does NOT expose booking IDs, client names, emails or any PII.
--
-- Inputs:
--   p_profile_id  — the professional's profile UUID
--   p_date        — the requested date in the salon's timezone (YYYY-MM-DD)
--   p_timezone    — the salon's IANA timezone (e.g. 'Europe/Paris')
--
-- Returns: setof text ('HH:MM' strings that are still bookable)
-- The caller is expected to filter by service duration on the frontend.
-- =============================================================================

CREATE OR REPLACE FUNCTION get_available_slots(
  p_profile_id  UUID,
  p_date        DATE,
  p_timezone    TEXT DEFAULT 'UTC'
)
RETURNS TABLE (slot_time TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
DECLARE
  v_day_of_week   INTEGER;
  v_open_time     TEXT;
  v_close_time    TEXT;
  v_is_closed     BOOLEAN;
  v_slot          TEXT;
  v_slot_ts       TIMESTAMP WITH TIME ZONE;
  v_h             INTEGER;
  v_m             INTEGER;
BEGIN
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
    RETURN; -- no slots on closed days
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
    RETURN; -- not open on this day
  END IF;

  -- 4. Enumerate 30-minute slots within the window
  v_h := EXTRACT(HOUR FROM v_open_time::TIME)::INTEGER;
  v_m := EXTRACT(MINUTE FROM v_open_time::TIME)::INTEGER;
  -- Round up to next 30-minute boundary
  IF v_m > 0 AND v_m < 30 THEN v_m := 30; ELSIF v_m > 30 THEN v_h := v_h + 1; v_m := 0; END IF;

  LOOP
    v_slot := LPAD(v_h::TEXT, 2, '0') || ':' || LPAD(v_m::TEXT, 2, '0');
    EXIT WHEN v_slot >= v_close_time;

    -- Convert local slot time to UTC timestamp for overlap check
    v_slot_ts := (p_date::TEXT || ' ' || v_slot)::TIMESTAMP AT TIME ZONE p_timezone;

    -- Skip slots in the past
    IF v_slot_ts <= NOW() THEN
      GOTO next_slot;
    END IF;

    -- Check for conflicting active bookings using the GiST range index
    -- We test whether ANY booking overlaps a 1-minute window at the slot start
    -- (the actual duration filter is applied on the frontend per service)
    IF NOT EXISTS (
      SELECT 1 FROM public.bookings
      WHERE profile_id = p_profile_id
        AND status NOT IN ('cancelled', 'no_show', 'expired')
        AND tstzrange(booking_datetime, booking_end_datetime, '[)') && tstzrange(v_slot_ts, v_slot_ts + interval '1 second', '[)')
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

-- Public (anon) may call get_available_slots — it returns no PII
GRANT EXECUTE ON FUNCTION get_available_slots(UUID, DATE, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION get_available_slots(UUID, DATE, TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION get_available_slots(UUID, DATE, TEXT) TO service_role;


-- =============================================================================
-- Rollback:
-- DROP FUNCTION IF EXISTS process_booking_payment(TEXT, UUID, UUID, DECIMAL, DECIMAL);
-- DROP FUNCTION IF EXISTS get_available_slots(UUID, DATE, TEXT);
-- =============================================================================
