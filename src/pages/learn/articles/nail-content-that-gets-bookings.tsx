import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-content-that-gets-bookings',
  title: 'Nail Content That Gets Bookings (Not Just Likes)',
  seoTitle: 'Nail Content That Gets Bookings (Not Just Likes)',
  excerpt: 'Most nail content is created to get likes. Content that gets bookings requires a different approach. Here\'s exactly what to post and why.',
  seoDescription: 'What nail content actually gets bookings on Instagram. The difference between viral content and booking-generating content — and how to do both.',
  category: 'instagram-content',
  tags: ['nail content', 'Instagram strategy', 'content that converts', 'nail bookings'],
  heroImage: 'linear-gradient(135deg, #FFF7ED 0%, #FCA5A5 100%)',
  heroImageAlt: 'Nail content that gets bookings',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'likes-vs-bookings', label: 'Likes content vs bookings content' },
    { id: 'booking-content-types', label: 'Content types that generate bookings' },
    { id: 'captions-that-convert', label: 'Captions that convert' },
    { id: 'portfolio-photography', label: 'Portfolio photography that sells' },
    { id: 'mixing-it', label: 'Mixing it into a content strategy' },
  ],
  relatedSlugs: ['100-nail-tech-content-ideas', 'why-nail-page-gets-likes-but-no-bookings', 'how-to-grow-nail-tech-instagram'],
  faq: [
    { q: 'Should I show my prices in Instagram posts?', a: 'Not necessarily in every post, but make prices easy to find. A "Pricing" highlight, your booking page in your bio, or occasional posts that mention your starting prices all work. Clients who can\'t find your prices often don\'t ask — they just book someone else.' },
    { q: 'What time of day should nail techs post on Instagram?', a: 'For UK nail techs, evening posts (6–9pm) tend to get the most immediate engagement. Weekend mornings (Saturday/Sunday 9–11am) also perform well when clients are relaxed and scrolling. That said, consistency matters more than optimal timing — post when you can reliably post.' },
    { q: 'Is it worth paying for Instagram promotion as a nail tech?', a: 'Only once your organic content is already working. Paid promotion amplifies what\'s already converting. If your profile isn\'t set up to convert visitors into bookings organically, paid ads won\'t fix that — they\'ll just send more people to a page that doesn\'t convert.' },
  ],
  relatedFeatureSlugs: ['instagram-autodm', 'bookings', 'link-in-bio'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="likes-vs-bookings">
        <h2 className="font-serif text-2xl font-bold mb-4">Likes content vs bookings content</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Most nail content on Instagram is optimised for likes — aspirational, aesthetic, trend-driven content that people tap "heart" on as they scroll. That content builds a following. It doesn't necessarily build a client base.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">Bookings content serves a different purpose: it convinces a specific, local person that you're the right nail tech for them and tells them exactly what to do next.</p>
        <ArticleTable
          headers={['Likes content', 'Bookings content']}
          rows={[
            ['Viral nail art aimed at global reach', 'Portfolio photos showing what clients actually get'],
            ['"Obsessed with this set 😍" caption', '"Gel full set in [location] — book via link in bio"'],
            ['No location, no CTA', 'Location tag, city mention, booking link'],
            ['Targets nail enthusiasts everywhere', 'Targets local clients specifically'],
            ['Builds followers', 'Converts followers into bookings'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">Both types have value. Likes content builds your audience; bookings content converts it. The mistake is doing only one.</p>
      </section>

      <section id="booking-content-types">
        <h2 className="font-serif text-2xl font-bold mb-4">Content types that generate bookings</h2>
        <ArticleTable
          headers={['Content type', 'Why it converts', 'Example']}
          rows={[
            ['Before/after transformation', 'Shows skill + relatable starting point', '"From bitten nails to gel extensions"'],
            ['Your most popular designs', 'Shows what clients consistently love and book', '"My most requested set this month"'],
            ['Availability posts', 'Direct conversion: follower → booking', '"Slots open this week — link in bio"'],
            ['Price/service explanation', 'Answers the #1 pre-booking question', '"Gel full set: £X, 90 mins, includes..."'],
            ['Client testimonials/reactions', 'Social proof from real people', '"Client has been coming for 2 years..."'],
            ['What to expect content', 'Reduces booking anxiety for first-timers', '"Your first appointment: here\'s what happens"'],
          ]}
        />
        <ArticleCallout variant="tip" title="The availability post is underrated">
          A simple "I have a few slots open this week — link in bio" story or post converts more directly than almost any other content type. Your existing engaged followers just need a push. Post one every week.
        </ArticleCallout>
      </section>

      <section id="captions-that-convert">
        <h2 className="font-serif text-2xl font-bold mb-4">Captions that convert</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Most nail tech captions are purely descriptive: "Obsessed with this set ✨" or "Client wanted something different." These captions don't convert because they don't tell the viewer what to do next.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">A booking-optimised caption structure:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li><strong>Describe the set</strong> (what it is, any notable technique)</li>
          <li><strong>Location mention</strong> (e.g. "East London nail tech")</li>
          <li><strong>Call to action</strong> ("Book via link in bio" or "I have availability this week")</li>
          <li><strong>Hashtags</strong> (location + service-specific, 5–10)</li>
        </ol>
        <ArticleTip>The CTA doesn't need to be in every post — but it should be in at least every third post. An account that posts portfolio content but never tells followers how to book is leaving conversions on the table.</ArticleTip>
      </section>

      <section id="portfolio-photography">
        <h2 className="font-serif text-2xl font-bold mb-4">Portfolio photography that sells</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your portfolio photos are your primary conversion tool. What makes a nail photo convincing enough to book:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Clean nails:</strong> Lotion on the hand, dust removed, skin not irritated from the appointment</li>
          <li><strong>Good light:</strong> Natural light or a ring light — no warm kitchen lighting that makes everything look yellow</li>
          <li><strong>Multiple angles:</strong> One full hand + close-ups of individual nails or the most detailed part</li>
          <li><strong>Real client hands:</strong> Perfect model hands aren't necessary — most clients prefer seeing realistic hands that look like theirs</li>
          <li><strong>Consistent style:</strong> Similar background, framing, and lighting across your portfolio makes your feed look intentional</li>
        </ul>
      </section>

      <section id="mixing-it">
        <h2 className="font-serif text-2xl font-bold mb-4">Mixing it into a content strategy</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A practical content rotation for a working nail tech posting 4–5 times per week:</p>
        <ArticleTable
          headers={['Post', 'Type']}
          rows={[
            ['Monday', 'Portfolio photo from last week\'s sets'],
            ['Wednesday', 'Reel: before/after or process video'],
            ['Friday', 'Portfolio + booking CTA ("I have availability next week")'],
            ['Saturday', 'Story: availability for the coming week + link to booking page'],
            ['(Optional) Sunday', 'Inspo/personal content or a repeat of best-performing post'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">Adjust for your actual schedule. The important thing is the CTA-to-content ratio — at least one booking CTA for every 3 pieces of pure portfolio content.</p>
        <p className="text-gray-700 mt-4 leading-relaxed">See: <Link to="/learn/100-nail-tech-content-ideas" className="underline text-[#F52B8C]">100 nail tech content ideas</Link> for more.</p>
      </section>
    </div>
  ),
});
export {};
