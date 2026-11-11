import { Link } from "react-router-dom";
import { about, personal } from "../../content.js";
import Container from "../Container.jsx";
import Rich from "../ui/Rich.jsx";
import ArchPhoto from "../ui/ArchPhoto.jsx";
import Bloom, { Sparkle } from "../ui/Bloom.jsx";

export default function AboutTeaser() {
  return (
    <section aria-labelledby="about-teaser-heading" className="border-t border-line bg-shell">
      <Container className="grid items-center gap-10 py-20 sm:py-24 md:grid-cols-[15rem_1fr] md:gap-16">
        <div className="group relative mx-auto w-full max-w-[13rem] md:max-w-none">
          <ArchPhoto {...about.photo} tone="bg-lilac" />
          <Bloom className="bloom-spin absolute -bottom-4 -right-4 w-12" color="var(--color-rose)" />
        </div>
        <div>
          <p className="eyebrow flex items-center gap-2">
            <Sparkle className="h-3.5 w-3.5" color="var(--color-bloom)" /> about
          </p>
          <h2 id="about-teaser-heading" className="display mt-4 text-[clamp(2.25rem,4.5vw,3.5rem)]">
            <Rich text={about.headline} />
          </h2>
          <div className="mt-5 max-w-[36rem] space-y-4 text-lg leading-relaxed text-plum-soft">
            <p>{about.paragraphs[0]}</p>
            <p>{personal.intro}</p>
          </div>
          <Link to="/about" className="text-link mt-6 inline-block font-semibold">
            more about me →
          </Link>
        </div>
      </Container>
    </section>
  );
}
