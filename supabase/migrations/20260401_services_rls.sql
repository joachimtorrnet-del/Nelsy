-- ============================================================
-- Ensure services table has all needed columns + RLS policies
-- ============================================================

-- Add missing columns if they don't exist
alter table services
  add column if not exists category     text,
  add column if not exists display_order integer default 0,
  add column if not exists active       boolean default true,
  add column if not exists updated_at   timestamptz default now();

-- Enable RLS (idempotent)
alter table services enable row level security;

-- Drop existing policies to recreate cleanly
drop policy if exists "Public can view active services"    on services;
drop policy if exists "Owner can insert services"          on services;
drop policy if exists "Owner can update services"          on services;
drop policy if exists "Owner can delete services"          on services;
drop policy if exists "Anyone can view services"           on services;
drop policy if exists "Authenticated users can insert"     on services;
drop policy if exists "Authenticated users can update"     on services;
drop policy if exists "Authenticated users can delete"     on services;

-- SELECT: anyone can read services (needed for the public studio page)
create policy "Public can view services"
  on services for select
  using (true);

-- INSERT: only the profile owner
create policy "Owner can insert services"
  on services for insert
  with check (auth.uid() = profile_id);

-- UPDATE: only the profile owner
create policy "Owner can update services"
  on services for update
  using (auth.uid() = profile_id)
  with check (auth.uid() = profile_id);

-- DELETE: only the profile owner
create policy "Owner can delete services"
  on services for delete
  using (auth.uid() = profile_id);
