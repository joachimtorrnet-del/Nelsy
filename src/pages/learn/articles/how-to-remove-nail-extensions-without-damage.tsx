import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTable, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-remove-nail-extensions-without-damage',
  title: 'How to Remove Nail Extensions Without Damage',
  seoTitle: 'How to Remove Nail Extensions Without Damaging Your Nails',
  excerpt: 'Removing nail extensions incorrectly is one of the biggest causes of nail damage. Here\'s how to remove acrylic, Gel-X, builder gel, and gel polish cleanly and safely.',
  seoDescription: 'How to remove nail extensions without damage. Safe removal technique for acrylic, Gel-X, builder gel, and gel polish — soak off, e-file, and manual methods explained.',
  category: 'nail-education',
  tags: ['how to remove nail extensions without damage', 'safe nail extension removal', 'nail extension removal technique'],
  heroImage: 'linear-gradient(135deg, #FFF9EB 0%, #FEF3C7 100%)',
  heroImageAlt: 'How to remove nail extensions without damage',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Education Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-damage-happens', label: 'Why removal causes damage' },
    { id: 'gel-polish', label: 'Removing gel polish' },
    { id: 'gel-x', label: 'Removing Gel-X tips' },
    { id: 'builder-gel', label: 'Removing builder gel / BIAB' },
    { id: 'acrylic', label: 'Removing acrylic' },
    { id: 'aftercare', label: 'After removal' },
  ],
  relatedSlugs: ['gel-x-application-step-by-step', 'builder-gel-application-guide', 'acrylic-application-step-by-step', 'nail-tech-aftercare-guide'],
  faq: [
    { q: 'Can I remove nail extensions at home?', a: 'Clients can soak off gel polish and soft gel products at home with acetone-soaked cotton and foil wraps — this is generally safe if done carefully. Hard gel, builder gel, and acrylic are safer to have removed by a nail tech to avoid over-filing the nail plate.' },
    { q: 'How long does a full nail extension removal take?', a: 'Gel polish removal takes 10–15 minutes. Gel-X removal takes 15–20 minutes. Builder gel and acrylic removal via soak takes 20–30 minutes depending on product thickness. Never rush removal — the time is the process.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-damage-happens">
        <h2 className="font-serif text-2xl font-bold mb-4">Why removal causes damage</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Almost all nail damage from enhancement removal comes from one of three things:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Forcing or peeling:</strong> Peeling off product that isn't fully lifted takes layers of the nail plate with it</li>
          <li><strong>Over-filing the nail plate:</strong> Filing too aggressively to remove product removes the nail structure itself</li>
          <li><strong>Insufficient soaking time:</strong> Impatience leads to forcing — always let the product do the work</li>
        </ul>
        <ArticleCallout variant="warning" title="Never force or peel off enhanced nails">
          If product is not lifting cleanly during removal, it needs more time — not more pressure. Forcing product off is the primary cause of thin, damaged nail plates and takes months to grow out.
        </ArticleCallout>
      </section>

      <section id="gel-polish">
        <h2 className="font-serif text-2xl font-bold mb-4">Removing gel polish</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>File off the top coat seal — just the shine, not deep into the colour</li>
          <li>Soak cotton pads in 100% acetone; place on each nail and wrap securely with foil</li>
          <li>Leave for 10–15 minutes; the gel will have softened and started to lift</li>
          <li>Press the foil gently as you remove it — the cotton should wipe away most of the gel</li>
          <li>Use an orange stick to gently push off any remaining product; do not scrape hard</li>
          <li>If product isn't moving easily, re-wrap and soak for another 5 minutes</li>
        </ol>
      </section>

      <section id="gel-x">
        <h2 className="font-serif text-2xl font-bold mb-4">Removing Gel-X tips</h2>
        <ArticleTable
          headers={['Step', 'What to do']}
          rows={[
            ['1. Reduce length', 'Clip or file down the free edge to reduce product thickness before soaking'],
            ['2. File surface lightly', 'Lightly file the shine off the top coat to help acetone penetrate'],
            ['3. Soak in acetone', 'Foil wraps with acetone-soaked cotton; 15–20 minutes'],
            ['4. Check the tip', 'Gently test — if the tip doesn\'t lift easily, re-wrap for longer'],
            ['5. Remove the tip', 'Gently push from the cuticle end; the tip should slide off cleanly if fully soaked'],
            ['6. Clean the plate', 'Use an orange stick to remove any adhesive gel residue; never scrape hard'],
          ]}
        />
      </section>

      <section id="builder-gel">
        <h2 className="font-serif text-2xl font-bold mb-4">Removing builder gel / BIAB</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Builder gel and BIAB are harder gels than gel polish — most require more time and often e-file bulk removal before soaking:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Use an e-file or coarse hand file to file down the bulk of the product — stop before reaching the natural nail plate (leave approximately 0.5–1mm of product)</li>
          <li>Check the product specification — some builder gels soak off in acetone; others are soak-off resistant and require full e-file removal</li>
          <li>For soak-off formulas: foil wrap with acetone, 20–30 minutes</li>
          <li>For non-soak-off: continue carefully filing with decreasing grit until product is fully removed</li>
        </ol>
        <ArticleTip>When removing builder gel, use a lighter-grit finishing file to gently remove the last layer — this is where most plate damage happens. Work slowly near the natural nail plate.</ArticleTip>
      </section>

      <section id="acrylic">
        <h2 className="font-serif text-2xl font-bold mb-4">Removing acrylic</h2>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
          <li>Clip the free edge shorter to reduce the volume of product</li>
          <li>File off the top coat and any gel colour layers</li>
          <li>Use an e-file or medium file to reduce the bulk of the acrylic — don't try to soak without bulk removal first</li>
          <li>Foil wrap with 100% acetone; soak for 20–30 minutes</li>
          <li>Check — acrylic should be soft and scraping off in a powdery texture; if still hard, re-wrap</li>
          <li>Remove softened acrylic with an orange stick or pusher; never scrape hard</li>
        </ol>
      </section>

      <section id="aftercare">
        <h2 className="font-serif text-2xl font-bold mb-4">After removal</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Apply cuticle oil immediately after removal — acetone is extremely drying</li>
          <li>Buff very gently if there are any rough areas — don't over-buff a plate that's already thinner than ideal</li>
          <li>If the nail plate looks white or feels spongy, it's been over-dried or slightly damaged — apply a nail treatment and advise rest before reapplication</li>
          <li>Leave at least one or two weeks before applying a new set if the plate was significantly damaged</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
