"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/* Display type that rises line by line out of a mask. `lines` are the intentional line breaks.
   Screen readers get the plain sentence once. */
export default function SplitHeading({
  lines,
  label,
  as = "h2",
  className = "",
  delay = 0,
  inView = true,
  id,
}: {
  lines: ReactNode[];
  label: string;
  as?: "h1" | "h2" | "p";
  className?: string;
  delay?: number;
  /** false = play on mount instead of on scroll */
  inView?: boolean;
  id?: string;
}) {
  const Tag = as;
  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{label}</span>
      <span aria-hidden="true" className="block">
        {lines.map((line, i) => (
          <span key={i} className="block overflow-hidden pb-[0.06em]">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              {...(inView ? { whileInView: { y: 0 }, viewport: { once: true } } : { animate: { y: 0 } })}
              transition={{ duration: 1.1, delay: delay + i * 0.09, ease }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
