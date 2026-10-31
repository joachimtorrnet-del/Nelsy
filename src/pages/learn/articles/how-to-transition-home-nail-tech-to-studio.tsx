import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-transition-home-nail-tech-to-studio',
  title: 'How to Transition From Home Nail Tech to Your Own Studio',
  seoTitle: 'How to Transition From Home Nail Tech to a Studio',
  excerpt: 'Moving from your home setup to a rented studio is one of the biggest steps in a nail tech\'s career. Here\'s how to do it without losing clients or hitting a cash flow crisis.',
  seoDescription: 'How to transition from home nail tech to a studio. Plan the move, communicate with clients, manage the finances, and set up your new nail studio space.',
  category: 'start-your-business',
  tags: ['home nail tech to studio transition', 'nail tech move to studio', 'nail studio setup transition'],
  heroImage: 'linear-gradient(135deg, #FDF4FF 0%, #F3E8FF 100%)',
  heroImageAlt: 'How to transition from home nail tech to a studio',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'before-signing', label: 'Before you sign anything' },
    { id: 'overlap-period', label: 'The overlap period' },
    { id: 'communicating-clients', label: 'Communicating the move to clients' },
    { id: 'setting-up', label: 'Setting up your studio space' },
    { id: 'after-move', label: 'After the move' },
  ],
  relatedSlugs: ['when-to-get-your-own-nail-studio', 'home-based-nail-tech-vs-salon-suite', 'nail-tech-client-follow-up-templates', 'nail-tech-expense-list'],
  faq: [
    { q: 'Will I lose clients when I move from home to a studio?', a: 'Some clients may not follow you, especially if the studio is further from them. Plan for a small drop (5–15% is normal) and factor that into your financial projections. Most established clients who love your work will follow. The move often attracts new clients who previously wouldn\'t come to a home setting.' },
    { q: 'How far in advance should I tell clients about the move?', a: 'Tell existing clients 4–6 weeks before the move date. This gives them time to have a last home appointment if they want, and adjust their travel expectations. Don\'t tell them too far in advance — you risk them booking elsewhere in the interim.' },
  ],
  relatedFeatureSlugs: ['bookings', 'crm', 'analytics'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="before-signing">
        <h2 className="font-serif text-2xl font-bold mb-4">Before you sign anything</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Confirm your monthly income for the last 6 months — is it consistent enough to absorb the rent?</li>
          <li>Calculate your break-even: how many appointments per week do you need just to cover rent?</li>
          <li>Visit the space in person — check ventilation, parking, lighting, and whether it feels right</li>
          <li>Read the lease carefully — understand notice period, what's included, and any restrictions</li>
          <li>Confirm what setup costs you'll have (painting, fitting, equipment)</li>
          <li>Ensure you have savings for the deposit, first month's rent, and setup costs before signing</li>
        </ul>
        <ArticleCallout variant="warning" title="Never sign a studio lease in a rush">
          Studio transitions that go wrong are usually the result of signing too quickly — before checking finances, visiting the space properly, or reading the lease. Take your time.
        </ArticleCallout>
      </section>

      <section id="overlap-period">
        <h2 className="font-serif text-2xl font-bold mb-4">The overlap period</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If possible, overlap your home setup and new studio for at least 2–4 weeks. This means:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Setting up the studio before your last home appointment</li>
          <li>Taking new bookings at the studio while finishing existing home appointments</li>
          <li>Testing your new setup with a small number of appointments before you're fully transitioned</li>
          <li>Being able to go back to home appointments temporarily if the studio has issues</li>
        </ul>
      </section>

      <section id="communicating-clients">
        <h2 className="font-serif text-2xl font-bold mb-4">Communicating the move to clients</h2>
        <ArticleTable
          headers={['Channel', 'What to say']}
          rows={[
            ['Direct message to existing clients', '"Exciting news — I\'m moving to my own studio in [area] from [date]. New address: [address]. I\'d love to see you there!"'],
            ['Instagram post', '"BIG news — I\'m getting my own studio! 🎉 From [date], all appointments will be at [location]. Link in bio to book."'],
            ['Instagram Story', 'Behind-the-scenes of the setup process — creates excitement'],
            ['Booking page update', 'Update address in your booking system before the move date'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">Message templates: <Link to="/learn/nail-tech-client-follow-up-templates" className="underline text-[#F52B8C]">nail tech client follow-up templates</Link>.</p>
      </section>

      <section id="setting-up">
        <h2 className="font-serif text-2xl font-bold mb-4">Setting up your studio space</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Ventilation:</strong> If the space doesn't have ventilation, fit an extractor fan before your first client</li>
          <li><strong>Lighting:</strong> Good lighting is non-negotiable — natural light plus a strong overhead or ring light</li>
          <li><strong>Client chair and nail desk:</strong> Set up for your working height to avoid back strain</li>
          <li><strong>Storage:</strong> Organised, accessible product storage reduces time between clients</li>
          <li><strong>Content setup:</strong> Create a spot with a neutral or branded backdrop for nail photography</li>
          <li><strong>Wi-Fi and payment:</strong> Test both before your first client</li>
        </ul>
      </section>

      <section id="after-move">
        <h2 className="font-serif text-2xl font-bold mb-4">After the move</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Update your Instagram bio, booking page, and Google Business profile with the new address immediately</li>
          <li>Post your studio reveal on Instagram — it's a milestone worth celebrating and drives bookings</li>
          <li>Ask your first few studio clients for their thoughts — early feedback helps you refine the setup</li>
          <li>Track your income vs. rent for the first 3 months to confirm the move is financially working</li>
          <li>If your old clients who didn't follow up haven't booked in 6–8 weeks, send a gentle check-in</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
