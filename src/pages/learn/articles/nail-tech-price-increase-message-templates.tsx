import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-price-increase-message-templates',
  title: 'Nail Tech Price Increase Message Templates',
  seoTitle: 'Nail Tech Price Increase Message Templates (Copy & Paste)',
  excerpt: 'Announcing a price increase feels awkward — but most clients are fine with it when it\'s communicated well. Templates for announcing your price rise with confidence.',
  seoDescription: 'Nail tech price increase message templates. Copy-paste messages for announcing a nail price increase — to existing clients, on social media, and in your bio.',
  category: 'pricing-money',
  tags: ['nail tech price increase message', 'nail tech raising prices template', 'price increase message nail tech'],
  heroImage: 'linear-gradient(135deg, #FDF4FF 0%, #F3E8FF 100%)',
  heroImageAlt: 'Nail tech price increase message templates',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'how-to-announce', label: 'How to announce a price increase' },
    { id: 'existing-clients', label: 'Message to existing clients' },
    { id: 'instagram', label: 'Instagram announcement' },
    { id: 'booking-page', label: 'Booking page / bio update text' },
    { id: 'when-client-pushes-back', label: 'When a client pushes back' },
  ],
  relatedSlugs: ['how-to-raise-nail-prices', 'nail-pricing-guide', 'nail-tech-client-follow-up-templates', 'pricing-nail-services'],
  faq: [
    { q: 'How much notice should I give for a price increase?', a: 'Two to four weeks is standard. This gives existing clients time to book in before the increase if they want, and gives everyone time to update their budget. Avoid announcing a price increase effective "immediately" — it feels abrupt and can cause backlash.' },
    { q: 'Do I need to explain why I\'m raising my prices?', a: 'You can give a brief reason (cost of supplies, rent, training) but you don\'t need to justify your pricing. A simple, confident announcement is more professional than an over-explanation that sounds apologetic.' },
    { q: 'What if I lose clients after a price increase?', a: 'Some clients may leave, and that\'s okay — the goal is for a full or fuller schedule at the new rate, not to retain every client at a lower rate. Clients who leave over a reasonable price increase often weren\'t your ideal long-term clients.' },
  ],
  relatedFeatureSlugs: ['payments', 'crm'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="how-to-announce">
        <h2 className="font-serif text-2xl font-bold mb-4">How to announce a price increase</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Give at least 2 weeks' notice (4 weeks is better)</li>
          <li>State the effective date clearly</li>
          <li>Keep the tone confident and matter-of-fact — don't over-apologise</li>
          <li>Mention the new prices briefly, or direct people to your booking page for current pricing</li>
          <li>Invite existing clients to book at current prices before the date if relevant</li>
        </ul>
        <ArticleTip>Announce the increase once to existing clients directly, and once publicly on Instagram. Don't repeat it multiple times — one clear announcement is enough.</ArticleTip>
      </section>

      <section id="existing-clients">
        <h2 className="font-serif text-2xl font-bold mb-4">Message to existing clients</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Warm message to existing client base:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name]! I wanted to let you know that from [date], my prices will be increasing slightly to reflect rising costs and continued investment in my skills and products.<br /><br />
          New pricing will be available at [booking link].<br /><br />
          If you'd like to book in at current prices before [date], now's a great time to grab a spot. Thank you for your continued support — it genuinely means everything. 💕 [Your name]
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Brief and professional:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hi [Name], just a heads-up that from [date] my prices will be updating. Current pricing is in effect until then. You can view the new prices and book at [link]. Thank you for your loyalty — I really appreciate it!
        </blockquote>
      </section>

      <section id="instagram">
        <h2 className="font-serif text-2xl font-bold mb-4">Instagram announcement</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Instagram caption for a price increase post:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          📣 Pricing update<br /><br />
          From [date], my prices will be increasing to reflect the rising cost of quality products, training, and the time and care that goes into every set.<br /><br />
          Current prices remain in effect until [date] — if you've been thinking about booking, now's the time! 💅<br /><br />
          New pricing is on my booking page — link in bio. Thank you for your support, always. ✨
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Simple Story slide text:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Pricing update from [date]<br />
          Current prices until then<br />
          Book now via link in bio 💅
        </blockquote>
      </section>

      <section id="booking-page">
        <h2 className="font-serif text-2xl font-bold mb-4">Booking page / bio update text</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If your booking page shows prices, update them on the effective date. For your Instagram bio in the lead-up:</p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Prices updating [date] — book before then for current rates. Booking link below 💅
        </blockquote>
      </section>

      <section id="when-client-pushes-back">
        <h2 className="font-serif text-2xl font-bold mb-4">When a client pushes back</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If a client responds negatively to your price increase:</p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          I completely understand — price increases are never easy. My new pricing reflects the current cost of quality products and the level of service I provide. I'd love to keep you as a client, but I understand if the new pricing doesn't work for you. Thank you for your support so far. 💕
        </blockquote>
        <ArticleCallout variant="info" title="You don't owe anyone a discount">
          If a client pushes back and asks to keep the old price, it's okay to say no. Offering a loyalty discount to one client but not others is inconsistent and sets a precedent. Hold your pricing with warmth and confidence.
        </ArticleCallout>
      </section>
    </div>
  ),
});
export {};
