export type Tone = "blush" | "pink" | "lavender" | "butter" | "sage";

export type Visual = "bars" | "circles" | "frames";

export interface ImageAsset {
  /** Path in /public (e.g. "/images/projects/one/cover.jpg"). "" shows a placeholder. */
  src: string;
  alt: string;
  caption?: string;
}

export interface Insight {
  title: string;
  detail: string;
}

export interface ProcessStep {
  title: string;
  detail: string;
}

export interface CaseStudy {
  overview: string;
  problem: string;
  role: { summary: string; responsibilities: string[] };
  timeline: { duration: string; phases: { label: string; detail: string }[] };
  tools: string[];
  team: string;
  research: { summary: string; methods: string[]; image?: ImageAsset };
  insights: Insight[];
  process: ProcessStep[];
  wireframes: ImageAsset[];
  finalDesigns: ImageAsset[];
  outcomes: string[];
  reflection: string;
  links?: { label: string; href: string }[];
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  cover: ImageAsset;
  /** Placeholder art + color used until a real cover image is added */
  visual: Visual;
  tone: Tone;
  caseStudy: CaseStudy;
}
