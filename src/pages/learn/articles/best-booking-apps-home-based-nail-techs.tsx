import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'best-booking-apps-home-based-nail-techs',
  title: 'Best Booking Apps for Home-Based Nail Techs',
  seoTitle: 'Best Booking Apps for Home-Based Nail Techs',
  excerpt: 'Working from home means managing your own bookings, deposits, and client communication without a front desk. Here are the best booking apps for home-based nail techs.',
  seoDescription: 'Best booking apps for home-based nail techs. What home-based nail techs specifically need from booking software, and which platforms suit the home-salon setup.',
  category: 'booking-software',
  tags: ['booking apps home based nail tech', 'home nail salon booking', 'nail tech booking software home'],
  heroImage: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
  heroImageAlt: 'Best booking apps for home-based nail techs',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'what-home-based-needs', label: 'What home-based nail techs need differently' },
    { id: 'top-picks', label: 'Top platform picks' },
    { id: 'deposit-priority', label: 'Why deposits matter more at home' },
    { id: 'privacy', label: 'Privacy considerations' },
  ],
  relatedSlugs: ['best-booking-apps-for-nail-techs-2026', 'how-to-start-nail-business-from-home', 'nail-tech-deposit-policy', 'how-to-set-up-online-booking-nail-business'],
  faq: [
    { q: 'Do I need to share my home address on a booking app?', a: 'Not necessarily. Many booking platforms allow you to display a general area (neighbourhood, town) rather than a full address, with the exact address sent only to confirmed clients. Check your platform\'s privacy settings. For home-based nail techs, it\'s sensible practice to share your full address only with confirmed bookings rather than making it publicly visible.' },
    { q: 'Should home-based nail techs require deposits?', a: 'Yes — deposits are especially important for home-based nail techs. No-shows at a home nail business affect your personal time and space. A deposit creates commitment and provides financial cover if a client cancels late or doesn\'t show. Most home-based nail techs charge 20–50% deposit at booking.' },
  ],
  relatedFeatureSlugs: ['bookings', 'deposits'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-home-based-needs">
        <h2 className="font-serif text-2xl font-bold mb-4">What home-based nail techs need differently</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Home-based nail techs have specific needs that differ from salon-based techs:</p>
        <ArticleTable
          headers={['Need', 'Why it matters for home-based techs']}
          rows={[
            ['Deposit collection at booking', 'No-shows at home affect your personal time and space more directly than at a commercial salon'],
            ['Address privacy controls', 'Share your address only with confirmed clients, not publicly on a marketplace'],
            ['Simple, solo setup', 'No need for multi-staff scheduling; solo-tech focus keeps it clean'],
            ['Mobile management', 'You\'re running everything yourself from your phone — the app needs to be easy to use on mobile'],
            ['Automatic reminders', 'Reduces no-shows; you don\'t have a receptionist to follow up manually'],
            ['Waitlist management', 'Home studios often have limited slots; waitlist fills gaps from cancellations'],
          ]}
        />
      </section>

      <section id="top-picks">
        <h2 className="font-serif text-2xl font-bold mb-4">Top platform picks for home-based nail techs</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Nelsy</strong> — Built for nail techs, including home-based. Booking page with deposits, client management, and no marketplace exposure of your address. <Link to="/" className="underline text-[#F52B8C]">See how Nelsy works →</Link></p>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Fresha</strong> — Free subscription; strong globally. Privacy settings allow area-level display rather than full address on the marketplace. Good for home-based techs who want new client discovery without broadcasting their home location publicly.</p>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>GlossGenius (US)</strong> — Clean, simple booking experience for solo techs. Not a marketplace, so no address exposed publicly. US only.</p>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Booksy</strong> — Marketplace with privacy options; strong automated reminders. Subscription required.</p>
        <ArticleTip>For home-based nail techs, the most critical booking app feature isn't aesthetics or reporting — it's deposit collection and automatic reminders. Prioritise those over any other feature.</ArticleTip>
      </section>

      <section id="deposit-priority">
        <h2 className="font-serif text-2xl font-bold mb-4">Why deposits matter more at home</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A no-show at a commercial salon means a lost revenue slot. A no-show at your home means the same lost revenue, plus you've given a stranger your home address and prepared your personal space for a client who didn't arrive.</p>
        <p className="text-gray-700 leading-relaxed">Deposits create commitment. A client who's paid a £20 deposit to secure a slot is far more likely to show up or give you advance notice than one who booked with no financial commitment. Choose a platform that makes deposit collection easy and mandatory at the point of booking, not optional.</p>
        <p className="text-gray-700 mt-4 leading-relaxed">Deposit policy guidance: <Link to="/learn/nail-tech-deposit-policy" className="underline text-[#F52B8C]">nail tech deposit policy</Link>.</p>
      </section>

      <section id="privacy">
        <h2 className="font-serif text-2xl font-bold mb-4">Privacy considerations for home-based nail techs</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Check marketplace visibility settings before listing — most platforms let you control what appears publicly</li>
          <li>Only confirm your address to clients after deposit payment is received</li>
          <li>Consider using a general area description ("South London", "Manchester city centre") as your public location</li>
          <li>Use the booking app's messaging to confirm address details on the day before the appointment, not at booking</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
