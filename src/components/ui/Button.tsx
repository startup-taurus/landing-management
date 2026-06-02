import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "outline-light" | "ghost" | "whatsapp";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 font-inter font-semibold rounded-btn transition-all duration-300 cursor-pointer select-none active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0F1E]",
          size === "sm" && "px-4 py-2 text-sm",
          size === "md" && "px-6 py-3 text-base",
          size === "lg" && "px-7 py-3.5 text-base",
          variant === "primary" &&
            "text-white bg-gradient-to-br from-[#10B981] to-[#0D9488] shadow-[0_18px_40px_-12px_rgba(16,185,129,0.55)] hover:shadow-[0_24px_60px_-10px_rgba(16,185,129,0.7)] hover:-translate-y-0.5",
          variant === "outline" &&
            "border border-[#26304A] text-white bg-white/5 backdrop-blur hover:border-[#10B981] hover:bg-[#10B981]/10 hover:-translate-y-0.5",
          variant === "outline-light" &&
            "border border-[#E3E8F2] text-[#1B2335] bg-white/70 backdrop-blur hover:border-[#10B981] hover:bg-[#10B981]/8 hover:-translate-y-0.5",
          variant === "ghost" &&
            "text-white/80 hover:text-[#34D399] hover:bg-white/5",
          variant === "whatsapp" &&
            "text-white shadow-[0_18px_40px_-10px_rgba(37,211,102,0.5)] hover:-translate-y-0.5 hover:shadow-[0_24px_60px_-10px_rgba(37,211,102,0.7)]",
          className
        )}
        style={
          variant === "whatsapp"
            ? { background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }
            : undefined
        }
        {...props}
      >
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
