import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-create-nail-service-packages',
  title: 'How to Create Nail Tech Service Packages',
  seoTitle: 'How to Create Nail Tech Service Packages That Sell',
  excerpt: 'Packages bundle services into a single offer that\'s easier to say yes to, increases average spend, and encourages repeat bookings. Here\'s how to build packages that work.',
  seoDescription: 'How to create nail tech service packages. Bundle strategies, pricing, naming, and how to present packages to clients to increase average appointment value.',
  category: 'pricing-money',
  tags: ['nail tech service packages', 'nail service bundles', 'nail package pricing', 'nail tech packages'],
  heroImage: 'linear-gradient(135deg, #FFF0F6 0%, #FCE4F5 100%)',
  heroImageAlt: 'How to create nail tech service packages',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-packages', label: 'Why packages work' },
    { id: 'types', label: 'Types of packages' },
    { id: 'pricing', label: 'Pricing packages' },
    { id: 'naming', label: 'Naming and presenting' },
    { id: 'examples', label: 'Example packages' },
  ],
  relatedSlugs: ['how-to-increase-appointment-value', 'how-to-price-nail-art-add-ons', 'how-to-create-nail-service-menu', 'nail-tech-price-list-examples'],
  faq: [
    { q: 'Should packages be cheaper than individual services?', a: 'A small discount (5–10%) for a package is common — it creates a sense of value and makes the bundle easier to say yes to. But don\'t discount so deeply that the package is unprofitable. The goal of a package is to increase total spend and encourage repeat bookings, not to reduce your margin. A "perceived value" package — bundled at the same total as individual prices but presented as a named offer — can work as well as one with a small discount.' },
    { q: 'How do I sell packages to existing clients?', a: 'Mention them naturally at the appointment: "I\'ve just started doing a summer package — it\'s [service] plus [add-on] for £X, which saves you a bit. Want to try it?" Or add them to your booking page and mention them in your Instagram Stories. Existing clients who trust your work are the easiest audience for packages.' },
    { q: 'Do packages work for solo nail techs or just salons?', a: 'Packages work well for solo nail techs — they simplify the client decision, increase average spend, and can build in advance payment (great for cashflow). They\'re particularly useful for seasonal events (Christmas, valentines, summer) and for targeting specific client segments (brides, birthday groups).' },
  ],
  relatedFeatureSlugs: ['payments', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-packages">
        <h2 className="font-serif text-2xl font-bold mb-4">Why packages work</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A named package does three things: it simplifies the decision (instead of choosing from a menu, the client picks a package), it anchors a higher spend expectation (the package price feels like the starting point), and it often includes add-ons the client wouldn't have asked for individually.</p>
        <p className="text-gray-700 leading-relaxed">Packages also work as marketing assets — "The Bridal Package" or "The Summer Set" is shareable and memorable in a way that "gel manicure + chrome + nail art" isn't.</p>
      </section>

      <section id="types">
        <h2 className="font-serif text-2xl font-bold mb-4">Types of packages</h2>
        <ArticleTable
          headers={['Package type', 'What it includes', 'Use case']}
          rows={[
            ['Seasonal package', 'A service plus seasonal add-on — e.g. autumn gel set + nail art accent', 'Promotes timely bookings; seasonal content opportunity'],
            ['Bridal package', 'Bridal gel/acrylic + French or specified design + nail art', 'High-value bookings; worth creating a specific bridal menu'],
            ['New client trial package', 'First appointment special: gel + cuticle treatment + aftercare card', 'Lowers barrier for first-time clients; builds habit with add-ons'],
            ['Loyalty/anniversary package', 'Special set for returning clients hitting a milestone', 'Rewards loyal clients; great Instagram content'],
            ['Pre-pay bundle', 'Buy 4 appointments upfront at a slight discount', 'Cashflow benefit; locks in client for multiple bookings'],
          ]}
        />
      </section>

      <section id="pricing">
        <h2 className="font-serif text-2xl font-bold mb-4">Pricing packages</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Two approaches:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Bundled price = sum of parts:</strong> No discount — but the package name and presentation creates a sense of it being curated and special. "The Autumn Edit" at £65 = gel £40 + nail art £15 + cuticle oil £10. Client sees a named offer, not three add-ons.</li>
          <li><strong>Bundled price = slight discount:</strong> £65 for services that individually total £70. The £5 discount is meaningful enough to feel like value but small enough to protect your margin.</li>
        </ul>
        <ArticleTip>Always calculate the package price from your actual costs and time. A package that takes 2.5 hours and costs you significantly in materials should price accordingly — don\'t create a "deal" that undervalues your time.</ArticleTip>
      </section>

      <section id="naming">
        <h2 className="font-serif text-2xl font-bold mb-4">Naming and presenting packages</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Names matter. "Gel + chrome + cuticle oil" is forgettable. Names that work:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>"The Bridal Edit" — aspirational, occasion-specific</li>
          <li>"The Autumn Set" — seasonal, timely</li>
          <li>"The Glow Package" — outcome-focused</li>
          <li>"The Full Treatment" — completeness</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">List each package on your booking page with a clear name, what's included, and the total price. Don't make clients calculate whether it's a deal — tell them.</p>
      </section>

      <section id="examples">
        <h2 className="font-serif text-2xl font-bold mb-4">Example packages</h2>
        <ArticleTable
          headers={['Package name', 'What\'s included', 'Example price']}
          rows={[
            ['The Bridal Edit', 'Gel-X / acrylic + French tip / specified design + nail art + aftercare card', '£85–£120 (depends on your extension pricing)'],
            ['The Autumn Edit', 'Gel manicure + seasonal nail art (2 accent nails) + chrome finish', '£58–£68'],
            ['New Client Welcome', 'Gel manicure + cuticle treatment + aftercare kit', '£48–£55'],
            ['The Pre-Pay Bundle', '4 × gel manicure appointments (standard service)', 'Sum of 4 × price − 10%'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For increasing average appointment value beyond packages: <Link to="/learn/how-to-increase-appointment-value" className="underline text-[#F52B8C]">how to increase your average nail appointment value</Link>.</p>
      </section>
    </div>
  ),
});
export {};
