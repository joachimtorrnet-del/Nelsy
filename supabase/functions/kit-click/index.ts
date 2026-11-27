// Shop my kit: records an outbound click on a kit item and returns where it goes
// (deploy with --no-verify-jwt: studio visitors are anonymous).
//
//   POST { id, ref? }        -> 200 { url }       (used by the studio page)
//   GET  ?id=<uuid>&ref=host -> 302 Location: url (plain link fallback)
//
// Only items visible in public_kit_items count (active, published studio, plan with
// the feature). record_kit_click() is SECURITY DEFINER and executable by service_role only.
//
// Privacy: no IP, user agent or cookie is stored. The per-visitor rate limit below keys
// on a SHA-256 of (IP + item) kept in this isolate's memory for one minute, never persisted.
// `ref` is the host of the page that sent the visitor to the studio (e.g. instagram.com).
import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...corsHeaders },
  })
}

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const HOST_RE = /^[a-z0-9.-]{1,253}$/

/** Keeps only a bare lowercase host ("www.instagram.com" -> "instagram.com"). */
function cleanHost(raw: unknown): string | null {
  if (typeof raw !== 'string' || !raw) return null
  let host = raw.trim().toLowerCase()
  try {
    if (host.includes('/')) host = new URL(host.includes('://') ? host : `https://${host}`).hostname
  } catch {
    return null
  }
  // www., m. and the link shims l. / lm. (Instagram, Facebook) collapse to the site itself.
  host = host.replace(/^(www|m|l|lm)\.(?=[^.]+\.[^.]+)/, '')
  return HOST_RE.test(host) ? host : null
}

// ── Per-visitor rate limit (memory only) ─────────────────────────────────────
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 10
const hits = new Map<string, { n: number; reset: number }>()

async function visitorKey(req: Request, itemId: string): Promise<string> {
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown'
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${ip}|${itemId}`))
  return Array.from(new Uint8Array(digest).slice(0, 12), (b) => b.toString(16).padStart(2, '0')).join('')
}

function allow(key: string): boolean {
  const now = Date.now()
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.reset <= now) hits.delete(k)
  }
  const entry = hits.get(key)
  if (!entry || entry.reset <= now) {
    hits.set(key, { n: 1, reset: now + WINDOW_MS })
    return true
  }
  entry.n += 1
  return entry.n <= MAX_PER_WINDOW
}

/** Defense in depth: the DB CHECK already enforces https. */
function safeDestination(url: unknown): string | null {
  if (typeof url !== 'string') return null
  try {
    const u = new URL(url)
    return u.protocol === 'https:' && !u.username && !u.password ? u.toString() : null
  } catch {
    return null
  }
}

async function resolve(req: Request, id: string, ref: unknown): Promise<string | null> {
  if (!UUID_RE.test(id)) return null
  const key = await visitorKey(req, id)
  if (allow(key)) {
    const { data, error } = await supabase.rpc('record_kit_click', { p_item_id: id, p_referrer_host: cleanHost(ref) })
    if (error) throw error
    return safeDestination(data)
  }
  // Over the per-visitor limit: still send the visitor on, just do not count it.
  const { data } = await supabase.from('public_kit_items').select('url').eq('id', id).maybeSingle()
  return safeDestination(data?.url)
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    if (req.method === 'GET') {
      const params = new URL(req.url).searchParams
      const url = await resolve(req, params.get('id') ?? '', params.get('ref'))
      if (!url) return json({ error: 'not_found' }, 404)
      return new Response(null, {
        status: 302,
        headers: { Location: url, 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer', ...corsHeaders },
      })
    }

    if (req.method === 'POST') {
      const body = await req.json().catch(() => ({})) as Record<string, unknown>
      const url = await resolve(req, typeof body.id === 'string' ? body.id : '', body.ref)
      if (!url) return json({ error: 'not_found' }, 404)
      return json({ url })
    }

    return json({ error: 'Method not allowed' }, 405)
  } catch (err) {
    console.error('kit-click error', err instanceof Error ? err.message : err)
    return json({ error: 'server_error' }, 500)
  }
})
