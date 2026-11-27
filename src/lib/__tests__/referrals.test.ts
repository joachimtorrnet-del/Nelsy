/**
 * Referral program rules (supabase/functions/_shared/referrals.ts): commission math, 30-day hold,
 * reversal, self-referral guard, attribution. Used by stripe-webhooks, request-referral-payout,
 * /affiliates and the dashboard Referrals tab.
 */
import { describe, it, expect } from 'vitest';
import {
  REFERRAL_TERMS,
  applyRefund,
  canRequestPayout,
  commissionCents,
  commissionableCents,
  effectiveStatus,
  holdEndsAt,
  isRefFresh,
  nextReferralStatus,
  normalizeEmail,
  parseRef,
  pickStoredRef,
  selfReferralReason,
  simulateEarnings,
  summarizeCommissions,
} from '../../../supabase/functions/_shared/referrals.ts';
import type { CommissionLike } from '../../../supabase/functions/_shared/referrals.ts';

const DAY = 86_400_000;
const NOW = new Date('2026-12-01T12:00:00Z');
const daysAgo = (n: number) => new Date(NOW.getTime() - n * DAY).toISOString();

const commission = (patch: Partial<CommissionLike> & { paidDaysAgo?: number } = {}): CommissionLike => {
  const { paidDaysAgo = 0, ...rest } = patch;
  return {
    status: 'pending',
    commission_cents: 580,
    available_at: holdEndsAt(daysAgo(paidDaysAgo)).toISOString(),
    payout_id: null,
    clawback_payout_id: null,
    ...rest,
  };
};

describe('terms', () => {
  it('are the founder-approved ones', () => {
    expect(REFERRAL_TERMS.commissionRateBps).toBe(2000);
    expect(REFERRAL_TERMS.holdDays).toBe(30);
    expect(REFERRAL_TERMS.minPayoutCents).toBe(5000);
    expect(REFERRAL_TERMS.cookieDays).toBe(60);
  });
});

describe('commission math', () => {
  it('is 20% of what was collected', () => {
    expect(commissionCents(2900)).toBe(580); // Independent monthly
    expect(commissionCents(30000)).toBe(6000); // Independent yearly
  });

  it('rounds down and never goes negative', () => {
    expect(commissionCents(2999)).toBe(599);
    expect(commissionCents(4)).toBe(0);
    expect(commissionCents(0)).toBe(0);
    expect(commissionCents(-2900)).toBe(0);
    expect(commissionCents(Number.NaN)).toBe(0);
  });

  it('pays nothing on a free trial invoice', () => {
    expect(commissionableCents({ amount_paid: 0, subscription: 'sub_1' })).toBe(0);
  });

  it('only counts subscription invoices, on the amount actually paid, without tax', () => {
    expect(commissionableCents({ amount_paid: 2900, subscription: 'sub_1' })).toBe(2900);
    expect(commissionableCents({ amount_paid: 3480, tax: 580, subscription: 'sub_1' })).toBe(2900);
    expect(commissionableCents({ amount_paid: 2900, subscription: null })).toBe(0);
    // Invoice partly covered by account credit: commission on the cash part only
    expect(commissionableCents({ amount_paid: 1000, subscription: 'sub_1' })).toBe(1000);
  });

  it('simulator: n × $29 × 20% a month, × 12 a year', () => {
    expect(simulateEarnings(1, 29)).toEqual({ monthly: 5.8, yearly: 69.6 });
    expect(simulateEarnings(10, 29)).toEqual({ monthly: 58, yearly: 696 });
    expect(simulateEarnings(200, 29)).toEqual({ monthly: 1160, yearly: 13920 });
    expect(simulateEarnings(0, 29)).toEqual({ monthly: 0, yearly: 0 });
  });
});

describe('30-day hold', () => {
  it('ends 30 days after the payment', () => {
    expect(holdEndsAt('2026-11-01T00:00:00Z').toISOString()).toBe('2026-12-01T00:00:00.000Z');
  });

  it('keeps a commission pending until the hold is over, then counts it as approved', () => {
    expect(effectiveStatus(commission({ paidDaysAgo: 29 }), NOW)).toBe('pending');
    expect(effectiveStatus(commission({ paidDaysAgo: 30 }), NOW)).toBe('approved');
    expect(effectiveStatus(commission({ paidDaysAgo: 45 }), NOW)).toBe('approved');
  });

  it('never revives a reversed commission or downgrades a paid one', () => {
    expect(effectiveStatus(commission({ status: 'reversed', paidDaysAgo: 45 }), NOW)).toBe('reversed');
    expect(effectiveStatus(commission({ status: 'paid', paidDaysAgo: 1 }), NOW)).toBe('paid');
  });
});

