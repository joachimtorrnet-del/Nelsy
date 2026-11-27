import { STUDIO_TEMPLATES, TEMPLATE_DEMOS } from '@/lib/templateDemos';
import type { Merchant } from '@/types';
import type { ProBooking, ProService, ProSnapshot } from './types';

/** `?demo=1` renders the app with an example persona and example data. Nothing is read or written. */
export function readDemoFlag(): boolean {
  try {
    const hashQuery = window.location.hash.split('?')[1] ?? '';
    const on =
      new URLSearchParams(window.location.search).get('demo') === '1' ||
      new URLSearchParams(hashQuery).get('demo') === '1';
    if (on) sessionStorage.setItem('nelsy-app-demo', '1');
    return on || sessionStorage.getItem('nelsy-app-demo') === '1';
  } catch {
    return false;
  }
}

export function clearDemoFlag() {
  try {
    sessionStorage.removeItem('nelsy-app-demo');
  } catch {
    /* ignore */
  }
}

// Deterministic example bookings around today: [dayOffset, hour, minute, client, serviceIndex, status]
const EXAMPLE_BOOKINGS: [number, number, number, string, number, ProBooking['status']][] = [
  [0, 10, 0, 'Jade M.', 0, 'confirmed'],
  [0, 14, 30, 'Sofia R.', 2, 'paid'],
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

export function buildDemoSnapshot(): ProSnapshot {
  const template = STUDIO_TEMPLATES[0];
  const base = TEMPLATE_DEMOS[template.id];
  const merchant: Merchant = { ...base, theme_preset: template.themeId, color_accent: template.accentColor };
  const services: ProService[] = merchant.services.map((s) => ({ ...s, active: true }));

  const now = new Date();
  const bookings: ProBooking[] = EXAMPLE_BOOKINGS.map(([day, h, m, client, si, status], i) => {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + day, h, m);
    const svc = services[si];
    return {
      id: `demo-b${i}`,
      datetime: d.toISOString(),
      clientName: client,
      serviceName: svc.name,
      price: svc.price,
      depositPaid: status === 'pending' ? 0 : svc.deposit,
      duration: svc.duration,
      status,
    };
  });

  const earned = bookings
    .filter((b) => b.status === 'completed' || b.status === 'paid' || b.status === 'confirmed')
    .reduce((sum, b) => sum + b.price, 0);
  const balance = bookings.filter((b) => b.status === 'completed').reduce((sum, b) => sum + b.price, 0);

  return {
    mode: 'demo',
    profileId: merchant.id,
    email: 'example@getnelsy.com',
    fullName: merchant.name,
    salonName: merchant.salon_name,
    slug: merchant.slug,
    avatarUrl: merchant.logo_url ?? null,
    currency: merchant.currency ?? 'USD',
    plan: 'Monthly',
    subscriptionStatus: 'trialing',
    merchant,
    services,
    bookings,
    totalRevenue: earned,
    balance,
    pageViews28: 312,
  };
}
