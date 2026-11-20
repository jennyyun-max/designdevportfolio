import { ArrowUpRight, Code2, FileText, Mail, UserRound } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import InteractivePotato from "../ui/InteractivePotato";

/* Big, playful invitation + contact rows. Missing links show “coming soon”. */
export default function ContactSection() {
  const items: { label: string; href: string; detail: string; icon: ReactNode; external?: boolean }[] = [
    { label: "email", href: site.email ? `mailto:${site.email}` : "", detail: site.email || "say hello", icon: <Mail size={20} aria-hidden="true" /> },
    { label: "linkedin", href: site.linkedin, detail: "let’s connect", icon: <UserRound size={20} aria-hidden="true" />, external: true },
    { label: "github", href: site.github, detail: "see my code", icon: <Code2 size={20} aria-hidden="true" />, external: true },
    { label: "resume", href: site.resume, detail: "the one-pager", icon: <FileText size={20} aria-hidden="true" />, external: true },
  ];

  return (
    <section id="contact" aria-labelledby="contact-heading">
      <Container className="py-24 sm:py-32">
        <Reveal className="relative text-center">
          <p className="eyebrow">let’s connect ✦</p>
          <h2 id="contact-heading" className="display mx-auto mt-6 max-w-[12ch] text-[clamp(3rem,9vw,7rem)] leading-[0.92]">
            let’s build something <em>useful</em>.
          </h2>
          <p className="mx-auto mt-6 max-w-[34rem] text-lg text-espresso-soft">
            I’m excited to learn from new people, explore interesting problems, and bring my perspective in data, research, technology, and creative work.
          </p>
          <InteractivePotato className="absolute right-[6%] top-0 hidden w-16 lg:block" />
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="mx-auto mt-14 max-w-[44rem] divide-y divide-line border-y border-line">
            {items.filter((item) => item.href || item.label !== "github").map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <a
                    href={item.href}
                    className="group flex items-center gap-4 py-5 transition-colors hover:bg-pink/60 sm:px-4"
                    {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-blush">{item.icon}</span>
                    <span className="display text-2xl">{item.label}</span>
                    <span className="ml-auto text-espresso-soft">{item.detail}</span>
                    <ArrowUpRight size={20} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                ) : (
                  <div className="flex items-center gap-4 py-5 text-espresso-soft sm:px-4">
                    <span className="grid h-10 w-10 place-items-center rounded-[10px] border border-dashed border-espresso-soft">{item.icon}</span>
                    <span className="display text-2xl">{item.label}</span>
                    <span className="ml-auto text-sm">coming soon</span>
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
