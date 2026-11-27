# Blog thumbnails: what Stan does, and the Nelsy system

Studied on November 27, 2026 with puppeteer at 1440x900 and 390x844: the Stan blog home
(stan.store/blog), its category archive and article heroes, then **all 222 published Stan
article thumbnails** (every category, downloaded through the public WordPress media endpoint
and laid out on contact sheets to compare them side by side).
Screenshots and contact sheets live outside the repo (scratchpad `thumbs/stan/`, `thumbs/stan2/`).

Only architecture and style are recorded here. No Stan text, image, illustration or
third-party logo is reused in Nelsy. See also `docs/blog-stan-anatomy.md` for the article page.

## 1. Stan thumbnail findings

### What every family shares
- **16:9**, full bleed, no frame; the card adds the rounded corners.
- **One colour family**: violet / indigo gradients (#5B4BF5 to #8A5CF6, lavender #C9C2FF for
  light covers) on about 85% of covers. Off-palette colour only comes from photos.
- **Type**: a heavy geometric sans (800 to 900), white on the field or ink on white boxes, tight
  tracking (about -0.03em) and leading (about 1.0). Headline 9 to 14% of the image height,
  2 to 3 lines, 2 to 5 words. Italic heavy sans for names and label boxes. A condensed serif
  appears only on a few editorial covers ("8 Trends", "By Creators for Creators").
- **Scale**: the visual is big and confident. Objects, tiles and people fill 40 to 60% of the
  frame, often cropped by the edge; nothing reads as a small sticker.
- **Depth**: glossy highlights, soft coloured drop shadows, a light radial glow behind the
  subject, sometimes a glass blur.
- **Layout**: text left, visual right (about 50/50) on most families; centred text on the
  editorial ones. 6 to 8% padding. A tiny Stan mark on some covers only.

### Style family catalogue (counts are out of the 222 thumbnails)
| # | Family | Example | Composition | Typography | Colour and depth | Share |
|---|---|---|---|---|---|---|
| 1 | Glossy 3D objects | "Best Membership Platforms", "Wix Alternatives" | Headline left (50%), 1 to 3 glass or glossy 3D objects right, filling 45 to 60% of the frame, some cropped | White 800, 3 lines, optional lighter 2nd line ("for Creators") | Saturated violet gradient, iridescent glass, strong highlights, soft glow | ~5% |
| 2 | Big number + highlight + emblem | "5 Gumroad Alternatives", "125+ Digital Product Ideas" | Huge number top-left, next line on a tilted white highlight bar, last line plain; big 3D shape right with an emblem badge | Number 2 to 3x the headline size | Violet gradient, glossy 3D ribbon/knot | ~2% |
| 3 | How-to with person | "Make Money Online Coaching", "Coaching Calls", "Email Marketing" | Small dark "HOW TO" pill, short medium-weight headline left on lavender, a person photo on the right half with a diagonal or fading edge | 600 to 700, deep violet | Light lavender gradient, photo blends into the field | ~6% |
| 4 | Platform monetize | "How to Monetize Substack", "LinkedIn for Creators" | Centred: light italic line + very big platform name | Italic 400 line, bold name | Platform-coloured field or desaturated money texture | ~4% |
| 5 | Photo + white label boxes | "Create & Sell an Ebook", "Turning Posts into Partnerships", "Future-Proof Your Brand" | Full-bleed photo; headline on white rectangles stacked like stickers, one word in colour; a 3D badge sticker | Heavy italic ink | Photo-led, flat white boxes, small 3D badge | ~5% |
| 6 | Cheat sheet / guide frame | "Instagram Format Cheat Sheet" | Centred headline, thin framing lines, corner brackets, crosshair nodes | Bold, gradient text, small year above | Near-white with pastel side glows | ~1% |
| 7 | App-icon tile + white card | "The TikTok Profit Playbook" | Giant rounded app tile left (about 40% of the width), white rounded card right with the title and a coloured last line | Ink 800 in the card | Violet field, tile with deep shadow | ~2% |
| 8 | Creator spotlight | "Alycia Sullivan", "Jessica Carter" (about 40 covers), "Creator Bio" phone variant (about 35) | Inset violet panel, name in heavy italic top-left, "Creator Spotlight" badge, person cut-out on the right breaking out of the panel; bio variant shows a big phone with the profile | Heavy italic white | Violet panel on lighter frame, glow behind the person | ~35% |
| 9 | Search pill on blurred photo | "Turn Views into Sales" | Blurred full-bleed photo, centred frosted pill with a search glyph and the headline | White 600 | Blur + tint, glass pill with inner highlight | ~1% |
| 10 | Flat illustrated objects | "Lead Magnets" (envelopes + magnet), "Plans & Prices" (piggy banks), keys + lock, hearts in bubbles | A field of repeated objects plus one hero object; often no text, or label boxes | Label boxes when present | Pastel lavender, soft shadows | ~4% |
| 11 | A vs B | "Stan Store vs Shopify / Kajabi / Linktree" | Names on top with a "VS." chip, two overlapping app tiles centred, concentric rings | White 600 names | Violet with ring pattern | ~3% |
| 12 | Phone + stat badge | "500K+ in 9 months", "over 15k in 30 days" | Huge tilted phone cropped by the frame, a big round badge | Bold violet in the badge | Light lavender | ~2% |
| 13 | Blueprint | "Order Bumps", "Funnels." | Grid field, white line-art wireframes and arrows, outlined "NEW FEATURE:" label, big pale headline left | Bold, pale lavender, embossed | Deep violet, thin lines | ~1% |
| 14 | Torn paper | "By Creators for Creators" | White torn-paper band across the field, centred headline | Condensed italic display | Violet above and below | ~1% |
| 15 | Floating product UI | "Order Bumps success", "Community success", "Lead magnet success" | Product cards, phone and laptop floating with 3D icons and dashed connectors; usually no headline | n/a | Lavender, soft shadows | ~5% |
| 16 | App tile cluster | "Stan Store Alternatives" | Own tile big in the middle, competitor tiles around it | n/a | Violet | ~1% |
| - | Events and editorial | "Stan Sessions Atlanta", "Dare to Dream", "8 Trends" | Photo of the city or event with centred title, serif editorial type | Mixed | Violet tint | ~15% |

