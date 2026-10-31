import { motion, useReducedMotion } from "framer-motion";

const PINK = "#ec4899";

// ─── Stage visuals ─────────────────────────────────────────────────────────────

function BookingVisual() {
  return (
    <div className="mt-5 overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.09)]">
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <p className="text-[16px] font-extrabold text-neutral-900">Gel X Full Set</p>
          <p className="text-[12px] text-neutral-400 mt-0.5">Thu Nov 7 · 11:30 AM</p>
        </div>
        <span className="text-[20px] font-extrabold" style={{ color: PINK }}>$65</span>
      </div>
      <div className="flex items-center gap-2 border-t border-neutral-100 bg-emerald-50 px-5 py-2.5">
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-[10px] font-bold text-emerald-700">✓</span>
        <p className="text-[12px] font-semibold text-emerald-700">Deposit paid</p>
      </div>
    </div>
  );
}

function AudienceVisual() {
  return (
    <div className="mt-5 space-y-2">
      {/* Comment trigger */}
      <div className="flex items-start gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-400 text-[11px] font-bold text-white">S</div>
        <div>
          <p className="text-[11px] text-neutral-400 leading-none mb-0.5">Sarah commented</p>
          <p className="text-[13px] font-bold text-neutral-900">BOOK</p>
        </div>
      </div>
      {/* Auto-reply */}
      <div className="rounded-2xl px-4 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.07)]" style={{ background: `${PINK}10` }}>
        <div className="flex items-center gap-1.5 mb-1">
          <div className="flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-black text-white" style={{ background: PINK }}>N</div>
          <p className="text-[10px] font-semibold" style={{ color: PINK }}>Nelsy · sent automatically</p>
        </div>
        <p className="text-[13px] font-semibold text-neutral-800">Here's your booking link ✨</p>
      </div>
      <p className="text-[10.5px] font-medium text-neutral-400 pl-1">Email captured · Added to your audience</p>
    </div>
  );
}

function MonetizeVisual() {
  const items = [
    { label: "Russian Mani Masterclass", sub: "Online course", price: "$149" },
    { label: "Glazed Donut Press-ons", sub: "Physical product", price: "$28" },
    { label: "VIP Nail Club", sub: "Membership", price: "$55/mo" },
  ];
  return (
    <div className="mt-5 space-y-2">
      {items.map((item) => (
        <div key={item.label} className="flex items-center justify-between rounded-xl bg-white px-4 py-2.5 shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
          <div>
            <p className="text-[12.5px] font-semibold text-neutral-900 leading-snug">{item.label}</p>
            <p className="text-[10.5px] text-neutral-400">{item.sub}</p>
          </div>
          <span className="text-[13px] font-extrabold" style={{ color: PINK }}>{item.price}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Stage data ────────────────────────────────────────────────────────────────

const STAGES = [
  {
    eyebrow: "START",
    heading: "Take bookings.",
    tint: "#fce7f3",
    comingSoon: false,
    visual: <BookingVisual />,
  },
  {
    eyebrow: "GROW",
    heading: "Build your audience.",
    tint: "#f3f0ff",
    comingSoon: false,
    visual: <AudienceVisual />,
  },
  {
    eyebrow: "EXPAND",
    heading: "Sell more than your time.",
    tint: "#faf6f0",
    comingSoon: true,
    visual: <MonetizeVisual />,
  },
];

// ─── Arrow connector ───────────────────────────────────────────────────────────

function Arrow() {
  return (
    <div className="hidden md:flex shrink-0 items-center justify-center self-center">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="13" fill="white" stroke="#e5e7eb" strokeWidth="1.5" />
        <path d="M11 14h6M14 11l3 3-3 3" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function GrowthSection() {
  const reduce = useReducedMotion();

  return (
    <section className="overflow-hidden bg-white pb-24 pt-24 md:pb-32 md:pt-32">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">

        {/* Heading */}
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="text-[32px] font-extrabold leading-[1.06] tracking-[-0.025em] text-neutral-900 sm:text-[42px] md:text-[54px]">
            Start with clients.<br className="hidden sm:block" /> Grow beyond appointments.
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-[17px] font-medium leading-relaxed text-neutral-500 sm:text-[18px] md:text-[20px]">
            Take bookings today. Add products, courses, memberships and new revenue streams as your beauty business grows.
          </p>
        </div>

        {/* Journey panel */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 overflow-hidden rounded-[28px] md:mt-14"
          style={{ background: "linear-gradient(135deg, #fce7f3 0%, #f3f0ff 50%, #faf6f0 100%)" }}
        >
          {/* Inner: three stages + arrows */}
          <div className="flex flex-col gap-0 md:flex-row md:items-stretch">
            {STAGES.map((stage, i) => (
              <>
                <motion.div
                  key={stage.eyebrow}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                  className="flex-1 px-6 py-7 md:px-7 md:py-8"
                  style={{
                    background: stage.tint,
                    borderRight: i < 2 ? "1px solid rgba(255,255,255,0.6)" : undefined,
                    borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.6)" : undefined,
                  }}
                >
                  {/* Eyebrow + badge */}
                  <div className="flex items-center gap-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: PINK }}>
                      {stage.eyebrow}
                    </p>
                    {stage.comingSoon && (
                      <span className="rounded-full border border-neutral-300 bg-white/60 px-2 py-[2px] text-[8px] font-semibold uppercase tracking-widest text-neutral-400">
                        Coming soon
                      </span>
                    )}
                  </div>

                  {/* Stage heading */}
                  <h3 className="mt-2 text-[22px] font-extrabold leading-[1.1] tracking-[-0.02em] text-neutral-900 md:text-[24px]">
                    {stage.heading}
                  </h3>

                  {/* Visual */}
                  {stage.visual}
                </motion.div>

                {/* Arrow between stages — desktop only */}
                {i < 2 && <Arrow key={`arrow-${i}`} />}
              </>
            ))}
          </div>

          {/* Closing statement */}
          <div className="border-t border-white/50 bg-white/30 px-6 py-4 text-center">
            <p className="text-[14px] font-bold tracking-wide text-neutral-700 md:text-[15px]">
              One business. One audience. One Nelsy.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
