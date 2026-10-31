import { motion, useReducedMotion } from "framer-motion";
import { useState, type CSSProperties, type ReactNode } from "react";

const PINK = "#ec4899";
const Pink = ({ children }: { children: ReactNode }) => <span style={{ color: PINK }}>{children}</span>;
const cq = (n: number) => `${n}cqw`;
const SHADOW = "0 2.2cqw 5.5cqw rgba(60,20,50,0.22)";

const Photo = ({ src, style, className = "", objectPosition = "center top" }: { src: string; style?: CSSProperties; className?: string; objectPosition?: string }) => {
  const [ok, setOk] = useState(true);
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: "linear-gradient(135deg,#fbcfe8,#e9d5ff)", ...style }}>
      {ok && <img src={src} alt="" onError={() => setOk(false)} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition }} />}
    </div>
  );
};

// ─── Panel 1: Build your presence ────────────────────────────────────────────

type Profile = { photo: string; name: string; handle: string; accent: string; dark?: boolean; bg?: string; photoPos?: string; services: [string, string, string][] };

const Phone = ({ p, width, left, top, k, z = 0 }: { p: Profile; width: number; left: number; top: number; k: number; z?: number }) => {
  const s = (n: number) => cq(n * k);
  const bgColor = p.bg ?? (p.dark ? "#2a1022" : "#fffaf7");
  return (
    <div
      className="absolute overflow-hidden bg-neutral-900"
      style={{ width: cq(width), left: cq(left), top: cq(top), aspectRatio: "9 / 19", borderRadius: cq(4.6), border: `${cq(0.8)} solid #171717`, boxShadow: SHADOW, zIndex: z }}
    >
      <div className={`h-full w-full overflow-hidden ${p.dark ? "text-white" : "text-neutral-900"}`} style={{ borderRadius: cq(4), background: bgColor }}>
        <div className="mx-auto bg-neutral-900" style={{ width: "30%", height: s(2), borderRadius: 999, marginTop: s(0.9) }} />
        <Photo src={p.photo} className="mx-auto" objectPosition={p.photoPos ?? "center top"} style={{ width: "78%", aspectRatio: "4 / 5", borderTopLeftRadius: 999, borderTopRightRadius: 999, marginTop: s(1.4) }} />
        <p className="text-center font-extrabold tracking-tight" style={{ fontSize: s(2.2), marginTop: s(1.2) }}>{p.name}</p>
        <p className={`text-center ${p.dark ? "text-white/55" : "text-neutral-400"}`} style={{ fontSize: s(1.3) }}>{p.handle}</p>
        <div className="mx-auto text-center font-bold text-white" style={{ width: "82%", background: p.accent, borderRadius: 999, fontSize: s(1.4), padding: `${s(0.85)} 0`, marginTop: s(1.2) }}>
          Book now
        </div>
        <div className="mx-auto" style={{ width: "84%", marginTop: s(1.2), display: "grid", gap: s(0.8) }}>
          {p.services.map(([img, name, price]) => (
            <div key={name} className={`flex items-center ${p.dark ? "bg-white/10" : "bg-white"}`} style={{ gap: s(0.9), padding: s(0.75), borderRadius: s(1.3), boxShadow: p.dark ? "none" : "0 0.2cqw 0.5cqw rgba(0,0,0,0.05)" }}>
              <Photo src={img} style={{ width: s(3.6), height: s(3.6), borderRadius: s(0.9), flexShrink: 0 }} />
              <span className="flex-1 whitespace-nowrap font-semibold" style={{ fontSize: s(1.3) }}>{name}</span>
              <span className="font-bold" style={{ fontSize: s(1.3), color: p.dark ? "#f9a8d4" : p.accent }}>{price}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Side phones raised to top=6 to fill the 1.42 landscape panel better
const PresenceVisual = () => (
  <>
    <Phone k={0.88} width={35} left={3} top={6}
      p={{ photo: "/mockup/makeup-artist.jpg", name: "Lumi Makeup", handle: "@lumimakeup", accent: "#b5724a", bg: "#fffbf7", photoPos: "center 20%",
        services: [["/mockup/makeup-artist.jpg", "Soft Glam", "$85"], ["/mockup/makeup-artist.jpg", "Bridal Makeup", "$180"]] }} />
    <Phone k={0.88} width={35} left={62} top={6}
      p={{ photo: "/mockup/hairstylist.jpg", name: "Mae Hair Studio", handle: "@maehairstudio", accent: "#4a4540", bg: "#f8f6f4", photoPos: "center 30%",
        services: [["/mockup/hairstylist.jpg", "Blowout", "$55"], ["/mockup/hairstylist.jpg", "Silk Press", "$75"]] }} />
    <Phone k={1} width={42} left={29} top={2} z={10}
      p={{ photo: "/mockup/hero.jpg", name: "Gloss Studio", handle: "@glossstudio · LA", accent: PINK, dark: true,
        services: [["/mockup/nails-1.jpg", "Gel X Full Set", "$65"], ["/mockup/nails-2.jpg", "Russian Mani", "$45"], ["/mockup/nails-3.jpg", "Nail Art", "$15"]] }} />
  </>
);

// ─── Panel 2: Get booked 24/7 ────────────────────────────────────────────────

const Card = ({ children, style }: { children: ReactNode; style: CSSProperties }) => (
  <div className="absolute bg-white" style={{ borderRadius: cq(2.6), padding: cq(2.8), boxShadow: SHADOW, ...style }}>{children}</div>
);

const BookingVisual = () => {
  const days = [["Mon", "4"], ["Tue", "5"], ["Wed", "6"], ["Thu", "7"], ["Fri", "8"]];
  const slots = ["9:00", "10:30", "11:30", "13:00", "14:30", "16:00"];
  return (
    <>
      {/* Calendar card — occupies ~65% width, starts near top */}
      <Card style={{ left: cq(6), top: cq(5), width: cq(65) }}>
        <div className="flex items-center" style={{ gap: cq(1.6) }}>
          <Photo src="/mockup/nails-1.jpg" style={{ width: cq(5.5), height: cq(5.5), borderRadius: 999 }} />
          <div>
            <p className="font-bold" style={{ fontSize: cq(2.3) }}>Gel X Full Set</p>
            <p className="text-neutral-400" style={{ fontSize: cq(1.6) }}>Gloss Studio · 1h 30m · $65</p>
          </div>
        </div>
        <p className="font-semibold text-neutral-500" style={{ fontSize: cq(1.6), marginTop: cq(2.4) }}>November</p>
        <div className="grid grid-cols-5" style={{ gap: cq(1), marginTop: cq(1) }}>
          {days.map(([d, n], i) => (
            <div key={d} className={`text-center ${i === 3 ? "text-white" : "bg-neutral-50 text-neutral-600"}`}
              style={{ padding: `${cq(1.1)} 0`, borderRadius: cq(1.3), background: i === 3 ? PINK : undefined }}>
              <p style={{ fontSize: cq(1.3) }}>{d}</p>
              <p className="font-bold" style={{ fontSize: cq(2.2) }}>{n}</p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3" style={{ gap: cq(1.1), marginTop: cq(1.6) }}>
          {slots.map((s, i) => {
            const taken = i === 0 || i === 3;
            const selected = i === 2;
            return (
              <div key={s}
                className={`text-center font-semibold ${taken ? "bg-neutral-100 text-neutral-300 line-through" : selected ? "text-white" : "text-neutral-700"}`}
                style={{ fontSize: cq(1.7), padding: `${cq(1)} 0`, borderRadius: cq(1.1), border: taken ? "none" : `0.15cqw solid ${selected ? PINK : "#e5e5e5"}`, background: selected ? PINK : undefined }}>
                {s}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Deposit receipt — overlaps right side */}
      <Card style={{ right: cq(4), top: cq(33), width: cq(41), transform: "rotate(3deg)", zIndex: 10 }}>
        <div className="flex items-center justify-center rounded-full bg-emerald-100 font-bold text-emerald-600" style={{ width: cq(5), height: cq(5), fontSize: cq(2.2) }}>✓</div>
        <p className="font-bold" style={{ fontSize: cq(2.3), marginTop: cq(1.3) }}>Deposit paid</p>
        <p className="text-neutral-400" style={{ fontSize: cq(1.6) }}>Thu, Nov 7 · 11:30</p>
        <div className="border-t border-dashed border-neutral-200" style={{ marginTop: cq(1.8), paddingTop: cq(1.8), display: "grid", gap: cq(0.7) }}>
          <div className="flex justify-between" style={{ fontSize: cq(1.7) }}><span className="text-neutral-500">Deposit</span><span className="font-bold">$20.00</span></div>
          <div className="flex justify-between" style={{ fontSize: cq(1.7) }}><span className="text-neutral-500">Due at visit</span><span className="text-neutral-500">$45.00</span></div>
        </div>
      </Card>

      {/* SMS reminder */}
      <div className="absolute text-white" style={{ left: cq(7), bottom: cq(5), width: cq(54), background: "rgba(23,23,23,0.95)", borderRadius: cq(2.6), padding: cq(2.2), boxShadow: SHADOW, zIndex: 20 }}>
        <p className="text-white/50" style={{ fontSize: cq(1.4) }}>Messages · now</p>
        <p style={{ fontSize: cq(1.85), lineHeight: 1.35, marginTop: cq(0.6) }}>
          Hi Sarah 💅 Reminder: your <b>Gel X Full Set</b> with Gloss Studio is tomorrow at 11:30.
        </p>
      </div>
    </>
  );
};

// ─── Panel 3: Monetize your expertise ────────────────────────────────────────

const MonetizeVisual = () => (
  <div className="absolute inset-0 flex items-center justify-center" style={{ padding: `${cq(4)} ${cq(4.5)}` }}>
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: cq(2) }}>

      {/* ── Hero: course card ── */}
      <div className="overflow-hidden bg-white" style={{ borderRadius: cq(3), boxShadow: SHADOW }}>
        {/* Cover photo */}
        <div className="relative overflow-hidden" style={{ height: cq(14) }}>
          <Photo src="/mockup/nails-2.jpg" objectPosition="center 55%" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 40%, rgba(0,0,0,0.28) 100%)" }} />
          <span className="absolute" style={{ top: cq(1.6), left: cq(1.8), background: "rgba(255,255,255,0.95)", color: "#1a1a1a", fontSize: cq(1.4), fontWeight: 700, padding: `${cq(0.38)} ${cq(1.1)}`, borderRadius: 999 }}>
            Online course
          </span>
          <span className="absolute" style={{ top: cq(1.6), right: cq(1.8), background: "rgba(0,0,0,0.52)", color: "#fff", fontSize: cq(1.3), fontWeight: 600, padding: `${cq(0.32)} ${cq(0.95)}`, borderRadius: 999 }}>
            12 lessons
          </span>
        </div>
        {/* Info row */}
        <div className="flex items-center justify-between" style={{ padding: `${cq(1.5)} ${cq(2)} ${cq(1.6)}`, gap: cq(1.5) }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontWeight: 800, fontSize: cq(2.3), lineHeight: 1.15, color: "#1a1a1a" }}>Russian Mani Masterclass</p>
            <p style={{ fontSize: cq(1.4), color: "#9ca3af", marginTop: cq(0.5) }}>Self-paced · 4h 20m</p>
          </div>
          <div className="flex flex-col items-end flex-shrink-0" style={{ gap: cq(0.7) }}>
            <p style={{ fontWeight: 800, fontSize: cq(2.8), color: PINK, lineHeight: 1 }}>$149</p>
            <div style={{ background: PINK, color: "#fff", fontWeight: 700, fontSize: cq(1.35), padding: `${cq(0.5)} ${cq(1.4)}`, borderRadius: 999, whiteSpace: "nowrap" }}>
              Buy now
            </div>
          </div>
        </div>
      </div>

      {/* ── Two secondary cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: cq(2) }}>

        {/* Digital product */}
        <div className="overflow-hidden bg-white" style={{ borderRadius: cq(2.6), boxShadow: SHADOW }}>
          <div className="relative overflow-hidden" style={{ height: cq(8) }}>
            <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <Photo src="/mockup/nails-1.jpg" objectPosition="center" style={{ width: "100%", height: "100%" }} />
              <Photo src="/mockup/nails-3.jpg" objectPosition="center" style={{ width: "100%", height: "100%" }} />
            </div>
            <span className="absolute" style={{ top: cq(0.9), left: cq(1), background: "rgba(255,255,255,0.93)", color: "#1a1a1a", fontSize: cq(1.2), fontWeight: 700, padding: `${cq(0.28)} ${cq(0.85)}`, borderRadius: 999 }}>
              Digital
            </span>
          </div>
          <div style={{ padding: `${cq(1.2)} ${cq(1.6)} ${cq(1.4)}` }}>
            <p style={{ fontWeight: 700, fontSize: cq(1.8), lineHeight: 1.2, color: "#1a1a1a" }}>Nail Art Pack</p>
            <p style={{ fontSize: cq(1.3), color: "#9ca3af", marginTop: cq(0.2) }}>50 designs</p>
            <p style={{ fontWeight: 800, fontSize: cq(2), color: PINK, marginTop: cq(0.6) }}>$12</p>
          </div>
        </div>

        {/* Membership */}
        <div className="overflow-hidden bg-white" style={{ borderRadius: cq(2.6), boxShadow: SHADOW }}>
          <div className="relative overflow-hidden" style={{ height: cq(8) }}>
            <Photo src="/mockup/nails-3.jpg" objectPosition="center 40%" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
            <span className="absolute" style={{ top: cq(0.9), left: cq(1), background: "rgba(245,243,255,0.96)", color: "#6d28d9", fontSize: cq(1.2), fontWeight: 700, padding: `${cq(0.28)} ${cq(0.85)}`, borderRadius: 999 }}>
              Monthly
            </span>
          </div>
          <div style={{ padding: `${cq(1.2)} ${cq(1.6)} ${cq(1.4)}` }}>
            <p style={{ fontWeight: 700, fontSize: cq(1.8), lineHeight: 1.2, color: "#1a1a1a" }}>Infill Club</p>
            <p style={{ fontSize: cq(1.3), color: "#9ca3af", marginTop: cq(0.2) }}>Recurring members</p>
            <p style={{ fontWeight: 800, fontSize: cq(2), color: PINK, marginTop: cq(0.6) }}>$55<span style={{ fontSize: cq(1.25), fontWeight: 600, color: "#9ca3af" }}>/mo</span></p>
          </div>
        </div>

      </div>

      {/* ── Coaching row — tertiary, horizontal ── */}
      <div className="bg-white flex items-center overflow-hidden" style={{ borderRadius: cq(2.4), boxShadow: SHADOW }}>
        <div className="relative flex-shrink-0 overflow-hidden" style={{ width: cq(9), height: cq(7) }}>
          <Photo src="/mockup/hairstylist.jpg" objectPosition="center 20%" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
        </div>
        <div className="flex items-center flex-1 min-w-0" style={{ padding: `${cq(1.1)} ${cq(1.7)}`, gap: cq(1) }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: "inline-block", background: "#fce7f3", color: "#be185d", fontSize: cq(1.15), fontWeight: 700, padding: `${cq(0.22)} ${cq(0.75)}`, borderRadius: 999, marginBottom: cq(0.4) }}>
              1:1 Session
            </span>
            <p style={{ fontWeight: 700, fontSize: cq(1.7), lineHeight: 1.2, color: "#1a1a1a" }}>Nail Business Coaching</p>
            <p style={{ fontSize: cq(1.25), color: "#9ca3af", marginTop: cq(0.12) }}>60 min · Zoom or in-person</p>
          </div>
          <p style={{ fontWeight: 800, fontSize: cq(1.9), color: PINK, flexShrink: 0 }}>$95</p>
        </div>
      </div>

    </div>
  </div>
);

// ─── Panel 4: Grow your clientele ────────────────────────────────────────────

type ClientRow = { initial: string; name: string; service: string; visits: string; ltv: string; color: string };

const ClienteleVisual = () => {
  const clients: ClientRow[] = [
    { initial: "S", name: "Sarah M.", service: "Gel X Full Set", visits: "12 visits", ltv: "$780", color: "#f472b6" },
    { initial: "J", name: "Jade L.", service: "Russian Mani", visits: "8 visits", ltv: "$520", color: "#c084fc" },
    { initial: "A", name: "Amira K.", service: "BIAB Infill", visits: "6 visits", ltv: "$410", color: "#fb923c" },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ padding: `${cq(4)} ${cq(4.5)}` }}>
      <div style={{ width: "100%", display: "grid", gap: cq(2.4) }}>

        {/* AutoDM flow */}
        <div className="bg-white overflow-hidden" style={{ borderRadius: cq(3), boxShadow: SHADOW }}>
          {/* Social comment row */}
          <div style={{ padding: `${cq(1.8)} ${cq(2.4)} ${cq(1.4)}`, borderBottom: "1px solid #f3f4f6" }}>
            <div className="flex items-center" style={{ gap: cq(1.5) }}>
              {/* Avatar with IG-style gradient ring */}
              <div className="rounded-full flex-shrink-0" style={{ width: cq(5), height: cq(5), padding: cq(0.35), background: "linear-gradient(45deg,#f9a825,#e91e8c,#9c27b0)" }}>
                <div className="h-full w-full rounded-full overflow-hidden bg-white" style={{ padding: cq(0.2) }}>
                  <Photo src="/mockup/makeup-artist.jpg" objectPosition="center 15%" style={{ width: "100%", height: "100%", borderRadius: 999 }} />
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: cq(1.6), lineHeight: 1.3 }}><b>sarah.m</b> commented on your reel</p>
                <p style={{ fontSize: cq(1.85), fontWeight: 700, marginTop: cq(0.2), color: "#1a1a1a" }}>"BOOK" 🔥</p>
              </div>
              <span className="text-neutral-400 flex-shrink-0" style={{ fontSize: cq(1.35) }}>now</span>
            </div>
          </div>
          {/* AutoDM reply */}
          <div style={{ padding: `${cq(1.3)} ${cq(2.4)} ${cq(1.8)}` }}>
            <div className="flex items-center justify-between" style={{ marginBottom: cq(0.75) }}>
              <p className="text-neutral-400" style={{ fontSize: cq(1.35) }}>Nelsy sent automatically</p>
              <span style={{ fontSize: cq(1.3), color: "#10b981", fontWeight: 600 }}>Link clicked ✓</span>
            </div>
            <div className="ml-auto w-fit text-white" style={{ maxWidth: "88%", background: PINK, borderRadius: `${cq(2)} ${cq(2)} ${cq(0.6)} ${cq(2)}`, padding: `${cq(1.2)} ${cq(1.7)}`, fontSize: cq(1.65), lineHeight: 1.35 }}>
              Hey Sarah! Here's your booking link ✨
              <div className="font-bold underline underline-offset-1" style={{ marginTop: cq(0.4) }}>getnelsy.com/glossstudio</div>
            </div>
          </div>
        </div>

        {/* CRM panel */}
        <div className="bg-white" style={{ borderRadius: cq(3), padding: `${cq(1.8)} ${cq(2.4)}`, boxShadow: SHADOW }}>
          <div className="flex items-center justify-between" style={{ marginBottom: cq(1.4) }}>
            <p className="font-bold" style={{ fontSize: cq(2.2) }}>Your clients</p>
            <span className="font-semibold text-pink-700" style={{ fontSize: cq(1.4), padding: `${cq(0.4)} ${cq(1.2)}`, borderRadius: 999, background: "#fdf2f8" }}>1,248 emails</span>
          </div>
          <div className="divide-y divide-neutral-100">
            {clients.map((c) => (
              <div key={c.name} className="flex items-center" style={{ gap: cq(1.6), padding: `${cq(1.05)} 0` }}>
                <span className="flex items-center justify-center rounded-full font-bold text-white flex-shrink-0" style={{ width: cq(4.2), height: cq(4.2), fontSize: cq(1.65), background: c.color }}>
                  {c.initial}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="font-semibold truncate" style={{ fontSize: cq(1.85), lineHeight: 1.2 }}>{c.name}</p>
                  <p className="text-neutral-400 truncate" style={{ fontSize: cq(1.4), marginTop: cq(0.2) }}>{c.service} · {c.visits}</p>
                </div>
                <span className="font-bold flex-shrink-0" style={{ fontSize: cq(1.75), color: "#1a1a1a" }}>{c.ltv}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────

type Block = { title: ReactNode; body: string; tint: string; visual: ReactNode; alignStart?: boolean };

const BLOCKS: Block[] = [
  {
    title: <>Build your <Pink>presence.</Pink></>,
    body: "Create a link in bio that feels like your brand. Followers find your services, courses and products in one tap.",
    tint: "linear-gradient(180deg, #fbcfe8 0%, #fdf2f8 100%)",
    visual: <PresenceVisual />,
  },
  {
    title: <>Get booked <Pink>24/7.</Pink></>,
    body: "Clients book, pay a deposit and get reminded automatically. No more back-and-forth in DMs, and fewer no-shows.",
    tint: "linear-gradient(180deg, #fed7aa 0%, #fce7f3 100%)",
    visual: <BookingVisual />,
  },
  {
    title: <><Pink>Monetize</Pink> your expertise.</>,
    body: "Sell courses, digital products, memberships and 1:1 sessions directly from your Nelsy page. Keep 100% of your sales.",
    tint: "linear-gradient(180deg, #ddd6fe 0%, #fae8ff 100%)",
    visual: <MonetizeVisual />,
  },
  {
    title: <>Grow your <Pink>clientele.</Pink></>,
    body: "Collect emails, automate your DMs, keep track of every client and see what's working with built-in CRM and analytics.",
    tint: "linear-gradient(180deg, #fecdd3 0%, #fff1f2 100%)",
    visual: <ClienteleVisual />,
  },
];

export default function FeaturesSection() {
  const reduce = useReducedMotion();
  return (
    <section id="features" className="overflow-hidden bg-white pb-16 pt-8 md:pb-24 md:pt-10">
      <div className="mx-auto max-w-[1060px] px-6 md:px-10">

        {/* Section title */}
        <h2
          className="mx-auto text-center font-extrabold leading-[1.02] tracking-[-0.02em] text-neutral-900"
          style={{ fontSize: "clamp(22px, 5.5vw, 34px)", maxWidth: 440, marginBottom: "clamp(28px, 7vw, 48px)" }}
        >
          Everything your beauty business needs.
        </h2>

        {/* Feature blocks */}
        <div className="space-y-[48px] md:space-y-[64px]">
          {BLOCKS.map((b, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 gap-5 md:gap-10 lg:gap-12 md:grid-cols-[minmax(0,44fr)_minmax(0,56fr)] ${b.alignStart ? "md:items-start" : "md:items-center"}`}
            >
              {/* Text column */}
              <div
                className="md:max-w-[380px]"
                style={{ paddingTop: b.alignStart ? "clamp(0px, 2vw, 24px)" : undefined }}
              >
                <h3
                  className="font-extrabold tracking-[-0.02em] text-neutral-900 leading-[1.05]"
                  style={{ fontSize: "clamp(22px, 6vw, 30px)" }}
                >
                  {b.title}
                </h3>
                <p
                  className="mt-2.5 leading-[1.5] text-neutral-500"
                  style={{ fontSize: "clamp(13px, 3.5vw, 15px)", maxWidth: 400 }}
                >
                  {b.body}
                </p>
              </div>

              {/* Visual panel — 4:3 on mobile (less tall), 1.38:1 on desktop */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full overflow-hidden rounded-[22px] md:rounded-[28px] aspect-[4/3] md:aspect-[1.38/1]"
                style={{
                  background: b.tint,
                  containerType: "inline-size",
                } as React.CSSProperties}
              >
                {b.visual}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
