import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-get-nail-clients-from-instagram',
  title: 'How to Get Nail Clients from Instagram',
  seoTitle: 'How to Get Nail Clients from Instagram (That Actually Book)',
  excerpt: 'Instagram can be your best client acquisition tool — but likes don\'t pay bills. Here\'s how to turn your nail content into actual bookings.',
  seoDescription: 'How to get nail clients from Instagram: what content to post, how to optimise your profile, convert followers into bookings, and use DMs strategically.',
  category: 'get-clients',
  tags: ['Instagram', 'nail clients', 'social media', 'Instagram strategy'],
  heroImage: 'linear-gradient(135deg, #FFF1F2 0%, #FFB3C1 100%)',
  heroImageAlt: 'How to get nail clients from Instagram',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  spotlight: true,
  toc: [
    { id: 'instagram-vs-bookings', label: 'Why Instagram likes don\'t equal bookings' },
    { id: 'profile-optimisation', label: 'Profile optimisation for bookings' },
    { id: 'content-that-converts', label: 'Content that generates bookings' },
    { id: 'location-strategy', label: 'The location tag strategy' },
    { id: 'cta-strategy', label: 'Calls to action that work' },
    { id: 'dm-conversion', label: 'Converting DM enquiries' },
  ],
  relatedSlugs: ['how-to-get-more-nail-clients', 'how-to-grow-nail-tech-instagram', 'why-nail-page-gets-likes-but-no-bookings'],
  faq: [
    { q: 'How many Instagram followers do I need to get nail clients?', a: 'You don\'t need a large following to get local nail clients from Instagram. Nail techs with 500–1000 local followers consistently get fully booked through Instagram. The key is that followers are local and your profile is clear about how to book.' },
    { q: 'Should I post Reels or photos to get nail clients?', a: 'Both work, and Reels tend to get more reach. But photos are often better for converting that reach into bookings because clients can scroll through your portfolio. The most effective approach is to use Reels for discovery and photos for the portfolio that convinces clients to book.' },
    { q: 'How often should I post to get nail clients from Instagram?', a: '3–5 times per week is the sweet spot for growing a nail tech account. Consistency matters more than frequency — it\'s better to post 3x reliably every week than to post daily for two weeks and then go quiet for a month.' },
  ],
  relatedFeatureSlugs: ['instagram-autodm', 'link-in-bio', 'audience-capture'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="instagram-vs-bookings">
        <h2 className="font-serif text-2xl font-bold mb-4">Why Instagram likes don't equal bookings</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Many nail techs build large, engaged Instagram followings and still struggle to fill their appointment book. The reason is usually simple: their profile isn't set up to convert viewers into bookings.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">Instagram will give you reach. But reach only becomes bookings when a viewer can immediately understand:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>That you're taking new clients</li>
          <li>Where you're based (they need to be local)</li>
          <li>How to book and roughly what it costs</li>
        </ol>
        <ArticleCallout variant="info" title="The conversion gap">
          If a potential client sees your content, likes your work, clicks to your profile, can't immediately see how to book or where you're based, and then clicks away — you've lost a client who was ready to book. The content worked. The profile didn't.
        </ArticleCallout>
      </section>

      <section id="profile-optimisation">
        <h2 className="font-serif text-2xl font-bold mb-4">Profile optimisation for bookings</h2>
        <ArticleChecklist title="Booking-optimised Instagram profile" items={[
          'Name field includes your location (e.g. "Nail Tech | East London")',
          'Bio says you\'re taking bookings ("Now taking new clients" or "Book via link below")',
          'Location mentioned in bio',
          'Booking link in bio (direct to your booking page, not a Linktree with 10 options)',
          'Highlights: Portfolio, Pricing, How to Book',
          'Contact button set to email or WhatsApp',
        ]} />
        <ArticleTip>Your Instagram name field (not username) is searchable. If you include "Nail Tech Manchester" or "Nail Tech South London" in your name field, you'll appear in location-based searches.</ArticleTip>
      </section>

      <section id="content-that-converts">
        <h2 className="font-serif text-2xl font-bold mb-4">Content that generates bookings</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Not all content is equal for booking conversion. The content types that drive the most bookings:</p>
        <ArticleTable
          headers={['Content type', 'Booking conversion', 'Notes']}
          rows={[
            ['Portfolio photos (clean, well-lit nail shots)', 'High', 'Clients need to see what they\'re booking before committing'],
            ['Before/after transformations', 'High', 'Shows skill, attracts clients with problem nails'],
            ['Process videos (Reels)', 'Medium-high', 'Good for reach; include booking CTA'],
            ['Availability posts ("I have slots this week")', 'Very high', 'Direct conversion — only works if you have engaged followers'],
            ['Nail inspo you\'ve created', 'High', 'Attracts clients who want that specific look'],
            ['Behind-the-scenes', 'Low-medium', 'Good for brand; less direct conversion'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For 100 content ideas: <Link to="/learn/100-nail-tech-content-ideas" className="underline text-[#F52B8C]">100 nail tech content ideas</Link>.</p>
      </section>

      <section id="location-strategy">
        <h2 className="font-serif text-2xl font-bold mb-4">The location tag strategy</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Location tags are underused by nail techs who focus on hashtags instead. Location tags are more powerful for local client acquisition because they surface your content to people searching in that specific area:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Tag your city AND your specific neighbourhood/area on every post</li>
          <li>Tag local landmarks if relevant (e.g. if you're near a well-known area)</li>
          <li>Use location-based hashtags (#ManchesterNails, #SouthLondonNailTech)</li>
          <li>Tag local businesses or areas you're near if it's relevant</li>
        </ul>
      </section>

      <section id="cta-strategy">
        <h2 className="font-serif text-2xl font-bold mb-4">Calls to action that work</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Every piece of content you post should have a call to action. Not a vague "let me know what you think" but a specific instruction:</p>
        <ArticleTable
          headers={['CTA', 'When to use']}
          rows={[
            ['"Book via link in bio"', 'On portfolio posts and Reels'],
            ['"I have availability this week — DM me to book"', 'When you have specific gaps to fill'],
            ['"Save this for nail inspo and book when you\'re ready"', 'On inspo/wishlist content'],
            ['"Comment if you want this design and I\'ll DM you the details"', 'On trending designs'],
            ['"Tag a friend who needs this set"', 'On especially popular posts — expands reach'],
          ]}
        />
      </section>

      <section id="dm-conversion">
        <h2 className="font-serif text-2xl font-bold mb-4">Converting DM enquiries</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">When someone DMs you after seeing your content, reply quickly (within a few hours at most). Speed matters — they may be messaging multiple nail techs.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">Don't start a long back-and-forth. Direct them to your booking page:</p>
        <ArticleCallout variant="tip" title="DM reply template">
          "Hey! So glad you like my work 🙏 The easiest way to book is through my online booking page — you can see my availability and secure your slot with a deposit right there. Link in bio! Let me know if you have any questions."
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">For more: <Link to="/learn/why-booking-through-dms-costs-nail-techs-clients" className="underline text-[#F52B8C]">Why booking through DMs costs nail techs clients</Link>.</p>
      </section>
    </div>
  ),
});
export {};
