import { registerArticle } from '@/lib/articles';
import { ArticleSteps, ArticleTip, ArticleCallout } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-do-french-tips-evenly',
  title: 'How to Do French Tips More Evenly',
  seoTitle: 'How to Do French Tips More Evenly',
  excerpt: 'Uneven french tips are one of the most visible technique problems. Here\'s how to get a consistent smile line — whether you\'re painting freehand, using guides, or working with gel.',
  seoDescription: 'How to do french tips more evenly. Freehand, guide tape, and gel technique for a consistent smile line on every nail — fixes for uneven, wobbly, or asymmetrical french tips.',
  category: 'nail-education',
  tags: ['how to do french tips evenly', 'even french tip', 'french manicure technique'],
  heroImage: 'linear-gradient(135deg, #FAFAFA 0%, #F4F4F5 100%)',
  heroImageAlt: 'How to do french tips more evenly',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Education Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-tips-go-uneven', label: 'Why french tips go uneven' },
    { id: 'freehand-technique', label: 'Freehand technique' },
    { id: 'guide-tape-method', label: 'Guide tape method' },
    { id: 'gel-french', label: 'Gel french tip technique' },
    { id: 'correcting', label: 'Correcting an uneven smile line' },
  ],
  relatedSlugs: ['how-to-apply-gel-polish-without-streaks', 'how-to-create-clean-nail-art-lines', 'how-to-prevent-flooded-cuticles'],
  faq: [
    { q: 'Should the smile line curve up at the sides?', a: 'Yes — a french tip smile line curves upward toward both corners of the free edge, following the shape of where the nail bed ends and the free edge begins. A completely flat smile line is technically achievable but reads as less classic than a curved one.' },
    { q: 'What\'s the best white for french tips?', a: 'Use a gel or polish specifically formulated for french tips — these are usually opaque whites with a thicker consistency designed to hold a clean edge. Standard sheer white or milky polish tends to look uneven and requires too many coats. A bright white gel in a nail art pen or thin brush works well for freehand lines.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-tips-go-uneven">
        <h2 className="font-serif text-2xl font-bold mb-4">Why french tips go uneven</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Different smile line heights across nails:</strong> Some nails naturally have higher or lower free edges — the smile line shouldn't always be at the same vertical height, it should follow the natural curve of each nail</li>
          <li><strong>Inconsistent brush angle:</strong> Changing your brush angle mid-stroke creates a wavy line instead of a smooth curve</li>
          <li><strong>Different nail widths:</strong> The curve must be scaled to each nail's width — a curve that looks balanced on the index finger may look too flat or too steep on the pinky</li>
          <li><strong>Over-thin product:</strong> Very fluid white product feathers rather than holding a clean edge</li>
        </ul>
      </section>

      <section id="freehand-technique">
        <h2 className="font-serif text-2xl font-bold mb-4">Freehand technique</h2>
        <ArticleSteps
          steps={[
            { title: 'Use a thin liner or detailer brush', body: 'A thin, pointed brush gives more control than the standard flat brush. Load the brush lightly with a white or tip colour gel or polish.' },
            { title: 'Anchor the brush at one corner', body: 'Place the brush at one corner of the smile line and anchor your hand against the client\'s finger for stability. Don\'t attempt the stroke from mid-air.' },
            { title: 'Stroke toward the centre', body: 'Stroke from the corner to the centre of the nail in one smooth motion, following the natural curve of the free edge. Lift the brush at the peak of the curve.' },
            { title: 'Mirror from the other corner', body: 'Repeat from the other corner, meeting at the peak. Two strokes per nail — one from each side to the centre — is more controllable than a single stroke across the whole nail.' },
            { title: 'Fill in the tip', body: 'Fill the remaining free edge area within the smile line. The line itself is the tricky part; filling is easier.' },
          ]}
        />
        <ArticleTip>Rest your pinky or ring finger on the client's hand as a pivot point whenever you work. A floating hand wobbles; a braced hand is steady.</ArticleTip>
      </section>

      <section id="guide-tape-method">
        <h2 className="font-serif text-2xl font-bold mb-4">Guide tape method</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Apply french tip guide tape or nail stencils to the nail, positioning the curved edge exactly where the smile line should be</li>
          <li>Press the tape firmly to prevent product bleeding under the edge — this is the most common failure point with guide tape</li>
          <li>Apply the white product over the free edge and onto the tape, then remove the tape before curing if using gel (for a cleaner edge)</li>
          <li>Removing the tape before curing allows you to refine the edge; removing after curing gives a harder edge but risks lifting the cured product</li>
        </ul>
        <ArticleCallout variant="info" title="Remove guide tape before curing gel">
          If you cure gel with the tape still on, removing the tape can pull up the gel edge. Remove the tape as soon as the product is applied and before placing the hand under the lamp.
        </ArticleCallout>
      </section>

      <section id="gel-french">
        <h2 className="font-serif text-2xl font-bold mb-4">Gel french tip technique</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>A gel nail art pen (thin tip) gives the most control for freehand gel french lines</li>
          <li>For extensions: some techs create the french by embedding a white tip beneath the clear or pink gel — the smile line is shaped during the build stage, before colour application</li>
          <li>A gel with a thicker consistency holds the smile line shape better than a runny formula — check the viscosity of your white gel before using it for french tips</li>
        </ul>
      </section>

      <section id="correcting">
        <h2 className="font-serif text-2xl font-bold mb-4">Correcting an uneven smile line</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Before curing:</strong> Use a clean, dry brush or an orange stick to carefully reshape the smile line edge — push product back or remove excess while it's still uncured</li>
          <li><strong>After curing (polish):</strong> Use a small brush dipped in acetone to carefully clean the edge back to the correct curve</li>
          <li><strong>After curing (gel):</strong> Apply a thin layer of the base colour over the mistake, re-cure, and redo the tip — you can't dissolve cured gel</li>
          <li><strong>Top coat fix:</strong> A well-applied glossy top coat can make a slightly wobbly line look better than it is — the smooth finish reduces visual contrast</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
