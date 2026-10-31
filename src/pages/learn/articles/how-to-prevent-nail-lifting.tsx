import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleSteps, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-prevent-nail-lifting',
  title: 'How to Prevent Nail Lifting',
  seoTitle: 'How to Prevent Nail Lifting: A Complete Guide for Nail Techs',
  excerpt: 'Nail lifting is one of the most common complaints clients bring to nail techs. A thorough guide to the causes, the fixes, and what to tell clients.',
  seoDescription: 'How to prevent nail lifting: causes, prep techniques, application tips, and client aftercare advice for nail techs to reduce lifting complaints.',
  category: 'nail-education',
  tags: ['nail lifting', 'gel lifting', 'nail education', 'nail technique'],
  heroImage: 'linear-gradient(135deg, #FFF7ED 0%, #FED7AA 100%)',
  heroImageAlt: 'How to prevent nail lifting',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Education',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'why-lifting-happens', label: 'Why lifting happens' },
    { id: 'prep-is-everything', label: 'Prep: the biggest factor' },
    { id: 'application-factors', label: 'Application factors' },
    { id: 'product-issues', label: 'Product and equipment issues' },
    { id: 'client-aftercare', label: 'Client aftercare' },
    { id: 'diagnosing', label: 'Diagnosing the specific cause' },
  ],
  relatedSlugs: ['nail-tech-beginner-mistakes'],
  faq: [
    { q: 'Why does gel always lift for some clients?', a: 'Some clients are more prone to lifting due to lifestyle factors (wet hands from work, exposure to cleaning products, hormonal changes). Underlying nail conditions can also play a role. For these clients, thorough prep is even more critical, and you may need to use a stronger primer or base coat formulated for problem nails.' },
    { q: 'Can lifting be caused by the UV lamp?', a: 'Yes — under-curing is a common cause of lifting. If your lamp\'s bulbs are old or the lamp is underpowered for the product you\'re using, gels won\'t cure properly. Check that your lamp is compatible with your gel brand and that the curing times match the product instructions.' },
    { q: 'What do I do when a client complains their nails lifted within a few days?', a: 'Listen, investigate the cause, and offer to fix it. If the lifting is due to a technique issue on your end, fix it for free. If it\'s likely due to client aftercare (e.g. peeling, not using cuticle oil, excessive water exposure), fix it but explain the likely cause — and document the conversation.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-lifting-happens">
        <h2 className="font-serif text-2xl font-bold mb-4">Why lifting happens</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Nail lifting happens when the adhesion between the gel/product and the natural nail breaks down. The causes fall into three categories: prep issues, application issues, and client aftercare issues.</p>
        <ArticleTable
          headers={['Category', 'Examples']}
          rows={[
            ['Prep issues', 'Oil or moisture left on the nail plate, insufficient dehydration, cuticle not properly pushed back'],
            ['Application issues', 'Flooding the cuticle or sidewalls, too-thick layers, skipping/insufficient primer, under-curing'],
            ['Client aftercare', 'Picking at nails, excessive water exposure, using nails as tools, not applying cuticle oil'],
            ['Product issues', 'Incompatible products, old/expired products, wrong lamp for the product'],
          ]}
        />
        <ArticleCallout variant="info" title="Most lifting is preventable">
          The vast majority of lifting issues stem from prep. If you fix prep, you fix most lifting problems. Application and aftercare are secondary.
        </ArticleCallout>
      </section>

      <section id="prep-is-everything">
        <h2 className="font-serif text-2xl font-bold mb-4">Prep: the biggest factor</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Thorough nail prep is the single most important factor in preventing lifting. Even the best application over poor prep will lift.</p>
        <ArticleSteps steps={[
          { title: 'File and shape', body: 'File the nail to the desired shape. Ensure the free edge is clean and sealed.' },
          { title: 'Cuticle work', body: 'Push back and remove cuticle from the nail plate. Product applied over cuticle will lift. Use a cuticle pusher and nip any pterygium (cuticle attached to the nail plate).' },
          { title: 'Buff the nail plate', body: 'Remove shine from the natural nail. This creates texture for the product to bond to. Buff gently — you\'re removing shine, not filing the nail plate down.' },
          { title: 'Dust and clean', body: 'Remove all filing dust with a nail brush. Dust under the gel will cause lifting.' },
          { title: 'Dehydrate', body: 'Apply a nail prep/dehydrator to remove any remaining moisture and oils. This is a critical step that many skip. Allow it to evaporate completely before applying any product.' },
          { title: 'Apply primer', body: 'For clients prone to lifting: use an acid-free primer or bond. Apply to the nail plate only, not the skin. Allow to become tacky before applying product.' },
        ]} />
        <ArticleTip>How long you spend on prep should be proportional to how prone the client is to lifting. A client with oily nails needs more thorough dehydration and priming than one with dry nails.</ArticleTip>
      </section>

      <section id="application-factors">
        <h2 className="font-serif text-2xl font-bold mb-4">Application factors</h2>
        <ArticleChecklist title="Application checklist for preventing lifting" items={[
          'Apply thin, even layers — thick layers are more prone to lifting',
          'Cap the free edge on each layer',
          'Don\'t flood the cuticle or sidewalls — product touching skin will always lift',
          'Leave a 1–2mm gap from the cuticle on every layer',
          'Ensure each layer is fully cured before applying the next',
          'Use your lamp for the full recommended cure time for the product',
          'Don\'t wipe the lamp or change the bulbs mid-set without re-checking cure times',
        ]} />
      </section>

      <section id="product-issues">
        <h2 className="font-serif text-2xl font-bold mb-4">Product and equipment issues</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Less discussed but real causes of lifting:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Old lamps:</strong> LED lamp bulbs degrade over time. If you're using the same lamp for 2+ years and lifting has increased, the lamp may not be curing properly.</li>
          <li><strong>Wrong lamp for the product:</strong> Some gel brands require specific lamps. Check compatibility — especially if you switched brands and suddenly have lifting.</li>
          <li><strong>Expired products:</strong> Gels have a shelf life. Old gel can become thick, apply unevenly, and cure poorly. Check expiry dates on opened products.</li>
          <li><strong>Mixing incompatible systems:</strong> A base coat from one brand, colour from another, and top coat from a third can cause adhesion failures. Test before using on clients.</li>
        </ul>
      </section>

      <section id="client-aftercare">
        <h2 className="font-serif text-2xl font-bold mb-4">Client aftercare</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Even perfect prep and application can be undone by poor client aftercare. What to tell clients:</p>
        <ArticleChecklist title="Client aftercare advice" items={[
          'Apply cuticle oil daily — hydrated nails and skin = better nail health and retention',
          'Don\'t use nails as tools (opening cans, scratching stickers, etc.)',
          'Wear gloves for washing up and cleaning',
          'Don\'t pick, bite, or peel gel nails — this removes layers of natural nail',
          'See your nail tech for repairs rather than trying to fix breaks yourself',
          'Let your nail tech know if your nails lifted — especially which nails and when',
        ]} />
        <ArticleTip>Build aftercare advice into your appointment. When you're finishing up, say: "To help these last, use cuticle oil every day and wear gloves for washing up." Clients who follow aftercare advice have significantly better retention.</ArticleTip>
      </section>

      <section id="diagnosing">
        <h2 className="font-serif text-2xl font-bold mb-4">Diagnosing the specific cause</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">When a client comes back with lifting, the location of the lifting is often diagnostic:</p>
        <ArticleTable
          headers={['Where lifting occurs', 'Most likely cause']}
          rows={[
            ['Near the cuticle', 'Product touching cuticle or skin during application; or insufficient prep of the cuticle area'],
            ['At the sidewalls', 'Product flooding the sidewalls; insufficient sealing at the edge'],
            ['Free edge lifting', 'Not capping the edge; client using nails as tools'],
            ['Whole nail lifting uniformly', 'Inadequate prep (moisture/oil), dehydrator not used, lamp issue'],
            ['Same 1–2 nails every time', 'Specific nail has poor structure or client uses those fingers heavily'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">Document which nails lift for clients who have recurring issues. The pattern usually points to a specific cause — which is much easier to fix than a general "my nails lift" complaint.</p>
      </section>
    </div>
  ),
});
export {};
