import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-turn-instagram-followers-into-nail-clients',
  title: 'How to Turn Instagram Followers Into Nail Clients',
  seoTitle: 'How to Turn Instagram Followers Into Nail Clients',
  excerpt: 'You have followers but they\'re not booking. Here\'s why — and exactly how to fix the gap between engagement and actual bookings.',
  seoDescription: 'How to convert Instagram followers into nail clients. Fix the profile, add the right CTAs, and turn your engaged audience into a steady stream of bookings.',
  category: 'get-clients',
  tags: ['Instagram', 'followers to clients', 'conversion', 'nail clients'],
  heroImage: 'linear-gradient(135deg, #FFF7ED 0%, #FBBF24 100%)',
  heroImageAlt: 'Turn Instagram followers into nail clients',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'the-conversion-gap', label: 'The follower-to-client gap' },
    { id: 'profile-fix', label: 'Fixing your profile for conversion' },
    { id: 'content-for-local-clients', label: 'Content that attracts local clients' },
    { id: 'non-local-followers', label: 'What to do about non-local followers' },
    { id: 'booking-friction', label: 'Removing booking friction' },
    { id: 'nurturing', label: 'Nurturing followers into clients' },
  ],
  relatedSlugs: ['how-to-get-nail-clients-from-instagram', 'why-nail-page-gets-likes-but-no-bookings', 'how-to-grow-nail-tech-instagram'],
  faq: [
    { q: 'Why do I have lots of Instagram followers but no bookings?', a: 'Usually one of three reasons: your followers aren\'t local (they admire your work but can\'t book), your profile doesn\'t clearly show how to book, or there\'s too much friction in the booking process. The most common is a mix of all three.' },
    { q: 'How do I know if my Instagram followers are local?', a: 'Check your Instagram Insights under "Audience" → "Top Cities". If most of your audience is in cities far from you, your content is reaching non-local admirers rather than potential clients. Location tags and local hashtags help attract more local followers.' },
    { q: 'Should I run Instagram ads to get nail clients?', a: 'Organic comes first — if your profile isn\'t converting organic traffic, paid ads won\'t fix that. Once your profile is optimised and your organic content is working, location-targeted Instagram ads can amplify what\'s already working.' },
  ],
  relatedFeatureSlugs: ['instagram-autodm', 'link-in-bio', 'audience-capture'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="the-conversion-gap">
        <h2 className="font-serif text-2xl font-bold mb-4">The follower-to-client gap</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Having 5,000 followers and an empty appointment book is one of the most frustrating positions a nail tech can be in. The content is working — people are watching, liking, saving. But the bookings aren't coming.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">This gap almost always comes down to three things:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li><strong>Wrong audience:</strong> Your followers admire your work but aren't local — they can't book you</li>
          <li><strong>Unclear next step:</strong> Visitors don't immediately understand how to book</li>
          <li><strong>Booking friction:</strong> The booking process requires too many steps</li>
        </ol>
        <ArticleCallout variant="info" title="Diagnose before you fix">
          Open Instagram Insights → Audience → Top Cities. If your audience is mostly in cities you don't serve, you have a reach problem (attracting wrong audience) not a conversion problem. The fixes are different.
        </ArticleCallout>
      </section>

      <section id="profile-fix">
        <h2 className="font-serif text-2xl font-bold mb-4">Fixing your profile for conversion</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A profile optimised for likes is different from a profile optimised for bookings. The changes needed:</p>
        <ArticleTable
          headers={['Element', 'Likes-optimised', 'Bookings-optimised']}
          rows={[
            ['Name field', 'Just your name', '"Your Name | Nail Tech Manchester"'],
            ['Bio', 'Aesthetic description of your style', '"Taking new clients | Book via link below"'],
            ['Link', 'General Linktree', 'Direct booking page link'],
            ['Highlights', 'Inspo, trends, personal', 'Portfolio, Pricing, How to Book'],
            ['Post captions', '"Obsessed with this set 😍"', '"Book this look via link in bio | [city] nail tech"'],
          ]}
        />
        <ArticleTip>Your bio has one job: tell someone who's never seen you before that you're a nail tech in [city] and they can book via the link below. Nothing else needs to be in the bio.</ArticleTip>
      </section>

      <section id="content-for-local-clients">
        <h2 className="font-serif text-2xl font-bold mb-4">Content that attracts local clients</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If your followers aren't local, the problem is at the top of the funnel — you're attracting the wrong audience. Shifts that attract local followers:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Location tags on every post</strong> — tag your city and specific area</li>
          <li><strong>Location-based hashtags</strong> — #LondonNailTech, #ManchesterNails, not just #NailsOfInstagram</li>
          <li><strong>Mention your location in captions</strong> — "Nail tech in [area]" in the first line of captions</li>
          <li><strong>Collaborate with local businesses</strong> — tag local coffee shops, boutiques, salons in your area when you create content featuring their products or spaces</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For more content strategy: <Link to="/learn/nail-content-that-gets-bookings" className="underline text-[#F52B8C]">Nail content that gets bookings</Link>.</p>
      </section>

      <section id="non-local-followers">
        <h2 className="font-serif text-2xl font-bold mb-4">What to do about non-local followers</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Non-local followers who love your work aren't useless — they just can't book you directly. They can still:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Boost your reach through likes and shares (which helps with the algorithm)</li>
          <li>Refer friends in your area who are looking for a nail tech</li>
          <li>Buy future products if you ever sell nail art resources, tutorials, or nail products</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">Don't worry about non-local followers — just make sure you're also attracting local ones alongside them.</p>
      </section>

      <section id="booking-friction">
        <h2 className="font-serif text-2xl font-bold mb-4">Removing booking friction</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Even with local followers and a clear bio, you'll lose bookings to friction in the booking process. The most common friction points:</p>
        <ArticleTable
          headers={['Friction point', 'Fix']}
          rows={[
            ['Booking via DMs — multiple steps, delays', 'Set up an online booking page with direct link in bio'],
            ['Can\'t see prices on booking page', 'Add full pricing to your service menu'],
            ['Booking page doesn\'t work on mobile', 'Test your booking page on your phone before directing clients there'],
            ['Deposit required but process is unclear', 'Make deposit collection automatic and explain it upfront'],
            ['No availability shown — looks fully booked', 'Check your calendar settings; open more slots if possible'],
          ]}
        />
      </section>

      <section id="nurturing">
        <h2 className="font-serif text-2xl font-bold mb-4">Nurturing followers into clients</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Some followers take time to convert. They follow you for months, save your posts, and book when the moment is right (new job, special occasion, finally treating themselves). You can accelerate this:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Post availability reminders regularly: "A few slots open this week"</li>
          <li>Use Stories polls: "Have you been thinking about getting your nails done?" — it's a nudge</li>
          <li>Share client transformation stories: "X came in wanting a change — here's what we did"</li>
          <li>Show the booking process is easy: occasionally post a 30-second reel of how quick online booking is</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
