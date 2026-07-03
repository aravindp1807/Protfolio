import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Cert {
  title: string;
  issuer: string;
  year: string;
  logo?: string;
  logoDark?: string;
}

interface Props {
  certifications: readonly Cert[] | Cert[];
}

const CLOSED_H = 56;
<<<<<<< HEAD
const OPEN_H = 280;
const ROW_H = OPEN_H + 40; // reserved vertical slot so open scrolls never overlap neighbours

/**
 * Kakemono (hanging scroll) grid — restrained samurai palette:
 * bone-white washi paper, ink-black rods with silver caps, single blood-red seal.
 * Each cell reserves the fully-unfurled height so opening one never overlaps another.
 */
=======
const OPEN_H = 220;

>>>>>>> f6fc99b (ui changes)
export function CertScrolls({ certifications }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
<<<<<<< HEAD
    <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 md:gap-x-8 lg:grid-cols-4">
      {certifications.map((c, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={c.title}
            className="relative flex justify-center"
            style={{ height: ROW_H }}
          >
            <button
=======
    <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3 md:gap-x-8 lg:grid-cols-4 items-start">
      {certifications.map((c, i) => {
        const isOpen = openIndex === i;

        return (
          <motion.div key={c.title} className="flex justify-center" layout>
            <motion.button
>>>>>>> f6fc99b (ui changes)
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              onMouseEnter={() => setOpenIndex(i)}
              onFocus={() => setOpenIndex(i)}
<<<<<<< HEAD
              className="group absolute inset-x-0 top-0 flex flex-col items-center outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-blade-silver)]"
              aria-expanded={isOpen}
              aria-label={`${c.title} — ${c.issuer}, ${c.year}`}
            >
              {/* Top rod (jikugi) — blackened iron with silver caps */}
              <Rod />

              {/* Scroll body */}
              <div className="relative w-full">
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? OPEN_H : CLOSED_H }}
                  transition={{ type: "spring", stiffness: 140, damping: 22 }}
                  className="relative w-full overflow-hidden"
                  style={{ transformOrigin: "top center" }}
                >
                  {/* Parchment paper */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, #e8dfc8 0%, #d6c9a8 50%, #c4b48a 100%)",
                      boxShadow:
                        "inset 0 0 40px rgba(10,8,4,0.45), inset 0 2px 6px rgba(0,0,0,0.35)",
                    }}
                  >
                    {/* Grid texture */}
                    <div
                      className="absolute inset-0 opacity-[0.22] mix-blend-multiply"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(180deg, rgba(20,14,6,0.6) 0px, transparent 1px, transparent 5px), repeating-linear-gradient(90deg, rgba(20,14,6,0.4) 0px, transparent 1px, transparent 11px)",
                      }}
                    />
                    {/* Bold ink borders */}
                    <div className="absolute inset-x-4 top-3 h-px bg-[#0f0a04]/80" />
                    <div className="absolute inset-x-4 bottom-3 h-px bg-[#0f0a04]/80" />

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ delay: 0.18, duration: 0.28 }}
                          className="absolute inset-0 flex flex-col items-center justify-between px-4 py-5 text-center"
                        >
                          {/* Watermark logo behind title */}
                          {(c.logoDark || c.logo) && (
                            <img
                              src={c.logoDark || c.logo}
                              alt=""
                              className={`pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 object-contain opacity-70 mix-blend-multiply ${c.logoDark ? "" : "brightness-50 contrast-200 saturate-150"}`}
                            />
                          )}

                          <span
                            className="font-mono text-[9px] font-bold uppercase tracking-[0.4em]"
                            style={{ color: "#1a0f02" }}
                          >
                            {c.issuer}
                          </span>

                          <h3
                            className="relative z-10 font-display text-[13px] leading-tight md:text-sm"
                            style={{
                              color: "#0a0500",
                              writingMode: "vertical-rl",
                              letterSpacing: "0.15em",
                            }}
                          >
                            {c.title}
                          </h3>
                          {/* Hanko seal — single blood-red mark */}
                          <span
                            className="flex h-9 w-9 items-center justify-center font-mono text-[10px] font-bold tracking-widest"
                            style={{
                              background: "var(--color-blood-red)",
                              color: "#ece4d3",
                              boxShadow:
                                "0 1px 3px rgba(0,0,0,0.5), inset 0 0 6px rgba(0,0,0,0.35)",
                              borderRadius: 2,
                            }}
                          >
                            {c.year.slice(-2)}
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isOpen && (
                      <div className="absolute inset-0 flex items-center justify-center gap-2">
                        {(c.logoDark || c.logo) && (
                        <img
                          src={c.logoDark || c.logo}
                          alt=""
                          className={`h-5 w-5 rounded-full bg-[#f5efdf] object-contain p-0.5 ring-1 ring-[#0f0a04]/70 ${c.logoDark ? "" : "contrast-150 saturate-150"}`}
                        />
                        )}
                        <span
                          className="font-mono text-[10px] font-bold uppercase tracking-[0.5em]"
                          style={{ color: "#1a0f02" }}
                        >
                          {c.year}
                        </span>
                      </div>
                    )}

                  </div>

                  {/* Edge shadows */}
                  <div className="absolute left-0 top-0 h-full w-px bg-black/50" />
                  <div className="absolute right-0 top-0 h-full w-px bg-black/50" />
                </motion.div>

                {/* Bottom rod — travels with the unfurl */}
                <motion.div
                  initial={false}
                  animate={{ y: isOpen ? OPEN_H : CLOSED_H }}
                  transition={{ type: "spring", stiffness: 140, damping: 22 }}
                  className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full"
                  style={{ width: "110%" }}
                >
                  <Rod />
                </motion.div>

                {/* Tassel — red silk cord */}
                <motion.div
                  initial={false}
                  animate={{ y: isOpen ? OPEN_H + 2 : CLOSED_H + 2 }}
                  transition={{ type: "spring", stiffness: 140, damping: 22 }}
                  className="absolute left-1/2 top-0 flex -translate-x-1/2 flex-col items-center"
                >
                  <div className="h-4 w-px bg-[var(--color-blood-red)]" />
                  <div className="h-3 w-1.5 rounded-b-full bg-gradient-to-b from-[var(--color-blood-red)] to-[#2a0808]" />
                </motion.div>
              </div>
            </button>
          </div>
