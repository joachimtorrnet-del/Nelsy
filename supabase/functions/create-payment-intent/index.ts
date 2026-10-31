import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import Stripe from 'npm:stripe@13.11.0'
import { PostHog } from 'npm:posthog-node'

// ── Stripe client ─────────────────────────────────────────────────────────────

const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
if (!stripeSecretKey) throw new Error('STRIPE_SECRET_KEY is not set')

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
})

// service_role key bypasses RLS — intentional for server-side booking creation
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  })
}

/** Day-of-week (0=Sun … 6=Sat) in the given IANA timezone. */
function getDayOfWeekInTz(dt: Date, tz: string): number {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    weekday: 'short',
  }).formatToParts(dt)
  const name = parts.find((p) => p.type === 'weekday')?.value ?? 'Sun'
  return ({ Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 } as Record<string, number>)[name] ?? 0
}

/** Local time as 'HH:MM' string in the given IANA timezone. */
function getLocalTimeInTz(dt: Date, tz: string): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(dt)
  const h = parts.find((p) => p.type === 'hour')?.value ?? '00'
  const m = parts.find((p) => p.type === 'minute')?.value ?? '00'
  // Normalize '24:xx' → '00:xx' (midnight edge case with hour12:false)
  return `${h === '24' ? '00' : h}:${m}`
}

/** Local date as 'YYYY-MM-DD' in the given IANA timezone. */
function getLocalDateInTz(dt: Date, tz: string): string {
  return new Intl.DateTimeFormat('sv-SE', { timeZone: tz }).format(dt)
}

/** Validate required booking input fields and return a user-facing error or null. */
function validateInput(bd: Record<string, unknown>): string | null {
  if (!bd.profile_id || typeof bd.profile_id !== 'string') return 'Missing profile_id'
  if (!bd.service_id || typeof bd.service_id !== 'string') return 'Missing service_id'
  if (!bd.booking_datetime || typeof bd.booking_datetime !== 'string') return 'Missing booking_datetime'

  const name = String(bd.client_name ?? '').trim()
  if (name.length < 2) return 'Name must be at least 2 characters'
  if (name.length > 100) return 'Name is too long'

  const email = String(bd.client_email ?? '').trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email address'
  if (email.length > 254) return 'Email is too long'

  const phone = String(bd.client_phone ?? '').trim()
  if (phone.length > 30) return 'Phone number is too long'

  return null
}

