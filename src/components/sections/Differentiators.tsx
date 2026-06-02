'use client';

import { motion } from "framer-motion";
import { Feather, Zap, LayoutGrid, Globe, type LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import CursorSpotlight from "@/components/ui/CursorSpotlight";
import { staggerCards, fadeInUp, VIEWPORT_DEFAULT } from "@/lib/animations";

interface Item {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
}

const ITEMS: Item[] = [
  {
    icon: Feather,
    title: "Liviano, no abrumador",
    description:
      "Lo esencial de la gestión de proyectos, sin menús infinitos ni curva de aprendizaje. Tu equipo lo usa desde el primer día.",
    accent: "#34D399",
  },
  {
    icon: Zap,
    title: "Listo en minutos",
    description:
      "Crea tu espacio, invita a tu equipo y empieza a trabajar. Sin instalaciones, sin configuración técnica.",
    accent: "#14B8A6",
  },
  {
    icon: LayoutGrid,
    title: "Una vista para cada persona",
    description:
      "Las mismas tareas como lista, tablero, calendario o cronograma. Cada quien trabaja como prefiere, todo sincronizado.",
    accent: "#8B5CF6",
  },
  {
    icon: Globe,
    title: "Pensado para LATAM",
    description:
      "En español, con soporte cercano y pagos locales con tarjeta. Hecho para la realidad de los equipos de la región.",
    accent: "#6366F1",
  },
];

export default function Differentiators() {
  return (
    <section
      id="diferenciadores"
      className="relative py-24 sm:py-28 overflow-hidden bg-[#0E1525]"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#10B981]/35 to-transparent"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <Reveal variant="up">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-[#34D399] mb-4">
              Por qué Matriarca
            </span>
          </Reveal>
          <Reveal variant="up" delay={0.05}>
            <h2
              className="font-sora font-bold text-white mb-4"
              style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}
            >
              Toda la potencia que necesitas,{" "}
              <span className="text-aurora">nada de lo que estorba</span>
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <p className="font-inter text-[#A6B0C9] text-lg leading-relaxed">
              Diseñado para que el equipo se enfoque en avanzar, no en aprender a usar
              una herramienta.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={staggerCards}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_DEFAULT}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
        >
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div key={item.title} variants={fadeInUp}>
                <TiltCard intensity={5} className="h-full">
                  <CursorSpotlight
                    className="group h-full rounded-card"
                    color={`${item.accent}26`}
                  >
                    <div className="relative h-full rounded-card border border-[#26304A] bg-[#131B2E] p-6 transition-colors duration-300 hover:border-white/15 overflow-hidden">
                      <span
                        className="inline-flex w-11 h-11 items-center justify-center rounded-xl mb-5"
                        style={{ background: `${item.accent}1f`, color: item.accent }}
                      >
                        <Icon className="w-5 h-5" strokeWidth={1.8} />
                      </span>
                      <h3 className="font-sora font-semibold text-white text-lg mb-2 leading-tight">
                        {item.title}
                      </h3>
                      <p className="font-inter text-[#A6B0C9] text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </CursorSpotlight>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
