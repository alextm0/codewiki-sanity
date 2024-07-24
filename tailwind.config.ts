import type { Config } from "tailwindcss";
const defaultTheme = require('tailwindcss/defaultTheme');


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
        pattern: "url('/assets/bg-pattern.png')",
      },
      colors: {
        primary: {
          "50": "#eef2ff",
          "100": "#e0e7ff",
          "200": "#c7d2fe",
          "300": "#a5b4fc",
          "400": "#818cf8",
          "500": "#6366f1",
          "600": "#4f46e5",
          "700": "#4338ca",
          "800": "#3730a3",
          "900": "#312e81",
          "950": "#1e1b4b"
        }
      },
      fontFamily: {
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
        righteous: ['Righteous', ...defaultTheme.fontFamily.sans],
        inter: ['Inter', ...defaultTheme.fontFamily.sans],
        montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
