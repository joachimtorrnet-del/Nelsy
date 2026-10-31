import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-calculate-nail-tech-hourly-rate',
  title: 'How to Calculate Your Nail Tech Hourly Rate',
  seoTitle: 'How to Calculate Your Nail Tech Hourly Rate (Step-by-Step)',
  excerpt: 'Your hourly rate isn\'t just your service price divided by time — it\'s a function of your costs, target income, available hours, and efficiency. Here\'s how to work it out properly.',
  seoDescription: 'How to calculate your nail tech hourly rate. Formula and worked example for calculating what you need to charge per hour to hit your income goals after expenses.',
  category: 'pricing-money',
  tags: ['nail tech hourly rate', 'nail tech income', 'nail pricing formula', 'nail tech wages'],
  heroImage: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
  heroImageAlt: 'How to calculate your nail tech hourly rate',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-it-matters', label: 'Why knowing your hourly rate matters' },
    { id: 'formula', label: 'The formula' },
    { id: 'worked-example', label: 'Worked example' },
    { id: 'comparing', label: 'Comparing to your current prices' },
    { id: 'raising', label: 'When the numbers don\'t add up' },
  ],
  relatedSlugs: ['nail-tech-profit-margin-explained', 'nail-tech-expense-list', 'how-to-price-nail-services-for-profit', 'how-to-stop-undercharging-nail-tech'],
  faq: [
    { q: 'What\'s a typical hourly rate for a nail tech?', a: 'There is no universal typical rate — it varies significantly by location, experience, service type, and business model. A nail tech in central London charges more than one in a rural area, and a nail tech with 10 years of experience charging for a specialist service earns more per hour than a new starter. Use the formula in this article to calculate the rate your specific situation requires, rather than benchmarking against others without understanding their cost structure.' },
    { q: 'Should I include non-billable time in my hourly rate calculation?', a: 'Yes — and this is where many nail techs undercharge. Every hour spent on admin, cleaning, ordering products, social media, and client communication is a working hour that your service prices need to support. If you work 30 actual client hours per week but 40 total work hours per week, your hourly rate calculation should be based on 30 billable hours, not 40 — your prices carry those additional 10 hours.' },
    { q: 'How do I know if my current prices give me a good hourly rate?', a: 'Divide your monthly net profit by your monthly client hours. If your result is below what you need to live on (your target hourly take-home), your prices are too low for your cost structure. This article shows the calculation in detail.' },
  ],
  relatedFeatureSlugs: ['payments', 'analytics'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-it-matters">
        <h2 className="font-serif text-2xl font-bold mb-4">Why knowing your hourly rate matters</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Without knowing your actual hourly rate, you can't make informed decisions about pricing, service time, or add-ons. A nail tech who doesn't know their hourly rate might spend 2 hours on an intricate nail art set priced at £50 — which works out to £25 per hour before any deductions. Knowing the number helps you price correctly.</p>
        <p className="text-gray-700 leading-relaxed">Hourly rate also helps you evaluate which services are worth offering. A 90-minute service at £70 generates £46.67/hour. A 60-minute service at £50 generates £50/hour. The longer service looks more expensive but pays less per hour.</p>
      </section>

      <section id="formula">
        <h2 className="font-serif text-2xl font-bold mb-4">The formula</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Step 1: Calculate your target monthly income (after tax, what you want to take home)</p>
        <p className="text-gray-700 mb-4 leading-relaxed">Step 2: Add your monthly business expenses (product, rent, insurance, software, etc.)</p>
        <p className="text-gray-700 mb-4 leading-relaxed">Step 3: This gives you your required monthly revenue</p>
        <p className="text-gray-700 mb-4 leading-relaxed">Step 4: Divide by your available billable hours per month</p>
        <p className="text-gray-700 mb-4 leading-relaxed">This gives you your <strong>minimum required hourly rate</strong> — the rate below which you can't meet your income goal.</p>
        <ArticleCallout variant="info" title="Formula">
          Required hourly rate = (Target take-home + Monthly expenses + Tax provision) ÷ Monthly billable hours
        </ArticleCallout>
      </section>

      <section id="worked-example">
        <h2 className="font-serif text-2xl font-bold mb-4">Worked example</h2>
        <ArticleTable
          headers={['Item', 'Amount']}
          rows={[
            ['Target monthly take-home', '£2,000'],
            ['Monthly business expenses (product, rent, insurance, etc.)', '£600'],
            ['Tax provision (approx. 25% of gross profit — check with an accountant)', '£700'],
            ['Total required monthly revenue', '£3,300'],
            ['Billable hours per month (5 clients/day × 5 days × 4 weeks × 1hr avg)', '100 hours'],
            ['Required hourly rate', '£33/hour'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">At this required hourly rate: a 1-hour gel manicure needs to be priced at least £33. A 1.5-hour extension set needs to be at least £49.50. These are minimums — actual prices should be at or above these to meet the target.</p>
        <ArticleTip>These figures are illustrative. Your tax situation depends on your jurisdiction and circumstances — use the principle, not these specific numbers. Consult an accountant or check HMRC guidance (UK) for your actual tax obligations.</ArticleTip>
      </section>

      <section id="comparing">
        <h2 className="font-serif text-2xl font-bold mb-4">Comparing to your current prices</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Work backwards from your current pricing: take your most common service, divide the price by the time it takes (including setup and cleanup), and compare to your required hourly rate. If your effective hourly rate is below your required rate, your prices are too low for your cost structure and income goals.</p>
        <ArticleTable
          headers={['Service', 'Price', 'Time', 'Effective hourly rate']}
          rows={[
            ['Gel manicure', '£35', '1 hour', '£35/hour'],
            ['Acrylic set', '£55', '2 hours', '£27.50/hour'],
            ['Gel-X set', '£60', '2 hours', '£30/hour'],
            ['Infill', '£40', '1.5 hours', '£26.67/hour'],
          ]}
        />
      </section>

      <section id="raising">
        <h2 className="font-serif text-2xl font-bold mb-4">When the numbers don't add up</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If your required hourly rate is higher than your current effective rates, you have three options:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Raise your prices</strong> — the most direct solution</li>
          <li><strong>Reduce your expenses</strong> — audit what you spend; are all costs necessary?</li>
          <li><strong>Improve your efficiency</strong> — reducing appointment time for the same quality improves your effective hourly rate</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For when and how to raise prices: <Link to="/learn/when-should-nail-tech-raise-prices" className="underline text-[#F52B8C]">when should a nail tech raise prices</Link> | <Link to="/learn/how-to-stop-undercharging-nail-tech" className="underline text-[#F52B8C]">how to stop undercharging as a nail tech</Link>.</p>
      </section>
    </div>
  ),
});
export {};
