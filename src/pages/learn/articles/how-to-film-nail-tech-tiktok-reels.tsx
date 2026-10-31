import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-film-nail-tech-tiktok-reels',
  title: 'How to Film Nail Tech TikTok and Reels Videos',
  seoTitle: 'How to Film Nail Tech TikTok and Reels Videos',
  excerpt: 'Great nail video doesn\'t require a camera crew. Here\'s how to set up your phone to film nail process videos, reels, and TikToks that look professional and perform well.',
  seoDescription: 'How to film nail tech TikTok and Reels videos. Phone setup, angles, lighting, filming tips, and what to capture during appointments for high-quality nail content.',
  category: 'instagram-content',
  tags: ['nail tech filming tips', 'nail tech tiktok setup', 'nail tech reels filming', 'nail video content'],
  heroImage: 'linear-gradient(135deg, #FFF0F6 0%, #FECDD3 100%)',
  heroImageAlt: 'How to film nail tech TikTok and Reels videos',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'setup', label: 'Your filming setup' },
    { id: 'angles', label: 'Best angles for nail videos' },
    { id: 'what-to-film', label: 'What to film during appointments' },
    { id: 'audio', label: 'Audio and sound' },
    { id: 'editing', label: 'Basic editing before posting' },
    { id: 'filming-mistakes', label: 'Common filming mistakes' },
  ],
  relatedSlugs: ['how-to-take-better-nail-photos', 'tiktok-ideas-nail-techs', 'how-to-batch-nail-content', 'how-to-edit-nail-photos'],
  faq: [
    { q: 'Do I need a ring light to film nail videos?', a: 'A ring light helps with consistent artificial light, but isn\'t essential. Natural window light works very well for nail videos — often better than a ring light, which can create distracting reflections on chrome and glitter nails. If you want to invest in something, a small flexible tripod/phone mount is more useful than a ring light to start.' },
    { q: 'What should I do if my client doesn\'t want to be filmed?', a: 'Respect it completely. Always ask permission before filming any appointment, and a "no" is a no without discussion. Film only the nails (not the client\'s face, body, or anything identifying) unless you have explicit consent. Most clients who are fine with their nails being filmed prefer not to appear in the video themselves — that\'s an easy accommodation.' },
    { q: 'How do I film nails without interrupting the appointment?', a: 'The key is a phone stand — once it\'s set up at the right angle, it films without you needing to manage it. Prop your phone on a stand or against your tools at the right angle, start filming, and work normally. Review the footage after the client leaves and cut what you need. You don\'t need to direct the filming while working.' },
  ],
  relatedFeatureSlugs: ['instagram-autodm', 'link-in-bio'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="setup">
        <h2 className="font-serif text-2xl font-bold mb-4">Your filming setup</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">You need three things for nail video content:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>A phone stand or mount:</strong> Keeps the camera steady and frees your hands. A small flexible "gorillapod" tripod, a standard phone stand, or a clamp-mounted arm all work.</li>
          <li><strong>Good light:</strong> Natural window light positioned to the side of the nail area. Or a softbox / ring light for consistent artificial light when working without natural light.</li>
          <li><strong>A clean background:</strong> What's visible behind the nails in the frame. A simple neutral surface and no visible clutter is enough.</li>
        </ul>
        <ArticleTip>Spend 2 minutes on setup before the client's appointment — position your phone stand, test the angle, start recording. A good setup takes the friction out of filming consistently.</ArticleTip>
      </section>

      <section id="angles">
        <h2 className="font-serif text-2xl font-bold mb-4">Best angles for nail videos</h2>
        <ArticleTable
          headers={['Angle', 'What it shows', 'Best for']}
          rows={[
            ['Overhead / birds-eye', 'Application from directly above — clear view of nail surface', 'Nail art, colour application, timelapse'],
            ['45-degree front', 'Nail from slight angle — shows length and surface', 'Most process videos; versatile'],
            ['Side profile', 'Nail length, apex, extension shape', 'Acrylic building, shaping, length reveals'],
            ['Close-up detail', 'Macro view of a single nail', 'Chrome powder, glitter, fine art details'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For process videos, start with a 45-degree angle — it's the most forgiving and versatile. Add a close-up cutaway if you have a detail worth highlighting.</p>
      </section>

      <section id="what-to-film">
        <h2 className="font-serif text-2xl font-bold mb-4">What to film during appointments</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">You don't need to film an entire appointment. Film specific moments and build content from them:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Prep sequence:</strong> Cuticle work, dehydration — satisfying and shows quality</li>
          <li><strong>Product application:</strong> Gel, acrylic, builder gel being applied — the main process</li>
          <li><strong>Nail art moments:</strong> Freehand art, stamping, chrome application — most engaging</li>
          <li><strong>Shaping/filing:</strong> The nail shape emerging from the file — very satisfying to watch</li>
          <li><strong>Before and after:</strong> Brief shot of the bare nail, then the finished result</li>
          <li><strong>Reveal:</strong> The finished set, clean, oiled, photographed or filmed as the final shot</li>
        </ul>
        <ArticleCallout variant="info" title="Consent reminder">
          Always ask your client's permission before filming. A quick "do you mind if I film your nails today for social content?" at the start of the appointment is all you need. Film only the nails — not the client's face, identifying features, or personal items.
        </ArticleCallout>
      </section>

      <section id="audio">
        <h2 className="font-serif text-2xl font-bold mb-4">Audio and sound</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Three audio options for nail videos:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Nail ASMR (native sound):</strong> The natural sound of filing, tapping, product application. Very popular on nail TikTok — highly satisfying, no music needed</li>
          <li><strong>Trending audio:</strong> Add a trending sound in TikTok or Instagram after filming. Good for discovery but choose sounds that fit naturally</li>
          <li><strong>No audio / silent with text:</strong> Works for educational content with text overlays and captions</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">If filming in a loud salon environment and you want the ASMR feel, you can also add clean nail ASMR audio from TikTok's sound library over your footage in the editor.</p>
      </section>

      <section id="editing">
        <h2 className="font-serif text-2xl font-bold mb-4">Basic editing before posting</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">You don't need complex editing. Basic steps:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Cut the start and end:</strong> Remove setup footage and anything after the finished reveal</li>
          <li><strong>Speed up slow sections:</strong> Application clips often work well at 2–4× speed</li>
          <li><strong>Add text overlay:</strong> Name the style, service, or technique (helps with search on TikTok)</li>
          <li><strong>Colour grading:</strong> A slight brightness boost and minor contrast adjustment is usually enough — don't over-filter nail video</li>
          <li><strong>Captions:</strong> Add auto-captions in TikTok or Instagram for accessibility</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For photo editing specifically: <Link to="/learn/how-to-edit-nail-photos" className="underline text-[#F52B8C]">how to edit nail photos without making them look fake</Link>.</p>
      </section>

      <section id="filming-mistakes">
        <h2 className="font-serif text-2xl font-bold mb-4">Common filming mistakes</h2>
        <ArticleTable
          headers={['Mistake', 'Fix']}
          rows={[
            ['Shaky footage', 'Use a phone stand — hand-held nail video is too unstable'],
            ['Bad lighting — yellow or dark', 'Move to window light; never rely solely on overhead salon lights'],
            ['Out of focus nails', 'Tap to focus on the nails before the key application moment; re-tap if the camera refocuses elsewhere'],
            ['Filming horizontally for TikTok/Reels', 'Always film vertically (portrait mode) for short-form video; horizontal doesn\'t fill the screen'],
            ['Too long with no edit', 'A 4-minute raw application clip needs editing down to 30–60 seconds of highlights'],
          ]}
        />
      </section>
    </div>
  ),
});
export {};
