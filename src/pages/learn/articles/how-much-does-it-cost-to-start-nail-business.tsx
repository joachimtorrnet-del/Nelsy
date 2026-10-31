import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-much-does-it-cost-to-start-nail-business',
  title: 'How Much Does It Cost to Start a Nail Business?',
  seoTitle: 'How Much Does It Cost to Start a Nail Business? (UK 2026)',
  excerpt: 'A realistic cost breakdown for starting a nail business in the UK — from training and insurance to equipment, products, and marketing.',
  seoDescription: 'How much does it cost to start a nail business in the UK? Realistic startup cost breakdown: training, insurance, equipment, products, and what to prioritise.',
  category: 'start-your-business',
  tags: ['nail business startup costs', 'cost to start nail business', 'nail tech investment', 'nail business budget'],
  heroImage: 'linear-gradient(135deg, #ECFDF5 0%, #6EE7B7 100%)',
  heroImageAlt: 'How much does it cost to start a nail business',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'total-overview', label: 'Total cost overview' },
    { id: 'training-costs', label: 'Training and qualifications' },
    { id: 'insurance', label: 'Insurance' },
    { id: 'equipment-costs', label: 'Equipment' },
    { id: 'products-costs', label: 'Products and supplies' },
    { id: 'ongoing-costs', label: 'Ongoing monthly costs' },
    { id: 'minimum-viable', label: 'Minimum viable setup' },
  ],
  relatedSlugs: ['how-to-start-a-nail-business-2026', 'nail-tech-starter-kit', 'nail-tech-beginner-business-checklist'],
  faq: [
    { q: 'Can you start a nail business on a small budget?', a: 'Yes. A basic functional setup — enough to take clients and build your business — costs £500–£800. You don\'t need the full professional kit on day one. Start with essentials, use income to reinvest in better equipment and a broader product range as your business grows.' },
    { q: 'Is nail tech training worth the cost?', a: 'Yes — and it\'s the one area not to cut corners. Untrained nail techs risk damaging clients\' nails, face difficulty getting insurance, and have no credibility when clients ask about qualifications. A good qualification also accelerates your learning curve significantly.' },
    { q: 'What nail equipment should I buy first?', a: 'Lamp, core products (base/top/colour gel, primer, dehydrator), files and buffers, and basic tools (cuticle pusher, brush). The lamp is the most critical equipment purchase — buy one compatible with your gel system. Everything else can be upgraded over time.' },
  ],
  relatedFeatureSlugs: ['bookings', 'payments', 'analytics'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="total-overview">
        <h2 className="font-serif text-2xl font-bold mb-4">Total cost overview</h2>
        <ArticleTable
          headers={['Category', 'Budget setup', 'Mid-range setup']}
          rows={[
            ['Training and qualifications', '£300–600', '£600–1,500'],
            ['Insurance (annual)', '£100–150', '£130–200'],
            ['Equipment', '£200–400', '£400–800'],
            ['Starter product kit', '£150–300', '£300–600'],
            ['Marketing setup (ring light, props)', '£50–100', '£100–200'],
            ['Total startup cost', '£800–1,550', '£1,530–3,300'],
          ]}
          caption="One-off startup costs. Ongoing monthly costs are separate."
        />
        <p className="text-gray-700 mt-4 leading-relaxed">These ranges reflect real UK nail tech startup costs in 2026. Training is the biggest variable — a short brand-specific course costs far less than a full Level 3 qualification, but provides less foundation.</p>
      </section>

      <section id="training-costs">
        <h2 className="font-serif text-2xl font-bold mb-4">Training and qualifications</h2>
        <ArticleTable
          headers={['Training type', 'Cost range', 'What you get']}
          rows={[
            ['VTCT/ITEC Level 3 Nail Technology', '£500–1,500', 'Full qualification; widely accepted by insurers'],
            ['Brand-specific course (BIAB, gel)', '£150–400', 'Product certification; taken after core qual'],
            ['Nail art masterclass', '£80–250', 'Technique-specific; doesn\'t replace core qual'],
            ['Online nail courses', '£50–200', 'Supplementary; limited practical experience'],
          ]}
        />
        <ArticleTip>Some training providers offer payment plans. If cost is a barrier, a Level 3 course spread over 3–6 months is more affordable than paying upfront — and the qualification time means you have longer to practise before seeing paying clients.</ArticleTip>
      </section>

      <section id="insurance">
        <h2 className="font-serif text-2xl font-bold mb-4">Insurance</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Insurance is one of the lowest costs but one of the most important. Don't skip it to save £100/year:</p>
        <ArticleTable
          headers={['Insurance type', 'Annual cost', 'What it covers']}
          rows={[
            ['Treatment liability', '£60–100', 'Adverse reactions to products you use'],
            ['Public liability', '£40–70', 'Client injuries in your space or caused by your work'],
            ['Bundle (both)', '£90–150', 'Most providers offer combined policies'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">UK providers: PolicyBee, Salon Gold, Markel Direct, and Insync Insurance all offer nail tech specific policies.</p>
      </section>

      <section id="equipment-costs">
        <h2 className="font-serif text-2xl font-bold mb-4">Equipment</h2>
        <ArticleTable
          headers={['Equipment', 'Budget price', 'Mid-range price', 'Priority']}
          rows={[
            ['UV/LED lamp', '£30–60', '£80–150', 'Essential'],
            ['Nail drill', '£30–80', '£80–200', 'Essential for extensions'],
            ['Ring light', '£30–50', '£50–100', 'Essential for photography'],
            ['Nail table/desk', '£40–100', '£100–300', 'Essential'],
            ['Client arm cushion/rest', '£15–30', '£30–60', 'Essential'],
            ['Nail dust collector/fan', '£20–50', '£50–120', 'Important'],
            ['Storage (acrylic organiser)', '£20–40', '£40–80', 'Helpful'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">The lamp is the most critical equipment purchase. Buy one specifically designed for your gel system — a cheap lamp that doesn\'t fully cure your gel will cause lifting and client complaints. See: <Link to="/learn/nail-tech-starter-kit" className="underline text-[#F52B8C]">nail tech starter kit guide</Link>.</p>
      </section>

      <section id="products-costs">
        <h2 className="font-serif text-2xl font-bold mb-4">Products and supplies</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your initial product kit needs to cover the basics for your core services. Resist buying a huge colour range before you have clients — focus on essentials:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Base coat, top coat (rubber base, glossy/matte top)</li>
          <li>10–15 gel colours (neutrals, pinks, reds — the most requested shades)</li>
          <li>Builder gel (if doing extensions)</li>
          <li>Primer and dehydrator</li>
          <li>Nail forms or tips (if doing extensions)</li>
          <li>Files, buffers, cuticle tools (enough for per-client disposables)</li>
          <li>Acetone and nail wipes</li>
        </ul>
        <ArticleCallout variant="info" title="Start with a system">
          Use one brand's base, colour, and top coat together initially — especially when starting out. Mixing brands can cause compatibility issues. Once you understand your products well, you can experiment with mixing.
        </ArticleCallout>
      </section>

      <section id="ongoing-costs">
        <h2 className="font-serif text-2xl font-bold mb-4">Ongoing monthly costs</h2>
        <ArticleTable
          headers={['Cost', 'Monthly estimate']}
          rows={[
            ['Product replenishment', '£100–300'],
            ['Insurance (monthly portion)', '£10–15'],
            ['Training/CPD (annualised)', '£30–80'],
            ['Booking software', '£0–25'],
            ['Disposables (gloves, wipes, files)', '£30–70'],
            ['Total ongoing', '£170–490'],
          ]}
        />
      </section>

      <section id="minimum-viable">
        <h2 className="font-serif text-2xl font-bold mb-4">Minimum viable setup</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If you want to start with the absolute minimum while still being professional:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Training: brand-specific course (£150–300) — add Level 3 as soon as you can</li>
          <li>Insurance: combined policy (£90–150/year)</li>
          <li>Lamp + core gel products: (£150–250)</li>
          <li>Files, buffers, tools: (£50–80)</li>
          <li>Ring light: (£30–50)</li>
          <li>HMRC registration: free</li>
          <li>Booking page: free trial on most platforms</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed"><strong>Minimum total: ~£470–830.</strong> This gets you started. Reinvest early income into a proper qualification and a broader product range.</p>
      </section>
    </div>
  ),
});
export {};
