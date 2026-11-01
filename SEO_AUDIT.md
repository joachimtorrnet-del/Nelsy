# SEO Audit — getnelsy.com
Date: 2026-10-20

---

## Summary

getnelsy.com is a React 19 + React Router SPA with zero static HTML for SEO pages. Every page renders client-side. There is no robots.txt, no sitemap, no canonical tags, no Open Graph, no structured data, and the `<title>` is the same for every route. The site has significant foundational SEO gaps that must be fixed before any content strategy can work.

---

## Issues by category

---

### 1. Indexability

| # | Severity | File | Current | SEO consequence | Fix |
|---|----------|------|---------|-----------------|-----|
| 1.1 | **P0** | `index.html` | Single `<title>` and `<meta description>` served to ALL routes | Google sees the same title/description for `/`, `/onboarding`, `/dashboard`, `/terms`, studio pages | Implement per-route `<title>` and `<meta>` injection via `react-helmet-async` or equivalent |
| 1.2 | **P0** | `index.html` | No canonical tag on any page | Duplicate content risk across `www` / `non-www`, trailing slash variants | Add `<link rel="canonical">` per route |
| 1.3 | **P0** | `public/` | No `robots.txt` | Googlebot crawls everything including dashboard, onboarding, login, private booking data | Create `public/robots.txt` with `Disallow` for private routes |
| 1.4 | **P0** | `public/` | No `sitemap.xml` | Google has no map of public pages | Create `public/sitemap.xml` |
| 1.5 | **P0** | All routes | All content rendered by JavaScript, no SSR or prerendering | Google can render JS but public marketing pages have zero content in raw HTML response | Evaluate prerendering for `/` and future SEO pages |
| 1.6 | **P1** | `App.tsx:61` | `/:slug` catches ALL unknown paths including `/dashboard`, `/login` | Google may index random 404-like paths as valid studio pages | Keep `/:slug` last, add 404 fallback |

---

### 2. robots.txt

| # | Severity | Current | Consequence | Fix |
|---|----------|---------|-------------|-----|
| 2.1 | **P0** | Does not exist | Entire site crawled including private routes | Create with Disallow for `/dashboard`, `/onboarding`, `/login`, `/onboarding-stripe`, `/stripe`, `/booking-confirmed`, `/forgot-password`, `/reset-password`, `/onboarding/success` |

---

### 3. sitemap.xml

| # | Severity | Current | Consequence | Fix |
|---|----------|---------|-------------|-----|
| 3.1 | **P0** | Does not exist | Googlebot discovers pages only through links | Create with public marketing routes only |

---

### 4. Meta tags

| # | Severity | File | Current | Consequence | Fix |
|---|----------|------|---------|-------------|-----|
| 4.1 | **P0** | `index.html` | `<title>Nelsy — The booking platform for nail artists</title>` hardcoded | Same title on every route; "nail artists" is less specific than "nail techs" | Per-route titles with target keywords |
| 4.2 | **P0** | `index.html` | `<meta name="description" content="Turn your Instagram into a professional booking system. Deposits, calendar, analytics — in 10 minutes.">` hardcoded | Same description on every page | Per-route descriptions |
| 4.3 | **P0** | All pages | No `<meta name="robots">` on private routes | Dashboard, login, onboarding may be indexed | Add `noindex,nofollow` to all private routes |
| 4.4 | **P1** | `index.html` | No Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) | Poor social sharing preview; no Facebook/WhatsApp/iMessage preview | Add full OG block per route |
| 4.5 | **P1** | `index.html` | No Twitter Card tags | Poor Twitter/X sharing | Add `twitter:card`, `twitter:title`, etc. |
| 4.6 | **P2** | `index.html` | Favicon is `vite.svg` (default Vite icon) | Poor brand trust, wrong icon in Google results | Replace with Nelsy favicon |

---

### 5. H1 / Heading hierarchy

| # | Severity | File | Current | Consequence | Fix |
|---|----------|------|---------|-------------|-----|
| 5.1 | **P0** | `LandingPremium.tsx:82` | H1 = `"Your All-in-One Link in Bio for Nail Techs."` | "Link in Bio" is not a high-intent booking keyword; Google may classify the page as a social tool, not a booking app | Update H1 to target primary keyword: "The Booking App Built for Nail Techs" |
| 5.2 | **P1** | `LandingPremium.tsx` | H2s exist but no page-level semantic structure visible in raw HTML (JS-rendered) | Googlebot may not associate H2s with the page context | Ensure headings are in prerendered HTML |
| 5.3 | **P2** | `LandingPremium.tsx` | No H2 targeting secondary keywords (deposits, payments, Instagram, no-shows) | Missed keyword coverage in heading structure | Add keyword-aligned H2s naturally |

---

### 6. Structured data

| # | Severity | Current | Consequence | Fix |
|---|----------|---------|-------------|-----|
| 6.1 | **P1** | No JSON-LD anywhere | No rich results eligibility; Google has no structured signal about what Nelsy is | Add Organization + SoftwareApplication JSON-LD to homepage |
| 6.2 | **P2** | No WebSite JSON-LD | No sitelinks search box eligibility | Add WebSite with SearchAction |
| 6.3 | **P2** | No BreadcrumbList on any page | No breadcrumb rich results | Add to SEO content pages when built |

