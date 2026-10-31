import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'best-tools-running-nail-business',
  title: 'Best Tools for Running a Nail Business',
  seoTitle: 'Best Tools for Running a Nail Business (Software + Systems)',
  excerpt: 'The right tools reduce admin, protect your income, and free you to focus on your craft. Here are the tools that actually make a difference to how a nail business runs.',
  seoDescription: 'Best tools for running a nail business. Software, systems, and physical tools that make the business side of being a nail tech easier — booking, finance, admin, content.',
  category: 'booking-software',
  tags: ['nail business tools', 'tools for nail tech business', 'nail tech software', 'running a nail business'],
  heroImage: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
  heroImageAlt: 'Best tools for running a nail business',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'booking-tools', label: 'Booking and client management tools' },
    { id: 'payment-tools', label: 'Payment and finance tools' },
    { id: 'marketing-tools', label: 'Marketing and content tools' },
    { id: 'operational-tools', label: 'Operational tools' },
    { id: 'physical-tools', label: 'Physical tools for running your space' },
  ],
  relatedSlugs: ['best-business-apps-nail-techs', 'how-to-organize-nail-business-from-phone', 'nail-tech-starter-kit', 'nail-tech-expense-list'],
  faq: [
    { q: 'How much should a nail tech spend on business tools?', a: 'Most of the tools that matter for running a nail business have free or low-cost tiers. A booking app (free on many platforms), photo editing (free with Snapseed or Lightroom free tier), basic accounting (free with Wave or a spreadsheet), and social scheduling (free via Meta Business Suite) can all be run at zero or near-zero cost. The main paid tool nail techs typically invest in is booking software that collects deposits — and even that has free-subscription options.' },
    { q: 'Is there one tool that does everything for a nail tech?', a: 'No single tool covers everything well. The closest are comprehensive booking platforms (Fresha, Vagaro) that bundle booking, payments, and some marketing tools — but even those need supplementing with content creation tools, separate accounting software, and professional communication apps. A small stack of 4–6 focused tools typically works better than one complicated all-in-one.' },
  ],
  relatedFeatureSlugs: ['bookings', 'crm', 'analytics'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="booking-tools">
        <h2 className="font-serif text-2xl font-bold mb-4">Booking and client management tools</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your booking tool is the operational core. It should handle scheduling, deposits, reminders, and client records:</p>
        <ArticleTable
          headers={['Tool', 'What it does', 'Cost model']}
          rows={[
            ['Nelsy', 'Nail-tech specific booking, deposits, client notes', 'Direct booking model'],
            ['Fresha', 'Booking + marketplace + client management', 'Free subscription + marketplace commission'],
            ['Booksy', 'Booking + marketplace + client management', 'Monthly subscription'],
            ['Google Contacts / Notes', 'Basic client records if not using a dedicated CRM', 'Free'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For the full comparison: <Link to="/learn/best-booking-apps-for-nail-techs-2026" className="underline text-[#F52B8C]">best booking apps for nail techs</Link>.</p>
      </section>

      <section id="payment-tools">
        <h2 className="font-serif text-2xl font-bold mb-4">Payment and finance tools</h2>
        <ArticleTable
          headers={['Tool', 'Use case']}
          rows={[
            ['Your booking app\'s payment processing', 'Deposits and final payments through the booking flow'],
            ['SumUp / iZettle card reader', 'In-person card payments for mobile nail techs'],
            ['Square card reader', 'In-person payments; integrates with Square Appointments if using that'],
            ['Wave (free)', 'Bookkeeping, income/expense tracking, invoices'],
            ['QuickBooks / FreeAgent', 'More comprehensive self-employed accounting + tax support'],
          ]}
        />
      </section>

      <section id="marketing-tools">
        <h2 className="font-serif text-2xl font-bold mb-4">Marketing and content tools</h2>
        <ArticleTable
          headers={['Tool', 'Use case']}
          rows={[
            ['Instagram / TikTok', 'Primary content and booking channels for most nail techs'],
            ['Lightroom Mobile', 'Photo editing; presets for feed consistency'],
            ['CapCut', 'Video editing for Reels and TikToks'],
            ['Canva', 'Price list graphics, story templates, promotional posts'],
            ['Linktree / Beacons / Nelsy profile', 'Link in bio hub for bookings, prices, portfolio'],
          ]}
        />
      </section>

      <section id="operational-tools">
        <h2 className="font-serif text-2xl font-bold mb-4">Operational tools</h2>
        <ArticleTable
          headers={['Tool', 'Use case']}
          rows={[
            ['Google Drive', 'Policy documents, client consultation forms, price list PDFs'],
            ['Google Forms', 'Digital client consultation / intake forms'],
            ['WhatsApp Business', 'Professional client messaging with quick replies and away messages'],
            ['Google Sheets / Numbers', 'Income tracking, expense log, appointment record backup'],
            ['Notion', 'Business planning, SOPs, content calendar planning'],
          ]}
        />
      </section>

      <section id="physical-tools">
        <h2 className="font-serif text-2xl font-bold mb-4">Physical tools for running your space</h2>
        <ArticleTable
          headers={['Tool', 'What it improves']}
          rows={[
            ['Phone stand / tripod', 'Content creation — photos and video without assistance'],
            ['Ring light or window light reflector', 'Consistent lighting for content'],
            ['Card reader (SumUp, Square, iZettle)', 'In-person contactless payments for mobile or studio'],
            ['Label printer', 'Organise product supplies, client bags, custom aftercare packaging'],
            ['Cash float', 'For clients who prefer cash (still common in some markets)'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For the full list of physical nail tech equipment: <Link to="/learn/nail-tech-starter-kit" className="underline text-[#F52B8C]">nail tech starter kit</Link>. For managing everything from your phone: <Link to="/learn/how-to-organize-nail-business-from-phone" className="underline text-[#F52B8C]">how to organise your nail business from your phone</Link>.</p>
      </section>
    </div>
  ),
});
export {};
