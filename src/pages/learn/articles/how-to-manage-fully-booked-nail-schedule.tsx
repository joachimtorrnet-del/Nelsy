import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-manage-fully-booked-nail-schedule',
  title: 'How to Manage a Fully Booked Nail Schedule',
  seoTitle: 'How to Manage a Fully Booked Nail Schedule (Without Burning Out)',
  excerpt: 'Being fully booked sounds like the goal — but managing a packed schedule without burning out is a skill. Here\'s how to do it sustainably.',
  seoDescription: 'How to manage a fully booked nail schedule without burning out. Time blocks, cancellation management, waitlists, pricing up, and protecting your physical health.',
  category: 'start-your-business',
  tags: ['fully booked nail tech schedule', 'manage nail tech schedule', 'nail tech fully booked burnout'],
  heroImage: 'linear-gradient(135deg, #FFF7ED 0%, #FED7AA 100%)',
  heroImageAlt: 'How to manage a fully booked nail schedule',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'daily-structure', label: 'Daily schedule structure' },
    { id: 'cancellations', label: 'Managing cancellations and no-shows' },
    { id: 'pricing-up', label: 'Raising prices when fully booked' },
    { id: 'physical-health', label: 'Protecting your physical health' },
    { id: 'waitlist-system', label: 'Running a waitlist system' },
  ],
  relatedSlugs: ['holiday-booking-strategy-nail-techs', 'how-to-handle-christmas-nail-rush', 'nail-tech-no-show-message-templates', 'nail-tech-waitlist-message-templates'],
  faq: [
    { q: 'I\'m fully booked but still not earning enough — what\'s going on?', a: 'If you\'re fully booked but your income doesn\'t reflect it, the issue is usually pricing. Being fully booked is the clearest sign that your prices are too low — there\'s more demand than your current pricing reflects. A price increase is the next logical step, not working more hours.' },
    { q: 'How many clients per day is too many?', a: 'This depends on the services you offer. Most nail techs working full days with complex services (extensions, full nail art) manage 3–5 clients per day sustainably. Simpler services (gel polish maintenance) allow more. Only you know what leaves you energised vs. depleted — track it for a week and decide.' },
  ],
  relatedFeatureSlugs: ['bookings', 'crm'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="daily-structure">
        <h2 className="font-serif text-2xl font-bold mb-4">Daily schedule structure</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Buffer time between appointments:</strong> Never remove buffers when fully booked — one overrun cascades through the whole day</li>
          <li><strong>Set a hard start and finish time:</strong> Don't let "just one more" push your day past your limit</li>
          <li><strong>Lunch:</strong> Build in at least 30 minutes you actually take — not admin time</li>
          <li><strong>End-of-day admin block:</strong> One short block for messages, bookings, and social media — not scattered throughout the day</li>
          <li><strong>One non-working day per week minimum:</strong> Full days off are not optional when you're busy</li>
        </ul>
        <ArticleCallout variant="info" title="Fully booked doesn't mean fully available">
          Being fully booked is the right time to protect your schedule more strictly, not to squeeze more in. The risk of burnout is highest when demand is highest.
        </ArticleCallout>
      </section>

      <section id="cancellations">
        <h2 className="font-serif text-2xl font-bold mb-4">Managing cancellations and no-shows</h2>
        <ArticleTable
          headers={['Situation', 'Best response']}
          rows={[
            ['Cancellation within policy', 'Refund deposit; offer slot to waitlist immediately'],
            ['Late cancellation', 'Retain deposit; offer slot to waitlist; don\'t rebook on the same day if you need the break'],
            ['No-show', 'Retain deposit; contact client same day; add slot to waitlist'],
            ['Repeat canceller', 'Require full prepayment for future bookings or decline to rebook'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">Message templates: <Link to="/learn/nail-tech-no-show-message-templates" className="underline text-[#F52B8C]">no-show message templates</Link>.</p>
      </section>

      <section id="pricing-up">
        <h2 className="font-serif text-2xl font-bold mb-4">Raising prices when fully booked</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Being consistently fully booked is the clearest signal to raise your prices. You're providing more value than your current pricing reflects, and demand is outstripping supply.</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>A price increase when you're fully booked is well-timed — clients are clearly committed</li>
          <li>Expect to lose some clients — that's fine; you want the schedule to be slightly less than fully booked at the new price so you're not constantly overextended</li>
          <li>The goal is to earn the same or more from fewer appointments — not to work more hours</li>
        </ul>
        <ArticleTip>If you raise prices and remain fully booked, raise them again. Your prices are right when you're comfortably booked — not when you're turning away three clients for every one you take.</ArticleTip>
      </section>

      <section id="physical-health">
        <h2 className="font-serif text-2xl font-bold mb-4">Protecting your physical health</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Posture:</strong> Invest in a proper nail tech chair and desk at the right height — back problems end careers</li>
          <li><strong>Hand and wrist:</strong> Stretch between clients; consider wrist support during complex art sessions</li>
          <li><strong>Eyes:</strong> LED light exposure — use UV protection goggles for cure-heavy services</li>
          <li><strong>Lungs:</strong> Ventilation is non-negotiable; a proper extractor fan is an investment in your health</li>
          <li><strong>Rest:</strong> Physical recovery time isn't laziness — it's what allows you to keep working</li>
        </ul>
      </section>

      <section id="waitlist-system">
        <h2 className="font-serif text-2xl font-bold mb-4">Running a waitlist system</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">When fully booked, a waitlist fills cancellation slots quickly and means you're never losing income to a gap:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Keep a simple note or spreadsheet: name, contact, service, preferred timing</li>
          <li>First in, first offered — consistent and fair</li>
          <li>Give waitlist clients a time window to respond before moving to the next person</li>
          <li>Post cancellation slots on your Instagram Story as well — this creates urgency and often fills gaps within the hour</li>
        </ul>
        <p className="text-gray-700 mt-4 leading-relaxed">Waitlist message templates: <Link to="/learn/nail-tech-waitlist-message-templates" className="underline text-[#F52B8C]">nail tech waitlist message templates</Link>.</p>
      </section>
    </div>
  ),
});
export {};
