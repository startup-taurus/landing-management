'use client';

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import {
  ListChecks, LayoutGrid, Users, BarChart3, Zap, Clock, FileText, Target,
  CheckCircle2, type LucideIcon,
} from "lucide-react";
import KineticHeading from "@/components/ui/KineticHeading";
import { fadeInUp, VIEWPORT_DEFAULT, EASE_LUX } from "@/lib/animations";

const cardEnter = {
  hidden: { opacity: 0, y: 26 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: custom * 0.06, ease: EASE_LUX },
  }),
};

const heroEnter = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE_LUX } },
};

export default function Features() {
  return (
    <section id="caracteristicas" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14 sm:mb-20 max-w-3xl">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_DEFAULT}
            className="flex items-center gap-3 mb-5"
          >
            <span className="h-px w-9 bg-gradient-to-r from-[#34D399] to-transparent" />
            <span className="eyebrow text-[#6EE7B7]">Todo en un solo lugar</span>
          </motion.div>
          <KineticHeading
            as="h2"
            className="font-display font-semibold text-white"
            lines={[
              <span key="l1" style={{ fontSize: "clamp(30px, 4vw, 50px)" }}>
                Lo que tu equipo necesita,
              </span>,
              <span key="l2" style={{ fontSize: "clamp(30px, 4vw, 50px)" }}>
                sin abrir <span className="display-italic text-aurora">cinco apps</span>.
              </span>,
            ]}
          />
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_DEFAULT}
            className="font-inter text-[#A6B0C9] text-lg leading-relaxed mt-5 max-w-xl"
          >
            Desde la primera tarea hasta el reporte del proyecto, Flujora cubre el día
            a día del trabajo en equipo.
          </motion.p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_DEFAULT}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 lg:auto-rows-[178px]"
        >
          {/* Núcleo */}
          <motion.div variants={heroEnter} className="lg:col-span-2 lg:row-span-2">
            <CardShell className="h-full min-h-[380px] lg:min-h-0">
              <div className="h-full p-7 sm:p-8 flex flex-col gap-6">
                <FeatureHead icon={ListChecks} accent="#34D399" label="Núcleo · 01" />
                <div>
                  <h3 className="font-display font-semibold text-white leading-tight mb-3" style={{ fontSize: "clamp(22px, 2.2vw, 30px)" }}>
                    Tareas y subtareas
                  </h3>
                  <p className="font-inter text-[#A6B0C9] text-base leading-relaxed max-w-md">
                    Divide el trabajo con responsable, fecha, prioridad y estado. Lo que
                    hay que hacer, siempre claro.
                  </p>
                </div>
                <div className="flex-1 flex items-end pt-2">
                  <MockTaskList />
                </div>
              </div>
            </CardShell>
          </motion.div>

          {/* Vistas múltiples */}
          <motion.div variants={cardEnter} custom={2}>
            <SmallCard icon={LayoutGrid} accent="#34D399" order="02" title="Vistas múltiples" desc="Lista, tablero, calendario y Gantt sobre las mismas tareas." visual={<ViewSwitch />} />
          </motion.div>

          {/* Colaboración */}
          <motion.div variants={cardEnter} custom={3}>
            <SmallCard icon={Users} accent="#A78BFA" order="03" title="Colaboración" desc="Asignaciones, comentarios y menciones en vivo." visual={<CollabMock />} />
          </motion.div>

          {/* Dashboards (wide) */}
          <motion.div variants={cardEnter} custom={4} className="lg:col-span-2">
            <CardShell className="h-full">
              <div className="h-full p-6 sm:p-7 flex flex-col sm:flex-row items-stretch gap-5">
                <div className="flex-1 min-w-0">
                  <FeatureHead icon={BarChart3} accent="#A78BFA" label="Analítica · 04" />
                  <h3 className="font-display font-semibold text-white text-lg sm:text-xl leading-tight mb-1.5 mt-3">
                    Dashboards y reportes
                  </h3>
                  <p className="font-inter text-[#A6B0C9] text-sm leading-relaxed max-w-xs">
                    Mide avance, carga del equipo y cumplimiento de fechas en tiempo real.
                  </p>
                </div>
                <div className="shrink-0 w-full sm:w-48 flex items-end">
                  <MiniBars />
                </div>
              </div>
            </CardShell>
          </motion.div>

          {/* Fila inferior */}
          <motion.div variants={cardEnter} custom={5}>
            <SmallCard icon={Zap} accent="#34D399" order="05" title="Automatizaciones" desc="Reglas que asignan, notifican y mueven tareas solas." visual={<FlowMock />} />
          </motion.div>
          <motion.div variants={cardEnter} custom={6}>
            <SmallCard icon={Clock} accent="#14B8A6" order="06" title="Seguimiento de tiempo" desc="Registra cuánto toma cada tarea." visual={<TimeRing />} />
          </motion.div>
          <motion.div variants={cardEnter} custom={7}>
            <SmallCard icon={FileText} accent="#6EE7B7" order="07" title="Documentos y notas" desc="Briefs y actas junto a las tareas." visual={<DocType />} />
          </motion.div>
          <motion.div variants={cardEnter} custom={8}>
            <SmallCard icon={Target} accent="#A78BFA" order="08" title="Metas y objetivos" desc="Conecta tareas con objetivos reales." visual={<GoalRing />} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Shell con glow estático en hover + sheen + línea superior (sin trabajo por
// movimiento de puntero → barato) ────────────────────────────────────────────
function CardShell({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`group relative rounded-card border border-[#26304A] bg-[#131B2E] shadow-card transition-colors duration-300 hover:border-[#10B981]/45 overflow-hidden ${className || ""}`}
    >
      <span aria-hidden className="absolute top-0 left-0 z-[2] h-px w-0 bg-gradient-to-r from-transparent via-[#34D399] to-transparent transition-[width] duration-700 group-hover:w-full" />
      <span aria-hidden className="pointer-events-none absolute inset-0 z-[1] -translate-x-full rounded-[inherit] bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.07)_48%,transparent_66%)] transition-transform duration-[800ms] ease-out group-hover:translate-x-full" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at 50% 0%, rgba(16,185,129,0.12), transparent 62%)" }}
      />
      <div className="relative z-[2] h-full">{children}</div>
    </div>
  );
}

