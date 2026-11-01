-- Service collections: presentation containers grouping appointment-based services.
-- A collection has no independent price, duration, or booking flow.

-- ── service_collections ───────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS service_collections (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id    UUID        REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title         TEXT        NOT NULL,
  description   TEXT,
  image_url     TEXT,
  display_order INTEGER     DEFAULT 0,
  active        BOOLEAN     DEFAULT false,  -- false = draft
  created_at    TIMESTAMPTZ DEFAULT now()   NOT NULL,
  updated_at    TIMESTAMPTZ DEFAULT now()   NOT NULL
);

CREATE INDEX IF NOT EXISTS service_collections_profile_idx
  ON service_collections (profile_id, display_order);

ALTER TABLE service_collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active collections"
  ON service_collections FOR SELECT
  USING (active = true);

CREATE POLICY "Owner manages collections"
  ON service_collections FOR ALL
  USING  (auth.uid() = profile_id)
  WITH CHECK (auth.uid() = profile_id);

-- ── collection_subcategories ─────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS collection_subcategories (
  id            UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  collection_id UUID    REFERENCES service_collections(id) ON DELETE CASCADE NOT NULL,
  profile_id    UUID    REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name          TEXT    NOT NULL,
  display_order INTEGER DEFAULT 0
);

CREATE INDEX IF NOT EXISTS collection_subcategories_collection_idx
  ON collection_subcategories (collection_id, display_order);

ALTER TABLE collection_subcategories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view subcategories"
  ON collection_subcategories FOR SELECT
  USING (true);

CREATE POLICY "Owner manages subcategories"
  ON collection_subcategories FOR ALL
  USING  (auth.uid() = profile_id)
  WITH CHECK (auth.uid() = profile_id);

-- ── collection_members ───────────────────────────────────────────────────────
-- A service may belong to at most one collection (UNIQUE constraint).
-- Membership does not copy price, duration, or availability — those are read
-- from the services row at render time.

CREATE TABLE IF NOT EXISTS collection_members (
  id               UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  collection_id    UUID    REFERENCES service_collections(id) ON DELETE CASCADE  NOT NULL,
  service_id       UUID    REFERENCES services(id)            ON DELETE CASCADE  NOT NULL,
  subcategory_id   UUID    REFERENCES collection_subcategories(id) ON DELETE SET NULL,
  display_order    INTEGER DEFAULT 0,
  UNIQUE (service_id)  -- one collection per service
);

CREATE INDEX IF NOT EXISTS collection_members_collection_idx
  ON collection_members (collection_id, display_order);

ALTER TABLE collection_members ENABLE ROW LEVEL SECURITY;

-- Public can read members of active collections to browse services
CREATE POLICY "Public can view collection members"
  ON collection_members FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM service_collections sc
      WHERE sc.id = collection_id AND sc.active = true
    )
  );

-- Owner may manage members of their own collections only
CREATE POLICY "Owner manages collection members"
  ON collection_members FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM service_collections sc
      WHERE sc.id = collection_id AND sc.profile_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM service_collections sc
      WHERE sc.id = collection_id AND sc.profile_id = auth.uid()
    )
    AND
    -- Prevent cross-studio membership: service must belong to the same profile
    EXISTS (
      SELECT 1 FROM services s
      WHERE s.id = service_id AND s.profile_id = auth.uid()
    )
  );

-- ── services: studio_placement ───────────────────────────────────────────────
-- 'individual': shown as a standalone card on the studio page.
-- 'collection': shown only inside its collection (if a member).
-- 'both':       shown as a standalone card AND inside its collection.
-- Default 'individual' preserves the behavior of all existing services.

ALTER TABLE services
  ADD COLUMN IF NOT EXISTS studio_placement TEXT NOT NULL DEFAULT 'individual'
    CHECK (studio_placement IN ('individual', 'collection', 'both'));
