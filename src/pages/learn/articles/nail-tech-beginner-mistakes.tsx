import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-beginner-mistakes',
  title: 'Nail Tech Beginner Mistakes to Avoid',
  seoTitle: 'Nail Tech Beginner Mistakes to Avoid (And How to Fix Them)',
  excerpt: 'Every nail tech makes mistakes when starting out. Here are the most common ones — and exactly what to do differently.',
  seoDescription: 'Common nail tech beginner mistakes: undercharging, no deposit policy, poor portfolio photos, inconsistent posting, and 15 more mistakes to avoid.',
  category: 'start-your-business',
  tags: ['beginner nail tech', 'nail tech mistakes', 'starting nail business', 'nail tech advice'],
  heroImage: 'linear-gradient(135deg, #FDF4FF 0%, #E879F9 50%, #C084FC 100%)',
  heroImageAlt: 'Nail tech beginner mistakes to avoid',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-20',
  toc: [
    { id: 'pricing-mistakes', label: 'Pricing mistakes' },
    { id: 'booking-mistakes', label: 'Booking and admin mistakes' },
    { id: 'instagram-mistakes', label: 'Instagram mistakes' },
    { id: 'client-management-mistakes', label: 'Client management mistakes' },
    { id: 'business-mistakes', label: 'Business mistakes' },
  ],
  relatedSlugs: ['how-to-get-first-10-nail-clients', 'how-much-should-nail-tech-charge', 'nail-tech-deposit-policy'],
  faq: [
    { q: 'What is the biggest mistake new nail techs make?', a: 'Undercharging for too long. New nail techs often set prices very low to attract clients and then struggle to raise them. It\'s better to start at a fair price (even if below your eventual target) and raise consistently than to start at a price that feels unsustainable.' },
    { q: 'Should new nail techs take deposits from their first clients?', a: 'Yes, from the moment you start charging. Even if you do free model sets initially, as soon as you charge anything, a deposit protects your time. Clients who book paying nothing have less reason to show up.' },
    { q: 'How do you know when you\'re ready to take clients as a new nail tech?', a: 'When you can consistently produce a clean, neat finish with a well-structured shape. Perfect polish and expert nail art aren\'t required at the start — solid fundamentals are. If you\'re unsure, do 3–5 model sets first, get honest feedback, and start charging when the results make you genuinely proud.' },
  ],
  relatedFeatureSlugs: ['bookings', 'deposits', 'crm'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">

      <section id="pricing-mistakes">
        <h2 className="font-serif text-2xl font-bold mb-4">Pricing mistakes</h2>

        <div className="space-y-6">
          <div>
            <p className="font-semibold text-gray-900 mb-1">Starting too low and staying there</p>
            <p className="text-gray-700 leading-relaxed">New nail techs often start with very low prices to attract clients and then find it hard to raise them. Start below market but not embarrassingly below — £30–35 for a gel set is a reasonable starter price for most UK areas. Plan your price rise from day one: "I'll move to £45 after 20 clients."</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Pricing based on what others charge, not what you need</p>
            <p className="text-gray-700 leading-relaxed">Your prices should cover your costs and generate your target income — not just be slightly below whoever showed up first in a Google search. Do the maths before you decide. See: <Link to="/learn/how-to-price-nail-services-for-profit" className="underline text-[#F52B8C]">how to price nail services for profit</Link>.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Not charging for nail art</p>
            <p className="text-gray-700 leading-relaxed">Nail art takes significantly more time and skill. Charging the same price for a plain gel set and an intricate full-hand nail art set undervalues your most skilled work. Add an explicit nail art charge from the start.</p>
          </div>
        </div>
      </section>

      <section id="booking-mistakes">
        <h2 className="font-serif text-2xl font-bold mb-4">Booking and admin mistakes</h2>

        <ArticleTable
          headers={['Mistake', 'What to do instead']}
          rows={[
            ['No deposit policy', 'Collect deposits automatically from day one via online booking'],
            ['Booking through DMs only', 'Set up an online booking page with your bio link'],
            ['No cancellation policy', 'Write a simple policy before you take your first paying client'],
            ['Manual reminders (or none)', 'Use your booking platform\'s automatic reminder feature'],
            ['Overbooking by accident', 'Set up your calendar properly before sharing your booking link'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">See: <Link to="/learn/why-booking-through-dms-costs-nail-techs-clients" className="underline text-[#F52B8C]">why booking through DMs costs nail techs clients</Link>.</p>
      </section>

      <section id="instagram-mistakes">
        <h2 className="font-serif text-2xl font-bold mb-4">Instagram mistakes</h2>

        <div className="space-y-6">
          <div>
            <p className="font-semibold text-gray-900 mb-1">Not putting your location in your bio or name field</p>
            <p className="text-gray-700 leading-relaxed">Without your location, local potential clients can't tell if you're near them. Your Instagram name field (searchable) should include your city. Your bio should mention it too.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Posting without a call to action</p>
            <p className="text-gray-700 leading-relaxed">"Obsessed with this set 😍" is an observation. "Book this look via link in bio — East London nail tech, taking new clients" is a conversion opportunity. Add a CTA to every third post at minimum.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Inconsistent posting</p>
            <p className="text-gray-700 leading-relaxed">Posting 10 times in one week and then nothing for 3 weeks is worse for your Instagram than posting 3 times every week consistently. The algorithm and your followers both reward regularity.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Poor photo quality</p>
            <p className="text-gray-700 leading-relaxed">Your photos are your portfolio. Blurry, dark, or cluttered photos underrepresent your work. A ring light and a phone stand make an immediate difference. Clean the nails before photographing.</p>
          </div>
        </div>
      </section>

      <section id="client-management-mistakes">
        <h2 className="font-serif text-2xl font-bold mb-4">Client management mistakes</h2>

        <div className="space-y-6">
          <div>
            <p className="font-semibold text-gray-900 mb-1">Not asking for rebooking at the end of appointments</p>
            <p className="text-gray-700 leading-relaxed">Every client who doesn't rebook before they leave is a booking you have to re-acquire. Get into the habit: "When do you want to come back? Shall we book it now?"</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Not asking for referrals</p>
            <p className="text-gray-700 leading-relaxed">Happy clients will refer you — but only if you ask. "I'm building my client base — if anyone you know is looking for a nail tech, I'd love a referral" at the end of the appointment is not pushy. It's a simple, direct ask that most clients are happy to act on.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Slow DM responses</p>
            <p className="text-gray-700 leading-relaxed">When a potential client DMs to enquire, they're often messaging more than one nail tech. A reply 12 hours later often arrives after they've booked someone else. Aim to reply within 2–3 hours during working hours.</p>
          </div>
        </div>
        <ArticleTip>Set up a DM quick reply on Instagram for booking enquiries: "Hey! The best way to book is through my link in bio — you can see availability and pay your deposit there 🙏". This can be sent in seconds without typing.</ArticleTip>
      </section>

      <section id="business-mistakes">
        <h2 className="font-serif text-2xl font-bold mb-4">Business mistakes</h2>

        <div className="space-y-6">
          <div>
            <p className="font-semibold text-gray-900 mb-1">Not tracking income and costs</p>
            <p className="text-gray-700 leading-relaxed">Even a simple spreadsheet with monthly income and costs tells you whether your business is actually profitable. Many nail techs are surprised when they add up their product costs — they often spend more than they realise.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Not getting insurance before taking clients</p>
            <p className="text-gray-700 leading-relaxed">Treatment liability insurance protects you if a client has an adverse reaction. Public liability protects you if someone is injured in your space. Both are typically under £150/year and are essential before your first paying client.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Skipping the model phase</p>
            <p className="text-gray-700 leading-relaxed">Some new nail techs try to charge full price before they have a portfolio. Clients booking without seeing your work is possible, but a handful of model sets (free or heavily discounted) gives you photos, feedback, and confidence. It's worth doing.</p>
          </div>
        </div>
      </section>
    </div>
  ),
});
export {};
