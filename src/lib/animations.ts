import type { Variants } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const fadeInMockup: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, delay: 0.4, ease: easeOut },
  },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: easeOut },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

// Entrada enfocada: escala + desenfoque -> nítido. Útil para tarjetas y mockups.
export const focusIn: Variants = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(14px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: easeOut },
  },
};

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.7, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.34, 1.56, 0.64, 1] },
  },
};

// ── Easing / springs reutilizables ──────────────────────────────────────────
export const EASE_OUT = easeOut;
// Curva "cara"/editorial: arranca rápido, asienta muy lento.
export const EASE_LUX = [0.22, 1, 0.36, 1] as const;
export const SPRING_SOFT = { stiffness: 120, damping: 26, mass: 0.6 } as const;
export const SPRING_SNAPPY = { stiffness: 320, damping: 24, mass: 0.5 } as const;
export const SPRING_FLOAT = { stiffness: 80, damping: 18, mass: 0.8 } as const;

// ── Revelados editoriales (reemplazan al fadeInUp universal) ─────────────────
// Máscara línea por línea: el texto sube desde detrás de un recorte.
export const maskReveal: Variants = {
  hidden: { y: "115%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: EASE_LUX } },
};

// Cortina por clip-path (de izquierda a derecha).
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 1.1, ease: EASE_LUX } },
};

export const staggerLines: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

export const staggerHero: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

export const staggerCards: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const VIEWPORT_DEFAULT = { once: false, margin: "-80px" };

export async function initGSAP() {
  if (typeof window === "undefined") return { gsap: null, ScrollTrigger: null };

  const { gsap } = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");

  gsap.registerPlugin(ScrollTrigger);

  return { gsap, ScrollTrigger };
}
