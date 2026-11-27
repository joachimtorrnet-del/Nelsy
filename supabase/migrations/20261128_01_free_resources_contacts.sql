-- =============================================================================
-- Free resources (lead magnets) + contacts list (Creator plan)
--
-- Builds on 20261127_01_digital_products.sql (run that one first).
--
-- products (type 'free_resource') : a free download a pro gives away in exchange
--                                   for an email. Price is always 0.
-- contacts                        : one row per (pro, email). Fed by free resource
--                                   claims and paid product orders. Written only by
--                                   edge functions (service_role) through upsert_contact().
-- free_resource_claims            : one row per (free resource, email). Holds the
--                                   download counter for the /r/:claimId link.
-- rate_limit_hits                 : tiny sliding-window rate limiter for public
--                                   endpoints (rate_limit_hit()).
--
-- RLS: a pro reads their own contacts and claims. anon has no access to any of
-- these tables. Nobody but service_role writes.
--
-- Idempotent: safe to run twice.
-- =============================================================================
BEGIN;

-- ── products: rules for the free_resource type ───────────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
     WHERE conname = 'products_free_resource_is_free' AND conrelid = 'public.products'::regclass
  ) THEN
    ALTER TABLE public.products
      ADD CONSTRAINT products_free_resource_is_free
      CHECK (type <> 'free_resource' OR price_cents = 0);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
     WHERE conname = 'products_active_free_has_file' AND conrelid = 'public.products'::regclass
  ) THEN
    ALTER TABLE public.products
      ADD CONSTRAINT products_active_free_has_file
      CHECK (NOT is_active OR type <> 'free_resource' OR file_path IS NOT NULL);
  END IF;
END $$;

-- ── contacts ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.contacts (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id         uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  -- Always stored lowercase (upsert_contact lowercases it).
  email              text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254 AND email = lower(email)),
  first_name         text CHECK (first_name IS NULL OR char_length(first_name) <= 100),
  -- How this contact first reached the pro. Kept from the first touch.
  source             text NOT NULL CHECK (source IN ('free_resource', 'product_purchase', 'booking')),
  -- Id of the claim / order / booking that created the contact.
  source_ref         text CHECK (source_ref IS NULL OR char_length(source_ref) <= 100),
  -- Explicit opt-in to marketing emails from this pro (unchecked box by default).
  consent_marketing  boolean NOT NULL DEFAULT false,
  consent_at         timestamptz,
  -- Exact wording the contact agreed to (proof of consent).
  consent_text       text CHECK (consent_text IS NULL OR char_length(consent_text) <= 300),
  unsubscribed_at    timestamptz,
  last_activity_at   timestamptz NOT NULL DEFAULT now(),
  created_at         timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS contacts_profile_email_key
  ON public.contacts (profile_id, lower(email));
CREATE INDEX IF NOT EXISTS contacts_profile_created_idx
  ON public.contacts (profile_id, created_at DESC);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS contacts_owner_select ON public.contacts;
CREATE POLICY contacts_owner_select ON public.contacts
  FOR SELECT TO authenticated
  USING (profile_id = auth.uid());

REVOKE ALL ON public.contacts FROM anon;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.contacts FROM authenticated;
GRANT SELECT ON public.contacts TO authenticated;