function FeatureHead({ icon: Icon, accent, label }: { icon: LucideIcon; accent: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="grid place-items-center w-9 h-9 rounded-xl border"
        style={{ borderColor: `${accent}40`, background: `${accent}14` }}
      >
        <Icon className="w-[18px] h-[18px]" style={{ color: accent }} strokeWidth={1.7} />
      </span>
      <span className="eyebrow text-[#A6B0C9]/70 text-[10px]">{label}</span>
    </div>
  );
}

function SmallCard({
  icon: Icon, accent, order, title, desc, visual,
}: {
  icon: LucideIcon; accent: string; order: string; title: string; desc: string; visual: ReactNode;
}) {
  return (
    <CardShell className="h-full">
      <div className="h-full p-5 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span className="grid place-items-center w-8 h-8 rounded-lg border" style={{ borderColor: `${accent}40`, background: `${accent}14` }}>
            <Icon className="w-4 h-4" style={{ color: accent }} strokeWidth={1.7} />
          </span>
          <span className="font-mono text-[11px] text-[#A6B0C9]/40">{order}</span>
        </div>
        <div className="mb-3 min-h-[44px] flex items-center">{visual}</div>
        <h3 className="font-display font-semibold text-white text-[15px] leading-tight mb-1">{title}</h3>
        <p className="font-inter text-[#A6B0C9]/85 text-[12.5px] leading-snug">{desc}</p>
      </div>
    </CardShell>
  );
}

// ── Micro-visuales por feature ───────────────────────────────────────────────

