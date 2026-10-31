import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'best-business-apps-nail-techs',
  title: 'Best Business Apps for Nail Techs',
  seoTitle: 'Best Business Apps for Nail Techs (Beyond Booking)',
  excerpt: 'Running a nail business means managing more than just bookings. Here are the business apps nail techs use for finances, photos, content, communication, and admin.',
  seoDescription: 'Best business apps for nail techs. Apps for finances, scheduling, photos, editing, social media, client communication, and running a nail business from your phone.',
  category: 'booking-software',
  tags: ['business apps nail techs', 'nail tech apps', 'nail business tools', 'apps for nail techs'],
  heroImage: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
  heroImageAlt: 'Best business apps for nail techs',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'booking-scheduling', label: 'Booking and scheduling' },
    { id: 'finance-apps', label: 'Finance and accounting apps' },
    { id: 'content-apps', label: 'Content creation and editing apps' },
    { id: 'communication-apps', label: 'Client communication apps' },
    { id: 'organisation-apps', label: 'Organisation and productivity' },
  ],
  relatedSlugs: ['best-tools-running-nail-business', 'how-to-organize-nail-business-from-phone', 'best-booking-apps-for-nail-techs-2026', 'nail-tech-expense-list'],
  faq: [
    { q: 'Do I need to pay for business apps as a nail tech?', a: 'Most nail techs can run their business efficiently with a mix of free and low-cost apps. The only app category where paying typically makes sense early is booking software (for deposit collection and professional booking pages). Photo editing, organisation, and basic finance tracking have strong free options. Invest in paid apps when a specific feature you need isn\'t available free.' },
    { q: 'What\'s the minimum number of apps a nail tech needs?', a: 'You can run a nail business with just two apps: a booking app and Instagram. Everything else adds efficiency but isn\'t essential. Most experienced nail techs end up with 4–6 apps they rely on regularly: booking, photo editing, accounting/income tracking, and a content planning tool.' },
  ],
  relatedFeatureSlugs: ['bookings', 'crm', 'analytics'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="booking-scheduling">
        <h2 className="font-serif text-2xl font-bold mb-4">Booking and scheduling</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your booking app is the most important business tool. It handles client scheduling, deposits, reminders, and (ideally) payments:</p>
        <ArticleTable
          headers={['App', 'Best for']}
          rows={[
            ['Nelsy', 'Nail-tech specific booking, deposits, client management'],
            ['Fresha', 'Free subscription + marketplace discovery'],
            ['Booksy', 'Client-side app quality; marketplace'],
            ['Google Calendar', 'Simple free scheduling alongside other tools'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">Full comparison: <Link to="/learn/best-booking-apps-for-nail-techs-2026" className="underline text-[#F52B8C]">best booking apps for nail techs</Link>.</p>
      </section>

      <section id="finance-apps">
        <h2 className="font-serif text-2xl font-bold mb-4">Finance and accounting apps</h2>
        <ArticleTable
          headers={['App', 'What it does', 'Cost']}
          rows={[
            ['Wave', 'Free accounting, invoicing, and income tracking', 'Free'],
            ['QuickBooks Self-Employed', 'Sole trader accounting, tax tracking, mileage', 'Paid'],
            ['FreeAgent', 'UK-focused; self-employed accounting, Self Assessment', 'Paid'],
            ['Spreadsheet (Google Sheets)', 'Manual income/expense tracking; fully customisable', 'Free'],
            ['Receipt Bank / Dext', 'Receipt scanning and expense categorisation', 'Paid'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">See the full expense list for what to track: <Link to="/learn/nail-tech-expense-list" className="underline text-[#F52B8C]">nail tech expense list</Link>.</p>
      </section>

      <section id="content-apps">
        <h2 className="font-serif text-2xl font-bold mb-4">Content creation and editing apps</h2>
        <ArticleTable
          headers={['App', 'What it does']}
          rows={[
            ['Lightroom Mobile', 'Best photo editing; presets for consistent editing; free tier available'],
            ['Snapseed', 'Free photo editing; selective adjustments; easy for beginners'],
            ['CapCut', 'Free video editing for Reels and TikTok; popular with nail techs'],
            ['Canva', 'Graphics for price lists, stories, announcements; free and paid'],
            ['Later / Meta Business Suite', 'Scheduling posts in advance; free options available'],
          ]}
        />
      </section>

      <section id="communication-apps">
        <h2 className="font-serif text-2xl font-bold mb-4">Client communication apps</h2>
        <ArticleTable
          headers={['App', 'Use case']}
          rows={[
            ['WhatsApp Business', 'Professional messaging; quick replies; away messages; free'],
            ['Gmail', 'Professional email address for client communication'],
            ['Your booking app\'s messaging', 'Centralised; stays in the booking context; most booking apps include this'],
          ]}
        />
      </section>

      <section id="organisation-apps">
        <h2 className="font-serif text-2xl font-bold mb-4">Organisation and productivity</h2>
        <ArticleTable
          headers={['App', 'Use case']}
          rows={[
            ['Google Drive', 'Store client cards, policy documents, price lists; accessible anywhere'],
            ['Notion', 'Business planning, templates, SOPs; free for personal use'],
            ['Notes (native)', 'Quick caption drafts, to-do lists, message templates'],
            ['Google Forms', 'Client consultation forms; free; links directly from booking confirmation'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For managing your whole business from your phone: <Link to="/learn/how-to-organize-nail-business-from-phone" className="underline text-[#F52B8C]">how to organise your nail business from your phone</Link>.</p>
      </section>
    </div>
  ),
});
export {};
