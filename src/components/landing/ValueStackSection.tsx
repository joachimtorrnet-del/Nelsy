import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";

const PINK = "#ec4899";

// ─── Data ─────────────────────────────────────────────────────────────────────
// 6 rows: 12+24+172+89+14+33 = 344

const ROWS = [
  { emoji: "🔗", bg: "#fce7f3", feature: "Link in bio",                  replaces: "Linktree",             price: "$12" },
  { emoji: "📅", bg: "#dbeafe", feature: "Bookings & reminders",         replaces: "GlossGenius",          price: "$24" },
  { emoji: "🎓", bg: "#ede9fe", feature: "Courses & digital products",   replaces: "Kajabi + Shopify",     price: "$172" },
  { emoji: "💎", bg: "#f3e8ff", feature: "Memberships",                  replaces: "Circle",               price: "$89" },
  { emoji: "💬", bg: "#fce7f3", feature: "Instagram AutoDM",             replaces: "ManyChat",             price: "$14" },
  { emoji: "✉️", bg: "#d1fae5", feature: "Email & CRM",                  replaces: "Mailchimp + HoneyBook",price: "$33" },
];

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ValueStackSection() {
  const reduce = useReducedMotion();

  return (
    <section id="pricing" className="overflow-hidden bg-[#FFFBFB] pb-10 pt-10 md:pb-16 md:pt-16">
      <div className="mx-auto max-w-[520px] px-4">

        {/* Heading */}
        <div className="text-center mb-5">
          <h2 className="text-[22px] font-extrabold leading-tight tracking-[-0.025em] text-neutral-900 sm:text-[28px] md:text-[36px]">
            A simpler way to run your beauty business.
          </h2>
          <p className="mx-auto mt-2 max-w-[380px] text-[13px] leading-snug text-neutral-500 sm:text-[14px]">
            No more paying for 5+ different tools. Nelsy brings it all into one place.
          </p>
        </div>

        {/* Comparison card */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[16px] border bg-white shadow-[0_4px_20px_rgba(0,0,0,0.07)]"
          style={{ borderColor: "#e8e8e8" }}
        >
          {/* Feature rows */}
          {ROWS.map((row, i) => (
            <div
              key={row.feature}
              className={`flex items-center gap-2 px-3 py-[7px] sm:px-4 sm:py-[9px] ${i < ROWS.length - 1 ? "border-b border-neutral-100" : ""}`}
            >
              <div
                className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[6px] text-[12px] sm:h-[30px] sm:w-[30px] sm:text-[13px]"
                style={{ background: row.bg }}
              >
                {row.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[12px] font-semibold text-neutral-900 leading-none sm:text-[12.5px]">{row.feature}</span>
                <p className="mt-[2px] text-[10px] leading-none text-neutral-400 truncate sm:text-[10.5px]">
                  Replaces {row.replaces}
                </p>
              </div>
              <span className="shrink-0 text-[12px] font-bold tabular-nums text-neutral-700 sm:text-[12.5px]">
                {row.price}/mo
              </span>
            </div>
          ))}

          {/* Divider */}
          <div className="border-t-[2px] border-neutral-200" />

          {/* "What you'd spend otherwise" */}
          <div className="flex items-center gap-2 px-3 py-[9px] sm:px-4 sm:py-[11px]">
            <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[6px] bg-neutral-100 text-[12px] text-neutral-400 sm:h-[30px] sm:w-[30px]">
              ✕
            </div>
            <p className="flex-1 min-w-0 text-[12px] font-semibold text-neutral-400 leading-none truncate sm:text-[13px]">
              What you'd spend otherwise
            </p>
            <span
              className="shrink-0 tabular-nums font-bold text-[15px] sm:text-[17px]"
              style={{ color: "#ef4444", textDecoration: "line-through", textDecorationColor: "#ef4444", textDecorationThickness: "2px" }}
            >
              $344/mo
            </span>
          </div>

          {/* Nelsy row */}
          <div
            className="flex items-center gap-2 px-3 py-[10px] sm:px-4 sm:py-3"
            style={{ background: `${PINK}10`, borderTop: `1.5px solid ${PINK}22` }}
          >
            <div
              className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[6px] text-[10px] font-black text-white sm:h-[30px] sm:w-[30px]"
              style={{ background: PINK }}
            >
              N
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold leading-none text-neutral-900 sm:text-[13.5px]">Nelsy</p>
              <p className="mt-[2px] text-[10px] leading-none text-neutral-500 sm:text-[10.5px]">Everything above, in one place</p>
            </div>
            <span className="shrink-0 text-[18px] font-extrabold tabular-nums sm:text-[20px]" style={{ color: PINK }}>
              $29.99<span className="text-[10px] font-semibold text-neutral-400">/mo</span>
            </span>
          </div>
        </motion.div>

        {/* CTA */}
        <div className="mt-4 mb-2">
          <Link to="/onboarding">
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="flex w-full items-center justify-between rounded-full text-white"
              style={{
                background: PINK,
                padding: "15px 22px",
                boxShadow: "0 6px 24px rgba(236,72,153,0.32)",
              }}
            >
              <span className="text-[15px] font-extrabold tracking-[-0.01em]">
                Start for free
              </span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-[15px] font-bold">
                →
              </span>
            </motion.button>
          </Link>
        </div>

      </div>
    </section>
  );
}
