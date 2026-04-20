import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-between px-6 py-10"
      style={{ backgroundColor: '#F52B8C' }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 self-start">
        <div className="w-8 h-8 bg-white rounded-lg" />
        <span className="text-xl font-bold text-white">Nelsy</span>
      </div>

      {/* Main content */}
      <div className="text-center max-w-md mx-auto w-full">
        <h1 className="text-[2.8rem] sm:text-[4rem] font-extrabold text-white leading-[1.1] tracking-tight mb-6">
          Turn your nail tech skills into a real business.
        </h1>
        <p className="text-lg sm:text-xl mb-10" style={{ color: 'rgba(255,255,255,0.80)' }}>
          Booking, payments & client management — all in one link.
        </p>

        <button
          onClick={() => navigate('/onboarding')}
          className="group w-full flex items-center justify-center gap-2 px-10 py-5 bg-white rounded-2xl font-bold text-xl transition-all shadow-2xl hover:bg-gray-50 active:scale-95"
          style={{ color: '#F52B8C' }}
        >
          Continue
          <svg
            className="w-6 h-6 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>

        <p className="text-sm mt-5" style={{ color: 'rgba(255,255,255,0.60)' }}>
          Free forever · No credit card required
        </p>
      </div>

      {/* Social proof */}
      <div className="flex items-center gap-3">
        <div className="flex -space-x-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-8 h-8 rounded-full border-2"
              style={{
                borderColor: 'rgba(255,255,255,0.5)',
                backgroundImage: `url(https://i.pravatar.cc/100?img=${i})`,
                backgroundSize: 'cover',
              }}
            />
          ))}
        </div>
        <p className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.80)' }}>
          500+ nail techs already earning more
        </p>
      </div>
    </div>
  );
}
