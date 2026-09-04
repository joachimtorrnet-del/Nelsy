-- Add 'incomplete' to profiles.subscription_status CHECK constraint.
-- 'incomplete' means the user started onboarding but has not yet saved a card.
-- Previously missing, causing all create-setup-intent writes to fail silently.

ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_subscription_status_check;

ALTER TABLE profiles
  ADD CONSTRAINT profiles_subscription_status_check
  CHECK (subscription_status IN (
    'trial',
    'trialing',
    'active',
    'past_due',
    'cancelled',
    'inactive',
    'incomplete'
  ));
