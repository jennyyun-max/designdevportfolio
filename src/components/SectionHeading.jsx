export default function SectionHeading({ id, children }) {
  return (
    <h2 id={id} className="font-heading text-[clamp(2.5rem,5vw,3.5rem)] leading-none">
      {children}
    </h2>
  );
}
