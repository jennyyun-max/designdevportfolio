"use client";

import Link from "next/link";
import { rooms, site } from "@/content/site";
import InteractivePotato from "./ui/InteractivePotato";
import { Doodle, type DoodleName } from "./doodles/Doodles";

/* Lets returning visitors watch the welcome again */
function replayIntro() {
  try {
    localStorage.removeItem("intro-seen");
  } catch {}
  window.location.href = "/";
}

export default function SiteFooter() {
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-line bg-ivory">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 pb-10 pt-14 sm:px-8 md:grid-cols-[1.2fr_1fr_auto] md:items-end">
        <div>
          <p className="hand text-[2rem] leading-none">thanks for visiting my world ♡</p>
          <p className="mt-3 max-w-[24rem] text-[0.95rem] text-espresso-soft">
            Designed and built by Chloe Yun in Ann Arbor, with a lot of pink and one very good potato.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.95rem] font-semibold">
            {site.email && (
              <a href={`mailto:${site.email}`} className="link">
                {site.email}
              </a>
            )}
            {site.linkedin && (
              <a href={site.linkedin} target="_blank" rel="noreferrer" className="link">
                linkedin ↗
              </a>
            )}
            {site.resume && (
              <a href={site.resume} target="_blank" rel="noreferrer" className="link">
                résumé ↗
              </a>
            )}
            {site.github && (
              <a href={site.github} target="_blank" rel="noreferrer" className="link">
                github ↗
              </a>
            )}
          </div>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5 text-[0.95rem]">
            {rooms.map((room) => (
              <li key={room.key}>
                <Link href={room.href} className="group inline-flex items-center gap-2">
                  <Doodle name={room.doodle as DoodleName} className="wiggle-on-hover h-6 w-6" />
                  <span className="nav-link">{room.label}</span>
                </Link>
              </li>
            ))}
            <li>
              <button type="button" onClick={replayIntro} className="group inline-flex items-center gap-2">
                <Doodle name="sparkle" className="wiggle-on-hover h-6 w-6" />
                <span className="nav-link">replay the intro</span>
              </button>
            </li>
          </ul>
        </nav>
        <div className="flex items-end gap-3 justify-self-start md:justify-self-end">
          <p className="pb-2 text-xs text-espresso-soft">
            © {new Date().getFullYear()} {site.name}
          </p>
          <InteractivePotato className="w-16" />
        </div>
      </div>
    </footer>
  );
}
