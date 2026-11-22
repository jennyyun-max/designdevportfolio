"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { journey } from "@/content/site";
import { photos, type PersonalPhoto } from "@/content/personal";

const ease = [0.16, 1, 0.3, 1] as const;

/* A print that drops into place as it scrolls in and drifts at its own speed */
function JourneyPrint({ photo, i, n }: { photo: PersonalPhoto; i: number; n: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [40 + i * 30, -40 - i * 30]);
  const rotate = i % 2 ? 3 : -2.5;
  return (
    <motion.figure
      ref={ref}
      className={`group/print relative w-[min(62vw,17rem)] bg-print p-[5%] pb-0 shadow-[0_24px_50px_-28px_rgba(37,37,34,0.6)] ${i % 2 ? "ml-auto -mt-16 md:-mt-24" : ""}`}
      style={{ y: reduced ? 0 : y }}
      initial={reduced ? false : { opacity: 0, rotate: rotate * 3, scale: 0.94 }}
      whileInView={{ opacity: 1, rotate, scale: 1 }}
      whileHover={{ rotate: 0, scale: 1.03 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 1.1, ease }}
    >
      {/* the photo at its own aspect ratio */}
      <Image src={photo.src} alt={photo.alt} sizes="(min-width: 768px) 280px, 62vw" className="mono-photo block h-auto w-full bg-stone" />
      <figcaption className="meta flex h-10 items-center justify-between gap-2">
        <span className="text-muted">
          {n}.{i + 1}
        </span>
        <span className="truncate">{photo.caption}</span>
      </figcaption>
    </motion.figure>
  );
}

/* California → Seoul → Ann Arbor → now, as an editorial timeline: a hairline that fills as you
   read, big chapter numbers, the story, and prints from the archive. */
export default function JourneyTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <ol ref={ref} className="relative">
      {/* the line */}
      <span className="absolute bottom-0 left-0 top-0 hidden w-px bg-line md:block" aria-hidden="true" />
      <motion.span className="absolute left-0 top-0 hidden h-full w-px origin-top bg-ink md:block" style={{ scaleY: fill }} aria-hidden="true" />

      {journey.map((ch) => (
        <li key={ch.key} className="grid gap-10 border-t border-line py-16 md:grid-cols-12 md:gap-8 md:border-t-0 md:py-24 md:pl-8">
          <div className="md:col-span-5">
            <div className="md:sticky md:top-24">
              <p className="meta text-muted">
                {ch.n} — {ch.when}
              </p>
              <h3 className="display mt-4 text-[clamp(3rem,7vw,6.4rem)] leading-[0.86]">{ch.place}</h3>
            </div>
          </div>
          <div className="md:col-span-4">
            <p className="display text-[1.9rem] leading-tight">
              <em>{ch.title}</em>
            </p>
            <div className="mt-4 space-y-4 text-[1.02rem] leading-relaxed text-muted">
              {ch.text.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            {"link" in ch && ch.link && (
              <Link href={ch.link.href} className="wipe mt-6 inline-block text-[0.95rem] text-ink">
                {ch.link.label} →
              </Link>
            )}
          </div>
          <div className="md:col-span-3">
            {ch.photos.length ? (
              ch.photos.map((id, i) => <JourneyPrint key={id} photo={photos[id]} i={i} n={ch.n} />)
            ) : (
              // no personal photo for this chapter yet: a typographic plate instead
              <div className="grid aspect-[4/5] w-[min(62vw,17rem)] place-items-center bg-stone" aria-hidden="true">
                <span className="display text-[6rem] italic text-muted-soft">{ch.place.slice(0, 2)}</span>
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
