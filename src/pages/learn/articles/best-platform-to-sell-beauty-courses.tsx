import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleComparison } from '@/components/article/ArticleBodyComponents';

const ext = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'best-platform-to-sell-beauty-courses',
  title: 'Best Platform to Sell Beauty Courses: Kajabi vs Teachable vs Stan vs Beacons vs Nelsy',
  seoTitle: 'Best Platform to Sell Beauty Courses Online (2026)',
  excerpt: 'Where should a nail tech, lash artist or makeup artist sell an online course? Kajabi, Teachable, Stan, Beacons and Nelsy compared on price, transaction fees, product limits and bookings.',
  seoDescription: 'Kajabi, Teachable, Stan, Beacons and Nelsy compared for beauty educators: price, transaction fees, product limits, coaching and bookings.',
  category: 'beauty-creators',
  tags: ['best platform to sell beauty courses', 'sell nail course online', 'sell lash course online', 'Kajabi vs Teachable', 'Kajabi vs Stan'],
  heroImage: 'linear-gradient(135deg, #EEF2FF 0%, #C7D2FE 100%)',
  heroImageAlt: 'Best platforms to sell beauty courses compared',
  author: 'Nelsy Editorial',
  authorRole: 'Beauty Business Guide',
  publishedAt: '2026-11-26',
  tldr: {
    answer: 'For a first beauty course, a link-in-bio store is usually enough; a full course platform pays off later.',
    detail: 'Stan and Nelsy both let you sell a course for $25 to $29 a month with 0% platform fees (Stan lists 0% transaction fees; Nelsy charges 0% Nelsy commission). Kajabi and Teachable go deeper on course delivery, community and marketing, at a higher price or with product limits.',
    points: [
      { label: 'Kajabi', text: 'Best for established educators running courses, community and email in one place.' },
      { label: 'Teachable', text: 'Best for a dedicated course school with a low entry plan.' },
      { label: 'Stan / Beacons', text: 'Best for creators selling a course alongside other digital products.' },
      { label: 'Nelsy', text: 'Best for working pros who sell a course and still take clients and in-person training.' },
    ],
  },
  toc: [
    { id: 'what-to-look-for', label: 'What to look for' },
    { id: 'comparison', label: 'Comparison table' },
    { id: 'kajabi', label: 'Kajabi' },
    { id: 'teachable', label: 'Teachable' },
    { id: 'stan', label: 'Stan' },
    { id: 'beacons', label: 'Beacons' },
    { id: 'nelsy', label: 'Nelsy' },
    { id: 'verdict', label: 'Verdict' },
  ],
  relatedSlugs: ['how-to-sell-a-nail-course-online', 'stan-store-alternatives-for-beauty-creators', 'how-to-make-money-as-a-beauty-creator', 'best-link-in-bio-for-beauty-creators'],
  faq: [
    { q: 'What is the best platform to sell a nail or lash course?', a: 'For a first course, a store like Stan or Nelsy keeps costs at $25 to $29 a month with 0% platform fees. Once courses are a major income, Kajabi or Teachable offer more advanced course and community tools.' },
    { q: 'Is Kajabi worth it for beauty educators?', a: 'Kajabi starts at $179/month ($143/month billed annually) for 5 products and 2,500 contacts. It is worth it when you have an audience, several courses and a community to run. For one course, it is expensive.' },
    { q: 'Does Teachable take a cut of course sales?', a: 'Teachable\'s Starter plan ($39/month, or $29/month billed annually) has a 7.5% transaction fee. Builder and Growth list 0% transaction fees when you use Teachable Payments. Card processing still applies.' },
    { q: 'Can I sell a course and in-person training on the same page?', a: 'With Nelsy you can sell an online course and list in-person training or client services as bookable services, each with pay on arrival, a deposit or full payment upfront.' },
  ],
  relatedFeatureSlugs: ['courses', 'coaching', 'memberships'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="info" title="How we sourced these figures">
        Every competitor figure comes from the vendor&apos;s official pages, checked on November 27, 2026: <a href="https://kajabi.com/pricing" rel="nofollow noopener" target="_blank" className={ext}>Kajabi pricing</a>, <a href="https://teachable.com/pricing" rel="nofollow noopener" target="_blank" className={ext}>Teachable pricing</a> and <a href="https://help.stan.store/article/31-creator-vs-creator-pro" rel="nofollow noopener" target="_blank" className={ext}>Stan plans</a>. Beacons does not show its prices on a public page we could check; see its site for current plans. Prices in USD, excluding tax, and they can change. Teachable showed a temporary Black Friday price on Builder and Growth; we use the regular prices shown after the promotion. Thinkific is not included because its pricing page only showed us euro prices. Nelsy is our product.
      </ArticleCallout>

      <section id="what-to-look-for">
        <h2 className="font-serif text-2xl font-bold mb-4">What to look for</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Transaction fees.</strong> On a $300 lash course, a 7.5% fee is $22.50 per sale, on top of card processing.</li>
          <li><strong>Product limits.</strong> Several plans cap how many products you can publish. A course, a coaching offer and a download may all count.</li>
          <li><strong>Video hosting.</strong> Technique courses are video-heavy. Check that hosting is included.</li>
          <li><strong>Where students find you.</strong> If they come from your Instagram bio, the course should sit behind that link, next to your bookings and in-person classes.</li>
        </ul>
      </section>

      <section id="comparison">
        <h2 className="font-serif text-2xl font-bold mb-4">Comparison table</h2>
        <ArticleTable
          headers={['Platform', 'Entry price', 'Platform fee', 'Limits on entry plan', 'Free trial']}
          rows={[
            ['Kajabi', 'Basic $179/month ($143 billed annually)', 'None listed; card processing 2.9% + 30¢ (US, Basic)', '5 products, 2,500 contacts', '14 days'],
            ['Teachable', 'Starter $39/month ($29 billed annually)', '7.5% on Starter; 0% on Builder and up with Teachable Payments', '5 published products', '7 days on Starter'],
            ['Stan', 'Creator $29/month ($25 billed yearly)', '0% transaction fees', 'Payment plans (Afterpay, Klarna) need Creator Pro', 'No free plan'],
            ['Beacons', 'Not shown on a public page we could check', 'Not verified', 'Not verified', 'Not verified'],
            ['Nelsy', '$29/month ($25 billed yearly)', '0% Nelsy commission', 'Courses, digital products, coaching and memberships', '14 days'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed text-sm">Payment processing fees apply on every platform. Prices checked on November 27, 2026 on each vendor&apos;s official pricing page.</p>
      </section>

      <section id="kajabi">
        <h2 className="font-serif text-2xl font-bold mb-4">1. Kajabi</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Kajabi covers the whole course business: website, courses, coaching, memberships, community and unlimited email sends. Basic ($179/month, $143 annually) allows 5 products and 2,500 contacts; Growth ($249, $199 annually) 50 products and 25,000 contacts; Pro ($499, $399 annually) unlimited products. 14-day trial and a 30-day money-back guarantee.
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> beauty educators with an established audience and several programs.</p>
        <ArticleComparison
          items={[
            { label: 'Pros', pros: ['Courses, community and email together', 'Unlimited email sends', 'Coaching, memberships and community on every plan'], cons: [] },
            { label: 'Cons', pros: [], cons: ['$179/month entry price', '5-product cap on Basic', 'Fee when using an outside processor (2% on Basic)'] },
          ]}
        />
      </section>

      <section id="teachable">
        <h2 className="font-serif text-2xl font-bold mb-4">2. Teachable</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Teachable is a dedicated course school. Starter is $39/month ($29 billed annually) with a 7.5% transaction fee and 5 published products. Builder ($89/month, $69 annually) raises that to 10 products and Growth ($189/month, $139 annually) to 50, both with 0% transaction fees on Teachable Payments. Each published product counts as one product toward the limit, however many videos or modules it contains.
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> educators who want a structured school with a low starting price.</p>
        <ArticleComparison
          items={[
            { label: 'Pros', pros: ['Built for courses', 'Low Starter price', '0% fee from Builder'], cons: [] },
            { label: 'Cons', pros: [], cons: ['7.5% fee on Starter', 'Product limits on every listed plan', 'Separate from your bio link and bookings'] },
          ]}
        />
      </section>

      <section id="stan">
        <h2 className="font-serif text-2xl font-bold mb-4">3. Stan</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Stan sells digital downloads, online courses, memberships and bookings for your time from one store, with 0% transaction fees. Creator is $29/month or $300/year ($25/month) and includes AutoDM for Instagram. Creator Pro at $99/month or $948/year ($79/month) adds payment options (Stan Payments, Afterpay, Klarna) and pixel tracking. There is no free plan.
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> creators who sell a course alongside guides and 1:1 calls.</p>
      </section>

      <section id="beacons">
        <h2 className="font-serif text-2xl font-bold mb-4">4. Beacons</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Beacons is positioned as a link in bio with a storefront, a media kit and brand deal tools, plus an AI assistant called Beam and Smart Reply for DMs. Beacons does not show its prices on a public page we could check; see its site for current plans. Check course limits and the seller fee on the plan you would use.
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> creators who also need a media kit for brand deals.</p>
      </section>

      <section id="nelsy">
        <h2 className="font-serif text-2xl font-bold mb-4">5. Nelsy</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">
          Nelsy is built for beauty pros who teach while still working with clients. You sell courses, digital products, coaching and memberships on the same page as your bookable services. In-person training days or client appointments can each be set to pay on arrival, a deposit or full payment upfront. $29/month or $25/month billed yearly, 14-day trial, 0% Nelsy commission (standard Stripe fees apply).
        </p>
        <p className="text-gray-700 mb-4"><strong>Best for:</strong> nail techs, lash artists and makeup artists who sell an online course and in-person training from one link.</p>
        <ArticleComparison
          items={[
            { label: 'Pros', pros: ['Course and bookings on one page', 'Deposit option for in-person training', '0% Nelsy commission'], cons: [] },
            { label: 'Cons', pros: [], cons: ['Less course depth than Kajabi or Teachable', 'No community features like Kajabi', 'No free plan'] },
          ]}
        />
      </section>

      <section id="verdict">
        <h2 className="font-serif text-2xl font-bold mb-4">Verdict</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>First course, small audience:</strong> Stan or Nelsy.</li>
          <li><strong>Course plus clients and in-person training:</strong> Nelsy.</li>
          <li><strong>Several courses and a community:</strong> Kajabi.</li>
          <li><strong>A school with a low entry price:</strong> Teachable, moving to Builder once sales justify it.</li>
        </ul>
        <ArticleTip>Validate demand before you pay for a big platform: pre-sell the course or run a live class first. Our guide on <Link to="/blog/how-to-sell-a-nail-course-online" className={ext}>how to sell a nail course online</Link> walks through it.</ArticleTip>
        <p className="text-gray-700 mt-4 leading-relaxed">
          See how courses and bookings look together in the <Link to="/demo" className={ext}>Nelsy demo</Link>.
        </p>
      </section>
    </div>
  ),
});
export {};
