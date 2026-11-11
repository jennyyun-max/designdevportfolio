import { marquee } from "@/content/site";
import Potato from "../ui/Potato";

/* Slow-scrolling strip of interests. Decorative (aria-hidden); pauses on
   hover and stays still for reduced-motion users. */
export default function Marquee() {
  return (
    <div className="marquee overflow-hidden border-y border-line bg-blush py-5" aria-hidden="true">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center gap-7 pr-7">
            {marquee.map((word, i) => (
              <li key={i} className="flex items-center gap-7">
                <span className={`whitespace-nowrap text-2xl sm:text-3xl ${i % 2 ? "accent" : "display"}`}>{word}</span>
                <Potato className="h-6 w-6" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
