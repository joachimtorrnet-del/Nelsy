/**
 * Curated internal links and in-body photos for blog articles.
 *
 * Everything here is an explicit list (no regex over article text): the article
 * template reads it to add a "Free tools" box, feature / use-case links and extra
 * photos. Every path below is a route declared in src/App.tsx; the SEO audit
 * fails the build on a broken internal link, so only add routes that exist.
 */
import type { ArticleCategory } from './articles';
import { getAllArticles } from './articles';

// ─── Tools ───────────────────────────────────────────────────────────────────

export const TOOL_LINKS = {
  '/tools/deposit-calculator': { label: 'Deposit calculator', desc: 'Find the right deposit for each service.' },
  '/tools/no-show-cost-calculator': { label: 'No-show cost calculator', desc: 'See what missed appointments cost you each year.' },
  '/tools/booking-app-fee-calculator': { label: 'Booking app fee calculator', desc: 'Compare what booking apps really cost per month.' },
  '/tools/nail-tech-pricing-calculator': { label: 'Nail tech pricing calculator', desc: 'Price each service for profit, not guesswork.' },
  '/tools/nail-tech-cancellation-policy-generator': { label: 'Cancellation policy generator', desc: 'Write a clear policy in a couple of minutes.' },
  '/tools/nail-tech-appointment-reminder-templates': { label: 'Appointment reminder templates', desc: 'Copy-paste reminders for every booking.' },
  '/tools/instagram-engagement-calculator': { label: 'Instagram engagement calculator', desc: 'Check the engagement rate of any account.' },
  '/tools/creator-rate-calculator': { label: 'Creator rate calculator', desc: 'Estimate what to charge for brand content.' },
} as const;

export type ToolPath = keyof typeof TOOL_LINKS;

/** The three calculators shown on every article. */
export const CORE_TOOLS: ToolPath[] = [
  '/tools/deposit-calculator',
  '/tools/no-show-cost-calculator',
  '/tools/booking-app-fee-calculator',
];

// ─── Feature and use-case pages ──────────────────────────────────────────────

export const PAGE_LINKS = {
  '/features/bookings': { label: 'Online booking', desc: 'Clients pick a service and a time from your link, 24/7.' },
  '/features/deposits': { label: 'Deposits', desc: 'Take a deposit at booking to protect your time.' },
  '/features/payments': { label: 'Payments', desc: 'Pay on arrival, a deposit or full payment upfront.' },
  '/features/link-in-bio': { label: 'Link in bio', desc: 'One link for your services, products and socials.' },
  '/features/crm': { label: 'Client list', desc: 'Every client, visit and note in one place.' },
  '/features/analytics': { label: 'Analytics', desc: 'See bookings, revenue and where clients come from.' },
  '/features/courses': { label: 'Courses', desc: 'Part of the upcoming Creator plan.' },
  '/features/digital-products': { label: 'Digital products', desc: 'Guides and templates: part of the upcoming Creator plan.' },
  '/features/coaching': { label: 'Coaching', desc: 'Coaching tools: part of the upcoming Creator plan.' },
  '/features/memberships': { label: 'Memberships', desc: 'Part of the upcoming Creator plan.' },
  '/use-cases/nail-techs': { label: 'Nelsy for nail techs', desc: 'Booking page, deposits and client list for nail techs.' },
  '/use-cases/lash-techs': { label: 'Nelsy for lash techs', desc: 'Fills, full sets and deposits on one page.' },
  '/use-cases/beauty-creators': { label: 'Nelsy for beauty creators', desc: 'Start with bookings today; the Creator plan is on the way.' },
  '/use-cases/independent-beauty-pros': { label: 'Nelsy for independent beauty pros', desc: 'Everything a solo beauty business needs.' },
  '/use-cases/reduce-no-shows': { label: 'Reduce no-shows', desc: 'Deposits, reminders and a clear policy.' },
  '/use-cases/turn-followers-into-bookings': { label: 'Turn followers into bookings', desc: 'From Instagram to a booked appointment.' },
} as const;

export type PagePath = keyof typeof PAGE_LINKS;

