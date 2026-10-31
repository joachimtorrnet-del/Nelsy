import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle, AlertCircle, Loader2, Clock, ShieldAlert,
  Settings, CreditCard, Building2,
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { DbProfileRow } from '@/lib/supabase';
import { STRIPE_COUNTRIES, STRIPE_COUNTRIES_VERIFIED, STRIPE_COUNTRIES_PREVIEW } from '@/lib/stripe-countries';

// ── Types ─────────────────────────────────────────────────────────────────────

type AccountState = 'none' | 'incomplete' | 'under_review' | 'active' | 'restricted';

interface StripeAccountStatus {
  connected: boolean;
  state: AccountState;
  charges_enabled: boolean;
  payouts_enabled: boolean;
  country?: string;
  default_currency?: string;
  requirements_due?: string[];
  requirements_pending?: string[];
  disabled_reason?: string | null;
  payout_schedule?: { interval: string };
  capabilities?: { card_payments?: string; transfers?: string };
}

// Currencies available per country group, validated against our integration
const COUNTRY_ALLOWED_CURRENCIES: Record<string, string[]> = {
  // EUR zone — single currency
  AT: ['eur'], BE: ['eur'], BG: ['bgn', 'eur'], CY: ['eur'], CZ: ['czk', 'eur'],
  DK: ['dkk', 'eur'], EE: ['eur'], FI: ['eur'], FR: ['eur'], DE: ['eur'],
  GR: ['eur'], HR: ['eur'], HU: ['huf', 'eur'], IE: ['eur'], IS: ['isk'],
  IT: ['eur'], LV: ['eur'], LI: ['chf'], LT: ['eur'], LU: ['eur'], MT: ['eur'],
  NL: ['eur'], NO: ['nok'], PL: ['pln'], PT: ['eur'], RO: ['ron'], SE: ['sek'],
  SK: ['eur'], SI: ['eur'], ES: ['eur'], CH: ['chf'],
  // Non-EUR
  AU: ['aud'], CA: ['cad'], GB: ['gbp'], GI: ['gbp'], HK: ['hkd'],
  IN: ['inr'], ID: ['idr'], JP: ['jpy'], KR: ['krw'], MY: ['myr'],
  MX: ['mxn'], NZ: ['nzd'], SG: ['sgd'], TH: ['thb'], AE: ['aed'],
  US: ['usd'],
}

