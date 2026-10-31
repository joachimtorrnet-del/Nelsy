import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleChecklist, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-aftercare-guide',
  title: 'Nail Tech Aftercare Guide You Can Send to Clients',
  seoTitle: 'Nail Tech Aftercare Guide to Send Clients After Every Appointment',
  excerpt: 'A clear aftercare guide sent after every appointment reduces lifting, breakage, and repair requests — and shows clients you care about how their nails last.',
  seoDescription: 'Nail tech aftercare guide to send clients. Ready-to-use aftercare instructions for gel, acrylic, gel-X, and BIAB — copy and send after every appointment.',
  category: 'policies-clients',
  tags: ['nail aftercare guide', 'nail tech client aftercare', 'gel nail aftercare', 'acrylic nail aftercare'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #D1FAE5 100%)',
  heroImageAlt: 'Nail tech aftercare guide for clients',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-aftercare', label: 'Why aftercare matters' },
    { id: 'gel-polish', label: 'Gel polish aftercare' },
    { id: 'gel-extensions', label: 'Gel-X / gel extensions aftercare' },
    { id: 'acrylic', label: 'Acrylic aftercare' },
    { id: 'biab', label: 'BIAB aftercare' },
    { id: 'general', label: 'General nail aftercare for all services' },
  ],
  relatedSlugs: ['how-to-improve-nail-retention', 'how-to-handle-nail-repair-request', 'nail-tech-client-card-system', 'how-to-create-nail-client-experience'],
  faq: [
    { q: 'When should I send aftercare instructions?', a: 'Ideally, mention aftercare verbally at the end of the appointment and then send a written version by message within a few hours. Sending it digitally (WhatsApp, DM) means clients have it to refer back to if they can\'t remember. Some nail techs include aftercare in their booking confirmation or as a printed card given at the appointment.' },
    { q: 'Do clients actually follow aftercare instructions?', a: 'Clients who understand why aftercare matters follow it better than those who receive a list of rules without context. Brief explanations — "avoid prolonged water exposure in the first 24 hours because the product needs time to fully cure and bond" — convert to better compliance than "don\'t get your nails wet." Make the instructions feel like insider knowledge, not a restriction.' },
    { q: 'Should aftercare be different for different clients?', a: 'The core principles are the same, but personalising helps. A client who\'s a nurse, works in a kitchen, or does heavy manual work has different daily exposures to yours instructions. Noting specifics ("you mentioned you wash your hands constantly at work — I\'d recommend reapplying cuticle oil more frequently than most") shows you\'ve thought about their specific situation.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-aftercare">
        <h2 className="font-serif text-2xl font-bold mb-4">Why aftercare matters (and why to send it in writing)</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Good nail prep and application gets the client to the door with great nails. What happens in the first 24–48 hours after the appointment — and in the weeks between — determines how long they last. Clients who follow aftercare instructions have significantly better retention and fewer repair requests.</p>
        <p className="text-gray-700 leading-relaxed">Sending aftercare instructions in writing serves two purposes: it educates clients so their nails last longer, and it establishes a paper trail — if a client contacts you about lifting and you can show they received clear aftercare guidance, the conversation about responsibility is much easier.</p>
      </section>

      <section id="gel-polish">
        <h2 className="font-serif text-2xl font-bold mb-4">Gel polish aftercare</h2>
        <ArticleChecklist items={[
          'Avoid prolonged water exposure for the first 24–48 hours while the gel fully cures',
          'Wear gloves for washing up, cleaning, and gardening — harsh chemicals and prolonged soaking weaken the gel bond',
          'Apply cuticle oil daily — keeps the skin and nail plate hydrated; helps the gel flex with the nail',
          'Avoid picking or peeling at the edges — this removes layers of nail plate with the gel',
          'Don\'t use your nails as tools (opening cans, peeling stickers)',
          'Book your infill or removal within the recommended time frame',
        ]} />
      </section>

      <section id="gel-extensions">
        <h2 className="font-serif text-2xl font-bold mb-4">Gel-X / gel extensions aftercare</h2>
        <ArticleChecklist items={[
          'Avoid water and heat for the first few hours after application — allow the adhesive to fully cure',
          'Be mindful of length — extensions change how your hands interact with the world; take care opening bags, doors, and typing',
          'Apply cuticle oil daily around the nail plate and cuticle',
          'Wear gloves for harsh cleaning tasks',
          'If a nail lifts, don\'t force it off or peel it — contact me for a repair',
          'Book your infill or refill at the recommended interval',
        ]} />
        <ArticleTip>Gel-X and soft gel extensions are more flexible than hard gels but more susceptible to lifting from oil exposure. Daily cuticle oil application is good — applying it under the extension edge is not recommended.</ArticleTip>
      </section>

      <section id="acrylic">
        <h2 className="font-serif text-2xl font-bold mb-4">Acrylic aftercare</h2>
        <ArticleChecklist items={[
          'Avoid soaking your nails (long baths, dishes, swimming) in the first 24–48 hours',
          'Acrylics are strong, but excessive force can cause stress cracks — avoid using nails as tools',
          'Apply cuticle oil daily — acrylics can dehydrate the natural nail beneath',
          'Wear gloves for cleaning tasks involving harsh chemicals',
          'Book your infill every 2–3 weeks to prevent lifting and maintain nail health',
          'Don\'t attempt to remove acrylics yourself — improper removal causes significant nail damage',
        ]} />
      </section>

      <section id="biab">
        <h2 className="font-serif text-2xl font-bold mb-4">BIAB / builder gel aftercare</h2>
        <ArticleChecklist items={[
          'Avoid heat and prolonged water exposure for the first 24 hours',
          'Apply cuticle oil daily — BIAB works best when the natural nail beneath stays hydrated',
          'Wear gloves for heavy cleaning tasks',
          'BIAB is designed to be more flexible than traditional gel — avoid lateral bending stress on the nails',
          'Book your infill at the recommended interval (usually 3–4 weeks)',
          'If you notice lifting, contact me — don\'t peel or pick at it',
        ]} />
      </section>

      <section id="general">
        <h2 className="font-serif text-2xl font-bold mb-4">General nail aftercare (all services)</h2>
        <ArticleTable
          headers={['Habit', 'Why it helps']}
          rows={[
            ['Daily cuticle oil', 'Keeps nail plate and skin hydrated; helps product flex and last longer'],
            ['Gloves for cleaning', 'Harsh chemicals weaken gel bonds; prolonged water causes lifting'],
            ['Don\'t pick or peel', 'Removes layers of nail plate; causes significant natural nail damage'],
            ['Don\'t use nails as tools', 'Puts lateral stress on the nail and product; causes cracks and breakage'],
            ['Book on schedule', 'Leaving extensions too long creates a lever effect that damages the natural nail'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For improving overall nail retention: <Link to="/learn/how-to-improve-nail-retention" className="underline text-[#F52B8C]">how to improve nail retention</Link>.</p>
      </section>
    </div>
  ),
});
export {};
