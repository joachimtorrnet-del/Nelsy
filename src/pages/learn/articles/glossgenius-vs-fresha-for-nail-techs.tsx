import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTable, ArticleComparison, ArticleTip } from '@/components/article/ArticleBodyComponents';

const ext = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'glossgenius-vs-fresha-for-nail-techs',
  title: 'GlossGenius vs Fresha (2026): Prices, Fees and Which to Choose',
  seoTitle: 'GlossGenius vs Fresha (2026): Prices, Fees & Differences',
  excerpt: 'GlossGenius vs Fresha compared for nail techs and beauty pros: plan prices, card fees, marketplace fee on new clients, texts, payouts and who each one suits. Figures from the official pricing pages.',
  seoDescription: 'GlossGenius vs Fresha: plans ($24 vs €14.95/month), card fees, Fresha marketplace fee, texts and payouts compared, with the differences that matter for nail techs.',
  category: 'comparisons',
  tags: ['GlossGenius vs Fresha', 'Fresha vs GlossGenius', 'GlossGenius pricing', 'Fresha pricing', 'nail tech booking software'],
  heroImage: 'linear-gradient(135deg, #FFF0F6 0%, #FBCFE8 100%)',
  heroImageAlt: 'GlossGenius vs Fresha: prices and fees compared',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  updatedAt: '2026-11-24',
  toc: [
    { id: 'short-answer', label: 'The short answer' },
    { id: 'pricing', label: 'Monthly price' },
    { id: 'new-clients', label: 'Fee on new clients' },
    { id: 'card-fees', label: 'Card fees and payouts' },
    { id: 'texts', label: 'Texts and extras' },
    { id: 'which', label: 'Which one should you choose?' },
    { id: 'alternative', label: 'An alternative for beauty creators' },
  ],
  relatedSlugs: ['is-glossgenius-worth-it-nail-techs', 'should-nail-techs-use-fresha', 'glossgenius-vs-booksy-nail-techs', 'fresha-vs-booksy-for-nail-techs'],
  faq: [
    { q: 'What is the difference between GlossGenius and Fresha?', a: 'Fresha combines booking software with a consumer marketplace and charges a one-time fee on brand new marketplace clients. GlossGenius is booking, website and payments software without a marketplace mentioned on its pricing pages. Fresha starts at €14.95/month; GlossGenius at $24/month billed annually.' },
    { q: 'Is GlossGenius better than Fresha?', a: 'Neither is better for everyone. GlossGenius suits beauty pros who bring their own clients and want a polished booking site and fast US payouts. Fresha suits those who want a low entry price, low published card fees and a marketplace that can bring new clients.' },
    { q: 'Which has lower card fees, GlossGenius or Fresha?', a: 'On their published rates, Fresha is lower: 0.59% + €0.15 in person and 1.29% + €0.15 online, versus 2.4% + $0.15 in person and 3.4% + $0.15 for online or card-on-file payments at GlossGenius. The two are priced in different currencies and markets, so compare in your own country.' },
    { q: 'Do GlossGenius and Fresha offer free trials?', a: 'Yes: GlossGenius offers 14 days with no credit card required, and Fresha offers 7 days.' },
  ],
  relatedFeatureSlugs: ['bookings', 'deposits', 'payments'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="info" title="How we sourced these figures">
        From the official pricing pages of <a href="https://glossgenius.com/pricing" rel="nofollow noopener" target="_blank" className={ext}>GlossGenius</a> (US dollars) and <a href="https://www.fresha.com/pricing" rel="nofollow noopener" target="_blank" className={ext}>Fresha</a> (euros), checked on 23 November 2026, excluding tax. The two publish prices in different currencies, so we show each as published.
      </ArticleCallout>

      <section id="short-answer">
        <h2 className="font-serif text-2xl font-bold mb-4">The short answer</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          <strong>Fresha</strong> is cheaper to start (€14.95/month) with lower published card fees, and adds a marketplace that charges a one-time fee on brand new clients it sends you. <strong>GlossGenius</strong> costs a bit more ($24 to $28/month), has no marketplace fee mentioned, and focuses on your own booking website and fast payouts.
        </p>
        <ArticleComparison
          items={[
            { label: 'GlossGenius', pros: ['No new-client marketplace fee mentioned', 'Free same-business-day payouts (Mon to Thu)', '14-day trial, no credit card'], cons: ['3.4% + $0.15 on online and card-on-file payments', 'Google Booking and text marketing from the Gold plan'] },
            { label: 'Fresha', pros: ['From €14.95/month', 'Card fees from 0.59% + €0.15 in person', 'Marketplace that can bring new clients'], cons: ['One-time fee on new marketplace clients (rate not published)', 'Only 20 free texts a month, then €0.10'] },
          ]}
        />
      </section>

      <section id="pricing">
        <h2 className="font-serif text-2xl font-bold mb-4">Monthly price</h2>
        <ArticleTable
          headers={['', 'GlossGenius', 'Fresha']}
          rows={[
            ['Solo plan', 'Standard: $24/month billed annually, $28 monthly', 'Independent: €14.95/month'],
            ['Team plan', 'Gold: $48 to $56/month (up to 9 staff)', 'Team: €9.95 per team member per month'],
            ['Large team', 'Platinum: $148 to $168/month (10+, unlimited members)', 'Enterprise: custom (over 20 members)'],
            ['Free trial', '14 days, no credit card', '7 days'],
          ]}
        />
        <ArticleTip>For a team of 5, Fresha Team is 5 × €9.95 = €49.75/month, close to GlossGenius Gold at $48 to $56. The gap is mostly at the solo level.</ArticleTip>
      </section>

      <section id="new-clients">
        <h2 className="font-serif text-2xl font-bold mb-4">Fee on new clients</h2>
        <p className="text-gray-700 leading-relaxed">
          Fresha charges a one-time fee on brand new clients who find you through the Fresha marketplace; returning clients and bookings from Instagram, Facebook or your own link are free. Its pricing page doesn&apos;t give the percentage. GlossGenius&apos;s pricing and payments pages don&apos;t mention a marketplace or a fee on new clients.
        </p>
      </section>

      <section id="card-fees">
        <h2 className="font-serif text-2xl font-bold mb-4">Card fees and payouts</h2>
        <ArticleTable
          headers={['', 'GlossGenius', 'Fresha']}
          rows={[
            ['In person', '2.4% + $0.15', '0.59% + €0.15 (+€0.10 Tap to Pay)'],
            ['Online / card on file', '3.4% + $0.15', '1.29% + €0.15'],
            ['Buy now, pay later', '6% + $0.30', 'Klarna 4.99% + €0.50'],
            ['Payouts', 'Free same business day (Mon to Thu); instant +1.8%', 'Not stated on the pricing page'],
            ['Card terminal', 'Card reader (price not on pricing page)', 'From €7.95/month or €119 upfront'],
          ]}
        />
      </section>

      <section id="texts">
        <h2 className="font-serif text-2xl font-bold mb-4">Texts and extras</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>GlossGenius:</strong> text marketing from Gold, 2,500 marketing texts on Platinum; Payroll $40/month + $6 per seat; Reception $50/month.</li>
          <li><strong>Fresha:</strong> 20 free automated texts per month (per member on Team), then €0.10; marketing texts €0.14; add-ons such as Smart Website €13.95/month and Client Loyalty €59.95 per location.</li>
        </ul>
      </section>

      <section id="which">
        <h2 className="font-serif text-2xl font-bold mb-4">Which one should you choose?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Choose GlossGenius</strong> if you work in the US, already have clients, and want a polished booking site with fast payouts and no marketplace fee.</li>
          <li><strong>Choose Fresha</strong> if you&apos;re in Europe or the UK, want the lowest entry price and card fees, and want a marketplace to bring new clients.</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">Full reviews: <Link to="/blog/is-glossgenius-worth-it-nail-techs" className={ext}>Is GlossGenius worth it?</Link> and <Link to="/blog/should-nail-techs-use-fresha" className={ext}>Fresha review</Link>.</p>
      </section>

      <section id="alternative">
        <h2 className="font-serif text-2xl font-bold mb-4">An alternative for beauty creators</h2>
        <p className="text-gray-700 leading-relaxed">
          If your clients find you on Instagram and TikTok, Nelsy puts bookings, deposits, coaching and digital products on one link-in-bio page, with 0% Nelsy commission: $29/month or $25/month billed yearly, with a 14-day free trial. Compare all options in <Link to="/best-booking-app-for-nail-techs" className={ext}>the best booking apps for nail techs</Link>.
        </p>
      </section>
    </div>
  ),
});
export {};
