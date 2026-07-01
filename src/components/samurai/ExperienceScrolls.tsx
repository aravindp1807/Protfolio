import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Exp {
  role: string;
  org: string;
  year: string;
  detail: string;
}

interface Props {
  items: Exp[];
}

const CLOSED_W = 88;
const OPEN_W = 720;

/**
 * Silver makimono (horizontal hand scrolls) — polished blade-silver palette.
 * Rolled up by default; unfurl horizontally on hover / focus / tap.
 */
export function ExperienceScrolls({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-8">
      {items.map((it, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={it.role}
            className="relative flex w-full items-center"
            style={{ minHeight: 132 }}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              onMouseEnter={() => setOpenIndex(i)}
              onFocus={() => setOpenIndex(i)}
              aria-expanded={isOpen}
              aria-label={`${it.role} — ${it.org}, ${it.year}`}
              className="group relative flex items-center outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-blade-silver)]"
            >
              {/* Left spindle */}
              <Spindle />

              {/* Scroll body — unfurls horizontally */}
              <motion.div
                initial={false}
                animate={{ width: isOpen ? OPEN_W : CLOSED_W }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-[112px] max-w-[calc(100vw-8rem)] overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, #f4f6f8 0%, #d8dce2 30%, #b0b6bf 55%, #8a919b 80%, #6d747d 100%)",
                  boxShadow:
                    "inset 0 0 32px rgba(10,14,20,0.35), inset 0 2px 6px rgba(255,255,255,0.5), inset 0 -2px 6px rgba(0,0,0,0.45), 0 4px 14px rgba(0,0,0,0.55)",
                }}
              >
                {/* Brushed-metal hairline texture */}
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(180deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 3px)",
                  }}
                />
                {/* Horizontal polished gleam lines */}
                <div
                  className="absolute inset-0 opacity-30 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(180deg, rgba(255,255,255,0.25) 0px, transparent 1px, transparent 2px)",
                  }}
                />
                {/* Elegant etched top/bottom rules */}
                <div className="absolute inset-x-6 top-3 h-px bg-[#0e1218]/60 shadow-[0_1px_0_rgba(255,255,255,0.25)]" />
                <div className="absolute inset-x-6 bottom-3 h-px bg-[#0e1218]/60 shadow-[0_1px_0_rgba(255,255,255,0.25)]" />

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, transition: { duration: 0.15 } }}
                      transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
                      className="absolute inset-0 flex flex-col justify-center px-10 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="font-mono text-[9px] font-bold uppercase tracking-[0.45em]"
                          style={{ color: "#0e1218" }}
                        >
                          {it.org}
                        </span>
                        <span className="h-px flex-1 bg-[#0e1218]/40" />
                        <span
                          className="flex h-6 items-center justify-center px-2 font-mono text-[10px] font-bold tracking-widest"
                          style={{
                            background: "var(--color-blood-red)",
                            color: "#ece4d3",
                            borderRadius: 2,
                          }}
                        >
                          {it.year}
                        </span>
                      </div>
                      <h3
                        className="mt-2 font-display text-lg leading-tight md:text-xl"
                        style={{ color: "#05070a", letterSpacing: "0.02em" }}
                      >
                        {it.role}
                      </h3>
                      <p
                        className="mt-1.5 max-w-[440px] font-mono text-[11px] leading-relaxed"
                        style={{ color: "#1a2028" }}
                      >
                        {it.detail}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isOpen && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className="font-mono text-[10px] font-bold uppercase tracking-[0.5em]"
                      style={{
                        color: "#0e1218",
                        writingMode: "vertical-rl",
                      }}
                    >
                      {it.year}
                    </span>
                  </div>
                )}

                {/* Edge shadows where the paper meets the rolled ends */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/45 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/45 to-transparent" />
              </motion.div>

              {/* Right spindle */}
              <Spindle />
            </button>
          </div>
        );
      })}
    </div>
  );
}

function Spindle() {
  return (
    <div
      className="relative z-20 h-[132px] w-[16px] rounded-full"
      style={{
        background:
          "linear-gradient(90deg, #3a3f47 0%, #8a919b 35%, #e4e7eb 50%, #8a919b 65%, #3a3f47 100%)",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.45), inset 0 -1px 2px rgba(0,0,0,0.5)",
      }}
    >
      <Knob position="top" />
      <Knob position="bottom" />
    </div>
  );
}

function Knob({ position }: { position: "top" | "bottom" }) {
  return (
    <span
      className={`absolute left-1/2 h-[22px] w-[28px] -translate-x-1/2 rounded-full ${
        position === "top" ? "-top-3" : "-bottom-3"
      }`}
      style={{
        background:
          "radial-gradient(circle at 35% 30%, #ffffff 0%, #c5c9d0 30%, #6b727c 70%, #25292e 100%)",
        boxShadow:
          "0 3px 8px rgba(0,0,0,0.65), inset 0 1px 3px rgba(255,255,255,0.5), inset 0 -1px 3px rgba(0,0,0,0.4)",
      }}
    />
  );
}
