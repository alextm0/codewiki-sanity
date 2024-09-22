// /app/layout.tsx

import React from 'react';
import type { Metadata } from "next";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";
import { GoogleAnalytics } from '@next/third-parties/google'
import CustomThemeProvider from "../providers/CustomThemeProvider";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import HeadContent from "../components/layout/HeadContent";
import ScriptContent from '../components/layout/ScriptContent'

export const metadata: Metadata = {
  metadataBase: new URL("https://www.codewiki.blog/"),
  title: {
    default: "CodeWiki - Blog de Programare Competitivă și Algoritmi",
    template: "%s | CodeWiki - Programare Competitivă și Algoritmi",
  },
  description:
    "CodeWiki este un blog complet dedicat elevilor care vor să învețe programare competitivă. Oferim tutoriale detaliate, tehnici de rezolvare a problemelor, și pregătire pentru olimpiada de informatica.",
  openGraph: {
    title: "CodeWiki - Blog de Programare Competitivă și Algoritmi",
    description:
      "Descoperă CodeWiki pentru cele mai bune resurse despre programare competitivă. Învață, exersează și excelează în concursurile de programare cu tutorialele și ghidurile noastre experte.",
    type: "website",
    locale: "ro_RO",
    url: "https://www.codewiki.blog/",
    siteName: "CodeWiki",
  },
  icons: '/favicon.ico',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewTransitions>
      <html lang="en" className="overflow-x-hidden bg-background-50 h-full">
        <HeadContent />
        <body className="h-full flex flex-col">
          <CustomThemeProvider>
            <Navbar />
            <main className="flex-grow pb-20">
              {children}
              <SpeedInsights />
            </main>
            <Footer />
          </CustomThemeProvider>
        </body>
        <GoogleAnalytics gaId="G-KFCH7S7CYH" />
        <ScriptContent />
      </html>
    </ViewTransitions>
  );
}