const CURRENCY_LABELS: Record<string, string> = {
  eur: 'EUR — Euro', usd: 'USD — US Dollar', gbp: 'GBP — British Pound',
  aud: 'AUD — Australian Dollar', cad: 'CAD — Canadian Dollar',
  chf: 'CHF — Swiss Franc', dkk: 'DKK — Danish Krone', hkd: 'HKD — Hong Kong Dollar',
  huf: 'HUF — Hungarian Forint', inr: 'INR — Indian Rupee', idr: 'IDR — Indonesian Rupiah',
  isk: 'ISK — Icelandic Krona', jpy: 'JPY — Japanese Yen', krw: 'KRW — South Korean Won',
  mxn: 'MXN — Mexican Peso', myr: 'MYR — Malaysian Ringgit', nok: 'NOK — Norwegian Krone',
  nzd: 'NZD — New Zealand Dollar', pln: 'PLN — Polish Zloty', ron: 'RON — Romanian Leu',
  sek: 'SEK — Swedish Krona', sgd: 'SGD — Singapore Dollar', thb: 'THB — Thai Baht',
  aed: 'AED — UAE Dirham', bgn: 'BGN — Bulgarian Lev', czk: 'CZK — Czech Koruna',
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function StripeSettings() {
  const [profile, setProfile] = useState<DbProfileRow | null>(null);
  const [accountStatus, setAccountStatus] = useState<StripeAccountStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusError, setStatusError] = useState<string | null>(null);

  // Creation flow state
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedTimezone, setSelectedTimezone] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [connectLoading, setConnectLoading] = useState(false);
  const [connectError, setConnectError] = useState<string | null>(null);

  // Currency change (for active accounts)
  const [currencyEditMode, setCurrencyEditMode] = useState(false);
  const [newCurrency, setNewCurrency] = useState('');
  const [currencySaving, setCurrencySaving] = useState(false);

  useEffect(() => {
    if (selectedCountry && STRIPE_COUNTRIES[selectedCountry]) {
      setSelectedTimezone(STRIPE_COUNTRIES[selectedCountry].timezone);
      const allowed = COUNTRY_ALLOWED_CURRENCIES[selectedCountry] ?? [];
      setSelectedCurrency(allowed[0] ?? STRIPE_COUNTRIES[selectedCountry].currency);
    }
  }, [selectedCountry]);

  const fetchAll = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) { setLoading(false); return; }
    setLoading(true);
    setStatusError(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [profileResult, statusResult] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.functions.invoke('get-stripe-account'),
      ]);

      if (profileResult.data) setProfile(profileResult.data as DbProfileRow);
      if (statusResult.error) throw new Error(statusResult.error.message);
      setAccountStatus(statusResult.data as StripeAccountStatus);
    } catch (e) {
      setStatusError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void fetchAll(); }, [fetchAll]);

  const handleConnectStripe = async (linkType: 'account_onboarding' | 'account_update' = 'account_onboarding') => {
    if (!isSupabaseConfigured || !supabase) return;
    if (linkType === 'account_onboarding') {
      if (!selectedCountry) { setConnectError('Veuillez sélectionner le pays de votre établissement.'); return; }
      if (!selectedTimezone.trim()) { setConnectError('Veuillez confirmer le fuseau horaire.'); return; }
    }
    setConnectLoading(true);
    setConnectError(null);
    try {
      const body: Record<string, string> = {
        link_type: linkType,
        refresh_url: window.location.href,
        return_url: `${window.location.origin}/stripe/return`,
      };
      if (linkType === 'account_onboarding' && !accountStatus?.connected) {
        body.country = selectedCountry;
        body.timezone = selectedTimezone.trim();
      }
      const { data, error } = await supabase.functions.invoke('create-connect-account', { body });
      if (error) throw new Error(error.message);
      const { url } = data as { url: string };
      window.location.href = url;
    } catch (e) {
      setConnectError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setConnectLoading(false);
    }
  };

  const handleCurrencySave = async () => {
    if (!supabase || !newCurrency) return;
    setCurrencySaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Non authentifié');
      await supabase.from('profiles').update({ business_currency: newCurrency }).eq('id', user.id);
      setProfile((prev) => prev ? { ...prev, business_currency: newCurrency } : prev);
      setCurrencyEditMode(false);
    } catch (e) {
      setConnectError(e instanceof Error ? e.message : 'Erreur');
    } finally {
      setCurrencySaving(false);
    }
  };

  // ── Loading ──────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-7 h-7 animate-spin text-[#F52B8C]" />
      </div>
    );
  }

  const state = accountStatus?.state ?? 'none';
  const country = profile?.business_country as string | undefined;
  const currency = (profile?.business_currency as string | undefined) ?? accountStatus?.default_currency;
  const allowedCurrencies = country ? (COUNTRY_ALLOWED_CURRENCIES[country] ?? []) : [];

  // ── State A — No account ─────────────────────────────────────────────────────

  if (state === 'none') {
    return (
      <div className="max-w-lg">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="text-2xl font-black text-[#1A1A1A] mb-1">Payments</h1>
          <p className="text-gray-500 text-sm">Connect your payment account to accept bookings and receive payouts.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
          className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm"
        >
          {/* Stripe logo */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 bg-[#635BFF]/10 rounded-2xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-[#635BFF]" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1A1A1A]">Accept payments with Stripe</h2>
              <p className="text-xs text-gray-400">Powered by Stripe — PCI DSS compliant</p>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-5 leading-relaxed">
            Connect your payment account to accept bookings and sales and receive payouts.
            Your identity and bank details are verified securely by Stripe — Nelsy never stores them.
          </p>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Country of your business</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#F52B8C]/30"
            >
              <option value="">Select a country</option>
              <optgroup label="Available">
                {STRIPE_COUNTRIES_VERIFIED.map((c) => (
                  <option key={c.code} value={c.code}>{c.label}</option>
                ))}
              </optgroup>
              <optgroup label="Beta (verification required)">
                {STRIPE_COUNTRIES_PREVIEW.map((c) => (
                  <option key={c.code} value={c.code}>{c.label} (beta)</option>
                ))}
              </optgroup>
            </select>
            <p className="text-xs text-gray-400 mt-1">Cannot be changed after creating your Stripe account.</p>
          </div>

          {selectedCountry && STRIPE_COUNTRIES[selectedCountry]?.preview && (
            <div className="mb-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800">
              <strong>Beta country</strong> — payout availability is being verified for this country. Restrictions may apply.
            </div>
          )}

          {selectedCountry && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Business timezone</label>
                <input
                  type="text"
                  value={selectedTimezone}
                  onChange={(e) => setSelectedTimezone(e.target.value)}
                  placeholder="e.g. Europe/Paris"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#F52B8C]/30 font-mono"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Default for {STRIPE_COUNTRIES[selectedCountry]?.label}. Update if your studio is in a different timezone.
                </p>
              </div>

              {allowedCurrencies.length > 1 && (
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Sales currency</label>
                  <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#F52B8C]/30"
                  >
                    {allowedCurrencies.map((c) => (
                      <option key={c} value={c}>{CURRENCY_LABELS[c] ?? c.toUpperCase()}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-400 mt-1">Currency used for pricing and checkout. Payouts will be in the same currency.</p>
                </div>
              )}
            </>
          )}

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-5 text-sm text-blue-700">
            <p className="font-semibold mb-1">You'll need:</p>
            <ul className="space-y-0.5 text-xs">
              <li>· Government-issued ID (passport or national ID)</li>
              <li>· Bank account details (IBAN or account/routing number)</li>
              <li>· Business registration number (if applicable)</li>
            </ul>
          </div>

          {connectError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-sm text-red-700">{connectError}</div>
          )}
          {statusError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-sm text-red-700">{statusError}</div>
          )}

          <motion.button
            onClick={() => void handleConnectStripe('account_onboarding')}
            disabled={connectLoading || !selectedCountry || !selectedTimezone.trim()}
            whileHover={{ scale: connectLoading ? 1 : 1.01 }}
            whileTap={{ scale: connectLoading ? 1 : 0.98 }}
            className="w-full py-4 bg-[#1A1A1A] text-white rounded-2xl font-bold text-sm hover:opacity-90 transition disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {connectLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
            {connectLoading ? 'Redirecting to Stripe...' : 'Connect your Stripe account'}
          </motion.button>
          <p className="text-xs text-gray-400 mt-3 text-center">Setup takes ~5 minutes. You'll be redirected to Stripe.</p>
        </motion.div>

        <FeeCard />
      </div>
    );
  }

  // ── State B — Incomplete ─────────────────────────────────────────────────────

  if (state === 'incomplete') {
    const due = accountStatus?.requirements_due ?? [];
    return (
      <div className="max-w-lg">
        <PageHeader />
        <StatusCard
          icon={<AlertCircle className="w-6 h-6 text-amber-600" />}
          iconBg="bg-amber-100"
          title="Complete your account setup"
          desc="Stripe needs a few more details before you can accept payments."
          state="incomplete"
        >
          {due.length > 0 && (
            <ul className="text-xs text-amber-700 space-y-1 mb-4 bg-amber-50 rounded-xl p-3">
              {due.slice(0, 5).map((r) => <li key={r}>· {humanizeRequirement(r)}</li>)}
              {due.length > 5 && <li>· and {due.length - 5} more…</li>}
            </ul>
          )}
          {connectError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-3 text-sm text-red-700">{connectError}</div>
          )}
          <ActionButton onClick={() => void handleConnectStripe('account_onboarding')} loading={connectLoading} label="Complete setup" />
        </StatusCard>
        <AccountInfoCard profile={profile} accountStatus={accountStatus} />
        <FeeCard />
      </div>
    );
  }

  // ── State C — Under review ───────────────────────────────────────────────────

  if (state === 'under_review') {
    const pending = accountStatus?.requirements_pending ?? [];
    return (
      <div className="max-w-lg">
        <PageHeader />
        <StatusCard
          icon={<Clock className="w-6 h-6 text-blue-600" />}
          iconBg="bg-blue-100"
          title="Verification in progress"
          desc="Stripe is reviewing the information you submitted. This usually takes 1 to 2 business days."
          state="under_review"
        >
          {pending.length > 0 && (
            <p className="text-xs text-blue-700 bg-blue-50 rounded-xl p-3 mb-4">
              Pending review: {pending.slice(0, 3).map(humanizeRequirement).join(', ')}
              {pending.length > 3 && ` and ${pending.length - 3} more`}.
            </p>
          )}
          <p className="text-xs text-gray-400 mb-4">No action needed right now. We'll update this page when your account is approved.</p>
          <ActionButton onClick={() => void handleConnectStripe('account_onboarding')} loading={connectLoading} label="Manage on Stripe" variant="secondary" />
        </StatusCard>
        <AccountInfoCard profile={profile} accountStatus={accountStatus} />
        <FeeCard />
      </div>
    );
  }

  // ── State E — Restricted ─────────────────────────────────────────────────────

  if (state === 'restricted') {
    const reason = accountStatus?.disabled_reason;
    return (
      <div className="max-w-lg">
        <PageHeader />
        <StatusCard
          icon={<ShieldAlert className="w-6 h-6 text-red-600" />}
          iconBg="bg-red-100"
          title="Account restricted"
          desc="Stripe has placed a restriction on your account. Payments or payouts may be unavailable."
          state="restricted"
        >
          {reason && (
            <p className="text-xs text-red-700 bg-red-50 rounded-xl p-3 mb-4">
              Reason: <span className="font-mono">{reason}</span>
            </p>
          )}
          <p className="text-xs text-gray-500 mb-4">
            Contact Stripe support or resolve the outstanding requirement in your Stripe account.
          </p>
          <ActionButton onClick={() => void handleConnectStripe('account_update')} loading={connectLoading} label="Manage on Stripe" />
        </StatusCard>
        <AccountInfoCard profile={profile} accountStatus={accountStatus} />
      </div>
    );
  }

  // ── State D — Active ─────────────────────────────────────────────────────────

  return (
    <div className="max-w-lg">
      <PageHeader />
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-4"
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#1A1A1A]">Account active</h2>
            <p className="text-xs text-gray-400">Ready to accept payments and receive payouts</p>
          </div>
        </div>

        {/* Capabilities */}
        <div className="flex gap-3 mb-5">
          <CapBadge enabled={accountStatus?.charges_enabled ?? false} label="Payments" />
          <CapBadge enabled={accountStatus?.payouts_enabled ?? false} label="Payouts" />
        </div>

        {/* Account info */}
        <div className="bg-gray-50 rounded-2xl p-4 space-y-2.5 text-sm mb-5">
          <InfoRow label="Country" value={
            accountStatus?.country
              ? `${STRIPE_COUNTRIES[accountStatus.country]?.label ?? accountStatus.country} (${accountStatus.country})`
              : '—'
          } />
          <InfoRow label="Default currency" value={(accountStatus?.default_currency ?? '—').toUpperCase()} />
          <InfoRow label="Sales currency" value={
            <div className="flex items-center gap-2">
              <span className="font-medium">{(currency ?? '—').toUpperCase()}</span>
              {!currencyEditMode && allowedCurrencies.length > 1 && (
                <button onClick={() => { setNewCurrency(currency ?? ''); setCurrencyEditMode(true); }}
                  className="text-[11px] text-[#F52B8C] underline"
                >Change</button>
              )}
            </div>
          } />
          {currencyEditMode && (
            <div className="flex gap-2 pt-1">
              <select
                value={newCurrency}
                onChange={(e) => setNewCurrency(e.target.value)}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#F52B8C]/30"
              >
                {allowedCurrencies.map((c) => (
                  <option key={c} value={c}>{CURRENCY_LABELS[c] ?? c.toUpperCase()}</option>
                ))}
              </select>
              <button onClick={() => void handleCurrencySave()}
                disabled={currencySaving || !newCurrency}
                className="px-3 py-1.5 bg-[#F52B8C] text-white rounded-lg text-xs font-bold disabled:opacity-50"
              >
                {currencySaving ? '...' : 'Save'}
              </button>
              <button onClick={() => setCurrencyEditMode(false)}
                className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-500"
              >Cancel</button>
            </div>
          )}
          {accountStatus?.payout_schedule && (
            <InfoRow label="Payout schedule"
              value={accountStatus.payout_schedule.interval === 'manual' ? 'Manual (you control withdrawals)' : accountStatus.payout_schedule.interval}
            />
          )}
        </div>

        {connectError && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-sm text-red-700">{connectError}</div>
        )}

        <button
          onClick={() => void handleConnectStripe('account_update')}
          disabled={connectLoading}
          className="w-full py-3 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {connectLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Settings className="w-4 h-4" />}
          {connectLoading ? 'Redirecting...' : 'Manage account on Stripe'}
        </button>
        <p className="text-xs text-gray-400 mt-2 text-center">
          Update bank account details or identity documents via Stripe's secure interface.
        </p>
      </motion.div>

      <FeeCard />
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function PageHeader() {
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
      <h1 className="text-2xl font-black text-[#1A1A1A] mb-1">Payments</h1>
      <p className="text-gray-500 text-sm">Manage your Stripe payment account and payouts.</p>
    </motion.div>
  );
}

