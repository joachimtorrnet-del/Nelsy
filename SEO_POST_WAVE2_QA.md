# SEO + Conversion QA — Post Wave 2

**Date:** 2026-10-20  
**Scope:** All 10 public SEO routes (homepage + 4 Wave 1 + 6 Wave 2)  
**Business objective:** Maximize organic paying customers per month — not rankings as an end goal.

---

## Bug fixed during this QA

**Duplicate `<meta name="description">` tags** — `index.html` had a hardcoded default description that appeared in every prerendered page alongside the react-helmet-async injected one. This meant every sub-page had 2 description tags. Google's behavior on duplicates is undefined. Fixed: removed the default from `index.html`. Each page now has exactly 1 `name="description"` tag.

---

## SEO analytics tracking implemented

Three new events added to `src/lib/analytics.ts`:

| Event | When it fires | Key properties |
|-------|--------------|----------------|
| `seo_landing_view` | Every visit to a known SEO route | `landing_page`, `page_type`, `seo_cluster`, `referrer` |
| `seo_cta_clicked` | User clicks a Nelsy CTA on an SEO page | `landing_page`, `page_type`, `seo_cluster`, `cta_position` |
| `seo_signup_started` | User lands on `/onboarding` from an SEO page | `source_page`, `page_type`, `seo_cluster` |

`seo_landing_view` and `seo_signup_started` fire automatically in `PageviewTracker` (App.tsx) — no changes to individual pages required. `seo_cta_clicked` is available as a named export from `src/lib/analytics.ts` — call it when wiring up individual CTA buttons in future.

**Properties are non-PII.** No user identifiers, no email, no IP, no name.

**What you can answer:**
- Which SEO page gets traffic? → `seo_landing_view` grouped by `landing_page`
- Which SEO page generates signup clicks? → `seo_cta_clicked` grouped by `landing_page`
- Which SEO page generates trials? → `seo_signup_started` grouped by `source_page`
- Which cluster creates the most customers? → join `seo_signup_started.seo_cluster` with paid conversion events

**Note:** `seo_cta_clicked` needs to be wired to individual CTA buttons on each page. Currently it fires only if you call it explicitly. Priority: wire it to the hero CTA on `/nail-tech-deposits` and `/best-booking-app-for-nail-techs` first (highest commercial intent pages).

---

## Page-by-page QA

### Page scoring key
- **SEO potential:** likelihood to rank for target keyword (search volume × achievable rank)
- **Commercial value:** how likely a visitor from this page is to become a paying customer
- **Content quality:** depth, originality, specificity to nail techs — does it avoid generic AI patterns?
- **Conversion potential:** does the page have a clear, motivating path to trial?

---

### 1. Homepage `/`

**Target keyword:** "booking app for nail techs", "nail tech booking software", "nail tech scheduling app"  
**Search intent:** Transactional — looking for a product

| Signal | Assessment |
|--------|------------|
| Intent match | ✅ Strong. Page sells the product, matches "I want to buy/try a booking app" intent |
| Opening value | ✅ H1 and first fold communicate the product clearly |
| Keyword targeting | ✅ "nail tech" throughout, "booking app", "deposits", "Instagram", "payments" |
| Cannibalization risk | Low — no other page targets the same transactional query |
| Internal linking | ✅ Hero → /onboarding; sections link to demo; ComparisonTable reinforces value |
| CTA relevance | ✅ Multiple clear "Start free" CTAs, well positioned |
| Conversion path | ✅ Pricing section, comparison table, HowItWorks → /onboarding |
| Feels generic/AI? | No — copy is specific to nail tech workflows (Instagram, link in bio, DMs, no-shows) |
| Mobile UX | ✅ Responsive sections; test sticky nav on 375px |
| Page speed risks | ⚠️ 10 sections with Framer Motion on initial load. No images but JS bundle is the risk. Consider IntersectionObserver gating for below-fold animations |
| Structured data | ✅ Organization + WebSite + SoftwareApplication (site-wide JSON-LD) |
| Title/meta quality | ✅ Title: "Nail Tech Booking App \| Bookings, Deposits & Payments \| Nelsy" — includes primary keyword, value props |

