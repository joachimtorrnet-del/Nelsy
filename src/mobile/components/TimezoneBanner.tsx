import { useEffect, useState } from 'react';
import { Globe, X } from 'lucide-react';
import { deviceTimezone, timezoneCity } from '@/lib/timezone';
import { useProData } from '../hooks/useProData';
import { prefs } from '../lib/native';

const DISMISS_KEY = 'tz-banner-dismissed';

/**
 * Same rule as the website dashboard banner (src/components/dashboard/TimezoneBanner.tsx):
 * shown when the device timezone differs from profiles.timezone. Hours, same-day slots and
 * client reminders follow the profile timezone. Nothing changes without a tap.
 */
export function TimezoneBanner() {
  const { data, setTimezone } = useProData();
  const device = deviceTimezone();
  const saved = data?.timezone || 'Europe/Paris';
  const pair = `${saved}>${device}`;
  const [dismissed, setDismissed] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'saving' | 'error'>('idle');

  useEffect(() => {
    void prefs.get<string | null>(DISMISS_KEY, null).then(setDismissed);
  }, []);

  if (!data || !device || device === saved || dismissed === pair) return null;

  const dismiss = () => {
    setDismissed(pair);
    void prefs.set(DISMISS_KEY, pair);
  };

  const update = async () => {
    setStatus('saving');
    const ok = await setTimezone(device);
    setStatus(ok ? 'idle' : 'error');
  };

  return (
    <div className="mx-4 mb-3 rounded-2xl border border-amber-200 bg-amber-50 p-3.5">
      <div className="flex gap-2.5">
        <Globe size={18} className="mt-0.5 shrink-0 text-amber-600" aria-hidden />
        <p className="flex-1 text-[13px] leading-snug text-amber-900">
          Your page uses the <strong>{timezoneCity(saved)}</strong> time zone, but this phone is in <strong>{timezoneCity(device)}</strong>. Your hours, same-day
          slots and client reminders follow your page time zone.
        </p>
        <button type="button" onClick={dismiss} aria-label="Keep the current time zone" className="-mr-2 -mt-2 flex h-11 w-11 shrink-0 items-center justify-center text-amber-700">
          <X size={18} />
        </button>
      </div>
      {status === 'error' && <p className="mt-1 pl-7 text-[12.5px] text-[#B42318]">Could not update. Please try again.</p>}
      <button
        type="button"
        onClick={() => void update()}
        disabled={status === 'saving'}
        className="ml-7 mt-2 h-10 rounded-full bg-[#1A1A1A] px-4 text-[13px] font-bold text-white disabled:opacity-60"
      >
        {status === 'saving' ? 'Updating...' : `Use ${timezoneCity(device)}`}
      </button>
    </div>
  );
}
