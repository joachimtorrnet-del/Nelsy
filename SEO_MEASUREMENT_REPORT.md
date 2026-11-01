# SEO Measurement Report

**Date:** 2026-10-20  
**Status:** All events implemented and build verified ✅

---

## Technical changes in this session

| Change | File | Status |
|--------|------|--------|
| `seo_cta_clicked` wired to all SEO page CTAs | All SEO pages + LandingPremium | ✅ |
| `SeoCTA` component created (reusable tracked CTA) | `src/components/SeoCTA.tsx` | ✅ |
| `SiteNav` updated to use `SeoCTA` | `src/components/layout/SiteNav.tsx` | ✅ |
| `SiteFooter` updated with full hub link grid | `src/components/layout/SiteFooter.tsx` | ✅ |
| Hardcoded `"price": "29.99"` removed from JSON-LD | `index.html` | ✅ |
| `og-image.png` created (1200×630 pink gradient) | `public/og-image.png` | ✅ |
| `trackSeoSignupStarted` refactored to use sessionStorage | `src/lib/analytics.ts` | ✅ |
| Attribution persists across SPA navigation | `src/App.tsx` | ✅ |

---

## Events implemented

### 1. `seo_landing_view`

**When:** Fires automatically on every known SEO route (via `PageviewTracker` in `App.tsx`).  
**How:** `trackSeoLandingView(pathname)` is called on every route change. If the pathname matches a known SEO route, it fires and stores the pathname in `sessionStorage`.

**Properties:**

| Property | Type | Example | Notes |
|----------|------|---------|-------|
| `landing_page` | string | `/nail-tech-deposits` | The route path |
| `page_type` | enum | `how_to` | See page type map below |
| `seo_cluster` | enum | `deposits_policies` | See cluster map below |
| `referrer` | string | `https://google.com/` | `document.referrer` at time of landing — reflects the *actual* external referrer (Google, social, etc.) |

**No PII.** Referrer is the domain, not a search query or user identifier.

---

### 2. `seo_cta_clicked`

**When:** Fires when a user clicks any Nelsy "Start free trial" or equivalent CTA on an SEO page.  
**How:** `trackSeoCTAClicked(pathname, position, label)` is called on the `onClick` of each CTA button.

**Properties:**

| Property | Type | Example | Notes |
|----------|------|---------|-------|
| `landing_page` | string | `/nail-tech-deposits` | The current route when clicked |
| `page_type` | enum | `how_to` | Same as `seo_landing_view` |
| `seo_cluster` | enum | `deposits_policies` | Same as `seo_landing_view` |
| `cta_position` | enum | `hero` \| `inline` \| `footer_cta` \| `nav` | Where on the page the CTA was |
| `cta_label` | string | `Start your 14-day free trial →` | The button text |

**CTAs instrumented per page:**

| Page | CTAs tracked |
|------|-------------|
| Homepage `/` | Nav "Start free →" (nav), Hero "Create my booking page →" (hero), HowItWorks section (inline), ProductBenefits (inline), Pricing section (inline), Annual plan (inline), FinalCTA (footer_cta), Comparison table (inline) |
| `/nail-tech-deposits` | Hero "Create my booking page →" (hero), Footer "Start your 14-day free trial →" (footer_cta) |
| `/instagram-booking-for-nail-techs` | Hero "Create my booking page →" (hero), Footer (footer_cta) |
| `/fresha-alternative-nail-techs` | Footer (footer_cta) |
| `/booksy-alternative-nail-techs` | Footer (footer_cta) |
| `/best-booking-app-for-nail-techs` | Footer (footer_cta) |
| `/tools/nail-tech-pricing-calculator` | Inline "Add your services to Nelsy →" (inline), Footer (footer_cta) |
| `/learn/how-to-get-more-nail-clients` | Footer (footer_cta) |
| `/learn/nail-tech-pricing-guide` | Footer (footer_cta) |
| `/tools/nail-tech-cancellation-policy-generator` | Footer (footer_cta) |
| `/learn/nail-tech-deposit-policy` | Footer (footer_cta) |
| SiteNav (all pages) | "Start free →" (nav) |

---

### 3. `seo_signup_started`

