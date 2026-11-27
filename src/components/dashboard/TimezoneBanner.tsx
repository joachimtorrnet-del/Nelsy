import { useState } from 'react';
import { Globe, X } from 'lucide-react';
import { deviceTimezone, saveProfileTimezone, timezoneCity } from '@/lib/timezone';

const DISMISS_KEY = 'nelsy_tz_banner_dismissed';

/**
 * Shown when the pro's saved timezone differs from her device's. Slots, reminders and calendar
 * times follow the saved timezone, so a wrong one shifts reminders and same-day availability.
 * Nothing changes without her click.
 */
export function TimezoneBanner({ userId, profileTimezone }: { userId: string; profileTimezone: string | null | undefined }) {
  const device = deviceTimezone();
  const saved = profileTimezone || 'Europe/Paris';
  const [hidden, setHidden] = useState(() => {
    try { return localStorage.getItem(DISMISS_KEY) === `${saved}>${device}`; } catch { return false; }
  });
  const [status, setStatus] = useState<'idle' | 'saving' | 'done' | 'error'>('idle');

  if (!device || device === saved || hidden) return null;

  const dismiss = () => {
    try { localStorage.setItem(DISMISS_KEY, `${saved}>${device}`); } catch { /* ignore */ }
    setHidden(true);
  };

  const update = async () => {
    setStatus('saving');
    const ok = await saveProfileTimezone(userId, device);
    setStatus(ok ? 'done' : 'error');
    if (ok) setTimeout(() => window.location.reload(), 900);
  };

  return (
    <div className="mx-4 mt-4 lg:mx-8 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-3">
      <Globe size={18} className="text-amber-600 shrink-0" aria-hidden />
      <p className="text-sm text-amber-900 flex-1">
        Your booking page uses the <strong>{timezoneCity(saved)}</strong> time zone, but this device is in{' '}
        <strong>{timezoneCity(device)}</strong>. Your hours, same-day slots and client reminders follow the time zone of your page.
        {status === 'error' && <span className="block text-red-600 mt-1">Could not update. Please try again.</span>}
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={update}
          disabled={status === 'saving' || status === 'done'}
          className="min-h-[44px] rounded-full bg-[#1A1A1A] px-4 text-sm font-semibold text-white disabled:opacity-60"
        >
          {status === 'done' ? 'Updated' : status === 'saving' ? 'Updating...' : `Use ${timezoneCity(device)}`}
        </button>
        <button type="button" onClick={dismiss} aria-label="Keep the current time zone" className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full text-amber-700 hover:bg-amber-100">
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
