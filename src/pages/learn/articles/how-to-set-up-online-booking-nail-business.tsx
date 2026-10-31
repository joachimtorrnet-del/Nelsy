import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-set-up-online-booking-nail-business',
  title: 'How to Set Up Online Booking for Your Nail Business',
  seoTitle: 'How to Set Up Online Booking for Your Nail Business',
  excerpt: 'Setting up online booking is one of the most impactful things you can do for your nail business. Here\'s how to do it in a few hours — from choosing a platform to your first booking.',
  seoDescription: 'How to set up online booking for your nail business. Step-by-step guide to getting your nail booking page live — platform choice, services setup, deposits, and sharing your link.',
  category: 'booking-software',
  tags: ['set up online booking nail tech', 'nail tech booking page setup', 'how to set up nail booking'],
  heroImage: 'linear-gradient(135deg, #FFF0F6 0%, #FCE4F5 100%)',
  heroImageAlt: 'How to set up online booking for your nail business',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'choose-platform', label: 'Step 1: Choose your platform' },
    { id: 'setup-profile', label: 'Step 2: Set up your profile' },
    { id: 'setup-services', label: 'Step 3: Add your services' },
    { id: 'setup-availability', label: 'Step 4: Set your availability' },
    { id: 'setup-deposits', label: 'Step 5: Configure deposits and policies' },
    { id: 'launch', label: 'Step 6: Launch and share your link' },
  ],
  relatedSlugs: ['how-online-booking-works-nail-techs', 'best-booking-apps-for-nail-techs-2026', 'nail-tech-deposit-policy', 'how-to-move-from-instagram-dms-to-online-booking'],
  faq: [
    { q: 'How long does it take to set up online booking?', a: 'Most nail techs can set up a complete booking page in 2–4 hours: 30 minutes choosing and signing up for a platform, 30–60 minutes setting up services and availability, 30 minutes configuring deposits and policies, and 30 minutes on the profile. Allow extra time for testing the client experience and setting up payment.' },
    { q: 'Should I set up online booking before or after I have clients?', a: 'Before — even if you have zero clients, launching with online booking from the start is much easier than migrating clients from DM booking later. Share your booking link in your first Instagram post about your nail business.' },
    { q: 'What if clients still want to book through Instagram DMs?', a: 'It\'s fine to respond to DM enquiries and direct them to your booking link. Over time, as clients get used to the system, fewer will try to book through DMs. Consistently directing all bookings to your link trains clients to use it.' },
  ],
  relatedFeatureSlugs: ['bookings', 'deposits', 'payments'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="choose-platform">
        <h2 className="font-serif text-2xl font-bold mb-4">Step 1: Choose your platform</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Your platform choice determines your features, cost, and client experience. Key decision factors:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Do you want marketplace discovery?</strong> Fresha and Booksy have marketplaces; Nelsy and GlossGenius are direct booking only</li>
          <li><strong>What country are you in?</strong> GlossGenius is US-only; Fresha and Booksy have international presence</li>
          <li><strong>What's your budget?</strong> Fresha is free subscription; Booksy and GlossGenius require monthly payment</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Full comparison: <Link to="/learn/best-booking-apps-for-nail-techs-2026" className="underline text-[#F52B8C]">best booking apps for nail techs</Link>.</p>
      </section>

      <section id="setup-profile">
        <h2 className="font-serif text-2xl font-bold mb-4">Step 2: Set up your profile</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Profile photo:</strong> A clear, professional photo of your work (not just a face photo)</li>
          <li><strong>Business name:</strong> Your trading name, exactly as it appears everywhere else</li>
          <li><strong>Location:</strong> Your salon address, or for home/mobile techs: your area with exact address sent to confirmed clients only</li>
          <li><strong>Description:</strong> 2–3 sentences on who you serve, your specialty, and your booking approach</li>
          <li><strong>Portfolio photos:</strong> Add your best nail sets — this is what converts profile views to bookings</li>
        </ul>
      </section>

      <section id="setup-services">
        <h2 className="font-serif text-2xl font-bold mb-4">Step 3: Add your services</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">For each service you offer:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Clear service name (as you'd say it to a client)</li>
          <li>Price (match exactly what you charge)</li>
          <li>Duration — be accurate; allow buffer for cleaning between clients</li>
          <li>Short description if needed (e.g. what's included, what's not)</li>
        </ul>
        <ArticleTip>Keep your service menu concise — 8–12 services is enough to start. Too many options overwhelm clients. You can add more later.</ArticleTip>
      </section>

      <section id="setup-availability">
        <h2 className="font-serif text-2xl font-bold mb-4">Step 4: Set your availability</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Set your standard working days and hours</li>
          <li>Add buffer time between appointments (cleaning and setup time)</li>
          <li>Block any known dates off in advance (holidays, training days)</li>
          <li>Set your booking window — how far in advance clients can book (e.g. up to 8 weeks)</li>
          <li>Set minimum notice — how far in advance clients must book (e.g. at least 24 hours)</li>
        </ul>
      </section>

      <section id="setup-deposits">
        <h2 className="font-serif text-2xl font-bold mb-4">Step 5: Configure deposits and policies</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Turn on deposit collection — this is one of the most impactful steps for reducing no-shows:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Set deposit amount (20–50% of service price, or a flat fee)</li>
          <li>Set your cancellation window (e.g. deposit non-refundable if cancelling within 48 hours)</li>
          <li>Add your policies to the booking page description or in the platform's policy field</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Deposit policy guide: <Link to="/learn/nail-tech-deposit-policy" className="underline text-[#F52B8C]">nail tech deposit policy</Link>.</p>
      </section>

      <section id="launch">
        <h2 className="font-serif text-2xl font-bold mb-4">Step 6: Launch and share your link</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Before going live — test the full booking flow yourself as a client. Make a test booking, pay a deposit, check the confirmation and reminder. Fix anything that looks wrong.</p>
        <p className="text-gray-700 mb-4 leading-relaxed">Then share your booking link:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Instagram bio link</li>
          <li>Link in bio page</li>
          <li>Instagram post announcing it's live</li>
          <li>Anywhere else you promote your nail business</li>
        </ul>
        <ArticleCallout variant="info" title="Tell existing clients">
          If you have existing clients who book via DMs, send them a message with your new booking link. "I've set up online booking — you can now book and pay your deposit directly at [link]." Most clients appreciate the simplicity.
        </ArticleCallout>
      </section>
    </div>
  ),
});
export {};
