import { Link } from "react-router-dom";
import { site } from "../content.js";
import Container from "./Container.jsx";
import SectionLabel from "./SectionLabel.jsx";

/* Site footer. Pages can pass their own closing heading/text;
   otherwise it shows “Let’s connect.” and site.contactText. */
export default function Footer({ heading = "Let’s connect.", text = site.contactText }) {
  const contactLinks = [
    site.email && { label: "Email", href: `mailto:${site.email}` },
    site.linkedin && { label: "LinkedIn", href: site.linkedin, external: true },
  ].filter(Boolean);

  return (
    <footer id="contact" className="border-t border-rule bg-sage/40">
      <Container className="grid gap-12 py-16 sm:py-24 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <h2 className="font-heading text-balance text-[clamp(2.75rem,6vw,4.5rem)] leading-none">{heading}</h2>
          {text && <p className="mt-6 max-w-[34rem] text-lg leading-relaxed">{text}</p>}
        </div>

        <nav aria-labelledby="footer-contact">
          <SectionLabel as="h3" id="footer-contact">Contact</SectionLabel>
          {contactLinks.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-link"
                    {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-muted">Links coming soon.</p>
          )}
        </nav>

        <nav aria-labelledby="footer-nav">
          <SectionLabel as="h3" id="footer-nav">Navigation</SectionLabel>
          <ul className="mt-4 space-y-2">
            <li><Link to={{ pathname: "/", hash: "#work" }} className="text-link">Work</Link></li>
            <li><Link to="/about" className="text-link">About</Link></li>
            {site.resume && (
              <li>
                <a href={site.resume} target="_blank" rel="noreferrer" className="text-link">
                  Resume
                </a>
              </li>
            )}
          </ul>
        </nav>

        <p className="text-sm text-muted md:col-span-3">
          © {new Date().getFullYear()} {site.name}
        </p>
      </Container>
    </footer>
  );
}
