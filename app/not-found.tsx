import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";

export const metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <section>
      <Container className="py-28 text-center sm:py-36">
        <p className="eyebrow">404</p>
        <h1 className="display mx-auto mt-8 max-w-[12ch] text-[clamp(2.75rem,7vw,5rem)]">
          This page <em>wandered</em> off.
        </h1>
        <p className="mt-4 text-muted">The page you’re looking for doesn’t exist.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/#work" variant="primary">see my work</ButtonLink>
          <ButtonLink href="/">go home</ButtonLink>
        </div>
      </Container>
    </section>
  );
}
