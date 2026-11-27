-- =============================================================================
-- Referral ("Affiliates") program. See docs/features/referrals.md.
--
-- NOT APPLIED. Apply with:
--   npx supabase db query --remote -f supabase/migrations/20261201_01_referrals.sql
-- (never `db push`). Idempotent: safe to run twice.
--
-- Terms live in supabase/functions/_shared/referrals.ts (REFERRAL_TERMS). Two of them are mirrored
-- here and must be changed in both places:
--   referral_min_payout_cents()  = REFERRAL_TERMS.minPayoutCents   (5000 = $50)
--   referral_claim_window()      = REFERRAL_TERMS.claimWindowDays  (7 days)
--
-- Objects
--   profiles.referred_by      who referred this pro (set once, by claim_referral only)
--   referral_codes            one code per referrer (her slug by default), click counter
--   referrals                 one row per referred pro: signed_up | trialing | paying | churned
--   referral_payouts          payout requests: requested | approved | paid (money is sent by hand)
--   referral_commissions      one row per paid invoice: pending | approved | paid | reversed
--
-- Access
--   A referrer reads her own rows (column grants hide Stripe ids and internal notes).
--   No client write on any table: every write goes through SECURITY DEFINER functions
--   (claim at signup, click counter) or the service role (webhook, payout request, founder).
-- =============================================================================
BEGIN;

