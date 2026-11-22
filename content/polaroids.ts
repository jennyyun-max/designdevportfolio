import type { DeskPrint } from "@/lib/types";

/* ==================================================================
   PRINTS (POLAROIDS)

   Swap a photo: put the file in /public/images/… and change `src`
   (and `alt`). `project: "<slug>"` opens that case study; `href`
   opens any page; `story` is shown when a photo print is opened.
   `size`: "large", "focal" or "hero"; default regular. Prints show in
   black & white until hovered.

   Image rules (from Chloe): no images showing the words “title” or
   “cignature”, and none of the group photos she asked to remove.
   That’s why the stage photo is a text-free crop (aurora-portrait.jpg).
   ================================================================== */

/* How the homepage prints fall in (when the welcome isn’t playing) */
export const dropSettings = {
  /** Seconds before the first print starts falling */
  startDelay: 0.2,
  /** Seconds between one print and the next */
  every: 0.12,
  /** Seconds for a fall the full height of the hero (bigger = slower) */
  fallSeconds: 1.1,
};

/* ------------------------------------------------------------------
   HOMEPAGE — a loose stack of prints laid over the name. Positions are
   % of the collage area (the whole hero on desktop; the strip under the
   text on phones): x = left edge, y = height of the print’s bottom edge
   above the bottom. `hang` is where it starts (above the screen, y > 100);
   `rest` is where it lands. Omit `desktop` or `mobile` to hide a print
   there. The welcome’s stars turn into exactly these prints.
   ------------------------------------------------------------------ */
export const prints: DeskPrint[] = [
  {
    src: "/images/polaroids/chloe-portrait.jpg",
    alt: "Portrait of Chloe Yun",
    caption: "Portrait",
    focus: "50% 25%",
    size: "large",
    story:
      "I grew up in California, spent five years performing in Korea, and now study information at the University of Michigan — exploring where design and technology meet.",
    desktop: { hang: { x: 60, y: 150, rotate: -14 }, rest: { x: 55, y: 31, rotate: -4 } },
    mobile: { hang: { x: 4, y: 260, rotate: -14 }, rest: { x: 4, y: 30, rotate: -5 } },
  },
  {
    src: "/images/polaroids/aurora-portrait.jpg",
    alt: "Chloe in a pastel stage photoshoot",
    caption: "Stage years",
    story:
      "Five years in K-pop, including with cignature. Music, choreography, styling, production — everything was teamwork toward one shared outcome, and it taught me to notice how people react to what we make.",
    desktop: { hang: { x: 73, y: 160, rotate: 12 }, rest: { x: 69, y: 47, rotate: 5 } },
    mobile: { hang: { x: 36, y: 270, rotate: 12 }, rest: { x: 36, y: 46, rotate: 4 } },
  },
  {
    src: "/images/polaroids/cignature-apple.jpg",
    alt: "Photoshoot with an apple on a picnic blanket",
    caption: "Photoshoot",
    focus: "50% 40%",
    story:
      "Photoshoots, rehearsals, live stages: performing taught me to pay attention to how people react, what resonates, and how small changes can shape an experience. I still design that way.",
    desktop: { hang: { x: 85, y: 150, rotate: -10 }, rest: { x: 82, y: 26, rotate: -3 } },
    mobile: { hang: { x: 66, y: 250, rotate: -10 }, rest: { x: 66, y: 22, rotate: -4 } },
  },
  {
    src: "/images/projects/lumen/01-cover.png",
    alt: "LUMEN app screens",
    caption: "LUMEN",
    focus: "70% 45%",
    project: "lumen",
    desktop: { hang: { x: 66, y: 170, rotate: 10 }, rest: { x: 63, y: 5, rotate: 2.5 } },
    mobile: { hang: { x: 28, y: 240, rotate: 10 }, rest: { x: 30, y: 2, rotate: 2 } },
  },
  {
    src: "/images/projects/brookfield/project-page.webp",
    alt: "Brookfield Knowledge Hub project page",
    caption: "Atlas Digital",
    focus: "70% 30%",
    project: "brookfield",
    desktop: { hang: { x: 80, y: 160, rotate: -12 }, rest: { x: 76.5, y: 3, rotate: -2 } },
  },
  {
    src: "/images/projects/data-analysis/unesco-map.webp",
    alt: "World map of UNESCO World Heritage Sites",
    caption: "1,121 sites",
    focus: "45% 50%",
    project: "data-analysis",
    desktop: { hang: { x: 89, y: 170, rotate: 10 }, rest: { x: 87.5, y: 55, rotate: 4 } },
  },
];

/* ------------------------------------------------------------------
   THE ARCHIVE — photos the playground camera can “develop”. Only
   images that follow the rules above.
   ------------------------------------------------------------------ */
export const archive: { src: string; alt: string; caption: string; focus?: string; story: string; href?: string }[] = [
  { src: "/images/polaroids/chloe-portrait.jpg", alt: "Portrait of Chloe Yun", caption: "hi, that’s me!", focus: "50% 25%", story: "California → Korea → Michigan, and still the same person." },
  { src: "/images/polaroids/aurora-portrait.jpg", alt: "Chloe in a pastel stage photoshoot", caption: "the stage years", story: "Five years in K-pop taught me audiences, feedback and teamwork." },
  { src: "/images/polaroids/cignature-apple.jpg", alt: "Photoshoot with an apple on a picnic blanket", caption: "photoshoot days", focus: "50% 40%", story: "Small changes shape how people feel. True on stage, true in UI." },
  { src: "/images/projects/lumen/07-sketches.png", alt: "Early hand sketches of the LUMEN app", caption: "LUMEN sketches", focus: "50% 60%", story: "Paper first: testing hierarchy before any visual design.", href: "/work/lumen" },
  { src: "/images/projects/lumen/09-hifi.png", alt: "LUMEN hi-fi screens", caption: "LUMEN hi-fi", focus: "40% 65%", story: "A festival app for the worst moment: no signal, dying phone.", href: "/work/lumen" },
  { src: "/images/projects/brookfield/dashboard.webp", alt: "Brookfield Knowledge Hub dashboard", caption: "hide the volume", focus: "30% 30%", story: "Atlas Digital: only the risk is loud.", href: "/work/brookfield" },
  { src: "/images/projects/costco/sketch-warehouse.webp", alt: "Costco warehouse page sketch", caption: "costco sketch", focus: "50% 30%", story: "Structure before polish: sketches came first.", href: "/work/costco-redesign" },
  { src: "/images/projects/data-analysis/unesco-map.webp", alt: "World map of UNESCO World Heritage Sites", caption: "1,121 sites", story: "Data is only useful when people can understand it.", href: "/work/data-analysis" },
  { src: "/images/projects/nuseum/logo.webp", alt: "NUSEUM logo", caption: "NUSEUM", story: "A food-as-medicine startup where accuracy really matters.", href: "/work/nuseum" },
];
