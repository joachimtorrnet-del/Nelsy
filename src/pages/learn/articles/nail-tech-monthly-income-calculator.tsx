import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-monthly-income-calculator',
  title: 'Nail Tech Monthly Income: How to Calculate What You Actually Make',
  seoTitle: 'Nail Tech Monthly Income: How to Calculate What You Actually Make',
  excerpt: 'Knowing how much you actually take home — after products, overheads, and tax — is the starting point for making smarter business decisions. Here\'s the calculation.',
  seoDescription: 'How to calculate your nail tech monthly income. Step-by-step formula for working out your take-home pay after expenses and tax as a self-employed nail technician.',
  category: 'pricing-money',
  tags: ['nail tech monthly income', 'nail tech take home pay', 'nail tech income', 'nail business finances'],
  heroImage: 'linear-gradient(135deg, #FFF7ED 0%, #FED7AA 100%)',
  heroImageAlt: 'How to calculate nail tech monthly income',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'gross-revenue', label: 'Step 1: Calculate gross revenue' },
    { id: 'subtract-expenses', label: 'Step 2: Subtract expenses' },
    { id: 'tax-provision', label: 'Step 3: Provision for tax' },
    { id: 'net-income', label: 'Step 4: Your net monthly income' },
    { id: 'example', label: 'Full worked example' },
    { id: 'improving', label: 'How to improve your monthly income' },
  ],
  relatedSlugs: ['nail-tech-profit-margin-explained', 'nail-tech-expense-list', 'how-to-calculate-nail-tech-hourly-rate', 'nail-tech-revenue-goals'],
  faq: [
    { q: 'Do I need to pay tax as a self-employed nail tech?', a: 'In the UK, if you earn above the Personal Allowance threshold as a sole trader, you pay income tax and Class 4 National Insurance on your profits. You register with HMRC as self-employed and file a Self Assessment tax return annually. How much you pay depends on your profit level. This article is not tax advice — check HMRC.gov.uk or consult an accountant for your specific situation.' },
    { q: 'What\'s a realistic monthly income for a nail tech?', a: 'This varies enormously by location, experience, client volume, pricing, and business model. A full-time nail tech with a solid client base in a UK city might take home £1,800–£3,000+ per month after expenses. A part-time tech or someone building their client base will take home less. The calculation in this article lets you work out your specific number rather than relying on generalisations.' },
    { q: 'How do I handle irregular monthly income?', a: 'Income varies month to month for most nail techs — December is often high; January is often low. A useful approach: calculate your average monthly income over 3–6 months rather than relying on any single month. Keep a financial buffer (savings that cover 1–2 months of expenses) so a quiet month doesn\'t cause cash flow stress.' },
  ],
  relatedFeatureSlugs: ['analytics', 'payments'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="gross-revenue">
        <h2 className="font-serif text-2xl font-bold mb-4">Step 1: Calculate your gross revenue</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Gross revenue is the total money your clients pay you in a month. Add up all payments received:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>All appointment payments (including deposits counted in the month they're redeemed)</li>
          <li>Retail product sales (if any)</li>
          <li>Training income (if you teach)</li>
        </ul>
        <ArticleTip>Track revenue in the month it\'s earned (when the service is delivered), not when it was paid. A deposit taken in November for a December appointment is December revenue.</ArticleTip>
      </section>

      <section id="subtract-expenses">
        <h2 className="font-serif text-2xl font-bold mb-4">Step 2: Subtract your business expenses</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Deduct all business expenses from your gross revenue to get your <strong>gross profit</strong>:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Product and supply costs</li>
          <li>Rent / chair rent</li>
          <li>Insurance</li>
          <li>Software subscriptions</li>
          <li>Training (averaged monthly)</li>
          <li>Equipment depreciation (averaged monthly)</li>
          <li>Marketing costs</li>
          <li>Any other business costs</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Full expense categories: <Link to="/learn/nail-tech-expense-list" className="underline text-[#F52B8C]">nail tech expense list</Link>.</p>
      </section>

      <section id="tax-provision">
        <h2 className="font-serif text-2xl font-bold mb-4">Step 3: Provision for tax</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">As a self-employed sole trader in the UK, you pay income tax and National Insurance on your profit (revenue minus allowable business expenses). The amount depends on your profit level and your Personal Allowance.</p>
        <ArticleCallout variant="info" title="Tax provision approach">
          A commonly used rule of thumb for UK self-employed people is to set aside approximately 20–30% of profit for tax and National Insurance, depending on your profit level. This is a planning estimate only — your actual tax bill depends on your circumstances. Check HMRC guidance or speak to an accountant for accurate figures.
        </ArticleCallout>
      </section>

      <section id="net-income">
        <h2 className="font-serif text-2xl font-bold mb-4">Step 4: Your net monthly income</h2>
        <p className="text-gray-700 leading-relaxed"><strong>Net monthly income = Gross revenue − Business expenses − Tax provision</strong></p>
        <p className="text-gray-700 mt-4 leading-relaxed">This is your actual take-home pay — the money available for personal spending, saving, and investment.</p>
      </section>

      <section id="example">
        <h2 className="font-serif text-2xl font-bold mb-4">Full worked example</h2>
        <ArticleTable
          headers={['Item', 'Monthly amount']}
          rows={[
            ['Gross revenue (22 clients/week × 4.3 weeks × £42 avg)', '£3,970'],
            ['Product costs (approx. £5/client)', '−£473'],
            ['Chair rent', '−£400'],
            ['Insurance (monthly)', '−£28'],
            ['Software and tools', '−£25'],
            ['Training (averaged)', '−£50'],
            ['Other costs', '−£30'],
            ['Gross profit', '£2,964'],
            ['Tax provision (approx. 25%)', '−£741'],
            ['Net monthly income', '£2,223'],
          ]}
        />
        <ArticleTip>These figures are illustrative — your numbers will be different. The formula is the same; the inputs are yours.</ArticleTip>
      </section>

      <section id="improving">
        <h2 className="font-serif text-2xl font-bold mb-4">How to improve your monthly income</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Raise your prices</strong> — the most impactful single change</li>
          <li><strong>Add more billable hours</strong> — one additional client per day × 4 weeks = significant monthly revenue increase</li>
          <li><strong>Increase average appointment value</strong> — consistent add-on sales add up</li>
          <li><strong>Reduce product waste</strong> — improving product efficiency reduces a significant variable cost</li>
          <li><strong>Reduce overheads</strong> — audit what you pay for and whether it generates value</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For setting income targets: <Link to="/learn/nail-tech-revenue-goals" className="underline text-[#F52B8C]">nail tech revenue goals: how to set them</Link>.</p>
      </section>
    </div>
  ),
});
export {};
