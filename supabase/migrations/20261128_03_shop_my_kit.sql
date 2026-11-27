-- =============================================================================
-- Shop my kit (Creator plan, feature key 'affiliates')
--
-- A nail tech lists the products she uses and recommends (UV lamp, builder gel,
-- files, cuticle oil...) with HER affiliate links and optional promo codes.
-- Nelsy never sells these products and never shows prices.
--
-- kit_items        : the pro's recommendations. Owner CRUD only.
-- kit_settings     : optional section title per pro ("Products I use" by default).
-- kit_clicks       : one row per outbound click. Written only by the kit-click
--                    edge function (service_role) through record_kit_click().
--                    Stores the referrer HOST only. No IP, no user agent, no cookie.
-- public_kit_items : read-only view for the public studio page (same pattern as
--                    public_products: security_invoker = false, SELECT only).
--
-- Storage:
--   kit-images (public, 5 MB, images only). Objects live under "<profile_id>/..."
--   and pros can only write their own folder.
--
-- Idempotent: safe to run twice.
-- =============================================================================
BEGIN;

-- ── Helper: does a profiles.plan value include Shop my kit? ──────────────────
-- Mirrors hasFeature(plan, 'affiliates') in src/lib/plans.ts and
-- planHasFeature in supabase/functions/_shared/plans.ts (Creator and Salon tiers).
CREATE OR REPLACE FUNCTION public.plan_has_shop_my_kit(p_plan text)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT split_part(lower(coalesce(p_plan, '')), '_', 1) IN ('creator', 'salon');
$$;

