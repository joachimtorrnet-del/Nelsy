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
    const { session_id } = await req.json() as { session_id: string }

    if (!session_id) {
      return new Response(JSON.stringify({ error: 'Missing session_id' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // Retrieve Stripe session — metadata has booking_id, service_name, etc.
    const session = await stripe.checkout.sessions.retrieve(session_id)
    const meta = session.metadata ?? {}
    const bookingId = meta.booking_id

    if (!bookingId) {
      return new Response(JSON.stringify({ error: 'No booking associated with this session' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // Fetch booking + service in one query
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('id, profile_id, booking_datetime, client_name, client_email, client_phone, price_total, status, service_id, services(name, duration_minutes)')
      .eq('id', bookingId)
      .single()

    if (bookingError || !booking) {
      return new Response(JSON.stringify({ error: 'Booking not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    const service = (booking.services as { name: string; duration_minutes: number } | null)

    return new Response(
      JSON.stringify({
        booking: {
          id: booking.id,
          booking_datetime: booking.booking_datetime,
          client_name: booking.client_name,
          client_email: booking.client_email,
          client_phone: booking.client_phone,
          price_total: booking.price_total,
          status: booking.status,
          service_name: meta.service_name ?? service?.name ?? 'Service',
          duration: service?.duration_minutes ?? null,
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
