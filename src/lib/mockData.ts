import type { Merchant, Booking, DayRevenue } from '../types';

export const merchants: Merchant[] = [
  {
    id: '1',
    slug: 'studio-maya',
    salon_name: 'Studio Maya ✨',
    name: 'Maya Dupont',
    bio: 'Nail artist passionnée • Spécialiste nail art & extensions gel • +5 ans d\'expérience • Paris 11e',
    logo_url: undefined,
    instagram: 'studio.maya',
    rating: 4.9,
    review_count: 127,
    color_accent: '#667eea',
    services: [
      {
        id: 's1',
        name: 'Pose Gel Complète',
        description: 'Pose complète avec gel UV, includes design simple au choix.',
        price: 75,
        duration: 90,
        deposit: 25,
      },
      {
        id: 's2',
        name: 'Remplissage Gel',
        description: 'Remplissage 3 semaines avec réparation incluse.',
        price: 50,
        duration: 60,
        deposit: 15,
      },
      {
        id: 's3',
        name: 'Nail Art Prestige',
        description: 'Design personnalisé, chromes, dégradés, nail art complexe. Sur devis.',
        price: 120,
        duration: 150,
        deposit: 40,
      },
      {
        id: 's4',
        name: 'Manucure Naturelle',
        description: 'Soin des mains complet, pose vernis semi-permanent.',
        price: 35,
        duration: 45,
        deposit: 10,
      },
      {
        id: 's5',
        name: 'Extension Capsules',
        description: 'Pose de faux ongles en capsule avec gel overlay.',
        price: 90,
        duration: 120,
        deposit: 30,
      },
    ],
  },
  {
    id: '2',
    slug: 'nails-by-sarah',
    salon_name: 'Nails by Sarah 💅',
    name: 'Sarah Belkacem',
    bio: 'Tech certifiée CND • Nail art & beauté naturelle • Lyon Presqu\'île • Résultats garantis ou retouche offerte',
    logo_url: undefined,
    instagram: 'nailsbysarah_lyon',
    rating: 4.8,
    review_count: 89,
    color_accent: '#f5576c',
    services: [
      {
        id: 's6',
        name: 'Baby Boomer French',
        description: 'Le classique indémodable avec dégradé rose-blanc naturel.',
        price: 65,
        duration: 75,
        deposit: 20,
      },
      {
        id: 's7',
        name: 'Gel Couleur',
        description: 'Couleur unie gel avec finition brillante ou mate, +200 couleurs.',
        price: 55,
        duration: 60,
        deposit: 15,
      },
      {
        id: 's8',
        name: 'Builder Gel Renfort',
        description: 'Renforcement et allongement avec builder gel, looks naturel.',
        price: 80,
        duration: 90,
        deposit: 25,
      },
      {
        id: 's9',
        name: 'Dépose + Repose',
        description: 'Dépose soignée sans lime électrique + nouvelle pose gel.',
        price: 85,
        duration: 105,
        deposit: 25,
      },
    ],
  },
  {
    id: '3',
    slug: 'the-nail-lab',
    salon_name: 'The Nail Lab 🔬',
    name: 'Inès Moreau',
    bio: 'Artiste ongulaire • Spécialiste nail art 3D & chrome • Bordeaux • DM pour visuels personnalisés',
    logo_url: undefined,
    instagram: 'thenaillab_bx',
    rating: 5.0,
    review_count: 54,
    color_accent: '#10b981',
    services: [
      {
        id: 's10',
        name: 'Chrome Mirror Effect',
        description: 'Effet miroir chromé sur gel, rendu spectaculaire garanti.',
        price: 85,
        duration: 90,
        deposit: 30,
      },
      {
        id: 's11',
        name: 'Nail Art 3D',
        description: 'Créations en relief: fleurs, bijoux, textures. Chaque ongle unique.',
        price: 140,
        duration: 180,
        deposit: 50,
      },
      {
        id: 's12',
        name: 'Soft Gel Tips',
        description: 'Extensions ultra-légères en soft gel pour un look naturel.',
        price: 95,
        duration: 120,
        deposit: 35,
      },
      {
        id: 's13',
        name: 'Entretien Mensuel',
        description: 'Remplissage et retouches pour clientes fidèles.',
        price: 45,
        duration: 60,
        deposit: 15,
      },
    ],
  },
];

