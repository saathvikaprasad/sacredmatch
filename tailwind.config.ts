import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#102A43",
        slate: "#486581",
        sand: "#F7F3EB",
        coral: "#D86C5B",
        moss: "#5B7C65"
      },
      boxShadow: {
        soft: "0 18px 45px rgba(16, 42, 67, 0.08)"
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(circle at top left, rgba(216, 108, 91, 0.18), transparent 40%), radial-gradient(circle at bottom right, rgba(91, 124, 101, 0.2), transparent 35%)"
      }
    }
  },
  plugins: []
};

export default config;
