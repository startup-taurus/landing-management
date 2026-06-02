'use client';

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { CheckCircle2, TrendingUp, ArrowRight, Sparkles } from "lucide-react";
import { useRef, type ReactNode, type MouseEvent } from "react";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";
import KineticHeading from "@/components/ui/KineticHeading";
import ReactiveDotField from "@/components/ui/ReactiveDotField";
import { fadeInUp, staggerHero, focusIn, SPRING_SOFT, EASE_LUX } from "@/lib/animations";

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
    <div className="relative w-full mx-auto">
      <div className="relative rounded-2xl border border-[#26304A]/80 shadow-[0_50px_120px_-25px_rgba(0,0,0,0.8),0_0_0_1px_rgba(16,185,129,0.07)] overflow-hidden bg-[#0A0F1E]/95 backdrop-blur-sm">
        {/* Top bar */}
        <div className="bg-[#131B2E] border-b border-[#26304A] px-4 py-2.5 flex items-center gap-3">
          <div className="flex gap-1.5 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex-1 bg-[#0A0F1E] rounded-md px-3 py-1 text-xs text-[#A6B0C9]/45 font-mono border border-[#26304A] truncate">
            app.flujora.com/tablero
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
                  i === 0 ? "bg-[#10B981]/20 border border-[#10B981]/35" : "bg-[#1A2336]/70"
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
                            style={{ color: card.tagColor, background: `${card.tagColor}1f` }}
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

// Tarjeta flotante con parallax propio (capa cercana) + entrada.
function FloatingCard({
  children,
  className,
  delay,
  px,
  py,
}: {
  children: ReactNode;
  className: string;
  delay: number;
  px: MotionValue<number>;
  py: MotionValue<number>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.7, ease: EASE_LUX }}
      className={`absolute z-30 hidden xl:block ${className}`}
    >
      <motion.div style={{ x: px, y: py }} whileHover={{ scale: 1.05 }} className="cursor-grow">
        <div className="glass-liquid card-sheen rounded-2xl px-4 py-3">{children}</div>
      </motion.div>
    </motion.div>
  );
}

// Escenario con PROFUNDIDAD REAL: cada capa reacciona al puntero con distinta
// magnitud (parallax) y el mockup además se inclina (tilt). Se desactiva con
// prefers-reduced-motion.
function HeroVisual({ scrollY }: { scrollY: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, SPRING_SOFT);
  const sy = useSpring(my, SPRING_SOFT);

  // Tilt del mockup
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  // Capas: haz (profundo, poco), mockup (medio), tarjetas (cercano, mucho)
  const beamX = useTransform(sx, [-0.5, 0.5], [22, -22]);
  const beamY = useTransform(sy, [-0.5, 0.5], [16, -16]);
  const mockX = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const cardAX = useTransform(sx, [-0.5, 0.5], [-52, 52]);
  const cardAY = useTransform(sy, [-0.5, 0.5], [-30, 30]);
  const cardBX = useTransform(sx, [-0.5, 0.5], [46, -46]);
  const cardBY = useTransform(sy, [-0.5, 0.5], [34, -34]);
  // Parallax de scroll del conjunto (definido antes de cualquier early-return).
  const visualY = useTransform(scrollY, [0, 1], [0, -70]);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current || reduce) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  const statsTop = (
    <>
      <p className="text-[10px] font-mono text-[#A6B0C9]/65 uppercase tracking-widest mb-1.5">
        Tareas completadas
      </p>
      <p className="text-2xl font-display font-semibold text-[#34D399]">248</p>
      <div className="flex items-center gap-1.5 mt-1.5">
        <TrendingUp className="w-3 h-3 text-[#34D399] shrink-0" />
        <span className="text-xs font-inter text-[#34D399]">+18% esta semana</span>
      </div>
    </>
  );
  const statsBottom = (
    <>
      <p className="text-[10px] font-mono text-[#A6B0C9]/65 uppercase tracking-widest mb-2">
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
    </>
  );

  if (reduce) {
    return (
      <div className="relative mx-auto w-full max-w-xl 2xl:max-w-2xl">
        <AppMockup />
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ y: visualY }}
      className="relative mx-auto w-full max-w-xl 2xl:max-w-2xl [perspective:1200px]"
    >
      {/* Haz de luz detrás del mockup (capa profunda) */}
      <motion.div
        aria-hidden
        style={{ x: beamX, y: beamY }}
        className="pointer-events-none absolute -inset-10 -z-10"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[120%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.28), rgba(139,92,246,0.16) 45%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* Mockup (capa media, con tilt) */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={focusIn}
        style={{ rotateX, rotateY, x: mockX, transformStyle: "preserve-3d" }}
        className="relative will-change-transform"
      >
        <AppMockup />
      </motion.div>

      {/* Tarjetas (capa cercana, mayor parallax) */}
      <FloatingCard className="-left-8 top-10" delay={0.5} px={cardAX} py={cardAY}>
        {statsTop}
      </FloatingCard>
      <FloatingCard className="-right-8 bottom-16" delay={0.7} px={cardBX} py={cardBY}>
        {statsBottom}
      </FloatingCard>
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroFade = useTransform(scrollYProgress, [0, 0.85], [1, 0.45]);

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-24 lg:pt-20 overflow-hidden"
    >
      {/* Campo reactivo de puntos (la "reacción al usuario") */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          maskImage: "radial-gradient(80% 70% at 50% 45%, #000 35%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(80% 70% at 50% 45%, #000 35%, transparent 80%)",
        }}
      >
        <ReactiveDotField />
      </div>

      <motion.div
        style={{ opacity: heroFade }}
        className="relative max-w-7xl 2xl:max-w-[1500px] mx-auto px-6 sm:px-8 2xl:px-12 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 2xl:gap-24 items-center w-full"
      >
        <motion.div
          variants={staggerHero}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-7"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-3">
            <span className="h-px w-9 bg-gradient-to-r from-[#34D399] to-transparent" />
            <span className="eyebrow text-[#6EE7B7]">Gestión de proyectos · sin la complejidad</span>
          </motion.div>

          <KineticHeading
            as="h1"
            immediate
            className="font-display text-white leading-[1.02]"
            lineClassName="font-semibold"
            lines={[
              <span key="l1" style={{ fontSize: "clamp(40px, 6vw, 96px)" }}>
                Organiza el trabajo
              </span>,
              <span key="l2" style={{ fontSize: "clamp(40px, 6vw, 96px)" }}>
                de tu equipo con{" "}
                <span className="display-italic text-aurora">claridad</span>.
              </span>,
            ]}
          />

          <motion.p
            variants={fadeInUp}
            className="font-inter text-[#A6B0C9] text-lg leading-relaxed max-w-xl"
          >
            Tareas, tableros, calendario y cronograma en un solo lugar. Flujora reúne
            lo esencial para planificar, colaborar y entregar a tiempo — liviano, en
            español y listo en minutos.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 pt-1">
            <MagneticButton href="#planes">
              <Button size="lg" data-cursor="cta">
                Ver planes
                <ArrowRight className="w-4 h-4" />
              </Button>
            </MagneticButton>
            <a href="#como-funciona">
              <Button size="lg" variant="outline" data-cursor="cta">
                Cómo funciona
              </Button>
            </a>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3"
          >
            {["En español", "Listo en minutos", "Soporte humano"].map((item) => (
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

        <div className="will-change-transform">
          <HeroVisual scrollY={scrollYProgress} />
        </div>
      </motion.div>
    </section>
  );
}
