"use client";

import { motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { DeskPrint } from "@/lib/types";

/* Enlarged polaroid in a native <dialog>: focus is trapped while open,
   Escape / the close button / clicking the backdrop all close it, and
   focus returns to the photo that opened it. Shows the whole image (not cropped). */
export default function PhotoPreview({ photo, onClose }: { photo: (DeskPrint & { rotate: number }) | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (photo && !dialog.open) dialog.showModal();
    if (!photo && dialog.open) dialog.close();
  }, [photo]);

  return (
    <dialog
      ref={dialogRef}
      aria-label={photo ? photo.caption?.replace(/[[\]]/g, "") || photo.alt : "Photo"}
      className="photo-dialog m-auto max-h-none max-w-none overflow-visible border-0 bg-transparent p-4"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {photo && (
        <motion.figure
          key={photo.alt}
          className="relative max-w-[min(88vw,40rem)] bg-print p-4 pb-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] sm:p-5 sm:pb-4"
          initial={{ opacity: 0, scale: 0.9, rotate: photo.rotate * 0.6 }}
          animate={{ opacity: 1, scale: 1, rotate: photo.rotate * 0.15 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={typeof photo.src === "object" ? photo.src.src : photo.src}
            alt={photo.alt}
            className="mx-auto block max-h-[58vh] w-auto max-w-full bg-stone object-contain"
          />
          <figcaption className="px-1 pt-3 text-center">
            {photo.story && <span className="mx-auto mt-2 block max-w-[30rem] text-[0.95rem] leading-relaxed text-muted">{photo.story}</span>}
          </figcaption>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close photo"
            className="absolute -right-3 -top-3 grid h-11 w-11 place-items-center bg-ink text-paper transition-colors hover:bg-oxblood"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </motion.figure>
      )}
    </dialog>
  );
}
