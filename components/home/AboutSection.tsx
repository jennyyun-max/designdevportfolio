import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { about, story } from "@/content/site";
import Container from "../ui/Container";
import Reveal from "../ui/Reveal";
import Rich from "../ui/Rich";

/* Short About on the homepage; the full story lives at /about */
export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-t border-line">
      <Container className="grid gap-10 py-24 sm:py-32 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-3">
          <figure className="max-w-[12rem] -rotate-2 bg-paper p-[6%] pb-0 shadow-[0_1px_2px_rgba(58,38,32,0.14),0_18px_32px_-16px_rgba(58,38,32,0.32)]">
            <div className="relative aspect-[4/5] bg-[#efe4dc]">
              <Image src={about.photo.src} alt={about.photo.alt} fill sizes="192px" className="object-cover" />
            </div>
            <figcaption className="mono flex h-9 items-center text-[0.6rem] uppercase tracking-[0.08em] text-fg">that’s me</figcaption>
          </figure>
        </Reveal>
        <div className="md:col-span-8 md:col-start-5">
          <p className="eyebrow">About</p>
          <h2 id="about-heading" className="display mt-4 text-[clamp(2.6rem,6vw,5rem)]">
            <Rich text={story.heading} />
          </h2>
          <p className="mt-6 max-w-[36rem] text-lg leading-relaxed text-muted">{story.lead}</p>
          <Link href="/about" className="link mono mt-8 inline-flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.08em] text-accent">
            The full story <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
