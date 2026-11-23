import type { Merchant } from '../types';

// Keep in sync with isIndexableStudio() in scripts/generate-routes.mjs (sitemap + prerender).
export const STUDIO_MIN_BIO = 40;

/** Only complete, real studios are worth indexing; test or empty pages stay out of Google. */
export function isStudioIndexable(m: Merchant): boolean {
  return m.services.length > 0
    && (m.bio ?? '').trim().length >= STUDIO_MIN_BIO
    && !!m.location?.trim()
    && !!m.logo_url;
}

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ') > 40 ? cut.lastIndexOf(' ') : cut.length)}…`;
}

function mainCategory(m: Merchant): string | undefined {
  const counts = new Map<string, number>();
  for (const s of m.services) if (s.category) counts.set(s.category, (counts.get(s.category) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
}

export function buildStudioSeo(m: Merchant) {
  const name = m.salon_name || m.name;
  const specialty = m.specialty?.trim() || (mainCategory(m) === 'Nails' ? 'Nail artist' : 'Beauty professional');
  const place = m.location?.trim();

  const title = place
    ? `${name}, ${specialty.toLowerCase()} in ${place}: book online`
    : `${name}: book online`;

  const serviceNames = m.services.slice(0, 3).map((s) => s.name).join(', ');
  const description = truncate(
    [m.bio?.trim(), serviceNames && `Services: ${serviceNames}.`, 'Book and pay online on Nelsy.'].filter(Boolean).join(' '),
    158,
  );

  const prices = m.services.map((s) => s.price).filter((p) => p > 0);
  const priceRange = prices.length
    ? `€${Math.min(...prices)}${Math.max(...prices) !== Math.min(...prices) ? `–€${Math.max(...prices)}` : ''}`
    : undefined;

  const sameAs = [
    m.instagram && `https://instagram.com/${m.instagram.replace(/^@/, '')}`,
    m.tiktok && `https://tiktok.com/@${m.tiktok.replace(/^@/, '')}`,
    m.website_url,
  ].filter(Boolean);

  const url = `https://getnelsy.com/${m.slug}`;
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': mainCategory(m) === 'Nails' ? 'NailSalon' : 'BeautySalon',
    '@id': url,
    name,
    url,
    description: m.bio?.trim() || undefined,
    image: m.cover_url || m.logo_url || undefined,
    ...(place && { address: { '@type': 'PostalAddress', addressLocality: place } }),
    ...(priceRange && { priceRange }),
    ...(sameAs.length && { sameAs }),
    makesOffer: m.services.slice(0, 20).map((s) => ({
      '@type': 'Offer',
      price: s.price,
      priceCurrency: 'EUR',
      itemOffered: { '@type': 'Service', name: s.name, ...(s.description && { description: s.description }) },
    })),
  };

  return { title, description, jsonLd, ogImage: m.cover_url || m.logo_url || undefined };
}
