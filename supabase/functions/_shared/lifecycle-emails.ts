// Pure logic for the trial activation emails (send-lifecycle-emails edge function).
// No Deno APIs and no network: imported by the edge functions AND by the Node unit tests in
// src/lib/__tests__/lifecycleEmails.test.ts. Keep it that way.
//
// Four emails during the 14-day trial, each at most once per pro (table lifecycle_emails_sent),
// each only while its step is still not done. See docs/features/trial-emails.md.
import { esc } from './email-html.ts'

export const SITE_URL = 'https://getnelsy.com'
export const TRIAL_LENGTH_DAYS = 14 // same as TRIAL_DAYS in trial.ts
export const DEFAULT_TIMEZONE = 'Europe/Paris' // same fallback as booking-reminders.ts
export const REPLY_TO = 'hello@getnelsy.com'

/** Local sending hours in the pro's timezone: 9:00 to 18:59. */
export const SEND_FROM_HOUR = 9
export const SEND_TO_HOUR = 19
/** The welcome email ignores the daytime window this long after the trial start: she just signed up. */
export const WELCOME_ANYTIME_HOURS = 3

const HOUR = 3_600_000
const DAY = 24 * HOUR

export type LifecycleKey = 'day0_welcome' | 'day2_instagram' | 'day5_deposits' | 'day10_recap'

/** Each email is due from `fromDay` (days since trial start) until `toDay` (exclusive).
 *  The windows never overlap, so at most one email is due at any time, and an email whose window
 *  has passed is never sent late (no burst of old emails when the job is first switched on).
 *  day10_recap stops at day 11: that is when Stripe's trial_will_end email (3 days before the end)
 *  takes over the card reminder. */
export const LIFECYCLE_STAGES: ReadonlyArray<{ key: LifecycleKey; fromDay: number; toDay: number }> = [
  { key: 'day0_welcome', fromDay: 0, toDay: 2 },
  { key: 'day2_instagram', fromDay: 2, toDay: 4 },
  { key: 'day5_deposits', fromDay: 5, toDay: 7 },
  { key: 'day10_recap', fromDay: 10, toDay: 11 },
]

export const LIFECYCLE_KEYS: readonly LifecycleKey[] = LIFECYCLE_STAGES.map((s) => s.key)

/** Booking statuses that count as a real booking (pending = unpaid checkout, expired = abandoned,
 *  cancelled / refunded are left out of the recap count). */
export const COUNTED_BOOKING_STATUSES = ['confirmed', 'paid', 'completed', 'no_show'] as const

/** The profile columns the decision reads. */
export interface LifecycleProfile {
  id: string
  email: string | null
  subscription_status: string | null
  trial_ends_at: string | null
  /** Not a column today. Used when present, otherwise the start is trial_ends_at minus 14 days. */
  trial_started_at?: string | null
  timezone?: string | null
  notification_preferences?: unknown
  slug?: string | null
  stripe_account_id?: string | null
  stripe_onboarding_complete?: boolean | null
}

/** What the pro has done so far, read from the DB (and Stripe for the card) at send time. */
export interface LifecycleFacts {
  /** Active services on her page. */
  services: number
  /** All page views. */
  visits: number
  /** Page views with source 'instagram' or an instagram.com referrer. */
  instagramVisits: number
  /** Bookings in COUNTED_BOOKING_STATUSES. */
  bookings: number
  /** A card is saved for the subscription. null = could not be checked (Stripe unreachable). */
  hasCard: boolean | null
}

export type LifecycleSkipReason =
  | 'not_trialing'
  | 'no_trial_end'
  | 'trial_ended'
  | 'trial_not_started'
  | 'opted_out'
  | 'no_email'
  | 'no_email_due'
  | 'already_sent'
  | 'outside_daytime'
  | 'step_done'
  | 'no_slug'
  | 'card_unknown'

export type LifecycleDecision =
  | { send: false; reason: LifecycleSkipReason; key?: LifecycleKey }
  | { send: true; key: LifecycleKey }

