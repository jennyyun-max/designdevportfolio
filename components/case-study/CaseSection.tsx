import type { ReactNode } from "react";
import Reveal from "../ui/Reveal";

/* Numbered editorial section: "03 — my role" label column + content */
export default function CaseSection({
  id,
  number,
  label,
  heading,
  children,
  tone = "",
}: {
  id: string;
  number: number;
  label: string;
  heading?: string;
  children: ReactNode;
  tone?: string;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-label`} className={tone}>
      <div className="mx-auto grid w-full max-w-[76rem] gap-6 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[14rem_1fr] lg:gap-16 lg:px-10">
        <Reveal>
          <p id={`${id}-label`} className="eyebrow lg:sticky lg:top-28">
            <span className="accent mr-2 text-lg normal-case tracking-normal text-rose">{String(number).padStart(2, "0")}</span>
            {label}
          </p>
        </Reveal>
        <div>
          {heading && (
            <Reveal>
              <h2 className="display max-w-[22ch] text-balance text-[clamp(2rem,4vw,3.25rem)]">{heading}</h2>
            </Reveal>
          )}
          <div className={heading ? "mt-8" : ""}>{children}</div>
        </div>
      </div>
    </section>
  );
}
