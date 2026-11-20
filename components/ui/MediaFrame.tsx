import Image from "next/image";
import type { ImageAsset, Tone, Visual } from "@/lib/types";
import PlaceholderArt from "./PlaceholderArt";

export const toneBg: Record<Tone, string> = {
  blush: "bg-surface-2",
  pink: "bg-surface",
  lavender: "bg-surface-2",
  butter: "bg-surface-2",
  sage: "bg-surface-2",
  ivory: "bg-surface",
};

/* Image in a rounded frame with a fixed aspect ratio.
   Empty src → placeholder art in the given tone. */
export default function MediaFrame({
  image,
  tone = "pink",
  visual = "frames",
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  className = "",
  imageClassName = "",
}: {
  image?: ImageAsset;
  tone?: Tone;
  visual?: Visual;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-[var(--radius-card)] ${toneBg[tone]} ${image?.aspect ?? aspect} ${className}`}>
      <div className={`absolute inset-0 ${imageClassName}`}>
        {image?.src ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className={image.fit === "contain" ? "object-contain" : "object-cover"}
            style={image.focus ? { objectPosition: image.focus } : undefined}
          />
        ) : (
          <PlaceholderArt variant={visual} />
        )}
      </div>
    </div>
  );
}
