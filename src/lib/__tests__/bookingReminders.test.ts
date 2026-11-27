/**
 * Tests for the 24h reminder window and selection logic used by the
 * send-booking-reminders edge function (supabase/functions/_shared/booking-reminders.ts).
 */
import { describe, it, expect } from 'vitest';
import {
  REMINDER_STATUSES,
  buildReminderEmail,
  clientRemindersEnabled,
  formatAppointment,
  policyNoteHtml,
  relativeDay,
  reminderSkipReason,
  reminderWindow,
  safeTimezone,
  videoUrlFor,
} from '../../../supabase/functions/_shared/booking-reminders.ts';
import type { ReminderCandidate } from '../../../supabase/functions/_shared/booking-reminders.ts';

const H = 3_600_000;
const NOW = new Date('2026-11-27T10:05:00Z');

function booking(hoursAhead: number, over: Partial<ReminderCandidate> = {}): ReminderCandidate {
  return {
    id: 'b1',
    status: 'paid',
    booking_datetime: new Date(NOW.getTime() + hoursAhead * H).toISOString(),
    created_at: new Date(NOW.getTime() - 3 * 24 * H).toISOString(),
    client_email: 'client@example.com',
    reminder_sent_at: null,
    ...over,
  };
}

describe('reminderWindow', () => {
  it('spans now+23h (inclusive) to now+25h (exclusive)', () => {
    expect(reminderWindow(NOW)).toEqual({
      start: '2026-11-28T09:05:00.000Z',
      end: '2026-11-28T11:05:00.000Z',
    });
  });
});

describe('reminderSkipReason', () => {
  it('sends for a confirmed or paid booking ~24h ahead', () => {
    expect(reminderSkipReason(booking(24), NOW, null)).toBeNull();
    expect(reminderSkipReason(booking(24, { status: 'confirmed' }), NOW, null)).toBeNull();
  });

  it('window edges: 23h included, 25h excluded', () => {
    expect(reminderSkipReason(booking(23), NOW, null)).toBeNull();
    expect(reminderSkipReason(booking(22.99), NOW, null)).toBe('outside_window');
    expect(reminderSkipReason(booking(24.99), NOW, null)).toBeNull();
    expect(reminderSkipReason(booking(25), NOW, null)).toBe('outside_window');
  });

  it('only statuses that mean the appointment will happen', () => {
    expect([...REMINDER_STATUSES]).toEqual(['confirmed', 'paid']);
    for (const status of ['pending', 'completed', 'no_show', 'cancelled', 'refunded', 'expired']) {
      expect(reminderSkipReason(booking(24, { status }), NOW, null)).toBe('status');
    }
  });

  it('never twice', () => {
    expect(reminderSkipReason(booking(24, { reminder_sent_at: NOW.toISOString() }), NOW, null)).toBe('already_sent');
  });

  it('skips bookings made in the last hour (they just got the confirmation)', () => {
    const b = booking(24, { created_at: new Date(NOW.getTime() - 30 * 60_000).toISOString() });
    expect(reminderSkipReason(b, NOW, null)).toBe('too_recent');
  });

  it('needs a usable client email', () => {
    expect(reminderSkipReason(booking(24, { client_email: null }), NOW, null)).toBe('no_email');
    expect(reminderSkipReason(booking(24, { client_email: 'nope' }), NOW, null)).toBe('no_email');
  });

  it('respects the pro toggle (client_reminders), on by default', () => {
    expect(reminderSkipReason(booking(24), NOW, { client_reminders: false })).toBe('pro_opted_out');
    expect(reminderSkipReason(booking(24), NOW, { client_reminders: true })).toBeNull();
    // The legacy pro-facing `reminders` key does not switch client reminders off.
    expect(reminderSkipReason(booking(24), NOW, { reminders: false, new_bookings: true })).toBeNull();
    expect(clientRemindersEnabled(null)).toBe(true);
    expect(clientRemindersEnabled('garbage')).toBe(true);
  });

  it('hourly runs: every booking is due in exactly two consecutive runs, so the guard sends once and the second run is a retry', () => {
    // Simulate runs at minute 5 of every hour for 3 days; bookings at every 15 minutes.
    const runs = Array.from({ length: 72 }, (_, i) => new Date(Date.UTC(2026, 10, 27, i, 5)));
    for (let m = 26 * 60; m < 48 * 60; m += 15) {
      const start = new Date(Date.UTC(2026, 10, 27, 0, m));
      const b: ReminderCandidate = {
        id: String(m), status: 'confirmed', booking_datetime: start.toISOString(),
        created_at: '2026-11-01T00:00:00Z', client_email: 'a@b.co', reminder_sent_at: null,
      };
      const due = runs.filter((r) => reminderSkipReason(b, r, null) === null);
      expect(due.length).toBe(2);
      // With the reminder_sent_at guard the first due run sends, the second skips.
      let sent = 0;
      for (const r of due) {
        if (reminderSkipReason(b, r, null) === null) { sent++; b.reminder_sent_at = r.toISOString(); }
      }
      expect(sent).toBe(1);
      // Sent between 23h and 25h before the appointment.
      const leadH = (start.getTime() - due[0].getTime()) / H;
      expect(leadH).toBeGreaterThanOrEqual(23);
      expect(leadH).toBeLessThan(25);
    }
  });
});

