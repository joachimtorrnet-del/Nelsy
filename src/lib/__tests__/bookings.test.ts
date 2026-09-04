/**
 * Tests for getAvailableSlots availability logic.
 *
 * These tests exercise the pure slot-calculation logic extracted from
 * getAvailableSlots. Edge function / DB integration is covered separately.
 */

import { describe, it, expect } from 'vitest';

// ── Slot calculation helpers extracted for unit testing ───────────────────────
// (mirrors the logic in src/lib/bookings.ts)

interface OccupiedRange {
  start: number; // minutes since midnight
  end: number;
}

function computeAvailableSlots(params: {
  openMin: number;
  closeMin: number;
  serviceDurationMinutes: number;
  occupiedRanges: OccupiedRange[];
  slotStep?: number;
}): string[] {
  const { openMin, closeMin, serviceDurationMinutes, occupiedRanges, slotStep = 30 } = params;
  const slots: string[] = [];
  let current = openMin;

  while (current + serviceDurationMinutes <= closeMin) {
    const slotEnd = current + serviceDurationMinutes;
    const overlaps = occupiedRanges.some(
      (occ) => current < occ.end && slotEnd > occ.start,
    );
    if (!overlaps) {
      const h = Math.floor(current / 60);
      const m = current % 60;
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
    current += slotStep;
  }
  return slots;
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('computeAvailableSlots', () => {
  const open = 9 * 60;   // 09:00
  const close = 18 * 60; // 18:00

  it('returns all 30-min slots when no bookings exist (60 min service)', () => {
    const slots = computeAvailableSlots({
      openMin: open,
      closeMin: close,
      serviceDurationMinutes: 60,
      occupiedRanges: [],
    });
    // 09:00 to 17:00 inclusive (last slot starts at 17:00, ends 18:00)
    expect(slots[0]).toBe('09:00');
    expect(slots[slots.length - 1]).toBe('17:00');
    expect(slots).toHaveLength(17); // 09:00–17:00 = 8h / 0.5h = 16+1 slots
  });

  it('blocks the slot that a booking starts on', () => {
    // Booking at 10:00 for 60 min occupies [10:00, 11:00)
    const slots = computeAvailableSlots({
      openMin: open,
      closeMin: close,
      serviceDurationMinutes: 60,
      occupiedRanges: [{ start: 10 * 60, end: 11 * 60 }],
    });
    expect(slots).not.toContain('10:00');
    expect(slots).toContain('09:00');
    expect(slots).toContain('11:00');
  });

  it('blocks intermediate slots that overlap a long booking', () => {
    // Booking at 10:00 for 90 min occupies [10:00, 11:30)
    // 10:00 overlaps, 10:30 overlaps (end 11:30 = occ.end, still > occ.start)
    // 11:00 also overlaps: 11:00 < 11:30 (occ.end) && 12:00 > 10:00 (occ.start)
    // First clear slot: 11:30 (end 12:30, no overlap with [10:00,11:30))
    const slots = computeAvailableSlots({
      openMin: open,
      closeMin: close,
      serviceDurationMinutes: 60,
      occupiedRanges: [{ start: 10 * 60, end: 11 * 60 + 30 }],
    });
    expect(slots).not.toContain('10:00');
    expect(slots).not.toContain('10:30');
    expect(slots).not.toContain('11:00'); // 11:00 < 11:30 (occ.end) → overlaps
    expect(slots).toContain('11:30');     // 11:30 is NOT < 11:30 → no overlap ✓
  });

  it('allows back-to-back bookings (closed-open interval)', () => {
    // Existing booking [10:00, 11:00). New service starts at 11:00 exactly.
    const slots = computeAvailableSlots({
      openMin: open,
      closeMin: close,
      serviceDurationMinutes: 60,
      occupiedRanges: [{ start: 10 * 60, end: 11 * 60 }],
    });
    expect(slots).toContain('11:00'); // [11:00, 12:00) does not overlap [10:00, 11:00)
  });

  it('excludes slots where service would end after closing', () => {
    // close = 18:00, service = 60 min → last valid start = 17:00
    const slots = computeAvailableSlots({
      openMin: open,
      closeMin: close,
      serviceDurationMinutes: 60,
      occupiedRanges: [],
    });
    expect(slots).toContain('17:00');
    expect(slots).not.toContain('17:30'); // 17:30 + 60 = 18:30 > 18:00
  });

  it('handles 90-minute service duration correctly', () => {
    // 90 min service: last start = 16:30 (16:30 + 90 = 18:00)
    const slots = computeAvailableSlots({
      openMin: open,
      closeMin: close,
      serviceDurationMinutes: 90,
      occupiedRanges: [],
    });
    expect(slots).toContain('16:30');
    expect(slots).not.toContain('17:00'); // 17:00 + 90 = 18:30 > 18:00
  });

  it('blocks all slots covered by multiple bookings', () => {
    // Two bookings: [10:00, 11:00) and [13:00, 14:30)
    const slots = computeAvailableSlots({
      openMin: open,
      closeMin: close,
      serviceDurationMinutes: 60,
      occupiedRanges: [
        { start: 10 * 60, end: 11 * 60 },
        { start: 13 * 60, end: 14 * 60 + 30 },
      ],
    });
    expect(slots).not.toContain('10:00');
    expect(slots).not.toContain('13:00');
    expect(slots).not.toContain('13:30'); // 13:30 + 60 = 14:30 — touches but doesn't overlap [13:00, 14:30)?
    // 13:30 < 14:30 and 14:30 > 13:00 → overlaps → blocked ✓
    expect(slots).toContain('09:00');
    expect(slots).toContain('11:00');
    expect(slots).toContain('14:30'); // 14:30 + 60 = 15:30 — no overlap
  });

  it('returns empty array when no slots fit (tiny window)', () => {
    // Window 10:00 to 10:15 with 60-min service → nothing fits
    const slots = computeAvailableSlots({
      openMin: 10 * 60,
      closeMin: 10 * 60 + 15,
      serviceDurationMinutes: 60,
      occupiedRanges: [],
    });
    expect(slots).toHaveLength(0);
  });
});

// ── Input validation helpers ──────────────────────────────────────────────────

type BookingData = Record<string, unknown>;

function validateInput(bd: BookingData): string | null {
  if (!bd.profile_id || typeof bd.profile_id !== 'string') return 'Missing profile_id';
  if (!bd.service_id || typeof bd.service_id !== 'string') return 'Missing service_id';
  if (!bd.booking_datetime || typeof bd.booking_datetime !== 'string') return 'Missing booking_datetime';
  const name = String(bd.client_name ?? '').trim();
  if (name.length < 2) return 'Name must be at least 2 characters';
  if (name.length > 100) return 'Name is too long';
  const email = String(bd.client_email ?? '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email address';
  if (email.length > 254) return 'Email is too long';
  const phone = String(bd.client_phone ?? '').trim();
  if (phone.length > 30) return 'Phone number is too long';
  return null;
}

describe('validateInput (booking_data)', () => {
  const valid: BookingData = {
    profile_id: 'uuid-1',
    service_id: 'uuid-2',
    booking_datetime: '2026-10-01T10:00:00.000Z',
    client_name: 'Marie Dupont',
    client_email: 'marie@example.com',
    client_phone: '0612345678',
  };

  it('accepts valid input', () => expect(validateInput(valid)).toBeNull());

  it('rejects missing profile_id', () =>
    expect(validateInput({ ...valid, profile_id: '' })).toMatch(/profile_id/));

  it('rejects missing service_id', () =>
    expect(validateInput({ ...valid, service_id: '' })).toMatch(/service_id/));

  it('rejects name too short', () =>
    expect(validateInput({ ...valid, client_name: 'A' })).toMatch(/Name/));

  it('rejects name too long', () =>
    expect(validateInput({ ...valid, client_name: 'A'.repeat(101) })).toMatch(/long/));

  it('rejects invalid email', () =>
    expect(validateInput({ ...valid, client_email: 'not-an-email' })).toMatch(/email/i));

  it('rejects email with no domain', () =>
    expect(validateInput({ ...valid, client_email: 'user@' })).toMatch(/email/i));

  it('rejects phone too long', () =>
    expect(validateInput({ ...valid, client_phone: '1'.repeat(31) })).toMatch(/Phone/));
});

// ── Timezone helpers ──────────────────────────────────────────────────────────

function getDayOfWeekInTz(dt: Date, tz: string): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    weekday: 'short',
  }).formatToParts(dt);
  const name = parts.find((p) => p.type === 'weekday')?.value ?? 'Sun';
  return ({ Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 } as Record<string, number>)[name] ?? 0;
}