/** Curated links per category: one tool beyond the core three, and feature / use-case pages. */
export const CATEGORY_LINKS: Record<ArticleCategory, { tool: ToolPath; pages: PagePath[] }> = {
  'get-clients':         { tool: '/tools/nail-tech-pricing-calculator', pages: ['/use-cases/turn-followers-into-bookings', '/features/bookings'] },
  'instagram-content':   { tool: '/tools/instagram-engagement-calculator', pages: ['/use-cases/turn-followers-into-bookings', '/features/link-in-bio'] },
  'pricing-money':       { tool: '/tools/nail-tech-pricing-calculator', pages: ['/features/deposits', '/features/payments'] },
  'booking-software':    { tool: '/tools/nail-tech-appointment-reminder-templates', pages: ['/features/bookings', '/use-cases/nail-techs'] },
  'policies-clients':    { tool: '/tools/nail-tech-cancellation-policy-generator', pages: ['/use-cases/reduce-no-shows', '/features/deposits'] },
  'start-your-business': { tool: '/tools/nail-tech-pricing-calculator', pages: ['/use-cases/nail-techs', '/features/bookings'] },
  'nail-education':      { tool: '/tools/nail-tech-pricing-calculator', pages: ['/use-cases/nail-techs', '/features/bookings'] },
  'nail-inspo':          { tool: '/tools/nail-tech-pricing-calculator', pages: ['/use-cases/nail-techs', '/features/link-in-bio'] },
  comparisons:           { tool: '/tools/nail-tech-appointment-reminder-templates', pages: ['/features/bookings', '/features/deposits'] },
  'branding-growth':     { tool: '/tools/instagram-engagement-calculator', pages: ['/features/link-in-bio', '/use-cases/independent-beauty-pros'] },
  'beauty-creators':     { tool: '/tools/creator-rate-calculator', pages: ['/features/link-in-bio', '/features/bookings'] },
  salons:                { tool: '/tools/no-show-cost-calculator', pages: ['/features/bookings', '/use-cases/reduce-no-shows'] },
};

// ─── In-body photos (Unsplash) ───────────────────────────────────────────────
// Every id was checked to return HTTP 200 from images.unsplash.com and looked at
// before being added. No faces of identifiable people, no brand logos.

export interface BlogPhoto { id: string; alt: string }

const p = (id: string, alt: string): BlogPhoto => ({ id: `photo-${id}`, alt });

