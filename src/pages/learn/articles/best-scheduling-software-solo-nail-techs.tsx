import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleSteps } from '@/components/article/ArticleBodyComponents';

const link = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'best-scheduling-software-solo-nail-techs',
  title: 'Best Scheduling Software for Solo Nail Techs',
  coverTitle: 'Scheduling Apps for Solo Techs',
  seoTitle: "Best Scheduling Software for Solo Nail Techs (2026)",
  excerpt: 'The right scheduling software can save hours every week and make your business easier to run. Here\'s what matters when choosing, and how different tools approach the problem.',
  seoDescription: 'Best scheduling software for solo nail techs. Which features matter, how to compare booking platforms and how to choose the right tool.',
  category: 'comparisons',
  audience: ['pros'],
  craft: 'nails',
  tags: ['scheduling software nail tech', 'nail tech booking app', 'best booking system nail', 'solo nail tech software'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #A7F3D0 100%)',
  heroImageAlt: 'Best scheduling software for solo nail techs',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  updatedAt: '2026-11-26',
  publishedAt: '2026-10-21',
  tldr: {
    answer: 'The best scheduling software for a solo nail tech is the one that takes bookings and deposits on its own, sends reminders, and costs the least at your real monthly volume once card fees are included.',
    detail: 'Solo techs don\'t need staff rotas or multi-location reports. Compare apps on four things: deposits, reminders, the client booking flow on a phone, and total monthly cost (subscription + card fees + any new-client fees).',
    points: [
      { label: 'Must have', text: 'Live availability, automatic deposits, reminders, client notes, a fast mobile booking flow.' },
      { label: 'Compare cost', text: 'Subscription + (card payments × fee) + marketplace fees, worked out below.' },
      { label: 'Test it', text: 'Book yourself a test appointment on your phone during the free trial.' },
    ],
  },
  toc: [
    { id: 'what-you-actually-need', label: 'What solo nail techs actually need' },
    { id: 'must-have-features', label: 'Must-have features' },
    { id: 'nice-to-have', label: 'Nice-to-have features' },
    { id: 'platform-types', label: 'Types of platforms to consider' },
    { id: 'real-cost', label: 'Work out the real monthly cost' },
    { id: 'how-to-evaluate', label: 'How to evaluate before committing' },
    { id: 'red-flags', label: 'Red flags to watch for' },
  ],
  relatedSlugs: ['fresha-vs-booksy-for-nail-techs', 'glossgenius-vs-fresha-for-nail-techs', 'how-to-get-booked-out-as-nail-tech', 'nail-tech-booking-policy-template'],
  faq: [
    { q: 'Do I need scheduling software, or can I take bookings by DM?', a: 'You can start with DMs, but they don\'t collect deposits, they can be forgotten or double-booked, they keep no client history, and they need you to reply at all hours. Scheduling software confirms bookings, takes deposits, sends reminders and stores client notes automatically. Example: if each DM booking takes 10 minutes of back-and-forth and you take 60 bookings a month, that is 600 minutes, or 10 hours a month.' },
    { q: 'How much should scheduling software cost a solo nail tech?', a: 'Published 2026 prices: Fresha Independent €14.95/month, Booksy US $29.99/month (UK £40), GlossGenius Standard $24/month billed annually or $28 monthly. On top of that you pay card processing and, on marketplaces, fees on new clients. Work out the total at your own volume using the formula in this article.' },
    { q: 'Can I try scheduling software before committing?', a: 'Yes. Fresha offers a 7-day trial, Booksy 14 days in the US and 7 days in the UK, and GlossGenius 14 days. Use the trial to book a test appointment yourself on your phone and to take a test deposit. How booking feels to your clients matters more than how the dashboard looks to you.' },
    { q: 'Is Fresha still free?', a: 'No. Fresha\'s pricing page lists the Independent plan at €14.95/month and the Team plan at €9.95 per team member per month, after a 7-day trial.' },
  ],
  relatedFeatureSlugs: ['bookings', 'deposits', 'crm'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-you-actually-need">
        <h2 className="font-serif text-2xl font-bold mb-4">What solo nail techs actually need</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Solo nail techs have different needs from salons. You don&apos;t need staff scheduling, complex inventory or multi-location reporting. You need a system that:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Shows your real-time availability and takes bookings while you are working</li>
          <li>Collects deposits automatically, before the appointment</li>
          <li>Sends reminders to reduce no-shows</li>
          <li>Stores client history so you remember what they had last time</li>
          <li>Makes booking quick for your clients on a phone, so they actually use it</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Everything beyond this is optional.</p>
      </section>

      <section id="must-have-features">
        <h2 className="font-serif text-2xl font-bold mb-4">Must-have features</h2>
        <ArticleTable
          headers={['Feature', 'Why it matters for nail techs']}
          rows={[
            ['Online booking with real-time availability', 'Clients book without messaging you, and you don\'t get double-booked'],
            ['Deposit collection', 'The main tool for reducing no-shows. Without it, you carry all the risk'],
            ['Automated reminders', 'Clients forget less, and you don\'t have to text everyone by hand'],
            ['Cancellation policy at booking', 'Clients see and accept your policy before they confirm, so a kept deposit is not a surprise'],
            ['Client profiles', 'Name, history and notes (shape, preferences, sensitivities) so you don\'t re-consult every visit'],
            ['Mobile-friendly booking page', 'Clients coming from Instagram or TikTok book on their phone'],
          ]}
        />
      </section>

      <section id="nice-to-have">
        <h2 className="font-serif text-2xl font-bold mb-4">Nice-to-have features</h2>
        <ArticleTable
          headers={['Feature', 'When it\'s useful']}
          rows={[
            ['Marketplace / discovery listing', 'If clients in your city search on that platform\'s app'],
            ['Follow-up messages', 'Automatic post-appointment messages asking for a review or a rebooking'],
            ['Waitlist', 'If you regularly fill up and want to refill cancellations fast'],
            ['Instagram booking button', 'A direct link from your profile to book'],
            ['Branded booking page', 'Your colours, photos and name rather than a generic template'],
            ['Reporting', 'Revenue, busiest days and popular services, once you are established'],
          ]}
        />
      </section>

      <section id="platform-types">
        <h2 className="font-serif text-2xl font-bold mb-4">Types of platforms to consider</h2>
        <ArticleTable
          headers={['Platform type', 'Examples', 'Best for']}
          rows={[
            ['Marketplace + booking software', 'Fresha, Booksy', 'Nail techs who want a discovery channel alongside booking, and accept fees on marketplace clients'],
            ['Beauty booking software without a marketplace focus', 'GlossGenius', 'Nail techs who find clients themselves and want a polished booking site'],
            ['Link-in-bio booking page', 'Nelsy ($29/month or $25/month yearly, takes 0% commission on bookings)', 'Nail techs whose clients come from Instagram and TikTok, with deposits or full payment set per service'],
            ['Generic scheduling tools', 'General calendar booking apps', 'Basic scheduling; check deposits and cancellation rules carefully before using one for nails'],
          ]}
        />
        <ArticleTip>A marketplace is only valuable if clients in your area actually use it. A simple solo tool is only valuable if it handles deposits and reminders reliably. Match the tool to where your clients come from.</ArticleTip>
      </section>

      <section id="real-cost">
        <h2 className="font-serif text-2xl font-bold mb-4">Work out the real monthly cost</h2>
        <ArticleCallout variant="info" title="Formula">
          Monthly cost = subscription + (card payments × (fee % × price + fixed fee)) + any fees on new marketplace clients
        </ArticleCallout>
        <p className="text-gray-700 mb-4 leading-relaxed">Example: 60 appointments a month at 60 (dollars or euros), all paid by card in person, no marketplace clients. Published rates checked November 2026:</p>
        <ArticleTable
          headers={['App', 'Subscription', 'Card fee per $60/€60 payment', 'Card fees × 60', 'Total']}
          rows={[
            ['Booksy (US, card reader)', '$29.99', '2.49% × 60 + $0.10 = $1.59', '$95.64', 'about $125.63'],
            ['GlossGenius Standard (monthly)', '$28', '2.4% × 60 + $0.15 = $1.59', '$95.40', 'about $123.40'],
            ['Fresha Independent', '€14.95', '0.59% × 60 + €0.15 = €0.50', '€30.24', 'about €45.19'],
          ]}
          caption="Exact per-payment fees: Booksy $1.594, GlossGenius $1.59, Fresha €0.504."
        />
        <p className="text-gray-700 mb-4 leading-relaxed">Change one input and the ranking can change. If clients pay online instead, Booksy mobile payments are 2.69% + $0.30, GlossGenius online is 3.4% + $0.15 and Fresha online is 1.29% + €0.15. Marketplace clients add more: Booksy Boost takes 30% of the first visit (up to $100), and Fresha charges a one-time fee on new marketplace clients whose rate is not published on its pricing page.</p>
        <ArticleTip>Payments clients make in cash at the studio carry no card fee in any app. If most of your clients pay cash, the subscription is the cost that matters most.</ArticleTip>
      </section>

      <section id="how-to-evaluate">
        <h2 className="font-serif text-2xl font-bold mb-4">How to evaluate before committing</h2>
        <ArticleSteps
          steps={[
            { title: 'Book a test appointment on yourself', body: 'On your phone, from an Instagram-style link. Count the taps from link to confirmed booking.' },
            { title: 'Take a test deposit', body: 'Check the client sees the amount and your policy before paying, and that you can refund it.' },
            { title: 'Run the cost formula', body: 'Use your real monthly appointments, average price and how clients pay.' },
            { title: 'Check reminders and cancellations', body: 'Cancel your test booking inside and outside your notice window and see what happens to the deposit.' },
            { title: 'Check data export', body: 'Make sure you can export your client list if you ever switch.' },
          ]}
        />
      </section>

      <section id="red-flags">
        <h2 className="font-serif text-2xl font-bold mb-4">Red flags to watch for</h2>
        <ArticleCallout variant="warning" title="Watch out for">
          <ul className="list-disc list-inside space-y-1">
            <li>No deposit or cancellation fee support: you carry all the no-show risk</li>
            <li>A client booking flow that is awkward on a phone</li>
            <li>No client history or notes</li>
            <li>Fees you can&apos;t calculate in advance at your volume</li>
            <li>No way to export your client list</li>
          </ul>
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">Platform-specific comparisons: <Link to="/blog/fresha-vs-booksy-for-nail-techs" className={link}>Fresha vs Booksy</Link> and <Link to="/blog/glossgenius-vs-fresha-for-nail-techs" className={link}>GlossGenius vs Fresha</Link>. Our full ranking is in <Link to="/best-booking-app-for-nail-techs" className={link}>the best booking apps for nail techs</Link>.</p>
      </section>
    </div>
  ),
});
export {};
