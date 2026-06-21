-- Add theme_preset to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS theme_preset TEXT DEFAULT 'soft';
