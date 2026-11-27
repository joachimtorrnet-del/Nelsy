import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

const link = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'nail-tech-booking-software-features',
  title: 'Best Booking Software for Nail Techs: What to Look For',
  coverTitle: 'Booking Software Must-Haves',
  seoTitle: "Nail Tech Booking Software: Which Features Actually Matter",
  excerpt: 'Before you sign up for any booking platform, know which features actually matter for a nail business, and which ones you can safely ignore.',
  seoDescription: 'What features should nail tech booking software have? A practical checklist covering deposits, service menus, reminders, payments, and what to avoid.',
  category: 'booking-software',
  audience: ['pros'],
  craft: 'nails',
  tags: ['booking software', 'booking features', 'nail tech tools', 'deposits', 'reminders'],
  heroImage: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
  heroImageAlt: 'Nail tech booking software features guide',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  updatedAt: '2026-11-26',
  publishedAt: '2026-10-20',
  tldr: {
    answer: 'Nail tech booking software must collect deposits automatically at booking, handle add-ons like nail art, send reminders, and give you a short link that works in your Instagram bio without an app download.',
    detail: 'Staff rotas, inventory and payroll matter for salons, not solo techs. Score each app on the checklist below during its free trial and pick the one that handles your real service menu without workarounds.',
    points: [
      { label: 'Non-negotiable', text: 'Automatic deposits, add-ons, confirmations and 24-hour reminders.' },
      { label: 'Important', text: 'Client notes, a mobile booking page, and a clear fee structure.' },
      { label: 'Red flag', text: 'Commission on clients you brought yourself, or an app download to book.' },
    ],
  },
  toc: [
    { id: 'must-have', label: 'Must-have features' },
    { id: 'deposits', label: 'Deposits: non-negotiable' },
    { id: 'service-menu', label: 'Service menu flexibility' },
    { id: 'reminders', label: 'Automatic reminders' },
    { id: 'booking-link', label: 'A shareable booking link' },
    { id: 'nice-to-have', label: 'Nice-to-have features' },
    { id: 'red-flags', label: 'Red flags to avoid' },
    { id: 'scorecard', label: 'Score apps during the free trial' },
    { id: 'useful-resources', label: 'Useful resources' },
  ],
  relatedSlugs: ['how-to-choose-booking-app-nail-business', 'why-booking-through-dms-costs-nail-techs-clients'],
  faq: [
    { q: 'Does nail tech booking software need to handle nail art pricing?', a: 'Yes. Nail art is usually an add-on to a base service, so look for add-ons or extras with their own price and extra time. Example: "Gel full set, £45, 90 min" plus "Nail art, +£10, +20 min". Without add-ons you end up undercharging for art or listing dozens of confusing combined services.' },
    { q: 'Should my booking software integrate with Instagram?', a: 'At minimum it should give you a short booking link that works in your Instagram bio and in DMs, without the client downloading an app. A "Book" button on your profile is a bonus, not a must.' },
    { q: 'What payment features should nail tech booking software have?', a: 'Check four things: deposits or full payment collected at booking, refunds you can trigger yourself, a way to record cash or card paid at the studio so your records stay complete, and published processing fees. Example of published fees: Fresha online payments are 1.29% + €0.15, Booksy US mobile payments 2.69% + $0.30, and GlossGenius online payments 3.4% + $0.15.' },
    { q: 'Can I set different payment rules for different services?', a: 'Look for this. A quick gel polish change might be pay on arrival, a full set might need a deposit, and a long nail art appointment might need full payment upfront. Per-service rules let you protect your longest slots without putting off clients booking small services.' },
  ],
  relatedFeatureSlugs: ['bookings', 'deposits', 'payments'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="must-have">
        <h2 className="font-serif text-2xl font-bold mb-4">The must-have features for nail tech booking software</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Nail techs need different things from hair salons, spas or general service businesses: a detailed service menu with add-ons, deposits on most bookings, and a booking page that looks as polished as your work.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">Many platforms are packed with features a solo nail tech doesn&apos;t use (staff management, inventory, payroll) while being weak where it matters (nail art add-ons, flexible deposits).</p>
        <ArticleChecklist title="Non-negotiable features" items={[
          'Deposit collection at the point of booking (automatic, not manual)',
          'Service menu with customisable prices and durations',
          'Add-ons / extras for nail art pricing',
          'Automatic booking confirmation messages',
          'Automatic 24-hour reminder messages',
          'Real-time availability calendar',
          'Shareable booking link for Instagram bio',
          'Mobile-friendly client booking page',
          'Simple setup: no "team member" configuration needed to start',
        ]} />
      </section>

      <section id="deposits">
        <h2 className="font-serif text-2xl font-bold mb-4">Deposits: the single most important feature</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If you take one thing from this guide: choose a platform that collects deposits automatically, from the client, before the booking is confirmed. Not one that only notes &quot;deposit required&quot; and leaves you to chase a bank transfer.</p>
        <ArticleCallout variant="info" title="Example: what one no-show costs">
          Example: a 2-hour set at £60. Without a deposit, a no-show costs you the full £60 and a slot you probably can&apos;t refill at short notice. With a £20 deposit kept under your policy, the loss drops to £40. If you get 2 no-shows a month, that is 2 × £20 = £40 a month recovered, and in practice fewer people skip appointments they have paid towards.
        </ArticleCallout>
        <ArticleCallout variant="tip" title="What to check">
          Make a test booking as if you were a client. Is the deposit taken in that flow, before the booking is confirmed? Does the client see your policy before paying? Can you refund or keep the deposit in one tap?
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">For deposit amounts and policy wording: <Link to="/nail-tech-deposits" className={link}>how to take deposits as a nail tech</Link>.</p>
      </section>

      <section id="service-menu">
        <h2 className="font-serif text-2xl font-bold mb-4">Service menu flexibility</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Nail menus are more complex than most beauty menus. A good platform should handle:</p>
        <ArticleTable
          headers={['Service type', 'What the platform needs to support']}
          rows={[
            ['Base services', 'Named service + price + duration (e.g. "Gel full set, £45, 90 min")'],
            ['Nail art add-ons', 'Optional extras added to a base service (e.g. "+ Nail art, from £10, +20 min")'],
            ['Nail art by complexity', 'Tiered add-ons (simple / medium / complex) or a notes field with photo upload'],
            ['Maintenance vs new set', 'Separate services with different prices and durations'],
            ['Longer appointments', 'Durations of 2+ hours, with buffer time between clients'],
            ['Payment rule per service', 'Pay on arrival, deposit, or full payment upfront set service by service'],
          ]}
        />
        <ArticleTip>Write out your service menu before trying a platform, then rebuild it exactly in the trial. If you hit limits during setup, you will live with them every day.</ArticleTip>
      </section>

      <section id="reminders">
        <h2 className="font-serif text-2xl font-bold mb-4">Automatic reminders: a no-show reducer</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Reminders are one of the most useful features and one of the most often switched off. A good platform should send:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>An immediate confirmation with date, time, address and price</li>
          <li>A 48-hour reminder (useful for bookings made weeks ahead)</li>
          <li>A 24-hour reminder (the most important)</li>
        </ul>
        <ArticleCallout variant="info" title="Copy this 24-hour reminder">
          &quot;Hi [name], see you tomorrow at [time] for [service] at [address]. Please come with bare nails. Need to move it? Reschedule here: [link]. Changes with less than [48] hours&apos; notice mean the deposit is kept.&quot;
        </ArticleCallout>
        <p className="text-gray-700 leading-relaxed">Check that you can edit the wording. More examples: <Link to="/tools/nail-tech-appointment-reminder-templates" className={link}>free appointment reminder templates</Link>.</p>
      </section>

      <section id="booking-link">
        <h2 className="font-serif text-2xl font-bold mb-4">A shareable booking link for Instagram</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your booking link has to work in your Instagram bio and in DMs. Some platforms generate long URLs that look untrustworthy in a bio, or make clients download an app before they can book.</p>
        <ArticleChecklist title="What a good booking link looks like" items={[
          'Short and readable, with your name in it (for example yourbrand.com/book or a platform link ending in your name)',
          'No app download required for the client',
          'Opens correctly on mobile, inside the Instagram in-app browser',
          'Shows your services and prices without a login',
          'Collects the deposit before confirming',
        ]} />
      </section>

      <section id="nice-to-have">
        <h2 className="font-serif text-2xl font-bold mb-4">Nice-to-have features (but not essential)</h2>
        <ArticleTable
          headers={['Feature', 'Why it\'s useful', 'Essential?']}
          rows={[
            ['Client notes / history', 'Track nail history, preferences, allergies', 'Very useful'],
            ['Waitlist management', 'Fill cancellations quickly', 'Nice to have'],
            ['Instagram "Book" button', 'One less tap for clients from Instagram', 'Nice to have'],
            ['Gift vouchers', 'Extra revenue, especially in December', 'Only if you sell vouchers'],
            ['Marketplace listing', 'Discoverability for new clients', 'Only if clients in your area use it'],
            ['Analytics / reports', 'Revenue tracking, busiest times', 'Nice to have'],
          ]}
        />
      </section>

      <section id="red-flags">
        <h2 className="font-serif text-2xl font-bold mb-4">Red flags to avoid</h2>
        <ArticleTable
          headers={['Red flag', 'Why it matters']}
          rows={[
            ['Commission on clients you brought yourself', 'You pay a share of bookings that came from your own Instagram or referrals'],
            ['Requires team setup before you can use it', 'A solo nail tech shouldn\'t need to configure a team to take a first booking'],
            ['No deposit option on the basic plan', 'Deposits should be available on the plan you can afford'],
            ['Client must download an app to book', 'Adds friction for first-time clients'],
            ['Long-term contracts', 'You should be able to leave if the platform doesn\'t work for you'],
            ['No client export', 'You should be able to take your client list with you'],
          ]}
        />
      </section>

      <section id="scorecard">
        <h2 className="font-serif text-2xl font-bold mb-4">Score apps during the free trial</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Give each feature a weight (how much it matters to you, 1 to 3) and a score (how well the app does it, 0 to 2). Multiply and add up. Example for one app:</p>
        <ArticleTable
          headers={['Feature', 'Weight', 'Score', 'Weight × score']}
          rows={[
            ['Automatic deposits', '3', '2', '6'],
            ['Nail art add-ons', '3', '1', '3'],
            ['Reminders you can edit', '2', '2', '4'],
            ['Mobile booking flow', '3', '2', '6'],
            ['Client notes', '2', '1', '2'],
            ['Clear fees at your volume', '2', '2', '4'],
            [<strong key="t">Total</strong>, '', '', <strong key="v">25 out of a possible 30</strong>],
          ]}
          caption="Maximum = sum of weights (15) × 2 = 30. Compare totals across the apps you trial."
        />
      </section>

      <section id="useful-resources">
        <h2 className="font-serif text-2xl font-bold mb-4">Useful resources</h2>
        <ul className="space-y-2 text-sm">
          {[
            ['/best-booking-app-for-nail-techs', 'Best booking apps for nail techs: full comparison'],
            ['/blog/how-to-choose-booking-app-nail-business', 'How to choose a booking app for your nail business'],
            ['/nail-tech-deposits', 'How to take deposits as a nail tech'],
            ['/tools/nail-tech-appointment-reminder-templates', 'Free appointment reminder templates'],
          ].map(([href, label]) => <li key={href}><Link to={href} className={link}>{label}</Link></li>)}
        </ul>
      </section>
    </div>
  ),
});
export {};
