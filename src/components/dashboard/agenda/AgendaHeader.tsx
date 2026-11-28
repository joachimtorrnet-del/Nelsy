import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { formatDay } from '../../../lib/agenda';
import type { DayKey } from '../../../lib/agenda';
import { TIME_GRID_GUTTER } from './TimeGrid';

export type AgendaView = 'day' | 'week' | 'list';

const VIEWS: { id: AgendaView; label: string }[] = [
  { id: 'day', label: 'Day' },
  { id: 'week', label: 'Week' },
  { id: 'list', label: 'List' },
];

interface AgendaHeaderProps {
  label: string;
  week: DayKey[];
  selected: DayKey;
  today: DayKey;
  view: AgendaView;
  /** Days of the mobile 3 day view, shown as column titles under the strip. */
  columnDays?: DayKey[];
  /** Number of appointments per day, for the dots. */
  counts: Map<DayKey, number>;
  closed: Set<DayKey>;
  onSelect: (day: DayKey) => void;
  onShiftWeek: (direction: 1 | -1) => void;
  onToday: () => void;
  onView: (view: AgendaView) => void;
}

export default function AgendaHeader({
  label, week, selected, today, view, columnDays, counts, closed, onSelect, onShiftWeek, onToday, onView,
}: AgendaHeaderProps) {
  const [direction, setDirection] = useState<1 | -1>(1);
  const dragged = useRef(false);
  const shift = (d: 1 | -1) => {
    setDirection(d);
    onShiftWeek(d);
  };
  const onTodayView = selected === today;

  return (
    <div data-agenda-header className="sticky top-0 z-20 border-b border-gray-100 bg-white">
      {/* Month + Today + view switch */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-2 px-4 pb-2.5 pt-3 lg:gap-x-3 lg:gap-y-3 lg:px-8 lg:pb-1 lg:pt-5">
        <h2 className="min-w-0 flex-1 truncate text-[22px] font-bold leading-tight tracking-tight text-[#1A1A1A] lg:flex-none lg:text-2xl" aria-live="polite">
          {label}
        </h2>
        <div className="flex flex-shrink-0 items-center">
          <button type="button" onClick={() => shift(-1)} aria-label="Previous week"
            className="flex h-11 w-11 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A]">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => shift(1)} aria-label="Next week"
            className="flex h-11 w-11 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A]">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <button
          type="button"
          onClick={onToday}
          aria-label="Go to today"
          className={`h-11 flex-shrink-0 rounded-full border px-3.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] active:scale-95 ${
            onTodayView ? 'border-gray-200 text-gray-400' : 'border-[#1A1A1A] text-[#1A1A1A] hover:bg-gray-50'
          }`}
        >
          Today
        </button>

        <div role="group" aria-label="Calendar view" className="order-last flex w-full rounded-2xl bg-gray-100 p-1 lg:order-none lg:ml-auto lg:w-auto">
          {VIEWS.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => onView(v.id)}
              aria-pressed={view === v.id}
              className={`h-11 flex-1 rounded-xl px-5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A1A1A] lg:h-10 lg:flex-none ${
                view === v.id ? 'bg-white text-[#1A1A1A] shadow-sm' : 'text-gray-500 hover:text-[#1A1A1A]'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Week strip: swipe to change week, tap a day to open it */}
        <div className="w-full overflow-hidden lg:-ml-8 lg:w-[calc(100%+2rem)]">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            <motion.div
              key={week[0]}
              custom={direction}
              initial={{ opacity: 0, x: direction * 48 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -48 }}
              transition={{ duration: 0.2 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragStart={() => { dragged.current = true; }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -56 || info.velocity.x < -500) shift(1);
                else if (info.offset.x > 56 || info.velocity.x > 500) shift(-1);
                setTimeout(() => { dragged.current = false; }, 0);
              }}
              className="flex touch-pan-y"
            >
              <div className={`hidden flex-shrink-0 lg:block ${TIME_GRID_GUTTER}`} aria-hidden="true" />
              <div className="grid flex-1 grid-cols-7" role="group" aria-label="Days of the week">
                {week.map((day) => {
                  const isSelected = day === selected;
                  const isToday = day === today;
                  const count = counts.get(day) ?? 0;
                  const isClosed = closed.has(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => { if (!dragged.current) onSelect(day); }}
                      aria-pressed={isSelected}
                      aria-current={isToday ? 'date' : undefined}
                      aria-label={`${formatDay(day, { weekday: 'long', month: 'long', day: 'numeric' })}${isToday ? ', today' : ''}, ${
                        isClosed ? 'day off' : count === 0 ? 'no bookings' : `${count} booking${count === 1 ? '' : 's'}`
                      }`}
                      className="group flex min-h-[60px] flex-col items-center justify-start gap-0.5 rounded-2xl pb-1 pt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#1A1A1A]"
                    >
                      <span className={`text-[11px] font-semibold uppercase tracking-wide ${isSelected ? 'text-[#1A1A1A]' : 'text-gray-400'}`}>
                        {formatDay(day, { weekday: 'short' })}
                      </span>
                      <span className={`flex h-9 w-9 items-center justify-center rounded-full text-[15px] font-semibold tabular-nums transition ${
                        isSelected ? 'bg-[#1A1A1A] text-white'
                          : isToday ? 'text-[#F52B8C] group-hover:bg-gray-100'
                          : isClosed ? 'text-gray-300 group-hover:bg-gray-100'
                          : 'text-[#1A1A1A] group-hover:bg-gray-100'
                      }`}>
                        {Number(day.slice(8))}
                      </span>
                      <span className={`h-1 w-1 rounded-full ${count > 0 ? 'bg-[#F52B8C]' : 'bg-transparent'}`} aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {columnDays && (
        <div className="flex pb-2 pr-4" aria-hidden="true">
          <div className={`flex-shrink-0 ${TIME_GRID_GUTTER}`} />
          <div className="grid flex-1" style={{ gridTemplateColumns: `repeat(${columnDays.length}, minmax(0, 1fr))` }}>
            {columnDays.map((day) => (
              <span key={day} className={`truncate px-1.5 text-[12px] font-semibold ${day === today ? 'text-[#F52B8C]' : 'text-gray-500'}`}>
                {formatDay(day, { weekday: 'short' })} {Number(day.slice(8))}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