What makes the grid feel like Stan: the shared violet field and heavy sans across very different
compositions, so neighbouring cards never repeat a layout but always look like one brand.

### Card anatomy below the image (blog home and archives)
- Image 16:9 on top, card 421px wide on desktop, thin 1px border, square-ish corners, no shadow.
- Eyebrow: CATEGORY in brand colour caps + dot + date (Oct 27 2026), 14px.
- Title: regular weight sans, 20px / 30px, 2 lines.
- "Read more" with arrow. No excerpt and no read time on grid cards; the featured card adds
  the TL;DR excerpt and a pill button.
- Hover: no zoom, no shadow; the cursor and the link are the only change. (Nelsy keeps a light
  border and title colour change.)

### Listing and density
- Masthead: centred serif H1 + one-line description, two decorative stickers.
- Featured: one wide card, image left 50%, right panel tinted, category + date pills, serif H2,
  2-line excerpt, pill button.
- "More to explore": category dropdown left, search right, grid of **3 columns x 3 rows = 9 cards**
  per page on a 1320px container with about 26px gaps, 1 column on mobile, numbered pagination.
- Newsletter band, footer.

### Article hero
- Tinted full-width band. Left: breadcrumb (Blog > Category), serif H1 (about 40 to 48px),
  author row, "Summarize with" AI pills. Right: the 16:9 cover at about 560px wide with rounded
  corners and a soft shadow. On mobile the cover sits under the meta, full width.

## 2. Nelsy cover system

Generator: `scripts/generate-blog-covers.mjs` (puppeteer renders HTML/CSS/SVG, sharp encodes).
Article metadata is loaded with `scripts/lib/load-articles.mjs`, so the script sees the same
`coverTitle`, category and cover photo as the app. Objects: `scripts/lib/cover-objects.mjs`.

Outputs per article in `public/blog-covers/`:
- `<slug>.webp` 1200x675 (16:9), at most 80 KB (quality steps down automatically if needed):
  blog cards, featured card and article hero.
- `<slug>.jpg` 1200x675: `og:image`, `twitter:image` and the Article JSON-LD image.

### Identity
- **Type**: Plus Jakarta Sans 800 (OFL, latin subset embedded from `scripts/assets/fonts`),
  tracking -0.035em, leading 1.02; heavy italic for label boxes, spotlight and torn covers.
  No serif on covers. Headlines auto-fit (about 60 to 110px on the 1200px canvas, so 19 to 36px
  on a 390px phone card).
