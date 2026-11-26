"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";
import type { Screen } from "@/content/lumen";
import { ZoomButton } from "../Lightbox";

type Flow = { id: string; label: string; text: string; screens: { screen: Screen; index: number }[] };

/* The final product, flow by flow: a tab list (arrow keys work) and the screens of that flow.
   Every screen opens large. */
export default function FlowExplorer({ flows }: { flows: Flow[] }) {
  const [i, setI] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const flow = flows[i];

  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + flows.length) % flows.length;
    setI(n);
    tabs.current[n]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="App flows" onKeyDown={onKey} className="flex flex-wrap gap-2">
        {flows.map((f, n) => (
          <button
            key={f.id}
            ref={(el) => {
              tabs.current[n] = el;
            }}
            role="tab"
            id={`flow-${f.id}`}
            aria-selected={n === i}
            aria-controls="flow-panel"
            tabIndex={n === i ? 0 : -1}
            onClick={() => setI(n)}
            className={`meta border px-4 py-2.5 transition-colors ${n === i ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div id="flow-panel" role="tabpanel" aria-labelledby={`flow-${flow.id}`} className="mt-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={flow.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
            <p className="max-w-[44ch] text-[1.1rem] leading-relaxed">{flow.text}</p>
            <ul className={`mt-10 grid gap-6 sm:gap-8 ${flow.screens.length >= 4 ? "grid-cols-2 md:grid-cols-4" : flow.screens.length === 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2 md:grid-cols-4"} ${flow.screens.length === 5 ? "lg:grid-cols-5" : ""}`}>
              {flow.screens.map(({ screen, index }) => (
                <li key={screen.src} className={flow.screens.length === 1 ? "col-span-2 mx-auto w-full max-w-[17rem] md:col-span-1 md:col-start-2 md:max-w-none" : ""}>
                  <ZoomButton index={index} label={screen.label}>
                    <Image src={screen.src} alt={screen.alt} width={screen.w} height={screen.h} sizes="(min-width: 1024px) 18vw, 45vw" className="h-auto w-full drop-shadow-[0_24px_30px_rgba(37,37,34,0.2)]" />
                  </ZoomButton>
                  <p className="meta mt-3 text-center text-muted">{screen.label}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