-- ── kit_items ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.kit_items (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id  uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title       text NOT NULL CHECK (char_length(btrim(title)) BETWEEN 1 AND 120),
  -- Short "why I use it".
  note        text CHECK (note IS NULL OR char_length(note) <= 280),
  brand       text CHECK (brand IS NULL OR char_length(brand) <= 60),
  -- Free text. The dashboard suggests 'Gel & polish', 'Tools', 'Lamps', 'Care'.
  category    text CHECK (category IS NULL OR char_length(btrim(category)) BETWEEN 1 AND 40),
  -- Public URL in the kit-images bucket (or any https image URL).
  image_url   text CHECK (image_url IS NULL OR (char_length(image_url) <= 2048 AND image_url ~ '^https://')),
  -- The pro's affiliate / brand / distributor link. https only, no spaces,
  -- no credentials (user:pass@host).
  url         text NOT NULL CHECK (
                char_length(url) BETWEEN 12 AND 2048
                AND url ~ '^https://[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?)+(:[0-9]{1,5})?([/?#][^[:space:]]*)?$'
              ),
  promo_code  text CHECK (promo_code IS NULL OR promo_code ~ '^[A-Za-z0-9][A-Za-z0-9_.-]{0,39}$'),
  position    integer NOT NULL DEFAULT 0,
  is_active   boolean NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS kit_items_profile_position_idx
  ON public.kit_items (profile_id, position, created_at);

CREATE OR REPLACE FUNCTION public.kit_touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_kit_items_touch_updated_at ON public.kit_items;
CREATE TRIGGER trg_kit_items_touch_updated_at
  BEFORE UPDATE ON public.kit_items
  FOR EACH ROW EXECUTE FUNCTION public.kit_touch_updated_at();

-- A pro can keep at most 100 items (keeps the public page and the view cheap).
CREATE OR REPLACE FUNCTION public.kit_items_enforce_limit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (SELECT count(*) FROM public.kit_items WHERE profile_id = NEW.profile_id) >= 100 THEN
    RAISE EXCEPTION 'kit_items_limit' USING ERRCODE = 'P0001', HINT = 'A kit can hold 100 items.';
  END IF;
  RETURN NEW;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.kit_items_enforce_limit() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS trg_kit_items_enforce_limit ON public.kit_items;
CREATE TRIGGER trg_kit_items_enforce_limit
  BEFORE INSERT ON public.kit_items
  FOR EACH ROW EXECUTE FUNCTION public.kit_items_enforce_limit();

ALTER TABLE public.kit_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS kit_items_owner_select ON public.kit_items;
CREATE POLICY kit_items_owner_select ON public.kit_items
  FOR SELECT TO authenticated
  USING (profile_id = auth.uid());

DROP POLICY IF EXISTS kit_items_owner_insert ON public.kit_items;
CREATE POLICY kit_items_owner_insert ON public.kit_items
  FOR INSERT TO authenticated
  WITH CHECK (profile_id = auth.uid());

DROP POLICY IF EXISTS kit_items_owner_update ON public.kit_items;
CREATE POLICY kit_items_owner_update ON public.kit_items
  FOR UPDATE TO authenticated
  USING (profile_id = auth.uid())
  WITH CHECK (profile_id = auth.uid());

DROP POLICY IF EXISTS kit_items_owner_delete ON public.kit_items;
CREATE POLICY kit_items_owner_delete ON public.kit_items
  FOR DELETE TO authenticated
  USING (profile_id = auth.uid());

REVOKE ALL ON public.kit_items FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.kit_items TO authenticated;

-- ── kit_settings ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.kit_settings (
  profile_id  uuid PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  -- NULL means the default title ("Products I use").
  title       text CHECK (title IS NULL OR char_length(btrim(title)) BETWEEN 1 AND 60),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS trg_kit_settings_touch_updated_at ON public.kit_settings;
CREATE TRIGGER trg_kit_settings_touch_updated_at
  BEFORE UPDATE ON public.kit_settings
  FOR EACH ROW EXECUTE FUNCTION public.kit_touch_updated_at();

ALTER TABLE public.kit_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS kit_settings_owner_select ON public.kit_settings;
CREATE POLICY kit_settings_owner_select ON public.kit_settings
  FOR SELECT TO authenticated
  USING (profile_id = auth.uid());

DROP POLICY IF EXISTS kit_settings_owner_insert ON public.kit_settings;
CREATE POLICY kit_settings_owner_insert ON public.kit_settings
  FOR INSERT TO authenticated
  WITH CHECK (profile_id = auth.uid());

DROP POLICY IF EXISTS kit_settings_owner_update ON public.kit_settings;
CREATE POLICY kit_settings_owner_update ON public.kit_settings
  FOR UPDATE TO authenticated
  USING (profile_id = auth.uid())
  WITH CHECK (profile_id = auth.uid());

DROP POLICY IF EXISTS kit_settings_owner_delete ON public.kit_settings;
CREATE POLICY kit_settings_owner_delete ON public.kit_settings
  FOR DELETE TO authenticated
  USING (profile_id = auth.uid());

REVOKE ALL ON public.kit_settings FROM anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.kit_settings TO authenticated;

-- ── public_kit_items (public read model) ─────────────────────────────────────
-- Active items of published studios whose plan includes Shop my kit.
-- section_title is repeated on every row so the page needs a single query.
CREATE OR REPLACE VIEW public.public_kit_items
  WITH (security_invoker = false)
AS
  SELECT
    k.id, k.profile_id, k.title, k.note, k.brand, k.category, k.image_url,
    k.url, k.promo_code, k.position, k.created_at,
    s.title AS section_title
  FROM public.kit_items k
  JOIN public.profiles p ON p.id = k.profile_id
  LEFT JOIN public.kit_settings s ON s.profile_id = k.profile_id
  WHERE k.is_active
    AND p.subscription_status IS NOT NULL
    AND p.subscription_status NOT IN ('inactive', 'incomplete', 'canceled', 'cancelled')
    AND public.plan_has_shop_my_kit(p.plan);

REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.public_kit_items FROM anon, authenticated;
GRANT SELECT ON public.public_kit_items TO anon, authenticated;

-- ── kit_clicks ───────────────────────────────────────────────────────────────
-- No IP, no user agent, no visitor id: only which item, when, and the host of
-- the page that sent the visitor to the studio (e.g. "instagram.com").
CREATE TABLE IF NOT EXISTS public.kit_clicks (
  id             bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  kit_item_id    uuid NOT NULL REFERENCES public.kit_items(id) ON DELETE CASCADE,
  profile_id     uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  clicked_at     timestamptz NOT NULL DEFAULT now(),
  referrer_host  text CHECK (referrer_host IS NULL OR referrer_host ~ '^[a-z0-9.-]{1,253}$')
);

CREATE INDEX IF NOT EXISTS kit_clicks_profile_clicked_idx
  ON public.kit_clicks (profile_id, clicked_at DESC);
CREATE INDEX IF NOT EXISTS kit_clicks_item_clicked_idx
  ON public.kit_clicks (kit_item_id, clicked_at DESC);

ALTER TABLE public.kit_clicks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS kit_clicks_owner_select ON public.kit_clicks;
CREATE POLICY kit_clicks_owner_select ON public.kit_clicks
  FOR SELECT TO authenticated
  USING (profile_id = auth.uid());

REVOKE ALL ON public.kit_clicks FROM anon;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.kit_clicks FROM authenticated;
GRANT SELECT ON public.kit_clicks TO authenticated;

-- Records one click for an item that is publicly visible right now and returns
-- its destination URL. Returns NULL when the item is not public (hidden,
-- deleted, studio unpublished, plan without the feature).
-- Basic flood protection: above 60 clicks per item per minute, or 5000 per
-- studio per day, the click is not stored (the URL is still returned so the
-- visitor is never blocked). Per-visitor limits live in the edge function
-- memory and are never persisted.
CREATE OR REPLACE FUNCTION public.record_kit_click(p_item_id uuid, p_referrer_host text DEFAULT NULL)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_url text;
  v_profile uuid;
  v_host text;
BEGIN
  SELECT v.url, v.profile_id INTO v_url, v_profile
    FROM public.public_kit_items v
   WHERE v.id = p_item_id;
  IF v_url IS NULL THEN
    RETURN NULL;
  END IF;

  v_host := lower(nullif(btrim(coalesce(p_referrer_host, '')), ''));
  IF v_host IS NOT NULL AND v_host !~ '^[a-z0-9.-]{1,253}$' THEN
    v_host := NULL;
  END IF;

  IF (SELECT count(*) FROM public.kit_clicks
       WHERE kit_item_id = p_item_id AND clicked_at > now() - interval '1 minute') < 60
     AND (SELECT count(*) FROM public.kit_clicks
       WHERE profile_id = v_profile AND clicked_at > now() - interval '1 day') < 5000
  THEN
    INSERT INTO public.kit_clicks (kit_item_id, profile_id, referrer_host)
    VALUES (p_item_id, v_profile, v_host);
  END IF;

  RETURN v_url;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.record_kit_click(uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.record_kit_click(uuid, text) TO service_role;

-- Clicks per item for the signed-in pro: last 7 and last 28 days.
-- SECURITY INVOKER: kit_clicks RLS already limits rows to the caller.
CREATE OR REPLACE FUNCTION public.my_kit_click_counts()
RETURNS TABLE (kit_item_id uuid, clicks_7d bigint, clicks_28d bigint)
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT c.kit_item_id,
         count(*) FILTER (WHERE c.clicked_at > now() - interval '7 days') AS clicks_7d,
         count(*) AS clicks_28d
    FROM public.kit_clicks c
   WHERE c.profile_id = auth.uid()
     AND c.clicked_at > now() - interval '28 days'
   GROUP BY c.kit_item_id;
$$;
REVOKE EXECUTE ON FUNCTION public.my_kit_click_counts() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.my_kit_click_counts() TO authenticated;

-- ── Storage: kit-images ──────────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('kit-images', 'kit-images', true, 5242880,
        ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO UPDATE
  SET public = true,
      file_size_limit = EXCLUDED.file_size_limit,
      allowed_mime_types = EXCLUDED.allowed_mime_types;

-- Public bucket (served by public URL). Pros write only their own folder. The
-- owner SELECT policy is what the Storage API needs to remove or replace objects.
DROP POLICY IF EXISTS kit_images_owner_select ON storage.objects;
CREATE POLICY kit_images_owner_select ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'kit-images' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS kit_images_owner_insert ON storage.objects;
CREATE POLICY kit_images_owner_insert ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'kit-images' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS kit_images_owner_update ON storage.objects;
CREATE POLICY kit_images_owner_update ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'kit-images' AND (storage.foldername(name))[1] = auth.uid()::text)
  WITH CHECK (bucket_id = 'kit-images' AND (storage.foldername(name))[1] = auth.uid()::text);

DROP POLICY IF EXISTS kit_images_owner_delete ON storage.objects;
CREATE POLICY kit_images_owner_delete ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'kit-images' AND (storage.foldername(name))[1] = auth.uid()::text);

COMMIT;
