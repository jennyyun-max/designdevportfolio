import type { DeskPrint } from "@/lib/types";
import { collection, photos, type PersonalPhoto } from "./personal";

/* ==================================================================
   PRINTS (POLAROIDS)

   Personal photos only — they come from content/personal.ts (add new
   photos there). Each print keeps its photo's aspect ratio. `size`:
   "large", "focal" or "hero"; default regular. Prints show in black &
   white until hovered; clicking one opens it with its story.
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
   HOMEPAGE — a layered collage of prints beside the name. Positions are
   % of the collage area (the whole hero on desktop; the strip under the
   text on phones): x = left edge, y = height of the print’s bottom edge
   above the bottom. `hang` is where it starts (above the screen, y > 100);
   `rest` is where it lands. Omit `desktop` or `mobile` to hide a print
   there. The welcome’s stars turn into exactly these prints.
   ------------------------------------------------------------------ */
export const prints: DeskPrint[] = [
  // desktop: 15 prints in a loose 5 x 3 beside the name · phones: the 5 with a `mobile` spot
  { ...photos.stadiumNight,
    desktop: { hang: { x: 47, y: 170, rotate: 15 }, rest: { x: 47, y: 57, rotate: 5 } }, },
  { ...photos.nightSwim,
    desktop: { hang: { x: 57, y: 160, rotate: -15 }, rest: { x: 57, y: 55, rotate: -5 } },
    mobile: { hang: { x: 40, y: 260, rotate: 12 }, rest: { x: 40, y: 48, rotate: 4 } } },
  { ...photos.corner,
    desktop: { hang: { x: 67, y: 160, rotate: 9 }, rest: { x: 67, y: 58, rotate: 3 } },
    mobile: { hang: { x: 3, y: 260, rotate: -12 }, rest: { x: 3, y: 6, rotate: -4 } } },
  { ...photos.saltAndLight,
    desktop: { hang: { x: 77, y: 150, rotate: -9 }, rest: { x: 76.5, y: 29, rotate: -2 } }, },
  { ...photos.cherries,
    desktop: { hang: { x: 86.5, y: 170, rotate: 12 }, rest: { x: 86.5, y: 54, rotate: 4 } },
    mobile: { hang: { x: 65, y: 260, rotate: -12 }, rest: { x: 65, y: 3, rotate: -4 } } },
  { ...photos.sanJuanStreet, size: "large",
    desktop: { hang: { x: 46.5, y: 160, rotate: -12 }, rest: { x: 46.5, y: 27, rotate: -4 } },
    mobile: { hang: { x: 66, y: 260, rotate: -9 }, rest: { x: 66, y: 44, rotate: -3 } } },
  { ...photos.streetMural,
    desktop: { hang: { x: 58, y: 150, rotate: 12 }, rest: { x: 58, y: 30, rotate: 4 } }, },
  { ...photos.pilates,
    desktop: { hang: { x: 67.5, y: 150, rotate: -12 }, rest: { x: 67.5, y: 27, rotate: -4 } }, },
  { ...photos.photoBooth,
    desktop: { hang: { x: 77, y: 150, rotate: -6 }, rest: { x: 77, y: 56, rotate: -3 } },
    mobile: { hang: { x: 35, y: 260, rotate: 9 }, rest: { x: 35, y: 2, rotate: 3 } } },
  { ...photos.sushi,
    desktop: { hang: { x: 86.5, y: 150, rotate: 9 }, rest: { x: 86.5, y: 26, rotate: 3 } }, },
  { ...photos.tacos,
    desktop: { hang: { x: 48, y: 170, rotate: -15 }, rest: { x: 48, y: 2, rotate: -5 } }, },
  { ...photos.candlelight,
    desktop: { hang: { x: 57.5, y: 160, rotate: 9 }, rest: { x: 57.5, y: 3, rotate: 3 } }, },
  { ...photos.instantPrints,
    desktop: { hang: { x: 67, y: 170, rotate: -9 }, rest: { x: 67, y: 4, rotate: -3 } }, },
  { ...photos.studySession,
    desktop: { hang: { x: 76.5, y: 170, rotate: 18 }, rest: { x: 76.5, y: 2, rotate: 6 } }, },
  { ...photos.campusLawn,
    desktop: { hang: { x: 86.5, y: 160, rotate: -9 }, rest: { x: 86.5, y: 3, rotate: -3 } }, },
];

/* The camera on /playground develops these (personal photos only) */
export const archive: PersonalPhoto[] = collection.map((id) => photos[id]);
