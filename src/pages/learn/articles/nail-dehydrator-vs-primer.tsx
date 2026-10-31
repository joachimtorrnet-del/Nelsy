import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-dehydrator-vs-primer',
  title: 'Nail Dehydrator vs Primer: What\'s the Difference?',
  seoTitle: 'Nail Dehydrator vs Primer: What\'s the Difference?',
  excerpt: 'Dehydrator and primer are both used in nail prep — but they do different things. Here\'s what each one does, when you need them, and why the difference matters for adhesion.',
  seoDescription: 'Nail dehydrator vs primer — what\'s the difference? What each product does, when to use them, whether you need both, and how they contribute to nail extension adhesion.',
  category: 'nail-education',
  tags: ['nail dehydrator vs primer', 'nail prep products', 'nail primer explained', 'nail dehydrator explained'],
  heroImage: 'linear-gradient(135deg, #FFF0F6 0%, #FCE4F5 100%)',
  heroImageAlt: 'Nail dehydrator vs primer — what\'s the difference',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'what-dehydrator', label: 'What a dehydrator does' },
    { id: 'what-primer', label: 'What a primer does' },
    { id: 'comparison', label: 'Comparing them' },
    { id: 'when-use', label: 'When to use each one' },
    { id: 'do-you-need-both', label: 'Do you need both?' },
  ],
  relatedSlugs: ['acid-vs-acid-free-nail-primer', 'common-gel-x-mistakes', 'common-builder-gel-mistakes', 'acrylic-application-step-by-step'],
  faq: [
    { q: 'Can I skip dehydrator if I\'m using primer?', a: 'They do different jobs, so they\'re not interchangeable. A dehydrator removes surface moisture and oil; a primer helps the next product bond to the nail. Skipping dehydrator means moisture and oil remain on the nail plate, which reduces how well even a primed surface adheres. Whether you need both depends on your specific product system — your product\'s instructions will specify what\'s required.' },
    { q: 'Does nail dehydrator damage the nail?', a: 'Nail dehydrators are designed for nail plate prep and, used as directed, are not damaging to the nail. They evaporate quickly, removing surface moisture without the sustained dehydrating effect of prolonged acetone exposure. Follow your product\'s instructions for application method and any wait time before the next step.' },
    { q: 'What happens if you use primer on the skin or cuticle?', a: 'Acid-based primers are corrosive — getting them on the skin or cuticle causes irritation and should be avoided. Non-acid primers are less harsh but still shouldn\'t be applied to skin deliberately. Both types of primer should be applied only to the nail plate. If primer contacts skin, follow the product\'s safety guidelines for skin contact.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-dehydrator">
        <h2 className="font-serif text-2xl font-bold mb-4">What a dehydrator does</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A nail dehydrator removes surface moisture and oils from the nail plate. The natural nail plate has moisture content and surface oils (from skin contact and the nail's natural state) that interfere with adhesion — many nail products don't bond well to oily or moist surfaces.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">Dehydrators evaporate quickly after application, leaving a clean, dry nail plate surface. They don't bond to the nail themselves — they prepare it for what comes next.</p>
        <ArticleCallout variant="info" title="Dehydrators and nail type">
          Clients with naturally oily nail plates benefit more from dehydrators than those with dry nails. Some nail techs encounter specific clients whose nails need extra attention during prep — this is often an oily nail plate issue that thorough dehydration can help address.
        </ArticleCallout>
      </section>

      <section id="what-primer">
        <h2 className="font-serif text-2xl font-bold mb-4">What a primer does</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A nail primer creates a bond between the natural nail plate and the nail product applied on top (acrylic, gel, builder gel). There are two types:</p>
        <ArticleTable
          headers={['Primer type', 'How it works']}
          rows={[
            ['Acid primer (methacrylic acid)', 'Creates a chemical bond with the nail plate; very strong adhesion; corrosive and must be kept away from skin; used primarily with acrylic systems'],
            ['Non-acid (acid-free) primer', 'Creates adhesion through a different mechanism (surface chemistry); less aggressive; used with many gel systems'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For a deeper comparison of primer types: <Link to="/learn/acid-vs-acid-free-nail-primer" className="underline text-[#F52B8C]">acid vs acid-free nail primer — which to use</Link>.</p>
      </section>

      <section id="comparison">
        <h2 className="font-serif text-2xl font-bold mb-4">Comparing them</h2>
        <ArticleTable
          headers={['', 'Dehydrator', 'Primer']}
          rows={[
            ['What it removes / adds', 'Removes surface moisture and oil', 'Adds a bonding layer to the nail plate'],
            ['Purpose', 'Surface prep — cleans the nail plate', 'Adhesion — helps product grip the nail'],
            ['Bonds to nail permanently?', 'No — evaporates', 'Yes — leaves a residue that aids bonding'],
            ['Required for all nail services?', 'Depends on product system', 'Depends on product system'],
            ['Application', 'Applied to nail plate; allow to dry', 'Applied to nail plate; allow to dry before product'],
          ]}
        />
      </section>

      <section id="when-use">
        <h2 className="font-serif text-2xl font-bold mb-4">When to use each one</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Dehydrator:</strong> Typically used before acrylics, gel extensions, builder gel, and gel polish on natural nails — whenever good adhesion is required. Some techs use it before any gel service.</li>
          <li><strong>Acid primer:</strong> Commonly used in acrylic systems, particularly for clients with challenging adhesion. Not typically used with gel systems due to the risk to gel products.</li>
          <li><strong>Non-acid primer:</strong> Used with gel and builder gel systems; some gel polish applications. Some product systems include their own specific bonding agent instead of a traditional primer.</li>
        </ul>
        <ArticleTip>Your product system specifies which prep products are required — and which are incompatible. Never use acid primer under gel systems unless your specific product explicitly supports this. Use the prep products your system recommends.</ArticleTip>
      </section>

      <section id="do-you-need-both">
        <h2 className="font-serif text-2xl font-bold mb-4">Do you need both?</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Whether you need both depends on the product you're applying:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Many gel and builder gel systems require dehydrator + their specific bonding/base product, but not a traditional primer</li>
          <li>Traditional acrylic systems typically use dehydrator + acid primer</li>
          <li>Some systems combine the function into a single product (e.g. a pH-balancing prep that acts as both)</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">The answer is always in your product's recommended application sequence. Follow it; don't mix protocols from different systems without checking compatibility.</p>
      </section>
    </div>
  ),
});
export {};
