import { Link, NavLink, useLocation } from "react-router-dom";
import { site } from "../content.js";
import Container from "./Container.jsx";
import ResumeLink from "./ResumeLink.jsx";

const navLink =
  "py-2 underline-offset-[6px] decoration-1 hover:underline aria-[current=page]:underline aria-[current=page]:decoration-2";

export default function Header() {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link to="/" className="font-subheading text-lg tracking-tight">
          {site.name}
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-5 text-[0.9375rem] sm:gap-8">
            <li>
              <Link
                to={{ pathname: "/", hash: "#work" }}
                className={navLink}
                aria-current={pathname === "/" || pathname.startsWith("/work/") ? "page" : undefined}
              >
                Work
              </Link>
            </li>
            <li>
              <NavLink to="/about" className={navLink}>
                About
              </NavLink>
            </li>
            <li>
              <ResumeLink className={navLink} />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
