import { useCallback, useEffect, useState } from 'react';
import { Banknote, CreditCard, Globe, Loader2, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

type Method = 'stripe' | 'cash' | 'card_external';

interface PaymentRow {
  id: string;
  amount: number;
  method: Method;
  created_at: string;
}

const METHOD_LABEL: Record<Method, string> = { stripe: 'Paid online', cash: 'Cash', card_external: 'Card' };
const METHOD_ICON = { stripe: Globe, cash: Banknote, card_external: CreditCard };

function fmt(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 2 }).format(amount);
}

/** What was received for a booking, what is left, and recording on-site payments. */
export default function BookingPaymentPanel({ bookingId, profileId, price, currency = 'EUR', onChanged }: {
  bookingId: string;
  profileId: string;
  price: number;
  currency?: string;
  onChanged?: () => void;
}) {
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [recording, setRecording] = useState(false);
  const [method, setMethod] = useState<'cash' | 'card_external'>('cash');
  const [amount, setAmount] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from('booking_payments')
      .select('id, amount, method, created_at')
      .eq('booking_id', bookingId)
      .order('created_at', { ascending: true });
    setPayments(((data ?? []) as PaymentRow[]).map((p) => ({ ...p, amount: Number(p.amount) })));
    setLoading(false);
  }, [bookingId]);

  useEffect(() => { void load(); }, [load]);

  const paid = payments.reduce((sum, p) => sum + p.amount, 0);
  const remaining = Math.max(0, Math.round((price - paid) * 100) / 100);

  const startRecording = () => {
    setAmount(remaining.toFixed(2));
    setError(null);
    setRecording(true);
  };

  const save = async () => {
    if (!supabase) return;
    const value = Math.round(parseFloat(amount) * 100) / 100;
    if (!Number.isFinite(value) || value <= 0) { setError('Enter an amount above 0.'); return; }
    if (value > remaining + 0.005) { setError(`That's more than the ${fmt(remaining, currency)} left to pay.`); return; }
    setSaving(true);
    setError(null);
    const { error: insertError } = await supabase
      .from('booking_payments')
      .insert({ booking_id: bookingId, profile_id: profileId, amount: value, method });
    setSaving(false);
    if (insertError) {
      setError(insertError.message.includes('exceeds') ? insertError.message : 'Could not record the payment. Please try again.');
      return;
    }
    setRecording(false);
    await load();
    onChanged?.();
  };

  const remove = async (id: string) => {
    if (!supabase) return;
    await supabase.from('booking_payments').delete().eq('id', id);
    await load();
    onChanged?.();
  };

  if (loading) {
    return <div className="h-24 rounded-2xl bg-gray-50 animate-pulse" />;
  }

  const status = paid >= price - 0.005 ? 'Paid' : paid > 0 ? 'Partly paid' : 'Not paid';
  const statusCls = paid >= price - 0.005 ? 'bg-green-50 text-green-700 border-green-200'
    : paid > 0 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-gray-100 text-gray-600 border-gray-200';

  return (
    <div className="rounded-2xl border border-gray-100 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-[#1A1A1A]">Payment</p>
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusCls}`}>{status}</span>
      </div>

      {payments.length > 0 && (
        <ul className="space-y-1.5">
          {payments.map((p) => {
            const Icon = METHOD_ICON[p.method];
            return (
              <li key={p.id} className="flex items-center gap-2.5 text-sm">
                <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="flex-1 text-gray-600">
                  {METHOD_LABEL[p.method]}
                  <span className="text-gray-400"> · {new Date(p.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </span>
                <span className="font-semibold text-gray-900">{fmt(p.amount, currency)}</span>
                {p.method !== 'stripe' && (
                  <button onClick={() => void remove(p.id)} aria-label="Remove this payment" className="p-1 rounded text-gray-300 hover:text-red-500 transition">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-3">
        <span className="text-gray-500">Left to pay</span>
        <span className={`font-bold ${remaining > 0 ? 'text-[#1A1A1A]' : 'text-green-600'}`}>{fmt(remaining, currency)}</span>
      </div>

      {remaining > 0 && !recording && (
        <button onClick={startRecording}
          className="w-full py-2.5 rounded-xl bg-[#1A1A1A] text-white text-sm font-semibold hover:opacity-90 transition active:scale-[0.99]">
          Record payment
        </button>
      )}

      {recording && (
        <div className="space-y-2.5">
          <div className="grid grid-cols-2 gap-2">
            {(['cash', 'card_external'] as const).map((m) => {
              const Icon = METHOD_ICON[m];
              const on = method === m;
              return (
                <button key={m} type="button" onClick={() => setMethod(m)} aria-pressed={on}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold transition ${on ? 'border-[#F52B8C] bg-[#fff8fb] text-[#C2186F]' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                  <Icon className="w-4 h-4" /> {m === 'cash' ? 'Cash' : 'Card'}
                </button>
              );
            })}
          </div>
          <div className="relative">
            <input type="number" inputMode="decimal" step="0.01" min="0.01" value={amount} onChange={(e) => setAmount(e.target.value)}
              aria-label="Amount received"
              className="w-full pl-3.5 pr-14 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-[#F52B8C] focus:outline-none" />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400">{currency}</span>
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <div className="flex gap-2">
            <button onClick={() => setRecording(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
              Cancel
            </button>
            <button onClick={() => void save()} disabled={saving}
              className="flex-1 py-2.5 rounded-xl bg-[#F52B8C] text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2">
              {saving && <Loader2 className="w-4 h-4 animate-spin" />} Save
            </button>
          </div>
          <p className="text-[11px] text-gray-400 leading-relaxed">
            Cash and card payments taken at the studio show in your revenue. They are not added to your Nelsy balance.
          </p>
        </div>
      )}
    </div>
  );
}
