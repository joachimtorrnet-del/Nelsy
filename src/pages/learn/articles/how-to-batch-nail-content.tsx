import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-batch-nail-content',
  title: 'How to Batch Nail Content for a Whole Month',
  seoTitle: 'How to Batch Nail Content for a Whole Month',
  excerpt: 'Creating content every day is exhausting. Batching lets you shoot, edit and schedule a month of posts in a few focused sessions. Here\'s how to do it.',
  seoDescription: 'How to batch nail tech content for a whole month. How to plan, shoot, edit and schedule nail photos and videos in batches to save time and post consistently.',
  category: 'instagram-content',
  tags: ['batch nail content', 'nail tech content creation', 'nail tech social media batching', 'nail tech Instagram tips'],
  heroImage: 'linear-gradient(135deg, #FFF9EB 0%, #FEF3C7 100%)',
  heroImageAlt: 'How to batch nail tech content for a whole month',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'what-is-batching', label: 'What batching means' },
    { id: 'photo-batching', label: 'Batching nail photos' },
    { id: 'video-batching', label: 'Batching nail videos' },
    { id: 'caption-batching', label: 'Batching captions' },
    { id: 'scheduling', label: 'Scheduling posts in advance' },
    { id: 'monthly-session', label: 'A monthly batching session' },
  ],
  relatedSlugs: ['nail-tech-content-calendar-30-day', 'how-to-take-better-nail-photos', 'how-to-film-nail-tech-tiktok-reels', 'tiktok-ideas-nail-techs'],
  faq: [
    { q: 'How long does batching a month of content take?', a: 'For most nail techs, a full month of content (16–20 posts) can be batched across two or three sessions: a photo collection session throughout the working week (capturing sets as you do them), a 1–2 hour editing and caption session, and a 30-minute scheduling session. Total active time: 3–4 hours for a month of content. This is far less time than creating content daily.' },
    { q: 'Do I need special equipment to batch nail content?', a: 'No. Your phone camera, a simple phone stand or ring light, and natural light from a window is enough. Consistency in your setup (same background, same light direction) makes batching easier — you\'re not resetting your shooting environment every time.' },
    { q: 'Can I batch content if I don\'t know what nail sets I\'ll be doing next month?', a: 'Yes — you don\'t need to plan specific sets in advance. Plan your content categories ("I need a transformation, two set showcases, and one educational post this week") and shoot what naturally comes up in your appointments. The planning is about what types of content you need, not pre-scripted sets.' },
  ],
  relatedFeatureSlugs: ['instagram-autodm', 'link-in-bio'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-is-batching">
        <h2 className="font-serif text-2xl font-bold mb-4">What batching means</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Batching means grouping similar tasks together rather than doing them one at a time. Instead of taking a photo, editing it, writing a caption, and posting it every day, you take photos all week, then edit them all, then write all the captions, then schedule everything in one session.</p>
        <p className="text-gray-700 leading-relaxed">Context switching is expensive mentally — switching from client work to content creation to editing to writing back to client work fragments your focus. Batching keeps you in one mode at a time.</p>
      </section>

      <section id="photo-batching">
        <h2 className="font-serif text-2xl font-bold mb-4">Batching nail photos</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Capture photos throughout your working week rather than in one session:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Set up your photo spot (window light + neutral background) once and keep it consistent all week</li>
          <li>Photograph the finished set while the client is still seated — before they leave</li>
          <li>Take 5–10 shots per set in slightly different positions; you'll pick the best later</li>
          <li>For video: leave your phone filming during application — timelapse or process clips you can edit later</li>
          <li>Save everything to a dedicated "content" folder on your phone for easy access in editing sessions</li>
        </ul>
        <ArticleTip>The best time to photograph nails is immediately after they're finished — oil applied, hands relaxed. Have your phone and shot setup ready before the client's appointment ends.</ArticleTip>
      </section>

      <section id="video-batching">
        <h2 className="font-serif text-2xl font-bold mb-4">Batching nail videos</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Video batching works slightly differently because filming happens during appointments, not in a separate session:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Set up a phone stand or ring light mount at the start of appointments where you want video</li>
          <li>Film multiple clips (prep, application, shaping, reveal) and choose what to use in editing</li>
          <li>Aim for 2–3 videos per week to batch — you don't need to film every appointment</li>
          <li>Dedicated editing time: edit all raw video into reusable clips once or twice a week</li>
        </ul>
        <ArticleCallout variant="info" title="Filming rule">
          Always get your client's consent before filming. A simple "do you mind if I film your nails for social content today?" is enough. Never film a client's face without explicit consent.
        </ArticleCallout>
      </section>

      <section id="caption-batching">
        <h2 className="font-serif text-2xl font-bold mb-4">Batching captions</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Write all your captions in one session, not one at a time:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Pull up all your photos/videos for the week</li>
          <li>Write captions for each one in sequence — the momentum of writing carries over</li>
          <li>Keep a list of caption templates (availability prompts, educational openings, inspo captions) to adapt</li>
          <li>Batch your CTAs too: decide which posts get booking CTAs vs save/share vs comment prompts</li>
          <li>Draft in Notes or a Google Doc and copy to Instagram — easier to write and edit without the app</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Caption templates and CTA examples: <Link to="/learn/nail-tech-call-to-action-examples" className="underline text-[#F52B8C]">nail tech call-to-action examples</Link>.</p>
      </section>

      <section id="scheduling">
        <h2 className="font-serif text-2xl font-bold mb-4">Scheduling posts in advance</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Once you have content and captions ready, schedule posts ahead so they go out without you needing to remember:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Instagram's native scheduler:</strong> Available in the Instagram app — create a post and select "Schedule" instead of "Share." Simple and free.</li>
          <li><strong>Meta Business Suite:</strong> Lets you schedule both Instagram and Facebook posts from a single dashboard</li>
          <li><strong>Third-party tools:</strong> Various scheduling apps exist with additional features; only necessary if native tools don't meet your needs</li>
        </ul>
        <ArticleTip>Schedule at least one week ahead. If you're batching properly, two weeks ahead is ideal — then a quiet period or an unexpected busy week doesn't break your consistency.</ArticleTip>
      </section>

      <section id="monthly-session">
        <h2 className="font-serif text-2xl font-bold mb-4">A monthly batching session</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">At the start of each month (or end of the prior month), sit down for a 60–90 minute content planning session:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Review last month: what performed well? What got bookings?</li>
          <li>Map out the month's content calendar — categories for each week (see the <Link to="/learn/nail-tech-content-calendar-30-day" className="underline text-[#F52B8C]">30-day content calendar guide</Link>)</li>
          <li>Note any key dates: holidays, seasonal trends, your availability opening dates</li>
          <li>Decide which services you want to push this month</li>
          <li>Plan which weeks you'll prioritise shooting video</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">This 90-minute session eliminates daily decision-making for the entire month. Combined with photo and caption batching through the week, you can run a consistent, effective social presence in a few hours per week of focused work.</p>
      </section>
    </div>
  ),
});
export {};
