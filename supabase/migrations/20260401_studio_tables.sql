-- ============================================================
-- Gallery Photos
-- ============================================================
create table if not exists gallery_photos (
  id          uuid        default gen_random_uuid() primary key,
  profile_id  uuid        references profiles(id) on delete cascade not null,
  image_url   text        not null,
  caption     text,
  order_index integer     default 0,
  created_at  timestamptz default now() not null
);

create index if not exists gallery_photos_profile_idx
  on gallery_photos (profile_id, order_index);

alter table gallery_photos enable row level security;

create policy "Public can view gallery photos"
  on gallery_photos for select
  using (true);

create policy "Owner manages gallery photos"
  on gallery_photos for all
  using (auth.uid() = profile_id)
  with check (auth.uid() = profile_id);

-- ============================================================
-- Testimonials
-- ============================================================
create table if not exists testimonials (
  id            uuid        default gen_random_uuid() primary key,
  profile_id    uuid        references profiles(id) on delete cascade not null,
  client_name   text        not null,
  client_avatar text,
  rating        integer     check (rating between 1 and 5) default 5,
  text          text        not null,
  approved      boolean     default false,
  created_at    timestamptz default now() not null
);

create index if not exists testimonials_profile_approved_idx
  on testimonials (profile_id, approved, created_at desc);

alter table testimonials enable row level security;

create policy "Public can view approved testimonials"
  on testimonials for select
  using (approved = true);

create policy "Owner manages testimonials"
  on testimonials for all
  using (auth.uid() = profile_id)
  with check (auth.uid() = profile_id);

-- ============================================================
-- Business Hours
-- ============================================================
create table if not exists business_hours (
  id          uuid    default gen_random_uuid() primary key,
  profile_id  uuid    references profiles(id) on delete cascade not null,
  day_of_week integer check (day_of_week between 0 and 6) not null,
  open_time   time,
  close_time  time,
  is_closed   boolean default false,
  unique (profile_id, day_of_week)
);

alter table business_hours enable row level security;

create policy "Public can view business hours"
  on business_hours for select
  using (true);

create policy "Owner manages business hours"
  on business_hours for all
  using (auth.uid() = profile_id)
  with check (auth.uid() = profile_id);
