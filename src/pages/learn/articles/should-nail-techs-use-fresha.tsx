import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'should-nail-techs-use-fresha',
  title: 'Should Nail Techs Use Fresha?',
  seoTitle: 'Should Nail Techs Use Fresha? An Honest Review',
  excerpt: 'Fresha is one of the most widely used booking platforms among nail techs. Here\'s an honest assessment of who it suits, its real advantages, and where it falls short.',
  seoDescription: 'Should nail techs use Fresha? Honest review of Fresha for nail techs — what the free subscription actually means, marketplace pros and cons, and who Fresha is right for.',
  category: 'comparisons',
  tags: ['should nail techs use Fresha', 'Fresha review nail tech', 'Fresha booking app nail tech'],
  heroImage: 'linear-gradient(135deg, #FFF9EB 0%, #FEF3C7 100%)',
  heroImageAlt: 'Should nail techs use Fresha?',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'what-fresha-is', label: 'What Fresha actually is' },
    { id: 'what-nail-techs-like', label: 'What nail techs like about Fresha' },
    { id: 'what-to-watch', label: 'What to watch out for' },
    { id: 'who-fresha-suits', label: 'Who Fresha suits' },
    { id: 'who-it-doesnt', label: 'Who it doesn\'t suit' },
  ],
  relatedSlugs: ['fresha-vs-booksy-for-nail-techs', 'glossgenius-vs-fresha-for-nail-techs', 'square-vs-fresha-nail-techs', 'best-booking-apps-for-nail-techs-2026'],
  faq: [
    { q: 'Is Fresha completely free?', a: 'Fresha has no monthly subscription fee. However, they do charge a commission on new client bookings made through the Fresha marketplace, and there are transaction fees when using Fresha\'s card payment processing. If you send your existing clients directly to your Fresha booking link and they book there, there\'s no marketplace commission. The nuance is important: "free subscription" doesn\'t mean zero cost in all scenarios.' },
    { q: 'Can I set my own cancellation and no-show policy on Fresha?', a: 'Fresha allows deposit and cancellation policy settings, though the flexibility of these settings has been a point of discussion in nail tech communities — some techs find the options less customisable than they\'d like. Always test the client-facing experience of your own Fresha booking page to see how your policies appear and work before relying on them.' },
    { q: 'Does Fresha expose my home address publicly?', a: 'Fresha allows you to control your location display. For home-based nail techs, you can set your location to show an area or neighbourhood rather than a full address, with the exact address sent to confirmed clients only. Check your privacy settings carefully when setting up.' },
  ],
  relatedFeatureSlugs: ['bookings', 'deposits'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="warning" title="Features and terms change">
        Fresha's features, pricing, and commission structure change over time. Always check Fresha's current terms before committing. This article reflects general positioning at time of writing.
      </ArticleCallout>

      <section id="what-fresha-is">
        <h2 className="font-serif text-2xl font-bold mb-4">What Fresha actually is</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Fresha is a booking and business management platform built specifically for the beauty industry. It has two sides: a management platform for nail techs and salons (booking, client management, payments, marketing), and a client-facing marketplace where potential clients can discover and book beauty services.</p>
        <p className="text-gray-700 leading-relaxed">It operates on a free subscription model — no monthly fee for the core platform — with revenue coming from a commission on marketplace-originated bookings and from payment processing.</p>
      </section>

      <section id="what-nail-techs-like">
        <h2 className="font-serif text-2xl font-bold mb-4">What nail techs like about Fresha</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Free subscription:</strong> No monthly fee to maintain a professional booking page and client management tools</li>
          <li><strong>Marketplace discovery:</strong> Potential new clients who search Fresha in your area can find and book you — you don't have to generate all your own traffic</li>
          <li><strong>Global reach:</strong> Strong presence in the UK, Australia, and internationally — not US-only</li>
          <li><strong>Professional client-facing experience:</strong> Fresha's booking interface is clean and professional</li>
          <li><strong>Deposit collection:</strong> Fresha supports deposit requirements at booking</li>
          <li><strong>Automatic reminders:</strong> Client reminders are built in</li>
        </ul>
      </section>

      <section id="what-to-watch">
        <h2 className="font-serif text-2xl font-bold mb-4">What to watch out for</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Marketplace commission:</strong> Fresha charges a commission on new client bookings through the marketplace. If a significant portion of your new clients come through Fresha's discovery, this becomes an ongoing business cost to account for in your pricing</li>
          <li><strong>Policy flexibility:</strong> Some nail techs find Fresha's cancellation and no-show policy settings less flexible than dedicated booking tools. Test this before relying on it.</li>
          <li><strong>Payment processing fees:</strong> Fresha's payment processing charges transaction fees — factor this into your effective pricing</li>
          <li><strong>Platform dependence:</strong> Building your business around a free platform means you're exposed to the risk of that platform changing its terms (which Fresha has done at various points)</li>
        </ul>
        <ArticleTip>Don't build your entire client base around Fresha marketplace clients if you're concerned about commission. Fresha is most cost-effective when your existing clients book through your direct Fresha link, and the marketplace is a bonus discovery channel, not your primary source.</ArticleTip>
      </section>

      <section id="who-fresha-suits">
        <h2 className="font-serif text-2xl font-bold mb-4">Who Fresha suits</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Nail techs who want a free professional booking platform with marketplace discovery</li>
          <li>UK, Australian, and international nail techs who need strong local platform coverage</li>
          <li>Nail techs building a client base who want to be found on marketplace searches</li>
          <li>Both solo techs and salons — Fresha handles both well</li>
        </ul>
      </section>

      <section id="who-it-doesnt">
        <h2 className="font-serif text-2xl font-bold mb-4">Who it doesn't suit</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Nail techs who want maximum control over their cancellation and deposit policies</li>
          <li>Nail techs concerned about marketplace commission cutting into margins on new clients</li>
          <li>Nail techs who want a booking tool built specifically for nail businesses rather than beauty broadly</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Alternatives for nail techs who want more control over policies and their booking experience: <Link to="/learn/glossgenius-alternatives-nail-techs" className="underline text-[#F52B8C]">booking software alternatives</Link>. For nail-specific booking: <Link to="/" className="underline text-[#F52B8C]">Nelsy →</Link></p>
      </section>
    </div>
  ),
});
export {};
