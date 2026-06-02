'use client';

import { AnimatePresence, motion } from "framer-motion";
import { List, KanbanSquare, CalendarDays, GanttChartSquare, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import KineticHeading from "@/components/ui/KineticHeading";
import { fadeInUp, VIEWPORT_DEFAULT } from "@/lib/animations";

interface View {
  id: string;
  icon: LucideIcon;
  label: string;
  description: string;
  render: () => JSX.Element;
}

const PILL = "rounded-lg border border-[#26304A] bg-[#1A2336]";
const ROTATE_MS = 4800;

function ListView() {
  const rows = [
    { task: "Definir alcance del sprint", who: "#10B981", state: "En curso", stateColor: "#34D399", done: false },
    { task: "Diseñar onboarding", who: "#8B5CF6", state: "Por hacer", stateColor: "#A6B0C9", done: false },
    { task: "Integrar Payphone", who: "#14B8A6", state: "En curso", stateColor: "#34D399", done: false },
    { task: "Investigación de usuarios", who: "#6366F1", state: "Listo", stateColor: "#14B8A6", done: true },
  ];
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-[1.6fr_0.7fr_0.6fr] gap-2 px-3 text-[10px] font-mono uppercase tracking-wider text-[#A6B0C9]/45">
        <span>Tarea</span><span>Estado</span><span>Resp.</span>
      </div>
      {rows.map((r, i) => (
        <motion.div
          key={r.task}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.07 }}
          className={`grid grid-cols-[1.6fr_0.7fr_0.6fr] gap-2 items-center px-3 py-2.5 ${PILL}`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <span className={`w-3.5 h-3.5 rounded-[4px] shrink-0 ${r.done ? "" : "border border-[#26304A]"}`} style={r.done ? { background: "#34D399" } : undefined} />
            <span className={`text-[12px] font-inter truncate ${r.done ? "text-[#A6B0C9]/55 line-through" : "text-[#F4F6FB]/90"}`}>{r.task}</span>
          </div>
          <span className="text-[10px] font-inter font-medium px-2 py-0.5 rounded-full justify-self-start" style={{ color: r.stateColor, background: `${r.stateColor}1f` }}>{r.state}</span>
          <span className="w-5 h-5 rounded-full justify-self-start" style={{ background: r.who }} />
        </motion.div>
      ))}
    </div>
  );
}

