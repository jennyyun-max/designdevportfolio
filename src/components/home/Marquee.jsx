import { home } from "../../content.js";
import Bloom from "../ui/Bloom.jsx";

/* Slow-scrolling strip of interests. Decorative (the same topics appear on
   the About page); it stops moving for reduced-motion users and on hover. */
export default function Marquee() {
  const row = home.marquee.flatMap((word) => [word, "•"]);
  return (
    <div className="marquee overflow-hidden border-y border-line bg-blush py-4" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center gap-6 pr-6">
            {row.map((item, i) =>
              item === "•" ? (
                <li key={i}><Bloom className="h-5 w-5" /></li>
              ) : (
                <li key={i} className="whitespace-nowrap font-display text-xl font-semibold tracking-tight sm:text-2xl">
                  {i % 4 === 2 ? <span className="serif-italic">{item}</span> : item}
                </li>
              )
            )}
          </ul>
        ))}
      </div>
    </div>
  );
}
