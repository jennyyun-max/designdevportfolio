import type { ImageAsset, Tone, Visual } from "@/lib/types";
import MediaFrame from "../ui/MediaFrame";

export default function Figure({
  image,
  tone,
  visual,
  aspect = "aspect-[16/10]",
  sizes,
}: {
  image: ImageAsset;
  tone: Tone;
  visual: Visual;
  aspect?: string;
  sizes?: string;
}) {
  return (
    <figure>
      <MediaFrame image={image} tone={tone} visual={visual} aspect={aspect} sizes={sizes} />
      {image.caption && <figcaption className="mt-3 text-sm text-espresso-soft">{image.caption}</figcaption>}
    </figure>
  );
}