interface StatusCardProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  desc: string;
  state: AccountState;
  children?: React.ReactNode;
}

function StatusCard({ icon, iconBg, title, desc, children }: StatusCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
      className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mb-4"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-12 h-12 ${iconBg} rounded-2xl flex items-center justify-center`}>{icon}</div>
        <div>
          <h2 className="text-lg font-bold text-[#1A1A1A]">{title}</h2>
          <p className="text-xs text-gray-500">{desc}</p>
        </div>
      </div>
      {children}
    </motion.div>
  );
}

function AccountInfoCard({ profile, accountStatus }: { profile: DbProfileRow | null; accountStatus: StripeAccountStatus | null }) {
  if (!profile?.stripe_account_id) return null;
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mb-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Building2 className="w-4 h-4 text-gray-400" />
        <h3 className="text-sm font-bold text-[#1A1A1A]">Account info</h3>
      </div>
      <div className="space-y-2 text-sm">
        <InfoRow label="Stripe ID" value={<span className="font-mono text-xs text-gray-600 truncate">{profile.stripe_account_id as string}</span>} />
        {accountStatus?.country && (
          <InfoRow label="Country" value={STRIPE_COUNTRIES[accountStatus.country]?.label ?? accountStatus.country} />
        )}
        {accountStatus?.default_currency && (
          <InfoRow label="Currency" value={(accountStatus.default_currency).toUpperCase()} />
        )}
        <InfoRow label="Payments" value={<CapBadge enabled={accountStatus?.charges_enabled ?? false} label="" inline />} />
        <InfoRow label="Payouts" value={<CapBadge enabled={accountStatus?.payouts_enabled ?? false} label="" inline />} />
      </div>
    </motion.div>
  );
}

