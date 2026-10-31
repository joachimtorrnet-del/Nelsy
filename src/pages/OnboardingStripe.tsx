import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { STRIPE_COUNTRIES, STRIPE_COUNTRIES_VERIFIED, STRIPE_COUNTRIES_PREVIEW } from '@/lib/stripe-countries';

export default function OnboardingStripe() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [country, setCountry] = useState<string>('');
  const [timezone, setTimezone] = useState<string>('');
  const [hasExistingAccount, setHasExistingAccount] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  // When country changes, pre-fill timezone with the country's default.
  // We do NOT auto-apply the browser timezone here — the pro confirms the timezone
  // for their business, which may differ from where their device is at this moment.
  useEffect(() => {
    if (country && STRIPE_COUNTRIES[country]) {
      setTimezone(STRIPE_COUNTRIES[country].timezone);
    }
  }, [country]);

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { user } } = await supabase!.auth.getUser();
        if (!user) return;

        const { data: profile } = await supabase!
          .from('profiles')
          .select('stripe_account_id, business_country, timezone')
          .eq('id', user.id)
          .single();

        if (profile?.stripe_account_id) {
          setHasExistingAccount(true);
        }
        if (profile?.business_country) {
          setCountry(profile.business_country as string);
        }
        if (profile?.timezone) {
          setTimezone(profile.timezone as string);
        }
      } finally {
        setProfileLoading(false);
      }
    }
    loadProfile();
  }, []);

  const handleStart = async () => {
    if (!hasExistingAccount && !country) {
      setError('Veuillez sélectionner le pays de votre établissement.');
      return;
    }
    if (!hasExistingAccount && !timezone.trim()) {
      setError('Veuillez confirmer le fuseau horaire de votre établissement.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await supabase!.auth.refreshSession();
      const { data: { user }, error: authError } = await supabase!.auth.getUser();
      if (authError || !user) throw new Error('Non authentifié');

      const body: Record<string, string> = {
        return_url: `${window.location.origin}/stripe/return`,
        refresh_url: `${window.location.origin}/onboarding-stripe`,
      };

      if (!hasExistingAccount) {
        body.country = country;
        body.timezone = timezone.trim();
      }

      const { data, error: fnError } = await supabase!.functions.invoke('create-connect-account', {
        body,
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

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
      </div>
    );
  }

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

        {!hasExistingAccount && (
          <>
            <div className="mb-4 text-left">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Pays de votre établissement
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="">Sélectionnez un pays</option>
                <optgroup label="Disponible">
                  {STRIPE_COUNTRIES_VERIFIED.map((c) => (
                    <option key={c.code} value={c.code}>{c.label}</option>
                  ))}
                </optgroup>
                <optgroup label="Bêta (vérification en cours)">
                  {STRIPE_COUNTRIES_PREVIEW.map((c) => (
                    <option key={c.code} value={c.code}>{c.label} (bêta)</option>
                  ))}
                </optgroup>
              </select>
              <p className="text-xs text-gray-400 mt-1">
                Ne peut pas être modifié après la création du compte Stripe.
              </p>
            </div>

            {country && STRIPE_COUNTRIES[country]?.preview && (
              <div className="mb-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800 text-left">
                <strong>Pays en bêta</strong> — la compatibilité des virements Stripe pour ce pays est en cours de vérification. Des restrictions locales peuvent s'appliquer. Nous vous contacterons avant l'activation complète.
              </div>
            )}

            {country && (
              <div className="mb-5 text-left">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Fuseau horaire de votre établissement
                </label>
                <input
                  type="text"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  placeholder="ex : Europe/Paris"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-purple-400 font-mono"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Fuseau par défaut pour {STRIPE_COUNTRIES[country]?.label}. Modifiez si votre salon est dans une autre zone.
                </p>
              </div>
            )}
          </>
        )}

        {hasExistingAccount && (
          <div className="mb-5 bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-sm text-emerald-700 text-left">
            Un compte Stripe existe déjà pour ce profil. Vous pouvez reprendre la configuration.
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-5 text-sm text-red-700">
            {error}
          </div>
        )}

        <button
          onClick={handleStart}
          disabled={loading || (!hasExistingAccount && (!country || !timezone.trim()))}
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
