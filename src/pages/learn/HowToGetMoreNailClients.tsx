import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOMeta from '@/components/SEOMeta';
import Breadcrumb from '@/components/Breadcrumb';
import TableOfContents from '@/components/TableOfContents';
import SeoCTA from '@/components/SeoCTA';
import SiteNav from '@/components/layout/SiteNav';
import SiteFooter from '@/components/layout/SiteFooter';

const PINK = '#F52B8C';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.45, delay },
} as const);

const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Get More Nail Clients: A Practical Guide for Nail Techs',
    description: 'A practical guide to growing your nail tech client base — from Instagram and photography to booking friction, deposits, referrals and retention.',
    url: 'https://getnelsy.com/learn/how-to-get-more-nail-clients',
    datePublished: '2026-10-20',
    author: { '@type': 'Organization', name: 'Nelsy', url: 'https://getnelsy.com' },
    publisher: { '@type': 'Organization', name: 'Nelsy', url: 'https://getnelsy.com' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://getnelsy.com/' },
      { '@type': 'ListItem', position: 2, name: 'Learn', item: 'https://getnelsy.com/learn' },
      { '@type': 'ListItem', position: 3, name: 'How to Get More Nail Clients', item: 'https://getnelsy.com/learn/how-to-get-more-nail-clients' },
    ],
  },
];

const TOC = [
  { id: 'instagram-profile', label: 'Optimise your Instagram profile' },
  { id: 'nail-photography', label: 'Nail photography that converts' },
  { id: 'content', label: 'Content strategy' },
  { id: 'booking-friction', label: 'Reduce booking friction' },
  { id: 'deposits', label: 'Use deposits to protect your calendar' },
  { id: 'referrals', label: 'Build a referral system' },
  { id: 'rebooking', label: 'Rebook at every appointment' },
  { id: 'retention', label: 'Client retention and experience' },
  { id: 'reviews', label: 'Reviews and local discovery' },
  { id: 'pricing', label: 'Pricing clarity attracts serious clients' },
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="scroll-mt-20">
      <motion.div {...fadeUp()}>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">{title}</h2>
        <div className="space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-4 border-l-4 bg-pink-50 border-pink-200 text-sm text-pink-900 leading-relaxed">
      <span className="font-bold">Tip: </span>{children}
    </div>
  );
}

