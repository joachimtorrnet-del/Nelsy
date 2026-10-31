import posthog from 'posthog-js';

// PostHog is initialized in main.tsx. This module is a typed wrapper.
// All calls are no-ops when PostHog key is not configured.

function isConfigured(): boolean {
  return !!import.meta.env.VITE_PUBLIC_POSTHOG_KEY;
}

export function track(event: string, props?: Record<string, unknown>) {
  if (!isConfigured()) return;
  posthog.capture(event, props);
}

export function identify(userId: string) {
  if (!isConfigured()) return;
  posthog.identify(userId);
}

// ── Public studio funnel ──────────────────────────────────────────────────────

export function trackStudioView(profileId: string) {
  track('public_nelsy_view', { profile_id: profileId });
}

export function trackServiceView(profileId: string, serviceId: string) {
  track('service_view', { profile_id: profileId, service_id: serviceId });
}

export function trackBookingStarted(profileId: string, serviceId: string) {
  track('booking_started', { profile_id: profileId, service_id: serviceId });
}

export function trackSlotSelected(profileId: string) {
  track('slot_selected', { profile_id: profileId });
}

export function trackBookingDetailsCompleted(profileId: string) {
  track('booking_details_completed', { profile_id: profileId });
}

export function trackPaymentStarted(profileId: string) {
  track('payment_started', { profile_id: profileId });
}

export function trackBookingCompleted(profileId: string) {
  track('booking_completed', { profile_id: profileId });
}

// ── PLG ───────────────────────────────────────────────────────────────────────

export function trackPlgCtaView(profileId: string) {
  track('nelsy_plg_cta_view', { profile_id: profileId });
}

export function trackPlgCtaClick(profileId: string) {
  track('nelsy_plg_cta_click', { profile_id: profileId });
}

// ── SEO acquisition funnel ────────────────────────────────────────────────────

type PageType = 'homepage' | 'how_to' | 'alternative' | 'comparison' | 'tool' | 'policy_guide' | 'article' | 'blog_index';
type SeoCluster = 'core_booking' | 'deposits_policies' | 'instagram_growth' | 'pricing' | 'competitor_alt' | 'nail_education' | 'nail_inspo' | 'get_clients' | 'start_business' | 'branding_growth' | 'policies_clients';
type CtaPosition = 'hero' | 'inline' | 'footer_cta' | 'nav';

const SEO_SESSION_KEY = 'nelsy_seo_source';

// Mapping from article category to seo_cluster
const CATEGORY_CLUSTER: Record<string, SeoCluster> = {
  'get-clients':          'get_clients',
  'instagram-content':    'instagram_growth',
  'pricing-money':        'pricing',
  'booking-software':     'core_booking',
  'policies-clients':     'policies_clients',
  'start-your-business':  'start_business',
  'nail-education':       'nail_education',
  'nail-inspo':           'nail_inspo',
  'comparisons':          'competitor_alt',
  'branding-growth':      'branding_growth',
};

const PAGE_META: Record<string, { page_type: PageType; seo_cluster: SeoCluster }> = {
  '/': { page_type: 'homepage', seo_cluster: 'core_booking' },
  '/blog': { page_type: 'blog_index', seo_cluster: 'get_clients' },
  '/nail-tech-deposits': { page_type: 'how_to', seo_cluster: 'deposits_policies' },
  '/instagram-booking-for-nail-techs': { page_type: 'how_to', seo_cluster: 'instagram_growth' },
  '/fresha-alternative-nail-techs': { page_type: 'alternative', seo_cluster: 'competitor_alt' },
  '/booksy-alternative-nail-techs': { page_type: 'alternative', seo_cluster: 'competitor_alt' },
  '/best-booking-app-for-nail-techs': { page_type: 'comparison', seo_cluster: 'core_booking' },
  '/tools/nail-tech-pricing-calculator': { page_type: 'tool', seo_cluster: 'pricing' },
  '/tools/nail-tech-cancellation-policy-generator': { page_type: 'tool', seo_cluster: 'deposits_policies' },
  '/tools/nail-tech-appointment-reminder-templates': { page_type: 'tool', seo_cluster: 'policies_clients' },
  '/tools': { page_type: 'tool', seo_cluster: 'core_booking' },
  '/learn/how-to-get-more-nail-clients': { page_type: 'how_to', seo_cluster: 'instagram_growth' },
  '/learn/nail-tech-pricing-guide': { page_type: 'how_to', seo_cluster: 'pricing' },
  '/learn/nail-tech-deposit-policy': { page_type: 'policy_guide', seo_cluster: 'deposits_policies' },
};

