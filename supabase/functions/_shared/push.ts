// Push notifications to pros (Nelsy app) through Firebase Cloud Messaging HTTP v1.
// iOS devices are reached through FCM too (APNs key uploaded in the Firebase console).
//
// Safety rules (every caller relies on them):
//  - notifyPro() NEVER throws and never blocks on anything but its own fetches.
//    Call it AFTER the booking / payment / email logic, inside the caller's flow.
//  - Nothing is attempted unless the secret PUSH_ENABLED is "true" (or "1") AND
//    FCM_SERVICE_ACCOUNT holds the Firebase service account JSON.
//  - The pro's per-type toggles (profiles.notification_preferences.push_*) are honored.
//  - It only reads profiles / push_tokens, and only deletes tokens FCM reports as dead.
//    It never touches bookings, balances, transactions or orders.
//
// Setup: docs/mobile/push-notifications.md
import { fcmMessage, pushAllowed, pushFeatureEnabled } from './push-messages.ts'
import type { PushMessage } from './push-messages.ts'

export * from './push-messages.ts'

// Callers use different supabase-js versions, so keep this structural.
// deno-lint-ignore no-explicit-any
type SupabaseClient = any

interface ServiceAccount {
  project_id: string
  client_email: string
  private_key: string
  token_uri?: string
}

let cachedToken: { value: string; exp: number } | null = null

function serviceAccount(): ServiceAccount | null {
  const raw = Deno.env.get('FCM_SERVICE_ACCOUNT')
  if (!raw) return null
  try {
    const sa = JSON.parse(raw) as ServiceAccount
    return sa.project_id && sa.client_email && sa.private_key ? sa : null
  } catch {
    console.error('[push] FCM_SERVICE_ACCOUNT is not valid JSON')
    return null
  }
}

function b64url(data: Uint8Array | string): string {
  const bytes = typeof data === 'string' ? new TextEncoder().encode(data) : data
  let bin = ''
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function pemToDer(pem: string): ArrayBuffer {
  const body = pem.replace(/-----[^-]+-----/g, '').replace(/\s+/g, '')
  const bin = atob(body)
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out.buffer
}

/** OAuth2 access token for FCM, from a self-signed service account JWT (RS256). Cached ~55 min. */
async function accessToken(sa: ServiceAccount): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  if (cachedToken && cachedToken.exp - 60 > now) return cachedToken.value

  const tokenUri = sa.token_uri ?? 'https://oauth2.googleapis.com/token'
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claims = b64url(JSON.stringify({
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/firebase.messaging',
    aud: tokenUri,
    iat: now,
    exp: now + 3600,
  }))
  const key = await crypto.subtle.importKey(
    'pkcs8',
    pemToDer(sa.private_key),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = new Uint8Array(await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(`${header}.${claims}`)))
  const jwt = `${header}.${claims}.${b64url(sig)}`

  const res = await fetch(tokenUri, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  })
  if (!res.ok) throw new Error(`oauth ${res.status}`)
  const json = await res.json() as { access_token: string; expires_in?: number }
  cachedToken = { value: json.access_token, exp: now + (json.expires_in ?? 3600) }
  return json.access_token
}

/**
 * The pro's notification_preferences, used to pick which message to build.
 * Returns null (= all on) when push is off or on any error, so it costs nothing until enabled.
 */
export async function proPushPrefs(supabase: SupabaseClient, profileId: string | null | undefined): Promise<unknown> {
  try {
    if (!profileId || !pushFeatureEnabled(Deno.env.get('PUSH_ENABLED'))) return null
    const { data } = await supabase.from('profiles').select('notification_preferences').eq('id', profileId).maybeSingle()
    return data?.notification_preferences ?? null
  } catch {
    return null
  }
}

/**
 * Sends `message` to every device of the pro, if push is enabled and the pro allows this type.
 * Resolves the number of devices reached. Never throws.
 */
export async function notifyPro(supabase: SupabaseClient, profileId: string | null | undefined, message: PushMessage | null): Promise<number> {
  try {
    if (!message || !profileId) return 0
    if (!pushFeatureEnabled(Deno.env.get('PUSH_ENABLED'))) return 0
    const sa = serviceAccount()
    if (!sa) return 0

    const [{ data: profile }, { data: tokens }] = await Promise.all([
      supabase.from('profiles').select('notification_preferences').eq('id', profileId).maybeSingle(),
      supabase.from('push_tokens').select('id, token').eq('profile_id', profileId),
    ])
    if (!pushAllowed(profile?.notification_preferences, message.kind)) return 0
    if (!Array.isArray(tokens) || tokens.length === 0) return 0

    const bearer = await accessToken(sa)
    const url = `https://fcm.googleapis.com/v1/projects/${encodeURIComponent(sa.project_id)}/messages:send`
    let sent = 0
    await Promise.all(tokens.map(async (t: { id: string; token: string }) => {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { Authorization: `Bearer ${bearer}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(fcmMessage(t.token, message)),
          signal: AbortSignal.timeout(5000),
        })
        if (res.ok) {
          sent++
          return
        }
        const text = await res.text().catch(() => '')
        // Uninstalled app or rotated token: drop it so we stop trying.
        if (res.status === 404 || text.includes('UNREGISTERED') || text.includes('registration-token-not-registered')) {
          await supabase.from('push_tokens').delete().eq('id', t.id)
        } else {
          console.error(`[push] FCM ${res.status}: ${text.slice(0, 200)}`)
        }
      } catch (err) {
        console.error('[push] send failed:', err instanceof Error ? err.message : String(err))
      }
    }))
    return sent
  } catch (err) {
    console.error('[push] notifyPro failed (non-blocking):', err instanceof Error ? err.message : String(err))
    return 0
  }
}
