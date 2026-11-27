// Pure logic for pro push notifications (Stan style: emoji + title, one-line detail).
// No Deno APIs and no network: imported by _shared/push.ts AND by the Node unit tests in
// src/lib/__tests__/pushMessages.test.ts. Keep it that way.

export type PushKind = 'new_booking' | 'payment' | 'cancellation' | 'lead'

/** Keys in profiles.notification_preferences (written by the app Settings screen). Absent = on. */
export const PUSH_PREF_KEY: Record<PushKind, string> = {
  new_booking: 'push_new_booking',
  payment: 'push_payment',
  cancellation: 'push_cancellation',
  lead: 'push_lead',
}

export interface PushMessage {
  kind: PushKind
  title: string
  body: string
  /** In-app route opened when the notification is tapped (HashRouter path). */
  route: string
}

export function pushAllowed(prefs: unknown, kind: PushKind): boolean {
  if (!prefs || typeof prefs !== 'object') return true
  return (prefs as Record<string, unknown>)[PUSH_PREF_KEY[kind]] !== false
}

/** Same env flag semantics everywhere: only the exact string "true" or "1" turns sending on. */
export function pushFeatureEnabled(value: string | undefined | null): boolean {
  return value === 'true' || value === '1'
}

const ZERO_DECIMAL = ['jpy', 'krw']

export function formatMajor(amount: number, currency: string): string {
  const c = (currency || 'eur').toUpperCase()
  const zero = ZERO_DECIMAL.includes(c.toLowerCase())
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency', currency: c, minimumFractionDigits: zero ? 0 : 2, maximumFractionDigits: zero ? 0 : 2,
    }).format(amount)
  } catch {
    return `${amount.toFixed(zero ? 0 : 2)} ${c}`
  }
}

/** "Fri, Dec 5 at 10:00 AM" in the pro's timezone. */
export function formatWhen(iso: string | null | undefined, timezone: string | null | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  let tz = timezone || 'Europe/Paris'
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: tz })
  } catch {
    tz = 'Europe/Paris'
  }
  const day = d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', timeZone: tz })
  const time = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: tz })
  return `${day} at ${time}`
}

const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}...` : s)
const firstName = (name: string | null | undefined, fallback: string) =>
  clip(String(name ?? '').trim() || fallback, 40)

export interface BookingPushInput {
  clientName: string | null | undefined
  serviceName: string | null | undefined
  bookingDatetime: string | null | undefined
  timezone: string | null | undefined
}

function bookingLine(b: BookingPushInput): string {
  return [firstName(b.clientName, 'A client'), clip(String(b.serviceName ?? '').trim() || 'Appointment', 60), formatWhen(b.bookingDatetime, b.timezone)]
    .filter(Boolean)
    .join(' · ')
}

export function newBookingMessage(b: BookingPushInput): PushMessage {
  return { kind: 'new_booking', title: '📅 New booking', body: bookingLine(b), route: '/bookings' }
}

export function bookingPaymentMessage(b: BookingPushInput & { amount: number; currency: string }): PushMessage {
  return {
    kind: 'payment',
    title: `💰 You just earned ${formatMajor(b.amount, b.currency)}`,
    body: bookingLine(b),
    route: '/bookings',
  }
}

export function cancellationMessage(b: BookingPushInput): PushMessage {
  return { kind: 'cancellation', title: '❌ Booking cancelled', body: bookingLine(b), route: '/bookings' }
}

export function productSaleMessage(p: { title: string | null | undefined; amount: number; currency: string }): PushMessage {
  return {
    kind: 'payment',
    title: `💰 You just earned ${formatMajor(p.amount, p.currency)}`,
    body: `New sale: ${clip(String(p.title ?? '').trim() || 'your product', 80)}`,
    route: '/studio?tab=products',
  }
}

export function leadMessage(l: { firstName: string | null | undefined; resourceTitle: string | null | undefined }): PushMessage {
  const who = String(l.firstName ?? '').trim() ? firstName(l.firstName, 'Someone') : 'Someone'
  return {
    kind: 'lead',
    title: '✉️ New lead',
    body: `${who} downloaded ${clip(String(l.resourceTitle ?? '').trim() || 'your free resource', 80)}`,
    route: '/audience',
  }
}

/**
 * A paid booking is both a new booking and a payment: send one notification, not two.
 * Payment wins ("You just earned"); if the pro turned payment pushes off, fall back to
 * the new-booking push. Returns null when both are off.
 */
export function paidBookingMessage(
  prefs: unknown,
  b: BookingPushInput & { amount: number; currency: string },
): PushMessage | null {
  if (pushAllowed(prefs, 'payment')) return bookingPaymentMessage(b)
  if (pushAllowed(prefs, 'new_booking')) return newBookingMessage(b)
  return null
}

/** FCM HTTP v1 message body for one device token. APNs gets the same alert through FCM. */
export function fcmMessage(token: string, m: PushMessage) {
  return {
    message: {
      token,
      notification: { title: m.title, body: m.body },
      data: { route: m.route, kind: m.kind },
      android: { priority: 'HIGH', notification: { sound: 'default' } },
      apns: { payload: { aps: { sound: 'default' } } },
    },
  }
}
