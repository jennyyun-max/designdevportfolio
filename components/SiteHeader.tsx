"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";

const ease = [0.16, 1, 0.3, 1] as const;

function isActive(pathname: string, href: string) {
  return href.startsWith("/") && href !== "/" && pathname.startsWith(href);
}

/* Local time in Ann Arbor, as small metadata */
function LocalTime() {
  const [t, setT] = useState("");
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", timeZone: "America/Detroit" });
    setT(fmt());
    const id = window.setInterval(() => setT(fmt()), 15000);
    return () => window.clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>Ann Arbor, MI {t && `— ${t}`}</span>;
}

/* Minimal header: name on the left, five destinations on the right (each with a small index
   number). Phones: “Menu” opens a full-screen index set in the display serif. */
export default function SiteHeader() {
  const pathname = usePathname();
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
    <header className={`site-header sticky top-0 z-50 ${scrolled && !open ? "bg-paper/85 shadow-[0_1px_0_var(--line)] backdrop-blur-md" : ""}`}>
      <div className="mx-auto grid h-16 max-w-[1600px] grid-cols-[1fr_auto] items-center gap-6 px-5 sm:px-8 lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className={`group relative z-[60] flex items-baseline gap-3 ${open ? "text-paper" : ""}`} aria-label={`${site.name} — home`}>
          <span className="text-[1.05rem] font-medium tracking-[-0.02em]">{site.name}</span>
          <span className="meta hidden text-muted sm:inline">Design / Technology</span>
        </Link>

        <p className="meta hidden text-muted lg:block" aria-hidden="true">
          <LocalTime />
        </p>

        <nav aria-label="Main" className="hidden justify-self-end md:block">
          <ul className="flex items-center gap-7">
            {nav.map((item, i) => {
              const here = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link href={item.href} aria-current={here ? "page" : undefined} className="group flex items-start gap-1 text-[0.92rem]">
                    <span className="wipe" aria-current={here ? "page" : undefined}>
                      {item.label}
                    </span>
                    <span className={`mono text-[0.56rem] leading-none ${here ? "text-oxblood" : "text-muted"}`} aria-hidden="true">
                      0{i + 1}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          ref={menuButton}
          type="button"
          className={`meta relative z-[60] h-11 justify-self-end md:hidden ${open ? "text-paper" : ""}`}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            aria-label="Main"
            className="grain fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-night px-5 pb-8 pt-24 text-paper md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease }}
          >
            <ul>
              <li className="overflow-hidden border-b border-paper/15">
                <MenuLink href="/" label="Index" n={0} linkRef={firstLink} here={pathname === "/"} />
              </li>
              {nav.map((item, i) => (
                <li key={item.href} className="overflow-hidden border-b border-paper/15">
                  <MenuLink href={item.href} label={item.label} n={i + 1} here={isActive(pathname, item.href)} onClick={() => setOpen(false)} />
                </li>
              ))}
            </ul>
            <div className="meta mt-10 flex justify-between text-paper/60">
              <LocalTime />
              {site.resume && (
                <a href={site.resume} target="_blank" rel="noreferrer" className="link text-paper">
                  Résumé ↗
                </a>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function MenuLink({ href, label, n, here, linkRef, onClick }: { href: string; label: string; n: number; here: boolean; linkRef?: React.Ref<HTMLAnchorElement>; onClick?: () => void }) {
  return (
    <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.7, delay: 0.15 + n * 0.05, ease }}>
      <Link ref={linkRef} href={href} onClick={onClick} aria-current={here ? "page" : undefined} className="flex items-baseline justify-between py-3">
        <span className="display text-[3.2rem]">{here ? <em>{label}</em> : label}</span>
        <span className="mono text-[0.7rem] text-paper/50">0{n}</span>
      </Link>
    </motion.div>
  );
}
