import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleTable, ArticleCallout, ArticleSteps, ArticleTip } from '@/components/article/ArticleBodyComponents';

const link = 'underline text-[#F52B8C]';

registerArticle({
  slug: 'how-many-nail-clients-per-day',
  title: 'How Many Nail Clients Can You Realistically Take Per Day?',
  seoTitle: 'How Many Nail Clients Can You Realistically Take Per Day?',
  excerpt: 'Working at full capacity every day sounds like the goal, but it\'s usually not sustainable. Here\'s how to figure out the right number of clients for your set-up and service mix.',
  seoDescription: 'How many nail clients per day can you take? A realistic capacity guide for nail techs by service type, with a simple formula to find your own number.',
  category: 'start-your-business',
  audience: ['pros'],
  craft: 'nails',
  tags: ['how many nail clients per day', 'nail tech capacity', 'nail tech schedule'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
  heroImageAlt: 'How many nail clients per day as a nail tech',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Business Guide',
  publishedAt: '2026-10-21',
  updatedAt: '2026-11-26',
  tldr: {
    answer: 'Most solo nail techs can take about 3 to 4 clients a day doing extensions or nail art, 5 to 6 with a mix of gel and infills, and 7 to 8 doing only gel polish.',
    detail: 'Your own number = (working minutes − breaks) ÷ (average service time + 15-minute buffer), rounded down, with one slot kept flexible for overruns.',
    points: [
      { label: 'Extensions / art', text: '3 to 4 clients in an 8-hour day.' },
      { label: 'Mixed gel + infills', text: '5 to 6 clients.' },
      { label: 'Gel polish only', text: '7 to 8 clients, with short buffers.' },
    ],
  },
  toc: [
    { id: 'service-time', label: 'Service time by appointment type' },
    { id: 'daily-capacity', label: 'Realistic daily capacity' },
    { id: 'what-full-capacity-costs', label: 'What full capacity costs' },
    { id: 'finding-your-number', label: 'Finding the right number for you' },
    { id: 'income-check', label: 'Check your number against your income goal' },
  ],
  relatedSlugs: ['how-to-build-weekly-nail-tech-schedule', 'how-long-to-book-each-nail-service', 'how-to-reduce-gaps-nail-appointments', 'how-to-manage-fully-booked-nail-schedule'],
  faq: [
    { q: 'Is 6 clients a day too many for a nail tech?', a: 'It depends on the services. Six gel polish appointments in an 8-hour day is manageable. Six full extension sets with nail art in the same time is not realistic: at about 2 hours each plus buffers, that would be over 13 hours. Add up your service times plus 15 minutes per client and compare with your working hours.' },
    { q: 'Should I take back-to-back appointments with no breaks?', a: 'No. Without a buffer, one late arrival or slow set pushes every appointment after it. A 10 to 15 minute gap lets you clean your station, prepare for the next client and stay on time. Build it into the appointment length in your booking system so clients can\'t book into it.' },
    { q: 'How many days a week should a nail tech work?', a: 'Many solo techs work 4 or 5 client days and keep one admin day for content, ordering and accounts. Work out your income at your sustainable daily number first: if 4 days at that number covers your goal, you don\'t need a fifth.' },
  ],
  relatedFeatureSlugs: ['bookings', 'analytics'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="service-time">
        <h2 className="font-serif text-2xl font-bold mb-4">Service time by appointment type</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Before calculating daily capacity, you need realistic appointment lengths for each service. These are approximate ranges: experienced techs often work faster, newer techs slower.</p>
        <ArticleTable
          headers={['Service', 'Typical time']}
          rows={[
            ['Gel polish (no art)', '45–60 min'],
            ['Gel polish with simple art', '60–75 min'],
            ['Infill / maintenance', '60–90 min'],
            ['Gel-X full set', '60–90 min'],
            ['Builder gel / BIAB full set', '60–90 min'],
            ['Full acrylic set', '90–120 min'],
            ['Acrylic with nail art', '120–150 min'],
            ['Removal + new set', 'Add 30–45 min to the set time'],
          ]}
        />
      </section>

      <section id="daily-capacity">
        <h2 className="font-serif text-2xl font-bold mb-4">Realistic daily capacity</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">In an 8-hour working day with 10 to 15 minute buffers between appointments:</p>
        <ArticleTable
          headers={['Service type', 'Clients per day']}
          rows={[
            ['Gel polish only (45–60 min)', '7–8'],
            ['Mixed gel polish and infills', '5–6'],
            ['Infills only (60–75 min)', '6–7'],
            ['Extensions (90 min average)', '4–5'],
            ['Full sets with nail art (120+ min)', '3–4'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">These numbers assume one client at a time. Some experienced techs overlap appointments (for example, one client soaking off while another finishes curing), but that needs a specific setup and is not a safe default.</p>
      </section>

      <section id="what-full-capacity-costs">
        <h2 className="font-serif text-2xl font-bold mb-4">What full capacity costs</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Packing every possible slot has real costs:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Physical fatigue:</strong> hours of fine detail work in a fixed posture strain your hands, neck and back. Without breaks, this builds up over weeks.</li>
          <li><strong>Quality pressure:</strong> rushed sets mean more flooded cuticles, uneven shapes and skipped prep, which leads to lifting and repair appointments.</li>
          <li><strong>Late running:</strong> one long appointment pushes every appointment after it.</li>
          <li><strong>Mental drain:</strong> client-facing work all day is tiring, and the last client of the day deserves the same care as the first.</li>
        </ul>
        <ArticleCallout variant="info" title="Example: fewer clients, same money">
          Example: 6 clients at £35 = £210 a day. 5 clients at £42 = £210 a day. Same income, one fewer set to do, and 75 or more minutes back for breaks, cleaning and content. Raising prices is often easier on your body than adding clients.
        </ArticleCallout>
      </section>

      <section id="finding-your-number">
        <h2 className="font-serif text-2xl font-bold mb-4">Finding the right number for you</h2>
        <ArticleSteps
          steps={[
            { title: 'Time yourself for two weeks', body: 'Note start and finish times for every appointment. Most techs think they are faster than they are until they measure.' },
            { title: 'Build your slot length', body: 'Average service time + 15 minutes buffer = your real slot.' },
            { title: 'Count slots in your day', body: 'Working minutes minus lunch, divided by slot length, rounded down.' },
            { title: 'Keep one slot flexible', body: 'For overruns, late arrivals and new-client consultations. Open it to bookings only a day or two before.' },
            { title: 'Book to that ceiling', body: 'Set your booking system to stop offering times once you reach it.' },
          ]}
        />
        <ArticleCallout variant="success" title="Worked example">
          Example: you work 9:00 to 17:30 (510 minutes) with a 30-minute lunch, so 480 working minutes. Your average set takes 75 minutes, plus 15 buffer = 90-minute slots.<br />
          480 ÷ 90 = 5.3, rounded down to <strong>5 slots</strong>. Keep 1 flexible: <strong>4 fixed bookings a day</strong>, plus a fifth when it is safe.
        </ArticleCallout>
      </section>

      <section id="income-check">
        <h2 className="font-serif text-2xl font-bold mb-4">Check your number against your income goal</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Now multiply your sustainable number by your prices and working days:</p>
        <ArticleCallout variant="info" title="Example">
          Example: 4 clients a day × £45 average × 4 days = £720 a week before costs. If your goal is £900 a week, you have two choices: 5 clients a day (5 × 45 × 4 = £900) or the same 4 clients at £56.25 average (4 × 56.25 × 4 = £900). Adding nail art add-ons to some sets is a third option.
        </ArticleCallout>
        <ArticleTip>If income feels too low at your sustainable number, the answer is usually price or add-ons, not more clients. Check your numbers with the <Link to="/tools/nail-tech-pricing-calculator" className={link}>nail tech pricing calculator</Link>, then plan the week with <Link to="/blog/how-to-build-weekly-nail-tech-schedule" className={link}>how to build a weekly nail tech schedule</Link>.</ArticleTip>
      </section>
    </div>
  ),
});
export {};