**Scores: SEO 8/10 · Commercial 9/10 · Content 8/10 · Conversion 8/10**

**Improvement opportunity:** The page has no `Article` or `WebPage` JSON-LD. The SoftwareApplication schema has `"price": "29.99"` hardcoded — if pricing changes, this will be stale and could confuse rich results.

---

### 2. `/nail-tech-deposits`

**Target keyword:** "nail tech deposits", "how to collect deposits as a nail tech", "nail tech deposit policy"  
**Search intent:** Informational + solution-seeking (nail tech with a no-show problem)

| Signal | Assessment |
|--------|------------|
| Intent match | ✅ Page answers "how to collect deposits" precisely |
| Opening value | ✅ First section explains why deposits matter immediately |
| Keyword targeting | ✅ "deposits", "no-show", "nail tech" throughout |
| Cannibalization risk | ⚠️ Overlaps with `/learn/nail-tech-deposit-policy` — both target deposit-related queries. Mitigated by distinct angles (how-to setup vs policy writing). Monitor in Search Console. |
| Internal linking | ✅ → homepage, → /instagram-booking-for-nail-techs, → /learn/nail-tech-deposit-policy |
| CTA relevance | ✅ "Start collecting deposits with Nelsy" — directly connected to page topic |
| Conversion path | ✅ Strong — visitors have a no-show problem; Nelsy solves it directly |
| Content quality | ✅ Specific amounts (20-25%, 30-50%, 100% scenarios), step-by-step Nelsy flow |
| Mobile UX | ✅ |
| Structured data | ✅ WebPage + BreadcrumbList |

**Scores: SEO 8/10 · Commercial 9/10 · Content 8/10 · Conversion 9/10**

**Top opportunity:** This is the highest-conversion-potential page in the cluster. Add `seo_cta_clicked` to the primary CTA button. Consider adding a FAQ schema (3–4 questions about deposits would hit featured snippet territory).

---

### 3. `/instagram-booking-for-nail-techs`

**Target keyword:** "instagram booking for nail techs", "how to get bookings from instagram nail tech"  
**Search intent:** Informational — nail tech who uses Instagram but DMs aren't converting

| Signal | Assessment |
|--------|------------|
| Intent match | ✅ Direct match to "turn Instagram into bookings" intent |
| Opening value | ✅ First section names the DM problem directly |
| Keyword targeting | ✅ "Instagram", "booking link", "nail tech", "link in bio" |
| Cannibalization risk | ⚠️ Overlaps with `/learn/how-to-get-more-nail-clients` (Instagram section). Mitigated by focus: this page is specifically about the booking link workflow; the growth guide is broad. |
| Internal linking | ✅ → /nail-tech-deposits, → /studio/maya, → / |
| CTA relevance | ✅ Demo link to /studio/maya is strong here — shows what the booking page looks like |
| Conversion path | Good but softer — visitor is learning, not in buying mode |
| Content quality | ✅ Specific to Instagram nail tech workflow |
| Structured data | ✅ WebPage + BreadcrumbList |

**Scores: SEO 8/10 · Commercial 7/10 · Content 8/10 · Conversion 7/10**

**Improvement:** Add a link to `/learn/how-to-get-more-nail-clients` (currently missing, creating a gap in the cluster). Mentioning typical booking conversion rates (e.g., DM vs booking link) would make the opening more compelling if supportable by real data.

---

### 4. `/fresha-alternative-nail-techs`

**Target keyword:** "fresha alternative nail techs", "fresha alternative for beauty"  
**Search intent:** Transactional — someone actively looking to switch from Fresha

| Signal | Assessment |
|--------|------------|
| Intent match | ✅ Exact match for active switcher intent |
| Opening value | ✅ Transparency banner is well-placed; doesn't hide the conflict of interest |
| Keyword targeting | ✅ "Fresha alternative", "nail tech", "commission-free" framing |
| Cannibalization risk | Low — distinct from `/best-booking-app-for-nail-techs` (switching intent vs comparison shopping) |
| Internal linking | ✅ → /booksy-alternative, → /nail-tech-deposits, → homepage |
| CTA relevance | ✅ Strong — visitor is actively switching |
| Conversion path | ✅ Highest conversion potential in cluster for visitors who arrive with switching intent |
| Content quality | ✅ Comparison uses product-philosophy dimensions not pricing claims — durable |
| "When Fresha is better" section | ✅ Builds trust, avoids coming across as propaganda |
| Structured data | ✅ WebPage + BreadcrumbList |

