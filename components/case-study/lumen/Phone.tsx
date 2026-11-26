import Image from "next/image";
import type { Screen } from "@/content/lumen";
import { ZoomButton } from "../Lightbox";

/* One LUMEN screen, exactly as designed in Figma (the phone frame is part of the export).
   Click to view it large. */
export default function Phone({ screen, index, sizes = "(min-width: 1024px) 22vw, 45vw", className = "", priority = false }: { screen: Screen; index: number; sizes?: string; className?: string; priority?: boolean }) {
  return (
    <figure className={className}>
      <ZoomButton index={index} label={screen.label}>
        <Image
          src={screen.src}
          alt={screen.alt}
          width={screen.w}
          height={screen.h}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full drop-shadow-[0_28px_36px_rgba(37,37,34,0.22)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/zoom:-translate-y-1.5 motion-reduce:transition-none"
        />
      </ZoomButton>
      <figcaption className="meta mt-4 text-center text-muted">{screen.label}</figcaption>
    </figure>
  );
}
