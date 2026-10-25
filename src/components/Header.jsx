import { site } from "../content.js";
import Container from "./Container.jsx";
import ResumeLink from "./ResumeLink.jsx";

const navLink = "py-2 hover:underline underline-offset-[6px] decoration-1";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#top" className="font-subheading text-lg tracking-tight">
          {site.name}
        </a>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-5 text-[0.9375rem] sm:gap-8">
            <li><a href="#work" className={navLink}>Work</a></li>
            <li><a href="#about" className={navLink}>About</a></li>
            <li><ResumeLink className={navLink} /></li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
