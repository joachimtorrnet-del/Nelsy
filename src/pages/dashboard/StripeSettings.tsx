import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2, ExternalLink } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { DbProfileRow } from '@/lib/supabase';

export default function StripeSettings() {
  const [profile, setProfile] = useState<DbProfileRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [connectError, setConnectError] = useState<string | null>(null);

  useEffect(() => {
    void fetchProfile();
  }, []);

  const fetchProfile = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data as DbProfileRow);
    } catch {
      // Profile stays null — shows unauthenticated state
    } finally {
      setLoading(false);
    }
  };

  const handleConnectStripe = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setConnectError('Supabase non configuré — déployez les Edge Functions d\'abord.');
      return;
    }

    setIsCreatingAccount(true);
    setConnectError(null);

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) throw new Error('Non authentifié');

      const { data, error } = await supabase.functions.invoke('create-connect-account', {
        body: {
          profile_id: user.id,
          refresh_url: window.location.href,
          return_url: `${window.location.origin}/stripe/return`,
        },
      });

      if (error) throw new Error(error.message);

      const { url } = data as { url: string };
      window.location.href = url;
    } catch (err) {
      setConnectError(
        err instanceof Error ? err.message : 'Erreur lors de la connexion à Stripe'
      );
    } finally {
      setIsCreatingAccount(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-black text-espresso mb-1">Paiements Stripe</h1>
        <p className="text-gray-500 text-sm">
          Connectez votre compte bancaire pour recevoir vos paiements automatiquement.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm"
      >
        {profile?.stripe_onboarding_complete ? (
          /* ── Connected state ── */
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-espresso mb-1">Compte Stripe actif</h2>
            <p className="text-gray-500 text-sm mb-6">
              Votre compte bancaire est connecté. Les paiements seront virés automatiquement.
            </p>

            <div className="bg-gray-50 rounded-2xl p-4 text-left space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Identifiant Stripe</span>
                <span className="font-mono text-xs text-espresso truncate max-w-[180px]">
                  {profile.stripe_account_id}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Statut</span>
                <span className="text-emerald-600 font-semibold">✓ Vérifié</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Devise</span>
                <span className="font-medium text-espresso">EUR €</span>
              </div>
            </div>

            <a
              href="https://dashboard.stripe.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-800 transition-colors"
            >
              Ouvrir le tableau de bord Stripe
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ) : (
          /* ── Not connected state ── */
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-amber-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-amber-600" />
            </div>
            <h2 className="text-xl font-bold text-espresso mb-1">
              Connectez votre compte Stripe
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Recevez vos paiements directement sur votre compte bancaire.
            </p>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 text-left">
              <h3 className="font-semibold text-blue-900 text-sm mb-2">
                Ce dont vous aurez besoin :
              </h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>· Carte d'identité ou passeport</li>
                <li>· RIB (IBAN) de votre compte bancaire</li>
                <li>· Numéro SIRET (si auto-entrepreneur)</li>
              </ul>
            </div>

            {connectError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-sm text-red-700 text-left">
                {connectError}
              </div>
            )}

            <motion.button
              onClick={() => void handleConnectStripe()}
              disabled={isCreatingAccount}
              whileHover={{ scale: isCreatingAccount ? 1 : 1.02 }}
              whileTap={{ scale: isCreatingAccount ? 1 : 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-2xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isCreatingAccount ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Redirection vers Stripe...
                </>
              ) : (
                'Connecter mon compte Stripe'
              )}
            </motion.button>

            <p className="text-xs text-gray-400 mt-4">
              La configuration prend ~5 minutes. Vos données sont sécurisées par Stripe.
            </p>
          </div>
        )}
      </motion.div>

      {/* Fee breakdown card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mt-4"
      >
        <h3 className="font-bold text-espresso text-sm mb-3">Modèle tarifaire</h3>
        <div className="space-y-2 text-sm">
          {[
            { label: 'Acompte client (exemple 10€)', value: '10,00€', color: 'text-emerald-600' },
            { label: 'Frais Nelsy (prélevés sur le client)', value: '-1,00€', color: 'text-red-500' },
            { label: 'Frais Stripe (~2,9% + 0,25€)', value: '-0,32€', color: 'text-red-500' },
            { label: 'Net pour vous', value: '9,68€', color: 'text-espresso font-black text-base' },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex justify-between">
              <span className="text-gray-500">{label}</span>
              <span className={color}>{value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
