// Sales currencies a pro may pick, per business country. Keep in sync with
// COUNTRY_ALLOWED_CURRENCIES in src/pages/dashboard/StripeSettings.tsx.
export const COUNTRY_ALLOWED_CURRENCIES: Record<string, string[]> = {
  AT: ['eur'], BE: ['eur'], BG: ['bgn', 'eur'], CY: ['eur'], CZ: ['czk', 'eur'],
  DK: ['dkk', 'eur'], EE: ['eur'], FI: ['eur'], FR: ['eur'], DE: ['eur'],
  GR: ['eur'], HR: ['eur'], HU: ['huf', 'eur'], IE: ['eur'], IS: ['isk'],
  IT: ['eur'], LV: ['eur'], LI: ['chf'], LT: ['eur'], LU: ['eur'], MT: ['eur'],
  NL: ['eur'], NO: ['nok'], PL: ['pln'], PT: ['eur'], RO: ['ron'], SE: ['sek'],
  SK: ['eur'], SI: ['eur'], ES: ['eur'], CH: ['chf'],
  AU: ['aud'], CA: ['cad'], GB: ['gbp'], GI: ['gbp'], HK: ['hkd'],
  IN: ['inr'], ID: ['idr'], JP: ['jpy'], KR: ['krw'], MY: ['myr'],
  MX: ['mxn'], NZ: ['nzd'], SG: ['sgd'], TH: ['thb'], AE: ['aed'],
  US: ['usd'],
}

export function isAllowedCurrency(country: string | null | undefined, currency: string | null | undefined): boolean {
  if (!country || !currency) return false
  return (COUNTRY_ALLOWED_CURRENCIES[country.toUpperCase()] ?? []).includes(currency.toLowerCase())
}
