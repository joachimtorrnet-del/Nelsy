import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleSteps, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-start-a-nail-business-2026',
  title: 'How to Start a Nail Business in 2026',
  seoTitle: 'How to Start a Nail Business in 2026: A Complete Guide',
  excerpt: 'A step-by-step guide to launching a nail business in 2026 — from training and insurance to your first clients and booking system.',
  seoDescription: 'How to start a nail business in 2026. Everything you need: training, insurance, equipment, pricing, Instagram, booking software, and getting your first clients.',
  category: 'start-your-business',
  tags: ['start nail business', 'nail business 2026', 'new nail tech', 'nail business setup'],
  heroImage: 'linear-gradient(135deg, #FDF4FF 0%, #E9D5FF 100%)',
  heroImageAlt: 'How to start a nail business in 2026',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  featured: true,
  toc: [
    { id: 'training', label: 'Step 1: Training and qualifications' },
    { id: 'legal', label: 'Step 2: Legal and insurance' },
    { id: 'setup', label: 'Step 3: Equipment and setup' },
    { id: 'pricing', label: 'Step 4: Pricing your services' },
    { id: 'booking', label: 'Step 5: Booking and admin' },
    { id: 'marketing', label: 'Step 6: Instagram and marketing' },
    { id: 'first-clients', label: 'Step 7: Getting your first clients' },
  ],
  relatedSlugs: ['nail-tech-beginner-business-checklist', 'nail-tech-starter-kit', 'how-to-get-first-10-nail-clients', 'best-booking-apps-for-nail-techs-2026'],
  faq: [
    { q: 'How much does it cost to start a nail business?', a: 'A basic home nail setup costs £500–£1,500: essential tools, products, lamp, table, and insurance. A more comprehensive starter kit with a full product range and professional equipment runs £1,500–£3,000. You don\'t need to spend everything upfront — start with essentials and build your kit as income grows.' },
    { q: 'Do I need qualifications to do nails in the UK?', a: 'The UK doesn\'t legally require a specific nail tech qualification to practise, but qualifications from accredited training providers (VTCT, ITEC, or brand-specific courses) are strongly recommended. Insurance providers require evidence of training, and clients increasingly ask about qualifications.' },
    { q: 'How long does it take to be ready to take nail clients?', a: 'Most nail tech courses take 2–6 weeks for the core qualification, followed by practice on models. Realistically, expect 2–3 months from starting training to being confident enough to charge for your first services. Some nail techs move faster, some take longer — the key is consistent practice.' },
  ],
  relatedFeatureSlugs: ['bookings', 'crm', 'analytics'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <p className="text-gray-700 leading-relaxed text-lg">Starting a nail business is one of the more accessible ways to build a self-employed creative career — but "accessible" doesn't mean easy. The nail techs who build sustainable, fully-booked businesses do it by setting up properly from the start: qualifications, insurance, the right equipment, a booking system, and a clear marketing approach.</p>

      <section id="training">
        <h2 className="font-serif text-2xl font-bold mb-4">Step 1: Training and qualifications</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Training is the foundation. Even if you have natural talent, technical knowledge of nail anatomy, product chemistry, and application technique protects your clients and your reputation.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">Core qualification routes in the UK:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>VTCT or ITEC Level 3 in Nail Technology</strong> — the industry standard, widely accepted by insurers</li>
          <li><strong>Brand-specific courses</strong> (e.g. BIAB, CND, OPI) — product training with a certification; often taken after a core qualification</li>
          <li><strong>Short courses and masterclasses</strong> — nail art, extensions, specific techniques; supplement rather than replace a core qualification</li>
        </ul>
        <ArticleTip>Choose a training provider that offers practical time on real models, not just theory. Nail tech skill is developed through repetition — the more real-hand practice you get during training, the faster you progress.</ArticleTip>
      </section>

      <section id="legal">
        <h2 className="font-serif text-2xl font-bold mb-4">Step 2: Legal and insurance</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Before taking a single paying client:</p>
        <ArticleChecklist title="Legal essentials" items={[
          'Treatment liability insurance (covers adverse reactions to products)',
          'Public liability insurance (covers injuries in your work space)',
          'Register as self-employed with HMRC (do this before earning)',
          'Open a separate business bank account (helpful for tax)',
          'GDPR: basic client data policy if you store names and contact details',
        ]} />
        <p className="text-gray-700 mt-4 leading-relaxed">Insurance is available from providers like PolicyBee and Salon Gold, typically under £150/year for a home nail tech. Don't skip it — a single adverse reaction claim without insurance could be financially devastating.</p>
      </section>

      <section id="setup">
        <h2 className="font-serif text-2xl font-bold mb-4">Step 3: Equipment and setup</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">You don't need a professional salon setup to start, but you need the right tools for safe, professional results. See the complete list: <Link to="/learn/nail-tech-starter-kit" className="underline text-[#F52B8C]">nail tech starter kit — what you actually need</Link>.</p>
        <p className="text-gray-700 leading-relaxed">For home setups: good lighting (a ring light or dedicated nail lamp), a stable table at the right height, adequate ventilation, and a clean professional environment are more important than expensive furniture.</p>
      </section>

      <section id="pricing">
        <h2 className="font-serif text-2xl font-bold mb-4">Step 4: Pricing your services</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Price based on what you need to earn, not just what others charge. Before setting prices, calculate your monthly costs, target income, and working hours to arrive at a minimum hourly rate. Then set service prices above that floor.</p>
        <p className="text-gray-700 leading-relaxed">New nail techs often start 20–30% below their target price as they build confidence and clientele, with a plan to raise prices at a specific milestone. See: <Link to="/learn/how-much-should-nail-tech-charge" className="underline text-[#F52B8C]">how much should a nail tech charge?</Link></p>
      </section>

      <section id="booking">
        <h2 className="font-serif text-2xl font-bold mb-4">Step 5: Booking and admin</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Set up your booking system before you announce your first availability. A booking page with deposit collection, automatic reminders, and a shareable link saves hours of admin per week and dramatically reduces no-shows.</p>
        <ArticleCallout variant="info" title="Set up booking before marketing">
          It's tempting to start posting on Instagram before your booking system is ready. Don't. If someone finds you and wants to book but there's no clear way to do it, you lose them. Set up booking first.
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">See: <Link to="/learn/best-booking-apps-for-nail-techs-2026" className="underline text-[#F52B8C]">best booking apps for nail techs in 2026</Link>.</p>
      </section>

      <section id="marketing">
        <h2 className="font-serif text-2xl font-bold mb-4">Step 6: Instagram and marketing</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Instagram is the primary marketing channel for most nail techs. A dedicated nail account with your location in the name field, regular portfolio posts, and a booking link in your bio is the foundation.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">You don't need a big following to get clients. You need a clear, professional profile that tells local visitors who you are and how to book. See: <Link to="/learn/how-to-get-nail-clients-from-instagram" className="underline text-[#F52B8C]">how to get nail clients from Instagram</Link>.</p>
      </section>

      <section id="first-clients">
        <h2 className="font-serif text-2xl font-bold mb-4">Step 7: Getting your first clients</h2>
        <ArticleSteps steps={[
          { title: 'Do model sets to build your portfolio', body: 'Friends, family, and local Facebook groups for nail models. Free or cost-price. Get high-quality photos of each set.' },
          { title: 'Post your portfolio on Instagram with location tags', body: 'Tag your city and area on every post. Mention your location in captions. Use location-based hashtags.' },
          { title: 'Ask models to post and refer', body: 'After every model set: "Would you mind posting and tagging me? And if anyone asks where you got your nails done..."' },
          { title: 'Post your booking link and announce availability', body: '"I\'m now taking bookings — link in bio." Simple, direct, no over-explanation.' },
          { title: 'Ask for referrals from first paying clients', body: '"I\'m building my client base — if you know anyone looking for a nail tech I\'d love a referral."' },
        ]} />
        <p className="text-gray-700 mt-4 leading-relaxed">Full guide: <Link to="/learn/how-to-get-first-10-nail-clients" className="underline text-[#F52B8C]">how to get your first 10 nail clients</Link>.</p>
      </section>
    </div>
  ),
});
export {};
