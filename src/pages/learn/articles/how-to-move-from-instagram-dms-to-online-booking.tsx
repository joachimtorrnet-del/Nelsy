import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleSteps, ArticleChecklist } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-move-from-instagram-dms-to-online-booking',
  title: 'How to Move from Instagram DMs to Online Booking',
  seoTitle: 'How to Move from Instagram DMs to Online Booking as a Nail Tech',
  excerpt: 'A practical step-by-step guide for nail techs who want to switch from DM booking to a proper online booking system — without disrupting existing clients.',
  seoDescription: 'Step-by-step guide to moving your nail bookings from Instagram DMs to an online booking page. Scripts, templates, and what to tell existing clients.',
  category: 'booking-software',
  tags: ['online booking', 'Instagram booking', 'booking transition', 'nail tech admin'],
  heroImage: 'linear-gradient(135deg, #FDF2F8 0%, #FBCFE8 100%)',
  heroImageAlt: 'Moving from Instagram DMs to online booking for nail techs',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  spotlight: true,
  toc: [
    { id: 'before-you-switch', label: 'Before you switch' },
    { id: 'setup', label: 'Setting up your booking page' },
    { id: 'telling-clients', label: 'What to tell existing clients' },
    { id: 'updating-instagram', label: 'Updating your Instagram' },
    { id: 'handling-dm-enquiries', label: 'Handling DM enquiries during transition' },
    { id: 'troubleshooting', label: 'Common issues' },
  ],
  relatedSlugs: ['why-booking-through-dms-costs-nail-techs-clients', 'best-booking-apps-for-nail-techs-2026', 'what-should-nail-tech-booking-page-include'],
  faq: [
    { q: 'How long does it take to transition from DM to online booking?', a: 'Most nail techs complete the switch within 2–4 weeks. The technical setup takes a few hours. The transition period is the time it takes for existing clients to use the new link and for the habit of redirecting DMs to become automatic.' },
    { q: 'What if clients don\'t want to use online booking?', a: 'Most clients are fine with online booking once they\'ve used it once. A small number of long-term loyal clients may prefer DMs — you can choose whether to accommodate them individually. What you don\'t want is maintaining a DM booking system for everyone because a small minority prefer it.' },
    { q: 'Should I announce the switch on Instagram?', a: 'Yes — a story announcement saves you from explaining it individually to every client who DMs you. Keep it positive and simple: you\'ve set up an easier way to book. Most clients will appreciate it.' },
  ],
  relatedFeatureSlugs: ['bookings', 'instagram-autodm', 'link-in-bio'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="before-you-switch">
        <h2 className="font-serif text-2xl font-bold mb-4">Before you switch</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The most common mistake is announcing the switch before the booking page is ready. Before you tell a single client or update your bio, your booking page should be complete, tested, and working exactly the way you want it.</p>
        <ArticleChecklist title="Pre-switch checklist" items={[
          'Service menu created with accurate prices and durations',
          'Nail art add-ons configured',
          'Deposit amount set',
          'Booking confirmation message customised to sound like you',
          '24-hour reminder configured',
          'Test booking completed on your phone as a client',
          'Cancellation policy written and visible on the booking page',
        ]} />
      </section>

      <section id="setup">
        <h2 className="font-serif text-2xl font-bold mb-4">Setting up your booking page</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your booking page is the thing that needs to do the work your DMs were doing — show your services, let clients pick a time, and collect their deposit. The key is making it feel like you, not a generic system.</p>
        <ArticleSteps steps={[
          { title: 'Choose a platform and create an account', body: 'Start with Nelsy, Fresha, or another nail-tech-focused platform. Most offer a free trial without a credit card requirement.' },
          { title: 'Set up your service menu', body: 'Add every service you offer with accurate prices, durations, and descriptions. If you do nail art, add it as an add-on to base services rather than a separate service — this gives clients accurate time estimates.' },
          { title: 'Configure your deposit', body: 'Set a deposit amount between £10–25 or 20–30% of the service price. This should be collected automatically at booking, not requested separately.' },
          { title: 'Write your confirmation message', body: 'Customise the automatic confirmation message to include your address (or studio directions), parking info, and what to expect. Make it sound like a message from you, not a corporate system.' },
          { title: 'Test the full flow on your phone', body: 'Do a complete test booking as a client. Find the booking link, choose a service, pick a time, pay the deposit (use a test card if available). Note anything that feels confusing.' },
        ]} />
      </section>

      <section id="telling-clients">
        <h2 className="font-serif text-2xl font-bold mb-4">What to tell existing clients</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Existing clients need to know the booking method has changed. The most effective approach is a combination of a story announcement plus a personal message to your regulars:</p>
        <ArticleCallout variant="tip" title="Story announcement script">
          "I've just set up online booking — it's the easiest way to secure an appointment with me now. You can see my full availability, choose your services, and pay your deposit all in one place. Link in bio. Can't wait to see you! 💅"
        </ArticleCallout>
        <p className="text-gray-700 mt-4 mb-4 leading-relaxed">For regular clients you see frequently, a brief personal message works well:</p>
        <ArticleCallout variant="info" title="Client message script">
          "Hey! Just letting you know I've moved to online booking — it's so much easier than DMs for both of us. You can book and pay your deposit all through the link in my bio. See you [date of their next appointment]!"
        </ArticleCallout>
        <ArticleTip>You don't need to contact every past client. The story announcement catches most of them. Only personally message clients with upcoming appointments or regulars you'd feel odd not telling.</ArticleTip>
      </section>

      <section id="updating-instagram">
        <h2 className="font-serif text-2xl font-bold mb-4">Updating your Instagram</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your Instagram bio is the most important place to put your booking link. Three things to update:</p>
        <ol className="list-decimal list-inside space-y-3 text-gray-700">
          <li><strong>Bio link:</strong> Replace whatever's currently in your link-in-bio with your booking page URL. If you use a link-in-bio tool (Linktree etc.), make the booking link the first and most prominent option.</li>
          <li><strong>Bio text:</strong> Add "Book via link in bio" or "Online booking: link below" to your bio. This tells new visitors exactly what to do.</li>
          <li><strong>Highlights:</strong> Add a "Book" or "Bookings" highlight with a story that explains how to book and links to the booking page.</li>
        </ol>
      </section>

      <section id="handling-dm-enquiries">
        <h2 className="font-serif text-2xl font-bold mb-4">Handling DM enquiries during the transition</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">For the first few weeks after switching, clients will still DM you to book. That's expected. The key is to redirect them consistently rather than booking some through DMs and some through the booking page — that way lies confusion.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">Save this as a quick reply on Instagram:</p>
        <ArticleCallout variant="info" title="DM redirect script">
          "Hey! The best way to book is through my online booking page — you can see all my availability and secure your spot with a deposit in one go. Link in bio 🙂"
        </ArticleCallout>
        <p className="text-gray-700 mt-4 leading-relaxed">After 2–3 weeks of consistent redirects, the habit shifts and most clients will go directly to the booking page without DM-ing first. For more reminder message templates: <Link to="/tools/nail-tech-appointment-reminder-templates" className="underline text-[#F52B8C]">free appointment reminder templates</Link>.</p>
      </section>

      <section id="troubleshooting">
        <h2 className="font-serif text-2xl font-bold mb-4">Common issues</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>"Clients say they can't find availability"</strong> — check your calendar settings and make sure your working hours are set correctly. If you blocked out time for something but forgot to unblock it, you'll show as unavailable.</p>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>"Clients complain about the deposit"</strong> — some will. Explain it simply: the deposit secures their slot and comes off the final price. Most clients accept this quickly, especially if they've been waiting for last-minute cancellations in the past.</p>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>"I'm still getting DMs from people wanting to book"</strong> — this is normal for the first 2–3 weeks. Redirect consistently. If you accommodate DM bookings during the transition, the transition takes longer.</p>
        <p className="text-gray-700 leading-relaxed">See also: <Link to="/learn/what-should-nail-tech-booking-page-include" className="underline text-[#F52B8C]">What your nail tech booking page should include</Link>.</p>
      </section>
    </div>
  ),
});
export {};
