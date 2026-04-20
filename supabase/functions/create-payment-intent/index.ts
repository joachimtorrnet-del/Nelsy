import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'npm:stripe@13.11.0'

const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
if (!stripeSecretKey) throw new Error('STRIPE_SECRET_KEY is not set')

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

// service_role key — bypasses RLS to create bookings on behalf of anonymous clients
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
)

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
    const body = await req.json()
    const { booking_data } = body

    if (!booking_data) {
      throw new Error('Missing booking_data')
    }

    if (!booking_data.profile_id) {
      throw new Error('Missing profile_id in booking_data')
    }

    // Validate that the profile exists
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id, stripe_account_id, stripe_onboarding_complete')
      .eq('id', booking_data.profile_id)
      .single()

    if (profileError || !profile) {
      throw new Error('Invalid profile_id — salon not found')
    }

    // 1. Create the booking using service_role (bypasses RLS — safe for anonymous clients)
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .insert({
        profile_id: booking_data.profile_id,
        service_id: booking_data.service_id,
        booking_datetime: booking_data.booking_datetime,
        client_name: booking_data.client_name,
        client_email: booking_data.client_email,
        client_phone: booking_data.client_phone,
        price_total: booking_data.price_total,
        deposit_paid: booking_data.deposit_paid,
        nelsy_fee: 0,
        status: 'pending',
      })
      .select('id')
      .single()

    if (bookingError) throw bookingError

    const serviceAmount = Number(booking_data.price_total)

    // 2. Create Payment Intent — Nelsy takes 0% commission, pro receives 100% minus Stripe fees
    let paymentIntent: Stripe.PaymentIntent

    if (profile.stripe_onboarding_complete && profile.stripe_account_id) {
      // Production mode: full amount transferred to salon (no Nelsy commission)
      paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(serviceAmount * 100),
        currency: 'eur',
        application_fee_amount: 0,
        transfer_data: {
          destination: profile.stripe_account_id,
        },
        metadata: {
          booking_id: booking.id,
          profile_id: booking_data.profile_id,
          client_email: booking_data.client_email,
        },
        automatic_payment_methods: { enabled: true },
      })
    } else {
      // Dev / pre-onboarding mode: direct charge until Connect is set up
      paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(serviceAmount * 100),
        currency: 'eur',
        metadata: {
          booking_id: booking.id,
          profile_id: booking_data.profile_id,
          client_email: booking_data.client_email,
          mode: 'direct_pre_connect',
        },
        automatic_payment_methods: { enabled: true },
      })
    }

    // Persist payment intent ID on booking
    await supabase
      .from('bookings')
      .update({ stripe_payment_intent_id: paymentIntent.id })
      .eq('id', booking.id)

    return new Response(
      JSON.stringify({
        client_secret: paymentIntent.client_secret,
        payment_intent_id: paymentIntent.id,
        booking_id: booking.id,
      }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    )
  }
})
