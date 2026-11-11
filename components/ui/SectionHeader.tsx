import Rich from "./Rich";
import Reveal from "./Reveal";
import { Sparkle } from "./Potato";

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
        <p className="eyebrow flex items-center gap-2">
          <Sparkle className="h-3.5 w-3.5" />
          {eyebrow}
        </p>
        <span className="h-px flex-1 bg-line" aria-hidden="true" />
        {index && <span className="eyebrow">{index}</span>}
      </div>
      <h2 id={id} className="display mt-5 text-[clamp(2.6rem,6vw,4.75rem)]">
        <Rich text={heading} />
      </h2>
    </Reveal>
  );
}
