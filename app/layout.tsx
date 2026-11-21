import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter_Tight, JetBrains_Mono, Nanum_Pen_Script } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import MotionProvider from "@/components/MotionProvider";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CustomCursor from "@/components/CustomCursor";

const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains", display: "swap" });
const pen = Nanum_Pen_Script({ subsets: ["latin"], weight: "400", variable: "--font-pen", display: "block" });
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — UX & Product Design Portfolio`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: {
    title: `${site.name} — UX & Product Design Portfolio`,
    description: site.description,
    type: "website",
    siteName: site.name,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#fbf6ef" };

/* Decides before first paint whether the hand-drawn intro plays: on entering the homepage,
   once per browser session — not for direct links (e.g. /#work or a case study) or for
   reduced-motion visitors, who get the finished Michigan print right away. */
const introScript = `(function(){var d=document.documentElement;try{var s=sessionStorage;if(location.pathname==="/"&&!location.hash&&!s.getItem("intro-seen")&&!matchMedia("(prefers-reduced-motion: reduce)").matches){s.setItem("intro-seen","1");d.dataset.intro="play"}else d.dataset.intro="skip"}catch(e){d.dataset.intro="skip"}})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${interTight.variable} ${jetbrains.variable} ${instrument.variable} ${pen.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <MotionProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:bg-fg focus:px-4 focus:py-2 focus:text-bg"
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