**Scores: SEO 7/10 · Commercial 9/10 · Content 7/10 · Conversion 8/10**

**Risk:** Ranking on "fresha alternative" is competitive. Page needs backlinks or direct Fresha brand SERP presence. Also, Fresha's product evolves — the "marketplace vs own brand" framing is durable but the comparison table should be reviewed if Fresha changes their nail-tech proposition. Add a "last verified" date to the comparison table.

---

### 5. `/booksy-alternative-nail-techs`

**Target keyword:** "booksy alternative nail techs"  
**Search intent:** Transactional — switching from Booksy

| Signal | Assessment |
|--------|------------|
| Intent match | ✅ Same structure as Fresha alternative — well-matched |
| Cannibalization vs Fresha page | Low — different brand intent, different SERP |
| Internal linking | ✅ → /fresha-alternative, → /nail-tech-deposits, → homepage |
| Content quality | ✅ Same durable comparison structure |
| Unique angle | ✅ Booksy's marketplace model vs Nelsy's branded page framing is the right differentiator |

**Scores: SEO 7/10 · Commercial 9/10 · Content 7/10 · Conversion 8/10**

**Same risks as Fresha page.** Booksy has a broader SMB positioning — the nail-tech-specific angle is the right focus. These two pages should cross-link more prominently to each other (currently they do via related links at bottom — consider adding a paragraph-level contextual link mid-page as well).

---

### 6. `/best-booking-app-for-nail-techs`

**Target keyword:** "best booking app for nail techs", "nail tech booking software comparison"  
**Search intent:** Investigational — comparing options before buying

| Signal | Assessment |
|--------|------------|
| Intent match | ✅ Comparison article matches "best X" query intent exactly |
| Opening value | ✅ Transparency banner + TOC gives immediate orientation |
| Keyword targeting | ✅ "booking app for nail techs", "nail tech scheduling", "nail tech software" |
| Cannibalization risk | ⚠️ Overlaps with individual alternative pages. Distinct intent (browsing vs switching) mitigates this, but Google might consolidate. Monitor. |
| Internal linking | ✅ → Fresha, → Booksy, → deposits, → Instagram pages |
| CTA relevance | ✅ "Nelsy may be the right fit if..." framing is honest and likely to convert the right clients |
| Content quality | ✅ Multiple platforms, strengths/weaknesses, "best fit by type" section is high value |
| Disclosure | ✅ Amber banner, "verify with each provider" notes throughout |
| Feels generic? | Moderate risk — comparison articles in this space are commodified. The "best fit by nail tech type" section is the strongest differentiator |
| Structured data | ✅ Article + BreadcrumbList + FAQPage |

**Scores: SEO 8/10 · Commercial 8/10 · Content 8/10 · Conversion 7/10**

**Improvement:** The "best fit by nail tech type" section should link to a real nail tech persona story or a quote from a case study if one exists. GlossGenius inclusion is good for credibility but that section could be shorter — it may dilute the Nelsy vs top-2 comparison.

---

### 7. `/tools/nail-tech-pricing-calculator`

**Target keyword:** "nail tech pricing calculator", "how much to charge for nail services"  
**Search intent:** Transactional/tool — nail tech who wants to calculate their prices

| Signal | Assessment |
|--------|------------|
| Intent match | ✅ Exact match — someone searching for a calculator wants an interactive tool |
| Opening value | ✅ Tool is above the fold; nail techs can use it immediately |
| Keyword targeting | ✅ "pricing calculator", "nail tech", "service rates" |
| Cannibalization risk | ✅ None — distinct from `/learn/nail-tech-pricing-guide` by intent (tool vs guide) |
| Cluster linkage | ✅ Tight two-way link with pricing guide |
| Content quality | ✅ Transparent formula is the strongest differentiator vs generic calculators |
| Tool UX | ✅ 6 inputs is manageable; real-time output; copy-to-clipboard |
| Conversion path | ✅ "You now know what to charge — use Nelsy to take payments" is a natural CTA bridge |
| Page speed risks | ✅ Low — no heavy dependencies; tool is pure React state |
| Structured data | ✅ WebPage + BreadcrumbList + FAQPage |

