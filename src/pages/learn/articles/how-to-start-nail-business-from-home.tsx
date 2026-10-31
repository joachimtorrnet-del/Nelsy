import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleChecklist, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-start-nail-business-from-home',
  title: 'How to Start a Nail Business From Home',
  seoTitle: 'How to Start a Nail Business From Home (UK Guide)',
  excerpt: 'A home nail business has lower startup costs and more flexibility — but requires specific setup, insurance, and client management considerations.',
  seoDescription: 'How to start a nail business from home in the UK. Setup checklist, insurance requirements, planning permission, pricing, and getting your first home nail clients.',
  category: 'start-your-business',
  tags: ['home nail business', 'nail business from home', 'home nail tech', 'start nail business'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #A7F3D0 100%)',
  heroImageAlt: 'How to start a nail business from home',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'pros-cons', label: 'Pros and cons of a home setup' },
    { id: 'legal-requirements', label: 'Legal and planning requirements' },
    { id: 'setup', label: 'Setting up your home nail space' },
    { id: 'insurance', label: 'Insurance for home nail techs' },
    { id: 'client-experience', label: 'Creating a professional client experience' },
    { id: 'pricing', label: 'Pricing for a home studio' },
  ],
  relatedSlugs: ['how-to-start-a-nail-business-2026', 'nail-tech-beginner-business-checklist', 'nail-tech-starter-kit'],
  faq: [
    { q: 'Do I need planning permission to run a nail business from home in the UK?', a: 'You may need it depending on the scale. Working from a spare bedroom on a small number of clients generally doesn\'t require planning permission. If you\'re converting a garage, having significant client footfall, or employing others, you should check with your local council. Renting? Check your tenancy agreement.' },
    { q: 'Can I put my home address on my Instagram as a nail tech?', a: 'You don\'t need to. Most home nail techs list only their neighbourhood or area (e.g. "East London" or "Didsbury, Manchester") on their public profiles. Your full address can go in the booking confirmation message sent only to confirmed clients.' },
    { q: 'Do I need a separate room for a home nail business?', a: 'Not necessarily — some nail techs work from kitchen tables or a space in a living room. A dedicated space is better for professionalism and helps mentally separate work from home. At minimum: good lighting, a stable table at the right height, storage for your products, and a clean, uncluttered background for photos.' },
  ],
  relatedFeatureSlugs: ['bookings', 'link-in-bio', 'payments'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="pros-cons">
        <h2 className="font-serif text-2xl font-bold mb-4">Pros and cons of a home nail setup</h2>
        <ArticleTable
          headers={['Pros', 'Cons']}
          rows={[
            ['Lower overheads (no salon rent)', 'Less separation between work and home'],
            ['No commute', 'May need planning permission at scale'],
            ['Set your own hours completely', 'Client footfall in your private space'],
            ['Build a loyal, personal client base', 'Limited space for expansion'],
            ['Lower startup costs', 'May be in a lease that restricts commercial use'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For most new nail techs, starting from home is the right call. Lower risk, lower costs, and the ability to build income gradually before committing to rent.</p>
      </section>

      <section id="legal-requirements">
        <h2 className="font-serif text-2xl font-bold mb-4">Legal and planning requirements</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Before taking clients at home:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Planning permission:</strong> Small-scale home working (few clients per day, no external signage, no structural changes) typically doesn't require it. Check with your local council if in doubt.</li>
          <li><strong>Mortgage/tenancy:</strong> Homeowners may need to check their mortgage conditions. Renters must check their tenancy agreement — many explicitly prohibit running a business from a rental property.</li>
          <li><strong>Council tax:</strong> If part of your home is exclusively used for business, a small portion may become subject to business rates. For most home nail techs this doesn't apply — you're using a multipurpose room.</li>
          <li><strong>HMRC registration:</strong> Register as self-employed before you start earning. Free to do online.</li>
        </ul>
        <ArticleCallout variant="warning" title="Check your tenancy agreement">
          If you rent, running a business from home may technically breach your tenancy. Some landlords are fine with a small client-facing business; others aren't. Have the conversation before you start — not after.
        </ArticleCallout>
      </section>

      <section id="setup">
        <h2 className="font-serif text-2xl font-bold mb-4">Setting up your home nail space</h2>
        <ArticleChecklist title="Home nail studio essentials" items={[
          'Dedicated table at the right working height (approximately desk height)',
          'Comfortable chair for you and a client chair that positions hands at correct height',
          'Good lighting — ring light or dedicated nail lamp is minimum',
          'Adequate ventilation — nail products have fumes; a window or fan is essential',
          'Storage for products (organised, clean, accessible)',
          'Clean, uncluttered background (even just a plain wall) for portfolio photos',
          'Hand wash and sanitisation station for clients',
          'Clean towels or disposable nail mats',
        ]} />
        <ArticleTip>Invest in good lighting before anything else. A ring light (£30–50) makes a bigger difference to your portfolio photos — and therefore your ability to attract clients — than almost any other equipment purchase.</ArticleTip>
      </section>

      <section id="insurance">
        <h2 className="font-serif text-2xl font-bold mb-4">Insurance for home nail techs</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Home nail techs need the same insurance as salon-based nail techs — possibly more, since clients are in your personal space:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Treatment liability:</strong> Covers claims if a client has an adverse reaction to a product</li>
          <li><strong>Public liability:</strong> Covers injury claims if a client is hurt in your space</li>
          <li><strong>Products liability:</strong> Often included with treatment liability — covers products you sell</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">Home insurance policies typically don't cover business activities. Check with your home insurer — you may need to add business cover or switch providers. UK providers for nail tech insurance include PolicyBee, Salon Gold, and Markel Direct.</p>
      </section>

      <section id="client-experience">
        <h2 className="font-serif text-2xl font-bold mb-4">Creating a professional client experience</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The main concern with home setups is professionalism. A tidy, intentional space feels professional regardless of whether it's in a home or a salon. What matters:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Clean, organised work area every time a client arrives</li>
          <li>A clear entry path — don't make clients navigate through your personal living space</li>
          <li>Consistent scent and atmosphere — light a candle, play background music</li>
          <li>No personal interruptions during appointments (family, pets, phone calls)</li>
          <li>A professional confirmation message that includes your address and any parking/access notes</li>
        </ul>
      </section>

      <section id="pricing">
        <h2 className="font-serif text-2xl font-bold mb-4">Pricing for a home studio</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Home nail techs often undercharge because they feel they "should" charge less than a salon. You shouldn't — your skill, time, and products cost the same. Your overhead is lower, but that's your benefit, not your client's discount.</p>
        <p className="text-gray-700 leading-relaxed">Price based on your skill level, local market, and cost calculation. Being home-based is a convenience advantage (easier parking, personal atmosphere) — not a reason to underprice. See: <Link to="/learn/how-to-price-nail-services-for-profit" className="underline text-[#F52B8C]">how to price nail services for profit</Link>.</p>
      </section>
    </div>
  ),
});
export {};
