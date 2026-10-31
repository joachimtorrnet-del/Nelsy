import { registerArticle } from '@/lib/articles';
import { ArticleTable, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-long-to-book-each-nail-service',
  title: 'How Much Time Should You Book for Each Nail Service?',
  seoTitle: 'How Much Time Should You Book for Each Nail Service?',
  excerpt: 'Booking the wrong appointment length creates problems all day. Here\'s a realistic guide to how long to book for each nail service — including buffer time and variables.',
  seoDescription: 'How long to book for each nail service. Recommended appointment times for gel polish, infills, extensions, acrylics, and nail art — plus what makes services run longer.',
  category: 'booking-software',
  tags: ['how long to book nail service', 'nail appointment times', 'nail service duration'],
  heroImage: 'linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)',
  heroImageAlt: 'How long to book each nail service',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'service-times', label: 'Recommended times by service' },
    { id: 'variables', label: 'What makes services run longer' },
    { id: 'buffer-time', label: 'Buffer time between appointments' },
    { id: 'setting-up', label: 'Setting up appointment durations in your system' },
  ],
  relatedSlugs: ['how-many-nail-clients-per-day', 'how-to-build-weekly-nail-tech-schedule', 'how-to-reduce-gaps-nail-appointments', 'booking-software-for-nail-techs'],
  faq: [
    { q: 'Should I book the same time for all clients for the same service?', a: 'For most returning clients doing the same service, yes. For new clients, add a 15-minute consultation buffer to any appointment. For clients who regularly run long, consider setting their appointment slot longer than standard — this is more honest and sustainable than hoping they\'ll be quicker next time.' },
    { q: 'What happens if I consistently run over on a service?', a: 'If you\'re regularly running over the booked time, the appointment duration is wrong — not your speed. Adjust your service time upward to match what the service actually takes you. Padding appointment times feels counterintuitive but results in a calmer day, better work quality, and fewer late clients.' },
  ],
  relatedFeatureSlugs: ['bookings'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="service-times">
        <h2 className="font-serif text-2xl font-bold mb-4">Recommended times by service</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">These are recommended booking durations — the time you block in your calendar, including the service and a small buffer. Actual service time may be shorter:</p>
        <ArticleTable
          headers={['Service', 'Recommended booking time']}
          rows={[
            ['Gel polish — standard', '60 min'],
            ['Gel polish — with simple nail art', '75 min'],
            ['Gel polish — with complex nail art', '90 min'],
            ['Soak off and re-polish', '75 min'],
            ['Infill / maintenance (gel extension)', '75 min'],
            ['Infill with shape change', '90 min'],
            ['Infill with nail art', '90–105 min'],
            ['Gel-X full set', '90 min'],
            ['Builder gel / BIAB full set', '90 min'],
            ['Full acrylic set', '105–120 min'],
            ['Full acrylic with nail art', '135–150 min'],
            ['Full removal', '60–75 min'],
            ['New client consultation + service', 'Add 15 min to standard time'],
          ]}
        />
      </section>

      <section id="variables">
        <h2 className="font-serif text-2xl font-bold mb-4">What makes services run longer</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>New clients:</strong> Consultation, patch tests, and unfamiliarity with the process all add time</li>
          <li><strong>Nail condition:</strong> Overgrown extensions, severe lifting, or broken nails require more prep and repair time</li>
          <li><strong>Nail art complexity:</strong> Detailed designs, multiple colours, or new techniques take significantly more time than simple colour work</li>
          <li><strong>Shape change:</strong> Filing a significantly different shape adds 15–20 minutes of filing and checking time</li>
          <li><strong>Removal:</strong> If you're removing a different brand's product or an unusually thick set, soak and removal time varies</li>
          <li><strong>Client factors:</strong> A client who talks, moves, or has difficult-to-work-on nails (very curved nail beds, bitten nails) adds time to every stage</li>
        </ul>
        <ArticleTip>Build your service times based on how long the service takes on a standard returning client in good nail condition. Then add a new-client buffer for first visits, and note in your booking system which clients consistently run longer.</ArticleTip>
      </section>

      <section id="buffer-time">
        <h2 className="font-serif text-2xl font-bold mb-4">Buffer time between appointments</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Always build a gap between appointments — 10–15 minutes is a sensible minimum</li>
          <li>This gap lets you clean and sanitise your station, prepare your products, have a moment before the next client arrives, and absorb minor overruns without stress</li>
          <li>Without buffer time, a single appointment that runs 10 minutes long causes every subsequent appointment to be late</li>
          <li>Some booking systems let you set a "clean-up time" per service type, which automatically adds a gap after each appointment</li>
        </ul>
      </section>

      <section id="setting-up">
        <h2 className="font-serif text-2xl font-bold mb-4">Setting up appointment durations in your system</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Set each service to its recommended booking duration in your booking software — this is the total time blocked in your calendar</li>
          <li>If your software supports it, split the service duration from the processing/cleanup time — so clients see the service length, but your calendar blocks more time</li>
          <li>Review your average actual appointment times monthly for the first six months and adjust your booking durations to match reality</li>
          <li>A booking system that reflects how long things actually take prevents double-booking, client lateness, and a day that spirals from the first overrun</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
