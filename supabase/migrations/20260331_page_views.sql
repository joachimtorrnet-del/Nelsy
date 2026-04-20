-- Page views tracking for studio visit analytics
create table if not exists page_views (
  id          uuid        default gen_random_uuid() primary key,
  profile_id  uuid        references profiles(id) on delete cascade not null,
  source      text        not null default 'direct', -- 'instagram' | 'tiktok' | 'direct' | 'other'
  referrer    text,
  created_at  timestamptz default now() not null
);

-- Fast lookups by profile + date range (used in analytics queries)
create index if not exists page_views_profile_created_idx
  on page_views (profile_id, created_at desc);

-- RLS
alter table page_views enable row level security;

-- Anyone can insert (anonymous studio visitors)
create policy "Anyone can insert page views"
  on page_views for insert
  with check (true);

-- Only the profile owner can read their own views
create policy "Owner can read own page views"
  on page_views for select
  using (auth.uid() = profile_id);
