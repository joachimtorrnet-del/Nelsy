import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function OnboardingStripe() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStart = async () => {
    setLoading(true);
    setError(null);

    try {
      await supabase!.auth.refreshSession();
      const { data: { user }, error: authError } = await supabase!.auth.getUser();
      if (authError || !user) throw new Error('Non authentifié');

      const { data, error: fnError } = await supabase!.functions.invoke('create-connect-account', {
        body: {
          profile_id: user.id,
          return_url: `${window.location.origin}/stripe/return`,
          refresh_url: `${window.location.origin}/onboarding-stripe`,
        },
      });

      if (fnError) {
        let msg = fnError.message;
        const ctx = (fnError as unknown as { context?: Response }).context;
        if (ctx) {
          const text = await ctx.clone().text().catch(() => '');
          if (text) {
            try { msg = (JSON.parse(text) as { error?: string }).error ?? text; }
            catch { msg = text; }
          }
        }
        throw new Error(msg);
      }

      const payload = data as { url?: string; error?: string };
      if (payload?.error) throw new Error(payload.error);
      if (!payload?.url) throw new Error('Pas de lien retourné par Stripe');

      window.location.href = payload.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-sm w-full text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>

        <h1 className="text-2xl font-black text-gray-900 mb-2">Configurer les paiements</h1>
        <p className="text-gray-500 text-sm mb-8">
          Connectez votre compte Stripe pour recevoir les acomptes de vos clients directement sur votre compte bancaire.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-5 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          onClick={handleStart}
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold text-sm disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
        >
          {loading ? 'Redirection...' : 'Configurer mon compte Stripe'}
        </button>

        <p className="text-xs text-gray-400 mt-4">
          Vous serez redirigé vers Stripe pour finaliser la configuration.
        </p>
      </div>
    </div>
  );
}
