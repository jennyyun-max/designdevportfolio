"use client";

import { motion } from "motion/react";
import { useEffect } from "react";

let firstLoad = true;

/* A soft fade between rooms. Not on the very first load (so the hand-drawn welcome can draw
   at first paint), and opacity only: a transform here would trap fixed overlays (the welcome,
   the camera flash) inside this wrapper. */
export default function Template({ children }: { children: React.ReactNode }) {
  const animateIn = !firstLoad;
  useEffect(() => {
    firstLoad = false;
  }, []);
  return (
    <motion.div initial={animateIn ? { opacity: 0 } : false} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}
