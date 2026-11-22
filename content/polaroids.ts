import type { DeskPrint } from "@/lib/types";

/* ==================================================================
   POLAROIDS

   Swap a photo: put the file in /public/images/… and change `src`
   (and `alt`). `project: "<slug>"` opens that case study; `href`
   opens any page; `story` is shown when a photo print is opened.
   `size`: "large", "focal" or "hero"; default regular. `tape` adds a
   strip of washi tape in that color.

   Image rules (from Chloe): no images showing the words “title” or
   “cignature”, and none of the group photos she asked to remove.
   That’s why the stage photo is a text-free crop (aurora-portrait.jpg).
   ================================================================== */

/* How the homepage Polaroids fall in on page load */
export const dropSettings = {
  /** Seconds before the first Polaroid starts falling */
  startDelay: 0.15,
  /** Seconds between one Polaroid and the next */
  every: 0.14,
  /** Seconds for a fall the full height of the hero (bigger = slower, floatier) */
  fallSeconds: 1.15,
};

/* ------------------------------------------------------------------
   HOMEPAGE — a collage beside “hi, i’m chloe!”. Positions are % of the
   collage area (the whole hero on desktop; the area under the text on
   phones): x = left edge, y = height of the print’s bottom edge above the
   bottom of the hero. `hang` is where it starts (above the screen, so
   y > 100); `rest` is where it lands. Omit `desktop` or `mobile` to
   hide a print there. Prints fall in the order listed.
   ------------------------------------------------------------------ */
export const prints: DeskPrint[] = [
  {
    src: "/images/polaroids/chloe-portrait.jpg",
    alt: "Portrait of Chloe Yun",
    caption: "hi, that’s me!",
    focus: "50% 25%",
    size: "large",
    tape: "var(--butter)",
    story:
      "Hi! I’m Chloe. I grew up in California, spent five years performing in Korea, and now I study information at the University of Michigan — exploring where creativity, design, and technology meet.",
    desktop: { hang: { x: 46, y: 150, rotate: -20 }, rest: { x: 46.5, y: 47, rotate: -7 } },
    mobile: { hang: { x: 2, y: 260, rotate: -20 }, rest: { x: 1, y: 48, rotate: -8 } },
  },
  {
    // The last frame of the hand-drawn welcome (components/intro/Sketch.tsx)
    src: "",
    art: "michigan",
    href: "/journey",
    alt: "Pencil drawing of Chloe at a University of Michigan library desk, tapping a button she designed on her laptop",
    caption: "ann arbor ♡",
    size: "hero",
    desktop: { hang: { x: 58, y: 160, rotate: 14 }, rest: { x: 57.5, y: 31, rotate: 3 } },
    mobile: { hang: { x: 30, y: 280, rotate: 14 }, rest: { x: 29, y: 24, rotate: 3 } },
  },
  {
    src: "/images/projects/lumen/01-cover.png",
    alt: "LUMEN app screens",
    caption: "LUMEN",
    focus: "70% 45%",
    project: "lumen",
    tape: "var(--blush)",
    desktop: { hang: { x: 74, y: 170, rotate: 18 }, rest: { x: 74.5, y: 58, rotate: 8 } },
    mobile: { hang: { x: 66, y: 260, rotate: 18 }, rest: { x: 67, y: 52, rotate: 8 } },
  },
  {
    src: "/images/projects/brookfield/project-page.webp",
    alt: "Brookfield Knowledge Hub project page",
    caption: "atlas digital",
    focus: "70% 30%",
    project: "brookfield",
    size: "large",
    desktop: { hang: { x: 80, y: 160, rotate: -16 }, rest: { x: 79.5, y: 24, rotate: -5 } },
    mobile: { hang: { x: 60, y: 250, rotate: -16 }, rest: { x: 62, y: 3, rotate: -5 } },
  },
  {
    src: "/images/polaroids/aurora-portrait.jpg",
    alt: "Chloe in a pastel stage photoshoot",
    caption: "the stage years",
    tape: "var(--lavender)",
    story:
      "Five years in K-pop, including with cignature. Music, choreography, styling, production — everything was teamwork toward one shared outcome, and it taught me to notice how people react to what we make.",
    desktop: { hang: { x: 66, y: 150, rotate: -12 }, rest: { x: 66, y: 4, rotate: -7 } },
    mobile: { hang: { x: 3, y: 240, rotate: -12 }, rest: { x: 2, y: 2, rotate: 6 } },
  },
  {
    src: "/images/polaroids/cignature-apple.jpg",
    alt: "Photoshoot with an apple on a picnic blanket",
    caption: "photoshoot days",
    focus: "50% 40%",
    story:
      "Photoshoots, rehearsals, live stages: performing taught me to pay attention to how people react, what resonates, and how small changes can shape an experience. I still design that way.",
    desktop: { hang: { x: 47, y: 150, rotate: 16 }, rest: { x: 47.5, y: 5, rotate: 6 } },
  },
  {
    src: "/images/projects/costco/cover.webp",
    alt: "Costco app redesign screens",
    caption: "costco redesign",
    focus: "78% 50%",
    project: "costco-redesign",
    desktop: { hang: { x: 86, y: 150, rotate: 14 }, rest: { x: 86, y: 3, rotate: 9 } },
  },
  {
    src: "/images/projects/data-analysis/unesco-map.webp",
    alt: "World map of UNESCO World Heritage Sites",
    caption: "1,121 sites",
    focus: "45% 50%",
    project: "data-analysis",
    tape: "var(--sky)",
    desktop: { hang: { x: 88, y: 170, rotate: -14 }, rest: { x: 87.5, y: 60, rotate: -6 } },
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
