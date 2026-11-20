import Link from "next/link";
import { site } from "@/content/site";
import Container from "./ui/Container";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container className="flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <Link href="/" className="display text-2xl">
            Chloe Yun
          </Link>
          <p className="mt-3 max-w-[22rem] text-sm text-muted">
            Exploring the space between data, technology, and people. Ann Arbor, MI.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="mono flex flex-wrap gap-x-6 gap-y-2 text-[0.75rem] uppercase tracking-[0.08em]">
            <li><Link href="/" className="link">home</Link></li>
            <li><Link href="/#work" className="link">work</Link></li>
            <li><Link href="/#about" className="link">about</Link></li>
            <li><Link href="/#contact" className="link">contact</Link></li>
          </ul>
        </nav>
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {site.name} · Ann Arbor, MI
        </p>
      </Container>
    </footer>
  );
}