**Scores: SEO 9/10 · Commercial 7/10 · Content 9/10 · Conversion 8/10**

**Top opportunity in Wave 2.** Tools rank well, attract backlinks, and have high return visit rates. Consider: (1) add a "save/share your results" feature in future; (2) the FAQs should target "how much should I charge for gel nails" type queries specifically — they currently cover general pricing methodology.

---

### 8. `/learn/how-to-get-more-nail-clients`

**Target keyword:** "how to get more nail clients", "how to grow nail business"  
**Search intent:** Informational — nail tech early in growth phase

| Signal | Assessment |
|--------|------------|
| Intent match | ✅ Broad but well-structured answer to the query |
| Opening value | ✅ Intro frames the multi-factor nature of growth immediately |
| Keyword targeting | ✅ "nail clients", "nail tech", "Instagram", "booking", "deposits" natural throughout |
| Cannibalization risk | ⚠️ Moderate — broad topic could overlap with `/instagram-booking-for-nail-techs`. Mitigated by scope (this page covers 10 topics; Instagram page is narrow). |
| Internal linking | ✅ Links to deposits, pricing guide, best booking app, Instagram booking |
| Content quality | ✅ 10 sections, nail-tech-specific advice, photography tips, referral mechanics, retention |
| Feels generic? | ⚠️ Sections 6 (referrals) and 7 (rebooking) are shorter and could feel thin. Sections 1–5 are strong. |
| CTA relevance | ✅ "Turn Instagram into bookings" CTA is thematically coherent |
| Conversion path | Softer — early-stage visitor, not immediate buying intent. But high-volume keyword. |
| Structured data | ✅ Article + BreadcrumbList |

**Scores: SEO 8/10 · Commercial 6/10 · Content 7/10 · Conversion 6/10**

**Improvement:** Sections 6 and 7 (referrals, rebooking) are under-developed vs the rest. Expand each to ~200 words minimum to avoid thin-content risk on those sections. Add FAQPage JSON-LD — "how to get more nail clients fast", "how do nail techs find clients" are high-volume FAQ queries.

---

### 9. `/learn/nail-tech-pricing-guide`

**Target keyword:** "nail tech pricing guide", "how to price nail services", "what to charge as a nail tech"  
**Search intent:** Informational — nail tech setting prices for the first time or reconsidering

| Signal | Assessment |
|--------|------------|
| Intent match | ✅ Comprehensive answer to "how should I price my nail services" |
| Opening value | ✅ Intro names the undercharging problem immediately — resonant |
| Keyword targeting | ✅ "pricing", "cost-based", "market positioning", "raise prices" |
| Cannibalization risk | ✅ None — pricing guide and calculator are a complementary cluster |
| Cluster linkage | ✅ Two-way with calculator, internal links to deposits and cancellation policy |
| Content quality | ✅ Market positioning section, nail art pricing table, raising prices script — all nail-tech-specific |
| Feels generic? | Low — cost formula with actual examples, objection handling for price increases are not generic |
| Structured data | ✅ Article + BreadcrumbList + FAQPage |

**Scores: SEO 8/10 · Commercial 7/10 · Content 8/10 · Conversion 7/10**

**Improvement:** The pricing guide currently has no concrete price examples ("gel manicures in London average $X"). This is understandable (avoids stale claims) but a price range table with a "verify locally" caveat would significantly increase usefulness and shareability.

---

### 10. `/tools/nail-tech-cancellation-policy-generator`

**Target keyword:** "nail tech cancellation policy", "cancellation policy for nail techs", "nail tech no-show policy"  
**Search intent:** Transactional/tool — nail tech who needs a policy now

