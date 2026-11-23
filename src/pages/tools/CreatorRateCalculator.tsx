import { useState } from 'react';
import { Link } from 'react-router-dom';
import ToolPage, { NumberField, ResultLine, Prose } from '@/components/tools/ToolPage';

const usd = (n: number) => `$${(Number.isFinite(n) ? n : 0).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
const link = 'underline text-[#F52B8C]';

export default function CreatorRateCalculator() {
  const [views, setViews] = useState(3000);
  const [cpm, setCpm] = useState(25);
  const [hours, setHours] = useState(2);
  const [hourly, setHourly] = useState(40);
  const [costs, setCosts] = useState(10);
  const [deliverables, setDeliverables] = useState(1);
  const [usage, setUsage] = useState(0);
  const [exclusivity, setExclusivity] = useState(0);

  const audiencePrice = (views / 1000) * cpm;
  const productionPrice = hours * hourly + costs;
  const basePerPiece = Math.max(audiencePrice, productionPrice);
  const subtotal = basePerPiece * deliverables;
  const total = subtotal * (1 + usage / 100 + exclusivity / 100);
  const ugcTotal = productionPrice * deliverables * (1 + usage / 100 + exclusivity / 100);

  const calculator = (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-gray-900">The collaboration</h2>
        <div className="grid grid-cols-2 gap-4">
          <NumberField label="Average views per post" value={views} onChange={setViews} hint="Last 10 Reels or posts" />
          <NumberField label="Your CPM" value={cpm} onChange={setCpm} prefix="$" hint="Price per 1,000 views" />
          <NumberField label="Production time" value={hours} onChange={setHours} step={0.5} suffix="h" hint="Prep, shoot, edit" />
          <NumberField label="Your hourly rate" value={hourly} onChange={setHourly} prefix="$" />
          <NumberField label="Product and props" value={costs} onChange={setCosts} prefix="$" hint="Nails, products, set" />
          <NumberField label="Deliverables" value={deliverables} onChange={setDeliverables} min={1} hint="Reels, posts, stories" />
          <NumberField label="Usage rights" value={usage} onChange={setUsage} suffix="%" hint="Brand reuses it in ads" />
          <NumberField label="Exclusivity" value={exclusivity} onChange={setExclusivity} suffix="%" hint="No competing brands" />
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 mb-1">Your rate</h2>
        <p className="text-xs text-gray-400 mb-3">Updates as you type</p>
        <ResultLine label="Audience price per piece" value={usd(audiencePrice)} formula="views ÷ 1,000 × CPM" />
        <ResultLine label="Production floor per piece" value={usd(productionPrice)} formula="hours × hourly rate + costs" />
        <ResultLine label="Base per piece" value={usd(basePerPiece)} formula="the higher of the two" />
        <ResultLine label={`× ${deliverables} deliverable${deliverables > 1 ? 's' : ''}`} value={usd(subtotal)} />
        <ResultLine label="Sponsored post rate" value={usd(total)} formula="+ usage rights + exclusivity" highlight />
        <ResultLine label="UGC rate (content only, not posted)" value={usd(ugcTotal)} formula="production floor × deliverables + add-ons" />
        <p className="text-xs text-gray-400 mt-4 leading-relaxed">
          Example values are pre-filled. CPM is a price you set, not a fixed market rate: adjust it to your niche and to what brands accept.
        </p>
      </div>
    </div>
  );

  return (
    <ToolPage
      slug="creator-rate-calculator"
      name="Creator Rate Calculator"
      seoTitle="Creator Rate Calculator: Price Sponsored Posts & UGC"
      seoDescription="Free influencer rate calculator for beauty creators: price sponsored posts and UGC from your views, CPM and production time, plus usage rights and exclusivity."
      h1="Creator Rate Calculator"
      intro="Work out what to charge a brand for a sponsored Reel, post or UGC video, based on your views and the real time it takes you to create. Built for nail, lash, makeup and beauty creators."
      calculator={calculator}
      toc={[
        { id: 'formula', label: 'How the rate is calculated' },
        { id: 'examples', label: 'Two worked examples' },
        { id: 'cpm', label: 'How to choose your CPM' },
        { id: 'ugc', label: 'Sponsored post vs UGC' },
        { id: 'add-ons', label: 'Usage rights and exclusivity' },
        { id: 'negotiate', label: 'How to quote a brand' },
      ]}
      faq={[
        { q: 'How much should a small beauty creator charge for a sponsored post?', a: 'Start from two numbers: what your audience is worth (average views ÷ 1,000 × your CPM) and what your time costs (production hours × your hourly rate + product costs). Quote the higher of the two, so a small account is never paid less than the work it takes.' },
        { q: 'What is CPM for influencers?', a: 'CPM means cost per mille: the price for 1,000 views or impressions. It lets you price by audience size. There is no fixed industry CPM: it varies by niche, platform, content format and brand budget, so treat it as a number you test and adjust.' },
        { q: 'What is the difference between UGC and a sponsored post?', a: 'A sponsored post is published on your account, so the brand pays for your audience and your content. UGC (user-generated content) is content you create for the brand to post or use in ads, without publishing it yourself, so it is priced on production time, plus usage rights.' },
        { q: 'Should I charge extra for usage rights?', a: 'Yes. If a brand wants to reuse your content in paid ads, on its website or for a long period, that is worth more than a single post on your account. Creators usually add a percentage on top of the base rate, depending on the duration and channels.' },
      ]}
      cta={{ title: 'Your rate card, your shop, one link', text: 'With Nelsy, brands and clients find everything on one page: your services, bookings, deposits, coaching and digital products, with 0% Nelsy commission.' }}
      related={[
        { label: 'Instagram engagement rate calculator', href: '/tools/instagram-engagement-calculator' },
        { label: '100 nail tech content ideas', href: '/blog/100-nail-tech-content-ideas' },
        { label: 'How to grow your nail tech Instagram', href: '/blog/how-to-grow-nail-tech-instagram' },
        { label: 'Nail tech pricing guide', href: '/blog/nail-tech-pricing-guide' },
        { label: 'Nail tech pricing calculator', href: '/tools/nail-tech-pricing-calculator' },
      ]}
    >
      <Prose id="formula" title="How the rate is calculated">
        <p><strong>Audience price = average views ÷ 1,000 × CPM.</strong> This is what your reach is worth to the brand.</p>
        <p><strong>Production floor = production hours × hourly rate + product costs.</strong> This is what the work costs you. The base price per piece is the higher of the two, multiplied by the number of deliverables, then usage rights and exclusivity are added as percentages.</p>
      </Prose>

      <Prose id="examples" title="Two worked examples">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="font-bold text-gray-900 mb-2">Example 1: a nail tech with 3,000 views per Reel</p>
          <p>Audience price: 3,000 ÷ 1,000 × $25 = $75. Production floor: 2 h × $40 + $10 = $90. The floor is higher, so the base is <strong>$90</strong> for one Reel. With 20% usage rights: <strong>$108</strong>.</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="font-bold text-gray-900 mb-2">Example 2: a makeup artist with 20,000 views per Reel</p>
          <p>Audience price: 20,000 ÷ 1,000 × $25 = $500. Production floor: 3 h × $50 + $30 = $180. The audience price is higher, so the base is $500. For 2 Reels with 10% exclusivity: $500 × 2 × 1.10 = <strong>$1,100</strong>.</p>
        </div>
      </Prose>

      <Prose id="cpm" title="How to choose your CPM">
        <p>There is no official CPM for creators. Start with a number, quote it to a few brands, and adjust: if every brand accepts instantly, you are probably too low; if none reply, test lower or show more proof (engagement, saves, past results).</p>
        <p>Your engagement matters as much as your views. Check yours with the <Link to="/tools/instagram-engagement-calculator" className={link}>Instagram engagement rate calculator</Link> and include it in your media kit.</p>
      </Prose>

      <Prose id="ugc" title="Sponsored post vs UGC">
        <p>A <strong>sponsored post</strong> goes on your account: the brand pays for your audience and the content. <strong>UGC</strong> is content made for the brand to use, without posting it yourself, so audience size matters less and the price is based on production. That&apos;s why the calculator shows both.</p>
      </Prose>

      <Prose id="add-ons" title="Usage rights and exclusivity">
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Usage rights:</strong> the brand reuses your content in ads, on its site or in emails. Price it by duration (30 days, 3 months, 1 year) and channels.</li>
          <li><strong>Exclusivity:</strong> you agree not to work with competing brands for a period. It costs you other deals, so it should be paid.</li>
          <li><strong>Revisions:</strong> include one round in your quote, and charge for extra rounds.</li>
        </ul>
      </Prose>

      <Prose id="negotiate" title="How to quote a brand">
        <ol className="list-decimal list-inside space-y-2">
          <li>Send a short rate card: deliverables, price, usage, timeline.</li>
          <li>Share proof: average views, engagement rate, a few of your best posts.</li>
          <li>Offer a package (Reel + 3 stories) rather than a discount.</li>
          <li>Ask for 50% upfront for new brands, and put the terms in writing.</li>
        </ol>
        <p>Keep your rate card, services and products behind one link so brands and clients see your whole offer.</p>
      </Prose>
    </ToolPage>
  );
}
