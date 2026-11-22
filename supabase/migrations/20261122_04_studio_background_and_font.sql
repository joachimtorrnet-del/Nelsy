-- Studio design: background color and font, independent from the template.
-- NULL means "use the template's own background/font".
BEGIN;

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS color_background TEXT,
  ADD COLUMN IF NOT EXISTS font_family TEXT;

ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_color_background_hex;
ALTER TABLE profiles
  ADD CONSTRAINT profiles_color_background_hex
  CHECK (color_background IS NULL OR color_background ~ '^#[0-9A-Fa-f]{6}$');

-- Keep in sync with STUDIO_FONTS in src/lib/studioFonts.ts
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_font_family_allowed;
ALTER TABLE profiles
  ADD CONSTRAINT profiles_font_family_allowed
  CHECK (font_family IS NULL OR font_family IN (
    'inter', 'dm-sans', 'poppins', 'montserrat', 'space-grotesk',
    'playfair', 'fraunces', 'cormorant', 'lora', 'bodoni'
  ));

-- New columns go last so CREATE OR REPLACE keeps the view's existing columns and grants.
CREATE OR REPLACE VIEW public_profiles
  WITH (security_invoker = false)
AS
  SELECT
    id, slug, full_name, salon_name, bio, logo_url, cover_url,
    specialty, location,
    instagram_url, tiktok_url, pinterest_url, website_url,
    color_accent, theme_preset,
    subscription_status, timezone, plan,
    business_currency,
    color_background, font_family
  FROM public.profiles;

-- The view stays read-only (see 20261122_02).
REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public_profiles FROM anon, authenticated;
GRANT SELECT ON public_profiles TO anon, authenticated;

COMMIT;
