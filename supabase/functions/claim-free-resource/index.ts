// Public: claim a free resource (lead magnet) from a studio page.
// Deploy with --no-verify-jwt: visitors are anonymous.
//
// Body: { product_id, email, first_name?, consent_marketing: boolean }
//
// 1. Rate limits (table-based, hashed keys): per IP and per email + product.
// 2. The product must be an active, non-archived free_resource with a file, of a
//    published studio whose plan includes digital products (Creator / Salon).
// 3. Upserts the contact (consent only when the box was ticked), records the claim
//    (one per product + email), and emails the /r/:claimId download link.
//
// The response is the same whether the email is new or already claimed, and never
// contains a download URL, file path or anything about other claims: the file only
// reaches the inbox that was typed in.
import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { planHasFeature } from '../_shared/plans.ts'
import { sendEmail, esc, row, layout } from '../_shared/email.ts'
import { MAX_DOWNLOADS, appUrl, isValidEmail } from '../_shared/product-orders.ts'
import {
  upsertContact, consentText, rateKey, unsubscribeLinks, unsubscribeHeaders, unsubscribeFooter,
} from '../_shared/contacts.ts'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  })
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const PUBLIC_STATUSES_BLOCKED = ['inactive', 'incomplete', 'canceled', 'cancelled']
const UNAVAILABLE = { error: 'not_available', message: 'This free resource is not available right now.' }
const TOO_MANY = { error: 'rate_limited', message: 'Too many requests. Please try again a little later.' }

// Limits (sliding windows)
const IP_MAX_PER_HOUR = 10
const EMAIL_PRODUCT_MAX_PER_DAY = 3

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for') ?? ''
  return (fwd.split(',')[0] || req.headers.get('cf-connecting-ip') || req.headers.get('x-real-ip') || 'unknown').trim()
}

async function allow(bucket: string, windowSeconds: number, max: number): Promise<boolean> {
  const { data, error } = await supabase.rpc('rate_limit_hit', {
    p_bucket: bucket, p_window_seconds: windowSeconds, p_max: max,
  })
  if (error) {
    // Fail closed: without the limiter this endpoint could be used to spam inboxes.
    console.error('[claim-free-resource] rate_limit_hit failed:', error.message)
    return false
  }
  return data === true
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  try {
    const body = await req.json().catch(() => ({})) as Record<string, unknown>

    // ── 1. Input ─────────────────────────────────────────────────────────────
    const productId = typeof body.product_id === 'string' ? body.product_id : ''
    if (!UUID_RE.test(productId)) return json({ error: 'Missing product_id' }, 400)

    const email = String(body.email ?? '').trim().toLowerCase()
    if (!isValidEmail(email)) return json({ error: 'invalid_email', message: 'Enter a valid email address.' }, 400)

    const firstName = String(body.first_name ?? '').trim().replace(/\s+/g, ' ').slice(0, 100) || null
    // Only an explicit boolean true counts as consent.
    const consent = body.consent_marketing === true

    // ── 2. Rate limits (before any lookup) ───────────────────────────────────
    if (!(await allow(`frc:ip:${await rateKey(clientIp(req))}`, 3600, IP_MAX_PER_HOUR))) return json(TOO_MANY, 429)
    if (!(await allow(`frc:ep:${productId}:${await rateKey(email)}`, 86400, EMAIL_PRODUCT_MAX_PER_DAY))) {
      return json(TOO_MANY, 429)
    }

    // ── 3. Product: active free resource with a file ─────────────────────────
    const { data: product } = await supabase
      .from('products')
      .select('id, profile_id, type, title, price_cents, file_path, is_active, archived_at')
      .eq('id', productId)
      .maybeSingle()

    if (
      !product || !product.is_active || product.archived_at ||
      product.type !== 'free_resource' || Number(product.price_cents) !== 0 || !product.file_path
    ) {
      return json(UNAVAILABLE, 404)
    }

    // ── 4. Studio: published, plan includes digital products ─────────────────
    const { data: profile } = await supabase
      .from('profiles')
      .select('id, plan, subscription_status, salon_name, full_name')
      .eq('id', product.profile_id)
      .single()

    if (!profile || !profile.subscription_status || PUBLIC_STATUSES_BLOCKED.includes(profile.subscription_status)) {
      return json(UNAVAILABLE, 404)
    }
    if (!planHasFeature(profile.plan, 'digital_products')) return json(UNAVAILABLE, 404)

    const studioName = String(profile.salon_name || profile.full_name || 'this beauty pro')

    // ── 5. Contact + claim ───────────────────────────────────────────────────
    const contactId = await upsertContact(supabase, {
      profileId: profile.id,
      email,
      firstName,
      source: 'free_resource',
      sourceRef: product.id,
      consent,
      consentText: consentText(studioName),
    })

    let claimId: string | null = null
    const { data: inserted, error: insertErr } = await supabase
      .from('free_resource_claims')
      .insert({
        product_id: product.id,
        profile_id: profile.id,
        contact_id: contactId,
        email,
        first_name: firstName,
        consent_marketing: consent,
      })
      .select('id')
      .maybeSingle()

    if (inserted?.id) {
      claimId = inserted.id
    } else if (insertErr?.code === '23505') {
      // Same email claimed this resource before: re-send the same link.
      const { data: existing } = await supabase
        .from('free_resource_claims')
        .select('id')
        .eq('product_id', product.id)
        .eq('email', email)
        .maybeSingle()
      claimId = existing?.id ?? null
      if (claimId && consent) {
        await supabase.from('free_resource_claims').update({ consent_marketing: true }).eq('id', claimId)
      }
    } else if (insertErr) {
      throw insertErr
    }
    if (!claimId) throw new Error('claim not recorded')

    // ── 6. Email the download link ───────────────────────────────────────────
    const unsub = contactId ? await unsubscribeLinks(contactId) : null
    const downloadUrl = `${appUrl()}/r/${encodeURIComponent(claimId)}`
    const greeting = firstName ? `Hi ${esc(firstName)}, here` : 'Here'
    await sendEmail(
      email,
      `Your free download: ${String(product.title).slice(0, 80)}`,
      layout(
        'Your free download is ready',
        `${greeting} is the resource you asked for from ${esc(studioName)}.`,
        row('Resource', esc(product.title)) + row('From', esc(studioName), true),
        `<div style="text-align:center"><a href="${esc(downloadUrl)}" style="display:inline-block;background:#F52B8C;color:#ffffff;font-weight:700;padding:14px 28px;border-radius:12px;text-decoration:none">Download my file</a></div>` +
          `<p style="color:#6b7280;font-size:13px;text-align:center;margin:16px 0 0">The link works up to ${MAX_DOWNLOADS} times. You will be asked for this email address.</p>` +
          unsubscribeFooter(unsub, studioName),
      ),
      { headers: unsubscribeHeaders(unsub) },
    )
    await supabase.from('free_resource_claims').update({ emailed_at: new Date().toISOString() }).eq('id', claimId)

    return json({ ok: true })
  } catch (err: unknown) {
    console.error('claim-free-resource error:', err instanceof Error ? err.message : String(err))
    return json({ error: 'An error occurred. Please try again.' }, 500)
  }
})
