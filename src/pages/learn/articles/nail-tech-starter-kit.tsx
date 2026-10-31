import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-starter-kit',
  title: 'Nail Tech Starter Kit: What You Actually Need',
  seoTitle: 'Nail Tech Starter Kit: What You Actually Need (2026)',
  excerpt: 'A practical guide to building your nail tech starter kit — what\'s essential, what can wait, and what to avoid buying before you know what you need.',
  seoDescription: 'Nail tech starter kit guide: essential equipment, products, tools, and what to buy first. Avoid overspending on gear you don\'t need as a beginner nail tech.',
  category: 'start-your-business',
  tags: ['nail tech starter kit', 'nail tech equipment', 'nail supplies', 'starter kit'],
  heroImage: 'linear-gradient(135deg, #FFF7ED 0%, #FDBA74 100%)',
  heroImageAlt: 'Nail tech starter kit essentials',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'essential-tools', label: 'Essential tools' },
    { id: 'lamp', label: 'The lamp: most important purchase' },
    { id: 'products', label: 'Products and supplies' },
    { id: 'workspace', label: 'Workspace and setup' },
    { id: 'photography', label: 'Photography kit' },
    { id: 'what-to-skip', label: 'What to skip as a beginner' },
  ],
  relatedSlugs: ['how-to-start-a-nail-business-2026', 'how-much-does-it-cost-to-start-nail-business', 'nail-tech-beginner-business-checklist'],
  faq: [
    { q: 'What brand of gel should a beginner nail tech use?', a: 'Use one complete system from a single brand to start — base coat, colours, and top coat from the same manufacturer. This reduces compatibility issues. Popular starter systems in the UK include The Gel Bottle, Halo, Gelish, and CND Shellac. Learn one system well before mixing brands.' },
    { q: 'Do I need a nail drill to start?', a: 'Depends on what services you want to offer. For gel polish on natural nails, a drill isn\'t essential — you can prep and remove without one. For gel extensions, BIAB, or acrylic, a drill speeds up work significantly and is effectively essential. If you plan to do extensions from day one, add a nail drill to your starter kit.' },
    { q: 'How much should I spend on a nail lamp as a beginner?', a: 'Spend enough to get one that actually cures your products properly. Cheap lamps (under £20) often don\'t cure gels fully, which causes lifting. A mid-range LED lamp (£40–80) from a reputable brand compatible with your gel system is the sweet spot for a beginner.' },
  ],
  relatedFeatureSlugs: ['bookings', 'payments'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <p className="text-gray-700 leading-relaxed text-lg">The most common beginner mistake is buying too much too soon — or buying cheap versions of the most important tools. This guide tells you what's essential on day one, what can wait, and where it's worth spending more.</p>

      <section id="essential-tools">
        <h2 className="font-serif text-2xl font-bold mb-4">Essential tools</h2>
        <ArticleChecklist title="Must-have nail tech tools" items={[
          'UV/LED lamp (compatible with your gel system)',
          'Nail drill (essential for extensions; useful for all)',
          'Cuticle pusher (metal or glass)',
          'Cuticle nippers',
          'Nail clippers (for length adjustment)',
          'Nail file (180 grit for natural nails)',
          'Buffer block',
          'Nail brush (stiff, for dust removal)',
          'Gel brushes (flat, detail, oval) — from your gel brand',
          'Lint-free nail wipes',
          'Nail foil (if doing foil art)',
        ]} />
      </section>

      <section id="lamp">
        <h2 className="font-serif text-2xl font-bold mb-4">The lamp: your most important purchase</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your UV/LED lamp is the most critical piece of equipment you'll buy. A lamp that doesn't fully cure your gel causes lifting, tacky finishes, and client complaints. Buy once, buy right.</p>
        <ArticleTable
          headers={['Lamp type', 'Price range', 'Notes']}
          rows={[
            ['Budget LED (unknown brand)', '£10–25', 'Often inadequate curing — avoid'],
            ['Mid-range LED', '£40–80', 'Suitable for most gel systems — good starting point'],
            ['Brand-specific lamp', '£60–120', 'Guaranteed compatibility with that gel brand'],
            ['Professional LED (Gelish 18G, etc.)', '£80–150', 'Fast cure, wide compatibility, long-lasting'],
          ]}
        />
        <ArticleTip>Check that your lamp is specifically listed as compatible with your gel brand. Most professional gel brands publish a lamp compatibility list. If in doubt, buy the brand\'s own lamp.</ArticleTip>
      </section>

      <section id="products">
        <h2 className="font-serif text-2xl font-bold mb-4">Products and supplies</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Start with one complete gel system. Don't buy 50 colours before you have clients — start with 15–20 versatile shades and expand based on what clients actually request.</p>
        <ArticleTable
          headers={['Product', 'Essential?', 'Notes']}
          rows={[
            ['Nail dehydrator / prep', 'Yes', 'Critical for adhesion; don\'t skip'],
            ['Acid-free primer', 'Yes', 'Especially important for problem nails'],
            ['Base coat / rubber base', 'Yes', 'Buy your brand\'s recommended base'],
            ['Top coat (glossy)', 'Yes', 'Buy your brand\'s recommended top'],
            ['Matte top coat', 'Useful', 'Expand after basics'],
            ['15–20 gel colours', 'Yes', 'Neutrals, pinks, reds — most requested'],
            ['Builder gel / BIAB', 'If doing extensions', 'Core product for extension services'],
            ['Acetone (pure)', 'Yes', 'Gel removal'],
            ['Foils and nail art supplies', 'Later', 'Add when you\'re confident in basics'],
          ]}
        />
      </section>

      <section id="workspace">
        <h2 className="font-serif text-2xl font-bold mb-4">Workspace and setup</h2>
        <ArticleTable
          headers={['Item', 'Budget option', 'Notes']}
          rows={[
            ['Nail table', 'Any desk at correct height', 'Adjust height so client\'s hands rest at your working level'],
            ['Client chair', 'Dining chair', 'More important that you\'re comfortable than it looks premium'],
            ['Arm cushion / wrist rest', 'Rolled towel to start', 'A proper arm rest improves your posture'],
            ['Dust collector / fan', 'Small desk fan initially', 'Ventilation is important; upgrade when possible'],
            ['Storage / organiser', 'Clear acrylic trays', 'Organised kit = faster, more professional service'],
            ['Nail mat (disposable or washable)', 'Cheap disposable mats', 'Per-client hygiene'],
          ]}
        />
        <ArticleCallout variant="info" title="Lighting matters more than furniture">
          Clients judge your work through photos you post. Good lighting (a ring light) contributes more to client acquisition than an expensive nail table. Prioritise light before aesthetics.
        </ArticleCallout>
      </section>

      <section id="photography">
        <h2 className="font-serif text-2xl font-bold mb-4">Photography kit</h2>
        <ArticleChecklist title="Photography essentials" items={[
          'Ring light (£30–50) — transforms nail photos',
          'Phone mount / tripod (£15–30)',
          'Simple, clean background (white foam board, marble contact paper)',
          'Cuticle oil — apply before photos to make nails look their best',
          'Hand lotion or cuticle cream for clean skin around nails in photos',
        ]} />
        <p className="text-gray-700 mt-4 leading-relaxed">Your portfolio photos are your primary marketing tool. A £40 ring light will do more for your client acquisition than £200 of extra gel colours. Buy the light first.</p>
      </section>

      <section id="what-to-skip">
        <h2 className="font-serif text-2xl font-bold mb-4">What to skip as a beginner</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Huge colour ranges:</strong> 50+ colours before you have clients is wasted spend. Start with 15–20 and expand with demand.</li>
          <li><strong>Expensive professional furniture:</strong> Your chair and table matter for your posture, not for impressing clients. Upgrade once you're earning.</li>
          <li><strong>Every nail art supply imaginable:</strong> Foils, pigments, stamping plates — add these when clients specifically request them, not before.</li>
          <li><strong>Multiple gel systems:</strong> Learn one system well. Mixing brands confuses troubleshooting and increases compatibility issues.</li>
          <li><strong>Professional-grade tools before you can use them:</strong> A beginner with a £150 drill will get the same results as with a £60 drill — skill matters more than equipment at this stage.</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">See also: <Link to="/learn/how-much-does-it-cost-to-start-nail-business" className="underline text-[#F52B8C]">how much does it cost to start a nail business?</Link></p>
      </section>
    </div>
  ),
});
export {};
