import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleComparison } from '@/components/article/ArticleBodyComponents';

const ext = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'should-nail-techs-use-fresha',
  title: 'Fresha Review for Nail Techs (2026): Pricing, Fees and Verdict',
  seoTitle: 'Fresha Review (2026): Pricing, Fees and Terminal for Nail Techs',
  excerpt: 'An honest Fresha review for nail techs: what Fresha costs in 2026 (it is no longer free), the marketplace fee on new clients, card and terminal fees, text messages, add-ons and who it suits.',
  seoDescription: 'Fresha review for nail techs: €14.95/month plans, new-client marketplace fee, card terminal and payment fees, texts and add-ons, plus pros, cons and alternatives.',
  category: 'comparisons',
  tags: ['Fresha review', 'Fresha reviews', 'Fresha pricing', 'Fresha card terminal', 'should nail techs use Fresha'],
  heroImage: 'linear-gradient(135deg, #FFF9EB 0%, #FEF3C7 100%)',
  heroImageAlt: 'Fresha review for nail techs: pricing, fees and verdict',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  updatedAt: '2026-11-23',
  tldr: {
    answer: "Fresha is solid and low-cost, but no longer free.",
    detail: "Expect €14.95/month for a solo nail tech, paid texts beyond 20 a month and paid add-ons. Its card fees are among the lowest published, and its marketplace can bring new clients for a one-time fee.",
    points: [
      { label: "Good fit", text: "Pros in Europe or the UK who take card payments and want marketplace discovery." },
      { label: "Less suited", text: "Pros whose clients come from Instagram and TikTok and who want a branded page." },
      { label: "Alternative", text: "Nelsy: a link-in-bio booking page with 0% commission." },
    ],
  },
  toc: [
    { id: 'verdict', label: 'Our verdict in short' },
    { id: 'what-is-fresha', label: 'What is Fresha?' },
    { id: 'pricing', label: 'How much does Fresha cost in 2026?' },
    { id: 'marketplace', label: 'The marketplace fee on new clients' },
    { id: 'payments', label: 'Card payments and the Fresha terminal' },
    { id: 'messages', label: 'Text messages and add-ons' },
    { id: 'pros-cons', label: 'Pros and cons for nail techs' },
    { id: 'who', label: 'Who Fresha suits, and who it doesn\'t' },
    { id: 'alternatives', label: 'Fresha alternatives' },
  ],
  relatedSlugs: ['fresha-vs-booksy-for-nail-techs', 'glossgenius-vs-fresha-for-nail-techs', 'square-vs-fresha-nail-techs', 'is-booksy-worth-it-nail-techs'],
  faq: [
    { q: 'Is Fresha free for nail techs?', a: 'No. Fresha no longer has a free plan: its pricing page lists the Independent plan at €14.95/month and the Team plan at €9.95 per team member per month, after a 7-day trial. Prices exclude sales tax.' },
    { q: 'Does Fresha charge a commission?', a: 'Fresha charges a one-time fee on brand new clients who discover you through the Fresha marketplace. The percentage is not shown on its pricing page. Returning clients and bookings from Instagram, Facebook or your direct link are listed as free.' },
    { q: 'How much is the Fresha card terminal?', a: 'Fresha lists its card terminal from €7.95 per month or €119 upfront. In-person card payments cost 0.59% + €0.15 per transaction, plus €0.10 per Tap to Pay authorisation.' },
    { q: 'What are Fresha\'s payment processing fees?', a: 'Online payments cost 1.29% + €0.15 per transaction and in-person payments 0.59% + €0.15. Klarna costs 4.99% + €0.50 per transaction.' },
    { q: 'Can I take deposits and charge no-show fees on Fresha?', a: 'Yes. Fresha lists upfront payments, no-show and late cancellation fees, and customisable payment policies. You set the amounts; payment fees apply.' },
  ],
  relatedFeatureSlugs: ['bookings', 'deposits', 'payments'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="info" title="How we wrote this review">
        All prices and fees come from Fresha&apos;s official <a href="https://www.fresha.com/pricing" rel="nofollow noopener" target="_blank" className={ext}>pricing page</a> and <a href="https://www.fresha.com/for-business/features/payments" rel="nofollow noopener" target="_blank" className={ext}>payments page</a>, checked on 23 November 2026. Fresha lists prices in euros, excluding sales tax. We don&apos;t quote user ratings or testimonials we can&apos;t verify.
      </ArticleCallout>

      <section id="verdict">
        <h2 className="font-serif text-2xl font-bold mb-4">Our verdict in short</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Fresha is a solid, low-cost booking system with some of the lowest published card fees, and a marketplace that can bring new clients. It is <strong>no longer free</strong>: expect €14.95/month for a solo nail tech, plus paid texts beyond 20 a month and paid add-ons. It suits nail techs who want marketplace discovery in a city where clients use the Fresha app. If your clients come from Instagram, you pay for discovery you may not use.
        </p>
      </section>

      <section id="what-is-fresha">
        <h2 className="font-serif text-2xl font-bold mb-4">What is Fresha?</h2>
        <p className="text-gray-700 leading-relaxed">
          Fresha is booking and business software for salons and beauty professionals, combined with a consumer marketplace where clients search and book. It covers online booking, a calendar, payments with its own card terminal, automated messages, marketing emails and optional add-ons such as a website, loyalty and an AI receptionist.
        </p>
      </section>

      <section id="pricing">
        <h2 className="font-serif text-2xl font-bold mb-4">How much does Fresha cost in 2026?</h2>
        <ArticleTable
          headers={['Plan', 'Price (excl. tax)', 'For']}
          rows={[
            ['Independent', '€14.95/month', 'One team member, single calendar column'],
            ['Team', '€9.95 per team member per month', 'Multiple calendar columns'],
            ['Enterprise', 'Custom', 'Over 20 team members'],
            ['Free trial', '7 days', 'No minimum commitment, cancel anytime'],
          ]}
        />
        <ArticleTip>Many older articles still describe Fresha as free. Its current pricing page shows paid plans only, with a 7-day trial.</ArticleTip>
      </section>

      <section id="marketplace">
        <h2 className="font-serif text-2xl font-bold mb-4">The marketplace fee on new clients</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Fresha applies a one-time fee to brand new clients who discover your business on the Fresha marketplace. A new client is someone who has never booked with you on Fresha before. Returning clients never trigger it, and bookings from Facebook, Instagram or your direct link are listed as free.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Fresha&apos;s pricing and marketplace pages do not state the percentage, so ask Fresha for the exact rate before relying on the marketplace. For comparison, Booksy publishes 30% of the first visit for Boost clients (see <Link to="/blog/fresha-vs-booksy-for-nail-techs" className={ext}>Fresha vs Booksy</Link>).
        </p>
      </section>

      <section id="payments">
        <h2 className="font-serif text-2xl font-bold mb-4">Card payments and the Fresha terminal</h2>
        <ArticleTable
          headers={['', 'Fresha fee']}
          rows={[
            ['Online payments', '1.29% + €0.15 per transaction'],
            ['In-person payments', '0.59% + €0.15 per transaction'],
            ['Tap to Pay', '+€0.10 per authorisation'],
            ['Klarna', '4.99% + €0.50 per transaction'],
            ['Card terminal', 'From €7.95/month or €119 upfront'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">
          On a €70 set paid in person, the fee is about €0.56; paid online, about €1.05. These are among the lowest published rates of the big booking apps.
        </p>
      </section>

      <section id="messages">
        <h2 className="font-serif text-2xl font-bold mb-4">Text messages and add-ons</h2>
        <ArticleTable
          headers={['Item', 'Price']}
          rows={[
            ['Automated texts', '20 free per month (per team member on Team), then €0.10 per text'],
            ['WhatsApp messages', '€0.09 to €0.23 each beyond the free allowance'],
            ['Marketing emails', '50 free per month, then €0.02 each'],
            ['Marketing texts', '€0.14 per text'],
            ['Smart Website', '€13.95/month'],
            ['Client Loyalty', '€59.95 per location per month'],
            ['Insights', '€9.95 per bookable team member per month'],
            ['AI Concierge', '€28.95 (messages) or €94.95 (calls and messages) per location per month'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">
          Email and app notifications are free and unlimited. A busy solo nail tech sending a text reminder for every appointment will usually pass the 20 free texts.
        </p>
      </section>

      <section id="pros-cons">
        <h2 className="font-serif text-2xl font-bold mb-4">Pros and cons for nail techs</h2>
        <ArticleComparison
          items={[
            {
              label: 'Pros',
              pros: ['Low entry price: €14.95/month', 'Low published card fees', 'Marketplace that can bring new clients', 'Deposits, no-show and late cancellation fees', 'No minimum commitment'],
              cons: [],
            },
            {
              label: 'Cons',
              pros: [],
              cons: ['No free plan any more', 'Marketplace fee percentage not published on the pricing page', 'Only 20 free texts a month', 'Website, loyalty and reporting are paid add-ons', 'Prices published in euros only'],
            },
          ]}
        />
      </section>

      <section id="who">
        <h2 className="font-serif text-2xl font-bold mb-4">Who Fresha suits, and who it doesn&apos;t</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Good fit:</strong> nail techs in Europe or the UK who want a low monthly price, take most payments by card, and live in a city where clients search on the Fresha app.</li>
          <li><strong>Good fit:</strong> small salons that want per-member pricing and a card terminal from the same provider.</li>
          <li><strong>Less suited:</strong> nail techs whose clients come from Instagram and TikTok, who want a branded booking page rather than a marketplace listing.</li>
          <li><strong>Less suited:</strong> anyone who needs predictable costs with no fee on new clients.</li>
        </ul>
      </section>

      <section id="alternatives">
        <h2 className="font-serif text-2xl font-bold mb-4">Fresha alternatives</h2>
        <ArticleTable
          headers={['App', 'Price', 'Fee on new clients', 'Best for']}
          rows={[
            ['Nelsy', '$29/month or $25/month yearly', '0%', 'Nail techs booking from Instagram and TikTok'],
            ['Booksy', '$29.99/month (US), £40 (UK)', '30% of first visit with Boost', 'Marketplace discovery in Booksy cities'],
            ['GlossGenius', 'From $24/month billed annually', 'None mentioned', 'US nail techs wanting a polished booking site'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">
          Nelsy gives you a booking page for your Instagram bio with 0% Nelsy commission, a 14-day free trial, and per-service payment options: pay on arrival, a deposit, or full payment upfront. More options in <Link to="/fresha-alternative-nail-techs" className={ext}>Fresha alternatives for nail techs</Link> and <Link to="/best-booking-app-for-nail-techs" className={ext}>the best booking apps for nail techs</Link>.
        </p>
      </section>
    </div>
  ),
});
export {};