export default function HowToGetMoreNailClients() {
  useEffect(() => {
    document.dispatchEvent(new Event('render-complete'));
  }, []);

  return (
    <div className="font-sans min-h-screen bg-white antialiased">
      <SEOMeta
        title="How to Get More Nail Clients: A Practical Guide for Nail Techs | Nelsy"
        description="Practical strategies to grow your nail tech client base — Instagram, photography, booking friction, deposits, referrals, retention and more. Written specifically for nail techs."
        canonical="/learn/how-to-get-more-nail-clients"
        jsonLd={JSON_LD}
      />
      <SiteNav />
      <div style={{ paddingTop: 56 }}>
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Learn' },
          { label: 'How to Get More Nail Clients' },
        ]} />

        {/* ── Hero ── */}
        <section style={{ background: 'linear-gradient(135deg, #FFF7FA 0%, #FFFFFF 60%)' }} className="px-4 pt-10 pb-12">
          <div className="max-w-3xl mx-auto">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', color: PINK, marginBottom: 12, textTransform: 'uppercase' }}>
              NAIL TECH BUSINESS GUIDE
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
              style={{ fontSize: 'clamp(1.9rem, 5.5vw, 3rem)', fontWeight: 900, color: '#0D0D0D', lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: 16 }}>
              How to Get More Nail Clients
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
              className="text-base sm:text-lg text-gray-500 leading-relaxed mb-4">
              Growing a nail business isn't one thing — it's a combination of visibility, first impressions, how easy you are to book, how well you retain the clients you have, and how your existing clients talk about you to others.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
              className="text-sm text-gray-400">
              Written for independent nail techs · Updated October 2026
            </motion.p>
          </div>
        </section>

        {/* ── Content ── */}
        <section className="py-10 px-4">
          <div className="max-w-3xl mx-auto space-y-14">

            <TableOfContents items={TOC} />

            <Section id="instagram-profile" title="1. Optimise your Instagram profile">
              <p>
                Most independent nail techs get the majority of their new clients from Instagram. Your profile is the first thing potential clients see — and it does a lot of work in the few seconds someone spends deciding whether to follow or book.
              </p>
              <p>A strong nail tech Instagram profile has:</p>
              <ul className="space-y-2 mt-2">
                {[
                  'A clear, readable username — ideally your name or business name, not a generic phrase',
                  'Your specialty in the bio: "Press-on sets · gel · nail art · [City]" is more useful than "nail lover ✨"',
                  'Your city or location (or service area) — people search locally',
                  'A booking link — your Nelsy page, not a long URL that breaks or a generic Linktree',
                  'A profile photo that shows your face or your work, not a logo',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="flex-shrink-0 w-4 h-4 rounded-full text-white text-xs font-bold flex items-center justify-center mt-0.5" style={{ backgroundColor: PINK }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Tip>
                When someone visits your profile and clicks your booking link, they should land on a page that shows your services, prices and availability — so they can book in the same session. If your link goes somewhere confusing, most people drop off.
              </Tip>
            </Section>

            <Section id="nail-photography" title="2. Nail photography that converts">
              <p>
                Your Instagram photos are your portfolio and your storefront. The difference between a photo that gets a DM and one that gets ignored is usually lighting, background and angle — not the quality of the nails themselves.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: 'Light', detail: 'Natural light is best — shoot near a window. Avoid overhead indoor lighting, which creates yellow tones and washes out detail. The best time is mid-morning.' },
                  { label: 'Background', detail: 'Plain backgrounds (white, beige, grey marble) keep the focus on the nails. Busy backgrounds compete for attention and look less professional.' },
                  { label: 'Angle', detail: 'Flat lay (nails face-up from above) and the classic angled hand shot are both proven. Try both for each set and see which performs better for your style.' },
                  { label: 'Consistency', detail: 'You don\'t need a new background for every post, but your feed should feel cohesive. Clients often scroll your grid before booking — they\'re assessing your range and aesthetic.' },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <p className="font-semibold text-gray-900 text-sm mb-1">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.detail}</p>
                  </div>
                ))}
              </div>
              <Tip>
                Photo reels of the nail art process — from prep to finished set — consistently outperform static photos on reach. You don't need a ring light or a video setup. A phone propped against a product bottle works.
              </Tip>
            </Section>

            <Section id="content" title="3. Content strategy">
              <p>
                Nail techs who consistently grow their following post a mix of content types, not just finished sets. The finished photo is what showcases your work. Process content, before-and-after, and educational posts are what build trust and a following.
              </p>
              <p>A rough mix that works for many nail techs:</p>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="min-w-[400px] sm:min-w-0 px-4 sm:px-0">
                  <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Content type</th>
                        <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Goal</th>
                        <th className="text-left px-4 py-2.5 font-semibold text-gray-700">Frequency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Finished sets', 'Showcase work, attract new clients', '3–5×/week'],
                        ['Process reels', 'Reach, algorithm, trust', '1–2×/week'],
                        ['Before and after', 'Transformation, credibility', 'As available'],
                        ['Client inspo + outcome', 'Relatability, saves', '1×/week'],
                        ['Pricing/availability posts', 'Drive bookings', 'When relevant'],
                        ['Educational (e.g., nail care tips)', 'Saves, authority', 'Occasional'],
                      ].map(([type, goal, freq], i) => (
                        <tr key={i} className={`border-t border-gray-100 ${i % 2 === 1 ? 'bg-gray-50/40' : ''}`}>
                          <td className="px-4 py-3 font-medium text-gray-800">{type}</td>
                          <td className="px-4 py-3 text-gray-500">{goal}</td>
                          <td className="px-4 py-3 text-gray-500">{freq}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <p>
                Consistency matters more than volume. Posting three times a week every week outperforms posting ten times in one week and going quiet for three.
              </p>
            </Section>

            <Section id="booking-friction" title="4. Reduce booking friction">
              <p>
                Booking friction is anything that makes it harder for a potential client to go from "I want to book" to "I'm booked." Every extra step loses some percentage of people.
              </p>
              <p>The highest-friction booking experience: client sees your nail post → sends a DM → waits for a reply → back-and-forth on times → you share your Venmo → they pay… or don't. That process can take days and falls apart at multiple points.</p>
              <p>The lowest-friction booking experience: client sees your nail post → taps your bio link → sees your services and prices → picks a time → pays a deposit → done.</p>
              <p>The practical steps to reduce friction:</p>
              <ul className="space-y-2.5">
                {[
                  'Add your booking link to your Instagram bio — not a Linktree, not a DM request, your actual booking page',
                  'Show your prices on your booking page. Clients who see prices and still book are serious. Hiding prices creates DMs from people who aren\'t going to book.',
                  'Show your real availability. Let clients self-schedule without asking you first.',
                  'Require a deposit at the time of booking. This is a filter, not a barrier — serious clients won\'t balk at a fair deposit.',
                  'Confirm bookings automatically. Clients shouldn\'t have to wonder if their booking went through.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="flex-shrink-0 mt-1" style={{ color: PINK }}>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="rounded-xl p-5 border border-gray-200 bg-white">
                <p className="text-sm font-semibold text-gray-900 mb-2">What this looks like with Nelsy</p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Your Nelsy booking page lives at your own URL. Add it to your Instagram bio. Clients click, see your services and prices, pick a time, and pay a deposit — all without you being involved. The booking shows up in your calendar only after the deposit is confirmed.
                </p>
                <Link to="/" className="inline-block mt-3 text-sm font-bold underline underline-offset-2" style={{ color: PINK }}>
                  Learn more about Nelsy →
                </Link>
              </div>
            </Section>

            <Section id="deposits" title="5. Use deposits to protect your calendar">
              <p>
                A fully booked calendar means nothing if clients no-show or cancel last minute. No-shows don't just cost you the service income — they cost you the slot you could have sold to someone else.
              </p>
              <p>
                Requiring a deposit before confirming any booking is the single most effective way to reduce no-shows. A client who has paid $20–$50 to hold a slot is almost always going to show up or give you advance notice.
              </p>
              <p>
                The psychological shift matters: when booking is free, cancelling feels like nothing. When a deposit is involved, clients weigh the decision more seriously.
              </p>
              <Tip>
                Most nail techs who start requiring deposits see no-show rates drop significantly. The clients who push back or disappear when you ask for a deposit are often the same clients who would have no-showed anyway.
              </Tip>
              <Link to="/nail-tech-deposits" className="inline-flex items-center gap-1.5 text-sm font-bold underline underline-offset-2 mt-2" style={{ color: PINK }}>
                How to set up deposit collection for nail techs →
              </Link>
            </Section>

            <Section id="referrals" title="6. Build a referral system">
              <p>
                Referrals from existing clients are the lowest-cost source of new clients, and referred clients tend to be more loyal and easier to work with. But most nail techs leave referrals to chance instead of making them systematic.
              </p>
              <p>A simple referral approach:</p>
              <ul className="space-y-2.5">
                {[
                  'Ask directly at the end of a great appointment: "If you know anyone who\'d love this, send them my way. Here\'s my booking link."',
                  'Offer a small incentive — a discount on their next service when their referred friend books. Keep it simple.',
                  'Make sharing easy: your booking link should be a clean URL that looks trustworthy when a client texts it to a friend.',
                  'Thank clients when referrals come through — a simple message or small acknowledgement goes a long way.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="flex-shrink-0 mt-1" style={{ color: PINK }}>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="rebooking" title="7. Rebook at every appointment">
              <p>
                The easiest client to book is the one sitting in front of you. Before they leave, show them their next available slot. "Do you want to rebook before your gels grow out? I have [date] available."
              </p>
              <p>
                Many clients will say yes if you make it effortless. They're already happy with their nails, they already trust you — asking for the rebooking while they're there is much more effective than hoping they remember to book in three weeks when their nails are growing out.
              </p>
              <p>
                Having a booking page they can come back to independently also helps. If life gets in the way and they don't rebook at the appointment, your link in their DMs or their browser history means they can book themselves when the time comes.
              </p>
            </Section>

            <Section id="retention" title="8. Client retention and experience">
              <p>
                Keeping a client is significantly cheaper than acquiring a new one. Retention comes down to the experience: how clients feel during and after the appointment, how you communicate, and how easy it is to come back.
              </p>
              <div className="space-y-3">
                {[
                  { title: 'First appointment experience', detail: 'New clients are always evaluating whether they\'ll come back. Ask about their nail history, nail concerns and lifestyle (how hard they are on their hands, whether they do manual work). It shows you\'re thinking about their nails specifically, not just applying product.' },
                  { title: 'Aftercare advice', detail: 'Telling clients how to care for their nails between appointments is both good practice and a retention tool. Clients whose nails hold up longer credit their nail tech.' },
                  { title: 'Consistent communication', detail: 'Send booking confirmations. If you need to reschedule, give as much notice as possible. Small acts of reliability build the kind of relationship where clients don\'t leave.' },
                  { title: 'Remember details', detail: 'A simple note in your client record — their job, their upcoming events, what they said they wanted to try next — makes return appointments feel personal.' },
                ].map((item) => (
                  <div key={item.title} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                    <p className="font-semibold text-gray-900 text-sm mb-1">{item.title}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="reviews" title="9. Reviews and local discovery">
              <p>
                Google reviews, Yelp and Facebook are how clients find nail techs when they search locally rather than through Instagram. If you're a nail tech who works from home, a suite or a chair, these platforms matter for clients who aren't already following you on social.
              </p>
              <ul className="space-y-2.5">
                {[
                  'Set up or claim your Google Business Profile and add your booking link, services and photos',
                  'Ask satisfied clients to leave a Google review — a specific ask ("would you mind leaving a review on Google? It really helps") works better than a generic request',
                  'Respond to reviews, including negative ones, professionally. Future clients read your responses.',
                  'Keep your profile information current: hours, prices and booking link change over time',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="flex-shrink-0 mt-1" style={{ color: PINK }}>→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section id="pricing" title="10. Pricing clarity attracts serious clients">
              <p>
                Hiding your prices doesn't protect you from clients who think you're too expensive — it just moves the conversation to DMs, where it often dies. Nail techs who display prices clearly attract clients who are already comfortable with their rates.
              </p>
              <p>
                Unclear pricing creates friction at multiple points: in DMs, in the booking process, and at the end of the appointment when the total feels unexpected.
              </p>
              <p>
                Practical pricing clarity means: showing each service with its price and duration, being upfront about add-on costs (nail art, length changes, repairs), and having a consistent approach to same-day add-ons.
              </p>
              <Link to="/learn/nail-tech-pricing-guide" className="inline-flex items-center gap-1.5 text-sm font-bold underline underline-offset-2" style={{ color: PINK }}>
                Read the nail tech pricing guide →
              </Link>
            </Section>

          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-14 sm:py-20 text-white px-4 text-center"
          style={{ background: `linear-gradient(to bottom right, ${PINK}, #9333EA)` }}>
          <div className="max-w-2xl mx-auto">
            <motion.h2 {...fadeUp()} className="text-3xl sm:text-4xl font-bold mb-4">
              Turn your Instagram into bookings.
            </motion.h2>
            <motion.p {...fadeUp(0.06)} className="text-base sm:text-lg text-white/80 mb-8 max-w-lg mx-auto">
              Nelsy gives you a booking page to link from your bio, deposit collection to stop no-shows, and online payments — everything in one place.
            </motion.p>
            <motion.div {...fadeUp(0.12)}>
              <SeoCTA label="Start your 14-day free trial →" position="footer_cta" variant="primary-dark" />
            </motion.div>
            <motion.p {...fadeUp(0.18)} className="mt-5 text-xs text-white/60">
              $0 today · Cancel anytime · 0% Nelsy booking commission
            </motion.p>
          </div>
        </section>

        {/* ── Related ── */}
        <section className="py-10 px-4 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">RELATED GUIDES</p>
            <div className="flex flex-wrap gap-3">
              {[
                { to: '/instagram-booking-for-nail-techs', label: 'Instagram Booking for Nail Techs' },
                { to: '/nail-tech-deposits', label: 'How to Collect Deposits' },
                { to: '/learn/nail-tech-pricing-guide', label: 'Nail Tech Pricing Guide' },
                { to: '/best-booking-app-for-nail-techs', label: 'Best Booking App for Nail Techs' },
              ].map((link, i) => (
                <>
                  {i > 0 && <span key={`dot-${i}`} className="text-gray-300">·</span>}
                  <Link key={link.to} to={link.to} className="text-sm font-medium text-gray-600 hover:text-gray-900 underline underline-offset-2">
                    {link.label}
                  </Link>
                </>
              ))}
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </div>
  );
}
