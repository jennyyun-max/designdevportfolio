import type { DeskPrint } from "@/lib/types";

/* ==================================================================
   HERO PRINTS — the photos that fall when you scroll the homepage.

   Swap a photo: put the file in /public/images/… and change `src`
   (and `alt`). `src: ""` leaves the photo well empty.
   `project: "<slug>"` makes the print open that case study.

   Positions are % of the hero: x = left edge, y = height of the
   print’s bottom edge above the bottom of the hero (ground ≈ 6).
   `hang` = where it waits before dropping (omit it and the print
   starts on the ground). Prints drop in the order listed.
   Omit `desktop` or `mobile` to hide a print on that screen size.
   ================================================================== */

/* Drop timing — tweak these to change how the prints fall. */
export const dropSettings = {
  /** How far (in % of screen height) the visitor scrolls before the first print drops */
  firstDropAt: 3,
  /** Extra scrolling (% of screen height) between one drop and the next */
  dropEvery: 9,
  /** Scrolling (% of screen height) kept after the last drop so the pile stays in view */
  holdAfter: 35,
  /** Seconds for a print to fall from the top of the hero (bigger = slower, heavier) */
  fallSeconds: 1.15,
};

export const prints: DeskPrint[] = [
  {
    src: "/images/polaroids/chloe-portrait.jpg",
    alt: "Portrait of Chloe Yun",
    caption: "that’s me",
    focus: "50% 25%",
    desktop: { hang: { x: 1.5, y: 73, rotate: -6 }, rest: { x: 18, y: 6.5, rotate: -4 } },
    mobile: { hang: { x: 2, y: 77.5, rotate: -5 }, rest: { x: 19, y: 5.5, rotate: 5 } },
  },
  {
    src: "/images/projects/lumen/01-cover.png",
    alt: "LUMEN app screens",
    caption: "LUMEN",
    focus: "68% 45%",
    project: "lumen",
    desktop: { hang: { x: 86.5, y: 71, rotate: 5 }, rest: { x: 41, y: 7, rotate: 3 } },
    mobile: { hang: { x: 37, y: 79, rotate: 3 }, rest: { x: 48, y: 6, rotate: -4 } },
  },
  {
    src: "/images/polaroids/sweetie-but-saltie.jpg",
    alt: "cignature group photo lying in a circle holding telephones",
    caption: "sweetie but saltie",
    desktop: { hang: { x: 11, y: 47, rotate: 4 }, rest: { x: 28, y: 6, rotate: -6 } },
    mobile: { hang: { x: 70, y: 77, rotate: 6 }, rest: { x: 72, y: 5.5, rotate: 6 } },
  },
  {
    src: "/images/projects/costco/cover.webp",
    alt: "Costco app redesign screens",
    caption: "costco redesign",
    focus: "62% 50%",
    project: "costco-redesign",
    desktop: { hang: { x: 78.5, y: 46, rotate: -4 }, rest: { x: 55, y: 6.5, rotate: 5 } },
    mobile: { rest: { x: 36, y: 5.5, rotate: 4 } },
  },
  {
    // Photo removed — original file kept at /images/polaroids/cignature-stadium.jpg
    src: "",
    alt: "Empty photo well",
    caption: "cignature",
    desktop: { hang: { x: 2, y: 24, rotate: -3 }, rest: { x: 8, y: 6, rotate: 7 } },
    mobile: { rest: { x: 4, y: 5, rotate: -6 } },
  },
  {
    src: "/images/projects/nuseum/logo.webp",
    alt: "NUSEUM logo",
    caption: "NUSEUM",
    project: "nuseum",
    desktop: { hang: { x: 87, y: 22, rotate: 6 }, rest: { x: 70, y: 7, rotate: -4 } },
  },
  {
    // Photo removed — original file kept at /images/polaroids/cignature-group.jpg
    src: "",
    alt: "Empty photo well",
    caption: "the girls",
    desktop: { hang: { x: 12, y: 20, rotate: -4 }, rest: { x: 79, y: 6, rotate: 5 } },
    mobile: { rest: { x: 64, y: 5, rotate: -3 } },
  },
  {
    src: "/images/polaroids/my-little-aurora.jpg",
    alt: "My Little Aurora album photo",
    caption: "my little aurora",
    focus: "50% 30%",
    desktop: { hang: { x: 77.5, y: 17, rotate: 3 }, rest: { x: 64, y: 6.5, rotate: -2 } },
  },

  /* Already on the ground when the page opens */
  {
    src: "/images/projects/kpop-to-data/cover.webp",
    alt: "cignature album cover in stadium seats",
    caption: "k-pop → data",
    focus: "50% 60%",
    project: "kpop-to-data",
    desktop: { rest: { x: 34, y: 6, rotate: -5 } },
  },
  {
    src: "/images/polaroids/cignature-apple.jpg",
    alt: "cignature photoshoot holding an apple",
    caption: "photoshoot days",
    focus: "50% 40%",
    desktop: { rest: { x: 48, y: 6.5, rotate: 4 } },
  },
  {
    src: "/images/projects/data-analysis/unesco-map.webp",
    alt: "World map of UNESCO World Heritage Sites",
    caption: "data projects",
    project: "data-analysis",
    desktop: { rest: { x: 61, y: 6, rotate: -3 } },
  },
];
