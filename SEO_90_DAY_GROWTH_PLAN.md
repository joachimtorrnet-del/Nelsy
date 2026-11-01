# SEO 90-Day Growth Plan

**Date:** 2026-10-20  
**Foundation:** 11 prerendered public pages, PostHog tracking, sitemap, structured data  
**Business objective:** Maximize organic nail tech trials and paying customers — not rankings as an end goal

---

## Context: what's already built

| Layer | What exists |
|-------|-------------|
| Core commercial | Homepage targeting "booking app for nail techs" |
| Deposits cluster | `/nail-tech-deposits`, `/learn/nail-tech-deposit-policy`, `/tools/nail-tech-cancellation-policy-generator` |
| Instagram/growth cluster | `/instagram-booking-for-nail-techs`, `/learn/how-to-get-more-nail-clients` |
| Pricing cluster | `/tools/nail-tech-pricing-calculator`, `/learn/nail-tech-pricing-guide` |
| Competitor/comparison | `/fresha-alternative-nail-techs`, `/booksy-alternative-nail-techs`, `/best-booking-app-for-nail-techs` |
| Tracking | `seo_landing_view`, `seo_cta_clicked`, `seo_signup_started` |
| Technical | Prerender pipeline, react-helmet-async, BreadcrumbList, FAQPage, Article JSON-LD |

The content cluster is strong enough to rank. The next 90 days are about: (1) getting it indexed and seen, (2) expanding topical authority into adjacent searches, (3) building enough trust signals to move up for competitive queries.

---

## Days 1–30 — Indexation & Early Traction

The only goal in the first 30 days is making sure the pages that exist are indexed, correctly understood by Google, and starting to appear for target queries. No new pages are needed yet.

---

### Google Search Console — actions on deploy

**Submit sitemap (day 1):**
1. Search Console → Sitemaps → Add `https://getnelsy.com/sitemap.xml`
2. Confirm "Success" — if errors appear, run the sitemap through a validator first

**Request indexing (days 1–3, one at a time):**
Submit each URL via URL Inspection → Request Indexing:
1. `https://getnelsy.com/` — submit first
2. `https://getnelsy.com/nail-tech-deposits`
3. `https://getnelsy.com/tools/nail-tech-pricing-calculator`
4. `https://getnelsy.com/tools/nail-tech-cancellation-policy-generator`
5. `https://getnelsy.com/best-booking-app-for-nail-techs`
6. `https://getnelsy.com/fresha-alternative-nail-techs`
7. `https://getnelsy.com/booksy-alternative-nail-techs`
8. `https://getnelsy.com/instagram-booking-for-nail-techs`
9. `https://getnelsy.com/learn/nail-tech-pricing-guide`
10. `https://getnelsy.com/learn/how-to-get-more-nail-clients`
11. `https://getnelsy.com/learn/nail-tech-deposit-policy`

Note: Google limits URL inspection requests to ~10/day. Spread over days 1–2.

**Check indexing (days 14–21):**
- Coverage → Indexed: confirm all 11 pages appear
- Coverage → Excluded: confirm `/dashboard`, `/onboarding`, `/login` are excluded
- If any page shows "Discovered — currently not indexed": check page for thin content, crawlability, and internal link depth
- If any page shows "Crawled — currently not indexed": re-read the page for content quality and make sure there are ≥3 internal links pointing to it

---

### Technical checks — days 1–7

Run each of these once on deploy and again at day 14:

| Check | Tool | Expected result |
|-------|------|-----------------|
| All 11 pages indexed | Search Console → Coverage | All show "Indexed" |
| Canonical tag per page | Inspect element / prerendered HTML | 1 canonical per page, pointing to its own URL |
| 1 meta description per page | Browser HTML source | No duplicates |
| Structured data validation | Google Rich Results Test | No errors for FAQPage, BreadcrumbList, Article |
| og:image resolves | Direct URL: `getnelsy.com/og-image.png` | Returns a valid PNG |
| Noindex on private routes | URL Inspection for `/dashboard` | "URL is not on Google" |
| Sitemap all 13 URLs | `getnelsy.com/sitemap.xml` | 13 valid `<loc>` entries |
| robots.txt correct | `getnelsy.com/robots.txt` | Allows `/`, Disallows `/dashboard` |

