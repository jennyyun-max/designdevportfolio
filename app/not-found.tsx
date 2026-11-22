import ButtonLink from "@/components/ui/ButtonLink";
import InteractivePotato from "@/components/ui/InteractivePotato";

export const metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[44rem] px-5 py-24 text-center sm:py-32">
      <InteractivePotato className="mx-auto w-24" bubble="center" />
      <p className="hand mt-6 text-[1.8rem] leading-none text-rose-deep">404 · oops</p>
      <h1 className="display mx-auto mt-4 max-w-[14ch] text-[clamp(2.75rem,7vw,5rem)]">
        this page <em>wandered</em> off
      </h1>
      <p className="mt-4 text-espresso-soft">Even the potato can’t find it. Let’s get you back somewhere cozy.</p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" variant="primary">
          back home
        </ButtonLink>
        <ButtonLink href="/work">see my work</ButtonLink>
      </div>
    </section>
  );
}
