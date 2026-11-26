import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

const link = 'underline text-[#F52B8C]';

registerArticle({
  slug: '100-nail-tech-content-ideas',
  title: '100 Nail Tech Content Ideas for Instagram',
  seoTitle: '100 Nail Tech Content Ideas for Instagram (2026)',
  excerpt: 'Never run out of content ideas again. 100 post ideas for nail techs, organised by type, with tips on which formats convert best.',
  seoDescription: '100 nail tech content ideas for Instagram: portfolio posts, Reels, educational content, booking CTAs, behind the scenes, and more. Never post a blank again.',
  category: 'instagram-content',
  tags: ['content ideas', 'Instagram', 'nail tech content', 'social media'],
  heroImage: 'linear-gradient(135deg, #FFFBEB 0%, #FDE68A 100%)',
  heroImageAlt: '100 nail tech content ideas for Instagram',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  updatedAt: '2026-11-26',
  tldr: {
    answer: 'Pick one idea from each category every week: two portfolio posts, one Reel, one educational post and one booking post cover almost everything a nail tech needs.',
    detail: 'The 100 ideas are grouped by job: portfolio and Reels attract new followers, education builds trust, and booking posts turn followers into appointments. Rotate categories so your feed is never all selling or all pretty pictures.',
    points: [
      { label: 'Reach', text: 'Reels and trend posts (ideas 21 to 40 and 71 to 85).' },
      { label: 'Trust', text: 'Educational and behind-the-scenes posts (41 to 55 and 86 to 100).' },
      { label: 'Bookings', text: 'Portfolio plus availability posts with a clear CTA (1 to 20 and 56 to 70).' },
    ],
  },
  toc: [
    { id: 'weekly-plan', label: 'A simple weekly plan using this list' },
    { id: 'portfolio', label: 'Portfolio posts (1–20)' },
    { id: 'reels', label: 'Reels and video (21–40)' },
    { id: 'educational', label: 'Educational and tips (41–55)' },
    { id: 'business', label: 'Business and booking (56–70)' },
    { id: 'seasonal', label: 'Seasonal and trending (71–85)' },
    { id: 'personal', label: 'Personal and behind the scenes (86–100)' },
  ],
  relatedSlugs: ['50-instagram-reel-ideas-for-nail-techs', 'nail-content-that-gets-bookings', 'best-instagram-bio-ideas-for-nail-techs'],
  faq: [
    { q: 'How often should a nail tech post on Instagram?', a: 'Aim for 3 to 5 posts a week plus Stories on the days you work. Consistency matters more than volume: 3 posts every week beats 10 posts one week and silence for the next two. If you only have time for 3, make them one portfolio post, one Reel and one booking post.' },
    { q: 'What types of nail content get the most engagement?', a: 'Reels are the main format for reaching people who don\'t follow you yet. Before/afters and educational posts tend to get saves and comments. For bookings, availability posts and portfolio photos with a clear CTA do the work. Check your own Insights every month, because your audience may behave differently.' },
    { q: 'Should nail techs show their face on Instagram?', a: 'It helps, but it is not required. Clients are trusting you with their hands and their time, so seeing who you are makes booking feel safer. If you prefer not to, use your voice in Reels, show your workspace, and write captions in the first person. Even one face-to-camera Story a week helps.' },
  ],
  relatedFeatureSlugs: ['instagram-autodm', 'link-in-bio', 'audience-capture'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="tip" title="How to use this list">
        Don&apos;t try to do all 100. Pick 5 to 10 that feel natural for you and rotate through them using the weekly plan below. Add a booking CTA to at least every third post.
      </ArticleCallout>

      <section id="weekly-plan">
        <h2 className="font-serif text-2xl font-bold mb-4">A simple weekly plan using this list</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Five posts a week is a realistic target for a working nail tech. Here is one way to fill them from the list:</p>
        <ArticleTable
          headers={['Day', 'Post type', 'Example from the list', 'CTA']}
          rows={[
            ['Monday', 'Booking', '#57 New month, new availability', 'Link in bio to book'],
            ['Tuesday', 'Reel', '#21 30-second gel set time-lapse', 'Save for your next appointment'],
            ['Wednesday', 'Educational', '#41 How to make your gel nails last longer', 'Comment a question'],
            ['Friday', 'Portfolio', '#3 Before/after transformation', 'DM me BOOK'],
            ['Sunday', 'Personal', '#86 Why you became a nail tech', 'None, just connect'],
          ]}
        />
        <ArticleCallout variant="info" title="Example: how long this list lasts">
          Example: at 5 posts a week, 100 ideas last 100 ÷ 5 = 20 weeks, about 5 months. Most ideas can be repeated with a new set (a new before/after, a new time-lapse), so in practice the list never runs out.
        </ArticleCallout>
        <ArticleTip>Shoot in batches: photograph every set on a bright day and film one time-lapse a week, and you will have a month of portfolio and Reel posts ready. More in <Link to="/blog/how-to-batch-nail-content" className={link}>how to batch nail content</Link>.</ArticleTip>
      </section>

      <section id="portfolio">
        <h2 className="font-serif text-2xl font-bold mb-4">Portfolio posts (1–20)</h2>
        <ol start={1} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Full hand shot of a set you&apos;re proud of</li>
          <li>Close-up of nail art detail (one nail, macro)</li>
          <li>Before/after transformation</li>
          <li>Client&apos;s first gel set vs their 6-month progression</li>
          <li>A set recreated from inspo the client brought</li>
          <li>Your most requested design this month</li>
          <li>A set for a special occasion (wedding, birthday, job interview)</li>
          <li>Short/bitten nails transformation</li>
          <li>Most complex nail art you&apos;ve done recently</li>
          <li>A simple, minimal set that shows clean technique</li>
          <li>Your favourite colour combination right now</li>
          <li>Client requested &quot;something different&quot;: here&apos;s what you did</li>
          <li>A set using only 2 colours</li>
          <li>Gel extension length comparison (short/medium/long)</li>
          <li>Nail shapes comparison on one hand</li>
          <li>A &quot;matching set&quot; for two friends who came together</li>
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
          <li>&quot;Day in my life&quot; as a nail tech</li>
          <li>How I prep for a client day</li>
          <li>Behind the scenes: setting up your station</li>
          <li>Nail art tutorial (even a simple one)</li>
          <li>&quot;What I wish clients knew before their appointment&quot;</li>
          <li>What a basic set vs a premium set includes (showing technique)</li>
          <li>Client reaction to their finished nails (with permission)</li>
          <li>My nail product favourites this month</li>
          <li>Packing up my kit after a session</li>
          <li>Gel removal and fresh set transition</li>
          <li>A trend you&apos;re seeing a lot of this season</li>
          <li>Your workspace tour</li>
          <li>POV: being your own boss as a nail tech</li>
          <li>This week&apos;s sets in 60 seconds</li>
          <li>Nail art I&apos;ve been inspired to recreate</li>
          <li>A client&apos;s nail journey over 6 months</li>
          <li>&quot;Things that happen at every nail appointment&quot;</li>
        </ol>
        <p className="text-gray-700 mt-4 leading-relaxed">For 50 more Reel-specific ideas: <Link to="/blog/50-instagram-reel-ideas-for-nail-techs" className={link}>50 Instagram Reel ideas for nail techs</Link>.</p>
      </section>

      <section id="educational">
        <h2 className="font-serif text-2xl font-bold mb-4">Educational and tips (41–55)</h2>
        <ol start={41} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>&quot;How to make your gel nails last longer&quot;</li>
          <li>&quot;Gel vs acrylic: what&apos;s the difference?&quot;</li>
          <li>&quot;Why your nails might be lifting (and how to prevent it)&quot;</li>
          <li>&quot;How to remove gel nails safely at home if you must&quot;</li>
          <li>&quot;What to tell your nail tech about your lifestyle before booking&quot;</li>
          <li>Signs your nails need a break</li>
          <li>&quot;What infills are and when you need them&quot;</li>
          <li>How to care for your nails between appointments</li>
          <li>The best nail shapes for short fingers</li>
          <li>The best nail shapes for bitten/short nails</li>
          <li>How to pick a nail colour that suits your skin tone</li>
          <li>&quot;Why I use [product] and not [alternative]&quot;</li>
          <li>The tools in my kit and what each one does</li>
          <li>&quot;How I learned nail art: my journey&quot;</li>
          <li>&quot;What to expect from your first nail appointment&quot;</li>
        </ol>
      </section>

      <section id="business">
        <h2 className="font-serif text-2xl font-bold mb-4">Business and booking (56–70)</h2>
        <ol start={56} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>&quot;I have slots open this week, link in bio to book&quot;</li>
          <li>New month, new availability: show your calendar</li>
          <li>&quot;How to book with me: a quick guide&quot;</li>
          <li>Price list update or new service announcement</li>
          <li>&quot;Why I take a deposit for every booking&quot;</li>
          <li>&quot;What my cancellation policy is and why it exists&quot;</li>
          <li>A real client review (screenshot with permission, or voiceover)</li>
          <li>&quot;Why I moved to online booking&quot;</li>
          <li>Booking reminder: &quot;Christmas slots filling up fast&quot;</li>
          <li>Last-minute cancellation: &quot;Slot available tomorrow&quot;</li>
          <li>New service launch</li>
          <li>Anniversary post: &quot;X years doing nails: here&apos;s what I&apos;ve learned&quot;</li>
          <li>Behind the scenes of running a nail business</li>
          <li>My busiest day ever as a nail tech</li>
          <li>&quot;Questions to ask before booking a nail tech&quot;</li>
        </ol>
      </section>

      <section id="seasonal">
        <h2 className="font-serif text-2xl font-bold mb-4">Seasonal and trending (71–85)</h2>
        <ol start={71} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Spring nail trends this year</li>
          <li>Summer nail colour predictions</li>
          <li>Autumn/fall nail aesthetic sets</li>
          <li>Christmas and festive nail designs</li>
          <li>Valentine&apos;s Day nail ideas</li>
          <li>Wedding season nail inspo</li>
          <li>&quot;What everyone is booking right now&quot;</li>
          <li>Your take on a viral nail trend</li>
          <li>&quot;The trend I love&quot; vs &quot;the trend I don&apos;t&quot;</li>
          <li>Summer holiday nails (pedicure season)</li>
          <li>Back-to-school nail sets for teens</li>
          <li>New Year nails: fresh start sets</li>
          <li>&quot;The colour of the season&quot; inspired set</li>
          <li>Celebrity nail look recreation</li>
          <li>Your own seasonal colour predictions</li>
        </ol>
        <ArticleTip>Trend content gets reach; portfolio content converts. Use trends to grow your audience, then portfolio and availability posts to turn them into bookings.</ArticleTip>
      </section>

      <section id="personal">
        <h2 className="font-serif text-2xl font-bold mb-4">Personal and behind the scenes (86–100)</h2>
        <ol start={86} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Why you became a nail tech</li>
          <li>Your own nails (what do you wear?)</li>
          <li>Your workstation aesthetic</li>
          <li>Music you play while doing nails</li>
          <li>&quot;This week I learned [technique]&quot;</li>
          <li>A training course you completed</li>
          <li>The hardest nail design you&apos;ve ever attempted</li>
          <li>&quot;Things I wish I&apos;d known when I started&quot;</li>
          <li>Your favourite product of the month</li>
          <li>How you organise your kit</li>
          <li>A fail (and what you learned)</li>
          <li>Reaching a milestone: 100 clients, 1 year in business</li>
          <li>Your nail journey in photos (then vs now)</li>
          <li>A thank-you to your regulars</li>
          <li>&quot;This is why I love my job&quot;</li>
        </ol>
        <p className="text-gray-700 mt-4 leading-relaxed">To see which of these perform best on your account, compare posts with the <Link to="/tools/instagram-engagement-calculator" className={link}>Instagram engagement calculator</Link>. For growth strategy: <Link to="/blog/how-to-grow-nail-tech-instagram" className={link}>how to grow your nail tech Instagram</Link>.</p>
      </section>
    </div>
  ),
});
export {};
