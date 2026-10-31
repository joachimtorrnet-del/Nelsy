import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const PINK = "#ec4899";

// ─── Testimonial data ─────────────────────────────────────────────────────────
// PLACEHOLDER DATA — replace with verified real users before launch.
// Do NOT present these as real customer testimonials until verified.

type Testimonial = {
  quote: string;
  name: string;
  handle: string;
  role: string;
  city: string;
  image: string | null; // path to real photo — required before launch
  instagramFollowers: string | null; // e.g. "48K" — verified data only
  tiktokFollowers: string | null;
};

// Flip to false to hide the section until real testimonials are confirmed.
const SHOW_SOCIAL_PROOF = true;

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Before Nelsy, I was using three different apps just to take bookings, sell my courses and message clients. Now everything lives on one page. My clients actually compliment how professional it looks.",
    name: "Maya Lopez",
    handle: "@nailsbymaya",
    role: "Nail artist",
    city: "Los Angeles",
    image: null,
    instagramFollowers: "48K",
    tiktokFollowers: "72K",
  },
  {
    quote:
      "I used to lose bookings because people couldn't find my link. With Nelsy, everything is in one place and I take a deposit automatically. My no-show rate dropped and my bookings went up.",
    name: "Julie Tran",
    handle: "@lashtudiobyjulie",
    role: "Lash artist",
    city: "New York",
    image: null,
    instagramFollowers: "22K",
    tiktokFollowers: "34K",
  },
  {
    quote:
      "I launched my first online course through Nelsy and had my first sale the same week. The setup was simple and it finally felt like I had a real business page, not just a link tree.",
    name: "Amara Osei",
    handle: "@amarabeautyco",
    role: "Beauty educator",
    city: "Atlanta",
    image: null,
    instagramFollowers: "61K",
    tiktokFollowers: "90K",
  },
  {
    quote:
      "My clients kept asking if they could prepay. Nelsy made that so easy — deposits, packages, everything. It gave my business a structure it never had before.",
    name: "Sofia Reyes",
    handle: "@sofiastudio_brows",
    role: "Brow artist",
    city: "Miami",
    image: null,
    instagramFollowers: "19K",
    tiktokFollowers: "28K",
  },
  {
    quote:
      "I sell a digital nail art pack and get new subscribers to my membership every week now. Having it all on one page means every follower can find exactly what they need from me.",
    name: "Kezia Park",
    handle: "@keziaparkbeauty",
    role: "Nail tech",
    city: "London",
    image: null,
    instagramFollowers: "37K",
    tiktokFollowers: "55K",
  },
];

// ─── Social icons ─────────────────────────────────────────────────────────────

const IgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
  </svg>
);

const TkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z" />
  </svg>
);

// ─── Avatar ───────────────────────────────────────────────────────────────────

const Avatar = ({ t }: { t: Testimonial }) => {
  const [ok, setOk] = useState(!!t.image);
  useEffect(() => { setOk(!!t.image); }, [t.image]);

  if (t.image && ok) {
    return (
      <img
        src={t.image}
        alt={t.name}
        onError={() => setOk(false)}
        className="h-full w-full object-cover object-top"
      />
    );
  }

  // Fallback initials until real photos are wired
  return (
    <span
      className="flex h-full w-full items-center justify-center text-[22px] font-black text-white"
      style={{ background: `linear-gradient(135deg, ${PINK}, #a855f7)` }}
    >
      {t.name.charAt(0)}
    </span>
  );
};

// ─── Arrow button ─────────────────────────────────────────────────────────────