=======
              className="group w-full flex flex-col items-center outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-blade-silver)]"
              aria-expanded={isOpen}
            >
              <Rod />

              {/* FIXED CONTAINER HEIGHT (prevents flash) */}
              <motion.div
                className="relative w-full overflow-hidden"
                animate={{
                  height: isOpen ? OPEN_H : CLOSED_H,
                }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                style={{ transformOrigin: "top center" }}
              >
                <div
                  className="relative w-full h-full"
                  style={{
                    background:
                      "linear-gradient(180deg, #e8dfc8 0%, #d6c9a8 50%, #c4b48a 100%)",
                    boxShadow:
                      "inset 0 0 40px rgba(10,8,4,0.45), inset 0 2px 6px rgba(0,0,0,0.35)",
                  }}
                >
                  {/* Texture */}
                  <div
                    className="absolute inset-0 opacity-[0.22] mix-blend-multiply"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(180deg, rgba(20,14,6,0.6) 0px, transparent 1px, transparent 5px), repeating-linear-gradient(90deg, rgba(20,14,6,0.4) 0px, transparent 1px, transparent 11px)",
                    }}
                  />

                  <div className="absolute inset-x-4 top-3 h-px bg-[#0f0a04]/80" />
                  <div className="absolute inset-x-4 bottom-3 h-px bg-[#0f0a04]/80" />

                  {/* CLOSED */}
                  {!isOpen && (
                    <div className="flex items-center justify-center gap-2 h-full">
                      {(c.logoDark || c.logo) && (
                        <img
                          src={c.logoDark || c.logo}
                          alt=""
                          className="h-5 w-5 rounded-full bg-[#f5efdf] object-contain p-0.5 ring-1 ring-[#0f0a04]/70"
                        />
                      )}
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.5em] text-[#1a0f02]">
                        {c.year}
                      </span>
                    </div>
                  )}

                  {/* OPEN */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        key="open"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative flex flex-col items-center justify-between px-4 py-5 text-center h-full"
                      >
                        {/* FIX: image does NOT affect layout + fades in */}
                        {(c.logoDark || c.logo) && (
                          <motion.img
                            src={c.logoDark || c.logo}
                            alt=""
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 0.7, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 object-contain mix-blend-multiply"
                          />
                        )}

                        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.4em] text-[#1a0f02]">
                          {c.issuer}
                        </span>

                        <h3
                          className="font-display text-[13px] md:text-sm leading-tight px-2"
                          style={{
                            color: "#0a0500",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {c.title}
                        </h3>

                        <span
                          className="flex h-9 w-9 items-center justify-center font-mono text-[10px] font-bold tracking-widest"
                          style={{
                            background: "var(--color-blood-red)",
                            color: "#ece4d3",
                            boxShadow:
                              "0 1px 3px rgba(0,0,0,0.5), inset 0 0 6px rgba(0,0,0,0.35)",
                            borderRadius: 2,
                          }}
                        >
                          {c.year.slice(-2)}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Bottom rod */}
              <div className="flex justify-center">
                <Rod />
              </div>

              {/* Tassel */}
              <div className="flex flex-col items-center">
                <div className="h-4 w-px bg-[var(--color-blood-red)]" />
                <div className="h-3 w-1.5 rounded-b-full bg-gradient-to-b from-[var(--color-blood-red)] to-[#2a0808]" />
              </div>
            </motion.button>
          </motion.div>
>>>>>>> f6fc99b (ui changes)
        );
      })}
    </div>
  );
}

function Rod() {
  return (
    <div
      className="relative z-20 h-[7px] w-[112%] rounded-full"
      style={{
        background:
          "linear-gradient(180deg, #2a2620 0%, #0d0b08 50%, #05040a 100%)",
        boxShadow:
          "0 2px 6px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <Cap side="left" />
      <Cap side="right" />
    </div>
  );
}

function Cap({ side }: { side: "left" | "right" }) {
  return (
    <span
      className={`absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full ${
        side === "left" ? "-left-2" : "-right-2"
      }`}
      style={{
        background:
          "radial-gradient(circle at 30% 30%, #e8ecef 0%, #8a8f95 45%, #2a2d31 100%)",
        boxShadow:
          "0 1px 3px rgba(0,0,0,0.8), inset 0 0 4px rgba(0,0,0,0.4)",
      }}
    />
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> f6fc99b (ui changes)
