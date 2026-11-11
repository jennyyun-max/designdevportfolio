import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

const styles: Record<Variant, string> = {
  primary: "bg-espresso text-ivory hover:bg-[#523830]",
  secondary: "border border-espresso text-espresso hover:bg-pink",
};

/* Button-styled link with a small press + icon-nudge microinteraction.
   No href → a clearly labelled unavailable item (never a dead button). */
export default function ButtonLink({
  href,
  variant = "secondary",
  external = false,
  icon,
  children,
  className = "",
}: {
  href?: string;
  variant?: Variant;
  external?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  const base = `group inline-flex items-center gap-2 rounded-[var(--radius-button)] px-5 py-3 text-[0.9375rem] font-semibold leading-none transition-[background-color,transform] duration-200 active:scale-[0.97] ${className}`;
  const iconEl = icon && (
    <span className="inline-flex transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none">
      {icon}
    </span>
  );

  if (!href) {
    return (
      <span className={`${base} cursor-default border border-dashed border-espresso-soft text-espresso-soft active:scale-100`} aria-disabled="true">
        {children}
      </span>
    );
  }
  if (external || href.startsWith("mailto:")) {
    return (
      <a href={href} className={`${base} ${styles[variant]}`} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        {children}
        {iconEl}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles[variant]}`}>
      {children}
      {iconEl}
    </Link>
  );
}