---

### Queries to monitor from day 1 (set up in Search Console → Performance)

Set date range to "Last 28 days", apply "Compare" from the next month onward.

**Priority queries (check weekly):**

| Query | Target page | What to watch |
|-------|-------------|---------------|
| "booking app for nail techs" | `/` | Impressions starting to appear |
| "nail tech booking software" | `/` | Same SERP as above — should show for both |
| "nail tech deposits" | `/nail-tech-deposits` | Should rank fastest — low competition |
| "how to collect deposits as a nail tech" | `/nail-tech-deposits` | Long-tail, high intent |
| "nail tech pricing calculator" | `/tools/nail-tech-pricing-calculator` | Tool queries rank fast |
| "nail tech cancellation policy" | `/tools/nail-tech-cancellation-policy-generator` | Same — tool content |
| "fresha alternative nail techs" | `/fresha-alternative-nail-techs` | Watch for brand-specific rank |
| "best booking app for nail techs" | `/best-booking-app-for-nail-techs` | Competitive — 60–90 days to appear |
| "nail tech pricing guide" | `/learn/nail-tech-pricing-guide` | Should appear within 30 days |
| "how to get more nail clients" | `/learn/how-to-get-more-nail-clients` | Higher volume, longer to rank |

---

### Internal linking improvements — days 1–14

These are the highest-leverage internal linking actions that don't require new content:

**1. Add `/learn/how-to-get-more-nail-clients` link to `/instagram-booking-for-nail-techs`**  
Currently missing. Both are in the instagram_growth cluster and should cross-link.

**2. Add `/tools/nail-tech-pricing-calculator` link to homepage**  
The calculator is the most linkable asset. It should be mentioned on the homepage under a "Free tools" or similar section. Even a footer mention drives crawl priority.

**3. Add a "Resources" block to LandingPremium below the ZeroCommission section**  
A 3-card grid linking to the pricing calculator, cancellation policy generator, and how-to-get-more-nail-clients would distribute homepage authority to these pages and give nail techs a reason to stay on the site.

**4. Add breadcrumb links from deposit cluster pages to each other**  
`/nail-tech-deposits` → `/learn/nail-tech-deposit-policy` → `/tools/nail-tech-cancellation-policy-generator` should form a tight cluster with contextual inline links, not just footer related links.

**5. Verify all "related guides" footer sections link bidirectionally**  
If page A links to page B in its footer, page B should link back to page A in a contextual section. Audit all 11 pages and add any missing reverse links.

---

### Content refresh rules — days 1–30

Do not rewrite pages in the first 30 days. Let Google evaluate the current content. The only refresh actions allowed in this period are:

- Fix any factual errors or broken links discovered
- Add FAQ structured data to pages that don't have it (`/learn/how-to-get-more-nail-clients` is missing FAQPage JSON-LD — add 3–4 FAQs)
- Expand any section under 200 words that Search Console shows getting impressions but no clicks (thin-content signal)
- Update `dateModified` in Article JSON-LD when content changes

**Rule:** If a page is not yet indexed, don't change it. Wait for indexation first, then diagnose.

---

## Days 31–60 — Expand Topical Authority

By day 30, most pages should be indexed. Some will already show impressions. The next phase expands the topical cluster with the highest-value adjacent pages.

Build in this priority order, one page at a time, prioritizing shipping over perfection:

---

### Wave 3 — recommended build order

*(Detailed page specs below in the 20-opportunity ranking)*

**Priority 1 — Appointment reminder templates tool**  
`/tools/nail-tech-appointment-reminder-templates`  
Build first. It's a free tool with high shareability, natural backlink potential, and connects directly to no-show prevention (which connects to deposits = Nelsy's core value prop). Nail techs share template resources in Facebook groups, Reddit, and TikTok communities.

