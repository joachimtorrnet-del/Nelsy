# Nelsy Editorial System Report

**Date:** 2026-10-20  
**Status:** Built, QA'd, deployed to production ✅

---

## Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/learn` | `LearnIndex` | Editorial hub: featured article, spotlight grid, search, category filters, full article grid |
| `/learn/:slug` | `ArticlePage` | Dynamic article template — looks up slug in registry, 404s to /learn if not found |

Existing routes `/learn/how-to-get-more-nail-clients`, `/learn/nail-tech-pricing-guide`, `/learn/nail-tech-deposit-policy` now render through `ArticlePage` via the dynamic `:slug` route.

---

## Component Architecture

```
src/
  lib/
    articles.ts                      # Data model, registry, helpers

  components/
    article/
      ArticleBodyComponents.tsx      # All reusable content block components
      ArticleTOC.tsx                 # Sticky sidebar TOC + share buttons
      ArticleCard.tsx                # Card component (featured / spotlight / grid)

  pages/
    learn/
      LearnIndex.tsx                 # /learn index page
      ArticlePage.tsx                # /learn/:slug template (imports all article modules)
      articles/
        how-to-get-more-nail-clients.tsx
        nail-tech-pricing-guide.tsx
        nail-tech-deposit-policy.tsx
```

### ArticleBodyComponents

| Component | Purpose |
|-----------|---------|
| `<ArticleCallout>` | Coloured callout box (tip / info / warning / success variants) |
| `<ArticleTip>` | Shorthand for `<ArticleCallout variant="tip">` |
| `<ArticleQuote>` | Blockquote with optional attribution |
| `<ArticleTable>` | Styled table with optional caption |
| `<ArticleChecklist>` | Green tick checklist |
| `<ArticleSteps>` | Numbered steps with pink circles |
| `<ArticleImage>` | Image with optional caption, optional full-bleed |
| `<ArticleCTAInline>` | Pink underlined inline link (internal or external) |
| `<ArticleComparison>` | Side-by-side comparison cards |
| `<ArticleCTABlock>` | End-of-article product CTA with mockup image |

### ArticleTOC

- Desktop: sticky sidebar, generated from `article.toc` array
- Mobile: collapsed "In this article" accordion
- Scroll highlighting via `IntersectionObserver`
- Share buttons: Copy link, X, WhatsApp, LinkedIn

### ArticleCard

Three size modes:
- `featured` — horizontal split, large, for the /learn hero
- `spotlight` — 16:9 image + content below, medium
- `grid` — compact, 3-column grid

Category gradient placeholders are used when `heroImage` is a CSS gradient string (no real photo yet).

---

## Content Model

```typescript
interface ArticleMeta {
  slug: string
  title: string
  seoTitle?: string          // Falls back to title
  excerpt: string
  seoDescription?: string    // Falls back to excerpt
  category: ArticleCategory
  tags: string[]
  heroImage: string          // Public path ('/og-image.png') or CSS gradient string
  heroImageAlt: string
  author: string
  authorRole: string
  publishedAt: string        // ISO date
  updatedAt?: string
  featured?: boolean         // Shows as lead article on /learn
  spotlight?: boolean        // Shows in spotlight row (max 3)
  toc: TocSection[]          // { id: string; label: string }[]
  relatedSlugs?: string[]    // Explicit related articles
  faq?: { q: string; a: string }[]
}

interface Article extends ArticleMeta {
  content: () => ReactNode   // JSX render function
}
```

Nine categories: `get-clients`, `instagram-content`, `pricing-money`, `booking-software`, `policies-clients`, `start-your-business`, `nail-education`, `nail-inspo`, `comparisons`.

---

## How to Add a New Article

**1. Create the content file:**

```
src/pages/learn/articles/your-article-slug.tsx
```

```tsx
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTable, ... } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'your-article-slug',
  title: '...',
  excerpt: '...',
  category: 'get-clients',
  tags: ['tag1', 'tag2'],
  heroImage: 'linear-gradient(...)',  // or '/path/to/image.png'
  heroImageAlt: '...',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-11-01',
  toc: [
    { id: 'section-1', label: 'Section title' },
    ...
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="section-1">
        <h2 className="font-serif text-2xl font-bold mb-4">Section title</h2>
        <p className="text-gray-700 leading-relaxed">...</p>
        <ArticleCallout variant="tip">...</ArticleCallout>
      </section>
    </div>
  ),
});

export {};
```

**2. Register the import in `ArticlePage.tsx`:**

```tsx
import '@/pages/learn/articles/your-article-slug';
```

**3. Register the import in `LearnIndex.tsx`:**