function getSeoPageMeta(pathname: string): { page_type: PageType; seo_cluster: SeoCluster } | null {
  if (PAGE_META[pathname]) return PAGE_META[pathname];
  // Blog articles: /blog/<slug>
  if (pathname.startsWith('/blog/')) return { page_type: 'article', seo_cluster: 'get_clients' };
  return null;
}

/**
 * Enriched version of getSeoPageMeta for blog articles, where category is known.
 */
export function trackArticleLandingView(
  pathname: string,
  slug: string,
  category: string,
) {
  if (!isConfigured()) return;
  const cluster = CATEGORY_CLUSTER[category] ?? 'get_clients';
  const referrer = typeof document !== 'undefined' ? document.referrer : '';
  safeSessionStorage('set', SEO_SESSION_KEY, pathname);
  track('seo_landing_view', {
    landing_page: pathname,
    page_type: 'article',
    seo_cluster: cluster,
    article_slug: slug,
    article_category: category,
    referrer,
  });
}

/**
 * Track a CTA click from a blog article, with article context.
 */
export function trackArticleCTAClicked(
  pathname: string,
  slug: string,
  category: string,
  cta_position: CtaPosition,
  cta_label: string,
) {
  const cluster = CATEGORY_CLUSTER[category] ?? 'get_clients';
  track('seo_cta_clicked', {
    landing_page: pathname,
    page_type: 'article',
    seo_cluster: cluster,
    article_slug: slug,
    article_category: category,
    cta_position,
    cta_label,
  });
}

function safeSessionStorage(op: 'get' | 'set' | 'clear', key?: string, value?: string): string | null {
  try {
    if (op === 'get' && key) return sessionStorage.getItem(key);
    if (op === 'set' && key && value !== undefined) { sessionStorage.setItem(key, value); }
    if (op === 'clear' && key) sessionStorage.removeItem(key);
  } catch {
    // sessionStorage unavailable (private browsing, blocked)
  }
  return null;
}

/**
 * Fire once per SEO page landing.
 * Stores the source page in sessionStorage so attribution survives SPA navigation
 * to /onboarding (where document.referrer still points to Google, not the last route).
 */
export function trackSeoLandingView(pathname: string) {
  const meta = getSeoPageMeta(pathname);
  if (!meta) return;
  const referrer = typeof document !== 'undefined' ? document.referrer : '';
  // Persist so attribution is readable when the user hits /onboarding
  safeSessionStorage('set', SEO_SESSION_KEY, pathname);
  track('seo_landing_view', {
    landing_page: pathname,
    page_type: meta.page_type,
    seo_cluster: meta.seo_cluster,
    referrer,
  });
}

/**
 * Fire when a user clicks a Nelsy CTA on an SEO page.
 * Call this on the onClick of every "Start free trial" / "Start free" button.
 */
export function trackSeoCTAClicked(
  pathname: string,
  cta_position: CtaPosition,
  cta_label: string,
) {
  const meta = getSeoPageMeta(pathname);
  if (!meta) return;
  track('seo_cta_clicked', {
    landing_page: pathname,
    page_type: meta.page_type,
    seo_cluster: meta.seo_cluster,
    cta_position,
    cta_label,
  });
}

/**
 * Read the sessionStorage-persisted SEO source and fire seo_signup_started.
 * Call this when the user lands on /onboarding.
 * Clears the stored source after reading so it doesn't pollute future sessions.
 */
export function trackSeoSignupStarted() {
  const source_page = safeSessionStorage('get', SEO_SESSION_KEY);
  if (!source_page) return; // user didn't arrive via an SEO page this session
  const meta = getSeoPageMeta(source_page);
  safeSessionStorage('clear', SEO_SESSION_KEY);
  track('seo_signup_started', {
    source_page,
    page_type: meta?.page_type ?? 'unknown',
    seo_cluster: meta?.seo_cluster ?? 'unknown',
  });
}

/** Expose the page meta map for use in components that need page_type/cluster. */
export function getSeoMeta(pathname: string) {
  return getSeoPageMeta(pathname);
}
