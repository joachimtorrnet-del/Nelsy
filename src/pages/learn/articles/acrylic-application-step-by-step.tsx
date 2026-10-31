import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleSteps, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'acrylic-application-step-by-step',
  title: 'Acrylic Application Step-by-Step for Beginners',
  seoTitle: 'Acrylic Nail Application Step-by-Step Guide for Beginners',
  excerpt: 'A step-by-step guide to acrylic nail application — from prep through finishing — with technique tips, common mistakes, and what to focus on as a beginner.',
  seoDescription: 'Acrylic nail application step-by-step guide for beginner nail techs. Full process from prep to finish, bead placement, apex building, shaping, and common mistakes.',
  category: 'nail-education',
  tags: ['acrylic nail application', 'acrylic nails step by step', 'nail tech beginner', 'acrylic technique'],
  heroImage: 'linear-gradient(135deg, #EFF6FF 0%, #93C5FD 100%)',
  heroImageAlt: 'Acrylic nail application step by step for beginners',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'what-you-need', label: 'What you need' },
    { id: 'prep', label: 'Nail prep' },
    { id: 'tip-forms', label: 'Tips or forms' },
    { id: 'application-steps', label: 'Acrylic application steps' },
    { id: 'shaping-finishing', label: 'Shaping and finishing' },
    { id: 'beginner-mistakes', label: 'Common beginner mistakes' },
  ],
  relatedSlugs: ['acrylic-bead-ratio-explained', 'common-acrylic-mistakes', 'how-to-build-nail-apex', 'nail-prep-guide', 'nail-drill-bits-explained'],
  faq: [
    { q: 'How long does acrylic take to cure?', a: 'Acrylic cures through a chemical reaction (polymerisation) that begins when the liquid monomer and powder polymer are combined. This is self-curing — it does not require a UV/LED lamp. Cure time depends on product formulation, bead ratio, ambient temperature, and bead size. Follow your product manufacturer\'s guidance. Do not use a UV/LED lamp to cure acrylic — it does not accelerate the acrylic cure and may interfere with product.' },
    { q: 'What ratio of liquid to powder should a beginner use?', a: 'A wet-to-medium bead consistency is generally recommended for beginners — the bead should hold its shape but still flow slightly when pressed. A bead that\'s too wet is hard to control and can flood the cuticle; a bead that\'s too dry will be hard to work with and can create a rough, porous product. See the dedicated bead ratio guide for more detail.' },
    { q: 'Can I use any acrylic liquid with any acrylic powder?', a: 'No. Acrylic products are typically formulated to work within a brand\'s own liquid/powder system. Mixing from different brands can cause incompatibility — unexpected curing speeds, poor adhesion, cloudiness, or structural failure. Always follow manufacturer guidance and, when in doubt, keep to one brand system.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-you-need">
        <h2 className="font-serif text-2xl font-bold mb-4">What you need for acrylic application</h2>
        <ArticleTable
          headers={['Item', 'Purpose']}
          rows={[
            ['Acrylic liquid (monomer)', 'The liquid component that, combined with powder, creates the acrylic'],
            ['Acrylic powder (polymer)', 'The powder component — in clear, pink, and natural/cover shades'],
            ['Acrylic brush', 'A kolinsky sable or synthetic brush for picking up and placing acrylic beads'],
            ['Dappen dish', 'Glass or plastic dish for holding your liquid monomer'],
            ['Nail forms or tips', 'Extensions for adding length (nail forms are placed under the free edge; nail tips are applied on top)'],
            ['Nail dehydrator + primer', 'Essential for adhesion to the natural nail plate'],
            ['E-file or manual files', '100–180 grit for shaping; 220–240 for refining surface'],
            ['Buffer', 'For final surface refinement before colour or top coat'],
          ]}
        />
        <ArticleCallout variant="info" title="Product note">
          Acrylic products vary significantly between brands in terms of working time, bead consistency, and finishing requirements. Always follow your specific product manufacturer's instructions — this guide covers general technique principles that apply across most systems.
        </ArticleCallout>
      </section>

      <section id="prep">
        <h2 className="font-serif text-2xl font-bold mb-4">Nail prep for acrylic</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Prep for acrylic is the same as gel prep in principle — remove contamination, create adhesion surface, apply primer — but the stakes are higher because a failed bond on acrylic can cause lifting across a larger surface area than gel polish.</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Push back and remove cuticle from the nail plate</li>
          <li>Remove shine with a file — 180 grit across the whole plate including sidewalls and cuticle area</li>
          <li>Remove dust thoroughly</li>
          <li>Apply dehydrator — allow to dry completely</li>
          <li>Apply acid-free or acid primer according to your product manufacturer's instructions</li>
          <li>Allow primer to reach the correct stage (tacky/chalky) before proceeding</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Full prep guide: <Link to="/learn/nail-prep-guide" className="underline text-[#F52B8C]">nail prep guide for better retention</Link>.</p>
      </section>

      <section id="tip-forms">
        <h2 className="font-serif text-2xl font-bold mb-4">Tips or forms: which to use</h2>
        <ArticleTable
          headers={['Method', 'How it works', 'Best for']}
          rows={[
            ['Nail tips', 'A pre-shaped plastic tip is adhered to the natural nail\'s free edge, then acrylic is applied over the top', 'Beginners — provides a ready-made shape guide; predictable length'],
            ['Nail forms', 'A form is placed under the free edge and acrylic is applied over it, building length from nothing', 'Natural-looking, thinner extensions; requires more technique skill'],
          ]}
        />
        <ArticleTip>As a beginner, start with nail tips — they make length and shape more predictable while you develop bead placement and apex-building skills. Progress to forms once your application technique is consistent.</ArticleTip>
      </section>

      <section id="application-steps">
        <h2 className="font-serif text-2xl font-bold mb-4">Acrylic application steps</h2>
        <ArticleSteps steps={[
          {
            title: 'Apply and prep the tip or set the form',
            body: 'If using tips: apply tip glue to the tip well, press onto the natural nail free edge at a 45° angle, hold firmly, blend the seam with a 180-grit file. If using forms: fit the form under the free edge, ensure it\'s centred and aligned with the nail\'s natural arch.',
          },
          {
            title: 'Dip brush into monomer, then powder — pick up your first bead',
            body: 'Saturate the brush tip in monomer, wipe lightly on the dappen dish edge to remove excess, then press into the powder to pick up a bead. The bead should form naturally without you forcing it. See the dedicated guide on bead ratio for more detail.',
          },
          {
            title: 'Place the first bead at the smile line',
            body: 'On extensions with tips or forms: place a smaller bead at the free edge/smile line area. This establishes the tip and free edge strength. Work in a smooth motion, pressing the bead down and guiding it into shape before it begins to set.',
          },
          {
            title: 'Place the second bead (apex zone)',
            body: 'Pick up a larger, wetter bead and place it just below the cuticle on the nail body. This bead builds the apex — the highest point of the nail arch, sitting roughly in the middle of the nail plate. The apex is structural: it gives the nail its strength and prevents cracking under pressure. See the apex guide for detail.',
          },
          {
            title: 'Place the third bead (cuticle zone)',
            body: 'A smaller, drier bead at the cuticle zone. Work carefully here — the cuticle area is where lifting begins if product gets too close to the skin. Leave a consistent gap. Blend gently, keeping the product thin at the base.',
          },
          {
            title: 'Allow acrylic to cure',
            body: 'Allow the acrylic to cure fully before shaping. Test by gently tapping — it should produce a solid "click" sound rather than a dull thud. Don\'t file before it\'s fully cured. Follow your product\'s guidance on cure time.',
          },
          {
            title: 'Remove forms (if used) and shape',
            body: 'Remove the nail form by pulling it away gently downward. Then shape the free edge with a 100–150 grit file. Check each nail for length and symmetry before starting to refine.',
          },
        ]} />
      </section>

      <section id="shaping-finishing">
        <h2 className="font-serif text-2xl font-bold mb-4">Shaping and finishing</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Once the acrylic has fully cured:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Shape the free edge with a 100–150 grit file for initial shaping</li>
          <li>Refine the upper surface with a 180 grit file — check the apex position and lateral arch</li>
          <li>Use a 240 grit for final surface refinement</li>
          <li>Remove all dust with a nail brush</li>
          <li>Buff to a shine or apply gel top coat (check your product allows this — some acrylic requires specific top coat compatibility)</li>
        </ul>
        <ArticleCallout variant="tip" title="Checking your work before finishing">
          Look at the nails from the side (lateral view) — the apex should be visible as the highest point in the arch. Look from above — check that all nails are a consistent shape and length. Look from the client's perspective at arm's length. These three checks catch most issues before you add colour.
        </ArticleCallout>
      </section>

      <section id="beginner-mistakes">
        <h2 className="font-serif text-2xl font-bold mb-4">Common beginner mistakes</h2>
        <ArticleTable
          headers={['Mistake', 'What happens', 'Fix']}
          rows={[
            ['Too-wet bead', 'Bead floods the cuticle, runs off the nail, is hard to control', 'Use less monomer — the bead should hold shape but still be workable'],
            ['Too-dry bead', 'Bead is hard, drags, creates a rough surface, causes drag lines', 'More monomer — the powder shouldn\'t dust off when pressed'],
            ['Skipping the apex', 'Nail structure is flat and weak, breaks easily under pressure', 'Always build the apex in the stress zone between the free edge and the cuticle'],
            ['Filing too early', 'Soft acrylic tears and creates pits rather than filing clean', 'Wait for full cure before any filing'],
            ['Product too close to cuticle', 'Lifting begins at the cuticle area quickly', 'Leave a consistent 0.5–1mm gap throughout'],
            ['Rushing the whole service', 'Every problem above simultaneously', 'Acrylic is a slower technique than gel — allow appropriate time per client'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">See the dedicated guides: <Link to="/learn/common-acrylic-mistakes" className="underline text-[#F52B8C]">common acrylic mistakes</Link> | <Link to="/learn/acrylic-bead-ratio-explained" className="underline text-[#F52B8C]">acrylic bead ratio explained</Link>.</p>
      </section>
    </div>
  ),
});
export {};