**Priority 2 — Service menu guide**  
`/learn/nail-tech-service-menu`  
"How to build a nail tech service menu" and "nail tech price list template" are searched by nail techs setting up their business. This page feeds directly into the Nelsy onboarding flow (setting up services is the first step). Pairs with the pricing guide and calculator to form a complete pricing cluster.

**Priority 3 — Client intake form template**  
`/tools/nail-tech-client-intake-form`  
Another free tool with high shareability. Nail techs use intake forms at every first appointment. A downloadable/copy-paste template earns links and positions Nelsy as a professional business resource.

**Priority 4 — Instagram bio guide**  
`/learn/nail-tech-instagram-bio`  
Short, high-intent page. "Nail tech instagram bio" and "nail tech bio ideas" are specific enough to rank quickly and connect directly to the Instagram booking workflow. Nail techs searching this are exactly the audience Nelsy wants.

**Priority 5 — Nail tech content ideas**  
`/learn/nail-tech-content-ideas`  
Broad content that reaches nail techs at the top of their growth journey. High traffic, natural entry point, links to the Instagram booking and growth pages.

---

### Content cadence for days 31–60

One page per week. 5 pages total. Do not rush. Each page should be:
- 800–2,000 words of nail-tech-specific content
- Not a copy of what's already on the page from a different angle
- Earning at least 3 internal links from existing pages before it's published
- Submitted to Search Console for indexing within 24 hours of deploy

**Week 5:** Appointment reminder templates tool  
**Week 6:** Service menu guide  
**Week 7:** Client intake form tool  
**Week 8:** Instagram bio guide  
**Week 9:** Nail tech content ideas (or defer to days 61–90 if capacity is limited)

---

### Internal linking upgrades — days 31–60

As new pages are added, update existing pages to link to them:

| New page | Which existing pages should link to it |
|----------|---------------------------------------|
| Appointment reminders | `/nail-tech-deposits`, `/learn/nail-tech-deposit-policy`, homepage |
| Service menu | `/learn/nail-tech-pricing-guide`, `/tools/nail-tech-pricing-calculator`, homepage |
| Intake form | `/learn/how-to-get-more-nail-clients` (section on first appointment experience) |
| Instagram bio | `/instagram-booking-for-nail-techs`, `/learn/how-to-get-more-nail-clients` |
| Content ideas | `/instagram-booking-for-nail-techs`, `/learn/how-to-get-more-nail-clients` |

---

### Query monitoring — days 31–60

By day 45, check Search Console for early rankings:

**Pages expected to show top 20 positions by day 45:**
- `/tools/nail-tech-pricing-calculator` — "nail tech pricing calculator"
- `/tools/nail-tech-cancellation-policy-generator` — "nail tech cancellation policy"
- `/nail-tech-deposits` — "nail tech deposits", "nail tech no-show"
- `/learn/nail-tech-pricing-guide` — "nail tech pricing guide"

**Pages still building (expect days 60–90):**
- `/best-booking-app-for-nail-techs` — high competition
- `/fresha-alternative-nail-techs`, `/booksy-alternative-nail-techs` — brand-adjacent
- `/` for "booking app for nail techs" — primary commercial query, most competitive

**Action if a page isn't ranking by day 45:**
- Check coverage: is it indexed?
- Check internal links: does it have ≥3 links from other pages?
- Check content depth: is there a section that directly answers the query in the H1 and opening paragraph?
- Check cannibalization: is another Nelsy page ranking for the same query?

---

## Days 61–90 — Authority & Conversion

By day 60, the topical cluster is broad enough to start earning trust signals. The third phase focuses on: making the best pages more linkable, improving conversion on traffic that's arriving, and acquiring the first external links.

---

### Linkable asset improvements

The two free tools are the most naturally linkable assets in the cluster. To maximize their link potential:

**Pricing calculator:**
- Add a shareable results URL (encode calculator inputs as URL params so a nail tech can share "my pricing for gel manis")
- Add a "Copy results as text" export that includes the formula — so nail techs can share in Facebook groups or forum threads
- Add a comparison section: "Your prices vs market average" (even with rough ranges labeled clearly as estimates)

