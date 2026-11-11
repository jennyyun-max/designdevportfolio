export default function Tag({ children, className = "" }) {
  return (
    <span className={`inline-block rounded-full border border-plum/25 px-3 py-0.5 text-xs font-semibold uppercase leading-5 tracking-[0.08em] text-plum-soft ${className}`}>
      {children}
    </span>
  );
}
