import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'common-builder-gel-mistakes',
  title: 'Common Builder Gel Mistakes and How to Fix Them',
  seoTitle: 'Common Builder Gel (BIAB) Mistakes and How to Fix Them',
  excerpt: 'Builder gel is a rewarding system to master — but it has common technique pitfalls. Here are the mistakes nail techs most frequently make with builder gel / BIAB and how to address them.',
  seoDescription: 'Common builder gel and BIAB mistakes and how to fix them. Heat spikes, lifting, flooding, apex problems, and infill mistakes nail techs encounter with builder gel.',
  category: 'nail-education',
  tags: ['builder gel mistakes', 'BIAB mistakes', 'builder gel technique', 'BIAB lifting', 'builder gel tips'],
  heroImage: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
  heroImageAlt: 'Common builder gel BIAB mistakes and how to fix them',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'prep-mistakes', label: 'Prep mistakes' },
    { id: 'application-mistakes', label: 'Application mistakes' },
    { id: 'heat-spikes', label: 'Heat spikes' },
    { id: 'lifting', label: 'Lifting and adhesion issues' },
    { id: 'infill-mistakes', label: 'Infill mistakes' },
  ],
  relatedSlugs: ['common-gel-x-mistakes', 'nail-dehydrator-vs-primer', 'acid-vs-acid-free-nail-primer', 'how-to-do-nail-infill-without-bulk'],
  faq: [
    { q: 'Why does builder gel cause a heat spike when curing?', a: 'Heat spikes (a sudden burning or hot sensation during curing) with builder gel are caused by the exothermic reaction of the gel curing. Thicker applications generate more heat. If a client experiences a heat spike, remove their hand from the lamp immediately and return it at a comfortable pace — don\'t hold them in the lamp through discomfort. Applying in thinner layers and using a low-heat cure setting (if your lamp has one) can help manage this. Consult your product\'s training for their specific guidance on managing heat during cure.' },
    { q: 'Why does my builder gel application look lumpy or uneven?', a: 'Uneven application is usually a product control issue — learning to self-level the gel takes practice. The self-levelling property means the gel moves before it\'s cured; tilting the nail briefly can help settle the product. Application in thinner, more controlled layers rather than one thick layer also helps with evenness. Your product training will cover their specific application technique for best results.' },
    { q: 'Should I use a base coat under builder gel?', a: 'This depends entirely on your specific product system — some builder gels are applied directly to the natural nail (with dehydrator and primer as specified), while others require a base coat as part of the system. Never assume — always follow your product\'s protocol. Using the wrong base (or skipping one that\'s required) affects adhesion and longevity.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="warning" title="Product-specific guidance applies">
        Builder gel products (BIAB, Polygel variants, rubber base systems, etc.) each have specific instructions for application, curing, and removal. This article covers general technique principles. Always follow your specific product's training and manufacturer instructions — do not substitute steps or products without verifying compatibility with your system.
      </ArticleCallout>

      <section id="prep-mistakes">
        <h2 className="font-serif text-2xl font-bold mb-4">Prep mistakes</h2>
        <ArticleTable
          headers={['Prep mistake', 'Effect']}
          rows={[
            ['Skipping dehydration', 'Natural nail oil and moisture remain on the plate; reduced adhesion'],
            ['Not removing all cuticle from nail plate', 'Product applied over cuticle tissue lifts almost immediately; looks untidy'],
            ['Over-buffing the nail plate', 'Excessive buffing thins the nail; creates heat sensitivity; not necessary for most builder gel systems'],
            ['Skipping primer when the product requires it', 'Some builder gels require a specific primer for adhesion — skipping reduces longevity'],
          ]}
        />
        <ArticleTip>Read your product's prep protocol before your first application — it specifies exactly which steps, products, and sequence are required for their system. Generic prep isn't always correct.</ArticleTip>
      </section>

      <section id="application-mistakes">
        <h2 className="font-serif text-2xl font-bold mb-4">Application mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Applying too much product at once:</strong> Thick application increases heat during cure, reduces product control, and makes shaping harder. Thinner layers give more control and better results.</li>
          <li><strong>Flooding the sidewalls or cuticle area:</strong> Product touching skin leads to immediate lifting; keep a clean margin from cuticle and sidewalls</li>
          <li><strong>Not building apex:</strong> Builder gel benefits from a slight apex (highest point around the stress point of the nail) for strength; a completely flat application has less structural integrity</li>
          <li><strong>Using a brush that's too wet:</strong> If your brush has too much product, it becomes uncontrollable. Build your brush load gradually.</li>
          <li><strong>Capping the free edge:</strong> Whether to cap the free edge depends on your specific product and system — check your product's guidance</li>
        </ul>
      </section>

      <section id="heat-spikes">
        <h2 className="font-serif text-2xl font-bold mb-4">Heat spikes</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A heat spike is a sudden burning sensation when the gel cures. Builder gels are more prone to heat spikes than regular gel polish because of the thicker application:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Never hold a client's hand in the lamp if they report burning — remove immediately</li>
          <li>Apply in thinner layers to reduce the heat generated per layer</li>
          <li>Some lamps have a low-heat setting for sensitive clients — use it if available</li>
          <li>Clients with thinner or more sensitive nail plates are more prone to heat spikes</li>
          <li>Heat spikes can also result from over-preparation (over-buffing the nail plate) — thin nails feel lamp heat more intensely</li>
        </ul>
        <ArticleCallout variant="warning" title="Client communication">
          Brief clients about the possibility of heat sensation before their first builder gel appointment. A client who knows it can happen responds better (removes hand) than one who is caught off guard.
        </ArticleCallout>
      </section>

      <section id="lifting">
        <h2 className="font-serif text-2xl font-bold mb-4">Lifting and adhesion issues</h2>
        <ArticleTable
          headers={['Lifting pattern', 'Likely cause']}
          rows={[
            ['Cuticle edge lifting', 'Product touching cuticle or skin; cuticle not fully removed from nail plate'],
            ['Side wall lifting', 'Product flooding sidewalls; contamination on nail plate edges'],
            ['Lifting on one client consistently', 'Client-specific: oily nails, nail-biting habit, wet work, lifestyle factors; may need adjusted prep'],
            ['General poor adhesion across all clients', 'System compatibility issue; wrong primer or base; expired product; lamp not curing correctly'],
          ]}
        />
      </section>

      <section id="infill-mistakes">
        <h2 className="font-serif text-2xl font-bold mb-4">Infill mistakes</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Builder gel infills have specific challenges — getting them wrong leads to bulky, thick, or poorly balanced nails:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Not removing enough of the old product:</strong> Building new product over a thick existing layer creates bulk; file back the old product sufficiently before reapplying</li>
          <li><strong>Not blending the new product into the existing apex:</strong> A visible line between old and new product looks untidy; blend carefully</li>
          <li><strong>Applying the same amount of product as a full set:</strong> Infills need less — you're filling the regrowth zone, not rebuilding the entire nail</li>
          <li><strong>Not rebalancing the apex:</strong> As the nail grows, the stress point moves; the apex needs to be repositioned for the nail to remain balanced</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For a detailed guide to infills without bulk: <Link to="/learn/how-to-do-nail-infill-without-bulk" className="underline text-[#F52B8C]">how to do a nail infill without making it look thick</Link>.</p>
      </section>
    </div>
  ),
});
export {};
