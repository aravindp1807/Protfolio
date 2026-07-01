export type ProjectStudy = {
  index: string; // 01, 02, 03
  kanji: string; // 壱 弐 参
  name: string;
  repo: string;
  repoUrl: string;
  tagline: string;
  tech: string[];
  problem: string;
  approach: string[];
  result: string;
};

export const projectStudies: ProjectStudy[] = [
  {
    index: "01",
    kanji: "壱",
    name: "EARTHGOS",
    repo: "aravindp1807/Project-EARTHGOS",
    repoUrl: "https://github.com/aravindp1807/Project-EARTHGOS",
    tagline: "Planetary Telemetry HUD & Mission Control.",
    tech: ["React", "Leaflet", "NASA EONET", "RAG", "TypeScript"],
    problem:
      "Global natural hazards — wildfires, storms, volcanoes, floods, sea-ice shifts, landslides, earthquakes — arrive as noisy, unstructured telemetry. Analysts need a single console that turns that firehose into situational awareness, not another dashboard of scattered widgets.",
    approach: [
      "Dual-panel cyberpunk HUD: live NASA EONET activities feed on top, an AI Telemetry Command Center chat console below — both visible at once, no tab switching.",
      "Leaflet 2D projection grid with Google Satellite / Terrain / Night overlays and static tactical vector symbols per event category.",
      "Selecting an event flies the camera, projects a red laser target indicator, and loads raw coordinates into the assistant.",
      "Location-aware RAG assistant grounds answers in the currently loaded events and layers.",
    ],
    result:
      "A high-density mission control terminal that fuses real-time hazard feeds, tactical map interaction, and a conversational diagnostics line — an editorial-grade console for planetary telemetry.",
  },
];