| Signal | Assessment |
|--------|------------|
| Intent match | ✅ A generator directly satisfies "I need a cancellation policy" intent |
| Opening value | ✅ Tool is immediate — above fold, no preamble required |
| Keyword targeting | ✅ "cancellation policy", "no-show", "nail tech" throughout |
| Cannibalization risk | ✅ Low — generator + deposit policy guide cover policy from different angles |
| Cluster linkage | ✅ Links to deposits page, deposit policy guide |
| Tool UX | ✅ 6 inputs, live preview, copy button — clean |
| Legal disclaimer | ✅ Present ("not legal advice") |
| Structured data | ✅ WebPage + BreadcrumbList + FAQPage |
| Conversion path | ✅ Strong — nail tech who needs a policy also needs deposit collection = Nelsy |

**Scores: SEO 9/10 · Commercial 8/10 · Content 8/10 · Conversion 8/10**

**Top opportunity alongside pricing calculator.** Free tools with copy-paste output are highly shareable and linkable. Suggest: promote this in nail tech Facebook groups and Reddit communities — it's the kind of useful resource that earns organic links.

---

### 11. `/learn/nail-tech-deposit-policy`

**Target keyword:** "nail tech deposit policy", "how to write a deposit policy nail tech"  
**Search intent:** Informational — nail tech formalising their deposit process

| Signal | Assessment |
|--------|------------|
| Intent match | ✅ Covers writing, amount, enforcement, communication |
| Cannibalization risk | ⚠️ Closest competitor is `/nail-tech-deposits` (Wave 1). Mitigated: deposits page = how to collect/set up; this page = the policy document and enforcement. Watch in Search Console — if both pages rank for the same query, consolidate. |
| Internal linking | ✅ → /nail-tech-deposits, → cancellation policy generator, → pricing guide |
| Content quality | ✅ Objection-handling section is high-value and specific |
| Structured data | ✅ Article + BreadcrumbList + FAQPage |

**Scores: SEO 7/10 · Commercial 7/10 · Content 8/10 · Conversion 7/10**

**Watch:** If `/nail-tech-deposits` outranks this page for deposit policy queries, the deposit policy content here should be absorbed into that page rather than maintained separately.

---

## Summary scores

| Page | SEO | Commercial | Content | Conversion | Priority |
|------|-----|------------|---------|------------|----------|
| `/` | 8 | 9 | 8 | 8 | Core |
| `/nail-tech-deposits` | 8 | 9 | 8 | 9 | P1 |
| `/tools/nail-tech-pricing-calculator` | 9 | 7 | 9 | 8 | P1 |
| `/tools/nail-tech-cancellation-policy-generator` | 9 | 8 | 8 | 8 | P1 |
| `/best-booking-app-for-nail-techs` | 8 | 8 | 8 | 7 | P2 |
| `/fresha-alternative-nail-techs` | 7 | 9 | 7 | 8 | P2 |
| `/booksy-alternative-nail-techs` | 7 | 9 | 7 | 8 | P2 |
| `/learn/nail-tech-pricing-guide` | 8 | 7 | 8 | 7 | P2 |
| `/instagram-booking-for-nail-techs` | 8 | 7 | 8 | 7 | P3 |
| `/learn/how-to-get-more-nail-clients` | 8 | 6 | 7 | 6 | P3 |
| `/learn/nail-tech-deposit-policy` | 7 | 7 | 8 | 7 | P3 |

---

## Internal linking authority graph

```
                        ┌─────────────────────────────┐
                        │         HOMEPAGE  /          │  ← Core booking intent
                        │   "booking app for nail techs"│
                        └──────────┬──────────────────┘
                    ┌──────────────┼──────────────────────────┐
                    ↓              ↓                          ↓
          /nail-tech-deposits  /instagram-booking-  /best-booking-app-
          "deposits, no-show"   for-nail-techs       for-nail-techs
                    │                  │                  │
                    ↓                  ↓                  ↓
          /learn/nail-tech-    /learn/how-to-get-  /fresha-alternative
          deposit-policy        more-nail-clients   /booksy-alternative
                    │
                    ↓
          /tools/nail-tech-
          cancellation-policy-
          generator
          
          ┌─────────────────────────────────┐
          │  PRICING CLUSTER                │
          │  /tools/nail-tech-pricing-      │ ←→ /learn/nail-tech-pricing-guide
          │  calculator                     │
          └─────────────────────────────────┘
          
Authority flows: Homepage → /nail-tech-deposits → policy cluster
                 Homepage → /best-booking-app-for-nail-techs → competitor alternatives
                 Homepage → /tools (via footer Resources section — not yet wired)
```

