import { useEffect, useRef, useState } from 'react';
import { CreditCard, X } from 'lucide-react';
import { track } from '../../lib/analytics';
import { formatTrialEnd, getTrialCardStatus, openAddCard, trialDaysLeft, useTrialCard } from '../../lib/trial';

function readAndClearParam(name: string): boolean {
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.get(name) !== '1') return false;
    url.searchParams.delete(name);
    window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
    return true;
  } catch { return false; }
}

/**
 * No-card trial: "X days left" banner with an Add card action (Stripe Checkout, setup mode).
 * ?add_card=1 (link in the trial_will_end email) opens Checkout directly; ?card_added=1 is the Checkout return.
 */
export function TrialBanner({ subscriptionStatus }: { subscriptionStatus?: string }) {
  const trial = useTrialCard(subscriptionStatus);
  const [cardAdded, setCardAdded] = useState(() => readAndClearParam('card_added'));
  const [wantsCard] = useState(() => readAndClearParam('add_card'));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const autoOpened = useRef(false);

  const addCard = async (source: 'banner' | 'email') => {
    setBusy(true);
    setError('');
    track('trial_add_card_clicked', { source });
    try {
      await openAddCard();
    } catch {
      setError('Could not open the card form. Please try again.');
      setBusy(false);
    }
  };

  useEffect(() => {
    if (cardAdded) {
      track('trial_card_added_return');
      // The webhook attaches the card a few seconds after Checkout: refresh the cached status.
      const t = setTimeout(() => { void getTrialCardStatus(true).catch(() => undefined); }, 4000);
      return () => clearTimeout(t);
    }
  }, [cardAdded]);

  useEffect(() => {
    if (wantsCard && trial && !trial.hasCard && !autoOpened.current) {
      autoOpened.current = true;
      void addCard('email');
    }
  }, [wantsCard, trial]);

  if (cardAdded) {
    return (
      <div className="bg-green-50 border-b border-green-200 text-green-800 px-4 py-2 flex items-center justify-between gap-3 flex-shrink-0">
        <p className="text-[13px] font-medium leading-snug flex-1 min-w-0">Card saved. Your page stays live after your free trial.</p>
        <button onClick={() => setCardAdded(false)} aria-label="Dismiss" className="p-1 rounded hover:bg-green-100"><X className="w-4 h-4" /></button>
      </div>
    );
  }

  if (!trial || trial.status !== 'trialing' || trial.hasCard) return null;

  const days = trialDaysLeft(trial.trialEnd);
  const date = formatTrialEnd(trial.trialEnd);
  const lead = days === null ? 'You are on your free trial.'
    : days === 0 ? 'Your free trial ends today.'
    : `${days} ${days === 1 ? 'day' : 'days'} left in your free trial.`;

  return (
    <div className="bg-[#FFF0F7] border-b border-[#F52B8C]/20 text-[#1A1A1A] px-4 py-2 flex items-center justify-between gap-3 flex-shrink-0">
      <p className="text-[13px] font-medium leading-snug flex-1 min-w-0">
        <span className="font-bold">{lead}</span>{' '}
        Add a card to keep your page live{date ? ` after ${date}` : ''}.
        {error && <span className="block text-red-600">{error}</span>}
      </p>
      <button
        onClick={() => void addCard('banner')}
        disabled={busy}
        className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[12px] font-bold text-white bg-[#F52B8C] hover:bg-[#E0167A] transition whitespace-nowrap disabled:opacity-60"
      >
        <CreditCard className="w-3.5 h-3.5" />
        {busy ? 'Opening...' : 'Add card'}
      </button>
    </div>
  );
}
