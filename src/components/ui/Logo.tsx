import { cn } from "@/lib/utils";

/**
 * Marca de Matriarca: cuadrado redondeado con gradiente esmeralda→teal→violeta
 * y un glifo de "columnas" (tablero) que también evoca una "M". Sin assets
 * externos: todo es SVG inline.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-[10px] shadow-[0_8px_22px_-8px_rgba(16,185,129,0.6)]",
        className
      )}
      style={{
        background: "linear-gradient(135deg, #10B981 0%, #14B8A6 50%, #8B5CF6 100%)",
      }}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-[60%] w-[60%]">
        <rect x="4" y="9" width="3.4" height="11" rx="1.7" fill="#ffffff" opacity="0.95" />
        <rect x="10.3" y="4" width="3.4" height="16" rx="1.7" fill="#ffffff" />
        <rect x="16.6" y="11.5" width="3.4" height="8.5" rx="1.7" fill="#ffffff" opacity="0.82" />
      </svg>
    </span>
  );
}

interface LogoProps {
  className?: string;
  markClassName?: string;
  withWordmark?: boolean;
}

export default function Logo({
  className,
  markClassName = "h-9 w-9",
  withWordmark = true,
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <LogoMark className={markClassName} />
      {withWordmark && (
        <span className="font-sora font-bold text-white text-xl leading-none tracking-tight">
          Matriarca
        </span>
      )}
    </span>
  );
}
