import { Link, NavLink, useLocation } from "react-router-dom";
import { site } from "../content.js";
import Container from "./Container.jsx";

const item =
  "whitespace-nowrap rounded-[var(--radius-sm)] px-1 py-1 sm:px-1.5 hover:bg-ink hover:text-window aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-[6px]";

/* Menu bar: name on the left, Work / About / Resume / Contact on the right */
export default function Header() {
  const { pathname } = useLocation();
  const onWork = pathname === "/" || pathname.startsWith("/work/");

  return (
    <header className="sticky top-0 z-50 border-b border-ink bg-window">
      <Container className="flex h-12 items-center justify-between gap-3">
        <Link to="/" className="flex items-center gap-2 whitespace-nowrap font-subheading text-[1.0625rem] leading-none">
          <span className="grid h-6 w-6 place-items-center rounded-[var(--radius-sm)] border border-ink bg-marigold font-mono text-[0.6875rem]" aria-hidden="true">
            cy
          </span>
          {site.name}
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-0.5 font-mono text-xs sm:gap-3 sm:text-[0.8125rem]">
            <li>
              <Link to={{ pathname: "/", hash: "#work" }} className={item} aria-current={onWork ? "page" : undefined}>
                Work
              </Link>
            </li>
            <li>
              <NavLink to="/about" className={item}>About</NavLink>
            </li>
            <li>
              {site.resume ? (
                <a href={site.resume} target="_blank" rel="noreferrer" className={item}>Resume</a>
              ) : (
                <span className="whitespace-nowrap px-1 text-muted sm:px-1.5" title="Resume coming soon">
                  Resume<span className="sr-only"> (coming soon)</span>
                </span>
              )}
            </li>
            <li>
              <Link to={{ pathname: pathname.startsWith("/work/") ? "/" : pathname, hash: "#contact" }} className={item}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