-- ─── profiles.referred_by ────────────────────────────────────────────────────

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS referred_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'profiles_referred_by_not_self') THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_referred_by_not_self CHECK (referred_by IS NULL OR referred_by <> id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_profiles_referred_by ON public.profiles(referred_by) WHERE referred_by IS NOT NULL;

COMMENT ON COLUMN public.profiles.referred_by IS
  'Referrer (profiles.id). Set once by claim_referral(); clients cannot write it; never equal to id.';

-- SECURITY INVOKER on purpose: current_user must be the caller's role.
--   anon / authenticated (direct API writes): any change to referred_by is ignored.
--   SECURITY DEFINER functions and the service role: may set it once; it can then only go back
--   to NULL (the referrer's profile was deleted), never to another referrer.
CREATE OR REPLACE FUNCTION public.profiles_guard_referred_by()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.referred_by IS NOT NULL AND current_user IN ('anon', 'authenticated') THEN
      NEW.referred_by := NULL;
    END IF;
    RETURN NEW;
  END IF;

  IF NEW.referred_by IS DISTINCT FROM OLD.referred_by THEN
    IF current_user IN ('anon', 'authenticated') THEN
      NEW.referred_by := OLD.referred_by;
    ELSIF OLD.referred_by IS NOT NULL AND NEW.referred_by IS NOT NULL THEN
      RAISE EXCEPTION 'profiles.referred_by is immutable once set';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_guard_referred_by ON public.profiles;
CREATE TRIGGER profiles_guard_referred_by
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.profiles_guard_referred_by();

-- ─── Mirrored terms ──────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.referral_min_payout_cents()
RETURNS integer LANGUAGE sql IMMUTABLE AS $$ SELECT 5000 $$;

CREATE OR REPLACE FUNCTION public.referral_claim_window()
RETURNS interval LANGUAGE sql IMMUTABLE AS $$ SELECT interval '7 days' $$;

-- ─── referral_codes ──────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.referral_codes (
  referrer_id uuid PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  code        text NOT NULL UNIQUE
              CHECK (code = lower(code) AND code ~ '^[a-z0-9][a-z0-9_.-]{1,59}$'),
  clicks      integer NOT NULL DEFAULT 0 CHECK (clicks >= 0),
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- ─── referrals ───────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.referrals (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id    uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  referred_id    uuid NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,
  code           text,
  source         text NOT NULL DEFAULT 'link' CHECK (source IN ('link', 'badge', 'app_handle', 'manual')),
  status         text NOT NULL DEFAULT 'signed_up' CHECK (status IN ('signed_up', 'trialing', 'paying', 'churned')),
  -- Set by the webhook when a payment looks like a self-referral (same email, same card...).
  flagged_reason text,
  first_paid_at  timestamptz,
  created_at     timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT referrals_not_self CHECK (referrer_id <> referred_id)
);

CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON public.referrals(referrer_id, created_at DESC);

-- ─── referral_payouts ────────────────────────────────────────────────────────
-- A request, then a manual payment by the founder. Nothing here moves money.
-- Financial records survive account deletion: referrer_id goes to NULL instead of cascading.

CREATE TABLE IF NOT EXISTS public.referral_payouts (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id        uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  total_cents        integer NOT NULL CHECK (total_cents > 0),
  currency           text NOT NULL DEFAULT 'usd',
  status             text NOT NULL DEFAULT 'requested' CHECK (status IN ('requested', 'approved', 'paid')),
  method             text CHECK (method IS NULL OR method IN ('stripe_transfer', 'bank', 'other')),
  stripe_transfer_id text,
  approved_by        text,
  notes              text,
  requested_at       timestamptz NOT NULL DEFAULT now(),
  approved_at        timestamptz,
  paid_at            timestamptz
);

CREATE INDEX IF NOT EXISTS idx_referral_payouts_referrer ON public.referral_payouts(referrer_id, requested_at DESC);
-- One open request per referrer.
CREATE UNIQUE INDEX IF NOT EXISTS uniq_referral_payouts_open
  ON public.referral_payouts(referrer_id) WHERE status IN ('requested', 'approved');

-- ─── referral_commissions ────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.referral_commissions (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referral_id         uuid REFERENCES public.referrals(id) ON DELETE SET NULL,
  referrer_id         uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  referred_id         uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  -- One row per paid invoice: the unique constraint makes webhook retries harmless.
  stripe_invoice_id   text NOT NULL UNIQUE,
  stripe_charge_id    text,
  -- What the referred pro actually paid on this invoice, without tax.
  amount_cents        integer NOT NULL CHECK (amount_cents >= 0),
  currency            text NOT NULL DEFAULT 'usd',
  commission_rate_bps integer NOT NULL CHECK (commission_rate_bps BETWEEN 0 AND 10000),
  commission_cents    integer NOT NULL CHECK (commission_cents >= 0),
  status              text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'reversed')),
  -- End of the hold: a pending commission can be approved from this date.
  available_at        timestamptz NOT NULL,
  payout_id           uuid REFERENCES public.referral_payouts(id) ON DELETE SET NULL,
  -- For a commission reversed after it was paid: the payout that took the amount back.
  clawback_payout_id  uuid REFERENCES public.referral_payouts(id) ON DELETE SET NULL,
  reversed_at         timestamptz,
  reversal_reason     text,
  created_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_referral_commissions_referrer ON public.referral_commissions(referrer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_referral_commissions_charge ON public.referral_commissions(stripe_charge_id) WHERE stripe_charge_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_referral_commissions_payout ON public.referral_commissions(payout_id) WHERE payout_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_referral_commissions_due ON public.referral_commissions(available_at) WHERE status = 'pending';

-- ─── RLS: read own rows, no client writes ────────────────────────────────────

ALTER TABLE public.referral_codes       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_payouts     ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS referral_codes_owner_select ON public.referral_codes;
CREATE POLICY referral_codes_owner_select ON public.referral_codes
  FOR SELECT TO authenticated USING (referrer_id = auth.uid());

DROP POLICY IF EXISTS referrals_referrer_select ON public.referrals;
CREATE POLICY referrals_referrer_select ON public.referrals
  FOR SELECT TO authenticated USING (referrer_id = auth.uid());

DROP POLICY IF EXISTS referral_commissions_referrer_select ON public.referral_commissions;
CREATE POLICY referral_commissions_referrer_select ON public.referral_commissions
  FOR SELECT TO authenticated USING (referrer_id = auth.uid());

DROP POLICY IF EXISTS referral_payouts_referrer_select ON public.referral_payouts;
CREATE POLICY referral_payouts_referrer_select ON public.referral_payouts
  FOR SELECT TO authenticated USING (referrer_id = auth.uid());

-- No INSERT / UPDATE / DELETE policy and no such grant: the service role (which bypasses RLS) is
-- the only writer. Column grants keep Stripe ids, flags and founder notes out of the API.
REVOKE ALL ON public.referral_codes, public.referrals, public.referral_commissions, public.referral_payouts
  FROM PUBLIC, anon, authenticated;

GRANT SELECT ON public.referral_codes TO authenticated;
GRANT SELECT (id, referrer_id, referred_id, source, status, first_paid_at, created_at)
  ON public.referrals TO authenticated;
GRANT SELECT (id, referral_id, referrer_id, amount_cents, currency, commission_rate_bps, commission_cents,
              status, available_at, payout_id, clawback_payout_id, reversed_at, created_at)
  ON public.referral_commissions TO authenticated;
GRANT SELECT (id, referrer_id, total_cents, currency, status, method, requested_at, approved_at, paid_at)
  ON public.referral_payouts TO authenticated;

GRANT ALL ON public.referral_codes, public.referrals, public.referral_commissions, public.referral_payouts
  TO service_role;

-- ─── Resolve a ref (profile id, code, slug or @handle) to a referrer ─────────

CREATE OR REPLACE FUNCTION public.referral_resolve(p_ref text)
RETURNS uuid
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_ref text := btrim(coalesce(p_ref, ''));
  v_id  uuid;
BEGIN
  IF v_ref = '' OR length(v_ref) > 200 THEN RETURN NULL; END IF;

  -- Studio badge links carry the profile id.
  IF v_ref ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' THEN
    SELECT id INTO v_id FROM profiles WHERE id = v_ref::uuid;
    RETURN v_id;
  END IF;

  v_ref := lower(regexp_replace(v_ref, '^@', ''));
  SELECT referrer_id INTO v_id FROM referral_codes WHERE code = v_ref;
  IF v_id IS NOT NULL THEN RETURN v_id; END IF;

  -- No code row yet: every pro's slug works as her code.
  SELECT id INTO v_id FROM profiles WHERE lower(slug) = v_ref;
  RETURN v_id;
END;
$$;

-- ─── Referral code: the slug by default ──────────────────────────────────────

CREATE OR REPLACE FUNCTION public.referral_ensure_code(p_referrer uuid)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_code text;
  v_slug text;
  v_try  text;
  i      integer := 0;
BEGIN
  SELECT code INTO v_code FROM referral_codes WHERE referrer_id = p_referrer;
  IF v_code IS NOT NULL THEN RETURN v_code; END IF;

  SELECT lower(slug) INTO v_slug FROM profiles WHERE id = p_referrer;
  IF v_slug IS NULL THEN RETURN NULL; END IF;
  IF v_slug !~ '^[a-z0-9][a-z0-9_.-]{1,59}$' THEN
    v_slug := 'pro-' || substr(replace(p_referrer::text, '-', ''), 1, 8);
  END IF;

  LOOP
    -- The slug, unless another referrer already holds it as a code (she had this slug before).
    v_try := CASE WHEN i = 0 THEN v_slug
                  ELSE left(v_slug, 50) || '-' || substr(md5(p_referrer::text || i::text), 1, 4) END;
    BEGIN
      INSERT INTO referral_codes (referrer_id, code) VALUES (p_referrer, v_try);
      RETURN v_try;
    EXCEPTION WHEN unique_violation THEN
      SELECT code INTO v_code FROM referral_codes WHERE referrer_id = p_referrer;
      IF v_code IS NOT NULL THEN RETURN v_code; END IF;
      i := i + 1;
      IF i > 5 THEN RAISE EXCEPTION 'could not create a referral code'; END IF;
    END;
  END LOOP;
END;
$$;

-- The signed-in pro's code, created on first use (opening the Referrals tab = joining the program).
CREATE OR REPLACE FUNCTION public.my_referral_code()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  RETURN referral_ensure_code(auth.uid());
END;
$$;

-- ─── Claim at signup ─────────────────────────────────────────────────────────
-- Called once by the new pro's session with the ref kept from the link she clicked (or the handle
-- she typed in the app). Returns { claimed, reason }. Never raises for a bad ref.

CREATE OR REPLACE FUNCTION public.claim_referral(p_ref text, p_source text DEFAULT 'link')
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_uid      uuid := auth.uid();
  v_referrer uuid;
  v_profile  record;
  v_code     text;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;

  v_referrer := referral_resolve(p_ref);
  IF v_referrer IS NULL THEN RETURN jsonb_build_object('claimed', false, 'reason', 'unknown_ref'); END IF;
  IF v_referrer = v_uid THEN RETURN jsonb_build_object('claimed', false, 'reason', 'self'); END IF;

  SELECT referred_by, created_at, subscription_status INTO v_profile
  FROM profiles WHERE id = v_uid FOR UPDATE;
  IF NOT FOUND THEN RETURN jsonb_build_object('claimed', false, 'reason', 'no_profile'); END IF;
  IF v_profile.referred_by IS NOT NULL THEN RETURN jsonb_build_object('claimed', false, 'reason', 'already_referred'); END IF;
  -- Only new accounts: an existing pro cannot attach herself to a friend afterwards.
  IF v_profile.created_at < now() - referral_claim_window() THEN
    RETURN jsonb_build_object('claimed', false, 'reason', 'too_late');
  END IF;
  -- Two accounts referring each other.
  IF EXISTS (SELECT 1 FROM profiles WHERE id = v_referrer AND referred_by = v_uid) THEN
    RETURN jsonb_build_object('claimed', false, 'reason', 'circular');
  END IF;

  UPDATE profiles SET referred_by = v_referrer WHERE id = v_uid;

  SELECT code INTO v_code FROM referral_codes WHERE referrer_id = v_referrer;
  INSERT INTO referrals (referrer_id, referred_id, code, source, status)
  VALUES (
    v_referrer, v_uid, v_code,
    CASE WHEN p_source IN ('link', 'badge', 'app_handle') THEN p_source ELSE 'link' END,
    CASE WHEN v_profile.subscription_status = 'trialing' THEN 'trialing' ELSE 'signed_up' END
  )
  ON CONFLICT (referred_id) DO NOTHING;

  RETURN jsonb_build_object('claimed', true);
END;
$$;

-- ─── Click counter (public) ──────────────────────────────────────────────────
-- Counts a click for a referrer who already has a code row. No visitor data is stored.
-- Anyone can call it: it is a rough counter shown to the referrer, never used for money.

CREATE OR REPLACE FUNCTION public.referral_click(p_ref text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_referrer uuid := referral_resolve(p_ref);
BEGIN
  IF v_referrer IS NULL THEN RETURN; END IF;
  UPDATE referral_codes SET clicks = clicks + 1 WHERE referrer_id = v_referrer;
END;
$$;

-- ─── The referrer's list: first name + slug only, never an email ─────────────

CREATE OR REPLACE FUNCTION public.my_referrals()
RETURNS TABLE (id uuid, status text, created_at timestamptz, first_paid_at timestamptz, first_name text, slug text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT r.id, r.status, r.created_at, r.first_paid_at,
         NULLIF(split_part(btrim(coalesce(p.full_name, '')), ' ', 1), '') AS first_name,
         p.slug
  FROM referrals r
  JOIN profiles p ON p.id = r.referred_id
  WHERE r.referrer_id = auth.uid()
  ORDER BY r.created_at DESC;
$$;

-- ─── Service role: hold, reversal, payout request, mark paid ─────────────────

-- pending → approved once the hold is over. Returns the number of rows approved.
CREATE OR REPLACE FUNCTION public.referral_approve_due(p_referrer uuid DEFAULT NULL)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count integer;
BEGIN
  UPDATE referral_commissions
  SET status = 'approved'
  WHERE status = 'pending'
    AND available_at <= now()
    AND (p_referrer IS NULL OR referrer_id = p_referrer);
  GET DIAGNOSTICS v_count = ROW_COUNT;
  RETURN v_count;
END;
$$;

-- Full reversal (refund, dispute, self-referral). Idempotent.
--   not in a payout              → reversed
--   in a payout not sent yet     → taken out of it, the payout total is lowered (the payout is
--                                  dropped when nothing is left)
--   already paid                 → reversed, payout_id kept: deducted from her next payout
CREATE OR REPLACE FUNCTION public.referral_reverse_commission(p_commission uuid, p_reason text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_c      referral_commissions%ROWTYPE;
  v_payout referral_payouts%ROWTYPE;
BEGIN
  SELECT * INTO v_c FROM referral_commissions WHERE id = p_commission FOR UPDATE;
  IF NOT FOUND THEN RETURN 'not_found'; END IF;
  IF v_c.status = 'reversed' THEN RETURN 'already_reversed'; END IF;

  IF v_c.payout_id IS NOT NULL THEN
    SELECT * INTO v_payout FROM referral_payouts WHERE id = v_c.payout_id FOR UPDATE;
    IF FOUND AND v_payout.status <> 'paid' THEN
      IF v_payout.total_cents - v_c.commission_cents > 0 THEN
        UPDATE referral_payouts
        SET total_cents = total_cents - v_c.commission_cents,
            notes = concat_ws(E'\n', notes, 'Lowered by ' || v_c.commission_cents || ' cents: commission ' || v_c.id || ' reversed (' || coalesce(p_reason, 'no reason') || ')')
        WHERE id = v_payout.id;
      ELSE
        UPDATE referral_commissions SET payout_id = NULL WHERE payout_id = v_payout.id AND id <> v_c.id;
        UPDATE referral_commissions SET clawback_payout_id = NULL WHERE clawback_payout_id = v_payout.id;
        DELETE FROM referral_payouts WHERE id = v_payout.id;
      END IF;
      v_c.payout_id := NULL;
    END IF;
  END IF;

  UPDATE referral_commissions
  SET status = 'reversed', reversed_at = now(), reversal_reason = p_reason, payout_id = v_c.payout_id
  WHERE id = v_c.id;
  RETURN 'reversed';
END;
$$;

-- Creates the payout request for everything approved and not paid yet, minus amounts to take back.
-- Raises 'payout_already_open' or 'below_minimum'. No money moves.
CREATE OR REPLACE FUNCTION public.referral_request_payout(p_referrer uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_approved integer;
  v_deduct   integer;
  v_total    integer;
  v_payout   referral_payouts%ROWTYPE;
BEGIN
  IF p_referrer IS NULL THEN RAISE EXCEPTION 'referrer required'; END IF;
  -- One request at a time per referrer (double click, two tabs).
  PERFORM pg_advisory_xact_lock(hashtext('referral_payout:' || p_referrer::text));

  IF EXISTS (SELECT 1 FROM referral_payouts WHERE referrer_id = p_referrer AND status IN ('requested', 'approved')) THEN
    RAISE EXCEPTION 'payout_already_open';
  END IF;

  PERFORM referral_approve_due(p_referrer);

  SELECT coalesce(sum(commission_cents), 0) INTO v_approved
  FROM referral_commissions
  WHERE referrer_id = p_referrer AND status = 'approved' AND payout_id IS NULL AND currency = 'usd';

  SELECT coalesce(sum(commission_cents), 0) INTO v_deduct
  FROM referral_commissions
  WHERE referrer_id = p_referrer AND status = 'reversed' AND payout_id IS NOT NULL
    AND clawback_payout_id IS NULL AND currency = 'usd';

  v_total := v_approved - v_deduct;
  IF v_total < referral_min_payout_cents() THEN
    RAISE EXCEPTION 'below_minimum';
  END IF;

  INSERT INTO referral_payouts (referrer_id, total_cents, currency, status)
  VALUES (p_referrer, v_total, 'usd', 'requested')
  RETURNING * INTO v_payout;

  UPDATE referral_commissions SET payout_id = v_payout.id
  WHERE referrer_id = p_referrer AND status = 'approved' AND payout_id IS NULL AND currency = 'usd';

  UPDATE referral_commissions SET clawback_payout_id = v_payout.id
  WHERE referrer_id = p_referrer AND status = 'reversed' AND payout_id IS NOT NULL
    AND payout_id <> v_payout.id AND clawback_payout_id IS NULL AND currency = 'usd';

  RETURN jsonb_build_object(
    'id', v_payout.id, 'total_cents', v_payout.total_cents, 'currency', v_payout.currency,
    'status', v_payout.status, 'requested_at', v_payout.requested_at
  );
END;
$$;

-- The founder ran the payment by hand and records it. See docs/features/referrals.md.
CREATE OR REPLACE FUNCTION public.referral_mark_payout_paid(
  p_payout uuid, p_method text, p_approved_by text, p_stripe_transfer_id text DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_payout referral_payouts%ROWTYPE;
  v_count  integer;
BEGIN
  SELECT * INTO v_payout FROM referral_payouts WHERE id = p_payout FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'payout not found'; END IF;
  IF v_payout.status = 'paid' THEN RAISE EXCEPTION 'payout already paid'; END IF;
  IF coalesce(btrim(p_approved_by), '') = '' THEN RAISE EXCEPTION 'approved_by required'; END IF;

  UPDATE referral_payouts
  SET status = 'paid', method = p_method, stripe_transfer_id = p_stripe_transfer_id,
      approved_by = coalesce(approved_by, p_approved_by), approved_at = coalesce(approved_at, now()), paid_at = now()
  WHERE id = p_payout;

  UPDATE referral_commissions SET status = 'paid' WHERE payout_id = p_payout AND status = 'approved';
  GET DIAGNOSTICS v_count = ROW_COUNT;

  RETURN jsonb_build_object('id', p_payout, 'status', 'paid', 'total_cents', v_payout.total_cents, 'commissions_paid', v_count);
END;
$$;

-- ─── Function privileges ─────────────────────────────────────────────────────

REVOKE EXECUTE ON FUNCTION
  public.profiles_guard_referred_by(),
  public.referral_resolve(text),
  public.referral_ensure_code(uuid),
  public.my_referral_code(),
  public.claim_referral(text, text),
  public.referral_click(text),
  public.my_referrals(),
  public.referral_approve_due(uuid),
  public.referral_reverse_commission(uuid, text),
  public.referral_request_payout(uuid),
  public.referral_mark_payout_paid(uuid, text, text, text)
FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.my_referral_code(), public.claim_referral(text, text), public.my_referrals()
  TO authenticated;
GRANT EXECUTE ON FUNCTION public.referral_click(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION
  public.referral_resolve(text),
  public.referral_ensure_code(uuid),
  public.referral_approve_due(uuid),
  public.referral_reverse_commission(uuid, text),
  public.referral_request_payout(uuid),
  public.referral_mark_payout_paid(uuid, text, text, text)
TO service_role;

COMMIT;
