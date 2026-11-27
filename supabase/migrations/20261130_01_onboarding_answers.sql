-- =============================================================================
-- Pro app signup answers (src/mobile/screens/Onboarding.tsx, Step 1/5 to 5/5).
--
-- NOT APPLIED. Until it is, the app keeps working: the update of this column
-- fails quietly (tracked as app_onboarding_backend_error operation=answers) and
-- the answers still reach PostHog through app_onboarding_answer events.
--
-- Shape written by the app:
--   {
--     "categories": ["nails", "gelx"],          -- up to two
--     "booking_method": "dms_texts" | "notebook" | "other_app" | "starting_out",
--     "clients_per_week": "0_5" | "6_15" | "16_30" | "30_plus",
--     "first_goal": "online_booking" | "deposits_no_shows" | "get_paid_online" | "sell_guides",
--     "referred_by": "handle" | null,          -- "Did someone refer you?" (Step 5/5)
--     "answered_at": "2026-11-30T10:00:00Z",
--     "source": "app"
--   }
--
-- Owner writes go through the existing profiles RLS update policy (own row).
-- public_profiles lists its columns explicitly, so this column stays private.
-- Idempotent: safe to run twice.
-- =============================================================================
BEGIN;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS onboarding_answers jsonb;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'profiles_onboarding_answers_shape'
  ) THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_onboarding_answers_shape CHECK (
        onboarding_answers IS NULL
        OR (jsonb_typeof(onboarding_answers) = 'object' AND pg_column_size(onboarding_answers) <= 4096)
      );
  END IF;
END $$;

COMMENT ON COLUMN public.profiles.onboarding_answers IS
  'Pro app signup answers (categories, booking_method, clients_per_week, first_goal, referred_by). Private to the owner.';

COMMIT;
