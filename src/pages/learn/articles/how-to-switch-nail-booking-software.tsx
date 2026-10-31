import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-switch-nail-booking-software',
  title: 'How to Switch Nail Booking Software Without Losing Clients',
  seoTitle: 'How to Switch Nail Booking Software Without Losing Clients',
  excerpt: 'Switching booking platforms feels risky — but it doesn\'t have to be. Here\'s how to migrate from one booking system to another without losing clients or creating confusion.',
  seoDescription: 'How to switch nail booking software without losing clients. Step-by-step guide to migrating your nail tech booking system — client data, links, communication, and timing.',
  category: 'booking-software',
  tags: ['switch nail booking software', 'migrate nail booking app', 'change booking system nail tech'],
  heroImage: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
  heroImageAlt: 'How to switch nail booking software without losing clients',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'before-you-switch', label: 'Before you switch' },
    { id: 'client-data', label: 'Migrating client data' },
    { id: 'setup-new', label: 'Setting up the new platform' },
    { id: 'communicating', label: 'Communicating the change to clients' },
    { id: 'cutover', label: 'The cutover process' },
    { id: 'after', label: 'After switching' },
  ],
  relatedSlugs: ['best-booking-apps-for-nail-techs-2026', 'how-to-choose-booking-app-nail-business', 'how-to-set-up-online-booking-nail-business', 'glossgenius-alternatives-nail-techs'],
  faq: [
    { q: 'When is the best time to switch booking software?', a: 'The least disruptive time is during a relatively quiet period — a gap between busy seasons (e.g. January after the Christmas rush, or late summer before autumn). Avoid switching during your busiest periods, the two weeks before Christmas, or if you have a large volume of future bookings that need to be migrated manually. Give yourself at least 2 weeks of overlap between platforms.' },
    { q: 'What happens to bookings already on my old platform?', a: 'Existing bookings on your old platform don\'t automatically transfer to the new one. You have two options: manually re-enter future bookings on the new platform, or continue using the old platform until those existing appointments pass and only use the new one for new bookings going forward. The latter is usually simpler.' },
    { q: 'Do I need to export my client list?', a: 'Yes — export your client list (name, contact details) from your current platform before your account closes. Most platforms provide a CSV export. Even if you don\'t import it immediately to the new platform, having a local backup means you won\'t lose contact with clients if access to the old system ends.' },
  ],
  relatedFeatureSlugs: ['bookings', 'deposits'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="before-you-switch">
        <h2 className="font-serif text-2xl font-bold mb-4">Before you switch</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Pick your new platform and test it fully — set it up, make a test booking, confirm the client experience, test reminders</li>
          <li>Note all existing future bookings on the old platform — you'll need to handle these manually</li>
          <li>Check any subscription end dates on your current platform</li>
          <li>Export your client list (CSV) from the current platform before you start the transition</li>
          <li>Choose a target switch date — ideally after a quiet period with few existing future bookings</li>
        </ul>
        <ArticleCallout variant="info" title="Don't close the old platform immediately">
          Keep access to your old booking platform for at least 4 weeks after switching. Clients with existing bookings may need to contact you through it, and you'll want to reference any booking history.
        </ArticleCallout>
      </section>

      <section id="client-data">
        <h2 className="font-serif text-2xl font-bold mb-4">Migrating client data</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Most booking platforms allow CSV client data export. Before leaving your current platform:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Export client name, phone, email, and any notes</li>
          <li>Check whether your new platform accepts CSV import — most do</li>
          <li>Import the client list to the new platform so returning clients don't need to re-enter all their information</li>
          <li>Note any VIP client notes or special requirements that won't transfer automatically</li>
        </ul>
        <ArticleTip>Even if your new platform doesn't import CSV, having the file means you won't lose contact with clients. You can reach out to your most important clients directly when announcing the switch.</ArticleTip>
      </section>

      <section id="setup-new">
        <h2 className="font-serif text-2xl font-bold mb-4">Setting up the new platform</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Complete full setup before announcing the switch:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Services, prices, and durations</li>
          <li>Working hours and blocked-out dates</li>
          <li>Deposit settings and cancellation policy</li>
          <li>Reminder settings</li>
          <li>Profile photo and description</li>
          <li>Payment setup tested and working</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Guide to setup: <Link to="/learn/how-to-set-up-online-booking-nail-business" className="underline text-[#F52B8C]">how to set up online booking for your nail business</Link>.</p>
      </section>

      <section id="communicating">
        <h2 className="font-serif text-2xl font-bold mb-4">Communicating the change to clients</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Tell clients before you switch — don't just change the link and let them figure it out:</p>
        <ArticleTable
          headers={['Channel', 'Message to send']}
          rows={[
            ['Instagram post or Story', '"I\'ve moved my bookings to [new platform] — same services, easier booking. New link is in my bio."'],
            ['Email or message to client list', '"Hi [name], I\'ve switched to a new booking system. You can now book at [new link]."'],
            ['Instagram bio update', 'Update your link in bio on the same day you announce the switch'],
            ['Website booking link', 'Update any embedded booking link or booking page URL on your website'],
          ]}
        />
      </section>

      <section id="cutover">
        <h2 className="font-serif text-2xl font-bold mb-4">The cutover process</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Stop accepting new bookings on the old platform (close availability or pause it)</li>
          <li>Open availability on the new platform</li>
          <li>Update all your links (Instagram bio, link in bio page, website)</li>
          <li>Post the announcement</li>
          <li>Monitor for any confusion — some clients will try to book via the old platform; redirect them</li>
        </ul>
      </section>

      <section id="after">
        <h2 className="font-serif text-2xl font-bold mb-4">After switching</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Check that reminders are working on the new platform (book a test appointment)</li>
          <li>Confirm deposits are processing correctly</li>
          <li>Keep the old platform account open for a month before closing</li>
          <li>Review after 30 days: is the new platform working as expected? Any client friction?</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
