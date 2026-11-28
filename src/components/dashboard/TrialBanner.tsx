import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { CreditCard, PauseCircle, X } from 'lucide-react';
import { track } from '../../lib/analytics';
import { PLANS, tierFromProfilePlan } from '../../lib/plans';
import {
  formatPlanPrice, formatTrialEnd, getTrialCardStatus, openAddCard, openBillingPortal, reactivatePage, useTrialCard,
} from '../../lib/trial';
import type { TrialCardStatus } from '../../lib/trial';
import { trialBannerState } from '../../lib/trialBanner';
import type { TrialBannerKind } from '../../lib/trialBanner';

const DISMISS_KEY = 'nelsy_trial_banner_dismissed';

function readAndClearParam(name: string): boolean {
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.get(name) !== '1') return false;
    url.searchParams.delete(name);
    window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
    return true;
  } catch { return false; }
}

function readDismissed(): string | null {
  try { return sessionStorage.getItem(DISMISS_KEY); } catch { return null; }
}

/** "$29/month" from Stripe when known, else from the profile plan (Independent monthly by default). */
function planPriceLabel(details: TrialCardStatus | null, plan?: string | null): string {
  const fromStripe = formatPlanPrice(details?.price ?? null);
  if (fromStripe) return fromStripe;
  const p = PLANS[tierFromProfilePlan(plan) ?? 'independent'];
  return plan?.endsWith('yearly') ? `$${p.yearlyTotal}/year` : `$${p.monthly}/month`;
}

const STYLES: Record<Exclude<TrialBannerKind, 'none'>, { wrap: string; button: string; bar: string; track: string }> = {
  soft: { wrap: 'bg-[#FFF0F7] border-[#F52B8C]/20 text-[#1A1A1A]', button: 'bg-[#F52B8C] hover:bg-[#E0167A] text-white', bar: 'bg-[#F52B8C]', track: 'bg-[#F52B8C]/15' },
  urgent: { wrap: 'bg-[#FFF4E0] border-[#F5A524]/40 text-[#5C3B00]', button: 'bg-[#D97706] hover:bg-[#B45309] text-white', bar: 'bg-[#D97706]', track: 'bg-[#D97706]/15' },
  last_day: { wrap: 'bg-[#FDECEC] border-[#B42318]/30 text-[#7A1A12]', button: 'bg-[#B42318] hover:bg-[#912018] text-white', bar: 'bg-[#B42318]', track: 'bg-[#B42318]/15' },
  card_saved: { wrap: 'bg-[#F6F7F9] border-black/[0.06] text-[#1A1A1A]', button: 'bg-white border border-gray-200 hover:bg-gray-50 text-[#1A1A1A]', bar: 'bg-[#11733F]', track: 'bg-[#11733F]/15' },
  paused: { wrap: 'bg-[#1A1A1A] border-black text-white', button: 'bg-white hover:bg-gray-100 text-[#1A1A1A]', bar: '', track: '' },
};

interface Props {
  subscriptionStatus?: string;
  trialEndsAt?: string | null;
  plan?: string | null;
  activeTab: string;
}

/**
 * Trial and plan status, on every dashboard tab:
 * - no card: "X days left" with "Day N of 14", soft pink, then amber for the last 3 days and red on the
 *   last day (those two cannot be dismissed); Add card opens Stripe Checkout (setup mode)
 * - card saved: calm "your plan starts on <date>" with Manage (Billing Portal)
 * - plan or trial ended: page paused, Reactivate (on Home the full PausedPanel shows instead)
 * ?add_card=1 (trial_will_end email) opens Checkout directly; ?card_added=1 is the Checkout return.
 */
