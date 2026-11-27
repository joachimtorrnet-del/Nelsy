import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleChecklist, ArticleImage, ArticleSteps, ArticleTable, ArticleTip } from '@/components/article/ArticleBodyComponents';

const a = 'underline text-[#F52B8C]';
const h2 = 'font-serif text-2xl font-bold mb-4';
const p = 'text-gray-700 mb-4 leading-relaxed';
const WAITLIST = 'mailto:hello@getnelsy.com?subject=Creator%20waitlist';

registerArticle({
  slug: 'how-to-price-a-digital-product-or-course',
  title: 'How to Price a Digital Product or Online Course',
  seoTitle: 'How to Price a Digital Product or Online Course',
  excerpt: 'A step-by-step method to price a beauty guide, template, video class or online course: value to the buyer, your costs and time, comparable offers, tiers, launch prices and payment plans, with worked examples.',
  seoDescription: 'How to price your digital products and online course: a 6-step method with worked examples, tiers, launch pricing, payment plans and when to raise your price.',
  category: 'beauty-creators',
  audience: ['creators', 'pros'],
  craft: 'all',
  tags: ['how to price an online course', 'how to price your digital products', 'how much to charge for an online course', 'course pricing', 'digital product pricing'],
  heroImage: 'linear-gradient(135deg, #F5F0FF 0%, #DDD6FE 100%)',
  heroImageAlt: 'How to price a digital product or online course',
  author: 'Nelsy Editorial',
  authorRole: 'Beauty Creator Business Guide',
  publishedAt: '2026-11-27',
  tldr: {
    answer: 'Price on the value of the result, check it covers your time, then test.',
    detail: 'Start from what the result is worth to the buyer, compare with the other ways they could get it, make sure the price pays back your creation time at a realistic number of sales, then launch and adjust. Tiers and payment plans let you serve different budgets without discounting.',
    points: [
      { label: 'Value anchor', text: 'What the result saves or earns the buyer.' },
      { label: 'Floor', text: 'Creation time and costs divided by realistic sales.' },
      { label: 'Test', text: 'A launch price, then raise it as proof builds.' },
    ],
  },
  toc: [
    { id: 'mistakes', label: 'Why creators underprice' },
    { id: 'method', label: 'The 6-step pricing method' },
    { id: 'example-guide', label: 'Worked example: a guide' },
    { id: 'example-course', label: 'Worked example: a course' },
    { id: 'tiers', label: 'Tiers, bundles and payment plans' },
    { id: 'launch', label: 'Launch prices and raising prices' },
    { id: 'fees', label: 'Fees and taxes to include' },
    { id: 'choose', label: 'Still stuck between two prices?' },
    { id: 'ladder', label: 'Build a price ladder' },
    { id: 'nelsy', label: 'Where Nelsy fits' },
  ],
  relatedSlugs: ['digital-product-ideas-for-beauty-creators', 'how-to-create-an-online-beauty-course', 'how-to-sell-a-beauty-ebook'],
  relatedLinks: { tool: '/tools/creator-rate-calculator', pages: ['/features/payments', '/use-cases/beauty-creators'] },
  faq: [
    { q: 'How do I price my online course?', a: 'Estimate the value of the result to the student, compare with alternatives (in-person classes, 1:1 sessions), check that the price recovers your creation time at a realistic number of sales, then set a launch price and adjust based on how it sells.' },
    { q: 'How much should I charge for a digital product?', a: 'There is no standard price. A one-page checklist and a complete toolkit for pros are worth very different amounts. Use value to the buyer, alternatives, and your own break-even, then test.' },
    { q: 'Should I price low to get more sales?', a: 'A very low price can make a product look less valuable and means you need many more sales to earn the same. It often works better to keep the price and offer a smaller product or a payment plan for lower budgets.' },
    { q: 'When should I raise my price?', a: 'When the product sells steadily, when you add proof (results, feedback), or when you add value (new lessons, templates, support). Tell your audience before a planned increase: it is also a good reason to buy now.' },
    { q: 'Should I offer payment plans?', a: 'For higher-priced courses, yes. Splitting the price into a few payments lowers the barrier. Many creators charge a little more in total for the plan than for paying in full.' },
  ],
  relatedFeatureSlugs: ['payments', 'deposits', 'link-in-bio'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <ArticleCallout variant="info" title="Who this is for">
        Beauty creators and beauty pros pricing a first guide, template, video class or online course. All numbers below are examples to show the math, not market prices.
      </ArticleCallout>

      <section id="mistakes">
        <h2 className={h2}>Why creators underprice</h2>
        <p className={p}>It is tempting to price a digital product by looking at what feels &quot;fair&quot; for a PDF or a video. That misses the point: the buyer is not paying for pages or minutes, they are paying to get a result faster and with fewer mistakes. A lash tech who stops losing clients to poor retention gains far more than the price of the guide that helped her.</p>
        <ArticleChecklist
          title="Signs you are underpricing"
          items={[
            'You priced by page count or video length.',
            'Your price is lower than one in-person session for the same result.',
            'You need hundreds of sales just to pay back the time you spent creating it.',
            'Buyers say "this was worth way more".',
          ]}
        />
      </section>

      <section id="method">
        <h2 className={h2}>The 6-step pricing method</h2>
        <ArticleSteps
          steps={[
            { title: 'Name the result', body: 'What can the buyer do, have or avoid after using the product? Write it in one sentence.' },
            { title: 'Estimate its value to the buyer', body: 'For pros: extra income, saved product, saved time. For consumers: money not wasted on wrong products, a salon visit avoided, confidence for an event.' },
            { title: 'List the alternatives', body: 'What would they pay for an in-person class, a 1:1 session, or another creator\'s product with a similar result?' },
            { title: 'Calculate your floor', body: '(Creation hours x your hourly rate + costs) divided by the number of sales you can realistically make in the first months.' },
            { title: 'Set a price between floor and value', body: 'Above your floor, clearly below the value of the result and in line with alternatives for what you include.' },
            { title: 'Test and adjust', body: 'Launch, watch conversion and feedback, then adjust or add tiers.' },
          ]}
        />
        <ArticleImage src="photo-1554224155-6726b3ff858f" alt="Hands sorting paperwork next to a calculator on a white desk" />
      </section>

      <section id="example-guide">
        <h2 className={h2}>Worked example: a pricing workbook for nail techs</h2>
        <ArticleCallout variant="tip" title="Example (illustrative numbers)">
          <strong>Result:</strong> a new nail tech prices her services for profit. <strong>Value:</strong> if she raises just 4 services a week by $5, that is $20 a week, about $1,040 a year. <strong>Alternatives:</strong> a 1:1 pricing session with a mentor. <strong>Floor:</strong> 12 hours of work at $40/hour = $480, plus $20 in tools = $500; if you expect 25 sales in the first three months, the floor is $500 / 25 = $20. <strong>Price:</strong> you choose $37: above the floor, a small fraction of the value, and below a 1:1 session.
        </ArticleCallout>
        <p className={p}>Pricing your own services works the same way: see the <Link to="/tools/nail-tech-pricing-calculator" className={a}>pricing calculator</Link>.</p>
      </section>

      <section id="example-course">
        <h2 className={h2}>Worked example: a lash fill course</h2>
        <ArticleCallout variant="tip" title="Example (illustrative numbers)">
          <strong>Result:</strong> a lash tech does a clean fill faster. <strong>Value:</strong> if she saves 20 minutes per fill and does 10 fills a week, she frees about 3 hours a week to book more clients. <strong>Alternatives:</strong> an in-person class in her city, plus travel. <strong>Floor:</strong> 40 hours to create at $50/hour = $2,000, plus $300 for a model and lights = $2,300. With 20 students in the first cohort, the floor is $2,300 / 20 = $115. <strong>Price:</strong> $197 for video only, $297 with two group feedback calls (which cost you about 3 hours per cohort).
        </ArticleCallout>
        <p className={p}>More on building it in <Link to="/blog/how-to-create-an-online-beauty-course" className={a}>how to create an online beauty course</Link>. If your hourly rate is not set yet, start with <Link to="/blog/how-to-calculate-nail-tech-hourly-rate" className={a}>how to calculate your hourly rate</Link> or the <Link to="/tools/creator-rate-calculator" className={a}>creator rate calculator</Link>.</p>
      </section>

      <section id="tiers">
        <h2 className={h2}>Tiers, bundles and payment plans</h2>
        <p className={p}>Instead of discounting, give buyers different levels of the same result.</p>
        <ArticleTable
          headers={['Tier', 'What it includes', 'Who it is for']}
          rows={[
            ['Essential', 'The guide or video lessons only', 'Self-starters on a budget'],
            ['Plus', 'Lessons plus templates and a group Q&A', 'Most buyers'],
            ['Premium', 'Everything plus feedback on their work or a 1:1 call', 'Buyers who want support'],
          ]}
        />
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Bundles:</strong> combine products for the same buyer (pricing workbook plus policy templates plus DM scripts) at less than the sum of the parts.</li>
          <li><strong>Payment plans:</strong> for higher prices, split into a few monthly payments. Charging a little more in total for the plan is common.</li>
          <li><strong>Order bumps:</strong> a small add-on offered at checkout (for example printable aftercare cards with a lash guide).</li>
        </ul>
        <ArticleTip>Buyers compare tiers against each other, so make the middle tier the one you most want to sell, and the clearest value of the three.</ArticleTip>
      </section>

      <section id="launch">
        <h2 className={h2}>Launch prices and raising prices</h2>
        <p className={p}>A founding or launch price rewards early buyers and gives you feedback and results to show. Be honest about it: state the regular price and when the launch price ends, and stick to it.</p>
        <ArticleTable
          headers={['Stage', 'Price approach', 'Why']}
          rows={[
            ['Pre-sale', 'Founding price, limited time or spots', 'Validates demand before you build'],
            ['Launch', 'Regular price, maybe a bonus instead of a discount', 'Keeps the value clear'],
            ['After proof', 'Raise the price, announce it in advance', 'Results and feedback justify it'],
            ['Evergreen', 'Stable price, occasional bundles', 'Predictable sales'],
          ]}
        />
        <ArticleImage src="photo-1513128034602-7814ccaddd4e" alt="Hand writing a to-do list in a spiral notebook" />
      </section>

      <section id="fees">
        <h2 className={h2}>Fees and taxes to include</h2>
        <p className={p}>Your price is not what you keep. Before you settle on a number, subtract:</p>
        <ArticleChecklist
          items={[
            'Payment processing fees (a percentage plus a fixed amount per sale on most processors).',
            'Any platform fee or commission on each sale, depending on where you sell.',
            'The monthly cost of the tools you use to sell and deliver.',
            'VAT or sales tax where it applies to digital products in the buyer\'s country.',
            'Income tax on your profit.',
          ]}
        />
        <ArticleCallout variant="tip" title="Worked example (illustrative numbers)">
          You sell a $37 guide. Processing at, for example, 2.9% + $0.30 costs $1.07 + $0.30 = $1.37, leaving $35.63. If the platform you use also takes a 5% fee ($1.85), you keep $33.78 before tax. On 100 sales that 5% is $185, so compare platforms on total cost, not only the monthly price.
        </ArticleCallout>
        <p className={p}>The <Link to="/tools/booking-app-fee-calculator" className={a}>booking app fee calculator</Link> shows the same logic for appointment fees, and our comparison of <Link to="/blog/best-platform-to-sell-beauty-courses" className={a}>platforms to sell beauty courses</Link> covers fees per platform.</p>
        <ArticleImage src="photo-1634733988138-bf2c3a2a13fa" alt="Card payment terminal printing a receipt on an orange background" />
      </section>

      <section id="choose">
        <h2 className={h2}>Still stuck between two prices?</h2>
        <p className={p}>If you have two numbers in mind, these questions usually settle it:</p>
        <ArticleTable
          headers={['Question', 'If yes', 'If no']}
          rows={[
            ['Is the buyer a pro who will earn from it?', 'Lean higher', 'Lean lower, or make it smaller'],
            ['Does it include your time (feedback, calls)?', 'Lean higher and cap the support', 'Price the content alone'],
            ['Do you have results or feedback to show?', 'Lean higher', 'Use a founding price, then raise'],
            ['Is it your first product for this audience?', 'Start lower, raise after proof', 'Price in line with your other products'],
            ['Would you be happy to sell 50 at this price?', 'Keep it', 'Raise it, or reduce the scope'],
          ]}
        />
        <p className={p}>The last question matters most. A price you resent will make you avoid promoting the product. A price you are proud of makes it easier to talk about every week.</p>
      </section>

      <section id="ladder">
        <h2 className={h2}>Build a price ladder</h2>
        <p className={p}>Once you have more than one product, arrange them as steps from free to premium, so each buyer has a natural next step.</p>
        <ArticleTable
          headers={['Step', 'Example for a lash artist', 'Role']}
          rows={[
            ['Free', 'Aftercare checklist for clients, mapping cheat sheet for pros', 'Grow your email list'],
            ['Low price', 'Retention troubleshooting guide', 'First purchase, builds trust'],
            ['Mid price', 'Lash fill video course', 'Main product'],
            ['Premium', 'Course plus in-person practice day or mentoring', 'Highest support, limited spots'],
          ]}
        />
        <p className={p}>Ideas to fill each step are in <Link to="/blog/digital-product-ideas-for-beauty-creators" className={a}>35 digital product ideas for beauty creators</Link>.</p>
      </section>

      <section id="nelsy">
        <h2 className={h2}>Where Nelsy fits</h2>
        <p className={p}>If you also sell services, Nelsy lets you set the payment per service (pay on arrival, a deposit or full payment) on your booking page, on the Independent plan ($29/month or $25/month billed yearly, 14-day free trial, 0% Nelsy commission; Stripe processing fees apply). See <Link to="/features/payments" className={a}>payments</Link>.</p>
        <p className={p}>Selling guides and courses is part of the upcoming Creator plan; <a href={WAITLIST} className={a}>join the waitlist</a> to hear when it opens.</p>
      </section>
    </div>
  ),
});
export {};
