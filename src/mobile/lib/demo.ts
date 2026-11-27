import { STUDIO_TEMPLATES, TEMPLATE_DEMOS } from '@/lib/templateDemos';
import type { Contact } from '@/lib/contacts';
import type { KitItem } from '@/lib/kit';
import type { Product } from '@/lib/products';
import type { Merchant } from '@/types';
import type { ProBooking, ProService, ProSnapshot } from './types';

function hashParams(): URLSearchParams {
  return new URLSearchParams(window.location.hash.split('?')[1] ?? '');
}

/** `?demo=1` renders the app with an example persona and example data. Nothing is read or written. */
export function readDemoFlag(): boolean {
  try {
    const search = new URLSearchParams(window.location.search);
    const hash = hashParams();
    const on = search.get('demo') === '1' || hash.get('demo') === '1';
    if (on) {
      sessionStorage.setItem('nelsy-app-demo', '1');
      // Optional demo knobs: plan=creator unlocks the Creator sections, tz=America/New_York
      // stores a profile timezone different from the device to show the mismatch banner.
      const plan = search.get('plan') ?? hash.get('plan');
      const tz = search.get('tz') ?? hash.get('tz');
      if (plan) sessionStorage.setItem('nelsy-app-demo-plan', plan);
      if (tz) sessionStorage.setItem('nelsy-app-demo-tz', tz);
      // clean=1 hides the demo label, for App Store screenshots only (scripts/mobile/store-screenshots.mjs).
      if ((search.get('clean') ?? hash.get('clean')) === '1') sessionStorage.setItem('nelsy-app-demo-clean', '1');
    }
    return on || sessionStorage.getItem('nelsy-app-demo') === '1';
  } catch {
    return false;
  }
}

export function clearDemoFlag() {
  try {
    sessionStorage.removeItem('nelsy-app-demo');
    sessionStorage.removeItem('nelsy-app-demo-plan');
    sessionStorage.removeItem('nelsy-app-demo-tz');
    sessionStorage.removeItem('nelsy-app-demo-clean');
  } catch {
    /* ignore */
  }
}

export function demoLabelHidden(): boolean {
  return demoKnob('nelsy-app-demo-clean') === '1';
}

function demoKnob(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function deviceTz(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Paris';
  } catch {
    return 'Europe/Paris';
  }
}

// Deterministic example bookings around today: [dayOffset, hour, minute, client, serviceIndex, status]
const EXAMPLE_BOOKINGS: [number, number, number, string, number, ProBooking['status']][] = [
  [0, 10, 0, 'Jade M.', 0, 'confirmed'],
  [0, 14, 30, 'Sofia R.', 2, 'paid'],
  [0, 18, 0, 'Clara N.', 3, 'paid'],
  [1, 11, 0, 'Amina K.', 1, 'pending'],
  [2, 16, 0, 'Lou B.', 0, 'confirmed'],
  [4, 9, 30, 'Chloé D.', 1, 'paid'],
  [-1, 15, 0, 'Maya T.', 2, 'completed'],
  [-1, 17, 30, 'Emma L.', 0, 'cancelled'],
  [-3, 10, 30, 'Nora P.', 1, 'completed'],
  [-6, 13, 0, 'Lina S.', 0, 'completed'],
  [-9, 11, 0, 'Zoé A.', 2, 'completed'],
  [-12, 14, 0, 'Inès V.', 1, 'completed'],
  [-15, 16, 30, 'Rose F.', 0, 'no_show'],
  [-18, 10, 0, 'Alice G.', 2, 'completed'],
  [-22, 12, 0, 'Léa H.', 1, 'completed'],
  [-26, 15, 30, 'Julia C.', 0, 'completed'],
];

const DAY = 86_400_000;
const daysAgo = (d: number) => new Date(Date.now() - d * DAY).toISOString();

// Example online session (Creator plan): shows the "Video call" badge and the meeting link.
const ONLINE_SERVICE: ProService = {
  id: 'demo-online',
  name: '1:1 nail art coaching',
  description: 'A 45 minute video call to review your technique and answer your questions.',
  price: 60,
  duration: 45,
  deposit: 0,
  payment_mode: 'full',
  location_type: 'online',
  active: true,
  online: true,
};

function demoProducts(profileId: string, currency: string): Product[] {
  const base = {
    profile_id: profileId,
    currency: currency.toLowerCase(),
    cover_url: null,
    file_path: `${profileId}/file.pdf`,
    file_size_bytes: 2_400_000,
    settings: {},
    archived_at: null,
    created_at: daysAgo(20),
    updated_at: daysAgo(2),
  };
  return [
    { ...base, id: 'demo-p1', type: 'digital', title: 'Aftercare guide for gel extensions', description: 'A 12 page PDF for your clients.', price_cents: 900, file_name: 'aftercare-guide.pdf', is_active: true, position: 0 },
    { ...base, id: 'demo-p2', type: 'digital', title: 'Price list template', description: 'Editable price list for your salon.', price_cents: 1500, file_name: 'price-list.pdf', is_active: true, position: 1 },
    { ...base, id: 'demo-p3', type: 'free_resource', title: 'Nail shape cheat sheet', description: 'Free download for your followers.', price_cents: 0, file_name: 'nail-shapes.pdf', is_active: true, position: 2 },
    { ...base, id: 'demo-p4', type: 'digital', title: 'Gel removal at home', description: null, price_cents: 700, file_name: 'removal.pdf', is_active: false, position: 3 },
  ];
}

