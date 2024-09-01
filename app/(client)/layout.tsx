// /app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import CustomThemeProvider from "../providers/CustomThemeProvider";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ViewTransitions } from "next-view-transitions";

import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  metadataBase: new URL("https://codewiki-sanity.vercel.app/"),
  title: {
    default: "CodeWiki - Competitive Programming Blog",
    template: "%s | CodeWiki - Competitive Programming Blog",
  },
  description:
    "CodeWiki is a comprehensive blog for students focused on competitive programming, offering tutorials, problem-solving techniques, and programming contests preparation.",
  openGraph: {
    title: "CodeWiki - Competitive Programming Blog",
    description:
      "Explore CodeWiki for the best resources on competitive programming. Learn, practice, and excel in programming contests with our expert tutorials and guides.",
    type: "website",
    locale: "en_US",
    url: "https://codewiki-sanity.vercel.app/",
    siteName: "CodeWiki",
  },
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
            crossOrigin="anonymous"
          />
          
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
      </html>
    </ViewTransitions>
  );
}
