import type { Metadata, Viewport } from "next";
import { DM_Sans, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import MotionProvider from "@/components/MotionProvider";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CustomCursor from "@/components/CustomCursor";

/* Instrument Serif is carried over from the original portfolio (it was the italic accent);
   here it becomes the display face. DM Sans for text, IBM Plex Mono for metadata. */
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — Design / Technology / Creative Exploration`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: {
    title: `${site.name} — Design / Technology / Creative Exploration`,
    description: site.description,
    type: "website",
    siteName: site.name,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#f3f0e9" };

/* Decides before first paint whether the welcome shows: on entering the homepage, until the
   visitor has explored once in this browser (the Welcome component saves that). Never for
   direct links like /#work or a case study. “Replay the intro” in the footer clears the flag. */
const introScript = `(function(){var d=document.documentElement;try{if(location.pathname==="/"&&!location.hash&&!localStorage.getItem("intro-seen")){d.dataset.intro="play"}else d.dataset.intro="skip"}catch(e){d.dataset.intro="skip"}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrument.variable} ${dmSans.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <MotionProvider>
          <a href="#main" className="meta sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
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
