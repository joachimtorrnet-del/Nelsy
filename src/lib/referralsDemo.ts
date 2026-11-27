// In-memory referrals API for the dev sandbox (/dev/referrals). Never used in production.
import { commissionCents, holdEndsAt } from './referrals';
import type { CommissionRow, PayoutRow, ReferralOverview, ReferralRow, ReferralsApi } from './referrals';

const DAY = 86_400_000;
const ago = (days: number) => new Date(Date.now() - days * DAY).toISOString();

function seed(): ReferralOverview {
  const referrals: ReferralRow[] = [
    { id: 'r1', status: 'paying', created_at: ago(128), first_paid_at: ago(114), first_name: 'Lea', slug: 'lea-nails' },
    { id: 'r2', status: 'paying', created_at: ago(96), first_paid_at: ago(82), first_name: 'Camille', slug: 'camille-studio' },
    { id: 'r3', status: 'paying', created_at: ago(51), first_paid_at: ago(37), first_name: 'Ines', slug: 'ines-gelx' },
    { id: 'r4', status: 'trialing', created_at: ago(6), first_paid_at: null, first_name: 'Sofia', slug: 'sofia-lashes' },
    { id: 'r5', status: 'signed_up', created_at: ago(2), first_paid_at: null, first_name: 'Jade', slug: 'jade-beauty' },
    { id: 'r6', status: 'churned', created_at: ago(140), first_paid_at: ago(126), first_name: 'Nora', slug: 'nora-brows' },
  ];
  const paidPayout: PayoutRow = { id: 'p1', total_cents: 6000 + 2 * 580, currency: 'usd', status: 'paid', requested_at: ago(60), paid_at: ago(55) };

  let n = 0;
  const commission = (referral: string, amount: number, daysAgo: number, patch: Partial<CommissionRow> = {}): CommissionRow => ({
    id: `c${++n}`,
    referral_id: referral,
    amount_cents: amount,
    currency: 'usd',
    commission_cents: commissionCents(amount),
    status: 'pending',
    available_at: holdEndsAt(ago(daysAgo)).toISOString(),
    payout_id: null,
    clawback_payout_id: null,
    created_at: ago(daysAgo),
    ...patch,
  });
  const commissions: CommissionRow[] = [
    // Lea: yearly plan, paid out
    commission('r1', 30000, 114, { status: 'paid', payout_id: 'p1' }),
    // Camille: monthly
    commission('r2', 2900, 82, { status: 'paid', payout_id: 'p1' }),
    commission('r2', 2900, 52, { status: 'approved' }),
    commission('r2', 2900, 22),
    // Ines: yearly, hold just over
    commission('r3', 30000, 37, { status: 'approved' }),
    // Nora: paid once, then one payment refunded, then she left
    commission('r6', 2900, 126, { status: 'paid', payout_id: 'p1' }),
    commission('r6', 2900, 96, { status: 'reversed' }),
  ];
  return { code: 'studio-maya', clicks: 214, referrals, commissions, payouts: [paidPayout] };
}

export function createDemoReferralsApi(empty = false): ReferralsApi {
  const state: ReferralOverview = empty
    ? { code: 'studio-maya', clicks: 0, referrals: [], commissions: [], payouts: [] }
    : seed();
  return {
    async load() {
      return structuredClone(state);
    },
    async requestPayout() {
      const due = state.commissions.filter((c) => c.status === 'approved' && !c.payout_id);
      const payout: PayoutRow = {
        id: `p${state.payouts.length + 1}`,
        total_cents: due.reduce((s, c) => s + c.commission_cents, 0),
        currency: 'usd',
        status: 'requested',
        requested_at: new Date().toISOString(),
        paid_at: null,
      };
      for (const c of due) c.payout_id = payout.id;
      state.payouts.unshift(payout);
      return payout;
    },
  };
}
