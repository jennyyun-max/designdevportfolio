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
    src: "/images/polaroids/chloe-portrait.jpg",
    alt: "Portrait of Chloe Yun",
    caption: "that’s me!",
    rotate: -6,
    desktop: { x: 6, y: 6 },
    mobile: { x: 4, y: 4 },
    focus: "50% 25%",
  },
  {
    src: "/images/polaroids/sweetie-but-saltie.jpg",
    alt: "cignature group photo lying in a circle holding telephones",
    caption: "sweetie but saltie",
    rotate: 5,
    desktop: { x: 52, y: 2 },
    mobile: { x: 52, y: 0 },
  },
  {
    src: "/images/polaroids/cignature-stadium.jpg",
    alt: "cignature photoshoot in stadium seats",
    caption: "cignature ✦",
    rotate: -3,
    desktop: { x: 32, y: 36 },
    mobile: { x: 28, y: 38 },
    focus: "50% 30%",
  },
  {
    src: "/images/polaroids/cignature-group.jpg",
    alt: "cignature group photo in pink outfits",
    caption: "the girls ♡",
    rotate: 8,
    desktop: { x: 62, y: 40 },
    mobile: { x: 60, y: 46 },
  },
  {
    src: "/images/polaroids/my-little-aurora.jpg",
    alt: "My Little Aurora album photo",
    caption: "my little aurora",
    rotate: -9,
    desktop: { x: 2, y: 54 },
    focus: "50% 30%",
  },
  {
    src: "/images/polaroids/cignature-apple.jpg",
    alt: "cignature photoshoot holding an apple",
    caption: "photoshoot days",
    rotate: 3,
    desktop: { x: 38, y: 64 },
    focus: "50% 40%",
  },
];
