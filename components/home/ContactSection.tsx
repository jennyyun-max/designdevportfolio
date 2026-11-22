import { site } from "@/content/site";
import Reveal from "../ui/Reveal";
import { Envelope, Heart } from "../doodles/Doodles";

/* “Say hi” — written on a piece of stationery */
export default function ContactSection() {
  const links = [
    site.email && { label: "email", value: site.email, href: `mailto:${site.email}` },
    site.linkedin && { label: "linkedin", value: "chloejiwonyun", href: site.linkedin },
    site.resume && { label: "résumé", value: "open the pdf", href: site.resume },
    site.github && { label: "github", value: "see my code", href: site.github },
  ].filter(Boolean) as { label: string; value: string; href: string }[];

  return (
    <section id="contact" aria-labelledby="contact-heading" className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <div className="ruled relative mx-auto max-w-[56rem] rotate-[0.6deg] rounded-[8px] px-6 pb-10 pt-12 shadow-[0_30px_50px_-34px_rgba(58,38,32,0.7)] sm:px-14">
          <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-2" style={{ ["--tape" as string]: "var(--blush)" }} aria-hidden="true" />
          <Envelope className="float absolute -right-3 -top-7 w-16 sm:-right-6 sm:w-20" />
          <p className="hand text-[1.8rem] leading-none text-rose-deep">p.s.</p>
          <h2 id="contact-heading" className="display mt-2 text-[clamp(2.4rem,6vw,4.4rem)]">
            let’s <em>talk</em> <Heart className="inline-block h-[0.7em] w-[0.7em] align-baseline" />
          </h2>
          <p className="mt-4 max-w-[36rem] leading-[1.9rem] text-espresso-soft">
            I’m always happy to chat about design, data, research — or what it’s like to go from stage to screen. Write me a note:
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group flex items-baseline justify-between gap-3 rounded-[12px] border border-espresso/15 bg-paper/80 px-4 py-3 transition-colors hover:bg-pink"
                >
                  <span className="eyebrow">{l.label}</span>
                  <span className="font-semibold">
                    {l.value} <span className="inline-block transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
