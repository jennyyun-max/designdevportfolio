import type { StaticImageData } from "next/image";
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
import nightSwim from "@/public/images/personal/night-swim.jpg";
import sanJuanStreet from "@/public/images/personal/san-juan-street.jpg";
import cherries from "@/public/images/personal/cherries.jpg";
import photoBooth from "@/public/images/personal/photo-booth.jpg";
import tacos from "@/public/images/personal/tacos.jpg";
import corner from "@/public/images/personal/corner.jpg";
import streetMural from "@/public/images/personal/street-mural.jpg";
import candlelight from "@/public/images/personal/candlelight.jpg";
import pilates from "@/public/images/personal/pilates.jpg";

/* ==================================================================
   PERSONAL PHOTOS — the only images that go inside Polaroid frames.
   (Project work never goes in a Polaroid; it lives on /work.)

   Add a photo:
   1. Put the file in /public/images/personal/ (JPG or WebP, ~1200–1600px
      on the long side is plenty).
   2. Import it below, then add an entry to `photos`.
   3. Use it: add its id to `collection` (the playground camera — every
      photo), a print in the homepage collage (content/polaroids.ts), or a
      chapter of the journey (content/site.ts).

   Each photo keeps its own aspect ratio — the frame fits the photo, so
   nothing is cropped. Prints show no titles — `caption` is only used as
   the photo's accessible name.

   Image rules (from Chloe): no images showing the words “title” or
   “cignature”, and none of the cignature group photos. Photos with
   friends are fine — Chloe added them herself.

   Every file here is resized to ≤1600px and has its metadata (incl. GPS
   location) stripped — do the same for new photos from a phone.
   ================================================================== */

export type PersonalPhoto = {
  src: StaticImageData;
  alt: string;
  /** Short name for the photo — not printed on the Polaroid, used for screen readers */
  caption: string;
  /** A short true story, shown when the photo is opened */
  story?: string;
  /** CSS object-position, only used where a frame crops */
  focus?: string;
  /** Small editorial metadata on the print, e.g. "Seoul" and "2022" — leave out if unknown */
  place?: string;
  year?: string;
};

export const photos = {
  campusLawn: {
    src: campusLawn,
    alt: "Chloe standing on a campus lawn under a large tree, stone buildings behind her",
    caption: "Campus lawn",
  },
  studySession: {
    src: studySession,
    alt: "Chloe working on a laptop by a sunny window, an iced matcha beside her",
    caption: "Study session",
  },
  stadiumNight: {
    src: stadiumNight,
    alt: "Chloe looking back over her shoulder in a packed stadium at night",
    caption: "Game night",
    place: "Ann Arbor",
  },
  stoneWall: {
    src: stoneWall,
    alt: "Chloe in a Michigan top standing against a sunlit stone wall",
    caption: "Maize & blue",
    place: "Ann Arbor",
  },
  mirrorGameDay: {
    src: mirrorGameDay,
    alt: "Mirror selfie of Chloe and three friends in Michigan tops",
    caption: "Game day",
    place: "Ann Arbor",
  },
  dinnerWithFriends: {
    src: dinnerWithFriends,
    alt: "A long table of friends sharing dinner in a kitchen",
    caption: "Dinner with friends",
  },
  costumeBloodWall: {
    src: costumeBloodWall,
    alt: "Chloe in a costume — school uniform and knee-high boots — in front of a fake-blood backdrop",
    caption: "Costume",
  },
  costumeNight1: {
    src: costumeNight1,
    alt: "Chloe and friends in costumes, stacked in a tower pose, laughing",
    caption: "Costume night",
  },
  costumeNight2: {
    src: costumeNight2,
    alt: "Chloe and friends in costumes, stacked in a tower pose",
    caption: "Costume night II",
  },
  costumeNight3: {
    src: costumeNight3,
    alt: "Close-up selfie of Chloe and three friends in costumes at a party",
    caption: "Costume night III",
  },
  nightSwim: {
    src: nightSwim,
    alt: "Chloe in a pool at night, looking back over her shoulder, lit trees behind",
    caption: "Night swim",
  },
  sanJuanStreet: {
    src: sanJuanStreet,
    alt: "Chloe from behind on a blue cobblestone street lined with pastel buildings",
    caption: "San Juan",
    place: "Puerto Rico",
  },
  cherries: {
    src: cherries,
    alt: "Chloe at a café table with a plate of cherries and a mint drink",
    caption: "Cherries",
  },
  photoBooth: {
    src: photoBooth,
    alt: "A black-and-white photo-booth sheet of nine poses of Chloe",
    caption: "Photo booth",
  },
  tacos: {
    src: tacos,
    alt: "Two crispy tacos topped with fried greens, next to a bottle and a glass",
    caption: "Tacos",
  },
  corner: {
    src: corner,
    alt: "Chloe in black, sitting against a white wall with her head tilted",
    caption: "Quiet corner",
  },
  streetMural: {
    src: streetMural,
    alt: "Chloe sitting on a bench in front of a large painted rabbit mural",
    caption: "Street mural",
  },
  candlelight: {
    src: candlelight,
    alt: "A lit candle on a shelf with perfume bottles and a plush toy",
    caption: "Candlelight",
  },
  pilates: {
    src: pilates,
    alt: "Mirror selfie of Chloe on a reformer in a Pilates studio",
    caption: "Pilates",
  },
} satisfies Record<string, PersonalPhoto>;

export type PhotoId = keyof typeof photos;

/* The whole collection, in order — the playground camera develops every one of these */
export const collection: PhotoId[] = [
  "campusLawn", "studySession", "stadiumNight", "dinnerWithFriends",
  "stoneWall", "mirrorGameDay", "costumeBloodWall", "costumeNight2", "costumeNight3", "costumeNight1",
  "nightSwim", "sanJuanStreet", "cherries", "photoBooth", "tacos", "corner", "streetMural", "candlelight", "pilates",
];
