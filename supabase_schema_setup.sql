-- ============================================
-- NELSY DATABASE SCHEMA SETUP
-- Exécute chaque section séparément dans Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. CHECK EXISTING TABLES
-- ============================================
-- Exécute cette query d'abord pour voir ce qui existe:

SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('profiles', 'appointments', 'services', 'availability', 'analytics_events', 'notification_settings');

-- ============================================
-- 2. APPOINTMENTS TABLE (si n'existe pas)
-- ============================================

CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pro_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,

  -- Client info
  client_name TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT,

  -- Appointment details
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  duration INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,

  -- Status
  status TEXT NOT NULL DEFAULT 'pending',
  deposit_paid BOOLEAN DEFAULT false,
  deposit_amount DECIMAL(10,2),

  -- Notes
  notes TEXT,
  cancellation_reason TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_appointments_pro_id ON appointments(pro_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);

-- ============================================
-- 3. SERVICES TABLE - AJOUTER COLONNES MANQUANTES
-- ============================================

ALTER TABLE services ADD COLUMN IF NOT EXISTS pro_id UUID REFERENCES profiles(id) ON DELETE CASCADE;
ALTER TABLE services ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS price DECIMAL(10,2);
ALTER TABLE services ADD COLUMN IF NOT EXISTS duration INTEGER;
ALTER TABLE services ADD COLUMN IF NOT EXISTS deposit_required BOOLEAN DEFAULT false;
ALTER TABLE services ADD COLUMN IF NOT EXISTS deposit_amount DECIMAL(10,2);
ALTER TABLE services ADD COLUMN IF NOT EXISTS deposit_percentage INTEGER;
ALTER TABLE services ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE services ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;
ALTER TABLE services ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
ALTER TABLE services ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE services ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

CREATE INDEX IF NOT EXISTS idx_services_pro_id ON services(pro_id);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(active);

-- ============================================
-- 4. AVAILABILITY TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pro_id UUID REFERENCES profiles(id) ON DELETE CASCADE,

  day_of_week INTEGER NOT NULL,
  is_available BOOLEAN DEFAULT true,

  start_time TIME NOT NULL,
  end_time TIME NOT NULL,

  break_start TIME,
  break_end TIME,

  buffer_minutes INTEGER DEFAULT 15,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'availability_pro_id_day_of_week_key'
  ) THEN
    ALTER TABLE availability ADD CONSTRAINT availability_pro_id_day_of_week_key UNIQUE(pro_id, day_of_week);
  END IF;
END $$;

-- ============================================
-- 5. ANALYTICS EVENTS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pro_id UUID REFERENCES profiles(id) ON DELETE CASCADE,

  event_type TEXT NOT NULL,
  source TEXT,

  metadata JSONB,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_analytics_pro_id ON analytics_events(pro_id);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON analytics_events(event_type);

-- ============================================
-- 6. NOTIFICATION SETTINGS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS notification_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pro_id UUID REFERENCES profiles(id) ON DELETE CASCADE,

  email_new_booking BOOLEAN DEFAULT true,
  email_booking_reminder BOOLEAN DEFAULT true,
  email_payment_received BOOLEAN DEFAULT true,
  email_weekly_summary BOOLEAN DEFAULT false,

  sms_new_booking BOOLEAN DEFAULT true,
  sms_booking_reminder BOOLEAN DEFAULT true,

  push_new_booking BOOLEAN DEFAULT true,
  push_booking_reminder BOOLEAN DEFAULT true,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'notification_settings_pro_id_key'
  ) THEN
    ALTER TABLE notification_settings ADD CONSTRAINT notification_settings_pro_id_key UNIQUE(pro_id);
  END IF;
END $$;

-- ============================================
-- 7. PROFILES TABLE - COLONNES MANQUANTES
-- ============================================

ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS primary_color TEXT DEFAULT '#F52B8C';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS theme TEXT DEFAULT 'light';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS instagram_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS tiktok_url TEXT;

-- ============================================
-- 8. ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own appointments" ON appointments;
CREATE POLICY "Users can view their own appointments" ON appointments
  FOR SELECT USING (auth.uid() = pro_id);

DROP POLICY IF EXISTS "Users can insert their own appointments" ON appointments;
CREATE POLICY "Users can insert their own appointments" ON appointments
  FOR INSERT WITH CHECK (auth.uid() = pro_id);

DROP POLICY IF EXISTS "Users can update their own appointments" ON appointments;
CREATE POLICY "Users can update their own appointments" ON appointments
  FOR UPDATE USING (auth.uid() = pro_id);

DROP POLICY IF EXISTS "Users can delete their own appointments" ON appointments;
CREATE POLICY "Users can delete their own appointments" ON appointments
  FOR DELETE USING (auth.uid() = pro_id);

DROP POLICY IF EXISTS "Users can view their own services" ON services;
CREATE POLICY "Users can view their own services" ON services
  FOR SELECT USING (auth.uid() = pro_id);

DROP POLICY IF EXISTS "Users can insert their own services" ON services;
CREATE POLICY "Users can insert their own services" ON services
  FOR INSERT WITH CHECK (auth.uid() = pro_id);

DROP POLICY IF EXISTS "Users can update their own services" ON services;
CREATE POLICY "Users can update their own services" ON services
  FOR UPDATE USING (auth.uid() = pro_id);

DROP POLICY IF EXISTS "Users can delete their own services" ON services;
CREATE POLICY "Users can delete their own services" ON services
  FOR DELETE USING (auth.uid() = pro_id);

DROP POLICY IF EXISTS "Public can view active services" ON services;
CREATE POLICY "Public can view active services" ON services
  FOR SELECT USING (active = true);

DROP POLICY IF EXISTS "Users can manage their own availability" ON availability;
CREATE POLICY "Users can manage their own availability" ON availability
  FOR ALL USING (auth.uid() = pro_id);

DROP POLICY IF EXISTS "Users can view their own analytics" ON analytics_events;
CREATE POLICY "Users can view their own analytics" ON analytics_events
  FOR SELECT USING (auth.uid() = pro_id);

DROP POLICY IF EXISTS "Users can insert their own analytics" ON analytics_events;
CREATE POLICY "Users can insert their own analytics" ON analytics_events
  FOR INSERT WITH CHECK (auth.uid() = pro_id);

DROP POLICY IF EXISTS "Users can manage their own notification settings" ON notification_settings;
CREATE POLICY "Users can manage their own notification settings" ON notification_settings
  FOR ALL USING (auth.uid() = pro_id);

-- ============================================
-- 9. VERIFICATION QUERY
-- ============================================

SELECT
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
AND table_name IN ('profiles', 'appointments', 'services', 'availability', 'analytics_events', 'notification_settings')
ORDER BY table_name;