/** notification_preferences.lifecycle_emails: on unless the pro switched it off or unsubscribed. */
export function lifecycleEmailsEnabled(prefs: unknown): boolean {
  if (!prefs || typeof prefs !== 'object') return true
  return (prefs as Record<string, unknown>).lifecycle_emails !== false
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

export function localHour(now: Date, tz: string | null | undefined): number {
  const h = new Intl.DateTimeFormat('en-US', { timeZone: safeTimezone(tz), hour: 'numeric', hourCycle: 'h23' }).format(now)
  return Number(h) % 24
}

export function isDaytime(now: Date, tz: string | null | undefined): boolean {
  const h = localHour(now, tz)
  return h >= SEND_FROM_HOUR && h < SEND_TO_HOUR
}

/** Trial start in ms: the stored start if any, otherwise trial end minus 14 days. NaN when unknown. */
export function trialStartMs(p: Pick<LifecycleProfile, 'trial_ends_at' | 'trial_started_at'>): number {
  const stored = p.trial_started_at ? Date.parse(p.trial_started_at) : NaN
  if (Number.isFinite(stored)) return stored
  const end = p.trial_ends_at ? Date.parse(p.trial_ends_at) : NaN
  return Number.isFinite(end) ? end - TRIAL_LENGTH_DAYS * DAY : NaN
}

/** The email whose window contains `now`, if any. */
export function stageAt(startMs: number, now: Date): LifecycleKey | null {
  const days = (now.getTime() - startMs) / DAY
  if (!Number.isFinite(days) || days < 0) return null
  return LIFECYCLE_STAGES.find((s) => days >= s.fromDay && days < s.toDay)?.key ?? null
}

/**
 * Step 1, from the profile row alone (no extra queries): is an email due right now?
 * Rules: subscription_status is exactly 'trialing' (never cancelled, paused/inactive, past_due,
 * active), the trial has not ended, the pro did not opt out, the email was not sent before, and it
 * is daytime where she lives (the welcome email is exempt for the first 3 hours).
 */
export function lifecycleStage(p: LifecycleProfile, sentKeys: readonly string[], now: Date): LifecycleDecision {
  if (p.subscription_status !== 'trialing') return { send: false, reason: 'not_trialing' }
  const end = p.trial_ends_at ? Date.parse(p.trial_ends_at) : NaN
  if (!Number.isFinite(end)) return { send: false, reason: 'no_trial_end' }
  if (now.getTime() >= end) return { send: false, reason: 'trial_ended' }
  const start = trialStartMs(p)
  if (now.getTime() < start) return { send: false, reason: 'trial_not_started' }
  if (!lifecycleEmailsEnabled(p.notification_preferences)) return { send: false, reason: 'opted_out' }
  if (!p.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email.trim())) return { send: false, reason: 'no_email' }

  const key = stageAt(start, now)
  if (!key) return { send: false, reason: 'no_email_due' }
  if (sentKeys.includes(key)) return { send: false, reason: 'already_sent', key }

  const justSignedUp = key === 'day0_welcome' && now.getTime() - start < WELCOME_ANYTIME_HOURS * HOUR
  if (!justSignedUp && !isDaytime(now, p.timezone)) return { send: false, reason: 'outside_daytime', key }
  return { send: true, key }
}

/** Same rule as the dashboard (Home.tsx stripeReady): account created and onboarding complete,
 *  which get-stripe-account keeps equal to charges_enabled && payouts_enabled. */
export function stripeReady(p: Pick<LifecycleProfile, 'stripe_account_id' | 'stripe_onboarding_complete'>): boolean {
  return !!p.stripe_account_id && p.stripe_onboarding_complete === true
}

/**
 * Step 2: the full decision for a profile snapshot. `facts` is only needed when step 1 says an
 * email is due, so the caller can pass null first and query the facts for due profiles only.
 */
export function decideLifecycleEmail(
  p: LifecycleProfile,
  sentKeys: readonly string[],
  facts: LifecycleFacts,
  now: Date,
): LifecycleDecision {
  const stage = lifecycleStage(p, sentKeys, now)
  if (!stage.send) return stage
  const key = stage.key
  switch (key) {
    case 'day0_welcome':
      return stage // always sent; the service nudge wording depends on facts.services
    case 'day2_instagram':
      if (!p.slug) return { send: false, reason: 'no_slug', key }
      if (facts.instagramVisits > 0 || facts.bookings > 0) return { send: false, reason: 'step_done', key }
      return stage
    case 'day5_deposits':
      if (stripeReady(p)) return { send: false, reason: 'step_done', key }
      return stage
    case 'day10_recap':
      // Unknown card state: wait for the next hourly run instead of asking for a card she may have added.
      if (facts.hasCard === null) return { send: false, reason: 'card_unknown', key }
      return stage // always sent; the card ask depends on facts.hasCard
  }
}