**Authority gap:** The `/tools/` and `/learn/` pages are not yet linked from the homepage or footer. This is the single most impactful internal linking improvement available.

**Action:** Add a "Resources" section to the homepage footer or a "Free Tools" section to the `SiteFooter` component. The two tools in particular (pricing calculator, cancellation policy generator) should receive homepage links — they're the most linkable assets and will accumulate the most external backlinks.

---

## Technical issues identified

| Issue | Severity | Fix |
|-------|----------|-----|
| **Duplicate meta description** (fixed this session) | High — was active | Removed default from `index.html` ✅ |
| **Hardcoded price in SoftwareApplication JSON-LD** (`"price": "29.99"`) | Medium | Replace with an offer range or a fetch, or remove if pricing is subject to change |
| **No `seo_cta_clicked` wired to buttons yet** | Medium | Wire to "Start free trial" CTAs on P1 pages first |
| **No `Article` dateModified** in JSON-LD for editorial pages | Low | Add when content is updated |
| **`/tools/` and `/learn/` not linked from footer** | High (internal authority) | Add Resources + Tools columns to SiteFooter |
| **No `og:image` actual asset** (`/og-image.png` — verify it exists) | Medium | Ensure the file exists in `/public/og-image.png` |

---

## Google Search Console — Production checklist

### Sitemap submission
1. Go to Search Console → Sitemaps
2. Submit `https://getnelsy.com/sitemap.xml`
3. Verify "Success" status — if errors appear, re-check sitemap XML validity

### URL inspection (run for each route on first deploy)
Submit each URL for indexing via URL Inspection tool:
1. `https://getnelsy.com/` — priority
2. `https://getnelsy.com/nail-tech-deposits`
3. `https://getnelsy.com/instagram-booking-for-nail-techs`
4. `https://getnelsy.com/tools/nail-tech-pricing-calculator`
5. `https://getnelsy.com/best-booking-app-for-nail-techs`
6. `https://getnelsy.com/fresha-alternative-nail-techs`
7. `https://getnelsy.com/booksy-alternative-nail-techs`
8. `https://getnelsy.com/learn/nail-tech-pricing-guide`
9. `https://getnelsy.com/tools/nail-tech-cancellation-policy-generator`
10. `https://getnelsy.com/learn/how-to-get-more-nail-clients`
11. `https://getnelsy.com/learn/nail-tech-deposit-policy`

### Indexing check (after 2–4 weeks)
- Coverage → Indexed: confirm all 11 pages appear
- Coverage → Errors: fix any "Crawled — currently not indexed" (usually thin content or canonical issues)
- Coverage → Excluded: confirm /dashboard, /onboarding, /login are excluded via `noindex`

### Pages to monitor (track weekly once in Search Console)
| Page | Primary query to watch |
|------|----------------------|
| `/` | "booking app for nail techs", "nail tech booking software" |
| `/nail-tech-deposits` | "nail tech deposits", "how to collect deposits nail tech" |
| `/tools/nail-tech-pricing-calculator` | "nail tech pricing calculator" |
| `/tools/nail-tech-cancellation-policy-generator` | "nail tech cancellation policy", "cancellation policy nail tech" |
| `/best-booking-app-for-nail-techs` | "best booking app for nail techs" |
| `/fresha-alternative-nail-techs` | "fresha alternative", "fresha alternative nail techs" |
| `/booksy-alternative-nail-techs` | "booksy alternative nail techs" |
| `/learn/nail-tech-pricing-guide` | "nail tech pricing guide", "how to price nail services" |
| `/learn/how-to-get-more-nail-clients` | "how to get more nail clients" |
| `/instagram-booking-for-nail-techs` | "instagram booking nail tech" |
| `/learn/nail-tech-deposit-policy` | "nail tech deposit policy" |

---

## Weekly Search Console workflow

