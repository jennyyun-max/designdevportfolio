/* Simple horizontal bar chart from [{ label, value }].
   Screen readers get the same numbers as a table. */
export default function BarChart({ title, caption, data = [] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <figure className="rounded-[var(--radius-window)] border border-ink bg-window p-5 shadow-[var(--shadow-window)]">
      {title && <p className="font-subheading text-lg">{title}</p>}
      <div className="mt-4 space-y-3" aria-hidden="true">
        {data.map((d, i) => (
          <div key={d.label} className="grid grid-cols-[5rem_1fr_2.5rem] items-center gap-3 font-mono text-sm">
            <span className="truncate text-muted">{d.label}</span>
            <span className="h-5 border border-ink" style={{ width: `${(d.value / max) * 100}%`, background: ["#c4d6bb", "#f1d0c2", "#c5d8e8", "#f5e6b3"][i % 4] }} />
            <span className="text-right">{d.value}</span>
          </div>
        ))}
      </div>
      <table className="sr-only">
        {title && <caption>{title}</caption>}
        <thead><tr><th scope="col">Category</th><th scope="col">Value</th></tr></thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.label}><th scope="row">{d.label}</th><td>{d.value}</td></tr>
          ))}
        </tbody>
      </table>
      {caption && <figcaption className="mt-4 font-mono text-xs text-muted">{caption}</figcaption>}
    </figure>
  );
}
