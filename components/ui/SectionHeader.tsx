import Rich from "./Rich";
import Reveal from "./Reveal";

/* Eyebrow with a hairline + index, then a large editorial heading */
export default function SectionHeader({
  eyebrow,
  index,
  heading,
  id,
}: {
  eyebrow: string;
  index?: string;
  heading: string;
  id: string;
}) {
  return (
    <Reveal>
      <div className="flex items-center gap-4">
        <p className="eyebrow">{eyebrow}</p>
        <span className="h-px flex-1 bg-line" aria-hidden="true" />
        {index && <span className="eyebrow">{index}</span>}
      </div>
      <h2 id={id} className="display mt-6 text-[clamp(2.6rem,6.5vw,5.5rem)]">
        <Rich text={heading} />
      </h2>
    </Reveal>
  );
}
