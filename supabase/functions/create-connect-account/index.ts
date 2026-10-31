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

// ── Origin validation ─────────────────────────────────────────────────────────
const DEFAULT_ALLOWED_ORIGINS = ['https://getnelsy.com', 'http://localhost:5173', 'http://localhost:3000']
function getAllowedOrigins(): string[] {
  const env = Deno.env.get('ALLOWED_ORIGINS')
  if (env) return env.split(',').map((o) => o.trim()).filter(Boolean)
  return DEFAULT_ALLOWED_ORIGINS
}
function validateOrigin(url: string): boolean {
  return getAllowedOrigins().some((origin) => url.startsWith(origin))
}

// ── Country → currency + timezone mapping (Stripe Connect Express supported countries) ──
// Source: https://stripe.com/docs/connect/cross-border-payouts (as of 2025-10)
const COUNTRY_DATA: Record<string, { currency: string; timezone: string }> = {
  AU: { currency: 'aud', timezone: 'Australia/Sydney' },
  AT: { currency: 'eur', timezone: 'Europe/Vienna' },
  BE: { currency: 'eur', timezone: 'Europe/Brussels' },
  BG: { currency: 'bgn', timezone: 'Europe/Sofia' },
  CA: { currency: 'cad', timezone: 'America/Toronto' },
  HR: { currency: 'eur', timezone: 'Europe/Zagreb' },
  CY: { currency: 'eur', timezone: 'Asia/Nicosia' },
  CZ: { currency: 'czk', timezone: 'Europe/Prague' },
  DK: { currency: 'dkk', timezone: 'Europe/Copenhagen' },
  EE: { currency: 'eur', timezone: 'Europe/Tallinn' },
  FI: { currency: 'eur', timezone: 'Europe/Helsinki' },
  FR: { currency: 'eur', timezone: 'Europe/Paris' },
  DE: { currency: 'eur', timezone: 'Europe/Berlin' },
  GI: { currency: 'gbp', timezone: 'Europe/Gibraltar' },
  GR: { currency: 'eur', timezone: 'Europe/Athens' },
  HK: { currency: 'hkd', timezone: 'Asia/Hong_Kong' },
  HU: { currency: 'huf', timezone: 'Europe/Budapest' },
  IN: { currency: 'inr', timezone: 'Asia/Kolkata' },
  ID: { currency: 'idr', timezone: 'Asia/Jakarta' },
  IE: { currency: 'eur', timezone: 'Europe/Dublin' },
  IS: { currency: 'isk', timezone: 'Atlantic/Reykjavik' },
  IT: { currency: 'eur', timezone: 'Europe/Rome' },
  JP: { currency: 'jpy', timezone: 'Asia/Tokyo' },
  LV: { currency: 'eur', timezone: 'Europe/Riga' },
  LI: { currency: 'chf', timezone: 'Europe/Vaduz' },
  LT: { currency: 'eur', timezone: 'Europe/Vilnius' },
  LU: { currency: 'eur', timezone: 'Europe/Luxembourg' },
  MY: { currency: 'myr', timezone: 'Asia/Kuala_Lumpur' },
  MT: { currency: 'eur', timezone: 'Europe/Malta' },
  MX: { currency: 'mxn', timezone: 'America/Mexico_City' },
  NL: { currency: 'eur', timezone: 'Europe/Amsterdam' },
  NZ: { currency: 'nzd', timezone: 'Pacific/Auckland' },
  NO: { currency: 'nok', timezone: 'Europe/Oslo' },
  PL: { currency: 'pln', timezone: 'Europe/Warsaw' },
  PT: { currency: 'eur', timezone: 'Europe/Lisbon' },
  RO: { currency: 'ron', timezone: 'Europe/Bucharest' },
  SG: { currency: 'sgd', timezone: 'Asia/Singapore' },
  SK: { currency: 'eur', timezone: 'Europe/Bratislava' },
  SI: { currency: 'eur', timezone: 'Europe/Ljubljana' },
  KR: { currency: 'krw', timezone: 'Asia/Seoul' },
  ES: { currency: 'eur', timezone: 'Europe/Madrid' },
  SE: { currency: 'sek', timezone: 'Europe/Stockholm' },
  CH: { currency: 'chf', timezone: 'Europe/Zurich' },
  TH: { currency: 'thb', timezone: 'Asia/Bangkok' },
  AE: { currency: 'aed', timezone: 'Asia/Dubai' },
  GB: { currency: 'gbp', timezone: 'Europe/London' },
  US: { currency: 'usd', timezone: 'America/New_York' },
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  const jsonError = (msg: string, status = 400) =>
    new Response(JSON.stringify({ error: msg }), {
      status,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })

  try {
    const authHeader = req.headers.get('Authorization') ?? ''
    const token = authHeader.replace('Bearer ', '')
    if (!token) return jsonError('Unauthorized', 401)

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    if (authError || !user) return jsonError('Unauthorized', 401)

    const {
      refresh_url,
      return_url,
      country,
      timezone: clientTimezone,
      link_type = 'account_onboarding',
    } = await req.json() as {
      refresh_url: string
      return_url: string
      country?: string
      timezone?: string
      link_type?: 'account_onboarding' | 'account_update'
    }
    if (!refresh_url || !return_url) return jsonError('Missing refresh_url or return_url')
    if (link_type !== 'account_onboarding' && link_type !== 'account_update') {
      return jsonError('link_type must be account_onboarding or account_update')
    }

    const appUrl = Deno.env.get('APP_URL') ?? 'https://getnelsy.com'
    const safeRefreshUrl = validateOrigin(refresh_url) ? refresh_url : `${appUrl}/onboarding-stripe`
    const safeReturnUrl  = validateOrigin(return_url)  ? return_url  : `${appUrl}/stripe/return`

    const profile_id = user.id

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('stripe_account_id, business_country, business_currency, timezone, email, slug')
      .eq('id', profile_id)
      .single()

    if (profileError || !profile) return jsonError('Profile not found', 404)

    let accountId = profile.stripe_account_id

    // account_update: generate a management link for an existing account only.
    // Use this to update bank account details, KYC documents, or personal info.
    if (link_type === 'account_update') {
      if (!accountId) return jsonError('No Stripe account exists — use account_onboarding first', 400)
      const updateLink = await stripe.accountLinks.create({
        account: accountId,
        refresh_url: safeRefreshUrl,
        return_url: safeReturnUrl,
        type: 'account_update',
      })
      return new Response(
        JSON.stringify({ url: updateLink.url, account_id: accountId }),
        { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
      )
    }

    if (!accountId) {
      // Country is required only when creating a new Connect account.
      const resolvedCountry = (typeof country === 'string' && country.toUpperCase() in COUNTRY_DATA)
        ? country.toUpperCase()
        : null

      if (!resolvedCountry) {
        return jsonError(`country must be a valid 2-letter ISO country code supported by Stripe Connect Express`)
      }

      const { currency, timezone: countryTz } = COUNTRY_DATA[resolvedCountry]

      let account
      try {
        account = await stripe.accounts.create({
          type: 'custom',
          country: resolvedCountry,
          email: profile.email,
          capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
          },
          // Manual payout schedule: the pro controls when funds are withdrawn via
          // the create-payout Edge Function. Stripe applies its own retention limits
          // (typically 90 days for EU accounts) — Nelsy must trigger a payout before
          // that limit if funds remain unclaimed. A future cron job should alert pros
          // approaching that limit.
          settings: {
            payouts: {
              schedule: { interval: 'manual' },
            },
          },
        })
      } catch (stripeErr: unknown) {
        const msg = stripeErr instanceof Error ? stripeErr.message : 'Stripe account creation failed'
        console.error('Stripe error:', msg)
        return jsonError(msg, 500)
      }

      accountId = account.id

      // Persist: stripe_account_id, business_country, business_currency, and timezone if unset.
      // Prefer the browser-detected timezone (more accurate for countries with multiple zones).
      const resolvedTimezone = (clientTimezone && typeof clientTimezone === 'string')
        ? clientTimezone
        : countryTz

      const updatePayload: Record<string, string | boolean> = {
        stripe_account_id: accountId,
        business_country: resolvedCountry,
        business_currency: currency,
      }
      if (!profile.timezone) {
        updatePayload.timezone = resolvedTimezone
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update(updatePayload)
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
        properties: { stripe_account_id: accountId, country: resolvedCountry, currency },
      })
      await posthog.shutdown()
    }

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: safeRefreshUrl,
      return_url: safeReturnUrl,
      type: 'account_onboarding',
    })

    return new Response(
      JSON.stringify({ url: accountLink.url, account_id: accountId }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
  }
})