function BoardView() {
  const cols = [
    { t: "Por hacer", items: [{ l: "Diseñar landing", c: "#8B5CF6" }, { l: "Brief campaña", c: "#14B8A6" }] },
    { t: "En curso", items: [{ l: "API de pagos", c: "#10B981" }, { l: "Onboarding", c: "#6366F1" }] },
    { t: "Listo", items: [{ l: "Investigación", c: "#14B8A6" }] },
  ];
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {cols.map((col, ci) => (
        <div key={col.t}>
          <div className="text-[10px] font-inter font-medium text-[#A6B0C9]/70 mb-2 px-1">{col.t}</div>
          <div className="space-y-2">
            {col.items.map((it, i) => (
              <motion.div
                key={it.l}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: ci * 0.1 + i * 0.06 }}
                className={`${PILL} p-2.5`}
              >
                <span className="inline-block px-1.5 py-0.5 rounded text-[8px] font-semibold mb-1.5" style={{ color: it.c, background: `${it.c}1f` }}>●</span>
                <p className="text-[11px] font-inter text-[#F4F6FB]/90 leading-tight">{it.l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CalendarView() {
  const events: Record<number, { c: string }[]> = {
    3: [{ c: "#10B981" }],
    8: [{ c: "#8B5CF6" }, { c: "#14B8A6" }],
    12: [{ c: "#6366F1" }],
    17: [{ c: "#34D399" }],
    21: [{ c: "#8B5CF6" }],
    24: [{ c: "#14B8A6" }],
  };
  return (
    <div>
      <div className="grid grid-cols-7 gap-1.5 mb-1.5">
        {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
          <span key={i} className="text-center text-[9px] font-inter text-[#A6B0C9]/45">{d}</span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
          <motion.div
            key={day}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: day * 0.012 }}
            className={`aspect-square rounded-md border border-[#26304A] bg-[#1A2336] p-1 flex flex-col ${day === 8 ? "ring-1 ring-[#10B981]/50" : ""}`}
          >
            <span className="text-[8px] font-inter text-[#A6B0C9]/60 leading-none">{day}</span>
            <div className="mt-auto flex gap-0.5 flex-wrap">
              {(events[day] || []).map((e, idx) => (
                <span key={idx} className="h-1 flex-1 min-w-[6px] rounded-full" style={{ background: e.c }} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function GanttView() {
  const bars = [
    { l: "Descubrimiento", start: 0, len: 30, c: "#14B8A6" },
    { l: "Diseño", start: 18, len: 38, c: "#8B5CF6" },
    { l: "Desarrollo", start: 42, len: 45, c: "#10B981" },
    { l: "QA y lanzamiento", start: 78, len: 22, c: "#6366F1" },
  ];
  return (
    <div className="space-y-3 pt-2">
      {bars.map((b, i) => (
        <div key={b.l} className="flex items-center gap-3">
          <span className="w-24 shrink-0 text-[11px] font-inter text-[#A6B0C9]/80 truncate">{b.l}</span>
          <div className="flex-1 h-5 rounded-full bg-[#1A2336] border border-[#26304A] relative overflow-hidden">
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: `${b.len}%`, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: "easeOut" }}
              className="absolute top-0 bottom-0 rounded-full"
              style={{ left: `${b.start}%`, background: `linear-gradient(90deg, ${b.c}, ${b.c}aa)` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const VIEWS: View[] = [
  { id: "lista", icon: List, label: "Lista", description: "Todo el trabajo en filas claras, ordenable y filtrable.", render: ListView },
  { id: "tablero", icon: KanbanSquare, label: "Tablero Kanban", description: "Arrastra tareas entre columnas y visualiza el flujo.", render: BoardView },
  { id: "calendario", icon: CalendarDays, label: "Calendario", description: "Fechas y entregas en una vista mensual.", render: CalendarView },
  { id: "cronograma", icon: GanttChartSquare, label: "Cronograma", description: "Línea de tiempo tipo Gantt con dependencias y fases.", render: GanttView },
];

export default function ModuleShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % VIEWS.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [paused]);

  const ActiveRender = VIEWS[active].render;

  return (
    <section id="vistas" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="relative max-w-6xl 2xl:max-w-[1320px] mx-auto px-6 sm:px-8 2xl:px-12">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_DEFAULT}
            className="flex items-center gap-3 mb-5"
          >
            <span className="h-px w-9 bg-gradient-to-r from-[#34D399] to-transparent" />
            <span className="eyebrow text-[#6EE7B7]">Una fuente, muchas vistas</span>
          </motion.div>
          <KineticHeading
            as="h2"
            className="font-display font-semibold text-white"
            lines={[
              <span key="l1" style={{ fontSize: "clamp(28px, 3.6vw, 46px)" }}>
                Las mismas tareas,
              </span>,
              <span key="l2" style={{ fontSize: "clamp(28px, 3.6vw, 46px)" }}>
                como mejor <span className="display-italic text-aurora">te funcione</span>.
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
            Cambia de vista sin perder el contexto. Todo se mantiene sincronizado.
          </motion.p>
        </div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-5 lg:gap-7 items-stretch"
        >
          {/* Tabs */}
          <div className="flex flex-col gap-2.5">
            {VIEWS.map((v, i) => {
              const Icon = v.icon;
              const isActive = i === active;
              return (
                <button
                  key={v.id}
                  type="button"
                  data-cursor="cta"
                  onClick={() => setActive(i)}
                  className={`relative overflow-hidden text-left rounded-card border p-4 sm:p-5 transition-all duration-300 ${
                    isActive
                      ? "border-[#10B981]/50 bg-[#131B2E]/80"
                      : "border-[#26304A] bg-[#131B2E]/35 hover:bg-[#131B2E]/60"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="view-rail"
                      className="absolute left-0 top-3 bottom-3 w-1 rounded-full bg-gradient-to-b from-[#10B981] to-[#8B5CF6]"
                    />
                  )}
                  <div className="flex items-center gap-3 mb-1">
                    <span
                      className={`inline-flex w-9 h-9 items-center justify-center rounded-lg transition-colors ${
                        isActive ? "bg-[#10B981]/15 text-[#34D399]" : "bg-[#1A2336] text-[#A6B0C9]"
                      }`}
                    >
                      <Icon className="w-5 h-5" strokeWidth={1.8} />
                    </span>
                    <span className={`font-display font-semibold ${isActive ? "text-white" : "text-[#D5DCEC]"}`}>
                      {v.label}
                    </span>
                  </div>
                  <p className="font-inter text-[13px] text-[#A6B0C9]/75 leading-snug pl-12">
                    {v.description}
                  </p>
                  {/* Barra de progreso del auto-rotado */}
                  {isActive && !paused && (
                    <motion.span
                      key={active}
                      className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-gradient-to-r from-[#10B981] to-[#8B5CF6]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: ROTATE_MS / 1000, ease: "linear" }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Ventana de previsualización */}
          <div className="rounded-card border border-[#26304A] bg-[#0A0F1E]/85 backdrop-blur-sm overflow-hidden shadow-card min-h-[340px] flex flex-col">
            <div className="bg-[#131B2E] border-b border-[#26304A] px-4 py-2.5 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
              </div>
              <span className="font-mono text-xs text-[#A6B0C9]/50">
                proyecto / {VIEWS[active].label.toLowerCase()}
              </span>
            </div>
            <div className="flex-1 p-5 sm:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={VIEWS[active].id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ActiveRender />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
