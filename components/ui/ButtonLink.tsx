import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

const styles: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-oxblood",
  secondary: "border border-ink/25 text-ink hover:border-ink",
};

/* A square-cornered button link; the arrow slides on hover.
   No href → a clearly labelled unavailable item (never a dead button). */
export default function ButtonLink({
  href,
  variant = "secondary",
  external = false,
  children,
  className = "",
}: {
  href?: string;
  variant?: Variant;
  external?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const base = `group meta inline-flex items-center gap-3 px-5 py-3.5 transition-colors duration-300 ${className}`;
  const arrow = (
    <span className="inline-block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1" aria-hidden="true">
      →
    </span>
  );
  if (!href) {
    return (
      <span className={`${base} cursor-default border border-dashed border-muted-soft text-muted`} aria-disabled="true">
        {children}
      </span>
    );
  }
  if (external || href.startsWith("mailto:")) {
    return (
      <a href={href} className={`${base} ${styles[variant]}`} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        {children}
        {arrow}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles[variant]}`}>
      {children}
      {arrow}
    </Link>
  );
}
