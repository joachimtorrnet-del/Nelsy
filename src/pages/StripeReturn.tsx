import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

type Status = 'loading' | 'success' | 'pending';

export default function StripeReturn() {
  const [status, setStatus] = useState<Status>('loading');
  const navigate = useNavigate();

  useEffect(() => {
    void checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    if (!supabase) {
      setStatus('success');
      setTimeout(() => navigate('/dashboard'), 3000);
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/'); return; }

      const { data: profile } = await supabase
        .from('profiles')
        .select('stripe_onboarding_complete')
        .eq('id', user.id)
        .single();

      if (profile?.stripe_onboarding_complete) {
        setStatus('success');
      } else {
        setStatus('pending');
      }
    } catch {
      setStatus('pending');
    }

    setTimeout(() => navigate('/dashboard'), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Vérification en cours...</h2>
            <p className="text-gray-600">Nous vérifions votre compte Stripe</p>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Compte Stripe activé !</h2>
            <p className="text-gray-600 mb-4">Vous pouvez maintenant recevoir des paiements.</p>
            <p className="text-sm text-gray-500">Redirection vers le dashboard...</p>
          </>
        )}
        {status === 'pending' && (
          <>
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Validation en cours</h2>
            <p className="text-gray-600 mb-4">
              Stripe est en train de valider votre compte. Cela peut prendre quelques minutes.
            </p>
            <p className="text-sm text-gray-500">Redirection vers le dashboard...</p>
          </>
        )}
      </div>
    </div>
  );
}
