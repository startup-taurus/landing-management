'use client';

/**
 * Capa de fondo ÚNICA a nivel página (fija): aurora a la deriva + rejilla +
 * viñeta + grano. Sustituye al blob/divisor que cada sección repetía, dando un
 * telón continuo. Todo es transform/opacity sobre capas estáticas (GPU), sin
 * trabajo por movimiento de puntero. pointer-events: none; detrás del contenido.
 */
export default function PageAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Aurora — dos focos de color que derivan lento (transform GPU) */}
      <div
        className="absolute -top-[15%] -left-[10%] h-[48vh] w-[48vw] rounded-full blur-[90px] animate-aurora-pan will-change-transform"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.18), transparent 65%)" }}
      />
      <div
        className="absolute bottom-[-12%] right-[-8%] h-[46vh] w-[46vw] rounded-full blur-[100px] animate-aurora-pan will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.16), transparent 65%)",
          animationDelay: "-11s",
        }}
      />

      {/* Rejilla técnica tenue */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      {/* Viñeta para asentar el contenido */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, transparent 55%, rgba(10,15,30,0.55) 100%)",
        }}
      />

      {/* Grano fino */}
      <div className="noise-overlay absolute inset-0" />
    </div>
  );
}
