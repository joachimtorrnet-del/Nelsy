import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-organize-nail-business-from-phone',
  title: 'How to Organise Your Nail Business From Your Phone',
  seoTitle: 'How to Organise Your Nail Business From Your Phone',
  excerpt: 'Most nail techs run their entire business from their phone. Here\'s how to set it up so you\'re not drowning in messages, missed bookings, and admin.',
  seoDescription: 'How to organise your nail business from your phone. Apps, systems, and habits for managing bookings, clients, finances, and content from your phone efficiently.',
  category: 'booking-software',
  tags: ['organise nail business phone', 'nail tech business organisation', 'nail business admin phone'],
  heroImage: 'linear-gradient(135deg, #FFF9EB 0%, #FEF3C7 100%)',
  heroImageAlt: 'How to organise your nail business from your phone',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'booking-phone', label: 'Managing bookings from your phone' },
    { id: 'finance-phone', label: 'Tracking finances on your phone' },
    { id: 'content-phone', label: 'Creating and scheduling content from your phone' },
    { id: 'communication', label: 'Client communication' },
    { id: 'systems', label: 'Systems that reduce phone admin' },
  ],
  relatedSlugs: ['best-business-apps-nail-techs', 'best-tools-running-nail-business', 'nail-tech-expense-list', 'how-to-batch-nail-content'],
  faq: [
    { q: 'Should I have a separate phone for my nail business?', a: 'Most solo nail techs use their personal phone for their nail business — a second phone is rarely necessary or practical. A better approach: a separate WhatsApp Business account, a professional email address (not your personal Gmail), and organised folders/albums on your existing phone keep the business organised without needing separate hardware.' },
    { q: 'How do I stop business messages taking over my phone?', a: 'WhatsApp Business allows you to separate business messages from personal WhatsApp. For Instagram, check DMs at set times rather than having notifications on all day — constant DM notifications fragment your focus. Use your booking app to handle routine booking communication, so fewer things reach your personal DMs.' },
  ],
  relatedFeatureSlugs: ['bookings', 'crm', 'analytics'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="booking-phone">
        <h2 className="font-serif text-2xl font-bold mb-4">Managing bookings from your phone</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your booking app is your primary business tool. From your phone, you should be able to:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>View your calendar for the day, week, and month</li>
          <li>See new bookings with client details</li>
          <li>Block availability (holiday, training, sick days)</li>
          <li>Reschedule or cancel appointments</li>
          <li>Message clients through the app</li>
          <li>View and receive deposits</li>
        </ul>
        <ArticleCallout variant="info" title="Enable push notifications for bookings">
          Turn on push notifications from your booking app so you know immediately when a booking comes in. Missing a new booking notification and not seeing it until hours later creates a poor client experience.
        </ArticleCallout>
      </section>

      <section id="finance-phone">
        <h2 className="font-serif text-2xl font-bold mb-4">Tracking finances on your phone</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Basic finance tracking can be done entirely from your phone:</p>
        <ArticleTable
          headers={['Task', 'Tool']}
          rows={[
            ['Track income', 'Your booking app\'s revenue report, or a simple Google Sheet updated weekly'],
            ['Photograph receipts', 'Google Drive photo upload or a receipt-scanning app'],
            ['Log expenses', 'Google Sheets app, Wave app, or your accounting software\'s mobile app'],
            ['Check earnings against goal', 'Monthly income calculation in a spreadsheet or notes app'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For what to track: <Link to="/learn/nail-tech-expense-list" className="underline text-[#F52B8C]">nail tech expense list</Link>.</p>
      </section>

      <section id="content-phone">
        <h2 className="font-serif text-2xl font-bold mb-4">Creating and scheduling content from your phone</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Photo albums:</strong> Keep a dedicated album called "Content" — move good shots here immediately after taking them so they don't get buried</li>
          <li><strong>Lightroom presets:</strong> Saved presets mean you can edit a photo in 30 seconds on your phone</li>
          <li><strong>CapCut or Instagram's editor:</strong> Edit Reels directly from your phone without a laptop</li>
          <li><strong>Caption drafts:</strong> Keep a Notes document with caption drafts — write them in a quiet moment and paste when posting</li>
          <li><strong>Schedule from Instagram:</strong> Instagram's native scheduler lets you prepare posts in advance from your phone</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Batching guide: <Link to="/learn/how-to-batch-nail-content" className="underline text-[#F52B8C]">how to batch nail content for a whole month</Link>.</p>
      </section>

      <section id="communication">
        <h2 className="font-serif text-2xl font-bold mb-4">Client communication</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>WhatsApp Business:</strong> Separate business messages from personal; set quick reply templates for common questions; configure an away message outside business hours</li>
          <li><strong>Instagram DMs:</strong> Saved replies for common enquiries (pricing, availability, new client info)</li>
          <li><strong>Email:</strong> A professional email address through Gmail or similar; mobile app for checking and replying</li>
          <li><strong>Booking app messaging:</strong> Use your booking app's built-in messaging for appointment-specific communication so it's tracked in the booking context</li>
        </ul>
      </section>

      <section id="systems">
        <h2 className="font-serif text-2xl font-bold mb-4">Systems that reduce phone admin</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The goal is to automate routine admin so your phone is for managing exceptions, not every interaction:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Online booking with deposits = eliminates booking DMs and no-show chasing</li>
          <li>Automatic reminders = eliminates manual reminder messages</li>
          <li>Saved replies in Instagram and WhatsApp = eliminates typing the same response repeatedly</li>
          <li>Consistent pricing on your booking page = eliminates "how much do you charge?" DMs</li>
          <li>Clear policy on your booking page = eliminates policy negotiation messages</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Good systems mean your phone is for quality work and client relationships, not constant admin. For all the tools that help: <Link to="/learn/best-business-apps-nail-techs" className="underline text-[#F52B8C]">best business apps for nail techs</Link>.</p>
      </section>
    </div>
  ),
});
export {};
