import { describe, it, expect } from 'vitest';
import { calendarDaysBetween, trialBannerState } from '../trialBanner';

const DAY = 86_400_000;
// Local noon so calendar math is stable in any timezone
const start = new Date(2026, 10, 27, 10, 0, 0).getTime();
const end = start + 14 * DAY;
const iso = (ms: number) => new Date(ms).toISOString();
const details = (over: Partial<{ hasCard: boolean; status: string }> = {}) => ({
  status: 'trialing', trialStart: iso(start), trialEnd: iso(end), hasCard: false, ...over,
});
const at = (ms: number, over = {}) => trialBannerState({ subscriptionStatus: 'trialing', details: details(over), now: ms });

describe('trialBannerState', () => {
  it('signup day: soft, Day 1 of 14, 14 days left, dismissible', () => {
    expect(at(start + 3_600_000)).toEqual({ kind: 'soft', daysLeft: 14, day: 1, totalDays: 14, dismissible: true });
  });

  it('day 5 of 14', () => {
    const s = at(start + 4 * DAY);
    expect(s.kind).toBe('soft');
    expect(s.day).toBe(5);
    expect(s.daysLeft).toBe(10);
  });

  it('4 days left is still soft, 3 to 1 days left is urgent and not dismissible', () => {
    expect(at(end - 4 * DAY).kind).toBe('soft');
    for (const d of [3, 2, 1]) {
      const s = at(end - d * DAY);
      expect(s.kind).toBe('urgent');
      expect(s.daysLeft).toBe(d);
      expect(s.dismissible).toBe(false);
    }
  });

  it('trial end date is "ends today", not dismissible, day capped at 14', () => {
    const s = at(end - 3_600_000);
    expect(s).toMatchObject({ kind: 'last_day', daysLeft: 0, day: 14, dismissible: false });
  });

  it('card saved: calm state whatever the days left', () => {
    expect(at(end - DAY, { hasCard: true })).toMatchObject({ kind: 'card_saved', dismissible: true, daysLeft: 1 });
  });

  it('plan or trial ended: paused, never dismissible', () => {
    expect(trialBannerState({ subscriptionStatus: 'cancelled' })).toMatchObject({ kind: 'paused', dismissible: false });
    expect(trialBannerState({ subscriptionStatus: 'canceled' }).kind).toBe('paused');
  });

  it('nothing while loading, for paid or draft accounts, or a card-first trial still pending', () => {
    expect(trialBannerState({ subscriptionStatus: 'trialing', details: null }).kind).toBe('none');
    expect(trialBannerState({ subscriptionStatus: 'active', details: details({ status: 'active' }) }).kind).toBe('none');
    expect(trialBannerState({ subscriptionStatus: 'inactive' }).kind).toBe('none');
  });

  it('falls back to 14 days total without a trial start', () => {
    const s = trialBannerState({ subscriptionStatus: 'trialing', details: { status: 'trialing', trialEnd: iso(end), hasCard: false }, now: end - 5 * DAY });
    expect(s).toMatchObject({ kind: 'soft', daysLeft: 5, day: 10, totalDays: 14 });
  });
});

describe('calendarDaysBetween', () => {
  it('counts calendar days, not 24h blocks', () => {
    const lateEvening = new Date(2026, 10, 27, 23, 0).getTime();
    const earlyMorning = new Date(2026, 10, 28, 1, 0).getTime();
    expect(calendarDaysBetween(lateEvening, earlyMorning)).toBe(1);
    expect(calendarDaysBetween(earlyMorning, earlyMorning)).toBe(0);
  });
});
