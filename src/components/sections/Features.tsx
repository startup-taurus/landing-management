'use client';

import { motion } from "framer-motion";
import {
  ListChecks, LayoutGrid, Users, BarChart3, Zap, Clock, FileText, Target,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { VIEWPORT_DEFAULT } from "@/lib/animations";

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

const heroFeature: FeatureItem = {
  icon: ListChecks,
  title: "Tareas y subtareas",
  description:
    "Divide el trabajo en tareas y subtareas con responsable, fecha, prioridad y estado. Lo que hay que hacer, siempre claro.",
};

const topRight: FeatureItem[] = [
  {
    icon: LayoutGrid,
    title: "Vistas múltiples",
    description: "Lista, tablero, calendario y cronograma sobre las mismas tareas.",
  },
  {
    icon: Users,
    title: "Colaboración",
    description: "Asignaciones, comentarios y menciones para que nadie se quede fuera.",
  },
];

const wideFeature: FeatureItem = {
  icon: BarChart3,
  title: "Dashboards y reportes",
  description:
    "Mide avance, carga del equipo y cumplimiento de fechas en tiempo real, sin armar hojas de cálculo.",
};

const bottomRow: FeatureItem[] = [
  {
    icon: Zap,
    title: "Automatizaciones",
    description: "Reglas simples: al cambiar de estado, asigna, notifica o mueve la tarea.",
  },
  {
    icon: Clock,
    title: "Seguimiento de tiempo",
    description: "Registra cuánto toma cada tarea y entiende dónde se va el esfuerzo.",
  },
  {
    icon: FileText,
    title: "Documentos y notas",
    description: "Briefs, actas y guías junto a las tareas, no perdidos en otro lado.",
  },
  {
    icon: Target,
    title: "Metas y objetivos",
    description: "Conecta las tareas con objetivos y mira el progreso real del equipo.",
  },
];

const cardEnter = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: custom * 0.06, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

const heroEnter = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Features() {
  return (
    <section
      id="caracteristicas"
      className="relative py-24 sm:py-28 bg-[#0A0F1E] overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#10B981]/40 to-transparent"
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14 sm:mb-20 max-w-2xl mx-auto">
          <Reveal variant="up">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-[#34D399] mb-4">
              Todo en un solo lugar
            </span>
          </Reveal>
          <Reveal variant="up" delay={0.05}>
            <h2
              className="font-sora font-bold text-white mb-5"
              style={{ fontSize: "clamp(32px, 4vw, 48px)" }}
            >
              Lo que tu equipo necesita,{" "}
              <span className="text-aurora">sin abrir cinco apps</span>
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <p className="font-inter text-[#A6B0C9] text-lg leading-relaxed">
              Desde la primera tarea hasta el reporte del proyecto, Matriarca cubre el
              día a día del trabajo en equipo.
            </p>
          </Reveal>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_DEFAULT}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 lg:auto-rows-[180px]"
        >
          <HeroBento item={heroFeature} />
          {topRight.map((f, i) => (
            <StandardBento key={f.title} item={f} index={i + 2} order={i + 1} />
          ))}
          <WideBento item={wideFeature} />
          {bottomRow.map((f, i) => (
            <StandardBento key={f.title} item={f} index={i + 5} order={i + 4} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CardShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group relative rounded-card border border-[#26304A] bg-[#131B2E] shadow-card transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-[#10B981]/45 hover:shadow-card-hover overflow-hidden before:absolute before:top-0 before:left-0 before:h-px before:w-0 before:bg-gradient-to-r before:from-transparent before:via-[#10B981] before:to-transparent before:transition-[width] before:duration-700 hover:before:w-full ${className || ""}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] -translate-x-full rounded-[inherit] bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.08)_48%,transparent_66%)] transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
      {children}
    </div>
  );
}

function MockTaskList() {
  const tasks = [
    { label: "Definir alcance del sprint", done: true, accent: "#34D399" },
    { label: "Diseñar flujo de onboarding", done: false, accent: "#8B5CF6" },
    { label: "Integrar pasarela de pagos", done: false, accent: "#14B8A6" },
  ];
  return (
    <div className="w-full rounded-xl border border-[#26304A] bg-[#0E1525] p-3 space-y-2">
      {tasks.map((t, i) => (
        <div key={t.label}>
          <div className="flex items-center gap-2.5">
            <span
              className={`w-4 h-4 rounded-[5px] border flex items-center justify-center shrink-0 ${
                t.done ? "border-transparent" : "border-[#26304A]"
              }`}
              style={t.done ? { background: t.accent } : undefined}
            >
              {t.done && (
                <svg viewBox="0 0 12 12" className="w-2.5 h-2.5">
                  <path d="M2.5 6.2l2.2 2.2 4.8-5" stroke="#0A0F1E" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <span className={`flex-1 text-[12px] font-inter ${t.done ? "text-[#A6B0C9]/55 line-through" : "text-[#F4F6FB]/90"}`}>
              {t.label}
            </span>
            <span className="w-5 h-5 rounded-full shrink-0" style={{ background: `${t.accent}33`, border: `1px solid ${t.accent}66` }} />
          </div>
          {i === 1 && (
            <div className="ml-6 mt-2 pl-3 border-l border-[#26304A] space-y-1.5">
              {["Wireframes", "Copys"].map((s) => (
                <div key={s} className="flex items-center gap-2 text-[11px] font-inter text-[#A6B0C9]/70">
                  <span className="w-3 h-3 rounded-[4px] border border-[#26304A]" />
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function MiniBars() {
  const bars = [44, 68, 52, 80, 60, 92, 72];
  return (
    <div className="w-full h-full min-h-[96px] rounded-xl border border-[#26304A] bg-[#0E1525] p-3 flex items-end gap-1.5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.05, duration: 0.6, ease: "easeOut" }}
          className="flex-1 rounded-t-sm"
          style={{
            background:
              i === 5
                ? "linear-gradient(180deg,#34D399,#10B981)"
                : i % 2 === 0
                ? "rgba(20,184,166,0.45)"
                : "rgba(139,92,246,0.45)",
          }}
        />
      ))}
    </div>
  );
}

function HeroBento({ item }: { item: FeatureItem }) {
  const Icon = item.icon;
  return (
    <motion.div variants={heroEnter} className="lg:col-span-2 lg:row-span-2">
      <CardShell className="h-full min-h-[380px] lg:min-h-0">
        <div className="relative h-full p-7 sm:p-8 flex flex-col gap-6">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Icon className="w-5 h-5 text-[#34D399]" strokeWidth={1.6} />
              <span className="font-inter text-[11px] uppercase tracking-[0.18em] text-[#A6B0C9]/70">
                Núcleo · 01
              </span>
            </div>
            <h3
              className="font-sora font-bold text-white leading-tight mb-3"
              style={{ fontSize: "clamp(22px, 2.2vw, 30px)" }}
            >
              {item.title}
            </h3>
            <p className="font-inter text-[#A6B0C9] text-base leading-relaxed max-w-md">
              {item.description}
            </p>
          </div>
          <div className="flex-1 flex items-end pt-2">
            <MockTaskList />
          </div>
        </div>
      </CardShell>
    </motion.div>
  );
}

function WideBento({ item }: { item: FeatureItem }) {
  const Icon = item.icon;
  return (
    <motion.div variants={cardEnter} custom={3} className="lg:col-span-2">
      <CardShell className="h-full">
        <div className="relative h-full p-6 sm:p-7 flex flex-col sm:flex-row items-stretch gap-5">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <Icon className="w-5 h-5 text-[#A78BFA]" strokeWidth={1.6} />
              <span className="font-inter text-[11px] uppercase tracking-[0.18em] text-[#A6B0C9]/70">
                Analítica · 04
              </span>
            </div>
            <h3 className="font-sora font-semibold text-white text-lg sm:text-xl leading-tight mb-1.5">
              {item.title}
            </h3>
            <p className="font-inter text-[#A6B0C9] text-sm leading-relaxed max-w-xs">
              {item.description}
            </p>
          </div>
          <div className="shrink-0 w-full sm:w-44 flex items-end">
            <MiniBars />
          </div>
        </div>
      </CardShell>
    </motion.div>
  );
}

function StandardBento({
  item,
  index,
  order,
}: {
  item: FeatureItem;
  index: number;
  order: number;
}) {
  const Icon = item.icon;
  return (
    <motion.div variants={cardEnter} custom={index}>
      <CardShell className="h-full">
        <div className="relative h-full p-5 sm:p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <Icon className="w-4 h-4 text-[#34D399]" strokeWidth={1.6} />
            <span className="font-inter text-[11px] uppercase tracking-[0.18em] text-[#A6B0C9]/70">
              {String(order).padStart(2, "0")}
            </span>
          </div>
          <h3 className="font-sora font-semibold text-white text-[15px] sm:text-base leading-tight mb-2">
            {item.title}
          </h3>
          <p className="font-inter text-[#A6B0C9] text-[13px] leading-relaxed">
            {item.description}
          </p>
        </div>
      </CardShell>
    </motion.div>
  );
}
