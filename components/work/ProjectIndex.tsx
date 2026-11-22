"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import type { Project } from "@/lib/types";
import { previewOf } from "./ProjectTile";

/* Every project as one row of an index: number, title, category, role, year.
   On desktop a preview of the project's image follows the pointer while you browse the list. */
export default function ProjectIndex({ projects }: { projects: Project[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const [fine, setFine] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 });

  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div
      className="relative"
      onPointerMove={(e) => {
        x.set(e.clientX);
        y.set(e.clientY);
      }}
      onPointerLeave={() => setHover(null)}
    >
      <ol className="border-t border-ink">
        {projects.map((p, i) => (
          <li key={p.slug} className="border-b border-line">
            <Link
              href={`/work/${p.slug}`}
              data-cursor="view"
              onPointerEnter={() => setHover(i)}
              onFocus={() => setHover(null)}
              className={`group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 py-5 transition-colors duration-300 md:grid-cols-[3.5rem_1.4fr_1fr_0.8fr_4rem] md:py-6 ${
                hover !== null && hover !== i ? "text-muted-soft" : ""
              }`}
            >
              <span className="meta text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="display text-[clamp(1.7rem,3.2vw,3rem)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2 motion-reduce:transition-none">
                {p.title}
              </span>
              <span className="meta hidden md:block">{p.category}</span>
              <span className="meta hidden md:block">{p.caseStudy.role?.summary}</span>
              <span className="meta text-right">{p.year || "—"}</span>
            </Link>
          </li>
        ))}
      </ol>

      {fine && (
        <motion.div className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block" style={{ x: sx, y: sy }} aria-hidden="true">
          <AnimatePresence>
            {hover !== null && (
              <motion.div
                key={projects[hover].slug}
                className="absolute left-6 top-[-6rem] w-[20rem] overflow-hidden bg-stone shadow-[0_30px_60px_-30px_rgba(37,37,34,0.6)]"
                initial={{ opacity: 0, clipPath: "inset(100% 0 0 0)" }}
                animate={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {(() => {
                  const { image, ratio } = previewOf(projects[hover]);
                  return (
                    <div className="relative aspect-[4/3]" style={ratio ? { aspectRatio: ratio } : undefined}>
                      <Image src={image.src} alt="" fill sizes="320px" className={image.fit === "contain" ? "object-contain p-3" : "object-cover"} style={{ objectPosition: image.focus ?? "50% 50%" }} />
                    </div>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
