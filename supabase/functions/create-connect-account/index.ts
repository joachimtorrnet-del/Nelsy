import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'npm:stripe@13.11.0'
import { PostHog } from 'npm:posthog-node'

const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
if (!stripeSecretKey) throw new Error('STRIPE_SECRET_KEY is not set')

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    // ── Auth: verify the caller is a logged-in user ──────────────────────────
    const authHeader = req.headers.get('Authorization') ?? ''
    const token = authHeader.replace('Bearer ', '')
    if (!token) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    // Verify JWT and extract the caller's user id
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    const { refresh_url, return_url } = await req.json()
    if (!refresh_url || !return_url) {
      return new Response(JSON.stringify({ error: 'Missing refresh_url or return_url' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // profile_id is derived from the verified JWT — never taken from the request body.
    const profile_id = user.id

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('stripe_account_id, email, slug')
      .eq('id', profile_id)
      .single()

    if (profileError || !profile) {
      return new Response(JSON.stringify({ error: 'Profile not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    let accountId = profile.stripe_account_id

    if (!accountId) {
      let account
      try {
        account = await stripe.accounts.create({
          type: 'express',
          country: 'FR',
          email: profile.email,
          capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
          },
        })
      } catch (stripeErr: unknown) {
        const msg = stripeErr instanceof Error ? stripeErr.message : 'Stripe account creation failed'
        console.error('Stripe error:', msg)
        return new Response(JSON.stringify({ error: msg }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        })
      }

      accountId = account.id

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ stripe_account_id: accountId })
        .eq('id', profile_id)

      if (updateError) {
        console.error('Failed to persist stripe_account_id:', updateError.message)
        throw new Error('Failed to save Stripe account ID')
      }

      const posthog = new PostHog(Deno.env.get('POSTHOG_API_KEY') ?? '', {
        host: Deno.env.get('POSTHOG_HOST') ?? 'https://eu.i.posthog.com',
        flushAt: 1,
        flushInterval: 0,
      })
      posthog.capture({
        distinctId: profile_id,
        event: 'stripe connect account created',
        properties: { stripe_account_id: accountId, country: 'FR' },
      })
      await posthog.shutdown()
    }

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url,
      return_url,
      type: 'account_onboarding',
    })

    return new Response(
      JSON.stringify({ url: accountLink.url, account_id: accountId }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    )
  }
})
