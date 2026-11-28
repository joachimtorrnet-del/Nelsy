import { describe, it, expect } from 'vitest';
import {
  addDays, blockRect, dayBlocks, dayBounds, dayKeyInTz, dayOfWeek, defaultStartMinutes, findConflicts,
  formatDuration, formatHourLabel, formatMinutes, formatRange, gridBounds, gridHeight, gridSlots, groupByDay,
  knownClients, layoutColumns, matchClients, minuteToY, minutesInTz, monthLabel, nextFreeStart, parseTimeInput, paymentSummary,
  rangeDays, relativeDayLabel, safeTimezone, weekDays, workingWindow, zonedToUtc, SLOT_HEIGHT,
} from '../agenda';
import type { AgendaBooking, AvailabilityWindow, BookingStatus } from '../agenda';

const PARIS = 'Europe/Paris';
const NY = 'America/New_York';

function booking(id: string, startIso: string, minutes: number, status: BookingStatus = 'confirmed'): AgendaBooking {
  const start = new Date(startIso);
  return {
    id, start, end: new Date(start.getTime() + minutes * 60_000), durationMin: minutes,
    clientName: `Client ${id}`, clientEmail: '', clientPhone: '', serviceId: 's1', serviceName: 'Gel manicure',
    price: 50, paid: 0, status, online: false, videoUrl: null,
  };
}

const block = (id: string, startMin: number, endMin: number) => ({ booking: { id }, startMin, endMin });

describe('timezone day boundaries', () => {
  it('reads the calendar day and minutes in the pro timezone, not in UTC', () => {
    // 23:30 UTC on Nov 27 is 00:30 on Nov 28 in Paris and 18:30 on Nov 27 in New York.
    const t = new Date('2026-11-27T23:30:00Z');
    expect(dayKeyInTz(t, PARIS)).toBe('2026-11-28');
    expect(minutesInTz(t, PARIS)).toBe(30);
    expect(dayKeyInTz(t, NY)).toBe('2026-11-27');
    expect(minutesInTz(t, NY)).toBe(18 * 60 + 30);
  });

  it('converts a wall-clock time to the right instant', () => {
    expect(zonedToUtc('2026-11-28', 10 * 60 + 30, PARIS).toISOString()).toBe('2026-11-28T09:30:00.000Z');
    expect(zonedToUtc('2026-07-14', 10 * 60 + 30, PARIS).toISOString()).toBe('2026-07-14T08:30:00.000Z');
    expect(zonedToUtc('2026-11-28', 10 * 60 + 30, NY).toISOString()).toBe('2026-11-28T15:30:00.000Z');
  });

  it('round trips through the pro timezone', () => {
    for (const tz of [PARIS, NY, 'Asia/Tokyo', 'Australia/Sydney', 'UTC']) {
      const t = zonedToUtc('2026-03-12', 14 * 60 + 15, tz);
      expect(dayKeyInTz(t, tz)).toBe('2026-03-12');
      expect(minutesInTz(t, tz)).toBe(14 * 60 + 15);
    }
  });

  it('gives a 23 hour day in spring and a 25 hour day in autumn', () => {
    const spring = dayBounds('2026-03-29', PARIS);
    expect((spring.end.getTime() - spring.start.getTime()) / 3_600_000).toBe(23);
    const autumn = dayBounds('2026-10-25', PARIS);
    expect((autumn.end.getTime() - autumn.start.getTime()) / 3_600_000).toBe(25);
    expect(spring.start.toISOString()).toBe('2026-03-28T23:00:00.000Z');
  });

  it('keeps times after a daylight saving change on the right wall clock', () => {
    const t = zonedToUtc('2026-03-29', 10 * 60, PARIS);
    expect(t.toISOString()).toBe('2026-03-29T08:00:00.000Z');
    expect(minutesInTz(t, PARIS)).toBe(600);
  });

  it('falls back to the default timezone on a bad value', () => {
    expect(safeTimezone('Not/AZone')).toBe(PARIS);
    expect(safeTimezone(null)).toBe(PARIS);
    expect(safeTimezone(NY)).toBe(NY);
  });
});

