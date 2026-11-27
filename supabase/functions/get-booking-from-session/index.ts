import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'
import Stripe from 'npm:stripe@13.11.0'

const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
if (!stripeSecretKey) throw new Error('STRIPE_SECRET_KEY is not set')

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    const { session_id, stripe_account_id, booking_id, payment_intent } = await req.json() as {
      session_id?: string
      stripe_account_id?: string
      booking_id?: string
      payment_intent?: string
    }

    const notFound = () => new Response(JSON.stringify({ error: 'Booking not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })

    let bookingId: string | undefined
    let meta: Record<string, string> = {}

    if (session_id) {
      // Legacy Checkout Session flow. For direct charges the session lives on the
      // connected account, passed from the success_url query param set by create-checkout.
      // stripe-node rejects an empty options object ("Unknown arguments"), so only pass it with an account.
      const session = stripe_account_id
        ? await stripe.checkout.sessions.retrieve(session_id, {}, { stripeAccount: stripe_account_id })
        : await stripe.checkout.sessions.retrieve(session_id)
      meta = (session.metadata ?? {}) as Record<string, string>
      bookingId = meta.booking_id
    } else if (booking_id && payment_intent) {
      // PaymentIntent flow (return_url after 3D Secure): the PaymentIntent id Stripe appends
      // to the URL proves the caller is the payer, so a guessed booking id alone reveals nothing.
      bookingId = booking_id
    } else {
      return new Response(JSON.stringify({ error: 'Missing session_id or booking_id + payment_intent' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    if (!bookingId) return notFound()

    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('id, profile_id, booking_datetime, client_name, client_email, client_phone, price_total, deposit_paid, status, service_id, stripe_payment_intent_id, services(name, duration_minutes)')
      .eq('id', bookingId)
      .single()

    if (bookingError || !booking) return notFound()
    if (!session_id && booking.stripe_payment_intent_id !== payment_intent) return notFound()

    const service = (booking.services as { name: string; duration_minutes: number } | null)

    // Fetch salon timezone and currency for correct display on confirmation page
    const { data: salonProfile } = await supabase
      .from('profiles')
      .select('timezone, business_currency')
      .eq('id', booking.profile_id)
      .single()

    return new Response(
      JSON.stringify({
        booking: {
          id: booking.id,
          booking_datetime: booking.booking_datetime,
          client_name: booking.client_name,
          client_email: booking.client_email,
          client_phone: booking.client_phone,
          price_total: booking.price_total,
          // Mirrors create-payment-intent: the deposit is charged if set, otherwise the full price
          amount_paid: Number(booking.deposit_paid) > 0 ? booking.deposit_paid : booking.price_total,
          status: booking.status,
          service_name: meta.service_name ?? service?.name ?? 'Service',
          duration: service?.duration_minutes ?? null,
          salon_timezone: salonProfile?.timezone ?? 'Europe/Paris',
          salon_currency: (salonProfile?.business_currency ?? 'eur').toLowerCase(),
        },
      }),
      { headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error('get-booking-from-session error:', message)
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } },
    )
  }
})
