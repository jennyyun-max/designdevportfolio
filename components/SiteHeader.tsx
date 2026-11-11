"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import Container from "./ui/Container";
import Potato from "./ui/Potato";

type NavKey = "home" | "work" | "about" | "contact";
const NAV: { key: NavKey; label: string; href: string }[] = [
  { key: "home", label: "home", href: "/" },
  { key: "work", label: "work", href: "/#work" },
  { key: "about", label: "about", href: "/#about" },
  { key: "contact", label: "contact", href: "/#contact" },
];

/* Highlights the homepage section currently in view */
function useActiveSection(pathname: string): NavKey {
  const [active, setActive] = useState<NavKey>("home");
  useEffect(() => {
    if (pathname !== "/") return;
    const ids: NavKey[] = ["work", "about", "contact"];
    const onScroll = () => {
      let current: NavKey = "home";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);
  if (pathname.startsWith("/work/")) return "work";
  return pathname === "/" ? active : "home";
}

export default function SiteHeader() {
  const pathname = usePathname();
  const active = useActiveSection(pathname);
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

  // Close the mobile menu on navigation / Escape; lock page scroll while open
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

  const resume = site.resume ? (
    <a href={site.resume} target="_blank" rel="noreferrer" className="nav-link">
      resume ↗
    </a>
  ) : (
    <span className="text-espresso-soft" title="Resume coming soon">
      resume<span className="sr-only"> (coming soon)</span>
    </span>
  );

  return (
    <header className={`sticky top-0 z-50 bg-cream transition-[border-color] duration-300 ${scrolled ? "border-b border-line" : "border-b border-transparent"}`}>
      <Container className="flex h-[4.5rem] items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.name} — home`}>
          <Potato className="wiggle-on-hover h-7 w-7" />
          <span className="display text-[1.375rem] tracking-[-0.02em]">
            chloe <em>yun</em>
          </span>
        </Link>

        {/* Desktop */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7 text-[0.9375rem] font-medium">
            {NAV.map((item) => (
              <li key={item.key}>
                <Link href={item.href} aria-current={active === item.key ? "page" : undefined} className="nav-link relative py-1">
                  {item.label}
                  {active === item.key && (
                    <motion.span layoutId="nav-dot" className="absolute -bottom-1.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-rose" />
                  )}
                </Link>
              </li>
            ))}
            <li>{resume}</li>
          </ul>
        </nav>

        {/* Mobile toggle */}
        <button
          ref={menuButton}
          type="button"
          className="grid h-11 w-11 place-items-center rounded-[var(--radius-button)] border border-espresso/20 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Primary"
            className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 bg-cream md:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
          >
            <Container className="pt-8">
              <ul className="space-y-1">
                {NAV.map((item, i) => (
                  <li key={item.key}>
                    <Link
                      ref={i === 0 ? firstLink : undefined}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active === item.key ? "page" : undefined}
                      className="display block py-3 text-[2.75rem] aria-[current=page]:text-rose"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="display py-3 text-[2.75rem]">{resume}</li>
              </ul>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
