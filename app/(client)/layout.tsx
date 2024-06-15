import type { Metadata } from "next";
import { Inter, Poppins, Righteous } from "next/font/google";
import "./globals.css";
import CustomThemeProvider from "../providers/CustomThemeProvider";
import Navbar from "../components/Navbar";

const righteous = Righteous({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-righteous",
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://codewiki-sanity.vercel.app/"),
  title: {
    default: "CodeWiki - Competitive Programming Blog",
    template: '%s | CodeWiki - Competitive Programming Blog'
  },
  description: "CodeWiki is a comprehensive blog for students focused on competitive programming, offering tutorials, problem-solving techniques, and programming contests preparation.",
  openGraph: {
    title: "CodeWiki - Competitive Programming Blog",
    description: "Explore CodeWiki for the best resources on competitive programming. Learn, practice, and excel in programming contests with our expert tutorials and guides.",
    type: "website",
    locale: "en_US",
    url: "https://codewiki-sanity.vercel.app/",
    siteName: "CodeWiki"
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${righteous.variable} ${poppins.variable} ${inter.variable}`}
    >
      <body
        className={`${poppins.className} h-full`}
      >
        <CustomThemeProvider>
          <Navbar />
          <main className="">{children}</main>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
