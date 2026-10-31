import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-price-list-examples',
  title: 'Nail Tech Price List Examples',
  seoTitle: 'Nail Tech Price List Examples (UK Pricing Guide)',
  excerpt: 'Example price lists for nail techs at different business stages and locations — with structure, naming conventions, and advice on presenting your pricing.',
  seoDescription: 'Nail tech price list examples. UK pricing guidance for gel manicures, acrylics, gel-X, BIAB, nail art, and add-ons — with example menus for different business stages.',
  category: 'pricing-money',
  tags: ['nail tech price list', 'nail tech pricing', 'nail prices', 'nail service menu'],
  heroImage: 'linear-gradient(135deg, #FFFBEB 0%, #FDE68A 100%)',
  heroImageAlt: 'Nail tech price list examples',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-price-list-matters', label: 'Why a clear price list matters' },
    { id: 'example-starter', label: 'Example: starter price list' },
    { id: 'example-established', label: 'Example: established nail tech' },
    { id: 'example-premium', label: 'Example: premium positioning' },
    { id: 'structure-naming', label: 'Price list structure and naming' },
    { id: 'presenting-prices', label: 'Presenting your prices' },
  ],
  relatedSlugs: ['how-to-create-nail-service-menu', 'how-much-should-nail-tech-charge', 'how-to-price-nail-services-for-profit', 'how-to-price-nail-art-add-ons'],
  faq: [
    { q: 'Should a nail tech show prices publicly?', a: 'Yes, for almost all nail techs. Visible pricing filters enquiries — clients who are comfortable with your prices are more likely to book; those who aren\'t save both of you the time. The only exception is for very bespoke, high-end services where individual pricing is the norm. For the vast majority of nail techs, public pricing improves booking conversion and reduces DM time on price questions.' },
    { q: 'How often should a nail tech update their price list?', a: 'Review annually as a minimum. Raise prices when your costs increase, when demand is consistently exceeding supply (fully booked weeks in advance), when you gain significant experience or qualifications, or when you refocus your positioning. The price list on your booking page should always reflect your current prices — outdated pricing confuses clients.' },
    { q: 'Should I charge the same price for clients who have been coming for years?', a: 'Your standard prices should apply to all clients. If you want to reward loyalty, a referral discount, a complimentary add-on, or a loyalty scheme is better than an informal old-price arrangement — the latter creates an obligation and resentment when you eventually need to bring the price in line.' },
  ],
  relatedFeatureSlugs: ['payments', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-price-list-matters">
        <h2 className="font-serif text-2xl font-bold mb-4">Why a clear price list matters</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A clear, publicly visible price list does three things: it filters enquiries to clients who are genuinely aligned with your pricing, it reduces the number of DMs asking "how much?", and it positions you professionally. Nail techs without a visible price list often attract price-shoppers who open with "what\'s the cheapest you can do?"</p>
        <p className="text-gray-700 leading-relaxed">The examples below are illustrative — they show structure and typical ranges, not fixed prices. UK pricing varies significantly by location (London and major cities command higher rates than smaller towns), experience level, and market positioning. Use these as a reference when setting your own prices, not as targets to copy directly.</p>
        <ArticleCallout variant="info" title="Pricing tool">
          Use the <Link to="/tools/nail-tech-pricing-calculator" className="underline text-[#F52B8C]">nail tech pricing calculator</Link> to calculate your minimum profitable price per service based on your costs and time.
        </ArticleCallout>
      </section>

      <section id="example-starter">
        <h2 className="font-serif text-2xl font-bold mb-4">Example: starter price list</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A nail tech in their first 6–12 months, building a client base, not in a major city:</p>
        <ArticleTable
          headers={['Service', 'Duration', 'Example price']}
          rows={[
            ['Gel polish manicure', '45–60 min', '£25–£35'],
            ['Gel polish with cuticle care', '60 min', '£30–£40'],
            ['BIAB overlay', '60 min', '£35–£45'],
            ['BIAB infill', '45–60 min', '£30–£40'],
            ['Gel-X extensions (short)', '60–75 min', '£45–£55'],
            ['Gel-X extensions (medium/long)', '75–90 min', '£50–£65'],
            ['Gel removal', '20–30 min', '£10–£15'],
            ['Gel removal + reapplication', 'Included in new service', 'Included'],
            ['Nail art (per nail)', 'Varies', '£2–£5 per nail'],
            ['Nail art (full set add-on)', 'Varies', '£10–£25'],
          ]}
        />
      </section>

      <section id="example-established">
        <h2 className="font-serif text-2xl font-bold mb-4">Example: established nail tech</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A nail tech with 2–4 years of experience, consistently booked, in a mid-sized UK city:</p>
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
        />
      </section>

      <section id="example-premium">
        <h2 className="font-serif text-2xl font-bold mb-4">Example: premium positioning</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">An experienced nail tech in London or a major UK city, positioning as a premium service:</p>
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
            ['Chrome / foil add-on', 'Included or £15–£20'],
          ]}
        />
        <ArticleTip>Premium pricing requires premium presentation — not just higher numbers. A consistent booking process, professional photos, clear website or booking page, and a polished client experience justify higher prices. The price list is only part of the premium positioning.</ArticleTip>
      </section>

      <section id="structure-naming">
        <h2 className="font-serif text-2xl font-bold mb-4">Price list structure and naming</h2>
        <ArticleTable
          headers={['Naming convention', 'Example', 'Works because']}
          rows={[
            ['Describe the service, not the product', '"Structured gel overlay" not "BIAB"', 'Clients don\'t always know product names'],
            ['Include duration', '"Gel manicure — 60 min"', 'Clients can plan their day'],
            ['Group by category', 'Gel Manicures / Extensions / Add-ons / Removal', 'Easy to scan; reduces questions'],
            ['Be specific about what\'s included', '"includes cuticle care"', 'Avoids confusion about scope'],
            ['Make infills distinct from full sets', 'Separate line with lower price and shorter duration', 'Clients understand rebooking economics'],
          ]}
        />
      </section>

      <section id="presenting-prices">
        <h2 className="font-serif text-2xl font-bold mb-4">Presenting your prices</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Booking page:</strong> Price should be visible before the booking is completed — don\'t require clients to book to find out prices</li>
          <li><strong>Instagram Highlights:</strong> A "Prices" or "Menu" Highlight is one of the most-checked items on a nail tech\'s profile</li>
          <li><strong>Instagram bio link:</strong> Link to your booking page where prices are visible</li>
          <li><strong>DMs:</strong> Never spend DM time explaining prices — point to your booking page instead: "All my prices are on my booking page — link in bio!"</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For building a full service menu: <Link to="/learn/how-to-create-nail-service-menu" className="underline text-[#F52B8C]">how to create a nail service menu</Link>. For pricing methodology: <Link to="/learn/how-to-price-nail-services-for-profit" className="underline text-[#F52B8C]">how to price nail services for profit</Link>.</p>
      </section>
    </div>
  ),
});
export {};
