-- =============================================================================
-- Online video sessions (1:1 coaching, Creator plan)
--
-- services.location_type : 'in_person' (default, current behaviour) or 'online'.
--                          Public: the studio page shows a "Video call" badge.
-- service_video_links    : the meeting link of an online service (Zoom, Google
--                          Meet, any https URL). Kept OUT of services on purpose:
--                          services is readable by anyone (services_public_read),
--                          and a paid session link must only reach the client
--                          who booked (by email) and the pro (dashboard). No
--                          row = "I'll send the link after booking".
--
-- Gating: only a pro whose profiles.plan includes coaching (Creator, Salon) can
-- save an online service or a video link. Enforced by triggers, so a direct
-- PostgREST call cannot bypass the dashboard gate. profiles.plan is itself
-- protected from client writes (20261030_01_protect_financial_fields).
--
-- Additive only: no change to bookings, booking_payments, balance_transactions,
-- availability or any RPC. Existing services keep 'in_person'.
-- Idempotent: safe to run twice.
-- =============================================================================
BEGIN;

-- ── Helper: does a profiles.plan value include coaching? ─────────────────────
-- Mirrors hasFeature(plan, 'coaching') in src/lib/plans.ts and planHasFeature in
-- supabase/functions/_shared/plans.ts (Creator and Salon tiers).
CREATE OR REPLACE FUNCTION public.plan_has_coaching(p_plan text)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT split_part(lower(coalesce(p_plan, '')), '_', 1) IN ('creator', 'salon');
$$;

-- ── services.location_type ───────────────────────────────────────────────────
ALTER TABLE public.services
  ADD COLUMN IF NOT EXISTS location_type text NOT NULL DEFAULT 'in_person';

ALTER TABLE public.services DROP CONSTRAINT IF EXISTS services_location_type_check;
ALTER TABLE public.services ADD CONSTRAINT services_location_type_check
  CHECK (location_type IN ('in_person', 'online'));

-- Server-side gate: an online service needs a plan with coaching.
CREATE OR REPLACE FUNCTION public.services_enforce_online_plan()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_plan text;
BEGIN
  IF NEW.location_type = 'online' THEN
    SELECT p.plan INTO v_plan FROM public.profiles p WHERE p.id = NEW.profile_id;
    IF NOT public.plan_has_coaching(v_plan) THEN
      RAISE EXCEPTION 'Online sessions are part of the Creator plan'
        USING ERRCODE = 'check_violation', HINT = 'nelsy_online_requires_creator';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.services_enforce_online_plan() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS trg_services_enforce_online_plan ON public.services;
CREATE TRIGGER trg_services_enforce_online_plan
  BEFORE INSERT OR UPDATE OF location_type, profile_id ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.services_enforce_online_plan();

-- ── service_video_links (private) ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.service_video_links (
  service_id  uuid PRIMARY KEY REFERENCES public.services(id) ON DELETE CASCADE,
  profile_id  uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  -- https only, no whitespace or HTML-breaking characters, sane length.
  video_url   text NOT NULL CHECK (
                char_length(video_url) BETWEEN 12 AND 2048
                AND video_url ~ '^https://[^[:space:]<>"''`]+$'
              ),
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS service_video_links_profile_idx
  ON public.service_video_links (profile_id);

-- Keeps profile_id equal to the service owner, stamps updated_at, and applies
-- the same plan gate as online services.
CREATE OR REPLACE FUNCTION public.service_video_links_guard()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_owner uuid;
  v_plan  text;
BEGIN
  SELECT s.profile_id INTO v_owner FROM public.services s WHERE s.id = NEW.service_id;
  IF v_owner IS NULL OR v_owner <> NEW.profile_id THEN
    RAISE EXCEPTION 'Video link must belong to the service owner'
      USING ERRCODE = 'check_violation';
  END IF;
  SELECT p.plan INTO v_plan FROM public.profiles p WHERE p.id = NEW.profile_id;
  IF NOT public.plan_has_coaching(v_plan) THEN
    RAISE EXCEPTION 'Online sessions are part of the Creator plan'
      USING ERRCODE = 'check_violation', HINT = 'nelsy_online_requires_creator';
  END IF;
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.service_video_links_guard() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS trg_service_video_links_guard ON public.service_video_links;
CREATE TRIGGER trg_service_video_links_guard
  BEFORE INSERT OR UPDATE ON public.service_video_links
  FOR EACH ROW EXECUTE FUNCTION public.service_video_links_guard();

-- RLS: the owning pro only. Edge functions read it with service_role for emails
-- and the booking confirmation page. No anon access at all.
ALTER TABLE public.service_video_links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS service_video_links_owner_select ON public.service_video_links;
CREATE POLICY service_video_links_owner_select ON public.service_video_links
  FOR SELECT TO authenticated
  USING (profile_id = auth.uid());

DROP POLICY IF EXISTS service_video_links_owner_insert ON public.service_video_links;
CREATE POLICY service_video_links_owner_insert ON public.service_video_links
  FOR INSERT TO authenticated
  WITH CHECK (profile_id = auth.uid());

DROP POLICY IF EXISTS service_video_links_owner_update ON public.service_video_links;
CREATE POLICY service_video_links_owner_update ON public.service_video_links
  FOR UPDATE TO authenticated
  USING (profile_id = auth.uid())
  WITH CHECK (profile_id = auth.uid());

DROP POLICY IF EXISTS service_video_links_owner_delete ON public.service_video_links;
CREATE POLICY service_video_links_owner_delete ON public.service_video_links
  FOR DELETE TO authenticated
  USING (profile_id = auth.uid());

REVOKE ALL ON public.service_video_links FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_video_links TO authenticated;

COMMIT;
