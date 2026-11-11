import Image from "next/image";
import type { PolaroidPhoto } from "@/lib/types";

/* The printed-photo look: warm white card, thicker bottom border, square
   photo window (portrait/landscape photos are cropped to fit), optional
   handwritten caption. Purely visual — interaction lives in Polaroid.tsx. */
export default function PolaroidFrame({
  photo,
  sizes = "160px",
  className = "",
}: {
  photo: PolaroidPhoto;
  sizes?: string;
  className?: string;
}) {
  return (
    <span className={`block rounded-[3px] bg-[#fffdf8] p-[7%] pb-0 ${className}`}>
      <span className="relative block aspect-square overflow-hidden bg-pink">
        <Image
          src={photo.src}
          alt=""
          fill
          sizes={sizes}
          draggable={false}
          unoptimized={photo.src.endsWith(".svg")}
          className="pointer-events-none select-none object-cover"
          style={{ objectPosition: photo.focus ?? "50% 50%" }}
        />
        {/* faint print sheen */}
        <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_45%)]" aria-hidden="true" />
      </span>
      <span className="flex h-[2.6em] items-center justify-center px-1 text-center font-[family-name:var(--font-hand)] text-[1.05em] font-semibold leading-none text-espresso">
        {photo.caption}
      </span>
    </span>
  );
}
