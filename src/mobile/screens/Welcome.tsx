import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { ArtBookingPage, ArtBookings, ArtRevenue } from '../components/WelcomeArt';
import { PINK } from '../lib/constants';

const SLIDES = [
  { Art: ArtBookingPage, title: 'Your studio in your pocket', sub: 'Run your booking page, services and prices from your phone.' },
  { Art: ArtBookings, title: 'Every booking, right away', sub: 'Get notified the moment a client books, pays or cancels.' },
  { Art: ArtRevenue, title: 'Know what you earn', sub: 'Revenue, deposits and page views at a glance.' },
];

export default function Welcome() {
  const [index, setIndex] = useState(0);
  const track = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };
  const goTo = (i: number) => track.current?.scrollTo({ left: i * track.current.clientWidth, behavior: 'smooth' });

  return (
    <div className="flex min-h-[100dvh] flex-col bg-white pt-safe">
      <div className="flex justify-center pt-4">
        <Logo size={34} />
      </div>

      <div
        ref={track}
        onScroll={onScroll}
        className="no-scrollbar flex flex-1 snap-x snap-mandatory overflow-x-auto"
        aria-roledescription="carousel"
      >
        {SLIDES.map(({ Art, title, sub }, i) => (
          <section
            key={title}
            className="flex w-full shrink-0 snap-center flex-col items-center justify-center px-8 pt-6"
            aria-label={`${i + 1} of ${SLIDES.length}`}
          >
            <div className="flex min-h-[330px] items-center">
              <Art />
            </div>
            <h1 className="mt-8 text-center text-[28px] font-extrabold leading-tight tracking-tight">{title}</h1>
            <p className="mt-2 max-w-[300px] text-center text-[15px] leading-snug text-gray-500">{sub}</p>
          </section>
        ))}
      </div>

      <div className="flex justify-center gap-2 py-5" role="tablist">
        {SLIDES.map((s, i) => (
          <button
            key={s.title}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Slide ${i + 1}`}
            onClick={() => goTo(i)}
            className="flex h-6 w-6 items-center justify-center"
          >
            <span className="block h-2 w-2 rounded-full transition-colors" style={{ backgroundColor: i === index ? PINK : '#E0E0E0' }} />
          </button>
        ))}
      </div>

      <div className="px-safe pb-safe">
        <div className="pb-4">
          <Link
            to="/signup"
            className="flex h-14 w-full items-center justify-center rounded-full text-[16px] font-bold text-white active:scale-[0.98]"
            style={{ backgroundColor: PINK }}
          >
            Sign up
          </Link>
          <p className="mt-3 text-center text-[15px] text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="inline-flex h-11 items-center font-bold text-[#1A1A1A]">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
