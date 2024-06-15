import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'pattern': "url('/assets/bg-pattern.png')",
      },

      fontFamily: {
        righteous: ['var(--font-righteous)'],
        poppins: ['var(--font-poppins)'],
        montserrat: ['var(--font-montserrat)'],
        inter: ['var(--font-inter)'],
      },
    }
  },
  plugins: [
    require("@tailwindcss/typography")
  ],
};
export default config;
