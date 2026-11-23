import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleComparison } from '@/components/article/ArticleBodyComponents';

const ext = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'glossgenius-vs-booksy-nail-techs',
  title: 'GlossGenius vs Booksy for Nail Techs (2026): Prices, Fees and Verdict',
  seoTitle: 'GlossGenius vs Booksy (2026): Price, Fees & Best Pick for Nail Techs',
  excerpt: 'GlossGenius vs Booksy compared for nail techs in the US: plans, card fees, new-client commission, payouts, texts and deposits, with a monthly cost example. Figures from each official pricing page.',
  seoDescription: 'GlossGenius vs Booksy for nail techs: $24 to $148 plans vs $29.99, card fees, Boost commission, payouts and texts compared, with a cost example and a clear verdict.',
  category: 'comparisons',
  tags: ['GlossGenius vs Booksy', 'Booksy vs GlossGenius', 'GlossGenius pricing', 'Booksy pricing', 'nail tech booking app'],
  heroImage: 'linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)',
  heroImageAlt: 'GlossGenius vs Booksy for nail techs: prices and fees compared',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  updatedAt: '2026-11-23',
  toc: [
    { id: 'short-answer', label: 'The short answer' },
    { id: 'pricing', label: 'Monthly price' },
    { id: 'card-fees', label: 'Card fees and payouts' },
    { id: 'new-clients', label: 'Commission on new clients' },
    { id: 'texts', label: 'Texts and reminders' },
    { id: 'deposits', label: 'Deposits and no-shows' },
    { id: 'cost-example', label: 'Cost example for a solo nail tech' },
    { id: 'which', label: 'Which one should you pick?' },
    { id: 'alternative', label: 'An alternative with no commission' },
  ],
  relatedSlugs: ['fresha-vs-booksy-for-nail-techs', 'is-glossgenius-worth-it-nail-techs', 'glossgenius-alternatives-nail-techs', 'is-booksy-worth-it-nail-techs'],
  faq: [
    { q: 'Is GlossGenius cheaper than Booksy?', a: 'GlossGenius Standard is $24/month billed annually ($28 otherwise), compared with $29.99/month for Booksy in the US. GlossGenius has the lower entry price. In person, GlossGenius charges 2.4% + $0.15 and the Booksy card reader 2.49% + $0.10, so the totals end up very close. Your total depends on your volume.' },
    { q: 'Does GlossGenius charge a commission on new clients?', a: 'GlossGenius\'s pricing and payments pages do not mention a marketplace or a new-client commission. Booksy charges a one-time 30% fee on a Boost client\'s first visit, up to $100, only when Boost is on.' },
    { q: 'Which pays out faster, GlossGenius or Booksy?', a: 'GlossGenius lists free same-business-day payouts Monday to Thursday and instant payouts for a 1.8% fee. Booksy lists free next-business-day payouts and 30-minute Fast Payouts for a 1.5% fee.' },
    { q: 'Is GlossGenius good for nail techs?', a: 'GlossGenius suits nail techs who want a polished booking website and simple pricing with no marketplace. Booksy suits nail techs who want to be found in the Booksy app. If you mostly book from Instagram, compare the monthly cost and card fees rather than discovery features.' },
    { q: 'How long are the free trials?', a: 'GlossGenius offers 14 days with no credit card required. Booksy US offers a 14-day trial.' },
  ],
  relatedFeatureSlugs: ['bookings', 'deposits', 'payments'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="info" title="How we sourced these figures">
        All prices come from GlossGenius&apos;s and Booksy&apos;s official US pricing pages, checked on 23 November 2026. Prices exclude tax. They change over time, so confirm on the official pages before you sign up (links below each table).
      </ArticleCallout>

      <section id="short-answer">
        <h2 className="font-serif text-2xl font-bold mb-4">The short answer</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          <strong>GlossGenius</strong> is a booking website and payments tool with no marketplace: you bring your own clients. <strong>Booksy</strong> is a booking app with a consumer marketplace, and charges a commission on new clients only if you turn Boost on. For a solo nail tech booking from Instagram, the two cost about the same; the real choice is whether you want marketplace discovery.
        </p>
        <ArticleComparison
          items={[
            {
              label: 'GlossGenius',
              pros: ['From $24/month billed annually', 'No marketplace commission mentioned', 'Free same-business-day payouts (Mon to Thu)'],
              cons: ['Card-on-file and keyed-in payments at 3.4% + $0.15', 'Gold plan ($48 to $56) for Google Booking and text marketing', 'Pricing page does not list countries'],
            },
            {
              label: 'Booksy',
              pros: ['$29.99/month, everything included', '2,000 marketing texts a month, reminders always free', 'Marketplace app that can send you new clients'],
              cons: ['30% of first visit (max $100) for Boost clients', 'Online and keyed-in payments at 2.69% + $0.30', '$20/month per extra team member'],
            },
          ]}
        />
      </section>

      <section id="pricing">
        <h2 className="font-serif text-2xl font-bold mb-4">Monthly price</h2>
        <ArticleTable
          headers={['Plan', 'GlossGenius', 'Booksy US']}
          rows={[
            ['Entry plan', 'Standard: $24/month billed annually, $28 monthly', '$29.99/month'],
            ['Growing business', 'Gold: $48/month billed annually, $56 monthly (up to 9 staff)', '+$20/month per extra team member'],
            ['Large team', 'Platinum: $148/month billed annually, $168 monthly (10+)', '+$20/month per extra team member'],
            ['Free trial', '14 days, no credit card', '14 days'],
            ['Contract', 'No contracts', 'No commitment, cancel anytime'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">
          Sources: <a href="https://glossgenius.com/pricing" rel="nofollow noopener" target="_blank" className={ext}>GlossGenius pricing</a>, <a href="https://biz.booksy.com/en-us/pricing" rel="nofollow noopener" target="_blank" className={ext}>Booksy US pricing</a>.
        </p>
      </section>

      <section id="card-fees">
        <h2 className="font-serif text-2xl font-bold mb-4">Card fees and payouts</h2>
        <ArticleTable
          headers={['', 'GlossGenius', 'Booksy US']}
          rows={[
            ['In person (tap, dip, swipe)', '2.4% + $0.15', '2.49% + $0.10 (card reader), 2.49% + $0.20 (Tap to Pay)'],
            ['Online / card on file / keyed in', '3.4% + $0.15', '2.69% + $0.30'],
            ['Invoices', '2.9% + $0.30', 'Not stated'],
            ['Buy now, pay later', '6% + $0.30', 'Not stated'],
            ['Standard payout', 'Free same business day (Mon to Thu)', 'Free next business day'],
            ['Instant payout', '1.8% fee', '1.5% fee (30 minutes)'],
          ]}
        />
        <ArticleTip>Booksy&apos;s online rate is cheaper in percentage but has a higher fixed fee. On a $70 deposit taken online: GlossGenius is $2.53, Booksy is $2.18.</ArticleTip>
        <p className="text-gray-700 mt-4 leading-relaxed">
          Sources: <a href="https://glossgenius.com/payment-processing" rel="nofollow noopener" target="_blank" className={ext}>GlossGenius payments</a>, <a href="https://biz.booksy.com/features/payments" rel="nofollow noopener" target="_blank" className={ext}>Booksy payments</a>.
        </p>
      </section>

      <section id="new-clients">
        <h2 className="font-serif text-2xl font-bold mb-4">Commission on new clients</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          GlossGenius&apos;s pricing and payments pages do not mention a marketplace or a fee on new clients. Booksy&apos;s Boost is free to turn on and charges a one-time 30% fee on a Boost client&apos;s first visit, up to $100. From the second visit it is 0%, and clients who find you through your own marketing never trigger it.
        </p>
        <p className="text-gray-700 leading-relaxed">
          On a $90 full set, that first-visit fee is $27. Whether that is worth it depends on how many new clients the Booksy app actually sends you in your city.
        </p>
      </section>

      <section id="texts">
        <h2 className="font-serif text-2xl font-bold mb-4">Texts and reminders</h2>
        <ArticleTable
          headers={['', 'GlossGenius', 'Booksy US']}
          rows={[
            ['Appointment reminders', 'Not detailed on the pricing page', 'Always free'],
            ['Marketing texts', 'Text marketing on Gold; 2,500 texts on Platinum', '2,000 free per month'],
          ]}
        />
      </section>

      <section id="deposits">
        <h2 className="font-serif text-2xl font-bold mb-4">Deposits and no-shows</h2>
        <p className="text-gray-700 leading-relaxed">
          Both support deposits, card on file and cancellation or no-show policies. GlossGenius also lists an automated waitlist. On both, card fees apply to deposits and no-show charges. See <Link to="/nail-tech-deposits" className={ext}>how to take deposits as a nail tech</Link> for amounts that work.
        </p>
      </section>

      <section id="cost-example">
        <h2 className="font-serif text-2xl font-bold mb-4">Cost example for a solo nail tech</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Assumptions: 80 appointments a month at $70, paid in person, no marketplace clients, entry plan. An illustration from published rates, not a quote.
        </p>
        <ArticleTable
          headers={['Monthly cost', 'GlossGenius Standard', 'Booksy US']}
          rows={[
            ['Subscription', '$24 (annual) or $28', '$29.99'],
            ['In-person card fees (80 × $70)', '$146.40 (2.4% + $0.15)', '$147.44 (2.49% + $0.10, card reader)'],
            ['Total before tax', '≈ $170 to $174', '≈ $177'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">
          Without marketplace clients, the difference is a few dollars a month. Card fees are by far the biggest cost on both.
        </p>
      </section>

      <section id="which">
        <h2 className="font-serif text-2xl font-bold mb-4">Which one should you pick?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Pick GlossGenius</strong> if you already have a client base, want a clean booking website, and don&apos;t want a marketplace fee in the picture.</li>
          <li><strong>Pick Booksy</strong> if clients in your area use the Booksy app and you want it to send you new clients, accepting 30% of their first visit.</li>
          <li><strong>Check the extras</strong>: if you need Google Booking or text marketing on GlossGenius, the Gold plan ($48 to $56) is the one to compare.</li>
        </ul>
      </section>

      <section id="alternative">
        <h2 className="font-serif text-2xl font-bold mb-4">An alternative with no commission</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Nelsy is a booking page for nail techs who get clients from Instagram and TikTok: $29/month (or $25/month billed yearly), a 14-day free trial, and <strong>0% Nelsy commission</strong> on every booking. Standard Stripe fees apply to online payments. For each service you choose pay on arrival, a deposit, or full payment upfront, and you can record cash or card paid at the studio.
        </p>
        <p className="text-gray-700 leading-relaxed">
          More comparisons: <Link to="/blog/fresha-vs-booksy-for-nail-techs" className={ext}>Fresha vs Booksy</Link>, <Link to="/blog/glossgenius-vs-fresha-for-nail-techs" className={ext}>GlossGenius vs Fresha</Link>, <Link to="/best-booking-app-for-nail-techs" className={ext}>best booking app for nail techs</Link>.
        </p>
      </section>
    </div>
  ),
});
export {};
