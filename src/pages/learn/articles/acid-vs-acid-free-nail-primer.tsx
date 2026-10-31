import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'acid-vs-acid-free-nail-primer',
  title: 'Acid vs Acid-Free Nail Primer: Which Should You Use?',
  seoTitle: 'Acid vs Acid-Free Nail Primer: Which Should You Use?',
  excerpt: 'Not all nail primers are the same — acid and non-acid primers work differently, suit different systems, and have different safety considerations. Here\'s what you need to know about each.',
  seoDescription: 'Acid vs acid-free nail primer — what\'s the difference, when to use each, safety considerations, and which primer type to use with acrylics, gel, and builder gel systems.',
  category: 'nail-education',
  tags: ['acid primer nails', 'acid free nail primer', 'nail primer types', 'nail primer comparison'],
  heroImage: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
  heroImageAlt: 'Acid vs acid-free nail primer',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'acid-primer', label: 'Acid primer (methacrylic acid)' },
    { id: 'non-acid-primer', label: 'Non-acid / acid-free primer' },
    { id: 'comparison', label: 'Side-by-side comparison' },
    { id: 'safety', label: 'Safety considerations' },
    { id: 'which-to-use', label: 'Which to use for your system' },
  ],
  relatedSlugs: ['nail-dehydrator-vs-primer', 'common-gel-x-mistakes', 'common-builder-gel-mistakes', 'acrylic-application-step-by-step'],
  faq: [
    { q: 'Can I use acid primer under gel systems?', a: 'In most cases, no — acid primer is corrosive and can prevent gel systems from curing correctly or interfere with adhesion in gel-based systems. Most gel and builder gel products specify their own prep protocol (typically dehydrator + a non-acid bonding product). Using acid primer under gel systems unless your product explicitly supports it is not recommended. Always check your product\'s compatibility guidelines.' },
    { q: 'Does acid primer damage the nail?', a: 'Acid primer contains methacrylic acid, which is corrosive and should not contact skin or cuticles. Applied correctly to the nail plate only, and in the thin application specified by the manufacturer, acid primer has a long history of use in professional nail services. Over-application or incorrect technique (flooding, skin contact) increases risk. Follow your product\'s safety and application instructions.' },
    { q: 'Is non-acid primer as strong as acid primer?', a: 'Non-acid primers provide good adhesion for gel-based systems, though the mechanism is different from acid primer. For traditional acrylic systems, especially on challenging nail types, some technicians find acid primer provides stronger initial adhesion. The appropriate primer is the one your product system recommends — "stronger" is less meaningful than "correct for your system."' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="warning" title="Always use the primer your product system specifies">
        Primer type isn't a universal choice — it's determined by the product system you're using. Using the wrong primer type can affect adhesion, curing, or safety. This article explains the differences; your product's training materials specify what to use for that system.
      </ArticleCallout>

      <section id="acid-primer">
        <h2 className="font-serif text-2xl font-bold mb-4">Acid primer (methacrylic acid)</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Acid primer contains methacrylic acid, which creates a chemical bond with the nail plate by reacting with the keratin. This provides a strong foundation for acrylic product.</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Creates a strong chemical bond with the natural nail plate</li>
          <li>Primarily used with traditional acrylic (monomer + polymer) systems</li>
          <li>Corrosive — must not contact skin, cuticles, or eyes</li>
          <li>Applied in a thin layer; excess application increases corrosion risk without improving adhesion</li>
          <li>The nail plate should appear white/frosted after application — this is normal and expected</li>
        </ul>
        <ArticleTip>Apply acid primer with a small, precise brush — only to the nail plate, with a clear margin from the cuticle and sidewalls. Drips or flooding contact with skin causes irritation and should be avoided.</ArticleTip>
      </section>

      <section id="non-acid-primer">
        <h2 className="font-serif text-2xl font-bold mb-4">Non-acid / acid-free primer</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Non-acid primers achieve adhesion through a different mechanism — typically by creating a surface that the nail product bonds to, rather than through the corrosive chemical reaction of acid primer.</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Less aggressive than acid primer — lower risk of skin irritation if minor contact occurs</li>
          <li>Commonly used with gel systems, builder gel, and some modern acrylic systems</li>
          <li>Provides good adhesion for gel-based products without the risk profile of acid primer</li>
          <li>Some are called "bonding agents" rather than primers — similar function, different product name</li>
        </ul>
      </section>

      <section id="comparison">
        <h2 className="font-serif text-2xl font-bold mb-4">Side-by-side comparison</h2>
        <ArticleTable
          headers={['', 'Acid primer', 'Non-acid primer']}
          rows={[
            ['Active ingredient', 'Methacrylic acid', 'Varies by product (resin-based, bonding agents)'],
            ['Bond mechanism', 'Chemical reaction with nail keratin', 'Surface chemistry / physical adhesion'],
            ['Primary use', 'Traditional acrylic systems', 'Gel, builder gel, modern nail systems'],
            ['Safety profile', 'Corrosive — avoid skin contact', 'Less aggressive — still avoid skin contact'],
            ['Application appearance', 'White/frosted nail plate after application', 'May appear clear or slightly tacky'],
          ]}
        />
      </section>

      <section id="safety">
        <h2 className="font-serif text-2xl font-bold mb-4">Safety considerations</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Both primer types have safety considerations, but acid primer requires more careful handling:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Acid primer:</strong> Keep away from skin and cuticles; wear gloves; ventilate your workspace; follow COSHH / product safety guidelines; store securely away from heat</li>
          <li><strong>Non-acid primer:</strong> Still avoid skin contact; ventilate your workspace; follow your product's SDS (Safety Data Sheet)</li>
          <li><strong>Both:</strong> Keep away from eyes; follow your product's specific safety guidance; have a first aid protocol for accidental skin or eye contact</li>
        </ul>
        <ArticleCallout variant="warning" title="Read the SDS for every product you use">
          Every professional nail product comes with a Safety Data Sheet. Reading the SDS for each product you use is both a professional responsibility and a practical safety practice — it tells you exactly how to handle the product, what to do in case of contact, and storage requirements.
        </ArticleCallout>
      </section>

      <section id="which-to-use">
        <h2 className="font-serif text-2xl font-bold mb-4">Which to use for your system</h2>
        <ArticleTable
          headers={['Service type', 'Typical primer recommendation']}
          rows={[
            ['Traditional acrylic (monomer + polymer)', 'Acid primer — most systems recommend it for adhesion'],
            ['Gel-X extensions', 'Non-acid or specific bonding product from the system brand; check your product\'s protocol'],
            ['Builder gel / BIAB', 'Non-acid bonding product or specific primer specified by the product brand'],
            ['Gel polish on natural nails', 'Dehydrator + base coat (often no separate primer needed — check your system)'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">These are general tendencies, not universal rules — your specific product system's training is the authority. For more on prep products: <Link to="/learn/nail-dehydrator-vs-primer" className="underline text-[#F52B8C]">nail dehydrator vs primer — what's the difference</Link>.</p>
      </section>
    </div>
  ),
});
export {};
