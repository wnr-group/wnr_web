import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
import { Cursor } from "@/components/ui/Cursor";
import { MobileCTA } from "@/components/ui/MobileCTA";
import { site } from "@/lib/content";

import "@/styles/tokens.css";
import "@/styles/base.css";
import "@/styles/system.css";
import "@/styles/chrome.css";
import "@/styles/mockups.css";
import "@/styles/hero.css";
import "@/styles/sections.css";
import "@/styles/ai.css";
import "@/styles/pages.css";

const sans = Instrument_Sans({ subsets: ["latin"], variable: "--ff-sans", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--ff-serif", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--ff-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://wnradvisory.com"), // PLACEHOLDER domain
  title: { default: `${site.name} — Digital engineering studio`, template: `%s — ${site.name}` },
  description: site.description,
  openGraph: { title: site.name, description: site.description, type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#f1ede6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body id="top">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Cursor />
        <MobileCTA />
      </body>
    </html>
  );
}
