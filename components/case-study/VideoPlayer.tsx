"use client";

import { useEffect, useRef, useState } from "react";

/* A screen recording in a phone outline, with simple controls: play / pause, restart and a
   progress line. It plays (muted, looping) only while on screen, and never starts on its own
   for people who prefer reduced motion. */
export default function VideoPlayer({ src, poster, label, w, h, className = "" }: { src: string; poster: string; label: string; w: number; h: number; className?: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const userPaused = useRef(false);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!reduced && !userPaused.current) v.play().catch(() => {});
        } else v.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };
  const restart = () => {
    const v = video.current;
    if (!v) return;
    v.currentTime = 0;
    userPaused.current = false;
    v.play().catch(() => {});
  };

  return (
    <figure className={className}>
      <video
        ref={video}
        src={src}
        poster={poster}
        width={w}
        height={h}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setProgress(e.currentTarget.duration ? e.currentTarget.currentTime / e.currentTarget.duration : 0)}
        onClick={toggle}
        className="mx-auto block h-auto w-full max-w-[300px] cursor-pointer bg-[#010101] shadow-[0_30px_50px_-24px_rgba(19,52,102,0.45)] [border-radius:14%/6.8%]"
      />
      <figcaption className="mx-auto mt-4 flex max-w-[300px] items-center gap-3">
        <button type="button" onClick={toggle} className="meta shrink-0 border border-ink/25 px-3 py-1.5 transition-colors hover:border-ink" aria-label={`${playing ? "Pause" : "Play"} recording: ${label}`}>
          {playing ? "Pause" : "Play"}
        </button>
        <span className="relative h-px flex-1 bg-ink/20" aria-hidden="true">
          <span className="absolute inset-y-0 left-0 bg-[#c8102e]" style={{ width: `${progress * 100}%`, height: 2, top: -0.5 }} />
        </span>
        <button type="button" onClick={restart} className="meta shrink-0 text-muted transition-colors hover:text-ink" aria-label={`Restart recording: ${label}`}>
          ↺
        </button>
      </figcaption>
    </figure>
  );
}
