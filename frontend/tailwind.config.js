/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Charged Night — Atlas EV design system (see design spec §4.1)
        bg: {
          primary: "#0A0D10",
          surface: "#12171C",
          surface2: "#1A2129",
          raised: "#1E262E",
        },
        border: {
          DEFAULT: "#232C33",
          soft: "#1B2228",
        },
        accent: {
          DEFAULT: "#39E6A0",
          dim: "#1E8F63",
          soft: "rgba(57, 230, 160, 0.12)",
          glow: "rgba(57, 230, 160, 0.35)",
        },
        info: "#4C8DFF",
        warning: "#FFB020",
        danger: "#FF5C5C",
        text: {
          primary: "#F5F7FA",
          secondary: "#9AA5B1",
          tertiary: "#5C6672",
        },
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        display: ["Outfit", "sans-serif"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(57,230,160,0.06), transparent 60%)",
        "radial-glow":
          "radial-gradient(circle at 50% 0%, rgba(57,230,160,0.18), transparent 60%)",
        "hero-mesh":
          "radial-gradient(circle at 15% 20%, rgba(57,230,160,0.10), transparent 40%), radial-gradient(circle at 85% 10%, rgba(76,141,255,0.08), transparent 45%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(57,230,160,0.25), 0 8px 30px rgba(57,230,160,0.15)",
        "glow-lg": "0 0 0 1px rgba(57,230,160,0.2), 0 20px 60px rgba(57,230,160,0.18)",
        card: "0 0 0 1px #232C33, 0 8px 24px rgba(0,0,0,0.35)",
        "card-hover": "0 0 0 1px rgba(57,230,160,0.35), 0 12px 32px rgba(0,0,0,0.45)",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "20px",
        xl: "28px",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 12s linear infinite",
        float: "float 6s ease-in-out infinite",
        "flow-line": "flowLine 2.4s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        flowLine: {
          "0%": { strokeDashoffset: "40" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      maxWidth: {
        content: "1280px",
      },
    },
  },
  plugins: [],
};