export function TrialBanner({ subscriptionStatus, trialEndsAt, plan, activeTab }: Props) {
  const details = useTrialCard(subscriptionStatus);
  const [cardAdded, setCardAdded] = useState(() => readAndClearParam('card_added'));
  const [wantsCard] = useState(() => readAndClearParam('add_card'));
  const [dismissed, setDismissed] = useState(readDismissed);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const autoOpened = useRef(false);

  const state = trialBannerState({ subscriptionStatus, details, profileTrialEnd: trialEndsAt });

  const run = async (action: () => Promise<unknown>, event: string, props?: Record<string, unknown>) => {
    setBusy(true);
    setError('');
    track(event, { state: state.kind, days_left: state.daysLeft, ...props });
    try {
      const r = await action();
      if (r === 'live') window.location.reload();
    } catch {
      setError('Something went wrong. Please try again.');
      setBusy(false);
    }
  };

  useEffect(() => {
    if (!cardAdded) return;
    track('trial_card_added_return');
    // The webhook attaches the card a few seconds after Checkout: refresh the cached status.
    const t = setTimeout(() => { void getTrialCardStatus(true).catch(() => undefined); }, 4000);
    return () => clearTimeout(t);
  }, [cardAdded]);

  useEffect(() => {
    if (wantsCard && details && details.status === 'trialing' && !details.hasCard && !autoOpened.current) {
      autoOpened.current = true;
      void run(openAddCard, 'trial_add_card_clicked', { source: 'email' });
    }
  }, [wantsCard, details]);

  if (cardAdded) {
    return (
      <div className="bg-green-50 border-b border-green-200 text-green-800 px-4 py-2.5 flex items-center justify-between gap-3 flex-shrink-0">
        <p className="text-[13px] font-medium leading-snug flex-1 min-w-0">Card saved. Your page stays live after your free trial.</p>
        <button onClick={() => setCardAdded(false)} aria-label="Dismiss" className="p-1 rounded hover:bg-green-100"><X className="w-4 h-4" /></button>
      </div>
    );
  }

  if (state.kind === 'none') return null;
  // Home shows the full paused panel instead
  if (state.kind === 'paused' && activeTab === 'home') return null;
  if (state.dismissible && dismissed === state.kind) return null;

  const s = STYLES[state.kind];
  const date = formatTrialEnd(details?.trialEnd ?? trialEndsAt ?? null);
  const n = state.daysLeft ?? 0;
  const dayWord = n === 1 ? 'day' : 'days';

  // Phones, outside Home: the headline and the button only (Home keeps the full message and progress)
  const compact = activeTab !== 'home';
  const tail = compact ? 'hidden sm:inline' : '';

  let message: ReactNode;
  let action: ReactNode = null;
  if (state.kind === 'paused') {
    message = <><span className="font-bold">Your page is paused.</span> Clients can't book you right now.</>;
    action = (
      <button onClick={() => void run(() => reactivatePage(plan), 'reactivate_clicked', { source: 'banner' })} disabled={busy}
        className={`flex-shrink-0 px-4 py-1.5 rounded-lg text-[12px] font-bold transition whitespace-nowrap disabled:opacity-60 ${s.button}`}>
        {busy ? 'Opening...' : 'Reactivate my page'}
      </button>
    );
  } else if (state.kind === 'card_saved') {
    message = details?.cancelAtPeriodEnd
      ? <><span className="font-bold">Free trial: {n} {dayWord} left.</span> Your plan is canceled, your page stays live until {date}.</>
      : <><span className="font-bold">Free trial: {n} {dayWord} left.</span> Your card is saved, your plan starts on {date} ({planPriceLabel(details, plan)}). Cancel anytime.</>;
    action = (
      <button onClick={() => void run(openBillingPortal, 'trial_manage_clicked')} disabled={busy}
        className="flex-shrink-0 text-[12px] font-bold text-[#F52B8C] hover:underline whitespace-nowrap disabled:opacity-60">
        {busy ? 'Opening...' : 'Manage'}
      </button>
    );
  } else {
    message = state.kind === 'last_day'
      ? <><span className="font-bold">Your trial ends today.</span><span className={tail}> Add a card now to keep your page live.</span></>
      : state.kind === 'urgent'
        ? <><span className="font-bold">Only {n} {dayWord} left in your free trial.</span><span className={tail}> Add a card before {date} or your page will be paused.</span></>
        : <><span className="font-bold">{n} {dayWord} left in your free trial.</span><span className={tail}> Add a card to keep your page live after {date}.</span></>;
    action = (
      <button onClick={() => void run(openAddCard, 'trial_add_card_clicked', { source: 'banner' })} disabled={busy}
        className={`flex-shrink-0 inline-flex min-h-[36px] items-center gap-1.5 px-4 py-1.5 rounded-lg text-[12px] font-bold transition whitespace-nowrap disabled:opacity-60 ${s.button}`}>
        <CreditCard className="w-3.5 h-3.5" />
        {busy ? 'Opening...' : 'Add card'}
      </button>
    );
  }

  const showProgress = state.kind !== 'paused' && state.day !== null;

  return (
    <div className={`border-b px-4 lg:px-8 py-2.5 flex-shrink-0 ${s.wrap}`} role={state.dismissible ? 'status' : 'alert'}>
      <div className="flex items-center gap-3">
        <p className="text-[13px] leading-snug flex-1 min-w-0">
          {message}
          {error && <span className="block text-red-600 font-medium">{error}</span>}
        </p>
        {action}
        {state.dismissible && (
          <button
            onClick={() => {
              try { sessionStorage.setItem(DISMISS_KEY, state.kind); } catch { /* private mode */ }
              setDismissed(state.kind);
              track('trial_banner_dismissed', { state: state.kind, days_left: state.daysLeft });
            }}
            aria-label="Hide for now"
            className="flex-shrink-0 -mr-2 flex h-9 w-9 items-center justify-center rounded opacity-60 hover:opacity-100"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {showProgress && (
        <div className={`mt-2 items-center gap-2.5 ${compact ? 'hidden sm:flex' : 'flex'}`}>
          <span className="text-[11px] font-semibold opacity-70 whitespace-nowrap">Day {state.day} of {state.totalDays}</span>
          <div className={`h-1.5 flex-1 rounded-full overflow-hidden ${s.track}`} aria-hidden="true">
            <div className={`h-full rounded-full ${s.bar}`} style={{ width: `${Math.round(((state.day ?? 0) / state.totalDays) * 100)}%` }} />
          </div>
        </div>
      )}
    </div>
  );
}

/** Home, plan or trial ended: full-width paused state with the reactivate action. */
export function PausedPanel({ subscriptionStatus, plan }: { subscriptionStatus?: string; plan?: string | null }) {
  const details = useTrialCard(subscriptionStatus);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  if (subscriptionStatus !== 'cancelled' && subscriptionStatus !== 'canceled') return null;

  // Default wording is the trial one (the common case); a paid plan that ended says so.
  const trialEnded = details ? details.trialEnded !== false : true;
  const price = planPriceLabel(details, plan);

  const reactivate = async () => {
    setBusy(true);
    setError('');
    track('reactivate_clicked', { source: 'home' });
    try {
      if ((await reactivatePage(plan)) === 'live') window.location.reload();
    } catch {
      setError('Something went wrong. Please try again.');
      setBusy(false);
    }
  };

  return (
    <div className="px-4 lg:px-8 pt-5">
      <div className="rounded-3xl bg-[#1A1A1A] text-white p-6 lg:p-8 lg:flex lg:items-center lg:gap-8">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-white/60">
            <PauseCircle className="w-4 h-4" /> Page paused
          </div>
          <h2 className="mt-3 text-[24px] lg:text-[28px] font-extrabold leading-tight">
            {trialEnded ? 'Your free trial has ended.' : 'Your plan has ended.'}
          </h2>
          <p className="mt-2 text-[15px] text-white/80 leading-snug">
            Your page is paused and clients can't book you right now.
          </p>
          <p className="mt-4 text-[13px] text-white/60 leading-relaxed">
            Everything is kept: your services, clients, bookings history and settings. It all comes back as soon as you reactivate.
          </p>
        </div>
        <div className="mt-6 lg:mt-0 lg:w-[280px] flex-shrink-0">
          <button
            onClick={() => void reactivate()}
            disabled={busy}
            className="h-14 w-full rounded-full bg-[#F52B8C] hover:bg-[#E0167A] text-white text-[16px] font-bold transition active:scale-[0.98] disabled:opacity-60"
          >
            {busy ? 'Opening...' : 'Reactivate my page'}
          </button>
          <p className="mt-2 text-center text-[12px] text-white/60">{price}, starting today. Cancel anytime.</p>
          {error && <p className="mt-2 text-center text-[12px] text-red-300">{error}</p>}
        </div>
      </div>
    </div>
  );
}
