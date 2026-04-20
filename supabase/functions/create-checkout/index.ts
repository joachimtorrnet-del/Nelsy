import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'npm:stripe@13.11.0'

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

    // Fetch booking
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('id, profile_id, service_id, booking_datetime, client_name, client_email, price_total')
      .eq('id', booking_id)
      .single()

    if (bookingError || !booking) {
      return new Response(JSON.stringify({ error: 'Booking not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // Fetch profile
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('full_name, salon_name, slug, logo_url, stripe_account_id, stripe_onboarding_complete')
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

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      payment_method_types: ['card'],

      line_items: [{
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(booking.price_total * 100),
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

      success_url: `${origin}/booking-confirmed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${profileData.slug}`,
    }

    // Connect split if pro has verified Stripe account (5% Nelsy commission)
    if (profileData.stripe_onboarding_complete && profileData.stripe_account_id) {
      sessionParams.payment_intent_data = {
        application_fee_amount: Math.round(booking.price_total * 0.05 * 100),
        transfer_data: { destination: profileData.stripe_account_id },
      }
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    // Persist payment intent on booking
    await supabase
      .from('bookings')
      .update({ stripe_payment_intent_id: session.payment_intent as string })
      .eq('id', booking_id)

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
