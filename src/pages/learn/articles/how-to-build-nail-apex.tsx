import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-build-nail-apex',
  title: 'How to Build a Nail Apex Correctly',
  seoTitle: 'How to Build a Nail Apex: Guide for Nail Techs',
  excerpt: 'The apex is the foundation of a strong nail extension. Without it, nails snap. Here\'s what the apex is, where it sits, and how to build it correctly in acrylic, gel, and builder gel.',
  seoDescription: 'How to build a nail apex. What the apex is, where it sits, how to build it in acrylic and gel, and how to check your apex placement is correct.',
  category: 'nail-education',
  tags: ['nail apex', 'apex nail technique', 'acrylic apex', 'nail structure'],
  heroImage: 'linear-gradient(135deg, #FFF7ED 0%, #FED7AA 100%)',
  heroImageAlt: 'How to build a nail apex correctly',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'what-is-apex', label: 'What the apex is and why it matters' },
    { id: 'apex-placement', label: 'Where the apex sits' },
    { id: 'apex-in-acrylic', label: 'Building the apex in acrylic' },
    { id: 'apex-in-gel', label: 'Building the apex in gel' },
    { id: 'checking-apex', label: 'How to check your apex' },
    { id: 'common-problems', label: 'Common apex problems' },
  ],
  relatedSlugs: ['acrylic-application-step-by-step', 'builder-gel-application-guide', 'acrylic-bead-ratio-explained', 'how-to-improve-nail-retention'],
  faq: [
    { q: 'Where exactly is the apex on a nail?', a: 'The apex is the highest point of the nail when viewed from the side (lateral profile). It sits roughly in the middle of the nail plate — approximately halfway between the cuticle and the free edge, or slightly toward the free edge side of centre. On a well-built nail, the apex creates a gentle arch that distributes impact force along the nail rather than allowing stress to concentrate at one point.' },
    { q: 'Does a nail need an apex if it\'s short?', a: 'Yes, though on very short natural nail overlays the apex is less pronounced. Even on short natural nail BIAB overlays, a slight thickening in the stress zone (the mid-nail area) improves strength and prevents cracking under pressure. As the nail grows longer, the apex becomes increasingly important to prevent breakage.' },
    { q: 'Can I build an apex with gel polish?', a: 'Not meaningfully — standard gel polish is too thin to create a structural apex. For an apex that provides structural benefit, you need builder gel, hard gel, or acrylic. A BIAB or builder gel applied in two layers can create a functional apex on natural nails.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-is-apex">
        <h2 className="font-serif text-2xl font-bold mb-4">What the apex is and why it matters</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The apex is the highest point of the nail when viewed from the side — a deliberate thickening of product at the stress zone of the nail. Its purpose is structural: by distributing the product thickness where the nail will experience the most mechanical stress, it prevents the nail from snapping or cracking under impact or pressure.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">Without an apex, product is distributed evenly across the nail surface or, worse, thicker at the cuticle area. This creates a nail that is weaker in the zone where stress concentrates. The result: nails that snap cleanly across the middle under normal hand use.</p>
        <ArticleCallout variant="info" title="The arch principle">
          The apex works on the same principle as an arch in architecture: load applied to the top of an arch is distributed outward and downward along the curve rather than forcing the structure to collapse. A well-built nail apex does the same — pressure applied from above distributes along the arch toward the nail bed and tip rather than breaking through at the middle.
        </ArticleCallout>
      </section>

      <section id="apex-placement">
        <h2 className="font-serif text-2xl font-bold mb-4">Where the apex sits</h2>
        <ArticleTable
          headers={['Nail zone', 'Description', 'Product thickness goal']}
          rows={[
            ['Cuticle area', 'Where product meets natural nail at the base', 'Thin — thinnest part of the product'],
            ['Middle nail / stress zone', 'Roughly centre of the nail plate, slightly free-edge side', 'Thickest — this is the apex zone'],
            ['Free edge', 'The tip of the extension', 'Thin — tapers down from the apex to the edge'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">When you look at the nail from the side, the profile should show: thin at the cuticle, rising to the apex in the middle, then gently tapering to the tip. This creates the characteristic "C-curve" arch of a professionally finished nail.</p>
      </section>

      <section id="apex-in-acrylic">
        <h2 className="font-serif text-2xl font-bold mb-4">Building the apex in acrylic</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">In a three-bead acrylic technique:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Bead 1 (free edge):</strong> Placed at the smile line/tip — creates the tip structure</li>
          <li><strong>Bead 2 (apex):</strong> This is the apex bead — the largest bead, placed in the apex zone. Pick up a medium-wet bead and place it at the mid-nail. Press down into the nail and guide toward the free edge and cuticle to build the arch shape. This bead creates the structural high point.</li>
          <li><strong>Bead 3 (cuticle zone):</strong> A smaller bead at the cuticle area — used to cover and blend the proximal nail. Kept thin.</li>
        </ul>
        <ArticleTip>When placing the apex bead, don\'t flatten it completely — allow it to retain some height as it sets. Pressing too hard removes the apex before it\'s had a chance to build the arch. Guide the product with light, even pressure.</ArticleTip>
      </section>

      <section id="apex-in-gel">
        <h2 className="font-serif text-2xl font-bold mb-4">Building the apex in builder gel</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">In builder gel (BIAB), the apex is created through layering:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>First layer:</strong> Thin, even base coat of builder gel over the whole nail. Establishes adhesion.</li>
          <li><strong>Second layer (apex layer):</strong> Apply slightly more product in the apex zone — the mid-nail area — while keeping the cuticle and free edge thin. Allow the product to self-level slightly. The built-up area in the apex zone creates the structural arch.</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">In hard gel over forms, the apex technique is similar to acrylic — working in zones, building thickness in the middle, keeping cuticle and tip thin.</p>
      </section>

      <section id="checking-apex">
        <h2 className="font-serif text-2xl font-bold mb-4">How to check your apex</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Side profile check:</strong> Hold the nail at eye level and look at the profile. The apex (highest point) should be visible as a gentle peak at the mid-nail. There should be a visible rise from the cuticle and a gentle taper to the tip.</li>
          <li><strong>Pinch test (on cured product):</strong> Press gently on the apex zone with one finger. It should feel solid with no flex. Flexing indicates the product is too thin.</li>
          <li><strong>Consistency check:</strong> Compare all ten nails from the side — the apex position should be consistently similar across all fingers.</li>
        </ol>
        <ArticleCallout variant="tip" title="Practice on nail tips">
          Practice apex building on nail tips or practice hands before clients. The side-profile view is how you assess apex work — it\'s very different from the overhead view you naturally see while working. Developing the muscle memory to look from the side during application takes deliberate practice.
        </ArticleCallout>
      </section>

      <section id="common-problems">
        <h2 className="font-serif text-2xl font-bold mb-4">Common apex problems</h2>
        <ArticleTable
          headers={['Problem', 'Cause', 'Fix']}
          rows={[
            ['No apex visible from side profile', 'Product applied evenly across the nail without building the middle zone', 'Apply more product to the apex zone specifically; don\'t flatten the bead/layer completely'],
            ['Apex too close to cuticle', 'Apex bead placed too far back', 'Place apex bead further toward the mid-nail, not at the base'],
            ['Apex too close to free edge', 'Apex bead placed too far forward', 'The stress zone is the nail centre — bring placement back'],
            ['Flat-looking nails that snap easily', 'No functional apex; product distributed too evenly', 'Add a structural middle layer in builder gel; build the apex bead in acrylic'],
            ['Bumpy surface at apex after filing', 'Apex built unevenly; filing removed too much product', 'Build more consistently; develop the eye for lateral profile assessment'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For more on acrylic technique: <Link to="/learn/acrylic-application-step-by-step" className="underline text-[#F52B8C]">acrylic application step-by-step</Link> | <Link to="/learn/builder-gel-application-guide" className="underline text-[#F52B8C]">builder gel application guide</Link>.</p>
      </section>
    </div>
  ),
});
export {};
