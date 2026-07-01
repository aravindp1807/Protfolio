## Projects — Scroll-Pinned Deep Dives

New section `IX · Projects` (replacing/augmenting current "Selected Work"), featuring three flagship repos as pinned scroll narratives. Content sourced verbatim-condensed from each README on `github.com/aravindp1807`.

### The three projects

1. **EARTHGOS** — Planetary Telemetry HUD & Mission Control (NASA EONET + RAG assistant, cyberpunk console).
2. **AGRIOS** — Agricultural & Geospatial Resource Intelligence System (multi-spectral + hydrology, OLS trend detection, tiered LLM router, Search/Monitor modes).
3. **CelebMind** — Synthetic-brain knowledge graph (scrape → embed → DBSCAN → LLM synthesis → Obsidian vault with `[[wikilinks]]`).

Runners-up stay in the existing compact strip: MEDICALseg, MULTI_OBJECT_TRACKING, Colab-Commit-Forge, Syntactic-Brain, EYE_of_Kartikeya, Yolo-Sam.

### Section mechanic

- New section titled `IX · Projects` mounted after Experience, before Contact (Contact renumbered to X).
- One tall sticky stage per project (~300vh each, 900vh total) using the same `useScroll` pattern as the samurai HUD.
- Each stage pins a full-viewport split:
  - **Left rail (40%)**: kanji index (壱 / 弐 / 参), project name in Cinzel, one-line tagline, `→ github.com/...` link, tech chips.
  - **Right stage (60%)**: three progressive reveals tied to local scroll progress.
- Reveal choreography per project:
  - 0.00–0.33 **問 · Problem** — README intro condensed.
  - 0.33–0.66 **型 · Approach** — 3–4 architecture beats.
  - 0.66–1.00 **断 · Result** — capabilities + primary CTA.
- Between stages: 40vh interlude with a blood-red blade-wipe `clip-path` transition.
- Blade-silver hairline progress bar fixed to the section's right edge shows 1/3, 2/3, 3/3.

### Visual language

- Tokens: `samurai-black`, `blade-silver`, `blood-red`, Cinzel + Noto Sans JP.
- Left rail: parchment card with ink grain, kanji numeral, red hanko seal for project index.
- Right stage: dark backdrop with faint HUD gridlines; framer-motion fade + `translateY(24→0)` staggered reveals.
- Tech chips: silver hairline border, mono labels (`TypeScript`, `Leaflet`, `RAG`, `MongoDB`, `spaCy`…).
- Respects `prefers-reduced-motion`: falls back to stacked 3-column card per project.

### Files

- `src/data/projects.ts` — typed array of 3: `{ index, kanji, name, repo, tagline, tech[], problem, approach[], result }`.
- `src/components/samurai/ProjectStage.tsx` — one pinned stage; consumes a project + computes local progress.
- `src/components/samurai/ProjectsSection.tsx` — orchestrates 3 stacked stages, blade-wipe interludes, side progress rail.
- `src/routes/index.tsx` — insert `<ProjectsSection />` as IX; renumber Contact to X; add `#projects` anchor.

### Technical notes

- Progress math mirrors `SamuraiExperience.tsx`: per-stage `useScroll({ target, offset: ['start start', 'end end'] })` + `useMotionValueEvent` toggling reveal state via refs (keeps the existing framer-motion 12 workaround).
- No new deps; no changes to samurai canvas or frame count.
- Verify via build and Playwright screenshots at 3 scroll depths per stage.
