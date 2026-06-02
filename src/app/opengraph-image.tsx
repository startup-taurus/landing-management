import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Flujora — Gestión de proyectos simple para equipos";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

function Mark() {
  return (
    <div
      style={{
        width: 72,
        height: 72,
        borderRadius: 20,
        background: "linear-gradient(135deg, #10B981 0%, #14B8A6 50%, #8B5CF6 100%)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 6,
        padding: 16,
        boxShadow: "0 18px 40px -10px rgba(16,185,129,0.55)",
      }}
    >
      <div style={{ width: 9, height: 26, borderRadius: 5, background: "rgba(255,255,255,0.95)", display: "flex" }} />
      <div style={{ width: 9, height: 40, borderRadius: 5, background: "#fff", display: "flex" }} />
      <div style={{ width: 9, height: 20, borderRadius: 5, background: "rgba(255,255,255,0.82)", display: "flex" }} />
    </div>
  );
}

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0A0F1E",
          color: "#F4F6FB",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            right: -120,
            width: 540,
            height: 540,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,185,129,0.30) 0%, rgba(16,185,129,0) 70%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -200,
            left: -140,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139,92,246,0.28) 0%, rgba(139,92,246,0) 70%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <Mark />
          <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1, color: "#F4F6FB" }}>
            Flujora
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 74,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1020,
              color: "#F4F6FB",
            }}
          >
            Organiza el trabajo de tu equipo con claridad.
          </div>
          <div style={{ fontSize: 28, opacity: 0.85, maxWidth: 940, lineHeight: 1.35, color: "#A6B0C9" }}>
            Tareas, tableros, calendario y cronograma en un solo lugar. Gestión de
            proyectos simple, en español y liviana.
          </div>
          <div style={{ marginTop: 12, fontSize: 18, color: "#A6B0C9", letterSpacing: 0.5, display: "flex" }}>
            flujora.com  ·  Gestión de proyectos
          </div>
        </div>
      </div>
    ),
    size
  );
}
