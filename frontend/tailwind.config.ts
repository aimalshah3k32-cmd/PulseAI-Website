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
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
      colors: {
        background: "var(--bg-main)",
        foreground: "var(--text-primary)",
      },
      boxShadow: {
        "3d-card": "0 25px 50px -12px rgba(99, 102, 241, 0.25), 0 0 0 1px rgba(99, 102, 241, 0.15)",
        "3d-emerald": "0 25px 50px -12px rgba(16, 185, 129, 0.25), 0 0 0 1px rgba(16, 185, 129, 0.15)",
        "3d-glow": "0 0 50px rgba(99, 102, 241, 0.35)",
        "3d-cyan": "0 0 50px rgba(6, 182, 212, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
