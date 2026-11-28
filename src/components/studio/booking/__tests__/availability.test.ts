import { describe, it, expect, vi, beforeEach } from 'vitest';

const getAvailableSlots = vi.fn();
vi.mock('@/lib/bookings', () => ({ getAvailableSlots: (...args: unknown[]) => getAvailableSlots(...args) }));

import {
  addDays,
  addMinutes,
  buildStripDays,
  findNextAvailable,
  groupSlots,
  invalidateAvailability,
  loadDaySlots,
  shortDayLabel,
  todayInTimezone,
} from '../availability';
import { bookingAccent } from '../accent';
import { getTheme } from '@/lib/themes';
import { buildIcs } from '@/lib/ics';

describe('calendar days', () => {
  it('reads today in the pro timezone, not the device one', () => {
    const lateEvening = new Date('2026-11-28T23:30:00Z');
    expect(todayInTimezone('Europe/Paris', lateEvening)).toBe('2026-11-29');
    expect(todayInTimezone('America/New_York', lateEvening)).toBe('2026-11-28');
  });

  it('adds days across month and year ends', () => {
    expect(addDays('2026-11-30', 1)).toBe('2026-12-01');
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(addDays('2028-02-28', 1)).toBe('2028-02-29');
  });

  it('builds a strip with today / tomorrow labels', () => {
    const days = buildStripDays('2026-11-28', 28);
    expect(days).toHaveLength(28);
    expect(days[0]).toMatchObject({ date: '2026-11-28', weekday: 'Sat', day: 28, month: 'Nov', relative: 'Today' });
    expect(days[1].relative).toBe('Tomorrow');
    expect(days[2].relative).toBeUndefined();
    expect(days[3]).toMatchObject({ date: '2026-12-01', weekday: 'Tue', monthLong: 'December' });
    expect(days[27].date).toBe('2026-12-25');
  });

  it('formats the next-available label', () => {
    expect(shortDayLabel('2026-12-01', '2026-11-28')).toBe('Tue 1 Dec');
    expect(shortDayLabel('2026-11-29', '2026-11-28')).toBe('Tomorrow');
  });
});

describe('slots', () => {
  it('groups by part of the day and drops empty groups', () => {
    const groups = groupSlots(['17:00', '09:00', '12:00', '11:30', '16:30']);
    expect(groups.map((g) => [g.key, g.slots])).toEqual([
      ['morning', ['09:00', '11:30']],
      ['afternoon', ['12:00', '16:30']],
      ['evening', ['17:00']],
    ]);
    expect(groupSlots(['09:00']).map((g) => g.label)).toEqual(['Morning']);
    expect(groupSlots([])).toEqual([]);
  });

  it('computes the end time', () => {
    expect(addMinutes('10:30', 90)).toBe('12:00');
    expect(addMinutes('23:30', 60)).toBe('00:30');
  });

  it('finds the next day with an opening', () => {
    const dates = ['2026-11-28', '2026-11-29', '2026-11-30', '2026-12-01'];
    const known = { '2026-11-28': [], '2026-11-29': [], '2026-11-30': ['10:00'], '2026-12-01': ['09:00'] };
    expect(findNextAvailable(dates, known, null)).toBe('2026-11-30');
    expect(findNextAvailable(dates, known, '2026-11-30')).toBe('2026-12-01');
    expect(findNextAvailable(dates, known, '2026-12-01')).toBeNull();
    // A day still loading in between: not known yet, never a wrong answer
    expect(findNextAvailable(dates, { '2026-11-28': [], '2026-12-01': ['09:00'] }, null)).toBeUndefined();
    expect(findNextAvailable(dates, { '2026-11-28': [], '2026-11-29': [], '2026-11-30': [], '2026-12-01': [] }, null)).toBeNull();
  });
});

describe('per-day cache', () => {
  beforeEach(() => {
    getAvailableSlots.mockReset();
    invalidateAvailability();
  });

  it('calls the existing function once per day and reuses the answer', async () => {
    getAvailableSlots.mockResolvedValue(['10:00']);
    const [a, b] = await Promise.all([
      loadDaySlots('pro', 60, 'Europe/Paris', '2026-12-01'),
      loadDaySlots('pro', 60, 'Europe/Paris', '2026-12-01'),
    ]);
    expect(a).toEqual(['10:00']);
    expect(b).toEqual(['10:00']);
    await loadDaySlots('pro', 60, 'Europe/Paris', '2026-12-01');
    expect(getAvailableSlots).toHaveBeenCalledTimes(1);
    expect(getAvailableSlots).toHaveBeenCalledWith('pro', '2026-12-01', 60, 'Europe/Paris');
  });

  it('keeps durations and days apart, and refetches after invalidation', async () => {
    getAvailableSlots.mockResolvedValue([]);
    await loadDaySlots('pro', 60, 'Europe/Paris', '2026-12-01');
    await loadDaySlots('pro', 90, 'Europe/Paris', '2026-12-01');
    await loadDaySlots('pro', 60, 'Europe/Paris', '2026-12-02');
    expect(getAvailableSlots).toHaveBeenCalledTimes(3);
    invalidateAvailability('pro');
    await loadDaySlots('pro', 60, 'Europe/Paris', '2026-12-01');
    expect(getAvailableSlots).toHaveBeenCalledTimes(4);
  });

  it('never runs more than 4 requests at once', async () => {
    let running = 0;
    let peak = 0;
    getAvailableSlots.mockImplementation(async () => {
      running += 1;
      peak = Math.max(peak, running);
      await new Promise((r) => setTimeout(r, 5));
      running -= 1;
      return ['09:00'];
    });
    const dates = buildStripDays('2026-12-01', 14).map((d) => d.date);
    const results = await Promise.all(dates.map((d) => loadDaySlots('pro', 60, 'Europe/Paris', d)));
    expect(results).toHaveLength(14);
    expect(getAvailableSlots).toHaveBeenCalledTimes(14);
    expect(peak).toBeLessThanOrEqual(4);
    expect(peak).toBeGreaterThan(1);
  });
});

describe('dialog accent', () => {
  it('keeps a readable template accent', () => {
    const a = bookingAccent(getTheme('soft_pink', '#F52B8C'));
    expect(a.fill).toBe('#F52B8C');
    expect(a.onFill).toBe('#FFFFFF');
  });

  it('falls back to the dark page colour when the accent is too light for a white sheet', () => {
    const noir = bookingAccent(getTheme('c_noir'));
    expect(noir.fill).toBe('#0B0B0B');
    expect(noir.onFill).toBe('#FFFFFF');
    const midnight = bookingAccent(getTheme('c_midnight'));
    expect(midnight.fill).toBe('#15142B');
    expect(midnight.onFill).toBe('#2EF2C4');
    expect(midnight.ink).toBe('#15142B');
  });
});

describe('calendar file', () => {
  it('writes a UTC event with the service duration', () => {
    const ics = buildIcs({
      uid: 'b1', start: '2026-12-01T09:30:00.000Z', durationMinutes: 90,
      summary: 'Full Set Gel with Studio Maya', location: 'Paris 11e, France',
    }, new Date('2026-11-28T10:00:00.000Z'));
    expect(ics).toContain('UID:b1@getnelsy.com');
    expect(ics).toContain('DTSTART:20261201T093000Z');
    expect(ics).toContain('DTEND:20261201T110000Z');
    expect(ics).toContain('SUMMARY:Full Set Gel with Studio Maya');
    expect(ics).toContain('LOCATION:Paris 11e\\, France');
    expect(ics.split('\r\n')[0]).toBe('BEGIN:VCALENDAR');
  });
});
