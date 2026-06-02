'use client';

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { CheckCircle2, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { useRef, type ReactNode, type MouseEvent } from "react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";
import AnimatedGradientBackground from "@/components/ui/AnimatedGradientBackground";
import { fadeInUp, staggerHero, fadeInMockup } from "@/lib/animations";

function FloatingCard({
  children,
  className,
  delay,
  from,
  depth = 0,
}: {
  children: ReactNode;
  className: string;
  delay: number;
  from: { x?: number; y?: number };
  depth?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: from.x ?? 0, y: from.y ?? 12, z: depth }}
      animate={{ opacity: 1, x: 0, y: 0, z: depth }}
      whileHover={{
        z: depth + 40,
        scale: 1.05,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      transition={{ delay, duration: 0.75, type: "spring", stiffness: 90, damping: 18 }}
      style={{ transformStyle: "preserve-3d" }}
      className={`absolute z-20 hidden xl:block ${className}`}
    >
      <div className="glass-liquid card-sheen rounded-2xl px-4 py-3">{children}</div>
    </motion.div>
  );
}

function FloatingStats() {
  return (
    <>
      <FloatingCard className="-left-8 top-10" delay={0.5} from={{ x: -28 }} depth={55}>
        <p className="text-[10px] font-inter text-[#A6B0C9]/65 uppercase tracking-widest mb-1.5">
          Tareas completadas
        </p>
        <p className="text-2xl font-sora font-bold text-[#34D399]">248</p>
        <div className="flex items-center gap-1.5 mt-1.5">
          <TrendingUp className="w-3 h-3 text-[#34D399] shrink-0" />
          <span className="text-xs font-inter text-[#34D399]">+18% esta semana</span>
        </div>
      </FloatingCard>

      <FloatingCard className="-right-8 bottom-16" delay={0.7} from={{ x: 28 }} depth={80}>
        <p className="text-[10px] font-inter text-[#A6B0C9]/65 uppercase tracking-widest mb-2">
          Carga del equipo
        </p>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {["#10B981", "#8B5CF6", "#14B8A6", "#6366F1"].map((c, i) => (
              <span
                key={i}
                className="w-6 h-6 rounded-full border-2 border-[#131B2E]"
                style={{ background: c }}
              />
            ))}
          </div>
          <span className="text-xs font-inter text-[#A6B0C9]/80">+6 activos</span>
        </div>
      </FloatingCard>
    </>
  );
}

const COLUMNS: {
  title: string;
  accent: string;
  cards: { label: string; tag: string; tagColor: string; progress?: number; done?: boolean }[];
}[] = [
  {
    title: "Por hacer",
    accent: "#A6B0C9",
    cards: [
      { label: "Diseñar landing", tag: "Diseño", tagColor: "#8B5CF6" },
      { label: "Brief de campaña", tag: "Marketing", tagColor: "#14B8A6" },
    ],
  },
  {
    title: "En curso",
    accent: "#34D399",
    cards: [
      { label: "API de pagos", tag: "Backend", tagColor: "#10B981", progress: 60 },
      { label: "Onboarding", tag: "Producto", tagColor: "#6366F1", progress: 35 },
    ],
  },
  {
    title: "Listo",
    accent: "#14B8A6",
    cards: [{ label: "Investigación", tag: "UX", tagColor: "#8B5CF6", done: true }],
  },
];

function AppMockup() {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative rounded-2xl border border-[#26304A]/80 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.75),0_0_0_1px_rgba(16,185,129,0.06)] overflow-hidden bg-[#0A0F1E]">
        {/* Top bar */}
        <div className="bg-[#131B2E] border-b border-[#26304A] px-4 py-2.5 flex items-center gap-3">
          <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex-1 bg-[#0A0F1E] rounded-md px-3 py-1 text-xs text-[#A6B0C9]/45 font-inter border border-[#26304A] truncate">
            app.matriarca.app/tablero
          </div>
        </div>

        <div className="flex h-[300px]">
          {/* Sidebar */}
          <div className="w-12 bg-[#0A0F1E] flex flex-col items-center py-4 gap-3 border-r border-[#26304A]">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center shadow-[0_4px_12px_rgba(16,185,129,0.5)]"
              style={{ background: "linear-gradient(135deg,#10B981,#14B8A6 50%,#8B5CF6)" }}
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-6 h-6 rounded-lg ${
                  i === 0
                    ? "bg-[#10B981]/20 border border-[#10B981]/35"
                    : "bg-[#1A2336]/70"
                }`}
              />
            ))}
          </div>

          {/* Board */}
          <div className="flex-1 bg-[#0E1525] p-4 overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="h-2.5 w-24 bg-[#F4F6FB]/65 rounded-full mb-1.5" />
                <div className="h-2 w-16 bg-[#A6B0C9]/22 rounded-full" />
              </div>
              <div
                className="h-6 w-16 rounded-lg shadow-[0_4px_12px_rgba(16,185,129,0.45)]"
                style={{ background: "linear-gradient(135deg,#10B981,#0D9488)" }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {COLUMNS.map((col, ci) => (
                <div key={col.title} className="min-w-0">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: col.accent }}
                    />
                    <span className="text-[10px] font-inter font-medium text-[#A6B0C9]/80 truncate">
                      {col.title}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {col.cards.map((card, idx) => (
                      <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + ci * 0.12 + idx * 0.08, duration: 0.5 }}
                        className="rounded-lg border border-[#26304A] bg-[#1A2336] p-2"
                      >
                        <div className="flex items-center gap-1 mb-1.5">
                          <span
                            className="px-1.5 py-0.5 rounded text-[8px] font-inter font-semibold"
                            style={{
                              color: card.tagColor,
                              background: `${card.tagColor}1f`,
                            }}
                          >
                            {card.tag}
                          </span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          {card.done && (
                            <CheckCircle2 className="w-3 h-3 text-[#34D399] shrink-0 mt-px" />
                          )}
                          <span
                            className={`text-[10px] font-inter leading-tight ${
                              card.done ? "text-[#A6B0C9]/60 line-through" : "text-[#F4F6FB]/90"
                            }`}
                          >
                            {card.label}
                          </span>
                        </div>
                        {typeof card.progress === "number" && (
                          <div className="mt-1.5 h-1 rounded-full bg-[#0A0F1E] overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${card.progress}%` }}
                              transition={{ delay: 1 + ci * 0.1, duration: 0.7, ease: "easeOut" }}
                              className="h-full rounded-full"
                              style={{ background: "linear-gradient(90deg,#10B981,#14B8A6)" }}
                            />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Escenario 3D del hero: el mockup y las tarjetas siguen al cursor (tilt + parallax).
// Se desactiva si el usuario prefiere menos movimiento.
function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 140, damping: 18, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 140, damping: 18, mass: 0.5 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-14, 14]);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  if (reduce) {
    return (
      <div className="relative mx-auto w-full max-w-xl">
        <AppMockup />
        <FloatingStats />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="mx-auto w-full max-w-xl [perspective:1100px]"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative will-change-transform"
      >
        <AppMockup />
        <FloatingStats />
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const mockupY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-20 lg:pt-16 overflow-hidden bg-[#0A0F1E]"
    >
      <div aria-hidden className="absolute inset-0 bg-grid opacity-70" />
      <AnimatedGradientBackground variant="hero" />

      <motion.div
        style={{ opacity: heroFade }}
        className="relative max-w-7xl mx-auto px-6 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full"
      >
        <motion.div
          variants={staggerHero}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6"
        >
          <motion.div variants={fadeInUp}>
            <Badge>
              <Sparkles className="w-3.5 h-3.5" /> Gestión de proyectos, sin la complejidad
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-sora font-extrabold text-white leading-[1.05] tracking-tight"
            style={{ fontSize: "clamp(38px, 5.6vw, 68px)" }}
          >
            Organiza el trabajo de tu equipo con{" "}
            <span className="text-aurora">claridad</span>.
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="font-inter text-[#A6B0C9] text-lg leading-relaxed max-w-xl"
          >
            Tareas, tableros, calendario y cronograma en un solo lugar. Matriarca
            reúne lo esencial para planificar, colaborar y entregar a tiempo — liviano,
            en español y listo en minutos.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 pt-2">
            <MagneticButton href="#planes">
              <Button size="lg">
                Crear mi espacio
                <ArrowRight className="w-4 h-4" />
              </Button>
            </MagneticButton>
            <a href="#como-funciona">
              <Button size="lg" variant="outline">
                Ver cómo funciona
              </Button>
            </a>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4"
          >
            {["Listo en minutos", "Soporte en español", "Sin contratos"].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm font-inter text-[#A6B0C9]/80"
              >
                <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#10B981] shrink-0" />
                {item}
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeInMockup}
          initial="hidden"
          animate="visible"
          style={{ y: mockupY }}
          className="will-change-transform"
        >
          <HeroVisual />
        </motion.div>
      </motion.div>
    </section>
  );
}
