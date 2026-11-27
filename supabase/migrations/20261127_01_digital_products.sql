-- =============================================================================
-- Digital products (Creator plan)
--
-- products        : what a pro sells from their studio page. `type` is 'digital'
--                   today; 'course', 'coaching', 'membership' and 'free_resource'
--                   are reserved for later features that reuse this table.
-- product_orders  : one row per checkout. Written only by edge functions
--                   (service_role): create-product-checkout inserts 'pending',
--                   stripe-webhooks marks 'paid' / 'refunded'.
-- public_products : read-only view for the public studio page (same pattern as
--                   public_profiles: security_invoker = false, SELECT only).
--
-- Storage:
--   product-files  (PRIVATE, 100 MB) : the deliverable. Served only through
--                                      short-lived signed URLs (get-product-download).
--   product-covers (public, 5 MB)    : cover images shown on the studio page.
--   Objects live under "<profile_id>/..." and pros can only write their own folder.
--
-- Idempotent: safe to run twice.
-- =============================================================================
BEGIN;

-- ── Helper: does a profiles.plan value include digital products? ─────────────
-- Mirrors hasFeature(plan, 'digital_products') in src/lib/plans.ts and
-- planHasFeature in supabase/functions/_shared/plans.ts (Creator and Salon tiers).
CREATE OR REPLACE FUNCTION public.plan_has_digital_products(p_plan text)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT split_part(lower(coalesce(p_plan, '')), '_', 1) IN ('creator', 'salon');
$$;

-- ── products ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.products (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id       uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type             text NOT NULL DEFAULT 'digital'
                     CHECK (type IN ('digital', 'course', 'coaching', 'membership', 'free_resource')),
  title            text NOT NULL CHECK (char_length(btrim(title)) BETWEEN 1 AND 120),
  description      text CHECK (description IS NULL OR char_length(description) <= 5000),
  -- Smallest currency unit, as Stripe expects (cents; whole units for JPY/KRW).
  price_cents      integer NOT NULL DEFAULT 0 CHECK (price_cents >= 0 AND price_cents <= 100000000),
  -- Forced to the pro's business currency by trg_products_sync_currency.
  currency         text NOT NULL DEFAULT 'eur' CHECK (currency ~ '^[a-z]{3}$'),
  cover_url        text CHECK (cover_url IS NULL OR char_length(cover_url) <= 2048),
  -- Object path inside the private product-files bucket. Must sit in the pro's own
  -- folder so a pro can never point a product at someone else's file.
  file_path        text CHECK (file_path IS NULL OR file_path LIKE profile_id::text || '/%'),
  file_name        text CHECK (file_name IS NULL OR char_length(file_name) <= 255),
  file_size_bytes  bigint CHECK (file_size_bytes IS NULL OR file_size_bytes >= 0),
  -- Type-specific settings for later product types (course modules, coaching slots...).
  settings         jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_active        boolean NOT NULL DEFAULT false,
  position         integer NOT NULL DEFAULT 0,
  archived_at      timestamptz,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  -- A digital product cannot be published without its file.
  CONSTRAINT products_active_digital_has_file
    CHECK (NOT is_active OR type <> 'digital' OR file_path IS NOT NULL),
  -- Paid types need a price. Only free_resource may be 0.
  CONSTRAINT products_active_has_price
    CHECK (NOT is_active OR type = 'free_resource' OR price_cents > 0)
);

CREATE INDEX IF NOT EXISTS products_profile_position_idx
  ON public.products (profile_id, position, created_at);
CREATE INDEX IF NOT EXISTS products_profile_active_idx
  ON public.products (profile_id) WHERE is_active AND archived_at IS NULL;

-- updated_at
CREATE OR REPLACE FUNCTION public.products_touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_products_touch_updated_at ON public.products;
CREATE TRIGGER trg_products_touch_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.products_touch_updated_at();

-- Currency always follows the pro's business currency (the Stripe account currency),
-- so the client can never pick a different currency for the charge.
CREATE OR REPLACE FUNCTION public.products_sync_currency()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  SELECT lower(coalesce(p.business_currency, 'eur'))
    INTO NEW.currency
    FROM public.profiles p
   WHERE p.id = NEW.profile_id;
  NEW.currency := coalesce(NEW.currency, 'eur');
  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.products_sync_currency() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS trg_products_sync_currency ON public.products;
CREATE TRIGGER trg_products_sync_currency
  BEFORE INSERT OR UPDATE OF currency, profile_id ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.products_sync_currency();

-- RLS: pros manage their own rows. No public policy on the table itself:
-- the public reads public_products (which hides file_path / file_name).
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS products_owner_select ON public.products;
CREATE POLICY products_owner_select ON public.products
  FOR SELECT TO authenticated
  USING (profile_id = auth.uid());

DROP POLICY IF EXISTS products_owner_insert ON public.products;
CREATE POLICY products_owner_insert ON public.products
  FOR INSERT TO authenticated
  WITH CHECK (profile_id = auth.uid());

DROP POLICY IF EXISTS products_owner_update ON public.products;
CREATE POLICY products_owner_update ON public.products
  FOR UPDATE TO authenticated
  USING (profile_id = auth.uid())
  WITH CHECK (profile_id = auth.uid());

DROP POLICY IF EXISTS products_owner_delete ON public.products;
CREATE POLICY products_owner_delete ON public.products
  FOR DELETE TO authenticated
  USING (profile_id = auth.uid());

REVOKE ALL ON public.products FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;

