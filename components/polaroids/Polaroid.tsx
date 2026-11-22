import Image from "next/image";
import type { PersonalPhoto } from "@/content/personal";

/* A personal photo as a print: a thin warm-white border, the photo at its own aspect ratio
   (never cropped), and a small mono caption. Black & white until hovered or focused. */
export default function Polaroid({ photo, n, sizes, priority = false }: { photo: PersonalPhoto; n?: number; sizes: string; priority?: boolean }) {
  const meta = [photo.place, photo.year].filter(Boolean).join(", ");
  return (
    <span className="block bg-print p-[5%] pb-0 [container-type:inline-size]">
      <Image src={photo.src} alt={photo.alt} sizes={sizes} priority={priority} draggable={false} className="mono-photo pointer-events-none block h-auto w-full select-none bg-stone" />
      <span className="mono flex h-[max(1.6rem,13cqw)] items-center justify-between gap-2 text-[max(0.56rem,5cqw)] uppercase tracking-[0.04em]">
        {n !== undefined && <span className="shrink-0 text-muted">{String(n).padStart(2, "0")}</span>}
        <span className="min-w-0 truncate">{photo.caption}</span>
        {meta && <span className="hidden shrink-0 text-muted [@container(min-width:12rem)]:inline">{meta}</span>}
      </span>
    </span>
  );
}
