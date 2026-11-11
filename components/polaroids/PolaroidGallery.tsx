"use client";

import { useRef, useState, type ReactNode } from "react";
import type { PolaroidPhoto } from "@/lib/types";
import Polaroid from "./Polaroid";
import PhotoPreview from "./PhotoPreview";

/* A “desk” where polaroids drop in on page load and can be rearranged.
   Photos stay inside this area, so they never cover headings, nav or buttons.
   `children` render on the desk underneath the photos (e.g. the potato). */
export default function PolaroidGallery({
  photos,
  className = "",
  children,
}: {
  photos: PolaroidPhoto[];
  className?: string;
  children?: ReactNode;
}) {
  const areaRef = useRef<HTMLDivElement>(null);
  const [stack, setStack] = useState(() => photos.map((_, i) => i)); // last = on top
  const [open, setOpen] = useState<number | null>(null);

  const bringToFront = (i: number) =>
    setStack((s) => (s[s.length - 1] === i ? s : [...s.filter((n) => n !== i), i]));

  return (
    <div>
      <div
        ref={areaRef}
        role="group"
        aria-label="Scattered photos"
        aria-describedby="polaroid-help"
        className={`relative ${className}`}
      >
        {children}
        {photos.map((photo, i) => (
          <Polaroid
            key={photo.src}
            photo={photo}
            index={i}
            zIndex={10 + stack.indexOf(i)}
            areaRef={areaRef}
            onFront={() => bringToFront(i)}
            onOpen={() => setOpen(i)}
          />
        ))}
      </div>
      <p id="polaroid-help" className="mt-3 text-center text-sm text-espresso-soft">
        drag the photos around · tap one for a closer look
        <span className="sr-only"> · arrow keys move the focused photo</span>
      </p>
      <PhotoPreview photo={open === null ? null : photos[open]} onClose={() => setOpen(null)} />
    </div>
  );
}