**Cancellation policy generator:**
- Add a "Download as PDF" button — nail techs want to print and display in their workspace
- Add a "Copy for Instagram bio/story" format — short version for social

Both improvements make the tools more shareable without changing the SEO structure.

---

### Comparison content — days 61–90

Add two comparison pages to complete the competitor cluster:

**`/square-alternative-nail-techs`**  
Square Appointments has a large nail tech user base. Nail techs searching for alternatives to Square are actively evaluating tools — high commercial intent. Same structure as Fresha/Booksy pages: transparency banner, durable product-philosophy comparison, "when Square may be a better fit."

**`/glossgenius-alternative-nail-techs`**  
GlossGenius is mentioned in the best-booking-app comparison article. A dedicated page captures the segment already evaluating GlossGenius. Lower volume than Fresha/Booksy but high commercial intent.

---

### Conversion optimization — days 61–90

Focus conversion improvements on the pages showing the most traffic in PostHog:

**Rule 1: If a page has high `seo_landing_view` and low `seo_cta_clicked`**  
The CTA isn't resonating. Test: replace the generic "Start your 14-day free trial" with a CTA that's specific to the page topic.
- On `/nail-tech-deposits`: "Stop no-shows — set up deposit collection"
- On `/tools/nail-tech-pricing-calculator`: "Add these prices to your Nelsy booking page"
- On `/learn/how-to-get-more-nail-clients`: "Get your booking page live in 10 minutes"

**Rule 2: If a page has high `seo_cta_clicked` and low `seo_signup_started`**  
The onboarding page itself is losing people. Check: is the onboarding page's headline/value prop consistent with the SEO page they came from? Consider a URL parameter (e.g., `/onboarding?from=deposits`) that lets the onboarding page show a context-specific headline.

**Rule 3: If the pricing calculator gets traffic but low CTA clicks**  
Add a "Your results" → "Build this service menu on Nelsy" bridge. The user has just calculated their prices — the next logical step is displaying those prices on a booking page.

---

### Backlink acquisition — days 61–90

No cold outreach, no link schemes. Focus on strategies that earn links by being genuinely useful:

**1. Nail tech Facebook groups and communities**  
Share the free tools (pricing calculator, cancellation policy generator, appointment reminder templates) in relevant groups. Don't promote Nelsy — share the tool and let the value speak. Groups like "Nail Tech Business" and similar on Facebook have tens of thousands of members. One viral post = 10–50 links.

**2. Nail tech Reddit (r/Nails, r/nailtech, r/NailTech)**  
Post the pricing calculator or policy generator as a genuine resource when relevant threads appear. Same approach — lead with the tool, not the product.

**3. Nail school / cosmetology school resources**  
Nail schools often maintain resource pages for graduates. A free pricing calculator and client intake form template are exactly what new nail techs need. Contact 5–10 nail schools and offer the tools as free curriculum resources.

**4. Beauty industry blogs and newsletters**  
Editors of nail industry newsletters (NAILPRO, Scratch Magazine, Beauty Launchpad) sometimes cover free business tools for nail techs. A short pitch email with "free pricing calculator and cancellation policy generator" framing is newsworthy enough to earn a mention.

**5. Nail tech YouTube and TikTok creators**  
Nail business educators on YouTube and TikTok regularly recommend tools to their audiences. A DM or email to 3–5 creators with a genuine tool offer (no payment, no affiliate requirement) occasionally earns an organic mention.

**What not to do:** Don't buy links, don't submit to generic directories, don't do guest post exchanges that aren't genuinely useful to the audience.

---

### Internal linking upgrades — days 61–90

By day 60, the cluster has grown. Audit and update:

**Homepage — add a "Free tools for nail techs" section**  
A small 2-card section between existing homepage sections linking to the pricing calculator and cancellation policy generator. These are the most linkable assets and deserve homepage authority.

**Build a `/resources` hub page**  
A lightweight index page listing all guides and tools, organized by topic. This:
- Gives search engines a single crawlable list of all content
- Serves nail techs who land on one page and want to explore
- Creates a natural internal linking hub
- Can rank for "nail tech business resources" type queries

