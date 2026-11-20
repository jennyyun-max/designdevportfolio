import { ArrowUpRight, Code2, FileText, Mail, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";

/* Closing invitation + contact rows. Missing links show “coming soon”; GitHub hides while empty. */
export default function ContactSection() {
  const items: { label: string; href: string; detail: string; icon: ReactNode; external?: boolean }[] = [
    { label: "Email", href: site.email ? `mailto:${site.email}` : "", detail: site.email || "say hello", icon: <Mail size={18} aria-hidden="true" /> },
    { label: "LinkedIn", href: site.linkedin, detail: "let’s connect", icon: <UserRound size={18} aria-hidden="true" />, external: true },
    { label: "GitHub", href: site.github, detail: "see my code", icon: <Code2 size={18} aria-hidden="true" />, external: true },
    { label: "Resume", href: site.resume, detail: "PDF", icon: <FileText size={18} aria-hidden="true" />, external: true },
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-t border-line">
      <Container className="py-24 sm:py-32">
        <Reveal>
          <p className="eyebrow">03 — contact</p>
          <h2 id="contact-heading" className="display mt-6 max-w-[14ch] text-[clamp(3rem,9vw,8rem)]">
            Let’s build something <em>useful.</em>
          </h2>
          <p className="mt-6 max-w-[34rem] text-lg text-muted">
            I’m excited to learn from new people, explore interesting problems, and bring my perspective in data, research, technology, and creative work.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mt-14 max-w-[48rem] border-t border-line">
            {items
              .filter((item) => item.href || item.label !== "GitHub")
              .map((item) => (
                <li key={item.label} className="border-b border-line">
                  {item.href ? (
                    <a
                      href={item.href}
                      className="group flex items-center gap-4 py-5 transition-colors hover:text-accent"
                      {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
                    >
                      <span className="text-silver group-hover:text-accent">{item.icon}</span>
                      <span className="text-xl font-medium tracking-[-0.02em]">{item.label}</span>
                      <span className="mono ml-auto truncate text-[0.75rem] text-muted">{item.detail}</span>
                      <ArrowUpRight size={18} aria-hidden="true" className="shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 py-5 text-muted">
                      {item.icon}
                      <span className="text-xl font-medium tracking-[-0.02em]">{item.label}</span>
                      <span className="mono ml-auto text-[0.75rem]">coming soon</span>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
