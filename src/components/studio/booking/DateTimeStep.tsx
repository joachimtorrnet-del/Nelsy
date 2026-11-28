import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { ChevronLeft, ChevronRight, CalendarX2, Sunrise, Sun, Moon, ArrowRight, Globe } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { describeDay, findNextAvailable, groupSlots, shortDayLabel } from './availability';
import type { DayPart, SlotsByDate, StripDay } from './availability';

const PART_ICON: Record<DayPart, LucideIcon> = { morning: Sunrise, afternoon: Sun, evening: Moon };

// Day chip width + gap, used to translate scroll position into a day index.
const CHIP_W = 68;
const CHIP_GAP = 8;
const STRIDE = CHIP_W + CHIP_GAP;

const FOCUS_RING = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--bk-ink)]';

interface Props {
  days: StripDay[];
  todayStr: string;
  slotsByDate: SlotsByDate;
  /** How many days of the strip have been requested so far. */
  requestedCount: number;
  selectedDate: string | null;
  selectedTime: string | null;
  onSelectDay: (date: string, source: 'strip' | 'next_available') => void;
  onSelectTime: (slot: string) => void;
  /** The client is looking near the end of the requested days. */
  onNeedMoreDays: () => void;
  /** Shown for online sessions: which timezone the times are in. */
  timezoneNote?: string | null;
}