**Ensure every new page (Wave 3) has ≥5 internal links pointing to it before it's submitted for indexing.**

---

## KPI Targets & Dashboards

All forecasts are estimates. They assume: pages are indexed within 14 days, no major algorithm updates, no technical issues, and content quality holds. Actual performance depends heavily on how competitive the target SERPs are in Nelsy's specific market (geography, existing domain authority, etc.).

---

### KPI definitions

| KPI | Definition | Where to measure |
|-----|-----------|-----------------|
| Organic impressions | Times Nelsy pages appeared in Google results | Search Console → Performance |
| Organic clicks | Clicks from organic search to Nelsy | Search Console → Performance |
| Non-branded clicks | Clicks on queries that don't include "Nelsy" | Search Console → Performance → filter out "nelsy" queries |
| Top 3 keyword count | Number of queries with average position ≤ 3 | Search Console → Queries, sort by position |
| Top 10 keyword count | Number of queries with average position ≤ 10 | Same |
| SEO CTA rate | `seo_cta_clicked / seo_landing_view` | PostHog funnel |
| SEO signup rate | `seo_signup_started / seo_landing_view` | PostHog funnel |
| SEO trial starts | Absolute count of `seo_signup_started` | PostHog |
| SEO paid customers | Trial starts that convert to paid (join with Stripe/Supabase data) | PostHog + billing data |

---

### Scenario forecasts — days 1–90

**Important:** These are order-of-magnitude estimates for internal planning. They are not guarantees and should not be used in investor materials without qualification. Nail tech search volume is lower than general beauty searches — most of these keywords have 100–2,000 monthly searches globally. The conversion value per acquired customer is what makes this channel worthwhile, not raw traffic volume.

#### Conservative scenario
*Assumes: slow indexation (30+ days), positions 15–30 for most queries, low CTR*

| KPI | Day 30 | Day 60 | Day 90 |
|-----|--------|--------|--------|
| Organic impressions/month | 500–2,000 | 2,000–6,000 | 5,000–15,000 |
| Organic clicks/month | 20–80 | 80–300 | 200–700 |
| Non-branded clicks | 15–60 | 60–250 | 150–600 |
| Top 10 keyword count | 2–5 | 5–15 | 10–25 |
| SEO CTA rate | 3–5% | 3–6% | 5–8% |
| SEO trial starts/month | 0–4 | 3–15 | 10–40 |
| SEO paid customers/month | 0–1 | 1–5 | 3–12 |

#### Base scenario
*Assumes: indexation in 14–21 days, positions 10–20 for long-tail queries, organic backlinks from tool sharing*

| KPI | Day 30 | Day 60 | Day 90 |
|-----|--------|--------|--------|
| Organic impressions/month | 2,000–6,000 | 8,000–20,000 | 20,000–50,000 |
| Organic clicks/month | 80–300 | 300–900 | 700–2,000 |
| Non-branded clicks | 60–250 | 250–800 | 600–1,800 |
| Top 10 keyword count | 5–12 | 15–30 | 25–50 |
| SEO CTA rate | 4–7% | 5–8% | 6–10% |
| SEO trial starts/month | 3–20 | 15–70 | 40–180 |
| SEO paid customers/month | 1–6 | 5–22 | 12–54 |

#### Strong scenario
*Assumes: fast indexation (<14 days), tool content earns backlinks within 45 days, positions 5–15 for several queries, free tools go viral in nail tech communities*

| KPI | Day 30 | Day 60 | Day 90 |
|-----|--------|--------|--------|
| Organic impressions/month | 5,000–15,000 | 20,000–60,000 | 60,000–150,000 |
| Organic clicks/month | 200–700 | 700–2,500 | 2,000–6,000 |
| Non-branded clicks | 180–650 | 650–2,300 | 1,800–5,500 |
| Top 10 keyword count | 10–20 | 25–50 | 50–100 |
| SEO CTA rate | 6–10% | 8–12% | 10–15% |
| SEO trial starts/month | 12–70 | 56–300 | 200–900 |
| SEO paid customers/month | 4–21 | 17–90 | 60–270 |

