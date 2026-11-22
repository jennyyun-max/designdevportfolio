"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { rooms, site, type RoomKey } from "@/content/site";
import { Doodle, type DoodleName } from "./doodles/Doodles";
import Potato from "./ui/Potato";

function activeRoom(pathname: string): RoomKey | null {
  if (pathname.startsWith("/work")) return "work";
  const hit = rooms.find((r) => pathname.startsWith(r.href));
  return hit ? hit.key : null;
}

/* The way around Chloe’s world: five rooms, each with its own doodle and color.
   Desktop: sticker-like tabs (the doodle wiggles on hover, the room you’re in is colored in).
   Mobile: a “map” sheet of room cards. */
export default function SiteHeader() {
  const pathname = usePathname();
  const active = activeRoom(pathname);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation / Escape; lock page scroll while it's open
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? "bg-cream/90 shadow-[0_1px_0_var(--line)] backdrop-blur-md" : "bg-cream/0"
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2" aria-label="Chloe’s world — home">
          <span className="block w-9 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110 motion-reduce:transition-none">
            <Potato className="block w-full" />
          </span>
          <span className="hand text-[1.65rem] leading-none">chloe’s world</span>
        </Link>

        {/* Desktop rooms */}
        <nav aria-label="Rooms" className="hidden lg:block">
          <ul className="flex items-center gap-1.5">
            {rooms.map((room) => {
              const here = active === room.key;
              return (
                <li key={room.key}>
                  <Link
                    href={room.href}
                    aria-current={here ? "page" : undefined}
                    className="group relative flex items-center gap-1.5 rounded-full py-1.5 pl-2 pr-3.5 text-[0.92rem] font-medium transition-[background-color,transform] duration-200 hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
                    style={{ backgroundColor: here ? room.tone : undefined }}
                  >
                    <span
                      className="absolute inset-0 -z-10 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-60"
                      style={{ backgroundColor: room.tone }}
                      aria-hidden="true"
                    />
                    <Doodle name={room.doodle as DoodleName} className="wiggle-on-hover h-7 w-7 shrink-0" />
                    {room.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mobile / tablet: open the map */}
        <button
          ref={menuButton}
          type="button"
          className="flex h-11 items-center gap-2 rounded-full border border-espresso/20 bg-ivory px-4 text-sm font-semibold lg:hidden"
          aria-expanded={open}
          aria-controls="room-map"
          onClick={() => setOpen((v) => !v)}
        >
          <Doodle name={open ? "heart" : "pin"} className="h-5 w-5" />
          {open ? "close" : "explore"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="room-map"
            aria-label="Rooms"
            className="dotgrid fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mx-auto max-w-[34rem] px-5 pb-10 pt-6">
              <p className="hand text-2xl text-espresso-soft">where to next?</p>
              <ul className="mt-4 grid gap-3">
                <li>
                  <MenuCard href="/" label="home" blurb="back to the front door" doodle="flower" tone="var(--peach)" i={0} linkRef={firstLink} here={pathname === "/"} />
                </li>
                {rooms.map((room, i) => (
                  <li key={room.key}>
                    <MenuCard href={room.href} label={room.label} blurb={room.blurb} doodle={room.doodle as DoodleName} tone={room.tone} i={i + 1} here={active === room.key} />
                  </li>
                ))}
              </ul>
              {site.resume && (
                <a href={site.resume} target="_blank" rel="noreferrer" className="link mt-6 inline-block font-semibold">
                  résumé ↗
                </a>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function MenuCard({
  href,
  label,
  blurb,
  doodle,
  tone,
  i,
  here,
  linkRef,
}: {
  href: string;
  label: string;
  blurb: string;
  doodle: DoodleName;
  tone: string;
  i: number;
  here: boolean;
  linkRef?: React.Ref<HTMLAnchorElement>;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 14, rotate: i % 2 ? 1.5 : -1.5 }} animate={{ opacity: 1, y: 0, rotate: i % 2 ? 0.6 : -0.6 }} transition={{ delay: 0.04 * i, type: "spring", stiffness: 300, damping: 24 }}>
      <Link
        ref={linkRef}
        href={href}
        aria-current={here ? "page" : undefined}
        className="group flex items-center gap-4 rounded-[18px] border border-espresso/10 p-3.5 shadow-[0_8px_18px_-14px_rgba(58,38,32,0.5)]"
        style={{ backgroundColor: tone }}
      >
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-[14px] bg-paper">
          <Doodle name={doodle} className="wiggle-on-hover h-10 w-10" />
        </span>
        <span>
          <span className="display block text-[1.6rem] leading-none">{label}</span>
          <span className="mt-1 block text-sm text-espresso-soft">{blurb}</span>
        </span>
      </Link>
    </motion.div>
  );
}