// ── Copy ─────────────────────────────────────────────────────────────────────

export interface LifecycleEmailInput {
  fullName?: string | null
  slug?: string | null
  timezone?: string | null
  trialEndsAt: string
  facts: LifecycleFacts
  /** e.g. "$29.00 per month", from the Stripe price. Left out of the copy when unknown. */
  priceLabel?: string | null
}

export interface LifecycleEmailContent {
  key: LifecycleKey
  subject: string
  /** Inbox preview line. */
  preheader: string
  greeting: string
  /** Plain-text paragraphs before the highlight. */
  paragraphs: string[]
  /** Large line (her link, or the recap numbers). */
  highlight?: { text: string; href?: string; label?: string }
  steps?: string[]
  /** Plain-text paragraphs after the highlight / steps. */
  after?: string[]
  cta: { label: string; url: string }
  closing?: string
}

export function firstName(fullName: string | null | undefined): string {
  const first = (fullName ?? '').trim().split(/\s+/)[0] ?? ''
  return first.slice(0, 40)
}

export function pageUrl(slug: string): string {
  return `${SITE_URL}/${encodeURIComponent(slug)}`
}

/** Link as shown to the pro: getnelsy.com/<slug>. */
export function displayLink(slug: string): string {
  return `getnelsy.com/${slug}`
}

export function formatTrialEnd(iso: string, tz: string | null | undefined): string {
  return new Date(iso).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', timeZone: safeTimezone(tz) })
}

function count(n: number, one: string, many: string): string {
  if (n <= 0) return `no ${many}`
  return n === 1 ? `1 ${one}` : `${n} ${many}`
}

/** "12 visits and 3 bookings" / "no visits and no bookings". Real numbers only. */
export function recapNumbers(facts: Pick<LifecycleFacts, 'visits' | 'bookings'>): string {
  return `${count(facts.visits, 'visit', 'visits')} and ${count(facts.bookings, 'booking', 'bookings')}`
}