**The biggest variable is the free tools.** If the pricing calculator or cancellation policy generator gets shared organically in nail tech communities, impressions can spike by an order of magnitude. That scenario drives the "strong" numbers.

---

### Dashboards to build in PostHog

**Dashboard 1: SEO Acquisition (weekly review)**

| Widget | Event/data | Group by |
|--------|-----------|----------|
| SEO page views | `seo_landing_view` count | `landing_page` |
| CTA click rate by page | `seo_cta_clicked / seo_landing_view` | `landing_page` |
| Trial start rate by cluster | `seo_signup_started / seo_landing_view` | `seo_cluster` |
| Attribution funnel | Funnel: landing → cta → signup | Overall |
| Top pages by trial starts | `seo_signup_started` count | `source_page` |

**Dashboard 2: Search Console summary (weekly — manual)**

Track in a spreadsheet:

| Date | Impressions | Clicks | Avg. CTR | Avg. position | Top 10 keywords | Top 3 keywords |
|------|------------|--------|----------|---------------|-----------------|----------------|

Pull from Search Console → Performance → Export weekly.

**Dashboard 3: Content cluster performance (monthly review)**

| Cluster | Sessions | CTA clicks | Trial starts | Paid converts |
|---------|----------|-----------|-------------|---------------|
| core_booking | | | | |
| deposits_policies | | | | |
| instagram_growth | | | | |
| pricing | | | | |
| competitor_alt | | | | |

---

## Next 20 Page/Tool Opportunities — Ranked

Each opportunity is ranked by combined score across: qualified traffic, commercial intent, conversion potential, topical authority, and backlink/share potential. Only opportunities with a clear business reason to exist are included. Page count is not a goal.

---

### Tier 1 — Build in Wave 3 (days 31–60)

**1. `/tools/nail-tech-appointment-reminder-templates`**  
*Why it deserves to exist:* Appointment reminders are the second most-discussed operational tool in nail tech communities after deposits. A free set of copy-paste templates (text, DM, email) for confirmation, 24-hour reminder, and post-appointment follow-up solves a real problem nail techs face every day. Tools rank well, earn backlinks (nail techs share tools, not articles), and the connection to Nelsy's automated reminder feature is natural. This is the highest-potential shareable asset not yet built.  
*Score: Traffic Med-High · Commercial High · Conversion High · Authority High · Links Very High*

**2. `/learn/nail-tech-service-menu`**  
*Why it deserves to exist:* Setting up a service menu is the first thing a nail tech does when starting or formalizing their business — and it's the first thing they do in Nelsy onboarding. "Nail tech service menu" and "nail tech price list template" are searched specifically by nail techs at the beginning of their setup journey. This page sits at the top of the conversion funnel for new nail techs and should link directly into Nelsy onboarding. Strong cluster fit: connects pricing guide, pricing calculator, and the Nelsy product.  
*Score: Traffic Med · Commercial High · Conversion High · Authority High · Links Med*

**3. `/tools/nail-tech-client-intake-form`**  
*Why it deserves to exist:* A client intake form is used at every first nail appointment. Nail techs search for templates and forms they can print or share digitally. A clean, downloadable template is a high-value free tool that earns natural backlinks from nail school resource pages, industry blogs, and nail tech communities. It positions Nelsy as a professional business resource, not just a booking tool. Intake forms also lead naturally into client management — a future Nelsy feature.  
*Score: Traffic Med · Commercial Med · Conversion Med · Authority High · Links Very High*

**4. `/learn/nail-tech-instagram-bio`**  
*Why it deserves to exist:* "Nail tech instagram bio" and "nail tech bio examples" are high-intent, specific searches from nail techs building their online presence. The page is short to build, highly specific, and connects directly to the Instagram booking workflow. Nail techs who are optimizing their Instagram bio are exactly the audience who will click through to Nelsy's booking page product. High internal link value: connects to `/instagram-booking-for-nail-techs` and the growth guide.  
*Score: Traffic Med · Commercial High · Conversion High · Authority High · Links Med*

