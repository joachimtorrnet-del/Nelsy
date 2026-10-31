import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: '100-nail-tech-content-ideas',
  title: '100 Nail Tech Content Ideas for Instagram',
  seoTitle: '100 Nail Tech Content Ideas for Instagram (2026)',
  excerpt: 'Never run out of content ideas again. 100 post ideas for nail techs — organised by type, with tips on which formats convert best.',
  seoDescription: '100 nail tech content ideas for Instagram: portfolio posts, Reels, educational content, booking CTAs, behind the scenes, and more. Never post a blank again.',
  category: 'instagram-content',
  tags: ['content ideas', 'Instagram', 'nail tech content', 'social media'],
  heroImage: 'linear-gradient(135deg, #FFFBEB 0%, #FDE68A 100%)',
  heroImageAlt: '100 nail tech content ideas for Instagram',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'portfolio', label: 'Portfolio posts (1–20)' },
    { id: 'reels', label: 'Reels and video (21–40)' },
    { id: 'educational', label: 'Educational and tips (41–55)' },
    { id: 'business', label: 'Business and booking (56–70)' },
    { id: 'seasonal', label: 'Seasonal and trending (71–85)' },
    { id: 'personal', label: 'Personal and behind the scenes (86–100)' },
  ],
  relatedSlugs: ['50-instagram-reel-ideas-for-nail-techs', 'nail-content-that-gets-bookings', 'best-instagram-bio-ideas-for-nail-techs'],
  faq: [
    { q: 'How often should a nail tech post on Instagram?', a: 'The sweet spot is 3–5 times per week. Consistency matters more than frequency — it\'s better to post 3 times reliably every week than to post 10 times in one week and then go quiet for two weeks. Instagram\'s algorithm rewards regular activity.' },
    { q: 'What types of nail content get the most engagement?', a: 'Reels consistently get the most reach on Instagram. For engagement (comments, saves), before/afters and educational content tend to perform well. For bookings specifically, availability posts, portfolio photos, and content with clear booking CTAs convert best.' },
    { q: 'Should nail techs show their face on Instagram?', a: 'Showing your face builds trust and connection, which helps convert followers into bookings. It\'s not required — plenty of nail techs build successful booking businesses without showing their face. But if you\'re comfortable with it, even occasional behind-the-scenes or "day in my life" content helps clients feel they know you.' },
  ],
  relatedFeatureSlugs: ['instagram-autodm', 'link-in-bio', 'audience-capture'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="tip" title="How to use this list">
        Don't try to do all 100. Pick 5–10 that feel natural for you and rotate through them. Add a booking CTA to at least every third post.
      </ArticleCallout>

      <section id="portfolio">
        <h2 className="font-serif text-2xl font-bold mb-4">Portfolio posts (1–20)</h2>
        <ol start={1} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Full hand shot of a set you're proud of</li>
          <li>Close-up of nail art detail (one nail, macro)</li>
          <li>Before/after transformation</li>
          <li>Client's first gel set vs their 6-month progression</li>
          <li>A set recreated from inspo the client brought</li>
          <li>Your most requested design this month</li>
          <li>A set for a special occasion (wedding, birthday, job interview)</li>
          <li>Short/bitten nails transformation</li>
          <li>Most complex nail art you've done recently</li>
          <li>A simple, minimal set that shows clean technique</li>
          <li>Your favourite colour combination right now</li>
          <li>Client requested "something different" — here's what you did</li>
          <li>A set using only 2 colours</li>
          <li>Gel extension length comparison (short/medium/long)</li>
          <li>Nail shapes comparison on one hand</li>
          <li>A "matching set" for two friends who came together</li>
          <li>Holiday/occasion nails</li>
          <li>Your most recent set (just posted, fresh)</li>
          <li>A set from 6 months ago vs today (skill comparison)</li>
          <li>A set from a client who travels to see you</li>
        </ol>
      </section>

      <section id="reels">
        <h2 className="font-serif text-2xl font-bold mb-4">Reels and video (21–40)</h2>
        <ol start={21} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>30-second gel set time-lapse</li>
          <li>Nail art application close-up (mesmerising)</li>
          <li>Before/after with satisfying reveal</li>
          <li>"Day in my life" as a nail tech</li>
          <li>How I prep for a client day</li>
          <li>Behind the scenes: setting up your station</li>
          <li>Nail art tutorial (even a simple one)</li>
          <li>"What I wish clients knew before their appointment"</li>
          <li>The difference between a £30 and £60 set (showing technique)</li>
          <li>Client reaction to their finished nails</li>
          <li>My nail product favourites this month</li>
          <li>Packing up my kit after a session</li>
          <li>Gel removal and fresh set transition</li>
          <li>A trend you're seeing a lot of this season</li>
          <li>Your workspace tour</li>
          <li>POV: being your own boss as a nail tech</li>
          <li>This week's sets in 60 seconds</li>
          <li>Nail art I've been inspired to recreate</li>
          <li>A client's nail journey over 6 months</li>
          <li>"Things that happen at every nail appointment"</li>
        </ol>
        <p className="text-gray-700 mt-4 leading-relaxed">For 50 more Reel-specific ideas: <Link to="/learn/50-instagram-reel-ideas-for-nail-techs" className="underline text-[#F52B8C]">50 Instagram Reel ideas for nail techs</Link>.</p>
      </section>

      <section id="educational">
        <h2 className="font-serif text-2xl font-bold mb-4">Educational and tips (41–55)</h2>
        <ol start={41} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>"How to make your gel nails last longer"</li>
          <li>"Gel vs acrylic — what's the difference?"</li>
          <li>"Why your nails might be lifting (and how to prevent it)"</li>
          <li>"How to remove gel nails safely at home if you must"</li>
          <li>"What to tell your nail tech about your lifestyle before booking"</li>
          <li>Signs your nails need a break</li>
          <li>"What infills are and when you need them"</li>
          <li>How to care for your nails between appointments</li>
          <li>The best nail shapes for short fingers</li>
          <li>The best nail shapes for bitten/short nails</li>
          <li>How to pick a nail colour that suits your skin tone</li>
          <li>"Why I use [product] and not [alternative]"</li>
          <li>The tools in my kit — what each one does</li>
          <li>"How I learned nail art — my journey"</li>
          <li>"What to expect from your first nail appointment"</li>
        </ol>
      </section>

      <section id="business">
        <h2 className="font-serif text-2xl font-bold mb-4">Business and booking (56–70)</h2>
        <ol start={56} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>"I have slots open this week — link in bio to book"</li>
          <li>New month, new availability — showing calendar</li>
          <li>"How to book with me: a quick guide"</li>
          <li>Price list update or new service announcement</li>
          <li>"Why I take a deposit for every booking"</li>
          <li>"What my cancellation policy is and why it exists"</li>
          <li>A client review or testimonial (screenshot or voiceover)</li>
          <li>"Why I moved to online booking"</li>
          <li>Booking reminder: "Christmas slots filling up fast"</li>
          <li>Last-minute cancellation: "Slot available tomorrow"</li>
          <li>New service launch</li>
          <li>Anniversary post: "X years doing nails — here's what I've learned"</li>
          <li>Behind the scenes of running a nail business</li>
          <li>My busiest day ever as a nail tech</li>
          <li>"Questions to ask before booking a nail tech"</li>
        </ol>
      </section>

      <section id="seasonal">
        <h2 className="font-serif text-2xl font-bold mb-4">Seasonal and trending (71–85)</h2>
        <ol start={71} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Spring nail trends this year</li>
          <li>Summer nail colour predictions</li>
          <li>Autumn/fall nail aesthetic sets</li>
          <li>Christmas and festive nail designs</li>
          <li>Valentine's Day nail ideas</li>
          <li>Wedding season nail inspo</li>
          <li>"What everyone is booking right now"</li>
          <li>Your take on a viral nail trend</li>
          <li>"The trend I love" vs "the trend I don't"</li>
          <li>Summer holiday nails (pedicure season)</li>
          <li>Back-to-school nail sets for teens</li>
          <li>New Year nails: fresh start sets</li>
          <li>"The colour of the season" inspired set</li>
          <li>Celebrity nail look recreation</li>
          <li>Your own seasonal colour predictions</li>
        </ol>
        <ArticleTip>Trend content gets reach; portfolio content converts. Use trends to grow your audience, then portfolio + availability posts to convert them to bookings.</ArticleTip>
      </section>

      <section id="personal">
        <h2 className="font-serif text-2xl font-bold mb-4">Personal and behind the scenes (86–100)</h2>
        <ol start={86} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Why you became a nail tech</li>
          <li>Your own nails (what do you wear?)</li>
          <li>Your workstation aesthetic</li>
          <li>Music you play while doing nails</li>
          <li>"This week I learned [technique]"</li>
          <li>A training course you completed</li>
          <li>The hardest nail design you've ever attempted</li>
          <li>"Things I wish I'd known when I started"</li>
          <li>Your favourite product of the month</li>
          <li>How you organise your kit</li>
          <li>A fail (and what you learned)</li>
          <li>Reaching a milestone: 100 clients, 1 year in business</li>
          <li>Your nail journey in photos (then vs now)</li>
          <li>A thank-you to your regulars</li>
          <li>"This is why I love my job"</li>
        </ol>
        <p className="text-gray-700 mt-4 leading-relaxed">For more on Instagram growth strategy: <Link to="/learn/how-to-grow-nail-tech-instagram" className="underline text-[#F52B8C]">How to grow your nail tech Instagram</Link>.</p>
      </section>
    </div>
  ),
});
export {};
