import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#A78BFA",
        background: "#F6F7FB",
        surface: "#FFFFFF",
        text: {
          primary: "#111827",
          secondary: "#6B7280",
        },
        accent: "#14B8A6",
        success: "#16A34A",
        warning: "#F59E0B",
        danger: "#DC2626",
      },
      boxShadow: {
        soft: "0 20px 45px -25px rgba(79, 70, 229, 0.35)",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "identity-glow":
          "radial-gradient(circle at top, rgba(167, 139, 250, 0.28), transparent 40%), radial-gradient(circle at bottom right, rgba(20, 184, 166, 0.18), transparent 28%)",
      },
    },
  },
  plugins: [],
};

export default config;
