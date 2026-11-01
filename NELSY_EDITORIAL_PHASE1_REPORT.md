# Nelsy Editorial Phase 1 — Mini-Site Report

**Date:** 2026-10-21  
**Status:** ✅ Complete  
**Scope:** Migrate `/learn` → `/blog`; build premium editorial homepage; update all SEO metadata

---

## What Was Built

### 1. New `/blog` editorial homepage (`src/pages/blog/BlogIndex.tsx`)

Premium editorial destination "The Nail Business Edit":

- **Hero:** Gradient background, "NELSY BLOG" eyebrow label, H1 "The Nail Business Edit", tagline
- **Category quick-nav:** 6 category pills scrolling to the filtered view
- **Featured story section:** Full-width `ArticleCard` (featured size) for the article with `featured: true`
- **Editors' Picks:** 3-column spotlight row for articles with `spotlight: true`
- **6 editorial sections:** One per category (get-clients, instagram-content, pricing-money, nail-education, nail-inspo, start-your-business), each with badge, description, 6-article grid, "View all" button
- **Search + all-articles section:** Search input, all category pills, full article grid (215 articles)
- **Free tools cross-links:** 3 tool links at page bottom
- **SEO:** `canonical="/blog"`, WebPage + BreadcrumbList JSON-LD

### 2. New `/blog/:slug` article page (`src/pages/blog/BlogArticlePage.tsx`)

Replaces `ArticlePage` for canonical article URLs:

- **Canonical:** `/blog/:slug` (was `/learn/:slug`)
- **Breadcrumb UI:** Home → Blog → Category → Article
- **JSON-LD:** Article schema + BreadcrumbList with `/blog` URLs + FAQPage (when `article.faq` is present)
- **Hero:** 2-column layout (text left, hero image/gradient right)
- **Body:** ArticleTOC sidebar + `article.content()` + `ArticleCTABlock` + FAQ accordion
- **Related articles:** 3-column grid using `getRelatedArticles()`
- **Back to blog:** Footer link to `/blog`

### 3. Route migration (`src/App.tsx`)

| Route | Before | After |
|---|---|---|
| `/blog` | — | `<BlogIndex />` (new) |
| `/blog/:slug` | — | `<BlogArticlePage />` (new) |
| `/learn` | `<LearnIndex />` | `<Navigate to="/blog" replace />` |
| `/learn/:slug` | `<ArticlePage />` | `<LearnArticleRedirect />` → `/blog/:slug` |

`/learn` and `/learn/:slug` remain live as permanent redirects — no SEO equity lost.

### 4. Article card links (`src/components/article/ArticleCard.tsx`)

All `to` props updated: `/learn/${slug}` → `/blog/${slug}` across all 3 card variants (featured, spotlight, grid).

### 5. Script updates (`scripts/generate-routes.mjs`)

- `STATIC_SEO_ROUTES`: `/learn` → `/blog` (priority `0.9`, changefreq `weekly`)
- Article route paths: `/learn/${slug}` → `/blog/${slug}`
- Sitemap and prerender manifest now emit 215 `/blog/` article URLs

### 6. Footer links (`src/components/layout/SiteFooter.tsx`)

3 hardcoded article links updated to `/blog/`:
- `/learn/how-to-get-more-nail-clients` → `/blog/how-to-get-more-nail-clients`
- `/learn/nail-tech-pricing-guide` → `/blog/nail-tech-pricing-guide`
- `/learn/nail-tech-deposit-policy` → `/blog/nail-tech-deposit-policy`

---

## SEO Checklist

- ✅ Canonical: all article pages use `canonical="/blog/:slug"`
- ✅ Blog index canonical: `canonical="/blog"`
- ✅ JSON-LD Article schema URLs: `https://getnelsy.com/blog/:slug`
- ✅ JSON-LD BreadcrumbList position 2: `https://getnelsy.com/blog`
- ✅ Sitemap: 215 `/blog/` article URLs + `/blog` index
- ✅ Prerender routes: `/blog` + 215 `/blog/:slug` routes
- ✅ Redirects: `/learn` → `/blog`, `/learn/:slug` → `/blog/:slug` (React Router `replace`)
- ✅ Internal links (ArticleCard, SiteFooter): all point to `/blog/`
- ✅ Open Graph: `ogType="article"` on article pages, `ogImage` from `heroImage` where available

---

## Featured / Spotlight Articles

Articles with `featured: true` or `spotlight: true` already existed in the library — no new flags needed:

| Slug | Type |
|---|---|
| `how-to-get-more-nail-clients` | featured |
| `nail-tech-pricing-guide` | spotlight |
| `nail-tech-cancellation-policy` | spotlight |
| `best-booking-apps-for-nail-techs-2026` | spotlight |
| `how-to-move-from-instagram-dms-to-online-booking` | spotlight |

---

## Constraints Respected

- ✅ No new articles created (215 article count unchanged)
- ✅ Global header (SiteNav) not redesigned
- ✅ Homepage/landing page (LandingPremium) not touched
- ✅ Stripe, Supabase, booking, onboarding, dashboard, auth and payment logic not touched
- ✅ LearnIndex and ArticlePage preserved (not deleted — still importable)
- ✅ No new free tools created

---

## Files Changed

| File | Change |
|---|---|
| `src/pages/blog/BlogIndex.tsx` | **Created** — new editorial homepage |
| `src/pages/blog/BlogArticlePage.tsx` | **Created** — new canonical article page |
| `src/App.tsx` | Added `/blog` routes + `/learn` redirects |
| `src/components/article/ArticleCard.tsx` | Updated all link `to` props to `/blog/` |
| `src/components/layout/SiteFooter.tsx` | Updated 3 hardcoded `/learn/` links |
| `scripts/generate-routes.mjs` | `/blog` in static routes + article paths |

---

*Report generated: 2026-10-21*
