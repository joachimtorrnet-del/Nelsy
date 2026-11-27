import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleComparison } from '@/components/article/ArticleBodyComponents';

const ext = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'best-booking-app-for-makeup-artists',
  title: 'Best Booking App for Makeup Artists: Bridal, Events and Studio Clients',
  seoTitle: 'Best Booking App for Makeup Artists (2026)',
  excerpt: 'The best booking apps for makeup artists compared: HoneyBook, Acuity Scheduling, GlossGenius, Square Appointments and Nelsy, on price, deposits, contracts and card fees.',
  seoDescription: 'Best booking app for makeup artists: HoneyBook, Acuity, GlossGenius, Square and Nelsy compared on price, deposits, contracts and payment fees.',
  category: 'comparisons',
  audience: ['pros'],
  craft: 'makeup',
  tags: ['best booking app for makeup artists', 'makeup artist booking software', 'MUA booking app', 'bridal makeup booking', 'makeup artist deposits'],
  heroImage: 'linear-gradient(135deg, #FFF7ED 0%, #FED7AA 100%)',
  heroImageAlt: 'Best booking apps for makeup artists compared',
  author: 'Nelsy Editorial',
  authorRole: 'Beauty Business Guide',
  publishedAt: '2026-11-26',
  tldr: {
    answer: 'Makeup artists run two businesses: weddings and events, and everyday appointments. Pick the app that fits the bigger one.',
    detail: 'Bridal work needs contracts, invoices and payment plans, which is where HoneyBook is strongest. Studio and lesson bookings need a fast booking page with deposits. Acuity, GlossGenius, Square and Nelsy cover that side.',
    points: [
      { label: 'HoneyBook', text: 'Best for bridal and event MUAs who send contracts and invoices.' },
      { label: 'Acuity Scheduling', text: 'Best for flexible scheduling with intake forms and packages.' },
      { label: 'GlossGenius', text: 'Best for US MUAs with a studio and a card reader.' },
      { label: 'Nelsy', text: 'Best for MUAs booked from Instagram who also sell lessons or tutorials.' },
    ],
  },
  toc: [
    { id: 'what-to-look-for', label: 'What makeup artists should look for' },
    { id: 'comparison', label: 'Comparison table' },
    { id: 'honeybook', label: 'HoneyBook' },
    { id: 'acuity', label: 'Acuity Scheduling' },
    { id: 'glossgenius', label: 'GlossGenius' },
    { id: 'square', label: 'Square Appointments' },
    { id: 'nelsy', label: 'Nelsy' },
    { id: 'verdict', label: 'Verdict' },
  ],
  relatedSlugs: ['best-link-in-bio-for-beauty-creators', 'best-booking-app-for-lash-techs', 'acuity-scheduling-alternatives-nail-techs', 'square-appointments-alternatives-nail-techs'],
  faq: [
    { q: 'What booking app do makeup artists use?', a: 'Bridal and event makeup artists often use client management tools like HoneyBook for contracts, invoices and payment plans. Artists with a studio or lesson business tend to use booking apps like Acuity Scheduling, GlossGenius, Square Appointments or Nelsy.' },
    { q: 'How should a makeup artist take a deposit for a wedding?', a: 'Take a non-refundable deposit or retainer to hold the date, with the balance due before or on the day. Tools with invoices and payment plans (HoneyBook), built-in deposits (GlossGenius), payments at booking (Acuity) or a deposit setting per service (Nelsy) can handle this.' },
    { q: 'Is HoneyBook worth it for makeup artists?', a: 'If you do many weddings with contracts and multi-step payments, it can be. If most of your work is single appointments, a simpler booking page with deposits can cost less (Acuity Starter is $16/month billed annually, against $36 regular for HoneyBook Starter billed annually) and is faster for clients.' },
    { q: 'Can I take makeup lesson bookings and sell tutorials on the same page?', a: 'Yes with Nelsy: you can list services with pay on arrival, a deposit or full payment upfront, and sell courses, digital products or coaching on the same page.' },
  ],
  relatedFeatureSlugs: ['bookings', 'deposits', 'courses'],
  relatedLinks: { tool: '/tools/booking-app-fee-calculator', pages: ['/use-cases/independent-beauty-pros', '/features/deposits', '/features/courses'] },
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="info" title="How we sourced these figures">
        Every competitor figure comes from the vendor&apos;s official pricing page, checked on November 27, 2026: <a href="https://www.honeybook.com/pricing" rel="nofollow noopener" target="_blank" className={ext}>HoneyBook</a>, <a href="https://acuityscheduling.com/pricing" rel="nofollow noopener" target="_blank" className={ext}>Acuity Scheduling</a>, <a href="https://www.glossgenius.com/pricing" rel="nofollow noopener" target="_blank" className={ext}>GlossGenius</a> and <a href="https://squareup.com/us/en/appointments/pricing" rel="nofollow noopener" target="_blank" className={ext}>Square Appointments</a>. Prices are in USD and exclude tax, and can change, so check each page before you sign up. HoneyBook was showing discounted prices when we checked; we show both the crossed-out regular price and the sale price. Nelsy is our product.
      </ArticleCallout>

      <section id="what-to-look-for">
        <h2 className="font-serif text-2xl font-bold mb-4">What makeup artists should look for</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Deposits that hold a date.</strong> A wedding morning cannot be resold at short notice. A deposit or retainer is essential.</li>
          <li><strong>Contracts and payment plans</strong> if you do bridal parties with several people and a balance due later.</li>
          <li><strong>A quick booking page</strong> for studio appointments, lessons and event makeup booked from Instagram.</li>
          <li><strong>Somewhere to sell what you teach</strong>: a masterclass, a tutorial or a product guide.</li>
        </ul>
      </section>

      <section id="comparison">
        <h2 className="font-serif text-2xl font-bold mb-4">Comparison table</h2>
        <ArticleTable
          headers={['App', 'Price', 'Deposits / payments', 'Contracts', 'Free trial']}
          rows={[
            ['HoneyBook', 'Billed annually: Starter $36, Essentials $59, Premium $129 per month (regular); $29, $49, $109 on sale when checked', 'Invoices, payment plans, autopay', 'Yes, with eSignatures', 'Free trial on all plans; 60-day money-back guarantee'],
            ['Acuity Scheduling', 'Starter $16 yearly or $20 monthly; Standard $27 / $34; Premium $55 / $69', 'Payments via Stripe, Square, PayPal or Venmo', 'Not listed', '7 days'],
            ['GlossGenius', 'Standard $24 yearly or $28 monthly; Gold $48 / $56', 'Built-in deposits; 2.4% + $0.15 in person, 3.4% + $0.15 online', 'Forms and waivers on Gold', '14 days'],
            ['Square Appointments', 'Free $0; Plus $49 per location', 'Deposits listed (plan not stated); no-show fees on Plus', 'Automatic contracts listed (plan not stated)', '30 days on Plus'],
            ['Nelsy', '$29, or $25 billed yearly', 'Pay on arrival, deposit or full upfront per service; standard Stripe fees', 'Not offered', '14 days'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed text-sm">Prices checked on November 27, 2026 on each vendor&apos;s official pricing page. HoneyBook&apos;s card processing rate is not shown here because its pricing page listed two different figures when we checked.</p>
      </section>

      <section id="honeybook">
        <h2 className="font-serif text-2xl font-bold mb-4">1. HoneyBook</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          HoneyBook is a client management platform built for service businesses that work in projects. You get contracts with eSignatures, invoices on one-time, recurring or custom schedules, flexible payment terms, autopay and a client portal. Billed annually, the crossed-out regular prices are $36 (Starter), $59 (Essentials) and $129 (Premium) per month. When we checked, a sale brought them to $29 (50% off Starter), $49 and $109 (15% off). All plans start with a free trial, and HoneyBook offers a full refund if you are not happy after your first 60 days.
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> bridal and event makeup artists who quote, sign and invoice each booking.</p>
        <ArticleComparison
          items={[
            { label: 'Pros', pros: ['Contracts, invoices and payment plans', 'Client portal per project', '60-day money-back guarantee'], cons: [] },
            { label: 'Cons', pros: [], cons: ['Heavy for quick studio bookings', 'Prices on the page change with promotions', 'Not a link-in-bio page'] },
          ]}
        />
      </section>

      <section id="acuity">
        <h2 className="font-serif text-2xl font-bold mb-4">2. Acuity Scheduling</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Acuity is a flexible scheduler. Starter ($16/month billed annually, $20 monthly) includes one calendar, payments through Stripe, Square, PayPal or Venmo, email reminders and custom client forms. Standard ($27/$34) adds text reminders, a waitlist, packages and gift certificates. All plans have a 7-day trial with no card required.
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> MUAs who want intake forms and lesson packages at a low price.</p>
        <ArticleComparison
          items={[
            { label: 'Pros', pros: ['Payments on every plan', 'Custom client forms on every plan', 'Packages from Standard'], cons: [] },
            { label: 'Cons', pros: [], cons: ['Text reminders need Standard', 'Generic look, not beauty-specific', 'No contracts listed'] },
          ]}
        />
      </section>

      <section id="glossgenius">
        <h2 className="font-serif text-2xl font-bold mb-4">3. GlossGenius</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          GlossGenius offers a custom booking website, built-in deposits and no-show policies, with a card reader for in-person payments. Standard is $24/month billed annually ($28 monthly) and Gold is $48/$56, which adds forms and waivers. 14-day trial.
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> US makeup artists with a studio who take most payments by card.</p>
      </section>

      <section id="square">
        <h2 className="font-serif text-2xl font-bold mb-4">4. Square Appointments</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          The Free plan gives you an online booking site and reminders at $0 per location. Plus at $49/month per location adds cancellation policies and no-show fees. Square lists appointment deposits and &ldquo;prepayments and automatic contracts&rdquo; as features, but its pricing page does not say which plan includes them.
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> MUAs already using Square for payments who want a free booking link.</p>
      </section>

      <section id="nelsy">
        <h2 className="font-serif text-2xl font-bold mb-4">5. Nelsy</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Nelsy is a booking page and link-in-bio store. Each service has its own payment mode: pay on arrival for a quick event look, a deposit for a lesson, or full payment upfront for a bridal trial. You can record cash or card paid in person, and sell courses, tutorials, coaching or memberships from the same link. $29/month or $25/month billed yearly, 14-day trial, 0% Nelsy commission (standard Stripe fees apply).
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> makeup artists who get booked from Instagram and also teach or sell online.</p>
        <ArticleComparison
          items={[
            { label: 'Pros', pros: ['Deposit or full payment set per service', 'Bookings and products on one page', '0% Nelsy commission'], cons: [] },
            { label: 'Cons', pros: [], cons: ['No contracts or proposals', 'No payment plans for bridal balances', 'No free plan'] },
          ]}
        />
      </section>

      <section id="verdict">
        <h2 className="font-serif text-2xl font-bold mb-4">Verdict</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Mostly weddings with contracts:</strong> HoneyBook.</li>
          <li><strong>Lessons and packages on a budget:</strong> Acuity Scheduling.</li>
          <li><strong>US studio with card payments:</strong> GlossGenius.</li>
          <li><strong>Instagram bookings plus online teaching:</strong> Nelsy.</li>
        </ul>
        <ArticleTip>Many bridal artists combine two tools: a contract tool for weddings, and a simple booking page in their bio for everything else. Only do this if the second tool saves you more time than it costs.</ArticleTip>
        <p className="text-gray-700 mt-4 leading-relaxed">
          See how a Nelsy page with services and products works in the <Link to="/demo" className={ext}>live demo</Link>.
        </p>
      </section>
    </div>
  ),
});
export {};
