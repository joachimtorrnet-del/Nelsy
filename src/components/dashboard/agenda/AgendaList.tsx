import { useMemo, useState } from 'react';
import { formatDay, groupByDay, relativeDayLabel } from '../../../lib/agenda';
import type { AgendaBooking, DayKey } from '../../../lib/agenda';
import { BookingCard } from '../BookingCard';

type ListFilter = 'upcoming' | 'past' | 'cancelled';

const FILTERS: { id: ListFilter; label: string }[] = [
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'past', label: 'Past' },
  { id: 'cancelled', label: 'Cancelled' },
];

const EMPTY: Record<ListFilter, string> = {
  upcoming: 'Nothing coming up. New bookings will show here.',
  past: 'No past appointments yet.',
  cancelled: 'No cancelled bookings.',
};

const PAGE = 40;

interface AgendaListProps {
  bookings: AgendaBooking[];
  timezone: string;
  today: DayKey;
  now: Date;
  currency: string;
  hour12: boolean;
  onOpen: (booking: AgendaBooking) => void;
}

/** Appointments grouped by day: the fastest view to scan what is coming. */
export default function AgendaList({ bookings, timezone, today, now, currency, hour12, onOpen }: AgendaListProps) {
  const [filter, setFilter] = useState<ListFilter>('upcoming');
  const [limit, setLimit] = useState(PAGE);

  const buckets = useMemo(() => {
    const upcoming: AgendaBooking[] = [];
    const past: AgendaBooking[] = [];
    const cancelled: AgendaBooking[] = [];
    for (const b of bookings) {
      if (b.status === 'cancelled' || b.status === 'refunded') cancelled.push(b);
      else if (b.end > now && b.status !== 'completed' && b.status !== 'no_show') upcoming.push(b);
      else past.push(b);
    }
    const asc = (a: AgendaBooking, b: AgendaBooking) => a.start.getTime() - b.start.getTime();
    upcoming.sort(asc);
    past.sort((a, b) => -asc(a, b));
    cancelled.sort((a, b) => -asc(a, b));
    return { upcoming, past, cancelled };
  }, [bookings, now]);

  const items = buckets[filter];
  const groups = useMemo(() => groupByDay(items.slice(0, limit), timezone), [items, limit, timezone]);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-6 pt-4 lg:px-8">
      <div role="group" aria-label="Filter bookings" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => { setFilter(f.id); setLimit(PAGE); }}
            aria-pressed={filter === f.id}
            className={`h-11 flex-shrink-0 rounded-full border px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-1 ${
              filter === f.id ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
            }`}
          >
            {f.label}
            <span className={`ml-1.5 tabular-nums ${filter === f.id ? 'text-white/70' : 'text-gray-400'}`}>{buckets[f.id].length}</span>
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="mt-10 text-center text-[15px] text-gray-500">{EMPTY[filter]}</p>
      ) : (
        <div className="mt-5 space-y-7">
          {groups.map((group) => {
            const relative = relativeDayLabel(group.day, today);
            const full = formatDay(group.day, { weekday: 'long', month: 'long', day: 'numeric' });
            const named = relative === 'Today' || relative === 'Tomorrow' || relative === 'Yesterday';
            return (
              <section key={group.day} aria-label={full}>
                <h3 className="mb-2.5 flex items-baseline gap-2">
                  <span className={`text-[17px] font-bold tracking-tight ${group.day === today ? 'text-[#F52B8C]' : 'text-[#1A1A1A]'}`}>
                    {named ? relative : full}
                  </span>
                  {named && <span className="text-[13px] font-medium text-gray-500">{formatDay(group.day, { weekday: 'short', month: 'short', day: 'numeric' })}</span>}
                  <span className="ml-auto text-[13px] font-medium tabular-nums text-gray-400">{group.items.length}</span>
                </h3>
                <ul className="space-y-2.5">
                  {group.items.map((b) => (
                    <li key={b.id}>
                      <BookingCard booking={b} timezone={timezone} currency={currency} hour12={hour12} onOpen={onOpen} />
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
          {items.length > limit && (
            <button
              type="button"
              onClick={() => setLimit((l) => l + PAGE)}
              className="mx-auto block h-11 rounded-full border border-gray-200 px-5 text-sm font-semibold text-[#1A1A1A] transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A]"
            >
              Show more
            </button>
          )}
        </div>
      )}
    </div>
  );
}
