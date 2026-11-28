// Hourly job: trial activation emails (welcome, Instagram bio, deposits, day-10 recap).
//
// Auth: deploy with --no-verify-jwt. Every request must carry the header
//   x-cron-secret: <CRON_SECRET>
// pg_cron (migration 20261201_02_lifecycle_emails.sql) calls it at minute 20 of every hour through
// pg_net, reading the same value from Vault (secret name `booking_reminders_cron_secret`).
//
// Who: profiles with subscription_status = 'trialing' and trial_ends_at in the future, not opted
// out (notification_preferences.lifecycle_emails !== false). Which email and when is decided by the
// pure module _shared/lifecycle-emails.ts (unit tested).
//
// Never twice: each (profile, email) is claimed by inserting into lifecycle_emails_sent
// (unique profile_id + email_key) before the send; only the run that wins the insert sends.
// A failed send deletes the claim, so the next hourly run retries.
//
// Body (optional JSON):
//   { "dry_run": true }                 lists what would be sent, without claiming or sending
//   { "dry_run": true, "now": "<ISO>" } same, as if it were that time (dry run only)
//   { "preview_to": "you@example.com" } sends the 4 emails with sample data to that address, writes nothing
//
// Reads profiles, services, page_views, bookings and (day 10 only) the Stripe subscription and
// customer. Writes only lifecycle_emails_sent. No Stripe writes.
import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'npm:stripe@13.11.0'
import { sendEmail } from '../_shared/email.ts'
import {
  COUNTED_BOOKING_STATUSES, LIFECYCLE_KEYS, REPLY_TO, SITE_URL,
  buildLifecycleEmail, decideLifecycleEmail, lifecycleStage, lifecycleUnsubscribeToken,
} from '../_shared/lifecycle-emails.ts'
import type { LifecycleFacts, LifecycleKey, LifecycleProfile } from '../_shared/lifecycle-emails.ts'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
)

const BATCH_LIMIT = 500

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
}

function safeEqual(a: string, b: string): boolean {
  const ea = new TextEncoder().encode(a)
  const eb = new TextEncoder().encode(b)
  if (ea.length !== eb.length) return false
  let diff = 0
  for (let i = 0; i < ea.length; i++) diff |= ea[i] ^ eb[i]
  return diff === 0
}

type ProfileRow = LifecycleProfile & {
  full_name: string | null
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
}

// deno-lint-ignore no-explicit-any
type Query = any

async function countRows(table: string, profileId: string, filter?: (q: Query) => Query): Promise<number> {
  let q: Query = supabase.from(table).select('id', { count: 'exact', head: true }).eq('profile_id', profileId)
  if (filter) q = filter(q)
  const { count, error } = await q
  if (error) throw new Error(`${table} count failed: ${error.message}`)
  return count ?? 0
}

/** Card state and price, read the same way as trial-card (action 'status'). Read only. */
async function stripeCardState(p: ProfileRow): Promise<{ hasCard: boolean | null; priceLabel: string | null }> {
  const key = Deno.env.get('STRIPE_SECRET_KEY')
  if (!key || !p.stripe_customer_id || !p.stripe_subscription_id) return { hasCard: null, priceLabel: null }
  try {
    const stripe = new Stripe(key, { apiVersion: '2023-10-16', httpClient: Stripe.createFetchHttpClient() })
    const [sub, customer] = await Promise.all([
      stripe.subscriptions.retrieve(p.stripe_subscription_id),
      stripe.customers.retrieve(p.stripe_customer_id),
    ])
    const c = customer as Stripe.Customer
    const hasCard = !!sub.default_payment_method ||
      (!c.deleted && (!!c.invoice_settings?.default_payment_method || !!c.default_source))
    const price = sub.items.data[0]?.price
    let priceLabel: string | null = null
    if (price?.unit_amount != null) {
      const amount = price.unit_amount / 100
      const money = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: (price.currency ?? 'usd').toUpperCase(),
        minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
      }).format(amount)
      priceLabel = `${money} per ${price.recurring?.interval === 'year' ? 'year' : 'month'}`
    }
    return { hasCard, priceLabel }
  } catch (e) {
    console.error(`[lifecycle] stripe read failed for profile ${p.id}`, e instanceof Error ? e.message : e)
    return { hasCard: null, priceLabel: null }
  }
}

