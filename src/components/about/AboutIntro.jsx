import Container from "../Container.jsx";
import Figure from "../Figure.jsx";
import SectionLabel from "../SectionLabel.jsx";

export default function AboutIntro({ intro }) {
  return (
    <section aria-labelledby="about-heading">
      {/* Mobile order: headline → portrait → bio. Desktop: portrait sits to the right. */}
      <Container className="grid gap-x-16 gap-y-10 pb-16 pt-14 sm:pb-24 sm:pt-20 md:grid-cols-[3fr_2fr]">
        <div className="md:col-start-1">
          <SectionLabel>About</SectionLabel>
          <h1
            id="about-heading"
            className="mt-5 text-balance font-heading text-[clamp(2.75rem,6vw,5rem)] leading-[1.02] tracking-[-0.01em]"
          >
            {intro.headline}
          </h1>
        </div>

        <div className="w-full max-w-sm md:col-start-2 md:row-span-2 md:row-start-1 md:max-w-none md:self-start">
          <Figure {...intro.portrait} aspect="aspect-[4/5]" />
        </div>

        <div className="max-w-[38rem] md:col-start-1">
          <div className="space-y-5 text-lg leading-relaxed">
            {intro.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>

          {intro.facts?.length > 0 && (
            <dl className="mt-10 grid grid-cols-[7rem_1fr] gap-y-3 border-t border-rule pt-6">
              {intro.facts.map(({ term, value }) => (
                <div key={term} className="contents">
                  <dt className="text-muted">{term}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </Container>
    </section>
  );
}
