import { motion, useReducedMotion } from "framer-motion";

const PINK = "#ec4899";

export default function ZeroFeesSection() {
  const reduce = useReducedMotion();

  return (
    <section className="overflow-hidden bg-white pb-16 pt-16 md:pb-24 md:pt-24">
      <div className="mx-auto max-w-[680px] px-5 text-center">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Big 0% */}
          <p
            className="font-extrabold leading-none tracking-[-0.06em]"
            style={{ fontSize: "clamp(96px, 18vw, 160px)", color: PINK }}
          >
            0%
          </p>

          {/* Headline */}
          <h2 className="mt-3 text-[24px] font-extrabold leading-tight tracking-[-0.02em] text-neutral-900 sm:text-[30px] md:text-[36px]">
            Nelsy booking fees.
          </h2>

          {/* Supporting copy */}
          <p className="mx-auto mt-4 max-w-[420px] text-[16px] leading-relaxed text-neutral-500 md:text-[18px]">
            Keep more of every booking. Nelsy doesn't take a platform commission from your booking revenue.
          </p>


        </motion.div>
      </div>
    </section>
  );
}
