import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary";

const styles: Record<Variant, string> = {
  primary: "bg-espresso text-ivory shadow-[0_3px_0_#1f130f] hover:-translate-y-0.5 hover:bg-[#523830] active:translate-y-0.5 active:shadow-[0_1px_0_#1f130f]",
  secondary: "border-[1.5px] border-espresso bg-ivory text-espresso shadow-[0_3px_0_var(--espresso)] hover:-translate-y-0.5 hover:bg-pink active:translate-y-0.5 active:shadow-[0_1px_0_var(--espresso)]",
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
  const base = `group inline-flex items-center gap-2 rounded-[var(--radius-button)] px-5 py-3.5 text-[0.98rem] font-semibold leading-none transition-[background-color,transform,box-shadow] duration-200 motion-reduce:transition-none ${className}`;
  const iconEl = icon && (
    <span className="inline-flex transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none">
      {icon}
    </span>
  );

  if (!href) {
    return (
      <span className={`${base} cursor-default border border-dashed border-muted text-muted active:scale-100`} aria-disabled="true">
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
