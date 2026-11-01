import { Link } from "react-router-dom";

const styles = {
  primary: "bg-ink text-window hover:bg-[#45403a]",
  secondary: "bg-window text-ink hover:bg-butter",
};

/* Button-styled link. `to` = internal route, `href` = normal link.
   With neither, renders a clearly disabled label (never a dead button). */
export default function Button({ to, href, variant = "secondary", children, className = "", ...rest }) {
  const base = `inline-flex items-center gap-2 rounded-[var(--radius-sm)] border border-ink px-4 py-2 font-mono text-sm leading-none transition-colors ${className}`;
  if (to) return <Link to={to} className={`${base} ${styles[variant]}`} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={`${base} ${styles[variant]}`} {...rest}>{children}</a>;
  return (
    <span className={`${base} cursor-default border-dashed border-muted text-muted`} aria-disabled="true">
      {children}
    </span>
  );
}
