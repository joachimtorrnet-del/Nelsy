import { registerArticle } from '@/lib/articles';
import { ArticleTable, ArticleCallout } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-many-nail-clients-per-day',
  title: 'How Many Nail Clients Can You Realistically Take Per Day?',
  seoTitle: 'How Many Nail Clients Can You Realistically Take Per Day?',
  excerpt: 'Working at full capacity every day sounds like the goal — but it\'s usually not sustainable. Here\'s how to figure out the right number of clients for your set-up and service mix.',
  seoDescription: 'How many nail clients per day can you take? Realistic capacity guide for nail techs — by service type, working setup, and what maximum capacity actually costs your quality.',
  category: 'start-your-business',
  tags: ['how many nail clients per day', 'nail tech capacity', 'nail tech schedule'],
  heroImage: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
  heroImageAlt: 'How many nail clients per day as a nail tech',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'service-time', label: 'Service time by appointment type' },
    { id: 'daily-capacity', label: 'Realistic daily capacity' },
    { id: 'what-full-capacity-costs', label: 'What full capacity costs' },
    { id: 'finding-your-number', label: 'Finding the right number for you' },
  ],
  relatedSlugs: ['how-to-build-weekly-nail-tech-schedule', 'how-long-to-book-each-nail-service', 'how-to-reduce-gaps-nail-appointments', 'how-to-manage-fully-booked-nail-schedule'],
  faq: [
    { q: 'Is 6 clients a day too many for a nail tech?', a: 'It depends entirely on your service mix and working hours. Six gel polish appointments in an eight-hour day is very manageable. Six full acrylic extension sets with nail art in the same time is physically and technically unsustainable. The service type, appointment length, and your personal endurance all determine whether 6 is reasonable or too much.' },
    { q: 'Should I take back-to-back appointments with no breaks?', a: 'No. Back-to-back appointments with no buffer time leads to late running, rushed work, and client dissatisfaction. A 10–15 minute gap between appointments gives you time to clean your station, prepare for the next client, stay on time, and manage the day without constant pressure. This gap also means a late-running appointment doesn\'t cascade through the rest of your day.' },
  ],
  relatedFeatureSlugs: ['bookings', 'analytics'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="service-time">
        <h2 className="font-serif text-2xl font-bold mb-4">Service time by appointment type</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Before calculating daily capacity, you need realistic appointment lengths for each service you offer. These are approximate ranges — experienced techs often work faster, newer techs slower:</p>
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
        <p className="text-gray-700 mb-4 leading-relaxed">In an 8-hour working day with standard 10–15 minute buffers between appointments:</p>
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
        <p className="text-gray-700 mt-4 leading-relaxed">These numbers assume one appointment at a time (no overlapping). Techs who overlap appointments (e.g., starting acrylics on one client while another soaks off) can fit more bookings but require experience and a specific setup to manage safely.</p>
      </section>

      <section id="what-full-capacity-costs">
<h2 className="font-serif text-2xl font-bold mb-4">What full capacity costs</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Maximum client numbers come with real costs:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Physical fatigue:</strong> Nail tech work is physically demanding — sustained fine motor work, repeated static posture, product inhalation. Running at maximum capacity daily without adequate rest leads to burnout and injury (RSI, back problems, allergic sensitisation)</li>
          <li><strong>Quality pressure:</strong> At high volume, mistakes happen more — flooded cuticles, uneven shapes, missed prep steps — which drives up revisit and redo rates</li>
          <li><strong>Late running:</strong> One appointment that goes long cascades through every appointment after it; no buffer time means stress for you and the client</li>
          <li><strong>Mental drain:</strong> Client service work at high volume is mentally taxing; quality of care declines as the day progresses without breaks</li>
        </ul>
        <ArticleCallout variant="info" title="Maximum revenue ≠ maximum capacity">
          Running at 70–80% capacity with a maintained price point and zero reworks often earns more over time than running at 100% with rushed work, client complaints, and physical burnout.
        </ArticleCallout>
      </section>

      <section id="finding-your-number">
        <h2 className="font-serif text-2xl font-bold mb-4">Finding the right number for you</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Start by tracking your actual appointment times for two weeks — most techs overestimate how fast they work until they measure it</li>
          <li>Add 15 minutes to your average service time to get a realistic appointment slot</li>
          <li>Count how many of those slots fit in your working hours with one lunch break</li>
          <li>Subtract one slot for the inevitable late arrival, overrun, or new client consultation</li>
          <li>That number is your sustainable daily capacity — book to that ceiling, not beyond it</li>
          <li>If income feels insufficient at that number, the answer is usually price — not more clients</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
