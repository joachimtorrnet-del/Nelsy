import { useEffect, useState } from 'react';
import { Globe, Store } from 'lucide-react';
import { supabase } from '../../lib/supabase';

function fmt(amount: number, currency: string) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 2 }).format(amount);
}

/** Money collected this month, online vs at the studio. Only online money is withdrawable. */
export default function CollectedSummary({ currency = 'EUR' }: { currency?: string }) {
  const [totals, setTotals] = useState<{ online: number; onSite: number } | null>(null);

  useEffect(() => {
    void (async () => {
      if (!supabase) return;
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const monthStart = new Date(); monthStart.setDate(1); monthStart.setHours(0, 0, 0, 0);
      const { data } = await supabase
        .from('booking_payments')
        .select('amount, method')
        .eq('profile_id', user.id)
        .gte('created_at', monthStart.toISOString());
      let online = 0; let onSite = 0;
      for (const p of (data ?? []) as { amount: number; method: string }[]) {
        if (p.method === 'stripe') online += Number(p.amount); else onSite += Number(p.amount);
      }
      setTotals({ online, onSite });
    })();
  }, []);

  if (!totals) return <div className="h-[132px] rounded-3xl bg-gray-50 animate-pulse mb-6" />;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-5 mb-6">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Collected this month</p>
      <p className="text-3xl font-bold text-[#1A1A1A] tracking-tight mt-1">{fmt(totals.online + totals.onSite, currency)}</p>
      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="rounded-2xl bg-gray-50 p-3">
          <p className="flex items-center gap-1.5 text-xs text-gray-500"><Globe className="w-3.5 h-3.5" /> Online</p>
          <p className="text-base font-bold text-[#1A1A1A] mt-0.5">{fmt(totals.online, currency)}</p>
        </div>
        <div className="rounded-2xl bg-gray-50 p-3">
          <p className="flex items-center gap-1.5 text-xs text-gray-500"><Store className="w-3.5 h-3.5" /> At the studio</p>
          <p className="text-base font-bold text-[#1A1A1A] mt-0.5">{fmt(totals.onSite, currency)}</p>
        </div>
      </div>
      <p className="text-[11px] text-gray-400 mt-3 leading-relaxed">
        Only online payments go to your Nelsy balance and can be withdrawn. Cash and card payments at the studio are already in your hands.
      </p>
    </div>
  );
}