describe('reversal on refund or chargeback', () => {
  it('reverses the commission on a full refund', () => {
    expect(applyRefund({ status: 'pending', commission_cents: 580, payout_id: null }, 2900, 2900))
      .toEqual({ status: 'reversed', commission_cents: 580, changed: true, needsReview: false });
    expect(applyRefund({ status: 'approved', commission_cents: 580, payout_id: null }, 2900, 2900).status).toBe('reversed');
  });

  it('flags a full refund that arrives after the payout', () => {
    const out = applyRefund({ status: 'paid', commission_cents: 580, payout_id: 'p1' }, 2900, 2900);
    expect(out.status).toBe('reversed');
    expect(out.needsReview).toBe(true);
  });

  it('recomputes the commission on a partial refund before payout', () => {
    expect(applyRefund({ status: 'pending', commission_cents: 580, payout_id: null }, 2900, 900))
      .toEqual({ status: 'pending', commission_cents: 400, changed: true, needsReview: false });
  });

  it('leaves a partial refund after payout to a person', () => {
    expect(applyRefund({ status: 'paid', commission_cents: 580, payout_id: 'p1' }, 2900, 900))
      .toEqual({ status: 'paid', commission_cents: 580, changed: false, needsReview: true });
  });

  it('is idempotent', () => {
    expect(applyRefund({ status: 'reversed', commission_cents: 580, payout_id: null }, 2900, 2900).changed).toBe(false);
    expect(applyRefund({ status: 'pending', commission_cents: 400, payout_id: null }, 2900, 900).changed).toBe(false);
    expect(applyRefund({ status: 'pending', commission_cents: 580, payout_id: null }, 2900, 0).changed).toBe(false);
  });
});

describe('balance and payout threshold', () => {
  const rows: CommissionLike[] = [
    commission({ paidDaysAgo: 5 }), // pending 580
    commission({ paidDaysAgo: 40 }), // hold over, row not flipped yet: approved 580
    commission({ status: 'approved', commission_cents: 6000, paidDaysAgo: 60 }), // approved 6000
    commission({ status: 'approved', paidDaysAgo: 70, payout_id: 'p2' }), // in an open payout
    commission({ status: 'paid', paidDaysAgo: 100, payout_id: 'p1' }), // paid
    commission({ status: 'reversed', paidDaysAgo: 20 }), // refunded inside the hold
  ];

  it('splits commissions into pending, approved, in payout and paid', () => {
    expect(summarizeCommissions(rows, NOW)).toEqual({
      earnedCents: 580 * 4 + 6000,
      pendingCents: 580,
      approvedCents: 6580,
      deductionCents: 0,
      availableCents: 6580,
      inPayoutCents: 580,
      paidCents: 580,
    });
  });

  it('deducts a commission reversed after it was paid, once', () => {
    const clawback = commission({ status: 'reversed', paidDaysAgo: 100, payout_id: 'p1' });
    expect(summarizeCommissions([...rows, clawback], NOW).availableCents).toBe(6580 - 580);
    expect(summarizeCommissions([...rows, { ...clawback, clawback_payout_id: 'p3' }], NOW).availableCents).toBe(6580);
  });

  it('allows a payout request from $50 of approved balance, one at a time', () => {
    expect(canRequestPayout({ availableCents: 4999 }, false)).toBe(false);
    expect(canRequestPayout({ availableCents: 5000 }, false)).toBe(true);
    expect(canRequestPayout({ availableCents: 9000 }, true)).toBe(false);
    // Pending money does not count
    expect(canRequestPayout(summarizeCommissions([commission({ commission_cents: 9000, paidDaysAgo: 3 })], NOW), false)).toBe(false);
  });
});

describe('referral status', () => {
  it('follows the referred pro', () => {
    expect(nextReferralStatus('signed_up', { type: 'subscription', subscriptionStatus: 'trialing' })).toBe('trialing');
    expect(nextReferralStatus('trialing', { type: 'invoice_paid' })).toBe('paying');
    expect(nextReferralStatus('paying', { type: 'subscription', subscriptionStatus: 'canceled', deleted: true })).toBe('churned');
    expect(nextReferralStatus('churned', { type: 'invoice_paid' })).toBe('paying');
  });

  it('does not call a trial or a bare active status a payment', () => {
    expect(nextReferralStatus('trialing', { type: 'subscription', subscriptionStatus: 'active' })).toBe('trialing');
    expect(nextReferralStatus('paying', { type: 'subscription', subscriptionStatus: 'trialing' })).toBe('paying');
  });

  it('a trial that ends without a card is churned, a never-started account stays signed up', () => {
    expect(nextReferralStatus('trialing', { type: 'subscription', subscriptionStatus: 'canceled', deleted: true })).toBe('churned');
    expect(nextReferralStatus('signed_up', { type: 'subscription', subscriptionStatus: 'canceled', deleted: true })).toBe('signed_up');
  });
});

