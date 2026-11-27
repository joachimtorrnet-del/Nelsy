# Shop my kit (Creator plan)

A nail tech lists the products she uses and recommends (UV lamp, builder gel, files, cuticle
oil...) with HER affiliate links (Amazon Associates, brand codes, distributor links) and optional
promo codes. They show on her studio page as a "Products I use" section, like an Amazon
storefront or LTK. Nelsy never sells these products, never takes a cut, and never shows prices.

Plan gating uses the existing Creator feature key `affiliates` (src/lib/plans.ts), which now means
Shop my kit. Prices, tiers and availability are unchanged (Creator stays `available: false`).

Status: code is ready, **nothing is applied or deployed**. See "Go-live steps".

## Data model

Migration: `supabase/migrations/20261128_03_shop_my_kit.sql` (idempotent; run twice in a local
PGlite Postgres with RLS checks, see "Test plan").

### `kit_items`
| column | notes |
|---|---|
| id, profile_id → profiles (cascade) | |
| title (1..120) | product name |
| note (≤ 280) | short "why I use it" |
| brand (≤ 60), category (1..40, free text) | dashboard suggests Gel & polish, Tools, Lamps, Care |
| image_url | https only; public URL in `kit-images` |
| url | https only, real host with a dot, no spaces, no `user:pass@`, ≤ 2048 (CHECK) |
| promo_code | `^[A-Za-z0-9][A-Za-z0-9_.-]{0,39}$` |
| position, is_active, created_at, updated_at | trigger keeps updated_at |

A trigger caps a pro at 100 items.

### `kit_settings`
`profile_id` (PK), `title` (1..60, NULL = default "Products I use"). Owner CRUD.

### `kit_clicks`
`id`, `kit_item_id` (cascade), `profile_id`, `clicked_at`, `referrer_host`.
**No IP, no user agent, no visitor id, no cookie.** `referrer_host` is the bare host of the page
that sent the visitor to the studio (e.g. `instagram.com`), never a full URL.

### `public_kit_items` view
`security_invoker = false`, same pattern as `public_products`. Active items of published studios
(subscription not inactive/incomplete/canceled) whose plan has the feature
(`plan_has_shop_my_kit(plan)`: Creator or Salon). Adds `section_title` from `kit_settings`.
SELECT only for anon/authenticated.

### Functions
- `plan_has_shop_my_kit(text)`: SQL mirror of `hasFeature(plan, 'affiliates')`.
- `record_kit_click(item_id, referrer_host)`: SECURITY DEFINER, **service_role only**. Looks the
  item up in `public_kit_items`, returns its URL (NULL if not public). Stores the click unless the
  item already has 60 clicks in the last minute or the studio 5000 in the last day (flood guard;
  the URL is still returned so visitors are never blocked).
- `my_kit_click_counts()`: SECURITY INVOKER, authenticated. Per item clicks in the last 7 and 28
  days for `auth.uid()`.

### RLS summary
| object | anon | authenticated pro | service_role |
|---|---|---|---|
| kit_items | no access | CRUD own rows | all |
| kit_settings | no access | CRUD own row | all |
| public_kit_items | SELECT | SELECT | all |
| kit_clicks | no access | SELECT own rows. INSERT/UPDATE/DELETE revoked | all (via record_kit_click) |
| storage `kit-images` (public, 5 MB, png/jpeg/webp/gif) | public URLs | write own folder `<uid>/...` | all |

## Edge function `kit-click`
`supabase/functions/kit-click/index.ts`, std@0.208.0, public (`--no-verify-jwt`).

- `POST { id, ref? }` → `200 { url }` (used by the studio page, fire and forget)
- `GET ?id=<uuid>&ref=<host>` → `302 Location: <url>` (plain link fallback, not used by the page today)
- `404 { error: 'not_found' }` for hidden / deleted / unpublished / no-feature items.
- Per-visitor rate limit: 10 counted clicks per item per minute, keyed on a SHA-256 of
  (IP + item) held **in the isolate's memory only** for one minute. Above it the URL is still
  returned, the click is just not counted.
- Re-validates the destination is `https:` without credentials before returning it.

Secrets: only `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (already set for other functions).

## Front end
- Dashboard: `/dashboard/kit` (Sidebar > Grow > "Shop my kit", after Products; no Soon item was
  related, so it is a new live item and every Soon tab stays). File `src/pages/dashboard/Kit.tsx`.
  - Locked state (no `affiliates` feature): Creator upgrade panel with "Join the waitlist"
    (`mailto:hello@getnelsy.com?subject=Creator%20waitlist`), same pattern as Products.
  - List: up/down reorder, visible switch, edit; clicks per item with a 7 / 28 days toggle;
    section title (optional, default "Products I use"); empty state.
  - Editor: link (validated: https only, `https://` added when missing, `http://` refused with a
    message), name, brand, promo code, category (free text + suggestion chips), "why I use it",
    photo upload (5 MB, images only), visible switch, delete, live card preview.
