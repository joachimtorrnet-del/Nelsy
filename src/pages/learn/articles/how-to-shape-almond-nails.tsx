import { registerArticle } from '@/lib/articles';
import { ArticleSteps, ArticleTip } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-shape-almond-nails',
  title: 'How to Shape Almond Nails Step by Step',
  seoTitle: 'How to Shape Almond Nails Step by Step',
  excerpt: 'Almond nails are one of the most flattering and elegant shapes — but they require filing precision to get right. Here\'s the exact technique, step by step.',
  seoDescription: 'How to shape almond nails step by step. Filing technique for almond nail shape on extensions and natural nails — taper, symmetry, and how to nail the rounded tip.',
  category: 'nail-education',
  tags: ['how to shape almond nails', 'almond nail shape', 'almond nail filing technique'],
  heroImage: 'linear-gradient(135deg, #FFF9FB 0%, #FDDDE6 100%)',
  heroImageAlt: 'How to shape almond nails step by step',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Education Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'what-is-almond', label: 'What makes a true almond shape' },
    { id: 'preparation', label: 'Preparation' },
    { id: 'step-by-step', label: 'Step-by-step filing' },
    { id: 'symmetry', label: 'Checking symmetry' },
    { id: 'common-mistakes', label: 'Common mistakes' },
  ],
  relatedSlugs: ['nail-shapes-explained', 'how-to-shape-coffin-nails', 'how-to-file-nail-extensions-into-shape', 'nail-file-grit-guide'],
  faq: [
    { q: 'Can you do almond shape on short natural nails?', a: 'True almond shape requires enough free edge to allow tapering — typically at least 3–4mm of free edge beyond the fingertip. On very short nails, there isn\'t enough length to create the taper without filing into the nail plate. An oval shape is the closest alternative for short nails.' },
    { q: 'What\'s the difference between almond and oval?', a: 'Oval nails have a consistently curved, rounded tip — like a flattened egg. Almond nails taper more sharply at the sides and come to a slightly more pointed tip — like the pointed end of an almond. The tip isn\'t as sharp as stiletto; it\'s a soft, rounded point.' },
  ],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="what-is-almond">
        <h2 className="font-serif text-2xl font-bold mb-4">What makes a true almond shape</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">An almond nail has three defining characteristics:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Straight or parallel sidewalls at the base</strong> — the nail doesn't narrow immediately from the cuticle</li>
          <li><strong>A taper that begins roughly in the middle of the nail length</strong> — both sides angling evenly toward the centre</li>
          <li><strong>A rounded tip</strong> — not flat (coffin) and not sharp (stiletto); the tip curves and comes to a soft point</li>
        </ul>
      </section>

      <section id="preparation">
        <h2 className="font-serif text-2xl font-bold mb-4">Preparation</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>File all nails to the target length before shaping — set length first so you're shaping from a consistent starting point</li>
          <li>Use a 180 grit file for shaping; 100–150 grit for bulk acrylic or hard gel if significantly reducing length first</li>
          <li>Have a light source positioned so you can see the nail from the side as you work</li>
        </ul>
      </section>

      <section id="step-by-step">
        <h2 className="font-serif text-2xl font-bold mb-4">Step-by-step filing</h2>
        <ArticleSteps
          steps={[
            { title: 'File the right side at 45 degrees', body: 'Hold the file at roughly 45 degrees to the right sidewall and stroke upward toward the centre of the tip. You\'re creating the right side of the taper. Work from the middle of the nail length, not from the base.' },
            { title: 'File the left side to match', body: 'Mirror the same angle and number of strokes on the left side. The goal is equal tapering on both sides — this is where symmetry lives. Check after every few strokes that both sides match.' },
            { title: 'Round the tip', body: 'Once both sides taper toward a point, round the very tip with light, curved strokes following the shape of the tip. You\'re blending the point into a soft curve — not filing it flat. The finished tip should be a smooth, rounded point.' },
            { title: 'Check the shape from above', body: 'Hold the nail up and look straight down at it from above — both sides should taper symmetrically and the tip should be centred. Any leaning to one side is visible from this angle.' },
            { title: 'Check the shape from the side', body: 'Look along the finger from the side — the profile should taper to the tip cleanly without a flat or wedge shape at the end.' },
            { title: 'Refine and repeat on all nails', body: 'Repeat on all nails, checking each pair (left and right index, left and right middle, etc.) against each other as you go.' },
          ]}
        />
        <ArticleTip>Work from the midpoint of the nail length when creating the taper — if you start tapering from too low down, the shape will look too narrow at the base. The straight sidewalls should remain visible before the taper begins.</ArticleTip>
      </section>

      <section id="symmetry">
        <h2 className="font-serif text-2xl font-bold mb-4">Checking symmetry</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Compare each nail to its counterpart on the other hand before moving on</li>
          <li>Look at both hands flat, palms down, from directly above — shape differences are easiest to spot this way</li>
          <li>The taper should look equal on both sides of each nail; a shape that tapers more on one side than the other looks off-centre</li>
          <li>For the tip specifically: the rounded point should be centred, not offset to one side</li>
        </ul>
      </section>

      <section id="common-mistakes">
        <h2 className="font-serif text-2xl font-bold mb-4">Common mistakes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li><strong>Starting the taper too low:</strong> Creates a very narrow, stiletto-like shape rather than almond; begin the taper at the midpoint of nail length</li>
          <li><strong>Uneven taper on both sides:</strong> One side angled more than the other creates an off-centre tip; always check side by side</li>
          <li><strong>Filing the tip flat:</strong> Creates a coffin shape, not almond; the tip must be curved and rounded</li>
          <li><strong>Over-filing into stiletto territory:</strong> Taking the point too far removes the rounded tip; the distinction between almond and stiletto is the rounded tip</li>
        </ul>
      </section>
    </div>
  ),
});
export {};
