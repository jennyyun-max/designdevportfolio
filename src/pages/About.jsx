import { useEffect } from "react";
import { aboutPage } from "../aboutContent.js";
import Container from "../components/Container.jsx";

/* Editorial row: small label on the left, content on the right */
function AboutRow({ id, label, className = "", children }) {
  return (
    <section aria-labelledby={id} className={`border-t border-rule ${className}`}>
      <Container className="grid gap-6 py-14 sm:py-20 md:grid-cols-[1fr_2fr] md:gap-16">
        <h2 id={id} className="text-sm uppercase tracking-[0.12em] text-muted md:pt-2">
          {label}
        </h2>
        <div>{children}</div>
      </Container>
    </section>
  );
}

function Portrait({ src, alt }) {
  if (src) {
    return <img src={src} alt={alt} className="aspect-[4/5] w-full object-cover" />;
  }
  return (
    <div
      role="img"
      aria-label="Portrait placeholder"
      className="relative flex aspect-[4/5] w-full items-end bg-peach p-4"
    >
      <svg viewBox="0 0 200 250" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="100" cy="100" r="38" fill="none" stroke="#2b2a28" strokeWidth="1.5" opacity="0.5" />
        <path d="M30 250 C 40 175, 160 175, 170 250" fill="none" stroke="#2b2a28" strokeWidth="1.5" opacity="0.5" />
      </svg>
      <span className="relative bg-paper px-2 py-0.5 text-xs uppercase tracking-[0.08em]">
        Portrait placeholder
      </span>
    </div>
  );
}

export default function About() {
  const { intro, approach, education, exploring, beyond } = aboutPage;
  const photos = beyond.photos.filter((photo) => photo.src);

  useEffect(() => {
    document.title = "About — Chloe Yun";
  }, []);

  return (
    <>
      {/* Introduction */}
      <section aria-labelledby="about-intro">
        <Container className="grid items-end gap-10 pb-16 pt-16 sm:pb-24 sm:pt-24 md:grid-cols-[3fr_2fr] md:gap-16">
          <div>
            <p className="text-sm uppercase tracking-[0.12em] text-muted">{intro.label}</p>
            <h1
              id="about-intro"
              className="mt-6 font-heading text-[clamp(2.75rem,6.5vw,5.25rem)] leading-[1] tracking-[-0.01em]"
            >
              {intro.headline}
            </h1>
            <p className="mt-8 max-w-[36rem] text-lg leading-relaxed text-muted sm:text-xl">
              {intro.text}
            </p>
          </div>
          <div className="w-full max-w-sm md:max-w-none">
            <Portrait {...intro.portrait} />
          </div>
        </Container>
      </section>

      {/* My approach */}
      <AboutRow id="approach" label={approach.label}>
        <p className="font-heading text-[clamp(2rem,4vw,3rem)] leading-[1.05]">{approach.heading}</p>
        <p className="mt-6 max-w-[36rem] text-lg leading-relaxed">{approach.text}</p>
      </AboutRow>

      {/* Education */}
      <AboutRow id="education" label={education.label}>
        <p className="font-subheading text-2xl leading-tight">{education.school}</p>
        <dl className="mt-6 grid max-w-[36rem] grid-cols-[6rem_1fr] gap-y-3 text-lg">
          {education.details.map(({ term, value }) => (
            <div key={term} className="contents">
              <dt className="text-muted">{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </AboutRow>

      {/* What I'm exploring */}
      <AboutRow id="exploring" label={exploring.label}>
        <p className="text-muted">{exploring.note}</p>
        <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
          {exploring.items.map((item) => (
            <li key={item} className="border-b border-rule py-4 font-subheading text-xl">
              {item}
            </li>
          ))}
        </ul>
      </AboutRow>

      {/* Beyond design */}
      <AboutRow id="beyond" label={beyond.label} className="bg-butter/40">
        <p className="max-w-[36rem] font-heading text-[clamp(1.75rem,3.5vw,2.5rem)] italic leading-[1.15]">
          {beyond.text}
        </p>
        {photos.length > 0 && (
          <ul
            className={`mt-10 grid gap-4 ${
              photos.length === 1 ? "max-w-sm" : photos.length === 2 ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-3"
            }`}
          >
            {photos.map((photo) => (
              <li key={photo.src}>
                <img src={photo.src} alt={photo.alt} className="aspect-square w-full object-cover" />
              </li>
            ))}
          </ul>
        )}
      </AboutRow>
    </>
  );
}
