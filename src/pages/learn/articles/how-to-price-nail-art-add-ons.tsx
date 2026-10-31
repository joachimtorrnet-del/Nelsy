import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-price-nail-art-add-ons',
  title: 'How to Price Nail Art Add-Ons',
  seoTitle: 'How to Price Nail Art Add-Ons as a Nail Tech',
  excerpt: 'Nail art add-ons are one of the best ways to increase your average appointment value — but only if you price them correctly. Here\'s how to calculate and communicate add-on pricing.',
  seoDescription: 'How to price nail art add-ons as a nail tech. Pricing formulas for nail art, chrome, glitter, and custom designs — plus how to present add-ons at booking.',
  category: 'pricing-money',
  tags: ['nail art pricing', 'nail art add-ons', 'nail tech pricing', 'service pricing'],
  heroImage: 'linear-gradient(135deg, #FFF0F9 0%, #FBCFE8 100%)',
  heroImageAlt: 'How to price nail art add-ons',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-add-ons-matter', label: 'Why nail art add-ons matter for income' },
    { id: 'pricing-formula', label: 'How to calculate your add-on price' },
    { id: 'pricing-by-type', label: 'Pricing by add-on type' },
    { id: 'presenting-add-ons', label: 'How to present add-ons to clients' },
    { id: 'common-mistakes', label: 'Common pricing mistakes' },
  ],
  relatedSlugs: ['how-to-create-nail-service-menu', 'nail-tech-price-list-examples', 'how-to-increase-appointment-value', 'how-to-price-nail-services-for-profit'],
  faq: [
    { q: 'Should I charge per nail or per set for nail art?', a: 'Both models work — choose based on how you deliver the service. Per-nail pricing is clear and scalable: clients choose how many nails, you charge accordingly. Per-set pricing is simpler for clients who want all nails done. A hybrid works well: "nail art — from £15 for 2 accent nails, full set from £35." The key is clarity at booking, not mid-appointment surprises.' },
    { q: 'How do I charge for time-intensive nail art like 3D or hand-painted designs?', a: 'For time-intensive nail art, price by the hour is the most honest method: calculate your hourly rate, estimate the time, and price accordingly. Alternatively, create a fixed "bespoke nail art" service at a premium price that covers your anticipated time. Always quote the client before starting — "this design will be an additional £X" — so there are no surprises at payment.' },
    { q: 'What\'s the minimum I should charge for a chrome add-on?', a: 'Chrome powder application takes roughly 10–15 additional minutes (prep, application, buffing). At a minimum, charge for the time at your hourly rate plus a small materials markup. For most nail techs, £8–£15 for a chrome add-on is appropriate depending on location and positioning.' },
  ],
  relatedFeatureSlugs: ['payments', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-add-ons-matter">
        <h2 className="font-serif text-2xl font-bold mb-4">Why nail art add-ons matter for income</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Add-ons increase your revenue per appointment without requiring additional marketing or new clients. If 30% of your clients choose a £15 nail art add-on, and you see 20 clients per week, that\'s an additional £90/week — over £4,500 per year — without a single new booking.</p>
        <p className="text-gray-700 leading-relaxed">Under-priced add-ons are one of the most common income losses for nail techs. Charging £3 for chrome that takes 15 minutes means you\'re earning £12/hour for that part of the appointment — probably below your standard hourly rate. Correct add-on pricing means you earn your target rate throughout the entire appointment, not just for the base service.</p>
      </section>

      <section id="pricing-formula">
        <h2 className="font-serif text-2xl font-bold mb-4">How to calculate your add-on price</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The formula:</p>
        <ArticleCallout variant="info" title="Add-on pricing formula">
          Add-on price = (additional time in hours × your target hourly rate) + materials cost + small margin{'\n\n'}
          Example: Chrome add-on{'\n'}
          Additional time: 15 minutes = 0.25 hours{'\n'}
          Your target hourly rate: £60/hour{'\n'}
          Time cost: 0.25 × £60 = £15{'\n'}
          Materials (chrome powder, cleanser, etc.): £1–£2{'\n'}
          Minimum charge: £16–£17{'\n'}
          Rounded to market-friendly price: £15–£18
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">Use the <Link to="/tools/nail-tech-pricing-calculator" className="underline text-[#F52B8C]">pricing calculator</Link> to calculate your target hourly rate based on your costs and income goals.</p>
      </section>

      <section id="pricing-by-type">
        <h2 className="font-serif text-2xl font-bold mb-4">Pricing by add-on type</h2>
        <ArticleTable
          headers={['Add-on', 'Additional time', 'Example UK price', 'Notes']}
          rows={[
            ['Chrome / mirror effect', '10–15 min', '£8–£15', 'Lower prep time; materials cheap; price reflects time'],
            ['Micro-glitter overlay', '5–10 min', '£5–£10', 'Quick to apply; materials low cost'],
            ['Foil detail (1–2 nails)', '5–10 min', '£5–£8', 'Time-minimal; good value-perception add-on'],
            ['Simple nail art (2 accent nails)', '15–20 min', '£12–£18', 'Price per 2 nails; scale up for more'],
            ['Simple nail art (full set)', '30–45 min', '£20–£35', 'Time-based; define what "simple" means'],
            ['Bespoke / complex nail art', '60+ min', '£35–£60+', 'Quote individually; define complexity upfront'],
            ['3D nail art / gems', '30–60 min', '£25–£50+', 'Materials + significant time'],
            ['Cuticle oil treatment', '5 min', '£5', 'Minimal time; good upsell for natural nail clients'],
          ]}
        />
        <ArticleTip>Create named add-ons on your booking platform — "Chrome Effect Add-on — £12" — rather than letting clients describe what they want in a notes field. Named add-ons are chosen at booking, which gives you planning time and eliminates mid-appointment price negotiations.</ArticleTip>
      </section>

      <section id="presenting-add-ons">
        <h2 className="font-serif text-2xl font-bold mb-4">How to present add-ons to clients</h2>
        <ArticleTable
          headers={['Channel', 'How to present it']}
          rows={[
            ['Booking page', 'Add-ons as separate bookable items or selectable upgrades during booking flow'],
            ['Service menu', '"Add-ons" section with names and prices clearly listed'],
            ['Consultation (in-appointment)', '"Would you like to add chrome to this? It\'s an additional £12 and takes about 10 minutes"'],
            ['Instagram', 'Post the nail art as content; caption "this chrome was added as a £12 upgrade — ask me about add-ons at booking"'],
          ]}
        />
        <ArticleCallout variant="tip" title="The in-appointment upsell">
          Ask at the start of the appointment, not partway through: "Are you thinking about any extras today — chrome, nail art, or any special finishes?" Asking at the start allows you to factor the time into your service flow. Asking when you\'re already halfway through the appointment creates time pressure.
        </ArticleCallout>
      </section>

      <section id="common-mistakes">
        <h2 className="font-serif text-2xl font-bold mb-4">Common nail art pricing mistakes</h2>
        <ArticleTable
          headers={['Mistake', 'Result', 'Fix']}
          rows={[
            ['Charging the same as the base service regardless of complexity', 'Under-earning on time-intensive art', 'Price time-intensive art separately and higher'],
            ['Not charging for chrome because "it takes two minutes"', 'Chrome takes 10–15 min prep + application', 'Charge for the full time including prep'],
            ['Surprising clients with add-on cost at payment', 'Client feels ambushed; dispute risk', 'Always confirm add-on price before starting'],
            ['Making add-ons feel optional and awkward to say yes to', 'Fewer add-on uptakes', 'Mention them naturally at consultation as part of the standard process'],
            ['Pricing add-ons so low they seem like a gift', 'Clients don\'t perceive the value', 'A confident £12 chrome add-on feels professional; a £3 add-on feels like an afterthought'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For overall appointment value: <Link to="/learn/how-to-increase-appointment-value" className="underline text-[#F52B8C]">how to increase your average nail appointment value</Link>.</p>
      </section>
    </div>
  ),
});
export {};
