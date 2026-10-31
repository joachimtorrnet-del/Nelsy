import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-content-calendar-30-day',
  title: 'How to Create a 30-Day Nail Tech Content Calendar',
  seoTitle: 'How to Create a 30-Day Nail Tech Content Calendar',
  excerpt: 'A content calendar removes the daily "what do I post?" stress and helps you stay consistent without scrambling. Here\'s how to build one that actually works for a busy nail tech.',
  seoDescription: 'How to create a 30-day nail tech content calendar. Content mix, posting schedule, planning your content categories, and a week-by-week framework you can follow.',
  category: 'instagram-content',
  tags: ['nail tech content calendar', 'nail tech social media planning', 'nail tech instagram schedule', 'nail tech content ideas'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #BBF7D0 100%)',
  heroImageAlt: 'How to create a nail tech content calendar',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-plan', label: 'Why plan your content' },
    { id: 'content-mix', label: 'The right content mix' },
    { id: 'content-categories', label: 'Content categories for nail techs' },
    { id: 'posting-frequency', label: 'Posting frequency' },
    { id: 'building-calendar', label: 'Building your 30-day calendar' },
    { id: 'batching', label: 'Batching content to save time' },
  ],
  relatedSlugs: ['tiktok-ideas-nail-techs', 'how-to-batch-nail-content', 'nail-tech-call-to-action-examples', 'how-to-get-nail-clients-from-tiktok'],
  faq: [
    { q: 'How many times a week should a nail tech post?', a: 'For Instagram feed: 3–5 times per week is a good sustainable target. For Stories: daily if possible, even just a simple story (appointment update, behind the scenes, repost). For TikTok: 3–5 times per week. The most important factor is consistency over weeks and months — posting 5 times a week for a month, then nothing for three weeks, hurts more than posting 3 times consistently every week.' },
    { q: 'Do I need a professional camera to post good content?', a: 'No. Most nail tech content that performs well is filmed on a phone in natural light. What matters more than camera quality: sharp focus on the nails, good natural light (near a window), a neutral background, and stable video (prop your phone rather than hand-holding). A phone with a decent camera, natural light, and a simple phone stand is all you need to start.' },
    { q: 'Should I plan my content in advance or post spontaneously?', a: 'A mix works best. Plan the structural content — your availability announcements, educational posts, service showcases — in advance. Leave room for spontaneous content when a set comes out beautifully, when something interesting happens at work, or when a trend appears you can jump on. The planned content gives you consistency; the spontaneous content gives you authenticity.' },
  ],
  relatedFeatureSlugs: ['instagram-autodm', 'link-in-bio'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-plan">
        <h2 className="font-serif text-2xl font-bold mb-4">Why plan your content</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Without a plan, content creation happens reactively — you post when you remember to, go quiet when life gets busy, and end up with an inconsistent presence that's hard for the algorithm and potential clients to trust.</p>
        <p className="text-gray-700 leading-relaxed">A 30-day content calendar doesn't need to be rigid. It's a framework: you know roughly what you're posting and when, so you're not making that decision every morning before a full day of clients. The planning shifts from daily stress to a weekly habit.</p>
      </section>

      <section id="content-mix">
        <h2 className="font-serif text-2xl font-bold mb-4">The right content mix</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A healthy nail tech content mix balances four purposes:</p>
        <ArticleTable
          headers={['Content type', 'Purpose', 'Rough %']}
          rows={[
            ['Portfolio / work showcase', 'Show what you can do — your best sets', '40%'],
            ['Educational / valuable', 'Build trust and attract new followers (nails care tips, "how to" for clients)', '25%'],
            ['Business / booking', 'Convert followers to clients (availability, CTAs, pricing, new services)', '20%'],
            ['Personal / behind the scenes', 'Build connection and likability (day-in-life, client moments, your story)', '15%'],
          ]}
        />
        <ArticleTip>This is a starting point, not a rule. A nail tech with a full schedule may skew away from booking content. One building their client base may skew toward it.</ArticleTip>
      </section>

      <section id="content-categories">
        <h2 className="font-serif text-2xl font-bold mb-4">Content categories for nail techs</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Set showcase:</strong> Your best nail sets — clean photos, variety of styles</li>
          <li><strong>Process / technique:</strong> Application video, shaping, nail art in progress</li>
          <li><strong>Transformation:</strong> Before/after, damaged to beautiful, plain to art</li>
          <li><strong>Inspo / trend:</strong> Nail designs you're loving, seasonal content, trending styles</li>
          <li><strong>Educational (client-facing):</strong> Aftercare tips, "don't do this before your appointment," nail shape guide</li>
          <li><strong>Availability / booking:</strong> Open slots, new service announcement, booking reminders</li>
          <li><strong>Behind the scenes:</strong> Prep, kit setup, day in the life, product unboxing</li>
          <li><strong>Social proof:</strong> Client reactions, review screenshots (with permission), before/after results</li>
        </ul>
      </section>

      <section id="posting-frequency">
        <h2 className="font-serif text-2xl font-bold mb-4">Posting frequency</h2>
        <ArticleTable
          headers={['Platform', 'Sustainable frequency']}
          rows={[
            ['Instagram feed (posts/reels)', '3–5 per week'],
            ['Instagram Stories', 'Daily or near-daily (quick content is fine)'],
            ['TikTok', '3–5 per week'],
            ['Facebook (if using)', '2–3 per week, repurposed from Instagram'],
          ]}
        />
        <ArticleCallout variant="info" title="Don't spread too thin">
          If you're starting out, pick one platform and do it well before adding another. Instagram first — the audience is there, the tools for nail content are strong, and you can repurpose to TikTok without much extra work.
        </ArticleCallout>
      </section>

      <section id="building-calendar">
        <h2 className="font-serif text-2xl font-bold mb-4">Building your 30-day calendar</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Week-by-week structure for a 4-posts-per-week Instagram plan:</p>
        <ArticleTable
          headers={['Week', 'Focus', 'Example posts']}
          rows={[
            ['Week 1', 'Portfolio + booking', 'Mon: set showcase | Wed: process video | Fri: availability CTA | Sun: transformation'],
            ['Week 2', 'Education + personal', 'Mon: nail care tip | Wed: set showcase | Fri: behind the scenes | Sun: educational'],
            ['Week 3', 'Portfolio + social proof', 'Mon: set showcase | Wed: client reaction/review | Fri: booking CTA | Sun: nail art process'],
            ['Week 4', 'Trend + business', 'Mon: seasonal inspo | Wed: set showcase | Fri: new service or price list reminder | Sun: process'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">This is a template — replace any slot with something that fits the week. If you had a particularly beautiful set on Thursday, post it on Friday instead of what was planned.</p>
      </section>

      <section id="batching">
        <h2 className="font-serif text-2xl font-bold mb-4">Batching content to save time</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Creating content throughout the week is exhausting. Batching — creating multiple pieces of content in one session — is much more efficient:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Take all your nail photos on your busiest days (more sets = more options)</li>
          <li>Write captions in one sitting on a quiet afternoon rather than one by one</li>
          <li>Film process videos for multiple sets back-to-back while a tripod is set up</li>
          <li>Schedule posts in advance using Instagram's native scheduler or a third-party tool</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For a full guide to batching a month of content: <Link to="/learn/how-to-batch-nail-content" className="underline text-[#F52B8C]">how to batch nail content for a whole month</Link>.</p>
      </section>
    </div>
  ),
});
export {};