### Positions 4–15 (close to top 3)
Action: Strengthen internal links pointing to this page from higher-authority pages. Expand H2 sections that match the query more precisely. Ensure the target keyword appears in H1, first paragraph, and at least one H2. Look at the specific query in Search Console — if the ranking query differs from your H1, adjust the H1/meta to match.

### Positions 15–30 (mid-table)
Action: The page is being seen but doesn't satisfy intent well enough. Re-read the top-ranking pages for the query. Add a section that covers what they cover that you don't. Increase word count on the weakest sections. Check that the page's opening 150 words match the query closely.

### High impressions + low CTR (<2%)
Action: The title/meta description isn't compelling in the SERP. Rewrite the `<title>` to be more specific: include the primary keyword and a benefit or number. Rewrite the meta description to include a clear call to action or value statement. Test changes and monitor CTR over 2-week periods.

### Traffic + low signup rate (visitors not converting)
Action: The page attracts the right people but doesn't motivate action. Check: Is the CTA above the fold on mobile? Is it connected to the topic of the page (not just a generic "Start free")? Does the page explain Nelsy's value before asking for signup? Add social proof (even one testimonial quote) near the CTA. Check whether the `/onboarding` page itself has a high drop-off.

---

## Content gap analysis — Next 15 SEO opportunities

Evaluated for: qualified traffic, conversion potential, topical authority, ranking opportunity, backlink/share potential.

**Scoring notes:**
- Traffic: estimated monthly search volume (nail-tech-specific keywords are low volume but high intent)
- Conversion: how directly the query leads toward trying Nelsy
- Authority: does this page strengthen the topical cluster?
- Ranking: how achievable without strong backlink profile?
- Linkability: would this earn natural links from nail tech communities?

---

### Tier 1 — Build next (highest combined score)

| # | URL | Keyword | Traffic | Conversion | Authority | Ranking | Link | Notes |
|---|-----|---------|---------|------------|-----------|---------|------|-------|
| 1 | `/tools/nail-tech-appointment-reminder-templates` | "nail tech appointment reminder templates", "nail appointment reminder message" | Med | High | High | High | High | **Free tool** — copy-paste templates (text, email, DM). Nail techs share these. Directly reduces no-shows, leads naturally into Nelsy automated reminders. Highest tool opportunity. |
| 2 | `/learn/nail-tech-service-menu` | "nail tech service menu", "nail tech price list template" | Med-High | High | High | High | High | How to structure a service menu with prices, durations, add-ons. Include a template. Directly feeds into Nelsy booking page setup. High shareability in nail communities. |
| 3 | `/tools/nail-tech-intake-form-template` | "nail tech client intake form", "nail tech consultation form" | Med | Med | High | High | High | Downloadable/copy-paste intake form template. Used at first appointment. Another highly linkable tool. Links naturally into client management and booking flow. |
| 4 | `/learn/how-to-start-a-nail-business` | "how to start a nail business", "nail tech business plan" | High | Med | Med | Med | Med | Broad but high-volume. Covers: licensing/certification, equipment, choosing a space, pricing, marketing, booking system. Long-form pillar. Links out to most existing pages. |
| 5 | `/learn/nail-tech-instagram-bio` | "nail tech instagram bio", "nail tech bio ideas" | Med | High | High | High | Med | Very specific: nail tech bio templates, what to include (location, specialty, booking link), examples. Directly connects to Instagram booking workflow. Short page, high utility. |

---

### Tier 2 — Strong opportunities, slightly lower ranking ease

