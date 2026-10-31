import { registerArticle } from '@/lib/articles';
import { ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'nail-tech-enquiry-dm-reply-templates',
  title: 'Nail Tech Enquiry and DM Reply Templates',
  seoTitle: 'Nail Tech Enquiry and DM Reply Templates (Copy & Paste)',
  excerpt: 'Nail tech DMs move fast. Here are ready-to-use templates for the most common enquiries — pricing questions, availability requests, new client queries, and more.',
  seoDescription: 'Nail tech enquiry and DM reply templates. Copy-paste Instagram DM and WhatsApp reply templates for nail tech enquiries — pricing, availability, new clients, and custom designs.',
  category: 'policies-clients',
  tags: ['nail tech DM reply template', 'nail tech enquiry reply', 'Instagram DM reply nail tech'],
  heroImage: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
  heroImageAlt: 'Nail tech enquiry and DM reply templates',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'pricing-enquiry', label: 'Pricing enquiry replies' },
    { id: 'availability', label: 'Availability enquiry replies' },
    { id: 'new-client', label: 'New client enquiry replies' },
    { id: 'custom-design', label: 'Custom design enquiry replies' },
    { id: 'no-availability', label: 'When you have no availability' },
    { id: 'saved-replies', label: 'Setting up saved replies' },
  ],
  relatedSlugs: ['nail-client-welcome-message-templates', 'nail-tech-booking-confirmation-templates', 'how-to-set-up-nail-tech-link-in-bio', 'how-to-move-from-instagram-dms-to-online-booking'],
  faq: [
    { q: 'Should I answer every enquiry with a custom reply?', a: 'For common questions (pricing, availability), saved replies or near-identical responses save huge amounts of time. It\'s okay to have a consistent template — what matters is that it feels warm and answers the question, not that every reply is unique.' },
    { q: 'How do I reduce the number of DM enquiries I get?', a: 'The best way to reduce pricing and availability DMs is to make that information obvious — on your Instagram bio, in your highlights, and on your booking page. Clients who can find the answer themselves don\'t need to DM. A clear link in bio that goes to your booking page handles most availability questions automatically.' },
  ],
  relatedFeatureSlugs: ['instagram-autodm', 'bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="pricing-enquiry">
        <h2 className="font-serif text-2xl font-bold mb-4">Pricing enquiry replies</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>"How much do you charge?"</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name]! My full pricing menu is on my booking page — you can see all services and prices here: [link] 💅 If you have a specific service in mind that you can't see on the menu, feel free to ask!
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>If you want to give pricing directly:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hi! My [service] starts from £[price] and [service] is £[price]. You can see the full menu and book directly at [link] 💕
        </blockquote>
      </section>

      <section id="availability">
        <h2 className="font-serif text-2xl font-bold mb-4">Availability enquiry replies</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>"Are you free on [day]?" / "Do you have any availability?"</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name]! The easiest way to check my availability is to go straight to my booking page — it shows real-time availability and you can book in one click: [link] 💅
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>If you don't have online booking:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hi! I have availability on [days/times]. What service were you thinking, and do any of those work for you? 😊
        </blockquote>
        <ArticleTip>If you're still answering availability DMs manually, this is the clearest sign to set up online booking. Every availability DM is a potential booking that didn't convert.</ArticleTip>
      </section>

      <section id="new-client">
        <h2 className="font-serif text-2xl font-bold mb-4">New client enquiry replies</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>"Do you take new clients?"</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name]! Yes, I'm currently taking new clients 💕 You can book directly at [link] — pick your service, choose a time, and you'll get a confirmation straight away. Let me know if you have any questions!
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>New client — closed to new clients:</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hi [Name]! I'm so sorry — I'm not currently taking new clients as I'm fully booked. I'd love to add you to my waitlist! If a spot opens up, I'll reach out. Would you like me to add you?
        </blockquote>
      </section>

      <section id="custom-design">
        <h2 className="font-serif text-2xl font-bold mb-4">Custom design enquiry replies</h2>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>"Can you do [specific design]?"</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name]! Yes, I can do that 💅 Feel free to send over any inspo photos and I can let you know if it'll work. Once you're ready to book, you can grab a slot at [link]!
        </blockquote>
        <p className="text-gray-700 mb-4 leading-relaxed"><strong>"Can you do [design you don't offer]?"</strong></p>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hi [Name]! Thank you for reaching out! Unfortunately that's not something I currently offer — I specialise in [your specialty]. If you're interested in anything along those lines, I'd love to help! 💕
        </blockquote>
      </section>

      <section id="no-availability">
        <h2 className="font-serif text-2xl font-bold mb-4">When you have no availability</h2>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600 mb-6">
          Hi [Name]! I'm fully booked right now but I'd love to add you to my waitlist — when a spot opens up, I'll message you straight away. Are you flexible with timing, or do you need a specific date? 💕
        </blockquote>
        <blockquote className="border-l-4 border-[#F4C2C2] pl-4 italic text-gray-600">
          Hi! I'm fully booked for [month] but have some availability coming up in [next month]. Would that work for you? You can see available dates at [link] 😊
        </blockquote>
      </section>

      <section id="saved-replies">
        <h2 className="font-serif text-2xl font-bold mb-4">Setting up saved replies</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Both Instagram and WhatsApp Business allow saved quick replies — you can store your most common responses and insert them with a keyword or shortcut.</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Instagram:</strong> Settings → Creator/Business → Saved Replies</li>
          <li><strong>WhatsApp Business:</strong> Settings → Business Tools → Quick Replies</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">Set up saved replies for: pricing, availability, new client info, your booking link, your cancellation policy, and your location. These 5–6 templates cover the majority of your DM volume and save hours per week.</p>
      </section>
    </div>
  ),
});
export {};
