import Image from "next/image";
import type { ArtImage, Artwork, ArtSection } from "@/content/art";
import { Lightbox, ZoomButton } from "../case-study/Lightbox";
import Reveal from "../ui/Reveal";

const pad = (n: number) => String(n).padStart(2, "0");

/* One image, shown whole (never cropped): it fits the column and never gets taller than the screen */
function Piece({ img, index, label, sizes, tall = "max-h-[82svh]" }: { img: ArtImage; index: number; label: string; sizes: string; tall?: string }) {
  return (
    <ZoomButton index={index} label={label}>
      <Image src={img.src} alt={img.alt} sizes={sizes} className={`mx-auto block h-auto w-auto max-w-full ${tall} shadow-[0_18px_40px_-28px_rgba(58,38,32,0.55)]`} />
    </ZoomButton>
  );
}

function Caption({ work, n }: { work: Artwork; n: string }) {
  return (
    <div className="mt-5 max-w-[46ch]">
      <p className="meta text-muted">
        No. {n}
        {work.materials && <span> — {work.materials}</span>}
      </p>
      {work.title && <h3 className="display mt-2 text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.05]">{work.title}</h3>}
      {work.caption && <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{work.caption}</p>}
    </div>
  );
}

/* The art portfolio: three sections; every image opens in the viewer, which steps through the
   whole page in order (details and other views included). */
export default function ArtGallery({ sections }: { sections: ArtSection[] }) {
  // every image on the page, in order, for the viewer
  const figures: { src: string; alt: string; caption: string }[] = [];
  const add = (img: ArtImage, work: Artwork, n: string, extra?: string) => {
    const name = work.title ?? `No. ${n}`;
    figures.push({ src: img.src.src, alt: img.alt, caption: [name, extra ?? work.materials].filter(Boolean).join(" — ") });
    return figures.length - 1;
  };

  let count = 0;
  const body = sections.map((section, si) => (
    <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="pt-24 md:pt-36">
      <div className="grid gap-4 border-t border-ink pt-5 md:grid-cols-12">
        <p className="meta text-muted md:col-span-3">({pad(si + 1)})</p>
        <div className="md:col-span-9">
          <h2 id={`${section.id}-title`} className="display text-[clamp(2.6rem,6vw,5.6rem)]">
            {section.title}
          </h2>
          {section.note && <p className="mt-4 max-w-[52ch] text-muted">{section.note}</p>}
        </div>
      </div>

      {section.layout === "studies" ? (
        <ul className="mt-16 grid gap-x-16 gap-y-20 md:grid-cols-2">
          {section.works.map((work, i) => {
            const n = pad(++count);
            const idx = add(work.image, work, n);
            return (
              <Reveal as="li" key={work.id} className={i % 2 ? "md:mt-32" : ""}>
                <Piece img={work.image} index={idx} label={work.title ?? `No. ${n}`} sizes="(min-width: 768px) 45vw, 100vw" tall="max-h-[78svh]" />
                <Caption work={work} n={n} />
              </Reveal>
            );
          })}
        </ul>
      ) : (
        <ol className="mt-16 space-y-28 md:space-y-40">
          {section.works.map((work, i) => {
            const n = pad(++count);
            const wide = work.image.src.width / work.image.src.height > 1.8;
            const idx = add(work.image, work, n);
            const more = (work.more ?? []).map((m) => ({ m, idx: add(m, work, n, m.label) }));
            const flip = i % 2 === 1;
            return (
              <Reveal as="li" key={work.id} className="grid gap-8 md:grid-cols-12 md:gap-10">
                <div className={wide ? "md:col-span-12" : `md:col-span-7 ${flip ? "md:col-start-6" : ""}`}>
                  <Piece img={work.image} index={idx} label={work.title ?? `No. ${n}`} sizes={wide ? "100vw" : "(min-width: 768px) 58vw, 100vw"} />
                </div>
                <div className={wide ? "md:col-span-12" : `md:col-span-4 md:self-end ${flip ? "md:col-start-1 md:row-start-1" : "md:col-start-9"}`}>
                  {more.length > 0 && (
                    <div className="mb-6 grid grid-cols-2 gap-4">
                      {more.map(({ m, idx: mi }) => (
                        <figure key={m.src.src}>
                          <Piece img={m} index={mi} label={`${work.title ?? `No. ${n}`} — ${m.label ?? "detail"}`} sizes="(min-width: 768px) 16vw, 45vw" tall="max-h-[40svh]" />
                          {m.label && <figcaption className="meta mt-2 text-muted">{m.label}</figcaption>}
                        </figure>
                      ))}
                    </div>
                  )}
                  <Caption work={work} n={n} />
                </div>
              </Reveal>
            );
          })}
        </ol>
      )}
    </section>
  ));

  return <Lightbox figures={figures}>{body}</Lightbox>;
}
