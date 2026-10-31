import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-create-consistent-instagram-feed-nail-tech',
  title: 'How to Create a Consistent Nail Tech Instagram Feed',
  seoTitle: 'How to Create a Consistent Nail Tech Instagram Feed',
  excerpt: 'A consistent Instagram feed looks more professional and builds brand recognition. Here\'s how to create a cohesive nail tech feed without spending hours on aesthetics.',
  seoDescription: 'How to create a consistent nail tech Instagram feed. Colour palette, photo style, editing consistency, and layout tips to make your feed look professional and cohesive.',
  category: 'instagram-content',
  tags: ['nail tech instagram feed', 'consistent instagram feed nail tech', 'nail tech instagram aesthetic', 'nail tech social media'],
  heroImage: 'linear-gradient(135deg, #FFF9EB 0%, #FEF3C7 100%)',
  heroImageAlt: 'How to create a consistent nail tech Instagram feed',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-consistency', label: 'Why consistency matters on Instagram' },
    { id: 'define-aesthetic', label: 'Define your aesthetic' },
    { id: 'photo-consistency', label: 'Photo consistency' },
    { id: 'editing-preset', label: 'Using a consistent editing style' },
    { id: 'planning-grid', label: 'Planning your grid' },
    { id: 'content-variety', label: 'Maintaining variety within consistency' },
  ],
  relatedSlugs: ['how-to-take-better-nail-photos', 'how-to-edit-nail-photos', 'nail-tech-content-calendar-30-day', 'nail-tech-call-to-action-examples'],
  faq: [
    { q: 'Do I need to stick to a specific colour palette on my feed?', a: 'You don\'t need a strict colour palette — you do need visual consistency. This usually comes from consistent lighting (warm or cool tone), consistent backgrounds (neutral or a recurring surface), and consistent editing style. A mix of nail colours looks perfectly natural on a nail tech feed as long as the photography style is consistent.' },
    { q: 'Should I plan my Instagram grid in advance?', a: 'Planning 1–2 weeks ahead is useful — it helps you spot if you\'ve posted five set showcases in a row without an educational piece, or if your last few posts were all the same composition. You don\'t need to plan every post; just enough to maintain variety and pacing.' },
    { q: 'How do I make my feed look consistent when I do all kinds of nail styles?', a: 'Diversity of nail styles is actually a strength — it shows range. Consistency isn\'t about the nails themselves but about how you photograph and present them. Same light direction, same backgrounds, same editing tone. A bright geometric nail and a soft nude BIAB can look like they belong on the same feed if the photography style is consistent.' },
  ],
  relatedFeatureSlugs: ['instagram-autodm', 'link-in-bio'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-consistency">
        <h2 className="font-serif text-2xl font-bold mb-4">Why consistency matters on Instagram</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">When a potential client visits your profile, they see your grid before they see any individual post. A consistent feed reads as professional and intentional — it creates trust. An inconsistent feed (different lighting, backgrounds, styles, editing tone) makes even great work look scattered.</p>
        <p className="text-gray-700 leading-relaxed">Consistency also makes clients feel they know what to expect when they book. "Her nails always look like this" is the impression that builds a reputation.</p>
      </section>

      <section id="define-aesthetic">
        <h2 className="font-serif text-2xl font-bold mb-4">Define your aesthetic</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Before worrying about settings or apps, decide what kind of account you're building:</p>
        <ArticleTable
          headers={['Aesthetic direction', 'What it looks like']}
          rows={[
            ['Clean and minimal', 'White or neutral backgrounds, cool-to-neutral tones, simple compositions, lots of white space'],
            ['Warm and luxury', 'Warm tones, marble or gold surfaces, soft light, editorial feel'],
            ['Bold and colourful', 'Vibrant backgrounds, saturated edits, energetic compositions'],
            ['ASMR / process-forward', 'Close-up process shots and videos, natural nails-in-progress feel, organic look'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">Pick one direction that feels natural to your work and the clients you want to attract. You don't need to be rigid — but if you're mixing warm and cool, minimalist and busy, your feed will lack cohesion.</p>
        <ArticleTip>Look at 3–5 nail tech accounts you admire and identify what makes their feed feel consistent. What backgrounds do they use? What light? What editing tone? This is research, not copying.</ArticleTip>
      </section>

      <section id="photo-consistency">
        <h2 className="font-serif text-2xl font-bold mb-4">Photo consistency</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Consistency in photos comes primarily from consistency in how you shoot:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Light direction:</strong> Always use the same window (or artificial light setup) — this creates consistent shadows and tones</li>
          <li><strong>Backgrounds:</strong> Keep 2–3 core backgrounds and use them consistently. Avoid random surfaces "because they were there."</li>
          <li><strong>Composition style:</strong> If you tend toward flat lay, stick with flat lay as your primary. Mix in angles as accent posts, not the main style</li>
          <li><strong>Timing:</strong> If you shoot at a particular time of day when light is consistent, the photos naturally match</li>
        </ul>
      </section>

      <section id="editing-preset">
        <h2 className="font-serif text-2xl font-bold mb-4">Using a consistent editing style</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The easiest way to consistent editing is a saved preset:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Edit one photo until it looks exactly right — your ideal nail photo</li>
          <li>Save those settings as a preset in Lightroom Mobile</li>
          <li>Apply that preset as a starting point to all subsequent photos</li>
          <li>Make minor adjustments per photo (each photo is slightly different) without straying from the core style</li>
        </ul>
        <ArticleCallout variant="info" title="Preset approach">
          A single preset applied consistently — even if imperfect for every individual photo — creates more visual cohesion than a different filter approach for each photo. The unity is worth slightly imperfect individual adjustments.
        </ArticleCallout>
      </section>

      <section id="planning-grid">
        <h2 className="font-serif text-2xl font-bold mb-4">Planning your grid</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Instagram's grid shows 3 posts per row. When planning, look at how posts work together in rows:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Avoid three consecutive posts with the same composition or colour scheme</li>
          <li>Alternate between different nail styles (art, minimalist, transformation) to show range</li>
          <li>Video and photo posts break visual monotony in the grid</li>
          <li>Grid planning tools let you preview how posts will look before publishing — useful when starting out</li>
        </ul>
      </section>

      <section id="content-variety">
        <h2 className="font-serif text-2xl font-bold mb-4">Maintaining variety within consistency</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Consistency doesn't mean repetition. Within your consistent style, vary:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Nail styles (art, minimalist, seasonal, extensions, natural)</li>
          <li>Colour palette of the nails themselves</li>
          <li>Content type (set showcase, process, educational, behind-the-scenes)</li>
          <li>Composition (flat lay, angle, close-up, lifestyle)</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">The consistency is in the frame — the photography style and editing tone. The variety is in what's inside the frame. Both together make a feed that's recognisable and interesting to follow.</p>
        <p className="text-gray-700 mt-4 leading-relaxed">For planning what types of content to post and when: <Link to="/learn/nail-tech-content-calendar-30-day" className="underline text-[#F52B8C]">how to create a 30-day nail tech content calendar</Link>.</p>
      </section>
    </div>
  ),
});
export {};
