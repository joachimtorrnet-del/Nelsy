import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleComparison } from '@/components/article/ArticleBodyComponents';

const ext = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'best-booking-app-for-lash-techs',
  title: 'Best Booking App for Lash Techs: 5 Options Compared on Price and Deposits',
  seoTitle: 'Best Booking App for Lash Techs (2026)',
  excerpt: 'The best booking apps for lash techs compared: GlossGenius, Square Appointments, Booksy, Fresha and Nelsy, on monthly price, card fees, deposits and marketplace commission.',
  seoDescription: 'Best booking app for lash techs: GlossGenius, Square, Booksy, Fresha and Nelsy compared on price, card fees, deposits and commission on new clients.',
  category: 'comparisons',
  tags: ['best booking app for lash techs', 'lash tech booking app', 'lash booking software', 'lash artist scheduling app', 'lash deposits'],
  heroImage: 'linear-gradient(135deg, #FFF1F2 0%, #FECDD3 100%)',
  heroImageAlt: 'Best booking apps for lash techs compared',
  author: 'Nelsy Editorial',
  authorRole: 'Beauty Business Guide',
  publishedAt: '2026-11-26',
  tldr: {
    answer: 'A lash tech needs deposits more than almost any other beauty pro, so start there.',
    detail: 'A full set blocks two hours or more, so one no-show is expensive. All five apps below support some form of upfront payment. The real differences are price, card fees, commission on new clients and whether your booking link also works as your Instagram bio.',
    points: [
      { label: 'Nelsy', text: 'Best for lash techs booked from Instagram and TikTok who want 0% commission.' },
      { label: 'GlossGenius', text: 'Best for US lash techs who want a polished booking site and card reader.' },
      { label: 'Square Appointments', text: 'Best for a free start if you already use Square.' },
      { label: 'Booksy / Fresha', text: 'Best for lash techs who want new clients from a marketplace app.' },
    ],
  },
  toc: [
    { id: 'what-to-look-for', label: 'What lash techs should look for' },
    { id: 'comparison', label: 'Comparison table' },
    { id: 'nelsy', label: 'Nelsy' },
    { id: 'glossgenius', label: 'GlossGenius' },
    { id: 'square', label: 'Square Appointments' },
    { id: 'booksy', label: 'Booksy' },
    { id: 'fresha', label: 'Fresha' },
    { id: 'verdict', label: 'Verdict' },
  ],
  relatedSlugs: ['best-booking-app-for-brow-artists', 'linktree-alternatives-for-beauty-pros', 'glossgenius-alternatives-nail-techs', 'fresha-vs-booksy-for-nail-techs'],
  faq: [
    { q: 'What is the best booking app for lash techs?', a: 'It depends where your clients come from. If they find you on Instagram or TikTok, a booking page with deposits and no commission, such as Nelsy, keeps costs predictable. If you want new clients from an app, Booksy or Fresha have marketplaces, with a fee on new clients.' },
    { q: 'Should lash techs take deposits?', a: 'Most do, because full sets and volume sets take a long time and a no-show leaves a gap you cannot fill at short notice. Pick an app that lets you set a deposit, and state the policy clearly at booking.' },
    { q: 'Is there a free booking app for lash techs?', a: 'Square Appointments has a Free plan at $0 per location with an online booking site. No-show fees and cancellation policies are listed on the Plus plan at $49/month per location.' },
    { q: 'Do lash booking apps take a commission?', a: 'Booksy charges 30% of the first visit for new clients from Boost (max $100 in the US) and Fresha charges a one-time fee on new marketplace clients. GlossGenius and Square do not list a commission. Nelsy charges 0% Nelsy commission.' },
    { q: 'How much do lash booking apps cost per month?', a: 'From the official pages: Nelsy $29 ($25 billed yearly), GlossGenius Standard $28 ($24 billed annually), Square Appointments Free $0 or Plus $49, Booksy US $29.99, Fresha Independent €14.95. Card fees come on top.' },
  ],
  relatedFeatureSlugs: ['bookings', 'deposits', 'payments'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="info" title="How we sourced these figures">
        Every competitor figure comes from the vendor&apos;s official pricing page, checked on November 27, 2026: <a href="https://www.glossgenius.com/pricing" rel="nofollow noopener" target="_blank" className={ext}>GlossGenius</a>, <a href="https://squareup.com/us/en/appointments/pricing" rel="nofollow noopener" target="_blank" className={ext}>Square Appointments</a>, <a href="https://biz.booksy.com/en-us/pricing" rel="nofollow noopener" target="_blank" className={ext}>Booksy US</a> and <a href="https://www.fresha.com/pricing" rel="nofollow noopener" target="_blank" className={ext}>Fresha</a>. Prices exclude tax and can change, so check each page before you sign up. Nelsy is our product.
      </ArticleCallout>

      <section id="what-to-look-for">
        <h2 className="font-serif text-2xl font-bold mb-4">What lash techs should look for</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Deposits or full prepayment.</strong> Full sets, hybrids and volume sets block long slots. A deposit is the simplest no-show protection.</li>
          <li><strong>Clear service lengths.</strong> Separate services for a full set, a 2-week fill and a 3-week fill, each with its own duration, keep your day accurate.</li>
          <li><strong>A link that works in your bio.</strong> Most lash clients discover you on Instagram or TikTok, so the booking page is your shop window.</li>
          <li><strong>Total cost.</strong> Subscription, card fees and any commission on new clients. Card fees are often the biggest line.</li>
        </ul>
      </section>

      <section id="comparison">
        <h2 className="font-serif text-2xl font-bold mb-4">Comparison table</h2>
        <ArticleTable
          headers={['App', 'Monthly price', 'Card fees', 'Commission on new clients', 'Free trial']}
          rows={[
            ['Nelsy', '$29, or $25 billed yearly', 'Standard Stripe fees', '0%', '14 days'],
            ['GlossGenius', 'Standard $24 yearly or $28 monthly', '2.4% + $0.15 in person; 3.4% + $0.15 online', 'None mentioned', '14 days'],
            ['Square Appointments', 'Free $0; Plus $49 per location', 'Free: 2.6% + 15¢ in person, 3.3% + 30¢ online', 'None listed', '30 days on Plus'],
            ['Booksy (US)', '$29.99 + $20 per extra staff', '2.69% + $0.30 mobile payments', '30% of first visit with Boost, max $100', '14 days'],
            ['Fresha', '€14.95 (Independent)', '1.29% + €0.15 online; 0.59% + €0.15 in person', 'One-time fee on brand new marketplace clients', '7 days'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed text-sm">Prices checked on November 27, 2026 on each vendor&apos;s official pricing page. Prices exclude tax.</p>
      </section>

      <section id="nelsy">
        <h2 className="font-serif text-2xl font-bold mb-4">1. Nelsy</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Nelsy is a booking page and link-in-bio store for independent beauty pros. For each service you choose how the client pays: on arrival, a deposit, or full payment upfront. So a full set can require a deposit while a quick lash lift is pay on arrival. You can record cash or card paid at the studio, and sell aftercare guides, a lash course or coaching on the same page. $29/month or $25/month billed yearly, 14-day free trial, 0% Nelsy commission (standard Stripe fees apply).
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> solo lash techs whose bookings come from Instagram and TikTok.</p>
        <ArticleComparison
          items={[
            { label: 'Pros', pros: ['Deposit, full payment or pay on arrival per service', 'Bookings and products behind one link', '0% Nelsy commission'], cons: [] },
            { label: 'Cons', pros: [], cons: ['No marketplace for new clients', 'No free plan', 'Built for solo pros rather than large salons'] },
          ]}
        />
      </section>

      <section id="glossgenius">
        <h2 className="font-serif text-2xl font-bold mb-4">2. GlossGenius</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          GlossGenius offers a custom booking website, built-in deposits and cancellation and no-show policies. Standard is $24/month billed annually ($28 monthly), Gold $48/$56 and Platinum $148/$168, with a 14-day trial. Gold adds forms and waivers and an automated waitlist, which lash techs who use consent forms may want.
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> US lash techs who want a salon-grade booking site with card payments.</p>
        <ArticleComparison
          items={[
            { label: 'Pros', pros: ['Built-in deposits', 'Custom booking website', 'Forms and waivers on Gold'], cons: [] },
            { label: 'Cons', pros: [], cons: ['Online card fee of 3.4% + $0.15', 'Forms need Gold ($48+)', 'Prices published in USD'] },
          ]}
        />
      </section>

      <section id="square">
        <h2 className="font-serif text-2xl font-bold mb-4">3. Square Appointments</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Square&apos;s Free plan includes an online booking site and appointment reminders at $0 per location. Plus at $49/month per location adds cancellation policies and no-show fees and a waitlist, with a 30-day trial. Square lists appointment deposits as a feature without saying on its pricing page which plan includes them, so confirm before you rely on it.
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> lash techs starting out on a tight budget, or already using Square for payments.</p>
        <ArticleComparison
          items={[
            { label: 'Pros', pros: ['Free plan', 'Familiar payments ecosystem', 'Reminders on Free'], cons: [] },
            { label: 'Cons', pros: [], cons: ['No-show fees need Plus', 'Plan for deposits not stated', '3.3% + 30¢ online on Free'] },
          ]}
        />
      </section>

      <section id="booksy">
        <h2 className="font-serif text-2xl font-bold mb-4">4. Booksy</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Booksy is booking software plus a client app. In the US it costs $29.99/month, $20 per extra staff member, with a 14-day trial. Boost puts you in front of clients on the app for 30% of their first visit (max $100). On a $180 volume set, that is $54 for the first appointment (30% of $180 = $54, under the $100 cap). Its pricing page lists No-Show Protection features as included.
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> lash techs in cities where clients search on Booksy.</p>
      </section>

      <section id="fresha">
        <h2 className="font-serif text-2xl font-bold mb-4">5. Fresha</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Fresha Independent is €14.95/month with a 7-day trial. Upfront payments and no-show fees are listed, and its in-person card fee (0.59% + €0.15) is the lowest published rate in this comparison. Brand new clients who find you through the Fresha marketplace trigger a one-time fee; check the pricing page for the current amount.
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> lash techs in Europe or the UK who want low card fees and marketplace exposure.</p>
      </section>

      <section id="verdict">
        <h2 className="font-serif text-2xl font-bold mb-4">Verdict</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Clients from Instagram and TikTok:</strong> Nelsy, for deposits per service and 0% commission.</li>
          <li><strong>US studio that wants a polished site and forms:</strong> GlossGenius Gold.</li>
          <li><strong>Lowest starting cost:</strong> Square Appointments Free.</li>
          <li><strong>You want app discovery:</strong> Booksy or Fresha, budgeting for the new-client fee.</li>
        </ul>
        <ArticleTip>Set your deposit policy before you choose an app, then check the app can apply it to the exact services you need. Guidance in our <Link to="/blog/how-much-deposit-should-nail-tech-charge" className={ext}>deposit amount guide</Link> applies to lashes too.</ArticleTip>
        <p className="text-gray-700 mt-4 leading-relaxed">
          Try a Nelsy booking page in the <Link to="/demo" className={ext}>live demo</Link>.
        </p>
      </section>
    </div>
  ),
});
export {};
