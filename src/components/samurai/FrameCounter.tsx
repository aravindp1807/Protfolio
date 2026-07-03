import { useState } from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";

export function FrameCounter({
  scrollYProgress,
  totalFrames,
}: {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
}) {
  const [frame, setFrame] = useState(1);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setFrame(Math.min(totalFrames, Math.max(1, Math.round(p * (totalFrames - 1)) + 1)));
  });
  const pad = (n: number) => String(n).padStart(3, "0");
  return (
    <div className="pointer-events-none absolute bottom-6 left-6 z-0 flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-blade-silver">
      <span className="h-1 w-1 rounded-full bg-blood-red" />
      <span>FRAME {pad(frame)} / {pad(totalFrames)}</span>
    </div>
  );
}
