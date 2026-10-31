import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleChecklist, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-make-nail-business-look-professional',
  title: 'How to Make Your Nail Business Look More Professional',
  seoTitle: 'How to Make Your Nail Business Look More Professional',
  excerpt: 'Professionalism isn\'t about having a studio in a fancy location. It\'s about the details clients notice at every touchpoint — here\'s what actually matters.',
  seoDescription: 'How to make your nail business look more professional. The details that signal quality to clients: booking system, communications, photos, workspace, and online presence.',
  category: 'branding-growth',
  tags: ['professional nail business', 'nail business credibility', 'nail business appearance', 'nail tech professionalism'],
  heroImage: 'linear-gradient(135deg, #F0F4FF 0%, #A5B4FC 100%)',
  heroImageAlt: 'How to make your nail business look more professional',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'what-clients-notice', label: 'What clients actually notice' },
    { id: 'online-presence', label: 'Online presence' },
    { id: 'booking-communications', label: 'Booking and communications' },
    { id: 'workspace', label: 'Your workspace' },
    { id: 'during-appointment', label: 'During the appointment' },
    { id: 'quick-wins', label: 'Quick wins checklist' },
  ],
  relatedSlugs: ['how-to-brand-your-nail-business', 'nail-tech-branding-ideas', 'best-instagram-bio-ideas-for-nail-techs'],
  faq: [
    { q: 'Do I need a salon to look professional as a nail tech?', a: 'No. A clean, tidy, intentional home studio is perceived as professional by most clients. What creates the professional impression is consistency and care: a tidy workspace, clear communications, good photos, a proper booking system. A rented chair in a beautiful salon with poor communication feels less professional than a home studio that runs smoothly.' },
    { q: 'How much does looking professional cost?', a: 'Most of the high-impact professional signals are free or low cost: writing better confirmation messages, cleaning up your Instagram bio, adding a cancellation policy to your booking page. A ring light (£30–50) transforms your portfolio photos. Professionalism is mostly about attention to detail, not spending money.' },
    { q: 'Should I use my personal Instagram or create a new nail account?', a: 'Create a dedicated nail account. A personal account mixed with personal content, political opinions, or unrelated posts dilutes your professional brand and potentially alienates clients. A dedicated account communicates that you take your nail business seriously.' },
  ],
  relatedFeatureSlugs: ['bookings', 'link-in-bio', 'crm'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-clients-notice">
        <h2 className="font-serif text-2xl font-bold mb-4">What clients actually notice</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Professionalism in a nail business comes from the cumulative impression of many small details — not from one big thing. Clients form an impression before they've met you, based on your Instagram, booking page, and the communications they receive.</p>
        <ArticleTable
          headers={['Touchpoint', 'Professional signal']}
          rows={[
            ['Instagram profile', 'Clean aesthetic, location visible, booking link clear'],
            ['Booking page', 'Service menu with prices, deposit policy visible, professional tone'],
            ['Confirmation message', 'Personalised, includes location and what to expect'],
            ['Reminder message', 'Timely, mentions cancellation policy reminder'],
            ['Workspace', 'Clean, organised, intentional'],
            ['During appointment', 'Present, skilled, no distractions'],
            ['After appointment', 'Photos taken, rebooking offered, follow-up if needed'],
          ]}
        />
      </section>

      <section id="online-presence">
        <h2 className="font-serif text-2xl font-bold mb-4">Online presence</h2>
        <ArticleChecklist title="Professional online presence checklist" items={[
          'Dedicated nail Instagram account (not mixed with personal)',
          'Professional account / creator account (for Insights)',
          'Your name field includes "Nail Tech [City]"',
          'Bio states clearly what you do and how to book',
          'Bio link goes directly to your booking page',
          'Portfolio photos are clean, well-lit, and consistent',
          'Captions include location and booking CTA',
          'No unanswered DMs older than 4 hours during working hours',
        ]} />
        <ArticleTip>Do a "stranger test" on your Instagram profile. Open it on your phone as if you know nothing about this nail tech. Within 10 seconds, can you tell: what they do, where they are, and how to book? If not, something needs fixing.</ArticleTip>
      </section>

      <section id="booking-communications">
        <h2 className="font-serif text-2xl font-bold mb-4">Booking and communications</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your booking system and the communications it sends are a major professionalism signal. Clients who receive a well-written confirmation and a timely reminder feel they're in good hands before they arrive.</p>
        <ArticleChecklist title="Professional booking and comms" items={[
          'Online booking page (not DMs only)',
          'Deposits collected automatically at booking',
          'Confirmation message: professional tone, includes address, parking, what to bring',
          'Cancellation policy clearly stated on booking page and in confirmation',
          '24-hour reminder sent automatically',
          'Respond to enquiries within 4 hours during working days',
          'If you need to cancel, give as much notice as possible and rebook promptly',
        ]} />
      </section>

      <section id="workspace">
        <h2 className="font-serif text-2xl font-bold mb-4">Your workspace</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Whether home or salon, these workspace details matter:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Clean and reset between every client — dust, product residue, used tools all removed</li>
          <li>Products organised and accessible, not piled haphazardly</li>
          <li>Fresh towel or nail mat for each client</li>
          <li>Hand wash station clearly available</li>
          <li>No personal clutter visible in the client area</li>
        </ul>
        <ArticleCallout variant="info" title="The first impression">
          Clients form their impression of you in the first 30 seconds. A tidy, well-lit, clean workspace immediately signals professionalism before you've said a word.
        </ArticleCallout>
      </section>

      <section id="during-appointment">
        <h2 className="font-serif text-2xl font-bold mb-4">During the appointment</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Phone away (yours) — being present signals respect for the client's time</li>
          <li>Ask about their preferences early: shape, length, any lifestyle considerations</li>
          <li>Explain what you're doing if the client asks — don't be mysterious about your process</li>
          <li>Give honest advice (e.g. "your nails need a break" if that's true)</li>
          <li>Suggest the rebooking before they leave</li>
        </ul>
      </section>

      <section id="quick-wins">
        <h2 className="font-serif text-2xl font-bold mb-4">Quick wins: the most impactful changes</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If you had one hour to make your business look more professional, do these in order:</p>
        <ol className="list-decimal list-inside space-y-2 text-gray-700">
          <li>Update your Instagram name field to include your city</li>
          <li>Rewrite your bio to clearly state what you do and how to book</li>
          <li>Change your bio link to go directly to your booking page (not a Linktree with 10 options)</li>
          <li>Rewrite your confirmation message to sound personal and include your address</li>
          <li>Add your cancellation policy to your booking page if it isn't there</li>
        </ol>
        <p className="text-gray-700 mt-4 leading-relaxed">Total cost: zero. Impact: significant. See: <Link to="/learn/how-to-brand-your-nail-business" className="underline text-[#F52B8C]">how to brand your nail business</Link>.</p>
      </section>
    </div>
  ),
});
export {};
