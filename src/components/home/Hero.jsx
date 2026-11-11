import { home, site } from "../../content.js";
import Container from "../Container.jsx";
import Button from "../ui/Button.jsx";
import Rich from "../ui/Rich.jsx";
import ArchPhoto from "../ui/ArchPhoto.jsx";
import Bloom, { Sparkle } from "../ui/Bloom.jsx";

export default function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="relative overflow-hidden">
      <Container className="grid items-center gap-12 pb-16 pt-10 sm:pb-24 sm:pt-16 lg:grid-cols-[1fr_18rem] lg:gap-14">
        <div className="rise">
          <p className="eyebrow flex items-center gap-2">
            <Sparkle className="h-3.5 w-3.5" color="var(--color-bloom)" />
            {home.eyebrow}
          </p>
          <h1 id="hero-heading" className="display mt-6 text-[clamp(2.75rem,6vw,5.25rem)]">
            <Rich text={home.headline} />
          </h1>
          <svg viewBox="0 0 220 16" className="draw-line mt-3 w-40 sm:w-56" aria-hidden="true" focusable="false">
            <path d="M2 10 C 40 2, 70 15, 110 8 S 180 3, 218 9" fill="none" stroke="var(--color-bloom)" strokeWidth="3" strokeLinecap="round" />
          </svg>

          <p className="display mt-10 text-[clamp(1.6rem,3vw,2.1rem)] tracking-[-0.02em]">
            <Rich text={home.greeting} />
          </p>
          <p className="mt-4 max-w-[34rem] text-lg leading-relaxed text-plum-soft">{home.intro}</p>
          {home.status && (
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-sage px-3.5 py-1 text-sm font-semibold">
              <span className="h-2 w-2 rounded-full bg-plum" aria-hidden="true" />
              {home.status}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#work" variant="primary">view my work <span aria-hidden="true">↓</span></Button>
            <Button to="/about">about me</Button>
            {site.resume ? (
              <Button href={site.resume} target="_blank" rel="noreferrer">résumé ↗</Button>
            ) : (
              <Button>résumé · coming soon</Button>
            )}
          </div>
        </div>

        <div className="group relative mx-auto w-full max-w-[17rem] lg:max-w-none">
          <ArchPhoto {...home.photo} tone="bg-blush" />
          <Bloom className="bloom-spin absolute -right-5 -top-3 w-16" />
          <Sparkle className="absolute -left-4 bottom-16 w-6" color="var(--color-plum)" />
        </div>
      </Container>
    </section>
  );
}
