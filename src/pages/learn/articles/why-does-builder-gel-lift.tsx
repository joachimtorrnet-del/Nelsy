import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'why-does-builder-gel-lift',
  title: 'Why Does Builder Gel Lift? Common Causes and Fixes',
  seoTitle: 'Why Does Builder Gel Lift? Common Causes and How to Fix Them',
  excerpt: 'Builder gel lifting is more complex than gel polish — the thicker product, longer cure, and infill cycle all create more opportunities for failure. Here\'s exactly what causes it.',
  seoDescription: 'Why does builder gel lift? Causes of BIAB and hard gel lifting — from prep and application to infill technique — with specific fixes for each scenario.',
  category: 'nail-education',
  tags: ['why does builder gel lift', 'BIAB lifting causes', 'builder gel lifting fix'],
  heroImage: 'linear-gradient(135deg, #F0F9FF 0%, #BAE6FD 100%)',
  heroImageAlt: 'Why does builder gel lift',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Education Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'prep-causes', label: 'Prep causes' },
    { id: 'application-causes', label: 'Application causes' },
    { id: 'curing-causes', label: 'Curing causes' },
    { id: 'infill-causes', label: 'Infill-specific causes' },
    { id: 'client-causes', label: 'Client-side causes' },
  ],
  relatedSlugs: ['common-builder-gel-mistakes', 'builder-gel-application-guide', 'how-to-improve-nail-retention', 'nail-prep-guide'],
  faq: [
    { q: 'Should builder gel need primer?', a: 'This depends on the specific product system — some builder gels include a bonding base, others require a separate primer or base gel. Always follow your product manufacturer\'s instructions. Using the wrong base, or skipping it, is a primary cause of builder gel lifting.' },
    { q: 'Why does my builder gel lift only at infills?', a: 'Lifting that begins or worsens at infill stage is usually caused by infill technique: not filing back enough to remove shine at the regrowth area, leaving a ridge that product bridges over rather than bonds to, or not re-applying base/primer to the exposed natural nail during the fill.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="prep-causes">
        <h2 className="font-serif text-2xl font-bold mb-4">Prep causes</h2>
        <ArticleTable
          headers={['Cause', 'Fix']}
          rows={[
            ['Oil or moisture on the nail plate', 'Dehydrate and cleanse thoroughly immediately before base/primer application; any oil introduced after dehydration restarts the problem'],
            ['Insufficient pterygium removal', 'Gel sitting on even a thin layer of dead cuticle skin will lift as cells shed; take time with cuticle prep'],
            ['Skipping primer or base gel', 'Builder gel requires the correct base for the system — follow manufacturer guidance exactly; different BIAB and hard gel products have different primer requirements'],
            ['Incorrect surface texture', 'Too smooth (no adhesion) or too rough (uneven layer) both cause problems; use the appropriate file grit for your product system'],
          ]}
        />
      </section>

      <section id="application-causes">
        <h2 className="font-serif text-2xl font-bold mb-4">Application causes</h2>
        <ArticleTable
          headers={['Cause', 'Fix']}
          rows={[
            ['Flooding the cuticle or sidewalls', 'Builder gel flooding cuticles is one of the most common lifting causes; product on skin always lifts; apply with 0.5–1mm gap from all skin'],
            ['Thick application layers', 'Builder gel must be applied in layers the lamp can cure fully; very thick single applications leave under-cured gel in the centre that causes stress and lifting'],
            ['Incorrect product for the nail type', 'Softer BIAB products aren\'t suitable for very short bitten nails with no natural plate to adhere to; match product to nail type'],
            ['Air between layers', 'Ensure each layer is pressed and smoothed before curing; air pockets break adhesion'],
          ]}
        />
      </section>

      <section id="curing-causes">
        <h2 className="font-serif text-2xl font-bold mb-4">Curing causes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Builder gel is thicker than gel polish and requires longer cure times — always follow product-specific guidance</li>
          <li>Under-cured product shrinks slightly as it cures further post-appointment, pulling away from the nail plate</li>
          <li>Lamp compatibility — check that your lamp wavelength matches your product system; not all lamps work with all builder gels</li>
        </ul>
        <ArticleCallout variant="info" title="Follow your product's cure times">
          Builder gel cure times vary significantly between brands and formulations. Never apply gel polish cure times to builder gel — always check the manufacturer's instructions for your specific product.
        </ArticleCallout>
      </section>

      <section id="infill-causes">
        <h2 className="font-serif text-2xl font-bold mb-4">Infill-specific causes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Not filing back the shine at regrowth:</strong> The grown-out nail plate at the base needs the shine removed to allow the new product to bond; skipping this leaves a glossy surface under fresh builder gel</li>
          <li><strong>Leaving a visible product ridge at the regrowth:</strong> A hard step between old product and new nail plate creates a weak point; blend the existing product edge smoothly</li>
          <li><strong>Not re-applying base/primer to the regrowth area:</strong> The newly exposed natural nail at the cuticle needs the same prep as a fresh set</li>
          <li><strong>Leaving old lifting product:</strong> Never layer new product over lifted sections; remove the lifted area first</li>
        </ul>
      </section>

      <section id="client-causes">
        <h2 className="font-serif text-2xl font-bold mb-4">Client-side causes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Harsh cleaning chemicals without gloves breaking down the bond</li>
          <li>Picking at lifting edges — which makes lifting spread faster</li>
          <li>Not coming back for infills on time — very grown-out nails create mechanical stress that causes lifting</li>
          <li>Oil-based hand products applied too soon after the appointment</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">Builder gel application technique: <Link to="/learn/builder-gel-application-guide" className="underline text-[#F52B8C]">builder gel application guide</Link>.</p>
      </section>
    </div>
  ),
});
export {};
