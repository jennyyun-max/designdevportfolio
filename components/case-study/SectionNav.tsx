"use client";

import { useEffect, useState } from "react";

/* A small sticky index on wide screens: appears once you're past the hero and marks the
   section you're reading (the last one whose top has passed 40% of the viewport). */
export default function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const it of items) {
        const el = document.getElementById(it.id);
        if (el && el.getBoundingClientRect().top <= line) current = it.id;
      }
      setActive(current);
      setShow(window.scrollY > window.innerHeight * 0.8);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  return (
    <nav
      aria-label="On this page"
      className={`fixed left-5 top-1/2 z-30 hidden -translate-y-1/2 bg-paper/85 px-3 py-3 backdrop-blur-sm transition-opacity duration-500 xl:block ${show ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <ol className="meta space-y-2">
        {items.map((it, i) => (
          <li key={it.id}>
            <a href={`#${it.id}`} aria-current={active === it.id ? "true" : undefined} className={`group flex items-center gap-3 transition-colors ${active === it.id ? "text-ink" : "text-muted-soft hover:text-ink"}`}>
              <span className={`h-px transition-all duration-500 ${active === it.id ? "w-6 bg-oxblood" : "w-3 bg-current"}`} aria-hidden="true" />
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span className="max-w-[9rem] truncate">{it.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
