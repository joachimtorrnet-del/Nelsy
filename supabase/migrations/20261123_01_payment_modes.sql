-- =============================================================================
-- Payment modes per offer + payments received per booking.
--
-- * services.payment_mode: on_arrival (nothing online), deposit (deposit online,
--   balance on site) or full (everything online). Backfilled to match what
--   create-payment-intent did so far: deposit if one is set, full otherwise.
-- * bookings.payment_status is separate from bookings.status: a confirmed
--   appointment is not necessarily paid, and a paid one was not necessarily
--   paid online.
-- * booking_payments records every amount received (Stripe, cash, card on the
--   pro's own terminal). Cash and external card payments never touch
--   pro_balance / balance_transactions: they are activity, not withdrawable.
-- =============================================================================
BEGIN;

-- ── Services ──────────────────────────────────────────────────────────────────
ALTER TABLE services ADD COLUMN IF NOT EXISTS payment_mode TEXT;
UPDATE services
SET payment_mode = CASE WHEN COALESCE(deposit_amount, 0) > 0 THEN 'deposit' ELSE 'full' END
WHERE payment_mode IS NULL;
ALTER TABLE services ALTER COLUMN payment_mode SET DEFAULT 'deposit';
ALTER TABLE services ALTER COLUMN payment_mode SET NOT NULL;
ALTER TABLE services DROP CONSTRAINT IF EXISTS services_payment_mode_check;
ALTER TABLE services ADD CONSTRAINT services_payment_mode_check
  CHECK (payment_mode IN ('on_arrival', 'deposit', 'full'));

ALTER TABLE services
  ADD COLUMN IF NOT EXISTS on_arrival_methods TEXT[] NOT NULL DEFAULT ARRAY['cash', 'card']::TEXT[];
ALTER TABLE services DROP CONSTRAINT IF EXISTS services_on_arrival_methods_check;
ALTER TABLE services ADD CONSTRAINT services_on_arrival_methods_check
  CHECK (on_arrival_methods <@ ARRAY['cash', 'card']::TEXT[]);

-- ── Bookings ──────────────────────────────────────────────────────────────────
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_mode TEXT;
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_payment_mode_check;
ALTER TABLE bookings ADD CONSTRAINT bookings_payment_mode_check
  CHECK (payment_mode IS NULL OR payment_mode IN ('on_arrival', 'deposit', 'full'));

ALTER TABLE bookings ADD COLUMN IF NOT EXISTS payment_status TEXT NOT NULL DEFAULT 'unpaid';
-- An older, unused payment_status column (all 'pending') already existed in prod
ALTER TABLE bookings ALTER COLUMN payment_status SET DEFAULT 'unpaid';
UPDATE bookings SET payment_status = 'unpaid'
WHERE payment_status IS NULL OR payment_status NOT IN ('unpaid', 'deposit_paid', 'paid', 'refunded');
ALTER TABLE bookings ALTER COLUMN payment_status SET NOT NULL;
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_payment_status_check;
ALTER TABLE bookings ADD CONSTRAINT bookings_payment_status_check
  CHECK (payment_status IN ('unpaid', 'deposit_paid', 'paid', 'refunded'));

-- ── Payments received ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS booking_payments (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id                UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  profile_id                UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  amount                    NUMERIC(10, 2) NOT NULL CHECK (amount > 0),
  method                    TEXT NOT NULL CHECK (method IN ('stripe', 'cash', 'card_external')),
  stripe_payment_intent_id  TEXT UNIQUE,
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_booking_payments_booking ON booking_payments (booking_id);
CREATE INDEX IF NOT EXISTS idx_booking_payments_profile_created ON booking_payments (profile_id, created_at DESC);

ALTER TABLE booking_payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "booking_payments_owner_select" ON booking_payments;
CREATE POLICY "booking_payments_owner_select" ON booking_payments
  FOR SELECT TO authenticated USING (profile_id = auth.uid());

-- Pros record what they collected on site, on their own bookings only.
-- Stripe rows are written server-side (trigger below runs as the table owner).
DROP POLICY IF EXISTS "booking_payments_owner_insert_manual" ON booking_payments;
CREATE POLICY "booking_payments_owner_insert_manual" ON booking_payments
  FOR INSERT TO authenticated
  WITH CHECK (
    profile_id = auth.uid()
    AND method IN ('cash', 'card_external')
    AND stripe_payment_intent_id IS NULL
    AND EXISTS (SELECT 1 FROM public.bookings b WHERE b.id = booking_id AND b.profile_id = auth.uid())
  );

-- Lets a pro undo a manual entry made by mistake; Stripe rows are immutable.
DROP POLICY IF EXISTS "booking_payments_owner_delete_manual" ON booking_payments;
CREATE POLICY "booking_payments_owner_delete_manual" ON booking_payments
  FOR DELETE TO authenticated
  USING (profile_id = auth.uid() AND method <> 'stripe');

REVOKE ALL ON booking_payments FROM anon;
GRANT SELECT, INSERT, DELETE ON booking_payments TO authenticated;

-- ── Keep bookings.payment_status in sync ──────────────────────────────────────
CREATE OR REPLACE FUNCTION public.refresh_booking_payment_status(p_booking_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_total NUMERIC;
  v_paid  NUMERIC;
BEGIN
  SELECT price_total INTO v_total FROM public.bookings WHERE id = p_booking_id;
  IF v_total IS NULL THEN RETURN; END IF;
  SELECT COALESCE(SUM(amount), 0) INTO v_paid FROM public.booking_payments WHERE booking_id = p_booking_id;
  UPDATE public.bookings
  SET payment_status = CASE
    WHEN v_paid >= v_total - 0.005 THEN 'paid'
    WHEN v_paid > 0 THEN 'deposit_paid'
    ELSE 'unpaid'
  END
  WHERE id = p_booking_id AND payment_status <> 'refunded';
END;
$$;
REVOKE EXECUTE ON FUNCTION public.refresh_booking_payment_status(UUID) FROM PUBLIC, anon, authenticated;

-- Manual entries can't exceed what is left to pay
CREATE OR REPLACE FUNCTION public.booking_payments_guard()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_total NUMERIC;
  v_paid  NUMERIC;
BEGIN
  IF NEW.method = 'stripe' THEN RETURN NEW; END IF;
  SELECT price_total INTO v_total FROM public.bookings WHERE id = NEW.booking_id;
  SELECT COALESCE(SUM(amount), 0) INTO v_paid FROM public.booking_payments WHERE booking_id = NEW.booking_id;
  IF NEW.amount > v_total - v_paid + 0.005 THEN
    RAISE EXCEPTION 'Payment exceeds the remaining balance (%).', GREATEST(v_total - v_paid, 0)
      USING ERRCODE = 'check_violation';
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.booking_payments_after_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  PERFORM public.refresh_booking_payment_status(COALESCE(NEW.booking_id, OLD.booking_id));
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS booking_payments_guard ON booking_payments;
CREATE TRIGGER booking_payments_guard
  BEFORE INSERT ON booking_payments
  FOR EACH ROW EXECUTE FUNCTION public.booking_payments_guard();

DROP TRIGGER IF EXISTS booking_payments_sync ON booking_payments;
CREATE TRIGGER booking_payments_sync
  AFTER INSERT OR DELETE ON booking_payments
  FOR EACH ROW EXECUTE FUNCTION public.booking_payments_after_change();

-- ── Online payments: recorded when the webhook marks the booking paid ─────────
-- process_booking_payment (ledger) is untouched: it sets status = 'paid' and
-- the PaymentIntent id; this trigger mirrors that into booking_payments. The
-- amount mirrors create-payment-intent: the deposit if one was taken, else the total.
CREATE OR REPLACE FUNCTION public.bookings_payment_sync()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NEW.status = 'refunded' AND OLD.status IS DISTINCT FROM 'refunded' THEN
    UPDATE public.bookings SET payment_status = 'refunded' WHERE id = NEW.id;
    RETURN NULL;
  END IF;
  IF NEW.status = 'paid' AND OLD.status IS DISTINCT FROM 'paid' AND NEW.stripe_payment_intent_id IS NOT NULL THEN
    INSERT INTO public.booking_payments (booking_id, profile_id, amount, method, stripe_payment_intent_id)
    VALUES (
      NEW.id, NEW.profile_id,
      CASE WHEN COALESCE(NEW.deposit_paid, 0) > 0 THEN NEW.deposit_paid ELSE NEW.price_total END,
      'stripe', NEW.stripe_payment_intent_id
    )
    ON CONFLICT (stripe_payment_intent_id) DO NOTHING;
  END IF;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS bookings_payment_sync ON bookings;
CREATE TRIGGER bookings_payment_sync
  AFTER UPDATE OF status ON bookings
  FOR EACH ROW EXECUTE FUNCTION public.bookings_payment_sync();

-- ── Backfill existing online payments ─────────────────────────────────────────
UPDATE bookings
SET payment_mode = CASE WHEN COALESCE(deposit_paid, 0) > 0 AND deposit_paid < price_total THEN 'deposit' ELSE 'full' END
WHERE payment_mode IS NULL AND stripe_payment_intent_id IS NOT NULL;

INSERT INTO booking_payments (booking_id, profile_id, amount, method, stripe_payment_intent_id, created_at)
SELECT id, profile_id,
       CASE WHEN COALESCE(deposit_paid, 0) > 0 THEN deposit_paid ELSE price_total END,
       'stripe', stripe_payment_intent_id, COALESCE(paid_at, created_at)
FROM bookings
WHERE status IN ('paid', 'completed') AND stripe_payment_intent_id IS NOT NULL
ON CONFLICT (stripe_payment_intent_id) DO NOTHING;

UPDATE bookings SET payment_status = 'refunded' WHERE status = 'refunded';

COMMIT;
