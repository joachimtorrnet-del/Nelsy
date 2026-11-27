import { useState } from 'react';
import { Link } from 'react-router-dom';
import ToolPage, { NumberField, ResultLine, Prose, PINK } from '@/components/tools/ToolPage';

const pct = (n: number) => `${Number.isFinite(n) ? n.toFixed(2) : '0.00'}%`;
const int = (n: number) => Math.round(n).toLocaleString('en-US');
const link = 'underline text-[#F52B8C]';

export default function InstagramEngagementCalculator() {
  const [followers, setFollowers] = useState(4800);
  const [likes, setLikes] = useState(180);
  const [comments, setComments] = useState(14);
  const [saves, setSaves] = useState(22);
  const [shares, setShares] = useState(6);
  const [reach, setReach] = useState(3200);

  const interactions = likes + comments + saves + shares;
  const erFollowers = followers > 0 ? (interactions / followers) * 100 : 0;
  const erReach = reach > 0 ? (interactions / reach) * 100 : 0;
  const erLikesComments = followers > 0 ? ((likes + comments) / followers) * 100 : 0;
  const reachRate = followers > 0 && reach > 0 ? (reach / followers) * 100 : 0;

  const calculator = (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4 shadow-sm">
        <h2 className="text-base font-bold text-gray-900">Your account</h2>
        <NumberField label="Followers" value={followers} onChange={setFollowers} />
        <p className="text-xs text-gray-400">Average per post, over your last 10 to 12 posts:</p>
        <div className="grid grid-cols-2 gap-4">
          <NumberField label="Likes" value={likes} onChange={setLikes} />
          <NumberField label="Comments" value={comments} onChange={setComments} />
          <NumberField label="Saves" value={saves} onChange={setSaves} />
          <NumberField label="Shares" value={shares} onChange={setShares} />
        </div>
        <NumberField label="Reach per post (optional)" value={reach} onChange={setReach} hint="Accounts reached, from Instagram Insights. Set 0 if you don't have it." />
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-base font-bold text-gray-900 mb-1">Your engagement</h2>
        <p className="text-xs text-gray-400 mb-3">Updates as you type</p>
        <ResultLine label="Engagement rate (by followers)" value={pct(erFollowers)} formula="(likes + comments + saves + shares) ÷ followers × 100" highlight />
        <ResultLine label="Engagement rate (by reach)" value={reach > 0 ? pct(erReach) : 'Add reach'} formula="interactions ÷ reach × 100" />
        <ResultLine label="Likes + comments only" value={pct(erLikesComments)} formula="(likes + comments) ÷ followers × 100" />
        <ResultLine label="Interactions per post" value={int(interactions)} />
        <ResultLine label="Share of followers reached" value={reach > 0 ? pct(reachRate) : 'Add reach'} formula="reach ÷ followers × 100" />
        <p className="text-xs text-gray-400 mt-4 leading-relaxed">
          Example values are pre-filled. Replace them with your own averages from Instagram Insights.
        </p>
      </div>
    </div>
  );

  return (
    <ToolPage
      slug="instagram-engagement-calculator"
      name="Instagram Engagement Rate Calculator"
      seoTitle="Instagram Engagement Rate Calculator (Free)"
      seoDescription="Free Instagram engagement rate calculator for beauty creators: likes, comments, saves and shares by followers and by reach, with the formula and worked examples."
      h1="Instagram Engagement Rate Calculator"
      intro="Calculate your engagement rate by followers and by reach, the way brands and agencies check it before a collaboration. Built for nail techs, lash artists, makeup artists and beauty creators."
      calculator={calculator}
      toc={[
        { id: 'formula', label: 'How to calculate engagement rate' },
        { id: 'examples', label: 'Two worked examples' },
        { id: 'followers-vs-reach', label: 'By followers or by reach?' },
        { id: 'good-rate', label: 'What is a good engagement rate?' },
        { id: 'improve', label: 'How to improve your engagement' },
        { id: 'bookings', label: 'From engagement to bookings and sales' },
      ]}
      faq={[
        { q: 'How do you calculate Instagram engagement rate?', a: 'Add up the likes, comments, saves and shares on a post, divide by your number of followers and multiply by 100. For a more reliable figure, use the average of your last 10 to 12 posts rather than a single post.' },
        { q: 'Should I calculate engagement rate by followers or by reach?', a: 'By followers is the most common method and the one brands can check from the outside. By reach is more accurate for judging content, because it only counts people who actually saw the post. Reach comes from Instagram Insights.' },
        { q: 'Do saves and shares count in engagement rate?', a: 'They should. Saves and shares are visible in Instagram Insights and show stronger intent than a like, especially for tutorials, nail inspo and before-and-after posts. Some tools only count likes and comments, so say which method you used when you share your rate with a brand.' },
        { q: 'Why is my engagement rate dropping as I grow?', a: 'Engagement rate by followers usually falls as an account grows, because a smaller share of followers sees each post. Compare yourself with your own past months and with accounts of a similar size in your niche rather than with a single benchmark.' },
      ]}
      cta={{ title: 'Turn engagement into bookings and sales', text: 'Your Nelsy page puts your services, online booking and deposits behind one link in bio, so followers who love your work can book in a few taps. Digital products are coming with the Creator plan.' }}
      related={[
        { label: 'How to grow your nail tech Instagram', href: '/blog/how-to-grow-nail-tech-instagram' },
        { label: '50 Instagram Reel ideas for nail techs', href: '/blog/50-instagram-reel-ideas-for-nail-techs' },
        { label: 'Nail tech caption ideas', href: '/blog/nail-tech-caption-ideas' },
        { label: 'How to turn Instagram followers into clients', href: '/blog/how-to-turn-instagram-followers-into-nail-clients' },
        { label: 'Instagram booking for nail techs', href: '/instagram-booking-for-nail-techs' },
      ]}
    >
      <Prose id="formula" title="How to calculate engagement rate">
        <p><strong>Engagement rate = (likes + comments + saves + shares) ÷ followers × 100.</strong> Use the average of your last 10 to 12 posts so one viral post or one quiet day doesn&apos;t skew the result.</p>
        <p>You&apos;ll find likes and comments on each post, and saves, shares and reach in Instagram Insights (professional accounts only).</p>
      </Prose>

      <Prose id="examples" title="Two worked examples">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="font-bold text-gray-900 mb-2">Example 1: a nail tech with 4,800 followers</p>
          <p>Average per post: 180 likes, 14 comments, 22 saves, 6 shares = 222 interactions. 222 ÷ 4,800 × 100 = <strong>4.63%</strong> by followers. With a reach of 3,200: 222 ÷ 3,200 × 100 = <strong>6.94%</strong> by reach.</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="font-bold text-gray-900 mb-2">Example 2: a makeup artist with 52,000 followers</p>
          <p>Average per post: 900 likes, 40 comments, 160 saves, 50 shares = 1,150 interactions. 1,150 ÷ 52,000 × 100 = <strong>2.21%</strong> by followers. With a reach of 21,000: 1,150 ÷ 21,000 × 100 = <strong>5.48%</strong> by reach.</p>
        </div>
        <p>The larger account has a lower rate by followers but a solid rate by reach: the content works, it just reaches a smaller share of a bigger audience.</p>
      </Prose>

      <Prose id="followers-vs-reach" title="By followers or by reach?">
        <p><strong>By followers</strong> is what brands can calculate from your public profile, so it&apos;s the number most often asked for in collaboration requests.</p>
        <p><strong>By reach</strong> tells you whether people who saw the post engaged with it. It&apos;s the better number for judging which content to make more of. When you send a media kit, give both and say how you calculated them.</p>
      </Prose>

      <Prose id="good-rate" title="What is a good engagement rate?">
        <p>There is no single benchmark. Published averages vary a lot depending on whether they count saves and shares, divide by followers or reach, and which accounts they sample. Engagement rate by followers also falls naturally as an account grows.</p>
        <p>The useful comparisons are: <strong>your own average over the last 3 months</strong>, accounts of a similar size in your niche (nails, lashes, makeup), and the rate of each content format on your profile (Reels vs carousels vs photos).</p>
      </Prose>

      <Prose id="improve" title="How to improve your engagement">
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Make content people save:</strong> step-by-step tutorials, inspo boards, before and after, price lists. See <Link to="/blog/100-nail-tech-content-ideas" className={link}>100 content ideas</Link>.</li>
          <li><strong>Hook in the first second</strong> of Reels with the finished result. See <Link to="/blog/nail-tech-reel-hooks" className={link}>Reel hooks</Link>.</li>
          <li><strong>Ask a question</strong> in the caption that is easy to answer (which colour, which shape).</li>
          <li><strong>Reply to comments</strong> in the first hour: each reply is also a comment.</li>
          <li><strong>Post consistently</strong> rather than often. See <Link to="/blog/how-often-should-nail-techs-post" className={link}>how often to post</Link>.</li>
        </ul>
      </Prose>

      <Prose id="bookings" title="From engagement to bookings and sales">
        <p>Engagement only pays when followers can act on it. Put one link in your bio that lets them book a service, pay a deposit or buy your guide in a few taps, instead of sending DMs back and forth.</p>
        <p>Nelsy gives you that page for bookings and deposits today, with 0% Nelsy commission; selling guides and other digital products is part of the upcoming Creator plan. Next step: work out <Link to="/tools/creator-rate-calculator" className={link}>what to charge brands</Link> with the creator rate calculator.</p>
        <p className="text-sm" style={{ color: PINK }}>Tip: note your engagement rate monthly in the same spreadsheet as your bookings to see which content brings clients, not just likes.</p>
      </Prose>
    </ToolPage>
  );
}
