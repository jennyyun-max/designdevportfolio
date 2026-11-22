"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { ImageAsset } from "@/lib/types";

const ease = [0.16, 1, 0.3, 1] as const;

/* An image that is uncovered from the bottom edge as it enters the view. Hover zoom comes from
   a parent `group`. The frame is `ratio` (a CSS aspect-ratio — pass the image's own ratio and
   nothing is cropped) or the `aspect` class. `parallax` > 0 lets the image drift inside the frame,
   which needs extra image above and below — so it crops; leave it at 0 for work previews. */
export default function RevealImage({
  image,
  sizes,
  aspect = "aspect-[4/3]",
  ratio,
  priority = false,
  parallax = 0,
  mono = false,
  className = "",
}: {
  image: ImageAsset;
  sizes: string;
  aspect?: string;
  /** CSS aspect-ratio for the frame, e.g. "1920 / 1080" (wins over `aspect`) */
  ratio?: string;
  priority?: boolean;
  /** how far (in %) the image drifts while scrolling past */
  parallax?: number;
  /** black & white until hovered */
  mono?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);
  const contain = image.fit === "contain";

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden bg-stone ${ratio ? "" : (image.aspect ?? aspect)} ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
      initial={reduced ? false : { clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.2, ease }}
    >
      <motion.div className={`absolute ${parallax > 0 ? "inset-x-0 inset-y-[-7%]" : "inset-0"}`} style={reduced || contain || parallax === 0 ? undefined : { y }}>
        <div className="relative h-full w-full transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.03] motion-reduce:transition-none">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className={`${contain ? "object-contain p-[5%]" : "object-cover"} ${mono ? "mono-photo" : ""}`}
            style={{ objectPosition: image.focus ?? "50% 50%" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
