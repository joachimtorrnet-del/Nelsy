// Client-side helpers for the booking date + time step.
//
// Everything here sits on top of the existing getAvailableSlots() call: one
// request per calendar day, exactly as before. This module only adds a small
// per-day cache and a concurrency cap so the day strip can grey out days that
// have no openings. The availability rules themselves live server side.
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAvailableSlots } from '@/lib/bookings';

// ── Calendar days (pure) ──────────────────────────────────────────────────────

/** 'YYYY-MM-DD' of the current calendar day in an IANA timezone. */
export function todayInTimezone(timeZone: string, now: Date = new Date()): string {
  try {
    const p = Object.fromEntries(
      new Intl.DateTimeFormat('en-US', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' })
        .formatToParts(now)
        .map((x) => [x.type, x.value]),
    );
    return `${p.year}-${p.month}-${p.day}`;
  } catch {
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  }
}

/** Calendar-day arithmetic on 'YYYY-MM-DD' strings (no timezone involved). */
export function addDays(dateStr: string, n: number): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
}

export interface StripDay {
  date: string;        // 'YYYY-MM-DD'
  weekday: string;     // 'Tue'
  weekdayLong: string; // 'Tuesday'
  day: number;         // 1..31
  month: string;       // 'Dec'
  monthLong: string;   // 'December'
  year: number;
  /** 'Today' / 'Tomorrow' for the first two days of the strip. */
  relative?: 'Today' | 'Tomorrow';
}

function utcDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

const fmt = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', ...opts });
const WEEKDAY = fmt({ weekday: 'short' });
const WEEKDAY_LONG = fmt({ weekday: 'long' });
const MONTH = fmt({ month: 'short' });
const MONTH_LONG = fmt({ month: 'long' });

export function describeDay(dateStr: string, todayStr?: string): StripDay {
  const d = utcDate(dateStr);
  return {
    date: dateStr,
    weekday: WEEKDAY.format(d),
    weekdayLong: WEEKDAY_LONG.format(d),
    day: d.getUTCDate(),
    month: MONTH.format(d),
    monthLong: MONTH_LONG.format(d),
    year: d.getUTCFullYear(),
    relative: todayStr
      ? dateStr === todayStr ? 'Today' : dateStr === addDays(todayStr, 1) ? 'Tomorrow' : undefined
      : undefined,
  };
}

/** `count` consecutive days starting at `startStr` (the pro's "today"). */
export function buildStripDays(startStr: string, count: number): StripDay[] {
  return Array.from({ length: count }, (_, i) => describeDay(addDays(startStr, i), startStr));
}

/** "Tue 1 Dec", or "Today" / "Tomorrow" when it applies. */
export function shortDayLabel(dateStr: string, todayStr?: string): string {
  const d = describeDay(dateStr, todayStr);
  return d.relative ?? `${d.weekday} ${d.day} ${d.month}`;
}

// ── Slots (pure) ──────────────────────────────────────────────────────────────

export type DayPart = 'morning' | 'afternoon' | 'evening';

export interface SlotGroup {
  key: DayPart;
  label: string;
  slots: string[];
}

/** Splits 'HH:MM' slots into Morning (before 12:00), Afternoon (12:00 to 16:59) and Evening (17:00 on). */
export function groupSlots(slots: string[]): SlotGroup[] {
  const groups: SlotGroup[] = [
    { key: 'morning', label: 'Morning', slots: [] },
    { key: 'afternoon', label: 'Afternoon', slots: [] },
    { key: 'evening', label: 'Evening', slots: [] },
  ];
  for (const slot of [...slots].sort()) {
    const hour = Number(slot.slice(0, 2));
    groups[hour < 12 ? 0 : hour < 17 ? 1 : 2].slots.push(slot);
  }
  return groups.filter((g) => g.slots.length > 0);
}

/** 'HH:MM' + minutes, wrapping past midnight. */
export function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number);
  const total = (((h * 60 + m + minutes) % 1440) + 1440) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

export type SlotsByDate = Record<string, string[] | undefined>;

/**
 * First day after `after` with at least one slot.
 * - a date string: found
 * - undefined: not known yet (a day in between is still loading)
 * - null: every day of the list is loaded and none has an opening
 */
