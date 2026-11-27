import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleComparison } from '@/components/article/ArticleBodyComponents';

const ext = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'best-booking-app-for-brow-artists',
  title: 'Best Booking App for Brow Artists: From Quick Shapes to Microblading',
  seoTitle: 'Best Booking App for Brow Artists (2026)',
  excerpt: 'The best booking apps for brow artists compared: Acuity Scheduling, GlossGenius, Square Appointments, Booksy, Fresha and Nelsy, for short brow appointments and high-ticket microblading with deposits.',
  seoDescription: 'Best booking app for brow artists: Acuity, GlossGenius, Square, Booksy, Fresha and Nelsy compared for brow shaping, lamination and microblading deposits.',
  category: 'comparisons',
  audience: ['pros'],
  craft: 'brows',
  tags: ['best booking app for brow artists', 'brow booking app', 'microblading booking software', 'brow lamination booking', 'PMU booking app'],
  heroImage: 'linear-gradient(135deg, #FEFCE8 0%, #FDE68A 100%)',
  heroImageAlt: 'Best booking apps for brow artists compared',
  author: 'Nelsy Editorial',
  authorRole: 'Beauty Business Guide',
  publishedAt: '2026-11-26',
  tldr: {
    answer: 'Brow artists need an app that handles two very different bookings: quick, frequent shapes and long, high-ticket PMU sessions.',
    detail: 'A brow shape or tint can be pay on arrival, while microblading or lamination usually needs a deposit and a consent form. Choose an app that lets you set payment rules per service, then compare fees.',
    points: [
      { label: 'Nelsy', text: 'Best for brow artists who want a deposit on PMU and pay on arrival for quick services, with 0% commission.' },
      { label: 'Acuity Scheduling', text: 'Best for PMU artists who need consent forms and touch-up packages.' },
      { label: 'GlossGenius', text: 'Best for US brow studios that want a polished site and card reader.' },
      { label: 'Booksy / Fresha', text: 'Best for brow bars that want marketplace discovery.' },
    ],
  },
  toc: [
    { id: 'what-to-look-for', label: 'What brow artists should look for' },
    { id: 'comparison', label: 'Comparison table' },
    { id: 'nelsy', label: 'Nelsy' },
    { id: 'acuity', label: 'Acuity Scheduling' },
    { id: 'glossgenius', label: 'GlossGenius' },
    { id: 'square', label: 'Square Appointments' },
    { id: 'marketplaces', label: 'Booksy and Fresha' },
    { id: 'verdict', label: 'Verdict' },
  ],
  relatedSlugs: ['best-booking-app-for-lash-techs', 'best-booking-app-for-estheticians', 'linktree-alternatives-for-beauty-pros', 'fresha-vs-booksy-for-nail-techs'],
  faq: [
    { q: 'What is the best booking app for brow artists?', a: 'If you do both quick brow services and microblading, pick an app that sets payment rules per service. Nelsy lets you choose pay on arrival, a deposit or full payment upfront for each service. If you need consent forms on every plan, Acuity Scheduling includes custom client forms from $16/month billed annually.' },
    { q: 'How much deposit should a microblading artist take?', a: 'Many PMU artists take a non-refundable deposit at booking to hold the slot, deducted from the final price. Set the amount in your policy and make sure your booking app can apply it only to PMU services.' },
    { q: 'Do brow booking apps charge commission?', a: 'Booksy charges 30% of the first visit for new clients from Boost (max $100 in the US), and Fresha charges a one-time fee on new marketplace clients. Acuity, GlossGenius and Square do not list a commission. Nelsy charges 0% Nelsy commission.' },
    { q: 'Is there a free booking app for brow artists?', a: 'Square Appointments has a Free plan at $0 per location with an online booking site and reminders. Cancellation policies and no-show fees are listed on Plus at $49/month per location.' },
  ],
  relatedFeatureSlugs: ['bookings', 'deposits', 'payments'],
  relatedLinks: { tool: '/tools/booking-app-fee-calculator', pages: ['/use-cases/independent-beauty-pros', '/features/deposits', '/features/bookings'] },
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="info" title="How we sourced these figures">
        Every competitor figure comes from the vendor&apos;s official pricing page, checked on November 27, 2026: <a href="https://acuityscheduling.com/pricing" rel="nofollow noopener" target="_blank" className={ext}>Acuity</a>, <a href="https://www.glossgenius.com/pricing" rel="nofollow noopener" target="_blank" className={ext}>GlossGenius</a>, <a href="https://squareup.com/us/en/appointments/pricing" rel="nofollow noopener" target="_blank" className={ext}>Square Appointments</a>, <a href="https://biz.booksy.com/en-us/pricing" rel="nofollow noopener" target="_blank" className={ext}>Booksy US</a> and <a href="https://www.fresha.com/pricing" rel="nofollow noopener" target="_blank" className={ext}>Fresha</a>. Prices exclude tax and can change, so check each page before you sign up. Nelsy is our product.
      </ArticleCallout>

      <section id="what-to-look-for">
        <h2 className="font-serif text-2xl font-bold mb-4">What brow artists should look for</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Payment rules per service.</strong> A 20-minute shape and a 2-hour microblading session should not have the same deposit policy.</li>
          <li><strong>Fast rebooking.</strong> Brow clients come back often. A booking link they can reuse from your bio keeps them coming.</li>
          <li><strong>Consent and patch-test forms</strong> for tinting, lamination and PMU. If your app does not handle them, you need a separate form tool.</li>
          <li><strong>Fees on short, low-price services.</strong> A fixed fee per transaction weighs more on a $30 shape than on a $400 PMU session.</li>
        </ul>
      </section>

      <section id="comparison">
        <h2 className="font-serif text-2xl font-bold mb-4">Comparison table</h2>
        <ArticleTable
          headers={['App', 'Monthly price', 'Deposits', 'Forms', 'Commission on new clients']}
          rows={[
            ['Nelsy', '$29, or $25 billed yearly', 'Pay on arrival, deposit or full upfront per service', 'Not included', '0%'],
            ['Acuity Scheduling', 'Starter $16 yearly or $20 monthly; Standard $27 / $34', 'Payments via Stripe, Square, PayPal or Venmo on all plans', 'Custom client forms on all plans', 'None listed'],
            ['GlossGenius', 'Standard $24 yearly or $28 monthly; Gold $48 / $56', 'Built-in deposits', 'Forms and waivers on Gold', 'None mentioned'],
            ['Square Appointments', 'Free $0; Plus $49 per location', 'Deposits listed (plan not stated); no-show fees on Plus', 'Not listed', 'None listed'],
            ['Booksy (US)', '$29.99 + $20 per extra staff', 'No-Show Protection features', 'Not covered here', '30% of first visit with Boost, max $100'],
            ['Fresha', '€14.95 (Independent)', 'Upfront payments and no-show fees', 'Not covered here', 'One-time fee on brand new marketplace clients'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed text-sm">
          Card fees: GlossGenius 2.4% + $0.15 in person, 3.4% + $0.15 online; Square Free 2.6% + 15¢ in person, 3.3% + 30¢ online; Booksy US 2.69% + $0.30 mobile payments; Fresha 1.29% + €0.15 online, 0.59% + €0.15 in person; Nelsy standard Stripe fees. Prices checked on November 27, 2026 on each vendor&apos;s official pricing page.
        </p>
      </section>

      <section id="nelsy">
        <h2 className="font-serif text-2xl font-bold mb-4">1. Nelsy</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Nelsy is a booking page and link-in-bio store for independent beauty pros. You set the payment mode per service: pay on arrival for a shape or tint, a deposit for lamination, full payment upfront for microblading if you prefer. You can record cash or card paid at the studio, and sell a brow mapping course or aftercare guide on the same page. $29/month or $25/month billed yearly, 14-day trial, 0% Nelsy commission (standard Stripe fees apply).
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> solo brow artists booked from Instagram who mix quick services and PMU.</p>
        <ArticleComparison
          items={[
            { label: 'Pros', pros: ['Different payment rule for each service', 'Bookings and products behind one link', '0% Nelsy commission'], cons: [] },
            { label: 'Cons', pros: [], cons: ['No consent forms built in', 'No marketplace for new clients', 'No free plan'] },
          ]}
        />
      </section>

      <section id="acuity">
        <h2 className="font-serif text-2xl font-bold mb-4">2. Acuity Scheduling</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Acuity includes payments (via Stripe, Square, PayPal or Venmo) and custom client forms on every plan, which suits PMU consent and patch-test questions. Starter is $16/month billed annually ($20 monthly) for one calendar. Standard ($27/$34) adds text reminders, a waitlist and appointment packages with payment plans, useful for a microblading session plus touch-up. 7-day trial.
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> PMU artists who need forms and packages at a low price.</p>
      </section>

      <section id="glossgenius">
        <h2 className="font-serif text-2xl font-bold mb-4">3. GlossGenius</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          GlossGenius combines a custom booking website, built-in deposits, no-show policies and a card reader. Standard is $24/month billed annually ($28 monthly). Gold ($48/$56) adds forms and waivers and an automated waitlist. 14-day trial.
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> US brow studios that take most payments by card in person.</p>
      </section>

      <section id="square">
        <h2 className="font-serif text-2xl font-bold mb-4">4. Square Appointments</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          The Free plan has an online booking site, reminders and unlimited staff calendars at $0 per location. Plus ($49/month per location, 30-day trial) adds cancellation policies, no-show fees and a waitlist. On a $30 brow shape paid online on the Free plan, Square&apos;s 3.3% + 30¢ fee works out to $1.29 (3.3% of $30 is $0.99, plus $0.30).
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> new brow artists who want a free booking link.</p>
      </section>

      <section id="marketplaces">
        <h2 className="font-serif text-2xl font-bold mb-4">5. Booksy and Fresha</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Both combine booking software with a client marketplace. <strong>Booksy</strong> (US) is $29.99/month plus $20 per extra staff member, with a 14-day trial and a 30% first-visit fee on Boost clients (max $100). <strong>Fresha</strong> Independent is €14.95/month with a 7-day trial and a one-time fee on brand new clients who find you through the Fresha marketplace. On low-price brow services, a percentage of the first visit is small in dollars; on PMU it can be significant.
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> brow bars in busy cities where clients search on the app. Compare them in <Link to="/blog/fresha-vs-booksy-for-nail-techs" className={ext}>Fresha vs Booksy</Link>.</p>
      </section>

      <section id="verdict">
        <h2 className="font-serif text-2xl font-bold mb-4">Verdict</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Quick services and PMU, booked from Instagram:</strong> Nelsy.</li>
          <li><strong>Forms on every plan:</strong> Acuity Scheduling.</li>
          <li><strong>US studio with a card reader:</strong> GlossGenius.</li>
          <li><strong>Free start:</strong> Square Appointments.</li>
          <li><strong>App discovery:</strong> Booksy or Fresha.</li>
        </ul>
        <ArticleTip>Write your deposit and patch-test policy first, then pick the app that can apply it service by service. Our <Link to="/tools/nail-tech-cancellation-policy-generator" className={ext}>cancellation policy generator</Link> works for brow services too.</ArticleTip>
        <p className="text-gray-700 mt-4 leading-relaxed">
          Try a Nelsy booking page in the <Link to="/demo" className={ext}>live demo</Link>.
        </p>
      </section>
    </div>
  ),
});
export {};
