// Minimal .ics (iCalendar) file for one appointment, built in the browser.

export interface IcsEvent {
  /** Stable id (the booking id when known). */
  uid: string;
  /** Start instant (UTC ISO string or Date). */
  start: string | Date;
  durationMinutes?: number | null;
  summary: string;
  location?: string | null;
  description?: string | null;
}

const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
/** Escapes the characters iCalendar treats as separators in text values. */
const text = (v: string) => v.replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/([,;])/g, '\\$1');

export function buildIcs(event: IcsEvent, now: Date = new Date()): string {
  const start = new Date(event.start);
  const end = new Date(start.getTime() + (event.durationMinutes ?? 60) * 60_000);
  return [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Nelsy//Booking//EN',
    'BEGIN:VEVENT',
    `UID:${event.uid}@getnelsy.com`,
    `DTSTAMP:${stamp(now)}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(end)}`,
    `SUMMARY:${text(event.summary)}`,
    ...(event.location ? [`LOCATION:${text(event.location)}`] : []),
    ...(event.description ? [`DESCRIPTION:${text(event.description)}`] : []),
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadIcs(event: IcsEvent, filename = 'appointment.ics'): void {
  const url = URL.createObjectURL(new Blob([buildIcs(event)], { type: 'text/calendar;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
