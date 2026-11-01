import { Link } from "react-router-dom";
import { site } from "../content.js";
import Container from "./Container.jsx";
import Window from "./ui/Window.jsx";
import ContactList from "./desk/ContactList.jsx";

export default function Footer() {
  return (
    <footer className="bg-dots border-t border-ink">
      <Container className="py-16 sm:py-20">
        <section id="contact" aria-labelledby="contact-heading" className="grid gap-10 lg:grid-cols-[1fr_26rem] lg:items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">~/contact</p>
            <h2 id="contact-heading" className="mt-3 font-heading text-[clamp(2.75rem,6vw,4.5rem)] leading-none">
              Let’s connect.
            </h2>
            <p className="mt-5 max-w-[30rem] text-lg leading-relaxed">
              I’d love to hear about internships, projects, or anything you found interesting here.
            </p>
          </div>
          <Window title="contact.card" tone="peach">
            <ContactList />
          </Window>
        </section>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6 font-mono text-xs text-muted">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <nav aria-label="Footer">
            <ul className="flex gap-4">
              <li><Link to={{ pathname: "/", hash: "#work" }} className="text-link">Work</Link></li>
              <li><Link to="/about" className="text-link">About</Link></li>
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}
