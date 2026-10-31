import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-improve-nail-retention',
  title: 'How to Improve Nail Retention',
  seoTitle: 'How to Improve Nail Retention: Complete Guide for Nail Techs',
  excerpt: 'Poor retention frustrates both nail techs and clients. This guide covers every factor that affects how long gel and acrylic stays on — from prep through aftercare.',
  seoDescription: 'How to improve nail retention. A complete guide for nail techs — prep, product application, client aftercare, troubleshooting lifting and peeling, and common mistakes.',
  category: 'nail-education',
  tags: ['nail retention', 'improve nail retention', 'gel lifting', 'nail prep'],
  heroImage: 'linear-gradient(135deg, #ECFDF5 0%, #6EE7B7 100%)',
  heroImageAlt: 'How to improve nail retention guide for nail techs',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'what-affects-retention', label: 'What affects nail retention' },
    { id: 'prep', label: 'The prep factor' },
    { id: 'application', label: 'Application factors' },
    { id: 'curing', label: 'Curing and lamp factors' },
    { id: 'client-aftercare', label: 'Client aftercare' },
    { id: 'troubleshooting', label: 'Troubleshooting: where is the lifting?' },
  ],
  relatedSlugs: ['nail-prep-guide', 'how-to-prevent-nail-lifting', 'nail-file-grit-guide', 'nail-drill-bits-explained'],
  faq: [
    { q: 'My clients always get lifting after a week — is it my product?', a: 'Product is rarely the cause of consistent lifting. Before switching products, systematically check: (1) your prep sequence — is the nail plate truly oil and moisture-free before application? (2) your base coat application — is it thin, fully covering the free edge, not touching cuticles? (3) your curing — is your lamp appropriate for your specific product? Consistent lifting across multiple clients almost always points to prep.' },
    { q: 'Some clients get lifting and others don\'t — why?', a: 'Client-specific factors: oily nail beds, wet work (regular dishwashing, nursing, hairdressing), thin or ridged natural nails, or not following aftercare. If a specific client consistently lifts while others don\'t, it\'s worth using a stronger primer with them, advising cuticle oil daily, and discussing their daily hand activities.' },
    { q: 'Does cuticle oil actually improve retention?', a: 'Yes, when used correctly. Cuticle oil applied daily to the cuticle area (not the product surface) keeps the surrounding skin flexible and prevents it from lifting the product at the edges. A dehydrated cuticle can pull on the product. Cuticle oil on the product surface over the top coat can cause lifting — timing and placement matter.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-affects-retention">
        <h2 className="font-serif text-2xl font-bold mb-4">What affects nail retention</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Nail retention is the result of multiple factors working together. A failure in any one of them can cause premature lifting or peeling. Understanding all the factors means you can systematically diagnose the cause when something goes wrong — rather than guessing or changing everything at once.</p>
        <ArticleTable
          headers={['Factor', 'Impact on retention']}
          rows={[
            ['Prep quality', 'High — the most common cause of lifting'],
            ['Base coat application technique', 'High — flooding cuticle or missing the free edge causes edge lifting'],
            ['Primer/dehydrator use', 'High — especially on oily nail beds'],
            ['Lamp type and wattage', 'High — wrong lamp = under-cured product'],
            ['Product layering and thickness', 'Medium — thick layers lift; inadequate cure between layers lifts'],
            ['Client aftercare', 'Medium — picking, wet work, no cuticle oil'],
            ['Natural nail condition', 'Medium — thin, ridged, or damaged nails are harder to retain product on'],
            ['Product compatibility', 'Medium — mixing incompatible product brands can cause adhesion failure'],
          ]}
        />
      </section>

      <section id="prep">
        <h2 className="font-serif text-2xl font-bold mb-4">The prep factor</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Prep is the most common cause of retention problems. Before investigating anything else, audit your prep sequence:</p>
        <ArticleChecklist title="Prep retention audit" items={[
          'Are you removing all pterygium (dead skin) from the nail plate before buffing?',
          'Are you buffing every part of the nail — including the sidewalls and cuticle area?',
          'Are you using a dehydrator on every client, every time?',
          'Are you waiting for the dehydrator to fully dry before applying primer?',
          'Are you touching the nail plate after dehydration (re-contaminating with skin oil)?',
          'Are you applying primer to the natural nail only — not cuticles or skin?',
          'Are you allowing primer to dry/reach tacky stage before applying base coat?',
        ]} />
        <p className="text-gray-700 mt-4 leading-relaxed">For the full step-by-step prep sequence: <Link to="/learn/nail-prep-guide" className="underline text-[#F52B8C]">nail prep guide for better retention</Link>.</p>
      </section>

      <section id="application">
        <h2 className="font-serif text-2xl font-bold mb-4">Application factors</h2>
        <ArticleTable
          headers={['Application factor', 'What to check']}
          rows={[
            ['Flooding the cuticle', 'Product that touches or overlaps the cuticle will lift with it. Leave a consistent 0.5–1mm gap.'],
            ['Not capping the free edge', 'Sealing the free edge with each layer is the primary defence against tip lifting and water ingress.'],
            ['Thick layers', 'Thick base coats don\'t cure fully, especially on darker colours. Apply in thin layers, cure fully between.'],
            ['Uneven base coat', 'Uneven base coat creates stress points. The base coat should be flat and consistent across the nail plate.'],
            ['Rushing colour coats', 'Under-cured colour causes the whole structure to be compromise. Don\'t rush curing to save time.'],
            ['Top coat flooding', 'Like base coat — don\'t flood the cuticle with top coat. Cap the edge, leave a gap.'],
          ]}
        />
        <ArticleTip>Capping the free edge means running the brush or applicator along the very tip of the nail at the end of each coat application. This seals the product edge and is the single most impactful application habit for tip retention.</ArticleTip>
      </section>

      <section id="curing">
        <h2 className="font-serif text-2xl font-bold mb-4">Curing and lamp factors</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Under-cured product causes soft, flexible layers that lift or peel. Lamp issues are less obvious than prep issues but equally impactful:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Lamp wattage:</strong> Different products require different minimum wattage. Check your product manufacturer's recommended lamp specification — using an underpowered lamp will cause soft cure regardless of time.</li>
          <li><strong>Lamp bulb age:</strong> LED lamps degrade over time and lose output wattage. If you've had your lamp for several years and are getting more lifting, the lamp may need replacing.</li>
          <li><strong>Nail position in lamp:</strong> Nails at the edges of the lamp footprint receive less curing energy. Ensure the whole nail is exposed, and reposition if needed for thumb curing.</li>
          <li><strong>Inhibition layer:</strong> The tacky inhibition layer on gel products is normal — it's removed with cleanser before top coat. Don't confuse the inhibition layer with under-cure.</li>
          <li><strong>Dark/pigmented colours:</strong> Dark gel polishes absorb more UV/LED energy and may require longer curing time. Follow manufacturer guidance for dark or highly pigmented shades.</li>
        </ul>
      </section>

      <section id="client-aftercare">
        <h2 className="font-serif text-2xl font-bold mb-4">Client aftercare</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Client behaviour after the appointment significantly affects retention — especially for clients who do frequent wet work. Provide these instructions with every appointment confirmation or verbally at the end of the service:</p>
        <ArticleCallout variant="info" title="Aftercare instructions to give every client">
          — Avoid prolonged water exposure for the first 24 hours (no long baths or swimming).{'\n'}
          — Wear gloves for cleaning, washing up, and heavy-duty wet work.{'\n'}
          — Apply cuticle oil daily to the cuticle area (not on the nail plate itself — on the skin around the nail).{'\n'}
          — Don\'t pick or peel your nails — if a nail lifts, come back to have it fixed rather than peeling it off.{'\n'}
          — Use your hands carefully for the first few hours — avoid using nails as tools.
        </ArticleCallout>
      </section>

      <section id="troubleshooting">
        <h2 className="font-serif text-2xl font-bold mb-4">Troubleshooting: where is the lifting?</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The location of lifting is diagnostic — different locations point to different causes:</p>
        <ArticleTable
          headers={['Where it lifts', 'Likely cause']}
          rows={[
            ['Cuticle area (proximal edge)', 'Product touching or too close to the cuticle; primer not covering that area; inadequate prep at the cuticle'],
            ['Free edge / tip', 'Not capping the free edge; client using nails as tools; tip thinness on extension product'],
            ['Sidewalls', 'Insufficient buffing at the sidewall; product touching the sidewall skin'],
            ['Entire nail popping off', 'Dehydrator or primer skipped; incompatible products; smooth natural nail plate not adequately buffed'],
            ['One specific nail repeatedly', 'That finger does specific wet work or mechanical stress; natural nail issue (ridge, damage) on that finger'],
            ['One specific client', 'Oily nail bed — try a stronger primer; review their aftercare compliance'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">See also: <Link to="/learn/how-to-prevent-nail-lifting" className="underline text-[#F52B8C]">how to prevent nail lifting</Link>.</p>
      </section>
    </div>
  ),
});
export {};
