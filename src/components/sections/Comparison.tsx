'use client';

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Logo from "@/components/ui/Logo";
import KineticHeading from "@/components/ui/KineticHeading";
import { staggerCards, fadeInUp, popIn, VIEWPORT_DEFAULT } from "@/lib/animations";

interface Row {
  feature: string;
  flujora: string;
  heavy: string;
}

const ROWS: Row[] = [
  { feature: "Curva de aprendizaje", flujora: "Lo usas el primer día", heavy: "Semanas de capacitación" },
  { feature: "Vistas (lista, tablero, calendario, Gantt)", flujora: "Incluidas y sincronizadas", heavy: "Según el plan / complejas" },
  { feature: "Interfaz en español", flujora: "Nativa", heavy: "Parcial o traducida" },
  { feature: "Precio", flujora: "Claro y mensual", heavy: "Por add-ons y niveles" },
  { feature: "Pago local con tarjeta", flujora: "Payphone (Ecuador)", heavy: "Solo tarjetas internacionales" },
  { feature: "Soporte", flujora: "Cercano, por WhatsApp", heavy: "Tickets en inglés" },
  { feature: "Velocidad de la app", flujora: "Liviana y rápida", heavy: "Pesada con tantos módulos" },
];

export default function Comparison() {
  return (
    <section id="comparativa" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="relative max-w-5xl mx-auto px-6">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_DEFAULT}
            className="flex items-center gap-3 mb-5"
          >
            <span className="h-px w-9 bg-gradient-to-r from-[#34D399] to-transparent" />
            <span className="eyebrow text-[#6EE7B7]">Comparativa</span>
          </motion.div>
          <KineticHeading
            as="h2"
            className="font-display font-semibold text-white"
            lines={[
              <span key="l1" style={{ fontSize: "clamp(28px, 3.6vw, 46px)" }}>
                La potencia que usas,
              </span>,
              <span key="l2" style={{ fontSize: "clamp(28px, 3.6vw, 46px)" }}>
                sin el <span className="display-italic text-aurora">peso que no</span>.
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
            Cómo se compara Flujora con las herramientas tradicionales tipo ClickUp o Jira.
          </motion.p>
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_DEFAULT}
          className="overflow-hidden rounded-card border border-[#26304A] bg-[#131B2E]/55 backdrop-blur-sm"
        >
          {/* Header */}
          <div className="grid grid-cols-[1.4fr_1fr_1fr] sm:grid-cols-[1.6fr_1fr_1fr]">
            <div className="p-4 sm:p-5" />
            <div className="relative p-4 sm:p-5 text-center border-l border-[#26304A] bg-gradient-to-b from-[#10B981]/14 to-transparent">
              <span aria-hidden className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#10B981] to-[#8B5CF6]" />
              <span
                aria-hidden
                className="absolute inset-0 -z-0 opacity-60"
                style={{ background: "radial-gradient(80% 60% at 50% 0%, rgba(16,185,129,0.12), transparent 70%)" }}
              />
              <div className="relative flex justify-center">
                <Logo withWordmark={false} markClassName="h-8 w-8" />
              </div>
              <div className="relative mt-2 font-display font-semibold text-white text-sm sm:text-base">
                Flujora
              </div>
            </div>
            <div className="p-4 sm:p-5 text-center border-l border-[#26304A]">
              <div className="font-display font-semibold text-[#A6B0C9] text-sm sm:text-base">
                Herramientas pesadas
              </div>
              <div className="font-mono text-[10px] text-[#A6B0C9]/45 mt-1">tipo ClickUp / Jira</div>
            </div>
          </div>

          <motion.div variants={staggerCards} initial="hidden" whileInView="visible" viewport={VIEWPORT_DEFAULT}>
            {ROWS.map((row) => (
              <motion.div
                key={row.feature}
                variants={fadeInUp}
                className="group grid grid-cols-[1.4fr_1fr_1fr] sm:grid-cols-[1.6fr_1fr_1fr] border-t border-[#26304A] transition-colors duration-200 hover:bg-white/[0.015]"
              >
                <div className="p-4 sm:p-5 flex items-center font-inter text-sm text-[#D5DCEC]">
                  {row.feature}
                </div>
                <div className="p-4 sm:p-5 border-l border-[#26304A] bg-[#10B981]/[0.05] group-hover:bg-[#10B981]/[0.09] transition-colors flex flex-col items-center justify-center text-center gap-1.5">
                  <motion.span
                    variants={popIn}
                    className="inline-flex w-5 h-5 rounded-full bg-[#10B981]/15 items-center justify-center shrink-0"
                  >
                    <Check className="w-3 h-3 text-[#34D399]" strokeWidth={3.5} />
                  </motion.span>
                  <span className="font-inter text-[12px] text-white leading-tight">{row.flujora}</span>
                </div>
                <div className="p-4 sm:p-5 border-l border-[#26304A] flex flex-col items-center justify-center text-center gap-1.5">
                  <span className="inline-flex w-5 h-5 rounded-full bg-[#A6B0C9]/10 items-center justify-center shrink-0">
                    <X className="w-3 h-3 text-[#A6B0C9]/70" strokeWidth={3} />
                  </span>
                  <span className="font-inter text-[12px] text-[#A6B0C9]/65 leading-tight">{row.heavy}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
