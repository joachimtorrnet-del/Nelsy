# Landing proportions: stan.store vs Nelsy

Measured 2026-11-27 with puppeteer (390x844 @2x mobile, 1440x900 desktop). Stan serves an A/B test:
the **"plans-first"** variant (hero, skills, place to sell, creators, plans, FAQ, closing) is the one
Nelsy's landing follows and the one measured below. The other variant (purple "All-in-One Creator
Store" hero, testimonial wall, comparison table) was ignored. Only proportions were taken, no copy or
visuals. Values are px; "before" is the landing before this pass, "after" is the current one.

## Layout

| | Stan 390 | Stan 1440 | Nelsy before 390 / 1440 | Nelsy after 390 / 1440 |
|---|---|---|---|---|
| Content container | 23 gutter | 1240 max, 48 gutter (1144 content) | 20 / 1152 max, 32 gutter (1088) | 24 / 1240 max, 48 gutter (1144) |
| Hero height | 1039 | 1000 | 1054 / 796 | 989 / 919 |
| Hero h1 (size / line / weight) | 36 / 39.6 / 800 | 60 / 66 / 800 | 38.4 / 39.9 / 700, 67.2 / 69.9 / 700 | 36 / 39.6 / 700, 60 / 66 / 700 |
| Hero body | 15 / 24 | 18 / 28.8, 430 wide | 18 / 29.3, 520 wide | 15 / 24, 18 / 29, 430 wide |
| Hero CTA (h / pad-x / font) | 60 / 24 / 16 | 69 / 30 / 19 | 60 / 36 / 18 both | 60 / 30 / 16, 69 / 30 / 19 |
| Hero visual | 396x454 full bleed | 680x780 at x=658 | 350x374 / 520x556 at x=744 | 390x417 full bleed / 680x727 at x=660 |
| Skills section padding | 60 / 65 | 100 / 100 | 80 / 112 | 60-64 / 100 |
| Skills h2 | 35 / 40.3 | 44 / 50.6 | 33.6 / 54.4 | 34 / 44 (line 1.15) |
| Skills gallery | 282x380 cards, radius 14, gap 16 | 648 wide, radius 14 | 273x341 r24 / 2x278x348 | 280x374 r14 / 2x2 312x312 r14, 640 wide |
| Place section padding | 55 | 75 | 80 / 112 | 55 / 75 |
| Place h2 | 34 / 40.8 | 48 / 55.2 | 33.6 / 54.4 | 34 / 48 |
| Place phone mockup | 279x514 | 308x567 | 300x512 both | 280x514 / 308x567 |
| Section CTA | 61-62 h, 28 pad-x, 15-16 font | same | 56-60 h, 32-36 pad-x, 16-18 | 61-62 h, 28 pad-x, 15-16 |
| Pricing padding | 72 | 112 | 80 / 112 | 72 / 112 |
| Pricing h2 | 24 / 28.8 / 700 | same | 32 / 44.8 | 24 / 28.8 / 700 |
| Billing toggle | 208x54, 5 pad, 44 h buttons | same | 40 h buttons | 54 h, 44 h buttons |
| Plan grid | stacked, gap 27 | 1084 wide, 3x353, gap 12 | 1 card, 576 max | stacked gap 28 / 1084 wide, 3x353, gap 12 |
| Plan card | radius 12, border 2, head pad 30/20, name 32/800, price 32 | same | radius 24, 1 card | radius 12, border 2, head pad 30/20, name 32, price 32 |
| Pricing CTA | 344x61 | 650x62 | 350x60 / 512x60 | 342x62 / 650x62 |
| FAQ padding | 60 | 86 | 80 / 112 | 60 / 86 |
| FAQ h2 | 32 / 38.4 | 38 / 45.6 | 33.6 / 54.4 | 32 / 38 |
| FAQ rows | 71 h, 15 / 800 | 75 h, right column 569 | ~68 h, 18 / 700 | 71 / 75 h, 15 / 700, right column 570 |
| Closing padding | 65 | 85 | 80 / 112 | 65 / 85 |
| Closing h2 | 39 / 44.9 | 64 / 73.6 | 38.4 / 57.6, 67.2 / 100.8 | 39 / 44.9, 64 / 73.6 |
| Closing CTA | 204x64, 16 | 221x69, 19 | 350x60 (full width), 210x60 | 180x64, 196x69 / 19 |
| Header | 85 h bar | 100 h bar | floating pill 52 h, top 12 | unchanged (sitewide) |
| Footer | 95 h, 1 row | 99 h, 1 row | 1370 / 594 dark link hub | unchanged (sitewide SEO link hub) |

Notes
- Inter is loaded up to weight 700 only, so headings stay 700 where Stan uses 800.
- The SiteNav pill and SiteFooter are shared by every public page. The footer is the internal linking
  hub for SEO, so it keeps its links even though Stan's footer is a single row.
