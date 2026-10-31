import { registerArticle } from '@/lib/articles';
import { ArticleSteps, ArticleTip, ArticleCallout } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-shape-coffin-nails',
  title: 'How to Shape Coffin Nails Step by Step',
  seoTitle: 'How to Shape Coffin Nails Step by Step',
  excerpt: 'Coffin nails are one of the most popular extension shapes — bold, tapered, and flat-tipped. Here\'s the exact technique to get the taper and flat tip right every time.',
  seoDescription: 'How to shape coffin nails step by step. Filing technique for coffin / ballerina nail shape — how to taper the sides and create a flat tip on extensions.',
  category: 'nail-education',
  tags: ['how to shape coffin nails', 'coffin nail shape', 'coffin nail filing technique'],
  heroImage: 'linear-gradient(135deg, #FFF0F6 0%, #FDDDE6 100%)',
  heroImageAlt: 'How to shape coffin nails step by step',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Education Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'what-is-coffin', label: 'What makes a true coffin shape' },
    { id: 'length-requirement', label: 'Length requirement' },
    { id: 'step-by-step', label: 'Step-by-step filing' },
    { id: 'flat-tip', label: 'Getting the flat tip right' },
    { id: 'common-mistakes', label: 'Common mistakes' },
  ],
  relatedSlugs: ['nail-shapes-explained', 'how-to-shape-almond-nails', 'how-to-file-nail-extensions-into-shape', 'nail-file-grit-guide'],
  faq: [
    { q: 'What\'s the difference between coffin and ballerina?', a: 'Coffin and ballerina are two names for the same shape. "Coffin" refers to the shape of a coffin from above; "ballerina" refers to the toe box of a ballet slipper. The shape: tapered sides, flat tip. Both terms describe identical nails.' },
    { q: 'Can you do coffin shape on natural nails?', a: 'Coffin shape on natural nails is very difficult to maintain — the tapered sidewalls are the weakest structural point, and the flat tip has corners that catch and break easily. Most nail techs advise extensions for coffin shape. If a client insists on natural nails, the shape only works at longer lengths and requires careful maintenance.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-is-coffin">
        <h2 className="font-serif text-2xl font-bold mb-4">What makes a true coffin shape</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A coffin nail (also called ballerina) has two defining characteristics:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Tapered sidewalls:</strong> The sides angle in from the widest point of the nail toward the tip — like almond, but stopping before they reach a point</li>
          <li><strong>A flat, squared tip:</strong> Instead of coming to a point (stiletto) or a rounded point (almond), the coffin ends with a small, flat edge — the "toe box" of the ballerina shape</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">The flat tip is what distinguishes coffin from almond. The taper is what distinguishes it from square.</p>
      </section>

      <section id="length-requirement">
        <h2 className="font-serif text-2xl font-bold mb-4">Length requirement</h2>
        <ArticleCallout variant="info" title="Coffin requires meaningful length">
          Coffin shape requires enough free edge for the taper to be visible before the flat tip begins. At very short lengths, the shape collapses into something that reads more like square. Extensions are strongly recommended for this shape.
        </ArticleCallout>
      </section>

      <section id="step-by-step">
        <h2 className="font-serif text-2xl font-bold mb-4">Step-by-step filing</h2>
        <ArticleSteps
          steps={[
            { title: 'Set the length', body: 'File or clip all nails to the target length before beginning shape work. All nails should be the same length before the shaping stage.' },
            { title: 'File the right sidewall at an angle', body: 'Hold the file at roughly 45 degrees to the right sidewall and file inward toward the tip. You\'re creating the taper from the widest point of the nail down toward where the tip will be. Work in consistent strokes, angling toward the centre.' },
            { title: 'Mirror the left sidewall', body: 'Repeat the same angle and stroke count on the left sidewall. Both sides must taper equally toward the centre — equal taper is what makes the flat tip centred and symmetrical.' },
            { title: 'Stop before reaching a point', body: 'As you taper, stop filing the sidewalls before they reach an almond or stiletto point. You want them to converge toward the tip but leave a flat area — not meet at a point.' },
            { title: 'File the flat tip', body: 'Hold the file perpendicular to the nail (as you would for square) and file the remaining tip flat. You\'re squaring off the end of the tapered shape. The flat tip should be small — typically just a few millimetres wide.' },
            { title: 'Check from above and straight on', body: 'From above: both sides should taper evenly. From straight on at the tip: the flat edge should be level and centred, not diagonal.' },
          ]}
        />
        <ArticleTip>The flat tip on a coffin should be narrower than the base of the nail — it is the small, flat result of the taper. If the flat tip is as wide as the nail base, the taper isn't aggressive enough and the shape will read as square, not coffin.</ArticleTip>
      </section>

      <section id="flat-tip">
        <h2 className="font-serif text-2xl font-bold mb-4">Getting the flat tip right</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>The flat tip width is a design decision — narrower tip = more dramatic coffin; wider tip = softer coffin</li>
          <li>Both corners of the flat tip must be at the same height — look straight at the tip from the front to check</li>
          <li>If one corner is higher, file down the top edge from that side to level it</li>
          <li>The corners of the flat tip should be lightly bevelled (one or two light passes at 45 degrees) to remove any sharp catch points that would snag without softening the overall square shape of the tip</li>
        </ul>
      </section>

      <section id="common-mistakes">
        <h2 className="font-serif text-2xl font-bold mb-4">Common mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Uneven taper:</strong> One side angled more than the other shifts the flat tip off-centre; check each side has the same angle and stroke count</li>
          <li><strong>Filing the flat tip on a diagonal:</strong> The tip reads as square only if it's perfectly flat; a diagonal tip creates an asymmetrical look</li>
          <li><strong>Over-tapering into almond:</strong> If you taper the sidewalls past where a flat tip is possible, you lose the shape — the nail becomes almond; stop tapering before reaching a point</li>
          <li><strong>Flat tip too wide:</strong> If the taper isn't aggressive enough, the flat tip is nearly the full width of the nail and the shape reads as square; more aggressive side tapering creates the true coffin profile</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
