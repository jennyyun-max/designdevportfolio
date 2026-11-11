import { about } from "@/content/site";
import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import Reveal from "../ui/Reveal";
import Rich from "../ui/Rich";
import Potato, { Sparkle } from "../ui/Potato";

export default function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-pink">
      <Container className="py-24 sm:py-32">
        <SectionHeader id="about-heading" eyebrow="about me" heading={about.heading} />

        <div className="mt-14 grid gap-12 lg:grid-cols-[19rem_1fr] lg:gap-20">
          {/* Photo */}
          <Reveal className="group relative mx-auto w-full max-w-[17rem] lg:max-w-none">
            <figure>
              <div className="overflow-hidden rounded-t-full rounded-b-[var(--radius-card)] bg-lavender">
                {about.photo.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={about.photo.src} alt={about.photo.alt} className="aspect-[4/5] w-full object-cover" />
                ) : (
                  <div className="grid aspect-[4/5] place-items-center" role="img" aria-label="Photo placeholder">
                    <span className="rounded-[6px] bg-ivory px-2.5 py-1 text-[0.6875rem] font-semibold uppercase tracking-[0.12em]">photo</span>
                  </div>
                )}
              </div>
              {about.photo.caption && <figcaption className="mt-3 text-center text-sm text-espresso-soft">{about.photo.caption}</figcaption>}
            </figure>
            <Potato className="wiggle-on-hover absolute -bottom-3 -right-3 w-14" />
          </Reveal>

          <div>
            <Reveal className="max-w-[40rem] space-y-5 text-lg leading-relaxed">
              {about.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>

            {/* Design philosophy */}
            <Reveal delay={0.1}>
              <h3 className="eyebrow mt-14 flex items-center gap-2">
                <Sparkle className="h-3.5 w-3.5" /> how i like to work
              </h3>
              <ol className="mt-5 grid gap-4 sm:grid-cols-3">
                {about.philosophy.map((item, i) => (
                  <li key={item.title} className="rounded-[var(--radius-card)] bg-ivory p-6">
                    <span className="accent text-2xl text-rose" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="display mt-3 text-2xl tracking-[-0.02em]">
                      <Rich text={item.title} />
                    </p>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-espresso-soft">{item.text}</p>
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* Interests */}
            <Reveal delay={0.15}>
              <h3 className="eyebrow mt-12">things i’m into</h3>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {about.interests.map((interest, i) => (
                  <li key={interest} className={`rounded-[8px] px-3.5 py-1.5 font-medium ${["bg-blush", "bg-lavender", "bg-butter", "bg-sage", "bg-ivory"][i % 5]}`}>
                    {interest}
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-[38rem] text-espresso-soft">{about.offTheClock}</p>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
