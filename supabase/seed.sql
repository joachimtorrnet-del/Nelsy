-- ============================================================
-- Nelsy Seed Data
-- Run AFTER schema.sql, in the Supabase SQL editor
-- NOTE: These UUIDs are test-only. Replace with real auth.users
--       IDs once you have actual users.
-- ============================================================

-- Test merchant: Studio Maya
INSERT INTO profiles (id, email, full_name, salon_name, slug, bio, stripe_onboarding_complete, subscription_status)
VALUES (
  '10000000-0000-0000-0000-000000000001',
  'maya@studio-maya.fr',
  'Maya Dupont',
  'Studio Maya ✨',
  'studio-maya',
  'Nail artist passionnée • Spécialiste nail art & extensions gel • +5 ans d''expérience • Paris 11e',
  true,
  'active'
) ON CONFLICT (id) DO NOTHING;

-- Services for Studio Maya
INSERT INTO services (profile_id, name, description, category, duration_minutes, price_total, deposit_amount, display_order)
VALUES
  ('10000000-0000-0000-0000-000000000001', 'Pose Gel Complète',
   'Pose complète avec gel UV, includes design simple au choix.',
   'Gel', 90, 75.00, 25.00, 1),
  ('10000000-0000-0000-0000-000000000001', 'Remplissage Gel',
   'Remplissage 3 semaines avec réparation incluse.',
   'Gel', 60, 50.00, 15.00, 2),
  ('10000000-0000-0000-0000-000000000001', 'Nail Art Prestige',
   'Design personnalisé, chromes, dégradés, nail art complexe.',
   'Art', 150, 120.00, 40.00, 3),
  ('10000000-0000-0000-0000-000000000001', 'Manucure Naturelle',
   'Soin des mains complet, pose vernis semi-permanent.',
   'Classic', 45, 35.00, 10.00, 4),
  ('10000000-0000-0000-0000-000000000001', 'Extension Capsules',
   'Pose de faux ongles en capsule avec gel overlay.',
   'Extension', 120, 90.00, 30.00, 5)
ON CONFLICT DO NOTHING;

-- Availabilities for Studio Maya (Mon-Sat 9h-18h)
INSERT INTO availabilities (profile_id, day_of_week, start_time, end_time, break_duration_minutes)
VALUES
  ('10000000-0000-0000-0000-000000000001', 1, '09:00', '18:00', 15),
  ('10000000-0000-0000-0000-000000000001', 2, '09:00', '18:00', 15),
  ('10000000-0000-0000-0000-000000000001', 3, '09:00', '18:00', 15),
  ('10000000-0000-0000-0000-000000000001', 4, '09:00', '18:00', 15),
  ('10000000-0000-0000-0000-000000000001', 5, '09:00', '18:00', 15),
  ('10000000-0000-0000-0000-000000000001', 6, '10:00', '16:00', 15)
ON CONFLICT DO NOTHING;

-- Sample bookings (past + future)
DO $$
DECLARE
  service_gel_id UUID;
  service_art_id UUID;
  service_mani_id UUID;
BEGIN
  SELECT id INTO service_gel_id FROM services
    WHERE profile_id = '10000000-0000-0000-0000-000000000001' AND name = 'Pose Gel Complète';
  SELECT id INTO service_art_id FROM services
    WHERE profile_id = '10000000-0000-0000-0000-000000000001' AND name = 'Nail Art Prestige';
  SELECT id INTO service_mani_id FROM services
    WHERE profile_id = '10000000-0000-0000-0000-000000000001' AND name = 'Manucure Naturelle';

  INSERT INTO bookings (profile_id, service_id, booking_datetime, client_name, client_email, client_phone, status, price_total, deposit_paid, nelsy_fee)
  VALUES
    ('10000000-0000-0000-0000-000000000001', service_gel_id,
     NOW() + INTERVAL '1 day' + INTERVAL '10 hours',
     'Amélie Rousseau', 'amelie@email.fr', '0612345678', 'paid', 75.00, 25.00, 1.00),

    ('10000000-0000-0000-0000-000000000001', service_art_id,
     NOW() + INTERVAL '1 day' + INTERVAL '14 hours',
     'Chloé Martin', 'chloe@email.fr', '0698765432', 'paid', 120.00, 40.00, 1.00),

    ('10000000-0000-0000-0000-000000000001', service_mani_id,
     NOW() + INTERVAL '2 days' + INTERVAL '9 hours',
     'Julie Bernard', 'julie@email.fr', '0711223344', 'pending', 35.00, 10.00, 1.00),

    ('10000000-0000-0000-0000-000000000001', service_gel_id,
     NOW() + INTERVAL '3 days' + INTERVAL '11 hours' + INTERVAL '30 minutes',
     'Manon Leblanc', 'manon@email.fr', '0655443322', 'paid', 75.00, 25.00, 1.00),

    ('10000000-0000-0000-0000-000000000001', service_art_id,
     NOW() + INTERVAL '4 days' + INTERVAL '15 hours' + INTERVAL '30 minutes',
     'Emma Petit', 'emma@email.fr', '0677889900', 'pending', 120.00, 40.00, 1.00),

    -- Past bookings (for revenue chart)
    ('10000000-0000-0000-0000-000000000001', service_gel_id,
     NOW() - INTERVAL '2 days' + INTERVAL '10 hours',
     'Laura Dubois', 'laura@email.fr', '0611009988', 'completed', 75.00, 25.00, 1.00),

    ('10000000-0000-0000-0000-000000000001', service_art_id,
     NOW() - INTERVAL '3 days' + INTERVAL '14 hours',
     'Sophie Girard', 'sophie@email.fr', '0722334455', 'completed', 120.00, 40.00, 1.00),

    ('10000000-0000-0000-0000-000000000001', service_mani_id,
     NOW() - INTERVAL '5 days' + INTERVAL '9 hours',
     'Camille Roy', 'camille@email.fr', '0633445566', 'completed', 35.00, 10.00, 1.00),

    ('10000000-0000-0000-0000-000000000001', service_gel_id,
     NOW() - INTERVAL '7 days' + INTERVAL '11 hours',
     'Inès Laurent', 'ines@email.fr', '0644556677', 'completed', 75.00, 25.00, 1.00),

    ('10000000-0000-0000-0000-000000000001', service_art_id,
     NOW() - INTERVAL '10 days' + INTERVAL '15 hours',
     'Lucie Simon', 'lucie@email.fr', '0655667788', 'completed', 120.00, 40.00, 1.00)
  ON CONFLICT DO NOTHING;
END $$;
