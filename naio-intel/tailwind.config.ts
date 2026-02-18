import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        naio: {
          bg: "#0A1628",
          "bg-deep": "#0D1117",
          "bg-card": "#0F2237",
          "bg-card-hover": "#122640",
          "bg-surface": "#1A3350",
          cyan: "#00BCD4",
          "cyan-light": "#00C8E0",
          teal: "#00BFA6",
          green: "#00E676",
          orange: "#FF9800",
          "orange-light": "#FFB74D",
          red: "#FF5252",
          purple: "#AB47BC",
          blue: "#3B9FE3",
          "blue-light": "#4FC3F7",
          "text-primary": "#FFFFFF",
          "text-secondary": "#B0C4D8",
          "text-muted": "#6B8FA3",
          "text-dim": "#4A5568",
          border: "#1A3A5C",
          "border-light": "#2A4A6C",
        },
      },
      fontFamily: {
        sans: ['"Segoe UI"', "Calibri", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
