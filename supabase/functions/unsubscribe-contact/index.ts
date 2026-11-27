// Public: unsubscribe a contact from a pro's emails. Deploy with --no-verify-jwt.
//
// Accepts the contact id + HMAC token (see _shared/contacts.ts, UNSUBSCRIBE_SECRET):
//   - POST /unsubscribe-contact?c=<id>&t=<token>   RFC 8058 one-click (List-Unsubscribe-Post)
//   - POST { contact_id, token }                   from the /u/:contactId page
//   - GET  ?c=&t=                                  redirects to the /u page, changes nothing
//     (link scanners prefetch GET URLs, so GET must never unsubscribe)
//
// Sets contacts.unsubscribed_at (idempotent: the first date is kept).
import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { appUrl } from '../_shared/product-orders.ts'
import { verifyUnsubscribeToken } from '../_shared/contacts.ts'

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  })
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const TOKEN_RE = /^[A-Za-z0-9_-]{20,100}$/
const INVALID = { error: 'invalid_link', message: 'This unsubscribe link is not valid.' }

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  const url = new URL(req.url)
  let contactId = url.searchParams.get('c') ?? ''
  let token = url.searchParams.get('t') ?? ''

  if (req.method === 'GET') {
    const target = UUID_RE.test(contactId) && TOKEN_RE.test(token)
      ? `${appUrl()}/u/${encodeURIComponent(contactId)}?t=${encodeURIComponent(token)}`
      : appUrl()
    return new Response(null, { status: 303, headers: { Location: target, ...corsHeaders } })
  }
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  try {
    if ((req.headers.get('content-type') ?? '').includes('application/json')) {
      const body = await req.json().catch(() => ({})) as Record<string, unknown>
      if (typeof body.contact_id === 'string') contactId = body.contact_id
      if (typeof body.token === 'string') token = body.token
    }

    if (!UUID_RE.test(contactId) || !TOKEN_RE.test(token)) return json(INVALID, 400)
    if (!(await verifyUnsubscribeToken(contactId, token))) return json(INVALID, 400)

    const { data: contact } = await supabase
      .from('contacts')
      .select('id, profile_id, unsubscribed_at')
      .eq('id', contactId)
      .maybeSingle()
    // Valid token but contact deleted (pro account removed): nothing left to email.
    if (!contact) return json({ ok: true, studio_name: null })

    if (!contact.unsubscribed_at) {
      const { error } = await supabase
        .from('contacts')
        .update({ unsubscribed_at: new Date().toISOString() })
        .eq('id', contact.id)
        .is('unsubscribed_at', null)
      if (error) throw error
    }

    const { data: pro } = await supabase
      .from('profiles')
      .select('salon_name, full_name')
      .eq('id', contact.profile_id)
      .maybeSingle()

    return json({ ok: true, studio_name: pro?.salon_name || pro?.full_name || null })
  } catch (err: unknown) {
    console.error('unsubscribe-contact error:', err instanceof Error ? err.message : String(err))
    return json({ error: 'An error occurred. Please try again.' }, 500)
  }
})
