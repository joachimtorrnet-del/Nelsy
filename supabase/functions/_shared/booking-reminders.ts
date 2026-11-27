// Pure logic for the 24-hour client reminder email (send-booking-reminders edge function).
// No Deno APIs and no network: imported by the edge function AND by the Node unit tests in
// src/lib/__tests__/bookingReminders.test.ts. Keep it that way.
import { esc, row, layout } from './email-html.ts'

export const SITE_URL = 'https://getnelsy.com'

/** Booking statuses that mean the appointment will happen (see bookings_status_check).
 *  confirmed = pay on arrival, paid = deposit or full payment received.
 *  pending (awaiting payment), completed, no_show, cancelled, refunded, expired never get a reminder. */
export const REMINDER_STATUSES = ['confirmed', 'paid'] as const

/** The cron runs every hour. A booking starting between 23h and 25h from now is due.
 *  Each booking sits in this 2-hour window for two consecutive hourly runs: the first run sends,
 *  the second one is a free retry if the first send failed. bookings.reminder_sent_at guarantees
 *  a single send. */
export const WINDOW_FROM_HOURS = 23
export const WINDOW_TO_HOURS = 25

/** A booking made less than this long ago just received its confirmation email: skip it for now
 *  (the next hourly run picks it up if it is still inside the window). */
export const MIN_BOOKING_AGE_MINUTES = 60

export const DEFAULT_TIMEZONE = 'Europe/Paris' // same fallback as create-payment-intent and stripe-webhooks

const HOUR = 3_600_000

export function reminderWindow(now: Date): { start: string; end: string } {
  return {
    start: new Date(now.getTime() + WINDOW_FROM_HOURS * HOUR).toISOString(),
    end: new Date(now.getTime() + WINDOW_TO_HOURS * HOUR).toISOString(),
  }
}

/** notification_preferences.client_reminders: on unless the pro switched it off.
 *  (The older `reminders` key was a pro-facing "remind me 1h before" toggle that was never built;
 *  it is intentionally ignored here.) */
export function clientRemindersEnabled(prefs: unknown): boolean {
  if (!prefs || typeof prefs !== 'object') return true
  return (prefs as Record<string, unknown>).client_reminders !== false
}

export interface ReminderCandidate {
  id: string
  status: string
  booking_datetime: string
  created_at: string | null
  client_email: string | null
  reminder_sent_at: string | null
}

export type SkipReason =
  | 'already_sent'
  | 'status'
  | 'outside_window'
  | 'too_recent'
  | 'no_email'
  | 'pro_opted_out'

/** Returns null when the reminder must be sent now, otherwise why not. */
export function reminderSkipReason(b: ReminderCandidate, now: Date, prefs: unknown): SkipReason | null {
  if (b.reminder_sent_at) return 'already_sent'
  if (!(REMINDER_STATUSES as readonly string[]).includes(b.status)) return 'status'
  const start = Date.parse(b.booking_datetime)
  const from = now.getTime() + WINDOW_FROM_HOURS * HOUR
  const to = now.getTime() + WINDOW_TO_HOURS * HOUR
  if (!Number.isFinite(start) || start < from || start >= to) return 'outside_window'
  const created = b.created_at ? Date.parse(b.created_at) : NaN
  if (Number.isFinite(created) && now.getTime() - created < MIN_BOOKING_AGE_MINUTES * 60_000) return 'too_recent'
  if (!b.client_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.client_email.trim())) return 'no_email'
  if (!clientRemindersEnabled(prefs)) return 'pro_opted_out'
  return null
}

/** Valid IANA zone or the default (an invalid stored value must not crash the run). */
export function safeTimezone(tz: string | null | undefined): string {
  if (!tz) return DEFAULT_TIMEZONE
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: tz })
    return tz
  } catch {
    return DEFAULT_TIMEZONE
  }
}

/** Same date/time format as the stripe-webhooks confirmation email, plus the zone abbreviation. */
export function formatAppointment(iso: string, tz: string): { date: string; time: string; shortTime: string } {
  const d = new Date(iso)
  const zone = safeTimezone(tz)
  return {
    date: d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: zone }),
    time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: zone, timeZoneName: 'short' }),
    shortTime: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: zone }),
  }
}

/** 'today' | 'tomorrow' | weekday, computed on calendar days in the studio's timezone
 *  (a booking 23h ahead can still be later the same day). */
