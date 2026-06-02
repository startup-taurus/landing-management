'use client';

import { AnimatePresence, motion } from "framer-motion";
import { Plus, MessageCircle } from "lucide-react";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { WHATSAPP_URL } from "@/lib/contact";
import { FAQS as faqs } from "@/lib/faq";

function FAQItem({
  q,
  a,
  open,
  onClick,
}: {
  q: string;
  a: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`rounded-card border bg-[#131B2E] transition-colors ${
        open
          ? "border-[#10B981]/45 shadow-[0_0_40px_-15px_rgba(16,185,129,0.45)]"
          : "border-[#26304A]"
      }`}
    >
      <button
        type="button"
        onClick={onClick}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-6 px-5 sm:px-7 py-5 text-left group"
      >
        <span className="font-sora font-semibold text-white text-base sm:text-lg">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
            open
              ? "bg-gradient-to-br from-[#10B981] to-[#8B5CF6] text-white"
              : "bg-[#0E1525] text-[#A6B0C9] group-hover:bg-[#10B981]/15 group-hover:text-[#34D399]"
          } transition-colors`}
          aria-hidden
        >
          <Plus className="w-4 h-4" strokeWidth={2.4} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.25, delay: 0.05 },
            }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-7 pb-6 -mt-1">
              <p className="font-inter text-[#A6B0C9] leading-relaxed text-sm sm:text-base">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-28 overflow-hidden bg-[#0E1525]">
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-[#10B981]/6 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-4xl mx-auto px-6">
        <div className="text-center mb-12 sm:mb-14">
          <Reveal variant="up">
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-[#34D399] mb-4">
              Preguntas frecuentes
            </span>
          </Reveal>
          <Reveal variant="up" delay={0.05}>
            <h2 className="font-sora font-bold text-white mb-4" style={{ fontSize: "clamp(28px, 3.6vw, 44px)" }}>
              Lo que más nos <span className="text-aurora">preguntan</span>
            </h2>
          </Reveal>
          <Reveal variant="up" delay={0.1}>
            <p className="font-inter text-[#A6B0C9] text-lg">
              Si la tuya no está, escríbenos por WhatsApp y te respondemos directo.
            </p>
          </Reveal>
        </div>

        <Reveal variant="up" delay={0.1}>
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((f, i) => (
              <FAQItem
                key={f.q}
                q={f.q}
                a={f.a}
                open={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              />
            ))}
          </div>
        </Reveal>

        <Reveal variant="up" delay={0.1}>
          <div className="mt-12 text-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-btn bg-[#131B2E] border border-[#26304A] font-inter text-sm font-medium text-white hover:bg-[#10B981]/10 hover:border-[#10B981]/40 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-[#34D399]" />
              ¿Tu pregunta no está? Escríbenos por WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