function demoKit(profileId: string): KitItem[] {
  const base = { profile_id: profileId, note: null, image_url: null, promo_code: null, is_active: true, created_at: daysAgo(15), updated_at: daysAgo(3) };
  return [
    { ...base, id: 'demo-k1', title: 'Builder gel, clear', brand: 'Example Brand', category: 'Gel & polish', url: 'https://example.com/builder-gel', promo_code: 'INES10', position: 0 },
    { ...base, id: 'demo-k2', title: 'LED lamp 48W', brand: 'Example Brand', category: 'Lamps', url: 'https://example.com/lamp', position: 1 },
    { ...base, id: 'demo-k3', title: 'Cuticle oil pen', brand: 'Example Brand', category: 'Care', url: 'https://example.com/oil', position: 2 },
  ];
}

export const DEMO_CONTACTS: Contact[] = [
  ['c1', 'client.one@example.com', 'Lina', 'free_resource', true, 0],
  ['c2', 'client.two@example.com', 'Alex', 'free_resource', false, 1],
  ['c3', 'client.three@example.com', null, 'product_purchase', false, 2],
  ['c4', 'client.four@example.com', 'Sam', 'free_resource', true, 4],
  ['c5', 'client.five@example.com', 'Jo', 'product_purchase', true, 6],
  ['c6', 'client.six@example.com', null, 'free_resource', true, 9],
].map(([id, email, first, source, consent, d]) => ({
  id: id as string,
  profile_id: 'demo',
  email: email as string,
  first_name: first as string | null,
  source: source as Contact['source'],
  source_ref: null,
  consent_marketing: consent as boolean,
  consent_at: consent ? daysAgo(d as number) : null,
  unsubscribed_at: id === 'c5' ? daysAgo(2) : null,
  last_activity_at: daysAgo(d as number),
  created_at: daysAgo(d as number),
}));

export function buildDemoSnapshot(): ProSnapshot {
  const template = STUDIO_TEMPLATES[0];
  const base = TEMPLATE_DEMOS[template.id];
  const merchant: Merchant = { ...base, theme_preset: template.themeId, color_accent: template.accentColor };
  const plan = demoKnob('nelsy-app-demo-plan') === 'creator' ? 'creator_monthly' : 'independent_monthly';
  const creator = plan.startsWith('creator');
  const timezone = demoKnob('nelsy-app-demo-tz') || deviceTz();
  const services: ProService[] = [
    ...merchant.services.map((s) => ({ ...s, active: true, online: false })),
    ...(creator ? [ONLINE_SERVICE] : []),
  ];

  const now = new Date();
  const bookings: ProBooking[] = EXAMPLE_BOOKINGS.filter(([, , , , si]) => si < services.length).map(([day, h, m, client, si, status], i) => {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + day, h, m);
    const svc = services[si];
    const first = client.split(' ')[0].toLowerCase().normalize('NFD').replace(/[^a-z]/g, '');
    return {
      id: `demo-b${i}`,
      datetime: d.toISOString(),
      clientName: client,
      clientEmail: `${first}@example.com`,
      clientPhone: '+1 555 0100',
      serviceId: svc.id,
      serviceName: svc.name,
      price: svc.price,
      depositPaid: status === 'pending' ? 0 : svc.deposit,
      duration: svc.duration,
      status,
      online: svc.online,
      videoUrl: svc.online ? 'https://meet.example.com/ines-coaching' : null,
    };
  });

  const earned = bookings
    .filter((b) => b.status === 'completed' || b.status === 'paid' || b.status === 'confirmed')
    .reduce((sum, b) => sum + b.price, 0);
  const balance = bookings.filter((b) => b.status === 'completed').reduce((sum, b) => sum + b.price, 0);
  const currency = merchant.currency ?? 'USD';

  return {
    mode: 'demo',
    profileId: merchant.id,
    email: 'example@getnelsy.com',
    fullName: merchant.name,
    salonName: merchant.salon_name,
    slug: merchant.slug,
    avatarUrl: merchant.logo_url ?? null,
    currency,
    plan,
    subscriptionStatus: 'trialing',
    planRenewsAt: new Date(Date.now() + 9 * DAY).toISOString(),
    stripeConnected: true,
    timezone,
    notificationPrefs: {},
    merchant: { ...merchant, services: services.filter((s) => s.active) },
    services,
    bookings,
    products: creator ? demoProducts(merchant.id, currency) : [],
    kit: creator ? demoKit(merchant.id) : [],
    totalRevenue: earned,
    balance,
    pageViews28: 312,
  };
}