// ── Main handler ──────────────────────────────────────────────────────────────

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    const body = await req.json() as Record<string, unknown>
    const bd = (body.booking_data ?? {}) as Record<string, unknown>

    // ── 1. Input validation ────────────────────────────────────────────────────
    if (!body.booking_data) return jsonResponse({ error: 'Missing booking_data' }, 400)
    const inputErr = validateInput(bd)
    if (inputErr) return jsonResponse({ error: inputErr }, 400)

    // ── 2. Parse and guard booking_datetime ───────────────────────────────────
    const bookingDt = new Date(bd.booking_datetime as string)
    if (isNaN(bookingDt.getTime())) return jsonResponse({ error: 'Invalid booking_datetime' }, 400)
    if (bookingDt <= new Date()) return jsonResponse({ error: 'Booking date must be in the future' }, 400)

    const profileId = bd.profile_id as string
    const serviceId = bd.service_id as string

    // ── 3. Validate profile ───────────────────────────────────────────────────
    const { data: profile, error: profileErr } = await supabase
      .from('profiles')
      .select('id, stripe_account_id, stripe_onboarding_complete, timezone, business_currency')
      .eq('id', profileId)
      .single()

    if (profileErr || !profile) return jsonResponse({ error: 'Salon not found' }, 400)

    // ── 4. Validate service (existence + ownership + active) ──────────────────
    const { data: service, error: serviceErr } = await supabase
      .from('services')
      .select('price_total, deposit_amount, duration_minutes, active')
      .eq('id', serviceId)
      .eq('profile_id', profileId)
      .single()

    if (serviceErr || !service) return jsonResponse({ error: 'Service not found for this salon' }, 400)
    if (!service.active) return jsonResponse({ error: 'This service is no longer available' }, 400)

    // ── 5. Authoritative financial values from DB — never from client ─────────
    const dbPrice = Number(service.price_total)
    const dbDeposit = Number(service.deposit_amount ?? 0)
    const dbDuration = Number(service.duration_minutes)

    if (!Number.isFinite(dbPrice) || dbPrice <= 0) {
      console.error(`Invalid price for service ${serviceId}: ${service.price_total}`)
      return jsonResponse({ error: 'Service price is invalid' }, 500)
    }
    if (!Number.isFinite(dbDuration) || dbDuration <= 0) {
      console.error(`Invalid duration for service ${serviceId}: ${service.duration_minutes}`)
      return jsonResponse({ error: 'Service duration is invalid' }, 500)
    }
    // Charge deposit if one exists, otherwise charge full price
    const chargeAmount = dbDeposit > 0 ? dbDeposit : dbPrice
    if (!Number.isFinite(chargeAmount) || chargeAmount <= 0) {
      return jsonResponse({ error: 'Charge amount is invalid' }, 500)
    }

    // Resolve currency from profile (set during onboarding); fall back to EUR.
    const currency = ((profile.business_currency as string | null) ?? 'eur').toLowerCase()
    const isZeroDecimal = ['jpy', 'krw'].includes(currency)

    // Stripe minimum charge amounts per currency (major unit).
    const MINIMUMS: Record<string, number> = {
      aud: 0.50, bgn: 1.00, cad: 0.50, chf: 0.50, czk: 15.00, dkk: 2.50,
      eur: 0.50, gbp: 0.30, hkd: 4.00, huf: 175,  idr: 10000, inr: 0.50,
      isk: 100,  jpy: 50,   krw: 50,   mxn: 10.00, myr: 2.00,  nok: 3.00,
      nzd: 0.50, pln: 2.00, ron: 2.00, sek: 3.00,  sgd: 0.50,  thb: 10.00,
      usd: 0.50, aed: 2.00,
    }
    const minimum = MINIMUMS[currency] ?? 0.50
    if (chargeAmount < minimum) {
      return jsonResponse(
        { error: `Minimum charge for ${currency.toUpperCase()} is ${minimum}. Please set a higher deposit or price.` },
        400,
      )
    }

    // ── 6. Timezone-aware availability checks ─────────────────────────────────
    const tz = (profile.timezone as string | null) ?? 'Europe/Paris'
    if (!profile.timezone) {
      console.warn(`Profile ${profileId} has no timezone set — defaulting to Europe/Paris`)
    }
    const localDate = getLocalDateInTz(bookingDt, tz)
    const dayOfWeek = getDayOfWeekInTz(bookingDt, tz)
    const localTime = getLocalTimeInTz(bookingDt, tz)

    // 6a. Check closed_dates
    const { data: closedDate } = await supabase
      .from('closed_dates')
      .select('id')
      .eq('profile_id', profileId)
      .eq('closed_date', localDate)
      .maybeSingle()

    if (closedDate) return jsonResponse({ error: 'This date is not available' }, 400)

    // 6b. Check availabilities for this day of week
    const { data: avail } = await supabase
      .from('availabilities')
      .select('start_time, end_time')
      .eq('profile_id', profileId)
      .eq('day_of_week', dayOfWeek)
      .eq('active', true)
      .single()

    if (!avail) return jsonResponse({ error: 'No availability on this day' }, 400)

    // Normalize DB time strings to 'HH:MM' for comparison
    const openTime = avail.start_time.slice(0, 5)
    const closeTime = avail.end_time.slice(0, 5)

    // Calculate booking end time (booking must fit entirely within the window)
    const [bookH, bookM] = localTime.split(':').map(Number)
    const endTotalMin = bookH * 60 + bookM + dbDuration
    const endH = Math.floor(endTotalMin / 60)
    const endM = endTotalMin % 60
    const bookingEndLocal = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`

    if (localTime < openTime || bookingEndLocal > closeTime) {
      return jsonResponse({ error: 'Booking time is outside availability hours' }, 400)
    }

    // ── 7. Idempotence — look up existing booking for this slot ───────────────
    // A booking_session_token is issued when a booking is first created.
    // Only the same session (proven by the token) may reuse an existing
    // PaymentIntent. A different client trying the same slot must get a 409.
    const sessionToken = typeof body.booking_session_token === 'string'
      ? body.booking_session_token
      : null

    const { data: existingBooking } = await supabase
      .from('bookings')
      .select('id, stripe_payment_intent_id, status, expires_at, booking_session_token')
      .eq('profile_id', profileId)
      .eq('booking_datetime', bookingDt.toISOString())
      .not('status', 'in', '("cancelled","no_show","expired")')
      .maybeSingle()

    if (existingBooking) {
      const isExpiredPending =
        existingBooking.status === 'pending' &&
        existingBooking.expires_at != null &&
        new Date(existingBooking.expires_at) < new Date()

      if (!isExpiredPending && existingBooking.stripe_payment_intent_id) {
        // Check whether this is a genuine retry from the same session.
        // If no token or wrong token → reject to prevent PI leakage.
        if (!sessionToken || sessionToken !== existingBooking.booking_session_token) {
          return jsonResponse(
            { error: 'This time slot is currently being booked. Please choose another time.' },
            409,
          )
        }
        // Same session: try to return the existing PaymentIntent
        try {
          const pi = await stripe.paymentIntents.retrieve(existingBooking.stripe_payment_intent_id)
          const reusable = ['requires_payment_method', 'requires_confirmation', 'requires_action']
          if (reusable.includes(pi.status)) {
            return jsonResponse({
              client_secret: pi.client_secret,
              payment_intent_id: pi.id,
              booking_id: existingBooking.id,
              booking_session_token: existingBooking.booking_session_token,
            })
          }
        } catch {
          // Intent expired on Stripe's side — fall through to create a new booking
        }
      }

      if (isExpiredPending) {
        // Immediately clean up the expired booking so the EXCLUDE constraint allows
        // the new one. The cron job would have done this eventually anyway.
        await supabase.from('bookings').update({ status: 'expired' }).eq('id', existingBooking.id)
      } else {
        // A live non-expired booking already exists → slot is taken
        return jsonResponse(
          { error: 'This time slot is no longer available. Please choose another time.' },
          409,
        )
      }
    }

    // ── 8. Insert booking (service_role bypasses RLS) ─────────────────────────
    // expires_at is set to 15 minutes from now. If the user never reaches the
    // Stripe payment form (network error, browser close), the booking will be
    // cleaned up by the cron job. Bookings that do get a PaymentIntent are NOT
    // expired by the cron (they wait for payment or the PI's 24h lifetime).
    // booking_session_token is a one-time token returned to the client so that
    // genuine retries can reuse the PaymentIntent without leaking it to others.
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString()
    const newSessionToken = crypto.randomUUID()

    const { data: booking, error: bookingErr } = await supabase
      .from('bookings')
      .insert({
        profile_id: profileId,
        service_id: serviceId,
        booking_datetime: bookingDt.toISOString(),
        duration_minutes: dbDuration,
        client_name: String(bd.client_name).trim().slice(0, 100),
        client_email: String(bd.client_email).trim().toLowerCase().slice(0, 254),
        client_phone: String(bd.client_phone ?? '').trim().slice(0, 30),
        price_total: dbPrice,
        deposit_paid: dbDeposit,
        nelsy_fee: 0,
        currency,
        status: 'pending',
        expires_at: expiresAt,
        booking_session_token: newSessionToken,
      })
      .select('id')
      .single()

    if (bookingErr) {
      // Postgres exclusion violation (23P01) or unique violation (23505)
      // → someone else just took this slot between our check and the INSERT
      if (bookingErr.code === '23P01' || bookingErr.code === '23505') {
        return jsonResponse(
          { error: 'This time slot is no longer available. Please choose another time.' },
          409,
        )
      }
      throw bookingErr
    }

    // ── 9. Guard: require Stripe Connect to be set up ─────────────────────────
    if (!profile.stripe_onboarding_complete || !profile.stripe_account_id) {
      // Clean up the pending booking so the slot doesn't stay blocked
      await supabase.from('bookings').update({ status: 'expired' }).eq('id', booking.id)
      return jsonResponse(
        {
          error: 'payment_unavailable',
          message: 'This professional has not yet completed payment setup. Please contact them directly.',
        },
        400,
      )
    }

    // ── 10. Create Stripe PaymentIntent ───────────────────────────────────────
    // Idempotency key is scoped to the booking UUID so that:
    // - retries with the same booking ID return the same PI
    // - a new booking (different UUID) always gets a fresh PI
    const idempotencyKey = `booking-pi-${booking.id}`
    let paymentIntent: Stripe.PaymentIntent

    try {
      // Convert to smallest currency unit (JPY/KRW are zero-decimal)
      const stripeAmount = isZeroDecimal
        ? Math.round(chargeAmount)
        : Math.round(chargeAmount * 100)

      // Direct charge: PaymentIntent created on the connected account.
      // Stripe processing fees are deducted from the connected account directly.
      // Nelsy takes 0% commission — no application_fee_amount, no transfer_data.
      paymentIntent = await stripe.paymentIntents.create(
        {
          amount: stripeAmount,
          currency,
          metadata: {
            booking_id: booking.id,
            profile_id: profileId,
            client_email: String(bd.client_email).trim(),
          },
          automatic_payment_methods: { enabled: true },
        },
        { idempotencyKey, stripeAccount: profile.stripe_account_id as string },
      )
    } catch (stripeErr) {
      // Stripe creation failed — expire the booking immediately so it doesn't
      // block the slot until the cron job runs.
      await supabase.from('bookings').update({ status: 'expired' }).eq('id', booking.id)
      throw stripeErr
    }

    // ── 11. Persist PaymentIntent ID on the booking ───────────────────────────
    await supabase
      .from('bookings')
      .update({ stripe_payment_intent_id: paymentIntent.id })
      .eq('id', booking.id)

    // ── 12. Analytics ─────────────────────────────────────────────────────────
    try {
      const posthog = new PostHog(Deno.env.get('POSTHOG_API_KEY') ?? '', {
        host: Deno.env.get('POSTHOG_HOST') ?? 'https://eu.i.posthog.com',
        flushAt: 1,
        flushInterval: 0,
      })
      posthog.capture({
        distinctId: String(bd.client_email),
        event: 'booking created',
        properties: {
          booking_id: booking.id,
          profile_id: profileId,
          service_id: serviceId,
          booking_datetime: bookingDt.toISOString(),
          price_total: dbPrice,
          charge_amount: chargeAmount,
          duration_minutes: dbDuration,
          currency,
          has_connect: !!(profile.stripe_onboarding_complete && profile.stripe_account_id),
        },
      })
      await posthog.shutdown()
    } catch {
      // Analytics failure must never block the booking response
    }

    return jsonResponse({
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id,
      booking_id: booking.id,
      booking_session_token: newSessionToken,
      // Caller must pass this to Stripe.js (loadStripe stripeAccount option) so
      // stripe.confirmPayment() targets the connected account, not the platform.
      stripe_account_id: profile.stripe_account_id,
    })
  } catch (err: unknown) {
    console.error('create-payment-intent error:', err instanceof Error ? err.message : String(err))
    // Never expose internal details to the client
    return jsonResponse({ error: 'An error occurred. Please try again.' }, 500)
  }
})
