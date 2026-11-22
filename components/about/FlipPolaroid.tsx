"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

/* A Polaroid with a note written on the back. Hover (or tap / Enter) flips it over. */
export default function FlipPolaroid({
  src,
  alt,
  caption,
  back,
  rotate = -3,
  tape = "var(--butter)",
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  back: ReactNode;
  rotate?: number;
  tape?: string;
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
      className={`group relative block w-full [perspective:1200px] ${className}`}
      style={{ rotate: `${rotate}deg` }}
    >
      <span className="tape -top-3 left-1/2 z-10 -translate-x-1/2 -rotate-3" style={{ ["--tape" as string]: tape }} aria-hidden="true" />
      <span
        className={`relative block transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform-style:preserve-3d] motion-reduce:transition-none [@media(hover:hover)]:group-hover:[transform:rotateY(180deg)] ${
          flipped ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* front */}
        <span className="block rounded-[3px] bg-paper p-[7%] pb-0 shadow-[0_24px_40px_-24px_rgba(58,38,32,0.6)] [backface-visibility:hidden]">
          <span className="relative block aspect-[4/5] overflow-hidden bg-pink">
            <Image src={src} alt={alt} fill priority={priority} sizes="(min-width: 1024px) 380px, 80vw" className="object-cover" />
            <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.2),transparent_45%)]" aria-hidden="true" />
          </span>
          <span className="hand flex h-[3.2rem] items-center justify-center text-[1.6rem]">{caption}</span>
        </span>
        {/* back */}
        <span className="ruled absolute inset-0 flex flex-col justify-center rounded-[3px] p-[10%] text-left shadow-[0_24px_40px_-24px_rgba(58,38,32,0.6)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {back}
        </span>
      </span>
    </button>
  );
}
