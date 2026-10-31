import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'french-tip-nail-ideas',
  title: '50 French Tip Nail Ideas for Nail Techs',
  seoTitle: '50 French Tip Nail Ideas for Nail Techs to Offer Clients',
  excerpt: 'The French manicure has completely reinvented itself. Beyond the classic white tip, there are now dozens of variations nail techs should know — here are 50.',
  seoDescription: 'French tip nail ideas for nail techs. 50 French manicure variations — classic, coloured, reverse French, modern takes — with client consultation guidance.',
  category: 'nail-inspo',
  tags: ['french tip nail ideas', 'French manicure', 'nail inspo', 'nail designs'],
  heroImage: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
  heroImageAlt: '50 French tip nail ideas for nail techs',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'french-reinvented', label: 'The French manicure: reinvented' },
    { id: 'classic-refined', label: 'Classic & refined French (1–10)' },
    { id: 'coloured-tips', label: 'Coloured tip variations (11–20)' },
    { id: 'reverse-french', label: 'Reverse French & negative space (21–30)' },
    { id: 'textured-chrome', label: 'Textured & chrome French (31–40)' },
    { id: 'seasonal-occasion', label: 'Seasonal & occasion French (41–50)' },
    { id: 'execution-tips', label: 'Execution & consultation tips' },
  ],
  relatedSlugs: ['almond-nail-ideas', 'short-nail-ideas', 'minimalist-nail-ideas'],
  faq: [
    { q: 'What\'s the easiest way to do a French manicure on a short nail?', a: 'On short nails, use a very thin white or coloured tip line — 1–2mm maximum. Thick French tips on short nails look artificial. Use nail tip guides/strips for a clean line, or a liner brush for precise hand-painting. On really short nails, a bare-look BIAB with no French line often reads better.' },
    { q: 'What\'s the difference between a French manicure and a French polish?', a: 'The terms are used interchangeably. "French manicure" typically refers to the overall nail look with a pale base and white tip; "French polish" sometimes refers specifically to the gel or polish technique used to achieve it. There\'s no industry-standard distinction.' },
    { q: 'How do I price coloured or modern French variations?', a: 'Price based on the technique complexity. A standard white-tip French should be priced the same as a single-colour gel manicure. Coloured tips that require mixing or careful placement can be priced as a nail art add-on. Chrome French tips with powder application warrant a higher add-on price. Always clarify your service menu.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="french-reinvented">
        <h2 className="font-serif text-2xl font-bold mb-4">The French manicure: reinvented</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The traditional French manicure — pale pink base, white tip — spent years looking dated. Then it came back, completely reimagined. Coloured tips, reverse French, chrome tips, abstract interpretations, and micro French lines on squoval nails have collectively made "French" one of the broadest and most requested categories in nail inspo.</p>
        <p className="text-gray-700 leading-relaxed">For nail techs, understanding the full range of French variations means you can offer a version of this aesthetic to almost any client — regardless of whether they love "classic" or want something more contemporary. The 50 ideas below cover that full range.</p>
      </section>

      <section id="classic-refined">
        <h2 className="font-serif text-2xl font-bold mb-4">Classic & refined French (1–10)</h2>
        <div className="space-y-3">
          {[
            { n: 1, idea: 'Classic white tip on sheer pink', desc: 'The original. Execute it with precision — clean smile line, consistent tip width, high-shine topcoat. Perfect application of a classic is its own skill.' },
            { n: 2, idea: 'Micro French', desc: 'A very thin white tip — 1mm or less. Modern, minimal, and works on short nails where a full French tip would look thick.' },
            { n: 3, idea: 'Soft white on natural base', desc: 'A softer, more off-white tip on a truly natural-looking base. Less contrast than classic French — more subtle and wearable daily.' },
            { n: 4, idea: 'Nude-to-white ombre tip', desc: 'The French tip is faded in — no sharp smile line, instead a soft fade from nude to white at the free edge. Softer, more modern, requires sponge ombre technique.' },
            { n: 5, idea: 'French on almond', desc: 'Classic French on an almond shape. The tapered tip gives the French manicure a vintage glamour. Particularly popular as a "wedding nails" option.' },
            { n: 6, idea: 'French on short square', desc: 'The contemporary "clean girl" French — short square nails, very fine white tip, perfect cuticle work. All about precision over drama.' },
            { n: 7, idea: 'Double French line', desc: 'Two thin parallel tip lines — white and gold, or white and pink. Subtle variation on the classic that adds detail without complexity.' },
            { n: 8, idea: 'Sheer with glitter tip', desc: 'Replace the white tip with a strip of micro-glitter in the French line position. More glamorous than a standard French without being as bold as full glitter.' },
            { n: 9, idea: 'French with foil tip', desc: 'Gold or silver metallic foil applied in the tip position. Clean, luxurious, works on most shapes.' },
            { n: 10, idea: 'Natural French with cuticle detail', desc: 'Classic French paired with precision cuticle work and a neatening of the nail plate. The "no-design design" — the polish is secondary to the nail care.' },
          ].map(({ n, idea, desc }) => (
            <div key={n} className="border-l-4 border-[#FEF3C7] pl-4">
              <p className="font-semibold">{n}. {idea}</p>
              <p className="text-gray-600 text-sm mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="coloured-tips">
        <h2 className="font-serif text-2xl font-bold mb-4">Coloured tip variations (11–20)</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The French silhouette with a non-white tip — one of the most versatile nail categories, applicable across all seasons.</p>
        <div className="space-y-3">
          {[
            { n: 11, idea: 'Black French', desc: 'Black tip on a nude or sheer pink base. The "rock French." Edgier than classic, surprisingly wearable. Strong in autumn/winter.' },
            { n: 12, idea: 'Red French', desc: 'Cherry or warm red tip. Retro, glamorous, works especially well on almond and coffin shapes.' },
            { n: 13, idea: 'Blue French', desc: 'Cobalt or navy tip on a white or nude base. Summer-appropriate and fashion-forward.' },
            { n: 14, idea: 'Lavender French', desc: 'Soft purple tip on a milky white or nude base. Very popular spring/summer option.' },
            { n: 15, idea: 'Metallic gold French', desc: 'Gold chrome or gold gel tip. Festive and glamorous. Works well at Christmas and New Year but also as a year-round "event nail."' },
            { n: 16, idea: 'Deep burgundy French', desc: 'A dark red-burgundy tip. Autumn classic. Particularly striking on almond or coffin shapes.' },
            { n: 17, idea: 'Forest green French', desc: 'Deep green tip on nude or cream base. Distinctive, autumn/winter appropriate, looks excellent on short square nails.' },
            { n: 18, idea: 'Pastel multicolour French', desc: 'A different pastel colour on each tip — mint, lilac, baby pink, peach. Spring only. Great seasonal content.' },
            { n: 19, idea: 'Peach French', desc: 'Warm peachy tip — a softer alternative to orange for summer. Flattering on most skin tones.' },
            { n: 20, idea: 'Gradient colour French', desc: 'The tip transitions between two colours (e.g. orange to pink, or purple to blue) within the tip itself. Advanced technique but beautiful result.' },
          ].map(({ n, idea, desc }) => (
            <div key={n} className="border-l-4 border-[#FBCFE8] pl-4">
              <p className="font-semibold">{n}. {idea}</p>
              <p className="text-gray-600 text-sm mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="reverse-french">
        <h2 className="font-serif text-2xl font-bold mb-4">Reverse French & negative space (21–30)</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">The reverse French inverts the traditional: colour at the base (lunula/cuticle area), clear or contrasting colour at the tip. Paired with negative space designs, these are the most editorial takes on the French tradition.</p>
        <div className="space-y-3">
          {[
            { n: 21, idea: 'Classic reverse French', desc: 'Colour applied at the cuticle half-moon, clear or nude at the tip. The most versatile reverse French — works in any colour.' },
            { n: 22, idea: 'Black reverse on nude', desc: 'Dramatic black half-moon at the base, nude nail. Graphic and editorial.' },
            { n: 23, idea: 'Gold reverse French', desc: 'Gold gel or chrome at the half-moon. Glamorous, slightly retro, very wearable for events.' },
            { n: 24, idea: 'Negative space centre', desc: 'Colour at both the base and tip, leaving a clear/natural stripe in the middle. Unusual and visually interesting.' },
            { n: 25, idea: 'Chrome reverse', desc: 'Chrome powder applied in the reverse French position at the cuticle. Strong contrast, modern.' },
            { n: 26, idea: 'Floating French', desc: 'The French line floats in the middle of the nail rather than at the tip — a white or coloured stripe in the nail centre with bare or clear gel above and below.' },
            { n: 27, idea: 'Double reverse', desc: 'Reverse French at the cuticle AND the standard French at the tip — creating two lines of colour with nude in between. Graphic, layered.' },
            { n: 28, idea: 'Diagonal French', desc: 'The tip line is cut diagonally rather than in the traditional smile curve. Creates a geometric, asymmetric effect.' },
            { n: 29, idea: 'Abstract French', desc: 'Loose, imprecise French-inspired lines — not following the smile curve precisely, more painterly. For clients who want the French "vibe" without the traditional execution.' },
            { n: 30, idea: 'Minimalist one-nail French', desc: 'Only the ring finger has a French tip; the others are nude. The French becomes an accent rather than the whole set.' },
          ].map(({ n, idea, desc }) => (
            <div key={n} className="border-l-4 border-[#C7D2FE] pl-4">
              <p className="font-semibold">{n}. {idea}</p>
              <p className="text-gray-600 text-sm mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="textured-chrome">
        <h2 className="font-serif text-2xl font-bold mb-4">Textured & chrome French (31–40)</h2>
        <div className="space-y-3">
          {[
            { n: 31, idea: 'Silver chrome tip', desc: 'Mirror silver chrome powder applied in the French tip position. Sharp, reflective, looks extraordinary in photographs.' },
            { n: 32, idea: 'Rose gold chrome French', desc: 'Rose gold chrome at the tip on a sheer pink or nude base. Bridal-adjacent, luxe, universally flattering.' },
            { n: 33, idea: 'Holographic French', desc: 'Holographic powder at the tip — rainbow light effects as the hand moves. Statement without being loud.' },
            { n: 34, idea: 'Glitter French', desc: 'Fine glitter in the French tip position — either in gel or pressed glitter. The glitter French is a strong "event nails" offering.' },
            { n: 35, idea: 'Cat eye French', desc: 'Cat eye gel applied at the tip, creating the magnetic shifting effect only in the French position. Unusual and highly photographable.' },
            { n: 36, idea: 'Matte French', desc: 'Classic white tip with a matte topcoat overall. The contrast between the matte finish and the classic French silhouette feels fresh and modern.' },
            { n: 37, idea: 'Textured tip', desc: 'Fine sugar or sand texture at the French tip — adding a tactile dimension to the classic silhouette.' },
            { n: 38, idea: 'Iridescent French', desc: 'A pearlescent or aurora finish at the tip — shifts colour depending on the light. Subtle and ethereal.' },
            { n: 39, idea: 'Velvet French', desc: 'Velvet or flock texture at the tip with a smooth body. Unusual material contrast — strong portfolio content.' },
            { n: 40, idea: 'Chrome reverse French', desc: 'Mirror chrome at the base (reverse French) with a classic colour at the tip. Two techniques in one — for clients who love both.' },
          ].map(({ n, idea, desc }) => (
            <div key={n} className="border-l-4 border-[#BBF7D0] pl-4">
              <p className="font-semibold">{n}. {idea}</p>
              <p className="text-gray-600 text-sm mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="seasonal-occasion">
        <h2 className="font-serif text-2xl font-bold mb-4">Seasonal & occasion French (41–50)</h2>
        <div className="space-y-3">
          {[
            { n: 41, idea: 'Bridal French', desc: 'Classic or micro French on almond or squoval — the most requested bridal nail across all demographics. Offer as a named service.' },
            { n: 42, idea: 'Christmas red French', desc: 'Classic French but red tip instead of white. Immediate Christmas energy. Pair with a gold foil accent nail.' },
            { n: 43, idea: 'New Year\'s glitter French', desc: 'Gold glitter or chrome tip for New Year\'s Eve. Your most-booked late December variation.' },
            { n: 44, idea: 'Valentine\'s pink French', desc: 'Pink tip or pink glitter French. Specifically market this in January as a Valentine\'s option.' },
            { n: 45, idea: 'Spring pastel French', desc: 'Soft pastel colour at the tip — any pale colour from the spring palette. Market as a spring refresh in February/March.' },
            { n: 46, idea: 'Summer coral French', desc: 'Coral or warm orange tip for summer. Looks extraordinary in sunlight.' },
            { n: 47, idea: 'Autumn burgundy French', desc: 'Deep red-purple tip for autumn. One of the strongest seasonal nail looks — book it as a seasonal colour with a defined campaign.' },
            { n: 48, idea: 'Winter navy French', desc: 'Dark navy tip on a nude or white base. Winter-appropriate, sophisticated, works for festive season to January.' },
            { n: 49, idea: 'Halloween French with details', desc: 'Black French with a small spider web or drip on the reverse side (underside of the tip). Subtle seasonal detail.' },
            { n: 50, idea: 'Birthday glitter French', desc: 'Client\'s favourite colour in the French position with a single glitter accent nail. Personalised, celebratory, great content post.' },
          ].map(({ n, idea, desc }) => (
            <div key={n} className="border-l-4 border-[#FED7AA] pl-4">
              <p className="font-semibold">{n}. {idea}</p>
              <p className="text-gray-600 text-sm mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="execution-tips">
        <h2 className="font-serif text-2xl font-bold mb-4">Execution & consultation tips</h2>
        <ArticleCallout variant="tip" title="French smile line — the three common methods">
          (1) French tip guides/strips: peel-and-stick tape that creates a guide for the white. Most consistent for beginners. (2) Freehand brush: a flat or liner brush loaded with white gel, painted in a single stroke from sidewall to sidewall. Takes practice. (3) Sponge fade (for ombre French): a sponge loaded with white used to blend the tip colour. Each method produces a slightly different result — knowing all three makes you flexible.
        </ArticleCallout>
        <ArticleTable
          headers={['Client asks for', 'Clarify']}
          rows={[
            ['"Classic French"', 'Show both traditional wide-tip and micro French — clients\' definitions vary widely'],
            ['"Modern French"', 'Ask what\'s their inspo image — "modern" could mean coloured tips, reverse French, or chrome. Need a reference.'],
            ['"French but not too obvious"', 'Micro French or nude-to-white fade tip — both are subtle'],
            ['"French for my wedding"', 'Discuss nail shape alongside tip style. Bridal French on the wrong shape can date the photos.'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">For shape ideas: <Link to="/learn/almond-nail-ideas" className="underline text-[#F52B8C]">almond nail ideas</Link> | <Link to="/learn/short-nail-ideas" className="underline text-[#F52B8C]">short nail ideas</Link>.</p>
      </section>
    </div>
  ),
});
export {};
