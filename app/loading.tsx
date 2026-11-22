/* A quiet loading state between pages */
export default function Loading() {
  return (
    <div className="grid min-h-[60svh] place-items-center" role="status" aria-live="polite">
      <p className="meta text-muted">Loading…</p>
    </div>
  );
}
