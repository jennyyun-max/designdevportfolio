"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { ImageAsset } from "@/lib/types";

type Fig = ImageAsset & { n?: string };
const Ctx = createContext<(i: number) => void>(() => {});

/* Every figure in a case study can be opened large. The provider knows all figures on the page
   (in order), so the viewer can step through them: ← / → or the buttons, Escape or a click
   outside to close. Focus goes back to the figure that opened it. */
export function Lightbox({ figures, children }: { figures: Fig[]; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const [i, setI] = useState<number | null>(null);
  const [dir, setDir] = useState(0);

  const open = useCallback((n: number) => {
    opener.current = document.activeElement as HTMLElement;
    setDir(0);
    setI(n);
  }, []);
  const close = () => {
    setI(null);
    opener.current?.focus(); // back to the figure that opened it (also after Escape)
  };
  const step = useCallback(
    (d: number) => {
      setDir(d);
      setI((cur) => (cur === null ? cur : (cur + d + figures.length) % figures.length));
    },
    [figures.length],
  );

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (i !== null && !el.open) el.showModal();
    if (i === null && el.open) el.close();
  }, [i]);

  useEffect(() => {
    if (i === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [i, step]);

  const fig = i === null ? null : figures[i];

  return (
    <Ctx.Provider value={open}>
      {children}
      <dialog
        ref={dialog}
        aria-label={fig ? `Figure ${fig.n ?? ""}: ${fig.caption ?? fig.alt}` : "Figure"}
        className="lightbox m-0 h-[100dvh] max-h-none w-screen max-w-none bg-transparent p-0 text-paper"
        onClose={close}
        onClick={(e) => {
          if (e.target === e.currentTarget || (e.target as HTMLElement).dataset.backdrop !== undefined) close();
        }}
      >
        {fig && (
          <div className="flex h-full flex-col" data-backdrop>
            <div className="meta flex items-center justify-between px-5 py-4 text-paper/70 sm:px-8">
              <span>
                {i! + 1} / {figures.length}
              </span>
              <button type="button" onClick={close} className="wipe text-paper" autoFocus>
                Close ✕
              </button>
            </div>
            <div className="relative min-h-0 flex-1 px-3 sm:px-20" data-backdrop>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={fig.src}
                  className="relative h-full w-full"
                  data-backdrop
                  initial={{ opacity: 0, x: dir * 40, scale: dir ? 1 : 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: dir * -40 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Image src={fig.src} alt={fig.alt} fill sizes="100vw" className="object-contain" priority />
                </motion.div>
              </AnimatePresence>
              {figures.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous figure"
                    className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center text-[1.4rem] text-paper/70 transition-colors hover:text-paper sm:left-5"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next figure"
                    className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center text-[1.4rem] text-paper/70 transition-colors hover:text-paper sm:right-5"
                  >
                    →
                  </button>
                </>
              )}
            </div>
            <p className="meta mx-auto max-w-[60rem] px-5 py-5 text-center text-paper/80">
              {fig.n && <span className="mr-3 text-paper">Fig. {fig.n}</span>}
              {fig.caption ?? fig.alt}
            </p>
          </div>
        )}
      </dialog>
    </Ctx.Provider>
  );
}

/* Wraps a figure's image so a click (or Enter) opens it in the viewer */
export function ZoomButton({ index, label, children }: { index: number; label: string; children: ReactNode }) {
  const open = useContext(Ctx);
  return (
    <button type="button" onClick={() => open(index)} aria-label={`Enlarge: ${label}`} data-cursor="zoom" className="group/zoom relative block w-full cursor-zoom-in text-left">
      {children}
      <span className="meta pointer-events-none absolute right-3 top-3 bg-paper/90 px-2 py-1 text-ink opacity-0 transition-opacity duration-300 group-hover/zoom:opacity-100 group-focus-visible/zoom:opacity-100" aria-hidden="true">
        Enlarge ↗
      </span>
    </button>
  );
}