export const PHOTO_POOLS = {
  nails: [
    p('1619607146034-5a05296c8f9a', 'Rows of nail polish bottles in nude, pink and red shades on gold wall shelves'),
    p('1759526997116-c8f4f2431869', 'Three nail polish bottles in nude and orange tones dripping over a stone block'),
    p('1602585578130-c9076e09330d', 'Nail polish bottles in grey, nude and burgundy shades on a white table'),
    p('1610992015762-45dca7fa3a85', 'Hand with a short nude square manicure resting on a soft white throw'),
    p('1604654894610-df63bc536371', 'Glossy black and tortoiseshell nails with a gold ring'),
    p('1769687209448-025548dfca8b', 'Soft pink almond nails with gold studs holding a sprig of eucalyptus'),
    p('1754799670312-8e7da8e40ad7', 'Almond nails in navy, gold chrome and white'),
    p('1777288390469-828f8816231c', 'Almond nails with silver foil and leopard print nail art'),
    p('1748163432725-454f46f68340', 'Hands with a glossy red manicure against a white wall'),
    p('1772322586754-34c9e6f5be6f', 'Long almond nail with a milky white base and a purple glitter tip'),
    p('1762373349045-c2decd4ec3f3', 'Short French manicure holding a small white flower'),
    p('1735236007245-9dc6e28bbe56', 'Winter nail art with pale blue and navy nails and hand-painted trees'),
    p('1630843599725-32ead7671867', 'Short nude manicure with a thin gold ring'),
    p('1571290274554-6a2eaa771e5f', 'Short nails with abstract nail art in blue, yellow and orange'),
    p('1604902396830-aca29e19b067', 'Pink manicure on a bright pink background'),
  ],
  nailWork: [
    p('1632345031435-8727f6897d53', 'Nail tech filing a client\'s nails at a manicure desk with a UV lamp'),
    p('1522337660859-02fbefca4702', 'Hands applying pink glitter polish over a white marble table'),
    p('1693776529070-2cdea397595b', 'Gloved nail tech working on a client\'s nude manicure'),
    p('1737214475292-949c0bf920b0', 'Nail tech in black gloves painting fine nail art with a thin brush'),
    p('1659391542239-9648f307c0b1', 'Nude polish being applied to a client\'s nails'),
    p('1599206676335-193c82b13c9e', 'Hands on a marble table during a nude manicure'),
    p('1775500835259-d3b3f6d6e2f2', 'Manicure tools laid out on a white towel: nippers, polish, file and orange sticks'),
  ],
  studio: [
    p('1633681926022-84c23e8cb2d6', 'Bright beauty salon with black chairs and round mirrors'),
    p('1792792747504-35e67572f529', 'Small beauty studio with two macrame chairs and a plant'),
    p('1626383137804-ff908d2753a2', 'Salon interior with a row of black chairs and large windows'),
    p('1706629503650-cade709d15e3', 'Modern salon with arched mirrors and beige chairs on a marble floor'),
    p('1787651343620-8d5303006ecb', 'Calm treatment room with a beauty bed by the window'),
  ],
  planning: [
    p('1649298173603-9c95aa950879', 'Close-up of a printed yearly calendar'),
    p('1506784983877-45594efa4cbe', 'Coffee cup on an open monthly planner with goals written in'),
    p('1435527173128-983b87201f4d', 'Open weekly planner on a desk'),
    p('1632772998001-cc9bf6f7c852', 'Blank monthly planner with two felt pens'),
    p('1513128034602-7814ccaddd4e', 'Hand writing a to-do list in a spiral notebook'),
  ],
  payments: [
    p('1634733988138-bf2c3a2a13fa', 'Card payment terminal printing a receipt on an orange background'),
    p('1599050751795-6cdaafbc2319', 'Phone held over a card reader to pay contactless'),
  ],
  desk: [
    p('1709534771076-6c2298f57f2f', 'Phone with a blank screen on a pink desk next to a keyboard and earbuds'),
    p('1765030999960-8cc726c281ad', 'Pink keyboard, mouse and laptop on a marble desk'),
    p('1636485042715-f0e844b82338', 'Pink desktop setup with a microphone and plants'),
    p('1705907014767-1c1a4d8ce6be', 'Laptop, keyboard and mouse on a pink desk seen from above'),
    p('1769596722174-38df0c84206b', 'Laptop and pink phone on a wooden desk with dried flowers'),
    p('1512054502232-10a0a035d672', 'Phone on a white desk next to a succulent'),
    p('1585060544812-6b45742d762f', 'Phone with a blank screen on a light wooden table'),
  ],
  lashes: [
    p('1589710751893-f9a6770ad71b', 'Lash artist placing an extension with tweezers over an under-eye patch'),
    p('1674049406467-824ea37c7184', 'Close-up of lash extensions being applied with tweezers'),
    p('1770999086860-143f54adf01b', 'Tweezers resting on a tray of lash extension strips'),
    p('1639629509821-c54cdd984227', 'Close-up of an eye with long lashes and a groomed brow'),
  ],
  makeup: [
    p('1596462502278-27bfdc403348', 'Pink makeup brushes, lipstick and blush laid out on a beige background'),
    p('1516975080664-ed2fc6a32937', 'Makeup brushes in a cup on a vanity'),
    p('1678695692040-e9a39502c357', 'Makeup brushes arranged on a pink and burgundy background'),
    p('1631730486572-226d1f595b68', 'Makeup and skincare bottles on a pink surface'),
  ],
  creator: [
    p('1596704017254-9b121068fb31', 'Hand holding a makeup brush over an eyeshadow palette next to a laptop'),
    p('1631214540553-ff044a3ff1d4', 'Open mascara tube and wand on a pink background'),
    p('1617897903246-719242758050', 'Dropper bottle of oil on a round wooden board with eucalyptus leaves'),
    p('1499750310107-5fef28a66643', 'Laptop, coffee cup, notepad and phone on a wooden desk'),
    p('1460925895917-afdab827c52f', 'Laptop showing an analytics dashboard with charts'),
    p('1563986768609-322da13575f3', 'Hand holding a phone in front of a laptop in a cafe'),
    p('1586281380349-632531db7ed4', 'Clipboard with a blank checklist next to a laptop on a marble desk'),
    p('1484480974693-6ca0a78fb36b', 'Hand writing a checklist in an open notebook'),
    p('1593642632559-0c6d3fc62b89', 'Bright home office with a laptop and monitor by a large window'),
    p('1554224155-6726b3ff858f', 'Hands sorting paperwork next to a calculator on a white desk'),
    p('1607082348824-0a96f2a4b9da', 'Red and black gift shopping bags with ribbon handles on a dark background'),
  ],
  skincare: [
    p('1583209814683-c023dd293cc6', 'Pink skincare jars and tubes laid out on a light background'),
    p('1608571423902-eed4a5ad8108', 'Amber dropper bottle on a wooden stand'),
    p('1764694187667-f28a05a52c0e', 'Drop of serum falling into a glass bottle'),
  ],
} satisfies Record<string, BlogPhoto[]>;

