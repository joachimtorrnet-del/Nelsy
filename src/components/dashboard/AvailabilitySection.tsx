import { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const DAYS = [
  { label: 'Monday', value: 1 },
  { label: 'Tuesday', value: 2 },
  { label: 'Wednesday', value: 3 },
  { label: 'Thursday', value: 4 },
  { label: 'Friday', value: 5 },
  { label: 'Saturday', value: 6 },
  { label: 'Sunday', value: 0 },
];

interface DayAvailability {
  active: boolean;
  start_time: string;
  end_time: string;
}

type WeekAvailability = Record<number, DayAvailability>;

const DEFAULT_DAY: DayAvailability = { active: false, start_time: '09:00', end_time: '19:00' };

export default function AvailabilitySection({ profileId }: { profileId: string }) {
  const [availability, setAvailability] = useState<WeekAvailability>(() =>
    Object.fromEntries(DAYS.map((d) => [d.value, { ...DEFAULT_DAY }]))
  );
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    void supabase
      .from('availabilities')
      .select('day_of_week, start_time, end_time, active')
      .eq('profile_id', profileId)
      .then(({ data }) => {
        if (!data) return;
        const map: WeekAvailability = Object.fromEntries(
          DAYS.map((d) => [d.value, { ...DEFAULT_DAY }])
        );
        for (const row of data) {
          map[row.day_of_week] = {
            active: row.active,
            start_time: row.start_time,
            end_time: row.end_time,
          };
        }
        setAvailability(map);
      });
  }, [profileId]);

  const update = (day: number, patch: Partial<DayAvailability>) => {
    setSaved(false);
    setAvailability((prev) => ({ ...prev, [day]: { ...prev[day], ...patch } }));
  };

  const handleSave = async () => {
    if (!supabase) return;
    setSaving(true);
    setError(null);
    try {
      const rows = DAYS.map((d) => ({
        profile_id: profileId,
        day_of_week: d.value,
        active: availability[d.value].active,
        start_time: availability[d.value].start_time,
        end_time: availability[d.value].end_time,
        break_duration_minutes: 0,
      }));

      const { error: upsertError } = await supabase
        .from('availabilities')
        .upsert(rows, { onConflict: 'profile_id,day_of_week' });

      if (upsertError) throw upsertError;
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const activeDaysCount = DAYS.filter((d) => availability[d.value].active).length;

  return (
    <div className="space-y-3">
      {DAYS.map((day) => {
        const avail = availability[day.value];
        return (
          <div key={day.value} className="flex items-center gap-3">
            <button
              onClick={() => update(day.value, { active: !avail.active })}
              className={`relative w-10 h-6 rounded-full transition-colors flex-shrink-0 ${
                avail.active ? 'bg-[#F52B8C]' : 'bg-gray-200'
              }`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
                avail.active ? 'left-4' : 'left-0.5'
              }`} />
            </button>

            <span className={`w-24 text-sm font-medium flex-shrink-0 ${avail.active ? 'text-gray-900' : 'text-gray-400'}`}>
              {day.label}
            </span>

            {avail.active ? (
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="time"
                  value={avail.start_time}
                  onChange={(e) => update(day.value, { start_time: e.target.value })}
                  className="flex-1 text-sm border border-gray-200 rounded-lg px-2 py-1.5 text-gray-900 focus:outline-none focus:border-[#F52B8C]"
                />
                <span className="text-gray-400 text-xs">→</span>
                <input
                  type="time"
                  value={avail.end_time}
                  onChange={(e) => update(day.value, { end_time: e.target.value })}
                  className="flex-1 text-sm border border-gray-200 rounded-lg px-2 py-1.5 text-gray-900 focus:outline-none focus:border-[#F52B8C]"
                />
              </div>
            ) : (
              <span className="text-xs text-gray-300 flex-1">Closed</span>
            )}
          </div>
        );
      })}

      {error && (
        <p className="text-xs text-red-500 px-1">{error}</p>
      )}

      {saved && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-green-700">Hours saved!</p>
            <p className="text-xs text-green-600">
              {activeDaysCount === 0
                ? 'No active days — clients won\'t see any slots.'
                : `Active ${activeDaysCount} day${activeDaysCount > 1 ? 's' : ''} per week.`}
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => void handleSave()}
        disabled={saving}
        className="w-full mt-1 py-2.5 rounded-xl bg-[#F52B8C] text-white text-sm font-bold disabled:opacity-60 transition hover:bg-[#E0167A]"
      >
        {saving ? 'Saving…' : 'Save Hours'}
      </button>
    </div>
  );
}
