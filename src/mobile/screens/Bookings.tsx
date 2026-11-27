import { useMemo, useState } from 'react';
import { useMoney } from '@/lib/currency';
import { useProData } from '../hooks/useProData';
import { BookingRow } from '../components/BookingRow';
import { fmtTime } from '../lib/format';
import { DemoBanner, ScreenTitle, Sheet, StatusChip } from '../components/ui';
import type { ProBooking } from '../lib/types';

function dayLabel(d: Date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.round((+d - +today) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff === -1) return 'Yesterday';
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
}

export default function Bookings() {
  const { data } = useProData();
  const money = useMoney();
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [open, setOpen] = useState<ProBooking | null>(null);

  const groups = useMemo(() => {
    if (!data) return [];
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const list = data.bookings
      .filter((b) => (tab === 'upcoming' ? +new Date(b.datetime) >= +start : +new Date(b.datetime) < +start))
      .sort((a, b) => (tab === 'upcoming' ? 1 : -1) * (+new Date(a.datetime) - +new Date(b.datetime)));
    const map = new Map<string, { label: string; items: ProBooking[] }>();
    for (const b of list) {
      const d = new Date(b.datetime);
      d.setHours(0, 0, 0, 0);
      const key = d.toISOString();
      if (!map.has(key)) map.set(key, { label: dayLabel(d), items: [] });
      map.get(key)!.items.push(b);
    }
    return [...map.values()];
  }, [data, tab]);

  if (!data) return null;

  return (
    <div className="pb-6">
      <ScreenTitle>Bookings</ScreenTitle>
      {data.mode === 'demo' && <DemoBanner />}

      <div className="mx-4 mb-2 grid grid-cols-2 rounded-full bg-gray-100 p-1" role="tablist">
        {(['upcoming', 'past'] as const).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`h-10 rounded-full text-[14px] font-semibold capitalize transition ${tab === t ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-gray-500'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {groups.length === 0 && (
        <p className="mx-4 mt-6 rounded-2xl bg-gray-50 p-5 text-center text-[14px] text-gray-500">
          {tab === 'upcoming' ? 'No upcoming bookings yet.' : 'No past bookings in the last 60 days.'}
        </p>
      )}

      {groups.map((g) => (
        <section key={g.label} className="mt-4 px-4">
          <h2 className="text-[13px] font-bold uppercase tracking-wide text-gray-400">{g.label}</h2>
          <div className="divide-y divide-gray-100">
            {g.items.map((b) => (
              <BookingRow key={b.id} b={b} onClick={() => setOpen(b)} />
            ))}
          </div>
        </section>
      ))}

      <Sheet open={!!open} onClose={() => setOpen(null)} title={open?.clientName}>
        {open && (
          <div className="space-y-3 px-1 text-[15px]">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Status</span>
              <StatusChip status={open.status} />
            </div>
            {[
              ['Service', open.serviceName],
              ['When', `${new Date(open.datetime).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}, ${fmtTime(open.datetime)}`],
              ['Duration', `${open.duration} min`],
              ['Price', money(open.price)],
              ['Deposit paid', money(open.depositPaid)],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4">
                <span className="text-gray-500">{k}</span>
                <span className="text-right font-semibold">{v}</span>
              </div>
            ))}
          </div>
        )}
      </Sheet>
    </div>
  );
}
