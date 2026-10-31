import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, Clock, ArrowDownToLine, AlertCircle, CheckCircle,
  Loader2, RefreshCw, ChevronDown, ExternalLink,
  ArrowUpRight, ArrowDownLeft, RotateCcw, Banknote, Download,
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { formatAmount } from '@/lib/stripe-countries';

// ── Types ─────────────────────────────────────────────────────────────────────

interface BalanceEntry {
  amount: number;      // Stripe smallest unit
  currency: string;
}

interface StripeBalance {
  connected: boolean;
  onboarding_incomplete?: boolean;
  charges_enabled?: boolean;
  payouts_enabled?: boolean;
  pending: BalanceEntry[];
  available: BalanceEntry[];
  default_currency?: string;
  payout_schedule?: { interval: string; weekly_anchor?: string; monthly_anchor?: number };
}

interface StripeTransaction {
  id: string;
  type: string;
  amount: number;      // smallest unit
  fee: number;
  net: number;
  currency: string;
  status: string;
  description: string | null;
  created: number;     // unix
  available_on: number;
  source: string | null;
}

interface Payout {
  id: string;
  stripe_payout_id: string;
  amount: number;
  currency: string;
  status: string;
  estimated_arrival: string | null;
  paid_at: string | null;
  failure_message: string | null;
  created_at: string;
}

type TabId = 'overview' | 'transactions' | 'payouts';

// ── Helpers ───────────────────────────────────────────────────────────────────

const ZERO_DECIMAL = new Set(['jpy', 'krw']);

function stripeToMajor(amount: number, currency: string): number {
  return ZERO_DECIMAL.has(currency.toLowerCase()) ? amount : amount / 100;
}

function fmt(amount: number, currency: string): string {
  return formatAmount(stripeToMajor(amount, currency), currency);
}

function fmtMajor(amount: number, currency: string): string {
  return formatAmount(amount, currency);
}

