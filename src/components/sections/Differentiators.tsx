'use client';

import { motion } from "framer-motion";
import { Feather, Zap, LayoutGrid, Globe, type LucideIcon } from "lucide-react";
import KineticHeading from "@/components/ui/KineticHeading";
import { staggerCards, fadeInUp, VIEWPORT_DEFAULT, EASE_LUX } from "@/lib/animations";

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

const rowEnter = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_LUX } },
};

export default function Differentiators() {
  return (
    <section id="diferenciadores" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="relative max-w-7xl 2xl:max-w-[1500px] mx-auto px-6 sm:px-8 2xl:px-12 grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 2xl:gap-24">
        {/* Intro (sticky en desktop) */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_DEFAULT}
            className="flex items-center gap-3 mb-5"
          >
            <span className="h-px w-9 bg-gradient-to-r from-[#34D399] to-transparent" />
            <span className="eyebrow text-[#6EE7B7]">Por qué Flujora</span>
          </motion.div>
          <KineticHeading
            as="h2"
            className="font-display font-semibold text-white"
            lines={[
              <span key="l1" style={{ fontSize: "clamp(28px, 3.4vw, 46px)" }}>
                Toda la potencia,
              </span>,
              <span key="l2" style={{ fontSize: "clamp(28px, 3.4vw, 46px)" }}>
                nada de lo que <span className="display-italic text-aurora">estorba</span>.
              </span>,
            ]}
          />
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_DEFAULT}
            className="font-inter text-[#A6B0C9] text-lg leading-relaxed mt-5 max-w-md"
          >
            Diseñado para que el equipo se enfoque en avanzar, no en aprender a usar
            una herramienta.
          </motion.p>
        </div>

        {/* Lista editorial numerada */}
        <motion.div
          variants={staggerCards}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_DEFAULT}
          className="flex flex-col"
        >
          {ITEMS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={rowEnter}
                className="group relative flex gap-5 sm:gap-7 py-7 border-t border-[#26304A] transition-colors duration-300 hover:border-[#34304A]"
              >
                {/* Barra de acento que crece en hover */}
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-px w-0 transition-[width] duration-500 ease-out group-hover:w-full"
                  style={{ background: `linear-gradient(90deg, ${item.accent}, transparent)` }}
                />
                <div className="shrink-0 pt-1">
                  <span
                    className="font-mono text-sm transition-colors duration-300"
                    style={{ color: `${item.accent}` }}
                  >
                    0{i + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="grid place-items-center w-10 h-10 rounded-xl border transition-transform duration-300 group-hover:-translate-y-0.5"
                      style={{ borderColor: `${item.accent}40`, background: `${item.accent}14`, color: item.accent }}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.7} />
                    </span>
                    <h3 className="font-display font-semibold text-white text-xl leading-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="font-inter text-[#A6B0C9] text-[15px] leading-relaxed sm:pl-[52px]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
          <span className="border-t border-[#26304A]" />
        </motion.div>
      </div>
    </section>
  );
}
