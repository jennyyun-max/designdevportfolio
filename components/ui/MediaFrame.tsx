import Image from "next/image";
import type { ImageAsset, Tone, Visual } from "@/lib/types";
import PlaceholderArt from "./PlaceholderArt";

export const toneBg: Record<Tone, string> = {
  blush: "bg-blush",
  pink: "bg-pink",
  lavender: "bg-lavender",
  butter: "bg-butter",
  sage: "bg-sage",
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
    <div className={`relative overflow-hidden rounded-[var(--radius-card)] ${toneBg[tone]} ${aspect} ${className}`}>
      <div className={`absolute inset-0 ${imageClassName}`}>
        {image?.src ? (
          <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" />
        ) : (
          <PlaceholderArt variant={visual} />
        )}
      </div>
    </div>
  );
}
