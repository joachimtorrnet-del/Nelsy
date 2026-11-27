-- =============================================================================
-- All-in-one plan (2026-11-28): digital products, free resources, online video
-- sessions and Shop my kit are now part of the single Nelsy plan instead of a
-- separate Creator plan.
--
-- The three plan checks below used to return true only for 'creator' / 'salon'.
-- They now return true for every plan. What the public sees is still limited by
-- the subscription status checks in public_products / public_kit_items (a paused
-- or draft studio shows nothing), so this only removes the plan-tier condition.
--
-- Idempotent: safe to run twice. To bring back a tiered plan later, restore the
-- previous bodies from 20261127_01, 20261128_02 and 20261128_03.
-- =============================================================================
BEGIN;

CREATE OR REPLACE FUNCTION public.plan_has_digital_products(p_plan text)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT true;
$$;

CREATE OR REPLACE FUNCTION public.plan_has_coaching(p_plan text)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT true;
$$;

CREATE OR REPLACE FUNCTION public.plan_has_shop_my_kit(p_plan text)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT true;
$$;

COMMIT;
