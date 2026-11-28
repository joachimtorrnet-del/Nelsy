// First-run setup for new pros: service presets, default week, and where progress is stored.
//
// Progress lives in profiles.onboarding_answers (jsonb) under the `setup` key, so no schema
// change is needed. A localStorage mirror keeps the flow working if that write ever fails.
import { supabase } from './supabase';

// ── Services ─────────────────────────────────────────────────────────────────

export interface ServicePreset {
  key: string;
  name: string;
  duration: number;
}

/** Common nail services with a sensible default duration. Prices are always typed by the pro. */
export const SERVICE_PRESETS: ServicePreset[] = [
  { key: 'gel_manicure', name: 'Gel manicure', duration: 60 },
  { key: 'gel_x', name: 'Gel-X full set', duration: 120 },
  { key: 'acrylic', name: 'Acrylic full set', duration: 120 },
  { key: 'biab', name: 'Builder gel (BIAB)', duration: 75 },
  { key: 'infill', name: 'Infill', duration: 60 },
  { key: 'nail_art', name: 'Nail art add-on', duration: 15 },
  { key: 'pedicure', name: 'Pedicure', duration: 60 },
  { key: 'removal', name: 'Removal', duration: 30 },
];

export const DURATION_OPTIONS = [15, 30, 45, 60, 75, 90, 105, 120, 150, 180, 210, 240];

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h} h` : `${h} h ${m}`;
}

export interface ServiceDraft {
  key: string;
  name: string;
  duration: number;
  /** Raw text typed by the pro. Empty until she fills it. */
  price: string;
}

/** Accepts "45", "45.5" or "45,50". Returns null when it is not a price above zero. */
export function parsePrice(raw: string): number | null {
  const cleaned = raw.trim().replace(',', '.');
  if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) return null;
  const n = Number(cleaned);
  return n > 0 ? n : null;
}

/** Per-draft problems, keyed by draft key. Empty object = ready to save. */
export function validateDrafts(drafts: ServiceDraft[]): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const d of drafts) {
    if (!d.name.trim()) errors[d.key] = 'Give this service a name.';
    else if (d.price.trim() === '') errors[d.key] = 'Add your price.';
    else if (parsePrice(d.price) === null) errors[d.key] = 'Enter a price above 0.';
  }
  return errors;
}

/**
 * Row for the `services` table, same shape the offer editor saves. New services start as
 * "pay on arrival" so they can be booked before payments are connected.
 */
export function buildServiceRow(
  profileId: string,
  draft: { name: string; duration: number; price: number },
  displayOrder = 0,
): Record<string, unknown> {
  return {
    profile_id: profileId,
    name: draft.name.trim(),
    description: '',
    image_url: null,
    price_total: draft.price,
    deposit_amount: 0,
    payment_mode: 'on_arrival',
    on_arrival_methods: ['cash', 'card'],
    duration_minutes: draft.duration,
    category: 'Nails',
    active: true,
    is_featured: false,
    card_style: 'callout',
    card_subtitle: null,
    card_cta_text: null,
    display_order: displayOrder,
  };
}

// ── Opening hours ────────────────────────────────────────────────────────────

export interface DayHours {
  active: boolean;
  start: string;
  end: string;
}
/** Keyed by day_of_week (0 = Sunday ... 6 = Saturday), like the availabilities table. */
export type Week = Record<number, DayHours>;

/** Display order, Monday first. */
export const WEEK_DAYS: { value: number; label: string; short: string }[] = [
  { value: 1, label: 'Monday', short: 'Mon' },
  { value: 2, label: 'Tuesday', short: 'Tue' },
  { value: 3, label: 'Wednesday', short: 'Wed' },
  { value: 4, label: 'Thursday', short: 'Thu' },
  { value: 5, label: 'Friday', short: 'Fri' },
  { value: 6, label: 'Saturday', short: 'Sat' },
  { value: 0, label: 'Sunday', short: 'Sun' },
];

/** 06:00 to 23:00 in 30 minute steps. */
export const TIME_OPTIONS: string[] = (() => {
  const out: string[] = [];
  for (let h = 6; h <= 23; h++) {
    out.push(`${String(h).padStart(2, '0')}:00`);
    if (h < 23) out.push(`${String(h).padStart(2, '0')}:30`);
  }
  return out;
})();

/** Suggested week shown in setup: Tuesday to Saturday, 9:00 to 18:00. */
export function defaultWeek(): Week {
  const week: Week = {};
  for (const d of WEEK_DAYS) {
    week[d.value] = { active: d.value >= 2 && d.value <= 6, start: '09:00', end: '18:00' };
  }
  return week;
}

export interface AvailabilityRowLike {
  day_of_week: number;
  start_time: string;
  end_time: string;
  active: boolean | null;
}

const hhmm = (t: string) => t.slice(0, 5);

/**
 * True when the rows are exactly what the signup trigger creates for every new profile
 * (Monday to Saturday, 9:00 to 18:00) or when there are none: the pro has not chosen hours yet.
 */
export function isUntouchedDefaultHours(rows: AvailabilityRowLike[]): boolean {
  if (rows.length === 0) return true;
  if (rows.length !== 6) return false;
  const days = new Set(rows.map((r) => r.day_of_week));
  for (let d = 1; d <= 6; d++) if (!days.has(d)) return false;
  return rows.every((r) => r.active !== false && hhmm(r.start_time) === '09:00' && hhmm(r.end_time) === '18:00');
}

export function weekFromRows(rows: AvailabilityRowLike[]): Week {
  const week: Week = {};
  for (const d of WEEK_DAYS) week[d.value] = { active: false, start: '09:00', end: '18:00' };
  for (const r of rows) {
    if (r.day_of_week < 0 || r.day_of_week > 6) continue;
    week[r.day_of_week] = { active: r.active !== false, start: hhmm(r.start_time), end: hhmm(r.end_time) };
  }
  return week;
}

/** First problem found in the week, or null. */
export function validateWeek(week: Week): string | null {
  for (const d of WEEK_DAYS) {
    const day = week[d.value];
    if (day.active && day.end <= day.start) return `${d.label}: closing time must be after opening time.`;
  }
  return null;
}

/**
 * Rows for the availabilities upsert (conflict on profile_id, day_of_week). Closed days keep
 * valid times so the table's end > start check passes.
 */
export function buildAvailabilityRows(profileId: string, week: Week) {
  return WEEK_DAYS.map((d) => {
    const day = week[d.value];
    const valid = day.end > day.start;
    return {
      profile_id: profileId,
      day_of_week: d.value,
      active: day.active,
      start_time: valid ? day.start : '09:00',
      end_time: valid ? day.end : '18:00',
    };
  });
}

/** True when the device shows times as 9:00 AM (United States, Canada, Australia...). */
export function deviceUses12h(): boolean {
  try {
    return new Intl.DateTimeFormat(undefined, { hour: 'numeric' }).resolvedOptions().hour12 ?? false;
  } catch {
    return false;
  }
}

/** "09:00" stays "09:00" in 24h, becomes "9:00 AM" in 12h. Display only: stored values stay HH:MM. */
export function displayTime(hhmmValue: string, hour12 = false): string {
  if (!hour12) return hhmmValue;
  const [h, m] = hhmmValue.split(':').map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return hhmmValue;
  return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
}

/** "Tue to Sat, 09:00 to 18:00", or a per-group summary when days differ. */
export function summarizeWeek(week: Week, hour12 = false): string {
  const open = WEEK_DAYS.filter((d) => week[d.value].active);
  if (open.length === 0) return 'No open days';
  const groups: { from: string; to: string; hours: string }[] = [];
  let prevIndex = -2;
  for (const d of open) {
    const index = WEEK_DAYS.indexOf(d);
    const hours = `${displayTime(week[d.value].start, hour12)} to ${displayTime(week[d.value].end, hour12)}`;
    const last = groups[groups.length - 1];
    if (last && index === prevIndex + 1 && last.hours === hours) last.to = d.short;
    else groups.push({ from: d.short, to: d.short, hours });
    prevIndex = index;
  }
  return groups.map((g) => `${g.from === g.to ? g.from : `${g.from} to ${g.to}`}, ${g.hours}`).join(' · ');
}

// ── Progress ─────────────────────────────────────────────────────────────────

export interface SetupState {
  /** Set when she reaches the last screen (having filled or skipped each step). */
  completed_at?: string;
  /** Opening hours confirmed by her (setup or Settings), as opposed to the signup default. */
  hours_set_at?: string;
  link_copied_at?: string;
  checklist_dismissed_at?: string;
}

const SETUP_KEYS = ['completed_at', 'hours_set_at', 'link_copied_at', 'checklist_dismissed_at'] as const;
export const SETUP_CHANGED_EVENT = 'nelsy:setup-changed';
const storageKey = (profileId: string) => `nelsy_setup_${profileId}`;

function pick(source: unknown): SetupState {
  const out: SetupState = {};
  if (!source || typeof source !== 'object') return out;
  for (const k of SETUP_KEYS) {
    const v = (source as Record<string, unknown>)[k];
    if (typeof v === 'string' && v) out[k] = v;
  }
  return out;
}

function readLocal(profileId: string): SetupState {
  try {
    return pick(JSON.parse(localStorage.getItem(storageKey(profileId)) ?? 'null'));
  } catch {
    return {};
  }
}

/** Setup progress from the profile row, merged with this browser's mirror. */
export function readSetupState(profile: { id?: string | null; onboarding_answers?: unknown } | null | undefined): SetupState {
  const answers = profile?.onboarding_answers;
  const remote = pick(answers && typeof answers === 'object' ? (answers as Record<string, unknown>).setup : null);
  const local = profile?.id ? readLocal(profile.id) : {};
  return { ...local, ...remote };
}

/**
 * Merges `patch` into profiles.onboarding_answers.setup. Never throws: the local mirror is
 * written first, so a failed write (offline, column missing) does not block the pro.
 */
let writeQueue: Promise<void> = Promise.resolve();

export function saveSetupState(profileId: string, patch: SetupState): Promise<void> {
  // One write at a time: each one reads the latest JSON before merging its keys in
  writeQueue = writeQueue.then(() => writeSetupState(profileId, patch));
  return writeQueue;
}

async function writeSetupState(profileId: string, patch: SetupState): Promise<void> {
  if (!profileId) return;
  try {
    localStorage.setItem(storageKey(profileId), JSON.stringify({ ...readLocal(profileId), ...patch }));
  } catch { /* storage unavailable */ }
  try {
    window.dispatchEvent(new CustomEvent(SETUP_CHANGED_EVENT, { detail: patch }));
  } catch { /* no window */ }
  if (!supabase) return;
  try {
    const { data, error } = await supabase.from('profiles').select('onboarding_answers').eq('id', profileId).maybeSingle();
    if (error) throw error;
    const answers = (data as { onboarding_answers?: unknown } | null)?.onboarding_answers;
    const base = answers && typeof answers === 'object' && !Array.isArray(answers) ? (answers as Record<string, unknown>) : {};
    const next = { ...base, setup: { ...pick(base.setup), ...patch } };
    const { error: writeError } = await supabase.from('profiles').update({ onboarding_answers: next } as never).eq('id', profileId);
    if (writeError) throw writeError;
  } catch (err) {
    console.warn('[setup] progress saved on this device only:', err);
  }
}

/** Show the guided setup when the pro has no service and has not been through it yet. */
export function shouldShowSetup(input: { servicesCount: number; setup: SetupState; subscriptionStatus?: string | null }): boolean {
  if (input.servicesCount > 0 || input.setup.completed_at) return false;
  // Paused or cancelled accounts see the reactivation panel instead.
  return ['trial', 'trialing', 'active', 'inactive'].includes(input.subscriptionStatus ?? '');
}

// ── Getting started checklist (Home) ─────────────────────────────────────────

export type ChecklistItemId = 'services' | 'hours' | 'link' | 'payments';

export interface ChecklistInput {
  servicesCount: number;
  hoursRows: AvailabilityRowLike[];
  setup: SetupState;
  stripeReady: boolean;
}

export function checklistStatus(input: ChecklistInput): Record<ChecklistItemId, boolean> {
  const hasOpenDay = input.hoursRows.some((r) => r.active !== false);
  return {
    services: input.servicesCount > 0,
    hours: hasOpenDay && (!!input.setup.hours_set_at || !isUntouchedDefaultHours(input.hoursRows)),
    link: !!input.setup.link_copied_at,
    payments: input.stripeReady,
  };
}
