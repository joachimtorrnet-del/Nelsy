import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Copy, Mail, MessageSquare, Phone, Video } from 'lucide-react';
import { useMoney } from '@/lib/currency';
import { timezoneCity } from '@/lib/timezone';
import { useProData } from '../hooks/useProData';
import { BookingRow } from '../components/BookingRow';
import { TimezoneBanner } from '../components/TimezoneBanner';
import { dayKey, dayLabel, fmtLongDay, fmtTime } from '../lib/format';
import { DemoBanner, ScreenTitle, Sheet, StatusChip, VideoBadge } from '../components/ui';
import { copyText, openExternal } from '../lib/native';
import { PINK, WEB } from '../lib/constants';
import type { ProBooking } from '../lib/types';

export default function Bookings() {
  const { data } = useProData();
  const money = useMoney();
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [open, setOpen] = useState<ProBooking | null>(null);
  const tz = data?.timezone ?? 'Europe/Paris';

  const groups = useMemo(() => {
    if (!data) return [];
    const today = dayKey(new Date(), tz);
    const list = data.bookings
      .filter((b) => (tab === 'upcoming' ? dayKey(b.datetime, tz) >= today : dayKey(b.datetime, tz) < today))
      .sort((a, b) => (tab === 'upcoming' ? 1 : -1) * (+new Date(a.datetime) - +new Date(b.datetime)));
    const map = new Map<string, ProBooking[]>();
    for (const b of list) {
      const key = dayKey(b.datetime, tz);
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(b);
    }
    return [...map.entries()].map(([key, items]) => ({ key, label: dayLabel(key, tz), items }));
  }, [data, tab, tz]);

  if (!data) return null;

  return (
    <div className="pb-6">
      <ScreenTitle right={<span className="pl-3 text-[12px] font-medium text-gray-400">{timezoneCity(tz)} time</span>}>Bookings</ScreenTitle>
      {data.mode === 'demo' && <DemoBanner />}
      <TimezoneBanner />

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
        <section key={g.key} className="mt-4 px-4">
          <h2 className="flex items-center justify-between text-[13px] font-bold uppercase tracking-wide text-gray-400">
            <span>{g.label}</span>
            <span className="font-semibold normal-case tracking-normal">
              {g.items.length} booking{g.items.length > 1 ? 's' : ''}
            </span>
          </h2>
          <div className="divide-y divide-gray-100">
            {g.items.map((b) => (
              <BookingRow key={b.id} b={b} tz={tz} onClick={() => setOpen(b)} />
            ))}
          </div>
        </section>
      ))}

      <Sheet open={!!open} onClose={() => setOpen(null)} title={open?.clientName}>
        {open && <BookingDetail b={open} tz={tz} money={money} />}
      </Sheet>
    </div>
  );
}

function BookingDetail({ b, tz, money }: { b: ProBooking; tz: string; money: (n: number) => string }) {
  const [copied, setCopied] = useState(false);
  const phone = b.clientPhone.replace(/[^\d+]/g, '');
  const contact = [
    phone && { icon: <Phone size={18} />, label: 'Call', href: `tel:${phone}` },
    phone && { icon: <MessageSquare size={18} />, label: 'Text', href: `sms:${phone}` },
    b.clientEmail && { icon: <Mail size={18} />, label: 'Email', href: `mailto:${b.clientEmail}` },
  ].filter(Boolean) as { icon: ReactNode; label: string; href: string }[];

  return (
    <div className="px-1">
      <div className="flex flex-wrap items-center gap-2">
        <StatusChip status={b.status} />
        {b.online && <VideoBadge />}
      </div>

      <div className="mt-3 space-y-2.5 text-[15px]">
        {[
          ['Service', b.serviceName],
          ['When', `${fmtLongDay(b.datetime, tz)}, ${fmtTime(b.datetime, tz)}`],
          ['Duration', `${b.duration} min`],
          ['Price', money(b.price)],
          ...(b.depositPaid > 0 ? [['Deposit', money(b.depositPaid)]] : []),
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between gap-4">
            <span className="text-gray-500">{k}</span>
            <span className="text-right font-semibold">{v}</span>
          </div>
        ))}
      </div>

      {b.online && (
        <div className="mt-4 rounded-2xl bg-[#EEF2FF] p-3.5">
          <p className="flex items-center gap-1.5 text-[14px] font-bold text-[#3730A3]">
            <Video size={16} /> Video call
          </p>
          {b.videoUrl ? (
            <>
              <p className="mt-1 truncate text-[13px] text-[#3730A3]/80">{b.videoUrl}</p>
              <div className="mt-2.5 flex gap-2">
                <button
                  type="button"
                  onClick={() => openExternal(b.videoUrl!)}
                  className="h-10 flex-1 rounded-full bg-[#3730A3] text-[13px] font-bold text-white"
                >
                  Join call
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    if (await copyText(b.videoUrl!)) {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    }
                  }}
                  className="flex h-10 items-center gap-1.5 rounded-full bg-white px-4 text-[13px] font-bold text-[#3730A3]"
                >
                  <Copy size={14} /> {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            </>
          ) : (
            <p className="mt-1 text-[13px] text-[#3730A3]/80">No meeting link on this service yet. Add it to the service on getnelsy.com.</p>
          )}
        </div>
      )}

      <div className="mt-4 border-t border-gray-100 pt-3">
        <p className="text-[13px] font-bold uppercase tracking-wide text-gray-400">Client</p>
        <p className="mt-1 text-[15px] font-semibold">{b.clientName}</p>
        {b.clientEmail && <p className="text-[13px] text-gray-500">{b.clientEmail}</p>}
        {b.clientPhone && <p className="text-[13px] text-gray-500">{b.clientPhone}</p>}
        {contact.length > 0 && (
          <div className="mt-3 grid gap-2" style={{ gridTemplateColumns: `repeat(${contact.length}, minmax(0, 1fr))` }}>
            {contact.map((c) => (
              <a key={c.label} href={c.href} className="flex h-12 flex-col items-center justify-center rounded-2xl bg-gray-100 text-[12px] font-semibold text-[#1A1A1A]">
                {c.icon}
                <span className="mt-0.5">{c.label}</span>
              </a>
            ))}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={() => openExternal(WEB.calendar)}
        className="mt-4 h-11 w-full text-[14px] font-semibold"
        style={{ color: PINK }}
      >
        Manage this booking on getnelsy.com
      </button>
    </div>
  );
}
