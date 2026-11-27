import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleComparison } from '@/components/article/ArticleBodyComponents';

const ext = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'stan-store-alternatives-for-beauty-creators',
  title: 'Stan Store Alternatives for Beauty Creators: 5 Options Compared',
  coverTitle: 'Stan Store Alternatives',
  seoTitle: 'Stan Store Alternatives for Beauty Creators',
  excerpt: 'Five Stan Store alternatives for beauty creators and educators: Beacons, Linktree, Kajabi, Teachable and Nelsy, compared on price, seller fees, courses and bookings.',
  seoDescription: 'Stan Store alternatives for beauty creators: Beacons, Linktree, Kajabi, Teachable and Nelsy compared on price, fees, courses and client bookings.',
  category: 'beauty-creators',
  audience: ['creators'],
  craft: 'all',
  tags: ['Stan Store alternatives', 'Stan alternative', 'Stan vs Beacons', 'Stan vs Kajabi', 'creator store for beauty'],
  heroImage: 'linear-gradient(135deg, #FDF4FF 0%, #F5D0FE 100%)',
  heroImageAlt: 'Stan Store alternatives for beauty creators compared',
  author: 'Nelsy Editorial',
  authorRole: 'Beauty Business Guide',
  publishedAt: '2026-11-26',
  tldr: {
    answer: 'Stan is a good creator store; the right alternative depends on what Stan does not do for you.',
    detail: 'Stan costs $29/month (or $25/month yearly) with 0% transaction fees. Linktree has a free plan. Kajabi and Teachable go deeper on courses, at a higher price or with product limits. Nelsy matches Stan\'s entry price for in-person service bookings with deposits; selling products on Nelsy is part of its upcoming Creator plan.',
    points: [
      { label: 'Beacons', text: 'Best for a media kit and brand deals.' },
      { label: 'Kajabi', text: 'Best for established educators running a full course business.' },
      { label: 'Teachable', text: 'Best for creators who want a dedicated course school.' },
      { label: 'Nelsy', text: 'Best for beauty pros who book clients in person; product selling is part of the upcoming Creator plan.' },
    ],
  },
  toc: [
    { id: 'why-switch', label: 'Why look beyond Stan?' },
    { id: 'comparison', label: 'Comparison table' },
    { id: 'beacons', label: 'Beacons' },
    { id: 'linktree', label: 'Linktree' },
    { id: 'kajabi', label: 'Kajabi' },
    { id: 'teachable', label: 'Teachable' },
    { id: 'nelsy', label: 'Nelsy' },
    { id: 'verdict', label: 'Verdict' },
  ],
  relatedSlugs: ['best-link-in-bio-for-beauty-creators', 'best-platform-to-sell-beauty-courses', 'how-to-make-money-as-a-beauty-creator', 'how-to-sell-a-nail-course-online'],
  faq: [
    { q: 'How much does Stan cost?', a: 'Stan lists Creator at $29/month or $25/month billed yearly, Creator Pro at $99/month or $79/month yearly, and Creator Max at $299/month or $250/month yearly ($3,000/year). Stan lists 0% transaction fees, and there is no free plan.' },
    { q: 'Is there a free alternative to Stan?', a: 'Linktree has a free plan, but selling paid digital products requires its Pro or Premium plan. Beacons does not show its prices on a public page we could check; see its site for current plans.' },
    { q: 'Is Kajabi better than Stan for courses?', a: 'Kajabi is a full course and community platform with coaching, memberships and email, but it starts at $179/month ($143/month billed annually). For a first course, Stan costs far less. Kajabi makes more sense once courses are your main income.' },
    { q: 'Can I take beauty appointments on Stan?', a: 'Stan sells bookings for your time, such as 1:1 calls. If you need a service menu for in-person clients with deposits or pay on arrival, a booking-first tool like Nelsy fits better.' },
  ],
  relatedFeatureSlugs: ['courses', 'digital-products', 'bookings'],
  relatedLinks: { tool: '/tools/creator-rate-calculator', pages: ['/use-cases/beauty-creators', '/features/digital-products', '/features/courses'] },
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="info" title="How we sourced these figures">
        Every competitor price and fee comes from the vendor&apos;s official pages, checked on November 27, 2026: <a href="https://help.stan.store/article/31-creator-vs-creator-pro" rel="nofollow noopener" target="_blank" className={ext}>Stan plans</a>, <a href="https://linktr.ee/s/pricing" rel="nofollow noopener" target="_blank" className={ext}>Linktree pricing</a>, <a href="https://linktr.ee/help/articles/10518645-guide-to-selling-digital-products-on-linktree" rel="nofollow noopener" target="_blank" className={ext}>Linktree digital products</a>, <a href="https://linktr.ee/help/articles/11410206-understanding-transaction-and-processing-fees-on-linktree" rel="nofollow noopener" target="_blank" className={ext}>Linktree fees</a>, <a href="https://kajabi.com/pricing" rel="nofollow noopener" target="_blank" className={ext}>Kajabi pricing</a> and <a href="https://teachable.com/pricing" rel="nofollow noopener" target="_blank" className={ext}>Teachable pricing</a>. Linktree does not publish prices on its pricing page (it says pricing varies by region and is shown in local currency), so check its site for your country. Beacons does not show its prices on a public page we could check; see its site for current plans. Prices exclude tax and can change. Nelsy is our product.
      </ArticleCallout>

      <section id="why-switch">
        <h2 className="font-serif text-2xl font-bold mb-4">Why look beyond Stan?</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Stan does a lot well: one store for digital downloads, courses, memberships and bookings for your time, with 0% transaction fees on every plan. Beauty creators usually look elsewhere for one of four reasons:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>You want to start on a <strong>free plan</strong> before paying monthly.</li>
          <li>You need <strong>brand deal tools</strong> such as a media kit.</li>
          <li>Your courses have grown and you want a <strong>full course platform</strong>.</li>
          <li>You also do <strong>clients in person</strong> (lashes, nails, makeup, brows) and need service bookings with deposits.</li>
        </ul>
      </section>

      <section id="comparison">
        <h2 className="font-serif text-2xl font-bold mb-4">Comparison table</h2>
        <ArticleTable
          headers={['Platform', 'Entry price', 'Platform fee on sales', 'Free plan or trial', 'Best for']}
          rows={[
            ['Stan', '$29/month or $25/month yearly', '0% transaction fees', 'No free plan', 'Online products and 1:1 calls'],
            ['Beacons', 'Not shown on a public page we could check', 'Not verified', 'Not verified', 'Brand deals and media kit'],
            ['Linktree', 'Free plan; paid plan prices not published on its pricing page', 'Plan-dependent % of the sale price; paid products need Pro or Premium', 'Free plan', 'Links first, selling second'],
            ['Kajabi', 'Basic $179/month ($143/month yearly)', 'Card processing from 2.9% + 30¢ (US)', '14-day trial', 'Full course business'],
            ['Teachable', 'Starter $39/month ($29/month yearly)', '7.5% on Starter, 0% on Builder and up with Teachable Payments', '7-day trial on Starter', 'Dedicated course school'],
            ['Nelsy', '$29/month or $25/month yearly (Independent)', '0% Nelsy commission', '14-day trial', 'In-person bookings today; products: Creator plan (waitlist)'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed text-sm">
          Prices checked on November 27, 2026 on each vendor&apos;s official pricing page. Payment processing fees apply on all platforms. Prices exclude tax. Teachable showed a temporary Black Friday discount on Builder and Growth when we checked; the regular prices are used here.
        </p>
      </section>

      <section id="beacons">
        <h2 className="font-serif text-2xl font-bold mb-4">1. Beacons</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Beacons is the closest like-for-like alternative: it is positioned as a link in bio with a storefront, a media kit and brand deal tools, plus an AI assistant called Beam and Smart Reply for DMs. Beacons does not show its prices on a public page we could check; see its site for current plans.
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> beauty creators who earn from brand partnerships as much as from products.</p>
        <ArticleComparison
          items={[
            { label: 'Pros', pros: ['Media kit and brand deal tools', 'AI assistant (Beam) and Smart Reply for DMs', 'Storefront next to your links'], cons: [] },
            { label: 'Cons', pros: [], cons: ['Prices not shown on a public page we could check', 'Check the seller fee on your plan', 'Not built for salon-style appointments'] },
          ]}
        />
      </section>

      <section id="linktree">
        <h2 className="font-serif text-2xl font-bold mb-4">2. Linktree</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Linktree is a link list first, with selling added on top. Linktree&apos;s help center says paid digital products are available on Pro and Premium, with a Linktree fee that is a percentage of the sale price depending on your plan, plus Stripe&apos;s 2.9% + $0.30 per purchase. Its pricing page does not publish prices, so check its site for your country. Linktree also offers a Bookings link synced with Google Calendar.
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> creators whose bio link is mostly about sending people to other places.</p>
        <ArticleComparison
          items={[
            { label: 'Pros', pros: ['Free plan for links', 'Familiar to followers', 'Bookings link with calendar sync'], cons: [] },
            { label: 'Cons', pros: [], cons: ['Selling needs Pro or Premium', 'Linktree takes a plan-dependent fee on product sales', 'Prices not published on its pricing page'] },
          ]}
        />
      </section>

      <section id="kajabi">
        <h2 className="font-serif text-2xl font-bold mb-4">3. Kajabi</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Kajabi is an all-in-one course business platform: website, courses, coaching, memberships, communities and unlimited email sends. Basic is $179/month ($143/month billed annually) for 5 products and 2,500 contacts, Growth $249/month ($199 annually) and Pro $499/month ($399 annually). There is a 14-day trial. US card processing is listed from 2.9% + 30¢ on Basic.
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> established beauty educators whose courses and community are the main business.</p>
        <ArticleComparison
          items={[
            { label: 'Pros', pros: ['Deep course, community and email tools', 'Coaching products included', 'Own website'], cons: [] },
            { label: 'Cons', pros: [], cons: ['About six times Stan\'s entry price ($179 vs $29 a month)', 'Basic limited to 5 products', 'More setup than a link-in-bio store'] },
          ]}
        />
      </section>

      <section id="teachable">
        <h2 className="font-serif text-2xl font-bold mb-4">4. Teachable</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Teachable is a dedicated course school. Starter is $39/month ($29/month billed annually) with a 7.5% transaction fee and 5 published products. Builder ($89/month, $69/month annually) and Growth ($189/month, $139/month annually) list 0% transaction fees when you use Teachable Payments. Each published product counts as one product toward the limit, however many videos or modules it contains.
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> creators who want a structured course school rather than a bio-link store.</p>
        <ArticleComparison
          items={[
            { label: 'Pros', pros: ['Built for courses', 'Coaching and downloads count as products', '0% transaction fee from Builder'], cons: [] },
            { label: 'Cons', pros: [], cons: ['7.5% fee on Starter', 'Product limits on every listed plan', 'Not a link-in-bio page'] },
          ]}
        />
      </section>

      <section id="nelsy">
        <h2 className="font-serif text-2xl font-bold mb-4">5. Nelsy</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Nelsy is a booking page for your link in bio, built for beauty pros and beauty creators. Unlike Stan, it does not sell courses or digital products today: that is part of the upcoming Creator plan, and you can <a href="mailto:hello@getnelsy.com?subject=Creator%20waitlist" className={ext}>join the waitlist</a>. What it does today is the booking side: clients book your services online, and each service can be set to pay on arrival, a deposit or full payment upfront. You can also record cash or card paid at the studio. The Independent plan costs $29/month or $25/month billed yearly, with a 14-day trial and 0% Nelsy commission (standard Stripe fees apply).
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> lash artists, makeup artists, nail techs and hairstylists whose audience books them for services.</p>
        <ArticleComparison
          items={[
            { label: 'Pros', pros: ['Same entry price as Stan', 'Service bookings with deposits', 'Pay on arrival, deposit or full payment per service'], cons: [] },
            { label: 'Cons', pros: [], cons: ['No free plan', 'No product or course selling yet (upcoming Creator plan)', 'No media kit or brand deal tools'] },
          ]}
        />
      </section>

      <section id="verdict">
        <h2 className="font-serif text-2xl font-bold mb-4">Verdict</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          If Stan already does what you need, there is no strong reason to move. Pick <strong>Beacons</strong> for brand deals and a media kit, <strong>Kajabi</strong> or <strong>Teachable</strong> once courses are your main income, and <strong>Nelsy</strong> for the bookings side if your audience also books you for services (keep selling products on Stan or another store until Nelsy&apos;s Creator plan opens).
        </p>
        <ArticleTip>Before you switch, list the products you sell today and check each one is supported on the plan you are looking at, not just on the top tier.</ArticleTip>
        <p className="text-gray-700 mt-4 leading-relaxed">
          See a Nelsy booking page in the <Link to="/demo" className={ext}>live demo</Link>, or compare plans on the <Link to="/pricing" className={ext}>pricing page</Link>.
        </p>
      </section>
    </div>
  ),
});
export {};
