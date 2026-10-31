import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-profit-margin-explained',
  title: 'Nail Tech Profit Margin Explained',
  seoTitle: 'Nail Tech Profit Margin Explained: What You Actually Keep',
  excerpt: 'Revenue is what you charge. Profit is what you keep. Understanding the difference — and the expenses that sit between them — is the foundation of a financially healthy nail business.',
  seoDescription: 'Nail tech profit margin explained. How to calculate your gross and net profit margin, what typical nail tech margins look like, and how to improve yours.',
  category: 'pricing-money',
  tags: ['nail tech profit margin', 'nail business profit', 'nail tech finances', 'nail business income'],
  heroImage: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
  heroImageAlt: 'Nail tech profit margin explained',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'revenue-vs-profit', label: 'Revenue vs profit' },
    { id: 'gross-margin', label: 'Gross profit margin' },
    { id: 'net-margin', label: 'Net profit margin' },
    { id: 'worked-example', label: 'Worked example' },
    { id: 'improving-margin', label: 'How to improve your margin' },
  ],
  relatedSlugs: ['how-to-calculate-nail-tech-hourly-rate', 'nail-tech-expense-list', 'nail-tech-monthly-income-calculator', 'nail-tech-break-even-point'],
  faq: [
    { q: 'What\'s a typical profit margin for a nail tech?', a: 'This varies widely by business model, pricing, and overheads. A home-based nail tech with low overheads and good product efficiency might achieve 60–75% net margins. A nail tech renting a chair in a salon, paying for insurance, training, and substantial product costs might sit at 40–55%. These are illustrative ranges, not guarantees — your actual margin depends entirely on your specific costs and revenue.' },
    { q: 'Should I calculate margin per service or overall?', a: 'Both are useful. Per-service margin shows you which services are most profitable (and which might be underpriced relative to their costs). Overall margin shows you whether your business is healthy at the total level. Start with overall, then drill into per-service margins when you want to optimise your pricing or service menu.' },
    { q: 'Is margin the same as take-home pay?', a: 'Not quite. Net profit margin is the percentage of revenue left after expenses — but for a sole trader, "profit" is your pre-tax income. From that, you\'ll pay income tax and National Insurance (in the UK), and you might reinvest some into the business. Your actual take-home is net profit minus tax. How to calculate your monthly income: see the linked article.' },
  ],
  relatedFeatureSlugs: ['analytics', 'payments'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="revenue-vs-profit">
        <h2 className="font-serif text-2xl font-bold mb-4">Revenue vs profit</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Revenue</strong> is the total money your business takes in from client payments. If you do 20 appointments at £45 each, your weekly revenue is £900.</p>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Profit</strong> is what's left after you subtract your costs. Your £900 revenue minus £250 in overheads (products, insurance, rent, software) = £650 profit.</p>
        <p className="text-gray-700 leading-relaxed"><strong>Profit margin</strong> is the percentage: £650 ÷ £900 = 72% profit margin. For every £1 of revenue, you keep 72p. Understanding this number helps you make better pricing, service, and investment decisions.</p>
      </section>

      <section id="gross-margin">
        <h2 className="font-serif text-2xl font-bold mb-4">Gross profit margin</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Gross profit margin</strong> = (Revenue − Product/direct costs) ÷ Revenue × 100</p>
        <p className="text-gray-700 mb-4 leading-relaxed">For nail techs, product costs include: gel, acrylic products, tips/forms, disposables, and any other materials used directly in the service. If your gel manicure service costs £40 and you use £5 of product, your gross margin is (£40 − £5) ÷ £40 = 87.5%.</p>
        <ArticleCallout variant="info" title="Gross margin is not your take-home">
          Gross margin tells you how efficiently you convert your product costs into revenue. It doesn't account for rent, insurance, training, equipment, or your own time. Those come out before you reach net margin.
        </ArticleCallout>
      </section>

      <section id="net-margin">
        <h2 className="font-serif text-2xl font-bold mb-4">Net profit margin</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Net profit margin</strong> = (Revenue − All costs) ÷ Revenue × 100</p>
        <p className="text-gray-700 leading-relaxed">All costs includes: product costs, rent/chair rent, insurance (professional indemnity + public liability), training, equipment depreciation, booking software, marketing, continuing education, and any other business expenses. What's left is your net profit — your income before tax.</p>
      </section>

      <section id="worked-example">
        <h2 className="font-serif text-2xl font-bold mb-4">Worked example</h2>
        <ArticleTable
          headers={['Item', 'Monthly figure']}
          rows={[
            ['Revenue (20 clients/week × 4 weeks × £45)', '£3,600'],
            ['Product costs (estimated £5/client)', '−£400'],
            ['Chair rent / room hire', '−£400'],
            ['Insurance', '−£30'],
            ['Booking software', '−£20'],
            ['Training / CPD', '−£50 (averaged monthly)'],
            ['Other business costs', '−£50'],
            ['Net profit (before tax)', '£2,650'],
            ['Net margin', '74%'],
          ]}
        />
        <ArticleTip>This example uses illustrative figures. Your costs will be different — calculate yours specifically. The categories are the same; the numbers are yours to input.</ArticleTip>
        <p className="text-gray-700 mt-4 leading-relaxed">For a full expenses breakdown: <Link to="/learn/nail-tech-expense-list" className="underline text-[#F52B8C]">nail tech expense list: what to track</Link>.</p>
      </section>

      <section id="improving-margin">
        <h2 className="font-serif text-2xl font-bold mb-4">How to improve your margin</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Margin improves when either revenue goes up or costs go down. The most practical levers:</p>
        <ArticleTable
          headers={['Lever', 'How it works']}
          rows={[
            ['Raise prices', 'Affects every appointment immediately; high impact on margin'],
            ['Improve product efficiency', 'Track how much product you actually use per service; waste adds up'],
            ['Add high-margin add-ons', 'Chrome, nail art, cuticle treatments: low material cost, meaningful additional revenue'],
            ['Reduce overheads', 'Negotiate chair rent; switch to a lower-cost booking platform; bulk-buy supplies'],
            ['Fill your calendar', 'Fixed costs (rent, insurance) stay the same whether you do 15 or 25 clients per week — more clients per week = better fixed-cost coverage'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For calculating your hourly rate: <Link to="/learn/how-to-calculate-nail-tech-hourly-rate" className="underline text-[#F52B8C]">how to calculate your nail tech hourly rate</Link>.</p>
      </section>
    </div>
  ),
});
export {};
