import { Link } from "react-router-dom";
import { site } from "../content.js";
import Container from "./Container.jsx";
import ContactLinks from "./ContactLinks.jsx";
import Bloom, { Sparkle } from "./ui/Bloom.jsx";

export default function Footer() {
  return (
    <footer>
      <section id="contact" aria-labelledby="contact-heading" className="relative overflow-hidden border-t border-line">
        <Container className="py-20 text-center sm:py-28">
          <p className="eyebrow">say hello</p>
          <h2 id="contact-heading" className="display mx-auto mt-5 max-w-[14ch] text-[clamp(2.75rem,8vw,5.75rem)]">
            let’s make something <em>lovely</em> together.
          </h2>
          <p className="mx-auto mt-6 max-w-[32rem] text-lg text-plum-soft">
            I’d love to hear about internships, projects, or anything you found interesting here.
          </p>
          <ContactLinks className="mt-9" />
        </Container>
        <Bloom className="absolute -left-6 top-16 hidden w-24 rotate-12 opacity-80 sm:block" color="var(--color-rose)" />
        <Sparkle className="absolute right-[12%] top-20 hidden w-6 sm:block" color="var(--color-bloom)" />
      </section>

      <div className="border-t border-line bg-shell">
        <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 font-display text-lg font-bold lowercase">
              <Bloom className="h-5 w-5" /> {site.name}
            </p>
            <p className="mt-2 max-w-[22rem] text-sm text-plum-soft">
              UX & product design student at the University of Michigan School of Information.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="flex gap-5 text-sm font-semibold">
              <li><Link to={{ pathname: "/", hash: "#work" }} className="text-link">work</Link></li>
              <li><Link to="/about" className="text-link">about</Link></li>
              <li><Link to={{ pathname: "/", hash: "#contact" }} className="text-link">contact</Link></li>
            </ul>
          </nav>
          <p className="text-sm text-plum-soft">© {new Date().getFullYear()} {site.name}</p>
        </Container>
      </div>
    </footer>
  );
}
