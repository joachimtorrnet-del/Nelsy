import { loadStripe } from '@stripe/stripe-js';
import type { Stripe } from '@stripe/stripe-js';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined;

export const isStripeConfigured = Boolean(stripePublishableKey);

let stripePromise: Promise<Stripe | null> | null = null;

export const getStripe = (): Promise<Stripe | null> => {
  if (!stripePublishableKey) return Promise.resolve(null);
  if (!stripePromise) {
    stripePromise = loadStripe(stripePublishableKey);
  }
  return stripePromise;
};

// Cache per connected account to avoid redundant loadStripe calls.
const stripeByAccount = new Map<string, Promise<Stripe | null>>();

// For direct charges: Stripe.js must be initialized with the connected account
// so it can confirm payments whose PaymentIntent lives on that account.
export const getStripeForAccount = (stripeAccountId: string): Promise<Stripe | null> => {
  if (!stripePublishableKey) return Promise.resolve(null);
  if (!stripeByAccount.has(stripeAccountId)) {
    stripeByAccount.set(
      stripeAccountId,
      loadStripe(stripePublishableKey, { stripeAccount: stripeAccountId }),
    );
  }
  return stripeByAccount.get(stripeAccountId)!;
};

export const stripeConfig = {
  apiVersion: '2023-10-16' as const,
};
