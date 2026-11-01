import Container from "../Container.jsx";
import Window from "../ui/Window.jsx";
import { deskWindows } from "./deskWindows.jsx";

/* Small screens: the desktop windows shown as a simple stack (no overlap).
   Contact lives in the footer, so it's skipped here. */
export default function OnMyDesk() {
  return (
    <section aria-labelledby="desk-heading" className="border-t border-rule lg:hidden">
      <Container className="py-14">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">~/desk</p>
        <h2 id="desk-heading" className="mt-3 font-heading text-[2.5rem] leading-none">On my desk</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {deskWindows
            .filter((w) => w.id !== "contact")
            .map((w) => (
              <Window key={w.id} title={w.title} tone={w.tone}>
                <w.Content />
              </Window>
            ))}
        </div>
      </Container>
    </section>
  );
}
