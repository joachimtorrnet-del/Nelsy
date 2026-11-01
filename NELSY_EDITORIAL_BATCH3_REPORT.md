# Nelsy Editorial Batch 3 — QA Report

**Date:** 2026-10-21  
**Articles published:** 25 (articles 54–78)  
**Total articles in system:** 78  
**Build status:** ✅ PASSED

---

## Build verification

| Check | Result |
|---|---|
| TypeScript compilation (`tsc -b`) | ✅ Passed |
| Vite build | ✅ Passed |
| Articles discovered | ✅ 78 |
| Total prerender routes | ✅ 88 |
| All routes prerendered with title/h1/canonical/description | ✅ Verified |
| Sitemap generated | ✅ |
| No duplicate slugs | ✅ |

**Errors caught and fixed during this batch:**
1. `acrylic-application-step-by-step.tsx` — broken JSX tag `</html:parameter>` on line 69 (artifact of previous session write) → fixed to `</h2>`
2. `french-tip-nail-ideas.tsx` — unused `ArticleTip` import → removed

---

## Articles published in Batch 3

### Nail Inspo (5 articles)

| # | Title | Slug | Category |
|---|---|---|---|
| 1 | 50 Almond Nail Ideas for Every Style | `almond-nail-ideas` | nail-inspo |
| 2 | 50 Short Nail Ideas That Are Actually Worth Doing | `short-nail-ideas` | nail-inspo |
| 3 | 50 French Tip Nail Ideas Beyond the Classic | `french-tip-nail-ideas` | nail-inspo |
| 4 | 40 Minimalist Nail Ideas for a Clean, Modern Look | `minimalist-nail-ideas` | nail-inspo |
| 5 | Birthday Nail Ideas: 40 Designs to Celebrate in Style | `birthday-nail-ideas` | nail-inspo |

### Nail Technique & Retention (7 articles)

| # | Title | Slug | Category |
|---|---|---|---|
| 6 | How to Improve Nail Retention | `how-to-improve-nail-retention` | nail-education |
| 7 | Acrylic Nails Step by Step: Application Guide for Nail Techs | `acrylic-application-step-by-step` | nail-education |
| 8 | Gel-X Nail Application Step by Step | `gel-x-application-step-by-step` | nail-education |
| 9 | Builder Gel (BIAB) Application Guide | `builder-gel-application-guide` | nail-education |
| 10 | How to Build a Nail Apex | `how-to-build-nail-apex` | nail-education |
| 11 | Acrylic Bead Ratio Explained | `acrylic-bead-ratio-explained` | nail-education |
| 12 | Common Acrylic Nail Mistakes (And How to Fix Them) | `common-acrylic-mistakes` | nail-education |

### Pricing & Service Menu (5 articles)

| # | Title | Slug | Category |
|---|---|---|---|
| 13 | Nail Tech Price List Examples | `nail-tech-price-list-examples` | pricing-money |
| 14 | How to Create a Nail Service Menu | `how-to-create-nail-service-menu` | pricing-money |
| 15 | How to Price Nail Art Add-Ons | `how-to-price-nail-art-add-ons` | pricing-money |
| 16 | How to Calculate Your Nail Product Cost | `how-to-calculate-product-cost` | pricing-money |
| 17 | How to Increase Your Average Nail Appointment Value | `how-to-increase-appointment-value` | pricing-money |

### Client Growth & Retention (5 articles)

| # | Title | Slug | Category |
|---|---|---|---|
| 18 | How to Get More Nail Client Rebookings | `how-to-get-more-nail-client-rebookings` | get-clients |
| 19 | How to Increase Nail Client Retention | `how-to-increase-nail-client-retention` | get-clients |
| 20 | How to Build a Nail Client Referral Program | `how-to-build-nail-client-referral-program` | get-clients |
| 21 | How to Ask Nail Clients for Reviews | `how-to-ask-nail-clients-for-reviews` | get-clients |
| 22 | How to Get More Nail Clients Through Google Business Profile | `how-to-get-nail-clients-from-google-business-profile` | get-clients |

### Comparisons & Booking Platforms (3 articles)

| # | Title | Slug | Category |
|---|---|---|---|
| 23 | Fresha vs Booksy for Nail Techs | `fresha-vs-booksy-for-nail-techs` | comparisons |
| 24 | GlossGenius vs Fresha for Nail Techs | `glossgenius-vs-fresha-for-nail-techs` | comparisons |
| 25 | Best Scheduling Software for Solo Nail Techs | `best-scheduling-software-solo-nail-techs` | comparisons |

---

## Quality standards compliance

### Technique articles
- ✅ No fabricated curing times, chemical specs, or manufacturer instructions
- ✅ All technique articles defer to product manufacturer's guidance where specific product steps would apply
- ✅ `ArticleSteps` uses `body` property (not `description`) throughout

### Comparison articles
- ✅ No fabricated pricing, fees, features, ratings, or customer counts
- ✅ Each comparison article includes an explicit editorial note: "Specific pricing, fees, and features change over time — always verify on each platform's website before committing"
- ✅ Articles describe general positioning and fit, not invented specifics

### SEO and metadata
- ✅ All 25 articles have unique `seoTitle` and `seoDescription`
- ✅ All 25 articles have unique slugs (no duplicates)
- ✅ All articles use `publishedAt: '2026-10-21'`
- ✅ All articles include `toc`, `faq`, `relatedSlugs`, `heroImage` (CSS gradient), `tags`

### Internal links
- ✅ All articles include relevant internal links to related articles within the Nelsy Learn hub
- ✅ Comparison articles link between each other (`fresha-vs-booksy` ↔ `glossgenius-vs-fresha` ↔ `best-scheduling-software`)
- ✅ Client growth articles interlink (`rebookings` ↔ `retention` ↔ `referral` ↔ `reviews` ↔ `google-business`)

### No duplication
- ✅ No Batch 1 or Batch 2 topic duplication

---

## Cumulative article count: Batches 1–3

| Batch | Articles | Running total |
|---|---|---|
| Batch 1 | 28 | 28 |
| Batch 2 | 25 | 53 |
| Batch 3 | 25 | **78** |

---

**Status: COMPLETE. Do not generate Batch 4 yet.**
