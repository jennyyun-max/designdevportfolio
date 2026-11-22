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
   HOMEPAGE — a loose stack of prints beside the name. Positions are
   % of the collage area (the whole hero on desktop; the strip under the
   text on phones): x = left edge, y = height of the print’s bottom edge
   above the bottom. `hang` is where it starts (above the screen, y > 100);
   `rest` is where it lands. Omit `desktop` or `mobile` to hide a print
   there. The welcome’s stars turn into exactly these prints.
   ------------------------------------------------------------------ */
export const prints: DeskPrint[] = [
  {
    ...photos.portrait,
    size: "hero",
    desktop: { hang: { x: 57, y: 150, rotate: -12 }, rest: { x: 55, y: 13, rotate: -3 } },
    mobile: { hang: { x: 6, y: 260, rotate: -12 }, rest: { x: 6, y: 4, rotate: -4 } },
  },
  {
    ...photos.stageYears,
    size: "large",
    desktop: { hang: { x: 73, y: 160, rotate: 10 }, rest: { x: 67.5, y: 47, rotate: 4 } },
    mobile: { hang: { x: 52, y: 270, rotate: 10 }, rest: { x: 54, y: 52, rotate: 4 } },
  },
  {
    ...photos.photoshoot,
    size: "large",
    desktop: { hang: { x: 80, y: 150, rotate: -10 }, rest: { x: 72.5, y: 5, rotate: -2.5 } },
    mobile: { hang: { x: 58, y: 250, rotate: -10 }, rest: { x: 58, y: 3, rotate: -3 } },
  },
];

/* The camera on /playground develops these (personal photos only) */
export const archive: PersonalPhoto[] = collection.map((id) => photos[id]);
