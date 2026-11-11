"use client";

import { motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import type { PolaroidPhoto } from "@/lib/types";

/* Enlarged polaroid in a native <dialog>: focus is trapped while open,
   Escape / the close button / clicking the backdrop all close it, and
   focus returns to the photo that opened it. Shows the whole image (not cropped). */
export default function PhotoPreview({ photo, onClose }: { photo: PolaroidPhoto | null; onClose: () => void }) {
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
          key={photo.src}
          className="relative rounded-[4px] bg-[#fffdf8] p-4 pb-2 shadow-[0_30px_60px_-20px_rgba(58,38,32,0.6)] sm:p-5 sm:pb-3"
          initial={{ opacity: 0, scale: 0.9, rotate: photo.rotate * 0.6 }}
          animate={{ opacity: 1, scale: 1, rotate: photo.rotate * 0.15 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo.src}
            alt={photo.alt}
            className="block max-h-[68vh] w-auto max-w-[min(84vw,40rem)] bg-pink object-contain"
          />
          <figcaption className="flex min-h-[3.25rem] items-center justify-center px-2 text-center font-[family-name:var(--font-hand)] text-[1.9rem] font-semibold leading-none text-espresso">
            {photo.caption}
          </figcaption>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close photo"
            className="absolute -right-3 -top-3 grid h-11 w-11 place-items-center rounded-full bg-espresso text-ivory transition-transform hover:scale-105 active:scale-95"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </motion.figure>
      )}
    </dialog>
  );
}
