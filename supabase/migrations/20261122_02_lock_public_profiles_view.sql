-- public_profiles is an auto-updatable view owned by postgres (security_invoker=false),
-- so any write through it bypasses profiles RLS. Supabase's default privileges gave
-- anon/authenticated full DML on it. The view is meant to be read-only.
REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public_profiles FROM anon, authenticated;
GRANT SELECT ON public_profiles TO anon, authenticated;
