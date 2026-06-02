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
      colors: {
        // Flujora brand tokens — base esmeralda/teal + acento violeta, tema oscuro.
        emerald: {
          DEFAULT: "#10B981",
          bright: "#34D399",
          deep: "#059669",
          soft: "#6EE7B7",
        },
        teal: {
          DEFAULT: "#14B8A6",
          deep: "#0D9488",
        },
        violet: {
          DEFAULT: "#8B5CF6",
          bright: "#A78BFA",
          deep: "#6D28D9",
          soft: "#C4B5FD",
        },
        indigo: {
          DEFAULT: "#6366F1",
          deep: "#4F46E5",
        },
        // Superficies oscuras (de más oscuro a más claro).
        bg: {
          DEFAULT: "#0A0F1E",
          soft: "#0E1525",
          surface: "#131B2E",
          elevated: "#1A2336",
        },
        border: "#26304A",
        text: {
          DEFAULT: "#F4F6FB",
          muted: "#A6B0C9",
          soft: "#D5DCEC",
        },
        light: {
          bg: "#F4F6FB",
          surface: "#FFFFFF",
          text: "#1B2335",
          muted: "#6B7280",
          border: "#E3E8F2",
        },
      },
      fontFamily: {
        // Tipografía editorial vía next/font/google (ver layout.tsx). Se conservan los
        // alias (font-sora / font-inter) para no romper componentes existentes:
        //   display (titulares) -> Fraunces (serif variable)
        //   body (cuerpo/UI)    -> Inter
        //   mono (etiquetas)    -> IBM Plex Mono
        display: ["var(--font-display)", "Georgia", "Cambria", "serif"],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        sora: ["var(--font-display)", "Georgia", "Cambria", "serif"],
        inter: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "20px",
        btn: "12px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.28)",
        "card-hover": "0 18px 48px rgba(0,0,0,0.40)",
        "glow-emerald": "0 18px 60px -10px rgba(16,185,129,0.45)",
        "glow-teal": "0 18px 60px -10px rgba(20,184,166,0.42)",
        "glow-violet": "0 18px 60px -10px rgba(139,92,246,0.40)",
      },
      backgroundImage: {
        "gradient-aurora":
          "linear-gradient(120deg, #10B981 0%, #14B8A6 45%, #8B5CF6 100%)",
        "gradient-mesh":
          "radial-gradient(at 18% 18%, rgba(16,185,129,0.16) 0%, transparent 50%), radial-gradient(at 82% 8%, rgba(139,92,246,0.16) 0%, transparent 50%), radial-gradient(at 50% 100%, rgba(20,184,166,0.10) 0%, transparent 55%)",
        "gradient-text-aurora":
          "linear-gradient(120deg, #34D399 0%, #14B8A6 45%, #A78BFA 100%)",
        "gradient-card-border":
          "linear-gradient(140deg, rgba(16,185,129,0.55), rgba(139,92,246,0.35) 55%, rgba(255,255,255,0))",
        noise:
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")",
      },
      keyframes: {
        "blob-drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -20px) scale(1.06)" },
          "66%": { transform: "translate(-20px, 30px) scale(0.96)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gradient-pan": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        // Deriva lenta de la aurora a nivel página (PageAtmosphere). Solo transform
        // (compositor GPU) para no recalcular el blur en cada frame.
        "aurora-pan": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(2%,-3%,0) scale(1.07)" },
        },
        // Pulso de los nodos del hilo de flujo / detalles vivos.
        "pulse-node": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.55" },
          "50%": { transform: "scale(1.35)", opacity: "1" },
        },
        // Parpadeo de cursor de texto (tarjeta "Documentos").
        caret: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        // Recorrido de un pulso por un conector (tarjeta "Automatizaciones").
        "flow-dash": {
          to: { strokeDashoffset: "-24" },
        },
        // Marquesina sutil para tiras de logos / sellos.
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "blob-drift": "blob-drift 18s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
        "gradient-pan": "gradient-pan 8s ease infinite",
        "aurora-pan": "aurora-pan 22s ease-in-out infinite",
        "pulse-node": "pulse-node 2.6s ease-in-out infinite",
        caret: "caret 1.1s step-end infinite",
        "flow-dash": "flow-dash 0.9s linear infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
