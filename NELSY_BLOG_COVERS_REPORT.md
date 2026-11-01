# Nelsy Blog Cover System — Implementation Report

## Generation approach

A Node.js script (`scripts/generate-blog-covers.mjs`) uses **Puppeteer** (already installed
for prerendering) to render one HTML page per article and screenshot it to PNG.

A single Puppeteer browser instance is reused across all 215 articles — no browser
restart per image. Total generation time: **~14 seconds** for 214 articles (~65ms/cover).

Fonts used are **system fonts only** (no network calls, works fully offline):
- Title: `Didot, "Bodoni MT", Georgia, "Times New Roman", serif` — editorial serif, built into macOS
- UI (category label + wordmark): `"Helvetica Neue", -apple-system, BlinkMacSystemFont, Arial, sans-serif`

---

## Files created

| File | Purpose |
|------|---------|
| `scripts/generate-blog-covers.mjs` | Generator script |
| `public/blog-covers/<slug>.png` × 215 | Generated cover images |
| `NELSY_BLOG_COVERS_REPORT.md` | This report |

---

## Files modified

| File | Change |
|------|--------|
| `src/components/article/ArticleCard.tsx` | Uses `<CoverImage>` (generated cover with gradient fallback on error) |
| `src/pages/blog/BlogArticlePage.tsx` | Uses generated cover as article hero + og:image |
| `package.json` | Added `generate:covers` and `generate:covers:force` npm scripts |

---

## Output directory

```
public/blog-covers/
  how-to-get-more-nail-clients.png        (31KB)
  nail-tech-pricing-guide.png             (37KB)
  100-nail-tech-content-ideas.png         (30KB)
  valentines-day-marketing-nail-techs.png (22KB)
  ... (215 total)
```

File sizes: 22–37KB per cover (1200×630 PNG). Total directory: ~6.4MB.

---

## Category color mapping

| Category | Background | Accent |
|----------|-----------|--------|
| `get-clients` | `#FDF0F7` | `#E8197A` |
| `instagram-content` | `#FFF0F5` | `#C4185E` |
| `pricing-money` | `#FFF8ED` | `#C26A00` |
| `booking-software` | `#EFF6FF` | `#2D5BE3` |
| `policies-clients` | `#F5FDF5` | `#16A34A` |
| `start-your-business` | `#FDF4FF` | `#9333EA` |
| `nail-education` | `#FFF1F1` | `#DC2626` |
| `nail-inspo` | `#FFF9F0` | `#D97706` |
| `comparisons` | `#F0FFFE` | `#0D9488` |
| `branding-growth` | `#FFF8F0` | `#EA580C` |

---

## Cover design anatomy

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                    ○  ○  ○  circles │
│  — GET CLIENTS          ← 13px uppercase, accent color              │
│                                                                      │
│  How to Get More                                                     │
│  Nail Clients: A        ← Didot/Georgia serif, 60px, dark           │
│  Practical Guide                                                     │
│                                                                      │
│                                                                      │
│                                                                      │
│  nelsy  |  getnelsy.com  ← 17px + 12px, bottom-left                │
└─────────────────────────────────────────────────────────────────────┘
```

Decorative element: three concentric circles top-right corner (opacity 4–14%, accent color),
clipped by overflow:hidden. Adds editorial visual balance without clutter.

Font size is automatically scaled by title character count:
- ≤32 chars → 72px
- ≤48 chars → 60px
- ≤64 chars → 50px
- ≤82 chars → 42px
- >82 chars → 36px

---

## Fallback logic

### Article cards (`ArticleCard.tsx`)
- Articles with a real editorial photo (`heroImage` starts with `/`) → use the photo
- All other articles → `<CoverImage>` renders `/blog-covers/<slug>.png`
- If the PNG fails to load (`onError`) → falls back to the existing category gradient

### Article hero (`BlogArticlePage.tsx`)
- Real editorial photo → use as-is (unchanged)
- No real photo → renders `/blog-covers/<slug>.png` with `loading="eager"`
- If PNG missing → `onError` applies the category gradient to the parent container

---

## OG integration

`BlogArticlePage.tsx` now sets `ogImage`:
- Real editorial photo → `https://getnelsy.com{article.heroImage}`
- No real photo → `https://getnelsy.com/blog-covers/{article.slug}.png`

All 215 articles have unique `og:image` URLs pointing to 1200×630 PNGs.

---

## Performance notes

- Covers are static PNG files served from `/blog-covers/` by Vite/Vercel as regular assets
- CDN-cached, zero runtime cost
- Per-file size: 22–37KB (well within acceptable range for OG images)
- Cards use `loading="lazy"` on cover images; article hero uses `loading="eager"`
- No impact on JS bundle size

---

## Future workflow

1. Create `src/pages/learn/articles/<new-slug>.tsx` with `registerArticle({ slug, title, category, ... })`
2. Run `npm run generate:covers` — only new articles without a cover file are generated
3. Run `npm run build` (prerender + deploy)

Use `npm run generate:covers:force` to regenerate all covers (e.g. after design changes).

---

## QA sample

| Article | Title length | Category | Notes |
|---------|------------|---------|-------|
| `how-to-get-more-nail-clients` | 45 chars | get-clients | 60px font, clean layout |
| `nail-tech-pricing-guide` | 24 chars | pricing-money | 72px font, dominant title |
| `100-nail-tech-content-ideas` | 33 chars | instagram-content | Numeric prefix renders cleanly |
| `valentines-day-marketing-nail-techs` | 37 chars | get-clients | Apostrophe in "Valentine's" handled |
| `winter-nail-ideas` | 18 chars | nail-inspo | Short title, very large type |
| `acrylic-application-step-by-step` | 38 chars | nail-education | "for Beginners" wraps cleanly |

All 215 covers generated with 0 render failures.
1 parse failure initially (double-quoted title with apostrophe) — fixed and regenerated.

---

## Acceptance criteria status

| Criterion | Status |
|----------|--------|
| All 215 articles have deterministic cover images | ✅ |
| Future articles get covers automatically | ✅ (run `generate:covers`) |
| Blog index uses generated covers | ✅ (via `ArticleCard`) |
| Featured/spotlight/related cards use them | ✅ (same `ArticleCard` component) |
| Article hero uses generated cover when no real image | ✅ |
| Unique `og:image` per article | ✅ |
| No broken image paths (fallback logic) | ✅ |
| No TypeScript errors | ✅ |
| Full build succeeds | ✅ |
