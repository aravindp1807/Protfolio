import { useEffect, useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ProjectStudy } from "@/data/projects";

interface Props {
  study: ProjectStudy;
}

const bandOpacity = (p: number, start: number, end: number) => {
  const fadeIn = 0.06;
  const fadeOut = 0.06;
  if (p < start - fadeIn || p > end + fadeOut) return 0;
  if (p < start) return (p - (start - fadeIn)) / fadeIn;
  if (p > end) return 1 - (p - end) / fadeOut;
  return 1;
};

export function ProjectStage({ study }: Props) {
  const stageRef = useRef<HTMLElement | null>(null);
  const problemRef = useRef<HTMLDivElement | null>(null);
  const approachRef = useRef<HTMLDivElement | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start start", "end end"],
  });

  const apply = (p: number) => {
    const setBlock = (
      el: HTMLDivElement | null,
      op: number,
      shift: number,
    ) => {
      if (!el) return;
      el.style.opacity = String(op);
      el.style.transform = `translate3d(0, ${shift}px, 0)`;
      el.style.visibility = op === 0 ? "hidden" : "visible";
    };
    const problem = bandOpacity(p, 0.02, 0.32);
    const approach = bandOpacity(p, 0.36, 0.66);
    const result = bandOpacity(p, 0.7, 0.98);

    setBlock(problemRef.current, problem, (1 - problem) * 24);
    setBlock(approachRef.current, approach, (1 - approach) * 24);
    setBlock(resultRef.current, result, (1 - result) * 24);

    if (barRef.current) {
      barRef.current.style.transform = `scaleY(${Math.max(0, Math.min(1, p))})`;
    }
  };

  useEffect(() => {
    apply(scrollYProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMotionValueEvent(scrollYProgress, "change", apply);

  return (
    <section ref={stageRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden bg-samurai-black">
        {/* HUD gridlines */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #c0c0c0 1px, transparent 1px), linear-gradient(to bottom, #c0c0c0 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
          aria-hidden
        />

        {/* Progress rail */}
        <div className="pointer-events-none absolute right-4 top-1/2 h-64 w-px -translate-y-1/2 bg-blade-silver/15 md:right-8">
          <div
            ref={barRef}
            className="h-full w-px origin-top bg-blood-red"
            style={{ transform: "scaleY(0)" }}
          />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1400px] items-start gap-10 px-6 md:grid-cols-12 md:gap-12 md:px-16">
          {/* LEFT RAIL */}
          <div className="md:col-span-5">
            <div className="relative overflow-hidden border border-border/70 bg-[#f5ecd7] p-8 md:p-10">
              {/* paper grain */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-multiply"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 40%, #6b5a3a 0.5px, transparent 1px), radial-gradient(circle at 70% 60%, #4a3a20 0.5px, transparent 1px)",
                  backgroundSize: "6px 6px, 9px 9px",
                }}
                aria-hidden
              />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <span
                    className="font-mono text-[10px] tracking-[0.5em] uppercase"
                    style={{ color: "#1a1310" }}
                  >
                    IX · {study.index}
                  </span>
                  {/* hanko seal */}
                  <div
                    className="flex h-12 w-12 items-center justify-center border-2 font-display text-xl"
                    style={{
                      borderColor: "#b83227",
                      color: "#b83227",
                      fontFamily: "'Noto Sans JP', serif",
                      transform: "rotate(-6deg)",
                    }}
                    aria-hidden
                  >
                    {study.kanji}
                  </div>
                </div>

                <h3
                  className="mt-8 font-display text-4xl leading-[1.05] md:text-6xl"
                  style={{ color: "#141010" }}
                >
                  {study.name}
                </h3>
                <div className="mt-4 h-[2px] w-12" style={{ background: "#b83227" }} />
                <p
                  className="mt-5 max-w-md text-sm leading-relaxed"
                  style={{ color: "#3a2f24" }}
                >
                  {study.tagline}
                </p>

                <a
                  href={study.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] uppercase transition-opacity hover:opacity-60"
                  style={{ color: "#141010" }}
                >
                  → {study.repo}
                  <ArrowUpRight className="h-3.5 w-3.5" style={{ color: "#b83227" }} />
                </a>

                <div className="mt-8 flex flex-wrap gap-2">
                  {study.tech.map((t) => (
                    <span
                      key={t}
                      className="border px-2.5 py-1 font-mono text-[10px] tracking-[0.3em] uppercase"
                      style={{ borderColor: "#1a1310", color: "#1a1310" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT STAGE — reveals */}
          <div className="relative md:col-span-7">
            <div className="relative min-h-[420px] md:min-h-[520px]">
              <RevealBlock
                innerRef={problemRef}
                kicker="問 · Problem"
                body={<p className="text-base leading-relaxed text-muted-foreground md:text-lg">{study.problem}</p>}
              />
              <RevealBlock
                innerRef={approachRef}
                kicker="型 · Approach"
                body={
                  <ul className="space-y-4">
                    {study.approach.map((line, i) => (
                      <li
                        key={i}
                        className="grid grid-cols-[auto_1fr] gap-4 border-t border-border pt-3 text-sm leading-relaxed text-blade-silver md:text-base"
                      >
                        <span className="font-mono text-[10px] tracking-[0.4em] text-blood-red">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                }
              />
              <RevealBlock
                innerRef={resultRef}
                kicker="断 · Result"
                body={
                  <div>
                    <p className="text-base leading-relaxed text-bright-steel md:text-lg">
                      {study.result}
                    </p>
                    <a
                      href={study.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 inline-flex items-center gap-3 border border-blade-silver/40 px-5 py-3 font-mono text-[10px] tracking-[0.4em] uppercase text-bright-steel transition-colors hover:border-blood-red hover:text-blood-red"
                    >
                      Read on GitHub
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RevealBlock({
  innerRef,
  kicker,
  body,
}: {
  innerRef: React.RefObject<HTMLDivElement | null>;
  kicker: string;
  body: React.ReactNode;
}) {
  return (
    <div
      ref={innerRef}
      className="absolute inset-0"
      style={{ opacity: 0, willChange: "opacity, transform" }}
    >
      <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-blood-red">
        {kicker}
      </span>
      <div className="mt-4 h-px w-10 bg-blade-silver/40" />
      <div className="mt-8">{body}</div>
    </div>
  );
}
