import { createContext, useCallback, useContext } from 'react';
import type { ReactNode } from 'react';

// Currencies Stripe treats as zero-decimal among those Nelsy supports
const ZERO_DECIMAL = new Set(['JPY', 'KRW', 'HUF', 'ISK', 'IDR']);

export function formatMoney(amount: number, currency = 'EUR'): string {
  const code = currency.toUpperCase();
  const whole = ZERO_DECIMAL.has(code) || Number.isInteger(amount);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: code,
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
  }).format(amount);
}

const CurrencyContext = createContext('EUR');

/** Prices inside a studio are shown in the pro's business currency. */
export function CurrencyProvider({ currency, children }: { currency?: string | null; children: ReactNode }) {
  return <CurrencyContext.Provider value={(currency || 'EUR').toUpperCase()}>{children}</CurrencyContext.Provider>;
}

export function useMoney() {
  const currency = useContext(CurrencyContext);
  return useCallback((amount: number) => formatMoney(amount, currency), [currency]);
}