describe('week ranges', () => {
  it('adds days across months and years', () => {
    expect(addDays('2026-11-30', 1)).toBe('2026-12-01');
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
    expect(addDays('2026-03-01', -1)).toBe('2026-02-28');
  });

  it('knows the day of week (0 = Sunday)', () => {
    expect(dayOfWeek('2026-11-28')).toBe(6);
    expect(dayOfWeek('2026-11-29')).toBe(0);
  });

  it('builds the week starting Monday', () => {
    const w = weekDays('2026-11-28', 1);
    expect(w).toHaveLength(7);
    expect(w[0]).toBe('2026-11-23');
    expect(w[6]).toBe('2026-11-29');
    expect(weekDays('2026-11-23', 1)[0]).toBe('2026-11-23');
    expect(weekDays('2026-11-29', 1)[0]).toBe('2026-11-23');
  });

  it('builds the week starting Sunday', () => {
    const w = weekDays('2026-11-28', 0);
    expect(w[0]).toBe('2026-11-22');
    expect(w[6]).toBe('2026-11-28');
    expect(weekDays('2026-11-29', 0)[0]).toBe('2026-11-29');
  });

  it('builds the 3 day range of the mobile week view', () => {
    expect(rangeDays('2026-11-30', 3)).toEqual(['2026-11-30', '2026-12-01', '2026-12-02']);
  });

  it('labels the month, including weeks across two months', () => {
    expect(monthLabel(weekDays('2026-11-18', 1))).toBe('November 2026');
    expect(monthLabel(weekDays('2026-12-01', 1))).toBe('Nov / Dec 2026');
    expect(monthLabel(weekDays('2026-12-31', 1))).toBe('Dec 2026 / Jan 2027');
  });

  it('labels days relative to today', () => {
    expect(relativeDayLabel('2026-11-28', '2026-11-28')).toBe('Today');
    expect(relativeDayLabel('2026-11-29', '2026-11-28')).toBe('Tomorrow');
    expect(relativeDayLabel('2026-11-27', '2026-11-28')).toBe('Yesterday');
    expect(relativeDayLabel('2026-12-02', '2026-11-28')).toBe('Wed, Dec 2');
  });
});

describe('grid bounds', () => {
  const windows: AvailabilityWindow[] = [
    { dayOfWeek: 2, startMin: 9 * 60, endMin: 18 * 60 },
    { dayOfWeek: 6, startMin: 10 * 60, endMin: 16 * 60 + 30 },
  ];

  it('pads the working hours by one hour', () => {
    expect(gridBounds(windows, ['2026-11-24'])).toEqual({ startMin: 8 * 60, endMin: 19 * 60 });
  });

  it('rounds to whole hours', () => {
    expect(gridBounds(windows, ['2026-11-28'])).toEqual({ startMin: 9 * 60, endMin: 18 * 60 });
  });

  it('widens to include a booking outside working hours', () => {
    const b = gridBounds(windows, ['2026-11-24'], [{ startMin: 6 * 60 + 30, endMin: 7 * 60 + 30 }, { startMin: 20 * 60, endMin: 21 * 60 + 15 }]);
    expect(b).toEqual({ startMin: 6 * 60, endMin: 22 * 60 });
  });

  it('covers every visible day of the week view', () => {
    expect(gridBounds(windows, ['2026-11-24', '2026-11-28'])).toEqual({ startMin: 8 * 60, endMin: 19 * 60 });
  });

  it('uses the widest window of her week on a day off, then 9 to 6', () => {
    expect(workingWindow(windows, '2026-11-29')).toBeNull();
    expect(gridBounds(windows, ['2026-11-29'])).toEqual({ startMin: 8 * 60, endMin: 19 * 60 });
    expect(gridBounds([], ['2026-11-29'])).toEqual({ startMin: 8 * 60, endMin: 19 * 60 });
  });

  it('never leaves the day', () => {
    const all: AvailabilityWindow[] = [{ dayOfWeek: 2, startMin: 0, endMin: 1440 }];
    expect(gridBounds(all, ['2026-11-24'])).toEqual({ startMin: 0, endMin: 1440 });
  });

  it('lists 30 minute rows and the grid height', () => {
    const b = { startMin: 8 * 60, endMin: 10 * 60 };
    expect(gridSlots(b)).toEqual([480, 510, 540, 570]);
    expect(gridHeight(b)).toBe(4 * SLOT_HEIGHT);
    expect(minuteToY(9 * 60 + 15, b)).toBe(2.5 * SLOT_HEIGHT);
  });
});

