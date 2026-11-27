// Which trial / plan banner the dashboard shows. Pure so it is unit-tested (src/lib/__tests__/trialBanner.test.ts).
import { TRIAL_DAYS } from '../../supabase/functions/_shared/trial.ts';

export type TrialBannerKind =
  | 'none'
  /** Trial, no card, 4 or more days left: soft pink, dismissible for the session */
  | 'soft'
  /** Trial, no card, 1 to 3 days left: amber, always visible */
  | 'urgent'
  /** Trial, no card, ends today: strongest, always visible */
  | 'last_day'
  /** Trial with a card saved: calm reminder of when the plan starts, dismissible */
  | 'card_saved'
  /** Plan or trial ended: page paused, always visible */
  | 'paused';

export interface TrialBannerInput {
  subscriptionStatus?: string | null;
  /** From trial-card status (null while loading or on error) */
  details?: { status: string; trialStart?: string | null; trialEnd: string | null; hasCard: boolean } | null;
  /** Fallback when details have no trial end */
  profileTrialEnd?: string | null;
  now?: number;
}

export interface TrialBannerState {
  kind: TrialBannerKind;
  daysLeft: number | null;
  /** 1-based day of the trial, e.g. 5 for "Day 5 of 14" */
  day: number | null;
  totalDays: number;
  dismissible: boolean;
}

const NONE: TrialBannerState = { kind: 'none', daysLeft: null, day: null, totalDays: TRIAL_DAYS, dismissible: true };

/** Calendar days from `from` to `to` in local time (0 when `to` is today). */
export function calendarDaysBetween(from: number, to: number): number {
  const a = new Date(from); a.setHours(0, 0, 0, 0);
  const b = new Date(to); b.setHours(0, 0, 0, 0);
  return Math.round((b.getTime() - a.getTime()) / 86_400_000);
}

export function trialBannerState({ subscriptionStatus, details, profileTrialEnd, now = Date.now() }: TrialBannerInput): TrialBannerState {
  if (subscriptionStatus === 'cancelled' || subscriptionStatus === 'canceled') {
    return { ...NONE, kind: 'paused', dismissible: false };
  }
  if (subscriptionStatus !== 'trialing' || !details || details.status !== 'trialing') return NONE;

  const end = details.trialEnd ?? profileTrialEnd ?? null;
  const endMs = end ? Date.parse(end) : NaN;
  const startMs = details.trialStart ? Date.parse(details.trialStart) : NaN;
  // Calendar days, so the last day reads "ends today" and day 1 is the signup day
  const daysLeft = Number.isNaN(endMs) ? null : Math.max(0, calendarDaysBetween(now, endMs));
  const totalDays = !Number.isNaN(startMs) && !Number.isNaN(endMs) ? Math.max(1, calendarDaysBetween(startMs, endMs)) : TRIAL_DAYS;
  const day = daysLeft === null ? null : Math.min(totalDays, Math.max(1, totalDays - daysLeft + 1));
  const base = { daysLeft, day, totalDays };

  if (details.hasCard) return { ...base, kind: 'card_saved', dismissible: true };
  if (daysLeft !== null && daysLeft <= 0) return { ...base, kind: 'last_day', dismissible: false };
  if (daysLeft !== null && daysLeft <= 3) return { ...base, kind: 'urgent', dismissible: false };
  return { ...base, kind: 'soft', dismissible: true };
}