export function findNextAvailable(dates: string[], slotsByDate: SlotsByDate, after?: string | null): string | null | undefined {
  for (const date of dates) {
    if (after && date <= after) continue;
    const slots = slotsByDate[date];
    if (slots === undefined) return undefined;
    if (slots.length > 0) return date;
  }
  return null;
}

// ── Per-day cache with a concurrency cap ──────────────────────────────────────

const MAX_CONCURRENT = 4;
const CACHE_TTL_MS = 60_000;
const REVALIDATE_AFTER_MS = 15_000;

interface CacheEntry { slots: string[]; at: number }
const cache = new Map<string, CacheEntry>();
const inflight = new Map<string, Promise<string[]>>();
const waiting: Array<() => void> = [];
let running = 0;

function schedule<T>(task: () => Promise<T>, priority: boolean): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const run = () => {
      running += 1;
      task().then(resolve, reject).finally(() => {
        running -= 1;
        waiting.shift()?.();
      });
    };
    if (running < MAX_CONCURRENT) run();
    else if (priority) waiting.unshift(run);
    else waiting.push(run);
  });
}

const cacheKey = (profileId: string, duration: number, tz: string, date: string) => `${profileId}|${duration}|${tz}|${date}`;

export function peekDaySlots(profileId: string, duration: number, tz: string, date: string): string[] | undefined {
  const hit = cache.get(cacheKey(profileId, duration, tz, date));
  return hit && Date.now() - hit.at < CACHE_TTL_MS ? hit.slots : undefined;
}

/**
 * Slots of one day through getAvailableSlots, cached for a minute.
 * `maxAgeMs` asks for a fresher answer than the cache default (the day the client is looking at).
 */
export function loadDaySlots(
  profileId: string, duration: number, tz: string, date: string,
  opts: { maxAgeMs?: number; priority?: boolean } = {},
): Promise<string[]> {
  const key = cacheKey(profileId, duration, tz, date);
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < (opts.maxAgeMs ?? CACHE_TTL_MS)) return Promise.resolve(hit.slots);
  const pending = inflight.get(key);
  if (pending) return pending;
  const p = schedule(() => getAvailableSlots(profileId, date, duration, tz), !!opts.priority)
    .then((slots) => {
      cache.set(key, { slots, at: Date.now() });
      return slots;
    })
    .finally(() => { inflight.delete(key); });
  inflight.set(key, p);
  return p;
}

/** Drops cached days (after a booking, so the taken slot does not linger). */
export function invalidateAvailability(profileId?: string): void {
  if (!profileId) { cache.clear(); return; }
  for (const key of [...cache.keys()]) if (key.startsWith(`${profileId}|`)) cache.delete(key);
}

// ── Hook ──────────────────────────────────────────────────────────────────────

interface UseDayAvailability {
  /** undefined while a day is loading (or not requested yet). */
  slotsByDate: SlotsByDate;
  /** Re-reads one day from the server unless it was fetched in the last few seconds. */
  refreshDay: (date: string) => void;
}

export function useDayAvailability(
  profileId: string, duration: number, tz: string, dates: string[], enabled: boolean,
): UseDayAvailability {
  const scope = `${profileId}|${duration}|${tz}`;
  const [state, setState] = useState<{ scope: string; byDate: SlotsByDate }>({ scope, byDate: {} });
  const datesKey = dates.join(',');

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    const list = datesKey ? datesKey.split(',') : [];
    for (const date of list) {
      void loadDaySlots(profileId, duration, tz, date).then((slots) => {
        if (cancelled) return;
        setState((prev) => {
          const base = prev.scope === scope ? prev.byDate : {};
          if (base[date] === slots) return prev.scope === scope ? prev : { scope, byDate: base };
          return { scope, byDate: { ...base, [date]: slots } };
        });
      });
    }
    return () => { cancelled = true; };
  }, [enabled, profileId, duration, tz, datesKey, scope]);

  const refreshDay = useCallback((date: string) => {
    void loadDaySlots(profileId, duration, tz, date, { maxAgeMs: REVALIDATE_AFTER_MS, priority: true }).then((slots) => {
      setState((prev) => (prev.scope === scope ? { scope, byDate: { ...prev.byDate, [date]: slots } } : prev));
    });
  }, [profileId, duration, tz, scope]);

  const slotsByDate = useMemo(() => (state.scope === scope ? state.byDate : {}), [state, scope]);
  return { slotsByDate, refreshDay };
}