export function relativeDay(now: Date, iso: string, tz: string): string {
  const zone = safeTimezone(tz)
  const day = (d: Date) => new Intl.DateTimeFormat('sv-SE', { timeZone: zone }).format(d) // YYYY-MM-DD
  const diff = Math.round((Date.parse(day(new Date(iso))) - Date.parse(day(now))) / 86_400_000)
  if (diff === 0) return 'today'
  if (diff === 1) return 'tomorrow'
  return `on ${new Date(iso).toLocaleDateString('en-US', { weekday: 'long', timeZone: zone })}`
}

/** Cancellation / change note shown to clients. Uses the pro's own written policy when one is
 *  stored; otherwise neutral wording. Nelsy never invents a policy on the pro's behalf.
 *  Note: profiles.cancellation_policy / cancellation_hours exist in the DB but are untouched
 *  defaults with no UI to set them, so they are NOT treated as the pro's policy. */
export function policyNoteHtml(studioName: string, policyText?: string | null): string {
  const text = typeof policyText === 'string' ? policyText.trim() : ''
  const inner = text
    ? `<strong>${esc(studioName)}&rsquo;s cancellation policy:</strong> ${esc(text).replace(/\n/g, '<br>')}`
    : `Need to change your appointment? Contact ${esc(studioName)} directly.`
  return `<div style="background:#eff6ff;border-radius:12px;padding:16px;margin-bottom:24px">
                    <p style="color:#1d4ed8;font-size:14px;margin:0">${inner}</p>
                  </div>`
}

/** Video link only when the service is explicitly a video service with an https link.
 *  services.location_type / video_url do not exist yet: both are optional. */
export function videoUrlFor(service: Record<string, unknown> | null | undefined): string | null {
  if (!service) return null
  const type = String(service.location_type ?? '').toLowerCase()
  const url = typeof service.video_url === 'string' ? service.video_url.trim() : ''
  if (!['video', 'online', 'virtual'].includes(type) || !/^https:\/\/\S+$/i.test(url)) return null
  return url
}

export interface ReminderEmailInput {
  bookingDatetime: string
  clientName?: string | null
  serviceName?: string | null
  studioName: string
  slug?: string | null
  timezone?: string | null
  /** profiles.location (free text, often a city or address). */
  location?: string | null
  /** Pro-written policy text, when such a field exists. */
  policyText?: string | null
  /** The services row (select '*'), for optional location_type / video_url. */
  service?: Record<string, unknown> | null
  /** Run time, for "today" / "tomorrow" wording. */
  now?: Date
}

export function buildReminderEmail(input: ReminderEmailInput): { subject: string; html: string } {
  const studio = input.studioName.trim() || 'your beauty pro'
  const service = (input.serviceName ?? '').trim() || 'your appointment'
  const tz = safeTimezone(input.timezone)
  const { date, time, shortTime } = formatAppointment(input.bookingDatetime, tz)
  const when = relativeDay(input.now ?? new Date(), input.bookingDatetime, tz)
  const video = videoUrlFor(input.service)
  const firstName = (input.clientName ?? '').trim().split(/\s+/)[0] ?? ''

  let rows = row('Studio', esc(studio)) + row('Service', esc(service)) + row('Date', esc(date))
  const where = video
    ? `Video call<br><a href="${esc(video)}" style="color:#F52B8C;font-weight:600;word-break:break-all">Join the call</a>`
    : (input.location ?? '').trim()
      ? esc((input.location ?? '').trim())
      : ''
  rows += row('Time', esc(time), !where)
  if (where) rows += row(video ? 'Where' : 'Location', where, true)

  const studioLink = input.slug
    ? `<div style="text-align:center"><a href="${SITE_URL}/${encodeURIComponent(input.slug)}" style="display:inline-block;background:#F52B8C;color:#ffffff;font-weight:700;padding:14px 28px;border-radius:12px;text-decoration:none">View ${esc(studio)}&rsquo;s page</a></div>`
    : ''

  return {
    subject: `Reminder: ${service} with ${studio} ${when} at ${shortTime}`,
    html: layout(
      `See you ${when}`,
      `${firstName ? `Hi ${esc(firstName)}, this` : 'This'} is a reminder of your appointment with ${esc(studio)}.`,
      rows,
      policyNoteHtml(studio, input.policyText) + studioLink,
    ),
  }
}