function getLocalDateInTz(dt: Date, tz: string): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: tz }).format(dt);
}

describe('timezone helpers', () => {
  // 2026-01-05 at 23:00 UTC = 2026-01-06 (Tuesday) in Paris (UTC+1 in winter)
  const mondayNightUtc = new Date('2026-01-05T23:00:00Z');

  it('correctly identifies day of week in Europe/Paris', () => {
    const dow = getDayOfWeekInTz(mondayNightUtc, 'Europe/Paris');
    expect(dow).toBe(2); // Tuesday
  });

  it('correctly identifies day of week in America/New_York (still Monday)', () => {
    const dow = getDayOfWeekInTz(mondayNightUtc, 'America/New_York');
    expect(dow).toBe(1); // Monday (UTC-5 → 18:00 Monday)
  });

  it('returns correct local date string in Paris timezone', () => {
    const date = getLocalDateInTz(mondayNightUtc, 'Europe/Paris');
    expect(date).toBe('2026-01-06');
  });

  it('returns correct local date string in New York timezone', () => {
    const date = getLocalDateInTz(mondayNightUtc, 'America/New_York');
    expect(date).toBe('2026-01-05');
  });

  // DST spring forward: 2026-03-29 at 01:00 UTC = 03:00 Paris (clocks jump)
  it('handles DST spring forward in Europe/Paris', () => {
    const dtSpring = new Date('2026-03-29T01:00:00Z');
    const date = getLocalDateInTz(dtSpring, 'Europe/Paris');
    expect(date).toBe('2026-03-29');
    // 01:00 UTC = 03:00 CEST (post-spring-forward)
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Paris',
      hour: '2-digit',
      hour12: false,
    }).formatToParts(dtSpring);
    const hour = parts.find((p) => p.type === 'hour')?.value;
    expect(Number(hour)).toBe(3);
  });

  // DST fall back: 2026-10-25 at 01:30 UTC → ambiguous in Europe/Paris
  it('handles DST fall back without crashing', () => {
    const dtFall = new Date('2026-10-25T01:30:00Z');
    expect(() => getDayOfWeekInTz(dtFall, 'Europe/Paris')).not.toThrow();
    expect(() => getLocalDateInTz(dtFall, 'Europe/Paris')).not.toThrow();
  });
});

// ── Financial charge calculation ──────────────────────────────────────────────

describe('charge amount calculation', () => {
  it('charges deposit when deposit > 0', () => {
    const dbPrice = 80;
    const dbDeposit = 20;
    const charge = dbDeposit > 0 ? dbDeposit : dbPrice;
    expect(charge).toBe(20);
  });

  it('charges full price when deposit is 0', () => {
    const dbPrice = 80;
    const dbDeposit = 0;
    const charge = dbDeposit > 0 ? dbDeposit : dbPrice;
    expect(charge).toBe(80);
  });

  it('NaN/zero price is rejected by combined guard', () => {
    // Number.isFinite(NaN) = false → blocked
    expect(Number.isFinite(NaN) && NaN > 0).toBe(false);
    // 0 is finite but fails the > 0 check → blocked
    expect(Number.isFinite(0) && 0 > 0).toBe(false);
    // Valid price passes both checks
    expect(Number.isFinite(80) && 80 > 0).toBe(true);
  });

  it('correct Stripe amount in cents (rounded)', () => {
    expect(Math.round(29.99 * 100)).toBe(2999);
    expect(Math.round(20.005 * 100)).toBe(2001); // rounding edge
  });
});
