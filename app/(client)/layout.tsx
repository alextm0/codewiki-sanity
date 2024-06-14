import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import CustomThemeProvider from "../providers/CustomThemeProvider";
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} h-full bg-amber-50 text-indigo-500 dark:bg-slate-950 dark:text-amber-50`}
      >
        <CustomThemeProvider>
          <Navbar />
          <main className="mx-auto max-w-5xl px-6">{children}</main>
        </CustomThemeProvider>
      </body>
    </html>
  );
}