import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { about, story } from "@/content/site";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import Rich from "@/components/ui/Rich";
import ContactSection from "@/components/home/ContactSection";

export const metadata: Metadata = {
  title: "About",
  description: "From performing with cignature to studying information and designing at Michigan.",
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function AboutPage() {
  return (
    <>
      {/* Opening */}
      <Container className="grid gap-12 pb-20 pt-12 sm:pt-20 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
          <p className="eyebrow">About</p>
          <h1 className="display mt-4 text-[clamp(3.25rem,9vw,8rem)]">
            <Rich text={story.heading} />
          </h1>
          <p className="mt-8 max-w-[36rem] text-[clamp(1.1rem,1.6vw,1.35rem)] leading-snug">{story.lead}</p>
        </div>
        <Reveal className="md:col-span-4 md:col-start-9 md:pt-10">
          <figure className="mx-auto max-w-[19rem] rotate-[2deg] bg-paper p-[6%] pb-0 shadow-[0_1px_2px_rgba(58,38,32,0.14),0_24px_44px_-20px_rgba(58,38,32,0.32)] md:max-w-none">
            <div className="relative aspect-[4/5] bg-[#efe4dc]">
              <Image src={about.photo.src} alt={about.photo.alt} fill priority sizes="(min-width: 768px) 360px, 300px" className="object-cover" />
            </div>
            <figcaption className="mono flex h-12 items-center text-[0.68rem] uppercase tracking-[0.08em] text-fg">Chloe Yun · Ann Arbor</figcaption>
          </figure>
        </Reveal>
      </Container>

      {/* Chapters */}
      {story.chapters.map((ch, i) => (
        <section key={ch.label} aria-labelledby={`chapter-${i}`} className="border-t border-line">
          <Container className="grid gap-8 py-16 sm:py-24 md:grid-cols-12 md:gap-10">
            <Reveal className="md:col-span-3">
              <p className="eyebrow md:sticky md:top-28">
                <span className="mr-2 text-silver">{pad(i + 1)}</span>
                {ch.label}
              </p>
            </Reveal>
            <div className="md:col-span-9">
              <Reveal>
                <h2 id={`chapter-${i}`} className="display text-[clamp(2.2rem,4.5vw,3.75rem)]">
                  {ch.title}
                </h2>
              </Reveal>
              {"text" in ch && ch.text && (
                <Reveal className="mt-8 max-w-[40rem] space-y-5 text-lg leading-relaxed text-muted [&>p:first-child]:text-fg">
                  {ch.text.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </Reveal>
              )}
              {"points" in ch && ch.points && (
                <ol className="mt-10 grid border-t border-line sm:grid-cols-2">
                  {ch.points.map((pt, k) => (
                    <Reveal as="li" key={pt.title} delay={(k % 2) * 0.08} className="border-b border-line py-7 sm:pr-8 sm:odd:border-r sm:even:pl-8">
                      <span className="accent text-[0.75rem]">{pad(k + 1)}</span>
                      <p className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{pt.title}</p>
                      <p className="mt-2 text-muted">{pt.text}</p>
                    </Reveal>
                  ))}
                </ol>
              )}
              {"images" in ch && ch.images && (
                <div className="mt-12 grid gap-6 sm:grid-cols-[1.25fr_1fr] sm:items-end">
                  {ch.images.map((img) => (
                    <Reveal key={img.src}>
                      <figure>
                        <div className="relative aspect-[4/3] overflow-hidden bg-surface-2">
                          <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 480px, 100vw" className="object-cover" />
                        </div>
                        <figcaption className="mono mt-3 text-[0.7rem] uppercase tracking-[0.08em] text-muted">{img.caption}</figcaption>
                      </figure>
                    </Reveal>
                  ))}
                </div>
              )}
              {"link" in ch && ch.link && (
                <Link href={ch.link.href} className="link mono mt-8 inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.08em] text-accent">
                  {ch.link.label} <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              )}
            </div>
          </Container>
        </section>
      ))}

      {/* How I work */}
      <section aria-labelledby="how-i-work" className="border-t border-line">
        <Container className="grid gap-8 py-16 sm:py-24 md:grid-cols-12 md:gap-10">
          <p id="how-i-work" className="eyebrow md:col-span-3">
            How I work
          </p>
          <div className="md:col-span-9">
            <ol className="grid border-t border-line sm:grid-cols-3">
              {about.philosophy.map((item, k) => (
                <li
                  key={item.title}
                  className="border-b border-line py-6 sm:border-b-0 sm:pr-6 [&:not(:first-child)]:sm:border-l [&:not(:first-child)]:sm:pl-6"
                >
                  <span className="accent text-[0.75rem]">{pad(k + 1)}</span>
                  <p className="mt-3 text-xl font-semibold tracking-[-0.03em]">{item.title}</p>
                  <p className="mt-2 text-[0.9375rem] text-muted">{item.text}</p>
                </li>
              ))}
            </ol>
            <ul className="mt-10 flex flex-wrap gap-2" aria-label="Interested in">
              {about.interests.map((interest) => (
                <li key={interest} className="mono border border-line px-3 py-1.5 text-[0.75rem] uppercase tracking-[0.06em] text-silver">
                  {interest}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-[38rem] text-muted">{about.offTheClock}</p>
          </div>
        </Container>
      </section>

      <ContactSection />
    </>
  );
}