async function loadFacts(p: ProfileRow, key: LifecycleKey): Promise<{ facts: LifecycleFacts; priceLabel: string | null }> {
  const [services, visits, instagramVisits, bookings] = await Promise.all([
    countRows('services', p.id, (q) => q.eq('active', true)),
    countRows('page_views', p.id),
    // Same signals as detectPageViewSource (utm_source=instagram or an instagram.com referrer).
    // No dot in the pattern: dots are reserved inside a PostgREST or() filter.
    countRows('page_views', p.id, (q) => q.or('source.eq.instagram,referrer.ilike.%instagram%')),
    countRows('bookings', p.id, (q) => q.in('status', COUNTED_BOOKING_STATUSES as unknown as string[])),
  ])
  // Stripe is only asked for the one email that talks about the card.
  const card = key === 'day10_recap' ? await stripeCardState(p) : { hasCard: null, priceLabel: null }
  return { facts: { services, visits, instagramVisits, bookings, hasCard: card.hasCard }, priceLabel: card.priceLabel }
}

async function unsubscribeFor(profileId: string): Promise<{ pageUrl: string | null; headers: Record<string, string> }> {
  const token = await lifecycleUnsubscribeToken(Deno.env.get('UNSUBSCRIBE_SECRET'), profileId)
  if (!token) return { pageUrl: null, headers: {} }
  const qs = `p=${encodeURIComponent(profileId)}&t=${encodeURIComponent(token)}`
  const fnBase = (Deno.env.get('SUPABASE_URL') ?? '').replace(/\/+$/, '')
  return {
    pageUrl: `${SITE_URL}/u/emails/${encodeURIComponent(profileId)}?t=${encodeURIComponent(token)}`,
    headers: fnBase
      ? {
        'List-Unsubscribe': `<${fnBase}/functions/v1/unsubscribe-lifecycle?${qs}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      }
      : {},
  }
}

/** The 4 emails with sample data, to one address. Touches no table. */
async function sendPreviews(to: string): Promise<Record<string, boolean>> {
  const trialEndsAt = new Date(Date.now() + 4 * 86_400_000).toISOString()
  const results: Record<string, boolean> = {}
  for (const key of LIFECYCLE_KEYS) {
    const { subject, html } = buildLifecycleEmail(key, {
      fullName: 'Maya',
      slug: 'maya',
      timezone: 'America/New_York',
      trialEndsAt,
      facts: { services: 0, visits: 12, instagramVisits: 0, bookings: 3, hasCard: false },
      priceLabel: '$29 per month',
    })
    results[key] = await sendEmail(to, `[Preview] ${subject}`, html, { replyTo: REPLY_TO })
  }
  return results
}

serve(async (req) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const cronSecret = Deno.env.get('CRON_SECRET')
  if (!cronSecret) {
    console.error('[lifecycle] CRON_SECRET is not set: refusing to run')
    return json({ error: 'Not configured' }, 500)
  }
  if (!safeEqual(req.headers.get('x-cron-secret') ?? '', cronSecret)) {
    return json({ error: 'Unauthorized' }, 401)
  }

  let dryRun = false
  let now = new Date()
  let previewTo: string | null = null
  try {
    const body = await req.json()
    dryRun = body?.dry_run === true
    if (dryRun && typeof body?.now === 'string' && Number.isFinite(Date.parse(body.now))) now = new Date(body.now)
    if (typeof body?.preview_to === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.preview_to.trim())) {
      previewTo = body.preview_to.trim()
    }
  } catch { /* empty body is fine */ }

  if (!dryRun && !Deno.env.get('RESEND_API_KEY')) {
    // Without Resend every send would fail: do not claim anything.
    console.error('[lifecycle] RESEND_API_KEY is not set: nothing sent')
    return json({ error: 'RESEND_API_KEY not set' }, 500)
  }

  if (previewTo && !dryRun) return json({ preview_to: previewTo, sent: await sendPreviews(previewTo) })

  const { data: profs, error } = await supabase
    .from('profiles')
    .select('id, email, full_name, slug, timezone, subscription_status, trial_ends_at, notification_preferences, stripe_account_id, stripe_onboarding_complete, stripe_customer_id, stripe_subscription_id')
    .eq('subscription_status', 'trialing')
    .gt('trial_ends_at', now.toISOString())
    .order('trial_ends_at', { ascending: true })
    .limit(BATCH_LIMIT)
  if (error) {
    console.error('[lifecycle] profiles select failed', error)
    return json({ error: 'Query failed' }, 500)
  }
  const profiles = (profs ?? []) as unknown as ProfileRow[]

  const sent = new Map<string, string[]>()
  if (profiles.length) {
    const { data: rows, error: sentErr } = await supabase
      .from('lifecycle_emails_sent')
      .select('profile_id, email_key')
      .in('profile_id', profiles.map((p) => p.id))
    if (sentErr) {
      console.error('[lifecycle] lifecycle_emails_sent select failed', sentErr)
      return json({ error: 'Query failed' }, 500)
    }
    for (const r of rows ?? []) sent.set(r.profile_id, [...(sent.get(r.profile_id) ?? []), r.email_key])
  }

  const summary = {
    now: now.toISOString(),
    trialing: profiles.length,
    sent: 0,
    failed: 0,
    skipped: {} as Record<string, number>,
    dry_run: dryRun,
    // false = UNSUBSCRIBE_SECRET missing: emails would link to Settings instead of a one-click page.
    unsubscribe_links: !!(await lifecycleUnsubscribeToken(Deno.env.get('UNSUBSCRIBE_SECRET'), 'probe')),
    would_send: [] as { profile_id: string; email_key: string; subject: string }[],
  }
  const skip = (reason: string) => { summary.skipped[reason] = (summary.skipped[reason] ?? 0) + 1 }

  for (const p of profiles) {
    const sentKeys = sent.get(p.id) ?? []
    const stage = lifecycleStage(p, sentKeys, now)
    if (!stage.send) { skip(stage.reason); continue }

    try {
      const { facts, priceLabel } = await loadFacts(p, stage.key)
      const decision = decideLifecycleEmail(p, sentKeys, facts, now)
      if (!decision.send) { skip(decision.reason); continue }
      const key = decision.key

      const unsub = await unsubscribeFor(p.id)
      const { subject, html } = buildLifecycleEmail(
        key,
        { fullName: p.full_name, slug: p.slug, timezone: p.timezone, trialEndsAt: p.trial_ends_at!, facts, priceLabel },
        { unsubscribeUrl: unsub.pageUrl },
      )

      if (dryRun) {
        summary.would_send.push({ profile_id: p.id, email_key: key, subject })
        continue
      }

      // Claim: the unique (profile_id, email_key) lets exactly one run insert the row.
      const claimedAt = new Date().toISOString()
      const { error: claimErr } = await supabase
        .from('lifecycle_emails_sent')
        .insert({ profile_id: p.id, email_key: key, sent_at: claimedAt })
      if (claimErr) {
        const duplicate = claimErr.code === '23505'
        skip(duplicate ? 'claimed_elsewhere' : 'claim_failed')
        if (!duplicate) console.error(`[lifecycle] claim failed for profile ${p.id}`, claimErr.message)
        continue
      }

      let ok = false
      try {
        ok = await sendEmail(String(p.email).trim(), subject, html, { headers: unsub.headers, replyTo: REPLY_TO })
      } catch (e) {
        console.error(`[lifecycle] send threw for profile ${p.id}`, e)
      }

      if (ok) {
        summary.sent++
      } else {
        summary.failed++
        // Release the claim so the next hourly run can retry (while the email's window is open).
        await supabase.from('lifecycle_emails_sent').delete()
          .eq('profile_id', p.id).eq('email_key', key).eq('sent_at', claimedAt)
      }
    } catch (e) {
      console.error(`[lifecycle] profile ${p.id} failed`, e instanceof Error ? e.message : e)
      skip('error')
    }
  }

  console.log('[lifecycle]', JSON.stringify({ ...summary, would_send: summary.would_send.length }))
  return json(summary)
})
