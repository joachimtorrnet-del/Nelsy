// Transactional email via Resend. No-op when RESEND_API_KEY is not set.
// The pure HTML helpers live in email-html.ts (importable from Node tests) and are re-exported here.
export { esc, row, layout } from './email-html.ts'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const FROM = 'Nelsy <hello@getnelsy.com>' // same sender as stripe-webhooks (verified in Resend)

/** Resolves true when Resend accepted the email, false otherwise. Never throws on HTTP errors. */
export async function sendEmail(to: string, subject: string, html: string): Promise<boolean> {
  if (!RESEND_API_KEY || !to) return false
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_API_KEY}` },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  })
  if (!res.ok) console.error(`[email] Resend ${res.status}: ${await res.text().catch(() => '')}`)
  return res.ok
}
