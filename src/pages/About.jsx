import { useEffect } from "react";
import { about, personal, site } from "../content.js";
import Container from "../components/Container.jsx";
import Rich from "../components/ui/Rich.jsx";
import ArchPhoto from "../components/ui/ArchPhoto.jsx";
import Potato, { Sparkle } from "../components/ui/Potato.jsx";

const photoTones = ["bg-rose", "bg-lilac", "bg-sage"];

export default function About() {
  useEffect(() => {
    document.title = `About — ${site.name}`;
  }, []);

  return (
    <>
      {/* Intro */}
      <section aria-labelledby="about-heading">
        <Container className="grid items-center gap-12 pb-16 pt-10 sm:pb-24 sm:pt-16 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div className="rise">
            <p className="eyebrow flex items-center gap-2">
              <Sparkle className="h-3.5 w-3.5" color="var(--color-bloom)" /> about
            </p>
            <h1 id="about-heading" className="display mt-6 text-[clamp(3rem,7vw,5.75rem)]">
              <Rich text={about.headline} />
            </h1>
            <div className="mt-8 max-w-[36rem] space-y-4 text-lg leading-relaxed text-plum-soft">
              {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
          <div className="group relative mx-auto w-full max-w-[17rem] lg:max-w-none">
            <ArchPhoto {...about.photo} tone="bg-lilac" />
            <Potato className="mark-wiggle absolute -left-5 -top-3 w-14" />
          </div>
        </Container>
      </section>

      {/* Education + interests */}
      <section aria-label="Education and interests" className="border-t border-line bg-shell">
        <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="eyebrow">education</h2>
            <p className="display mt-4 text-[2rem] tracking-[-0.02em]">{about.education.school}</p>
            <p className="serif-italic text-2xl text-plum-soft">{about.education.unit}</p>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              {about.education.details.map(({ term, value }) => (
                <div key={term} className="grid grid-cols-[8rem_1fr] py-3">
                  <dt className="text-plum-soft">{term}</dt>
                  <dd className="font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h2 className="eyebrow">interests</h2>
            <ul className="mt-5 flex flex-wrap gap-3">
              {about.interests.map((interest, i) => (
                <li
                  key={interest}
                  className={`rounded-full px-5 py-2.5 font-display text-lg font-semibold tracking-tight ${["bg-rose", "bg-lilac", "bg-sage", "bg-butter", "bg-sky"][i % 5]}`}
                >
                  {interest}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Off the clock */}
      <section aria-labelledby="personal-heading" className="border-t border-line">
        <Container className="py-16 sm:py-24">
          <p className="eyebrow flex items-center gap-2">
            <Sparkle className="h-3.5 w-3.5" color="var(--color-bloom)" /> beyond design
          </p>
          <h2 id="personal-heading" className="display mt-4 text-[clamp(2.25rem,4.5vw,3.5rem)]">
            off the <em>clock</em>
          </h2>
          <p className="mt-5 max-w-[36rem] text-lg leading-relaxed text-plum-soft">{personal.intro}</p>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-16">
            <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3">
              {personal.photos.map((photo, i) => (
                <li key={i}><ArchPhoto {...photo} tone={photoTones[i % 3]} /></li>
              ))}
            </ul>
            <div className="self-start rounded-[var(--radius-card)] bg-blush p-7">
              <h3 className="display text-2xl tracking-[-0.02em]">a few <em>favorites</em></h3>
              <dl className="mt-4 divide-y divide-plum/10">
                {personal.favorites.map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-4 py-2.5">
                    <dt className="text-plum-soft">{label}</dt>
                    <dd className="text-right font-semibold">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {personal.creative.length > 0 && (
            <ul className="mt-12 grid gap-5 sm:grid-cols-3">
              {personal.creative.map((item, i) => (
                <li key={item.title}><ArchPhoto src={item.src} alt={item.alt} caption={item.title} tone={photoTones[i % 3]} /></li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}
