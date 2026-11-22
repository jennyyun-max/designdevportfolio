import ButtonLink from "@/components/ui/ButtonLink";

export const metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 pb-10 pt-12 sm:px-8">
      <p className="meta text-muted">(404)</p>
      <h1 className="display mt-6 text-[clamp(4rem,14vw,14rem)] leading-[0.82] tracking-[-0.045em]">
        Page <em>not found</em>
      </h1>
      <p className="mt-8 max-w-[40ch] text-[1.1rem] text-muted">This page doesn’t exist — or it moved during the redesign.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <ButtonLink href="/" variant="primary">
          Home
        </ButtonLink>
        <ButtonLink href="/work">See the work</ButtonLink>
      </div>
    </section>
  );
}