type PoolName = keyof typeof PHOTO_POOLS;

const CATEGORY_POOLS: Record<ArticleCategory, PoolName[]> = {
  'get-clients':         ['nailWork', 'desk', 'nails'],
  'instagram-content':   ['desk', 'nails'],
  'pricing-money':       ['planning', 'payments', 'nailWork'],
  'booking-software':    ['desk', 'planning', 'payments'],
  'policies-clients':    ['planning', 'nailWork', 'studio'],
  'start-your-business': ['studio', 'nailWork', 'planning'],
  'nail-education':      ['nailWork', 'nails'],
  'nail-inspo':          ['nails'],
  comparisons:           ['desk', 'payments', 'studio'],
  'branding-growth':     ['studio', 'desk', 'nails'],
  'beauty-creators':     ['creator', 'makeup', 'skincare', 'desk'],
  salons:                ['studio', 'planning', 'payments'],
};

// Topic words in the slug that call for a more specific pool (checked in order)
const SLUG_POOLS: Array<[string, PoolName[]]> = [
  ['lash', ['lashes', 'studio']],
  ['brow', ['lashes', 'studio']],
  ['makeup', ['makeup', 'studio']],
  ['esthetician', ['skincare', 'studio']],
  ['course', ['desk', 'makeup']],
];

function hash(s: string): number {
  let h = 2166136261;
  for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return h >>> 0;
}

function poolsFor(slug: string, category: ArticleCategory): PoolName[] {
  return SLUG_POOLS.find(([w]) => slug.includes(w))?.[1] ?? CATEGORY_POOLS[category];
}

let coverMap: Map<string, BlogPhoto> | null = null;

/**
 * Cover photo for an article card and hero. Assigned once over all articles,
 * each article taking the least used photo of its pools, so neighbours in a
 * grid rarely share a photo. Deterministic for a given set of articles.
 */
export function coverPhotoFor(slug: string, category: ArticleCategory): BlogPhoto {
  if (!coverMap || !coverMap.has(slug)) {
    coverMap = new Map();
    const used = new Map<string, number>();
    const articles = [...getAllArticles()].sort((a, b) => a.slug.localeCompare(b.slug));
    for (const a of articles) {
      const candidates = poolsFor(a.slug, a.category).flatMap((name) => PHOTO_POOLS[name]);
      let best = candidates[0];
      let bestScore = Infinity;
      for (const c of candidates) {
        const score = (used.get(c.id) ?? 0) * 1e10 + hash(`${a.slug}|${c.id}`);
        if (score < bestScore) { best = c; bestScore = score; }
      }
      used.set(best.id, (used.get(best.id) ?? 0) + 1);
      coverMap.set(a.slug, best);
    }
  }
  return coverMap.get(slug) ?? PHOTO_POOLS[poolsFor(slug, category)[0]][hash(slug) % PHOTO_POOLS[poolsFor(slug, category)[0]].length];
}

/** Deterministic photos for an article: same slug, same photos on every render and prerender. */
export function pickArticlePhotos(slug: string, category: ArticleCategory, count: number, exclude: string[] = []): BlogPhoto[] {
  const pools = poolsFor(slug, category);
  const taken = new Set(exclude);
  const out: BlogPhoto[] = [];
  for (let i = 0; out.length < count && i < count * 4; i++) {
    const pool = PHOTO_POOLS[pools[i % pools.length]];
    const photo = pool[hash(`${slug}:${i}`) % pool.length];
    if (!taken.has(photo.id)) { taken.add(photo.id); out.push(photo); }
  }
  return out;
}
