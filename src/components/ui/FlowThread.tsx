'use client';

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

/**
 * "Hilo de flujo": una espina luminosa que recorre toda la página y se DIBUJA
 * con el scroll (pathLength ligado al progreso de scroll de la página). Da
 * continuidad visual entre secciones — el ojo sigue la corriente, no saltos de
 * bloque. Se renderiza dentro de un contenedor relative de altura completa,
 * detrás del contenido. Barato: una sola motion.path.
 */
export default function FlowThread() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const drawn = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.5 });

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 6000"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient id="flow-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="45%" stopColor="#14B8A6" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>

        {/* Track tenue (siempre visible) */}
        <path
          d="M600 0 C 760 650, 440 1300, 600 1950 S 780 3250, 600 3900 S 430 5050, 600 6000"
          stroke="rgba(166,176,201,0.06)"
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />

        {/* Espina luminosa que se dibuja con el scroll (sin filtro: GPU-friendly) */}
        <motion.path
          d="M600 0 C 760 650, 440 1300, 600 1950 S 780 3250, 600 3900 S 430 5050, 600 6000"
          stroke="url(#flow-grad)"
          strokeWidth={2}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength: reduce ? 1 : drawn }}
        />
      </svg>
    </div>
  );
}
