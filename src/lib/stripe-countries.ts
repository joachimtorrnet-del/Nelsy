// Stripe Connect Express supported countries (as of 2025-10).
// Source: https://stripe.com/docs/connect/cross-border-payouts
//
// Each entry: ISO-3166-1 alpha-2 code → { currency, timezone, label }
// - currency: ISO-4217 lowercase (used in Stripe API calls)
// - timezone: IANA default for the country (one per country; user can override in settings)
// - label: display name in the country selector

export interface StripeCountry {
  currency: string;
  timezone: string;
  label: string;
  /**
   * preview: true = technically wired, but requires explicit Stripe API verification
   * (destination charge from FR platform to that country, local compliance requirements,
   * or cross-border payout restrictions). Show with a warning in the UI.
   * preview: false or absent = verified tier (EU/EEA, UK, US, CA, AU, NZ, HK, SG, JP).
   */
  preview?: boolean;
}

// Zero-decimal currencies: Stripe expects the amount directly, not * 100.
export const ZERO_DECIMAL_CURRENCIES = new Set(['jpy', 'krw'])

export const STRIPE_COUNTRIES: Record<string, StripeCountry> = {
  AU: { currency: 'aud', timezone: 'Australia/Sydney',       label: 'Australia' },
  AT: { currency: 'eur', timezone: 'Europe/Vienna',          label: 'Austria' },
  BE: { currency: 'eur', timezone: 'Europe/Brussels',        label: 'Belgium' },
  BG: { currency: 'bgn', timezone: 'Europe/Sofia',           label: 'Bulgaria' },
  CA: { currency: 'cad', timezone: 'America/Toronto',        label: 'Canada' },
  HR: { currency: 'eur', timezone: 'Europe/Zagreb',          label: 'Croatia' },
  CY: { currency: 'eur', timezone: 'Asia/Nicosia',           label: 'Cyprus' },
  CZ: { currency: 'czk', timezone: 'Europe/Prague',          label: 'Czech Republic' },
  DK: { currency: 'dkk', timezone: 'Europe/Copenhagen',      label: 'Denmark' },
  EE: { currency: 'eur', timezone: 'Europe/Tallinn',         label: 'Estonia' },
  FI: { currency: 'eur', timezone: 'Europe/Helsinki',        label: 'Finland' },
  FR: { currency: 'eur', timezone: 'Europe/Paris',           label: 'France' },
  DE: { currency: 'eur', timezone: 'Europe/Berlin',          label: 'Germany' },
  GI: { currency: 'gbp', timezone: 'Europe/Gibraltar',       label: 'Gibraltar' },
  GR: { currency: 'eur', timezone: 'Europe/Athens',          label: 'Greece' },
  HK: { currency: 'hkd', timezone: 'Asia/Hong_Kong',         label: 'Hong Kong' },
  HU: { currency: 'huf', timezone: 'Europe/Budapest',        label: 'Hungary' },
  IN: { currency: 'inr', timezone: 'Asia/Kolkata',           label: 'India',                   preview: true },
  ID: { currency: 'idr', timezone: 'Asia/Jakarta',           label: 'Indonesia',               preview: true },
  IE: { currency: 'eur', timezone: 'Europe/Dublin',          label: 'Ireland' },
  IS: { currency: 'isk', timezone: 'Atlantic/Reykjavik',     label: 'Iceland' },
  IT: { currency: 'eur', timezone: 'Europe/Rome',            label: 'Italy' },
  JP: { currency: 'jpy', timezone: 'Asia/Tokyo',             label: 'Japan' },
  LV: { currency: 'eur', timezone: 'Europe/Riga',            label: 'Latvia' },
  LI: { currency: 'chf', timezone: 'Europe/Vaduz',           label: 'Liechtenstein' },
  LT: { currency: 'eur', timezone: 'Europe/Vilnius',         label: 'Lithuania' },
  LU: { currency: 'eur', timezone: 'Europe/Luxembourg',      label: 'Luxembourg' },
  MY: { currency: 'myr', timezone: 'Asia/Kuala_Lumpur',      label: 'Malaysia',                preview: true },
  MT: { currency: 'eur', timezone: 'Europe/Malta',           label: 'Malta' },
  MX: { currency: 'mxn', timezone: 'America/Mexico_City',    label: 'Mexico',                  preview: true },
  NL: { currency: 'eur', timezone: 'Europe/Amsterdam',       label: 'Netherlands' },
  NZ: { currency: 'nzd', timezone: 'Pacific/Auckland',       label: 'New Zealand' },
  NO: { currency: 'nok', timezone: 'Europe/Oslo',            label: 'Norway' },
  PL: { currency: 'pln', timezone: 'Europe/Warsaw',          label: 'Poland' },
  PT: { currency: 'eur', timezone: 'Europe/Lisbon',          label: 'Portugal' },
  RO: { currency: 'ron', timezone: 'Europe/Bucharest',       label: 'Romania' },
  SG: { currency: 'sgd', timezone: 'Asia/Singapore',         label: 'Singapore' },
  SK: { currency: 'eur', timezone: 'Europe/Bratislava',      label: 'Slovakia' },
  SI: { currency: 'eur', timezone: 'Europe/Ljubljana',       label: 'Slovenia' },
  KR: { currency: 'krw', timezone: 'Asia/Seoul',             label: 'South Korea',             preview: true },
  ES: { currency: 'eur', timezone: 'Europe/Madrid',          label: 'Spain' },
  SE: { currency: 'sek', timezone: 'Europe/Stockholm',       label: 'Sweden' },
  CH: { currency: 'chf', timezone: 'Europe/Zurich',          label: 'Switzerland' },
  TH: { currency: 'thb', timezone: 'Asia/Bangkok',           label: 'Thailand',                preview: true },
  AE: { currency: 'aed', timezone: 'Asia/Dubai',             label: 'United Arab Emirates',    preview: true },
  GB: { currency: 'gbp', timezone: 'Europe/London',          label: 'United Kingdom' },
  US: { currency: 'usd', timezone: 'America/New_York',       label: 'United States' },
}

