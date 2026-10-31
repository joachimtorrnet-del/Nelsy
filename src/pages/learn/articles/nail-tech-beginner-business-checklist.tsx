import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleChecklist, ArticleCallout } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-beginner-business-checklist',
  title: 'Nail Tech Beginner Business Checklist',
  seoTitle: 'Nail Tech Beginner Business Checklist (Everything You Need)',
  excerpt: 'A complete checklist for new nail techs starting their business — covering training, insurance, equipment, booking, marketing, and first clients.',
  seoDescription: 'Nail tech beginner business checklist. Everything you need to do before, during, and after launching your nail business — from insurance to Instagram.',
  category: 'start-your-business',
  tags: ['nail business checklist', 'beginner nail tech', 'starting nail business', 'nail tech setup'],
  heroImage: 'linear-gradient(135deg, #FFFBEB 0%, #FDE68A 100%)',
  heroImageAlt: 'Nail tech beginner business checklist',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'before-taking-clients', label: 'Before taking any clients' },
    { id: 'equipment-setup', label: 'Equipment and setup' },
    { id: 'booking-admin', label: 'Booking and admin' },
    { id: 'instagram-marketing', label: 'Instagram and marketing' },
    { id: 'first-month', label: 'First month milestones' },
    { id: 'ongoing', label: 'Ongoing habits' },
  ],
  relatedSlugs: ['how-to-start-a-nail-business-2026', 'nail-tech-starter-kit', 'nail-tech-beginner-mistakes', 'best-booking-apps-for-nail-techs-2026'],
  faq: [
    { q: 'What do I need to do first when starting a nail business?', a: 'Training and insurance, in that order. Training gives you the skills and credibility; insurance protects you before you take a single paying client. Everything else (equipment, Instagram, booking page) can follow.' },
    { q: 'How do I register a nail business in the UK?', a: 'Most new nail techs register as self-employed sole traders with HMRC — this is the simplest structure. Do it online via the HMRC website before you start earning. You don\'t need to register a company unless you want to trade as a limited company (more complex, more protection, more admin).' },
    { q: 'Do I need a website to start a nail business?', a: 'No. Instagram + a booking page covers everything you need to start. A website can come later once you\'re established. Don\'t let website-building become a procrastination tool that delays you taking clients.' },
  ],
  relatedFeatureSlugs: ['bookings', 'crm', 'payments'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <p className="text-gray-700 leading-relaxed text-lg">Use this checklist to track your launch. Don't try to complete everything before you start taking clients — the goal is to get the essential items done first, then build from there.</p>

      <section id="before-taking-clients">
        <h2 className="font-serif text-2xl font-bold mb-4">Before taking any clients</h2>
        <ArticleChecklist title="Non-negotiables before day one" items={[
          'Complete a recognised nail technology qualification (VTCT Level 3 or equivalent)',
          'Purchase treatment liability and public liability insurance',
          'Register as self-employed with HMRC',
          'Open a business bank account (or dedicated personal account for business)',
          'Write and save your cancellation/deposit policy',
          'Do 5–10 practice/model sets to build your portfolio',
          'Photograph every practice set — clean, well-lit',
        ]} />
      </section>

      <section id="equipment-setup">
        <h2 className="font-serif text-2xl font-bold mb-4">Equipment and setup</h2>
        <ArticleChecklist title="Equipment essentials" items={[
          'UV/LED lamp (compatible with your product system)',
          'Nail drill (if doing extensions or gel)',
          'Files and buffers (multiple grits)',
          'Cuticle tools (pusher, nippers)',
          'Gel products: base, colour, top coat, builder gel',
          'Primer and dehydrator',
          'Nail brush (for dust removal)',
          'Disposable files/buffers (for hygiene per client)',
          'Nail desk or table at correct working height',
          'Client chair or arm rest',
          'Ring light',
          'Ventilation (fan or open window)',
        ]} />
        <p className="text-gray-700 mt-4 leading-relaxed">Full equipment list: <Link to="/learn/nail-tech-starter-kit" className="underline text-[#F52B8C]">nail tech starter kit — what you actually need</Link>.</p>
      </section>

      <section id="booking-admin">
        <h2 className="font-serif text-2xl font-bold mb-4">Booking and admin</h2>
        <ArticleChecklist title="Booking setup" items={[
          'Choose and set up a booking platform',
          'Create your service menu with accurate prices and durations',
          'Set a deposit amount and configure automatic collection',
          'Write and add your cancellation policy to the booking page',
          'Customise your confirmation message (include location, what to bring)',
          'Set up 24-hour automatic reminders',
          'Test the full booking flow on your phone as a client',
          'Get your shareable booking link ready',
        ]} />
        <p className="text-gray-700 mt-4 leading-relaxed">See: <Link to="/learn/best-booking-apps-for-nail-techs-2026" className="underline text-[#F52B8C]">best booking apps for nail techs</Link>.</p>
      </section>

      <section id="instagram-marketing">
        <h2 className="font-serif text-2xl font-bold mb-4">Instagram and marketing</h2>
        <ArticleChecklist title="Instagram launch checklist" items={[
          'Create a dedicated nail Instagram account (separate from personal)',
          'Switch to Professional/Creator account for Insights',
          'Name field: "Your Name | Nail Tech [City]"',
          'Bio: what you do, where you\'re based, how to book',
          'Bio link: direct to your booking page',
          'Post 10+ portfolio photos from your model sets',
          'Add location tags to all posts',
          'Create Highlights: Portfolio, Pricing, How to Book',
          'Post your first availability announcement',
        ]} />
      </section>

      <section id="first-month">
        <h2 className="font-serif text-2xl font-bold mb-4">First month milestones</h2>
        <ArticleChecklist title="Month 1 targets" items={[
          'Complete first 5 paying client appointments',
          'Ask every client for a referral or social tag',
          'Post at least 3x per week to Instagram',
          'Get your first rebook (client books return appointment)',
          'Review your prices — are they covering costs?',
          'Troubleshoot anything that went wrong (lifting, slow booking flow, late clients)',
        ]} />
        <ArticleCallout variant="tip" title="Expect imperfection in month one">
          Your first month will have problems. Nails that lifted, clients who cancelled last minute, photos that didn't come out. This is normal. The goal is to learn quickly, fix the process, and not let it stop you posting and booking.
        </ArticleCallout>
      </section>

      <section id="ongoing">
        <h2 className="font-serif text-2xl font-bold mb-4">Ongoing habits</h2>
        <ArticleChecklist title="Habits that build a strong nail business" items={[
          'Post to Instagram 3–5x per week consistently',
          'Prompt every client to rebook before they leave',
          'Ask for referrals at every appointment',
          'Review prices every 6–12 months',
          'Track income and costs monthly',
          'Continue training — at least one course per year',
          'Photograph every set you\'re proud of',
          'Review and update your cancellation policy if issues arise',
        ]} />
        <p className="text-gray-700 mt-4 leading-relaxed">See also: <Link to="/learn/nail-tech-beginner-mistakes" className="underline text-[#F52B8C]">nail tech beginner mistakes to avoid</Link> and <Link to="/learn/how-to-get-first-10-nail-clients" className="underline text-[#F52B8C]">how to get your first 10 nail clients</Link>.</p>
      </section>
    </div>
  ),
});
export {};
