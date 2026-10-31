import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'black-friday-ideas-nail-techs',
  title: 'Black Friday Ideas for Nail Techs',
  seoTitle: 'Black Friday Ideas for Nail Techs (Without Discounting Your Services)',
  excerpt: 'Black Friday doesn\'t have to mean discounting your services. Here\'s how nail techs can participate in the biggest shopping weekend of the year — on their own terms.',
  seoDescription: 'Black Friday ideas for nail techs. Run a Black Friday promotion without slashing prices — gift cards, add-ons, product bundles, and smart ways to use the weekend.',
  category: 'get-clients',
  tags: ['black friday nail tech', 'black friday nail business', 'nail tech black friday ideas'],
  heroImage: 'linear-gradient(135deg, #1F2937 0%, #374151 100%)',
  heroImageAlt: 'Black Friday ideas for nail techs',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'should-you-participate', label: 'Should nail techs participate in Black Friday?' },
    { id: 'without-discounting', label: 'Black Friday ideas without discounting services' },
    { id: 'if-you-discount', label: 'If you want to offer a discount' },
    { id: 'content-ideas', label: 'Content ideas for Black Friday week' },
    { id: 'timing', label: 'Timing your promotion' },
  ],
  relatedSlugs: ['christmas-marketing-ideas-nail-techs', 'how-to-raise-nail-prices', 'nail-tech-giveaway-ideas', 'holiday-booking-strategy-nail-techs'],
  faq: [
    { q: 'Do I have to do Black Friday as a nail tech?', a: 'No — Black Friday is optional. If you\'re already fully booked, there\'s little point in a promotion. If you have slow November availability, it can be a useful boost. The key decision is whether a promotion serves your business goals right now.' },
    { q: 'Is it bad to discount nail services on Black Friday?', a: 'Discounting can attract price-sensitive clients who book once because of the deal and don\'t return at full price. A better approach: create value through gift cards, add-ons, or product bundles — these bring in money now without permanently anchoring your pricing lower in clients\' minds.' },
  ],
  relatedFeatureSlugs: ['email-newsletters', 'instagram-autodm', 'audience-capture'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="should-you-participate">
        <h2 className="font-serif text-2xl font-bold mb-4">Should nail techs participate in Black Friday?</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">It depends on your situation:</p>
        <ArticleTable
          headers={['Situation', 'Worth participating?']}
          rows={[
            ['Already fully booked through December', 'Not really — you don\'t need to generate more demand'],
            ['Have empty November slots to fill', 'Yes — a targeted promotion can help'],
            ['Want to sell gift cards before Christmas', 'Yes — Black Friday is an ideal moment'],
            ['Have nail products to sell (retail)', 'Yes — product discounts fit Black Friday naturally'],
            ['Just starting out and building a client base', 'Yes — a first-visit offer can attract new clients'],
          ]}
        />
      </section>

      <section id="without-discounting">
        <h2 className="font-serif text-2xl font-bold mb-4">Black Friday ideas without discounting services</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Gift cards at a bonus value</strong> — sell a £50 gift card for £45; the face value is higher than what they pay, without reducing your service price</li>
          <li><strong>Nail art add-on promotion</strong> — a limited-time offer for a free or discounted accent nail with any full-price booking</li>
          <li><strong>Product bundle</strong> — if you retail nail care products, bundle them at a discount</li>
          <li><strong>Priority booking for regulars</strong> — give loyal clients early access to December slots as a Black Friday "perk" (costs you nothing)</li>
          <li><strong>Prepaid service bundle</strong> — sell three appointments at a small saving, paid upfront; you get cash flow, client commits to returning</li>
        </ul>
        <ArticleCallout variant="info" title="Gift cards are your best Black Friday product">
          Gift cards bring in revenue now, give you a committed future booking, and are bought as gifts — attracting new clients you'd never reach otherwise. They're the ideal Black Friday offer for nail techs.
        </ArticleCallout>
      </section>

      <section id="if-you-discount">
        <h2 className="font-serif text-2xl font-bold mb-4">If you want to offer a discount</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If you do choose to discount, protect your pricing:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Discount new client first bookings only — not your existing client base (they'd book anyway)</li>
          <li>Time-limit it strictly — "valid for bookings made on 29 November only" or "first 5 redemptions only"</li>
          <li>Apply it to less busy periods — e.g. "£10 off a Monday–Wednesday appointment in November"</li>
          <li>Don't discount your premium complex sets — protect the services that represent your highest skill level</li>
        </ul>
      </section>

      <section id="content-ideas">
        <h2 className="font-serif text-2xl font-bold mb-4">Content ideas for Black Friday week</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Announce your gift card offer on Black Friday morning</li>
          <li>"Treat yourself this Black Friday" — self-care angle</li>
          <li>"Give the gift of gorgeous nails" — gifting angle for gift cards</li>
          <li>Countdown to offer ending (creates urgency without pressure)</li>
          <li>Behind the scenes — what you're working on during Black Friday week</li>
          <li>"Skip the sales — book your Christmas nails instead" — playful alternative angle</li>
        </ul>
      </section>

      <section id="timing">
        <h2 className="font-serif text-2xl font-bold mb-4">Timing your promotion</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The Black Friday window has expanded significantly — many brands now run "Black Friday week" from Monday through Cyber Monday. For nail techs:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Announce on Thursday or Friday of Black Friday week</li>
          <li>Keep offers open through the weekend at most</li>
          <li>Don't extend indefinitely — scarcity and deadlines drive action</li>
          <li>Follow up with a "last chance" post on Sunday evening</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
