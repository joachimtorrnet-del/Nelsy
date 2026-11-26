// ─── Glossary ────────────────────────────────────────────────────────────────
// Data for /glossary and /glossary/:term. scripts/generate-routes.mjs reads the
// `slug: '...'` fields of this file to prerender every term page, so keep one
// `slug:` per term and don't use that key anywhere else in this file.

export type GlossaryLink = { label: string; href: string };

export type GlossaryTerm = {
  slug: string;
  term: string;
  /** One quotable sentence. */
  short: string;
  /** 2 to 4 short paragraphs. */
  body: string[];
  /** Existing pages only: /blog/<article>, /tools/<tool> or site pages. */
  related: GlossaryLink[];
};

export const GLOSSARY_UPDATED = '2026-11-26';

const terms: GlossaryTerm[] = [
  {
    slug: 'nail-retention',
    term: 'Nail retention',
    short: 'Nail retention is how long a manicure, gel or set of enhancements stays intact on the natural nail without lifting, chipping or popping off.',
    body: [
      'Retention is the word nail techs use for wear time. Good retention means the client comes back for an infill or removal at the planned date, not early for a repair.',
      'It depends mostly on preparation: removing cuticle from the nail plate, taking off shine, dehydrating and priming. Product choice, application thickness, curing and the client\'s habits and natural nails also play a part.',
      'When retention problems repeat, look for a pattern: the same finger, the same area of the nail or the same step in the service. That usually points to the step to change.',
    ],
    related: [
      { label: 'How to improve nail retention', href: '/blog/how-to-improve-nail-retention' },
      { label: 'Nail prep guide', href: '/blog/nail-prep-guide' },
      { label: 'How to prevent nail lifting', href: '/blog/how-to-prevent-nail-lifting' },
    ],
  },
  {
    slug: 'apex',
    term: 'Apex',
    short: 'The apex is the highest, thickest point of a nail enhancement, placed over the stress area to give the nail strength.',
    body: [
      'On an extension or overlay, product is not spread at an even thickness. It is built up into a gentle curve whose highest point is the apex, usually around the area where the free edge meets the nail bed.',
      'That is where the nail bends most during daily use, so extra thickness there helps the enhancement resist breaks. Seen from the side, a well placed apex gives a smooth arch rather than a flat or humped profile.',
      'Apex placement varies with nail length and shape: a longer nail usually needs a more defined apex than a short natural overlay.',
    ],
    related: [
      { label: 'How to build a nail apex', href: '/blog/how-to-build-nail-apex' },
      { label: 'Builder gel application guide', href: '/blog/builder-gel-application-guide' },
      { label: 'Common builder gel mistakes', href: '/blog/common-builder-gel-mistakes' },
    ],
  },
  {
    slug: 'bead-ratio',
    term: 'Bead ratio',
    short: 'Bead ratio is the proportion of liquid monomer to acrylic powder in a bead of acrylic, which decides how wet or dry the product is.',
    body: [
      'An acrylic bead is made by dipping the brush in liquid, then in powder. The amount of liquid the bead picks up compared with the powder is the bead ratio.',
      'A bead that is too wet can run into the cuticles and side walls; a bead that is too dry can be hard to work, look grainy and adhere poorly. Most manufacturers give a recommended ratio for their system, so follow the instructions for the products you use.',
      'Consistent beads come from consistent habits: the same brush, the same amount of liquid wiped off, and the same dip into the powder.',
    ],
    related: [
      { label: 'Acrylic bead ratio explained', href: '/blog/acrylic-bead-ratio-explained' },
      { label: 'Acrylic application step by step', href: '/blog/acrylic-application-step-by-step' },
      { label: 'Common acrylic mistakes', href: '/blog/common-acrylic-mistakes' },
    ],
  },
  {
    slug: 'flooded-cuticles',
    term: 'Flooded cuticles',
    short: 'Flooded cuticles happen when gel, acrylic or polish runs onto the skin or cuticle area around the nail instead of staying on the nail plate.',
    body: [
      'Product that touches the skin is not attached to the nail. Once cured, it leaves a ledge where the enhancement can start lifting, and it can look messy as the nail grows out.',
      'It is often caused by using too much product, product that is too runny, or working too close to the cuticle. Leaving a small free margin and cleaning up before curing are the usual fixes.',
      'If product does flood, clean it away with a tool or brush before curing or setting, rather than filing it off afterwards.',
    ],
    related: [
      { label: 'How to prevent flooded cuticles', href: '/blog/how-to-prevent-flooded-cuticles' },
      { label: 'How to apply gel polish without streaks', href: '/blog/how-to-apply-gel-polish-without-streaks' },
      { label: 'How to make nail sets look cleaner', href: '/blog/how-to-make-nail-sets-look-cleaner' },
    ],
  },
  {
    slug: 'dehydrator',
    term: 'Dehydrator',
    short: 'A nail dehydrator is a prep product that temporarily removes surface oils and moisture from the natural nail before gel, acrylic or tips are applied.',
    body: [
      'The natural nail carries oil and moisture that can stop products from bonding well. A dehydrator is applied after filing and cleaning to leave the plate clean and dry for a short time.',
      'It is not the same as a primer. A dehydrator prepares the surface; a primer helps the product grip the nail. Many systems use both, one after the other.',
      'Follow the instructions of your product system for the order of steps and how long to let each layer dry.',
    ],
    related: [
      { label: 'Nail dehydrator vs primer', href: '/blog/nail-dehydrator-vs-primer' },
      { label: 'Nail prep guide', href: '/blog/nail-prep-guide' },
      { label: 'How to improve nail retention', href: '/blog/how-to-improve-nail-retention' },
    ],
  },
  {
    slug: 'primer',
    term: 'Primer (acid vs acid-free)',
    short: 'A nail primer is a bonding product applied to the prepared natural nail so that gel or acrylic adheres better, available in acid and acid-free versions.',
    body: [
      'Primer is applied after the nail has been prepped and dehydrated. It acts as a link between the natural nail and the enhancement product.',
      'Acid primers, traditionally based on methacrylic acid, are mostly used with acrylic systems. Acid-free primers work differently and are common with gel systems and with clients whose nails suit a gentler product.',
      'Which one to use depends on the product system and the manufacturer\'s instructions. Using a primer that doesn\'t match the system, or too much of it, can work against adhesion.',
    ],
    related: [
      { label: 'Acid vs acid-free nail primer', href: '/blog/acid-vs-acid-free-nail-primer' },
      { label: 'Nail dehydrator vs primer', href: '/blog/nail-dehydrator-vs-primer' },
      { label: 'Nail prep guide', href: '/blog/nail-prep-guide' },
    ],
  },
  {
    slug: 'builder-gel',
    term: 'Builder gel',
    short: 'Builder gel is a thicker gel used to add strength and structure to natural nails or to sculpt and extend nails, cured under a UV or LED lamp.',
    body: [
      'Unlike gel polish, which is applied in thin coats for color, builder gel is designed to be built up. It can be used as an overlay to strengthen short natural nails, to correct the shape of a nail, or to sculpt extensions on a form.',
      'Builder gels come in different viscosities and in clear, nude and colored versions. Some are sold in pots, others in bottles with a brush, sometimes called builder in a bottle.',
      'Clients usually come back for an infill as the nail grows, rather than a full removal each time.',
    ],
    related: [
      { label: 'Builder gel application guide', href: '/blog/builder-gel-application-guide' },
      { label: 'Why does builder gel lift?', href: '/blog/why-does-builder-gel-lift' },
      { label: 'How to price acrylic, Gel-X and builder gel', href: '/blog/how-to-price-acrylic-gel-x-builder-gel' },
    ],
  },
  {
    slug: 'gel-x',
    term: 'Gel-X',
    short: 'Gel-X is a brand of soft gel extension tips that cover the whole nail and are bonded to the natural nail with gel, then cured under a lamp.',
    body: [
      'Gel-X is a product system by Aprés Nail. The name is widely used for the technique in general, often called soft gel tips or full-cover gel tips when made by other brands.',
      'The tip is pre-shaped, so the tech sizes it to the nail, applies a bonding gel and cures it. It is usually quicker than sculpting an extension and is removed by soaking off.',
      'Most issues with soft gel tips come from sizing, prep or air trapped under the tip.',
    ],
    related: [
      { label: 'Gel-X application step by step', href: '/blog/gel-x-application-step-by-step' },
      { label: 'Why do Gel-X tips pop off?', href: '/blog/why-do-gel-x-tips-pop-off' },
      { label: 'Common Gel-X mistakes', href: '/blog/common-gel-x-mistakes' },
    ],
  },
  {
    slug: 'infill',
    term: 'Infill',
    short: 'An infill, also called a fill or rebalance, is a maintenance service where new product is added to the regrowth area of an existing set of enhancements.',
    body: [
      'As the natural nail grows, a gap appears between the cuticle area and the enhancement, and the apex moves forward. An infill files back the existing product, fills the regrowth and rebuilds the structure.',
      'It keeps the set looking fresh and balanced without a full removal. Infills are usually booked every few weeks, depending on the client\'s growth and the product.',
      'When booking, many pros set a maximum time since the last appointment, after which the service becomes a new set.',
    ],
    related: [
      { label: 'How to do a nail infill without bulk', href: '/blog/how-to-do-nail-infill-without-bulk' },
      { label: 'How long to book each nail service', href: '/blog/how-long-to-book-each-nail-service' },
      { label: 'How to create a nail service menu', href: '/blog/how-to-create-nail-service-menu' },
    ],
  },
  {
    slug: 'lifting',
    term: 'Lifting',
    short: 'Lifting is when gel, acrylic or a tip starts separating from the natural nail, usually at the cuticle area or the side walls.',
    body: [
      'Lifting shows as a white or clear gap under the product. Once it starts, it tends to spread, and it can catch on hair or clothes.',
      'Common causes include oil or cuticle left on the nail plate, product touching the skin, a mismatch between product and nail, and thin or uneven application. Client habits, such as using nails as tools, can also contribute.',
      'Clients should be asked not to pick or peel lifted product, and to book a repair or removal instead.',
    ],
    related: [
      { label: 'How to prevent nail lifting', href: '/blog/how-to-prevent-nail-lifting' },
      { label: 'Why do acrylic nails lift?', href: '/blog/why-do-acrylic-nails-lift' },
      { label: 'Why does builder gel lift?', href: '/blog/why-does-builder-gel-lift' },
    ],
  },
  {
    slug: 'deposit',
    term: 'Deposit (booking)',
    short: 'A booking deposit is an amount a client pays in advance to secure an appointment, usually deducted from the final price of the service.',
    body: [
      'A deposit protects the time a beauty pro blocks for a client. It can be a fixed amount or a percentage of the service price, and it is usually paid online when the client books.',
      'The booking policy says what happens to it: deducted from the price at the appointment, transferred if the client reschedules in time, and kept if the client cancels late or doesn\'t show up.',
      'Clear rules shown before payment avoid most disputes.',
    ],
    related: [
      { label: 'Deposit calculator', href: '/tools/deposit-calculator' },
      { label: 'How much deposit should a nail tech charge?', href: '/blog/how-much-deposit-should-nail-tech-charge' },
      { label: 'Nail tech deposit policy', href: '/blog/nail-tech-deposit-policy' },
      { label: 'Collect deposits with Nelsy', href: '/features/deposits' },
    ],
  },
  {
    slug: 'no-show',
    term: 'No-show',
    short: 'A no-show is a client who misses a booked appointment without cancelling or warning the business in advance.',
    body: [
      'For an appointment-based business, a no-show is time that was reserved and cannot be sold again at such short notice.',
      'It differs from a late cancellation, where the client does cancel but inside the notice period set by the policy. Many policies treat both the same way, for example by keeping the deposit.',
      'Common ways to reduce no-shows are deposits, reminders before the appointment, and making it easy to reschedule.',
    ],
    related: [
      { label: 'No-show cost calculator', href: '/tools/no-show-cost-calculator' },
      { label: 'How to handle nail client no-shows', href: '/blog/how-to-handle-nail-client-no-shows' },
      { label: 'Nail tech no-show policy examples', href: '/blog/nail-tech-no-show-policy-examples' },
      { label: 'Reduce no-shows', href: '/use-cases/reduce-no-shows' },
    ],
  },
  {
    slug: 'cancellation-policy',
    term: 'Cancellation policy',
    short: 'A cancellation policy is the set of rules a business publishes about how far ahead clients must cancel or reschedule, and what happens if they don\'t.',
    body: [
      'For beauty pros, it usually covers the notice period, what happens to the deposit, how late arrivals are handled and what counts as a no-show.',
      'It works best when clients see it before they book and pay, for example on the booking page, and agree to it as part of the booking.',
      'Keep it short and specific, and apply it consistently.',
    ],
    related: [
      { label: 'Cancellation policy generator', href: '/tools/nail-tech-cancellation-policy-generator' },
      { label: 'Nail tech cancellation policy', href: '/blog/nail-tech-cancellation-policy' },
      { label: 'Nail tech booking policy template', href: '/blog/nail-tech-booking-policy-template' },
      { label: 'Nail tech late policy', href: '/blog/nail-tech-late-policy' },
    ],
  },
  {
    slug: 'link-in-bio',
    term: 'Link in bio',
    short: 'A link in bio is the single clickable link in a social media profile, often pointing to a page that gathers a creator\'s or business\'s booking, shop and other links.',
    body: [
      'Instagram and TikTok profiles give limited space for links, so "link in bio" became the usual call to action in posts and captions.',
      'Many creators and beauty pros use a link-in-bio page so one link can lead to booking, a shop, courses or a newsletter. The fewer taps between a follower and the action, the easier it is to act.',
      'For a beauty pro, the most useful link in bio lets a client see services and prices and book directly.',
    ],
    related: [
      { label: 'How to set up a nail tech link in bio', href: '/blog/how-to-set-up-nail-tech-link-in-bio' },
      { label: 'Best Instagram bio ideas for nail techs', href: '/blog/best-instagram-bio-ideas-for-nail-techs' },
      { label: 'Link in bio with Nelsy', href: '/features/link-in-bio' },
    ],
  },
  {
    slug: 'booth-rental',
    term: 'Booth rental',
    short: 'Booth rental is an arrangement where a beauty pro pays a salon a fee to rent a chair, station or room and runs their own business from it.',
    body: [
      'The renter usually sets their own prices, manages their own clients and bookings, and keeps their service income, while paying the salon a fixed rent, often weekly or monthly.',
      'It differs from a commission arrangement, where the salon sets the prices and pays the pro a share of what they earn.',
      'What is included, such as products, front desk or utilities, varies by agreement. The rules for licensing, taxes and contracts depend on where you work.',
    ],
    related: [
      { label: 'Booth rental vs commission for nail techs', href: '/blog/booth-rental-vs-commission-nail-techs' },
      { label: 'Home-based nail tech vs salon suite', href: '/blog/home-based-nail-tech-vs-salon-suite' },
      { label: 'When to get your own nail studio', href: '/blog/when-to-get-your-own-nail-studio' },
    ],
  },
];

export const GLOSSARY: GlossaryTerm[] = [...terms].sort((a, b) => a.term.localeCompare(b.term, 'en'));

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY.find((t) => t.slug === slug);
}
