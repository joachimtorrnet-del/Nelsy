-- =============================================================================
-- Account deletion requests (App Store Review Guideline 5.1.1(v): deletion must
-- be startable inside the app).
--
-- NOT APPLIED. Founder applies it before submitting the app
-- (docs/mobile/account-deletion.md).
--
-- The app calls the request-account-deletion edge function, which inserts here
-- with service_role and emails hello@getnelsy.com. The team then cancels the
-- Stripe subscription, deletes the data and the auth user, and sets
-- completed_at. A pro can read her own requests (to show the status later).
--
-- No FK to profiles on purpose: the request row must survive the deletion of
-- the profile it describes (audit trail).
--
-- Idempotent: safe to run twice.
-- =============================================================================
BEGIN;

CREATE TABLE IF NOT EXISTS public.account_deletion_requests (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id    uuid NOT NULL,
  email         text NOT NULL CHECK (char_length(email) <= 254),
  slug          text,
  reason        text CHECK (reason IS NULL OR char_length(reason) <= 500),
  source        text NOT NULL DEFAULT 'app' CHECK (source IN ('app', 'web', 'email')),
  status        text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'cancelled', 'completed')),
  requested_at  timestamptz NOT NULL DEFAULT now(),
  completed_at  timestamptz
);

-- One open request per pro: a second tap returns the existing one.
CREATE UNIQUE INDEX IF NOT EXISTS account_deletion_requests_one_pending
  ON public.account_deletion_requests (profile_id) WHERE status = 'pending';

ALTER TABLE public.account_deletion_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS account_deletion_requests_owner_select ON public.account_deletion_requests;
CREATE POLICY account_deletion_requests_owner_select ON public.account_deletion_requests
  FOR SELECT TO authenticated
  USING (profile_id = auth.uid());

REVOKE ALL ON public.account_deletion_requests FROM anon;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.account_deletion_requests FROM authenticated;
GRANT SELECT ON public.account_deletion_requests TO authenticated;

COMMIT;
