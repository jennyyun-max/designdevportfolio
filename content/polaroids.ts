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
  // desktop: 12 prints layered beside the name · phones: the 5 with a `mobile` spot
  { ...photos.portrait, size: "large",
    desktop: { hang: { x: 46.5, y: 150, rotate: -12 }, rest: { x: 46.5, y: 26, rotate: -4 } },
    mobile: { hang: { x: 2, y: 260, rotate: -12 }, rest: { x: 2, y: 6, rotate: -4 } } },
  { ...photos.sanJuanStreet,
    desktop: { hang: { x: 60.5, y: 160, rotate: 10 }, rest: { x: 60.5, y: 3, rotate: 3 } },
    mobile: { hang: { x: 66, y: 250, rotate: 10 }, rest: { x: 66, y: 44, rotate: -3 } } },
  { ...photos.stageYears,
    desktop: { hang: { x: 48.5, y: 170, rotate: 12 }, rest: { x: 48.5, y: 58, rotate: 5 } } },
  { ...photos.photoBooth,
    desktop: { hang: { x: 85.5, y: 150, rotate: -10 }, rest: { x: 85.5, y: 26, rotate: -2 } },
    mobile: { hang: { x: 34, y: 240, rotate: -10 }, rest: { x: 35, y: 2, rotate: 3 } } },
  { ...photos.nightSwim,
    desktop: { hang: { x: 60, y: 160, rotate: 14 }, rest: { x: 60, y: 55, rotate: -5 } },
    mobile: { hang: { x: 40, y: 270, rotate: 14 }, rest: { x: 40, y: 48, rotate: 4 } } },
  { ...photos.streetMural,
    desktop: { hang: { x: 61.5, y: 150, rotate: -8 }, rest: { x: 61.5, y: 30, rotate: 4 } } },
  { ...photos.photoshoot,
    desktop: { hang: { x: 84, y: 160, rotate: 10 }, rest: { x: 84, y: 3, rotate: -3 } } },
  { ...photos.cherries,
    desktop: { hang: { x: 85, y: 170, rotate: -12 }, rest: { x: 85, y: 54, rotate: 4 } },
    mobile: { hang: { x: 64, y: 260, rotate: -12 }, rest: { x: 65, y: 3, rotate: -4 } } },
  { ...photos.pilates,
    desktop: { hang: { x: 73, y: 150, rotate: 8 }, rest: { x: 73, y: 27, rotate: -4 } } },
  { ...photos.corner,
    desktop: { hang: { x: 72.5, y: 160, rotate: -10 }, rest: { x: 72.5, y: 58, rotate: 3 } } },
  { ...photos.tacos,
    desktop: { hang: { x: 49, y: 170, rotate: 12 }, rest: { x: 49, y: 2, rotate: -5 } } },
  { ...photos.candlelight,
    desktop: { hang: { x: 71.5, y: 160, rotate: -6 }, rest: { x: 71.5, y: 2, rotate: 6 } } },
];

/* The camera on /playground develops these (personal photos only) */
export const archive: PersonalPhoto[] = collection.map((id) => photos[id]);
