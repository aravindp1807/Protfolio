export const site = {
  name: "Aravind Pyli",
  role: "AI Architect",
  tagline: "Building intelligence. Solving real-world problems.",
  shortBio:
    "AI engineer focused on machine learning, computer vision, research-driven systems, and practical tools that turn complex ideas into useful products.",
  email: "aravindpyli13@gmail.com",
  github: "https://github.com/aravindp1807",
  linkedin: "https://www.linkedin.com/in/aravind-pyli-914715288/",
  location: "India · Remote",
};

// Scroll HUD copy — reframed as the portfolio intro over the samurai sequence.
export const phases = {
  stance: {
    kicker: "I · Aravind Pyli · AI Architect",
    title: "Building\nIntelligence.",
    subtitle: "Machine Learning · Computer Vision · Research Systems",
    cta: "Witness the Work",
  },
  slash: {
    kicker: "II · One Discipline",
    title: "Code.\nCreate.\nContribute.",
    subtitle: "Precision. Weight. Intent.",
  },
  warning: {
    kicker: "III · The Practice",
    title: "Research-led.\nProduct-minded.",
    specs: [
      { label: "Focus", value: "ML & Computer Vision" },
      { label: "Path", value: "AI + AI-Agentic system\u00a0 Development" },
      { label: "Approach", value: "Systems Thinking" },
      { label: "Location", value: "India · Remote" },
    ],
  },
} as const;

export const heroStats = [
  { label: "Focus", value: "Machine Learning & deep learning &computer Vision" },
  { label: "Current Path", value: "AI + AI-Agentic system\u00a0 Development" },
  { label: "Approach", value: "Research-led, product-minded" },
];

export const aboutParagraphs = [
  "I'm Aravind Pyli, an AI Engineer and lifelong learner drawn to systems that combine research depth with practical impact. My work sits at the intersection of machine learning, computer vision, product thinking, and technical storytelling.",
  "I shape ideas into interfaces people can understand: dashboards that reveal live systems, vision pipelines that surface identity and motion, and knowledge tools that turn scattered information into structured insight.",
  "Alongside AI work, I'm studying full-stack development to become stronger end to end — from model and workflow design to polished user experience and usable software delivery.",
];

export const projects = [
  {
    n: "01",
    title: "EarthGOS",
    subtitle: "Planetary telemetry HUD & mission control",
    description:
      "A cinematic monitoring concept for global environmental hazard intelligence — real-time telemetry, layered maps, anomaly feeds, and an AI assistant for interpreting evolving events.",
    stack: ["Telemetry UX", "Geospatial", "AI Assistant", "Dashboard"],
  },
  {
    n: "02",
    title: "MOT-ReID",
    subtitle: "Multi-object tracking with re-identification",
    description:
      "A computer vision workflow for persistent object identity across occlusion, motion, and scene changes — reliability, identity recovery, and annotated outputs.",
    stack: ["YOLO", "ByteTrack", "OSNet", "PyTorch"],
  },
];

export const journey = [
  {
    year: "2026",
    title: "Mini Fellowship on Molecular Imaging",
    detail:
      "Selected for Stanford University School of Medicine's 2026 Mini Fellowship, exploring molecular imaging, biomarkers, radiotracers, and precision medicine.",
  },
  {
    year: "2026",
    title: "Volunteer Research Community Member",
    detail:
      "Contributing to The Midas Project through collaborative research around AI governance, public-interest technology, and accountability.",
  },
  {
    year: "2026",
    title: "The Odin Project",
    detail:
      "Studying full-stack web development while continuing to build AI-driven applications and strengthen product engineering fundamentals.",
  },
  {
    year: "Now",
    title: "Building intelligent systems",
    detail:
      "Focused on computer vision, knowledge systems, AI-assisted tooling, and interfaces that make complex technical work feel clear and usable.",
  },
];

export const skills = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "Scikit-learn",
  "OpenCV",
  "FastAPI",
  "Docker",
  "AWS",
  "SQL",
  "LangChain",
  "Git",
  "Prompt Engineering",
];

import googleLogo from "@/assets/logos/google.webp.asset.json";
import googleDarkLogo from "@/assets/logos/google-dark.webp.asset.json";
import harvardxLogo from "@/assets/logos/harvard.webp.asset.json";
import harvardDarkLogo from "@/assets/logos/harvard-dark.webp.asset.json";
import lseLogo from "@/assets/logos/lse.webp.asset.json";
import lseDarkLogo from "@/assets/logos/lse-dark.webp.asset.json";
import umdLogo from "@/assets/logos/umd.png.asset.json";
import ibmLogo from "@/assets/logos/ibm-logo.png.asset.json";

export const experience = [
  {
    role: "Mini Fellowship on Molecular Imaging",
    org: "Stanford University School of Medicine",
    year: "2026",
    detail:
      "Selected fellow — molecular imaging, biomarkers, radiotracers, and precision medicine.",
  },
  {
    role: "Volunteer Research Community Member",
    org: "The Midas Project",
    year: "2026",
    detail:
      "Collaborative research on AI governance, public-interest technology, and accountability.",
  },
  {
    role: "AI & Engineering Student",
    org: "The Odin Project",
    year: "2026",
    detail:
      "Full-stack web development alongside continued AI engineering practice.",
  },
];

export const certifications = [
  { title: "Prompt Design in Vertex AI", issuer: "Google", year: "2024", logo: googleLogo.url, logoDark: googleDarkLogo.url },
  { title: "Exercising Leadership: Foundational Principles", issuer: "HarvardX", year: "2024", logo: harvardxLogo.url, logoDark: harvardDarkLogo.url },
  { title: "Intercultural Communications in the Workplace", issuer: "LSE", year: "2024", logo: lseLogo.url, logoDark: lseDarkLogo.url },
  { title: "Project Management Principles", issuer: "University System of Maryland", year: "2024", logo: umdLogo.url },
  { title: "Enterprise Design Thinking Practitioner", issuer: "IBM", year: "2024", logo: ibmLogo.url },
];

