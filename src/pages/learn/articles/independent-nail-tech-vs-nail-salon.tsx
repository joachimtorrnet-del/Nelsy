import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTable, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

const link = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'independent-nail-tech-vs-nail-salon',
  title: 'Independent Nail Tech vs Nail Salon: Which Is Right for You?',
  seoTitle: 'Independent Nail Tech vs Nail Salon: Which Path Is Right for You?',
  excerpt: 'Working independently or in a salon are fundamentally different careers. Here\'s an honest breakdown of both: income, freedom, risk, and what each path looks like day to day.',
  seoDescription: 'Independent nail tech vs nail salon: what\'s the difference? Compare income, freedom, workload, and risk between going independent and working in a salon.',
  category: 'start-your-business',
  tags: ['independent nail tech vs salon', 'nail tech vs salon employee', 'should I work in a salon or independently'],
  heroImage: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
  heroImageAlt: 'Independent nail tech vs nail salon',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  updatedAt: '2026-11-26',
  tldr: {
    answer: 'Go independent if you can fill enough appointments to beat a salon wage after costs and tax; stay in a salon while you are still building skill, speed and a client list.',
    detail: 'A salon gives you steady pay, clients and no admin. Independence gives you the full price of every service, but you pay for products, space, software, marketing and your own time off.',
    points: [
      { label: 'Salon first', text: 'Newly qualified, slow on full sets, or no client base yet.' },
      { label: 'Independent', text: 'You can fill most of your week and want control over prices and hours.' },
      { label: 'Test it', text: 'Use the break-even calculation below with your own wage, prices and costs.' },
    ],
  },
  toc: [
    { id: 'what-independent-means', label: 'What "independent" actually means' },
    { id: 'comparison', label: 'Side-by-side comparison' },
    { id: 'income', label: 'Income and earnings' },
    { id: 'which-suits-you', label: 'Which path suits you?' },
    { id: 'hybrid', label: 'The hybrid path' },
  ],
  relatedSlugs: ['booth-rental-vs-commission-nail-techs', 'home-based-nail-tech-vs-salon-suite', 'when-to-get-your-own-nail-studio', 'how-to-start-a-nail-business-2026'],
  faq: [
    { q: 'Can I start as a salon employee and go independent later?', a: 'Yes, and it is a common path. A salon builds speed, confidence and technique with a steady wage. Be aware that salon clients usually belong to the salon, and your contract may include a non-solicitation clause, so plan to build your own audience on Instagram rather than counting on taking clients with you.' },
    { q: 'Is it harder to get clients as an independent nail tech?', a: 'At first, yes. A salon has footfall and an established name. As an independent you build your own audience through Instagram, TikTok, Google and word of mouth. Plan for several months of part-full weeks, and use a deposit and an easy booking link so the clients you do attract actually show up.' },
    { q: 'How many clients do I need to match a salon wage?', a: 'Divide your target weekly income by your profit per appointment. Example: to replace £420 a week and cover £60 of weekly fixed costs, with £35 profit per client after products, you need (420 + 60) ÷ 35 = about 14 clients a week, before tax. Plug in your own numbers.' },
  ],
  relatedFeatureSlugs: ['bookings', 'crm', 'analytics'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-independent-means">
        <h2 className="font-serif text-2xl font-bold mb-4">What &quot;independent&quot; actually means</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">An independent nail tech is self-employed: you set your own prices, manage your own bookings, work your own hours, and keep your own earnings (minus costs and tax). You may work from home, in a rented salon suite, in a shared booth, or as a mobile tech.</p>
        <p className="text-gray-700 leading-relaxed">A nail tech in a salon is usually either employed (receiving a wage or commission) or renting a chair or booth from the salon owner. Booth renters are still self-employed, but they work in someone else&apos;s space and brand. That middle option is covered in <Link to="/blog/booth-rental-vs-commission-nail-techs" className={link}>booth rental vs commission</Link>.</p>
      </section>

      <section id="comparison">
        <h2 className="font-serif text-2xl font-bold mb-4">Side-by-side comparison</h2>
        <ArticleTable
          headers={['Factor', 'Independent', 'Salon employee']}
          rows={[
            ['Income', 'Keep all revenue minus costs and tax', 'Wage or commission on services'],
            ['Income ceiling', 'Set by your prices and how many hours you fill', 'Set by your employment terms'],
            ['Schedule', 'You set it entirely', 'Set by the salon'],
            ['Client sourcing', 'Your responsibility', 'Partly provided by salon footfall'],
            ['Admin', 'All yours: bookings, payments, tax, policies', 'Minimal, handled by employer'],
            ['Supplies', 'You buy and manage them', 'Usually provided by salon'],
            ['Holiday and sick pay', 'None unless you save for it', 'Depends on your contract and local law'],
            ['Risk', 'All yours', 'Employment protections apply'],
            ['Creative freedom', 'Complete', 'Within salon brand and services'],
          ]}
        />
      </section>

      <section id="income">
        <h2 className="font-serif text-2xl font-bold mb-4">Income and earnings</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Independent nail techs keep the full price of each service, so they usually earn more per appointment. But income is variable, and early months can be lower than a wage while the client base builds. The useful question is: how many clients a week do you need to beat your current pay?</p>
        <ArticleCallout variant="info" title="Example: break-even against a salon wage">
          Example figures only. Salon: £12/hour × 35 hours = <strong>£420 a week</strong> before tax.<br /><br />
          Independent: gel set at £40, products about £5 per client, so £35 profit per client. Weekly fixed costs (space, insurance, software, marketing): £60.<br /><br />
          Clients needed = (£420 + £60) ÷ £35 = <strong>about 14 clients a week</strong>.<br />
          At 20 clients a week: (20 × £35) − £60 = £640, which is £220 more than the wage.<br />
          At 10 clients a week: (10 × £35) − £60 = £290, which is £130 less.
        </ArticleCallout>
        <p className="text-gray-700 mb-4 leading-relaxed">Remember that as an independent you also set aside money for tax, holidays and quiet weeks. A simple rule: compare the independent figure against your wage plus the value of paid holiday, not the wage alone.</p>
        <p className="text-gray-700 leading-relaxed">To find your own profit per service, use the <Link to="/tools/nail-tech-pricing-calculator" className={link}>nail tech pricing calculator</Link>.</p>
      </section>

      <section id="which-suits-you">
        <h2 className="font-serif text-2xl font-bold mb-4">Which path suits you?</h2>
        <ArticleChecklist
          title="Independent suits you if"
          items={[
            'Your break-even number above is realistic for your area and speed',
            'You want to set your own prices and schedule',
            'You are comfortable with admin, marketing and client messages',
            'You have, or are actively building, a client base online',
            'You have savings to cover 2 to 3 slow months',
          ]}
        />
        <ArticleChecklist
          title="Salon employment suits you if"
          items={[
            'You are newly qualified and want to build speed and confidence first',
            'You want a predictable income without business admin',
            'You prefer working in a team',
            'You are not ready to find your own clients yet',
          ]}
        />
      </section>

      <section id="hybrid">
        <h2 className="font-serif text-2xl font-bold mb-4">The hybrid path</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Many nail techs do both: part-time in a salon for stable income, while building independent clients on their days off. This lowers the financial risk while you grow.</p>
        <ArticleCallout variant="info" title="Example: a hybrid week">
          Example: 3 salon days × 7 hours × £12 = £252. Plus 2 independent days with 4 clients each: 8 × £35 profit = £280, minus £30 fixed costs = £250. Total about £502 a week before tax, with the salon wage as a safety net. When your independent days are consistently full, add a third and drop a salon day.
        </ArticleCallout>
        <p className="text-gray-700 leading-relaxed">Always check your employment contract before taking private clients: some contracts restrict side work or working with salon clients. When you are ready to go fully independent, start with <Link to="/blog/how-to-start-a-nail-business-2026" className={link}>how to start a nail business</Link>.</p>
      </section>
    </div>
  ),
});
export {};