describe('block positioning', () => {
  const bounds = { startMin: 8 * 60, endMin: 19 * 60 };

  it('places a block by start time and sizes it by duration', () => {
    const r = blockRect({ startMin: 10 * 60, endMin: 11 * 60 + 30, column: 0, columns: 1 }, bounds);
    expect(r.top).toBe(4 * SLOT_HEIGHT);
    expect(r.height).toBe(3 * SLOT_HEIGHT);
    expect(r.leftPct).toBe(0);
    expect(r.widthPct).toBe(100);
  });

  it('gives a short booking the height of a 30 minute row', () => {
    const r = blockRect({ startMin: 10 * 60, endMin: 10 * 60 + 15, column: 0, columns: 1 }, bounds);
    expect(r.height).toBe(SLOT_HEIGHT);
  });

  it('splits the width between overlap columns', () => {
    const r = blockRect({ startMin: 10 * 60, endMin: 11 * 60, column: 1, columns: 2 }, bounds);
    expect(r.leftPct).toBe(50);
    expect(r.widthPct).toBe(50);
  });

  it('clips a block to the grid', () => {
    const r = blockRect({ startMin: 18 * 60 + 30, endMin: 20 * 60, column: 0, columns: 1 }, bounds);
    expect(r.top + r.height).toBe(gridHeight(bounds));
  });

  it('turns bookings into wall-clock blocks of the day in the pro timezone', () => {
    const bookings = [
      booking('a', '2026-11-28T09:30:00Z', 60), // 10:30 Paris
      booking('b', '2026-11-28T23:30:00Z', 60), // 00:30 Nov 29 Paris
      booking('c', '2026-11-27T22:30:00Z', 90), // 23:30 Nov 27 to 01:00 Nov 28 Paris
    ];
    const blocks = dayBlocks(bookings, '2026-11-28', PARIS);
    expect(blocks.map((b) => b.booking.id)).toEqual(['c', 'a']);
    expect(blocks[0]).toMatchObject({ startMin: 0, endMin: 60 });
    expect(blocks[1]).toMatchObject({ startMin: 630, endMin: 690 });
    // The same instants fall on other days for a pro in New York.
    expect(dayBlocks(bookings, '2026-11-28', NY).map((b) => b.booking.id)).toEqual(['a', 'b']);
    expect(dayBlocks(bookings, '2026-11-28', NY)[0]).toMatchObject({ startMin: 4 * 60 + 30 });
  });

  it('clips a booking that runs past midnight', () => {
    const blocks = dayBlocks([booking('c', '2026-11-27T22:30:00Z', 90)], '2026-11-27', PARIS);
    expect(blocks[0]).toMatchObject({ startMin: 23 * 60 + 30, endMin: 1440 });
  });
});

