import { registerArticle } from '@/lib/articles';
import { ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-waitlist-message-templates',
  title: 'Nail Tech Waitlist Message Templates',
  seoTitle: 'Nail Tech Waitlist Message Templates (Copy & Paste)',
  excerpt: 'How to manage a waitlist professionally — templates for adding clients, notifying about openings, and handling the awkward "sorry, no space yet" message.',
  seoDescription: 'Nail tech waitlist message templates. Copy-paste waitlist messages for nail techs — adding clients to waitlist, notifying of openings, and managing expectations.',
  category: 'policies-clients',
  tags: ['nail tech waitlist message', 'nail tech waitlist template', 'waitlist message nail tech'],
  heroImage: 'linear-gradient(135deg, #F0F9FF 0%, #BAE6FD 100%)',
  heroImageAlt: 'Nail tech waitlist message templates',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'adding-to-waitlist', label: 'Adding a client to your waitlist' },
    { id: 'spot-opened', label: 'Notifying a client of an opening' },
    { id: 'no-space-yet', label: 'Checking in when no space has opened' },
    { id: 'closing-waitlist', label: 'Closing the waitlist' },
    { id: 'waitlist-instagram', label: 'Waitlist Instagram post templates' },
  ],
  relatedSlugs: ['nail-tech-client-follow-up-templates', 'nail-tech-booking-confirmation-templates', 'how-to-manage-fully-booked-nail-schedule', 'how-to-get-more-nail-clients'],
  faq: [
    { q: 'How should I manage my waitlist practically?', a: 'Keep a simple note or spreadsheet: client name, contact, service requested, preferred days/times. When a slot opens, check who\'s first on the waitlist for that service/time combination and reach out. First in, first offered — unless someone repeatedly can\'t make it (then move them down).' },
    { q: 'How long should I give a client to respond to an opening?', a: 'Give at least a few hours — ideally 24 hours if the slot is not urgent. If you don\'t hear back within that window, move to the next person. State the response deadline in your message so it\'s clear.' },
  ],
  relatedFeatureSlugs: ['bookings', 'audience-capture'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="adding-to-waitlist">
        <h2 className="font-serif text-2xl font-bold mb-4">Adding a client to your waitlist</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Friendly waitlist confirmation:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name]! I'm fully booked right now, but I'd love to add you to my waitlist. When a spot opens up that matches what you're looking for, I'll reach out straight away. I can't guarantee timing, but spots do open regularly. Is there a day/time that works best for you? 💅
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Professional waitlist confirmation:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hi [Name], thank you for your interest! I'm currently fully booked, but I'm happy to add you to my waitlist. I'll contact you as soon as a suitable appointment becomes available. If you have preferred days or a rough timeframe, please let me know. [Your name]
        </blockquote>
      </section>

      <section id="spot-opened">
        <h2 className="font-serif text-2xl font-bold mb-4">Notifying a client of an opening</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Opening message — quick response required:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name]! A spot has just opened up — I have availability on [day] at [time] for a [service]. Would this work for you? If you'd like it, please let me know by [time/date] and I'll get you booked in. If I don't hear back, I'll offer it to the next person on the list. 💅
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Shorter opening message:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hi [Name]! Spot opened — [day] at [time]. Yours if you want it! Just reply by [time]. 💅
        </blockquote>
        <ArticleTip>Always give a response deadline when offering a waitlist spot. Without one, you may hold it indefinitely or feel awkward offering it to someone else.</ArticleTip>
      </section>

      <section id="no-space-yet">
        <h2 className="font-serif text-2xl font-bold mb-4">Checking in when no space has opened</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">If a client is on the waitlist and hasn't heard from you in a while:</p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name], just checking in — you're still on my waitlist and I haven't forgotten about you! It's been a busy period. I'll be in touch as soon as something opens up. Are you still looking for a [service] appointment, and is your timing still flexible? 💕
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Waitlist status update (when you know timing):</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hi [Name], quick update — I'm anticipating some availability opening up in [timeframe, e.g. the next 2–3 weeks]. I'll reach out as soon as a spot opens. Are you still interested?
        </blockquote>
      </section>

      <section id="closing-waitlist">
        <h2 className="font-serif text-2xl font-bold mb-4">Closing the waitlist</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">When you need to stop accepting waitlist requests:</p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name], I'm sorry — I'm currently so fully booked that I've had to close my waitlist as I can't guarantee spots in a reasonable timeframe. I'd hate to keep you waiting indefinitely. I'll post on Instagram when I open new availability. Thank you so much for your interest. 💕
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Instagram Story for closing waitlist:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          ⚠️ Waitlist closed<br />
          I'm so overwhelmed by the love — thank you! I've had to close my waitlist as I can't take on any more requests right now.<br />
          Follow for availability updates 💅
        </blockquote>
      </section>

      <section id="waitlist-instagram">
        <h2 className="font-serif text-2xl font-bold mb-4">Waitlist Instagram post templates</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Opening a waitlist:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          📋 Waitlist open<br /><br />
          I'm fully booked but opening a waitlist! If you've been wanting to get in, drop a 💅 below or DM me with your preferred service and availability. I'll be in touch when a spot opens. 🤍
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>Announcing new availability:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          📅 New availability just dropped!<br /><br />
          A few slots have opened up for [month]. If you're on my waitlist, check your messages — if not, book now via link in bio before they're gone. 💕
        </blockquote>
      </section>
    </div>
  ),
});
export {};
