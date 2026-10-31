import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'common-acrylic-mistakes',
  title: 'Common Acrylic Nail Mistakes and How to Fix Them',
  seoTitle: 'Common Acrylic Nail Mistakes and How to Fix Them',
  excerpt: 'Most acrylic problems come back to the same handful of mistakes. This guide covers the most common issues nail techs encounter — what causes them and how to fix them.',
  seoDescription: 'Common acrylic nail mistakes and how to fix them. Lifting, bubbles, cracking, cloudy product, rough surface — causes and solutions for nail techs.',
  category: 'nail-education',
  tags: ['acrylic mistakes', 'acrylic troubleshooting', 'acrylic nails problems', 'nail tech education'],
  heroImage: 'linear-gradient(135deg, #FEF2F2 0%, #FECACA 100%)',
  heroImageAlt: 'Common acrylic nail mistakes and fixes',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'lifting', label: 'Lifting' },
    { id: 'bubbles', label: 'Bubbles in the product' },
    { id: 'cloudy-product', label: 'Cloudy or discoloured product' },
    { id: 'cracking', label: 'Cracking and breaking' },
    { id: 'rough-surface', label: 'Rough or grainy surface' },
    { id: 'flooding-cuticle', label: 'Flooding the cuticle' },
    { id: 'uneven-apex', label: 'Uneven or missing apex' },
  ],
  relatedSlugs: ['acrylic-application-step-by-step', 'acrylic-bead-ratio-explained', 'how-to-build-nail-apex', 'nail-prep-guide'],
  faq: [
    { q: 'Why do my acrylic nails keep breaking at the same spot?', a: 'Consistent breakage in the same location points to a structural issue. Breaking at the stress zone (mid-nail) usually indicates an absent or misplaced apex. Breaking at the free edge suggests the tip product is too thin. Breaking near the cuticle often points to lifting that\'s been ongoing — the product has separated from the nail and the remaining bond is under disproportionate stress.' },
    { q: 'Why does my acrylic look yellow after a few weeks?', a: 'Yellowing in cured acrylic is usually caused by: UV exposure (sunlight degrades some acrylic pigments), product contamination (certain pigmented gel polishes can migrate into acrylic), or the product itself if it\'s a lower-grade formulation. Use a UV-inhibiting top coat, and test your top coat product with your acrylic for compatibility to prevent pigment migration.' },
    { q: 'Can I fix lifting at home between appointments?', a: 'Advise clients not to — any gap between the product and the natural nail is a potential entry point for moisture and bacteria. Self-fixing with a home nail glue creates an additional layer over the problem rather than addressing it. The correct approach is to come in for a repair appointment.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="lifting">
        <h2 className="font-serif text-2xl font-bold mb-4">Lifting</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Lifting — product separating from the natural nail — is the most common acrylic complaint. The location of lifting is diagnostic:</p>
        <ArticleTable
          headers={['Where it lifts', 'Likely cause']}
          rows={[
            ['Cuticle edge (proximal)', 'Product too close to cuticle; primer not reaching that area; prep missed the cuticle zone'],
            ['Sidewalls', 'Product extending onto the lateral skin; insufficient prep at the sidewalls'],
            ['Tip / free edge', 'Free edge not sealed; tip bond failure; tip not properly blended'],
            ['Whole nail lifting off', 'Dehydrator or primer skipped; incompatible product; completely smooth nail plate (prep failure)'],
          ]}
        />
        <ArticleCallout variant="tip" title="Lifting fix at appointment">
          For a lifting nail at an infill: remove the lifted product entirely back to the natural nail — don\'t just fill over a gap. Applying product over lifting creates a pocket that holds moisture and can lead to bacterial or fungal issues. Clean the area, reapply primer, and seal properly.
        </ArticleCallout>
      </section>

      <section id="bubbles">
        <h2 className="font-serif text-2xl font-bold mb-4">Bubbles in the product</h2>
        <ArticleTable
          headers={['Cause', 'Fix']}
          rows={[
            ['Air trapped during bead placement', 'Place beads firmly without trapping air between bead and nail surface. Don\'t drag.'],
            ['Working time exceeded before placement', 'Work faster with each bead once picked up; place and don\'t overwork'],
            ['Over-working the bead', 'Place and smooth with minimum strokes; over-working introduces air'],
            ['Too-dry bead', 'Porous consistency creates internal air pockets; use a medium-wet bead'],
            ['Contamination in monomer', 'Replace monomer if consistently getting bubbles — contaminated monomer can cause issues'],
          ]}
        />
        <ArticleTip>Small surface bubbles can sometimes be resolved at the file stage if they're at the surface. Bubbles trapped within the product body require removal and reapplication of that section — they cannot be filed out.</ArticleTip>
      </section>

      <section id="cloudy-product">
        <h2 className="font-serif text-2xl font-bold mb-4">Cloudy or discoloured product</h2>
        <ArticleTable
          headers={['Cause', 'Fix']}
          rows={[
            ['Moisture contamination during application', 'Work in a dry environment; don\'t blow on nails; keep monomer covered between beads'],
            ['Over-wet bead', 'Excess monomer that doesn\'t fully react can create cloudiness; use correct ratio'],
            ['Product contamination', 'Replace monomer if it has become contaminated (e.g. water, oil, colour pigment)'],
            ['Wrong product pairing', 'Some monomer/powder combinations from different brands don\'t produce clear results; stay within a brand system'],
            ['Age/degradation', 'Expired or improperly stored product degrades — replace aged stock'],
          ]}
        />
      </section>

      <section id="cracking">
        <h2 className="font-serif text-2xl font-bold mb-4">Cracking and breaking</h2>
        <ArticleTable
          headers={['Type of crack', 'Cause', 'Fix']}
          rows={[
            ['Stress crack at mid-nail', 'No apex or misplaced apex; product too thin in the stress zone', 'Build a structural apex; see apex guide'],
            ['Crack at free edge', 'Free edge product too thin; tip bond failure', 'Build more product at the smile line; ensure tip is properly bonded'],
            ['Horizontal crack near cuticle', 'Product too thin at base; or lifting creating a stress point', 'Build more product near the base; address any lifting before it progresses'],
            ['Surface micro-cracking', 'Product over-filed; too-thin application layer; product degradation', 'Don\'t over-file; maintain adequate product thickness; check product age'],
          ]}
        />
      </section>

      <section id="rough-surface">
        <h2 className="font-serif text-2xl font-bold mb-4">Rough or grainy surface</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A rough or grainy cured surface is almost always a too-dry bead problem:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Too-dry bead: the powder doesn't fully bind; creates a porous, grainy texture</li>
          <li>Over-worked bead: working the bead too much as it begins to set pulls the surface</li>
          <li>Filing too early: filing before full cure tears the product</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">A rough surface can be addressed with filing and buffing once fully cured, but the underlying issue (bead ratio or filing timing) needs to be corrected at the process level.</p>
      </section>

      <section id="flooding-cuticle">
        <h2 className="font-serif text-2xl font-bold mb-4">Flooding the cuticle</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Product that touches or overlaps the cuticle skin almost always lifts — the product bonds to the skin and lifts when the skin moves. Causes:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Too-wet bead that runs before setting</li>
          <li>Placing the cuticle bead too far back (too close to the cuticle)</li>
          <li>Not checking the cuticle gap before curing</li>
        </ul>
        <ArticleCallout variant="tip" title="Fix for mild flooding">
          If product has touched the cuticle, gently create a break in the product at the skin line with an orangewood stick or a cuticle tool before it cures — don\'t drag along the cuticle, but lift and separate the product from the skin. After curing, ensure there\'s a visible clean gap at the cuticle.
        </ArticleCallout>
      </section>

      <section id="uneven-apex">
        <h2 className="font-serif text-2xl font-bold mb-4">Uneven or missing apex</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A flat nail (no apex) breaks easily; an apex in the wrong position creates nails that look unfinished or are still structurally compromised:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Missing apex: product distributed evenly rather than built in the mid-nail zone</li>
          <li>Apex too far back: creates a thick nail near the cuticle, thin in the stress zone</li>
          <li>Uneven apex: different height on each nail, creating inconsistent side profiles</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">The solution is consistent lateral profile assessment during application. See: <Link to="/learn/how-to-build-nail-apex" className="underline text-[#F52B8C]">how to build a nail apex correctly</Link>.</p>
      </section>
    </div>
  ),
});
export {};
