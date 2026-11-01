# SEO Wave 2 — Implementation Report

**Date:** 2026-10-20  
**Status:** Complete ✅  
**Build:** Passing (all 10 public routes prerendered)

---

## Pages built

| # | Route | File | Type | Status |
|---|-------|------|------|--------|
| 1 | `/tools/nail-tech-pricing-calculator` | `src/pages/tools/PricingCalculator.tsx` | Interactive tool + SEO content | ✅ |
| 2 | `/best-booking-app-for-nail-techs` | `src/pages/seo/BestBookingApp.tsx` | Comparison article | ✅ |
| 3 | `/learn/how-to-get-more-nail-clients` | `src/pages/learn/HowToGetMoreNailClients.tsx` | Pillar guide | ✅ |
| 4 | `/learn/nail-tech-pricing-guide` | `src/pages/learn/NailTechPricingGuide.tsx` | Editorial guide | ✅ |
| 5 | `/tools/nail-tech-cancellation-policy-generator` | `src/pages/tools/CancellationPolicyGenerator.tsx` | Interactive tool + SEO content | ✅ |
| 6 | `/learn/nail-tech-deposit-policy` | `src/pages/learn/NailTechDepositPolicy.tsx` | Editorial guide | ✅ |

---

## Infrastructure updates

| File | Change |
|------|--------|
| `src/App.tsx` | 6 new eager imports + 6 `<Route>` elements under `/* Wave 2 */` comment |
| `public/sitemap.xml` | 6 new `<url>` entries (priority 0.8–0.9) |
| `scripts/prerender.mjs` | 6 new routes added before `/` (canonical ordering preserved) |

---

## Prerender verification

All 10 public routes pass 4/4 SEO signal checks:

```
✅ / → title ✓ h1 ✓ canonical ✓ description ✓
✅ /nail-tech-deposits → title ✓ h1 ✓ canonical ✓ description ✓
✅ /instagram-booking-for-nail-techs → title ✓ h1 ✓ canonical ✓ description ✓
✅ /fresha-alternative-nail-techs → title ✓ h1 ✓ canonical ✓ description ✓
✅ /booksy-alternative-nail-techs → title ✓ h1 ✓ canonical ✓ description ✓
✅ /best-booking-app-for-nail-techs → title ✓ h1 ✓ canonical ✓ description ✓
✅ /tools/nail-tech-pricing-calculator → title ✓ h1 ✓ canonical ✓ description ✓
✅ /learn/how-to-get-more-nail-clients → title ✓ h1 ✓ canonical ✓ description ✓
✅ /learn/nail-tech-pricing-guide → title ✓ h1 ✓ canonical ✓ description ✓
✅ /tools/nail-tech-cancellation-policy-generator → title ✓ h1 ✓ canonical ✓ description ✓
✅ /learn/nail-tech-deposit-policy → title ✓ h1 ✓ canonical ✓ description ✓
```

Canonical uniqueness: each page has exactly **1** canonical tag pointing to its own URL. No bleed-through from homepage prerender.

---

## Per-page content summary

### `/tools/nail-tech-pricing-calculator`
- **H1:** "Free Nail Tech Pricing Calculator — Set Your Rates in Minutes"
- **Schema:** WebPage + BreadcrumbList + FAQPage
- **Tool inputs:** appointment duration, material cost, target hourly rate, monthly overhead, monthly appointments, profit margin
- **Output:** transparent per-line formula breakdown (labour cost, overhead per appointment, base price, final price)
- **Copy-to-clipboard** results button
- **Static SEO content below tool:** how the formula works (4 cards), what cost-based doesn't capture (5 points), worked gel manicure example, 4 FAQs
- **Internal links:** `/learn/nail-tech-pricing-guide`, `/nail-tech-deposits`, `/`

### `/best-booking-app-for-nail-techs`
- **H1:** "Best Booking Apps for Nail Techs in 2026: An Honest Comparison"
- **Schema:** Article + BreadcrumbList + FAQPage
- **Transparency banner:** amber, prominent, "Published by Nelsy"
- **TableOfContents:** 8 sections
- **Comparison table:** Nelsy vs Fresha vs Booksy vs GlossGenius across 7 dimensions (no pricing claims — uses durable product-philosophy dimensions)
- **4 platform deep-dives** using `PlatformSection` component (strengths + considerations grids)
- **"Best fit by nail tech type"** section (4 scenarios)
- **"Verify current features"** disclaimers throughout
- **Internal links:** `/fresha-alternative-nail-techs`, `/booksy-alternative-nail-techs`, `/nail-tech-deposits`, `/instagram-booking-for-nail-techs`

### `/learn/how-to-get-more-nail-clients`
- **H1:** "How to Get More Nail Clients"
- **Schema:** Article + BreadcrumbList
- **TableOfContents:** 10 sections
- **Sections:** Instagram profile optimisation, nail photography, content strategy (table), booking friction, deposits, referrals, rebooking, client retention, reviews/local discovery, pricing clarity
- **~2,000 words** of nail-tech-specific copy
- **Internal links:** `/nail-tech-deposits`, `/learn/nail-tech-pricing-guide`, `/best-booking-app-for-nail-techs`, `/instagram-booking-for-nail-techs`

