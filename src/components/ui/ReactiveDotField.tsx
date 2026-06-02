'use client';

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ReactiveDotFieldProps {
  className?: string;
  /** Separación de la grilla en px. */
  spacing?: number;
  /** Radio de influencia del puntero en px. */
  radius?: number;
  /** Color base de los puntos (rgb sin alfa). */
  color?: string;
}

/**
 * Campo de puntos en canvas que se ilumina cerca del puntero. Optimizado:
 *  - los puntos en reposo se pintan en UN solo path (1 fill), solo los puntos
 *    dentro del radio se pintan uno a uno;
 *  - el loop rAF SOLO corre mientras el puntero se mueve (se detiene ~0.7s
 *    después del último movimiento) → coste ~0 cuando está quieto;
 *  - se pausa con IntersectionObserver y se desactiva en touch/reduced-motion.
 */
export default function ReactiveDotField({
  className,
  spacing = 36,
  radius = 120,
  color = "110,231,183",
}: ReactiveDotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const elRef = canvasRef.current;
    if (!elRef) return;
    const gRef = elRef.getContext("2d");
    if (!gRef) return;
    const canvas: HTMLCanvasElement = elRef;
    const ctx: CanvasRenderingContext2D = gRef;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const interactive = fine && !reduce;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let left = 0;
    let top = 0;
    let dots: { x: number; y: number }[] = [];
    let raf = 0;
    let running = false;
    let active = false;
    let lastMove = 0;

    let cx = -9999;
    let cy = -9999;

    function measure() {
      const rect = canvas.getBoundingClientRect();
      left = rect.left;
      top = rect.top;
      w = rect.width;
      h = rect.height;
    }

    function build() {
      measure();
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let gy = spacing / 2; gy < h; gy += spacing) {
        for (let gx = spacing / 2; gx < w; gx += spacing) {
          dots.push({ x: gx, y: gy });
        }
      }
    }

    function draw() {
      const mx = cx - left;
      const my = cy - top;
      const on = active && mx > -radius && mx < w + radius && my > -radius && my < h + radius;

      ctx.clearRect(0, 0, w, h);

      // Puntos en reposo: un único path + un solo fill (barato).
      ctx.beginPath();
      ctx.fillStyle = `rgba(${color},0.16)`;
      for (const d of dots) {
        if (on) {
          const dx = d.x - mx;
          const dy = d.y - my;
          if (dx * dx + dy * dy < radius * radius) continue; // se pinta aparte
        }
        ctx.moveTo(d.x + 1.05, d.y);
        ctx.arc(d.x, d.y, 1.05, 0, Math.PI * 2);
      }
      ctx.fill();

      // Puntos dentro del radio: desplazados e iluminados, uno a uno.
      if (on) {
        for (const d of dots) {
          const dx = d.x - mx;
          const dy = d.y - my;
          const d2 = dx * dx + dy * dy;
          if (d2 >= radius * radius) continue;
          const dist = Math.sqrt(d2) || 0.0001;
          const f = 1 - dist / radius;
          const ox = (dx / dist) * f * 11;
          const oy = (dy / dist) * f * 11;
          ctx.beginPath();
          ctx.fillStyle = `rgba(${color},${0.16 + f * 0.6})`;
          ctx.arc(d.x + ox, d.y + oy, 1.05 + f * 1.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function frame() {
      if (performance.now() - lastMove > 700) active = false;
      draw();
      if (active) {
        raf = requestAnimationFrame(frame);
      } else {
        running = false; // queda dibujado el estado en reposo
      }
    }

    function kick() {
      lastMove = performance.now();
      active = true;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    }

    const onMove = (e: PointerEvent) => {
      cx = e.clientX;
      cy = e.clientY;
      // Solo trabaja si el puntero está sobre (o cerca de) el hero.
      const near =
        cx > left - radius &&
        cx < left + w + radius &&
        cy > top - radius &&
        cy < top + h + radius;
      if (near) kick();
      else if (active) {
        active = false;
        if (!running) draw();
      }
    };
    const onLeave = () => {
      active = false;
      draw();
    };
    const onScroll = () => measure();

    build();
    draw(); // primer frame estático (sirve también para touch/reduced-motion)

    let io: IntersectionObserver | null = null;
    if (interactive) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      window.addEventListener("scroll", onScroll, { passive: true });
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) {
              active = false;
              running = false;
              if (raf) cancelAnimationFrame(raf);
              raf = 0;
            }
          }
        },
        { threshold: 0 }
      );
      io.observe(canvas);
    }

    const onResize = () => {
      build();
      draw();
    };
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      active = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      io?.disconnect();
    };
  }, [spacing, radius, color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("block h-full w-full", className)}
    />
  );
}
