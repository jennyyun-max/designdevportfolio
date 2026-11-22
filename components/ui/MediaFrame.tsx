import Image from "next/image";
import type { ImageAsset, Visual } from "@/lib/types";
import PlaceholderArt from "./PlaceholderArt";

/* An image in a fixed-ratio frame on a stone ground. Empty src → abstract placeholder art. */
export default function MediaFrame({
  image,
  visual = "frames",
  aspect = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  className = "",
}: {
  image?: ImageAsset;
  visual?: Visual;
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-stone ${image?.aspect ?? aspect} ${className}`}>
      {image?.src ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={image.fit === "contain" ? "object-contain p-[3%]" : "object-cover"}
          style={image.focus ? { objectPosition: image.focus } : undefined}
        />
      ) : (
        <PlaceholderArt variant={visual} />
      )}
    </div>
  );
}
