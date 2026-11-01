import { useEffect } from "react";
import { about, personal, site } from "../content.js";
import Container from "../components/Container.jsx";
import Window from "../components/ui/Window.jsx";
import Tag from "../components/ui/Tag.jsx";
import Polaroid from "../components/desk/Polaroid.jsx";

export default function About() {
  useEffect(() => {
    document.title = `About — ${site.name}`;
  }, []);

  return (
    <>
      {/* Intro + photo */}
      <section aria-labelledby="about-heading" className="bg-dots border-b border-rule">
        <Container className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_18rem] lg:items-center lg:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">~/about</p>
            <h1 id="about-heading" className="mt-3 font-heading text-[clamp(3rem,7vw,5rem)] leading-[0.95]">
              {about.headline}
            </h1>
            <div className="mt-6 max-w-[36rem] space-y-4 text-lg leading-relaxed">
              {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
          <div className="mx-auto w-full max-w-[16rem] lg:max-w-none">
            <Polaroid {...about.photo} tilt={3} />
          </div>
        </Container>
      </section>

      {/* Education + interests */}
      <section aria-labelledby="edu-heading">
        <Container className="grid gap-6 py-14 sm:py-20 lg:grid-cols-2 lg:gap-8">
          <Window title="education.txt" tone="sky" titleId="edu-heading">
            <p className="font-subheading text-xl">{about.education.school}</p>
            <p className="text-muted">{about.education.unit}</p>
            <dl className="mt-5 grid grid-cols-[7rem_1fr] gap-y-2 border-t border-rule pt-4">
              {about.education.details.map(({ term, value }) => (
                <div key={term} className="contents">
                  <dt className="font-mono text-sm text-muted">{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </Window>
          <Window title="interests.list" tone="sage">
            <h2 className="font-subheading text-xl">What I’m interested in</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {about.interests.map((i) => (
                <li key={i}><Tag className="px-2.5 py-1 text-sm text-ink">{i}</Tag></li>
              ))}
            </ul>
          </Window>
        </Container>
      </section>

      {/* Off the clock */}
      <section aria-labelledby="personal-heading" className="border-t border-rule">
        <Container className="py-14 sm:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">~/off-the-clock</p>
          <h2 id="personal-heading" className="mt-3 font-heading text-[clamp(2.5rem,5vw,3.5rem)] leading-none">
            Off the clock
          </h2>
          <p className="mt-5 max-w-[36rem] text-lg leading-relaxed">{personal.intro}</p>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_22rem]">
            <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3">
              {personal.photos.map((photo, i) => (
                <li key={i}><Polaroid {...photo} tilt={[-2, 1.5, -1][i % 3]} /></li>
              ))}
            </ul>
            <Window title="favorites.list" tone="butter" className="self-start">
              <dl className="divide-y divide-rule">
                {personal.favorites.map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-4 py-2 first:pt-0 last:pb-0">
                    <dt className="font-mono text-sm text-muted">{label}</dt>
                    <dd className="text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </Window>
          </div>

          {personal.creative.length > 0 && (
            <ul className="mt-10 grid gap-5 sm:grid-cols-3">
              {personal.creative.map((item) => (
                <li key={item.title}>
                  <Polaroid src={item.src} alt={item.alt} caption={item.title} />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}
