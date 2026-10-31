import { Link } from 'react-router-dom';
import { registerArticle } from '@/lib/articles';
import { ArticleCallout, ArticleTip, ArticleTable } from '@/components/article/ArticleBodyComponents';

registerArticle({
  slug: 'how-to-edit-nail-photos',
  title: 'How to Edit Nail Photos Without Making Them Look Fake',
  seoTitle: 'How to Edit Nail Photos Without Making Them Look Fake',
  excerpt: 'Light editing makes nail photos better. Heavy editing makes them misleading. Here\'s a simple editing workflow that enhances your nail photos without distorting what the nails actually look like.',
  seoDescription: 'How to edit nail photos without making them look fake. Editing adjustments for brightness, colour, and clarity — and what over-editing does to client trust and brand.',
  category: 'instagram-content',
  tags: ['nail photo editing', 'edit nail photos', 'nail tech photo tips', 'nail tech content editing'],
  heroImage: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)',
  heroImageAlt: 'How to edit nail photos without making them look fake',
  author: 'Nelsy Editorial',
  authorRole: 'Nail Tech Business Guide',
  publishedAt: '2026-10-21',
  toc: [
    { id: 'why-light', label: 'Why light editing is better' },
    { id: 'basic-adjustments', label: 'The basic adjustments' },
    { id: 'colour-correction', label: 'Colour correction' },
    { id: 'what-not-to-do', label: 'What not to do' },
    { id: 'editing-apps', label: 'Editing apps' },
    { id: 'consistency', label: 'Editing for feed consistency' },
  ],
  relatedSlugs: ['how-to-take-better-nail-photos', 'how-to-create-consistent-instagram-feed-nail-tech', 'how-to-film-nail-tech-tiktok-reels', 'how-to-batch-nail-content'],
  faq: [
    { q: 'Should I edit nail photos to make colours look more vibrant?', a: 'Small vibrance and saturation increases can make nail photos more eye-catching, but be careful with heavy saturation boosts — they can make colours look unrealistic and clients may arrive expecting a colour that doesn\'t match what they see. Aim to represent the nails accurately under ideal lighting conditions, not to make them look more intense than they are.' },
    { q: 'How do I fix a yellow cast in nail photos without professional editing software?', a: 'Most photo editing apps (including Lightroom Mobile, Snapseed, and even Instagram itself) have a "Temperature" or "Warmth" slider. Moving it toward the cooler (blue) end counteracts a yellow or warm cast. Also check the "Tint" slider — moving it slightly towards green can help with very yellow tungsten-light casts.' },
    { q: 'Do I need to use the same filter on every photo for a consistent feed?', a: 'Consistency comes from consistent lighting and white balance more than from applying the same filter. A single filter applied to photos taken in different lighting conditions will look inconsistent anyway. Better approach: get your shooting conditions consistent (same window, same background, same time of day) and do minimal editing. The consistency comes from the source, not the edit.' },
  ],
  relatedFeatureSlugs: ['instagram-autodm', 'link-in-bio'],
  content: () => (
    <div className="space-y-12 text-[#1A1A1A]">
      <section id="why-light">
        <h2 className="font-serif text-2xl font-bold mb-4">Why light editing is better</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Heavy editing creates a gap between what a client sees on your feed and what they see in person. When someone books based on a heavily filtered photo and arrives to find nails that look different — different colour, different finish — it erodes trust immediately.</p>
        <p className="text-gray-700 leading-relaxed">The goal of editing nail photos is to make them look like the nails looked at their best — sharp, well-lit, accurate colour — not to make them look like something they're not. Light editing should close the gap between "nails in poor salon light" and "nails in ideal light." It shouldn't create a gap between the photo and reality.</p>
      </section>

      <section id="basic-adjustments">
        <h2 className="font-serif text-2xl font-bold mb-4">The basic adjustments</h2>
        <ArticleTable
          headers={['Adjustment', 'What it does', 'Typical range']}
          rows={[
            ['Exposure / Brightness', 'Makes the whole photo lighter or darker', 'Small increase (+10 to +25) if shot in lower light'],
            ['Contrast', 'Difference between light and dark areas', 'Small increase (+5 to +15) adds depth without harshness'],
            ['Highlights', 'Controls bright areas', 'Reduce slightly (-10 to -20) to recover blown highlights on shiny nails'],
            ['Shadows', 'Controls dark areas', 'Increase slightly (+10 to +20) to lift dark shadow areas'],
            ['Clarity / Sharpness', 'Edge definition', 'Small increase (+10 to +20) for nail detail; don\'t overdo'],
            ['Vibrance', 'Subtle colour boost', 'Small increase (+10 to +20) for eye-catching colour without over-saturation'],
          ]}
        />
        <ArticleTip>These ranges are starting points. The right amount depends on your original photo. When in doubt, less is more — you can always undo.</ArticleTip>
      </section>

      <section id="colour-correction">
        <h2 className="font-serif text-2xl font-bold mb-4">Colour correction</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">Colour accuracy matters for nail photos — your client needs to see accurate nail colour:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Temperature (Warmth):</strong> Move toward cool (blue) to fix yellow/orange cast from artificial light</li>
          <li><strong>Tint:</strong> Move toward green slightly to fix yellow tungsten-light cast; adjust carefully</li>
          <li><strong>White balance:</strong> Some apps let you set this by tapping a neutral area — use a white background or cuticle area as reference</li>
        </ul>
        <ArticleCallout variant="info" title="Colour calibration test">
          Hold your edited photo next to the actual nails (if still with you) or a reference swatch. Do the colours match? If the photo shows a different shade, your edit has gone too far.
        </ArticleCallout>
      </section>

      <section id="what-not-to-do">
        <h2 className="font-serif text-2xl font-bold mb-4">What not to do</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li><strong>Heavy saturation boost:</strong> Makes colours look unnatural and misleading</li>
          <li><strong>Blurring the nail surface:</strong> Removes the texture detail that makes nail photos interesting (chrome, glitter, gel finish)</li>
          <li><strong>Skin smoothing/beauty filters:</strong> Blurs the background and creates an uncanny look; clients look different in person</li>
          <li><strong>Heavy vignette:</strong> Dark edges on nail photos pull focus away from the nails</li>
          <li><strong>Over-sharpening:</strong> Creates harsh artefacts on nail surface</li>
          <li><strong>Changing nail colour in editing:</strong> If you edited a pink to look more coral and a client books expecting coral, you've created an expectation problem</li>
        </ul>
      </section>

      <section id="editing-apps">
        <h2 className="font-serif text-2xl font-bold mb-4">Editing apps</h2>
        <ArticleTable
          headers={['App', 'Best for']}
          rows={[
            ['Lightroom Mobile (free)', 'Most control; allows presets for consistent editing; best all-around for nail photos'],
            ['Snapseed (free)', 'Easy to use; selective adjustments let you edit just the nail area; good for quick fixes'],
            ['VSCO (free/paid)', 'Film-style presets; good for consistent feed aesthetic; less technical control'],
            ['Instagram/TikTok built-in', 'Quick adjustments before posting; less control than dedicated apps but always available'],
          ]}
        />
        <p className="text-gray-700 mt-4 leading-relaxed">Lightroom Mobile's preset feature is particularly useful for batching — create one preset that applies your standard adjustments, then apply it to all photos from a session with one tap.</p>
      </section>

      <section id="consistency">
        <h2 className="font-serif text-2xl font-bold mb-4">Editing for feed consistency</h2>
        <p className="text-gray-700 mb-4 leading-relaxed">A consistent Instagram feed looks more professional and builds brand recognition. Consistency in editing comes from:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
          <li>Consistent shooting conditions (same window, same backgrounds) — this does most of the work</li>
          <li>A saved preset or "recipe" in your editing app that you apply to all photos</li>
          <li>Consistent decisions about what to include in frame</li>
        </ul>
        <p className="text-gray-700 leading-relaxed">For building an intentional feed aesthetic beyond editing: <Link to="/learn/how-to-create-consistent-instagram-feed-nail-tech" className="underline text-[#F52B8C]">how to create a consistent nail tech Instagram feed</Link>.</p>
      </section>
    </div>
  ),
});
export {};
