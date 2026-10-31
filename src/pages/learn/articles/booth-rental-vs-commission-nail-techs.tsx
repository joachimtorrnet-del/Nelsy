import { registerArticle } from '@/lib/articles';
import { ArticleTable, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'booth-rental-vs-commission-nail-techs',
  title: 'Booth Rental vs Commission for Nail Techs',
  seoTitle: 'Booth Rental vs Commission for Nail Techs: Which Is Better?',
  excerpt: 'Booth rental and commission are two very different ways to work inside a salon. Here\'s what each model actually means for your income, freedom, and career.',
  seoDescription: 'Booth rental vs commission for nail techs. Compare booth rental and commission salon models — income, freedom, risk, and which suits different stages of a nail tech career.',
  category: 'start-your-business',
  tags: ['booth rental vs commission nail tech', 'nail tech booth rental', 'nail tech commission model'],
  heroImage: 'linear-gradient(135deg, #FFF7ED 0%, #FED7AA 100%)',
  heroImageAlt: 'Booth rental vs commission for nail techs',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'what-is-booth-rental', label: 'What is booth rental?' },
    { id: 'what-is-commission', label: 'What is commission?' },
    { id: 'comparison', label: 'Side-by-side comparison' },
    { id: 'income-example', label: 'How income compares' },
    { id: 'which-to-choose', label: 'Which to choose' },
  ],
  relatedSlugs: ['independent-nail-tech-vs-nail-salon', 'home-based-nail-tech-vs-salon-suite', 'when-to-get-your-own-nail-studio', 'nail-tech-expense-list'],
  faq: [
    { q: 'Can I switch from commission to booth rental in the same salon?', a: 'Sometimes — it depends on the salon owner and their business model. Some salons offer both arrangements, or will transition a successful commission tech to booth rental when the tech wants more independence. It\'s worth having the conversation if you\'re established at the salon and want more autonomy.' },
    { q: 'What expenses do I need to cover under booth rental?', a: 'Under booth rental, you\'re typically responsible for: your own professional products and supplies, your own insurance, your own booking system, and your own marketing. The salon covers: rent of your station, shared utilities, reception (sometimes), and the salon\'s overall brand and premises.' },
  ],
  relatedFeatureSlugs: ['bookings', 'crm', 'analytics'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-is-booth-rental">
        <h2 className="font-serif text-2xl font-bold mb-4">What is booth rental?</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Booth rental (also called chair rental or station rental) means you pay the salon owner a fixed weekly or monthly fee to use a station in their salon. You are self-employed — you set your own prices, keep all your earnings, manage your own clients, and buy your own supplies. The salon provides the space, utilities, and sometimes reception.</p>
        <p className="text-gray-700 leading-relaxed">You're essentially running your own nail business inside someone else's salon.</p>
      </section>

      <section id="what-is-commission">
        <h2 className="font-serif text-2xl font-bold mb-4">What is commission?</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Commission means you're employed (or contracted) by the salon and receive a percentage of the revenue you generate. The salon sets prices, handles booking, and provides supplies. You receive a percentage of each service you perform — the rest goes to the salon owner to cover rent, products, reception, and their margin.</p>
        <p className="text-gray-700 leading-relaxed">Commission percentages vary widely — always confirm the exact percentage before accepting a position.</p>
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
            ['Financial risk', 'You take the risk', 'Salon takes more risk'],
            ['Earning potential', 'Higher ceiling', 'Capped by commission rate'],
          ]}
        />
      </section>

      <section id="income-example">
        <h2 className="font-serif text-2xl font-bold mb-4">How income compares</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The income difference between booth rental and commission depends heavily on booking volume and the specific terms. In general:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>A fully booked booth-renter keeps far more per appointment than a commission tech — they just have to cover their own rent and supplies</li>
          <li>A part-time or slow booth-renter may earn less than a commission tech because they still owe rent regardless of how many clients they see</li>
          <li>Commission is lower risk at low volume; booth rental is more profitable at high volume</li>
        </ul>
        <ArticleTip>Before taking a booth rental, calculate the number of appointments you need per week just to cover your rent and supplies (your break-even). If that number feels achievable, booth rental is worth it. If it's a stretch, commission may be safer while you build.</ArticleTip>
      </section>

      <section id="which-to-choose">
        <h2 className="font-serif text-2xl font-bold mb-4">Which to choose</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Booth rental suits you if:</strong></p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>You have an established client base or are confident you can build one</li>
          <li>You want to set your own prices and keep control of your earnings</li>
          <li>You're comfortable with the business side (booking, admin, marketing)</li>
          <li>You want creative and scheduling freedom</li>
        </ul>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Commission suits you if:</strong></p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>You're newly qualified and need to build experience</li>
          <li>You want a reliable income without managing a business</li>
          <li>You don't yet have an established client base</li>
          <li>You prefer a team environment and support structure</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
