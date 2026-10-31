import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable, ArticleSteps } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-choose-booking-app-nail-business',
  title: 'How to Choose a Booking App for Your Nail Business',
  seoTitle: 'How to Choose a Booking App for Your Nail Business',
  excerpt: 'A step-by-step decision guide for nail techs evaluating booking apps — what questions to ask, what to test, and how to avoid wasting time on the wrong platform.',
  seoDescription: 'How to choose the right booking app for your nail business. A decision guide covering setup, deposits, service menus, fees, and what to test before committing.',
  category: 'booking-software',
  tags: ['booking app', 'decision guide', 'nail tech tools', 'switching booking systems'],
  heroImage: 'linear-gradient(135deg, #F0F4FF 0%, #C7D2FE 100%)',
  heroImageAlt: 'How to choose a booking app for nail techs',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'start-with-requirements', label: 'Start with your requirements' },
    { id: 'questions-to-ask', label: 'Questions to ask before signing up' },
    { id: 'test-process', label: 'How to properly test a platform' },
    { id: 'fee-structures', label: 'Understanding fee structures' },
    { id: 'switching', label: 'Switching from one platform to another' },
    { id: 'useful-resources', label: 'Useful resources' },
  ],
  relatedSlugs: ['best-booking-apps-for-nail-techs-2026', 'nail-tech-booking-software-features', 'how-to-move-from-instagram-dms-to-online-booking'],
  faq: [
    { q: 'How long does it take to set up a nail tech booking app?', a: 'Most platforms take 1–3 hours to set up properly: creating your service menu, writing service descriptions, adding prices, setting your availability, and configuring deposit settings. Some platforms have more complex setups. If it\'s taking longer than an afternoon, that complexity will affect your day-to-day use.' },
    { q: 'Should I choose a platform with a marketplace or a standalone booking page?', a: 'Depends on where you are in your business. If you need new clients and don\'t have a strong Instagram presence, marketplace visibility helps. If you have an established following and primarily want to manage bookings, a clean standalone booking page is better — and avoids marketplace commission fees.' },
    { q: 'What happens to my bookings if I switch platforms?', a: 'Most platforms let you export your client list and booking history. Check this before committing. You\'ll need to update your booking link (in your bio, on your website if you have one, in saved message templates). Let existing clients know the link has changed.' },
  ],
  relatedFeatureSlugs: ['bookings', 'deposits', 'payments'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="start-with-requirements">
        <h2 className="font-serif text-2xl font-bold mb-4">Start with your requirements, not the features list</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The easiest way to choose the wrong booking app is to evaluate features without first knowing what you need. Booking platforms have long feature lists. Not all of them matter for a solo nail tech. Some of the most-marketed features (loyalty programmes, multi-location management, staff shift scheduling) are irrelevant if you're a single-person business.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">Before looking at any platform, write down your answers to three questions:</p>
        <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-4">
          <li><strong>What does my service menu look like?</strong> How many services? Do you sell nail art as an add-on? What's your most complex pricing scenario?</li>
          <li><strong>Do I need to find new clients, or manage existing ones?</strong> This determines whether you need marketplace exposure or just a clean booking link.</li>
          <li><strong>What's my budget tolerance for monthly fees and transaction charges?</strong> Some platforms have no monthly fee but charge per booking. Others have a flat monthly cost. Run the numbers for your booking volume.</li>
        </ol>
        <ArticleTip>Write your service menu out on paper first. Then try to replicate it in every platform you evaluate. If the platform can't represent your menu accurately, move on.</ArticleTip>
      </section>

      <section id="questions-to-ask">
        <h2 className="font-serif text-2xl font-bold mb-4">Questions to ask before signing up</h2>
        <ArticleTable
          headers={['Question', 'Why it matters']}
          rows={[
            ['Can I collect deposits automatically?', 'Manual deposit requests still require admin work'],
            ['Is there commission on bookings from my existing clients?', 'Some marketplaces charge commission even if the client already knew you'],
            ['Can I set my own booking link / URL?', 'A clean URL matters for your Instagram bio and client trust'],
            ['What happens if I cancel my subscription?', 'Can you export your client data? Will existing bookings still be visible?'],
            ['How does the client experience look on mobile?', 'Test on your phone — most bookings happen on phones'],
            ['What payment processor do they use?', 'Stripe is standard and reliable; proprietary processors can have higher fees'],
            ['Is there a free trial without a credit card?', 'Lets you test properly without risk'],
          ]}
        />
      </section>

      <section id="test-process">
        <h2 className="font-serif text-2xl font-bold mb-4">How to properly test a booking platform</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Most nail techs evaluate booking platforms by looking at the admin dashboard — the calendar view, the settings pages. That's the wrong approach. Evaluate the <em>client-facing</em> experience first.</p>
        <ArticleSteps steps={[
          { title: 'Create a free account and set up a basic service menu', body: 'Add 2–3 real services with accurate prices and durations. Set a deposit amount. This tests how flexible the service setup is.' },
          { title: 'Send yourself the booking link', body: 'Open it on your phone as if you were a new client seeing it for the first time. How does it look? Is it clear? Can you find the services easily?' },
          { title: 'Complete a test booking all the way through', body: 'Go through the full booking flow: choose a service, pick a time, add your details, pay the deposit. Note every friction point.' },
          { title: 'Check the confirmation experience', body: 'Did you receive a confirmation message? Does it include the appointment details, the address, and the cancellation policy? Is the message personalised or generic?' },
          { title: 'Test the reminder system', body: 'Check whether reminders are configured by default and what they say. Ideally test a 24-hour reminder if the platform allows it.' },
        ]} />
        <ArticleCallout variant="info" title="The 10-minute test">
          If a test booking takes more than 10 minutes from "open booking link" to "booking confirmed", it's too slow. Most clients won't persist through a slow flow. They'll DM you instead — or find a nail tech who's easier to book.
        </ArticleCallout>
      </section>

      <section id="fee-structures">
        <h2 className="font-serif text-2xl font-bold mb-4">Understanding booking platform fee structures</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Fee structures vary widely between platforms. The main models:</p>
        <ArticleTable
          headers={['Model', 'How it works', 'Best if']}
          rows={[
            ['Flat monthly subscription', 'Pay a fixed monthly fee regardless of bookings', 'You have consistent booking volume'],
            ['Per-booking fee', 'Platform charges a small fee per completed booking', 'You have variable booking volume'],
            ['Commission on new clients', "Platform charges % commission on clients found via their marketplace", 'You want marketplace exposure and factor in the cost'],
            ['Payment processing fee', 'Fee on each payment processed (typically 1.5–3%)', 'Standard — check the rate vs alternatives'],
            ['No subscription + transaction fee', "Free to use but charges % on each booking's deposit or total", 'Compare carefully — can be high volume cost'],
          ]}
        />
        <ArticleTip>Calculate your expected monthly cost at your actual booking volume. A "free" platform with 2% commission on every booking can cost more than a £20/month flat subscription if you're booking 40+ appointments.</ArticleTip>
      </section>

      <section id="switching">
        <h2 className="font-serif text-2xl font-bold mb-4">Switching from one platform to another</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Switching booking apps is common — most nail techs try 2–3 before settling. The main tasks when switching:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Export your client list from the old platform before cancelling</li>
          <li>Update your Instagram bio link, any website booking links, and any saved DM templates you use</li>
          <li>Message existing clients: "I've moved my booking to [new link] — please use this for your next appointment"</li>
          <li>Let any bookings that are already confirmed run out on the old platform before fully switching</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Switching is less disruptive than nail techs fear. Clients who want to book with you will use whatever link you give them.</p>
      </section>

      <section id="useful-resources">
        <h2 className="font-serif text-2xl font-bold mb-4">Useful resources</h2>
        <ul className="space-y-2 text-sm">
          {[
            ['/best-booking-app-for-nail-techs', 'Best booking app for nail techs — feature comparison'],
            ['/learn/best-booking-apps-for-nail-techs-2026', 'Best booking apps for nail techs in 2026'],
            ['/learn/nail-tech-booking-software-features', 'What features to look for in nail tech booking software'],
            ['/learn/why-booking-through-dms-costs-nail-techs-clients', 'Why booking through DMs costs nail techs clients'],
          ].map(([href, label]) => <li key={href}><Link to={href} className="underline text-[#F52B8C]">{label}</Link></li>)}
        </ul>
      </section>
    </div>
  ),
});
export {};
