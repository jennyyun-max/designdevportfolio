import { site } from "../content.js";
import Container from "./Container.jsx";

export default function Footer() {
  const links = [
    site.email && { label: "Email", href: `mailto:${site.email}`, text: site.email },
    site.linkedin && { label: "LinkedIn", href: site.linkedin, text: "LinkedIn", external: true },
    site.resume && { label: "Resume", href: site.resume, text: "Resume", external: true },
  ].filter(Boolean);

  return (
    <footer id="contact" className="border-t border-rule bg-sage/40">
      <Container className="py-16 sm:py-24">
        <h2 className="font-heading text-[clamp(2.75rem,7vw,5rem)] leading-none">
          Let’s connect.
        </h2>
        {site.contactText && (
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed">{site.contactText}</p>
        )}

        {links.length > 0 ? (
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-lg">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-link"
                  {...(link.external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-8 text-muted">Contact links coming soon.</p>
        )}

        <p className="mt-16 text-sm text-muted">
          © {new Date().getFullYear()} {site.name}
        </p>
      </Container>
    </footer>
  );
}
