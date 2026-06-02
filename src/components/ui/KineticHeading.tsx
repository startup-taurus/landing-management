'use client';

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { maskReveal, staggerLines, VIEWPORT_DEFAULT } from "@/lib/animations";

type Tag = "h1" | "h2" | "h3" | "p" | "div" | "span";

interface KineticHeadingProps {
  /** Cada entrada es una línea; el corte de línea lo controla quien llama. */
  lines: ReactNode[];
  as?: Tag;
  className?: string;
  lineClassName?: string;
  once?: boolean;
  /** Si true, se anima al montar (no en viewport) — útil en el hero. */
  immediate?: boolean;
}

/**
 * Titular con revelado kinético: cada línea sube desde detrás de un recorte
 * (clip), en cascada. Reemplaza al fadeInUp genérico en los headings.
 */
export default function KineticHeading({
  lines,
  as = "h2",
  className,
  lineClassName,
  once = false,
  immediate = false,
}: KineticHeadingProps) {
  const MotionTag = motion[as] as typeof motion.h2;
  const animateProps = immediate
    ? { initial: "hidden" as const, animate: "visible" as const }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: { ...VIEWPORT_DEFAULT, once },
      };

  return (
    <MotionTag className={className} variants={staggerLines} {...animateProps}>
      {lines.map((line, i) => (
        <span key={i} className="kinetic-line">
          <motion.span
            variants={maskReveal}
            className={`inline-block ${lineClassName ?? ""}`}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