- **Colour**: one pink family, like Stan's violet one. Fields: hot (#FF5FA8, #F52B8C to berry
  #8A1457), berry (#B0186E to #4F0A33), rose (#FFB3D2 to #F52B8C, deep berry text), blush
  (#FFEAF2 to #FFC2DA) and ink (#1A1A1A with a pink glow) for some comparisons and money covers.
- **Mark**: small "Nelsy" with a dot. Reviews ("worth it", "review" in Comparisons) are
  neutral: no mark, no Nelsy tile, no check.
- **Objects**: original glossy SVG drawings (polish bottle, gel pot, UV lamp, calendar, phone,
  envelope, magnet, coins, booking card, seal badge, star, nail file, lash wand, brush, ring
  light, price tag, chat bubble, heart, chart, gift, clock, lock, clipboard, house, megaphone,
  app tile). Same light model on all: horizontal light sweep, dark underside for thickness,
  top-left gloss, soft coloured drop shadow. Hero objects are 400 to 520px wide.
- **Platforms and brands**: never a logo or wordmark. Generic glyph tiles (camera body, music
  note, search, pin, calendar, scissors...) and the name in plain Jakarta text.
- **Photos**: the article's verified Unsplash photo. On macOS, 34 reviewed photos (hands, nails,
  products) get a true background removal with Apple Vision (`scripts/lib/cutout.swift`,
  on-device, compiled on first run); elsewhere those covers use the framed photo instead.

### Families (Nelsy version of each Stan family)
| Family | Nelsy cover | Used for | Count |
|---|---|---|---|
| `glass` | Field + white headline left, 3 glossy objects right (hero 470px) | Most topics | 30 |
| `number` | Huge number, highlight bar, chunky object + ink glyph tile | Numbered titles outside Nail Inspo | 8 |
| `howto` | Blush field, ink pill, deep berry 700 headline, hand cut-out on a diagonal pink panel or diagonal photo | Nail education how-tos, some inspo and business | 21 |
| `platform` | Italic line + giant platform name with a glyph tile, faint glyph pattern | "Clients From Google", "Get Paid on Instagram" | 6 |
| `labels` | Full-bleed photo, white italic label boxes, last word pink, 3D seal sticker | Nail Inspo, seasonal marketing, photo topics | 14 |
| `cheatsheet` | Pearl field, thin frame lines, gradient pink headline centred | Explained, guides, examples, policies | 16 |
| `apptile` | Giant glossy glyph tile + white title card with a pink tag line | Templates, TikTok/Reels, apps, money | 22 |
| `spotlight` | Inset pink panel, heavy italic headline, badge, cut-out or arched photo | Nail Inspo, nail education | 17 |
| `search` | Blurred photo, frosted search pill with the headline | "Why..." fixes, local and SEO, some inspo | 14 |
| `flat` | Pastel field of repeated objects + hero object, label-box headline | Lead magnets, referral, gifts, seasonal | 14 |
| `vs` | Names + "VS." chip, two overlapping glyph tiles on rings | Every " vs " title | 8 |
| `phone` | Big tilted phone (booking or profile page) + round glyph badge | Link in bio, online booking, Instagram | 16 |
| `blueprint` | Berry grid, line-art wireframes, dashed label, pale headline | Templates, policies, checklists | 12 |
| `torn` | Torn white paper band, berry italic headline | Questions, mindset, branding | 9 |
| `ui` | Floating Nelsy cards (deposit, calendar, menu, income, DMs) + object | Booking software, pricing, policies | 20 |
| `tiles` | Cluster of glossy tiles around a hero tile (Nelsy tile on comparisons, neutral on reviews and alternatives) | Booking apps, alternatives, reviews | 9 |

Counts are for the 236 articles at the time of writing (largest family 13%).

### Distribution rules (`assignFamilies`)
- Each category has a preference order (e.g. Nail Inspo: labels, spotlight, howto, search;
  Policies: blueprint, ui, glass...). Topic rules move a family up (" vs " forces `vs`,
  a platform name favours `platform`, "explained" favours `cheatsheet`, templates favour
  `blueprint`, lead magnets and gifts favour `flat`...).
- Articles are walked in display order (newest first). A family is skipped when either of the
  previous two articles of the same category used it, when it was used by the last two covers
  overall (penalty), or when it reached 25% of all covers; over-used families get a growing
  penalty so the grid stays varied.
- `--plan` prints the assignment without rendering.

### Headline
Each article has `coverTitle` in its metadata: 2 to 6 words, no em dashes, numbers only when
the article title has them.

### Regenerating
`npm run generate:covers` renders missing covers, `npm run generate:covers:force` re-renders all
(about 80 seconds), `--slug=a,b` or `--only=glass,vs` narrow it. A new article needs a
`coverTitle` or the script stops. New photos only get a cut-out once added to `CUTOUT_OK`
after checking the result.

### Not reproduced
- Stan's iridescent glass (refraction, chromatic edges) comes from 3D renders; the SVG objects
  are glossy plastic and glass-like, not ray-traced.
- Person cut-outs: the Nelsy photo pool is hands and products, so the spotlight and how-to
  families cut out hands, products and tools instead of people.
- Event and editorial covers (city photos, serif titles) have no Nelsy equivalent yet.
