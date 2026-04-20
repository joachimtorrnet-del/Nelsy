-- ============================================================
-- Nelsy Database Schema
-- Run this in the Supabase SQL editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLES
-- ============================================================

-- Profiles (one per nail tech)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  salon_name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  bio TEXT,
  logo_url TEXT,
  instagram_url TEXT,
  stripe_account_id TEXT UNIQUE,
  stripe_onboarding_complete BOOLEAN DEFAULT false,
  subscription_status TEXT DEFAULT 'trial'
    CHECK (subscription_status IN ('trial', 'active', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Services
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
  price_total DECIMAL(10,2) NOT NULL CHECK (price_total > 0),
  deposit_amount DECIMAL(10,2) NOT NULL
    CHECK (deposit_amount > 0 AND deposit_amount <= price_total),
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  booking_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT NOT NULL,
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'paid', 'completed', 'no_show', 'cancelled')),
  price_total DECIMAL(10,2) NOT NULL,
  deposit_paid DECIMAL(10,2) NOT NULL,
  nelsy_fee DECIMAL(10,2) DEFAULT 1.00,
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_fee_estimated DECIMAL(10,2) DEFAULT 0,
  net_to_pro DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  paid_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Weekly availabilities
CREATE TABLE IF NOT EXISTS availabilities (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Sun,1=Mon...
  start_time TIME NOT NULL,
  end_time TIME NOT NULL CHECK (end_time > start_time),
  break_duration_minutes INTEGER DEFAULT 15,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Closed dates (holidays, vacations)
CREATE TABLE IF NOT EXISTS closed_dates (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  closed_date DATE NOT NULL,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  UNIQUE (profile_id, closed_date)
);

-- Transactions
CREATE TABLE IF NOT EXISTS transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  type TEXT NOT NULL
    CHECK (type IN ('deposit', 'remaining_payment', 'refund', 'payout')),
  amount_gross DECIMAL(10,2) NOT NULL,
  amount_net DECIMAL(10,2) NOT NULL,
  stripe_transfer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_profiles_slug ON profiles(slug);
CREATE INDEX IF NOT EXISTS idx_services_profile_id ON services(profile_id);
CREATE INDEX IF NOT EXISTS idx_services_active ON services(profile_id, active);
CREATE INDEX IF NOT EXISTS idx_bookings_profile_id ON bookings(profile_id);
CREATE INDEX IF NOT EXISTS idx_bookings_datetime ON bookings(booking_datetime);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(profile_id, status);
CREATE INDEX IF NOT EXISTS idx_availabilities_profile_id ON availabilities(profile_id);
CREATE INDEX IF NOT EXISTS idx_transactions_profile_id ON transactions(profile_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE availabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE closed_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Profiles: public can read, owner can write
CREATE POLICY "profiles_public_read"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "profiles_owner_update"
  ON profiles FOR UPDATE USING (auth.uid() = id);

-- Services: public can read active, owner can manage
CREATE POLICY "services_public_read"
  ON services FOR SELECT USING (active = true);

CREATE POLICY "services_owner_all"
  ON services FOR ALL USING (profile_id = auth.uid());

-- Bookings: anyone can create (for booking flow), owner can read/update
CREATE POLICY "bookings_public_insert"
  ON bookings FOR INSERT WITH CHECK (true);

CREATE POLICY "bookings_owner_select"
  ON bookings FOR SELECT USING (profile_id = auth.uid());

CREATE POLICY "bookings_owner_update"
  ON bookings FOR UPDATE USING (profile_id = auth.uid());

-- Availabilities: public can read, owner can manage
CREATE POLICY "availabilities_public_read"
  ON availabilities FOR SELECT USING (active = true);

CREATE POLICY "availabilities_owner_all"
  ON availabilities FOR ALL USING (profile_id = auth.uid());

-- Closed dates: public can read, owner can manage
CREATE POLICY "closed_dates_public_read"
  ON closed_dates FOR SELECT USING (true);

CREATE POLICY "closed_dates_owner_all"
  ON closed_dates FOR ALL USING (profile_id = auth.uid());

-- Transactions: owner only
CREATE POLICY "transactions_owner_select"
  ON transactions FOR SELECT USING (profile_id = auth.uid());

-- ============================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-calculate net_to_pro on booking insert/update
CREATE OR REPLACE FUNCTION calculate_booking_financials()
RETURNS TRIGGER AS $$
BEGIN
  -- Stripe fee: 1.5% + 0.25€ (European cards)
  NEW.stripe_fee_estimated := ROUND((NEW.deposit_paid * 0.015 + 0.25)::numeric, 2);
  NEW.net_to_pro := ROUND((NEW.deposit_paid - NEW.stripe_fee_estimated - NEW.nelsy_fee)::numeric, 2);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_financials_before_insert
  BEFORE INSERT ON bookings
  FOR EACH ROW EXECUTE FUNCTION calculate_booking_financials();

CREATE TRIGGER calculate_financials_before_update
  BEFORE UPDATE OF deposit_paid, nelsy_fee ON bookings
  FOR EACH ROW EXECUTE FUNCTION calculate_booking_financials();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, salon_name, slug)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Nouveau salon'),
    COALESCE(NEW.raw_user_meta_data->>'salon_name', 'Mon Studio'),
    COALESCE(NEW.raw_user_meta_data->>'slug', LOWER(REPLACE(NEW.email, '@', '-')) )
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
