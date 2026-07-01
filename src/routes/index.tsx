import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { useScroll } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { SamuraiScrollCanvas } from "@/components/samurai/SamuraiScrollCanvas";
import { SamuraiExperience } from "@/components/samurai/SamuraiExperience";
import { FrameCounter } from "@/components/samurai/FrameCounter";
import { Navbar } from "@/components/samurai/Navbar";
import { ArsenalRing } from "@/components/samurai/ArsenalRing";
import { CertScrolls } from "@/components/samurai/CertScrolls";
import { ExperienceScrolls } from "@/components/samurai/ExperienceScrolls";

import { moreRepos } from "@/data/moreRepos";

import portraitTradition from "@/assets/about-poster.jpeg.asset.json";
import samuraiPoster from "@/assets/samurai-poster.jpeg.asset.json";
import {
  site,
  heroStats,
  aboutParagraphs,
  journey,
  skills,
  certifications,
  experience,
} from "@/data/samuraiData";

const TOTAL_FRAMES = 235;
const framePath = (i: number) =>
  `/samurai/frame-${String(i + 1).padStart(3, "0")}.jpg`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.name} — ${site.role}` },
      {
        name: "description",
        content:
          "Portfolio of Aravind Pyli — AI Engineer building machine learning, computer vision, and research-driven systems. A cinematic samurai-editorial showcase.",
      },
      { property: "og:title", content: `${site.name} — ${site.role}` },
      {
        property: "og:description",
        content:
          "AI Engineer building intelligence. Machine learning, computer vision, and research-driven systems.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const sequenceRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sequenceRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className="bg-samurai-black text-blade-silver">
      <Navbar />

      {/* SCROLL SEQUENCE — cinematic intro */}
      <section ref={sequenceRef} className="relative h-[600vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-samurai-black">
          <SamuraiScrollCanvas
            scrollYProgress={scrollYProgress}
            totalFrames={TOTAL_FRAMES}
            framePath={framePath}
          />
          <SamuraiExperience scrollYProgress={scrollYProgress} />
          <FrameCounter scrollYProgress={scrollYProgress} totalFrames={TOTAL_FRAMES} />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="relative border-t border-border py-32 md:py-48">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-6 md:grid-cols-12 md:px-16">
          <div className="md:col-span-3">
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-muted-foreground">
              IV · About
            </span>
            <div className="mt-6 h-px w-12 bg-blood-red" />
            <p className="mt-6 font-mono text-[10px] tracking-[0.4em] uppercase text-blade-silver">
              {site.location}
            </p>
            <div className="mt-10 overflow-hidden border border-border">
              <img
                src={portraitTradition.url}
                alt="Aravind Pyli — AIML Engineer editorial poster"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="md:col-span-6">
            <h2 className="font-display text-3xl leading-tight text-bright-steel md:text-5xl">
              A research-minded builder shaping AI systems into useful experiences.
            </h2>
            <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground md:text-base">
              {aboutParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <p className="mt-8 text-sm italic leading-relaxed text-blade-silver/80">
              I approach engineering as a blend of curiosity, rigor, and craft — moving from
              experiments and models to interfaces that make complex ideas understandable.
            </p>
          </div>
          <div className="space-y-4 md:col-span-3">
            {heroStats.map((s) => (
              <div key={s.label} className="border-t border-border pt-3">
                <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-blood-red">
                  {s.label}
                </p>
                <p className="mt-2 font-display text-lg text-bright-steel">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section id="journey" className="relative border-t border-border py-32 md:py-48">
        <div className="mx-auto grid max-w-[1400px] gap-16 px-6 md:grid-cols-12 md:px-16">
          <div className="md:col-span-4">
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-muted-foreground">
              VI · Journey
            </span>
            <h2 className="mt-6 font-display text-3xl text-bright-steel md:text-5xl">
              Recent milestones.
            </h2>
            <div className="mt-6 h-px w-12 bg-blood-red" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Experiences sharpening both technical foundation and perspective on
              responsible, high-impact AI work.
            </p>
          </div>
          <div className="space-y-px bg-border md:col-span-8">
            {journey.map((j) => (
              <div key={j.title} className="bg-samurai-black p-6 md:p-8">
                <div className="flex items-baseline justify-between gap-6">
                  <h3 className="font-display text-2xl text-bright-steel">{j.title}</h3>
                  <span className="font-mono text-[10px] tracking-[0.4em] text-blood-red">
                    {j.year}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {j.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLKIT */}
      <section id="toolkit" className="relative border-t border-border py-32 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-16">
          <div className="mb-12 flex items-end justify-between">
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-muted-foreground">
              VII · Arsenal
            </span>
            <h2 className="font-display text-3xl text-bright-steel md:text-5xl">
              Core Technologies
            </h2>
          </div>
          <ArsenalRing skills={skills} />


        </div>
      </section>

      {/* EXPERIENCE — silver horizontal scrolls */}
      <section id="experience" className="relative border-t border-border py-32 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-16">
          <div className="mb-12 flex items-end justify-between">
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-muted-foreground">
              VIII · Experience
            </span>
            <h2 className="font-display text-3xl text-bright-steel md:text-5xl">
              Ongoing Practice
            </h2>
          </div>
          <p className="mb-10 max-w-md text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Hover a silver scroll to unfurl it.
          </p>
          <ExperienceScrolls items={experience} />
        </div>
      </section>


      {/* MORE REPOSITORIES */}
      <section id="repos" className="relative border-t border-border py-32 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-16">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-muted-foreground">
                IX·b · The Forge
              </span>
              <h2 className="mt-4 font-display text-3xl text-bright-steel md:text-5xl">
                More Repositories
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                Experiments, tools, and shipped systems that live beyond the three deep dives.
              </p>
            </div>
            <a
              href="https://github.com/aravindp1807"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 self-start rounded-full border border-border px-4 py-2 text-[10px] tracking-[0.35em] uppercase text-muted-foreground transition hover:border-blood-red hover:text-bright-steel"
            >
              <Github className="h-3.5 w-3.5" />
              github.com/aravindp1807
            </a>
          </div>

          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {moreRepos.map((r) => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="group relative flex flex-col justify-between gap-6 bg-background p-6 transition hover:bg-background/40 md:p-8"
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-blood-red">
                      {r.tag}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-bright-steel" />
                  </div>
                  <h3 className="mt-4 font-display text-2xl text-bright-steel">
                    {r.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {r.blurb}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {r.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border px-2.5 py-1 font-mono text-[9px] tracking-[0.25em] uppercase text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>


      {/* CERTIFICATIONS */}
      <section id="certifications" className="relative border-t border-border py-32 md:py-40">
        <div className="mx-auto max-w-[1400px] px-6 md:px-16">
          <div className="mb-12">
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-muted-foreground">
              X · Recognitions
            </span>
            <h2 className="mt-4 font-display text-3xl text-bright-steel md:text-5xl">
              Programs & Credentials
            </h2>
          </div>
          <p className="mb-10 max-w-md text-xs tracking-[0.2em] uppercase text-muted-foreground">
            Hover or tap a scroll to unfurl it.
          </p>
          <CertScrolls certifications={certifications} />
        </div>
      </section>

      {/* CONTACT — Parchment Hero */}
      <section
        id="contact"
        className="relative overflow-hidden border-t border-border"
        style={{
          background:
            "radial-gradient(ellipse at 20% 10%, #f5ecd7 0%, #ece0c4 45%, #d9c9a6 100%)",
        }}
      >
        {/* Paper grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 40%, #6b5a3a 0.5px, transparent 1px), radial-gradient(circle at 70% 60%, #4a3a20 0.5px, transparent 1px)",
            backgroundSize: "6px 6px, 9px 9px",
          }}
          aria-hidden
        />
        {/* Soft ink wash corners */}
        <div
          className="pointer-events-none absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #1a1310 0%, transparent 65%)" }}
          aria-hidden
        />

        <div className="relative mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-12 px-5 py-16 sm:gap-16 sm:px-6 sm:py-24 md:grid-cols-[1fr_1fr] md:gap-8 md:px-20 md:py-40">
          {/* LEFT — copy (mirrors hero layout) */}
          <div className="relative order-2 md:order-1">
            {/* Vertical kanji rail */}
            <div
              className="absolute -left-4 top-4 hidden md:flex md:flex-col md:items-center md:gap-4"
              aria-hidden
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ background: "#b83227" }}
              />
              <span
                style={{
                  writingMode: "vertical-rl",
                  letterSpacing: "0.4em",
                  color: "#1a1310",
                  opacity: 0.7,
                  fontFamily: "'Noto Sans JP', sans-serif",
                  fontSize: "13px",
                }}
              >
                静けさの中の強さ
              </span>
            </div>

            <div className="md:pl-20">
              {/* Eyebrow with underline */}
              <div>
                <span
                  className="font-mono text-[10px] sm:text-[11px] tracking-[0.4em] sm:tracking-[0.5em] uppercase"
                  style={{ color: "#1a1310" }}
                >
                  Contact
                </span>
                <div className="mt-2 h-[2px] w-12 sm:w-14" style={{ background: "#b83227" }} />
              </div>

              {/* Headline */}
              <h2
                className="mt-6 sm:mt-10 font-display leading-[1.02] text-[38px] sm:text-5xl md:text-[64px]"
                style={{ color: "#141010" }}
              >
                LET'S BUILD
                <br />
                SOMETHING
                <br />
                <span style={{ color: "#b83227" }}>WITH INTENT.</span>
              </h2>

              {/* Subcopy */}
              <p
                className="mt-6 sm:mt-8 max-w-md text-[14px] sm:text-[15px] leading-relaxed"
                style={{ color: "#3a2f24" }}
              >
                AI Researcher, Machine Learning Engineer & Innovator —
                open to collaborations, research, and thoughtful product work.
              </p>

              {/* Brush-stroke CTA */}
              <a
                href={`mailto:${site.email}`}
                className="group relative mt-8 sm:mt-10 inline-flex items-center gap-3 px-7 py-4 sm:px-10 sm:py-5 font-mono text-[11px] sm:text-xs tracking-[0.3em] sm:tracking-[0.35em] uppercase text-[#f5ecd7] transition-transform hover:-translate-y-0.5"
                style={{
                  background: "#141010",
                  clipPath:
                    "polygon(2% 22%, 6% 4%, 94% 0%, 100% 50%, 98% 96%, 8% 100%, 0% 74%)",
                }}
              >
                Write to me
                <ArrowUpRight className="h-4 w-4" style={{ color: "#b83227" }} />
              </a>

              {/* Email line */}
              <div className="mt-10 sm:mt-14">
                <a
                  href={`mailto:${site.email}`}
                  className="font-display text-lg sm:text-xl md:text-2xl break-all"
                  style={{ color: "#141010" }}
                >
                  <span
                    className="inline-flex items-center gap-2 border-b pb-1"
                    style={{ borderColor: "#b83227" }}
                  >
                    {site.email}
                  </span>
                </a>
              </div>

              {/* Socials */}
              <div className="mt-6 sm:mt-8 flex items-center gap-6" style={{ color: "#1a1310" }}>
                <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub"
                   className="transition-opacity hover:opacity-60">
                  <Github className="h-5 w-5" />
                </a>
                <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
                   className="transition-opacity hover:opacity-60">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href={`mailto:${site.email}`} aria-label="Email"
                   className="transition-opacity hover:opacity-60">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT — the poster itself */}
          <div className="relative order-1 mx-auto w-full max-w-[340px] sm:max-w-[440px] md:order-2 md:max-w-[560px]">
            <img
              src={samuraiPoster.url}
              alt="Aravind Pyli — samurai portrait"
              className="h-auto w-full"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-10 md:px-10">
          <span className="font-display text-lg tracking-widest text-bright-steel">刀</span>
          <span className="font-mono text-[10px] tracking-[0.5em] uppercase text-muted-foreground">
            {site.name} · {site.role}
          </span>
          <span className="font-mono text-[10px] tracking-[0.5em] text-blade-silver">
            MMXXVI
          </span>
        </div>
      </footer>
    </div>
  );
}
