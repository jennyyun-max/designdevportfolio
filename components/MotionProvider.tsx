"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/* reducedMotion="user": Motion skips transform/layout animations for people
   who ask their OS to reduce motion (opacity fades still run, gently). */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
