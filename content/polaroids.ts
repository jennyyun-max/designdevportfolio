import type { DeskPrint } from "@/lib/types";

/* ==================================================================
   PHOTO PRINTS

   Swap a photo: put the file in /public/images/… and change `src`
   (and `alt`). `src: ""` leaves the photo well empty.
   `project: "<slug>"` makes the print open that case study.
   `size`: "focal" (the hero’s main image) or "large"; default regular.
   ================================================================== */

/* Drop timing for the homepage prints — tweak these to change how they fall. */
export const dropSettings = {
  /** How far the visitor scrolls (in % of screen height) before the Michigan print lets go */
  firstDropAt: 2,
  /** Seconds after that before the other prints start raining in from above */
  rainDelay: 0.25,
  /** Seconds between one raining print and the next */
  rainEvery: 0.2,
  /** Seconds the Michigan print hangs by one corner (tipping) before it falls */
  tipSeconds: 0.38,
  /** Seconds for a print to fall the full height of the hero (bigger = slower, heavier) */
  fallSeconds: 1.1,
};

/* ------------------------------------------------------------------
   HOMEPAGE HERO — the Michigan drawing from the intro hangs beside
   “hi, i’m chloe”. On the first scroll it drops, and the others rain
   in from above the screen.
   Positions are % of the hero: x = left edge, y = height of the
   print’s bottom edge above the bottom of the hero (the floor line
   is at 6 on desktop, 5 on mobile). `hang` = where it waits: a `y`
   above 100 is off-screen, so that print rains in (no thread).
   Omit `desktop` or `mobile` to hide a print there.

   The print marked `cover: true` hides the featured project detail
   (`reveal` below), which shows once it drops.
   ------------------------------------------------------------------ */
export const reveal = {
  src: "/images/projects/brookfield/irr-detail.webp",
  alt: "Detail from the Brookfield Knowledge Hub: IRR — two values found, 16.98% or 16.56%",
  project: "brookfield",
};

export const prints: DeskPrint[] = [
  {
    src: "/images/polaroids/chloe-portrait.jpg",
    alt: "Portrait of Chloe Yun",
    caption: "that’s me",
    focus: "50% 25%",
    size: "large",
    desktop: { hang: { x: 63, y: 135, rotate: -16 }, rest: { x: 61, y: 6.5, rotate: 4 } },
    mobile: { hang: { x: 4, y: 150, rotate: -16 }, rest: { x: 3, y: 5.5, rotate: -6 } },
  },
  {
    // The intro's last frame (drawn in components/intro/Sketch.tsx). Second in the list → pinned by its
    // right corner, so on phones its thread stays clear of the intro text
    src: "",
    art: "michigan",
    alt: "Pencil drawing of Chloe smiling at a University of Michigan library desk, tapping a button she designed on her laptop",
    caption: "",
    size: "hero",
    cover: true,
    desktop: { hang: { x: 43, y: 30, rotate: -3 }, rest: { x: 41, y: 6.5, rotate: -5 } },
    mobile: { hang: { x: 24, y: 14, rotate: -2 }, rest: { x: 22, y: 5.5, rotate: -4 } },
  },
  {
    src: "/images/projects/lumen/01-cover.png",
    alt: "LUMEN app screens",
    caption: "LUMEN",
    focus: "68% 45%",
    project: "lumen",
    desktop: { hang: { x: 78, y: 140, rotate: 14 }, rest: { x: 76, y: 6, rotate: -5 } },
    mobile: { hang: { x: 72, y: 150, rotate: 14 }, rest: { x: 71, y: 5.5, rotate: 6 } },
  },
  {
    src: "/images/polaroids/sweetie-but-saltie.jpg",
    alt: "cignature lying in a circle holding telephones",
    caption: "sweetie but saltie",
    desktop: { hang: { x: 87, y: 150, rotate: -12 }, rest: { x: 85, y: 7, rotate: 6 } },
  },
];

/* ------------------------------------------------------------------
   PLAY — the photo archive at /play. Prints are dealt onto a table in
   this order (left → right, top → bottom) and can be dragged and tossed.
   No positions needed: add or remove prints and the table re-flows.
   ------------------------------------------------------------------ */
export const playPrints: DeskPrint[] = [
  { src: "/images/polaroids/chloe-portrait.jpg", alt: "Portrait of Chloe Yun", caption: "that’s me", focus: "50% 25%", size: "large" },
  { src: "/images/polaroids/sweetie-but-saltie.jpg", alt: "cignature lying in a circle holding telephones", caption: "sweetie but saltie" },
  // Photo removed — original file kept at /images/polaroids/cignature-stadium.jpg
  { src: "", alt: "Empty photo well", caption: "cignature" },
  { src: "/images/projects/kpop-to-data/my-little-aurora.webp", alt: "cignature in pink stage outfits, My Little Aurora", caption: "my little aurora", size: "large" },
  { src: "/images/polaroids/cignature-apple.jpg", alt: "cignature photoshoot holding an apple", caption: "photoshoot days", focus: "50% 40%" },
  { src: "/images/projects/brookfield/irr-detail.webp", alt: "Brookfield Knowledge Hub: two IRR values flagged", caption: "two IRRs", project: "brookfield" },
  // Photo removed — original file kept at /images/polaroids/cignature-group.jpg
  { src: "", alt: "Empty photo well", caption: "the girls" },
  { src: "/images/projects/kpop-to-data/album.webp", alt: "cignature album packaging", caption: "the album", size: "large" },
  { src: "/images/polaroids/my-little-aurora.jpg", alt: "My Little Aurora album photo", caption: "aurora", focus: "50% 30%" },
  { src: "/images/projects/lumen/07-sketches.png", alt: "LUMEN early sketches", caption: "LUMEN sketches", focus: "50% 60%", project: "lumen" },
  { src: "/images/projects/kpop-to-data/cover.webp", alt: "cignature album cover in stadium seats", caption: "stadium seats", focus: "50% 60%", project: "kpop-to-data" },
  { src: "/images/projects/costco/sketch-warehouse.webp", alt: "Costco warehouse page sketch", caption: "costco sketch", focus: "50% 30%", project: "costco-redesign" },
  { src: "/images/projects/lumen/09-hifi.png", alt: "LUMEN hi-fi screens", caption: "LUMEN hi-fi", focus: "40% 65%", project: "lumen", size: "large" },
  { src: "/images/projects/nuseum/logo.webp", alt: "NUSEUM logo", caption: "NUSEUM", project: "nuseum" },
  { src: "/images/projects/data-analysis/unesco-map.webp", alt: "World map of UNESCO World Heritage Sites", caption: "1,121 sites", project: "data-analysis" },
];