-- Insert or merge a contact. Never downgrades consent; a new explicit opt-in
-- (p_consent = true) refreshes consent_at / consent_text and clears a previous
-- unsubscribe. Returns the contact id.
CREATE OR REPLACE FUNCTION public.upsert_contact(
  p_profile_id   uuid,
  p_email        text,
  p_first_name   text,
  p_source       text,
  p_source_ref   text,
  p_consent      boolean DEFAULT false,
  p_consent_text text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id      uuid;
  v_email   text := lower(btrim(coalesce(p_email, '')));
  v_name    text := left(nullif(btrim(coalesce(p_first_name, '')), ''), 100);
  v_consent boolean := coalesce(p_consent, false);
BEGIN
  INSERT INTO public.contacts AS c
    (profile_id, email, first_name, source, source_ref, consent_marketing, consent_at, consent_text)
  VALUES
    (p_profile_id, v_email, v_name, p_source, left(p_source_ref, 100), v_consent,
     CASE WHEN v_consent THEN now() END,
     CASE WHEN v_consent THEN left(p_consent_text, 300) END)
  ON CONFLICT (profile_id, lower(email)) DO UPDATE
    SET first_name        = coalesce(c.first_name, EXCLUDED.first_name),
        consent_marketing = c.consent_marketing OR EXCLUDED.consent_marketing,
        consent_at        = CASE WHEN EXCLUDED.consent_marketing THEN now() ELSE c.consent_at END,
        consent_text      = CASE WHEN EXCLUDED.consent_marketing THEN EXCLUDED.consent_text ELSE c.consent_text END,
        unsubscribed_at   = CASE WHEN EXCLUDED.consent_marketing THEN NULL ELSE c.unsubscribed_at END,
        last_activity_at  = now()
  RETURNING c.id INTO v_id;
  RETURN v_id;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.upsert_contact(uuid, text, text, text, text, boolean, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.upsert_contact(uuid, text, text, text, text, boolean, text) TO service_role;

-- ── free_resource_claims ─────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.free_resource_claims (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  -- RESTRICT: a free resource someone claimed is archived, not deleted, so the
  -- emailed link keeps working (same rule as paid orders).
  product_id      uuid NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  profile_id      uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  contact_id      uuid REFERENCES public.contacts(id) ON DELETE SET NULL,
  email           text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254 AND email = lower(email)),
  first_name      text CHECK (first_name IS NULL OR char_length(first_name) <= 100),
  consent_marketing boolean NOT NULL DEFAULT false,
  download_count  integer NOT NULL DEFAULT 0 CHECK (download_count >= 0),
  emailed_at      timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT free_resource_claims_product_email_key UNIQUE (product_id, email)
);

CREATE INDEX IF NOT EXISTS free_resource_claims_profile_created_idx
  ON public.free_resource_claims (profile_id, created_at DESC);

ALTER TABLE public.free_resource_claims ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS free_resource_claims_owner_select ON public.free_resource_claims;
CREATE POLICY free_resource_claims_owner_select ON public.free_resource_claims
  FOR SELECT TO authenticated
  USING (profile_id = auth.uid());

REVOKE ALL ON public.free_resource_claims FROM anon;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.free_resource_claims FROM authenticated;
GRANT SELECT ON public.free_resource_claims TO authenticated;

-- Atomic download claim for a free resource (same contract as claim_product_download).
CREATE OR REPLACE FUNCTION public.claim_free_resource_download(p_claim_id uuid, p_max integer DEFAULT 10)
RETURNS integer
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.free_resource_claims
     SET download_count = download_count + 1
   WHERE id = p_claim_id
     AND download_count < p_max
  RETURNING download_count;
$$;
REVOKE EXECUTE ON FUNCTION public.claim_free_resource_download(uuid, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_free_resource_download(uuid, integer) TO service_role;

-- ── rate_limit_hits (public endpoint throttling) ─────────────────────────────
-- Buckets are opaque strings built by edge functions from hashed values
-- (never a raw IP or email).
CREATE TABLE IF NOT EXISTS public.rate_limit_hits (
  id      bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  bucket  text NOT NULL CHECK (char_length(bucket) <= 200),
  hit_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS rate_limit_hits_bucket_idx ON public.rate_limit_hits (bucket, hit_at);

ALTER TABLE public.rate_limit_hits ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.rate_limit_hits FROM anon, authenticated;

-- Records a hit and returns true when the bucket is still under p_max hits in the
-- last p_window_seconds. Returns false (and records nothing) when over the limit.
CREATE OR REPLACE FUNCTION public.rate_limit_hit(p_bucket text, p_window_seconds integer, p_max integer)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_count integer;
BEGIN
  -- Serialise concurrent hits on the same bucket.
  PERFORM pg_advisory_xact_lock(hashtext('rate_limit:' || p_bucket));

  SELECT count(*) INTO v_count
    FROM public.rate_limit_hits
   WHERE bucket = p_bucket
     AND hit_at > now() - make_interval(secs => p_window_seconds);

  IF v_count >= p_max THEN
    RETURN false;
  END IF;

  INSERT INTO public.rate_limit_hits (bucket) VALUES (p_bucket);

  -- Opportunistic cleanup: nothing needs hits older than 2 days.
  IF random() < 0.02 THEN
    DELETE FROM public.rate_limit_hits WHERE hit_at < now() - interval '2 days';
  END IF;
  RETURN true;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.rate_limit_hit(text, integer, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.rate_limit_hit(text, integer, integer) TO service_role;

COMMIT;
