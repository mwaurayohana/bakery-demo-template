import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        cocoa: "#3B2A23",
        berry: "#9E2A46",
        saffron: "#F2B84B",
        mint: "#74B49B",
        paper: "#FFF8EE",
        cream: "#F7E6C8"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Georgia", "ui-serif", "serif"]
      },
      boxShadow: {
        soft: "0 18px 50px rgba(59, 42, 35, 0.14)"
      }
    }
  },
  plugins: []
};

export default config;
