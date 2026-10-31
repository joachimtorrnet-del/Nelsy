import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Status = 'loading' | 'active' | 'under_review' | 'incomplete' | 'restricted' | 'error';

interface StripeAccountStatus {
  connected: boolean;
  state: string;
  charges_enabled: boolean;
  payouts_enabled: boolean;
  requirements_due?: string[];
  disabled_reason?: string | null;
}

export default function StripeReturn() {
  const [status, setStatus] = useState<Status>('loading');
  const [detail, setDetail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    void checkStatus();
  }, []);

  const checkStatus = async () => {
    if (!supabase) {
      // Supabase not configured (dev without env) — show generic success and redirect
      setStatus('active');
      setTimeout(() => navigate('/dashboard?tab=stripe'), 3000);
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/login'); return; }

      // Re-read capabilities from Stripe — a return from Stripe does NOT mean
      // the account is verified. get-stripe-account also syncs stripe_onboarding_complete.
      const { data, error } = await supabase.functions.invoke('get-stripe-account');
      if (error) throw new Error(error.message);

      const acct = data as StripeAccountStatus;

      if (!acct.connected) {
        setStatus('incomplete');
        setDetail('Your Stripe account was not created. Please try again.');
      } else if (acct.state === 'active') {
        setStatus('active');
      } else if (acct.state === 'under_review') {
        setStatus('under_review');
      } else if (acct.state === 'restricted') {
        setStatus('restricted');
        setDetail(acct.disabled_reason ?? null);
      } else {
        // incomplete — still needs more info
        setStatus('incomplete');
        const due = acct.requirements_due ?? [];
        if (due.length > 0) {
          setDetail(`Stripe still needs: ${due.slice(0, 2).join(', ')}${due.length > 2 ? '…' : ''}`);
        }
      }
    } catch (e) {
      setStatus('error');
      setDetail(e instanceof Error ? e.message : 'Unknown error');
    }

    // Redirect after a short delay so the user can read the status
    setTimeout(() => navigate('/dashboard?tab=stripe'), 4000);
  };

  const config: Record<Status, { icon: React.ReactNode; title: string; subtitle: string; color: string }> = {
    loading: {
      icon: <Loader2 className="w-8 h-8 text-[#F52B8C] animate-spin" />,
      title: 'Checking your account…',
      subtitle: 'Please wait while we verify your Stripe account status.',
      color: 'bg-gray-50',
    },
    active: {
      icon: <CheckCircle className="w-8 h-8 text-emerald-600" />,
      title: 'Account activated!',
      subtitle: 'Your payment account is ready. You can now accept bookings and receive payouts.',
      color: 'bg-emerald-50',
    },
    under_review: {
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      title: 'Verification in progress',
      subtitle: 'Stripe is reviewing your information. This usually takes 1–2 business days.',
      color: 'bg-blue-50',
    },
    incomplete: {
      icon: <AlertCircle className="w-8 h-8 text-amber-600" />,
      title: 'Setup not complete',
      subtitle: 'Stripe needs more information to activate your account.',
      color: 'bg-amber-50',
    },
    restricted: {
      icon: <AlertCircle className="w-8 h-8 text-red-600" />,
      title: 'Account restricted',
      subtitle: 'Stripe has placed a restriction on your account.',
      color: 'bg-red-50',
    },
    error: {
      icon: <AlertCircle className="w-8 h-8 text-red-400" />,
      title: 'Something went wrong',
      subtitle: 'Could not verify your account status. You\'ll be redirected to the dashboard.',
      color: 'bg-gray-50',
    },
  };

  const c = config[status];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5F9] to-[#F5F0FF] flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center">
        <div className={`w-16 h-16 ${c.color} rounded-2xl flex items-center justify-center mx-auto mb-5`}>
          {c.icon}
        </div>
        <h2 className="text-2xl font-black text-[#1A1A1A] mb-2">{c.title}</h2>
        <p className="text-gray-500 text-sm mb-4 leading-relaxed">{c.subtitle}</p>
        {detail && (
          <p className="text-xs text-gray-400 bg-gray-50 rounded-xl px-4 py-2 mb-4">{detail}</p>
        )}
        <p className="text-xs text-gray-300">Redirecting to dashboard…</p>
      </div>
    </div>
  );
}
