/* Simple horizontal bar chart from [{ label, value }].
   Screen readers get the same numbers as a table. */
const fills = ["var(--color-rose)", "var(--color-lilac)", "var(--color-sage)", "var(--color-butter)"];

export default function BarChart({ title, caption, data = [] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <figure className="rounded-[var(--radius-card)] border border-plum/10 bg-shell p-6">
      {title && <p className="font-display text-lg font-bold tracking-tight">{title}</p>}
      <div className="mt-5 space-y-3" aria-hidden="true">
        {data.map((d, i) => (
          <div key={d.label} className="grid grid-cols-[4.5rem_1fr_2.5rem] items-center gap-3 text-sm">
            <span className="truncate text-plum-soft">{d.label}</span>
            <span className="h-6 rounded-full" style={{ width: `${(d.value / max) * 100}%`, background: fills[i % fills.length] }} />
            <span className="text-right font-semibold">{d.value}</span>
          </div>
        ))}
      </div>
      <table className="sr-only">
        {title && <caption>{title}</caption>}
        <thead><tr><th scope="col">Category</th><th scope="col">Value</th></tr></thead>
        <tbody>{data.map((d) => <tr key={d.label}><th scope="row">{d.label}</th><td>{d.value}</td></tr>)}</tbody>
      </table>
      {caption && <figcaption className="mt-4 text-xs text-plum-soft">{caption}</figcaption>}
    </figure>
  );
}
