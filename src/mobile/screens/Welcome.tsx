import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { ArtCashout, ArtNotifs, ArtRevenue } from '../components/WelcomeArt';
import { MUTED, PrimaryPill } from '../components/onboardingUi';
import { INK } from '../lib/constants';
import { readDemoFlag } from '../lib/demo';

const SLIDES = [
  { Art: ArtRevenue, title: 'Welcome to Nelsy 👋', sub: 'Get booked and paid from your link in bio' },
  { Art: ArtCashout, title: 'Cash out your earnings', sub: 'Receive your funds with one tap' },
  { Art: ArtNotifs, title: 'Never miss a notif', sub: 'Get notified when a client books' },
];

const AUTO_MS = 5000;

export default function Welcome() {
  const navigate = useNavigate();
  // Demo previews can open a given slide: #/welcome?demo=1&slide=2
  const startSlide = useMemo(() => {
    if (!readDemoFlag()) return 0;
    const n = Number(new URLSearchParams(window.location.hash.split('?')[1] ?? '').get('slide'));
    return n >= 1 && n <= SLIDES.length ? n - 1 : 0;
  }, []);
  const [index, setIndex] = useState(startSlide);
  const [touched, setTouched] = useState(startSlide > 0);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = track.current;
    if (el && startSlide) el.scrollLeft = startSlide * el.clientWidth;
  }, [startSlide]);

  const goTo = (i: number, smooth = true) => track.current?.scrollTo({ left: i * track.current.clientWidth, behavior: smooth ? 'smooth' : 'auto' });

  // Auto-advance until the user swipes or taps a dot.
  useEffect(() => {
    if (touched) return;
    const t = setTimeout(() => goTo((index + 1) % SLIDES.length), AUTO_MS);
    return () => clearTimeout(t);
  }, [index, touched]);

  const onScroll = () => {
    const el = track.current;
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#F8F6F7] pt-safe">
      <div className="flex h-[30px] justify-center" style={{ marginTop: 12 }}>
        <Logo size={30} textSize={31} gap={10} />
      </div>

      <div
        ref={track}
        onScroll={onScroll}
        onTouchStart={() => setTouched(true)}
        onPointerDown={() => setTouched(true)}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
        style={{ marginTop: 55 }}
        aria-roledescription="carousel"
      >
        {SLIDES.map(({ Art, title, sub }, i) => (
          <section key={title} className="w-full shrink-0 snap-center overflow-hidden" aria-label={`${i + 1} of ${SLIDES.length}`}>
            <Art />
            <h1 className="mt-[37px] text-center text-[29px] font-extrabold leading-[1.2] tracking-[-0.01em]" style={{ color: INK }}>
              {title}
            </h1>
            <p className="mt-[10px] px-4 text-center text-[17px]" style={{ color: MUTED }}>
              {sub}
            </p>
          </section>
        ))}
      </div>

      <div className="min-h-[24px] flex-1" />

      <div className="px-[39px]">
        <PrimaryPill onClick={() => navigate('/signup')}>Sign up</PrimaryPill>
        <Link to="/login" className="mx-auto mt-[5px] flex h-11 w-fit items-center px-4 text-[20px] font-bold" style={{ color: INK }}>
          Log in
        </Link>
      </div>

      {/* Dots sit in the top of the home-indicator area, like the reference */}
      <div className="flex justify-center pb-safe pt-[36px]" style={{ marginBottom: -14 }} role="tablist">
        {SLIDES.map((s, i) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Slide ${i + 1}`}
            onClick={() => {
              setTouched(true);
              goTo(i);
            }}
            className="flex h-6 w-[15px] items-center justify-center"
          >
            <span
              className="block rounded-full transition-all"
              style={{ width: i === index ? 10 : 8, height: i === index ? 10 : 8, backgroundColor: i === index ? '#B9B5BA' : '#DCD9DC' }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
