import { Link } from "react-router-dom";

const styles = {
  primary: "bg-plum text-shell hover:bg-[#54404a]",
  secondary: "border border-plum text-plum hover:bg-blush",
};

/* Pill button-link. `to` = internal route, `href` = normal link.
   With neither, renders a clearly labelled unavailable item (never a dead button). */
export default function Button({ to, href, variant = "secondary", children, className = "", ...rest }) {
  const base = `inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.9375rem] font-semibold leading-none transition-colors ${className}`;
  if (to) return <Link to={to} className={`${base} ${styles[variant]}`} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={`${base} ${styles[variant]}`} {...rest}>{children}</a>;
  return (
    <span className={`${base} cursor-default border border-dashed border-plum-soft text-plum-soft`} aria-disabled="true">
      {children}
    </span>
  );
}
