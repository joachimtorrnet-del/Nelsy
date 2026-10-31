import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleTip, ArticleCallout } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-upsell-nail-services',
  title: 'How to Upsell Nail Services Without Being Pushy',
  seoTitle: 'How to Upsell Nail Services Without Being Pushy',
  excerpt: 'Upselling doesn\'t have to feel like selling. Done well, it feels like great client service — offering something the client actually wants. Here\'s how to do it naturally.',
  seoDescription: 'How to upsell nail services without being pushy. Natural upsell language for nail techs, which add-ons work best, and how to raise average appointment value without awkward sales conversations.',
  category: 'pricing-money',
  tags: ['how to upsell nail services', 'nail service upsell', 'increase nail appointment value'],
  heroImage: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
  heroImageAlt: 'How to upsell nail services without being pushy',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'upsell-mindset', label: 'Upselling vs. recommending' },
    { id: 'best-upsells', label: 'Best nail add-ons to offer' },
    { id: 'language', label: 'Natural upsell language' },
    { id: 'when-to-offer', label: 'When to offer add-ons' },
    { id: 'tracking', label: 'Tracking your upsell rate' },
  ],
  relatedSlugs: ['how-to-increase-appointment-value', 'how-to-offer-nail-gift-cards', 'nail-tech-price-increase-message-templates', 'how-to-write-nail-service-menu'],
  faq: [
    { q: 'How much can upselling increase average appointment value?', a: 'Consistently offering one small add-on per appointment (nail art, gel top coat upgrade, cuticle treatment) typically increases average appointment value by 10–20%. The precise amount depends on your add-on prices and take-up rate. Even a 10% increase across your full book is a meaningful income uplift without adding a single new client.' },
    { q: 'What if clients say no to upsells?', a: 'That\'s fine and normal. The goal is to ensure clients know what\'s available — not to pressure them into buying. A client who says "not this time" is not offended; they\'re just giving you information. Offer naturally, accept gracefully, and move on.' },
  ],
  relatedFeatureSlugs: ['payments', 'bookings', 'crm'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="upsell-mindset">
        <h2 className="font-serif text-2xl font-bold mb-4">Upselling vs. recommending</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Most nail techs who feel uncomfortable "upselling" are actually just uncomfortable with the word. Reframe it: you're recommending services that would benefit the client, based on what you're seeing in front of you.</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Noticing that a client's cuticles are very dry and mentioning a cuticle treatment is a recommendation, not a sales pitch</li>
          <li>Pointing out a nail art effect that would suit the colour they've chosen is helpful, not pushy</li>
          <li>The discomfort most nail techs feel comes from offering things indiscriminately — not from genuine recommendations based on observation</li>
          <li>Upselling done well means clients leave feeling their tech looked after them; done poorly it feels transactional. The difference is whether the offer is personalised</li>
        </ul>
      </section>

      <section id="best-upsells">
        <h2 className="font-serif text-2xl font-bold mb-4">Best nail add-ons to offer</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Nail art (one or two accent nails):</strong> Easy to offer, adds visible value, photographs well — the highest take-up upsell for most nail techs</li>
          <li><strong>Chrome or effect powder:</strong> Quick to apply over a cured gel, significant visual impact, clients often respond enthusiastically when they see the effect</li>
          <li><strong>Gel top coat upgrade:</strong> If your base service is gel polish, offering a longer-lasting or strengthening top coat at a small premium is a low-friction upsell</li>
          <li><strong>Cuticle treatment / paraffin:</strong> Easy to incorporate into prep time; clients with dry cuticles or hands are a natural fit</li>
          <li><strong>Nail repair:</strong> If a nail is broken, repairing it rather than leaving it short is an easy add-on the client is usually pleased to have offered</li>
          <li><strong>Gel on toes:</strong> If a client is booked for hands only, mentioning matching toes at the end of the appointment captures the moment they're most satisfied</li>
        </ul>
        <ArticleCallout variant="info" title="Add-ons that add time need a price that reflects it">
          Nail art and chrome add-ons should be priced to include the additional time they take. If adding a chrome accent nail takes 5 minutes and you charge £3 for it, it's not worth offering. Price add-ons at your hourly rate or better.
        </ArticleCallout>
      </section>

      <section id="language">
        <h2 className="font-serif text-2xl font-bold mb-4">Natural upsell language</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Information first, not pitch first:</strong> "I've got a chrome powder that looks amazing with this colour — do you want to see it?" not "Would you like to add a chrome for £8?"</li>
          <li><strong>Observation-based:</strong> "Your cuticles look really dry — I can do a quick cuticle treatment while the gel cures if you'd like?" feels like care, not sales</li>
          <li><strong>Easy yes or no:</strong> Frame the offer so that "no" is completely fine and doesn't require explanation — "totally up to you", "just a thought", "no pressure at all"</li>
          <li><strong>Show before you tell:</strong> Showing a client a chrome swatch or a photo of the nail art effect before asking gives them something concrete to respond to</li>
        </ul>
        <ArticleTip>The best time to offer an accent nail or chrome is after you've applied the base colour and the client can see the shade. That's when they're most visually engaged and most open to building on the look.</ArticleTip>
      </section>

      <section id="when-to-offer">
        <h2 className="font-serif text-2xl font-bold mb-4">When to offer add-ons</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>During the consultation:</strong> Ask what they're thinking before you start — "Any nail art or effects this time?" gives them permission to say yes early</li>
          <li><strong>After colour is chosen:</strong> A natural moment to mention complementary effects ("this colour looks great with a shimmer powder")</li>
          <li><strong>During application:</strong> If something catches your eye ("I could add a floral detail on the accent nail while this set cures — would you like to see?")</li>
          <li><strong>At checkout:</strong> Mention gift cards, toe gel, or next-appointment add-ons as the payment happens</li>
          <li><strong>Never:</strong> Don't offer add-ons when the client is clearly in a hurry, stressed, or when you've already run over the appointment time</li>
        </ul>
      </section>

      <section id="tracking">
        <h2 className="font-serif text-2xl font-bold mb-4">Tracking your upsell rate</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Note when add-ons are purchased vs. offered — this tells you your conversion rate and which add-ons clients respond to best</li>
          <li>Track average appointment value monthly — if it's flat despite offering add-ons, review what you're offering and when</li>
          <li>The goal isn't to maximise every appointment; it's to ensure clients consistently know what's available and feel free to say yes or no</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">Related: <Link to="/learn/how-to-increase-appointment-value" className="underline text-[#F52B8C]">how to increase appointment value</Link> · <Link to="/learn/how-to-offer-nail-gift-cards" className="underline text-[#F52B8C]">offering nail gift cards</Link>.</p>
      </section>
    </div>
  ),
});
export {};
