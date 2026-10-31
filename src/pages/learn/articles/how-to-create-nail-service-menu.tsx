import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-create-nail-service-menu',
  title: 'How to Create a Nail Service Menu',
  seoTitle: 'How to Create a Nail Service Menu (That Converts Bookings)',
  excerpt: 'A nail service menu is more than a price list — it\'s what clients use to decide whether to book. Here\'s how to structure, name, and present a menu that works.',
  seoDescription: 'How to create a nail service menu. How to structure services, name them clearly, set pricing, and present your menu on a booking page and Instagram.',
  category: 'pricing-money',
  tags: ['nail service menu', 'nail tech menu', 'nail services list', 'nail tech pricing'],
  heroImage: 'linear-gradient(135deg, #FFF1F2 0%, #FECDD3 100%)',
  heroImageAlt: 'How to create a nail service menu',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'what-menu-includes', label: 'What a service menu includes' },
    { id: 'structuring-menu', label: 'How to structure your menu' },
    { id: 'naming-services', label: 'Naming services clearly' },
    { id: 'what-to-include', label: 'What information to include per service' },
    { id: 'add-ons', label: 'Add-ons and upgrades' },
    { id: 'where-to-publish', label: 'Where to publish your menu' },
  ],
  relatedSlugs: ['nail-tech-price-list-examples', 'how-much-should-nail-tech-charge', 'how-to-price-nail-art-add-ons', 'how-to-increase-appointment-value'],
  faq: [
    { q: 'How many services should a nail tech offer?', a: 'Fewer is usually better, especially early on. A menu with 5–8 core services is easier for clients to navigate and easier for you to manage. Too many options creates decision fatigue and makes it harder to become known for specific work. Add services as your skills and demand grow — not upfront.' },
    { q: 'Should I include removal in my service menu?', a: 'Yes, as a standalone option and as a consideration within other services. Clients often come in needing their existing nails removed before a new set — knowing the price and whether removal is included in their service is important for setting expectations. Many nail techs include removal in the full set price; others charge separately for removal of a different tech\'s work.' },
    { q: 'Do I need a separate service for infills vs full sets?', a: 'Yes — infills take less time and product and are priced lower. Having them as a separate service with clear conditions ("for existing clients returning within X weeks") sets the rebooking expectation correctly. Clients should understand that infills are for their existing nails, not a cheaper first set.' },
  ],
  relatedFeatureSlugs: ['bookings', 'payments'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-menu-includes">
        <h2 className="font-serif text-2xl font-bold mb-4">What a service menu includes</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A service menu is the complete list of services you offer, with pricing and enough detail for a client to choose what they want and book confidently. It answers: what can I get, how long will it take, and what will it cost?</p>
        <p className="text-gray-700 leading-relaxed">A well-built menu reduces booking friction (clients know what to book before they arrive), reduces DM time (clients can answer their own questions), and helps clients self-select — those who are aligned with your pricing book; those who aren\'t, don\'t contact you expecting different prices.</p>
      </section>

      <section id="structuring-menu">
        <h2 className="font-serif text-2xl font-bold mb-4">How to structure your menu</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Group services logically so clients can find what they're looking for without reading everything:</p>
        <ArticleTable
          headers={['Category', 'What belongs here']}
          rows={[
            ['Gel Manicures', 'Gel polish over natural nails, BIAB/structured overlay, cuticle treatments'],
            ['Extensions', 'Gel-X, acrylic, hard gel, any add-length service'],
            ['Infills / Maintenance', 'Infill services for existing clients'],
            ['Nail Art', 'If offered as a standalone service, or detailed as an add-on here'],
            ['Add-ons', 'Chrome, nail art upgrade, cuticle treatment, strengthening treatment'],
            ['Removal', 'Gel removal, acrylic removal, extension removal'],
          ]}
        />
        <ArticleTip>Start with your most popular services at the top. New clients often look at the first option on a menu — if your most popular service is buried at the bottom, you\'re making bookings harder than they need to be.</ArticleTip>
      </section>

      <section id="naming-services">
        <h2 className="font-serif text-2xl font-bold mb-4">Naming services clearly</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Service names should describe what the client receives, not the product you use to deliver it:</p>
        <ArticleTable
          headers={['Product-focused name', 'Client-focused name']}
          rows={[
            ['"BIAB"', '"Structured Gel Overlay" or "Builder Gel Manicure"'],
            ['"Aprés Gel-X"', '"Soft Gel Extension Tips"'],
            ['"Acrylic L&P"', '"Acrylic Extensions"'],
            ['"PolyGel"', '"Flex Gel Extensions" or "Structured Extension"'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">It\'s fine to include the product name in parentheses or as a note for clients who know what they\'re looking for: "Structured Gel Overlay (BIAB) — £45." But the primary name should be descriptive.</p>
      </section>

      <section id="what-to-include">
        <h2 className="font-serif text-2xl font-bold mb-4">What information to include per service</h2>
        <ArticleTable
          headers={['Element', 'Why include it']}
          rows={[
            ['Service name', 'What the client searches for'],
            ['Brief description (1 line)', 'What\'s included — "includes cuticle care and shape"'],
            ['Duration', 'Clients plan their day around the appointment'],
            ['Price', 'Filters enquiries; prevents price surprises'],
            ['"From £X" vs fixed price', '"From" gives flexibility for variable services (nail art, long extensions); fixed price is cleaner for standard services'],
          ]}
        />
        <ArticleCallout variant="info" title="Example service listing">
          Gel Manicure{'\n'}
          Gel polish with cuticle care and nail shape. Includes removal of existing gel.{'\n'}
          60 min · £38
        </ArticleCallout>
      </section>

      <section id="add-ons">
        <h2 className="font-serif text-2xl font-bold mb-4">Add-ons and upgrades</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Add-ons are small upgrades clients choose at booking or at the appointment. They improve your average appointment value without requiring a separate booking slot:</p>
        <ArticleTable
          headers={['Add-on', 'Typical price']}
          rows={[
            ['Chrome / mirror effect', '£8–£15'],
            ['Nail art (per nail)', '£2–£5'],
            ['Nail art (accent nails)', '£8–£15'],
            ['Cuticle treatment / oil', '£5–£10'],
            ['Nail strengthening treatment', '£5–£10'],
            ['Glitter overlay', '£5–£10'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For detailed add-on pricing strategy: <Link to="/learn/how-to-price-nail-art-add-ons" className="underline text-[#F52B8C]">how to price nail art add-ons</Link>.</p>
      </section>

      <section id="where-to-publish">
        <h2 className="font-serif text-2xl font-bold mb-4">Where to publish your menu</h2>
        <ArticleChecklist title="Service menu placement checklist" items={[
          'Booking page — the primary location; visible before booking is completed',
          'Instagram Highlights — a "Prices" or "Menu" Highlight',
          'Instagram bio link — link directly to the booking page with your menu',
          'In the FAQ section of your booking page (for common questions like "does X include removal?")',
          'In your booking confirmation message (summarised)',
        ]} />
        <p className="text-gray-700 mt-4 leading-relaxed">For pricing examples: <Link to="/learn/nail-tech-price-list-examples" className="underline text-[#F52B8C]">nail tech price list examples</Link>.</p>
      </section>
    </div>
  ),
});
export {};
