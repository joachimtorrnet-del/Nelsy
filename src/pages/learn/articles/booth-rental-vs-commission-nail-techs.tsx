import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleTable, ArticleTip, ArticleCallout, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

const link = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'booth-rental-vs-commission-nail-techs',
  title: 'Booth Rental vs Commission for Nail Techs',
  seoTitle: 'Booth Rental vs Commission for Nail Techs: Which Is Better?',
  excerpt: 'Booth rental and commission are two very different ways to work inside a salon. Here\'s what each model actually means for your income, freedom, and career.',
  seoDescription: 'Booth rental vs commission for nail techs. Compare both salon models on income, freedom and risk, and see which suits each stage of a nail tech career.',
  category: 'start-your-business',
  audience: ['pros', 'salons'],
  craft: 'nails',
  tags: ['booth rental vs commission nail tech', 'nail tech booth rental', 'nail tech commission model'],
  heroImage: 'linear-gradient(135deg, #FFF7ED 0%, #FED7AA 100%)',
  heroImageAlt: 'Booth rental vs commission for nail techs',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  updatedAt: '2026-11-26',
  tldr: {
    answer: 'Booth rental pays more once you are busy enough to cover the rent; commission is safer while you are still building a client list.',
    detail: 'Find your crossover point: the number of weekly clients where booth rental starts beating commission. In the worked example below it is 12 clients a week; below that, commission pays more.',
    points: [
      { label: 'Commission', text: 'No rent, salon supplies and clients, but you keep only a share of each service.' },
      { label: 'Booth rental', text: 'You keep each full price, but rent is due even in a slow week.' },
      { label: 'Decide', text: 'Fixed costs ÷ (your profit per client − commission pay per client) = crossover clients per week.' },
    ],
  },
  toc: [
    { id: 'what-is-booth-rental', label: 'What is booth rental?' },
    { id: 'what-is-commission', label: 'What is commission?' },
    { id: 'comparison', label: 'Side-by-side comparison' },
    { id: 'income-example', label: 'How income compares' },
    { id: 'which-to-choose', label: 'Which to choose' },
  ],
  relatedSlugs: ['independent-nail-tech-vs-nail-salon', 'home-based-nail-tech-vs-salon-suite', 'when-to-get-your-own-nail-studio', 'nail-tech-expense-list'],
  faq: [
    { q: 'Can I switch from commission to booth rental in the same salon?', a: 'Sometimes. It depends on the salon owner. Some salons offer both, or will move a busy commission tech to booth rental. Before asking, work out your crossover number so you know booth rental actually pays more at your current client count, and check what happens to the clients you see now.' },
    { q: 'What expenses do I need to cover under booth rental?', a: 'Usually: the booth or station rent, your own products and disposables, insurance, your booking system, card processing, marketing, and tax as a self-employed person. The salon usually covers the premises, shared utilities and sometimes reception. Get the list in writing, because it varies from salon to salon.' },
    { q: 'What questions should I ask before signing a booth rental agreement?', a: 'Ask: how much is rent and when is it due, is there a notice period, what is included (utilities, towels, reception, laundry), can I set my own prices and hours, can I use my own booking system and take my clients with me if I leave, and is there a deposit on the booth.' },
  ],
  relatedFeatureSlugs: ['bookings', 'crm', 'analytics'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-is-booth-rental">
        <h2 className="font-serif text-2xl font-bold mb-4">What is booth rental?</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Booth rental (also called chair rental or station rental) means you pay the salon owner a fixed weekly or monthly fee to use a station in their salon. You are self-employed: you set your own prices, keep all your earnings, manage your own clients, and buy your own supplies. The salon provides the space, utilities, and sometimes reception.</p>
        <p className="text-gray-700 leading-relaxed">You are essentially running your own nail business inside someone else&apos;s salon, which means you also need your own booking link, deposits and policies.</p>
      </section>

      <section id="what-is-commission">
        <h2 className="font-serif text-2xl font-bold mb-4">What is commission?</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Commission means you are employed (or contracted) by the salon and receive a percentage of the revenue you generate. The salon sets prices, handles booking, and provides supplies. The rest of each service price goes to the salon owner to cover rent, products, reception and their margin.</p>
        <p className="text-gray-700 leading-relaxed">Commission percentages vary widely between salons and countries. Always confirm the exact percentage, whether it is calculated before or after product costs, and whether there is a base wage, before accepting a position.</p>
      </section>

      <section id="comparison">
        <h2 className="font-serif text-2xl font-bold mb-4">Side-by-side comparison</h2>
        <ArticleTable
          headers={['Factor', 'Booth rental', 'Commission']}
          rows={[
            ['Employment status', 'Self-employed', 'Employee (usually)'],
            ['Pricing', 'You set your own', 'Salon sets prices'],
            ['Income', 'All revenue minus costs and rent', 'Percentage of services'],
            ['Supplies', 'You buy your own', 'Provided by salon'],
            ['Clients', 'Your clients (you manage them)', 'Salon\'s clients'],
            ['Schedule', 'You set it', 'Agreed with salon'],
            ['Slow week', 'Rent is still due', 'You earn less, but owe nothing'],
            ['Earning potential', 'Grows with every extra client', 'Limited by the commission rate'],
          ]}
        />
      </section>

      <section id="income-example">
        <h2 className="font-serif text-2xl font-bold mb-4">How income compares</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The difference depends on how many clients you see. Here is one example with simple numbers. All figures are illustrative: use your salon&apos;s real terms.</p>
        <ArticleCallout variant="info" title="Example assumptions">
          Gel set at £40. Commission: 50% of each service, so £20 per client to you. Booth rental: £150 a week rent plus £25 a week for insurance, software and marketing = £175 fixed costs. Products about £5 per client, so £35 per client to you before fixed costs.
        </ArticleCallout>
        <ArticleTable
          headers={['Clients per week', 'Commission (clients × £20)', 'Booth rental ((clients × £35) − £175)', 'Better option']}
          rows={[
            ['8', '£160', '£105', 'Commission'],
            ['12', '£240', '£245', 'About even'],
            ['20', '£400', '£525', 'Booth rental'],
            ['25', '£500', '£700', 'Booth rental'],
          ]}
        />
        <ArticleCallout variant="success" title="Find your crossover point">
          Crossover clients = fixed costs ÷ (booth profit per client − commission pay per client).<br />
          Example: £175 ÷ (£35 − £20) = £175 ÷ £15 = <strong>about 12 clients a week</strong>.<br />
          Above 12, every extra client earns you £15 more on booth rental than on commission.
        </ArticleCallout>
        <ArticleTip>Remember that as a booth renter you pay your own tax and get no holiday pay. Compare against commission plus any paid holiday, and keep a buffer of at least a few weeks of rent before you switch.</ArticleTip>
        <p className="text-gray-700 leading-relaxed">To work out your real profit per client, use the <Link to="/tools/nail-tech-pricing-calculator" className={link}>nail tech pricing calculator</Link>.</p>
      </section>

      <section id="which-to-choose">
        <h2 className="font-serif text-2xl font-bold mb-4">Which to choose</h2>
        <ArticleChecklist
          title="Booth rental suits you if"
          items={[
            'You already see more clients than your crossover number, most weeks',
            'You want to set your own prices and keep control of your earnings',
            'You are comfortable with booking, deposits, admin and marketing',
            'You have savings to cover a few slow weeks of rent',
          ]}
        />
        <ArticleChecklist
          title="Commission suits you if"
          items={[
            'You are newly qualified and want to build speed and experience',
            'You want reliable income without managing a business',
            'You don\'t yet have your own client base',
            'You prefer a team environment and support structure',
          ]}
        />
        <p className="text-gray-700 leading-relaxed">Thinking about going fully on your own instead? Compare in <Link to="/blog/independent-nail-tech-vs-nail-salon" className={link}>independent nail tech vs nail salon</Link>.</p>
      </section>
    </div>
  ),
});
export {};
