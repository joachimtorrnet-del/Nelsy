// Hourly job: email each client a reminder ~24 hours before a confirmed upcoming booking.
//
// Auth: deploy with --no-verify-jwt. Every request must carry the header
//   x-cron-secret: <CRON_SECRET>
// pg_cron (migration 20261128_04_booking_reminders.sql) calls it hourly through pg_net, reading
// the same value from Vault (secret name `booking_reminders_cron_secret`).
//
// Selection: status confirmed|paid, reminder_sent_at IS NULL, booking_datetime in [now+23h, now+25h).
// Never twice: each booking is claimed with a guarded UPDATE (reminder_sent_at IS NULL) before the
// send; only the run that wins the claim sends. A failed send releases the claim, so the next hourly
// run (the booking is still in the 2-hour window) retries once.
//
// Body (optional JSON): { "dry_run": true } lists what would be sent without claiming or sending.
// Read-only on everything except bookings.reminder_sent_at: no availability or ledger changes.
import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { sendEmail } from '../_shared/email.ts'
import {
  REMINDER_STATUSES, buildReminderEmail, reminderSkipReason, reminderWindow,
} from '../_shared/booking-reminders.ts'
import type { ReminderCandidate } from '../_shared/booking-reminders.ts'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
)

const BATCH_LIMIT = 300

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

type BookingRow = ReminderCandidate & {
  profile_id: string
  client_name: string | null
  services: Record<string, unknown> | null
}

serve(async (req) => {
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  const cronSecret = Deno.env.get('CRON_SECRET')
  if (!cronSecret) {
    console.error('[reminders] CRON_SECRET is not set: refusing to run')
    return json({ error: 'Not configured' }, 500)
  }
  if (!safeEqual(req.headers.get('x-cron-secret') ?? '', cronSecret)) {
    return json({ error: 'Unauthorized' }, 401)
  }

  let dryRun = false
  try {
    const body = await req.json()
    dryRun = body?.dry_run === true
  } catch { /* empty body is fine */ }

  if (!dryRun && !Deno.env.get('RESEND_API_KEY')) {
    // Without Resend every send would fail: do not claim anything.
    console.error('[reminders] RESEND_API_KEY is not set: nothing sent')
    return json({ error: 'RESEND_API_KEY not set' }, 500)
  }

  const now = new Date()
  const { start, end } = reminderWindow(now)

  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('id, profile_id, status, booking_datetime, created_at, client_name, client_email, reminder_sent_at, services(*)')
    .in('status', REMINDER_STATUSES as unknown as string[])
    .is('reminder_sent_at', null)
    .gte('booking_datetime', start)
    .lt('booking_datetime', end)
    .order('booking_datetime', { ascending: true })
    .limit(BATCH_LIMIT)

  if (error) {
    console.error('[reminders] select failed', error)
    return json({ error: 'Query failed' }, 500)
  }

  const rows = (bookings ?? []) as unknown as BookingRow[]
  const profileIds = [...new Set(rows.map((b) => b.profile_id))]
  const profiles = new Map<string, Record<string, unknown>>()
  if (profileIds.length) {
    // select('*') on purpose: optional future columns (e.g. a written cancellation policy) are
    // picked up without breaking this query while they do not exist.
    const { data: profs, error: profErr } = await supabase.from('profiles').select('*').in('id', profileIds)
    if (profErr) {
      console.error('[reminders] profiles select failed', profErr)
      return json({ error: 'Query failed' }, 500)
    }
    for (const p of profs ?? []) profiles.set(p.id as string, p as Record<string, unknown>)
  }

  const summary = { window: { start, end }, candidates: rows.length, sent: 0, skipped: {} as Record<string, number>, failed: 0, dry_run: dryRun, would_send: [] as string[] }

  for (const b of rows) {
    const profile = profiles.get(b.profile_id)
    const reason = profile ? reminderSkipReason(b, now, profile.notification_preferences) : 'no_profile'
    if (reason) {
      summary.skipped[reason] = (summary.skipped[reason] ?? 0) + 1
      continue
    }
    if (dryRun) {
      summary.would_send.push(b.id)
      continue
    }

    // Claim: only one run can flip reminder_sent_at from NULL.
    const claimedAt = new Date().toISOString()
    const { data: claimed, error: claimErr } = await supabase
      .from('bookings')
      .update({ reminder_sent_at: claimedAt })
      .eq('id', b.id)
      .is('reminder_sent_at', null)
      .in('status', REMINDER_STATUSES as unknown as string[])
      .select('id')
    if (claimErr || !claimed?.length) {
      summary.skipped.claimed_elsewhere = (summary.skipped.claimed_elsewhere ?? 0) + 1
      continue
    }

    const p = profile!
    const studioName = String(p.salon_name || p.full_name || 'your beauty pro')
    const policy = typeof p.cancellation_policy_text === 'string' ? p.cancellation_policy_text : null
    let ok = false
    try {
      const { subject, html } = buildReminderEmail({
        bookingDatetime: b.booking_datetime,
        clientName: b.client_name,
        serviceName: (b.services?.name as string | undefined) ?? null,
        studioName,
        slug: (p.slug as string | null) ?? null,
        timezone: (p.timezone as string | null) ?? null,
        location: (p.location as string | null) ?? null,
        policyText: policy,
        service: b.services,
        now,
      })
      ok = await sendEmail(String(b.client_email).trim(), subject, html)
    } catch (e) {
      console.error(`[reminders] send threw for booking ${b.id}`, e)
    }

    if (ok) {
      summary.sent++
    } else {
      summary.failed++
      // Release the claim so the next hourly run can retry (still inside the window).
      await supabase.from('bookings').update({ reminder_sent_at: null }).eq('id', b.id).eq('reminder_sent_at', claimedAt)
    }
  }

  console.log('[reminders]', JSON.stringify({ ...summary, would_send: summary.would_send.length }))
  return json(summary)
})