- Public page: `src/components/studio/StudioKit.tsx`, rendered right after the products section
  on every template (default, Creator variants, Split, Editorial, Spotlight) through the existing
  `productsSection` slot in `PublicStudioView`. Renders nothing when the kit is empty.
  - Under the title, always: **"I may earn a commission from these links."**
  - Cards: photo (or category icon), brand, title, note, promo code chip (tap to copy, "Copied"),
    "Shop" button. All tap targets are 44 px. No prices, ever.
  - "Shop" is a normal link to the pro's own URL (`target="_blank"`,
    `rel="sponsored noopener noreferrer"`), so the affiliate URL is visible on hover and is not
    cloaked. The click is counted in parallel through `kit-click` (POST).
- Analytics (PostHog): `kit_item_clicked` {profile_id, kit_item_id, category, has_promo_code},
  `kit_promo_copied`, `kit_item_created` (dashboard).
- Plans copy: Creator highlight is now "Shop my kit with your affiliate links" with the detail
  "Recommend the products you use with your affiliate links" (PlanPicker).

## Legal notes
- Disclosure: FTC Endorsement Guides and the French influencer law (loi n° 2023-451 du 9 juin
  2023) require a clear disclosure of commercial links. The line is fixed in code, shown above the
  cards, and cannot be turned off by the pro. Links also carry `rel="sponsored"`.
- Amazon Associates: no prices are shown (the Operating Agreement forbids displaying Amazon prices
  unless pulled live through PA API), and links are not cloaked or shortened by Nelsy: the
  visitor goes straight to the URL the pro pasted. Product photos are uploaded by the pro; the
  dashboard asks for her own photo (Amazon product images may only be used through their API or
  SiteStripe image links).
- Privacy: click tracking stores no personal data (no IP, no cookie, only item, time and
  referrer host). Mention "Shop my kit" click counts in the privacy policy section on studio pages
  when it is next updated.
- The pro is responsible for her own affiliate program terms; Terms of Service could add one line
  saying so.

## Go-live steps (founder approval required)
1. Apply the migration (do NOT use `db push`):
   ```bash
   npx supabase db query --remote -f supabase/migrations/20261128_03_shop_my_kit.sql
   ```
2. Deploy the function:
   ```bash
   npx supabase functions deploy kit-click --no-verify-jwt --project-ref qbrqsvdustqeoplebzwi
   ```
3. Frontend deploy (Vercel). Before step 1 the view does not exist and the studio page simply
   shows no kit section; the dashboard page shows a load error for Creator pros only.
4. Nobody sees the feature until a profile has a Creator/Salon `plan`. To test in production, set
   `plan = 'creator_monthly'` on a test profile.

## Test plan
Automated (done):
- `npx tsc -p tsconfig.app.json --noEmit`, `npx vite build`.
- Migration run twice in PGlite with stub `auth`/`storage` schemas: owner CRUD; insert for
  another profile refused; http, javascript:, spaces, credentials, no-TLD URLs refused; bad promo
  refused; anon cannot read `kit_items` and cannot write the view; view shows only Creator +
  published studios; `record_kit_click` refused for anon/authenticated, returns NULL for hidden /
  no-feature / unpublished items, stores at most 60 clicks per item per minute, cleans the
  referrer host; `my_kit_click_counts` returns only the caller's rows; storage writes outside the
  own folder refused; the 101st item is refused.

Manual after go-live:
1. Creator test profile: `/dashboard/kit` shows the empty state. Add an item with an
   `amazon.fr` link without `https://`: it is completed. Try `http://...`: error under the field.
2. Upload a photo (> 5 MB refused), add a promo code, save. Reorder, hide one item.
3. Open the studio page on a phone: section "Products I use", disclosure line visible, hidden item
   absent, no prices. Copy the code (shows "Copied", clipboard has the code). Tap "Shop": the
   pro's URL opens in a new tab.
4. Back in the dashboard: the click shows in "7 days" within a few seconds. In
   `kit_clicks`, `referrer_host` is filled when the studio was opened from another site, and
   no IP is stored.
5. Independent profile: `/dashboard/kit` shows the upgrade panel; its items (if any) are not on
   the public page and `kit-click` returns 404 for them.
6. Set a custom section title, check it on the public page; clear it, the default comes back.

## Local development
- `/dev/kit`, `/dev/kit?empty=1`, `/dev/kit?gated=1`: dashboard sandbox with in-memory data
  (DEV builds only).
- `/dev/studio?preset=<template>`: studio page with the demo kit (and demo products).
- Without Supabase env vars, mock studios (e.g. `/studio-maya`) show the demo kit. Demo links
  point to example.com.
- `?demo=1` on `/dashboard/kit` (DEV only) unlocks the Creator gate against your local Supabase.
