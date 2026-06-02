import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
}

export default function Badge({ children, className, tone = "dark" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium font-inter",
        tone === "dark"
          ? "bg-[#10B981]/10 text-[#34D399] border border-[#10B981]/30"
          : "bg-[#10B981]/8 text-[#059669] border border-[#10B981]/25",
        className
      )}
    >
      {children}
    </span>
  );
}
