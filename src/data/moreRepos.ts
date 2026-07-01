export type Repo = {
  name: string;
  tag: string;
  blurb: string;
  stack: string[];
  url: string;
};

export const moreRepos: Repo[] = [
  {
    name: "EYE of Kartikeya",
    tag: "OSINT · 3D Geospatial",
    blurb:
      "Sovereign intelligence command deck aggregating 20+ live feeds — aviation, maritime, seismic, wildfire, cyber and space weather — into a real-time 3D globe with an AI oracle for tactical readouts.",
    stack: ["Next.js", "Deck.gl", "OpenRouter", "Framer Motion"],
    url: "https://github.com/aravindp1807/EYE_of_Kartikeya-",
  },
  {
    name: "MOT · Re-ID",
    tag: "Computer Vision",
    blurb:
      "Multi-object tracking with re-identification across occlusion, motion and scene cuts. Reliability-first pipeline for persistent identity recovery and annotated exports.",
    stack: ["YOLO", "ByteTrack", "OSNet", "PyTorch"],
    url: "https://github.com/aravindp1807/MULTI_OBJECT_TRACKING",
  },
  {
    name: "MedicalSeg × RT-DETR",
    tag: "Medical Imaging",
    blurb:
      "Production-grade pipeline that converts volumetric medical segmentation masks into YOLO format and distills DINOv3 knowledge into a lightweight RT-DETR student.",
    stack: ["DINOv3", "RT-DETR", "Distillation", "NIfTI"],
    url: "https://github.com/aravindp1807/MEDICALseg_dinov3-yolo-distilation_RTDTER.ipynb",
  },
  {
    name: "Colab Commit Forge",
    tag: "Dev Tooling · LLM",
    blurb:
      "Turns any Jupyter notebook into a realistic, AI-generated Git history — parsing cells into milestones, backdating commits, and auto-writing project docs before pushing.",
    stack: ["OpenRouter", "GitPython", "Colab", "CLI"],
    url: "https://github.com/aravindp1807/Colab-Commit-Forge",
  },
  {
    name: "YOLO × SAM",
    tag: "Segmentation",
    blurb:
      "Composable detection-to-segmentation flow chaining YOLO region proposals into Segment Anything for zero-shot pixel-precise masks on custom domains.",
    stack: ["YOLO", "SAM", "PyTorch", "OpenCV"],
    url: "https://github.com/aravindp1807/Yolo-Sam",
  },
  {
    name: "Syntactic Brain",
    tag: "NLP · Experiment",
    blurb:
      "A grammar and structure playground exploring how syntactic scaffolds can steer language models toward cleaner, more auditable generations.",
    stack: ["JavaScript", "NLP", "Prompting"],
    url: "https://github.com/aravindp1807/Syntactic-Brain",
  },
];
