import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-often-should-nail-techs-post',
  title: 'How Often Should Nail Techs Post on Instagram?',
  seoTitle: 'How Often Should Nail Techs Post on Instagram? (The Real Answer)',
  excerpt: 'Posting frequency matters — but not as much as you think. Here\'s a practical guide to how often nail techs should actually post, based on what drives bookings.',
  seoDescription: 'How often should nail techs post on Instagram? The honest answer — plus posting schedules for busy nail techs, what to post, and when consistency matters most.',
  category: 'instagram-content',
  tags: ['instagram posting frequency', 'nail tech instagram', 'social media strategy', 'posting schedule'],
  heroImage: 'linear-gradient(135deg, #EFF6FF 0%, #BFDBFE 100%)',
  heroImageAlt: 'How often should nail techs post on Instagram',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'the-honest-answer', label: 'The honest answer' },
    { id: 'frequency-by-stage', label: 'Frequency by business stage' },
    { id: 'posts-vs-stories', label: 'Posts vs Stories frequency' },
    { id: 'schedule-templates', label: 'Posting schedule templates' },
    { id: 'quality-vs-quantity', label: 'Quality vs. quantity' },
  ],
  relatedSlugs: ['nail-tech-content-pillars', 'how-to-grow-nail-tech-instagram', 'nail-content-that-gets-bookings', 'nail-tech-caption-ideas'],
  faq: [
    { q: 'Does posting more on Instagram get you more nail clients?', a: 'Up to a point. Posting consistently (3–5x/week) outperforms posting rarely (1–2x/week). But posting 10 times a week rarely outperforms 5. After a certain frequency, quality and content strategy matter much more than additional volume. If you\'re already booked out, more posts aren\'t your problem.' },
    { q: 'What time should nail techs post on Instagram?', a: 'Generally: evenings (7–9pm) and weekend mornings perform well for consumer content. But your specific audience may differ — check your account\'s Insights (Professional Dashboard → Audience) to see when your followers are most active. Post when your specific followers are online, not when generic guides say to.' },
    { q: 'Should nail techs post every day?', a: 'Daily posting is possible, but it\'s not necessary and it\'s hard to sustain. Most nail techs who try daily posting either burn out or start producing low-quality content just to fill the slot. 3–5 intentional posts per week consistently outperforms daily posting that varies in quality.' },
  ],
  relatedFeatureSlugs: ['instagram-autodm', 'link-in-bio'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="the-honest-answer">
        <h2 className="font-serif text-2xl font-bold mb-4">The honest answer</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The internet will tell you to post every day, post 3x/day, post Reels at exactly 6:47pm on a Tuesday. Most of this is noise.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">For nail techs, the honest answer is: <strong>post consistently at a frequency you can maintain without burning out or lowering quality</strong>. That's 3–5 times per week for most people, including Stories.</p>
        <p className="text-gray-700 leading-relaxed">The real question isn't how often — it's whether you're posting the right content. A nail tech who posts 3 times a week with clear booking CTAs, strong photos, and targeted content will build a client base faster than one who posts every day with generic content and no direction.</p>
        <ArticleCallout variant="info" title="The posting frequency that actually matters">
          You need to post often enough that: (1) potential clients see your work when they discover you, (2) existing clients see availability posts, and (3) the algorithm continues distributing your content. For most nail techs, 3–5 posts/week covers all three.
        </ArticleCallout>
      </section>

      <section id="frequency-by-stage">
        <h2 className="font-serif text-2xl font-bold mb-4">Frequency by business stage</h2>
        <ArticleTable
          headers={['Stage', 'Recommended frequency', 'Priority']}
          rows={[
            ['Just starting (0–50 clients)', '5–7x/week including Stories — growth phase, needs volume', 'Build visibility fast'],
            ['Growing (booked 2–3 weeks out)', '3–5x/week — maintain visibility, focus on quality over quantity', 'Stay visible without burning out'],
            ['Fully booked', '2–3x/week — you\'re posting to retain clients, not acquire', 'Keep warm; introduce waitlist/referral content'],
            ['Taking a break or season change', '1–2x/week — don\'t disappear entirely', 'Maintain presence for when you return'],
          ]}
        />
        <ArticleTip>If you\'re fully booked, your Instagram posts should focus on maintaining client relationships, prompting rebooking ("your 3 weeks are up — link in bio"), and growing a waitlist. You don\'t need volume — you need intention.</ArticleTip>
      </section>

      <section id="posts-vs-stories">
        <h2 className="font-serif text-2xl font-bold mb-4">Posts vs Stories frequency</h2>
        <ArticleTable
          headers={['Format', 'Recommended frequency', 'Notes']}
          rows={[
            ['Feed posts (photos/carousels)', '3–5x/week', 'Each post should have a reason to exist: new work, booking prompt, educational content'],
            ['Reels', '1–3x/week', 'Higher reach potential but more effort — prioritise when you have growth goals'],
            ['Stories', '3–7x/week', 'More casual — availability, BTS, interactions, reposts from clients. No need to be polished.'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">Stories are easier to produce than feed posts and reach existing followers directly. If you had to choose between posting a feed post or posting a Story, prioritise Stories for booking-related content (availability, CTA, client feedback) and feed posts for portfolio content that a new visitor will see when they land on your profile.</p>
      </section>

      <section id="schedule-templates">
        <h2 className="font-serif text-2xl font-bold mb-4">Posting schedule templates</h2>

        <h3 className="font-semibold text-lg mb-2">For nail techs with limited time (minimum viable)</h3>
        <ArticleTable
          headers={['Day', 'Content']}
          rows={[
            ['Monday', 'Story: availability for the week, link to book'],
            ['Wednesday', 'Feed post: a nail set from this week, with booking CTA in caption'],
            ['Friday', 'Story: "Any last-minute gaps this weekend" post + client testimonial'],
          ]}
        />

        <h3 className="font-semibold text-lg mb-2 mt-6">For nail techs with more time (growth mode)</h3>
        <ArticleTable
          headers={['Day', 'Content']}
          rows={[
            ['Monday', 'Feed post: nail set from the week. Story: availability + booking prompt'],
            ['Tuesday', 'Reel: process video, technique showcase, or before/after'],
            ['Wednesday', 'Story: BTS or educational content'],
            ['Thursday', 'Feed post: carousel (e.g. 5 nail designs for the season)'],
            ['Friday', 'Story: "Still have [X] slots next week — grab one" + link'],
            ['Saturday', 'Feed post or Reel: best set of the week'],
            ['Sunday', 'Story: personal/relaxed — your own nails, what you\'re working on'],
          ]}
        />
      </section>

      <section id="quality-vs-quantity">
        <h2 className="font-serif text-2xl font-bold mb-4">Quality vs. quantity: the real trade-off</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Posting a blurry photo just to hit a daily quota doesn't help your brand — it can actively hurt it. Every post on your profile is visible to the next potential client who lands there. If you're diluting your portfolio with posts you're not proud of, reduce the frequency and raise the standard.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">Signs you're posting too often for your current capacity:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>You're posting the same angle of the same nail set five times</li>
          <li>Your captions have become one-line placeholder text</li>
          <li>You feel anxious about posting rather than excited</li>
          <li>You've posted content you knew wasn't your best "just to get something out"</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Three great posts a week, with strong photos, genuine captions, and clear CTAs, will grow your account and bookings faster than seven mediocre ones. For content planning: <Link to="/learn/nail-tech-content-pillars" className="underline text-[#F52B8C]">nail tech content pillars</Link>.</p>
      </section>
    </div>
  ),
});
export {};
