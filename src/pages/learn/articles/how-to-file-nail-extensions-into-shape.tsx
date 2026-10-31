import { registerArticle } from '@/lib/articles';
import { ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-file-nail-extensions-into-shape',
  title: 'How to File Nail Extensions Into Shape',
  seoTitle: 'How to File Nail Extensions Into Shape',
  excerpt: 'Filing extensions into shape is one of the most skill-intensive parts of nail work. Here\'s how to approach length, shape, surface, and symmetry with confidence.',
  seoDescription: 'How to file nail extensions into shape. Technique for filing acrylic, Gel-X, and builder gel extensions — length, shape, surface, symmetry, and finishing steps.',
  category: 'nail-education',
  tags: ['how to file nail extensions', 'file nail extensions into shape', 'nail extension filing technique'],
  heroImage: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
  heroImageAlt: 'How to file nail extensions into shape',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Education Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'file-grits', label: 'Which file grit to use when' },
    { id: 'length', label: 'Filing to length' },
    { id: 'shaping', label: 'Filing the shape' },
    { id: 'surface', label: 'Filing the surface' },
    { id: 'symmetry', label: 'Achieving symmetry' },
  ],
  relatedSlugs: ['nail-shapes-explained', 'how-to-shape-almond-nails', 'how-to-shape-coffin-nails', 'nail-file-grit-guide'],
  faq: [
    { q: 'Should I file the surface of extensions before or after shaping?', a: 'Length and shape first, then surface. Finalising the surface finish before the shape is complete means you\'ll need to re-surface after any further edge filing, wasting time and product.' },
    { q: 'How do I file both hands symmetrically?', a: 'Check each nail against its pair on the opposite hand regularly as you work. Work on both index fingers, then both middle fingers, and so on — rather than completing one hand entirely before starting the other. This makes asymmetry visible earlier.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="file-grits">
        <h2 className="font-serif text-2xl font-bold mb-4">Which file grit to use when</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>100–150 grit:</strong> Bulk removal and shaping — getting the shape and removing excess product; use for hard gel and acrylic; too coarse for gel polish or the final surface</li>
          <li><strong>180 grit:</strong> Refining the shape and removing 150-grit scratches; the main shaping file for most enhancement systems</li>
          <li><strong>220–240 grit:</strong> Final surface smoothing; removing 180-grit marks before buffing</li>
          <li><strong>Buffer block:</strong> Creates the smooth shine on gel surfaces; not needed if you're applying gel colour on top</li>
        </ul>
        <ArticleTip>Start coarser than you think you need — it's faster and safer to remove bulk with a coarser file and refine with a finer one than to try to shape with a fine file. The fine file is for finishing, not shaping.</ArticleTip>
      </section>

      <section id="length">
        <h2 className="font-serif text-2xl font-bold mb-4">Filing to length</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>File all nails to the approximate target length before beginning to shape — set the length first so you're shaping from a consistent starting point</li>
          <li>Hold the file flat to the underside of the free edge for an even cut; angling the file shapes rather than cuts to length</li>
          <li>Check both hands from the same viewing angle — holding them side by side to check length match</li>
          <li>If using clippers first: clip conservatively (too long) and file to the final length — it's easier to take more off than to add back</li>
        </ul>
      </section>

      <section id="shaping">
        <h2 className="font-serif text-2xl font-bold mb-4">Filing the shape</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Angle the file to the side walls:</strong> Hold the file at 45 degrees to the sidewall to create the taper for almond, coffin, and stiletto shapes</li>
          <li><strong>Work in one direction:</strong> Filing back and forth creates heat and can weaken the product edge; use consistent forward strokes</li>
          <li><strong>Use the same strokes on both hands:</strong> The same angle, the same number of strokes per side — consistency produces symmetry</li>
          <li><strong>Step back frequently:</strong> Hold the hand at arm's length and check the shape from a distance — problems are more visible from further away</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Specific shape guides: <a href="/learn/how-to-shape-almond-nails" className="underline text-[#F52B8C]">almond</a> · <a href="/learn/how-to-shape-square-nails" className="underline text-[#F52B8C]">square</a> · <a href="/learn/how-to-shape-coffin-nails" className="underline text-[#F52B8C]">coffin</a>.</p>
      </section>

      <section id="surface">
        <h2 className="font-serif text-2xl font-bold mb-4">Filing the surface</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>After shape is finalised, move to surface smoothing with 180 grit — remove any lumps, ridges, or uneven areas in the product surface</li>
          <li>Work in long, sweeping strokes across the full nail length to smooth unevenness</li>
          <li>Focus on the apex — this is where product tends to pile up during application; smooth it to the correct height</li>
          <li>Finish with 220 grit to remove 180-grit scratches before buffing or applying gel colour</li>
        </ul>
      </section>

      <section id="symmetry">
        <h2 className="font-serif text-2xl font-bold mb-4">Achieving symmetry</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Mirror each nail:</strong> After shaping each nail, immediately check the same nail on the other hand</li>
          <li><strong>Check from multiple angles:</strong> Top view, side view, and looking straight along the finger — shape problems are visible from different angles</li>
          <li><strong>Use a light source at nail level:</strong> Holding the hand at eye level with a light source behind the nails reveals asymmetry in the C-curve and surface that you won't see from above</li>
          <li><strong>Take your time on the pinky:</strong> The smallest nail is the easiest to file asymmetrically — slow down and check frequently</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