| # | URL | Keyword | Traffic | Conversion | Authority | Ranking | Notes |
|---|-----|---------|---------|------------|-----------|---------|-------|
| 6 | `/learn/nail-tech-content-ideas` | "nail tech content ideas", "nail tech instagram content" | Med | Med | High | Med | Content calendar ideas for nail techs. Each idea connects to getting bookings. Not a conversion page itself but high traffic + internal link value. |
| 7 | `/learn/nail-salon-booking-software` | "nail salon booking software", "booking software for small nail salons" | Med | High | High | Med | Targets small nail salon owners vs solo nail techs. Different persona, distinct SERP. Can drive expansion beyond solo nail techs without cannibalizing. |
| 8 | `/learn/nail-tech-no-show-policy` | "nail tech no-show policy", "nail tech no show fee" | Med | High | High | High | Distinct from cancellation policy — specifically about no-shows. Narrow page, high commercial value (leads directly into deposits). Consider whether this should be a standalone page or a section of the deposit policy guide first. |
| 9 | `/learn/nail-tech-business-plan` | "nail tech business plan" | Med-High | Low-Med | Low | Med | Highly searched but low commercial intent — someone at very early stage, not yet thinking about booking software. Could work as a top-of-funnel pillar with internal links to every other page. High backlink potential if genuinely useful. |
| 10 | `/learn/nail-tech-client-retention` | "how to retain nail clients", "nail client retention" | Med | Med | High | High | Focused specifically on retention strategies. Strong overlap with section 8 of how-to-get-more-nail-clients — consider whether this warrants a standalone page or should be expanded there first. |

---

### Tier 3 — Valuable but lower priority

| # | URL | Keyword | Notes |
|---|-----|---------|-------|
| 11 | `/learn/nail-tech-pricing-examples` | "nail tech pricing examples", "nail price list examples" | Price examples by service type and market tier. Highly searched. Pairs with pricing guide + calculator. |
| 12 | `/tools/nail-tech-business-name-generator` | "nail business name ideas", "nail tech business name" | Tool with high search volume but very low commercial intent. Good for backlinks/traffic but unlikely to convert. Tier 3. |
| 13 | `/learn/gel-nails-vs-acrylic-nail-techs` | "gel vs acrylic for nail techs" | Product knowledge content. Attracts early-career nail techs. Long path to conversion. Low priority. |
| 14 | `/square-alternative-nail-techs` | "square appointments alternative" | Square Appointments is used by nail techs. Same structure as Fresha/Booksy pages. Lower nail-tech-specific volume. |
| 15 | `/glossgenius-alternative-nail-techs` | "glossgenius alternative" | GlossGenius is mentioned in the comparison article. Separate alternative page would complete the set but volume is lower. |

---

### Additional tool opportunities (vs article)

These topics are better as **interactive tools** than articles because the user wants output, not reading:

| Tool | Why a tool outperforms an article |
|------|----------------------------------|
| **Appointment reminder templates** (#1) | Copy-paste output > reading a "how to write" article |
| **Client intake form template** (#3) | Downloadable/fillable form > article describing what to include |
| **Nail tech revenue/goal calculator** | "How many appointments do I need to hit my income goal?" — interactive beats static |
| **Service duration estimator** | Helps new nail techs book correctly; drives Nelsy onboarding |
| **No-show cost calculator** | "How much have no-shows cost me this year?" — visceral, high conversion; feeds directly into deposits CTA |

---

## Cannibalization watch list

These page pairs are at risk of ranking for the same query. Monitor monthly in Search Console:

| Page A | Page B | Shared risk query |
|--------|--------|-------------------|
| `/nail-tech-deposits` | `/learn/nail-tech-deposit-policy` | "nail tech deposit policy" |
| `/instagram-booking-for-nail-techs` | `/learn/how-to-get-more-nail-clients` | "instagram for nail techs" |
| `/best-booking-app-for-nail-techs` | `/fresha-alternative-nail-techs` | "fresha alternative" |
| `/tools/nail-tech-cancellation-policy-generator` | `/learn/nail-tech-deposit-policy` | "cancellation policy nail tech" |

If two pages start ranking for the same query: add a canonical pointing the lower-intent page to the higher-intent one, or consolidate the pages with a redirect.

---

## Primary SEO business metric reminder

**Target: organic paying customers per month.**

The funnel is:
```
Organic impression → Click → SEO page → seo_landing_view
                                       → seo_cta_clicked
                                       → /onboarding → seo_signup_started
                                       → trial started → paid conversion
```

The weakest link is currently **SEO page → CTA click**. `seo_cta_clicked` is not yet wired to buttons. This is the highest-priority analytics action: instrument the primary CTA on `/nail-tech-deposits`, `/tools/nail-tech-pricing-calculator`, and `/tools/nail-tech-cancellation-policy-generator` first. These three pages have the highest commercial value and will tell you the most about conversion.

---

*STOP — Wave 3 not started.*
