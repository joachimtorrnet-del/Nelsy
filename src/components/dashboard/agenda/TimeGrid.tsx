import { useEffect, useMemo, useRef } from 'react';
import { Video } from 'lucide-react';
import {
  blockRect, dayBlocks, formatDay, formatHourLabel, formatMinutes, formatRange, gridHeight, gridSlots, layoutColumns,
  minuteToY, workingWindow, GRID_STATUSES, SLOT_HEIGHT, STATUS_META,
} from '../../../lib/agenda';
import type { AgendaBooking, AvailabilityWindow, ClosedDate, DayKey, GridBounds } from '../../../lib/agenda';
import { TONE } from './tones';

interface TimeGridProps {
  days: DayKey[];
  bounds: GridBounds;
  bookings: AgendaBooking[];
  availability: AvailabilityWindow[];
  closedDates: ClosedDate[];
  timezone: string;
  today: DayKey;
  nowMin: number;
  hour12: boolean;
  /** Bumped by the parent to bring the current time (or the first booking) into view. */
  focusKey: string;
  /** False keeps the page at the top (a brand-new pro must see the welcome line first). */
  autoFocus?: boolean;
  onSlot: (day: DayKey, minutes: number) => void;
  onBooking: (booking: AgendaBooking) => void;
}

const GUTTER = 'w-12 sm:w-14';

/** Diagonal hatch for hours outside her working day, light enough to stay in the background. */
const OFF_HOURS = {
  backgroundColor: '#FAFAFA',
  backgroundImage: 'repeating-linear-gradient(135deg, transparent 0, transparent 7px, #F0F0F0 7px, #F0F0F0 8px)',
};

/**
 * Vertical time grid: one column per day, 30 minute rows that open the add sheet, and
 * appointment blocks placed by time. One column is the Day view, 3 or 7 the Week view.
 */
