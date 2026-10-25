import Container from "../Container.jsx";
import SectionLabel from "../SectionLabel.jsx";

export default function ValuesSection({ values }) {
  return (
    <section aria-labelledby="values-heading" className="border-t border-rule">
      <Container className="py-16 sm:py-24">
        <SectionLabel as="h2" id="values-heading">
          {values.label}
        </SectionLabel>

        <ol className="mt-10 grid gap-x-10 lg:grid-cols-3">
          {values.items.map((value, i) => (
            <li key={value.title} className="border-t border-ink py-8 lg:pb-0">
              <span className="font-heading text-2xl text-muted" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-heading text-[clamp(2rem,3vw,2.5rem)] leading-[1.05]">
                {value.title}
              </h3>
              {value.text && <p className="mt-4 max-w-[24rem] text-muted">{value.text}</p>}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