export function lifecycleEmailContent(key: LifecycleKey, input: LifecycleEmailInput): LifecycleEmailContent {
  const name = firstName(input.fullName)
  const greeting = name ? `Hi ${name},` : 'Hi,'
  const slug = (input.slug ?? '').trim()
  const link = slug ? displayLink(slug) : null
  const { facts } = input

  switch (key) {
    case 'day0_welcome': {
      const live = link
        ? `Welcome to Nelsy. Your booking page is live at ${link} and your 14-day free trial has started. No card needed for now.`
        : 'Welcome to Nelsy. Your booking page is live and your 14-day free trial has started. No card needed for now.'
      const hasService = facts.services > 0
      return {
        key,
        subject: 'Welcome to Nelsy, your page is live',
        preheader: hasService ? 'Your 14-day free trial has started.' : 'One thing to do first: add your first service.',
        greeting,
        paragraphs: [
          live,
          hasService
            ? 'You already added a service, so clients have something to book. Take a look around your dashboard and check that your prices and your hours look right.'
            : 'The first thing to do is add your first service. Give it a name, a price and a duration, so clients have something to book.',
        ],
        cta: { label: hasService ? 'Open my dashboard' : 'Add my first service', url: `${SITE_URL}/dashboard` },
        closing: 'If you have a question, just reply to this email.',
      }
    }
    case 'day2_instagram':
      return {
        key,
        subject: 'Put your Nelsy link in your Instagram bio',
        preheader: 'Three short steps so clients can book you from your profile.',
        greeting,
        paragraphs: ['Your clients find you on Instagram. Put your link in your bio so they can book from your profile, without sending a DM first.'],
        highlight: slug ? { text: link!, href: pageUrl(slug) } : undefined,
        steps: [
          'Open Instagram, go to your profile and tap Edit profile.',
          'Tap Links, then Add external link.',
          'Paste your link and save.',
        ],
        after: ['Then mention it in a story so your regulars know where to book.'],
        cta: { label: 'View my page', url: slug ? pageUrl(slug) : `${SITE_URL}/dashboard` },
      }
    case 'day5_deposits':
      return {
        key,
        subject: 'Take deposits to stop no-shows',
        preheader: 'Connect Stripe to take deposits and card payments on your page.',
        greeting,
        paragraphs: [
          'When a client pays a deposit to book, she has a real reason to show up.',
          'To take deposits and card payments on your Nelsy page, connect Stripe. It is the secure payment service that sends the money to your bank account. You choose the deposit for each service.',
          'Have your ID and your bank details ready before you start.',
        ],
        cta: { label: 'Connect Stripe', url: `${SITE_URL}/dashboard/stripe` },
      }
    case 'day10_recap': {
      const endDate = formatTrialEnd(input.trialEndsAt, input.timezone)
      const nothingYet = facts.visits <= 0 && facts.bookings <= 0
      const paragraphs: string[] = []
      if (nothingYet) {
        paragraphs.push('Your page had no visits and no bookings so far.')
        paragraphs.push(
          facts.services <= 0
            ? 'The most useful next step is to add your first service, so clients have something to book.'
            : link
              ? `Clients can only book once they see your link. The most useful next step is to put ${link} in your Instagram bio.`
              : 'Clients can only book once they see your link. The most useful next step is to put it in your Instagram bio.',
        )
      }
      const after = facts.hasCard
        ? [`Your card is saved, so your page stays live when your free trial ends on ${endDate}. Nothing else to do.`]
        : [
          `Add a card to keep your page live after ${endDate}, the day your free trial ends.`,
          `You will not be charged before that date${input.priceLabel ? `. Then the plan is ${input.priceLabel}` : ''}. Without a card, your page is paused when the trial ends.`,
        ]
      return {
        key,
        subject: 'Your first 10 days on Nelsy',
        preheader: `Your page had ${recapNumbers(facts)} so far.`,
        greeting,
        paragraphs,
        highlight: nothingYet ? undefined : { label: 'Your page so far', text: recapNumbers(facts) },
        after,
        cta: facts.hasCard
          ? { label: 'Open my dashboard', url: `${SITE_URL}/dashboard` }
          : { label: 'Add a card', url: `${SITE_URL}/dashboard?add_card=1` },
      }
    }
  }
}

const SIGN_OFF = 'Joachim from Nelsy'

/** Body as plain text (tests, word count, logs). The footer is not included. */
export function lifecycleEmailText(c: LifecycleEmailContent): string {
  const lines: string[] = [c.greeting, ...c.paragraphs]
  if (c.highlight) lines.push(c.highlight.label ? `${c.highlight.label}: ${c.highlight.text}` : c.highlight.text)
  if (c.steps) c.steps.forEach((s, i) => lines.push(`${i + 1}. ${s}`))
  if (c.after) lines.push(...c.after)
  lines.push(c.cta.label)
  if (c.closing) lines.push(c.closing)
  lines.push(SIGN_OFF)
  return lines.join('\n')
}

export interface RenderOptions {
  /** Page with a confirm button (signed link). Falls back to the Settings page when no token can be minted. */
  unsubscribeUrl?: string | null
}

const FONT = `-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif`

