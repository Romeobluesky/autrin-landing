import type { Config } from "tailwindcss";

/**
 * AUTRIN Design System — "Autrin Kinetic Dark"
 * Source: .docs/stitch_autrim_automotive_website_homepage/DESIGN.md
 */
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Surface system
        surface: "#001230",
        "surface-dim": "#001230",
        "surface-bright": "#25395d",
        "surface-container-lowest": "#000d27",
        "surface-container-low": "#021b3e",
        "surface-container": "#071f42",
        "surface-container-high": "#142a4d",
        "surface-container-highest": "#203458",
        "surface-variant": "#203458",
        "surface-tint": "#a1c9ff",
        background: "#001230",

        // Content
        "on-surface": "#d7e2ff",
        "on-surface-variant": "#c1c7d2",
        "on-background": "#d7e2ff",
        "inverse-surface": "#d7e2ff",
        "inverse-on-surface": "#1b3054",

        // Outline
        outline: "#8b919c",
        "outline-variant": "#414751",

        // Primary
        primary: "#a1c9ff",
        "on-primary": "#00315b",
        "primary-container": "#5a9ae4",
        "on-primary-container": "#003059",
        "inverse-primary": "#0860a7",
        "primary-fixed": "#d3e4ff",
        "primary-fixed-dim": "#a1c9ff",
        "on-primary-fixed": "#001c38",
        "on-primary-fixed-variant": "#004880",

        // Secondary
        secondary: "#adc6ff",
        "on-secondary": "#002e6a",
        "secondary-container": "#0566d9",
        "on-secondary-container": "#e6ecff",
        "secondary-fixed": "#d8e2ff",
        "secondary-fixed-dim": "#adc6ff",
        "on-secondary-fixed": "#001a42",
        "on-secondary-fixed-variant": "#004395",

        // Tertiary
        tertiary: "#00daf3",
        "on-tertiary": "#00363d",
        "tertiary-container": "#00a6b9",
        "on-tertiary-container": "#00353c",
        "tertiary-fixed": "#9cf0ff",
        "tertiary-fixed-dim": "#00daf3",
        "on-tertiary-fixed": "#001f24",
        "on-tertiary-fixed-variant": "#004f58",

        // Error
        error: "#ffb4ab",
        "on-error": "#690005",
        "error-container": "#93000a",
        "on-error-container": "#ffdad6",

        // Brand anchors (AUTRIN_LandingPage_Plan.md)
        "tech-navy": "#00183B",
        "stark-white": "#FFFFFF",
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
      },
      spacing: {
        "gutter-xs": "0.25rem",
        "gutter-sm": "0.5rem",
        "gutter-md": "1rem",
        "gutter-lg": "1.5rem",
        "gutter-xl": "2.5rem",
        "section-sm": "4rem",
        "section-md": "6rem",
        "section-lg": "8rem",
        "container-max": "1280px",
      },
      fontFamily: {
        sora: ["var(--font-sora)", "sans-serif"],
        jakarta: ["var(--font-jakarta)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        "display-hero": ["var(--font-sora)", "sans-serif"],
        "display-hero-mobile": ["var(--font-sora)", "sans-serif"],
        "headline-lg": ["var(--font-sora)", "sans-serif"],
        "headline-lg-mobile": ["var(--font-sora)", "sans-serif"],
        "headline-md": ["var(--font-sora)", "sans-serif"],
        "headline-sm": ["var(--font-sora)", "sans-serif"],
        "body-xl": ["var(--font-jakarta)", "sans-serif"],
        "body-lg": ["var(--font-jakarta)", "sans-serif"],
        "body-md": ["var(--font-jakarta)", "sans-serif"],
        "body-sm": ["var(--font-jakarta)", "sans-serif"],
        "label-badge": ["var(--font-jakarta)", "sans-serif"],
        "label-code": ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        "display-hero": ["64px", { lineHeight: "74px", letterSpacing: "-0.025em", fontWeight: "700" }],
        "display-hero-mobile": ["38px", { lineHeight: "46px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg": ["44px", { lineHeight: "52px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-lg-mobile": ["28px", { lineHeight: "36px", letterSpacing: "-0.015em", fontWeight: "600" }],
        "headline-md": ["30px", { lineHeight: "38px", letterSpacing: "-0.015em", fontWeight: "600" }],
        "headline-sm": ["22px", { lineHeight: "30px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-xl": ["20px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "400" }],
        "body-lg": ["16px", { lineHeight: "26px", letterSpacing: "-0.005em", fontWeight: "400" }],
        "body-md": ["14px", { lineHeight: "22px", letterSpacing: "0em", fontWeight: "400" }],
        "body-sm": ["12px", { lineHeight: "18px", letterSpacing: "0em", fontWeight: "400" }],
        "label-code": ["13px", { lineHeight: "16px", letterSpacing: "0.04em", fontWeight: "500" }],
        "label-badge": ["11px", { lineHeight: "14px", letterSpacing: "0.08em", fontWeight: "700" }],
      },
      maxWidth: {
        container: "1280px",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
