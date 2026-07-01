import { ProjectStage } from "./ProjectStage";
import { projectStudies } from "@/data/projects";

export function ProjectsSection() {
  return (
    <section id="projects" className="relative border-t border-border">
      {/* Section header — sits above the first pinned stage */}
      <div className="mx-auto max-w-[1400px] px-6 py-24 md:px-16 md:py-32">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-muted-foreground">
              IX · Projects
            </span>
            <h2 className="mt-4 font-display text-3xl leading-tight text-bright-steel md:text-6xl">
              One study.
              <br />
              One discipline.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Scroll to unpack each project — problem, approach, result — one blade-cut
            at a time.
          </p>
        </div>
      </div>

      {projectStudies.map((s, i) => (
        <div key={s.index}>
          <ProjectStage study={s} />
          {i < projectStudies.length - 1 && <BladeWipe />}
        </div>
      ))}
    </section>
  );
}

function BladeWipe() {
  return (
    <div className="relative h-[30vh] overflow-hidden bg-samurai-black">
      <div
        className="absolute inset-x-0 top-1/2 h-16 -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #b83227 30%, #b83227 70%, transparent 100%)",
          clipPath:
            "polygon(0 45%, 8% 20%, 92% 0%, 100% 40%, 96% 90%, 12% 100%, 0 75%)",
          opacity: 0.85,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
        style={{ background: "linear-gradient(90deg, transparent, #c0c0c0, transparent)" }}
        aria-hidden
      />
    </div>
  );
}