**When:** Fires automatically when the user navigates to `/onboarding`.  
**How:** `trackSeoSignupStarted()` is called in `PageviewTracker` when `pathname === '/onboarding'`. It reads the SEO source from `sessionStorage` and fires only if a source is present (i.e., user visited an SEO page earlier in the same browser session).

**Properties:**

| Property | Type | Example | Notes |
|----------|------|---------|-------|
| `source_page` | string | `/nail-tech-deposits` | The SEO page visited before /onboarding |
| `page_type` | enum | `how_to` | Derived from `source_page` |
| `seo_cluster` | enum | `deposits_policies` | Derived from `source_page` |

**No PII.** SessionStorage is cleared after reading.

---

### 4. Downstream events (already tracked — attribution preserved)

These events fire in the existing onboarding funnel. They are not modified. Attribution from SEO is maintained via sessionStorage → `seo_signup_started`, which fires before the existing onboarding events in the same pageview.

| Event | Where | Notes |
|-------|-------|-------|
| `$pageview` | All pages | PostHog auto-capture |
| `onboarding_*` | `/onboarding` | Existing tracking |
| `payment_*` | Booking flow | Existing tracking |

---

## Page type and cluster map

```
Page type:
  homepage      → /
  how_to        → /nail-tech-deposits, /instagram-booking-for-nail-techs,
                  /learn/how-to-get-more-nail-clients, /learn/nail-tech-pricing-guide
  alternative   → /fresha-alternative-nail-techs, /booksy-alternative-nail-techs
  comparison    → /best-booking-app-for-nail-techs
  tool          → /tools/nail-tech-pricing-calculator,
                  /tools/nail-tech-cancellation-policy-generator
  policy_guide  → /learn/nail-tech-deposit-policy

SEO cluster:
  core_booking        → /, /best-booking-app-for-nail-techs
  deposits_policies   → /nail-tech-deposits, /tools/nail-tech-cancellation-policy-generator,
                        /learn/nail-tech-deposit-policy
  instagram_growth    → /instagram-booking-for-nail-techs, /learn/how-to-get-more-nail-clients
  pricing             → /tools/nail-tech-pricing-calculator, /learn/nail-tech-pricing-guide
  competitor_alt      → /fresha-alternative-nail-techs, /booksy-alternative-nail-techs
```

---

## PostHog funnel to create

### Funnel 1: SEO → Trial (primary business funnel)

```
Step 1: seo_landing_view
Step 2: seo_cta_clicked       [optional — shows CTA click rate]
Step 3: seo_signup_started
Step 4: [your existing onboarding completion event]
```

**Filters to apply:**
- Filter by `seo_cluster` to see which content cluster converts best
- Filter by `landing_page` to see which individual page converts best
- Compare `page_type = tool` vs `page_type = how_to` vs `page_type = alternative`

### Funnel 2: CTA click rate by page

```
Step 1: seo_landing_view  where landing_page = '/nail-tech-deposits'
Step 2: seo_cta_clicked   where landing_page = '/nail-tech-deposits'
```

Repeat for each page to compare CTA click rates.

### Insight 1: Which SEO page generates the most trials?

```
Event: seo_signup_started
Group by: source_page
Time range: last 30 days
Sort: count desc
```

### Insight 2: Which cluster generates the most trials?

```
Event: seo_signup_started
Group by: seo_cluster
```

### Insight 3: CTA position effectiveness

```
Event: seo_cta_clicked
Group by: cta_position
Filter: page_type = 'how_to'
```

---

## Attribution flow — how it works

```
User lands on getnelsy.com/nail-tech-deposits (from Google)
  ↓
seo_landing_view fires:
  { landing_page: '/nail-tech-deposits', page_type: 'how_to',
    seo_cluster: 'deposits_policies', referrer: 'https://google.com/' }
  ↓
sessionStorage['nelsy_seo_source'] = '/nail-tech-deposits'
  ↓
User reads the page, clicks "Start your 14-day free trial"
  ↓
seo_cta_clicked fires:
  { landing_page: '/nail-tech-deposits', cta_position: 'footer_cta',
    cta_label: 'Start your 14-day free trial →', seo_cluster: 'deposits_policies' }
  ↓
React Router navigates to /onboarding (SPA navigation — document.referrer unchanged)
  ↓
seo_signup_started fires (reads sessionStorage):
  { source_page: '/nail-tech-deposits', page_type: 'how_to',
    seo_cluster: 'deposits_policies' }
  ↓
sessionStorage['nelsy_seo_source'] cleared
  ↓
Existing onboarding events fire as normal
```

