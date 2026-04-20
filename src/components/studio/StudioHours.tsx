import { motion } from 'framer-motion';
import type { BusinessHour } from '@/lib/supabase-queries';

const DAYS = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

function formatTime(t: string): string {
  return t.slice(0, 5); // "09:00:00" → "09:00"
}

interface Props {
  hours: BusinessHour[];
  accentColor?: string;
}

export function StudioHours({ hours, accentColor = '#F52B8C' }: Props) {
  if (hours.length === 0) return null;

  const todayIndex = new Date().getDay();
  const sorted = [...hours].sort((a, b) => a.day_of_week - b.day_of_week);
  const todayHour = sorted.find((h) => h.day_of_week === todayIndex);
  const isOpenToday = todayHour && !todayHour.is_closed;

  return (
    <section className="mb-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-bold text-gray-900">Horaires</h2>
        {todayHour && (
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={
              isOpenToday
                ? { color: accentColor, background: `${accentColor}18` }
                : { color: '#6b7280', background: '#f3f4f6' }
            }
          >
            {isOpenToday
              ? `Ouvert · ${formatTime(todayHour.open_time!)}–${formatTime(todayHour.close_time!)}`
              : "Fermé aujourd'hui"}
          </span>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
      >
        {sorted.map((h, i) => {
          const isToday = h.day_of_week === todayIndex;
          return (
            <div
              key={h.id}
              className={`flex items-center justify-between px-4 py-3 ${
                i < sorted.length - 1 ? 'border-b border-gray-50' : ''
              } ${isToday ? 'bg-gray-50' : ''}`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm ${isToday ? 'font-bold text-gray-900' : 'text-gray-600'}`}
                >
                  {DAYS[h.day_of_week]}
                </span>
                {isToday && (
                  <span
                    className="text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full"
                    style={{ color: accentColor, background: `${accentColor}18` }}
                  >
                    Auj.
                  </span>
                )}
              </div>
              {h.is_closed ? (
                <span className="text-sm text-gray-400">Fermé</span>
              ) : (
                <span className={`text-sm ${isToday ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                  {h.open_time ? formatTime(h.open_time) : '?'} –{' '}
                  {h.close_time ? formatTime(h.close_time) : '?'}
                </span>
              )}
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
