-- Add tiktok_url, color_accent, notification_preferences to profiles
alter table profiles
  add column if not exists tiktok_url              text,
  add column if not exists color_accent            text default '#F52B8C',
  add column if not exists notification_preferences jsonb default '{"new_bookings": true, "purchase_confirmations": true, "reminders": false}'::jsonb;
