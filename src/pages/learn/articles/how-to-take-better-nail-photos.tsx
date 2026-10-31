import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-take-better-nail-photos',
  title: 'How to Take Better Nail Photos With Your Phone',
  seoTitle: 'How to Take Better Nail Photos With Your Phone',
  excerpt: 'You don\'t need a professional camera to take nail photos that get attention. Here\'s how to use your phone to capture nails that look as good as they do in person.',
  seoDescription: 'How to take better nail photos with your phone. Lighting tips, composition, backgrounds, phone camera settings, and common mistakes nail techs make with nail photography.',
  category: 'instagram-content',
  tags: ['nail tech photography', 'nail photos phone', 'how to photograph nails', 'nail tech content creation'],
  heroImage: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
  heroImageAlt: 'How to take better nail photos with your phone',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'lighting', label: 'Lighting: the most important factor' },
    { id: 'composition', label: 'Composition basics' },
    { id: 'background', label: 'Background and surface' },
    { id: 'phone-settings', label: 'Phone camera settings' },
    { id: 'posing-hands', label: 'Posing hands' },
    { id: 'common-mistakes', label: 'Common mistakes' },
  ],
  relatedSlugs: ['how-to-edit-nail-photos', 'how-to-film-nail-tech-tiktok-reels', 'how-to-batch-nail-content', 'how-to-create-consistent-instagram-feed-nail-tech'],
  faq: [
    { q: 'What\'s the best phone for nail photography?', a: 'Any modern smartphone with a decent camera works well for nail photography. Lighting and composition matter far more than which phone you use. A three-year-old phone in good natural light will produce better nail photos than a brand-new phone in poor artificial light.' },
    { q: 'Do I need a ring light for nail photos?', a: 'Not necessarily. Natural window light is usually better than a ring light for still nail photography — softer, more even, and free. A ring light can be useful for consistent artificial light when natural light isn\'t available, or for video content. If you\'re using a ring light for stills, position it at an angle rather than directly in front to avoid harsh reflections on chrome or glitter nails.' },
    { q: 'Why do my nail photos look yellow or orange?', a: 'Warm artificial light (tungsten or warm LED bulbs) makes nail photos look yellow or orange. Fix it by: shooting in natural daylight instead, adjusting white balance in your camera settings, or editing the white balance in post. The camera\'s "auto white balance" sometimes adjusts incorrectly in mixed light — manual white balance or natural light consistently gives better results.' },
  ],
  relatedFeatureSlugs: ['instagram-autodm', 'link-in-bio'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="lighting">
        <h2 className="font-serif text-2xl font-bold mb-4">Lighting: the most important factor</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">More than any camera setting or composition rule, light determines whether a nail photo looks good. The best nail photos are almost always taken in natural daylight near a window.</p>
        <ArticleCallout variant="info" title="Window light rules">
          Position hands near a window with indirect natural light (not direct sunlight, which creates harsh shadows). Side lighting (light coming from the side rather than directly above or behind) shows texture, depth, and shine beautifully. Overcast days are great — soft, even light with no harsh shadows.
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">What to avoid:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Overhead fluorescent salon lighting (creates yellow cast, harsh shadows)</li>
          <li>Direct flash (flattens detail, creates hot spots)</li>
          <li>Mixed light sources (natural + artificial creates colour inconsistency)</li>
          <li>Shooting in direct sunlight (too much contrast, bleaches colours)</li>
        </ul>
      </section>

      <section id="composition">
        <h2 className="font-serif text-2xl font-bold mb-4">Composition basics</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Nail photography has a few reliable compositions that work consistently:</p>
        <ArticleTable
          headers={['Shot type', 'When to use']}
          rows={[
            ['Flat lay (hand on surface, overhead)', 'Clean, classic; shows all nails evenly; good for detailed art'],
            ['Fan/spread (fingers spread on flat surface)', 'Shows nail shape, art, and overall look clearly'],
            ['Side angle (hand angled, slight overhead)', 'Shows nail length, extension shape, and dimension'],
            ['Closeup (single finger or two)', 'Shows detail on art, texture, glitter, chrome'],
            ['Lifestyle (hand holding an object)', 'Shows nails in context; more editorial feel'],
          ]}
        />
        <ArticleTip>Take the same set in 2–3 different compositions — you'll have variety across posts without needing to reshoot.</ArticleTip>
      </section>

      <section id="background">
        <h2 className="font-serif text-2xl font-bold mb-4">Background and surface</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your background should support the nails, not compete with them:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Neutral works best:</strong> White, light grey, cream, or beige surfaces keep focus on the nails</li>
          <li><strong>Texture adds interest:</strong> Marble, linen, wood, or concrete backgrounds add visual interest without overwhelming</li>
          <li><strong>Match to your brand:</strong> If your feed has a consistent aesthetic, use backgrounds that fit it</li>
          <li><strong>Avoid busy/patterned backgrounds:</strong> Flowers, busy fabrics, and cluttered surfaces pull attention away from the nails</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">You don't need special surfaces — a clean white piece of foam board, a light-coloured piece of fabric, or a plain table surface works well. Keep one consistent background and one accent option for variety.</p>
      </section>

      <section id="phone-settings">
        <h2 className="font-serif text-2xl font-bold mb-4">Phone camera settings</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Tap to focus:</strong> Always tap on the nails to set focus precisely — don't let the camera autofocus on the background</li>
          <li><strong>HDR:</strong> Turn off HDR for nail photos — it can oversaturate colours and reduce sharpness</li>
          <li><strong>Portrait mode:</strong> Can work for lifestyle shots; be careful with flat lays (the blur effect can cut in awkwardly)</li>
          <li><strong>Grid lines:</strong> Turn on the grid overlay to align compositions consistently</li>
          <li><strong>Burst mode:</strong> For moving hand shots, burst mode captures the right moment — delete and keep only the sharpest frame</li>
        </ul>
        <ArticleTip>Shoot in the highest quality your phone supports. Storage is cheap; reshooting isn't. You can always compress for posting, but you can't add quality back.</ArticleTip>
      </section>

      <section id="posing-hands">
        <h2 className="font-serif text-2xl font-bold mb-4">Posing hands</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">How to guide clients (or position your own hand):</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Relax the hand — tension creates awkward positions. Ask the client to shake their hand loose before posing</li>
          <li>Slightly curl the fingers naturally rather than splaying them flat and rigid</li>
          <li>For a clean flat lay, spread fingers evenly and let the hand rest softly — not pressed hard on the surface</li>
          <li>Avoid photos where the client's skin is tensed, knuckles are prominent, or fingers look unnatural</li>
          <li>Take a few shots and review — if the hand looks tense, ask for a reset</li>
        </ul>
      </section>

      <section id="common-mistakes">
        <h2 className="font-serif text-2xl font-bold mb-4">Common mistakes</h2>
        <ArticleTable
          headers={['Mistake', 'Fix']}
          rows={[
            ['Blurry nails (missed focus)', 'Tap to focus on the nails specifically before shooting'],
            ['Yellow / orange cast', 'Shoot in natural daylight; fix white balance in editing'],
            ['Busy background distracting from nails', 'Use a simple neutral surface'],
            ['Dark, underexposed photos', 'Add more light — move closer to window, or increase exposure by tapping the screen and sliding up'],
            ['Same composition every time', 'Mix flat lay, side angle, and closeup in each session'],
            ['Hands look stiff / tense', 'Ask client to relax hand before posing; reshoot if it looks unnatural'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">Once you have great photos, editing makes them even better — without making them look fake. Guide to editing: <Link to="/learn/how-to-edit-nail-photos" className="underline text-[#F52B8C]">how to edit nail photos without making them look fake</Link>.</p>
      </section>
    </div>
  ),
});
export {};