**5. `/learn/nail-tech-content-ideas`**  
*Why it deserves to exist:* Content creation is one of the most discussed topics in nail tech communities. "Nail tech content ideas" and "nail tech instagram content" attract nail techs who are active on social and looking to grow — which is exactly Nelsy's audience. This page earns traffic and connects naturally to the Instagram booking and growth guides. Lower direct conversion intent than other pages, but a strong entry point for nail techs early in their business-building journey.  
*Score: Traffic Med-High · Commercial Med · Conversion Med · Authority High · Links Med*

---

### Tier 2 — Build in days 61–90

**6. `/square-alternative-nail-techs`**  
*Why it deserves to exist:* Square Appointments is widely used by nail techs and beauty professionals. Nail techs who search "square alternative" are actively switching — high commercial intent. Completes the competitor comparison cluster. Same structure as Fresha/Booksy pages: transparent, fair, durable.  
*Score: Traffic Med · Commercial Very High · Conversion High · Authority High · Links Low*

**7. `/learn/nail-tech-no-show-policy`**  
*Why it deserves to exist:* "No-show policy" is a distinct search from "cancellation policy" with its own SERP. Nail techs who search this have already had the pain of no-shows — they're actively looking for a policy to implement. The page connects naturally to deposit collection (Nelsy's core value prop) and the cancellation policy generator. Short, focused, high-conversion.  
*Score: Traffic Med · Commercial High · Conversion High · Authority High · Links Low*

**8. `/learn/nail-tech-pricing-examples`**  
*Why it deserves to exist:* "Nail tech pricing examples" and "what to charge for gel nails" are searched by nail techs who want to benchmark rather than calculate from scratch. A page with realistic price ranges by service type, market tier (budget/mid/premium), and geography (with appropriate caveats) would be more immediately useful to many nail techs than the calculator. Tight cluster fit with the pricing guide and calculator.  
*Score: Traffic Med-High · Commercial Med · Conversion Med · Authority High · Links Med*

