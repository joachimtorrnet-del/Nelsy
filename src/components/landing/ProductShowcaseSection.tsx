import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const PINK = "#ec4899";

const Img = ({ src, objectPosition = "center top" }: { src: string; objectPosition?: string }) => {
  const [ok, setOk] = useState(true);
  return ok
    ? <img src={src} alt="" onError={() => setOk(false)} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition }} />
    : null;
};

// ─── Capability bubbles ───────────────────────────────────────────────────────
// 160px diameter, close to the mockup — same density as Stan

const BUBBLES = [
  { icon: "📅", label: "BOOKINGS",    bg: "#fce7f3", border: "#f9a8d4" },
  { icon: "🎓", label: "COURSES",     bg: "#f5f0ff", border: "#d8b4fe" },
  { icon: "📦", label: "PRODUCTS",    bg: "#fff4ed", border: "#fdba74" },
  { icon: "💎", label: "MEMBERSHIPS", bg: "#edfcf4", border: "#6ee7b7" },
  { icon: "💬", label: "AUTODM",      bg: "#fdf0f7", border: "#f0abcc" },
];

// Desktop positions — relative to the composition wrapper
// wrapper has horizontal padding:180px, vertical padding:90px top / 80px bottom
// bubbles are absolute within the wrapper
const POSITIONS: React.CSSProperties[] = [
  { left:  8,  top:  60 },   // BOOKINGS — top-left
  { left: "34%", top: -30 }, // COURSES — top-center (floats above laptop)
  { right: 8,  top:  50 },   // PRODUCTS — top-right
  { left:  16, bottom: 40 }, // MEMBERSHIPS — bottom-left
  { right: 8,  bottom: 30 }, // AUTODM — bottom-right
];

function Bubble({
  icon, label, bg, border, style,
}: { icon: string; label: string; bg: string; border: string; style?: React.CSSProperties }) {
  return (
    <div
      className="hidden lg:flex flex-col items-center justify-center rounded-full"
      style={{
        position: "absolute",
        width: 152,
        height: 152,
        background: bg,
        border: `2px solid ${border}`,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.05)",
        ...style,
      }}
    >
      <span style={{ fontSize: 40, lineHeight: 1 }}>{icon}</span>
      <p
        className="mt-2 text-center font-black uppercase tracking-[0.08em] text-neutral-700"
        style={{ fontSize: 10.5, lineHeight: 1.2, maxWidth: 100 }}
      >
        {label}
      </p>
    </div>
  );
}

// ─── Laptop mockup ────────────────────────────────────────────────────────────

// LaptopMockup uses cqw throughout so the dashboard UI scales perfectly
// at any container size — both desktop (720px) and mobile (250px).
const cq = (n: number) => `${n}cqw`;

