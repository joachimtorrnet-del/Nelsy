import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Copy, Gift, Mail, MessageCircle, Share2, ShieldCheck } from 'lucide-react';
import { track } from '@/lib/analytics';
import {
  COMMISSION_PERCENT,
  REFERRAL_TERMS,
  canRequestPayout,
  effectiveStatus,
  formatUsd,
  referralLink,
  referralStats,
  referralsApi,
} from '@/lib/referrals';
import type { ReferralOverview, ReferralRow, ReferralsApi, ReferralStatus } from '@/lib/referrals';

export interface ReferralsProfile {
  id: string;
  slug?: string;
}

interface Props {
  profile: ReferralsProfile | null;
  /** Sandbox only: swap the API for an in-memory one. */
  api?: ReferralsApi;
}

const MIN = formatUsd(REFERRAL_TERMS.minPayoutCents);
const SHARE_TEXT = 'I use Nelsy for my bookings and deposits. Try it free for 14 days with my link:';
const fmtDate = (iso: string) => new Intl.DateTimeFormat('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(iso));

export default function Referrals({ profile, api = referralsApi }: Props) {
  const [data, setData] = useState<ReferralOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [payoutError, setPayoutError] = useState<string | null>(null);
  const [justRequested, setJustRequested] = useState(false);

  const profileId = profile?.id;
  const load = useCallback(async () => {
    if (!profileId) return;
    setLoadError(null);
    try {
      setData(await api.load(profileId));
    } catch {
      setLoadError('Your referrals could not be loaded. Refresh the page to try again.');
    } finally {
      setLoading(false);
    }
  }, [api, profileId]);

  useEffect(() => { void load(); }, [load]);

  const stats = useMemo(() => (data ? referralStats(data) : null), [data]);
  // Before the first load her slug is shown: it is her code unless another pro already holds it.
  const code = data?.code ?? profile?.slug ?? '';
  const link = code ? referralLink(code) : '';

  const earnedByReferral = useMemo(() => {
    const map = new Map<string, number>();
    for (const c of data?.commissions ?? []) {
      if (!c.referral_id || effectiveStatus(c) === 'reversed') continue;
      map.set(c.referral_id, (map.get(c.referral_id) ?? 0) + c.commission_cents);
    }
    return map;
  }, [data]);

  if (!profile) return null;

  const copy = () => {
    navigator.clipboard.writeText(link).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    track('referral_link_copied');
  };

  const share = (channel: 'native' | 'whatsapp' | 'email') => {
    track('referral_link_shared', { channel });
    if (channel === 'native') {
      void navigator.share?.({ title: 'Nelsy', text: SHARE_TEXT, url: link }).catch(() => {});
    }
  };

  const requestPayout = async () => {
    setRequesting(true);
    setPayoutError(null);
    try {
      await api.requestPayout();
      setJustRequested(true);
      track('referral_payout_requested', { amount_cents: stats?.balance.availableCents ?? 0 });
      await load();
    } catch (err) {
      setPayoutError(err instanceof Error && err.message ? err.message : 'Your request could not be sent. Please try again.');
    } finally {
      setRequesting(false);
    }
  };

  const balance = stats?.balance;
  const available = Math.max(0, balance?.availableCents ?? 0);
  const openPayout = stats?.openPayout ?? null;
  const canRequest = !!balance && canRequestPayout(balance, !!openPayout);
  const missing = Math.max(0, REFERRAL_TERMS.minPayoutCents - available);
  const canNativeShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-8 max-w-5xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Referrals</h2>
        <p className="text-sm text-gray-500 mt-1">
          Earn {COMMISSION_PERCENT}% of every subscription payment from the pros you bring to Nelsy, for as long as they stay subscribed.{' '}
          <Link to="/affiliates#terms" className="font-semibold text-[#C2186F] hover:underline">Program terms</Link>
        </p>
      </div>

      {/* Her link */}
      <section aria-labelledby="ref-link" className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] mb-6">
        <h3 id="ref-link" className="text-sm font-bold text-[#1A1A1A] mb-3">Your referral link</h3>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            readOnly
            value={link}
            aria-label="Your referral link"
            onFocus={(e) => e.currentTarget.select()}
            className="w-full sm:flex-1 min-w-0 h-11 flex-shrink-0 px-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-[#1A1A1A] outline-none focus:ring-2 focus:ring-[#F52B8C] focus:border-transparent"
          />
          <button
            onClick={copy}
            disabled={!link}
            className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-[#F52B8C] text-white text-sm font-bold hover:opacity-90 transition disabled:opacity-40"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy link'}
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {canNativeShare && (
            <button onClick={() => share('native')} className={SHARE_BTN}>
              <Share2 className="w-4 h-4" /> Share
            </button>
          )}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${link}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => share('whatsapp')}
            className={SHARE_BTN}
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
          <a
            href={`mailto:?subject=${encodeURIComponent('Try Nelsy for your bookings')}&body=${encodeURIComponent(`${SHARE_TEXT}\n${link}`)}`}
            onClick={() => share('email')}
            className={SHARE_BTN}
          >
            <Mail className="w-4 h-4" /> Email
          </a>
        </div>
        <p className="text-[13px] text-gray-500 mt-3">
          The "Made with Nelsy" badge on your studio page also counts: a pro who signs up from it is your referral.
        </p>
      </section>

      {loadError ? (
        <p className="text-sm text-red-600">{loadError}</p>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
            <Stat label="Link clicks" value={String(data?.clicks ?? 0)} loading={loading} />
            <Stat label="Signups" value={String(stats?.signups ?? 0)} loading={loading} />
            <Stat label="On free trial" value={String(stats?.trialing ?? 0)} loading={loading} />
            <Stat label="Paying" value={String(stats?.paying ?? 0)} loading={loading} accent />
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            <Stat label="Earned" value={formatUsd(balance?.earnedCents ?? 0)} loading={loading} />
            <Stat label="Pending" hint={`${REFERRAL_TERMS.holdDays}-day hold`} value={formatUsd(balance?.pendingCents ?? 0)} loading={loading} />
            <Stat label="Paid" value={formatUsd(balance?.paidCents ?? 0)} loading={loading} />
          </div>

          {/* Payout */}
          <section aria-labelledby="ref-payout" className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
              <div className="min-w-0">
                <h3 id="ref-payout" className="text-sm font-bold text-[#1A1A1A]">Available for payout</h3>
                {loading ? (
                  <div className="h-8 w-24 mt-1.5 rounded-md bg-gray-100 animate-pulse" />
                ) : (
                  <p className="text-3xl font-bold text-[#1A1A1A] mt-1">{formatUsd(available)}</p>
                )}
                {!!balance?.deductionCents && (
                  <p className="text-[13px] text-gray-500 mt-1">
                    Includes a deduction of {formatUsd(balance.deductionCents)} for a payment refunded after it was paid out.
                  </p>
                )}
              </div>
              <button
                onClick={requestPayout}
                disabled={loading || requesting || !canRequest}
                className="inline-flex items-center justify-center h-11 px-5 rounded-xl bg-[#1A1A1A] text-white text-sm font-bold hover:opacity-90 transition disabled:opacity-30 disabled:hover:opacity-30 self-start sm:self-auto whitespace-nowrap"
              >
                {requesting ? 'Sending...' : 'Request payout'}
              </button>
            </div>

            {openPayout ? (
              <p role="status" className="mt-4 rounded-xl bg-[#fde8f3] px-4 py-3 text-sm text-[#1A1A1A]">
                {justRequested ? 'Request sent. ' : ''}
                Your payout of <strong>{formatUsd(openPayout.total_cents)}</strong>, requested on {fmtDate(openPayout.requested_at)}, is being reviewed.
              </p>
            ) : !loading && !canRequest ? (
              <p className="mt-3 text-[13px] text-gray-500">
                {formatUsd(missing)} more in approved commissions to reach the {MIN} minimum.
              </p>
            ) : null}
            {payoutError && <p role="alert" className="mt-3 text-sm text-red-600">{payoutError}</p>}

            <p className="flex items-start gap-2 text-[13px] text-gray-500 mt-4 pt-4 border-t border-gray-100">
              <ShieldCheck className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
              <span>
                Payouts are reviewed and sent monthly. Each commission is approved {REFERRAL_TERMS.holdDays} days after the payment it comes from,
                and reversed if that payment is refunded. We pay by transfer to your Stripe account or your bank.
              </span>
            </p>
          </section>

          {/* Referred pros */}
          <h3 className="text-sm font-bold text-[#1A1A1A] mb-3">Your referrals</h3>
          {loading ? (
            <div className="space-y-3">
              {[0, 1, 2].map((i) => <div key={i} className="h-16 rounded-2xl bg-gray-100 animate-pulse" />)}
            </div>
          ) : !data || data.referrals.length === 0 ? (
            <EmptyReferrals onCopy={copy} copied={copied} />
          ) : (
            <ReferralsTable referrals={data.referrals} earned={earnedByReferral} />
          )}

          {data && data.payouts.length > 0 && (
            <>
              <h3 className="text-sm font-bold text-[#1A1A1A] mt-8 mb-3">Payouts</h3>
              <ul className="rounded-2xl border border-gray-100 bg-white divide-y divide-gray-100">
                {data.payouts.map((p) => (
                  <li key={p.id} className="flex items-center gap-3 px-4 py-3 text-sm">
                    <span className="font-semibold text-[#1A1A1A]">{formatUsd(p.total_cents)}</span>
                    <span className="text-gray-500 flex-1 min-w-0 truncate">
                      {p.status === 'paid' && p.paid_at ? `Sent on ${fmtDate(p.paid_at)}` : `Requested on ${fmtDate(p.requested_at)}`}
                    </span>
                    <span className={`inline-flex px-2 py-0.5 rounded-md text-[11px] font-semibold ${p.status === 'paid' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                      {p.status === 'paid' ? 'Paid' : 'In review'}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          <p className="text-[13px] text-gray-500 mt-6">
            When you share your link, say clearly that you earn a commission if someone subscribes (for example "affiliate link" or "#ad").
            Paid ads on the Nelsy brand name and referring yourself are not allowed.{' '}
            <Link to="/affiliates#terms" className="font-semibold text-[#C2186F] hover:underline">Read the rules</Link>
          </p>
        </>
      )}
    </div>
  );
}

const SHARE_BTN = 'inline-flex items-center gap-2 h-10 px-3.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-[#1A1A1A] hover:bg-gray-50 transition';

function Stat({ label, value, hint, loading, accent }: { label: string; value: string; hint?: string; loading: boolean; accent?: boolean }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-3 sm:p-4 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
      <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-gray-400 leading-tight">{label}</p>
      {loading ? (
        <div className="h-7 w-10 mt-1.5 rounded-md bg-gray-100 animate-pulse" />
      ) : (
        <p className={`text-xl sm:text-2xl font-bold mt-1 ${accent ? 'text-[#C2186F]' : 'text-[#1A1A1A]'}`}>{value}</p>
      )}
      {hint && <p className="text-[11px] text-gray-400 mt-0.5">{hint}</p>}
    </div>
  );
}

const STATUS_PILL: Record<ReferralStatus, { label: string; cls: string }> = {
  signed_up: { label: 'Signed up', cls: 'bg-gray-100 text-gray-600' },
  trialing: { label: 'Free trial', cls: 'bg-amber-50 text-amber-700' },
  paying: { label: 'Paying', cls: 'bg-green-50 text-green-700' },
  churned: { label: 'Left', cls: 'bg-gray-100 text-gray-500' },
};

function StatusBadge({ status }: { status: ReferralStatus }) {
  const { label, cls } = STATUS_PILL[status];
  return <span className={`inline-flex px-2 py-0.5 rounded-md text-[11px] font-semibold whitespace-nowrap ${cls}`}>{label}</span>;
}

function ReferralsTable({ referrals, earned }: { referrals: ReferralRow[]; earned: Map<string, number> }) {
  const name = (r: ReferralRow) => r.first_name || r.slug || 'A pro';
  return (
    <div className="rounded-2xl border border-gray-100 bg-white overflow-hidden">
      <table className="hidden md:table w-full text-sm">
        <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
          <tr>
            <th className="px-4 py-3">Pro</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Joined</th>
            <th className="px-4 py-3 text-right">You earned</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {referrals.map((r) => (
            <tr key={r.id}>
              <td className="px-4 py-3 min-w-0">
                <p className="font-medium text-[#1A1A1A] truncate max-w-[320px]">{name(r)}</p>
                {r.slug && <p className="text-xs text-gray-500 truncate max-w-[320px]">getnelsy.com/{r.slug}</p>}
              </td>
              <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
              <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{fmtDate(r.created_at)}</td>
              <td className="px-4 py-3 text-right font-semibold text-[#1A1A1A] whitespace-nowrap">{formatUsd(earned.get(r.id) ?? 0)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="md:hidden divide-y divide-gray-100">
        {referrals.map((r) => (
          <li key={r.id} className="p-4 flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#1A1A1A] truncate">{name(r)}</p>
              {r.slug && <p className="text-[13px] text-gray-500 truncate">getnelsy.com/{r.slug}</p>}
              <p className="text-xs text-gray-400 mt-0.5">Joined {fmtDate(r.created_at)} · You earned {formatUsd(earned.get(r.id) ?? 0)}</p>
            </div>
            <StatusBadge status={r.status} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function EmptyReferrals({ onCopy, copied }: { onCopy: () => void; copied: boolean }) {
  return (
    <div className="rounded-3xl border border-dashed border-gray-200 px-6 py-12 text-center">
      <div className="w-12 h-12 rounded-2xl bg-[#fde8f3] flex items-center justify-center mx-auto mb-4">
        <Gift className="w-6 h-6 text-[#F52B8C]" strokeWidth={1.7} />
      </div>
      <h3 className="text-lg font-bold text-[#1A1A1A] mb-1">No referrals yet</h3>
      <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
        Send your link to a nail tech or beauty pro you know. When she starts paying for Nelsy, you earn {COMMISSION_PERCENT}% of each of her payments.
      </p>
      <button onClick={onCopy} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F52B8C] text-white text-sm font-bold hover:opacity-90 transition">
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? 'Copied' : 'Copy my link'}
      </button>
    </div>
  );
}