-- ── public_products (public read model) ──────────────────────────────────────
-- Active, non-archived products of published studios whose plan includes
-- digital products. Never exposes file_path or file_name.
CREATE OR REPLACE VIEW public.public_products
  WITH (security_invoker = false)
AS
  SELECT
    pr.id, pr.profile_id, pr.type, pr.title, pr.description,
    pr.price_cents, pr.currency, pr.cover_url, pr.position, pr.created_at
  FROM public.products pr
  JOIN public.profiles p ON p.id = pr.profile_id
  WHERE pr.is_active
    AND pr.archived_at IS NULL
    AND p.subscription_status IS NOT NULL
    AND p.subscription_status NOT IN ('inactive', 'incomplete', 'canceled', 'cancelled')
    AND public.plan_has_digital_products(p.plan);

REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.public_products FROM anon, authenticated;
GRANT SELECT ON public.public_products TO anon, authenticated;

-- ── product_orders ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.product_orders (
  id                        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id                uuid NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
  profile_id                uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  buyer_email               text NOT NULL CHECK (char_length(buyer_email) BETWEEN 3 AND 254),
  buyer_name                text CHECK (buyer_name IS NULL OR char_length(buyer_name) <= 100),
  amount_cents              integer NOT NULL CHECK (amount_cents >= 0),
  currency                  text NOT NULL CHECK (currency ~ '^[a-z]{3}$'),
  stripe_payment_intent_id  text UNIQUE,
  stripe_account_id         text,
  status                    text NOT NULL DEFAULT 'pending'
                              CHECK (status IN ('pending', 'paid', 'refunded')),
  download_count            integer NOT NULL DEFAULT 0 CHECK (download_count >= 0),
  paid_at                   timestamptz,
  refunded_at               timestamptz,
  -- Set once the buyer + pro emails went out (webhook idempotency for emails).
  notified_at               timestamptz,
  created_at                timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS product_orders_profile_created_idx
  ON public.product_orders (profile_id, created_at DESC);
CREATE INDEX IF NOT EXISTS product_orders_product_idx
  ON public.product_orders (product_id);
CREATE INDEX IF NOT EXISTS product_orders_buyer_email_idx
  ON public.product_orders (lower(buyer_email));

-- RLS: the owning pro can read. Nobody but service_role writes.
ALTER TABLE public.product_orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS product_orders_owner_select ON public.product_orders;
CREATE POLICY product_orders_owner_select ON public.product_orders
  FOR SELECT TO authenticated
  USING (profile_id = auth.uid());

REVOKE ALL ON public.product_orders FROM anon;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.product_orders FROM authenticated;
GRANT SELECT ON public.product_orders TO authenticated;

-- Atomic download claim: increments download_count only for a paid order still
-- under the cap. Returns the new count, or NULL when nothing was claimed.
CREATE OR REPLACE FUNCTION public.claim_product_download(p_order_id uuid, p_max integer DEFAULT 10)
RETURNS integer
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.product_orders
     SET download_count = download_count + 1
   WHERE id = p_order_id
     AND status = 'paid'
     AND download_count < p_max
  RETURNING download_count;
$$;
REVOKE EXECUTE ON FUNCTION public.claim_product_download(uuid, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_product_download(uuid, integer) TO service_role;

-- ── Storage buckets ──────────────────────────────────────────────────────────
-- NOTE: the project-wide "Upload file size limit" (Storage settings) must be at
-- least 100 MB, otherwise it caps product-files below the bucket limit.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('product-files', 'product-files', false, 104857600, NULL)
ON CONFLICT (id) DO UPDATE
  SET public = false,
      file_size_limit = EXCLUDED.file_size_limit;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('product-covers', 'product-covers', true, 5242880,
        ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO UPDATE
  SET public = true,
      file_size_limit = EXCLUDED.file_size_limit,
      allowed_mime_types = EXCLUDED.allowed_mime_types;

-- product-files: private. A pro reads/writes only "<their uid>/...".
-- No anon policy: buyers only ever get signed URLs minted by service_role.
DROP POLICY IF EXISTS product_files_owner_select ON storage.objects;
CREATE POLICY product_files_owner_select ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'product-files' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS product_files_owner_insert ON storage.objects;
CREATE POLICY product_files_owner_insert ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'product-files' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS product_files_owner_update ON storage.objects;
CREATE POLICY product_files_owner_update ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'product-files' AND (storage.foldername(name))[1] = auth.uid()::text)
  WITH CHECK (bucket_id = 'product-files' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS product_files_owner_delete ON storage.objects;
CREATE POLICY product_files_owner_delete ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'product-files' AND (storage.foldername(name))[1] = auth.uid()::text);

-- product-covers: public bucket (served by public URL, no SELECT policy needed
-- for that). Pros write only their own folder. The owner SELECT policy is what
-- the Storage API needs to let a pro remove or replace their own objects.
DROP POLICY IF EXISTS product_covers_owner_select ON storage.objects;
CREATE POLICY product_covers_owner_select ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'product-covers' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS product_covers_owner_insert ON storage.objects;
CREATE POLICY product_covers_owner_insert ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'product-covers' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS product_covers_owner_update ON storage.objects;
CREATE POLICY product_covers_owner_update ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'product-covers' AND (storage.foldername(name))[1] = auth.uid()::text)
  WITH CHECK (bucket_id = 'product-covers' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS product_covers_owner_delete ON storage.objects;
CREATE POLICY product_covers_owner_delete ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'product-covers' AND (storage.foldername(name))[1] = auth.uid()::text);

COMMIT;
