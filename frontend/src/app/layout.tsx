import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PageTransition } from "@/components/PageTransition";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "PulseAI - Enterprise Field Intelligence & AI Auditing Platform",
  description: "Unified AI engine for global mystery shopping, retail shelf planogram audits, and multi-modal computer vision operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark scroll-smooth ${plusJakarta.variable} ${outfit.variable}`}>
      <body className="antialiased min-h-screen selection:bg-indigo-500 selection:text-white flex flex-col font-sans bg-[var(--bg-main)] text-[var(--text-primary)]">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
          <FloatingCTA />
        </ThemeProvider>
      </body>
    </html>
  );
}
