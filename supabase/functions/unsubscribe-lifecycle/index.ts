// Public: a pro stops the trial activation emails (send-lifecycle-emails). Deploy with --no-verify-jwt.
//
// Accepts the profile id + HMAC token (see _shared/lifecycle-emails.ts, UNSUBSCRIBE_SECRET):
//   - POST /unsubscribe-lifecycle?p=<id>&t=<token>   RFC 8058 one-click (List-Unsubscribe-Post)
//   - POST { profile_id, token }                     from the /u/emails/:profileId page
//   - GET  ?p=&t=                                    redirects to that page, changes nothing
//     (link scanners prefetch GET URLs, so GET must never unsubscribe)
//
// Sets profiles.notification_preferences.lifecycle_emails = false (idempotent). The other keys are
// kept. The pro can switch the emails back on in Dashboard > Settings > Notification Settings.
import { serve } from 'https://deno.land/std@0.208.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { SITE_URL, verifyLifecycleUnsubscribeToken } from '../_shared/lifecycle-emails.ts'

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
  let profileId = url.searchParams.get('p') ?? ''
  let token = url.searchParams.get('t') ?? ''

  if (req.method === 'GET') {
    const target = UUID_RE.test(profileId) && TOKEN_RE.test(token)
      ? `${SITE_URL}/u/emails/${encodeURIComponent(profileId)}?t=${encodeURIComponent(token)}`
      : SITE_URL
    return new Response(null, { status: 303, headers: { Location: target, ...corsHeaders } })
  }
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  try {
    if ((req.headers.get('content-type') ?? '').includes('application/json')) {
      const body = await req.json().catch(() => ({})) as Record<string, unknown>
      if (typeof body.profile_id === 'string') profileId = body.profile_id
      if (typeof body.token === 'string') token = body.token
    }

    if (!UUID_RE.test(profileId) || !TOKEN_RE.test(token)) return json(INVALID, 400)
    if (!(await verifyLifecycleUnsubscribeToken(Deno.env.get('UNSUBSCRIBE_SECRET'), profileId, token))) {
      return json(INVALID, 400)
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('id, notification_preferences')
      .eq('id', profileId)
      .maybeSingle()
    // Valid token but account deleted: nothing left to email.
    if (!profile) return json({ ok: true })

    const prefs = profile.notification_preferences && typeof profile.notification_preferences === 'object'
      ? profile.notification_preferences as Record<string, unknown>
      : {}
    if (prefs.lifecycle_emails !== false) {
      const { error } = await supabase
        .from('profiles')
        .update({ notification_preferences: { ...prefs, lifecycle_emails: false } })
        .eq('id', profile.id)
      if (error) throw error
    }
    return json({ ok: true })
  } catch (err: unknown) {
    console.error('unsubscribe-lifecycle error:', err instanceof Error ? err.message : String(err))
    return json({ error: 'An error occurred. Please try again.' }, 500)
  }
})
