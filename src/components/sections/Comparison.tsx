'use client';

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Logo from "@/components/ui/Logo";
import { staggerCards, fadeInUp, VIEWPORT_DEFAULT } from "@/lib/animations";

interface Row {
  feature: string;
  matriarca: string;
  heavy: string;
  heavyOk?: boolean;
}

const ROWS: Row[] = [
  { feature: "Curva de aprendizaje", matriarca: "Lo usas el primer día", heavy: "Semanas de capacitación", heavyOk: false },
  { feature: "Vistas (lista, tablero, calendario, Gantt)", matriarca: "Incluidas y sincronizadas", heavy: "Según el plan / complejas", heavyOk: false },
  { feature: "Interfaz en español", matriarca: "Nativa", heavy: "Parcial o traducida", heavyOk: false },
  { feature: "Precio", matriarca: "Claro y mensual", heavy: "Por add-ons y niveles", heavyOk: false },
  { feature: "Pago local con tarjeta", matriarca: "Payphone (Ecuador)", heavy: "Solo tarjetas internacionales", heavyOk: false },
  { feature: "Soporte", matriarca: "Cercano, por WhatsApp", heavy: "Tickets en inglés", heavyOk: false },
  { feature: "Velocidad de la app", matriarca: "Liviana y rápida", heavy: "Pesada con tantos módulos", heavyOk: false },
];

export default function Comparison() {
  return (
    <section
      id="comparativa"
      className="relative py-24 sm:py-28 overflow-hidden bg-[#0A0F1E]"
    >
      <div
        aria-hidden
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/8 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-5xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <Reveal variant="up">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-[#34D399] mb-4">
              Comparativa
            </span>
          </Reveal>
          <Reveal variant="up" delay={0.05}>
            <h2
              className="font-sora font-bold text-white mb-4"
              style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}
            >
              La potencia que usas,{" "}
              <span className="text-aurora">sin el peso que no</span>
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <p className="font-inter text-[#A6B0C9] text-lg leading-relaxed">
              Cómo se compara Matriarca con las herramientas tradicionales tipo
              ClickUp o Jira.
            </p>
          </Reveal>
        </div>

        <Reveal variant="up" delay={0.1}>
          <div className="overflow-hidden rounded-card border border-[#26304A] bg-[#131B2E]/60">
            {/* Header row */}
            <div className="grid grid-cols-[1.4fr_1fr_1fr] sm:grid-cols-[1.6fr_1fr_1fr]">
              <div className="p-4 sm:p-5" />
              <div className="relative p-4 sm:p-5 text-center border-l border-[#26304A] bg-gradient-to-b from-[#10B981]/12 to-transparent">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-[#10B981] to-[#8B5CF6]"
                />
                <div className="flex justify-center">
                  <Logo withWordmark={false} markClassName="h-8 w-8" />
                </div>
                <div className="mt-2 font-sora font-bold text-white text-sm sm:text-base">
                  Matriarca
                </div>
              </div>
              <div className="p-4 sm:p-5 text-center border-l border-[#26304A]">
                <div className="font-sora font-semibold text-[#A6B0C9] text-sm sm:text-base">
                  Herramientas pesadas
                </div>
                <div className="font-inter text-[11px] text-[#A6B0C9]/50 mt-1">
                  tipo ClickUp / Jira
                </div>
              </div>
            </div>

            <motion.div
              variants={staggerCards}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_DEFAULT}
            >
              {ROWS.map((row) => (
                <motion.div
                  key={row.feature}
                  variants={fadeInUp}
                  className="grid grid-cols-[1.4fr_1fr_1fr] sm:grid-cols-[1.6fr_1fr_1fr] border-t border-[#26304A]"
                >
                  <div className="p-4 sm:p-5 flex items-center font-inter text-sm text-[#D5DCEC]">
                    {row.feature}
                  </div>
                  <div className="p-4 sm:p-5 border-l border-[#26304A] bg-[#10B981]/[0.04] flex flex-col items-center justify-center text-center gap-1.5">
                    <span className="inline-flex w-5 h-5 rounded-full bg-[#10B981]/15 items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[#34D399]" strokeWidth={3.5} />
                    </span>
                    <span className="font-inter text-[12px] text-white leading-tight">
                      {row.matriarca}
                    </span>
                  </div>
                  <div className="p-4 sm:p-5 border-l border-[#26304A] flex flex-col items-center justify-center text-center gap-1.5">
                    <span className="inline-flex w-5 h-5 rounded-full bg-[#A6B0C9]/10 items-center justify-center shrink-0">
                      <X className="w-3 h-3 text-[#A6B0C9]/70" strokeWidth={3} />
                    </span>
                    <span className="font-inter text-[12px] text-[#A6B0C9]/70 leading-tight">
                      {row.heavy}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