describe('overlap columns', () => {
  const cols = (blocks: ReturnType<typeof block>[]) =>
    Object.fromEntries(layoutColumns(blocks).map((b) => [b.booking.id, `${b.column}/${b.columns}`]));

  it('keeps separate blocks full width', () => {
    expect(cols([block('a', 600, 660), block('b', 720, 780)])).toEqual({ a: '0/1', b: '0/1' });
  });

  it('does not treat back to back blocks as overlapping', () => {
    expect(cols([block('a', 600, 660), block('b', 660, 720)])).toEqual({ a: '0/1', b: '0/1' });
  });

  it('puts two overlapping blocks side by side', () => {
    expect(cols([block('a', 600, 690), block('b', 630, 720)])).toEqual({ a: '0/2', b: '1/2' });
  });

  it('reuses a freed column inside a chain', () => {
    // a 10:00-11:30, b 10:30-11:00, c 11:00-12:00: c takes the column b freed.
    expect(cols([block('a', 600, 690), block('b', 630, 660), block('c', 660, 720)]))
      .toEqual({ a: '0/2', b: '1/2', c: '1/2' });
  });

  it('uses three columns for a triple overlap', () => {
    expect(cols([block('a', 600, 720), block('b', 610, 700), block('c', 620, 680)]))
      .toEqual({ a: '0/3', b: '1/3', c: '2/3' });
  });

  it('starts a new group after a gap', () => {
    expect(cols([block('a', 600, 690), block('b', 630, 720), block('c', 780, 840)]))
      .toEqual({ a: '0/2', b: '1/2', c: '0/1' });
  });

  it('does not depend on the input order', () => {
    expect(cols([block('b', 630, 720), block('a', 600, 690)])).toEqual({ a: '0/2', b: '1/2' });
  });

  it('handles an empty day', () => {
    expect(layoutColumns([])).toEqual([]);
  });
});

describe('conflicts', () => {
  const existing = [
    booking('a', '2026-11-28T09:00:00Z', 60),
    booking('x', '2026-11-28T11:00:00Z', 60, 'cancelled'),
    booking('n', '2026-11-28T13:00:00Z', 60, 'no_show'),
  ];
  const at = (iso: string, minutes: number) => [new Date(iso), new Date(new Date(iso).getTime() + minutes * 60_000)] as const;

  it('finds an overlapping booking', () => {
    const [s, e] = at('2026-11-28T09:30:00Z', 60);
    expect(findConflicts(existing, s, e).map((b) => b.id)).toEqual(['a']);
  });

  it('allows back to back bookings', () => {
    const [s, e] = at('2026-11-28T10:00:00Z', 60);
    expect(findConflicts(existing, s, e)).toEqual([]);
  });

  it('ignores cancelled and no-show bookings, like the database constraint', () => {
    expect(findConflicts(existing, ...at('2026-11-28T11:00:00Z', 60))).toEqual([]);
    expect(findConflicts(existing, ...at('2026-11-28T13:00:00Z', 60))).toEqual([]);
  });

  it('ignores the booking being rescheduled', () => {
    expect(findConflicts(existing, ...at('2026-11-28T09:30:00Z', 60), 'a')).toEqual([]);
  });
});

describe('labels and money', () => {
  it('formats times in 24h and 12h', () => {
    expect(formatMinutes(630)).toBe('10:30');
    expect(formatMinutes(630, true)).toBe('10:30 AM');
    expect(formatMinutes(0, true)).toBe('12:00 AM');
    expect(formatMinutes(12 * 60 + 5, true)).toBe('12:05 PM');
    expect(formatMinutes(15 * 60, true)).toBe('3:00 PM');
    expect(formatRange(630, 705)).toBe('10:30 to 11:45');
    expect(formatHourLabel(13 * 60, true)).toBe('1 PM');
    expect(formatHourLabel(9 * 60)).toBe('09:00');
  });

  it('formats durations', () => {
    expect(formatDuration(45)).toBe('45 min');
    expect(formatDuration(60)).toBe('1 h');
    expect(formatDuration(90)).toBe('1 h 30');
    expect(formatDuration(125)).toBe('2 h 05');
  });

  it('parses a time input', () => {
    expect(parseTimeInput('10:30')).toBe(630);
    expect(parseTimeInput('09:05:00')).toBe(545);
    expect(parseTimeInput('')).toBeNull();
    expect(parseTimeInput('25:00')).toBeNull();
  });

  it('summarises what is paid and what is left', () => {
    expect(paymentSummary({ price: 60, paid: 0 })).toMatchObject({ state: 'unpaid', remaining: 60, label: 'To pay at studio' });
    expect(paymentSummary({ price: 60, paid: 15 })).toMatchObject({ state: 'deposit', paid: 15, remaining: 45, label: 'Deposit paid' });
    expect(paymentSummary({ price: 60, paid: 60 })).toMatchObject({ state: 'paid', remaining: 0, label: 'Paid' });
    expect(paymentSummary({ price: 60, paid: 80 })).toMatchObject({ state: 'paid', paid: 60 });
    expect(paymentSummary({ price: 0, paid: 0 })).toMatchObject({ state: 'free' });
  });
});

