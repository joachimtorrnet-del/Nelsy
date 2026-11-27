// Signed-in pro asks for her account to be deleted (in-app, App Store Guideline 5.1.1(v)).
//
// Body: { reason?: string | null, source?: 'app' | 'web' }
//
// 1. Verifies the caller's JWT (deploy WITH JWT verification, the default).
// 2. Records the request in account_deletion_requests (one pending request per pro:
//    a second call returns the existing one).
// 3. Emails the team at hello@getnelsy.com and confirms to the pro.
//
// It deletes nothing by itself: the team runs the deletion checklist in
// docs/mobile/account-deletion.md (cancel the Stripe subscription, delete data and
// the auth user) and sets completed_at.
//
// NOT DEPLOYED. Needs migration 20261129_02_account_deletion_requests.sql first.
import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { sendEmail, esc, row, layout } from '../_shared/email.ts'

const TEAM_EMAIL = 'hello@getnelsy.com'
const DELETION_DAYS = 30

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...corsHeaders } })
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader) return json({ error: 'Unauthorized' }, 401)

    const userClient = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_ANON_KEY') ?? '', {
      global: { headers: { authorization: authHeader } },
    })
    const { data: { user }, error: authError } = await userClient.auth.getUser()
    if (authError || !user) return json({ error: 'Unauthorized' }, 401)

    const body = await req.json().catch(() => ({})) as { reason?: unknown; source?: unknown }
    const reason = typeof body.reason === 'string' && body.reason.trim() ? body.reason.trim().slice(0, 500) : null
    const source = body.source === 'web' ? 'web' : 'app'

    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '')

    const { data: profile } = await supabase
      .from('profiles')
      .select('id, email, full_name, salon_name, slug, plan, subscription_status, stripe_subscription_id')
      .eq('id', user.id)
      .maybeSingle()
    const email = String(profile?.email || user.email || '')

    // Existing pending request: answer the same, do not email again.
    const { data: existing } = await supabase
      .from('account_deletion_requests')
      .select('id, requested_at')
      .eq('profile_id', user.id)
      .eq('status', 'pending')
      .maybeSingle()
    if (existing) return json({ ok: true, request_id: existing.id, already_requested: true })

    const { data: inserted, error: insertErr } = await supabase
      .from('account_deletion_requests')
      .insert({ profile_id: user.id, email, slug: profile?.slug ?? null, reason, source })
      .select('id, requested_at')
      .single()
    if (insertErr) {
      // Unique violation: a concurrent tap created it first.
      if (insertErr.code === '23505') return json({ ok: true, already_requested: true })
      throw insertErr
    }

    // Emails are best effort: the row above is the source of truth for the team.
    try {
      const name = esc(profile?.salon_name || profile?.full_name || email)
      await Promise.all([
        sendEmail(
          TEAM_EMAIL,
          `Account deletion request: ${String(profile?.salon_name || email).slice(0, 80)}`,
          layout(
            'Account deletion request',
            `Requested from the ${source}. Complete within ${DELETION_DAYS} days.`,
            row('Studio', name) +
              row('Email', esc(email)) +
              row('Page', esc(profile?.slug ? `getnelsy.com/${profile.slug}` : 'None')) +
              row('Plan', esc(`${profile?.plan ?? 'none'} (${profile?.subscription_status ?? 'none'})`)) +
              row('Stripe subscription', esc(profile?.stripe_subscription_id ?? 'None')) +
              row('Profile id', esc(user.id)) +
              row('Request id', esc(inserted.id)) +
              row('Reason', esc(reason ?? 'Not given'), true),
            `<p style="color:#6b7280;font-size:13px;margin:16px 0 0">Checklist: docs/mobile/account-deletion.md</p>`,
          ),
        ),
        email
          ? sendEmail(
              email,
              'We received your account deletion request',
              layout(
                'Your deletion request is in',
                `We will delete your Nelsy account and its data within ${DELETION_DAYS} days and cancel any active plan.`,
                row('Account', esc(email), true),
                `<p style="color:#6b7280;font-size:13px;text-align:center;margin:16px 0 0">Changed your mind? Just reply to this email.</p>`,
              ),
            )
          : Promise.resolve(false),
      ])
    } catch (emailErr) {
      console.error('[request-account-deletion] email failed (non-blocking):', emailErr)
    }

    return json({ ok: true, request_id: inserted.id })
  } catch (err: unknown) {
    console.error('request-account-deletion error:', err instanceof Error ? err.message : String(err))
    return json({ error: 'An error occurred. Please try again.' }, 500)
  }
})
