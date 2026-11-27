// Every time in the app is shown in the pro's profile timezone (profiles.timezone), like the website.
export const DEFAULT_TZ = 'Europe/Paris';

function safeTz(tz: string | null | undefined): string {
  if (!tz) return DEFAULT_TZ;
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: tz });
    return tz;
  } catch {
    return DEFAULT_TZ;
  }
}

export const fmtTime = (iso: string, tz?: string) =>
  new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: safeTz(tz) });

export const fmtDay = (iso: string, tz?: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: safeTz(tz) });

export const fmtLongDay = (iso: string, tz?: string) =>
  new Date(iso).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: safeTz(tz) });

/** "2026-11-27": the calendar day of `d` in `tz`. */
export function dayKey(d: Date | string, tz?: string): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: safeTz(tz), year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(d));
}

/** Whole days between two day keys (b - a). */
function dayDiff(a: string, b: string): number {
  return Math.round((Date.parse(`${b}T00:00:00Z`) - Date.parse(`${a}T00:00:00Z`)) / 86_400_000);
}

/** "Today", "Tomorrow", "Yesterday" or "Friday, Dec 5", in the profile timezone. */
export function dayLabel(key: string, tz?: string): string {
  const diff = dayDiff(dayKey(new Date(), tz), key);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  if (diff === -1) return 'Yesterday';
  return new Date(`${key}T12:00:00Z`).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', timeZone: 'UTC' });
}

/** Index 0..27 of the day of `iso` inside the 28 days ending today (profile tz), or -1. */
export function last28Index(iso: string, tz?: string): number {
  const diff = dayDiff(dayKey(iso, tz), dayKey(new Date(), tz));
  return diff >= 0 && diff < 28 ? 27 - diff : -1;
}

/** Day key 27 days before today in `tz` (first bar of the 28-day chart). */
export function first28Label(tz?: string): string {
  const today = dayKey(new Date(), tz);
  const d = new Date(Date.parse(`${today}T12:00:00Z`) - 27 * 86_400_000);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}

export const fmtShortDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

/** "Dec 11": the date a trial started today would end. */
export function trialEndLabel(days: number) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
