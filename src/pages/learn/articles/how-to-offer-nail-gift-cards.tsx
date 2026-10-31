import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-offer-nail-gift-cards',
  title: 'How to Offer Nail Gift Cards as a Nail Tech',
  seoTitle: 'How to Offer Nail Gift Cards as a Nail Tech',
  excerpt: 'Gift cards are one of the easiest ways to earn income between appointment slots and attract new clients. Here\'s how to set them up and sell them effectively.',
  seoDescription: 'How to offer nail gift cards as a nail tech. Setting up gift vouchers, pricing, selling online and in person, and turning gift card holders into regular clients.',
  category: 'pricing-money',
  tags: ['nail gift cards', 'nail gift vouchers', 'gift cards nail tech'],
  heroImage: 'linear-gradient(135deg, #FFF9FB 0%, #FDDDE6 100%)',
  heroImageAlt: 'How to offer nail gift cards as a nail tech',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-gift-cards', label: 'Why gift cards work for nail businesses' },
    { id: 'setting-up', label: 'Setting up gift cards' },
    { id: 'pricing', label: 'How to price gift cards' },
    { id: 'selling', label: 'How to sell gift cards' },
    { id: 'converting', label: 'Turning gift card clients into regulars' },
  ],
  relatedSlugs: ['how-to-upsell-nail-services', 'how-to-increase-appointment-value', 'black-friday-ideas-nail-techs', 'christmas-marketing-ideas-nail-techs'],
  faq: [
    { q: 'Should I sell gift cards for a specific service or a monetary value?', a: 'Both work, but monetary value gift cards are more flexible and tend to sell more easily as gifts — the giver doesn\'t need to know exactly what the recipient wants. Service-specific gift cards ("one gel manicure") work well for promotional purposes. Offering both options covers more use cases.' },
    { q: 'Do I need to keep gift card money separate?', a: 'Yes — gift card income is not earned income until the appointment is delivered. If a client books with a gift card and you\'ve already spent the money, you have a liability problem. Keep gift card funds in a separate savings account or budget them carefully. Most gift cards are used within 3 months of purchase.' },
  ],
  relatedFeatureSlugs: ['payments', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-gift-cards">
        <h2 className="font-serif text-2xl font-bold mb-4">Why gift cards work for nail businesses</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Income before the appointment:</strong> You receive payment immediately, often weeks before the service is delivered</li>
          <li><strong>New client acquisition:</strong> Gift card recipients are often first-time clients — they arrive already sold on trying your services</li>
          <li><strong>Seasonal income spikes:</strong> Gift cards sell strongly before Christmas, Valentine's Day, and Mother's Day — peaks you can plan for</li>
          <li><strong>Not all cards are redeemed:</strong> A percentage of gift cards are never used (typically 10–15%) — this is pure income for you</li>
          <li><strong>Low effort marketing:</strong> Every gift card purchase is a word-of-mouth referral from a satisfied client</li>
        </ul>
      </section>

      <section id="setting-up">
        <h2 className="font-serif text-2xl font-bold mb-4">Setting up gift cards</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Digital gift cards:</strong> The simplest setup. Use your booking software's gift card feature (Fresha, Vagaro, and most booking platforms have one), or a service like Square Gift Cards, Stripe, or a simple PayPal payment with a PDF voucher you design yourself</li>
          <li><strong>Physical gift cards:</strong> Printed or card-stock vouchers are a premium option for in-person gifting — designed with your branding and a unique code</li>
          <li><strong>Hybrid:</strong> Sell digitally, offer a printed version for those who want something physical to gift in person</li>
          <li><strong>What to include on a gift card:</strong> Your business name, value or service, expiry date (typically 12 months), contact/booking details, and a redemption code</li>
        </ul>
        <ArticleCallout variant="info" title="Set a clear expiry date">
          An expiry date (typically 12 months from purchase) protects you from redemptions years later and motivates recipients to book. Check your local consumer law around gift card expiry — rules vary by country.
        </ArticleCallout>
      </section>

      <section id="pricing">
        <h2 className="font-serif text-2xl font-bold mb-4">How to price gift cards</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Monetary value: set standard denominations that match your common service prices — e.g., £30, £50, £75. This makes them easy to shop for as gifts</li>
          <li>Service gift cards: price at your standard service rate; don't discount</li>
          <li>Gift card bundles: some nail techs offer a "£50 card for £45" promotionally — this can drive sales volume but erodes margin; use cautiously and for limited periods only</li>
          <li>Don't discount your gift cards routinely — they should be sold at full value. The motivation to buy a gift card is convenience and gifting, not price</li>
        </ul>
        <ArticleTip>Create a dedicated landing page or section in your booking system for gift cards so buyers can find them easily — many nail techs lose gift card sales simply because the purchase path isn't clear.</ArticleTip>
      </section>

      <section id="selling">
        <h2 className="font-serif text-2xl font-bold mb-4">How to sell gift cards</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>At checkout:</strong> Mention gift cards to every client paying for their appointment — "do you know anyone who might love a nail gift card?"</li>
          <li><strong>Seasonal campaigns:</strong> Post about gift cards specifically before Christmas, Valentine's Day, and Mother's Day — these are peak gifting moments</li>
          <li><strong>Story highlights:</strong> Keep a permanent Story highlight on your Instagram with gift card information and a purchase link</li>
          <li><strong>In bio:</strong> Add a gift card purchase link to your Instagram or TikTok bio</li>
          <li><strong>Email or message to existing clients:</strong> A direct message to your client list before seasonal peaks ("perfect gift idea for someone you love — nail gift cards available now") consistently converts</li>
        </ul>
      </section>

      <section id="converting">
        <h2 className="font-serif text-2xl font-bold mb-4">Turning gift card clients into regulars</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Gift card recipients are warm prospects — they already have a reason to visit</li>
          <li>Give them the same experience as any other client; don't treat them as "discount clients"</li>
          <li>Rebook them before they leave, the same as any other appointment</li>
          <li>Follow up after their first appointment: "great to meet you — would you like to get your next appointment in the calendar?"</li>
          <li>A gift card client who enjoys their first experience and rebooks is worth the same lifetime value as any regular client — treat the acquisition cost (the gift card discount, if any) as a marketing investment</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">Related: <Link to="/learn/how-to-upsell-nail-services" className="underline text-[#F52B8C]">how to upsell nail services</Link> · <Link to="/learn/christmas-marketing-ideas-nail-techs" className="underline text-[#F52B8C]">Christmas marketing ideas</Link>.</p>
      </section>
    </div>
  ),
});
export {};
