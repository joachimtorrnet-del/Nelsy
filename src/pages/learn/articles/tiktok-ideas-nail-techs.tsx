import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTable } from '@/components/article/ArticleBodyComponents';

const link = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'tiktok-ideas-nail-techs',
  title: '50 TikTok Ideas for Nail Techs',
  coverTitle: '50 TikTok Ideas',
  seoTitle: '50 TikTok Ideas for Nail Techs (Content That Gets Views)',
  excerpt: 'Running out of TikTok ideas? Here are 50 nail tech TikTok video concepts, from process videos to educational content, organised by format and goal.',
  seoDescription: '50 TikTok ideas for nail techs. Process videos, transformations, day-in-the-life, educational, trending audio, and business content ideas for nail tech TikTok.',
  category: 'instagram-content',
  audience: ['pros'],
  craft: 'nails',
  tags: ['TikTok ideas nail tech', 'nail tech TikTok content', 'nail TikTok video ideas', 'nail tech social media ideas'],
  heroImage: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
  heroImageAlt: '50 TikTok ideas for nail techs',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  updatedAt: '2026-11-26',
  tldr: {
    answer: 'The TikTok ideas that work best for nail techs are process videos, before-and-after transformations and quick client education, each opened with a 2-second hook.',
    detail: 'Pick 3 formats from the 50 below, film them every week, and use the 4-beat script template so every video has a hook, the process, the reveal and a booking prompt.',
    points: [
      { label: 'For views', text: 'Transformations and satisfying process clips (ideas 1 to 20).' },
      { label: 'For trust', text: 'Education and myth-busting (ideas 21 to 35).' },
      { label: 'For bookings', text: 'Pricing, availability and day-in-the-life videos with a link-in-bio CTA (ideas 36 to 45).' },
    ],
  },
  toc: [
    { id: 'script-template', label: 'The 4-beat script for any idea' },
    { id: 'process-videos', label: 'Process and application videos' },
    { id: 'transformations', label: 'Transformation content' },
    { id: 'educational', label: 'Educational content' },
    { id: 'day-in-life', label: 'Day in the life / business content' },
    { id: 'trending', label: 'Trending formats for nail techs' },
    { id: 'first-week', label: 'Your first week of TikToks' },
  ],
  relatedSlugs: ['how-to-get-nail-clients-from-tiktok', 'how-to-film-nail-tech-tiktok-reels', '50-instagram-reel-ideas-for-nail-techs', 'nail-tech-content-calendar-30-day'],
  faq: [
    { q: 'How long should nail tech TikToks be?', a: 'As short as the idea allows. Quick tips often work in 10 to 20 seconds, process videos in 20 to 60 seconds, and day-in-the-life videos can run longer. People watching to the end matters more than length, so cut any second that doesn\'t move toward the reveal.' },
    { q: 'Should I use trending audio on my nail TikToks?', a: 'Use it when it fits. Trending sounds can help a video get picked up, but many nail process videos work better with original sound: filing, tapping and the click of a lamp. A simple test: post the same type of video one week with a trending sound and one week with original sound, and compare views and watch time in your analytics.' },
    { q: 'How often should nail techs post on TikTok?', a: 'Pick a rhythm you can keep, such as 3 videos a week. Film during normal appointments (with client permission) so you are not creating content on your days off. Posting every day for a month and then stopping usually does less than steady weekly posting.' },
    { q: 'Do I need to show the client\'s face?', a: 'No. Hands-only content is the norm for nail TikTok. Always ask before filming a client\'s hands, and get clear permission before including their face, voice or name.' },
  ],
  relatedFeatureSlugs: ['instagram-autodm', 'link-in-bio', 'audience-capture'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="script-template">
        <h2 className="font-serif text-2xl font-bold mb-4">The 4-beat script for any idea</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Every idea in this list becomes a video with the same structure. Example timings for a 20-second video:</p>
        <ArticleTable
          headers={['Beat', 'Seconds', 'What to show', 'Example on-screen text']}
          rows={[
            ['1. Hook', '0 to 2', 'The finished nails, or the worst "before"', '"She asked for chrome but make it subtle"'],
            ['2. Process', '2 to 14', '4 to 6 short clips of key steps', 'Step labels: "prep", "builder", "chrome"'],
            ['3. Reveal', '14 to 18', 'Slow turn of the hand in good light', '"Final result"'],
            ['4. CTA', '18 to 20', 'Last frame held still', '"Booking link in bio, [city]"'],
          ]}
        />
        <ArticleCallout variant="info" title="Copy this caption template">
          &quot;[Name of the look] on [shape] 💅 [One detail about the technique or product]. Based in [city], booking link in bio. #[city]nails #[technique]nails #nailtok&quot;
        </ArticleCallout>
      </section>

      <section id="process-videos">
        <h2 className="font-serif text-2xl font-bold mb-4">Process and application videos (10 ideas)</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Full nail set timelapse, from bare nails to finished</li>
          <li>Real-time application of a specific technique (chrome powder, nail art, ombre)</li>
          <li>Nail prep sequence: show exactly what you do before product application</li>
          <li>Applying nail tips vs nail forms: show the difference</li>
          <li>Cuticle work timelapse: satisfying, and shows your prep quality</li>
          <li>Nail art in real time: no timelapse, show the technique slowly</li>
          <li>Applying a glitter gradient, ASMR-style, close-up</li>
          <li>Chrome foil application: beautiful, shareable, shows technique</li>
          <li>Building the nail apex: educational and mesmerising</li>
          <li>Filing and shaping a square set: shaping is satisfying to watch</li>
        </ol>
      </section>

      <section id="transformations">
        <h2 className="font-serif text-2xl font-bold mb-4">Transformation content (10 ideas)</h2>
        <ol start={11} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Before → after: the bigger the difference, the better</li>
          <li>Grown-out infill → fresh set</li>
          <li>Damaged or bitten nails → extensions</li>
          <li>&quot;Nail rescue&quot;: a client with breaking nails getting a fix</li>
          <li>Old gel soak-off → new colour: show the fresh start</li>
          <li>Natural nails → BIAB overlay</li>
          <li>Client&apos;s hand before and after nail art accent nails</li>
          <li>Month 1 nails vs month 3 nails: nail health improving over time</li>
          <li>Plain nails → full nail art set</li>
          <li>Client-requested &quot;I want something different&quot; reveal</li>
        </ol>
      </section>

      <section id="educational">
        <h2 className="font-serif text-2xl font-bold mb-4">Educational content (15 ideas)</h2>
        <ol start={21} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>&quot;Why your nails keep lifting&quot;: causes and how to fix them</li>
          <li>&quot;Things that ruin your gel nails&quot;: aftercare tips</li>
          <li>Gel vs acrylic vs Gel-X: which is right for you?</li>
          <li>How to make your nails last longer (client-facing)</li>
          <li>What to do between appointments (cuticle care, maintenance)</li>
          <li>&quot;Don&apos;t do this before your nail appointment&quot;: common mistakes</li>
          <li>How long do different services last? (gel, acrylic, BIAB)</li>
          <li>&quot;What&apos;s in my nail bag?&quot;: kit reveal for aspiring techs</li>
          <li>Nail shapes explained: almond vs coffin vs oval vs square</li>
          <li>Why you should never peel your gel</li>
          <li>Nail care routine between appointments, step by step</li>
          <li>&quot;What clients ask for vs what they show me&quot;: why inspo photos matter</li>
          <li>How to choose your nail length for your lifestyle</li>
          <li>Primer: what it does and why it matters</li>
          <li>How to care for nails in winter: cold weather nail tips</li>
        </ol>
        <ArticleCallout variant="info" title="Educational content rule">
          Follow your product manufacturer&apos;s instructions for service-specific details. Technique and aftercare content is valuable; just don&apos;t make up cure times, timings or chemical compatibility claims.
        </ArticleCallout>
      </section>

      <section id="day-in-life">
        <h2 className="font-serif text-2xl font-bold mb-4">Day in the life / business content (10 ideas)</h2>
        <ol start={36} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>&quot;A day in my nail business&quot;: morning setup to last client</li>
          <li>&quot;What I ordered this week&quot;: product unboxing and review</li>
          <li>Setting up your nail station: show your space and tools</li>
          <li>&quot;My most common questions answered&quot;: nail tech FAQ in one video</li>
          <li>What I charge and why: a transparent pricing video</li>
          <li>&quot;How I started my nail business&quot;: your origin story</li>
          <li>A full Saturday of clients, as a time-lapse</li>
          <li>Prepping your kit for a mobile appointment</li>
          <li>&quot;My nail business one year in&quot;: honest reflection</li>
          <li>Client reactions to their finished nails (with permission)</li>
        </ol>
      </section>

      <section id="trending">
        <h2 className="font-serif text-2xl font-bold mb-4">Trending formats for nail techs (5 ideas)</h2>
        <ol start={46} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>&quot;Things I wish clients knew&quot;: list format</li>
          <li>POV: you have a nail appointment, from the client&apos;s perspective</li>
          <li>&quot;Pick your nail set&quot;: show 5 or 6 designs and ask viewers to choose in the comments</li>
          <li>GRWM (get ready with me), including your own nails as part of prep</li>
          <li>Speed art challenge: the fastest nail art you can do in X seconds</li>
        </ol>
      </section>

      <section id="first-week">
        <h2 className="font-serif text-2xl font-bold mb-4">Your first week of TikToks</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Three videos, all filmed during normal appointments:</p>
        <ArticleTable
          headers={['Day', 'Idea', 'Filming tip']}
          rows={[
            ['Monday', '#11 Before → after', 'Film the "before" in the same light and angle as the "after"'],
            ['Wednesday', '#22 Things that ruin your gel nails', 'Talk to camera or use on-screen text over clips of your work'],
            ['Saturday', '#40 What I charge and why', 'Show your price list and explain one service in 20 seconds'],
          ]}
        />
        <p className="text-gray-700 leading-relaxed">Before you post, make sure the link in your bio opens a page where viewers can book. For turning views into bookings: <Link to="/blog/how-to-get-nail-clients-from-tiktok" className={link}>how to get nail clients from TikTok</Link>.</p>
      </section>
    </div>
  ),
});
export {};