```tsx
import '@/pages/learn/articles/your-article-slug';
```

**4. Add to `scripts/prerender.mjs` ROUTES array:**

```js
'/learn/your-article-slug',
```

**5. Add to `public/sitemap.xml`.**

---

## SEO Behaviour

### Per-article JSON-LD schemas:
- `Article` — headline, description, datePublished, dateModified, author, publisher, image
- `BreadcrumbList` — Home › Learn › Article
- `FAQPage` — if `article.faq` has entries

### Meta tags (via `SEOMeta`):
- `<title>` — `article.seoTitle ?? article.title`
- `<meta name="description">` — `article.seoDescription ?? article.excerpt`
- `<link rel="canonical">` — `https://getnelsy.com/learn/:slug`
- `og:type` = `article`
- `og:image` — article hero if real image, else site default

### /learn index:
- WebPage JSON-LD
- BreadcrumbList
- Canonical: `https://getnelsy.com/learn`

### Prerendering:
All `/learn` routes are prerendered via `scripts/prerender.mjs`. Every prerendered page includes title, H1, canonical, description, and Article JSON-LD in static HTML for Googlebot.

---

## Mobile Behaviour

| Element | Mobile behaviour |
|---------|-----------------|
| Article hero | Single column — image stacks below text |
| TOC | Collapsed "In this article" accordion, top of body |
| Sidebar | Hidden; TOC rendered inline at top of content |
| Article grid | 1-column on mobile, 2-column on tablet, 3-column on desktop |
| Featured card | Single column, image above content |
| Category filters | Horizontally scrollable on narrow screens |

---

## Analytics

CTA tracking on article pages uses the existing `trackSeoCTAClicked` function:
- `ArticleCTABlock` fires `trackSeoCTAClicked(pathname, 'footer_cta', 'Start free →')` on click
- `seo_landing_view` fires via `PageviewTracker` in App.tsx for `/learn` and `/learn/:slug`

Article page type and cluster are mapped in `src/lib/analytics.ts`. New articles added to the `PAGE_TYPES` and `SEO_CLUSTERS` maps there will be auto-attributed.

---

## Files Changed

| File | Change |
|------|--------|
| `src/lib/articles.ts` | **New** — data model, registry, helpers |
| `src/components/article/ArticleBodyComponents.tsx` | **New** — 9 reusable content components |
| `src/components/article/ArticleTOC.tsx` | **New** — sticky TOC + share buttons |
| `src/components/article/ArticleCard.tsx` | **New** — card (featured/spotlight/grid) |
| `src/pages/learn/ArticlePage.tsx` | **New** — dynamic `/learn/:slug` template |
| `src/pages/learn/LearnIndex.tsx` | **New** — `/learn` editorial hub |
| `src/pages/learn/articles/how-to-get-more-nail-clients.tsx` | **New** — migrated article |
| `src/pages/learn/articles/nail-tech-pricing-guide.tsx` | **New** — migrated article |
| `src/pages/learn/articles/nail-tech-deposit-policy.tsx` | **New** — migrated article |
| `src/App.tsx` | Replaced 3 static learn routes with `/learn` + `/learn/:slug` |
| `src/index.css` | Added `.prose-article` typography styles |
| `public/sitemap.xml` | Added `/learn` URL |
| `scripts/prerender.mjs` | Added `/learn` to prerender routes |

---

## QA Results

| Check | Result |
|-------|--------|
| `/learn` — title, canonical, description | ✅ |
| `/learn/how-to-get-more-nail-clients` — Article JSON-LD | ✅ |
| `/learn/nail-tech-pricing-guide` — Article JSON-LD | ✅ |
| `/learn/nail-tech-deposit-policy` — Article JSON-LD | ✅ |
| All 3 articles — prerendered HTML, H1, canonical, description | ✅ |
| `/learn` — prerendered, indexable | ✅ |
| No duplicate meta tags | ✅ |
| Assets hash match (no broken JS) | ✅ |
| Sitemap updated | ✅ |
| Build TypeScript errors | ✅ (zero) |
| No regression to booking/Stripe/dashboard routes | ✅ |

---

## Notes

- The old standalone pages (`HowToGetMoreNailClients.tsx`, `NailTechPricingGuide.tsx`, `NailTechDepositPolicy.tsx`) remain in the filesystem but are no longer imported. They can be deleted once the new system is confirmed working in production.
- Article content is TSX (no MDX). No additional Vite plugins required.
- The system scales to 200+ articles with no architectural changes — just add content files and register imports.
- Real hero images: add a file to `/public/`, use the path in `heroImage`. CSS gradient strings are used as placeholders until real images exist.
