import type { Metadata, Viewport } from "next";
import { Caveat, Figtree, Fraunces, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import MotionProvider from "@/components/MotionProvider";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CustomCursor from "@/components/CustomCursor";

/* The original pink-and-beige type system (recovered from commit d6497c0) */
const fraunces = Fraunces({ subsets: ["latin"], axes: ["SOFT", "opsz"], variable: "--font-fraunces", display: "swap" });
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-caveat", display: "block" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `Chloe’s World — Chloe Yun, UX & Product Design`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: {
    title: `Chloe’s World — Chloe Yun, UX & Product Design`,
    description: site.description,
    type: "website",
    siteName: site.name,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#fbf6ef" };

/* Decides before first paint whether the hand-drawn welcome plays: on entering the homepage,
   the first time only (remembered in this browser) — not for direct links (e.g. /#work or a case
   study) or for reduced-motion visitors. “replay the intro” in the footer clears the flag. */
const introScript = `(function(){var d=document.documentElement;try{var s=localStorage;if(location.pathname==="/"&&!location.hash&&!s.getItem("intro-seen")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){s.setItem("intro-seen","1");d.dataset.intro="play"}else d.dataset.intro="skip"}catch(e){d.dataset.intro="skip"}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${figtree.variable} ${instrument.variable} ${caveat.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <MotionProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-[10px] focus:bg-espresso focus:px-4 focus:py-2 focus:text-ivory"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <CustomCursor />
        </MotionProvider>
      </body>
    </html>
  );
}
