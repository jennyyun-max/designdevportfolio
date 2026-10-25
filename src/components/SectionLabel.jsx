/* Small uppercase label used above sections, e.g. “EXPERIENCE & INVOLVEMENT” */
export default function SectionLabel({ as: Tag = "p", id, className = "", children }) {
  return (
    <Tag id={id} className={`text-sm uppercase tracking-[0.12em] text-muted ${className}`}>
      {children}
    </Tag>
  );
}
