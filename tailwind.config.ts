import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--primary)",
          dark: "var(--primary-dark)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          dark: "var(--secondary-dark)",
        },
        accent: "var(--accent)",
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-dark": "var(--surface-dark)",
        "surface-light": "var(--surface-light)",
        white: "#FFFFFF",
        gray: {
          light: "var(--text-muted)", // mapped to text-muted for auto-switching
          DEFAULT: "#94A3B8",
        },
        // Add specific text colors if needed
        "text-main": "var(--text-main)",
        "text-muted": "var(--text-muted)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
        "oval": "100px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "purple-glow": "radial-gradient(circle, rgba(var(--primary-rgb), 0.15) 0%, transparent 70%)", // Now Blue glow
      },
      boxShadow: {
        neon: "0 0 15px rgba(var(--primary-rgb), 0.5), 0 0 30px rgba(var(--primary-rgb), 0.3)",
        "neon-purple": "0 0 15px rgba(var(--secondary-rgb), 0.5), 0 0 30px rgba(var(--secondary-rgb), 0.3)", // Now Deep Blue/Indigo
        glass: "0 8px 32px 0 rgba(var(--primary-rgb), 0.2)",
      },
    },
  },
  plugins: [],
};
export default config;
