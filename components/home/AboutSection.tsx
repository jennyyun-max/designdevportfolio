import Image from "next/image";
import { about } from "@/content/site";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import Rich from "../ui/Rich";

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-t border-line">
      <Container className="py-24 sm:py-32">
        <SectionHeader id="about-heading" eyebrow="02 — about" heading={about.heading} />

        <div className="mt-14 grid gap-12 lg:grid-cols-[20rem_1fr] lg:gap-20">
          {/* Photo, printed like the desk prints */}
          <Reveal className="mx-auto w-full max-w-[17rem] lg:max-w-none">
            <figure className="bg-paper p-[6%] pb-0 shadow-[0_1px_0_rgba(0,0,0,0.5),0_24px_40px_-18px_rgba(0,0,0,0.9)]">
              <div className="relative aspect-[4/5] bg-[#2a2c30]">
                {about.photo.src && (
                  <Image src={about.photo.src} alt={about.photo.alt} fill sizes="(min-width: 1024px) 320px, 272px" className="object-cover" />
                )}
              </div>
              <figcaption className="mono flex h-12 items-center text-[0.68rem] uppercase tracking-[0.08em] text-[#2a2c30]">
                {about.photo.caption || "Chloe Yun · Ann Arbor"}
              </figcaption>
            </figure>
          </Reveal>

          <div>
            <Reveal className="max-w-[40rem] space-y-5 text-lg leading-relaxed text-muted [&>p:first-child]:text-fg">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>

            {/* How I work */}
            <Reveal delay={0.1}>
              <h3 className="eyebrow mt-14">how i work</h3>
              <ol className="mt-5 grid border-t border-line sm:grid-cols-3">
                {about.philosophy.map((item, i) => (
                  <li key={item.title} className="border-b border-line py-6 sm:border-b-0 sm:pr-6 [&:not(:first-child)]:sm:border-l [&:not(:first-child)]:sm:pl-6">
                    <span className="accent text-[0.75rem]" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="display mt-3 text-[1.6rem] tracking-[-0.035em]">
                      <Rich text={item.title} />
                    </p>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{item.text}</p>
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* Interests */}
            <Reveal delay={0.15}>
              <h3 className="eyebrow mt-12">interested in</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {about.interests.map((interest) => (
                  <li key={interest} className="mono border border-line px-3 py-1.5 text-[0.75rem] uppercase tracking-[0.06em] text-silver">
                    {interest}
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-[38rem] text-muted">{about.offTheClock}</p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
