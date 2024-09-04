// /app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import CustomThemeProvider from "../providers/CustomThemeProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ViewTransitions } from "next-view-transitions";

import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

import { GoogleAnalytics } from '@next/third-parties/google'

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
        <head>
        <Script
            id="gtm-head"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-NCFGTGC');`,
            }}
          ></Script>

          {/* Preload key fonts */}
          <link
            rel="preload"
            href="/fonts/Poppins-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Poppins-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Poppins-Medium.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Poppins-Italic.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Poppins-ExtraBold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Righteous-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Inter/Inter_18pt-Regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Inter/Inter_18pt-Bold.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Inter/Inter_18pt-Medium.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          {/* Semibold, avoid italics */}
          <link
            rel="preload"
            href="/fonts/Inter/Inter_18pt-SemiBold.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          {/* Preload key images */}

          <link
            rel="preload"
            href="/assets/optimized-bg-pattern.png"
            as="image"
            type="image/png"
            crossOrigin="use-credentials"
          />

          <Script
            id="gtm"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `<!-- Google tag (gtag.js) -->
                        <script async src="https://www.googletagmanager.com/gtag/js?id=G-KFCH7S7CYH"></script>
                        <script>
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());

                          gtag('config', 'G-KFCH7S7CYH');
                        </script>`,
            }}
          ></Script>
        </head>
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
      </html>
    </ViewTransitions>
  );
}
