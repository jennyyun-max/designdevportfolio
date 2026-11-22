import Image from "next/image";
import Link from "next/link";
import { artPreview } from "@/content/art";

/* Homepage: a small door into the art portfolio, below the projects */
export default function ArtPreview() {
  return (
    <section aria-labelledby="art-preview-heading" className="mx-auto max-w-[1600px] px-5 pt-24 sm:px-8 md:pt-32">
      <div className="grid gap-6 border-t border-ink pt-5 md:grid-cols-12">
        <p className="meta text-muted md:col-span-3">(03) Art</p>
        <Link href="/art" className="group grid gap-6 md:col-span-9 md:grid-cols-9 md:items-end" data-cursor="view">
          <span className="block overflow-hidden md:col-span-5">
            <Image
              src={artPreview.image.src}
              alt={artPreview.image.alt}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="block h-auto w-full transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.02]"
            />
          </span>
          <span className="md:col-span-4">
            <span id="art-preview-heading" className="display block text-[clamp(2rem,3.6vw,3.4rem)] leading-none">
              Art <em>portfolio</em>
            </span>
            <span className="wipe mt-4 inline-block text-[0.95rem]">View art portfolio →</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