export default function TimeGrid({
  days, bounds, bookings, availability, closedDates, timezone, today, nowMin, hour12, focusKey, autoFocus = true, onSlot, onBooking,
}: TimeGridProps) {
  const compact = days.length > 1;
  const height = gridHeight(bounds);
  const slots = useMemo(() => gridSlots(bounds), [bounds]);
  const hours = slots.filter((m) => m % 60 === 0);
  const visible = useMemo(() => bookings.filter((b) => GRID_STATUSES.has(b.status)), [bookings]);
  const closed = useMemo(() => new Set(closedDates.map((c) => c.day)), [closedDates]);
  const focusRef = useRef<HTMLDivElement>(null);

  const columns = useMemo(() => days.map((day) => ({
    day,
    blocks: layoutColumns(dayBlocks(visible, day, timezone)),
    window: closed.has(day) ? null : workingWindow(availability, day),
  })), [days, visible, timezone, availability, closed]);

  // Where to land: the current time when today is visible, else the first booking, else opening time.
  const focusMinute = useMemo(() => {
    if (days.includes(today) && nowMin >= bounds.startMin && nowMin <= bounds.endMin) return nowMin;
    const firstBlock = Math.min(...columns.flatMap((c) => c.blocks.map((b) => b.startMin)));
    if (Number.isFinite(firstBlock)) return firstBlock;
    const opening = Math.min(...columns.map((c) => c.window?.startMin ?? Infinity));
    return Number.isFinite(opening) ? opening : bounds.startMin;
    // Only recomputed when the parent asks for a new focus, not on every minute tick.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusKey, bounds.startMin, bounds.endMin]);

  // Scroll the page (not a nested box) so the focus minute sits in the upper third, below the sticky header.
  useEffect(() => {
    const el = focusRef.current;
    if (!el || !autoFocus) return;
    let parent: HTMLElement | null = el.parentElement;
    while (parent && !/(auto|scroll)/.test(getComputedStyle(parent).overflowY)) parent = parent.parentElement;
    if (!parent) return;
    const header = parent.querySelector<HTMLElement>('[data-agenda-header]');
    const headerHeight = header?.offsetHeight ?? 0;
    const y = el.getBoundingClientRect().top - parent.getBoundingClientRect().top + parent.scrollTop;
    const room = Math.max(0, parent.clientHeight - headerHeight);
    parent.scrollTop = Math.max(0, y - headerHeight - room * 0.3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusKey, focusMinute]);

  const showNow = days.includes(today) && nowMin >= bounds.startMin && nowMin <= bounds.endMin;
  const nowY = minuteToY(nowMin, bounds);

  return (
    <div className="relative flex pt-3 pb-4 pr-4 lg:pr-8" data-testid="time-grid">
      {/* Hour labels */}
      <div className={`relative flex-shrink-0 ${GUTTER}`} style={{ height }} aria-hidden="true">
        {hours.map((m) => (
          <span
            key={m}
            className="absolute right-2 -translate-y-1/2 whitespace-nowrap text-[11px] font-medium tabular-nums text-gray-400"
            style={{ top: minuteToY(m, bounds) }}
          >
            {formatHourLabel(m, hour12)}
          </span>
        ))}
        {showNow && (
          <span
            className="absolute right-1 -translate-y-1/2 rounded-md bg-[#F52B8C] px-1 py-0.5 text-[10px] font-bold tabular-nums leading-none text-white"
            style={{ top: nowY }}
          >
            {formatMinutes(nowMin, hour12).replace(/ (AM|PM)$/, '')}
          </span>
        )}
      </div>

      <div
        className="relative grid min-w-0 flex-1"
        style={{ gridTemplateColumns: `repeat(${days.length}, minmax(0, 1fr))`, height }}
      >
        <div ref={focusRef} className="pointer-events-none absolute left-0 h-px w-px" style={{ top: minuteToY(focusMinute, bounds) }} aria-hidden="true" />

        {columns.map(({ day, blocks, window }, index) => {
          const dayLabel = formatDay(day, { weekday: 'long', month: 'long', day: 'numeric' });
          return (
            <section
              key={day}
              aria-label={dayLabel}
              className={`relative border-l border-gray-200 ${index === days.length - 1 ? 'border-r' : ''}`}
            >
              {/* Hours she does not work */}
              {window ? (
                <>
                  {window.startMin > bounds.startMin && (
                    <div className="absolute inset-x-0 top-0" style={{ height: minuteToY(window.startMin, bounds), ...OFF_HOURS }} aria-hidden="true" />
                  )}
                  {window.endMin < bounds.endMin && (
                    <div className="absolute inset-x-0 bottom-0" style={{ top: minuteToY(window.endMin, bounds), ...OFF_HOURS }} aria-hidden="true" />
                  )}
                </>
              ) : (
                <div className="absolute inset-0" style={OFF_HOURS} aria-hidden="true" />
              )}

              {/* 30 minute rows: tap to add at that time */}
              {slots.map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => onSlot(day, m)}
                  aria-label={`Add a booking on ${dayLabel} at ${formatMinutes(m, hour12)}`}
                  className={`absolute inset-x-0 border-t transition-colors hover:bg-[#F52B8C]/5 focus-visible:z-10 focus-visible:bg-[#F52B8C]/10 focus-visible:outline-none active:bg-[#F52B8C]/10 ${
                    m % 60 === 0 ? 'border-gray-200' : 'border-gray-100'
                  }`}
                  style={{ top: minuteToY(m, bounds), height: SLOT_HEIGHT }}
                />
              ))}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 border-t border-gray-200" aria-hidden="true" />

              {/* Appointments */}
              {blocks.map((block) => {
                const rect = blockRect(block, bounds);
                const b = block.booking;
                const tone = TONE[STATUS_META[b.status].tone];
                const range = formatRange(block.startMin, block.endMin, hour12);
                const short = rect.height < SLOT_HEIGHT * 1.5;
                const narrow = compact || block.columns > 1;
                return (
                  <div
                    key={b.id}
                    className="absolute z-[5] p-px"
                    style={{ top: rect.top, height: rect.height, left: `${rect.leftPct}%`, width: `${rect.widthPct}%` }}
                  >
                    <button
                      type="button"
                      onClick={() => onBooking(b)}
                      aria-label={`${b.clientName}, ${b.serviceName}, ${range}, ${STATUS_META[b.status].label}${b.online ? ', video call' : ''}`}
                      className={`group relative flex h-full w-full overflow-hidden rounded-xl text-left transition active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] focus-visible:ring-offset-1 ${tone.block} ${
                        b.status === 'pending' ? 'outline-dashed outline-1 -outline-offset-1 outline-amber-300' : ''
                      }`}
                    >
                      <span className={`w-1 flex-shrink-0 ${tone.bar}`} aria-hidden="true" />
                      <span className={`flex min-w-0 flex-1 flex-col ${narrow ? 'px-1.5' : 'px-2.5'} ${short ? 'justify-center py-0.5' : 'py-1.5'}`}>
                        <span className="flex items-center gap-1.5">
                          {!(compact && block.columns > 1) && <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${tone.dot}`} aria-hidden="true" />}
                          <span className={`min-w-0 flex-1 truncate font-semibold leading-tight ${narrow ? 'text-[12px]' : 'text-[14px]'} ${b.status === 'no_show' ? 'line-through decoration-1' : ''}`}>
                            {b.clientName || 'Client'}
                          </span>
                          {b.online && <Video className="h-3.5 w-3.5 flex-shrink-0 text-[#C2186F]" aria-hidden="true" />}
                          {short && !narrow && (
                            <span className="flex-shrink-0 text-[11px] font-medium tabular-nums opacity-70">{formatMinutes(block.startMin, hour12)}</span>
                          )}
                        </span>
                        {!short && (
                          <>
                            <span className={`truncate leading-snug opacity-80 ${narrow ? 'text-[11px]' : 'text-[13px]'}`}>{b.serviceName}</span>
                            <span className={`truncate font-medium tabular-nums leading-snug opacity-60 ${narrow ? 'text-[10px]' : 'text-[12px]'}`}>
                              {narrow ? formatMinutes(block.startMin, hour12) : range}
                              {b.status === 'no_show' ? ' · No-show' : b.status === 'pending' ? ' · Pending' : ''}
                            </span>
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                );
              })}

              {/* Current time */}
              {showNow && day === today && (
                <div className="pointer-events-none absolute inset-x-0 z-[4] flex items-center" style={{ top: nowY }} aria-hidden="true">
                  <span className="-ml-1 h-2 w-2 -translate-y-1/2 rounded-full bg-[#F52B8C]" />
                  <span className="h-0.5 flex-1 -translate-y-1/2 bg-[#F52B8C]" />
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

export const TIME_GRID_GUTTER = GUTTER;
