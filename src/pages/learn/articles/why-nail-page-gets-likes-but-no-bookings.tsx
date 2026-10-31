import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'why-nail-page-gets-likes-but-no-bookings',
  title: 'Why Your Nail Page Gets Likes But No Bookings',
  seoTitle: 'Why Your Nail Page Gets Likes But No Bookings (And How to Fix It)',
  excerpt: 'If your nail content gets lots of engagement but your DMs are quiet, something specific is going wrong. Here\'s how to diagnose and fix it.',
  seoDescription: 'Why nail techs get Instagram likes but no bookings — the 6 most common reasons and how to fix each one. Diagnose your conversion problem and start getting clients.',
  category: 'instagram-content',
  tags: ['Instagram', 'likes no bookings', 'Instagram strategy', 'nail content'],
  heroImage: 'linear-gradient(135deg, #FFF1F2 0%, #F9A8D4 100%)',
  heroImageAlt: 'Why nail page gets likes but no bookings',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'diagnose', label: 'Diagnose your problem first' },
    { id: 'wrong-audience', label: 'Wrong audience: non-local followers' },
    { id: 'unclear-booking', label: 'No clear path to booking' },
    { id: 'no-prices', label: 'Prices nowhere to be found' },
    { id: 'booking-friction', label: 'Too much friction to book' },
    { id: 'content-vs-business', label: 'Content account vs booking machine' },
    { id: 'action-plan', label: 'A quick action plan' },
  ],
  relatedSlugs: ['how-to-get-nail-clients-from-instagram', 'how-to-turn-instagram-followers-into-nail-clients', 'nail-content-that-gets-bookings'],
  faq: [
    { q: 'Why does my nail content go viral but I still don\'t get clients?', a: 'Viral nail content typically reaches a global audience of nail enthusiasts who admire the art — not local clients who can book you. Virality on Instagram rarely translates to local service bookings unless your profile is specifically optimised to convert viewers into bookings.' },
    { q: 'I have a booking link in my bio but clients still DM me — why?', a: 'Two common causes: the link goes to a generic link page (Linktree with many options) rather than directly to booking, or the booking page requires too many steps before clients see availability. Make your bio link go directly to your booking page and test the flow on a phone.' },
    { q: 'What\'s more important — engagement rate or follower count for getting nail bookings?', a: 'Neither, really. What matters most for local nail bookings is follower location. 1,000 engaged local followers are worth more than 50,000 followers spread globally. Check your Insights to see where your audience is based.' },
  ],
  relatedFeatureSlugs: ['instagram-autodm', 'link-in-bio', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="diagnose">
        <h2 className="font-serif text-2xl font-bold mb-4">Diagnose your problem first</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The likes-but-no-bookings problem has several different causes, and the fix depends on which one you're dealing with. Before trying to fix it, ask:</p>
        <ArticleTable
          headers={['Question', 'What it reveals']}
          rows={[
            ['Where are my followers located?', 'Instagram Insights → Audience → Top Cities. If most aren\'t local, that\'s the problem.'],
            ['When I check my profile like a stranger, is it obvious how to book?', 'If it takes more than 5 seconds to understand how to book, that\'s a problem.'],
            ['Can I see my prices within 2 taps of landing on my profile?', 'Hidden prices kill conversions.'],
            ['How long does the full booking flow take on mobile?', 'More than 5 minutes = too much friction.'],
            ['When did I last post an availability CTA?', 'Passive content without CTAs doesn\'t convert.'],
          ]}
        />
      </section>

      <section id="wrong-audience">
        <h2 className="font-serif text-2xl font-bold mb-4">Wrong audience: non-local followers</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">This is the most common cause of likes without bookings. Your content is attracting nail enthusiasts and other nail techs — people who love nails but can't book you because they're not local.</p>
        <ArticleCallout variant="warning" title="Check this right now">
          Go to Instagram Insights → Audience → Top Cities. If your top cities are places you don't serve, your content is reaching the wrong people. This isn't your content's fault — it's a distribution problem.
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">Fix: location tags on every post, location in your name field and bio, and local hashtags. These make your content more likely to reach people in your area. See: <Link to="/learn/how-to-get-nail-clients-from-instagram" className="underline text-[#F52B8C]">How to get nail clients from Instagram</Link>.</p>
      </section>

      <section id="unclear-booking">
        <h2 className="font-serif text-2xl font-bold mb-4">No clear path to booking</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Many nail tech profiles are beautiful to look at but provide no clear instruction on how to book. Potential clients have to figure it out themselves — and many won't bother.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">The fix is simple: be explicit. Your bio should contain the words "Book via link below" or equivalent. Your posts should end with "Book via link in bio." Your Stories should link directly to your booking page.</p>
        <ArticleTip>Test your own profile as if you know nothing about you. Open it on your phone, pretend you're a client. How quickly can you figure out how to book? If it takes more than 10 seconds, something's missing.</ArticleTip>
      </section>

      <section id="no-prices">
        <h2 className="font-serif text-2xl font-bold mb-4">Prices nowhere to be found</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Not having your prices visible is one of the fastest ways to lose potential clients. Most people won't DM to ask — they'll assume you're out of their budget and move on.</p>
        <p className="text-gray-700 leading-relaxed">Put prices on your booking page. If you don't want them on your main Instagram profile, add a "Pricing" highlight. When people DM to ask for prices, respond immediately — delayed replies on pricing questions are almost always lost bookings.</p>
      </section>

      <section id="booking-friction">
        <h2 className="font-serif text-2xl font-bold mb-4">Too much friction to book</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Even if your audience is local and your CTA is clear, a clunky booking process kills conversions. Common friction points:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Bio link goes to a Linktree with 10 options (add one more click to the path)</li>
          <li>Booking page requires account creation before showing availability</li>
          <li>Booking through DMs — requires back-and-forth over hours</li>
          <li>Deposit collected manually after booking (adds an extra step)</li>
          <li>Mobile booking experience is slow or confusing</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">The standard to aim for: click bio link → see services and availability → complete booking with deposit in under 5 minutes on a phone.</p>
      </section>

      <section id="content-vs-business">
        <h2 className="font-serif text-2xl font-bold mb-4">Content account vs booking machine</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Some nail techs have accidentally built content accounts — pages that get engagement from the nail art community — rather than business pages that attract clients. The difference:</p>
        <ArticleTable
          headers={['Content account', 'Business page']}
          rows={[
            ['Posts nail art for appreciation', 'Posts nail art + explains how to book'],
            ['Followers are mostly other nail techs', 'Followers are mostly local potential clients'],
            ['No location tags / CTAs', 'Location tags + booking CTAs on every post'],
            ['Engagement comes from non-local admirers', 'Engagement comes from local people interested in booking'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">Both are fine — but only the second one fills your appointment book.</p>
      </section>

      <section id="action-plan">
        <h2 className="font-serif text-2xl font-bold mb-4">A quick action plan</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li>Check Instagram Insights for audience location</li>
          <li>Update bio: add location, add "Book via link below"</li>
          <li>Set bio link to go directly to your booking page</li>
          <li>Add location tags to your next 10 posts</li>
          <li>Post one availability CTA this week: "I have slots this week — link in bio to book"</li>
        </ol>
        <p className="text-gray-700 mt-6 leading-relaxed">Do these five things before anything else. The results are usually visible within 2–4 weeks.</p>
      </section>
    </div>
  ),
});
export {};
