import type { StaticImageData } from "next/image";
import portrait from "@/public/images/personal/portrait.jpg";
import stageYears from "@/public/images/personal/stage-years.jpg";
import photoshoot from "@/public/images/personal/photoshoot.jpg";

/* ==================================================================
   PERSONAL PHOTOS — the only images that go inside Polaroid frames.
   (Project work never goes in a Polaroid; it lives on /work.)

   Add a photo:
   1. Put the file in /public/images/personal/ (JPG or WebP, ~1200–1600px
      on the long side is plenty).
   2. Import it below, then add an entry to `photos`.
   3. Use it: add its id to `collection` (camera + anywhere showing all
      photos), to a print on the homepage (content/polaroids.ts), or to a
      chapter of the journey (content/site.ts).

   Each photo keeps its own aspect ratio — the frame fits the photo, so
   nothing is cropped. `focus` only matters where a photo is shown in a
   fixed-shape frame (e.g. the large About portrait).

   Image rules (from Chloe): no images showing the words “title” or
   “cignature”, and no group photos.
   ================================================================== */

export type PersonalPhoto = {
  src: StaticImageData;
  alt: string;
  /** Short mono caption on the print */
  caption: string;
  /** A short true story, shown when the photo is opened */
  story?: string;
  /** CSS object-position, only used where a frame crops */
  focus?: string;
};

export const photos = {
  portrait: {
    src: portrait,
    alt: "Portrait of Chloe Yun",
    caption: "Portrait",
    focus: "50% 25%",
    story:
      "I grew up in California, spent five years performing in Korea, and now study information at the University of Michigan — exploring where design and technology meet.",
  },
  stageYears: {
    src: stageYears,
    alt: "Chloe in a pastel stage photoshoot",
    caption: "Stage years",
    story:
      "Five years in K-pop, including with cignature. Music, choreography, styling, production — everything was teamwork toward one shared outcome, and it taught me to notice how people react to what we make.",
  },
  photoshoot: {
    src: photoshoot,
    alt: "Chloe in a photoshoot, holding an apple on a picnic blanket",
    caption: "Photoshoot",
    focus: "50% 40%",
    story:
      "Photoshoots, rehearsals, live stages: performing taught me to pay attention to how people react, what resonates, and how small changes can shape an experience. I still design that way.",
  },
} satisfies Record<string, PersonalPhoto>;

export type PhotoId = keyof typeof photos;

/* The whole collection, in order — used by the playground camera */
export const collection: PhotoId[] = ["portrait", "stageYears", "photoshoot"];
