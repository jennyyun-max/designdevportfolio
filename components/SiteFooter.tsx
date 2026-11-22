"use client";

import Link from "next/link";
import { nav, site } from "@/content/site";

/* Lets returning visitors watch the welcome again */
function replayIntro() {
  window.location.href = "/"; // a full load of the homepage always plays the welcome
}

/* The footer is the Contact section (#contact), on every page: a dark band with one large
   invitation, the email set big enough to click from across the room, and the index. */
export default function SiteFooter() {
  const links = [
    site.linkedin && { label: "LinkedIn", href: site.linkedin },
    site.resume && { label: "Résumé", href: site.resume },
    site.github && { label: "GitHub", href: site.github },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <footer id="contact" aria-labelledby="contact-heading" className="grain relative mt-24 bg-night text-paper">
      <div className="mx-auto max-w-[1600px] px-5 pb-8 pt-20 sm:px-8 sm:pt-28">
        <p className="meta text-paper/55">(Contact)</p>
        <h2 id="contact-heading" className="display mt-6 max-w-[14ch] text-[clamp(3.4rem,10vw,10rem)]">
          Let’s make something <em>thoughtful.</em>
        </h2>
        <div className="mt-14 grid gap-12 border-t border-paper/15 pt-8 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="meta text-paper/55">Write to me</p>
            {site.email && (
              <a href={`mailto:${site.email}`} className="link mt-3 inline-block break-all text-[clamp(1.4rem,3vw,2.4rem)] tracking-[-0.02em]">
                {site.email}
              </a>
            )}
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noreferrer" className="wipe text-[0.95rem]">
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="meta text-paper/55">Index</p>
            <ul className="mt-3 space-y-1.5 text-[0.95rem]">
              <li>
                <Link href="/" className="wipe">
                  Home
                </Link>
              </li>
              {nav
                .filter((n) => n.href.startsWith("/"))
                .map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="wipe">
                      {n.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
          <div className="md:col-span-3">
            <p className="meta text-paper/55">Based in</p>
            <p className="mt-3 text-[0.95rem]">Ann Arbor, Michigan</p>
            <button type="button" onClick={replayIntro} className="wipe mt-6 text-[0.95rem]">
              Replay the intro ✦
            </button>
          </div>
        </div>
        <div className="meta mt-20 flex flex-wrap justify-between gap-4 text-paper/45">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>Designed & built by {site.name.split(" ")[0]}</span>
        </div>
      </div>
    </footer>
  );
}
