/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Every color reads from a CSS variable (src/styles/index.css) so the
        // light/dark themes swap with one attribute on <html>. The
        // rgb(var(--x) / <alpha-value>) form keeps opacity utilities
        // like bg-accent/10 working in both themes.
        bg: {
          primary: "rgb(var(--color-bg-primary) / <alpha-value>)",
          surface: "rgb(var(--color-bg-surface) / <alpha-value>)",
          surface2: "rgb(var(--color-bg-surface2) / <alpha-value>)",
          raised: "rgb(var(--color-bg-raised) / <alpha-value>)",
        },
        border: {
          DEFAULT: "rgb(var(--color-border) / <alpha-value>)",
          soft: "rgb(var(--color-border-soft) / <alpha-value>)",
        },
        text: {
          primary: "rgb(var(--color-text-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-text-secondary) / <alpha-value>)",
          tertiary: "rgb(var(--color-text-tertiary) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "rgb(var(--color-accent) / <alpha-value>)",
          dim: "rgb(var(--color-accent-dim) / <alpha-value>)",
          contrast: "rgb(var(--color-accent-contrast) / <alpha-value>)",
        },
        saffron: "rgb(var(--color-saffron) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        danger: "rgb(var(--color-danger) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Figtree", "system-ui", "sans-serif"],
        display: ["Bricolage Grotesque", "Figtree", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      // Larger type scale: every text-* utility in the app picks this up.
      fontSize: {
        xs: ["0.875rem", { lineHeight: "1.25rem" }],     // 14
        sm: ["1rem", { lineHeight: "1.5rem" }],           // 16
        base: ["1.125rem", { lineHeight: "1.75rem" }],    // 18
        lg: ["1.25rem", { lineHeight: "1.85rem" }],       // 20
        xl: ["1.4375rem", { lineHeight: "2rem" }],        // 23
        "2xl": ["1.75rem", { lineHeight: "2.2rem" }],     // 28
        "3xl": ["2.25rem", { lineHeight: "2.6rem" }],     // 36
        "4xl": ["2.875rem", { lineHeight: "3.2rem" }],    // 46
        "5xl": ["3.5rem", { lineHeight: "3.8rem" }],      // 56
        "6xl": ["4.25rem", { lineHeight: "4.4rem" }],     // 68
        "7xl": ["5rem", { lineHeight: "5rem" }],          // 80
      },
      boxShadow: {
        card: "0 0 0 1px rgb(var(--color-border)), 0 1px 2px rgb(0 0 0 / 0.04), 0 8px 24px rgb(0 0 0 / 0.05)",
        "card-hover": "0 0 0 1px rgb(var(--color-accent) / 0.4), 0 12px 30px rgb(0 0 0 / 0.09)",
        pop: "0 0 0 1px rgb(var(--color-border)), 0 18px 48px rgb(0 0 0 / 0.14)",
      },
      borderRadius: { sm: "10px", md: "14px", lg: "22px", xl: "30px" },
      keyframes: {
        roadDash: { from: { strokeDashoffset: "0" }, to: { strokeDashoffset: "-80" } },
      },
      animation: { "road-dash": "roadDash 2.2s linear infinite" },
      // Wider than before (was 1280px) so laptop screens use the full width.
      maxWidth: { content: "1680px" },
    },
  },
  plugins: [],
};
