-- =============================================================================
-- Push notification device tokens (Nelsy pro app, iOS + Android through FCM).
--
-- NOT APPLIED. Founder applies it with the rest of the push setup
-- (docs/mobile/push-notifications.md).
--
-- push_tokens : one row per device token. A token belongs to exactly one pro:
--               if another account signs in on the same phone, the token moves.
--
-- Writes from the app go through register_push_token / unregister_push_token
-- (SECURITY DEFINER) so a token can be moved away from a previous account
-- without giving anyone access to other pros' rows. The sender
-- (supabase/functions/_shared/push.ts) reads with service_role and deletes
-- tokens that FCM reports as no longer registered.
--
-- Idempotent: safe to run twice.
-- =============================================================================
BEGIN;

CREATE TABLE IF NOT EXISTS public.push_tokens (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id    uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  token         text NOT NULL UNIQUE CHECK (char_length(token) BETWEEN 20 AND 4096),
  platform      text NOT NULL CHECK (platform IN ('ios', 'android')),
  created_at    timestamptz NOT NULL DEFAULT now(),
  last_seen_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS push_tokens_profile_idx ON public.push_tokens (profile_id);

-- RLS: owner-only. A pro can read and delete her own tokens. Inserts and
-- updates go through register_push_token (below), never directly.
ALTER TABLE public.push_tokens ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS push_tokens_owner_select ON public.push_tokens;
CREATE POLICY push_tokens_owner_select ON public.push_tokens
  FOR SELECT TO authenticated
  USING (profile_id = auth.uid());

DROP POLICY IF EXISTS push_tokens_owner_delete ON public.push_tokens;
CREATE POLICY push_tokens_owner_delete ON public.push_tokens
  FOR DELETE TO authenticated
  USING (profile_id = auth.uid());

REVOKE ALL ON public.push_tokens FROM anon;
REVOKE INSERT, UPDATE, TRUNCATE ON public.push_tokens FROM authenticated;
GRANT SELECT, DELETE ON public.push_tokens TO authenticated;

-- Saves this device's token for the signed-in pro (moves it if another account had it).
CREATE OR REPLACE FUNCTION public.register_push_token(p_token text, p_platform text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'not authenticated' USING ERRCODE = '42501';
  END IF;
  IF p_platform NOT IN ('ios', 'android') THEN
    RAISE EXCEPTION 'invalid platform' USING ERRCODE = '22023';
  END IF;

  INSERT INTO public.push_tokens (profile_id, token, platform)
  VALUES (auth.uid(), p_token, p_platform)
  ON CONFLICT (token) DO UPDATE
    SET profile_id   = EXCLUDED.profile_id,
        platform     = EXCLUDED.platform,
        last_seen_at = now();

  -- Keep the table small: at most 10 devices per pro (oldest dropped).
  DELETE FROM public.push_tokens
   WHERE profile_id = auth.uid()
     AND id NOT IN (
       SELECT id FROM public.push_tokens
        WHERE profile_id = auth.uid()
        ORDER BY last_seen_at DESC
        LIMIT 10
     );
END;
$$;

-- Called on log out: this device stops receiving the pro's notifications.
CREATE OR REPLACE FUNCTION public.unregister_push_token(p_token text)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.push_tokens WHERE token = p_token AND profile_id = auth.uid();
$$;

REVOKE EXECUTE ON FUNCTION public.register_push_token(text, text) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.unregister_push_token(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.register_push_token(text, text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.unregister_push_token(text) TO authenticated;

COMMIT;
