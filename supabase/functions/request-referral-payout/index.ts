// Signed-in pro asks for her referral commissions to be paid out (dashboard > Referrals).
//
// Body: none.
//
// 1. Verifies the caller's JWT (deploy WITH JWT verification, the default).
// 2. Calls referral_request_payout(user): approves commissions whose 30-day hold is over, checks the
//    $50 minimum and that no request is already open, creates a referral_payouts row (requested).
// 3. Emails the team at hello@getnelsy.com.
//
// It moves NO money and calls no Stripe API: the founder reviews the request, pays by hand and
// marks it paid (docs/features/referrals.md, "Monthly payout procedure").
//
// NOT DEPLOYED. Needs migration 20261201_01_referrals.sql first.
import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { sendEmail, esc, row, layout } from '../_shared/email.ts'
import { REFERRAL_TERMS, formatUsd } from '../_shared/referrals.ts'

const TEAM_EMAIL = 'hello@getnelsy.com'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...corsHeaders } })

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  try {
    const token = (req.headers.get('Authorization') ?? '').replace('Bearer ', '')
    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) return json({ error: 'Unauthorized' }, 401)

    const { data: payout, error } = await supabase.rpc('referral_request_payout', { p_referrer: user.id })
    if (error) {
      if (error.message.includes('payout_already_open')) {
        return json({ error: 'A payout request is already being reviewed.', code: 'payout_already_open' }, 409)
      }
      if (error.message.includes('below_minimum')) {
        return json({ error: `You need at least ${formatUsd(REFERRAL_TERMS.minPayoutCents)} in approved commissions to request a payout.`, code: 'below_minimum' }, 400)
      }
      throw new Error(error.message)
    }

    // The request is saved: an email failure must not fail the call.
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, slug, stripe_account_id, stripe_onboarding_complete')
        .eq('id', user.id)
        .maybeSingle()
      const html = layout(
        'Referral payout request',
        'A pro asked for her referral commissions. Review it, pay it by hand, then mark it paid (docs/features/referrals.md).',
        row('Pro', esc(profile?.full_name ?? '')) +
          row('Slug', esc(profile?.slug ?? '')) +
          row('Email', esc(user.email ?? '')) +
          row('Amount', esc(formatUsd(payout.total_cents))) +
          row('Stripe Connect account', esc(profile?.stripe_onboarding_complete ? profile?.stripe_account_id ?? 'none' : 'not ready, ask for bank details')) +
          row('Payout id', esc(payout.id)) +
          row('Referrer id', esc(user.id), true),
      )
      await sendEmail(TEAM_EMAIL, `Referral payout request: ${formatUsd(payout.total_cents)} for ${profile?.slug ?? user.id}`, html)
    } catch (emailErr) {
      console.error('[request-referral-payout] email failed:', emailErr)
    }

    return json({ payout })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error('request-referral-payout error:', message)
    return json({ error: message }, 500)
  }
})
