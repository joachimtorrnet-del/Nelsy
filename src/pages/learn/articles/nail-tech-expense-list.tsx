import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleChecklist, ArticleTable, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-expense-list',
  title: 'Nail Tech Expense List: What to Track',
  seoTitle: 'Nail Tech Expense List: Every Business Cost You Should Be Tracking',
  excerpt: 'If you\'re not tracking your expenses, you don\'t know your profit. Here\'s a complete expense list for nail techs — categorised, explained, and ready to adapt for your own records.',
  seoDescription: 'Nail tech expense list. Every business expense a nail tech should track — products, insurance, rent, equipment, training, software, and more — with tracking tips.',
  category: 'pricing-money',
  tags: ['nail tech expenses', 'nail business costs', 'nail tech bookkeeping', 'nail business finance'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #D1FAE5 100%)',
  heroImageAlt: 'Nail tech expense list: what to track',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'product-costs', label: 'Product and supply costs' },
    { id: 'premises', label: 'Premises and workspace' },
    { id: 'insurance', label: 'Insurance' },
    { id: 'equipment', label: 'Equipment' },
    { id: 'software', label: 'Software and tools' },
    { id: 'training', label: 'Training and education' },
    { id: 'marketing', label: 'Marketing and branding' },
    { id: 'tracking', label: 'How to track expenses' },
  ],
  relatedSlugs: ['nail-tech-profit-margin-explained', 'nail-tech-monthly-income-calculator', 'nail-tech-break-even-point', 'how-to-calculate-product-cost'],
  faq: [
    { q: 'Can I claim all these expenses against tax?', a: 'In the UK, business expenses that are wholly and exclusively for business use can generally be claimed against self-employment income, reducing your taxable profit. This includes products, insurance, equipment, and training directly related to your nail business. However, tax rules change and your specific situation matters — consult an accountant or check HMRC guidance for your circumstances. This is not tax advice.' },
    { q: 'How often should I update my expense records?', a: 'Monthly is the minimum for staying on top of your finances. Weekly is better — it only takes 10–15 minutes when transactions are fresh. The longer you leave it, the more likely you are to miss expenses and lose track of where you\'re at financially.' },
    { q: 'Do I need accounting software or is a spreadsheet fine?', a: 'A spreadsheet works well for most independent nail techs starting out. Google Sheets or Excel, organised by category, is simple and free. Dedicated self-employment accounting apps (QuickBooks Self-Employed, FreeAgent, Coconut) offer automation (bank feed import, mileage tracking, tax estimates) that saves time as your business grows. Many nail techs start with a spreadsheet and upgrade when the admin time starts to feel significant.' },
  ],
  relatedFeatureSlugs: ['analytics', 'payments'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="product-costs">
        <h2 className="font-serif text-2xl font-bold mb-4">Product and supply costs</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">These are your primary variable costs — they rise with your client volume. Track these per order and average them monthly:</p>
        <ArticleChecklist items={[
          'Gel products (base coat, colour gel, topcoat)',
          'Acrylic products (monomer, polymer)',
          'Gel-X or soft gel extension products',
          'Builder gel / BIAB products',
          'Nail tips, forms',
          'Nail art supplies (foils, pigments, studs, decals)',
          'Nail drills and e-file bits',
          'Files and buffers (disposables)',
          'Prep products (dehydrator, primer, cleanser)',
          'Cuticle care products',
          'Disposable gloves, nail wipes, lint-free pads',
          'Cleaning and sanitisation products',
        ]} />
      </section>

      <section id="premises">
        <h2 className="font-serif text-2xl font-bold mb-4">Premises and workspace</h2>
        <ArticleTable
          headers={['Expense', 'Notes']}
          rows={[
            ['Chair rent / room hire', 'If working from a salon; typically weekly or monthly'],
            ['Home workspace proportion', 'If working from home, a proportion of home costs (bills, mortgage interest/rent) may be claimable — consult an accountant for the correct calculation for your situation'],
            ['Salon or studio rent', 'If you rent your own space'],
            ['Utilities (proportion)', 'Electricity, water for commercial space'],
          ]}
        />
      </section>

      <section id="insurance">
        <h2 className="font-serif text-2xl font-bold mb-4">Insurance</h2>
        <ArticleChecklist items={[
          'Professional indemnity insurance',
          'Public liability insurance',
          'Products liability insurance (often bundled)',
          'Treatment risk insurance (for nail services)',
        ]} />
        <ArticleTip>Insurance for nail techs is typically sold as a bundled professional beauty policy. Annual cost varies by provider and coverage level — check that nail services are explicitly covered under your policy.</ArticleTip>
      </section>

      <section id="equipment">
        <h2 className="font-serif text-2xl font-bold mb-4">Equipment</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Equipment is generally a capital expense (depreciates over time) rather than a monthly cost — but it's worth tracking:</p>
        <ArticleChecklist items={[
          'Nail lamp (UV/LED)',
          'Nail drill / e-file',
          'Nail table and client chair',
          'Portable lighting / ring light',
          'Extractor fan / ventilation system',
          'Storage and organisation equipment',
          'Sterilisation equipment',
        ]} />
      </section>

      <section id="software">
        <h2 className="font-serif text-2xl font-bold mb-4">Software and tools</h2>
        <ArticleChecklist items={[
          'Booking and scheduling software (monthly subscription)',
          'Accounting software',
          'Card payment processing fees (percentage of each transaction)',
          'Website hosting / domain',
          'Email marketing software',
          'Photo editing app subscriptions',
        ]} />
      </section>

      <section id="training">
        <h2 className="font-serif text-2xl font-bold mb-4">Training and education</h2>
        <ArticleChecklist items={[
          'Courses (acrylic, gel, nail art, business)',
          'Masterclasses and workshops',
          'Industry events and trade shows',
          'Practice materials and model costs',
          'Books, manuals, online resources',
        ]} />
      </section>

      <section id="marketing">
        <h2 className="font-serif text-2xl font-bold mb-4">Marketing and branding</h2>
        <ArticleChecklist items={[
          'Business cards and stationery printing',
          'Paid social media advertising',
          'Photographer for portfolio shots',
          'Logo design or branding',
          'Branded packaging or gift wrapping',
        ]} />
      </section>

      <section id="tracking">
        <h2 className="font-serif text-2xl font-bold mb-4">How to track expenses</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The most important habit: keep every receipt (digital or physical). A simple system:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Use a dedicated business bank account or card for all business spending</li>
          <li>Photograph paper receipts immediately (apps like Dext or Hubdoc capture and organise them)</li>
          <li>Categorise expenses monthly using the categories above</li>
          <li>Compare monthly spending to your budget — are products costing more than expected? Is a specific category growing?</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For calculating per-service product costs: <Link to="/learn/how-to-calculate-product-cost" className="underline text-[#F52B8C]">how to calculate your nail product cost</Link>.</p>
      </section>
    </div>
  ),
});
export {};
