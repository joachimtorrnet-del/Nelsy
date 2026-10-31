/**
 * DEPRECATED — 2026-10-31
 *
 * Fee estimation was used with destination charges (application_fee_amount) to
 * approximate Nelsy-neutral operation. Nelsy now uses direct charges on Custom
 * Connect accounts: Stripe deducts processing fees from the connected account
 * directly, with no application_fee_amount. These tables are kept for historical
 * reference only; they are not imported by any active Edge Function.
 *
 * Do NOT re-enable for new payment flows.
 */

export const ZERO_DECIMAL_CURRENCIES = new Set(['jpy', 'krw', 'bif', 'clp', 'gnf', 'mga', 'pyg', 'rwf', 'ugx', 'vnd'])

// Percentage component (e.g. 0.015 = 1.5%)
const FEE_PERCENT: Record<string, number> = {
  eur: 0.015, gbp: 0.015, chf: 0.015, dkk: 0.015, nok: 0.015,
  sek: 0.015, pln: 0.015, czk: 0.015, huf: 0.015, ron: 0.015,
  bgn: 0.015, isk: 0.015,
  usd: 0.029, cad: 0.029, aud: 0.017, nzd: 0.029,
  hkd: 0.034, sgd: 0.034,
  myr: 0.025, inr: 0.025, thb: 0.025, idr: 0.025,
  jpy: 0.036, krw: 0.036,
  mxn: 0.036, aed: 0.029,
}

// Fixed component in major currency unit (e.g. 0.25 = €0.25)
const FEE_FIXED: Record<string, number> = {
  eur: 0.25, gbp: 0.20, chf: 0.30, dkk: 1.80, nok: 2.00,
  sek: 1.80, pln: 1.00, czk: 6.50, huf: 85, ron: 1.00,
  bgn: 0.50, isk: 65,
  usd: 0.30, cad: 0.30, aud: 0.30, nzd: 0.30,
  hkd: 2.35, sgd: 0.50,
  myr: 1.50, inr: 2.00, thb: 10, idr: 4300,
  jpy: 30, krw: 330,
  mxn: 3.00, aed: 1.00,
}

/**
 * Estimate Stripe processing fee for a given amount and currency.
 * Returns the fee in the currency's smallest unit (cents for EUR, whole units for JPY).
 * This is used as application_fee_amount so the pro's connected account bears the cost.
 */
export function estimateStripeFeeSmallestUnit(amountSmallest: number, currency: string): number {
  const cur = currency.toLowerCase()
  const pct = FEE_PERCENT[cur] ?? 0.029
  const fixedMajor = FEE_FIXED[cur] ?? 0.30
  const isZeroDecimal = ZERO_DECIMAL_CURRENCIES.has(cur)

  // Convert fixed fee to smallest unit
  const fixedSmallest = isZeroDecimal ? fixedMajor : Math.round(fixedMajor * 100)

  // Total estimated fee in smallest unit, rounded up to avoid under-charging
  return Math.ceil(amountSmallest * pct + fixedSmallest)
}

/**
 * Estimate fee in major unit (for display purposes).
 * Present in UI as "~€0.XX (estimé)" — never as an exact amount.
 */
export function estimateStripeFeeDisplay(amountMajor: number, currency: string): number {
  const cur = currency.toLowerCase()
  const pct = FEE_PERCENT[cur] ?? 0.029
  const fixed = FEE_FIXED[cur] ?? 0.30
  return amountMajor * pct + fixed
}
