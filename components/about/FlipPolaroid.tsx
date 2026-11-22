"use client";

import Image, { type StaticImageData } from "next/image";
import { useState, type ReactNode } from "react";

/* A large print with an index card on the back. Hover (or click / Enter) turns it over. */
export default function FlipPolaroid({
  src,
  alt,
  caption,
  back,
  rotate = -2,
  priority = false,
  className = "",
}: {
  src: StaticImageData;
  alt: string;
  caption: string;
  back: ReactNode;
  rotate?: number;
  priority?: boolean;
  className?: string;
}) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={`${caption} — ${flipped ? "show the photo" : "turn it over to read the back"}`}
      className={`group relative block w-full text-left [perspective:1400px] ${className}`}
      style={{ rotate: `${rotate}deg` }}
      data-cursor="open"
    >
      <span
        className={`relative block transition-transform duration-[1.1s] ease-[var(--ease-out-expo)] [transform-style:preserve-3d] motion-reduce:transition-none [@media(hover:hover)]:group-hover:[transform:rotateY(180deg)] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* front */}
        <span className="block bg-print p-[4%] pb-0 shadow-[0_30px_60px_-30px_rgba(37,37,34,0.55)] [backface-visibility:hidden]">
          {/* the photo at its own aspect ratio */}
          <Image src={src} alt={alt} priority={priority} sizes="(min-width: 1024px) 40vw, 90vw" className="mono-photo block h-auto w-full bg-stone" />
          <span className="meta flex h-12 items-center justify-end text-muted" aria-hidden="true">
            ↻
          </span>
        </span>
        {/* back: an index card */}
        <span className="absolute inset-0 flex flex-col justify-between bg-print p-[8%] shadow-[0_30px_60px_-30px_rgba(37,37,34,0.55)] [backface-visibility:hidden] [background-image:linear-gradient(transparent_calc(2.4rem-1px),var(--line)_0)] [background-size:100%_2.4rem] [transform:rotateY(180deg)]">
          {back}
        </span>
      </span>
    </button>
  );
}