function MockTaskList() {
  const tasks = [
    { label: "Definir alcance del sprint", done: true, accent: "#34D399" },
    { label: "Diseñar flujo de onboarding", done: false, accent: "#8B5CF6" },
    { label: "Integrar pasarela de pagos", done: false, accent: "#14B8A6" },
  ];
  return (
    <div className="w-full rounded-xl border border-[#26304A] bg-[#0E1525]/80 p-3 space-y-2">
      {tasks.map((t, i) => (
        <div key={t.label}>
          <div className="flex items-center gap-2.5">
            <span
              className={`w-4 h-4 rounded-[5px] border flex items-center justify-center shrink-0 transition-colors ${
                t.done ? "border-transparent" : "border-[#26304A] group-hover:border-[#34D399]/60"
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
            <div className="ml-6 grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
              <div className="overflow-hidden">
                <div className="mt-2 pl-3 border-l border-[#26304A] space-y-1.5">
                  {["Wireframes", "Copys"].map((s) => (
                    <div key={s} className="flex items-center gap-2 text-[11px] font-inter text-[#A6B0C9]/70">
                      <span className="w-3 h-3 rounded-[4px] border border-[#26304A]" />
                      {s}
                    </div>
                  ))}
                </div>
              </div>
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
    <div className="w-full h-full min-h-[104px] rounded-xl border border-[#26304A] bg-[#0E1525]/80 p-3 flex items-end gap-1.5">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.05, duration: 0.6, ease: "easeOut" }}
          className={`flex-1 rounded-t-sm origin-bottom transition-transform duration-300 ${i === 5 ? "group-hover:scale-y-110" : ""}`}
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

// Vistas múltiples: tres glifos de layout que se resaltan en ciclo.
function ViewSwitch() {
  const items = [0, 1, 2];
  return (
    <div className="flex items-center gap-2">
      {items.map((i) => (
        <motion.div
          key={i}
          className="w-9 h-9 rounded-lg border border-[#26304A] bg-[#0E1525]/70 grid place-items-center"
          animate={{
            borderColor: ["#26304A", "#34D39988", "#26304A"],
            backgroundColor: ["rgba(14,21,37,0.7)", "rgba(16,185,129,0.10)", "rgba(14,21,37,0.7)"],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 1, ease: "easeInOut" }}
        >
          {i === 0 && (
            <div className="space-y-1">
              {[0, 1, 2].map((r) => <div key={r} className="h-[3px] w-5 rounded-full bg-[#A6B0C9]/50" />)}
            </div>
          )}
          {i === 1 && (
            <div className="flex gap-1">
              {[0, 1, 2].map((c) => <div key={c} className="h-5 w-[5px] rounded-full bg-[#A6B0C9]/50" />)}
            </div>
          )}
          {i === 2 && (
            <div className="grid grid-cols-3 gap-[3px]">
              {Array.from({ length: 9 }).map((_, k) => <div key={k} className="h-[4px] w-[4px] rounded-[1px] bg-[#A6B0C9]/50" />)}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// Colaboración: stack de avatares + cursor con nombre que se mueve.
function CollabMock() {
  return (
    <div className="relative w-full h-11">
      <div className="flex -space-x-2">
        {["#10B981", "#8B5CF6", "#14B8A6", "#6366F1"].map((c, i) => (
          <span key={i} className="w-7 h-7 rounded-full border-2 border-[#131B2E]" style={{ background: c }} />
        ))}
        <span className="w-7 h-7 rounded-full border-2 border-[#131B2E] bg-[#1A2336] grid place-items-center text-[10px] font-mono text-[#A6B0C9]">+6</span>
      </div>
      <motion.div
        className="absolute -top-1 right-2 flex items-center gap-1"
        animate={{ x: [0, -14, 6, 0], y: [0, 8, 14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 drop-shadow"><path d="M2 2l5 12 2-5 5-2z" fill="#A78BFA" /></svg>
        <span className="px-1.5 py-0.5 rounded-[5px] text-[9px] font-mono text-white bg-[#8B5CF6]">Ana</span>
      </motion.div>
    </div>
  );
}

// Automatizaciones: tres nodos conectados con un pulso que recorre.
function FlowMock() {
  return (
    <svg viewBox="0 0 120 36" className="w-full h-9">
      <line x1="18" y1="18" x2="60" y2="18" stroke="#26304A" strokeWidth="2" />
      <line x1="60" y1="18" x2="102" y2="18" stroke="#26304A" strokeWidth="2" />
      <line x1="18" y1="18" x2="102" y2="18" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 18" className="animate-flow-dash" />
      {[18, 60, 102].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="18" r="8" fill="#0E1525" stroke={i === 1 ? "#8B5CF6" : "#34D399"} strokeWidth="1.5" />
          <circle cx={x} cy="18" r="3" fill={i === 1 ? "#8B5CF6" : "#34D399"} />
        </g>
      ))}
    </svg>
  );
}

function Ring({ pct, color, label }: { pct: number; color: string; label: string }) {
  const R = 16;
  const C = 2 * Math.PI * R;
  return (
    <div className="relative w-12 h-12">
      <svg viewBox="0 0 40 40" className="w-12 h-12 -rotate-90">
        <circle cx="20" cy="20" r={R} fill="none" stroke="#26304A" strokeWidth="3" />
        <motion.circle
          cx="20" cy="20" r={R} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          whileInView={{ strokeDashoffset: C * (1 - pct / 100) }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center font-mono text-[10px] text-white">{label}</span>
    </div>
  );
}

function TimeRing() {
  return (
    <div className="flex items-center gap-3">
      <Ring pct={64} color="#14B8A6" label="42m" />
      <div className="font-mono text-[13px] text-[#A6B0C9]">
        00<span className="animate-caret">:</span>42<span className="text-[#A6B0C9]/40">:18</span>
      </div>
    </div>
  );
}

function GoalRing() {
  return (
    <div className="flex items-center gap-3">
      <Ring pct={80} color="#A78BFA" label="80%" />
      <div className="text-[11px] font-inter text-[#A6B0C9]/80 leading-tight">
        Meta Q3<br /><span className="text-[#A78BFA]">en camino</span>
      </div>
    </div>
  );
}

function DocType() {
  return (
    <div className="w-full rounded-lg border border-[#26304A] bg-[#0E1525]/70 p-2.5 space-y-1.5">
      <div className="h-[3px] w-3/4 rounded-full bg-[#A6B0C9]/35" />
      <div className="h-[3px] w-full rounded-full bg-[#A6B0C9]/25" />
      <div className="flex items-center gap-px">
        <div className="h-[3px] w-1/2 rounded-full bg-[#A6B0C9]/25" />
        <span className="inline-block h-3 w-[2px] bg-[#34D399] animate-caret" />
      </div>
    </div>
  );
}
