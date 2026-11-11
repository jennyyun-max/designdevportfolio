import Link from "next/link";
import { site } from "@/content/site";
import Container from "./ui/Container";
import Potato from "./ui/Potato";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ivory">
      <Container className="flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <Link href="/" className="group inline-flex items-center gap-2.5">
            <Potato className="wiggle-on-hover h-7 w-7" />
            <span className="display text-2xl tracking-[-0.02em]">
              chloe <em>yun</em>
            </span>
          </Link>
          <p className="mt-3 max-w-[22rem] text-sm text-espresso-soft">
            Aspiring UX & product designer at the University of Michigan School of Information.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
            <li><Link href="/" className="link">home</Link></li>
            <li><Link href="/#work" className="link">work</Link></li>
            <li><Link href="/#about" className="link">about</Link></li>
            <li><Link href="/#contact" className="link">contact</Link></li>
          </ul>
        </nav>
        <p className="text-sm text-espresso-soft">
          © {new Date().getFullYear()} {site.name} · designed & built with care
        </p>
      </Container>
    </footer>
  );
}