// Stripe minimum charge amounts per currency (major unit, not cents).
// Source: https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts
export const STRIPE_MINIMUMS: Record<string, number> = {
  aud: 0.50, bgn: 1.00, cad: 0.50, chf: 0.50, czk: 15.00,
  dkk: 2.50, eur: 0.50, gbp: 0.30, hkd: 4.00, huf: 175,
  idr: 10000, inr: 0.50, isk: 100, jpy: 50, krw: 50,
  mxn: 10.00, myr: 2.00, nok: 3.00, nzd: 0.50, pln: 2.00,
  ron: 2.00, sek: 3.00, sgd: 0.50, thb: 10.00, usd: 0.50,
  aed: 2.00,
}

// Flat fee component of Stripe's per-transaction fee, per currency.
// These are approximate and for the per-charge Stripe fee estimate only.
export const STRIPE_FLAT_FEES: Record<string, number> = {
  usd: 0.30, eur: 0.25, gbp: 0.20, aud: 0.30, cad: 0.30,
  nzd: 0.30, sgd: 0.50, hkd: 2.35, chf: 0.30, dkk: 1.80,
  nok: 2.00, sek: 1.80, pln: 1.00, czk: 6.50, huf: 85,
  mxn: 3.00, jpy: 30,   krw: 330,  thb: 10,   inr: 2.00,
  myr: 1.50, aed: 1.00, ron: 1.00, bgn: 0.50, idr: 4300,
  isk: 65,
}

export const SUPPORTED_COUNTRY_CODES = Object.keys(STRIPE_COUNTRIES)

// Sorted list for use in <select> elements (all countries including preview)
export const STRIPE_COUNTRIES_LIST = Object.entries(STRIPE_COUNTRIES)
  .map(([code, data]) => ({ code, ...data }))
  .sort((a, b) => a.label.localeCompare(b.label))

// Verified-tier only (EU/EEA, UK, US, CA, AU, NZ, HK, SG, JP)
// These have been confirmed as compatible destination-charge destinations from a French platform account.
export const STRIPE_COUNTRIES_VERIFIED = Object.entries(STRIPE_COUNTRIES)
  .filter(([, data]) => !data.preview)
  .map(([code, data]) => ({ code, ...data }))
  .sort((a, b) => a.label.localeCompare(b.label))

// Preview-tier countries: technically wired but require explicit cross-border payout verification.
export const STRIPE_COUNTRIES_PREVIEW = Object.entries(STRIPE_COUNTRIES)
  .filter(([, data]) => !!data.preview)
  .map(([code, data]) => ({ code, ...data }))
  .sort((a, b) => a.label.localeCompare(b.label))

/** Format a monetary amount for display, e.g. formatAmount(50, 'eur') → '€50.00' */
export function formatAmount(amount: number, currency: string): string {
  const curr = currency.toUpperCase()
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: curr,
      minimumFractionDigits: ZERO_DECIMAL_CURRENCIES.has(currency.toLowerCase()) ? 0 : 2,
    }).format(amount)
  } catch {
    return `${curr} ${amount.toFixed(ZERO_DECIMAL_CURRENCIES.has(currency.toLowerCase()) ? 0 : 2)}`
  }
}

/** Convert Stripe amount (smallest unit) to major unit, accounting for zero-decimal currencies. */
export function stripeAmountToMajor(amount: number, currency: string): number {
  return ZERO_DECIMAL_CURRENCIES.has(currency.toLowerCase()) ? amount : amount / 100
}

/** Convert major unit to Stripe smallest unit. */
export function majorToStripeAmount(amount: number, currency: string): number {
  return ZERO_DECIMAL_CURRENCIES.has(currency.toLowerCase())
    ? Math.round(amount)
    : Math.round(amount * 100)
}
