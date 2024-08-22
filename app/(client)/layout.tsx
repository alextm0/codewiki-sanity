import type { Metadata } from "next";
import "./globals.css";
import CustomThemeProvider from "../providers/CustomThemeProvider";
import Navbar from "../components/Navbar";
import ThemeSwitcher from "../components/ThemeSwitcher"; // Import the ThemeSwitcher to apply light mode

import { ViewTransitions } from "next-view-transitions";
import Footer from "../components/Footer";

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
      <html lang="en" className="font-poppins overflow-x-hidden bg-background-50">
        <body className="h-full overflow-x-hidden">
          <CustomThemeProvider>
            {/* <ThemeSwitcher /> */}
            <Navbar />
            <main className="overflow-x-hidden">{children}</main>
            <Footer />
          </CustomThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
