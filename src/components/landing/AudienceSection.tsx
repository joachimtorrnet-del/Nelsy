import { motion, useReducedMotion } from "framer-motion";

const PINK = "#ec4899";

const ComingSoon = () => (
  <span className="inline-block rounded-full border border-neutral-300 bg-white/60 px-2 py-[2px] text-[9px] font-semibold uppercase tracking-widest text-neutral-400">
    Coming soon
  </span>
);

// ─── Card visuals ─────────────────────────────────────────────────────────────

function ProfessionalsVisual() {
  return (
    <div className="mt-5 overflow-hidden rounded-2xl bg-white shadow-[0_4px_18px_rgba(0,0,0,0.09)]">
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <p className="text-[16px] font-extrabold text-neutral-900">Gel X Full Set</p>
          <p className="mt-0.5 text-[12px] text-neutral-400">Thu Nov 7 · 11:30 AM</p>
        </div>
        <span className="text-[20px] font-extrabold" style={{ color: PINK }}>$65</span>
      </div>
      <div className="flex items-center gap-2 border-t border-neutral-100 bg-emerald-50 px-5 py-2.5">
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-[10px] font-bold text-emerald-700">✓</span>
        <p className="text-[12px] font-semibold text-emerald-700">Deposit paid · $20</p>
      </div>
    </div>
  );
}

function EducatorsVisual() {
  return (
    <div className="mt-5 overflow-hidden rounded-2xl bg-white shadow-[0_4px_18px_rgba(0,0,0,0.09)]">
      <div className="h-[72px] w-full" style={{ background: "linear-gradient(135deg,#c084fc 0%,#ec4899 60%,#f97316 100%)" }}>
        <div className="flex h-full items-end px-4 pb-2.5">
          <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-semibold text-white">Online course</span>
        </div>
      </div>
      <div className="px-5 py-4">
        <p className="text-[15px] font-extrabold text-neutral-900">Russian Mani Masterclass</p>
        <p className="mt-0.5 text-[12px] text-neutral-400">12 lessons</p>
        <p className="mt-2.5 text-[20px] font-extrabold" style={{ color: PINK }}>$149</p>
      </div>
    </div>
  );
}

function CreatorsVisual() {
  return (
    <div className="mt-5 space-y-2">
      <div className="flex items-start gap-2.5 rounded-2xl bg-white px-4 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-400 text-[11px] font-bold text-white">S</div>
        <div>
          <p className="text-[11px] text-neutral-400 leading-none mb-0.5">Sarah commented</p>
          <p className="text-[13px] font-bold text-neutral-900">BOOK</p>
        </div>
      </div>
      <div className="rounded-2xl px-4 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.07)]" style={{ background: `${PINK}12` }}>
        <div className="flex items-center gap-1.5 mb-1">
          <div className="flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-black text-white" style={{ background: PINK }}>N</div>
          <p className="text-[10px] font-semibold" style={{ color: PINK }}>Nelsy · sent automatically</p>
        </div>
        <p className="text-[13px] font-semibold text-neutral-800">Here's your booking link ✨</p>
      </div>
      <p className="pl-1 text-[10.5px] font-medium text-neutral-400">Email captured · Added to your audience</p>
    </div>
  );
}

function SellersVisual() {
  return (
    <div className="mt-5 overflow-hidden rounded-2xl bg-white shadow-[0_4px_18px_rgba(0,0,0,0.09)]">
      <div className="h-[72px] w-full" style={{ background: "linear-gradient(135deg,#fce7f3 0%,#f9a8d4 100%)" }} />
      <div className="px-5 py-4">
        <p className="text-[15px] font-extrabold text-neutral-900">Glazed Donut Set</p>
        <p className="mt-0.5 text-[12px] text-neutral-400">Press-ons · 24 tips</p>
        <p className="mt-2.5 text-[20px] font-extrabold" style={{ color: PINK }}>$28</p>
      </div>
      <div className="flex items-center gap-2 border-t border-neutral-100 bg-emerald-50 px-5 py-2.5">
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-200 text-[10px] font-bold text-emerald-700">✓</span>
        <p className="text-[12px] font-semibold text-emerald-700">Order received</p>
      </div>
    </div>
  );
}

// ─── Card data ─────────────────────────────────────────────────────────────────

const CARDS = [
  {
    label: "IN PERSON",
    title: "Beauty professionals",
    subtitle: "Nail artists, lash artists, brow artists, hairstylists, estheticians and makeup artists.",
    value: "Bookings, deposits, reminders and client management.",
    tint: "#fce7f3",
    comingSoon: false,
    visual: <ProfessionalsVisual />,
  },
  {
    label: "TEACH",
    title: "Educators & coaches",
    subtitle: "Beauty educators, trainers and coaches.",
    value: "Courses, coaching, memberships and digital products.",
    tint: "#f3f0ff",
    comingSoon: true,
    visual: <EducatorsVisual />,
  },
  {
    label: "CREATE",
    title: "Beauty creators",
    subtitle: "Creators growing an audience and monetizing their content.",
    value: "AutoDM, email capture, digital products and audience growth.",
    tint: "#fdf4ff",
    comingSoon: true,
    visual: <CreatorsVisual />,
  },
  {
    label: "SELL & SCALE",
    title: "Sellers & salons",
    subtitle: "Press-on artists, beauty product sellers and growing teams.",
    value: "Products, custom orders, storefronts and team workflows.",
    tint: "#faf6f0",
    comingSoon: true,
    visual: <SellersVisual />,
  },
];

// ─── Section ──────────────────────────────────────────────────────────────────

export default function AudienceSection() {
  const reduce = useReducedMotion();

  return (
    <section className="overflow-hidden bg-[#FFFBFB] pb-24 pt-24 md:pb-32 md:pt-32">
      <div className="mx-auto max-w-[1160px] px-5 md:px-10">

        {/* Heading */}
        <div className="mx-auto max-w-[680px] text-center">
          <h2 className="text-[30px] font-extrabold leading-[1.06] tracking-[-0.025em] text-neutral-900 sm:text-[40px] md:text-[50px]">
            Built for every kind of beauty business.
          </h2>
          <p className="mx-auto mt-4 max-w-[520px] text-[16px] font-medium leading-relaxed text-neutral-500 md:text-[18px]">
            From appointments to content, courses and products, Nelsy fits the way you work.
          </p>
        </div>

        {/* 2×2 grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-14">
          {CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              className="flex flex-col rounded-[24px] p-6 md:p-7"
              style={{ background: card.tint }}
            >
              {/* Label + coming soon */}
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-black uppercase tracking-[0.16em]" style={{ color: PINK }}>
                  {card.label}
                </p>
                {card.comingSoon && <ComingSoon />}
              </div>

              {/* Title */}
              <h3 className="mt-2 text-[22px] font-extrabold leading-[1.08] tracking-[-0.02em] text-neutral-900 md:text-[24px]">
                {card.title}
              </h3>

              {/* Subtitle */}
              <p className="mt-1.5 text-[13px] leading-snug text-neutral-500">
                {card.subtitle}
              </p>

              {/* Value line */}
              <p className="mt-2 text-[12.5px] font-semibold text-neutral-700">
                {card.value}
              </p>

              {/* Visual */}
              {card.visual}
            </motion.div>
          ))}
        </div>

        {/* Bottom message */}
        <p className="mt-10 text-center text-[15px] font-semibold text-neutral-500 md:text-[16px]">
          Most beauty businesses are more than one thing. Nelsy is built for that.
        </p>

      </div>
    </section>
  );
}