describe('self-referral guard', () => {
  const referrer = { userId: 'u1', stripeCustomerId: 'cus_1', emails: ['Maya.Laurent@gmail.com'], cardFingerprints: ['fp_A'] };

  it('blocks the same user', () => {
    expect(selfReferralReason(referrer, { userId: 'u1' })).toBe('same_user');
  });

  it('blocks the same Stripe customer', () => {
    expect(selfReferralReason(referrer, { userId: 'u2', stripeCustomerId: 'cus_1' })).toBe('same_customer');
  });

  it('blocks the same email, whatever the spelling', () => {
    expect(selfReferralReason(referrer, { userId: 'u2', emails: ['mayalaurent+nelsy2@googlemail.com'] })).toBe('same_email');
    expect(selfReferralReason(referrer, { userId: 'u2', emails: [null, ' MAYA.LAURENT@GMAIL.COM '] })).toBe('same_email');
  });

  it('blocks the same payment card', () => {
    expect(selfReferralReason(referrer, { userId: 'u2', emails: ['other@example.com'], cardFingerprints: ['fp_A'] })).toBe('same_card');
  });

  it('lets a real referral through, including when data is missing', () => {
    expect(selfReferralReason(referrer, { userId: 'u2', stripeCustomerId: 'cus_2', emails: ['lea@example.com'], cardFingerprints: ['fp_B'] })).toBeNull();
    expect(selfReferralReason({ userId: 'u1' }, { userId: 'u2', emails: [null], cardFingerprints: [null] })).toBeNull();
    expect(selfReferralReason({ userId: 'u1', emails: [''] }, { userId: 'u2', emails: [''] })).toBeNull();
  });

  it('normalizes emails', () => {
    expect(normalizeEmail('A.B+tag@Gmail.com')).toBe('ab@gmail.com');
    expect(normalizeEmail('a.b+tag@outlook.com')).toBe('a.b@outlook.com');
    expect(normalizeEmail(null)).toBe('');
  });
});

describe('attribution', () => {
  it('reads a code, a slug, a handle or the studio badge profile id', () => {
    expect(parseRef('maya')).toEqual({ kind: 'code', value: 'maya' });
    expect(parseRef(' @Studio-Maya ')).toEqual({ kind: 'code', value: 'studio-maya' });
    expect(parseRef('https://getnelsy.com/maya?x=1')).toEqual({ kind: 'code', value: 'maya' });
    expect(parseRef('3F2B8C1A-9D4E-4B7A-8C21-5E6F7A8B9C0D')).toEqual({ kind: 'id', value: '3f2b8c1a-9d4e-4b7a-8c21-5e6f7a8b9c0d' });
  });

  it('rejects junk', () => {
    for (const bad of [null, undefined, '', ' ', 'a', 'has space', '<script>', 'x'.repeat(201)]) {
      expect(parseRef(bad)).toBeNull();
    }
  });

  it('keeps a click for 60 days', () => {
    const at = NOW.getTime();
    expect(isRefFresh({ ref: 'maya', at: at - 59 * DAY }, at)).toBe(true);
    expect(isRefFresh({ ref: 'maya', at: at - 61 * DAY }, at)).toBe(false);
    expect(isRefFresh({ ref: 'maya', at: at + DAY }, at)).toBe(false); // clock tampering
    expect(isRefFresh(null, at)).toBe(false);
  });

  it('last click wins', () => {
    const at = NOW.getTime();
    const stored = { ref: 'maya', at: at - 10 * DAY };
    expect(pickStoredRef('lea-nails', stored, at)).toEqual({ ref: 'lea-nails', at });
    // No ref in the URL: the earlier click stays
    expect(pickStoredRef(null, stored, at)).toEqual(stored);
    // A broken ref does not erase a valid one
    expect(pickStoredRef('<bad>', stored, at)).toEqual(stored);
    // Expired click is dropped
    expect(pickStoredRef(null, { ref: 'maya', at: at - 61 * DAY }, at)).toBeNull();
  });
});
