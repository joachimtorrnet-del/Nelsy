import { useLocation, Link } from 'react-router-dom';
import { trackSeoCTAClicked } from '@/lib/analytics';

const PINK = '#F52B8C';

type Position = 'hero' | 'inline' | 'footer_cta' | 'nav';
type Variant = 'primary' | 'primary-dark' | 'nav';

interface SeoCTAProps {
  label?: string;
  position: Position;
  variant?: Variant;
  className?: string;
}

/**
 * A "Start free trial" CTA that fires seo_cta_clicked before navigating to /onboarding.
 * Wraps a <Link to="/onboarding"> so navigation still works if JS hasn't fired yet.
 */
export default function SeoCTA({
  label = 'Start your 14-day free trial →',
  position,
  variant = 'primary',
  className,
}: SeoCTAProps) {
  const { pathname } = useLocation();

  function handleClick() {
    trackSeoCTAClicked(pathname, position, label);
  }

  if (variant === 'nav') {
    return (
      <Link to="/onboarding" className="hidden sm:block" onClick={handleClick}>
        <button
          className={className ?? 'px-4 py-2 text-white rounded-lg text-sm font-bold transition active:scale-95 shadow-sm hover:opacity-90'}
          style={{ backgroundColor: PINK }}
        >
          {label}
        </button>
      </Link>
    );
  }

  if (variant === 'primary-dark') {
    return (
      <Link to="/onboarding" onClick={handleClick}>
        <button
          className={className ?? 'px-10 py-4 bg-white font-bold rounded-2xl hover:bg-gray-50 transition active:scale-95 shadow-2xl text-base sm:text-lg'}
          style={{ color: PINK }}
        >
          {label}
        </button>
      </Link>
    );
  }

  return (
    <Link to="/onboarding" onClick={handleClick}>
      <button
        className={className ?? 'px-10 py-4 text-white font-bold rounded-2xl transition active:scale-95 shadow-lg text-base sm:text-lg hover:opacity-90'}
        style={{ backgroundColor: PINK }}
      >
        {label}
      </button>
    </Link>
  );
}
