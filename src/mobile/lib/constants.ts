export const PINK = '#F52B8C';
export const INK = '#1A1A1A';

export const WEB_ORIGIN = 'https://getnelsy.com';
export const SUPPORT_EMAIL = 'hello@getnelsy.com';

// Shown in Settings. Keep in sync with package.json / native build numbers.
export const APP_VERSION = '1.0.0';
export const APP_BUILD = '1';

/** Website pages the app hands off to (signup, plan, payouts, editors). */
export const WEB = {
  signup: `${WEB_ORIGIN}/onboarding`,
  forgotPassword: `${WEB_ORIGIN}/forgot-password`,
  plan: `${WEB_ORIGIN}/dashboard/settings`,
  settings: `${WEB_ORIGIN}/dashboard/settings`,
  payouts: `${WEB_ORIGIN}/dashboard/stripe`,
  analytics: `${WEB_ORIGIN}/dashboard/analytics`,
  design: `${WEB_ORIGIN}/dashboard/preview`,
  products: `${WEB_ORIGIN}/dashboard/products`,
  kit: `${WEB_ORIGIN}/dashboard/kit`,
  audience: `${WEB_ORIGIN}/dashboard/audience`,
  calendar: `${WEB_ORIGIN}/dashboard/calendar`,
  pricing: `${WEB_ORIGIN}/pricing`,
  newService: `${WEB_ORIGIN}/dashboard/offer/new`,
  editService: (id: string) => `${WEB_ORIGIN}/dashboard/offer/${id}`,
  terms: `${WEB_ORIGIN}/terms`,
  privacy: `${WEB_ORIGIN}/privacy`,
};

export const pageUrl = (slug: string) => `getnelsy.com/${slug}`;
