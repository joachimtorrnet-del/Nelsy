import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { describeDay, findNextAvailable, shortDayLabel } from './availability';
import type { SlotsByDate, StripDay } from './availability';

// Day chip width + gap, used to translate scroll position into a day index.
const CHIP_W = 56;
const CHIP_GAP = 6;
const STRIDE = CHIP_W + CHIP_GAP;

/** Times shown before the "Show more times" link. */
const FIRST_TIMES = 9;

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
  // Which day the client asked to see every time of (resets when the day changes)
  const [expandedDate, setExpandedDate] = useState<string | null>(null);

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
    if (!fullyVisible) el.scrollTo({ left: Math.max(0, left - CHIP_GAP * 4), behavior: 'smooth' });
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
  const selectedInfo = selectedDate ? describeDay(selectedDate, todayStr) : null;
  const isEmpty = !!selectedSlots && selectedSlots.length === 0;
  const allDates = days.map((d) => d.date);
  const nextAvailable = selectedDate && isEmpty ? findNextAvailable(allDates, slotsByDate, selectedDate) : undefined;
  const earlierAvailable = isEmpty && nextAvailable === null ? findNextAvailable(allDates, slotsByDate, null) : undefined;

  // One calm grid: the first few times, the rest behind a link. A chosen time is never hidden.
  const sorted = selectedSlots ? [...selectedSlots].sort() : [];
  const chosenIdx = selectedTime ? sorted.indexOf(selectedTime) : -1;
  const expanded = expandedDate === selectedDate || chosenIdx >= FIRST_TIMES || sorted.length <= FIRST_TIMES + 1;
  const visible = expanded ? sorted : sorted.slice(0, FIRST_TIMES);
  const morning = visible.filter((s) => s < '12:00');
  const later = visible.filter((s) => s >= '12:00');

  const timeChip = (slot: string) => {
    const selected = slot === selectedTime;
    return (
      <button
        key={slot}
        type="button"
        aria-pressed={selected}
        onClick={() => onSelectTime(slot)}
        className={`h-12 rounded-xl border text-[15px] font-medium tabular-nums transition-colors active:scale-[0.97] ${FOCUS_RING} ${
          selected ? 'border-transparent' : 'border-gray-200 bg-white text-gray-900 hover:border-gray-400'
        }`}
        style={selected ? { backgroundColor: 'var(--bk-fill)', color: 'var(--bk-on-fill)' } : undefined}
      >
        {slot}
      </button>
    );
  };

  return (
    <div>
      {/* ── Month label + paging arrows ─────────────────────────── */}
      <div className="flex items-center justify-between -mt-1">
        <p className="text-sm font-medium text-gray-500" aria-live="polite">
          {monthDay ? `${monthDay.monthLong} ${monthDay.year}` : ''}
        </p>
        <div className="flex items-center -mr-3">
          <button
            type="button"
            onClick={() => page(-1)}
            disabled={edges.start}
            aria-label="Earlier days"
            className={`w-11 h-11 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-900 disabled:text-gray-200 transition-colors ${FOCUS_RING}`}
          >
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => page(1)}
            disabled={edges.end}
            aria-label="Later days"
            className={`w-11 h-11 flex items-center justify-center rounded-full text-gray-500 hover:text-gray-900 disabled:text-gray-200 transition-colors ${FOCUS_RING}`}
          >
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
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
          const loading = i < requestedCount && slots === undefined;
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
              className={`snap-start flex-shrink-0 flex flex-col items-center justify-center gap-1.5 rounded-2xl transition-colors ${FOCUS_RING} ${
                selected ? '' : empty ? 'text-gray-300' : 'text-gray-900 hover:bg-gray-50'
              }`}
              style={{
                width: CHIP_W, height: 64,
                ...(selected ? { backgroundColor: 'var(--bk-fill)', color: 'var(--bk-on-fill)' } : {}),
              }}
            >
              <span className={`text-[11px] font-medium leading-none ${selected ? '' : empty ? '' : 'text-gray-500'}`}>
                {d.relative === 'Today' ? 'Today' : d.weekday}
              </span>
              <span className="text-lg font-semibold leading-none tabular-nums">{d.day}</span>
            </button>
          );
        })}
      </div>

      {timezoneNote && <p className="mt-4 text-[13px] text-gray-500">{timezoneNote}</p>}

      {/* ── Times ───────────────────────────────────────────────── */}
      <div className="mt-7" aria-live="polite" aria-busy={selectedSlots === undefined}>
        {selectedInfo && (
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            {selectedInfo.relative ? `${selectedInfo.relative}, ` : ''}{selectedInfo.weekdayLong} {selectedInfo.day} {selectedInfo.monthLong}
          </h3>
        )}

        {selectedSlots === undefined ? (
          <SlotsSkeleton />
        ) : isEmpty ? (
          <div className="py-8 text-center" data-testid="no-availability">
            <p className="font-semibold text-gray-900">No openings on this day</p>
            {nextAvailable === undefined && earlierAvailable === undefined ? (
              <p className="mt-1 text-sm text-gray-500">Looking for the next opening…</p>
            ) : nextAvailable ? (
              <NextButton date={nextAvailable} todayStr={todayStr} onClick={() => onSelectDay(nextAvailable, 'next_available')} />
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
          <>
            {morning.length > 0 && (
              <div role="group" aria-label="Morning" className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {morning.map(timeChip)}
              </div>
            )}
            {later.length > 0 && (
              <div role="group" aria-label="Afternoon and evening" className={`grid grid-cols-3 sm:grid-cols-4 gap-2 ${morning.length > 0 ? 'mt-5' : ''}`}>
                {later.map(timeChip)}
              </div>
            )}
            {!expanded && (
              <button
                type="button"
                onClick={() => setExpandedDate(selectedDate)}
                className={`mt-2 min-h-[44px] text-sm font-semibold underline underline-offset-4 decoration-gray-300 hover:decoration-current rounded ${FOCUS_RING}`}
                style={{ color: 'var(--bk-ink)' }}
              >
                Show more times
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function NextButton({ date, todayStr, onClick }: { date: string; todayStr: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`mt-4 inline-flex items-center gap-2 h-11 px-5 rounded-full border border-gray-200 text-sm font-semibold hover:border-gray-400 transition-colors ${FOCUS_RING}`}
      style={{ color: 'var(--bk-ink)' }}
    >
      Next available: {shortDayLabel(date, todayStr)}
      <ArrowRight className="w-4 h-4" aria-hidden="true" />
    </button>
  );
}

function SlotsSkeleton() {
  return (
    <div data-testid="slots-skeleton">
      <span className="sr-only">Checking availability</span>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-12 rounded-xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
