// Pure helpers for the pro agenda (dashboard "Bookings" tab).
// No React, no Supabase: everything here is unit tested in __tests__/agenda.test.ts.
//
// Times: a booking is an instant (UTC ISO string). The agenda always renders it in the
// pro's timezone (profiles.timezone), never in the device timezone. A "day key" is a
// calendar date 'YYYY-MM-DD' in that timezone and "minutes" are wall-clock minutes since
// midnight on that day.

export type DayKey = string;

export type BookingStatus =
  | 'pending' | 'confirmed' | 'paid' | 'completed' | 'no_show' | 'cancelled' | 'refunded' | 'expired';

export interface AgendaBooking {
  id: string;
  start: Date;
  end: Date;
  durationMin: number;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  serviceId: string | null;
  serviceName: string;
  price: number;
  /** Amount already received (online deposit or payments recorded at the studio). */
  paid: number;
  status: BookingStatus;
  online: boolean;
  videoUrl: string | null;
  /** Private note of the pro on this appointment. Never shown to the client. */
  note?: string;
}

export interface AgendaService {
  id: string;
  name: string;
  durationMin: number;
  price: number;
  online: boolean;
  active: boolean;
}

export interface AvailabilityWindow {
  /** 0 = Sunday ... 6 = Saturday, same convention as the availabilities table. */
  dayOfWeek: number;
  startMin: number;
  endMin: number;
}

export interface ClosedDate {
  id: string;
  day: DayKey;
  reason: string | null;
}

export const DEFAULT_TIMEZONE = 'Europe/Paris';
export const SLOT_MINUTES = 30;
/** Height of one 30 minute row. 48px keeps every tap target above 44px. */
export const SLOT_HEIGHT = 48;

// ── Timezone ─────────────────────────────────────────────────────────────────

const partsFormatters = new Map<string, Intl.DateTimeFormat>();

function partsFormatter(tz: string): Intl.DateTimeFormat {
  let f = partsFormatters.get(tz);
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', {
      timeZone: tz, hourCycle: 'h23',
      year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit',
    });
    partsFormatters.set(tz, f);
  }
  return f;
}

/** A valid IANA zone, or the platform default. A bad stored value must not crash the agenda. */
export function safeTimezone(tz: string | null | undefined): string {
  if (!tz) return DEFAULT_TIMEZONE;
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: tz });
    return tz;
  } catch {
    return DEFAULT_TIMEZONE;
  }
}

interface ZonedParts { year: number; month: number; day: number; hour: number; minute: number; second: number }

export function zonedParts(date: Date, tz: string): ZonedParts {
  const out: Record<string, number> = {};
  for (const p of partsFormatter(tz).formatToParts(date)) {
    if (p.type !== 'literal') out[p.type] = Number(p.value);
  }
  return { year: out.year, month: out.month, day: out.day, hour: out.hour % 24, minute: out.minute, second: out.second };
}

const pad = (n: number) => String(n).padStart(2, '0');

export function toDayKey(year: number, month: number, day: number): DayKey {
  return `${year}-${pad(month)}-${pad(day)}`;
}

/** Calendar date of an instant in the pro's timezone. */
export function dayKeyInTz(date: Date, tz: string): DayKey {
  const p = zonedParts(date, tz);
  return toDayKey(p.year, p.month, p.day);
}

/** Wall-clock minutes since midnight of an instant in the pro's timezone. */
export function minutesInTz(date: Date, tz: string): number {
  const p = zonedParts(date, tz);
  return p.hour * 60 + p.minute;
}

function offsetMs(utcMs: number, tz: string): number {
  const p = zonedParts(new Date(utcMs), tz);
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
  return asUtc - Math.floor(utcMs / 1000) * 1000;
}

/**
 * The instant at which the wall clock of `tz` shows `minutes` past midnight on `day`.
 * Safe across daylight saving changes (a time skipped by the spring change lands one hour later).
 */
export function zonedToUtc(day: DayKey, minutes: number, tz: string): Date {
  const [y, m, d] = day.split('-').map(Number);
  const guess = Date.UTC(y, m - 1, d, 0, minutes);
  const first = guess - offsetMs(guess, tz);
  const second = guess - offsetMs(first, tz);
  return new Date(second);
}