**Why sessionStorage (not document.referrer):**  
React Router's SPA navigation does not change `document.referrer`. When the user navigates from `/nail-tech-deposits` to `/onboarding` via a `<Link>`, `document.referrer` at `/onboarding` still points to the *external* referring page (Google), not the previous React route. SessionStorage persists the SEO source through client-side navigation.

---

## Attribution limitations

| Limitation | Impact | Mitigation |
|------------|--------|------------|
| SessionStorage is cleared between browser sessions | Multi-session attribution is not captured (user visits, leaves, returns days later via a bookmark) | Acceptable for first-session attribution; add `localStorage` with TTL if cross-session attribution is needed |
| SessionStorage is unavailable in private browsing (some browsers) | A fraction of users will not be tracked | Code wraps in try/catch — graceful no-op |
| `seo_cta_clicked` doesn't fire for internal page navigations that aren't to `/onboarding` (e.g., clicking demo) | Demo visits from SEO pages aren't attributed | Add trackSeoCTAClicked to demo links if demo-to-signup tracking is needed |
| `referrer` is the external referrer, not the search query | Can't see which specific keyword brought the user | PostHog's referrer property combined with UTM params can identify Google organic; specific queries require Google Search Console |
| PostHog is a no-op when `VITE_PUBLIC_POSTHOG_KEY` is not set | Events don't fire in local development by default | Expected; configure the key in `.env.local` to test |
| If a user visits multiple SEO pages before converting, only the first one is stored | Last-page attribution is overwritten by next `trackSeoLandingView` call | `trackSeoLandingView` overwrites sessionStorage on each SEO page visit, so the *last* SEO page before `/onboarding` is attributed. This is "last-touch" within the session. |

---

## Identifying organic search traffic in PostHog

PostHog captures `$referrer` and `$referring_domain` automatically on pageview.

To filter for organic Google traffic:

```
Filter: $referring_domain contains 'google'
AND     UTM source is not set  (to exclude paid)
```

To build an SEO-specific dashboard:
1. Create a funnel: `seo_landing_view → seo_signup_started`
2. Filter by `$referring_domain contains 'google'` on the first step
3. Compare conversion rate by `seo_cluster`

---

## Comparing SEO page conversion rates

Conversion rate for an SEO page = `seo_cta_clicked / seo_landing_view` (CTA click rate)  
Deeper conversion = `seo_signup_started / seo_landing_view` (trial start rate)

**PostHog setup:**

1. Create a custom insight: Funnel
2. Step 1: `seo_landing_view`, broken down by `landing_page`
3. Step 2: `seo_cta_clicked`
4. Step 3: `seo_signup_started`

The funnel shows drop-off at each step per page, letting you compare:
- Which pages get traffic but don't get CTA clicks (content/CTA problem)
- Which pages get CTA clicks but not signups (onboarding page problem)
- Which pages go directly to signups (high-intent traffic)

---

## Build verification

All 11 public routes prerendered successfully. Per-page checks:

| Route | Title | H1 | Canonical | Description | og-image |
|-------|-------|----|-----------|-------------|---------|
| `/` | ✅ | ✅ | ✅ | ✅ | ✅ `/og-image.png` |
| `/nail-tech-deposits` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/instagram-booking-for-nail-techs` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/fresha-alternative-nail-techs` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/booksy-alternative-nail-techs` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/best-booking-app-for-nail-techs` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/tools/nail-tech-pricing-calculator` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/learn/how-to-get-more-nail-clients` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/learn/nail-tech-pricing-guide` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/tools/nail-tech-cancellation-policy-generator` | ✅ | ✅ | ✅ | ✅ | ✅ |
| `/learn/nail-tech-deposit-policy` | ✅ | ✅ | ✅ | ✅ | ✅ |

No duplicate meta description tags (verified). Each page: 1 canonical, 1 description, 1 H1.

---

*STOP — Wave 3 not started.*
