import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

interface Props {
  skills: string[];
}

/**
 * 3D rotating arsenal — skills arranged as plates on a vertical-axis ring.
 * Auto-rotates. Drag horizontally to spin. Pauses auto-rotate while dragging.
 */
export function ArsenalRing({ skills }: Props) {
  const count = skills.length;
  const [radius, setRadius] = useState(320);
  const rotate = useMotionValue(0);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startRotRef = useRef(0);

  // Responsive radius
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w < 640) setRadius(200);
      else if (w < 1024) setRadius(280);
      else setRadius(360);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Auto-rotate
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!draggingRef.current) {
        rotate.set(rotate.get() + dt * 12); // deg/sec
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [rotate]);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    startXRef.current = e.clientX;
    startRotRef.current = rotate.get();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - startXRef.current;
    rotate.set(startRotRef.current + dx * 0.4);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
    animate(rotate, rotate.get() + 30, {
      type: "spring",
      stiffness: 40,
      damping: 20,
    });
  };

  return (
    <div
      ref={wrapRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className="relative mx-auto flex h-[520px] w-full max-w-[1100px] cursor-grab touch-none select-none items-center justify-center overflow-hidden active:cursor-grabbing"
      style={{ perspective: 1400 }}
      aria-label="Rotating arsenal of core technologies"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--samurai-black)_85%)]" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[2px] w-[80%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklab, var(--blood-red) 60%, transparent), transparent)",
        }}
      />

      <div
        className="pointer-events-none absolute left-1/2 top-1/2"
        style={{
          transform: "translate(-50%, 40%) rotateX(75deg)",
          width: radius * 2.4,
          height: radius * 2.4,
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--blade-silver) 10%, transparent) 0%, transparent 65%)",
          borderRadius: "50%",
        }}
      />

      <motion.div
        className="relative"
        style={{
          transformStyle: "preserve-3d",
          rotateY: rotate,
          rotateX: -8,
          width: 1,
          height: 1,
        }}
      >
        {skills.map((skill, i) => {
          const angle = (360 / count) * i;
          return (
            <div
              key={skill}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                transformStyle: "preserve-3d",
              }}
            >
              <SkillPlate label={skill} rotate={rotate} angle={angle} />
            </div>
          );
        })}
      </motion.div>

      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
        Engineering · Stack
      </div>
    </div>
  );
}

function SkillPlate({
  label,
  rotate,
  angle,
}: {
  label: string;
  rotate: ReturnType<typeof useMotionValue<number>>;
  angle: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const unsub = rotate.on("change", (r) => {
      const rel = (((r + angle) % 360) + 360) % 360;
      const facing = Math.cos((rel * Math.PI) / 180);
      const opacity = 0.35 + 0.65 * ((facing + 1) / 2);
      el.style.opacity = String(opacity);
    });
    return () => unsub();
  }, [rotate, angle]);

  return (
    <div
      ref={ref}
      className="group relative flex h-32 w-52 items-center justify-center border border-border bg-samurai-black/80 backdrop-blur-sm"
      style={{
        boxShadow:
          "0 0 0 1px color-mix(in oklab, var(--blade-silver) 8%, transparent), 0 20px 40px -20px color-mix(in oklab, var(--blood-red) 40%, transparent)",
      }}
    >
      <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-blood-red" />
      <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-blood-red" />
      <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-blood-red" />
      <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-blood-red" />
      <span className="absolute inset-2 border border-border/60" />

      <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-bright-steel">
        {label}
      </span>

      <span
        className="pointer-events-none absolute inset-x-0 -bottom-16 h-16 origin-top scale-y-[-1] opacity-30"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklab, var(--samurai-black) 60%, transparent), transparent)",
        }}
      />
    </div>
  );
}
