import Container from "../Container.jsx";
import Figure from "../Figure.jsx";
import SectionLabel from "../SectionLabel.jsx";

export default function InvolvementSection({ involvement }) {
  return (
    <section aria-labelledby="involvement-heading" className="border-t border-rule">
      <Container className="py-16 sm:py-24">
        <SectionLabel>{involvement.label}</SectionLabel>
        <h2
          id="involvement-heading"
          className="mt-5 max-w-[44rem] text-balance font-heading text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.05]"
        >
          {involvement.heading}
        </h2>

        {/* Phone: stacked · Tablet: image beside text · Desktop: three columns */}
        <ul className="mt-12 grid gap-x-8 gap-y-12 lg:grid-cols-3">
          {involvement.entries.map((entry, i) => (
            <li
              key={`${entry.organization}-${i}`}
              className="grid gap-5 sm:grid-cols-2 sm:items-center sm:gap-8 lg:grid-cols-1 lg:items-start lg:gap-5"
            >
              <Figure {...entry.image} />
              <div>
                <h3 className="font-subheading text-xl leading-snug">{entry.role}</h3>
                <p className="text-muted">{entry.organization}</p>
                {entry.description && <p className="mt-3 max-w-[30rem]">{entry.description}</p>}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
