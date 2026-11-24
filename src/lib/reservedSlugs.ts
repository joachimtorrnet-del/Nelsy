/**
 * Studio URLs live at getnelsy.com/<slug>, next to the site's own pages.
 * A studio can't take a slug that a site page uses (or may use soon): it would be hidden by that page.
 * Keep in sync with RESERVED in scripts/generate-routes.mjs.
 */
export const RESERVED_SLUGS = new Set([
  'about', 'admin', 'affiliate', 'alternatives', 'api', 'app', 'assets', 'blog', 'booking-confirmed', 'compare',
  'contact', 'dashboard', 'features', 'for', 'forgot-password', 'glossary', 'help', 'learn', 'login', 'nelsy',
  'onboarding', 'onboarding-stripe', 'pricing', 'privacy', 'reset-password', 'settings', 'signup', 'stripe',
  'studio', 'support', 'terms', 'tools', 'use-cases', 'www',
]);

export function isReservedSlug(slug: string): boolean {
  return RESERVED_SLUGS.has(slug.toLowerCase());
}