export function DateTimeStep({
  days, todayStr, slotsByDate, requestedCount, selectedDate, selectedTime,
  onSelectDay, onSelectTime, onNeedMoreDays, timezoneNote,
}: Props) {
  const stripRef = useRef<HTMLDivElement>(null);
  const [firstVisible, setFirstVisible] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });

  const syncScroll = useCallback(() => {
    const el = stripRef.current;
    if (!el) return;
    const first = Math.max(0, Math.min(days.length - 1, Math.round(el.scrollLeft / STRIDE)));
    setFirstVisible(first);
    setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
    const lastVisible = first + Math.ceil(el.clientWidth / STRIDE);
    if (lastVisible >= requestedCount - 2 && requestedCount < days.length) onNeedMoreDays();
  }, [days.length, requestedCount, onNeedMoreDays]);

  useEffect(() => { syncScroll(); }, [syncScroll]);

  // Keep the chosen day in view (it can change through the next-available shortcut)
  useEffect(() => {
    const el = stripRef.current;
    if (!el || !selectedDate) return;
    const chip = el.querySelector<HTMLElement>(`[data-date="${selectedDate}"]`);
    if (!chip) return;
    const left = chip.offsetLeft;
    const fullyVisible = left >= el.scrollLeft && left + chip.offsetWidth <= el.scrollLeft + el.clientWidth;
    if (!fullyVisible) el.scrollTo({ left: Math.max(0, left - CHIP_GAP * 2), behavior: 'smooth' });
  }, [selectedDate]);

  const page = (dir: 1 | -1) => {
    const el = stripRef.current;
    if (!el) return;
    const perPage = Math.max(1, Math.floor(el.clientWidth / STRIDE) - 1);
    el.scrollBy({ left: dir * perPage * STRIDE, behavior: 'smooth' });
  };

  // Roving focus: arrow keys move between days, Enter / Space picks one
  const onStripKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 1, ArrowUp: -1 };
    const delta = keys[e.key];
    const home = e.key === 'Home' ? 0 : e.key === 'End' ? days.length - 1 : null;
    if (delta === undefined && home === null) return;
    const current = (e.target as HTMLElement).closest<HTMLElement>('[data-date]')?.dataset.date;
    const idx = days.findIndex((d) => d.date === current);
    const next = home ?? Math.max(0, Math.min(days.length - 1, idx + (delta ?? 0)));
    const target = stripRef.current?.querySelector<HTMLElement>(`[data-date="${days[next].date}"]`);
    if (target) { e.preventDefault(); target.focus(); }
  };

  const monthDay = days[firstVisible] ?? days[0];
  const tabStopDate = selectedDate ?? days[0]?.date;

  const selectedSlots = selectedDate ? slotsByDate[selectedDate] : undefined;
  const groups = selectedSlots ? groupSlots(selectedSlots) : [];
  const selectedInfo = selectedDate ? describeDay(selectedDate, todayStr) : null;
  const nextAvailable = selectedDate && selectedSlots && selectedSlots.length === 0
    ? findNextAvailable(days.map((d) => d.date), slotsByDate, selectedDate)
    : undefined;
  const earlierAvailable = selectedDate && selectedSlots && selectedSlots.length === 0 && nextAvailable === null
    ? findNextAvailable(days.map((d) => d.date), slotsByDate, null)
    : undefined;

  return (
    <div>
      {/* ── Month label + paging arrows ─────────────────────────── */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-[15px] font-bold text-gray-900" aria-live="polite">
          {monthDay ? `${monthDay.monthLong} ${monthDay.year}` : ''}
        </p>
        <div className="flex items-center gap-1 -mr-2">
          <button
            type="button"
            onClick={() => page(-1)}
            disabled={edges.start}
            aria-label="Earlier days"
            className={`w-11 h-11 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors ${FOCUS_RING}`}
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => page(1)}
            disabled={edges.end}
            aria-label="Later days"
            className={`w-11 h-11 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors ${FOCUS_RING}`}
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* ── Day strip ───────────────────────────────────────────── */}
      <div
        ref={stripRef}
        onScroll={syncScroll}
        onKeyDown={onStripKey}
        role="radiogroup"
        aria-label="Choose a day"
        className="relative flex overflow-x-auto -mx-5 px-5 md:-mx-8 md:px-8 py-1 snap-x scroll-pl-5 md:scroll-pl-8 [&::-webkit-scrollbar]:hidden"
        style={{ gap: CHIP_GAP, scrollbarWidth: 'none' }}
      >
        {days.map((d, i) => {
          const slots = slotsByDate[d.date];
          const requested = i < requestedCount;
          const loading = requested && slots === undefined;
          const empty = slots !== undefined && slots.length === 0;
          const selected = d.date === selectedDate;
          return (
            <button
              key={d.date}
              type="button"
              role="radio"
              aria-checked={selected}
              tabIndex={d.date === tabStopDate ? 0 : -1}
              data-date={d.date}
              data-state={empty ? 'empty' : loading ? 'loading' : 'open'}
              onClick={() => onSelectDay(d.date, 'strip')}
              aria-label={`${d.relative ? `${d.relative}, ` : ''}${d.weekdayLong} ${d.day} ${d.monthLong}${empty ? ', no availability' : ''}`}
              className={`snap-start flex-shrink-0 flex flex-col items-center justify-center rounded-2xl border transition-colors ${FOCUS_RING} ${
                selected
                  ? 'border-transparent shadow-sm'
                  : empty
                    ? 'border-gray-100 bg-gray-50 text-gray-400'
                    : 'border-gray-200 bg-white text-gray-900 hover:border-gray-400'
              }`}
              style={{
                width: CHIP_W, height: 84,
                ...(selected ? { backgroundColor: 'var(--bk-fill)', color: 'var(--bk-on-fill)' } : {}),
              }}
            >
              <span className={`text-[11px] font-semibold leading-none ${selected ? '' : empty ? 'text-gray-400' : 'text-gray-500'}`}>
                {d.relative ?? d.weekday}
              </span>
              <span className={`text-[22px] font-bold leading-none mt-1.5 tabular-nums ${empty && !selected ? 'line-through decoration-1 decoration-gray-300' : ''}`}>
                {d.day}
              </span>
              <span className="h-[5px] mt-2 flex items-center" aria-hidden="true">
                {loading ? (
                  <span className={`w-[5px] h-[5px] rounded-full animate-pulse ${selected ? 'bg-current opacity-60' : 'bg-gray-300'}`} />
                ) : !empty && slots !== undefined ? (
                  <span className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: selected ? 'currentColor' : 'var(--bk-ink)' }} />
                ) : null}
              </span>
            </button>
          );
        })}
      </div>

      {timezoneNote && (
        <p className="mt-4 flex items-start gap-2 text-[13px] text-gray-600 bg-gray-50 rounded-xl px-3 py-2.5">
          <Globe className="w-4 h-4 mt-px flex-shrink-0 text-gray-500" aria-hidden="true" />
          <span>{timezoneNote}</span>
        </p>
      )}

      {/* ── Times ───────────────────────────────────────────────── */}
      <div className="mt-6" aria-live="polite" aria-busy={selectedSlots === undefined}>
        {selectedInfo && (
          <h3 className="text-[15px] font-bold text-gray-900 mb-3">
            {selectedInfo.relative ? `${selectedInfo.relative}, ` : ''}{selectedInfo.weekdayLong} {selectedInfo.day} {selectedInfo.monthLong}
          </h3>
        )}

        {selectedSlots === undefined ? (
          <SlotsSkeleton />
        ) : selectedSlots.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 px-5 py-8 text-center" data-testid="no-availability">
            <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full" style={{ backgroundColor: 'var(--bk-soft)' }}>
              <CalendarX2 className="w-5 h-5" style={{ color: 'var(--bk-ink)' }} aria-hidden="true" />
            </span>
            <p className="font-semibold text-gray-900">No openings on this day</p>
            {nextAvailable === undefined && earlierAvailable === undefined ? (
              <p className="mt-1 text-sm text-gray-500">Looking for the next opening…</p>
            ) : nextAvailable ? (
              <>
                <p className="mt-1 text-sm text-gray-500">The next opening is {longDay(nextAvailable, todayStr)}.</p>
                <NextButton date={nextAvailable} todayStr={todayStr} onClick={() => onSelectDay(nextAvailable, 'next_available')} />
              </>
            ) : earlierAvailable ? (
              <>
                <p className="mt-1 text-sm text-gray-500">Nothing later in the next {days.length} days. There is an earlier opening.</p>
                <NextButton date={earlierAvailable} todayStr={todayStr} onClick={() => onSelectDay(earlierAvailable, 'next_available')} />
              </>
            ) : (
              <p className="mt-1 text-sm text-gray-500">
                No openings in the next {days.length} days. Please check back soon.
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            {groups.map((group) => {
              const Icon = PART_ICON[group.key];
              return (
                <section key={group.key} aria-label={group.label}>
                  <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                    <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    {group.label}
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {group.slots.map((slot) => {
                      const selected = slot === selectedTime;
                      return (
                        <button
                          key={slot}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => onSelectTime(slot)}
                          className={`h-12 rounded-xl border text-[15px] font-semibold tabular-nums transition-colors active:scale-[0.97] ${FOCUS_RING} ${
                            selected ? 'border-transparent shadow-sm' : 'border-gray-200 bg-white text-gray-900 hover:border-gray-400'
                          }`}
                          style={selected ? { backgroundColor: 'var(--bk-fill)', color: 'var(--bk-on-fill)' } : undefined}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function longDay(date: string, todayStr: string): string {
  const d = describeDay(date, todayStr);
  return d.relative ? d.relative.toLowerCase() : `${d.weekdayLong} ${d.day} ${d.monthLong}`;
}

function NextButton({ date, todayStr, onClick }: { date: string; todayStr: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mt-4 inline-flex items-center gap-2 h-11 px-5 rounded-full border text-sm font-semibold hover:bg-gray-50 transition-colors ${FOCUS_RING}`}
      style={{ borderColor: 'var(--bk-ink)', color: 'var(--bk-ink)' }}
    >
      Next available: {shortDayLabel(date, todayStr)}
      <ArrowRight className="w-4 h-4" aria-hidden="true" />
    </button>
  );
}

function SlotsSkeleton() {
  return (
    <div className="space-y-5" data-testid="slots-skeleton">
      <span className="sr-only">Checking availability</span>
      {[4, 8].map((count, g) => (
        <div key={g} aria-hidden="true">
          <div className="h-3 w-20 rounded bg-gray-100 animate-pulse mb-2.5" />
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {Array.from({ length: count }).map((_, i) => (
              <div key={i} className="h-12 rounded-xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