const Arrow = ({ dir, onClick, label }: { dir: "left" | "right"; onClick: () => void; label: string }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className="flex shrink-0 items-center justify-center rounded-full border border-neutral-200 bg-white transition-colors hover:border-neutral-300 hover:bg-neutral-50"
    style={{ width: 48, height: 48 }}
  >
    {dir === "left" ? (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path d="M12 5l-5 5 5 5" stroke="#1a1a1a" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ) : (
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
        <path d="M8 5l5 5-5 5" stroke="#1a1a1a" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </button>
);

// ─── Section ──────────────────────────────────────────────────────────────────

export default function SocialProofSection() {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const total = TESTIMONIALS.length;

  const go = useCallback((d: 1 | -1) => {
    setDir(d);
    setIdx((i) => (i + d + total) % total);
  }, [total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [go]);

  const [touchX, setTouchX] = useState<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => setTouchX(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
    setTouchX(null);
  };

  if (!SHOW_SOCIAL_PROOF) return null;

  const t = TESTIMONIALS[idx];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 28 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -18 }),
  };

  return (
    <section className="bg-[#FFFBFB] pb-24 pt-24 md:pb-32 md:pt-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">

        {/* ── Headline ── */}
        <div className="mb-16 text-center md:mb-20">
          <h2
            className="font-extrabold leading-tight tracking-[-0.025em]"
            style={{ fontSize: "clamp(30px, 4.5vw, 52px)" }}
          >
            <span className="text-neutral-900">They love Nelsy.&nbsp;</span>
            <span style={{ color: PINK }}>Why not you?</span>
          </h2>
          <p
            className="mx-auto mt-4 text-neutral-500"
            style={{ fontSize: "clamp(15px, 1.4vw, 18px)", maxWidth: 480 }}
          >
            Beauty creators are building, booking and selling with Nelsy.
          </p>
        </div>

        {/* ── Carousel row ── */}
        <div className="flex items-center gap-4 md:gap-6">

          {/* Left arrow — hidden on mobile */}
          <div className="hidden md:block">
            <Arrow dir="left" onClick={() => go(-1)} label="Previous testimonial" />
          </div>

          {/* Card */}
          <div
            className="relative min-w-0 flex-1 overflow-hidden bg-white"
            style={{
              borderRadius: "clamp(32px, 4vw, 56px)",
              border: `2px solid ${PINK}30`,
              boxShadow: "0 1px 12px rgba(0,0,0,0.04)",
            }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence mode="wait" initial={false} custom={dir}>
              <motion.div
                key={idx}
                custom={dir}
                variants={reduce ? undefined : variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center"
                style={{
                  padding: "clamp(40px, 6vw, 80px) clamp(24px, 6vw, 96px)",
                }}
              >
                {/* Quote */}
                <p
                  className="font-medium leading-relaxed text-neutral-900"
                  style={{
                    fontSize: "clamp(22px, 2.8vw, 38px)",
                    lineHeight: 1.55,
                    maxWidth: 800,
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>

                {/* Author block */}
                <div className="mt-10 flex flex-col items-center gap-2 md:mt-12">
                  {/* Avatar */}
                  <div
                    className="overflow-hidden rounded-full"
                    style={{ width: "clamp(56px, 5vw, 72px)", height: "clamp(56px, 5vw, 72px)" }}
                  >
                    <Avatar t={t} />
                  </div>

                  {/* Name */}
                  <p
                    className="font-extrabold text-neutral-900"
                    style={{ fontSize: "clamp(16px, 1.4vw, 20px)", marginTop: 4 }}
                  >
                    {t.name}
                  </p>

                  {/* Handle + location */}
                  <p
                    className="text-neutral-400"
                    style={{ fontSize: "clamp(13px, 1vw, 15px)" }}
                  >
                    {t.handle} · {t.role}, {t.city}
                  </p>

                  {/* Social stats */}
                  {(t.instagramFollowers || t.tiktokFollowers) && (
                    <div className="mt-1 flex items-center gap-5 text-neutral-600">
                      {t.instagramFollowers && (
                        <div className="flex items-center gap-1.5">
                          <IgIcon />
                          <span className="text-[14px] font-semibold">{t.instagramFollowers}</span>
                        </div>
                      )}
                      {t.tiktokFollowers && (
                        <div className="flex items-center gap-1.5">
                          <TkIcon />
                          <span className="text-[14px] font-semibold">{t.tiktokFollowers}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right arrow — hidden on mobile */}
          <div className="hidden md:block">
            <Arrow dir="right" onClick={() => go(1)} label="Next testimonial" />
          </div>
        </div>

        {/* ── Mobile arrows ── */}
        <div className="mt-6 flex justify-center gap-3 md:hidden">
          <Arrow dir="left" onClick={() => go(-1)} label="Previous" />
          <Arrow dir="right" onClick={() => go(1)} label="Next" />
        </div>

        {/* ── Dot indicators ── */}
        <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Testimonial slides">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === idx}
              aria-label={`Slide ${i + 1}`}
              onClick={() => { setDir(i > idx ? 1 : -1); setIdx(i); }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === idx ? 22 : 7,
                height: 7,
                background: i === idx ? PINK : "#e5e7eb",
              }}
            />
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="mt-14 text-center">
          <Link to="/onboarding">
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 rounded-full text-white"
              style={{
                background: PINK,
                padding: "18px 36px",
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: "-0.01em",
                boxShadow: "0 8px 32px rgba(236,72,153,0.28)",
              }}
            >
              Start for free
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-[16px]">→</span>
            </motion.button>
          </Link>
        </div>

      </div>
    </section>
  );
}
