import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'when-to-get-your-own-nail-studio',
  title: 'When Should You Get Your Own Nail Studio?',
  seoTitle: 'When Should You Get Your Own Nail Studio? (The Honest Answer)',
  excerpt: 'Getting your own studio is a dream for many nail techs — but timing it wrong can cost you. Here\'s how to know when you\'re actually ready.',
  seoDescription: 'When should you get your own nail studio? Signs you\'re ready, the financial checklist, what to look for, and what nail techs get wrong about studio timing.',
  category: 'start-your-business',
  tags: ['when to get nail studio', 'own nail studio signs ready', 'nail tech own studio'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #BBF7D0 100%)',
  heroImageAlt: 'When to get your own nail studio',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'signs-ready', label: 'Signs you might be ready' },
    { id: 'signs-not-ready', label: 'Signs you\'re not ready yet' },
    { id: 'financial-checklist', label: 'Financial readiness checklist' },
    { id: 'what-to-look-for', label: 'What to look for in a studio space' },
    { id: 'common-mistakes', label: 'Common mistakes when taking a studio' },
  ],
  relatedSlugs: ['how-to-transition-home-nail-tech-to-studio', 'home-based-nail-tech-vs-salon-suite', 'independent-nail-tech-vs-nail-salon', 'nail-tech-expense-list'],
  faq: [
    { q: 'How much should I be earning before getting a studio?', a: 'A common rule: your rental income should cover at least 3–4x your studio rent. So if rent is £500/month, your nail income should reliably be at least £1,500–£2,000/month before rent to absorb the new cost comfortably. This allows for quiet months, supply costs, and tax without the studio making you financially stretched.' },
    { q: 'Should I sign a long lease for a nail studio?', a: 'Be cautious with long leases — a 12-month lease is a serious financial commitment. If possible, start with a short lease (3–6 months) or a rolling monthly arrangement to test whether the space and location work for you before committing long-term. Many salon suite providers offer flexible terms specifically for independent beauty professionals.' },
  ],
  relatedFeatureSlugs: ['bookings', 'crm', 'analytics'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="signs-ready">
        <h2 className="font-serif text-2xl font-bold mb-4">Signs you might be ready</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Consistently fully booked</strong> — you regularly turn clients away because you have no availability</li>
          <li><strong>Your income exceeds your personal needs</strong> — you're earning beyond what you need and could absorb a new fixed cost</li>
          <li><strong>You've been fully booked for 3+ months</strong> — it's not a fluke; demand is reliably there</li>
          <li><strong>Clients are asking for a "proper" address</strong> — working from home is starting to limit your client reach</li>
          <li><strong>You feel limited by your current setup</strong> — space, privacy, professional feel, or equipment</li>
          <li><strong>You have savings to cover 3–6 months of rent</strong> — for the quiet months or unexpected slow periods</li>
        </ul>
      </section>

      <section id="signs-not-ready">
        <h2 className="font-serif text-2xl font-bold mb-4">Signs you're not ready yet</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>You're not consistently fully booked at your current setup</li>
          <li>Your income is variable month-to-month and you couldn't absorb a bad month plus rent</li>
          <li>You're thinking about a studio because it "feels like the next step" or because others are doing it — not because your client base is demanding it</li>
          <li>You have no savings buffer</li>
          <li>You haven't done the financial calculation on whether you can cover rent</li>
        </ul>
        <ArticleCallout variant="warning" title="A studio doesn't generate clients — your marketing does">
          Getting a studio won't bring you more clients automatically. You still need to market, post on Instagram, and drive your own bookings. Taking a studio before your marketing is working adds rent pressure without solving the underlying issue.
        </ArticleCallout>
      </section>

      <section id="financial-checklist">
        <h2 className="font-serif text-2xl font-bold mb-4">Financial readiness checklist</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Your average monthly nail income (last 6 months) covers rent at 3–4x</li>
          <li>You have 3–6 months of rent in savings as a buffer</li>
          <li>You've calculated the full cost: rent + extra travel + additional supplies + any lease deposits</li>
          <li>You've modelled what a quiet month looks like with the extra rent burden</li>
          <li>You understand the tax implications of the additional business expense</li>
        </ul>
        <ArticleTip>Run the numbers for 3 scenarios: a strong month, your average month, and a quiet month. Can you cover rent in all three? If the quiet month scenario is unmanageable, you're not financially ready.</ArticleTip>
      </section>

      <section id="what-to-look-for">
        <h2 className="font-serif text-2xl font-bold mb-4">What to look for in a studio space</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Ventilation:</strong> Essential for nail work — check if the space has good airflow or can have an extractor fitted</li>
          <li><strong>Accessibility:</strong> Client parking, public transport links, ground floor or lift access</li>
          <li><strong>Flexibility of terms:</strong> Avoid long leases until you've tested the space</li>
          <li><strong>Included utilities:</strong> Confirm what's included in the rent (electricity, Wi-Fi, cleaning)</li>
          <li><strong>Condition of the space:</strong> Budget for any setup, decoration, or equipment needed</li>
          <li><strong>Location relative to your existing client base:</strong> Moving to a new area may require rebuilding your client base</li>
        </ul>
      </section>

      <section id="common-mistakes">
        <h2 className="font-serif text-2xl font-bold mb-4">Common mistakes when taking a studio</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Signing a long lease before testing the space and location</li>
          <li>Taking the studio before having a financial buffer</li>
          <li>Underestimating setup costs (decorating, equipment, signage)</li>
          <li>Choosing a location that doesn't suit your clients</li>
          <li>Expecting the studio to drive new clients — you still need to market</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">For the transition process: <Link to="/learn/how-to-transition-home-nail-tech-to-studio" className="underline text-[#F52B8C]">how to transition from home nail tech to a studio</Link>.</p>
      </section>
    </div>
  ),
});
export {};
