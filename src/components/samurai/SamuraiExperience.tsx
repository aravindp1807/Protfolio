<<<<<<< HEAD
import { useEffect, useRef } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";
import { phases } from "@/data/samuraiData";
=======
import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";
import { phases } from "@/data/samuraiData";
import TypingText from "@/components/TypingText";
>>>>>>> f6fc99b (ui changes)

interface Props {
  scrollYProgress: MotionValue<number>;
}

// Piecewise fade: returns 0..1 opacity for a band with soft in/out edges.
const bandOpacity = (p: number, start: number, end: number) => {
  const fadeIn = Math.min(0.06, Math.max(start, 0.001));
  const fadeOut = Math.min(0.06, Math.max(1 - end, 0.001));
  if (p < start - fadeIn || p > end + fadeOut) return 0;
  if (p < start) return (p - (start - fadeIn)) / fadeIn;
  if (p > end) return 1 - (p - end) / fadeOut;
  return 1;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * Math.max(0, Math.min(1, t));

export function SamuraiExperience({ scrollYProgress }: Props) {
  const stanceRef = useRef<HTMLDivElement | null>(null);
  const slashRef = useRef<HTMLDivElement | null>(null);
  const warningRef = useRef<HTMLDivElement | null>(null);
<<<<<<< HEAD

  const apply = (p: number) => {
    const stance = bandOpacity(p, 0.02, 0.28);
=======
  const [typingEnabled, setTypingEnabled] = useState(true);

  const apply = (p: number) => {
    const stance = bandOpacity(p, 0.02, 0.28);
    setTypingEnabled(stance > 0.05);
>>>>>>> f6fc99b (ui changes)
    const slash = bandOpacity(p, 0.36, 0.6);
    const warning = bandOpacity(p, 0.68, 0.98);

    if (stanceRef.current) {
      const y = lerp(0, -30, p / 0.28);
      stanceRef.current.style.opacity = String(stance);
      stanceRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
      stanceRef.current.style.visibility = stance === 0 ? "hidden" : "visible";
    }
    if (slashRef.current) {
      const s = lerp(1.06, 0.98, (p - 0.36) / (0.6 - 0.36));
      slashRef.current.style.opacity = String(slash);
      slashRef.current.style.transform = `scale(${s})`;
      slashRef.current.style.visibility = slash === 0 ? "hidden" : "visible";
    }
    if (warningRef.current) {
      warningRef.current.style.opacity = String(warning);
      warningRef.current.style.visibility = warning === 0 ? "hidden" : "visible";
    }
  };

  useEffect(() => {
    apply(scrollYProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(scrollYProgress, "change", apply);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />
      <CornerTicks />

      {/* Phase I — Stance */}
      <div
        ref={stanceRef}
        style={{ opacity: 1, willChange: "opacity, transform" }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      >
<<<<<<< HEAD
        <span className="mb-6 font-mono text-[10px] tracking-[0.5em] text-muted-foreground">
          {phases.stance.kicker}
=======
        <span className="mb-6 font-mono text-[10px] tracking-[0.5em] text-[#B4B4B4]" style={{
    textShadow: "0 1px 3px rgba(0,0,0,0.8)",
  }}>
          <>
  Welcome to{" "}
  <TypingText
    enabled={typingEnabled}
    words={[
      "Aravind Pyli's",
      "AI Architect's",
      "ML Engineer's",
      "Computer Vision Researcher's",
      "Open Source Contributor's",
    ]}
  />
</>
>>>>>>> f6fc99b (ui changes)
        </span>
        <h1 className="font-display text-5xl leading-[0.95] text-bright-steel md:text-7xl lg:text-8xl">
          {phases.stance.title}
        </h1>
        <div className="mt-6 h-px w-24 bg-blood-red" />
<<<<<<< HEAD
        <p className="mt-6 max-w-md text-sm tracking-[0.15em] text-muted-foreground uppercase">
=======
        <p className="mt-6 max-w-3xl text-sm tracking-[0.15em] text-[#B4B4B4] uppercase">
>>>>>>> f6fc99b (ui changes)
          {phases.stance.subtitle}
        </p>
        <span className="mt-16 font-mono text-[10px] tracking-[0.5em] text-blade-silver">
          {phases.stance.cta} ↓
        </span>
      </div>

      {/* Phase II — Slash */}
      <div
        ref={slashRef}
        style={{ opacity: 0, willChange: "opacity, transform" }}
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
      >
<<<<<<< HEAD
        <span className="mb-6 font-mono text-[10px] tracking-[0.5em] text-blood-red">
=======
        <span className="mb-6 font-mono text-[10px] tracking-[0.5em] text-[#B4B4B4]">
>>>>>>> f6fc99b (ui changes)
          {phases.slash.kicker}
        </span>
        <h2 className="font-display text-[2.5rem] leading-[1.05] tracking-tight text-bright-steel sm:text-5xl sm:tracking-normal md:text-8xl lg:text-9xl">
          {phases.slash.title}
        </h2>
        <p className="mt-8 font-mono text-xs tracking-[0.5em] uppercase text-blade-silver">
          {phases.slash.subtitle}
        </p>
      </div>

      {/* Phase III — Warning */}
      <div
        ref={warningRef}
        style={{ opacity: 0, willChange: "opacity" }}
        className="absolute inset-0 flex items-end justify-between gap-8 px-8 pb-24 md:px-16 md:pb-32"
      >
        <div className="max-w-lg">
          <span className="font-mono text-[10px] tracking-[0.5em] text-muted-foreground">
            {phases.warning.kicker}
          </span>
          <h2 className="mt-4 font-display text-4xl leading-[0.95] text-bright-steel md:text-6xl whitespace-pre-line">
            {phases.warning.title}
          </h2>
          <div className="mt-6 h-px w-16 bg-blood-red" />
        </div>
        <dl className="hidden max-w-xs shrink-0 space-y-4 text-right md:block">
          {phases.warning.specs.map((s) => (
            <div key={s.label} className="border-t border-border pt-2">
              <dt className="font-mono text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
                {s.label}
              </dt>
              <dd className="mt-1 font-display text-sm text-bright-steel">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function CornerTicks() {
  const cls = "absolute h-4 w-4 border-blade-silver/40";
  return (
    <>
      <span className={`${cls} left-6 top-24 border-l border-t`} />
      <span className={`${cls} right-6 top-24 border-r border-t`} />
      <span className={`${cls} bottom-6 left-6 border-b border-l`} />
      <span className={`${cls} bottom-6 right-6 border-b border-r`} />
    </>
  );
}
