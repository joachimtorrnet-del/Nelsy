import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleSteps, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'gel-x-application-step-by-step',
  title: 'Gel-X Application Step-by-Step',
  seoTitle: 'Gel-X Application Step-by-Step Guide for Nail Techs',
  excerpt: 'Gel-X extensions offer natural-looking length without acrylic. Here\'s the full application process — from prep to finishing — with tips on sizing, adhesion, and removal.',
  seoDescription: 'Gel-X application step-by-step guide for nail techs. Full process from prep to cure, tip sizing, adhesion gel, shaping, and how to get the best retention on Gel-X.',
  category: 'nail-education',
  tags: ['gel-x application', 'gel-x nails', 'nail extension technique', 'soft gel extensions'],
  heroImage: 'linear-gradient(135deg, #F5F3FF 0%, #C4B5FD 100%)',
  heroImageAlt: 'Gel-X application step by step for nail techs',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'what-is-gel-x', label: 'What Gel-X is' },
    { id: 'what-you-need', label: 'What you need' },
    { id: 'sizing-tips', label: 'Sizing the tips' },
    { id: 'application-steps', label: 'Application steps' },
    { id: 'finishing-shaping', label: 'Finishing and shaping' },
    { id: 'removal', label: 'Removal' },
    { id: 'common-issues', label: 'Common issues and fixes' },
  ],
  relatedSlugs: ['builder-gel-application-guide', 'acrylic-application-step-by-step', 'nail-prep-guide', 'how-to-improve-nail-retention'],
  faq: [
    { q: 'What\'s the difference between Gel-X and acrylic extensions?', a: 'Gel-X uses pre-shaped soft gel tips bonded with a UV/LED-curing adhesion gel — no monomer, no acrylic powder. The tips are made from soft gel material and are removed by soaking in acetone (like gel polish) rather than filing off. They are generally thinner and more flexible than acrylic. Gel-X is known for a more natural look and feel.' },
    { q: 'Do Gel-X extensions last as long as acrylic?', a: 'Typically 2–3 weeks with proper prep and aftercare, similar to structured gel. They are generally considered slightly less durable than traditional acrylic for very active clients or those with oily nail beds. Retention is heavily dependent on prep quality and adhesion gel application.' },
    { q: 'Can you do nail art on Gel-X extensions?', a: 'Yes — Gel-X tips can be painted with gel polish, have chrome applied, or have nail art applied on top, the same as a natural nail with gel. The tip is a canvas. Some techs apply gel polish over the top coat; others apply directly to the tip before the final seal. Follow your product guidelines.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-is-gel-x">
        <h2 className="font-serif text-2xl font-bold mb-4">What Gel-X is</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Gel-X (also written as Gel X) is a soft gel extension system that uses pre-shaped, pre-sized gel nail tips bonded to the natural nail using an adhesion gel and a UV/LED lamp. The key distinction from acrylic: there is no monomer liquid involved, the curing is done with a lamp, and removal is via acetone soak (not e-filing).</p>
        <p className="text-gray-700 leading-relaxed">The technique was popularised by Aprés Nail but is now produced by multiple brands. Always follow your specific brand's instructions — cure times, adhesion gel requirements, and sizing conventions vary between systems.</p>
        <ArticleCallout variant="info" title="Important">
          All cure times, primer requirements, and product-specific instructions vary by brand. This guide covers general technique principles. Always defer to your product manufacturer's specific guidance.
        </ArticleCallout>
      </section>

      <section id="what-you-need">
        <h2 className="font-serif text-2xl font-bold mb-4">What you need</h2>
        <ArticleTable
          headers={['Item', 'Purpose']}
          rows={[
            ['Gel-X tips (full set of sizes)', 'Pre-shaped gel tips in your chosen nail shapes and lengths'],
            ['Extension gel / adhesion gel', 'Applied inside the tip to bond it to the natural nail'],
            ['UV/LED lamp', 'Must be compatible with your specific product system'],
            ['Nail dehydrator', 'Removes moisture and oil from the nail plate pre-application'],
            ['Primer (optional, brand-dependent)', 'Some Gel-X systems require primer; others don\'t — follow your product'],
            ['Tip sizing tools', 'A sizing stick or ruler to match tip widths to natural nail width'],
            ['Cuticle pusher', 'For prep'],
            ['Files', '180-grit for shaping; 240 for refinement'],
          ]}
        />
      </section>

      <section id="sizing-tips">
        <h2 className="font-serif text-2xl font-bold mb-4">Sizing the tips correctly</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Correct tip sizing is critical. A tip that's too wide will lift at the sidewalls; one that's too narrow creates a gap that allows product ingress and premature lifting.</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>The tip should match the width of the natural nail from sidewall to sidewall — no gaps, no overlapping the skin</li>
          <li>Try each tip before applying adhesion gel — press it against the nail to check fit</li>
          <li>If between two sizes, opt for the slightly smaller size and file the sides slightly to fit, rather than going larger</li>
          <li>The cuticle edge of the tip should sit just at or slightly above the cuticle, not touching it</li>
        </ul>
        <ArticleTip>Pre-size all ten tips before applying any adhesion gel — lay them in order on your workspace or on a tip tray. Pre-sizing prevents errors once adhesion gel is on the nail and time is limited.</ArticleTip>
      </section>

      <section id="application-steps">
        <h2 className="font-serif text-2xl font-bold mb-4">Application steps</h2>
        <ArticleSteps steps={[
          {
            title: 'Prep the natural nail',
            body: 'Push back cuticle, remove pterygium, lightly buff the nail plate, remove dust, apply dehydrator, allow to dry. Apply primer if your specific product requires it.',
          },
          {
            title: 'Apply adhesion gel inside the tip',
            body: 'Apply a small amount of extension gel to the inside of the pre-sized tip. The amount varies by product — generally enough to cover the contact area without overflow. A thin, even application is better than a thick pooled amount.',
          },
          {
            title: 'Press the tip onto the natural nail',
            body: 'Hold the tip at a 45° angle, align with the cuticle line and sidewalls, then press the tip down flat against the nail in a rocking motion from back to front. Apply firm, consistent pressure across the tip.',
          },
          {
            title: 'Cure',
            body: 'Cure immediately after pressing — follow your product\'s recommended cure time for the initial bond cure. Do not allow adhesion gel to begin curing before the tip is correctly positioned.',
          },
          {
            title: 'Check for bubbles or lifting',
            body: 'After the initial cure, check each tip for air pockets or partial lifting at the sidewalls or cuticle edge. Any gap between the tip and the natural nail is a potential lifting point. If a tip hasn\'t adhered fully, remove it, clean the nail, and reapply.',
          },
          {
            title: 'Full cure',
            body: 'Cure all nails according to your product\'s final cure time. Many systems require a full final cure after all ten tips are applied.',
          },
        ]} />
      </section>

      <section id="finishing-shaping">
        <h2 className="font-serif text-2xl font-bold mb-4">Finishing and shaping</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">After curing:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>File the free edge to the desired shape using a 180-grit file</li>
          <li>Lightly buff the surface of the tip if needed to remove any shine or marks before colour</li>
          <li>Apply gel polish or gel colour as usual — thin coats, cap the free edge, cure fully between layers</li>
          <li>Finish with gel top coat — cure, remove inhibition layer if required by your product</li>
        </ul>
        <ArticleCallout variant="tip" title="Apical strength on Gel-X">
          Unlike acrylic, you cannot build a structural apex with Gel-X in the same way. The tips come pre-shaped. To reinforce a Gel-X set (especially on clients with active lifestyles), you can apply a thin layer of builder gel or hard gel over the tip before colour to add structure and impact resistance. Check product compatibility before doing this.
        </ArticleCallout>
      </section>

      <section id="removal">
        <h2 className="font-serif text-2xl font-bold mb-4">Removal</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Gel-X tips are removed by soaking in acetone — similar to gel polish removal:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>File the surface of the tip lightly to break the seal</li>
          <li>Soak cotton pads in acetone, place on each nail, wrap in foil or use soak-off clips</li>
          <li>Leave for the time recommended by your product (typically 10–20 minutes)</li>
          <li>Gently push off the softened tip — do not force or peel</li>
          <li>Remove any remaining adhesion gel residue gently from the natural nail</li>
          <li>Assess the natural nail and provide appropriate aftercare</li>
        </ol>
      </section>

      <section id="common-issues">
        <h2 className="font-serif text-2xl font-bold mb-4">Common issues and fixes</h2>
        <ArticleTable
          headers={['Issue', 'Likely cause', 'Fix']}
          rows={[
            ['Tips lifting at sidewalls', 'Tips too wide; adhesion gel didn\'t reach sidewall area', 'Size down; apply adhesion gel to cover the full contact zone'],
            ['Air bubbles under tip', 'Pressing technique — tip not pressed flat evenly', 'Rock the tip front-to-back during application; check pressure is even'],
            ['Tips pop off within a week', 'Prep failure; incorrect primer use for this product; too little adhesion gel', 'Review prep; check if your product requires primer; check adhesion gel coverage'],
            ['Tip sizing consistently wrong', 'Working from tip size numbers that don\'t match this brand\'s system', 'Size fresh for every new brand — numbers are not universal'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For retention across all extension systems: <Link to="/learn/how-to-improve-nail-retention" className="underline text-[#F52B8C]">how to improve nail retention</Link>.</p>
      </section>
    </div>
  ),
});
export {};
