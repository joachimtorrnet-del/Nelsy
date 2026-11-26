import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

const link = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'nail-tech-price-list-examples',
  title: 'Nail Tech Price List Examples',
  seoTitle: 'Nail Tech Price List Examples (UK Pricing Guide)',
  excerpt: 'Example price lists for nail techs at different business stages, with structure, naming conventions, and advice on presenting your pricing.',
  seoDescription: 'Nail tech price list examples for gel manicures, acrylics, Gel-X, BIAB, nail art and add-ons, with example menus for different business stages.',
  category: 'pricing-money',
  tags: ['nail tech price list', 'nail tech pricing', 'nail prices', 'nail service menu'],
  heroImage: 'linear-gradient(135deg, #FFFBEB 0%, #FDE68A 100%)',
  heroImageAlt: 'Nail tech price list examples',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  updatedAt: '2026-11-26',
  tldr: {
    answer: 'A good nail tech price list groups services by category, shows a name, duration and price for each, separates infills from full sets, and lists add-ons on their own lines.',
    detail: 'Use the three example menus below for structure, not as market prices. Set your own numbers from your costs and time, then check each price covers them.',
    points: [
      { label: 'Structure', text: 'Manicures / Extensions / Infills / Add-ons / Removal.' },
      { label: 'Each line', text: 'Clear name + what is included + duration + price.' },
      { label: 'Check', text: 'Every price ≥ product + time + overhead per client.' },
    ],
  },
  toc: [
    { id: 'why-price-list-matters', label: 'Why a clear price list matters' },
    { id: 'example-starter', label: 'Example: starter price list' },
    { id: 'example-established', label: 'Example: established nail tech' },
    { id: 'example-premium', label: 'Example: premium positioning' },
    { id: 'structure-naming', label: 'Price list structure and naming' },
    { id: 'template', label: 'Copy-and-paste price list template' },
    { id: 'presenting-prices', label: 'Presenting your prices' },
  ],
  relatedSlugs: ['how-to-create-nail-service-menu', 'how-much-should-nail-tech-charge', 'how-to-price-nail-services-for-profit', 'how-to-price-nail-art-add-ons'],
  faq: [
    { q: 'Should a nail tech show prices publicly?', a: 'Yes, for almost all nail techs. Visible prices filter enquiries: clients comfortable with your prices book, and the rest don\'t take up your DM time. The exception is fully bespoke art, where you can show a "from" price and a short form for details.' },
    { q: 'How often should a nail tech update their price list?', a: 'Review it at least once a year, and sooner when your product costs rise, when you are booked out weeks ahead most of the time, or when you add a qualification. Give clients notice before a rise (for example 4 weeks) and update the booking page on the same day the new prices start.' },
    { q: 'Should I charge the same price for clients who have been coming for years?', a: 'Keep one price list for everyone. If you want to reward loyalty, use something visible and limited, like a free add-on every fifth visit or a referral reward. Informal "old prices" for some clients become awkward when you eventually need to bring them in line.' },
    { q: 'Should I use "from" prices?', a: 'Use "from" only where the final price genuinely varies, such as nail art or extra length, and say what changes it: "Nail art from £10, depending on detail". For standard services, a fixed price builds more trust and avoids surprises at checkout.' },
  ],
  relatedFeatureSlugs: ['payments', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-price-list-matters">
        <h2 className="font-serif text-2xl font-bold mb-4">Why a clear price list matters</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A clear, visible price list does three things: it filters enquiries to clients happy with your prices, it cuts the &quot;how much?&quot; DMs, and it makes you look professional. Without one, the first message is often &quot;what&apos;s the cheapest you can do?&quot;</p>
        <p className="text-gray-700 leading-relaxed">The menus below are <strong>illustrative examples</strong> of structure and price spread, not survey data. Real prices vary a lot by city, experience and positioning. Use them for layout, then set your own numbers.</p>
        <ArticleCallout variant="info" title="Pricing tool">
          Use the <Link to="/tools/nail-tech-pricing-calculator" className={link}>nail tech pricing calculator</Link> to find your minimum profitable price per service based on your costs and time.
        </ArticleCallout>
      </section>

      <section id="example-starter">
        <h2 className="font-serif text-2xl font-bold mb-4">Example: starter price list</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Example for a nail tech in their first year, building a client base outside a major city:</p>
        <ArticleTable
          headers={['Service', 'Duration', 'Example price']}
          rows={[
            ['Gel polish manicure', '45–60 min', '£25–£35'],
            ['Gel polish with cuticle care', '60 min', '£30–£40'],
            ['BIAB overlay', '60 min', '£35–£45'],
            ['BIAB infill', '45–60 min', '£30–£40'],
            ['Gel-X extensions (short)', '60–75 min', '£45–£55'],
            ['Gel-X extensions (medium/long)', '75–90 min', '£50–£65'],
            ['Gel removal only', '20–30 min', '£10–£15'],
            ['Removal before a new service', 'Add 15–20 min', 'Included'],
            ['Nail art (per nail)', 'Varies', '£2–£5 per nail'],
            ['Nail art (full set add-on)', 'Varies', '£10–£25'],
          ]}
          caption="Illustrative example only."
        />
      </section>

      <section id="example-established">
        <h2 className="font-serif text-2xl font-bold mb-4">Example: established nail tech</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Example for a nail tech with a few years of experience, regularly booked, in a mid-sized city:</p>
        <ArticleTable
          headers={['Service', 'Duration', 'Example price']}
          rows={[
            ['Gel manicure (short)', '45–60 min', '£35–£45'],
            ['Gel manicure (medium/long)', '60 min', '£40–£50'],
            ['BIAB / structured gel overlay', '60–75 min', '£45–£55'],
            ['BIAB infill', '45–60 min', '£35–£45'],
            ['Gel-X extensions', '75–90 min', '£55–£70'],
            ['Acrylic full set', '90 min', '£55–£70'],
            ['Acrylic infill', '60 min', '£45–£55'],
            ['Nail art add-on', 'Varies', '£15–£35'],
            ['Chrome / mirror effect', '15–20 min', '£10–£15 add-on'],
            ['Removal + soak off', '20–30 min', '£15'],
          ]}
          caption="Illustrative example only."
        />
      </section>

      <section id="example-premium">
        <h2 className="font-serif text-2xl font-bold mb-4">Example: premium positioning</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Example for an experienced nail tech in a large city, positioned as a premium service:</p>
        <ArticleTable
          headers={['Service', 'Duration', 'Example price']}
          rows={[
            ['Luxury gel manicure (with massage + cuticle treatment)', '75 min', '£55–£75'],
            ['BIAB structured manicure', '75 min', '£60–£80'],
            ['Gel extensions (full set)', '90–120 min', '£75–£100'],
            ['Extension infill', '60–75 min', '£60–£80'],
            ['Bespoke nail art set', '90–120 min', '£80–£120'],
            ['Bridal nails (trial)', '90 min', '£80–£100'],
            ['Bridal nails (day-of)', '90 min', '£90–£120'],
            ['Chrome / foil add-on', '15–20 min', 'Included or £15–£20'],
          ]}
          caption="Illustrative example only."
        />
        <ArticleTip>Premium prices need premium presentation, not just higher numbers: consistent photos, a smooth booking page, clear policies and a polished client experience. The price list is only one part.</ArticleTip>
      </section>

      <section id="structure-naming">
        <h2 className="font-serif text-2xl font-bold mb-4">Price list structure and naming</h2>
        <ArticleTable
          headers={['Naming convention', 'Example', 'Works because']}
          rows={[
            ['Describe the service, not only the product', '"Structured gel overlay (BIAB)" rather than just "BIAB"', 'Clients don\'t always know product names'],
            ['Include duration', '"Gel manicure, 60 min"', 'Clients can plan their day'],
            ['Group by category', 'Manicures / Extensions / Infills / Add-ons / Removal', 'Easy to scan; fewer questions'],
            ['Say what is included', '"Includes cuticle care and removal of your old gel"', 'Avoids confusion about scope'],
            ['Make infills distinct from full sets', 'Separate line with a lower price and shorter duration', 'Clients see the value of rebooking on time'],
          ]}
        />
        <ArticleCallout variant="info" title="Example: check one line covers its costs">
          Example: Gel-X short at £50, 75 minutes. Product about £4, time 75 ÷ 60 × £25 target hourly rate = £31.25, overhead per client £4. Total cost = 4 + 31.25 + 4 = £39.25. Profit at £50 = £10.75. If the total came out above your price, the line needs a higher price or a shorter time.
        </ArticleCallout>
      </section>

      <section id="template">
        <h2 className="font-serif text-2xl font-bold mb-4">Copy-and-paste price list template</h2>
        <ArticleCallout variant="info" title="Template">
          <strong>MANICURES</strong><br />
          [Service name] · [what&apos;s included] · [time] · [£price]<br />
          [Service name] · [what&apos;s included] · [time] · [£price]<br /><br />
          <strong>EXTENSIONS</strong><br />
          [Short] · [time] · [£price] / [Medium-long] · [time] · [£price]<br /><br />
          <strong>INFILLS (within [3] weeks)</strong><br />
          [Service] infill · [time] · [£price]<br /><br />
          <strong>ADD-ONS</strong><br />
          Nail art · from [£price] · Chrome · [£price] · Extra length · [£price]<br /><br />
          <strong>REMOVAL</strong><br />
          Removal only · [time] · [£price] · Removal before a new set · included<br /><br />
          Deposit of [£amount] secures your appointment and comes off the final price.
        </ArticleCallout>
      </section>

      <section id="presenting-prices">
        <h2 className="font-serif text-2xl font-bold mb-4">Presenting your prices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Booking page:</strong> prices visible before the client books. Don&apos;t make anyone book to find out.</li>
          <li><strong>Instagram Highlights:</strong> a &quot;Prices&quot; or &quot;Menu&quot; Highlight answers the question before it is asked.</li>
          <li><strong>Instagram bio link:</strong> goes to the booking page where prices are listed.</li>
          <li><strong>DMs:</strong> reply with one saved message: &quot;All my prices and times are on my booking page, link in bio! 💅&quot;</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For building a full service menu: <Link to="/blog/how-to-create-nail-service-menu" className={link}>how to create a nail service menu</Link>. For pricing methodology: <Link to="/blog/how-to-price-nail-services-for-profit" className={link}>how to price nail services for profit</Link>.</p>
      </section>
    </div>
  ),
});
export {};