function LaptopMockup() {
  return (
    <div className="relative" style={{ width: "100%", containerType: "inline-size" } as React.CSSProperties}>
      {/* Bezel */}
      <div
        className="relative overflow-hidden"
        style={{ borderRadius: `${cq(2.2)} ${cq(2.2)} 0 0`, border: `${cq(1.4)} solid #1a1a1a`, background: "#1a1a1a" }}
      >
        {/* Camera dot */}
        <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-center" style={{ height: cq(2.8) }}>
          <div className="rounded-full bg-neutral-600" style={{ width: cq(0.8), height: cq(0.8) }} />
        </div>

        {/* Screen */}
        <div
          className="relative overflow-hidden bg-[#F5F5F7]"
          style={{ aspectRatio: "16/9.6", containerType: "inline-size" } as React.CSSProperties}
        >
          {/* ── Sidebar ── */}
          <div
            className="absolute left-0 top-0 h-full bg-white"
            style={{ width: "18%", borderRight: "0.15cqw solid #e5e7eb" }}
          >
            {/* Logo */}
            <div className="flex items-center" style={{ gap: "1.2cqw", padding: "3cqw 2.2cqw 2cqw" }}>
              <div
                className="flex shrink-0 items-center justify-center rounded font-black text-white"
                style={{ width: "3.8cqw", height: "3.8cqw", background: PINK, borderRadius: "0.9cqw", fontSize: "2cqw" }}
              >N</div>
              <p className="font-bold text-neutral-900 truncate" style={{ fontSize: "1.9cqw" }}>Nelsy</p>
            </div>
            {/* Nav items */}
            {[
              ["My Page",     true ],
              ["Bookings",    false],
              ["Orders",      false],
              ["Courses",     false],
              ["Memberships", false],
              ["Clients",     false],
              ["Analytics",   false],
            ].map(([label, active]) => (
              <div
                key={label as string}
                style={{
                  margin: "0 1.2cqw 0.4cqw",
                  padding: "1.1cqw 1.5cqw",
                  borderRadius: "1cqw",
                  fontSize: "1.75cqw",
                  fontWeight: 600,
                  background: active ? `${PINK}18` : "transparent",
                  color: active ? PINK : "#9ca3af",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >{label as string}</div>
            ))}
          </div>

          {/* ── Main content ── */}
          <div
            className="absolute top-0 h-full flex flex-col"
            style={{ left: "19%", right: 0, padding: "2.5cqw 2.5cqw 2cqw", gap: "1.8cqw", overflow: "hidden" }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between" style={{ gap: "1cqw" }}>
              <p className="font-bold text-neutral-900 truncate" style={{ fontSize: "2cqw" }}>My Page</p>
              <div className="flex items-center shrink-0" style={{ gap: "1.4cqw" }}>
                <div
                  className="flex items-center bg-white"
                  style={{ gap: "0.8cqw", borderRadius: "99cqw", border: "0.15cqw solid #e5e7eb", padding: "0.5cqw 1.2cqw" }}
                >
                  <div className="rounded-full bg-emerald-400" style={{ width: "0.9cqw", height: "0.9cqw" }} />
                  <p className="text-neutral-500" style={{ fontSize: "1.4cqw", whiteSpace: "nowrap" }}>nelsy.com/glossstudio</p>
                </div>
                <div
                  className="font-bold text-white"
                  style={{ background: PINK, borderRadius: "99cqw", fontSize: "1.5cqw", padding: "0.6cqw 1.6cqw", whiteSpace: "nowrap" }}
                >Edit page</div>
              </div>
            </div>

            {/* Profile card */}
            <div
              className="flex items-center bg-white"
              style={{ gap: "1.8cqw", borderRadius: "1.8cqw", padding: "1.5cqw 2cqw", boxShadow: "0 0.2cqw 1.5cqw rgba(0,0,0,0.06)" }}
            >
              <div
                className="relative shrink-0 overflow-hidden rounded-full"
                style={{ width: "6cqw", height: "6cqw", background: "linear-gradient(135deg,#fbcfe8,#e9d5ff)" }}
              >
                <Img src="/mockup/makeup-artist.jpg" objectPosition="center 15%" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-extrabold text-neutral-900 truncate" style={{ fontSize: "1.9cqw" }}>Gloss Studio</p>
                <p className="text-neutral-400 truncate" style={{ fontSize: "1.5cqw" }}>Beauty educator · Los Angeles · 48k followers</p>
              </div>
              <div className="flex shrink-0 items-center" style={{ gap: "0.6cqw", fontSize: "2cqw" }}>
                <span>🔗</span><span>📸</span><span>🎵</span>
              </div>
            </div>

            {/* Page sections list */}
            <div className="flex-1 overflow-hidden" style={{ display: "flex", flexDirection: "column", gap: "1cqw" }}>
              {[
                ["📅", "Book a session",    "Bookings", "$65",    "#fce7f3"],
                ["🎓", "Gel X Masterclass", "Course",   "$149",   "#ede9fe"],
                ["📦", "Nail Art Guide",    "Product",  "$18",    "#fff7ed"],
                ["💎", "VIP Club",          "Members",  "$29/mo", "#f0fdf4"],
                ["💬", "AutoDM: BOOK",      "Growth",   "Active", "#f0f9ff"],
              ].map(([em, title, tag, price, tint]) => (
                <div
                  key={title as string}
                  className="flex items-center bg-white"
                  style={{ gap: "1.4cqw", borderRadius: "1.4cqw", padding: "1.1cqw 1.6cqw", boxShadow: "0 0.15cqw 1cqw rgba(0,0,0,0.05)" }}
                >
                  <div
                    className="flex shrink-0 items-center justify-center"
                    style={{ width: "4.2cqw", height: "4.2cqw", borderRadius: "1cqw", background: tint as string, fontSize: "2.2cqw" }}
                  >{em as string}</div>
                  <p className="flex-1 min-w-0 font-semibold text-neutral-900 truncate" style={{ fontSize: "1.75cqw" }}>{title as string}</p>
                  <span className="shrink-0 text-neutral-400" style={{ fontSize: "1.4cqw", marginRight: "0.5cqw" }}>{tag as string}</span>
                  <span className="shrink-0 font-bold" style={{ fontSize: "1.75cqw", color: PINK }}>{price as string}</span>
                </div>
              ))}
            </div>

            {/* KPI strip */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.2cqw" }}>
              {[["$3,840", "Revenue", PINK], ["28", "Bookings", "#a855f7"], ["486", "Clients", "#10b981"]].map(
                ([v, l, c]) => (
                  <div
                    key={l as string}
                    className="bg-white"
                    style={{ borderRadius: "1.4cqw", padding: "1.4cqw 1.6cqw", boxShadow: "0 0.2cqw 1.2cqw rgba(0,0,0,0.06)" }}
                  >
                    <p className="font-extrabold leading-none" style={{ fontSize: "3.2cqw", color: c as string }}>{v as string}</p>
                    <p className="text-neutral-400" style={{ fontSize: "1.3cqw", marginTop: "0.5cqw" }}>{l as string}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Laptop base */}
      <div className="w-full" style={{ height: cq(1.5), background: "#1a1a1a", borderRadius: "0 0 2px 2px" }} />
      <div className="mx-auto" style={{ height: cq(1), width: "38%", background: "#2c2c2c", borderRadius: "0 0 6px 6px" }} />
    </div>
  );
}

// ─── Phone mockup ─────────────────────────────────────────────────────────────

function PhoneMockup() {
  return (
    <div
      className="overflow-hidden"
      style={{
        width: 190,
        borderRadius: 36,
        border: "9px solid #1a1a1a",
        background: "#1a1a1a",
        flexShrink: 0,
        boxShadow: "0 32px 80px rgba(0,0,0,0.26)",
      }}
    >
      <div className="relative bg-[#FFFAF7]" style={{ aspectRatio: "9/19.5" }}>
        {/* Dynamic island */}
        <div
          className="mx-auto mt-2"
          style={{ height: 8, width: "40%", borderRadius: 999, background: "#1a1a1a" }}
        />
        <div className="flex flex-col items-center px-3 pt-3">
          {/* Avatar */}
          <div
            className="relative overflow-hidden rounded-full shadow-md"
            style={{ width: 52, height: 52, background: "linear-gradient(135deg,#fbcfe8,#e9d5ff)", flexShrink: 0 }}
          >
            <Img src="/mockup/makeup-artist.jpg" objectPosition="center 15%" />
          </div>
          <p className="mt-2 text-[11px] font-extrabold text-neutral-900">Gloss Studio</p>
          <p className="text-[8.5px] text-neutral-400">Beauty creator · Los Angeles</p>

          {/* CTA */}
          <div
            className="mt-3 w-full rounded-full py-1.5 text-center text-[9.5px] font-bold text-white"
            style={{ background: PINK }}
          >
            Book now
          </div>

          {/* Services */}
          <div className="mt-2.5 w-full space-y-1.5">
            {[
              ["📅", "Gel X Full Set",    "Booking",  "$65"   ],
              ["🎓", "Russian Masterclass","Course",   "$149"  ],
              ["📦", "Nail Art Guide",    "Digital",  "$18"   ],
              ["💎", "VIP Club",          "Members",  "$29/mo"],
            ].map(([em, s, tag, p]) => (
              <div
                key={s as string}
                className="flex items-center gap-2 rounded-xl bg-white px-2.5 py-1.5 shadow-sm"
              >
                <span className="text-[10px]">{em as string}</span>
                <p className="flex-1 text-[8px] font-semibold text-neutral-800 truncate">{s as string}</p>
                <span className="text-[6.5px] text-neutral-400 shrink-0 mr-1">{tag as string}</span>
                <p className="text-[8px] font-bold shrink-0" style={{ color: PINK }}>{p as string}</p>
              </div>
            ))}
          </div>

          {/* Powered by */}
          <div className="mt-3 flex items-center gap-1 opacity-40">
            <div className="h-1.5 w-1.5 rounded-full" style={{ background: PINK }} />
            <p className="text-[7px] text-neutral-400">Powered by Nelsy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Phone mockup (mobile overlay — scales via container width) ──────────────
// Uses cqw so proportions stay correct regardless of container size.

function PhoneMockupMini() {
  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "9/19.5",
        borderRadius: "12%",
        border: "min(2.8cqw, 9px) solid #1a1a1a",
        background: "#1a1a1a",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.28)",
        containerType: "inline-size",
      } as React.CSSProperties}
    >
      <div className="relative h-full bg-[#FFFAF7]">
        <div className="mx-auto mt-[3cqw]" style={{ height: "3.5cqw", width: "36%", borderRadius: 999, background: "#1a1a1a" }} />
        <div className="flex flex-col items-center px-[5cqw] pt-[2cqw]">
          <div className="relative overflow-hidden rounded-full" style={{ width: "28cqw", height: "28cqw", background: "linear-gradient(135deg,#fbcfe8,#e9d5ff)" }}>
            <Img src="/mockup/makeup-artist.jpg" objectPosition="center 15%" />
          </div>
          <p className="mt-[2cqw] font-extrabold text-neutral-900" style={{ fontSize: "6cqw", lineHeight: 1.1 }}>Gloss Studio</p>
          <p className="text-neutral-400" style={{ fontSize: "4.5cqw" }}>Beauty creator · LA</p>
          <div className="mt-[3cqw] w-full rounded-full text-center font-bold text-white" style={{ background: PINK, fontSize: "5cqw", padding: "2.5cqw 0" }}>
            Book now
          </div>
          <div className="mt-[2.5cqw] w-full" style={{ display: "flex", flexDirection: "column", gap: "2cqw" }}>
            {[
              ["📅", "Gel X Full Set",     "$65" ],
              ["🎓", "Masterclass",         "$149"],
              ["📦", "Nail Art Guide",      "$18" ],
            ].map(([em, s, p]) => (
              <div key={s as string} style={{ display: "flex", alignItems: "center", gap: "2cqw", background: "#fff", borderRadius: "3.5cqw", padding: "2cqw 2.5cqw", boxShadow: "0 0.5cqw 2cqw rgba(0,0,0,0.06)" }}>
                <span style={{ fontSize: "6cqw", flexShrink: 0 }}>{em as string}</span>
                <p style={{ flex: 1, minWidth: 0, fontSize: "4.5cqw", fontWeight: 600, color: "#111", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s as string}</p>
                <p style={{ fontSize: "4.5cqw", fontWeight: 700, color: PINK, flexShrink: 0 }}>{p as string}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ProductShowcaseSection() {
  const reduce = useReducedMotion();

  return (
    <section className="overflow-hidden bg-white pb-14 pt-10 md:pb-20 md:pt-20">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">

        {/* Headline */}
        <div className="mx-auto max-w-[620px] text-center">
          <h2
            className="font-extrabold tracking-[-0.03em] text-neutral-900"
            style={{ fontSize: "clamp(40px, 6vw, 52px)", lineHeight: 1.02 }}
          >
            Not just another&nbsp;link in bio.
          </h2>
          <p
            className="mx-auto mt-4 text-neutral-500"
            style={{ fontSize: "clamp(18px, 2.2vw, 20px)", lineHeight: 1.45, maxWidth: 420, fontWeight: 400 }}
          >
            Nelsy has everything you need to run your beauty business. All in one place.
          </p>
        </div>

        {/* ── Desktop composition ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
          style={{
            marginTop: 36,
            // Horizontal padding makes room for bubbles on left/right
            paddingLeft: 186,
            paddingRight: 186,
            // Vertical padding makes room for top/bottom bubbles
            paddingTop: 96,
            paddingBottom: 88,
          }}
        >
          {/* Bubbles */}
          {BUBBLES.map((b, i) => (
            <Bubble key={b.label} {...b} style={POSITIONS[i]} />
          ))}

          {/* Mockup row: laptop + phone overlapping */}
          <div className="relative flex items-end justify-center">
            <LaptopMockup />
            {/* Phone: overlaps right side of laptop, same as Stan */}
            <div
              className="absolute z-10"
              style={{ bottom: -8, right: -96 }}
            >
              <PhoneMockup />
            </div>
          </div>
        </motion.div>

        {/* ── Mobile orbital composition — single fixed-ratio artboard ── */}
        {/*
          Everything (laptop, phone, bubbles) is position:absolute inside one
          vw-sized artboard so proportions scale together as one illustration.
          Artboard: 92vw wide × 76vw tall ≈ 1.21:1 aspect ratio (matches Stan).
          All child positions are in vw units → scale perfectly across breakpoints.
        */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-10 lg:hidden"
          style={{ width: "92vw", height: "76vw", maxWidth: 440, maxHeight: 365 }}
        >
          {/* ── LAPTOP — dominant center element ── */}
          {/* width 70% of artboard, centered, sits in lower half */}
          <div
            style={{
              position: "absolute",
              width: "70%",
              left: "15%",
              top: "17%",
            }}
          >
            <LaptopMockup />
          </div>

          {/* ── PHONE — overlaps laptop right side ── */}
          {/* width 21% preserves 9:19.5 ratio via PhoneMockupMini's aspectRatio */}
          <div
            style={{
              position: "absolute",
              width: "21%",
              right: "2%",
              bottom: "3%",
              zIndex: 10,
              containerType: "inline-size",
            } as React.CSSProperties}
          >
            <PhoneMockupMini />
          </div>

          {/* ── BUBBLES — 14vw diameter, orbit the mockup ── */}
          {/* Bubble helper */}
          {(
            [
              // [bubble index, left/right, top/bottom, value]
              { b: 0, left: "1vw",  top:  "18%"              }, // BOOKINGS  upper-left
              { b: 1, left: "39%",  top:   "0%", tx: "-50%"  }, // COURSES   top-center
              { b: 2, right: "1vw", top:  "13%"              }, // PRODUCTS  upper-right
              { b: 3, left: "1vw",  bottom: "4%"             }, // MEMBERSHIPS lower-left
              { b: 4, right: "2vw", bottom:"12%"             }, // AUTODM    lower-right
            ] as Array<{ b: number; left?: string; right?: string; top?: string; bottom?: string; tx?: string }>
          ).map(({ b, left, right, top, bottom, tx }) => (
            <div
              key={BUBBLES[b].label}
              style={{
                position: "absolute",
                width: "14vw", height: "14vw",
                maxWidth: 68, maxHeight: 68,
                borderRadius: "50%",
                background: BUBBLES[b].bg,
                border: `1.5px solid ${BUBBLES[b].border}`,
                boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
                left, right, top, bottom,
                transform: tx ? `translateX(${tx})` : undefined,
              }}
            >
              <span style={{ fontSize: "5.5vw", lineHeight: 1 }}>{BUBBLES[b].icon}</span>
              <p
                style={{
                  fontSize: "1.55vw", fontWeight: 900, textTransform: "uppercase",
                  letterSpacing: "0.06em", color: "#374151", lineHeight: 1.15,
                  marginTop: "0.6vw", textAlign: "center", maxWidth: "10vw",
                }}
              >
                {BUBBLES[b].label}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