---

### 7. Internal linking

| # | Severity | File | Current | Consequence | Fix |
|---|----------|------|---------|-------------|-----|
| 7.1 | **P1** | `LandingPremium.tsx` | Footer links: Privacy, Terms, Contact, Demo | No links to any future SEO pages | Add links to commercial SEO pages when built |
| 7.2 | **P1** | All pages | Navigation has only Login + Start free | Zero crawlable links to SEO cluster pages | Add nav/footer links to key pages |
| 7.3 | **P2** | `LandingPremium.tsx:733` | Footer Demo link → `/studio/maya` | Studio pages of real users shouldn't be indexed | OK for demo, but real studio pages need `noindex` |

---

### 8. Crawlability / technical

| # | Severity | File | Current | Consequence | Fix |
|---|----------|------|---------|-------------|-----|
| 8.1 | **P0** | All | SPA with no SSR — all HTML arrives empty `<div id="root"></div>` | Google can render JS but first-contentful paint for Googlebot is delayed; content may be missed on crawl budget | Implement prerendering for public routes using `vite-plugin-prerender` or similar |
| 8.2 | **P1** | `vercel.json` | Unknown — need to verify redirect rules | Potential www/non-www duplicate content | Verify and add canonical redirect in Vercel config |
| 8.3 | **P1** | All | No trailing slash consistency enforced | `/nail-tech-booking-app` and `/nail-tech-booking-app/` may both be indexed | Enforce in Vercel config |
| 8.4 | **P2** | `dist/assets/index-*.js` | Single 1.5MB JS bundle (448KB gzipped) | Slow FCP on mobile; negative Core Web Vitals impact on marketing pages | Code split — separate vendor/landing/dashboard chunks |

---

### 9. Unsupported claims

| # | Severity | File | Claim | Action |
|---|----------|------|-------|--------|
| 9.1 | **P1** | `Landing.tsx:64` | `"500+ nail techs already earning more"` | **Remove** — this page is `/landing-old` (not the live homepage) but is a live route. Either remove the route or noindex it |
| 9.2 | **P0** | `Landing.tsx` | Full old landing with fabricated social proof | Route `/landing-old` is publicly accessible; add `noindex` or redirect to `/` |

LandingPremium (live homepage) is **clean** — no fake testimonials, no unsupported stats found.

---

### 10. Private route exposure

| # | Severity | Route | Risk |
|---|----------|-------|------|
| 10.1 | **P0** | `/dashboard/*` | Should be `noindex,nofollow` |
| 10.2 | **P0** | `/onboarding`, `/onboarding/success` | Should be `noindex,nofollow` |
| 10.3 | **P0** | `/login`, `/forgot-password`, `/reset-password` | Should be `noindex,nofollow` |
| 10.4 | **P0** | `/onboarding-stripe`, `/stripe/return` | Should be `noindex,nofollow` |
| 10.5 | **P1** | `/studio/:slug` | Real user studio pages are public booking pages — should they be indexed? They expose user business names, service lists, availability. Recommended: allow indexing but add per-page canonical + noindex option for users |
| 10.6 | **P1** | `/booking-confirmed` | Transactional page, should be `noindex` |

---

### 11. Images

| # | Severity | File | Current | Fix |
|---|----------|------|---------|-----|
| 11.1 | **P2** | `LandingPremium.tsx:126` | `alt="Nelsy booking page preview"` | Acceptable but generic |
| 11.2 | **P2** | `LandingPremium.tsx:422-425` | `alt` attributes present but generic (`"Services page preview"`) | Improve with keyword context: `"Nelsy nail tech booking page — services and pricing"` |
| 11.3 | **P2** | `public/vite.svg` | Default Vite icon served as favicon | Replace with Nelsy branded favicon |

---

### 12. Page speed / bundle

| # | Severity | Current | Impact | Fix |
|---|----------|---------|--------|-----|
| 12.1 | **P1** | 1.5MB single JS bundle | LCP on marketing pages delayed behind JS parse time | Lazy-load dashboard, onboarding, studio routes; keep landing bundle small |
| 12.2 | **P2** | Framer Motion bundled for all routes | Adds ~40KB to landing bundle | Import only what's needed |

---

### 13. www vs non-www

| # | Severity | Current | Fix |
|---|----------|---------|-----|
| 13.1 | **P1** | Not verified in `vercel.json` | Check Vercel project settings — ensure `www.getnelsy.com` redirects to `getnelsy.com` (or vice versa) with 301, not both indexed |

---

## Priority order

1. **P0 — Do immediately (before any content)**
   - robots.txt (block private routes)
   - sitemap.xml (public routes only)
   - Per-route title + meta description (`react-helmet-async`)
   - Per-route canonical tags
   - noindex on all private routes
   - Fix H1 on homepage to target "nail tech booking app"
   - noindex `/landing-old`

2. **P1 — Do as part of first SEO build**
   - Open Graph + Twitter Card meta
   - JSON-LD structured data (Organization + SoftwareApplication)
   - Fix bundle size (code splitting)
   - Prerender public marketing pages
   - Internal linking from homepage to SEO cluster

3. **P2 — Ongoing improvements**
   - Image alt text improvement
   - Favicon branding
   - Breadcrumb structured data
   - Trailing slash enforcement