/** All dynamic text goes through esc(). */
export function renderLifecycleEmail(c: LifecycleEmailContent, opts: RenderOptions = {}): string {
  const p = (text: string) =>
    `<p style="margin:0 0 16px;font-size:16px;line-height:1.55;color:#374151">${esc(text)}</p>`

  const highlight = c.highlight
    ? `<div style="background:#FFF0F7;border:1px solid #FBD0E4;border-radius:16px;padding:20px 16px;margin:4px 0 20px;text-align:center">
        ${c.highlight.label ? `<div style="font-size:13px;line-height:1.4;font-weight:600;color:#6b7280;margin:0 0 6px">${esc(c.highlight.label)}</div>` : ''}
        ${c.highlight.href
          ? `<a href="${esc(c.highlight.href)}" style="font-size:22px;line-height:1.3;font-weight:800;color:#F52B8C;text-decoration:none;word-break:break-all">${esc(c.highlight.text)}</a>`
          : `<span style="font-size:22px;line-height:1.3;font-weight:800;color:#111827">${esc(c.highlight.text)}</span>`}
      </div>`
    : ''

  const steps = c.steps?.length
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:0 0 16px">${c.steps.map((s, i) => `
        <tr>
          <td style="width:40px;vertical-align:top;padding:0 0 12px">
            <div style="width:28px;height:28px;line-height:28px;border-radius:14px;background:#F52B8C;color:#ffffff;font-size:14px;font-weight:700;text-align:center">${i + 1}</div>
          </td>
          <td style="vertical-align:top;padding:3px 0 12px;font-size:16px;line-height:1.45;color:#374151">${esc(s)}</td>
        </tr>`).join('')}
      </table>`
    : ''

  const unsubscribe = opts.unsubscribeUrl || `${SITE_URL}/dashboard/settings`
  const unsubscribeLabel = opts.unsubscribeUrl ? 'Unsubscribe' : 'Turn them off in Settings'

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(c.subject)}</title>
</head>
<body style="margin:0;padding:0;background:#f7f3f5">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${esc(c.preheader)}</div>
<table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;background:#f7f3f5">
  <tr>
    <td align="center" style="padding:24px 12px">
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:520px;border-collapse:collapse;font-family:${FONT}">
        <tr>
          <td style="padding:0 8px 16px;font-size:22px;font-weight:800;letter-spacing:-0.3px;color:#F52B8C">Nelsy</td>
        </tr>
        <tr>
          <td style="background:#ffffff;border-radius:20px;padding:28px 24px">
            <p style="margin:0 0 16px;font-size:16px;line-height:1.55;color:#111827;font-weight:600">${esc(c.greeting)}</p>
            ${c.paragraphs.map(p).join('\n            ')}
            ${highlight}
            ${steps}
            ${(c.after ?? []).map(p).join('\n            ')}
            <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;margin:8px 0 24px">
              <tr>
                <td align="center">
                  <a href="${esc(c.cta.url)}" style="display:inline-block;background:#F52B8C;color:#ffffff;font-size:16px;font-weight:700;padding:15px 32px;border-radius:14px;text-decoration:none">${esc(c.cta.label)}</a>
                </td>
              </tr>
            </table>
            ${c.closing ? p(c.closing) : ''}
            <p style="margin:0;font-size:16px;line-height:1.55;color:#111827">${esc(SIGN_OFF)}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:18px 12px 0;font-size:12px;line-height:1.5;color:#9ca3af;text-align:center">
            You get these short setup emails during your Nelsy free trial.
            <a href="${esc(unsubscribe)}" style="color:#6b7280;text-decoration:underline">${esc(unsubscribeLabel)}</a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`
}

export function buildLifecycleEmail(
  key: LifecycleKey,
  input: LifecycleEmailInput,
  opts: RenderOptions = {},
): { subject: string; html: string; text: string } {
  const content = lifecycleEmailContent(key, input)
  return { subject: content.subject, html: renderLifecycleEmail(content, opts), text: lifecycleEmailText(content) }
}

// ── Unsubscribe token (same HMAC-SHA256 pattern as _shared/contacts.ts, UNSUBSCRIBE_SECRET) ──
// Web Crypto only, so it runs in Deno and in Node tests. The secret is passed in by the caller.

const encoder = new TextEncoder()

/** Null when the secret is missing or shorter than 16 chars: no link can be minted or verified. */
export async function lifecycleUnsubscribeToken(secret: string | null | undefined, profileId: string): Promise<string | null> {
  if (!secret || secret.length < 16) return null
  const cryptoKey = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(`lifecycle-unsub:v1:${profileId}`)))
  let bin = ''
  for (const b of sig) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export async function verifyLifecycleUnsubscribeToken(secret: string | null | undefined, profileId: string, token: string): Promise<boolean> {
  const expected = await lifecycleUnsubscribeToken(secret, profileId)
  if (!expected || expected.length !== token.length) return false
  let diff = 0
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ token.charCodeAt(i)
  return diff === 0
}
