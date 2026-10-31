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

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

// ── Origin validation ─────────────────────────────────────────────────────────
const DEFAULT_ALLOWED_ORIGINS = ['https://getnelsy.com', 'http://localhost:5173', 'http://localhost:3000']
function getAllowedOrigins(): string[] {
  const env = Deno.env.get('ALLOWED_ORIGINS')
  if (env) return env.split(',').map((o) => o.trim()).filter(Boolean)
  return DEFAULT_ALLOWED_ORIGINS
}
function validateOrigin(url: string): boolean {
  const allowed = getAllowedOrigins()
  return allowed.some((origin) => url.startsWith(origin))
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { booking_id, origin } = await req.json() as { booking_id: string; origin: string }

    if (!booking_id || !origin) {
      return new Response(JSON.stringify({ error: 'Missing booking_id or origin' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    if (!validateOrigin(origin)) {
      return new Response(JSON.stringify({ error: 'Invalid origin' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // Fetch booking
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('id, profile_id, service_id, booking_datetime, client_name, client_email, price_total, status')
      .eq('id', booking_id)
      .single()

    if (bookingError || !booking) {
      return new Response(JSON.stringify({ error: 'Booking not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // Prevent paying twice: reject if already confirmed or paid
    if (['confirmed', 'paid', 'cancelled', 'expired'].includes((booking as { status?: string }).status ?? '')) {
      return new Response(JSON.stringify({ error: 'This booking cannot be paid in its current state.' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // Fetch profile
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('full_name, salon_name, slug, logo_url, stripe_account_id, stripe_onboarding_complete, business_currency')
      .eq('id', booking.profile_id)
      .single()

    if (profileError || !profileData) {
      return new Response(JSON.stringify({ error: 'Profile not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // Fetch service name + duration
    let serviceName = 'Appointment'
    let duration = 60
    if (booking.service_id) {
      const { data: service } = await supabase
        .from('services')
        .select('name, duration_minutes')
        .eq('id', booking.service_id)
        .single()
      if (service) {
        serviceName = service.name
        duration = service.duration_minutes
      }
    }

    const proName = profileData.full_name || profileData.salon_name

    const currency = ((profileData.business_currency ?? 'eur') as string).toLowerCase()
    const isZeroDecimal = ['jpy', 'krw'].includes(currency)

    // Validate minimum charge amount per Stripe's requirements
    const MINIMUMS: Record<string, number> = {
      aud: 0.50, bgn: 1.00, cad: 0.50, chf: 0.50, czk: 15.00, dkk: 2.50,
      eur: 0.50, gbp: 0.30, hkd: 4.00, huf: 175,  idr: 10000, inr: 0.50,
      isk: 100,  jpy: 50,   krw: 50,   mxn: 10.00, myr: 2.00,  nok: 3.00,
      nzd: 0.50, pln: 2.00, ron: 2.00, sek: 3.00,  sgd: 0.50,  thb: 10.00,
      usd: 0.50, aed: 2.00,
    }
    const minimum = MINIMUMS[currency] ?? 0.50
    if (booking.price_total < minimum) {
      return new Response(
        JSON.stringify({ error: `Minimum charge for ${currency.toUpperCase()} is ${minimum}.` }),
        { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
      )
    }

    const connectedAccountId = profileData.stripe_onboarding_complete && profileData.stripe_account_id
      ? (profileData.stripe_account_id as string)
      : null

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      payment_method_types: ['card'],

      line_items: [{
        price_data: {
          currency,
          unit_amount: isZeroDecimal ? Math.round(booking.price_total) : Math.round(booking.price_total * 100),
          product_data: {
            name: serviceName,
            description: `${duration} min appointment with ${proName}`,
            ...(profileData.logo_url ? { images: [profileData.logo_url] } : {}),
          },
        },
        quantity: 1,
      }],

      customer_email: booking.client_email,

      metadata: {
        booking_id: booking.id,
        profile_id: booking.profile_id,
        client_name: booking.client_name,
        service_name: serviceName,
        booking_datetime: booking.booking_datetime,
        amount_total: booking.price_total.toString(),
      },

      // Pass account so BookingConfirmed can retrieve the session from the right account.
      success_url: connectedAccountId
        ? `${origin}/booking-confirmed?session_id={CHECKOUT_SESSION_ID}&account=${connectedAccountId}`
        : `${origin}/booking-confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${profileData.slug}`,
    }

    // Direct charge: session is created on the connected account.
    // Stripe processing fees are deducted from the connected account directly.
    // Nelsy takes 0% commission — no application_fee_amount, no transfer_data.
    const stripeRequestOptions: Stripe.RequestOptions = connectedAccountId
      ? { stripeAccount: connectedAccountId }
      : {}

    const session = await stripe.checkout.sessions.create(sessionParams, stripeRequestOptions)

    // Persist payment intent on booking
    await supabase
      .from('bookings')
      .update({ stripe_payment_intent_id: session.payment_intent as string })
      .eq('id', booking_id)

    const posthog = new PostHog(Deno.env.get('POSTHOG_API_KEY') ?? '', {
      host: Deno.env.get('POSTHOG_HOST') ?? 'https://eu.i.posthog.com',
      flushAt: 1,
      flushInterval: 0,
    })
    posthog.capture({
      distinctId: booking.client_email ?? booking_id,
      event: 'booking checkout started',
      properties: {
        booking_id: booking.id,
        profile_id: booking.profile_id,
        service_name: serviceName,
        booking_datetime: booking.booking_datetime,
        price_total: booking.price_total,
        currency,
        session_id: session.id,
      },
    })
    await posthog.shutdown()

    return new Response(
      JSON.stringify({ url: session.url, session_id: session.id }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error('create-checkout error:', message)
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    )
  }
})
