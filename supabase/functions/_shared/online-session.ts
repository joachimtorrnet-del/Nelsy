// Online video sessions (Creator plan): display-only helpers for booking emails
// and the confirmation page. Never touches amounts, availability or the ledger.
//
// Reads are best-effort: if migration 20261128_02_online_services.sql is not
// applied yet (no location_type column / no service_video_links table), every
// helper falls back to "in person" and the email is exactly what it was before.
import { esc, row } from './email.ts'

export interface OnlineSession {
  online: boolean
  /** https meeting link, or null when the pro sends it after booking. */
  videoUrl: string | null
}

const IN_PERSON: OnlineSession = { online: false, videoUrl: null }

/** https only, no whitespace or characters that could break out of an HTML attribute. */
export function isSafeHttpsUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false
  if (value.length < 12 || value.length > 2048) return false
  if (!/^https:\/\/[^\s<>"'`]+$/.test(value)) return false
  try {
    const u = new URL(value)
    return u.protocol === 'https:' && u.hostname.includes('.')
  } catch {
    return false
  }
}

// deno-lint-ignore no-explicit-any
type AnyClient = { from: (table: string) => any }

/** Location of a service. Separate queries so a missing column never breaks the caller. */
export async function fetchOnlineSession(client: AnyClient, serviceId: string | null | undefined): Promise<OnlineSession> {
  if (!serviceId) return IN_PERSON
  try {
    const { data: svc, error } = await client.from('services').select('location_type').eq('id', serviceId).maybeSingle()
    if (error || svc?.location_type !== 'online') return IN_PERSON
    const { data: link } = await client.from('service_video_links').select('video_url').eq('service_id', serviceId).maybeSingle()
    return { online: true, videoUrl: isSafeHttpsUrl(link?.video_url) ? link.video_url : null }
  } catch {
    return IN_PERSON
  }
}

/** "Europe/Paris (GMT+1)" for the given instant. Falls back to the raw IANA name. */
export function timezoneLabel(tz: string, at: Date = new Date()): string {
  try {
    const offset = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'shortOffset' })
      .formatToParts(at)
      .find((p) => p.type === 'timeZoneName')?.value
    return offset ? `${tz.replace(/_/g, ' ')} (${offset})` : tz
  } catch {
    return tz
  }
}

function linkHtml(url: string): string {
  const safe = esc(url)
  return `<a href="${safe}" style="color:#F52B8C;font-weight:600;word-break:break-all">${safe}</a>`
}

/**
 * Extra table rows for an online session, built with the shared row() helper.
 * Every row keeps its bottom border: callers insert them before their last row.
 */
export function onlineSessionRows(s: OnlineSession, tz: string, at: Date, audience: 'client' | 'pro'): string {
  if (!s.online) return ''
  const link = isSafeHttpsUrl(s.videoUrl)
    ? linkHtml(s.videoUrl)
    : esc(audience === 'client' ? 'Sent to you before the session' : 'Not set: send it to your client')
  return row('Location', 'Video call') + row('Video link', link) + row('Time zone', esc(timezoneLabel(tz, at)))
}

/** Short note under the table. */
export function onlineSessionNote(s: OnlineSession, audience: 'client' | 'pro', proName = 'your pro'): string {
  if (!s.online) return ''
  const hasLink = isSafeHttpsUrl(s.videoUrl)
  const text = audience === 'client'
    ? (hasLink
        ? 'This is an online session. Join from the video link a few minutes early. The time above is shown in your pro&rsquo;s time zone, so check it against yours.'
        : `This is an online session. ${esc(proName)} will send you the video link before it starts. The time above is shown in your pro&rsquo;s time zone, so check it against yours.`)
    : (hasLink
        ? 'Online session: your client got the video link in their confirmation email.'
        : 'Online session: no video link is saved on this service, so send one to your client before the session.')
  return `<div style="background:#fdf2f8;border-radius:12px;padding:16px;margin-bottom:24px"><p style="color:#9d174d;font-size:14px;margin:0">${text}</p></div>`
}