/** [start, end) instants of a calendar day in the pro's timezone. */
export function dayBounds(day: DayKey, tz: string): { start: Date; end: Date } {
  return { start: zonedToUtc(day, 0, tz), end: zonedToUtc(addDays(day, 1), 0, tz) };
}

// ── Day keys ─────────────────────────────────────────────────────────────────

export function addDays(day: DayKey, n: number): DayKey {
  const [y, m, d] = day.split('-').map(Number);
  const t = new Date(Date.UTC(y, m - 1, d + n));
  return toDayKey(t.getUTCFullYear(), t.getUTCMonth() + 1, t.getUTCDate());
}

/** 0 = Sunday ... 6 = Saturday. */
export function dayOfWeek(day: DayKey): number {
  const [y, m, d] = day.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

/** The 7 days of the week containing `day`. weekStartsOn: 0 = Sunday, 1 = Monday. */
export function weekDays(day: DayKey, weekStartsOn = 1): DayKey[] {
  const back = (dayOfWeek(day) - weekStartsOn + 7) % 7;
  const first = addDays(day, -back);
  return Array.from({ length: 7 }, (_, i) => addDays(first, i));
}

/** `count` consecutive days starting at `day` (the mobile 3 day view). */
export function rangeDays(day: DayKey, count: number): DayKey[] {
  return Array.from({ length: count }, (_, i) => addDays(day, i));
}

/** A day key as a Date at noon UTC, for Intl formatting with timeZone 'UTC'. */
function keyDate(day: DayKey): Date {
  const [y, m, d] = day.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12));
}

export function formatDay(day: DayKey, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'UTC' }).format(keyDate(day));
}

/** "November 2026", or "Nov / Dec 2026" when the visible days span two months. */
export function monthLabel(days: DayKey[]): string {
  if (days.length === 0) return '';
  const first = days[0];
  const last = days[days.length - 1];
  if (first.slice(0, 7) === last.slice(0, 7)) return formatDay(first, { month: 'long', year: 'numeric' });
  const a = formatDay(first, { month: 'short' });
  const sameYear = first.slice(0, 4) === last.slice(0, 4);
  return sameYear
    ? `${a} / ${formatDay(last, { month: 'short', year: 'numeric' })}`
    : `${a} ${first.slice(0, 4)} / ${formatDay(last, { month: 'short', year: 'numeric' })}`;
}

/** "Today", "Tomorrow", "Yesterday" or "Sat, Nov 28". */
export function relativeDayLabel(day: DayKey, today: DayKey): string {
  if (day === today) return 'Today';
  if (day === addDays(today, 1)) return 'Tomorrow';
  if (day === addDays(today, -1)) return 'Yesterday';
  return formatDay(day, { weekday: 'short', month: 'short', day: 'numeric' });
}

// ── Time labels ──────────────────────────────────────────────────────────────

