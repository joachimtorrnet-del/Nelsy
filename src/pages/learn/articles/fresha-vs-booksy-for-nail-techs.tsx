import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleComparison } from '@/components/article/ArticleBodyComponents';

const ext = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'fresha-vs-booksy-for-nail-techs',
  title: 'Fresha vs Booksy for Nail Techs (2026): Prices, Fees and Verdict',
  seoTitle: 'Fresha vs Booksy (2026): Prices, Fees & Which Is Better',
  excerpt: 'Fresha vs Booksy compared on what nail techs actually pay: monthly plans, marketplace commission on new clients, card fees, text messages and deposits. Figures taken from each official pricing page.',
  seoDescription: 'Fresha vs Booksy for nail techs: monthly price, new-client commission, card fees, SMS and deposits compared side by side, with a cost example and a clear verdict.',
  category: 'comparisons',
  audience: ['pros'],
  craft: 'nails',
  tags: ['Fresha vs Booksy', 'Booksy vs Fresha', 'Fresha pricing', 'Booksy pricing', 'nail tech booking software'],
  heroImage: 'linear-gradient(135deg, #F5F3FF 0%, #DDD6FE 100%)',
  heroImageAlt: 'Fresha vs Booksy for nail techs: prices and fees compared',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  updatedAt: '2026-11-23',
  tldr: {
    answer: "Fresha is cheaper to run; Booksy is simpler to price.",
    detail: "For a solo nail tech, Fresha starts at €14.95/month with low card fees but charges extras and a fee on new marketplace clients. Booksy is $29.99/month in the US (£40 in the UK) with everything included and a published 30% fee on Boost clients' first visit.",
    points: [
      { label: "Fresha", text: "Best for nail techs in Europe or the UK who want the lowest subscription and card fees." },
      { label: "Booksy", text: "Best for nail techs in cities where clients book through the Booksy app." },
      { label: "Nelsy", text: "Best for nail techs who get clients from Instagram and TikTok and want 0% commission." },
    ],
  },
  toc: [
    { id: 'short-answer', label: 'The short answer' },
    { id: 'pricing', label: 'Monthly price' },
    { id: 'marketplace', label: 'Commission on new clients' },
    { id: 'card-fees', label: 'Card payment fees' },
    { id: 'messages', label: 'Text messages and reminders' },
    { id: 'deposits', label: 'Deposits and no-shows' },
    { id: 'cost-example', label: 'Cost example for a solo nail tech' },
    { id: 'which', label: 'Which one should you pick?' },
    { id: 'alternative', label: 'An alternative with no commission' },
  ],
  relatedSlugs: ['glossgenius-vs-booksy-nail-techs', 'glossgenius-vs-fresha-for-nail-techs', 'should-nail-techs-use-fresha', 'is-booksy-worth-it-nail-techs'],
  faq: [
    { q: 'Is Fresha cheaper than Booksy?', a: 'For a solo nail tech, Fresha\'s Independent plan is listed at €14.95 per month, while Booksy is $29.99 per month in the US and £40 per month in the UK. Fresha is cheaper on the subscription alone. Your real cost also depends on card fees, text messages and how many new clients come from each marketplace.' },
    { q: 'Does Fresha take a commission on bookings?', a: 'Fresha charges a one-time fee on brand new clients who find you through the Fresha marketplace. Returning clients and bookings from Instagram, Facebook or your direct link are listed as free. Fresha\'s pricing page does not state the percentage, so ask Fresha before you rely on the marketplace.' },
    { q: 'How much is Booksy Boost?', a: 'Booksy Boost is free to turn on. Booksy charges a one-time 30% fee on a Boost client\'s first visit, capped at $100 in the US. In the UK it is 30% with a £5 minimum. From the second visit the commission is 0%.' },
    { q: 'Which is better for a solo nail tech, Fresha or Booksy?', a: 'If most of your clients already find you through Instagram or word of mouth, the cheaper subscription and lower card fees usually matter more than marketplace exposure. If you want a marketplace to send you new clients, compare how active each app is in your city before choosing.' },
    { q: 'Can I take deposits with Fresha and Booksy?', a: 'Yes. Both list upfront payments or deposits and cancellation or no-show fees. Card processing fees apply to those payments on both platforms.' },
  ],
  relatedFeatureSlugs: ['bookings', 'deposits', 'payments'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="info" title="How we sourced these figures">
        Every price below comes from Fresha&apos;s and Booksy&apos;s own pricing pages, checked on 23 November 2026. Prices exclude tax. Fresha lists its prices in euros; Booksy publishes separate US and UK prices. Prices change, so check the official pages before you commit (links in each section).
      </ArticleCallout>

      <section id="short-answer">
        <h2 className="font-serif text-2xl font-bold mb-4">The short answer</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          <strong>Fresha</strong> is the cheaper subscription for a solo nail tech (€14.95 a month) with lower card fees, and an add-on menu for extras. <strong>Booksy</strong> costs more per month ($29.99 in the US, £40 in the UK) but includes more marketing texts and publishes its new-client commission clearly: 30% of the first visit.
        </p>
        <ArticleComparison
          items={[
            {
              label: 'Fresha',
              pros: ['€14.95/month for one person', 'Online card fee from 1.29% + €0.15', 'Returning clients never trigger a marketplace fee'],
              cons: ['New-client marketplace fee percentage not shown on the pricing page', 'Only 20 free texts a month, then €0.10 each', 'Many features are paid add-ons'],
            },
            {
              label: 'Booksy',
              pros: ['One plan with everything included', 'Reminders and confirmations always free', 'Clear Boost fee: 30% of first visit (max $100 in the US)'],
              cons: ['$29.99/month in the US, £40 in the UK', 'US mobile payments at 2.69% + $0.30', 'Boost commission on new marketplace clients'],
            },
          ]}
        />
      </section>

      <section id="pricing">
        <h2 className="font-serif text-2xl font-bold mb-4">Monthly price</h2>
        <ArticleTable
          headers={['', 'Fresha', 'Booksy US', 'Booksy UK']}
          rows={[
            ['Solo plan', '€14.95/month (Independent)', '$29.99/month', '£40/month'],
            ['Each extra team member', '€9.95/month per member (Team plan)', '$20/month', '£5/month'],
            ['Free trial', '7 days', '14 days', '7 days'],
            ['Contract', 'No minimum commitment', 'Cancel anytime', 'Cancel anytime'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">
          Fresha sells several extras on top of the plan, for example a Smart Website (€13.95/month), Insights (€9.95 per team member) and Client Loyalty (€59.95 per location). Booksy sells one plan. Sources: <a href="https://www.fresha.com/pricing" rel="nofollow noopener" target="_blank" className={ext}>Fresha pricing</a>, <a href="https://biz.booksy.com/en-us/pricing" rel="nofollow noopener" target="_blank" className={ext}>Booksy US pricing</a>, <a href="https://biz.booksy.com/en-gb/pricing" rel="nofollow noopener" target="_blank" className={ext}>Booksy UK pricing</a>.
        </p>
      </section>

      <section id="marketplace">
        <h2 className="font-serif text-2xl font-bold mb-4">Commission on new clients</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          This is the biggest difference for nail techs, because a full set can cost $60 to $120 and a percentage of that adds up quickly.
        </p>
        <ArticleTable
          headers={['', 'Fresha marketplace', 'Booksy Boost']}
          rows={[
            ['When it applies', 'A brand new client who finds you on the Fresha marketplace', 'A new client who finds you on the Booksy app, when Boost is on'],
            ['How much', 'One-time fee; the percentage is not stated on the pricing page', '30% of the first visit, max $100 (US); 30%, min £5 (UK)'],
            ['Returning clients', 'No fee', '0% from the second visit'],
            ['Instagram, Google, your own link', 'Free', 'Commission-free'],
          ]}
        />
        <ArticleTip>On a $90 full set, a 30% Boost fee is $27 for that first visit. Before you switch on either marketplace, ask yourself how many clients you actually expect from the app versus Instagram and referrals.</ArticleTip>
      </section>

      <section id="card-fees">
        <h2 className="font-serif text-2xl font-bold mb-4">Card payment fees</h2>
        <ArticleTable
          headers={['Payment type', 'Fresha (EUR)', 'Booksy US', 'Booksy UK']}
          rows={[
            ['Online / in-app', '1.29% + €0.15', '2.69% + $0.30', '1.29% + 20p + VAT'],
            ['In person', '0.59% + €0.15 (+€0.10 Tap to Pay)', '2.49% + $0.10 (card reader), 2.49% + $0.20 (Tap to Pay)', '0.99% + 20p + VAT (Tap to Pay)'],
            ['Fast payout', 'Not stated', '1.5% (30 minutes); next business day free', '1.5% (30 minutes)'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">
          Fresha also offers Klarna at 4.99% + €0.50 and a card terminal from €7.95/month or €119 upfront. Sources: <a href="https://www.fresha.com/for-business/features/payments" rel="nofollow noopener" target="_blank" className={ext}>Fresha payments</a>, <a href="https://biz.booksy.com/features/payments" rel="nofollow noopener" target="_blank" className={ext}>Booksy payments</a>.
        </p>
      </section>

      <section id="messages">
        <h2 className="font-serif text-2xl font-bold mb-4">Text messages and reminders</h2>
        <ArticleTable
          headers={['', 'Fresha', 'Booksy US', 'Booksy UK']}
          rows={[
            ['Automated texts included', '20/month, then €0.10 per text', 'Confirmations and reminders always free', 'Confirmations and reminders always free'],
            ['Marketing texts', '€0.14 per text', '2,000 free per month', '500 free per month, then 5p'],
            ['Email and app notifications', 'Free, unlimited', 'Not stated', 'Not stated'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">
          If you send a text reminder for every appointment, Fresha&apos;s 20 free texts run out fast: 80 appointments a month means about 60 paid texts, roughly €6.
        </p>
      </section>

      <section id="deposits">
        <h2 className="font-serif text-2xl font-bold mb-4">Deposits and no-shows</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Both platforms let you take a payment upfront and charge a fee for late cancellations or no-shows. Neither sets the amount for you: you choose your own policy. Card fees from the table above apply to deposits. For how much to charge, see our guide to <Link to="/nail-tech-deposits" className={ext}>deposits for nail techs</Link>.
        </p>
      </section>

      <section id="cost-example">
        <h2 className="font-serif text-2xl font-bold mb-4">Cost example for a solo nail tech</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Assumptions: 80 appointments a month at an average of $70 (or €70), all paid online, one text reminder each, no marketplace clients. This is an illustration based on the published rates, not a quote.
        </p>
        <ArticleTable
          headers={['Monthly cost', 'Fresha', 'Booksy US']}
          rows={[
            ['Subscription', '€14.95', '$29.99'],
            ['Card fees (80 × 70)', '€84.24 (1.29% + €0.15)', '$174.64 (2.69% + $0.30)'],
            ['Reminder texts', '≈ €6.00 (60 paid texts)', '$0'],
            ['Total before tax', '≈ €105', '≈ $205'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">
          Card fees are the largest line on both platforms, more than the subscription. Add marketplace fees if new clients come from either app.
        </p>
      </section>

      <section id="which">
        <h2 className="font-serif text-2xl font-bold mb-4">Which one should you pick?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Pick Fresha</strong> if you work in Europe or the UK, want the lowest subscription and card fees, and don&apos;t need many text messages.</li>
          <li><strong>Pick Booksy</strong> if Booksy is the app clients use in your city, you send a lot of marketing texts, and you want one plan with no add-ons.</li>
          <li><strong>Skip both marketplaces</strong> if your bookings come from Instagram and referrals: you would pay for discovery you don&apos;t use.</li>
        </ul>
      </section>

      <section id="alternative">
        <h2 className="font-serif text-2xl font-bold mb-4">An alternative with no commission</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Nelsy is built for nail techs who get clients from Instagram and TikTok. It costs $29/month (or $25/month billed yearly), with a 14-day free trial and <strong>0% Nelsy commission</strong> on every booking, new client or not. Standard Stripe processing fees apply to online payments.
        </p>
        <ArticleTable
          headers={['', 'Fresha', 'Booksy', 'Nelsy']}
          rows={[
            ['Commission on new clients', 'Marketplace fee', '30% of first visit with Boost', '0%'],
            ['Booking page for your Instagram bio', 'Yes', 'Yes', 'Yes, with templates you can design'],
            ['Pay on arrival, deposit or full upfront per service', 'Upfront payments and policies', 'Deposits and cancellation fees', 'Yes, set per service'],
            ['Record cash and card paid at the studio', 'Yes (in-person payments)', 'Yes (card reader)', 'Yes'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">
          Compare more options in <Link to="/best-booking-app-for-nail-techs" className={ext}>the best booking apps for nail techs</Link>, or read our <Link to="/fresha-alternative-nail-techs" className={ext}>Fresha alternatives</Link> and <Link to="/booksy-alternative-nail-techs" className={ext}>Booksy alternatives</Link>.
        </p>
      </section>
    </div>
  ),
});
export {};
