'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { FolderPlus, UserPlus, LayoutList, LineChart, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import KineticHeading from "@/components/ui/KineticHeading";
import { fadeInUp, VIEWPORT_DEFAULT } from "@/lib/animations";

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

function StepNode({
  step,
  index,
  progress,
}: {
  step: Step;
  index: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const Icon = step.icon;
  // Cada nodo se "enciende" cuando el progreso del scroll pasa su umbral.
  const threshold = index / STEPS.length;
  const next = (index + 0.6) / STEPS.length;
  const glow = useTransform(progress, [threshold, next], [0, 1]);
  const ringColor = useTransform(progress, [threshold, next], ["#26304A", "#34D399"]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_DEFAULT}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="relative flex lg:flex-col items-start gap-4 lg:gap-0"
    >
      <div className="relative shrink-0 lg:mb-6">
        <motion.span
          className="relative z-10 grid place-items-center w-14 h-14 rounded-2xl border-2 bg-[#0A0F1E]"
          style={{ borderColor: ringColor }}
        >
          <Icon className="w-6 h-6 text-white" strokeWidth={1.7} />
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-2xl"
            style={{
              opacity: glow,
              boxShadow: "0 0 32px -4px rgba(16,185,129,0.7)",
              background: "radial-gradient(circle, rgba(16,185,129,0.18), transparent 70%)",
            }}
          />
        </motion.span>
        <span className="absolute -top-2 -right-2 z-20 grid place-items-center w-6 h-6 rounded-full bg-[#0E1525] border border-[#26304A] font-mono text-[11px] font-semibold text-[#34D399]">
          {index + 1}
        </span>
      </div>
      <div className="lg:pr-4">
        <h3 className="font-display font-semibold text-white text-lg mb-1.5">{step.title}</h3>
        <p className="font-inter text-[#A6B0C9] text-sm leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="como-funciona" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-14 sm:mb-20">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_DEFAULT}
            className="flex items-center gap-3 mb-5"
          >
            <span className="h-px w-9 bg-gradient-to-r from-[#34D399] to-transparent" />
            <span className="eyebrow text-[#6EE7B7]">Cómo funciona</span>
          </motion.div>
          <KineticHeading
            as="h2"
            className="font-display font-semibold text-white"
            lines={[
              <span key="l1" style={{ fontSize: "clamp(28px, 3.6vw, 46px)" }}>
                De cero a equipo organizado
              </span>,
              <span key="l2" style={{ fontSize: "clamp(28px, 3.6vw, 46px)" }}>
                en <span className="display-italic text-aurora">cuatro pasos</span>.
              </span>,
            ]}
          />
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_DEFAULT}
            className="font-inter text-[#A6B0C9] text-lg leading-relaxed mt-5"
          >
            Sin instalaciones ni configuración técnica. Empiezas hoy mismo.
          </motion.p>
        </div>

        <div ref={ref} className="relative">
          {/* Línea conectora que se llena con el scroll (desktop) */}
          <div className="hidden lg:block absolute top-7 left-[7%] right-[7%] h-px">
            <div className="absolute inset-0 bg-[#26304A]" />
            <motion.div
              style={{ scaleX: lineScale, originX: 0 }}
              className="absolute inset-0 bg-gradient-to-r from-[#10B981] via-[#14B8A6] to-[#8B5CF6]"
            />
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {STEPS.map((step, i) => (
              <StepNode key={step.title} step={step} index={i} progress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
