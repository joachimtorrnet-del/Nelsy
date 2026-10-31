import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: '50-instagram-reel-ideas-for-nail-techs',
  title: '50 Instagram Reel Ideas for Nail Techs',
  seoTitle: '50 Instagram Reel Ideas for Nail Techs (That Get Views)',
  excerpt: '50 ready-to-film Instagram Reel ideas for nail techs — from easy 30-second clips to slightly more involved videos that consistently get reach.',
  seoDescription: '50 Instagram Reel ideas for nail techs. From quick process clips to educational Reels — ideas that work for solo nail techs and don\'t require video production skills.',
  category: 'instagram-content',
  tags: ['Instagram Reels', 'Reel ideas', 'nail tech content', 'Instagram growth'],
  heroImage: 'linear-gradient(135deg, #FFF1F2 0%, #FECDD3 100%)',
  heroImageAlt: '50 Instagram Reel ideas for nail techs',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'process-reels', label: 'Process and technique Reels (1–15)' },
    { id: 'before-after-reels', label: 'Before/after Reels (16–25)' },
    { id: 'educational-reels', label: 'Educational Reels (26–35)' },
    { id: 'personality-reels', label: 'Personality and POV Reels (36–45)' },
    { id: 'business-reels', label: 'Business and booking Reels (46–50)' },
    { id: 'filming-tips', label: 'Quick filming tips' },
  ],
  relatedSlugs: ['100-nail-tech-content-ideas', 'nail-content-that-gets-bookings', 'how-to-grow-nail-tech-instagram'],
  faq: [
    { q: 'How long should nail tech Reels be?', a: '7–15 seconds for process/time-lapse clips. 30–60 seconds for educational or narrative Reels. Shorter Reels tend to get more replays (which Instagram counts as good engagement). If your Reel can be cut to 15 seconds without losing the point, cut it.' },
    { q: 'Do I need special equipment to film Reels as a nail tech?', a: 'No. A phone mounted above your work area with a ring light is enough for process Reels. Close-up nail shots look better than you\'d expect on a recent phone camera. The most important thing is steady footage and decent light — not professional gear.' },
    { q: 'What is the best time to post Reels for nail techs?', a: 'For UK nail techs, 6–9pm on weekdays and Saturday mornings tend to get the best initial engagement. But Reels keep distributing for days after posting, so the "right" time matters less than it does for feed posts. Post when you\'re ready.' },
  ],
  relatedFeatureSlugs: ['instagram-autodm', 'link-in-bio', 'audience-capture'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="tip" title="How to use this list">
        Batch your filming. Set up your phone to record, then film 3–4 Reels in one session while you're working on a client. You'll have content for a week from one session.
      </ArticleCallout>

      <section id="process-reels">
        <h2 className="font-serif text-2xl font-bold mb-4">Process and technique Reels (1–15)</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Gel set time-lapse from prep to finish (30–60 seconds, sped up)</li>
          <li>Nail art application close-up (mesmerising, just the art)</li>
          <li>Cuticle prep close-up (satisfying for nail enthusiasts)</li>
          <li>Filing and shaping process</li>
          <li>Gel colour application (one stroke, clean)</li>
          <li>Nail art design being drawn in real-time (slower, detailed)</li>
          <li>French tip application technique</li>
          <li>Full nail art look from blank to finished (time-lapse)</li>
          <li>Stamping or chrome powder application</li>
          <li>Marble nail technique close-up</li>
          <li>Nail extension application (builder gel or acrylic)</li>
          <li>A mistake and how you fixed it (shows skill + realness)</li>
          <li>Your workstation setup timelapse</li>
          <li>Product prep: mixing, organising, setting up</li>
          <li>The final clean-up and reveal</li>
        </ol>
      </section>

      <section id="before-after-reels">
        <h2 className="font-serif text-2xl font-bold mb-4">Before/after Reels (16–25)</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Before/afters are consistently among the highest-performing nail content. Film the "before" at the start of the appointment and "after" at the end.</p>
        <ol start={16} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Bitten/short nails → gel extensions before/after</li>
          <li>Grown-out infill → fresh set transformation</li>
          <li>Natural nails → first gel set</li>
          <li>Simple colour → intricate nail art (same appointment)</li>
          <li>Chipped/damaged set → repaired fresh set</li>
          <li>One nail close-up: bare → full set</li>
          <li>Client's nail shape transformation (square to almond)</li>
          <li>Before: "she showed me this inspo photo" / After: the result</li>
          <li>6-month nail journey compilation (3–4 sets over time)</li>
          <li>Gel removal + fresh set in 30 seconds</li>
        </ol>
      </section>

      <section id="educational-reels">
        <h2 className="font-serif text-2xl font-bold mb-4">Educational Reels (26–35)</h2>
        <ol start={26} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>"3 things that make gel nails last longer"</li>
          <li>"Why your nails are lifting (and how to prevent it)"</li>
          <li>"Gel vs acrylic vs hard gel — explained simply"</li>
          <li>"This is why I prep your nails before every set"</li>
          <li>"How to choose the right nail shape for your hands"</li>
          <li>"What happens if you pick gel nails off"</li>
          <li>"The difference between infills and a new set"</li>
          <li>"What\'s in my kit" product walkthrough</li>
          <li>"Signs you need a nail break"</li>
          <li>"What to do if your nail breaks between appointments"</li>
        </ol>
      </section>

      <section id="personality-reels">
        <h2 className="font-serif text-2xl font-bold mb-4">Personality and POV Reels (36–45)</h2>
        <ol start={36} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>"Day in my life as a nail tech" (clips from one day)</li>
          <li>"Things nail techs understand"</li>
          <li>"POV: you finally booked your nail appointment"</li>
          <li>"What no one tells you about being a nail tech"</li>
          <li>"Things clients say that make nail techs smile"</li>
          <li>My nail tech origin story (why I started)</li>
          <li>"Honest review of [product] after 3 months"</li>
          <li>Packing my kit for a mobile appointment</li>
          <li>"My most requested design and why I think people love it"</li>
          <li>Reaction to a viral nail trend: would I do this?</li>
        </ol>
        <ArticleTip>Personality Reels have lower reach potential than process content but build deeper connection with potential clients. Mix both: process for reach, personality for trust.</ArticleTip>
      </section>

      <section id="business-reels">
        <h2 className="font-serif text-2xl font-bold mb-4">Business and booking Reels (46–50)</h2>
        <ol start={46} className="list-decimal list-inside space-y-2 text-gray-700">
          <li>"How to book with me in under 2 minutes" (screen recording + voiceover)</li>
          <li>"Why I take a deposit for every booking" (short, direct explanation)</li>
          <li>A week in my diary: showing a full week of sets</li>
          <li>"Services I offer and prices" (direct, no-nonsense)</li>
          <li>"I have slots this month — here\'s how to book" (simple CTA Reel)</li>
        </ol>
        <ArticleCallout variant="info" title="Business Reels convert directly">
          A simple "here are my services and how to book" Reel doesn't go viral — but it converts the people who see it. Include it in your rotation once a month.
        </ArticleCallout>
      </section>

      <section id="filming-tips">
        <h2 className="font-serif text-2xl font-bold mb-4">Quick filming tips for nail techs</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Mount your phone directly above your work area for process clips — a flexible tripod arm works well</li>
          <li>Film everything; edit later. You don't know what's worth keeping until you watch it back</li>
          <li>A ring light makes a bigger difference than your phone model</li>
          <li>Film client hands for before/after (ask permission first)</li>
          <li>Batch editing: edit 3–5 Reels at once while you're in the flow</li>
          <li>Add text to every Reel — many viewers watch without sound</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">More content ideas: <Link to="/learn/100-nail-tech-content-ideas" className="underline text-[#F52B8C]">100 nail tech content ideas for Instagram</Link>.</p>
      </section>
    </div>
  ),
});
export {};
