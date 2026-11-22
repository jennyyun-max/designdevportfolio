import { photos, wall } from "@/content/personal";
import { prints } from "@/content/polaroids";
import PhotoWall from "../polaroids/PhotoWall";
import SplitHeading from "../ui/SplitHeading";

/* Homepage: the personal photo wall — every photo from `wall` in content/personal.ts that isn't
   already in the collage at the top, so nothing appears twice on the page. */
export default function KeptLoosely() {
  const inHero = new Set(prints.map((p) => p.src));
  const ids = wall.filter((id) => !inHero.has(photos[id].src));
  if (!ids.length) return null;
  return (
    <section id="photographs" aria-labelledby="photos-heading" className="mx-auto max-w-[1600px] px-5 pt-28 sm:px-8 md:pt-40">
      <div className="grid gap-6 border-t border-ink pt-5 md:grid-cols-12">
        <p className="meta text-muted md:col-span-3">(04) Personal photographs</p>
        <div className="md:col-span-9">
          <SplitHeading id="photos-heading" className="display text-[clamp(2.6rem,6vw,6rem)]" label="Kept loosely." lines={[<span key="k">Kept <em>loosely.</em></span>]} />
          <p className="meta mt-4 text-muted">{String(ids.length).padStart(2, "0")} more prints — pick them up and move them around</p>
        </div>
      </div>
      <div className="mt-12">
        <PhotoWall ids={ids} />
      </div>
    </section>
  );
}
