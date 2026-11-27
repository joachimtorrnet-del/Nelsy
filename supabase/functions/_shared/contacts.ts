// Contacts list (Creator plan): shared by claim-free-resource, unsubscribe-contact
// and product-orders.ts. Everything here runs with the service_role client.
//
// Unsubscribe links carry an HMAC-SHA256 token over the contact id, keyed with the
// UNSUBSCRIBE_SECRET env var. Without the secret, no link can be minted or verified.
import { esc } from './email.ts'
function appUrl(): string {
  return (Deno.env.get('APP_URL') ?? 'https://getnelsy.com').replace(/\/+$/, '')
}

// deno-lint-ignore no-explicit-any
type SupabaseClient = any

export type ContactSource = 'free_resource' | 'product_purchase' | 'booking'

export interface ContactInput {
  profileId: string
  email: string
  firstName?: string | null
  source: ContactSource
  sourceRef?: string | null
  consent?: boolean
  consentText?: string | null
}

/** Inserts or merges a contact (upsert_contact RPC). Never downgrades consent. Returns the id or null. */
export async function upsertContact(supabase: SupabaseClient, input: ContactInput): Promise<string | null> {
  const { data, error } = await supabase.rpc('upsert_contact', {
    p_profile_id: input.profileId,
    p_email: input.email,
    p_first_name: input.firstName ?? null,
    p_source: input.source,
    p_source_ref: input.sourceRef ?? null,
    p_consent: input.consent === true,
    p_consent_text: input.consent === true ? (input.consentText ?? null) : null,
  })
  if (error) {
    console.error('[contacts] upsert_contact failed:', error.message)
    return null
  }
  return typeof data === 'string' ? data : null
}

/** Exact wording of the opt-in checkbox. Stored on the contact as proof of consent. */
export function consentText(studioName: string): string {
  return `Send me emails from ${studioName}`.slice(0, 300)
}

// ── HMAC helpers ─────────────────────────────────────────────────────────────

const encoder = new TextEncoder()

function secret(): string | null {
  const s = Deno.env.get('UNSUBSCRIBE_SECRET')
  return s && s.length >= 16 ? s : null
}

async function hmac(key: string, message: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey('raw', encoder.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(message)))
  let bin = ''
  for (const b of sig) bin += String.fromCharCode(b)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function unsubscribeToken(contactId: string): Promise<string | null> {
  const key = secret()
  return key ? await hmac(key, `unsub:v1:${contactId}`) : null
}

export async function verifyUnsubscribeToken(contactId: string, token: string): Promise<boolean> {
  const expected = await unsubscribeToken(contactId)
  return !!expected && timingSafeEqual(expected, token)
}

/**
 * Opaque, non-reversible rate-limit key for a raw value (IP, email). Keyed with the
 * same secret so bucket names never contain personal data. Falls back to a plain
 * SHA-256 when the secret is missing (rate limiting keeps working).
 */
export async function rateKey(value: string): Promise<string> {
  const key = secret()
  if (key) return (await hmac(key, `rl:v1:${value}`)).slice(0, 32)
  const digest = new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(`rl:v1:${value}`)))
  return Array.from(digest.slice(0, 16), (b) => b.toString(16).padStart(2, '0')).join('')
}

// ── Unsubscribe link in emails ───────────────────────────────────────────────

export interface UnsubscribeLinks {
  /** Page the contact opens from the email (one click on "Unsubscribe" there). */
  pageUrl: string
  /** RFC 8058 one-click endpoint for the List-Unsubscribe header (POST). */
  oneClickUrl: string | null
}

export async function unsubscribeLinks(contactId: string): Promise<UnsubscribeLinks | null> {
  const token = await unsubscribeToken(contactId)
  if (!token) {
    console.error('[contacts] UNSUBSCRIBE_SECRET is not set (or shorter than 16 chars): email sent without unsubscribe link')
    return null
  }
  const qs = `c=${encodeURIComponent(contactId)}&t=${encodeURIComponent(token)}`
  const fnBase = (Deno.env.get('SUPABASE_URL') ?? '').replace(/\/+$/, '')
  return {
    pageUrl: `${appUrl()}/u/${encodeURIComponent(contactId)}?t=${encodeURIComponent(token)}`,
    oneClickUrl: fnBase ? `${fnBase}/functions/v1/unsubscribe-contact?${qs}` : null,
  }
}

/** Email headers that let Gmail / Apple Mail show their native "Unsubscribe" button. */
export function unsubscribeHeaders(links: UnsubscribeLinks | null): Record<string, string> | undefined {
  if (!links?.oneClickUrl) return undefined
  return {
    'List-Unsubscribe': `<${links.oneClickUrl}>`,
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
  }
}

/** Footer line appended to every email sent to a contact. */
export function unsubscribeFooter(links: UnsubscribeLinks | null, studioName: string): string {
  if (!links) return ''
  return `<p style="color:#9ca3af;font-size:12px;text-align:center;margin:20px 0 0">You get this email because you asked for something from ${esc(studioName)} on Nelsy. <a href="${esc(links.pageUrl)}" style="color:#6b7280;text-decoration:underline">Unsubscribe</a></p>`
}
