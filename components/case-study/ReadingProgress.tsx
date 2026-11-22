"use client";

import { motion, useScroll, useSpring } from "motion/react";

/* Thin oxblood line at the top showing how far through the case study you are */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-oxblood"
      style={{ scaleX }}
    />
  );
}
