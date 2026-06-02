'use client';

import { motion } from "framer-motion";
import { FolderPlus, UserPlus, LayoutList, LineChart, type LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { staggerCards, VIEWPORT_DEFAULT } from "@/lib/animations";

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    icon: FolderPlus,
    title: "Crea tu espacio",
    description: "Abre tu espacio de trabajo y arma tu primer proyecto en segundos.",
  },
  {
    icon: UserPlus,
    title: "Invita a tu equipo",
    description: "Suma a tu equipo por correo y asigna roles y permisos.",
  },
  {
    icon: LayoutList,
    title: "Organiza en tableros",
    description: "Crea tareas, asígnalas y ordénalas en la vista que prefieras.",
  },
  {
    icon: LineChart,
    title: "Mide el progreso",
    description: "Sigue el avance y la carga del equipo con dashboards en vivo.",
  },
];

const stepEnter = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="relative py-24 sm:py-28 overflow-hidden bg-[#0A0F1E]"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#10B981]/35 to-transparent"
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-20">
          <Reveal variant="up">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-[#34D399] mb-4">
              Cómo funciona
            </span>
          </Reveal>
          <Reveal variant="up" delay={0.05}>
            <h2 className="font-sora font-bold text-white mb-4" style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}>
              De cero a equipo organizado en{" "}
              <span className="text-aurora">cuatro pasos</span>
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <p className="font-inter text-[#A6B0C9] text-lg leading-relaxed">
              Sin instalaciones ni configuración técnica. Empiezas hoy mismo.
            </p>
          </Reveal>
        </div>

        <div className="relative">
          {/* Línea conectora que se "dibuja" al entrar en vista (desktop) */}
          <div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px">
            <div className="absolute inset-0 bg-[#26304A]" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
              className="absolute inset-0 bg-gradient-to-r from-[#10B981] via-[#14B8A6] to-[#8B5CF6]"
            />
          </div>

          <motion.div
            variants={staggerCards}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_DEFAULT}
            className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
          >
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.title} variants={stepEnter} className="relative text-center lg:text-left">
                  <div className="flex lg:block items-center gap-4">
                    <div className="relative shrink-0 mx-auto lg:mx-0">
                      <span
                        className="relative z-10 inline-flex w-14 h-14 items-center justify-center rounded-2xl text-white shadow-[0_10px_30px_-8px_rgba(16,185,129,0.6)]"
                        style={{ background: "linear-gradient(135deg,#10B981,#14B8A6 55%,#8B5CF6)" }}
                      >
                        <Icon className="w-6 h-6" strokeWidth={1.8} />
                      </span>
                      <span className="absolute -top-2 -right-2 z-20 w-6 h-6 rounded-full bg-[#0A0F1E] border border-[#26304A] flex items-center justify-center font-sora text-[11px] font-bold text-[#34D399]">
                        {i + 1}
                      </span>
                    </div>
                    <div className="text-left">
                      <h3 className="font-sora font-semibold text-white text-lg mt-0 lg:mt-6 mb-1.5">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="font-inter text-[#A6B0C9] text-sm leading-relaxed mt-2 lg:pr-4">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