function fmtDate(unix: number): string {
  return new Date(unix * 1000).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

function fmtDateStr(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

function txIcon(type: string) {
  if (type === 'payment' || type === 'charge') return <ArrowDownLeft className="w-4 h-4 text-emerald-500" />;
  if (type === 'payout') return <ArrowUpRight className="w-4 h-4 text-blue-500" />;
  if (type === 'refund' || type === 'payment_refund') return <RotateCcw className="w-4 h-4 text-amber-500" />;
  return <ArrowDownLeft className="w-4 h-4 text-gray-400" />;
}

function txLabel(type: string): string {
  const labels: Record<string, string> = {
    payment: 'Paiement reçu',
    charge: 'Paiement reçu',
    payout: 'Versement bancaire',
    refund: 'Remboursement',
    payment_refund: 'Remboursement',
    transfer: 'Transfert',
  };
  return labels[type] ?? type;
}

// ── CSV export ────────────────────────────────────────────────────────────────

function exportTransactionsCSV(transactions: StripeTransaction[]) {
  const headers = ['Date', 'Type', 'Description', 'Amount', 'Fee', 'Net', 'Currency', 'Status'];
  const rows = transactions.map((tx) => [
    new Date(tx.created * 1000).toISOString().slice(0, 10),
    tx.type,
    tx.description ?? '',
    (ZERO_DECIMAL.has(tx.currency) ? tx.amount : tx.amount / 100).toFixed(2),
    (ZERO_DECIMAL.has(tx.currency) ? tx.fee : tx.fee / 100).toFixed(2),
    (ZERO_DECIMAL.has(tx.currency) ? tx.net : tx.net / 100).toFixed(2),
    tx.currency.toUpperCase(),
    tx.status,
  ]);
  const csv = [headers, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `nelsy-transactions-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Transaction summary (gross / fees / net) per currency ─────────────────────

interface TxSummary { gross: number; fees: number; net: number; refunds: number }

function summarizeTransactions(txs: StripeTransaction[]): Record<string, TxSummary> {
  const result: Record<string, TxSummary> = {};
  for (const tx of txs) {
    const c = tx.currency.toLowerCase();
    if (!result[c]) result[c] = { gross: 0, fees: 0, net: 0, refunds: 0 };
    if (tx.type === 'payment' || tx.type === 'charge') {
      result[c].gross += tx.amount;
      result[c].fees += tx.fee;
      result[c].net += tx.net;
    } else if (tx.type === 'refund' || tx.type === 'payment_refund') {
      result[c].refunds += Math.abs(tx.amount);
    }
  }
  return result;
}

function payoutStatusBadge(status: string) {
  const map: Record<string, { label: string; cls: string }> = {
    pending: { label: 'En attente', cls: 'bg-amber-100 text-amber-700' },
    in_transit: { label: 'En cours', cls: 'bg-blue-100 text-blue-700' },
    paid: { label: 'Versé', cls: 'bg-emerald-100 text-emerald-700' },
    failed: { label: 'Échoué', cls: 'bg-red-100 text-red-700' },
    canceled: { label: 'Annulé', cls: 'bg-gray-100 text-gray-500' },
  };
  const s = map[status] ?? { label: status, cls: 'bg-gray-100 text-gray-500' };
  return (
    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${s.cls}`}>{s.label}</span>
  );
}

// ── Cash-out confirmation modal ───────────────────────────────────────────────

interface CashOutModalProps {
  currency: string;
  amount: number; // Stripe smallest unit
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}

function CashOutModal({ currency, amount, onConfirm, onCancel, loading }: CashOutModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
            <Banknote className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Confirmer le retrait</h3>
            <p className="text-xs text-gray-500">Versement vers votre compte bancaire</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 mb-5 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Montant disponible</span>
            <span className="font-bold text-gray-900">{fmt(amount, currency)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Frais Nelsy</span>
            <span className="font-semibold text-emerald-600">0%</span>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between">
            <span className="font-semibold text-gray-700">Vous recevrez</span>
            <span className="font-black text-gray-900">{fmt(amount, currency)}</span>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-5 leading-relaxed">
          Le versement sera initié immédiatement. L'arrivée sur votre compte bancaire prend
          généralement 1 à 4 jours ouvrés selon votre pays et votre banque.
          Aucune date garantie.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-sm font-bold disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {loading ? 'Envoi...' : 'Confirmer'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function Revenue() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [balance, setBalance] = useState<StripeBalance | null>(null);
  const [balanceLoading, setBalanceLoading] = useState(true);
  const [balanceError, setBalanceError] = useState<string | null>(null);

  const [transactions, setTransactions] = useState<StripeTransaction[]>([]);
  const [txLoading, setTxLoading] = useState(false);
  const [txError, setTxError] = useState<string | null>(null);
  const [txHasMore, setTxHasMore] = useState(false);
  const [txLastId, setTxLastId] = useState<string | null>(null);

  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [payoutsLoading, setPayoutsLoading] = useState(false);
  const [payoutsError, setPayoutsError] = useState<string | null>(null);

  // Cash-out flow
  const [cashOutCurrency, setCashOutCurrency] = useState<string | null>(null);
  const [cashOutRequestId, setCashOutRequestId] = useState<string | null>(null);
  const [showCashOutModal, setShowCashOutModal] = useState(false);
  const [cashOutLoading, setCashOutLoading] = useState(false);
  const [cashOutResult, setCashOutResult] = useState<{ success: boolean; message: string } | null>(null);

  const fetchBalance = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) { setBalanceLoading(false); return; }
    setBalanceLoading(true);
    setBalanceError(null);
    try {
      const { data, error } = await supabase.functions.invoke('get-stripe-balance');
      if (error) throw new Error(error.message);
      setBalance(data as StripeBalance);
    } catch (e) {
      setBalanceError(e instanceof Error ? e.message : 'Erreur inconnue');
    } finally {
      setBalanceLoading(false);
    }
  }, []);

  const fetchTransactions = useCallback(async (append = false) => {
    if (!isSupabaseConfigured || !supabase) return;
    setTxLoading(true);
    setTxError(null);
    try {
      const body: Record<string, unknown> = { type: 'all', limit: 25 };
      if (append && txLastId) body.starting_after = txLastId;
      const { data, error } = await supabase.functions.invoke('get-stripe-transactions', { body });
      if (error) throw new Error(error.message);
      const result = data as { transactions: StripeTransaction[]; has_more: boolean; last_id: string | null };
      setTransactions((prev) => append ? [...prev, ...result.transactions] : result.transactions);
      setTxHasMore(result.has_more);
      setTxLastId(result.last_id);
    } catch (e) {
      setTxError(e instanceof Error ? e.message : 'Erreur inconnue');
    } finally {
      setTxLoading(false);
    }
  }, [txLastId]);

  const fetchPayouts = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) return;
    setPayoutsLoading(true);
    setPayoutsError(null);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data, error } = await supabase
        .from('payouts')
        .select('*')
        .eq('profile_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);
      if (error) throw error;
      setPayouts((data ?? []) as Payout[]);
    } catch (e) {
      setPayoutsError(e instanceof Error ? e.message : 'Erreur inconnue');
    } finally {
      setPayoutsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchBalance();
  }, [fetchBalance]);

  useEffect(() => {
    if (activeTab === 'transactions' && transactions.length === 0) void fetchTransactions();
    if (activeTab === 'payouts') void fetchPayouts();
  }, [activeTab]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCashOut = (currency: string) => {
    setCashOutCurrency(currency);
    // Generate a stable request_id for this UI action — prevents double-submit
    setCashOutRequestId(crypto.randomUUID());
    setCashOutResult(null);
    setShowCashOutModal(true);
  };

  const handleCashOutConfirm = async () => {
    if (!cashOutCurrency || !supabase) return;
    setCashOutLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-payout', {
        body: { currency: cashOutCurrency, request_id: cashOutRequestId },
      });
      if (error) {
        const msg = (data as { error?: string })?.error ?? error.message;
        throw new Error(msg);
      }
      setShowCashOutModal(false);
      setCashOutResult({ success: true, message: 'Versement initié. Arrivée en banque sous 1 à 4 jours ouvrés.' });
      // Refresh balance and payouts
      await fetchBalance();
      void fetchPayouts();
    } catch (e) {
      setShowCashOutModal(false);
      setCashOutResult({ success: false, message: e instanceof Error ? e.message : 'Erreur inconnue' });
    } finally {
      setCashOutLoading(false);
    }
  };

  // ── No Stripe account ──────────────────────────────────────────────────────

  if (!balanceLoading && balance && !balance.connected) {
    return (
      <div className="max-w-2xl">
        <h1 className="text-2xl font-black text-espresso mb-6">Revenus</h1>
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
          <AlertCircle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-gray-900 mb-2">Connectez Stripe pour voir vos revenus</h2>
          <p className="text-gray-500 text-sm mb-5">
            Activez les paiements depuis Paramètres &gt; Paiements Stripe.
          </p>
        </div>
      </div>
    );
  }

  // ── Tabs ───────────────────────────────────────────────────────────────────

  const tabs: { id: TabId; label: string }[] = [
    { id: 'overview', label: 'Solde' },
    { id: 'transactions', label: 'Historique' },
    { id: 'payouts', label: 'Versements' },
  ];

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-black text-espresso">Revenus</h1>
        <button
          onClick={() => void fetchBalance()}
          className="p-2 rounded-xl hover:bg-gray-100 transition"
          title="Actualiser"
        >
          <RefreshCw className={`w-4 h-4 text-gray-400 ${balanceLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Cash-out result banner */}
      {cashOutResult && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-4 rounded-2xl px-4 py-3 text-sm font-medium flex items-center gap-2 ${
            cashOutResult.success
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {cashOutResult.success ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
          {cashOutResult.message}
          <button onClick={() => setCashOutResult(null)} className="ml-auto text-xs underline opacity-60">OK</button>
        </motion.div>
      )}

      {/* Tab nav */}
      <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 rounded-xl text-sm font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Overview tab ────────────────────────────────────────────────────── */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          {balanceLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
            </div>
          )}

          {balanceError && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-700">
              {balanceError}
              <button onClick={() => void fetchBalance()} className="ml-2 underline">Réessayer</button>
            </div>
          )}

          {balance && !balanceLoading && (
            <>
              {/* Account status */}
              {(!balance.charges_enabled || !balance.payouts_enabled) && (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span className="font-semibold text-amber-800">Action requise sur votre compte Stripe</span>
                  </div>
                  <ul className="text-amber-700 space-y-1 text-xs ml-6 list-disc">
                    {!balance.charges_enabled && <li>Encaissements non activés</li>}
                    {!balance.payouts_enabled && <li>Versements bancaires non activés — vérification d'identité en cours ou requise</li>}
                  </ul>
                </div>
              )}

              {/* Balance cards */}
              {balance.available.map((entry) => (
                <motion.div
                  key={`avail-${entry.currency}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">Disponible au retrait</p>
                      <p className="text-3xl font-black text-gray-900">{fmt(entry.amount, entry.currency)}</p>
                    </div>
                    <div className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>

                  {entry.amount > 0 && balance.payouts_enabled ? (
                    <button
                      onClick={() => handleCashOut(entry.currency)}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-bold text-sm hover:opacity-90 transition flex items-center justify-center gap-2"
                    >
                      <ArrowDownToLine className="w-4 h-4" />
                      Retirer mes fonds
                    </button>
                  ) : (
                    <div className="w-full py-3 rounded-2xl bg-gray-100 text-gray-400 font-semibold text-sm text-center">
                      {!balance.payouts_enabled
                        ? 'Versements non activés — finalisez la configuration Stripe'
                        : 'Aucun solde disponible'}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Pending balance */}
              {balance.pending.filter((e) => e.amount > 0).map((entry) => (
                <div
                  key={`pend-${entry.currency}`}
                  className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">En attente de disponibilité</p>
                      <p className="text-2xl font-black text-gray-500">{fmt(entry.amount, entry.currency)}</p>
                    </div>
                    <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center">
                      <Clock className="w-5 h-5 text-amber-600" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    Fonds reçus en cours de traitement Stripe.
                    {balance.payout_schedule?.interval === 'daily' && ' Disponibles en règle générale sous 1 à 2 jours ouvrés.'}
                    {balance.payout_schedule?.interval === 'weekly' && ` Disponibles chaque ${balance.payout_schedule.weekly_anchor}.`}
                    {!balance.payout_schedule && ' Délai selon le calendrier de versement Stripe.'}
                  </p>
                </div>
              ))}

              {/* Empty state */}
              {balance.available.length === 0 && balance.pending.filter((e) => e.amount > 0).length === 0 && (
                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
                  <TrendingUp className="w-8 h-8 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Aucun solde pour le moment. Les paiements reçus apparaîtront ici.</p>
                </div>
              )}

              {/* Sales summary from loaded transactions */}
              {transactions.length > 0 && (() => {
                const summary = summarizeTransactions(transactions);
                return Object.entries(summary).map(([c, s]) => (
                  <div key={`sum-${c}`} className="bg-white rounded-3xl p-5 border border-gray-100 shadow-sm">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                      Activity summary · {c.toUpperCase()} <span className="text-gray-300 font-normal normal-case">(last {transactions.length} transactions loaded)</span>
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-gray-400 text-xs mb-0.5">Gross sales</p>
                        <p className="font-bold text-gray-900">{fmt(s.gross, c)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-0.5">Processing fees</p>
                        <p className="font-bold text-gray-500">{fmt(s.fees, c)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-0.5">Refunds</p>
                        <p className="font-bold text-amber-600">{s.refunds > 0 ? `- ${fmt(s.refunds, c)}` : '—'}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-xs mb-0.5">Net received</p>
                        <p className="font-black text-gray-900">{fmt(s.net, c)}</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-3">
                      Fees and net amounts from Stripe balance transactions — exact, not estimated.
                      Load more transactions in the History tab to extend the range.
                    </p>
                  </div>
                ));
              })()}

              {/* Disclaimer */}
              <p className="text-xs text-gray-400 text-center px-2">
                Live balances from Stripe. A payout may group multiple payments.
                Nelsy charges no withdrawal fee.
              </p>
            </>
          )}
        </div>
      )}

      {/* ── Transactions tab ─────────────────────────────────────────────────── */}
      {activeTab === 'transactions' && (
        <div className="space-y-3">
          {transactions.length > 0 && (
            <div className="flex justify-end">
              <button
                onClick={() => exportTransactionsCSV(transactions)}
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-700 transition px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </button>
            </div>
          )}
          {txLoading && transactions.length === 0 && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
            </div>
          )}

          {txError && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-700">
              {txError}
              <button onClick={() => void fetchTransactions()} className="ml-2 underline">Réessayer</button>
            </div>
          )}

          {transactions.length === 0 && !txLoading && !txError && (
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
              <p className="text-gray-400 text-sm">Aucune transaction pour le moment.</p>
            </div>
          )}

          {transactions.map((tx) => (
            <div key={tx.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                {txIcon(tx.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{txLabel(tx.type)}</p>
                <p className="text-xs text-gray-400">{fmtDate(tx.created)}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className={`text-sm font-bold ${tx.net >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
                  {tx.net >= 0 ? '+' : ''}{fmt(tx.net, tx.currency)}
                </p>
                {tx.fee > 0 && (
                  <p className="text-[10px] text-gray-400">frais {fmt(tx.fee, tx.currency)}</p>
                )}
              </div>
            </div>
          ))}

          {txHasMore && (
            <button
              onClick={() => void fetchTransactions(true)}
              disabled={txLoading}
              className="w-full py-3 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {txLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ChevronDown className="w-4 h-4" />}
              Voir plus
            </button>
          )}

          <p className="text-xs text-gray-400 text-center">
            Données directement depuis Stripe — frais et montants nets réels.
          </p>
        </div>
      )}

      {/* ── Payouts tab ──────────────────────────────────────────────────────── */}
      {activeTab === 'payouts' && (
        <div className="space-y-3">
          {payoutsLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-purple-400" />
            </div>
          )}

          {payoutsError && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-700">
              {payoutsError}
            </div>
          )}

          {payouts.length === 0 && !payoutsLoading && !payoutsError && (
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm text-center">
              <Banknote className="w-8 h-8 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Aucun versement encore initié.</p>
            </div>
          )}

          {payouts.map((p) => (
            <div key={p.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-sm font-bold text-gray-900">{fmtMajor(p.amount, p.currency)}</p>
                  <p className="text-xs text-gray-400">{fmtDateStr(p.created_at)}</p>
                </div>
                {payoutStatusBadge(p.status)}
              </div>

              {p.status === 'paid' && p.paid_at && (
                <p className="text-xs text-emerald-600">Versé le {fmtDateStr(p.paid_at)}</p>
              )}
              {(p.status === 'pending' || p.status === 'in_transit') && p.estimated_arrival && (
                <p className="text-xs text-gray-400">Arrivée estimée vers le {fmtDateStr(p.estimated_arrival)} (non garantie)</p>
              )}
              {p.status === 'failed' && p.failure_message && (
                <p className="text-xs text-red-600 mt-1">{p.failure_message}</p>
              )}

              <p className="text-[10px] text-gray-300 mt-1 font-mono">{p.stripe_payout_id}</p>
            </div>
          ))}

          <p className="text-xs text-gray-400 text-center px-2">
            Un versement peut regrouper plusieurs paiements. La date d'arrivée est une estimation Stripe.
          </p>
        </div>
      )}

      {/* Cash-out modal */}
      <AnimatePresence>
        {showCashOutModal && cashOutCurrency && balance && (
          <CashOutModal
            currency={cashOutCurrency}
            amount={balance.available.find((e) => e.currency === cashOutCurrency)?.amount ?? 0}
            onConfirm={() => void handleCashOutConfirm()}
            onCancel={() => setShowCashOutModal(false)}
            loading={cashOutLoading}
          />
        )}
      </AnimatePresence>

      {/* Stripe dashboard link */}
      {balance?.connected && (
        <div className="mt-6 text-center">
          <button
            onClick={async () => {
              if (!supabase) return;
              try {
                const { data, error } = await supabase.functions.invoke('create-stripe-dashboard-link');
                if (error || !data?.url) throw new Error('Impossible d\'ouvrir le tableau de bord Stripe');
                window.open(data.url as string, '_blank', 'noopener');
              } catch (e) {
                alert(e instanceof Error ? e.message : 'Erreur');
              }
            }}
            className="inline-flex items-center gap-2 text-xs text-gray-400 hover:text-gray-600 transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Voir le détail complet sur Stripe
          </button>
        </div>
      )}
    </div>
  );
}