/** 630 → "10:30" (24h) or "10:30 AM" (12h). */
export function formatMinutes(minutes: number, hour12 = false): string {
  const m = ((Math.round(minutes) % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const mm = pad(m % 60);
  if (!hour12) return `${pad(h)}:${mm}`;
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${mm} ${h < 12 ? 'AM' : 'PM'}`;
}

/** Hour label of the time gutter: "10:00" or "10 AM". */
export function formatHourLabel(minutes: number, hour12 = false): string {
  const h = Math.floor((((minutes % 1440) + 1440) % 1440) / 60);
  if (!hour12) return `${pad(h)}:00`;
  return `${h % 12 === 0 ? 12 : h % 12} ${h < 12 ? 'AM' : 'PM'}`;
}

/** "10:30 to 11:45". */
export function formatRange(startMin: number, endMin: number, hour12 = false): string {
  return `${formatMinutes(startMin, hour12)} to ${formatMinutes(endMin, hour12)}`;
}

/** 90 → "1 h 30", 60 → "1 h", 45 → "45 min". */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${pad(m)}`;
}

/** "10:30" (value of an <input type="time">) → 630. Null when unreadable. */
export function parseTimeInput(value: string): number | null {
  const m = /^(\d{1,2}):(\d{2})/.exec(value.trim());
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return h * 60 + min;
}

export function toTimeInput(minutes: number): string {
  return formatMinutes(minutes, false);
}

// ── Working hours and grid ───────────────────────────────────────────────────

/** Working window of a calendar day from the weekly availabilities, or null on a day off. */
export function workingWindow(windows: AvailabilityWindow[], day: DayKey): { startMin: number; endMin: number } | null {
  const dow = dayOfWeek(day);
  const w = windows.find((x) => x.dayOfWeek === dow && x.endMin > x.startMin);
  return w ? { startMin: w.startMin, endMin: w.endMin } : null;
}

export interface GridBounds { startMin: number; endMin: number }

const FALLBACK_HOURS = { startMin: 9 * 60, endMin: 18 * 60 };

/**
 * Hours shown by the time grid: the working hours of the visible days padded by one hour on
 * each side, widened to include every visible booking, on whole hours, inside [00:00, 24:00].
 * With no working hours at all (a brand-new pro, or only days off) it uses the widest window
 * of her week, then 09:00 to 18:00.
 */
export function gridBounds(
  windows: AvailabilityWindow[],
  days: DayKey[],
  blocks: { startMin: number; endMin: number }[] = [],
): GridBounds {
  const visible = days.map((d) => workingWindow(windows, d)).filter((w): w is { startMin: number; endMin: number } => !!w);
  const anyDay = windows.filter((w) => w.endMin > w.startMin);
  const source = visible.length > 0 ? visible : anyDay.length > 0 ? anyDay : [FALLBACK_HOURS];
  let start = Math.min(...source.map((w) => w.startMin)) - 60;
  let end = Math.max(...source.map((w) => w.endMin)) + 60;
  for (const b of blocks) {
    start = Math.min(start, b.startMin);
    end = Math.max(end, b.endMin);
  }
  start = Math.max(0, Math.floor(start / 60) * 60);
  end = Math.min(1440, Math.ceil(end / 60) * 60);
  if (end - start < 120) end = Math.min(1440, start + 120);
  return { startMin: start, endMin: end };
}

/** Start minutes of every 30 minute row of the grid. */
export function gridSlots(bounds: GridBounds, step = SLOT_MINUTES): number[] {
  const out: number[] = [];
  for (let m = bounds.startMin; m < bounds.endMin; m += step) out.push(m);
  return out;
}

export function gridHeight(bounds: GridBounds, slotHeight = SLOT_HEIGHT, step = SLOT_MINUTES): number {
  return ((bounds.endMin - bounds.startMin) / step) * slotHeight;
}

/** Vertical offset in px of a wall-clock minute inside the grid. */
export function minuteToY(minute: number, bounds: GridBounds, slotHeight = SLOT_HEIGHT, step = SLOT_MINUTES): number {
  return ((minute - bounds.startMin) / step) * slotHeight;
}

// ── Blocks ───────────────────────────────────────────────────────────────────

export interface DayBlock<T = AgendaBooking> {
  booking: T;
  /** Clipped to the day: a booking that crosses midnight shows on both days. */
  startMin: number;
  endMin: number;
}

/** Statuses that occupy a slot on the grid. Cancelled, refunded and expired free it. */
export const GRID_STATUSES: ReadonlySet<BookingStatus> = new Set(['pending', 'confirmed', 'paid', 'completed', 'no_show']);
/** Statuses the database overlap constraint counts (everything but cancelled, no-show, expired). */
export const BLOCKING_STATUSES: ReadonlySet<BookingStatus> = new Set(['pending', 'confirmed', 'paid', 'completed', 'refunded']);

/** Bookings that touch `day` in the pro's timezone, as blocks in wall-clock minutes, by start. */
export function dayBlocks<T extends { start: Date; end: Date }>(bookings: T[], day: DayKey, tz: string): DayBlock<T>[] {
  const { start, end } = dayBounds(day, tz);
  const out: DayBlock<T>[] = [];
  for (const b of bookings) {
    if (b.end <= start || b.start >= end) continue;
    const startMin = b.start < start ? 0 : minutesInTz(b.start, tz);
    const endMin = b.end >= end ? 1440 : minutesInTz(b.end, tz);
    out.push({ booking: b, startMin, endMin: Math.max(endMin, startMin + 1) });
  }
  return out.sort((a, b) => a.startMin - b.startMin || b.endMin - a.endMin);
}

export interface PlacedBlock<T = AgendaBooking> extends DayBlock<T> {
  /** Column index inside its overlap group, from 0. */
  column: number;
  /** Number of columns of the group: the block is 1/columns wide. */
  columns: number;
}

/**
 * Side by side layout of overlapping blocks. Blocks that overlap (directly or through a
 * chain) form a group; inside a group each block takes the first free column, and every
 * block of the group gets the same width. Blocks that only touch (one ends when the next
 * starts) do not overlap.
 */
export function layoutColumns<T>(blocks: DayBlock<T>[]): PlacedBlock<T>[] {
  const sorted = [...blocks].sort((a, b) => a.startMin - b.startMin || b.endMin - a.endMin);
  const placed: PlacedBlock<T>[] = [];
  let group: PlacedBlock<T>[] = [];
  let columnEnds: number[] = [];
  let groupEnd = -Infinity;

  const closeGroup = () => {
    for (const b of group) b.columns = columnEnds.length;
    group = [];
    columnEnds = [];
  };

  for (const block of sorted) {
    if (group.length > 0 && block.startMin >= groupEnd) closeGroup();
    let column = columnEnds.findIndex((end) => end <= block.startMin);
    if (column === -1) {
      column = columnEnds.length;
      columnEnds.push(block.endMin);
    } else {
      columnEnds[column] = block.endMin;
    }
    const p: PlacedBlock<T> = { ...block, column, columns: 1 };
    group.push(p);
    placed.push(p);
    groupEnd = Math.max(groupEnd, block.endMin);
  }
  closeGroup();
  return placed;
}

export interface BlockRect { top: number; height: number; leftPct: number; widthPct: number }

/** Minimum block height: 30 minutes, so a 15 minute booking still fits a name and stays tappable. */
export const MIN_BLOCK_MINUTES = 30;

/** Pixel and percent box of a placed block inside the grid column. */
export function blockRect(
  block: { startMin: number; endMin: number; column: number; columns: number },
  bounds: GridBounds,
  slotHeight = SLOT_HEIGHT,
  step = SLOT_MINUTES,
): BlockRect {
  const start = Math.max(block.startMin, bounds.startMin);
  const end = Math.min(Math.max(block.endMin, block.startMin + MIN_BLOCK_MINUTES), bounds.endMin);
  const top = minuteToY(start, bounds, slotHeight, step);
  const height = Math.max(minuteToY(end, bounds, slotHeight, step) - top, slotHeight * (MIN_BLOCK_MINUTES / step) * 0.5);
  const widthPct = 100 / block.columns;
  return { top, height, leftPct: widthPct * block.column, widthPct };
}

// ── Conflicts ────────────────────────────────────────────────────────────────

/** Bookings that the database would refuse to overlap with [start, end). */
export function findConflicts<T extends { id: string; start: Date; end: Date; status: BookingStatus }>(
  bookings: T[], start: Date, end: Date, ignoreId?: string,
): T[] {
  return bookings.filter((b) =>
    b.id !== ignoreId && BLOCKING_STATUSES.has(b.status) && b.start < end && b.end > start);
}

// ── Status and money ─────────────────────────────────────────────────────────

export type StatusTone = 'accent' | 'amber' | 'gray' | 'orange' | 'muted';

export const STATUS_META: Record<BookingStatus, { label: string; tone: StatusTone }> = {
  pending:   { label: 'Pending',   tone: 'amber' },
  confirmed: { label: 'Confirmed', tone: 'accent' },
  paid:      { label: 'Confirmed', tone: 'accent' },
  completed: { label: 'Completed', tone: 'gray' },
  no_show:   { label: 'No-show',   tone: 'orange' },
  cancelled: { label: 'Cancelled', tone: 'muted' },
  refunded:  { label: 'Refunded',  tone: 'muted' },
  expired:   { label: 'Expired',   tone: 'muted' },
};

export type PaymentState = 'paid' | 'deposit' | 'unpaid' | 'free';

export interface PaymentSummary {
  state: PaymentState;
  paid: number;
  remaining: number;
  /** "Paid", "Deposit paid", "To pay at studio", "Free". */
  label: string;
}

export function paymentSummary(b: { price: number; paid: number }): PaymentSummary {
  const price = Math.max(0, b.price);
  const paid = Math.max(0, Math.min(b.paid, price));
  const remaining = Math.round((price - paid) * 100) / 100;
  if (price === 0) return { state: 'free', paid: 0, remaining: 0, label: 'Free' };
  if (remaining <= 0.005) return { state: 'paid', paid, remaining: 0, label: 'Paid' };
  if (paid > 0) return { state: 'deposit', paid, remaining, label: 'Deposit paid' };
  return { state: 'unpaid', paid: 0, remaining, label: 'To pay at studio' };
}

// ── List view ────────────────────────────────────────────────────────────────

export interface DayGroup<T> { day: DayKey; items: T[] }

/** Bookings grouped by calendar day in the pro's timezone, days and items in the given order. */
export function groupByDay<T extends { start: Date }>(bookings: T[], tz: string): DayGroup<T>[] {
  const groups: DayGroup<T>[] = [];
  const index = new Map<DayKey, DayGroup<T>>();
  for (const b of bookings) {
    const day = dayKeyInTz(b.start, tz);
    let g = index.get(day);
    if (!g) {
      g = { day, items: [] };
      index.set(day, g);
      groups.push(g);
    }
    g.items.push(b);
  }
  return groups;
}

// ── Add booking defaults ─────────────────────────────────────────────────────

/**
 * Time proposed by the "+" button: the next half hour when adding for today (never before she
 * opens), otherwise the opening time of that day (09:00 on a day without working hours).
 */
export function defaultStartMinutes(day: DayKey, today: DayKey, nowMin: number, windows: AvailabilityWindow[]): number {
  const w = workingWindow(windows, day);
  const opening = w?.startMin ?? FALLBACK_HOURS.startMin;
  if (day !== today) return opening;
  const next = Math.ceil((nowMin + 1) / SLOT_MINUTES) * SLOT_MINUTES;
  return Math.min(Math.max(next, opening), 23 * 60 + 30);
}

/**
 * First start at or after `fromMin` where `durationMin` fits between the day's busy blocks,
 * in 30 minute steps. Falls back to `fromMin` when the rest of the day is full.
 */
export function nextFreeStart(
  fromMin: number, durationMin: number, busy: { startMin: number; endMin: number }[], step = SLOT_MINUTES,
): number {
  for (let m = fromMin; m + durationMin <= 1440; m += step) {
    if (!busy.some((b) => b.startMin < m + durationMin && b.endMin > m)) return m;
  }
  return fromMin;
}

// ── Clients ──────────────────────────────────────────────────────────────────

export interface KnownClient { key: string; name: string; email: string; phone: string; visits: number }

/** Same identity rule as the Customers tab: email, then phone digits, then name. */
export function clientKey(c: { clientName: string; clientEmail: string; clientPhone: string }): string {
  const email = c.clientEmail.trim().toLowerCase();
  if (email) return `e:${email}`;
  const phone = c.clientPhone.replace(/\D/g, '');
  if (phone) return `p:${phone}`;
  return `n:${c.clientName.trim().toLowerCase() || 'unknown'}`;
}

/** Clients she already had, most recent first, for the "pick a client" suggestions. */
export function knownClients(bookings: AgendaBooking[]): KnownClient[] {
  const map = new Map<string, KnownClient & { last: number }>();
  for (const b of bookings) {
    if (b.status === 'expired' || b.status === 'pending' || !b.clientName.trim()) continue;
    const key = clientKey(b);
    const existing = map.get(key);
    if (!existing) {
      map.set(key, { key, name: b.clientName.trim(), email: b.clientEmail.trim(), phone: b.clientPhone.trim(), visits: 1, last: b.start.getTime() });
    } else {
      existing.visits += 1;
      if (!existing.email && b.clientEmail.trim()) existing.email = b.clientEmail.trim();
      if (!existing.phone && b.clientPhone.trim()) existing.phone = b.clientPhone.trim();
      existing.last = Math.max(existing.last, b.start.getTime());
    }
  }
  return [...map.values()]
    .sort((a, b) => b.last - a.last)
    .map((c) => ({ key: c.key, name: c.name, email: c.email, phone: c.phone, visits: c.visits }));
}

export function matchClients(clients: KnownClient[], query: string, limit = 4): KnownClient[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return clients
    .filter((c) => c.name.toLowerCase().includes(q) && c.name.toLowerCase() !== q)
    .slice(0, limit);
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
}