describe('formatting', () => {
  it('uses the studio timezone, falls back to Europe/Paris on missing/invalid zones', () => {
    expect(safeTimezone(null)).toBe('Europe/Paris');
    expect(safeTimezone('Not/AZone')).toBe('Europe/Paris');
    expect(safeTimezone('America/New_York')).toBe('America/New_York');
    const paris = formatAppointment('2026-11-28T09:30:00Z', 'Europe/Paris');
    expect(paris.date).toBe('Saturday, November 28, 2026');
    expect(paris.shortTime).toBe('10:30 AM');
    const ny = formatAppointment('2026-11-28T15:00:00Z', 'America/New_York');
    expect(ny.shortTime).toBe('10:00 AM');
    expect(ny.time).toContain('EST');
  });

  it('today / tomorrow by calendar day in the studio timezone', () => {
    const now = new Date('2026-11-27T23:05:00Z'); // 00:05 on the 28th in Paris
    expect(relativeDay(now, '2026-11-28T22:30:00Z', 'Europe/Paris')).toBe('today'); // 23:30 Paris, same day
    expect(relativeDay(NOW, '2026-11-28T10:00:00Z', 'Europe/Paris')).toBe('tomorrow');
  });
});

describe('content', () => {
  it('neutral policy wording when the pro has no written policy, escaped', () => {
    expect(policyNoteHtml('Maya <Nails>')).toContain('Need to change your appointment? Contact Maya &lt;Nails&gt; directly.');
    expect(policyNoteHtml('Maya', '  ')).toContain('Contact Maya directly');
    const withPolicy = policyNoteHtml('Maya', 'Deposit kept if you cancel <48h.');
    expect(withPolicy).toContain('Deposit kept if you cancel &lt;48h.');
    expect(withPolicy).not.toContain('Free cancellation');
  });

  it('video link only for a video service with an https url', () => {
    expect(videoUrlFor(null)).toBeNull();
    expect(videoUrlFor({ name: 'Gel-X' })).toBeNull();
    expect(videoUrlFor({ location_type: 'video', video_url: 'javascript:alert(1)' })).toBeNull();
    expect(videoUrlFor({ location_type: 'in_person', video_url: 'https://meet.example.com/x' })).toBeNull();
    expect(videoUrlFor({ location_type: 'video', video_url: 'https://meet.example.com/x' })).toBe('https://meet.example.com/x');
  });

  it('builds the email with studio, service, date/time, location, policy and studio link', () => {
    const { subject, html } = buildReminderEmail({
      bookingDatetime: '2026-11-28T09:30:00Z',
      clientName: 'Chloe Martin',
      serviceName: 'Gel-X full set',
      studioName: 'Maya Nails',
      slug: 'maya',
      timezone: 'Europe/Paris',
      location: '12 rue de Rivoli, Paris',
      service: { name: 'Gel-X full set' },
      now: NOW,
    });
    expect(subject).toBe('Reminder: Gel-X full set with Maya Nails tomorrow at 10:30 AM');
    expect(html).toContain('Hi Chloe');
    expect(html).toContain('Saturday, November 28, 2026');
    expect(html).toContain('12 rue de Rivoli, Paris');
    expect(html).toContain('https://getnelsy.com/maya');
    expect(html).toContain('Contact Maya Nails directly');
    expect(html).not.toMatch(/sms|text message/i);

    const video = buildReminderEmail({
      bookingDatetime: '2026-11-28T09:30:00Z', studioName: 'Maya', serviceName: 'Consult',
      service: { location_type: 'video', video_url: 'https://meet.example.com/abc' }, location: 'Paris', now: NOW,
    });
    expect(video.html).toContain('Video call');
    expect(video.html).toContain('https://meet.example.com/abc');
    expect(video.html).not.toContain('>Paris<');
  });
});
