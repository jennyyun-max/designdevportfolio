export type Tone = "blush" | "pink" | "lavender" | "butter" | "sage" | "ivory";

export type Visual = "bars" | "circles" | "frames";

export interface ImageAsset {
  /** Path in /public (e.g. "/images/projects/one/cover.jpg"). "" shows a placeholder. */
  src: string;
  alt: string;
  caption?: string;
  /** "contain" shows the whole image (diagrams, slides with text); default "cover" fills the frame */
  fit?: "cover" | "contain";
  /** CSS object-position for the crop, e.g. "20% 50%" */
  focus?: string;
  /** Tailwind aspect class to override the default frame shape, e.g. "aspect-[9/19]" */
  aspect?: string;
}

export interface Insight {
  title: string;
  detail: string;
}

export interface ProcessStep {
  title: string;
  detail: string;
}

/* Every section except the overview is optional — leave one out and it disappears
   (section numbers adjust automatically). `labels` renames section labels. */
export interface CaseStudy {
  overview: string;
  problem?: string;
  role?: { summary: string; responsibilities?: string[] };
  timeline?: { duration: string; phases?: { label: string; detail: string }[] };
  tools?: string[];
  team?: string;
  research?: { summary: string; methods?: string[]; stats?: { value: string; label: string }[]; images?: ImageAsset[] };
  insights?: Insight[];
  process?: ProcessStep[];
  /** Key design decisions: what was decided and why (shown as “design decisions”) */
  decisions?: ProcessStep[];
  wireframes?: ImageAsset[];
  finalDesigns?: ImageAsset[];
  /** "phones" lays final designs out side by side (for tall phone screens) */
  finalLayout?: "stack" | "phones";
  /** Show the process section before insights */
  processFirst?: boolean;
  outcomes?: string[];
  reflection?: string;
  links?: { label: string; href: string }[];
  labels?: Partial<Record<"problem" | "role" | "timeline" | "research" | "insights" | "insightsHeading" | "process" | "wireframes" | "final" | "outcomes", string>>;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  /** One sentence about the actual problem, in the “Helping … ” voice — shown in Selected Work */
  tagline?: string;
  /** "" hides it */
  year: string;
  description: string;
  cover: ImageAsset;
  /** Placeholder art + color used until a real cover image is added */
  visual: Visual;
  tone: Tone;
  caseStudy: CaseStudy;
  /** Editorial spread on the homepage: one real screen + the detail that explains the design */
  spotlight?: {
    image: ImageAsset;
    /** The detail inside `image`, as fractions of its width/height (0–1). The hero reveal flies here. */
    detail: { x: number; y: number; w: number; h: number };
    heading: string;
    text: string;
  };
}

/** A print position in the hero, in % of the hero area.
    x = left edge; y = height of the print’s BOTTOM edge above the hero’s bottom
    (the silver ground line sits at y ≈ 6 on desktop, 5 on mobile). */
export interface PrintSpot {
  x: number;
  y: number;
  /** degrees */
  rotate: number;
}

export interface PrintLayout {
  /** Where it hangs before falling. Omit and the print starts on the ground. */
  hang?: PrintSpot;
  /** Where it ends up on the ground */
  rest: PrintSpot;
}

export interface DeskPrint {
  /** Image in /public — "" leaves the photo well empty */
  src: string;
  alt: string;
  /** Short mono caption on the print’s bottom border */
  caption: string;
  /** CSS object-position for the square crop, e.g. "50% 30%" */
  focus?: string;
  /** Project slug → clicking the print opens that case study instead of the photo */
  project?: string;
  /** Any page to open when the print is clicked (e.g. "/journey") */
  href?: string;
  /** "large", "focal" or "hero" (the homepage’s main print, bigger on phones); default is regular */
  size?: "large" | "focal" | "hero";
  /** This print hides the Brookfield detail and is the first to drop */
  cover?: boolean;
  /** A short true story shown when the photo is opened */
  story?: string;
  /** Omit a layout to hide the print there */
  desktop?: PrintLayout;
  mobile?: PrintLayout;
}
