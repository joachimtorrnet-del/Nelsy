import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-build-nail-client-referral-program',
  title: 'How to Build a Nail Client Referral Program',
  seoTitle: 'How to Build a Nail Client Referral Program That Works',
  excerpt: 'Word of mouth is still the most powerful way for nail techs to grow. A simple referral program formalises what already happens naturally — and accelerates it.',
  seoDescription: 'How to build a nail client referral program. Simple referral schemes for nail techs — reward structures, how to ask for referrals, and tracking new referral clients.',
  category: 'get-clients',
  tags: ['nail client referral', 'nail referral program', 'word of mouth nail', 'nail business growth'],
  heroImage: 'linear-gradient(135deg, #F0FFF4 0%, #BBF7D0 100%)',
  heroImageAlt: 'How to build a nail client referral program',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-referrals-matter', label: 'Why referrals are valuable' },
    { id: 'simple-schemes', label: 'Simple referral scheme structures' },
    { id: 'how-to-ask', label: 'How to ask for referrals' },
    { id: 'communicating-the-scheme', label: 'Communicating your referral scheme' },
    { id: 'tracking', label: 'Tracking referrals' },
  ],
  relatedSlugs: ['how-to-increase-nail-client-retention', 'how-to-ask-nail-clients-for-reviews', 'how-to-get-first-10-nail-clients', 'how-to-get-more-local-nail-clients'],
  faq: [
    { q: 'Should I offer cash or a service discount for referrals?', a: 'Service discount (money off a future appointment) is generally more effective than cash for nail techs. It rewards loyalty with something your business can provide at lower cost than cash, and it ensures the referring client returns for another appointment to claim it. A cash reward requires you to pay out money immediately; a service credit is redeemed at a future visit.' },
    { q: 'How much should I offer as a referral reward?', a: 'Common structures: £5–£10 off a future appointment for the referrer, and sometimes a welcome discount for the new client. The referrer incentive should feel meaningful without being so high it\'s unprofitable. At £8 off per referral, a client who brings in 3 new clients costs you £24 in discounts but generates potentially £120+ in new client revenue.' },
    { q: 'What if I don\'t have enough clients to build a referral base?', a: 'Referral programs work best once you have at least 10–15 regular clients. Before that, focus on getting your first clients through Instagram and local marketing, then formalise a referral scheme once you have a base to activate. A referral scheme with 3 clients to activate it won\'t generate meaningful results.' },
  ],
  relatedFeatureSlugs: ['crm', 'bookings', 'email-newsletters'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-referrals-matter">
        <h2 className="font-serif text-2xl font-bold mb-4">Why referrals are valuable</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Referred clients are among the best clients a nail tech can get. They arrive pre-sold on your work (their friend recommended you specifically), they have realistic expectations (they've seen your results in person), and they tend to have similar taste and lifestyle to your existing clients — meaning they're likely to be a good fit.</p>
        <p className="text-gray-700 leading-relaxed">A referral program formalises what already happens organically. Most satisfied nail clients talk about their nails — a program gives them a structured reason to direct their friends to you specifically, and rewards them for doing so.</p>
      </section>

      <section id="simple-schemes">
        <h2 className="font-serif text-2xl font-bold mb-4">Simple referral scheme structures</h2>
        <ArticleTable
          headers={['Scheme type', 'Structure', 'Best for']}
          rows={[
            ['Simple discount', 'Referrer gets £X off next appointment when the referred friend books', 'Easy to explain and run; no complexity'],
            ['Both-way discount', 'Referrer gets £X off; new client also gets £X off their first appointment', 'Stronger incentive for the new client to actually book'],
            ['Loyalty points referral', 'Referral earns extra loyalty points if running a loyalty scheme', 'Only if you already have a loyalty scheme in place'],
            ['Free add-on reward', 'Refer a friend = free chrome or nail art at next appointment', 'Feel-good reward; costs you less than cash; good upsell moment'],
          ]}
        />
        <ArticleCallout variant="info" title="Recommended simple structure">
          "Refer a friend and you'll both get £8 off your next appointments. Just ask your friend to mention your name when they book."
          {'\n\n'}
          Simple to communicate, easy to track (new client mentions the referrer's name), and rewarding for both parties.
        </ArticleCallout>
      </section>

      <section id="how-to-ask">
        <h2 className="font-serif text-2xl font-bold mb-4">How to ask for referrals</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The best moment to ask is when a client has just received a fresh set and is visibly pleased with the result — at the end of the appointment, before they leave:</p>
        <ArticleCallout variant="tip" title="Natural referral ask">
          "I'm so glad you love them! I'm always looking for lovely clients like you — if any of your friends are looking for a nail tech, send them my way. I'll give you both £8 off your next appointments as a thank you 😊"
        </ArticleCallout>
        <p className="text-gray-700 mt-4 mb-4 leading-relaxed">Other moments to ask:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>In a follow-up message: "Love seeing your nails looking so good in your photos! If any friends are looking for a nail tech, I have a refer-a-friend offer — send them my way"</li>
          <li>In your booking confirmation: "Know someone who needs nails? Send them to my booking page and you'll both get £8 off your next appointment"</li>
          <li>On Instagram Stories: "Did you know I have a referral scheme? Refer a friend and you both save £8 — DM me for details"</li>
        </ul>
        <ArticleTip>Ask for referrals at the peak of client satisfaction — when they\'re admiring their fresh nails. The same ask a week later, when the nails are 5 days old, will get a much lower response rate.</ArticleTip>
      </section>

      <section id="communicating-the-scheme">
        <h2 className="font-serif text-2xl font-bold mb-4">Communicating your referral scheme</h2>
        <ArticleTable
          headers={['Channel', 'How to use it']}
          rows={[
            ['Booking confirmation', 'One line: "Refer a friend and you\'ll both get £8 off — just ask them to mention your name when they book"'],
            ['Instagram Highlights', 'A "Refer a Friend" slide in your booking/FAQ Highlight'],
            ['Instagram Story', 'Occasional story: "My referral scheme 👇" with the details'],
            ['End of appointment', 'Verbal mention when client is happy with their nails'],
          ]}
        />
      </section>

      <section id="tracking">
        <h2 className="font-serif text-2xl font-bold mb-4">Tracking referrals</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Keep tracking simple or you won\'t do it:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Ask new clients "how did you hear about me?" at their first appointment or on their booking form</li>
          <li>When a client is referred, note the referrer\'s name against the new booking</li>
          <li>Apply the referrer\'s discount at the next appointment (a note on their booking: "£8 off — referred [new client name]")</li>
          <li>For high volume, a simple spreadsheet or a column in your booking system notes field is enough — you don\'t need specialist software</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For more client growth strategies: <Link to="/learn/how-to-ask-nail-clients-for-reviews" className="underline text-[#F52B8C]">how to ask nail clients for reviews</Link> | <Link to="/learn/how-to-get-more-local-nail-clients" className="underline text-[#F52B8C]">how to get more local nail clients</Link>.</p>
      </section>
    </div>
  ),
});
export {};
