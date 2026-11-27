# Stan Store blog: article and home anatomy

Studied on November 27, 2026 with puppeteer at 1440x900 and 390x844: the blog home
(stan.store/blog) and 7 articles: gumroad-alternatives, stan-store-vs-skool,
best-membership-platforms, teachable-alternatives (comparison / "alternatives" / "vs"),
how-to-sell-an-ebook, how-to-monetize-instagram-2026, how-to-make-money-on-tiktok (how-to).

Only structure, density and layout are recorded here. No Stan text, images or illustrations
are reused anywhere in Nelsy.

## Article anatomy, in order

1. **Header bar**: brand nav with a single "Sign Up" button (UTM per article).
2. **Hero** (tinted full-width band):
   - Breadcrumb: `Blog > Category` (category is a link to its archive).
   - H1 serif, large (about 56px desktop, 32px mobile).
   - Author row: square avatar photo, "By Name", "Updated: date". No read time shown.
   - "Summarize with" pills: ChatGPT, Perplexity, Claude, Gemini, Grok.
   - Cover on the right on desktop (illustrated 3D cover with the title on it), below the meta on mobile.
3. **Audio player** (text-to-speech of the article) above the body.
4. **TL;DR card**: thick dark border, cream background, pill label "TL;DR", a one-sentence answer
   as a big bold heading, then a 3 to 4 column "Best for" grid (one cell per option), then a short
   highlighted line. On how-to posts the TL;DR is a plain H2 section with bullet points.
5. **Two-column body** on desktop: left aside 280px, content about 900px.
   - Left aside is `position: sticky` for the whole article (870px tall): "Table of contents"
     (all H2 and some H3, active item highlighted with a left bar), then a newsletter card
     (eyebrow, serif heading, email field, button), then share icons (Facebook, LinkedIn, X, copy link).
   - On mobile the aside is gone; no TOC is shown.
6. **Body rhythm**: H2 per section, short paragraphs (2 to 4 lines), bold lead-ins,
   "Best for:" line after each product in comparison posts.
7. **In-body CTA blocks** ("Promoted" label on a tinted card with a phone mockup, headline,
   one-line subhead and a pill button such as "Get N days free"). Frequency: about every
   2 to 3 H2 sections, 3 to 4 per comparison article, 2 to 3 per how-to. The first one sits right
   after the comparison table (about 25 to 35% down the page).
8. **Comparison tables**: one big table per comparison post, 3 to 9 columns. In "vs" posts the
   own-brand column header is filled with the brand color and its cells are lightly tinted;
   feature rows use check marks or short labels ("Limited", "No booking tool"). In "alternatives"
   posts the table is one row per platform, columns: best for, free entry, courses, fees, verdict.
   Price notes sit under each plan name in the header.
9. **Images**: product screenshots of each tool reviewed (one per H2 in comparison posts) plus
   promo banners. Measured in-body images: 13, 5, 11, 14 (comparison), 9, 5, 6 (how-to).
   Every product section opens with its screenshot, full content width, rounded corners.
10. **Inline product mentions**: own product is always listed first ("Best overall for ...")
    in alternatives posts, with its own screenshot and a text CTA link.
11. **End-of-article CTA**: an H2 like "Start selling more with ..." plus a paragraph with a
    "Start your free trial" link, then an author bio card.
12. **FAQ**: present on how-to posts (4 to 10 questions, H2 "FAQ: topic"), with FAQPage JSON-LD.
    Absent on the comparison posts studied.
13. **"You might also like..."**: 6 cards (cover, category eyebrow, date, title, "Read more"),
    3 columns, same category.
14. **Newsletter band** (full-width brand color) and footer.

## Internal link density (body only, measured)

| Article | Words | Links in body | Internal | Internal per 1,000 words |
|---|---|---|---|---|
| gumroad-alternatives | 1,556 | 18 | 14 | 9.0 |
| stan-store-vs-skool | 1,378 | 11 | 11 | 8.0 |
| best-membership-platforms | 1,431 | 16 | 13 | 9.1 |
| teachable-alternatives | 1,723 | 20 | 17 | 9.9 |
| how-to-sell-an-ebook | 3,249 | 20 | 17 | 5.2 |
| how-to-monetize-instagram-2026 | 4,213 | 37 | 27 | 6.4 |
| how-to-make-money-on-tiktok | 4,876 | 47 | 36 | 7.4 |

About 5 to 10 internal links per 1,000 words in the body, roughly half to other blog posts and
half to product / signup pages, plus 6 related cards and the nav/footer. External links are rare
(0 to 11) and point to sources.

## Structured data

Every article: `Article`, `WebPage`, `ImageObject`, `BreadcrumbList`, `WebSite`, `Organization`,
`Person` (author). How-to posts with FAQ add `FAQPage` with `Question` entries.
Blog home: `WebPage`, `BreadcrumbList`, `WebSite`, `Organization`.

## Blog home anatomy

1. Masthead: centered serif H1 (blog name), one-line description, two decorative stickers.
2. Featured post: one wide card split 50/50, cover left, right side with category pill, date pill,
   serif title (H2), excerpt starting with the TL;DR, "Read article" pill button.
3. "More to explore" (serif H2) with a category dropdown on the left and a search field on the right.
4. Card grid: 3 columns on desktop, 1 on mobile, 9 cards per page. Card = cover (16:9), category
   eyebrow + date, title, "Read more" link. Thin border, no shadow.
5. Pagination (1, 2, 3 ... 25).
6. Newsletter band: full-width brand-color card, serif heading, email field + button.
7. Footer.

## What Nelsy takes from this (structure only)

- Hero with breadcrumb, H1, author, dates, read time, summarize pills, cover.
- TL;DR card first, sticky left TOC + sidebar CTA card + share on desktop, collapsible TOC on mobile.
- Auto-inserted mid-article CTA after about 40% of the sections, end CTA, FAQ with FAQPage.
- Comparison tables with the own-brand row or column highlighted in the brand color.
- At least 3 images per article (cover + in-body photos).
- Related articles (3 cards), curated links to tools and feature / use-case pages.
- Blog home: masthead, featured post, category navigation, search, card grid, tools / CTA band.