### `/learn/nail-tech-pricing-guide`
- **H1:** "Nail Tech Pricing Guide: How to Set Your Rates and Charge What You're Worth"
- **Schema:** Article + BreadcrumbList + FAQPage
- **TableOfContents:** 9 sections
- **Sections:** why pricing matters, cost-based pricing formula, what costs to include (6-card grid), market positioning (3 tiers), service menu structure, nail art pricing (table), raising prices, displaying prices on booking page, 4 FAQs
- **Internal links:** `/tools/nail-tech-pricing-calculator`, `/nail-tech-deposits`, `/tools/nail-tech-cancellation-policy-generator`, `/studio/maya`

### `/tools/nail-tech-cancellation-policy-generator`
- **H1:** "Cancellation Policy Generator for Nail Techs"
- **Schema:** WebPage + BreadcrumbList + FAQPage
- **Tool inputs:** business name, notice window (12/24/48/72h), late cancellation fee (deposit/25%/50%/100%), no-show policy (5 options), rescheduling terms, late arrival grace period, deposit toggle
- **Live policy preview** — updates as user changes settings
- **Copy-to-clipboard** button
- **Disclaimer:** "template for informational purposes, not legal advice"
- **Static SEO content below:** why nail techs need a policy, what to include (6 cards), where to publish, how to enforce, 4 FAQs
- **Internal links:** `/nail-tech-deposits`, `/learn/nail-tech-deposit-policy`, `/learn/nail-tech-pricing-guide`

### `/learn/nail-tech-deposit-policy`
- **H1:** "Nail Tech Deposit Policy: How to Write and Enforce One"
- **Schema:** Article + BreadcrumbList + FAQPage
- **TableOfContents:** 8 sections
- **Sections:** why deposits matter (with/without comparison grid), how much to charge (table by service type), refundable vs non-refundable (3 approaches), writing the policy (example language), communicating it (4 placements), handling objections (3 scenarios), collecting deposits, 4 FAQs
- **Internal links:** `/nail-tech-deposits`, `/tools/nail-tech-cancellation-policy-generator`

---

## Content quality standards applied

- ✅ No fabricated statistics, reviews or competitor claims
- ✅ Comparison pages carry transparency disclosure banners
- ✅ All competitor comparisons use durable product-philosophy dimensions (no pricing claims)
- ✅ "Verify with each provider" notes on comparison content
- ✅ Tool disclaimers ("not legal advice", "template")
- ✅ All copy is nail-tech-specific — no generic booking software copy
- ✅ Natural Nelsy CTAs — not keyword-stuffed, editorially justified
- ✅ Premium Nelsy visual identity preserved (PINK #F52B8C, Framer Motion, consistent layout)

---

## Internal linking map (Wave 2 additions)

```
/tools/nail-tech-pricing-calculator
  → /learn/nail-tech-pricing-guide
  → /nail-tech-deposits
  → /

/best-booking-app-for-nail-techs
  → /fresha-alternative-nail-techs
  → /booksy-alternative-nail-techs
  → /nail-tech-deposits
  → /instagram-booking-for-nail-techs

/learn/how-to-get-more-nail-clients
  → /nail-tech-deposits
  → /learn/nail-tech-pricing-guide
  → /best-booking-app-for-nail-techs
  → /instagram-booking-for-nail-techs

/learn/nail-tech-pricing-guide
  → /tools/nail-tech-pricing-calculator  (cluster link)
  → /nail-tech-deposits
  → /tools/nail-tech-cancellation-policy-generator
  → /studio/maya

/tools/nail-tech-cancellation-policy-generator
  → /nail-tech-deposits
  → /learn/nail-tech-deposit-policy
  → /learn/nail-tech-pricing-guide
  → /learn/how-to-get-more-nail-clients

/learn/nail-tech-deposit-policy
  → /nail-tech-deposits
  → /tools/nail-tech-cancellation-policy-generator
  → /learn/nail-tech-pricing-guide
  → /learn/how-to-get-more-nail-clients
```

---

## Regression check

No changes were made to:
- Booking flow (`BookingModal`, `PaymentForm`, `bookingStore`)
- Stripe integration (`stripe.ts`, edge functions)
- Supabase integration
- Onboarding flow (`/onboarding`, `/onboarding-stripe`, `/stripe/return`)
- Dashboard (`/dashboard/*`)
- Auth (`/login`, `ForgotPassword`, `ResetPassword`)
- Wave 1 pages (no content changes)

---

## Sitemap (post-Wave 2)

13 URLs total: `/` (1.0), 4 Wave 1 pages (0.8–0.9), 6 Wave 2 pages (0.8–0.9), `/terms` (0.3), `/privacy` (0.3).

---

Wave 2 complete. Wave 3 not started per instructions.