**9. `/learn/how-to-start-a-nail-business`**  
*Why it deserves to exist:* The highest-volume query in the nail tech business category. Covers: licensing/certification, equipment, location/setup, service menu, pricing, marketing, booking system. A comprehensive pillar page that links to every other content page Nelsy has. Long path to conversion (early-stage nail techs aren't ready to book software yet), but excellent for authority, backlinks, and top-of-funnel reach. Only worth building if the content is genuinely comprehensive (2,500+ words).  
*Score: Traffic Very High · Commercial Low-Med · Conversion Low · Authority Very High · Links High*

**10. `/learn/nail-tech-client-retention`**  
*Why it deserves to exist:* Client retention is a persistent concern for nail techs. "How to retain nail clients" is a distinct search from the growth guide. A focused, practical page covering rebooking, follow-ups, birthday messages, loyalty systems, and experience consistency adds depth to the growth cluster and links naturally to the reminder templates tool and Instagram booking page.  
*Score: Traffic Med · Commercial Med · Conversion Med · Authority High · Links Low*

---

### Tier 3 — Evaluate at day 90

**11. `/learn/nail-tech-business-plan`**  
*Why it deserves to exist:* High search volume but very early-stage intent. A nail tech writing a business plan is months away from needing booking software. Worth building only if the "how to start a nail business" page is already performing — this becomes a supporting page for that cluster.  
*Score: Traffic High · Commercial Low · Conversion Low · Authority Med · Links High*

**12. `/glossgenius-alternative-nail-techs`**  
*Why it deserves to exist:* GlossGenius is already mentioned in the comparison article. A dedicated page captures searches from nail techs specifically evaluating GlossGenius. Lower volume than Fresha/Booksy but completes the competitor set.  
*Score: Traffic Low-Med · Commercial Very High · Conversion High · Authority Med · Links Low*

**13. `/tools/nail-tech-revenue-calculator`**  
*Why it deserves to exist:* "How many appointments do I need to hit my income goal?" — an interactive calculator that takes target monthly income, average service price, and available hours produces immediate, visceral insight. The output ("you need 47 appointments/month at your current pricing") creates urgency for better scheduling tools. Strong conversion bridge to Nelsy.  
*Score: Traffic Low · Commercial High · Conversion Very High · Authority High · Links Med*

**14. `/tools/nail-tech-no-show-cost-calculator`**  
*Why it deserves to exist:* "How much have no-shows cost me this year?" — enter number of no-shows per month and average service price. Output: "No-shows have cost you an estimated $X this year." Visceral, emotionally resonant, and connects directly to the deposits/policy cluster. Very short to build (simpler tool than the pricing calculator). High conversion potential because it quantifies a real pain.  
*Score: Traffic Low · Commercial Very High · Conversion Very High · Authority High · Links Med*

**15. `/resources` (hub page)**  
*Why it deserves to exist:* A lightweight index of all Nelsy guides and tools, organized by topic. Helps with crawlability, gives nail techs a single place to find everything, and can rank for "nail tech business resources" queries. More valuable after the cluster has 15+ pages.  
*Score: Traffic Low · Commercial Med · Conversion Med · Authority Very High · Links Med*

**16. `/learn/nail-tech-nail-art-pricing`**  
*Why it deserves to exist:* Nail art pricing is a frequent question in nail tech communities — how to price individual nail art, per-design vs per-nail vs per-set. A dedicated page targeting "how to price nail art" sits within the pricing cluster and fills a gap the pricing guide covers only briefly. Short, focused, links to pricing calculator and guide.  
*Score: Traffic Med · Commercial Med · Conversion Med · Authority High · Links Low*

**17. `/nail-salon-booking-software`**  
*Why it deserves to exist:* A distinct audience from solo nail techs: small nail salons (2–5 chairs). Different persona, different product requirements. Building this page signals to Google that Nelsy serves the broader nail category, not just solo techs. High conversion potential if Nelsy's product roadmap includes multi-staff booking.  
*Score: Traffic Med · Commercial High · Conversion High · Authority Med · Links Low*

**18. `/learn/nail-tech-consultation-form`**  
*Why it deserves to exist:* Distinct from intake form. A consultation form is used for new service consultations (nail extensions, corrections). A template + guide explaining what questions to ask is useful and builds the "professional nail tech resources" authority signal. Supports the intake form page as a cluster.  
*Score: Traffic Low-Med · Commercial Low · Conversion Low · Authority High · Links Med*

**19. `/learn/nail-tech-photography-tips`**  
*Why it deserves to exist:* Nail photography is one of the most discussed topics in nail tech communities. "Nail tech photography tips" is searched by nail techs who want better content for Instagram. The page connects to the Instagram booking page and the growth guide. High shareability in nail tech communities — nail techs share photography content constantly.  
*Score: Traffic Med · Commercial Low · Conversion Low · Authority Med · Links High*

**20. `/learn/nail-tech-supplies-list`**  
*Why it deserves to exist:* "Nail tech supplies list" and "what do I need to start as a nail tech" are searched by early-career nail techs. Very top-of-funnel, but builds topical authority in the "nail tech business" category and links naturally to the how-to-start-a-nail-business page. Low conversion but high traffic potential and supports the authority cluster.  
*Score: Traffic Med-High · Commercial Low · Conversion Low · Authority Med · Links Med*

---

## Summary: 90-day focus by phase

```
Days 1–30:    Get indexed. Fix internal links. Monitor. Don't build new content.
Days 31–60:   5 new pages (1/week). Appointment reminders tool first.
Days 61–90:   2 competitor pages. Improve tools. First backlink outreach.
              Start conversion optimization based on PostHog data.
```

**The single most important action in 90 days:**  
Get the free tools (pricing calculator, cancellation policy generator) shared in at least one nail tech Facebook group or community. One share in a 20,000-member group creates more traffic and links than 30 days of content publishing.

**The metric that matters most:**  
`seo_signup_started / seo_landing_view` — trial start rate by page. Track it weekly from day 30. If a page has >2% trial rate, protect it and link to it from everything. If a page has <0.5% trial rate and has had traffic for 30+ days, improve the CTA before building new pages.

---

*STOP — Wave 3 implementation not started.*
