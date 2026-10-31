import { registerArticle } from '@/lib/articles';
import { ArticleTip, ArticleCallout } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-apply-nail-charms-securely',
  title: 'How to Apply Nail Charms Securely',
  seoTitle: 'How to Apply Nail Charms Securely',
  excerpt: 'Nail charms that pop off within days are a client service issue. Here\'s how to set 3D charms, rhinestones, and nail art embellishments so they stay on for the full wear time.',
  seoDescription: 'How to apply nail charms securely. How to set rhinestones, 3D charms, and nail embellishments so they stay on — placement, gel adhesion, and sealing technique.',
  category: 'nail-education',
  tags: ['how to apply nail charms', 'nail charms technique', 'rhinestone nail art'],
  heroImage: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
  heroImageAlt: 'How to apply nail charms securely',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Education Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-charms-fall', label: 'Why charms fall off' },
    { id: 'rhinestones', label: 'Applying rhinestones' },
    { id: '3d-charms', label: 'Applying 3D charms' },
    { id: 'sealing', label: 'Sealing embellishments' },
    { id: 'placement', label: 'Placement for longevity' },
  ],
  relatedSlugs: ['how-to-create-clean-nail-art-lines', 'how-to-improve-nail-art-skills', 'nail-tech-aftercare-guide'],
  faq: [
    { q: 'Can you seal rhinestones completely under top coat?', a: 'Small flat-back rhinestones can be sealed under top coat. Large or heavy 3D embellishments cannot be fully covered — the top coat layer isn\'t thick enough. For large charms, the key is strong gel adhesion beneath the charm plus a small amount of gel built up around the base edges as a structural seal.' },
    { q: 'What adhesive is best for nail charms?', a: 'Builder gel or hard gel used as adhesive gives the strongest bond — it cures solid and adheres both to the nail surface and the metal or glass charm. Gel glue (nail glue formulated for gel systems) is faster but not as durable. Avoid superglue on nails — it\'s brittle, creates a seal that can damage the nail plate on removal, and isn\'t formulated for skin contact.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-charms-fall">
        <h2 className="font-serif text-2xl font-bold mb-4">Why charms fall off</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Applied to a fully cured, non-tacky surface:</strong> Charms need a tacky gel surface or fresh adhesive gel to grip — they won't bond to a finished, non-sticky surface</li>
          <li><strong>Insufficient adhesive beneath the charm:</strong> Too little gel under the base means there's nothing structural to hold it</li>
          <li><strong>Heavy charm on a weak attachment:</strong> Large, heavy 3D charms pull off under their own weight if not properly built up at the base</li>
          <li><strong>No structural sealing at the base:</strong> The charm-to-nail edge must be sealed with gel around the base to prevent catching and lifting</li>
        </ul>
      </section>

      <section id="rhinestones">
        <h2 className="font-serif text-2xl font-bold mb-4">Applying rhinestones</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Apply rhinestones into a wet (uncured) gel layer — either a layer of clear gel or the tacky top coat layer</li>
          <li>Place the rhinestone with a dotting tool, an orange stick, or a rhinestone picker — not with fingers, which leave oils on the setting</li>
          <li>Press gently to seat the rhinestone flat into the gel — it should sit flush, not perch on top</li>
          <li>After setting all rhinestones, cure the gel layer with the stones in place</li>
          <li>Apply a layer of clear gel around (not over, unless flat-back) the rhinestones to build up the base and seal the edge — cure again</li>
        </ul>
        <ArticleTip>Applying rhinestones to a gel that's been flash-cured (partially cured) rather than fully cured gives a better bond — the gel is firm enough to hold position but still tacky enough to grip the rhinestone base.</ArticleTip>
      </section>

      <section id="3d-charms">
        <h2 className="font-serif text-2xl font-bold mb-4">Applying 3D charms</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Use a dedicated nail charm adhesive gel or a small bead of builder gel as the base for the charm</li>
          <li>Apply the adhesive gel to the nail in the exact spot where the charm will sit — size the bead to the charm base, not larger</li>
          <li>Press the charm firmly into the wet gel; it should be stable and level before curing</li>
          <li>Cure the adhesive through the charm if possible, or flash-cure first then check positioning</li>
          <li>After initial cure, use a fine brush and clear gel to build up the base of the charm on all sides — creating a small structural ramp that holds the charm in place</li>
          <li>Cure the structural layer fully</li>
        </ul>
        <ArticleCallout variant="warning" title="Build up the base for heavy charms">
          A heavy 3D charm with only a thin adhesive layer beneath it will eventually twist and pull off — the weight creates leverage. Build gel up around the base on all sides so the charm is literally encased at its base, not just glued on top.
        </ArticleCallout>
      </section>

      <section id="sealing">
        <h2 className="font-serif text-2xl font-bold mb-4">Sealing embellishments</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Flat rhinestones: seal under top coat — apply top coat over the entire nail including over the stones; the thin layer over the top is protective</li>
          <li>Raised rhinestones and 3D charms: cannot be fully covered; use gel to seal the base edges and leave the top exposed</li>
          <li>Apply top coat to the nail around the embellishments, taking care not to flood the charm base with top coat (which can pop off on curing)</li>
          <li>Cap the free edge with top coat to protect the nail structure regardless of embellishment placement</li>
        </ul>
      </section>

      <section id="placement">
        <h2 className="font-serif text-2xl font-bold mb-4">Placement for longevity</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Place charms away from the cuticle area — charms near the cuticle catch on clothing and are knocked off more easily</li>
          <li>Avoid placement on the very tip of the free edge — this is the highest-impact area and embellishments here will be knocked off quickly</li>
          <li>Centre-nail or mid-nail placement tends to last longest — the charm is somewhat protected on all sides</li>
          <li>For clients with active lifestyles, advise that 3D charms may not last the full wear period and discuss expectations before applying</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
