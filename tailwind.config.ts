import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        dark: "bg-gradient-to-r from-[#000] to-[#0A1428]",
        light: "#FFF",
      },
      colors: {
        "font-gold": "#C89B3C",
      },
    },
  },
  plugins: [],
};
export default config;
