import { describe, it, expect } from 'vitest';
import {
  SERVICE_PRESETS, buildAvailabilityRows, buildServiceRow, checklistStatus, defaultWeek, formatDuration,
  isUntouchedDefaultHours, parsePrice, readSetupState, shouldShowSetup, summarizeWeek, validateDrafts,
  validateWeek, weekFromRows,
} from '../setup';

const triggerRows = [1, 2, 3, 4, 5, 6].map((d) => ({ day_of_week: d, start_time: '09:00:00', end_time: '18:00:00', active: true }));

describe('service presets', () => {
  it('carry a duration and never a price', () => {
    expect(SERVICE_PRESETS).toHaveLength(8);
    for (const p of SERVICE_PRESETS) {
      expect(p.duration).toBeGreaterThan(0);
      expect(Object.keys(p)).not.toContain('price');
    }
  });

  it('parsePrice accepts typed amounts only', () => {
    expect(parsePrice('45')).toBe(45);
    expect(parsePrice(' 45,50 ')).toBe(45.5);
    expect(parsePrice('')).toBeNull();
    expect(parsePrice('0')).toBeNull();
    expect(parsePrice('abc')).toBeNull();
    expect(parsePrice('4.555')).toBeNull();
  });

  it('validateDrafts flags missing prices and names', () => {
    const errors = validateDrafts([
      { key: 'a', name: 'Gel manicure', duration: 60, price: '' },
      { key: 'b', name: ' ', duration: 60, price: '30' },
      { key: 'c', name: 'Infill', duration: 60, price: '0' },
      { key: 'd', name: 'Removal', duration: 30, price: '15' },
    ]);
    expect(Object.keys(errors)).toEqual(['a', 'b', 'c']);
  });

  it('buildServiceRow matches the offer editor payload, pay on arrival', () => {
    const row = buildServiceRow('p1', { name: ' Gel manicure ', duration: 60, price: 45 }, 2);
    expect(row).toMatchObject({
      profile_id: 'p1', name: 'Gel manicure', price_total: 45, deposit_amount: 0, payment_mode: 'on_arrival',
      on_arrival_methods: ['cash', 'card'], duration_minutes: 60, category: 'Nails', active: true, display_order: 2,
    });
  });

  it('formatDuration', () => {
    expect(formatDuration(15)).toBe('15 min');
    expect(formatDuration(60)).toBe('1 h');
    expect(formatDuration(75)).toBe('1 h 15');
  });
});

describe('opening hours', () => {
  it('default week is Tuesday to Saturday, 9 to 18', () => {
    const week = defaultWeek();
    expect([0, 1, 2, 3, 4, 5, 6].filter((d) => week[d].active)).toEqual([2, 3, 4, 5, 6]);
    expect(week[2]).toEqual({ active: true, start: '09:00', end: '18:00' });
    expect(summarizeWeek(week)).toBe('Tue to Sat, 09:00 to 18:00');
  });

  it('detects the signup trigger default as untouched', () => {
    expect(isUntouchedDefaultHours([])).toBe(true);
    expect(isUntouchedDefaultHours(triggerRows)).toBe(true);
    expect(isUntouchedDefaultHours(triggerRows.map((r) => (r.day_of_week === 1 ? { ...r, active: false } : r)))).toBe(false);
    expect(isUntouchedDefaultHours([...triggerRows, { day_of_week: 0, start_time: '10:00', end_time: '14:00', active: true }])).toBe(false);
  });

  it('builds 7 upsert rows with valid times even for closed days', () => {
    const week = defaultWeek();
    week[0] = { active: false, start: '18:00', end: '09:00' };
    const rows = buildAvailabilityRows('p1', week);
    expect(rows).toHaveLength(7);
    expect(rows.every((r) => r.end_time > r.start_time)).toBe(true);
    expect(rows.find((r) => r.day_of_week === 1)?.active).toBe(false);
    expect(rows.find((r) => r.day_of_week === 6)).toMatchObject({ active: true, start_time: '09:00', end_time: '18:00' });
  });

  it('validateWeek rejects closing before opening on open days only', () => {
    const week = defaultWeek();
    expect(validateWeek(week)).toBeNull();
    week[3] = { active: true, start: '18:00', end: '09:00' };
    expect(validateWeek(week)).toContain('Wednesday');
  });

  it('summarizes split weeks', () => {
    const week = weekFromRows([
      { day_of_week: 1, start_time: '09:00:00', end_time: '18:00:00', active: true },
      { day_of_week: 2, start_time: '09:00:00', end_time: '18:00:00', active: true },
      { day_of_week: 6, start_time: '10:00:00', end_time: '14:00:00', active: true },
    ]);
    expect(summarizeWeek(week)).toBe('Mon to Tue, 09:00 to 18:00 · Sat, 10:00 to 14:00');
  });
});

describe('progress', () => {
  it('reads setup state from onboarding_answers.setup and ignores other keys', () => {
    const state = readSetupState({ onboarding_answers: { goal: 'x', setup: { completed_at: '2026-11-28T10:00:00Z', other: 1 } } });
    expect(state).toEqual({ completed_at: '2026-11-28T10:00:00Z' });
    expect(readSetupState({ onboarding_answers: null })).toEqual({});
    expect(readSetupState(null)).toEqual({});
  });

  it('shows setup only to a pro with no service who has not been through it', () => {
    expect(shouldShowSetup({ servicesCount: 0, setup: {}, subscriptionStatus: 'trialing' })).toBe(true);
    expect(shouldShowSetup({ servicesCount: 0, setup: {}, subscriptionStatus: 'inactive' })).toBe(true);
    expect(shouldShowSetup({ servicesCount: 2, setup: {}, subscriptionStatus: 'trialing' })).toBe(false);
    expect(shouldShowSetup({ servicesCount: 0, setup: { completed_at: 'x' }, subscriptionStatus: 'trialing' })).toBe(false);
    expect(shouldShowSetup({ servicesCount: 0, setup: {}, subscriptionStatus: 'cancelled' })).toBe(false);
  });

  it('checklist: default hours do not count until confirmed', () => {
    const base = { servicesCount: 0, hoursRows: triggerRows, setup: {}, stripeReady: false };
    expect(checklistStatus(base)).toEqual({ services: false, hours: false, link: false, payments: false });
    expect(checklistStatus({ ...base, servicesCount: 1, setup: { hours_set_at: 'x', link_copied_at: 'y' }, stripeReady: true }))
      .toEqual({ services: true, hours: true, link: true, payments: true });
    expect(checklistStatus({ ...base, hoursRows: triggerRows.slice(1) }).hours).toBe(true);
  });
});
