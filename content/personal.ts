import type { StaticImageData } from "next/image";
import portrait from "@/public/images/personal/portrait.jpg";
import stageYears from "@/public/images/personal/stage-years.jpg";
import photoshoot from "@/public/images/personal/photoshoot.jpg";
import campusLawn from "@/public/images/personal/campus-lawn.jpg";
import studySession from "@/public/images/personal/study-session.jpg";
import stadiumNight from "@/public/images/personal/stadium-night.jpg";
import stoneWall from "@/public/images/personal/stone-wall.jpg";
import mirrorGameDay from "@/public/images/personal/mirror-game-day.jpg";
import dinnerWithFriends from "@/public/images/personal/dinner-with-friends.jpg";
import costumeBloodWall from "@/public/images/personal/costume-blood-wall.jpg";
import costumeNight1 from "@/public/images/personal/costume-night-1.jpg";
import costumeNight2 from "@/public/images/personal/costume-night-2.jpg";
import costumeNight3 from "@/public/images/personal/costume-night-3.jpg";

/* ==================================================================
   PERSONAL PHOTOS — the only images that go inside Polaroid frames.
   (Project work never goes in a Polaroid; it lives on /work.)

   Add a photo:
   1. Put the file in /public/images/personal/ (JPG or WebP, ~1200–1600px
      on the long side is plenty).
   2. Import it below, then add an entry to `photos`.
   3. Use it: add its id to `wall` (the photo wall on /about — built for
      20–30 photos, laid out automatically), `collection` (the playground
      camera), a print on the homepage (content/polaroids.ts), or a
      chapter of the journey (content/site.ts).

   Each photo keeps its own aspect ratio — the frame fits the photo, so
   nothing is cropped. `focus` only matters where a photo is shown in a
   fixed-shape frame (e.g. the large About portrait).

   Image rules (from Chloe): no images showing the words “title” or
   “cignature”, and none of the cignature group photos. Photos with
   friends are fine — Chloe added them herself.

   Every file here is resized to ≤1600px and has its metadata (incl. GPS
   location) stripped — do the same for new photos from a phone.
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
  /** Small editorial metadata on the print, e.g. "Seoul" and "2022" — leave out if unknown */
  place?: string;
  year?: string;
  /** Size on the photo wall: s / m / l (default: a varied rhythm) */
  size?: "s" | "m" | "l";
};

export const photos = {
  portrait: {
    src: portrait,
    alt: "Portrait of Chloe Yun",
    caption: "Portrait",
    size: "l",
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
  campusLawn: {
    src: campusLawn,
    alt: "Chloe standing on a campus lawn under a large tree, stone buildings behind her",
    caption: "Campus lawn",
    size: "l",
  },
  studySession: {
    src: studySession,
    alt: "Chloe working on a laptop by a sunny window, an iced matcha beside her",
    caption: "Study session",
    size: "m",
  },
  stadiumNight: {
    src: stadiumNight,
    alt: "Chloe looking back over her shoulder in a packed stadium at night",
    caption: "Game night",
    place: "Ann Arbor",
    size: "m",
  },
  stoneWall: {
    src: stoneWall,
    alt: "Chloe in a Michigan top standing against a sunlit stone wall",
    caption: "Maize & blue",
    place: "Ann Arbor",
    size: "s",
  },
  mirrorGameDay: {
    src: mirrorGameDay,
    alt: "Mirror selfie of Chloe and three friends in Michigan tops",
    caption: "Game day",
    place: "Ann Arbor",
    size: "m",
  },
  dinnerWithFriends: {
    src: dinnerWithFriends,
    alt: "A long table of friends sharing dinner in a kitchen",
    caption: "Dinner with friends",
    size: "l",
  },
  costumeBloodWall: {
    src: costumeBloodWall,
    alt: "Chloe in a costume — school uniform and knee-high boots — in front of a fake-blood backdrop",
    caption: "Costume",
    size: "s",
  },
  costumeNight1: {
    src: costumeNight1,
    alt: "Chloe and friends in costumes, stacked in a tower pose, laughing",
    caption: "Costume night",
    size: "s",
  },
  costumeNight2: {
    src: costumeNight2,
    alt: "Chloe and friends in costumes, stacked in a tower pose",
    caption: "Costume night II",
    size: "m",
  },
  costumeNight3: {
    src: costumeNight3,
    alt: "Close-up selfie of Chloe and three friends in costumes at a party",
    caption: "Costume night III",
    size: "m",
  },
} satisfies Record<string, PersonalPhoto>;

export type PhotoId = keyof typeof photos;

/* The whole collection, in order — used by the playground camera */
export const collection: PhotoId[] = [
  "portrait", "campusLawn", "stageYears", "studySession", "stadiumNight", "photoshoot", "dinnerWithFriends",
  "stoneWall", "mirrorGameDay", "costumeBloodWall", "costumeNight2", "costumeNight3", "costumeNight1",
];

/* The photo wall on /about, in this order (the layout is stable: position follows order).
   Built for 20–30 photos — each id once, no repeats. */
export const wall: PhotoId[] = [
  "portrait", "campusLawn", "costumeNight2", "stadiumNight", "studySession",
  "stageYears", "dinnerWithFriends", "stoneWall", "costumeBloodWall", "mirrorGameDay",
  "photoshoot", "costumeNight3", "costumeNight1",
];
