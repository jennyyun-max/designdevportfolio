import { Link, NavLink, useLocation } from "react-router-dom";
import { site } from "../content.js";
import Container from "./Container.jsx";
import Potato from "./ui/Potato.jsx";

const pill =
  "whitespace-nowrap rounded-full px-3 py-1.5 transition-colors hover:bg-blush aria-[current=page]:bg-plum aria-[current=page]:text-shell sm:px-4";

/* Floating pill navigation; the current page is filled in plum */
export default function Header() {
  const { pathname } = useLocation();
  const onWork = pathname === "/" || pathname.startsWith("/work/");

  return (
    <header className="sticky top-0 z-50 bg-cream/90 backdrop-blur-sm">
      <Container className="flex h-[4.5rem] items-center justify-between gap-3">
        <Link to="/" className="group flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <Potato className="mark-wiggle h-6 w-6" />
          <span className="lowercase">{site.name}</span>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center rounded-full border border-plum/30 bg-shell p-1 text-[0.8125rem] font-semibold sm:text-sm">
            <li>
              <Link to={{ pathname: "/", hash: "#work" }} className={pill} aria-current={onWork ? "page" : undefined}>
                work
              </Link>
            </li>
            <li>
              <NavLink to="/about" className={pill}>about</NavLink>
            </li>
            <li>
              <Link to={{ pathname: pathname.startsWith("/work/") ? "/" : pathname, hash: "#contact" }} className={pill}>
                contact
              </Link>
            </li>
            <li className="hidden sm:block">
              {site.resume ? (
                <a href={site.resume} target="_blank" rel="noreferrer" className={pill}>résumé ↗</a>
              ) : (
                <span className="whitespace-nowrap px-4 text-plum-soft" title="Résumé coming soon">
                  résumé<span className="sr-only"> (coming soon)</span>
                </span>
              )}
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
