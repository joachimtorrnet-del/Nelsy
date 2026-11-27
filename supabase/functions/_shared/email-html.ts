// Pure HTML helpers for transactional emails. No Deno APIs here, so this file can be
// imported from Node tests (src/lib/__tests__) as well as from edge functions.

/** Client-entered text goes into HTML emails: escape it. */
export function esc(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function row(label: string, value: string, last = false): string {
  const border = last ? '' : 'border-bottom:1px solid #e5e7eb;'
  return `<tr><td style="color:#6b7280;padding:8px 0;${border}">${label}</td><td style="text-align:right;font-weight:600;color:#111827;padding:8px 0;${border}">${value}</td></tr>`
}

export function layout(title: string, intro: string, rows: string, footer = ''): string {
  return `
  <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#ffffff">
    <div style="text-align:center;margin-bottom:28px">
      <h1 style="font-size:24px;font-weight:700;color:#111827;margin:0 0 8px">${title}</h1>
      <p style="color:#6b7280;margin:0">${intro}</p>
    </div>
    <div style="background:#f9fafb;border-radius:16px;padding:24px;margin-bottom:24px">
      <table style="width:100%;border-collapse:collapse">${rows}</table>
    </div>
    ${footer}
    <p style="color:#9ca3af;font-size:12px;text-align:center;margin:24px 0 0">Sent by Nelsy</p>
  </div>`
}
