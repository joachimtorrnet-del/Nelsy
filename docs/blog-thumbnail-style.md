# Blog thumbnails: what Stan does, and the Nelsy system

Studied on November 27, 2026 with puppeteer at 1440x900 and 390x844: the Stan blog home
(stan.store/blog), its category archive, 45 article thumbnails across all 8 categories
(downloaded through the public WordPress media endpoint to look at them side by side) and
6 article heroes (gumroad-alternatives, how-to-sell-an-ebook, stan-store-vs-skool,
instagram-content-ideas, how-to-make-money-on-tiktok, a creator case study).
Screenshots and contact sheets live outside the repo (scratchpad `thumbs/stan/`).

Only architecture and style are recorded here. No Stan text, image, illustration or
third-party logo is reused in Nelsy. See also `docs/blog-stan-anatomy.md` for the article page.

## 1. Stan thumbnail findings

### Format
- **16:9** everywhere (masters are 2157x1214, served at 1536x864 / 768x432). The same file is the
  card image, the hero image and the og:image.
- Full bleed, no frame or border inside the image; the card or hero adds the rounded corners.

### Composition: text on the image, always
Every thumbnail carries a **short cover headline written for the image**, not the article title:
2 to 5 words ("Wix Alternatives for Creators", "Create & Sell an Ebook", "Coaching Calls").
The headline is what makes the card readable before the card text is read.

The layout is almost always **text left, visual right** (about 50/50), with the headline
top-left or vertically centred, and 7 to 9% padding. A few covers centre the headline above the visual.

Visual on the right, by article type:
| Article type | What Stan shows |
|---|---|
| "Best X" / "X alternatives" (Getting Started) | Glossy 3D glass objects on the brand-colour field; the competitor's logo mark as a 3D badge on some |
| "A vs B" | Both brand names set big, a round "VS" badge between them, a one-line question under it |
| How-to on own product (Stan Success) | Lavender gradient, small dark "HOW TO" pill above a medium-weight 2-3 word title, a person cut-out photo filling the right half |
| Creator case study | Inset brand-colour panel, creator name in heavy italic, "Creator Spotlight" badge, person cut-out breaking out of the panel |
| Marketing / insights | Photo-led: a full-bleed lifestyle or object photo with the headline set in **white label boxes** (black text on white rectangles, like stickers), or a giant app-icon style tile |
| Product features | Product UI mockups: phone with the app, laptop with a dashboard, floating UI cards, icon line art |
| Listicles / trends | The number set much larger than the rest ("5" over "Gumroad Alternatives", "8 Trends", "66 ideas" in the photo version) |

### Colour
- One dominant brand colour (violet/indigo) on about 70% of covers; categories are told apart by
  **treatment** (glass 3D, lavender how-to, purple spotlight panel, photo-led) more than by hue.
- Light text on the saturated field, dark text on white label boxes; contrast is always high.

### Typography on the image
- Heavy geometric sans (800 to 900 weight) for the headline, sized about 9 to 12% of the image
  height, 2 to 3 lines max, tight leading (about 1.0). A serif display face appears on editorial
  covers ("8 Trends", "By Creators for Creators").
- Small pills / labels in caps ("HOW TO", "NEW FEATURE") at about 3% of the height.
- At the 390px phone card width the headline still renders at about 15 to 18 px: legible.

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

Generator: `scripts/generate-blog-covers.mjs` (puppeteer renders HTML/CSS, sharp encodes).
Article metadata is loaded with `scripts/lib/load-articles.mjs` (esbuild bundle of the article
files), so the script sees the same `coverTitle`, category and cover photo as the app.

Outputs per article in `public/blog-covers/`:
- `<slug>.webp` 1200x675 (16:9): blog cards, featured card and article hero.
- `<slug>.jpg` 1200x675: `og:image`, `twitter:image` and the Article JSON-LD image
  (JPEG because some link preview crawlers still skip WebP).

### Headline
Each article has `coverTitle` in its metadata: 2 to 6 words, no em dashes, numbers only when the
article title has them ("50 Chrome Nail Ideas", "Fresha vs Booksy", "Stop Undercharging").
Set in Playfair Display 800, auto-fitted from 96px down to about 58px on the 1200px canvas
(about 18 to 28px on a 390px phone card).

### Templates
| Template | When | Composition |
|---|---|---|
| `vs` | coverTitle contains " vs " | Two big name chips with a pink tilted "vs" badge, an italic "for nail techs" line, and "Also compared: Nelsy" when the article covers Nelsy |
| `compare` | alternatives, "worth it", reviews, "best apps" with 2+ tools named in the article | Headline left, stacked text chips of the tools on the right, Nelsy first in pink with a check. Plain text only, never logos |
| `list` | coverTitle starts with a number | Giant Playfair number in the accent colour, the rest of the headline under it, two fanned photo stickers |
| `inspo` | Nail Inspo category | Full-bleed nail photo, number on a pink tag, headline on white label boxes |
| `guide` | everything else | Category or type pill ("How to", "Templates", "Fix it"), headline left, a photo sticker plus a Nelsy UI element on the right |

Nelsy UI elements for guides (pure HTML/CSS, chosen from the slug): booking card, deposit toggle,
week calendar with an open slot, DM bubbles with a booking link, phone with a link-in-bio page,
service menu, income bars, review card, numbered steps, checklist. They show no prices or stats.

Photos are the article's existing verified Unsplash cover photo (`coverPhotoFor`), shown as a
white-bordered sticker; no faces of identifiable people, no brand logos.

### Colour fields (all inside the Nelsy palette)
| Category | Field |
|---|---|
| Get Clients | Hot pink #F52B8C to #FF5FA8, white text |
| Booking & Software | Berry #9C1460 to #D61F7E, white text |
| Pricing & Money, Comparisons | Ink #1A1A1A with a pink glow, white text, pink accents |
| Branding & Growth, Salons | Plum #4A1035 to #7A1A55, white text |
| Policies & Clients | Blush #FFE1EE, ink text |
| Instagram & Content | Pink to peach #FFC2DC to #FFE0D2, ink text |
| Start Your Business | Dusty rose #F4C2C2, ink text |
| Nail Education | Pearl #FFF5F8 to #FDE4EE, ink text |
| Beauty Creators | Lilac pink #F6D3EE, ink text |
| Nail Inspo | Photo-led |

### Regenerating
`npm run generate:covers` renders missing covers, `npm run generate:covers:force` re-renders all,
`--slug=a,b` or `--only=vs,compare` narrow it. A new article needs a `coverTitle` or the script
stops. Budget: each WebP under about 80 KB.