describe('list and defaults', () => {
  it('groups bookings by day in the pro timezone', () => {
    const bookings = [
      booking('a', '2026-11-28T09:30:00Z', 60),
      booking('b', '2026-11-28T22:30:00Z', 60),
      booking('c', '2026-11-28T23:30:00Z', 60),
    ];
    expect(groupByDay(bookings, PARIS).map((g) => [g.day, g.items.map((b) => b.id)]))
      .toEqual([['2026-11-28', ['a', 'b']], ['2026-11-29', ['c']]]);
    expect(groupByDay(bookings, NY).map((g) => g.day)).toEqual(['2026-11-28']);
  });

  it('proposes the next half hour today and the opening time on another day', () => {
    const windows: AvailabilityWindow[] = [{ dayOfWeek: 2, startMin: 9 * 60 + 30, endMin: 18 * 60 }];
    expect(defaultStartMinutes('2026-11-28', '2026-11-28', 10 * 60 + 10, windows)).toBe(10 * 60 + 30);
    expect(defaultStartMinutes('2026-11-28', '2026-11-28', 10 * 60 + 30, windows)).toBe(11 * 60);
    expect(defaultStartMinutes('2026-11-24', '2026-11-28', 10 * 60, windows)).toBe(9 * 60 + 30);
    expect(defaultStartMinutes('2026-11-25', '2026-11-28', 10 * 60, windows)).toBe(9 * 60);
  });

  it('skips busy blocks when proposing a time', () => {
    const busy = [{ startMin: 630, endMin: 720 }, { startMin: 780, endMin: 840 }];
    expect(nextFreeStart(600, 30, busy)).toBe(600);
    expect(nextFreeStart(630, 60, busy)).toBe(720);
    expect(nextFreeStart(630, 90, busy)).toBe(840);
    expect(nextFreeStart(600, 60, [])).toBe(600);
    expect(nextFreeStart(23 * 60, 120, [])).toBe(23 * 60);
  });

  it('lists known clients once, most recent first, and matches by name', () => {
    const a1 = { ...booking('1', '2026-11-01T09:00:00Z', 60), clientName: 'Emma Roy', clientEmail: 'emma@example.com' };
    const a2 = { ...booking('2', '2026-11-20T09:00:00Z', 60), clientName: 'Emma Roy', clientEmail: 'EMMA@example.com', clientPhone: '+33 6 00 00 00 01' };
    const b1 = { ...booking('3', '2026-11-10T09:00:00Z', 60), clientName: 'Lina Sow' };
    const clients = knownClients([a1, a2, b1]);
    expect(clients.map((c) => [c.name, c.visits])).toEqual([['Emma Roy', 2], ['Lina Sow', 1]]);
    expect(clients[0].phone).toBe('+33 6 00 00 00 01');
    expect(matchClients(clients, 'em').map((c) => c.name)).toEqual(['Emma Roy']);
    expect(matchClients(clients, '')).toEqual([]);
    expect(matchClients(clients, 'Emma Roy')).toEqual([]);
  });
});