function FeeCard() {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
      className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm mt-2"
    >
      <h3 className="font-bold text-[#1A1A1A] text-sm mb-3">Fee model</h3>
      <div className="space-y-2 text-sm">
        {[
          { label: 'Nelsy commission on sales', value: '0%', highlight: true },
          { label: 'Stripe processing fee (paid by the pro)', value: '~1.5% + €0.25' },
          { label: 'Withdrawal fee', value: 'Free' },
        ].map(({ label, value, highlight }) => (
          <div key={label} className="flex justify-between">
            <span className="text-gray-500">{label}</span>
            <span className={highlight ? 'font-black text-emerald-600' : 'font-medium text-[#1A1A1A]'}>{value}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-3">
        Stripe processing fees vary by country and card type. The exact amount is deducted directly from your account
        by Stripe. Nelsy receives nothing on transactions.
      </p>
    </motion.div>
  );
}

interface ActionButtonProps {
  onClick: () => void;
  loading: boolean;
  label: string;
  variant?: 'primary' | 'secondary';
}
function ActionButton({ onClick, loading, label, variant = 'primary' }: ActionButtonProps) {
  const base = 'w-full py-3 rounded-2xl font-bold text-sm transition flex items-center justify-center gap-2 disabled:opacity-50';
  const cls = variant === 'primary'
    ? `${base} bg-[#1A1A1A] text-white hover:opacity-90`
    : `${base} border border-gray-200 text-gray-700 hover:bg-gray-50`;
  return (
    <button onClick={onClick} disabled={loading} className={cls}>
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {label}
    </button>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-[#1A1A1A] text-right max-w-[60%]">{value}</span>
    </div>
  );
}

function CapBadge({ enabled, label, inline = false }: { enabled: boolean; label: string; inline?: boolean }) {
  const badge = enabled
    ? <span className={`${inline ? '' : 'px-3 py-1 '}text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700`}>
        {inline ? '✓ Enabled' : `✓ ${label}`}
      </span>
    : <span className={`${inline ? '' : 'px-3 py-1 '}text-xs font-semibold rounded-full bg-gray-100 text-gray-500`}>
        {inline ? '✗ Disabled' : `✗ ${label}`}
      </span>;
  return badge;
}

function humanizeRequirement(req: string): string {
  const map: Record<string, string> = {
    'individual.verification.document': 'Identity document',
    'individual.dob.day': 'Date of birth',
    'individual.dob.month': 'Date of birth',
    'individual.dob.year': 'Date of birth',
    'individual.address.line1': 'Business address',
    'individual.address.postal_code': 'Postal code',
    'individual.id_number': 'National ID number',
    'business_profile.mcc': 'Business category',
    'business_profile.url': 'Business website',
    'external_account': 'Bank account (IBAN)',
    'tos_acceptance.date': 'Terms of service acceptance',
    'tos_acceptance.ip': 'Terms of service acceptance',
  };
  return map[req] ?? req.replace(/_/g, ' ').replace(/\./g, ' › ');
}