export const getMerchantBySlug = (slug: string): Merchant | undefined =>
  merchants.find((m) => m.slug === slug);

const today = new Date();
const formatDate = (d: Date) => d.toISOString().split('T')[0];

const pastDate = (daysAgo: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() - daysAgo);
  return formatDate(d);
};

const futureDate = (daysAhead: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + daysAhead);
  return formatDate(d);
};

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    merchant_id: '1',
    client_name: 'Amélie Rousseau',
    client_email: 'amelie@email.fr',
    client_phone: '06 12 34 56 78',
    service: merchants[0].services[0],
    date: futureDate(1),
    time: '10:00',
    deposit: 25,
    status: 'paid',
    created_at: pastDate(2),
  },
  {
    id: 'b2',
    merchant_id: '1',
    client_name: 'Chloé Martin',
    client_email: 'chloe@email.fr',
    client_phone: '06 98 76 54 32',
    service: merchants[0].services[2],
    date: futureDate(1),
    time: '14:00',
    deposit: 40,
    status: 'paid',
    created_at: pastDate(1),
  },
  {
    id: 'b3',
    merchant_id: '1',
    client_name: 'Julie Bernard',
    client_email: 'julie@email.fr',
    client_phone: '07 11 22 33 44',
    service: merchants[0].services[1],
    date: futureDate(2),
    time: '09:00',
    deposit: 15,
    status: 'pending',
    created_at: pastDate(0),
  },
  {
    id: 'b4',
    merchant_id: '1',
    client_name: 'Manon Leblanc',
    client_email: 'manon@email.fr',
    client_phone: '06 55 44 33 22',
    service: merchants[0].services[3],
    date: futureDate(3),
    time: '11:30',
    deposit: 10,
    status: 'paid',
    created_at: pastDate(1),
  },
  {
    id: 'b5',
    merchant_id: '1',
    client_name: 'Emma Petit',
    client_email: 'emma@email.fr',
    client_phone: '06 77 88 99 00',
    service: merchants[0].services[4],
    date: futureDate(4),
    time: '15:30',
    deposit: 30,
    status: 'pending',
    created_at: pastDate(0),
  },
  {
    id: 'b6',
    merchant_id: '1',
    client_name: 'Laura Dubois',
    client_email: 'laura@email.fr',
    client_phone: '06 11 00 99 88',
    service: merchants[0].services[0],
    date: futureDate(5),
    time: '09:30',
    deposit: 25,
    status: 'paid',
    created_at: pastDate(3),
  },
  {
    id: 'b7',
    merchant_id: '1',
    client_name: 'Sophie Girard',
    client_email: 'sophie@email.fr',
    client_phone: '07 22 33 44 55',
    service: merchants[0].services[2],
    date: futureDate(7),
    time: '13:00',
    deposit: 40,
    status: 'paid',
    created_at: pastDate(2),
  },
];

export const mockKPI = {
  revenue: 3245,
  revenue_trend: 12.5,
  bookings_total: 47,
  bookings_confirmed: 42,
  bookings_pending: 5,
  occupation_rate: 78,
  available_balance: 1890,
  stripe_fees: 295,
  nelsy_fees: 240,
  deposits_received: 3780,
};

export const mockRevenueChart: DayRevenue[] = Array.from({ length: 30 }, (_, i) => {
  const d = new Date(today);
  d.setDate(d.getDate() - (29 - i));
  const weekday = d.getDay();
  const isWeekend = weekday === 0 || weekday === 6;
  const base = isWeekend ? 180 : 90;
  const random = Math.floor(Math.random() * 60) - 20;
  return {
    date: formatDate(d),
    revenue: Math.max(0, base + random),
    bookings: Math.floor((base + random) / 25),
  };
});

export const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00',
];

export const CLOSED_DAYS = [0]; // Sunday
