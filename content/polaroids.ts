import type { PolaroidPhoto } from "@/lib/types";

/* ==================================================================
   POLAROIDS — the photos that drop onto the homepage.

   1. Put your photos in /public/images/polaroids/ (jpg, png, webp…).
   2. Update `src`, `alt` and `caption` below.
   3. Tweak `rotate` and the landing spots (`desktop` / `mobile`, in %
      of the photo area) until the scatter feels right.

   Portrait and landscape photos are both cropped into the same square
   window so every frame matches — use `focus` to choose the crop.
   Photos without a `mobile` spot are hidden on small screens.
   ================================================================== */

export const polaroids: PolaroidPhoto[] = [
  {
    src: "/images/polaroids/01-portrait.svg",
    alt: "Placeholder portrait of Chloe",
    caption: "[that’s me!]",
    rotate: -6,
    desktop: { x: 6, y: 6 },
    mobile: { x: 4, y: 4 },
    focus: "50% 35%",
  },
  {
    src: "/images/polaroids/02-landscape.svg",
    alt: "Placeholder photo of a favorite place",
    caption: "[a favorite place]",
    rotate: 5,
    desktop: { x: 52, y: 2 },
    mobile: { x: 52, y: 0 },
  },
  {
    src: "/images/polaroids/03-portrait.svg",
    alt: "Placeholder photo of a stack of books",
    caption: "[currently reading]",
    rotate: -3,
    desktop: { x: 32, y: 36 },
    mobile: { x: 28, y: 38 },
  },
  {
    src: "/images/polaroids/04-landscape.svg",
    alt: "Placeholder photo from a soccer game",
    caption: "[game day]",
    rotate: 8,
    desktop: { x: 62, y: 40 },
    mobile: { x: 60, y: 46 },
  },
  {
    src: "/images/polaroids/05-square.svg",
    alt: "Placeholder photo of a morning coffee",
    caption: "[morning ritual]",
    rotate: -9,
    desktop: { x: 2, y: 54 },
  },
  {
    src: "/images/polaroids/06-landscape.svg",
    alt: "Placeholder photo of board game night",
    caption: "[game night]",
    rotate: 3,
    desktop: { x: 38, y: 64 },
  },
];
