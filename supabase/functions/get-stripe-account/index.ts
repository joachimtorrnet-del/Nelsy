import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'npm:stripe@13.11.0'

const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
if (!stripeSecretKey) throw new Error('STRIPE_SECRET_KEY is not set')

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

export type AccountState =
  | 'none'           // no stripe_account_id in profile
  | 'incomplete'     // requirements.currently_due has items — needs more info
  | 'under_review'   // Stripe is reviewing submitted info (pending_verification)
  | 'active'         // charges_enabled && payouts_enabled
  | 'restricted'     // disabled for non-onboarding reason (fraud, compliance, etc.)

export interface StripeAccountStatus {
  connected: boolean
  state: AccountState
  charges_enabled: boolean
  payouts_enabled: boolean
  country?: string
  default_currency?: string
  requirements_due?: string[]
  requirements_pending?: string[]
  disabled_reason?: string | null
  payout_schedule?: { interval: string; weekly_anchor?: string; monthly_anchor?: number }
  capabilities?: {
    card_payments?: string
    transfers?: string
  }
}

function resolveState(account: Stripe.Account): AccountState {
  const req = account.requirements
  const due = req?.currently_due ?? []
  const pending = req?.pending_verification ?? []
  const reason = req?.disabled_reason

  if (account.charges_enabled && account.payouts_enabled) return 'active'

  // Rejected or blocked by Stripe compliance
  if (reason && (reason.startsWith('rejected') || reason === 'listed' || reason === 'under_review')) {
    return 'restricted'
  }

  // Stripe is reviewing submitted documents
  if (pending.length > 0 && due.length === 0) return 'under_review'
  if (reason === 'requirements.pending_verification') return 'under_review'

  // Active charges but no payouts (e.g. bank account not yet added)
  if (due.length > 0) return 'incomplete'

  // charges disabled for non-onboarding reason
  if (!account.charges_enabled && reason && !reason.startsWith('requirements')) return 'restricted'

  return 'incomplete'
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  const jsonErr = (msg: string, status = 400) =>
    new Response(JSON.stringify({ error: msg }), {
      status,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })

  try {
    const authHeader = req.headers.get('Authorization') ?? ''
    const token = authHeader.replace('Bearer ', '')
    if (!token) return jsonErr('Unauthorized', 401)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) return jsonErr('Unauthorized', 401)

    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_account_id, stripe_onboarding_complete')
      .eq('id', user.id)
      .single()

    if (!profile?.stripe_account_id) {
      const result: StripeAccountStatus = {
        connected: false,
        state: 'none',
        charges_enabled: false,
        payouts_enabled: false,
      }
      return new Response(JSON.stringify(result), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    const account = await stripe.accounts.retrieve(profile.stripe_account_id)
    const state = resolveState(account)

    // Keep stripe_onboarding_complete in sync with Stripe's actual capabilities.
    // A return from Stripe doesn't mean the account is verified — re-read here.
    const isNowComplete = account.charges_enabled && account.payouts_enabled
    if (isNowComplete !== profile.stripe_onboarding_complete) {
      await supabase
        .from('profiles')
        .update({ stripe_onboarding_complete: isNowComplete })
        .eq('id', user.id)
    }

    const result: StripeAccountStatus = {
      connected: true,
      state,
      charges_enabled: account.charges_enabled ?? false,
      payouts_enabled: account.payouts_enabled ?? false,
      country: account.country ?? undefined,
      default_currency: account.default_currency ?? undefined,
      requirements_due: account.requirements?.currently_due ?? [],
      requirements_pending: account.requirements?.pending_verification ?? [],
      disabled_reason: account.requirements?.disabled_reason ?? null,
      payout_schedule: (account.settings?.payouts?.schedule as StripeAccountStatus['payout_schedule']) ?? undefined,
      capabilities: {
        card_payments: (account.capabilities?.card_payments as string | undefined) ?? undefined,
        transfers: (account.capabilities?.transfers as string | undefined) ?? undefined,
      },
    }

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error('get-stripe-account error:', message)
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }
})
