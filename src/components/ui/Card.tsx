import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
}

export default function Card({ children, className, tone = "dark" }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-card p-6",
        tone === "dark"
          ? "bg-[#1A2336] border border-[#26304A] shadow-card"
          : "bg-white border border-[#E3E8F2] shadow-[0_4px_24px_rgba(15,23,42,0.06)]",
        className
      )}
    >
      {children}
    </div>
  );
}
