'use client';

import { motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import {
  Check,
  Lock,
  ShieldCheck,
  Loader2,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  ArrowRight,
  Cpu,
} from "lucide-react";
import Button from "@/components/ui/Button";
import KineticHeading from "@/components/ui/KineticHeading";
import PayphoneBox from "@/components/payphone/PayphoneBox";
import { WHATSAPP_URL } from "@/lib/contact";
import { fadeInUp, staggerCards, VIEWPORT_DEFAULT } from "@/lib/animations";

// La pasarela está cableada pero DESACTIVADA hasta tener credenciales.
// (Esta constante se reemplaza en build con el valor de .env.)
const PAYMENTS_ENABLED = process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === "true";

type Billing = "monthly" | "annual";

interface Tier {
  id: string;
  name: string;
  tagline: string;
  users: string;
  monthly: number | null; // USD/mes (null = cotización)
  annual: number | null; // USD/mes equivalente facturando anual
  annualBilled?: string; // texto del total anual
  ai: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  payable?: boolean;
  custom?: boolean; // Enterprise → cotización
}

const TIERS: Tier[] = [
  {
    id: "base",
    name: "Equipo Base",
    tagline: "Para equipos que arrancan con orden",
    users: "Hasta 10 usuarios",
    monthly: 99.9,
    annual: 79.9,
    annualBilled: "$958.80 facturado al año",
    ai: "Sin créditos de IA",
    features: [
      "Proyectos ilimitados",
      "Tareas y subtareas ilimitadas",
      "Vistas Lista, Tablero y Calendario",
      "Hasta 10 usuarios",
      "Dashboards básicos",
      "Soporte en español",
    ],
    cta: "Empezar con Base",
    payable: true,
  },
  {
    id: "pro",
    name: "Equipo Pro",
    tagline: "Todo lo del equipo, ahora con IA",
    users: "Hasta 20 usuarios",
    monthly: 199.8,
    annual: 159.8,
    annualBilled: "$1,917.60 facturado al año",
    ai: "5,000 créditos de IA / mes",
    features: [
      "Todo lo de Base",
      "Hasta 20 usuarios",
      "Cronograma (Gantt) y dependencias",
      "Automatizaciones",
      "Seguimiento de tiempo",
      "Permisos avanzados",
      "Soporte prioritario",
    ],
    cta: "Elegir Pro",
    highlight: true,
    payable: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Para organizaciones a medida",
    users: "Personalizado (30+)",
    monthly: null,
    annual: null,
    ai: "Créditos de IA a medida",
    features: [
      "Todo lo de Pro",
      "Usuarios a medida (30+)",
      "Créditos de IA ilimitados / a medida",
      "SSO/SAML y seguridad avanzada",
      "Onboarding y gerente de cuenta",
      "SLA y soporte prioritario",
      "Facturación personalizada",
    ],
    cta: "Hablar con ventas",
    payable: false,
    custom: true,
  },
];

function priceFor(tier: Tier, billing: Billing): number | null {
  return billing === "monthly" ? tier.monthly : tier.annual;
}
function formatUSD(n: number): string {
  return `$${n.toFixed(2)}`;
}

interface LeadForm {
  name: string;
  email: string;
  phone: string;
}
const INITIAL: LeadForm = { name: "", email: "", phone: "" };

type Stage = "form" | "loading" | "pay" | "error";

interface InitResult {
  clientTransactionId: string;
  phone: string;
  email: string;
  amount: number;
  amountWithTax: number;
  amountWithoutTax: number;
  tax: number;
  reference: string;
}

export default function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [checkoutTier, setCheckoutTier] = useState<Tier | null>(null);

  return (
    <section id="planes" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="relative max-w-6xl 2xl:max-w-[1320px] mx-auto px-6 sm:px-8 2xl:px-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_DEFAULT}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <span className="h-px w-9 bg-gradient-to-r from-transparent to-[#34D399]" />
            <span className="eyebrow text-[#6EE7B7]">Planes</span>
            <span className="h-px w-9 bg-gradient-to-l from-transparent to-[#34D399]" />
          </motion.div>
          <KineticHeading
            as="h2"
            className="font-display font-semibold text-white flex flex-col items-center"
            lineClassName="text-center"
            lines={[
              <span key="l1" style={{ fontSize: "clamp(28px, 3.6vw, 46px)" }}>
                Precios claros,
              </span>,
              <span key="l2" style={{ fontSize: "clamp(28px, 3.6vw, 46px)" }}>
                <span className="display-italic text-aurora">sin sorpresas</span>.
              </span>,
            ]}
          />
          <motion.p
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_DEFAULT}
            className="font-inter text-[#A6B0C9] text-lg leading-relaxed mt-5"
          >
            Elige el plan para tu equipo. Cambias o cancelas cuando quieras.
          </motion.p>
        </div>

        {/* Toggle mensual / anual */}
        {!checkoutTier && (
          <div className="flex justify-center mb-12">
            <BillingToggle billing={billing} setBilling={setBilling} />
          </div>
        )}

        {checkoutTier && PAYMENTS_ENABLED ? (
          <CheckoutCard
            tier={checkoutTier}
            billing={billing}
            onBack={() => setCheckoutTier(null)}
          />
        ) : (
          <motion.div
            variants={staggerCards}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_DEFAULT}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 items-stretch"
          >
            {TIERS.map((tier) => (
              <PlanCard
                key={tier.id}
                tier={tier}
                billing={billing}
                onChoose={() => setCheckoutTier(tier)}
              />
            ))}
          </motion.div>
        )}

        {!PAYMENTS_ENABLED && (
          <p className="text-center font-inter text-[13px] text-[#A6B0C9]/55 mt-8">
            El pago en línea con tarjeta estará disponible muy pronto. Mientras tanto,{" "}
            <a href="#contacto" className="text-[#34D399] hover:underline">
              escríbenos para contratar hoy
            </a>
            .
          </p>
        )}
      </div>
    </section>
  );
}

function BillingToggle({ billing, setBilling }: { billing: Billing; setBilling: (b: Billing) => void }) {
  const opts: { id: Billing; label: string }[] = [
    { id: "monthly", label: "Mensual" },
    { id: "annual", label: "Anual" },
  ];
  return (
    <div className="relative inline-flex items-center gap-1 p-1 rounded-full border border-[#26304A] bg-[#131B2E]/70 backdrop-blur-sm">
      {opts.map((o) => {
        const active = billing === o.id;
        return (
          <button
            key={o.id}
            type="button"
            data-cursor="cta"
            onClick={() => setBilling(o.id)}
            className="relative px-5 py-2 rounded-full text-sm font-inter font-medium transition-colors"
          >
            {active && (
              <motion.span
                layoutId="billing-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#10B981] to-[#0D9488] shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className={`relative z-10 ${active ? "text-white" : "text-[#A6B0C9]"}`}>
              {o.label}
            </span>
          </button>
        );
      })}
      <span className="ml-1 mr-2 inline-flex items-center px-2 py-0.5 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 font-mono text-[10px] text-[#C4B5FD]">
        −20%
      </span>
    </div>
  );
}

function PlanCard({ tier, billing, onChoose }: { tier: Tier; billing: Billing; onChoose: () => void }) {
  const featured = !!tier.highlight;
  const price = priceFor(tier, billing);

  return (
    <motion.div
      variants={fadeInUp}
      className={`group relative rounded-card p-7 flex flex-col h-full transition-colors duration-300 ${
        featured
          ? "border border-[#10B981]/40 bg-[#131B2E]/85 shadow-[0_30px_80px_-30px_rgba(16,185,129,0.5)]"
          : "border border-[#26304A] bg-[#131B2E]/55 hover:border-[#10B981]/30"
      }`}
    >
      {featured && (
        <>
          <span
            aria-hidden
            className="absolute inset-0 rounded-card pointer-events-none"
            style={{
              padding: 1,
              background:
                "linear-gradient(140deg, rgba(16,185,129,0.6), rgba(139,92,246,0.45) 60%, rgba(255,255,255,0))",
              WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-semibold font-inter text-white bg-gradient-to-r from-[#10B981] to-[#8B5CF6] shadow-[0_8px_20px_-8px_rgba(139,92,246,0.7)] z-10">
            <Sparkles className="w-3 h-3" /> Recomendado
          </span>
        </>
      )}

      <div className="relative">
        <h3 className="font-display font-semibold text-white text-xl mb-1">{tier.name}</h3>
        <p className="font-inter text-sm text-[#A6B0C9]/75 mb-1.5 min-h-[40px]">{tier.tagline}</p>
        <p className="font-mono text-[11px] text-[#A6B0C9]/55 mb-5">{tier.users}</p>

        <div className="mb-2 min-h-[60px]">
          {tier.custom || price === null ? (
            <span className="font-display font-semibold text-white text-3xl">Cotización</span>
          ) : (
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono font-semibold text-white text-4xl tracking-tight">
                {formatUSD(price)}
              </span>
              <span className="font-inter text-[12px] text-[#A6B0C9]/55">/ mes</span>
            </div>
          )}
          {!tier.custom && billing === "annual" && tier.annualBilled && (
            <p className="font-inter text-[11px] text-[#34D399]/80 mt-1">{tier.annualBilled}</p>
          )}
          {!tier.custom && billing === "monthly" && (
            <p className="font-inter text-[11px] text-[#A6B0C9]/45 mt-1">facturado mensual</p>
          )}
        </div>

        {/* Línea de créditos IA */}
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-5 border ${
            tier.ai.startsWith("Sin")
              ? "border-[#26304A] bg-[#0E1525]/60 text-[#A6B0C9]/65"
              : "border-[#8B5CF6]/25 bg-[#8B5CF6]/10 text-[#C4B5FD]"
          }`}
        >
          <Cpu className="w-3.5 h-3.5 shrink-0" />
          <span className="font-inter text-[12px] leading-tight">{tier.ai}</span>
        </div>

        <ul className="space-y-2.5 mb-7">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <span className="mt-0.5 w-4 h-4 shrink-0 rounded-full bg-[#10B981]/15 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-[#34D399]" strokeWidth={3.5} />
              </span>
              <span className="font-inter text-[13px] text-[#D5DCEC] leading-snug">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-auto">
        <PlanCTA tier={tier} onChoose={onChoose} featured={featured} />
      </div>
    </motion.div>
  );
}

function PlanCTA({ tier, onChoose, featured }: { tier: Tier; onChoose: () => void; featured: boolean }) {
  // Enterprise → ventas (contacto).
  if (tier.custom || !tier.payable) {
    return (
      <a href="#contacto" className="block" data-cursor="cta">
        <Button variant={featured ? "primary" : "outline"} className="w-full justify-center">
          {tier.cta}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </a>
    );
  }

  // Planes de pago con la pasarela ACTIVA → checkout.
  if (PAYMENTS_ENABLED) {
    return (
      <Button
        variant={featured ? "primary" : "outline"}
        className="w-full justify-center"
        onClick={onChoose}
        data-cursor="cta"
      >
        {tier.cta}
        <ArrowRight className="w-4 h-4" />
      </Button>
    );
  }

  // Pasarela DESACTIVADA → captar lead por contacto / WhatsApp.
  return (
    <div>
      <a href="#contacto" className="block" data-cursor="cta">
        <Button variant={featured ? "primary" : "outline"} className="w-full justify-center">
          Quiero este plan
          <ArrowRight className="w-4 h-4" />
        </Button>
      </a>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-center font-inter text-[12px] text-[#A6B0C9]/70 hover:text-[#34D399] transition-colors mt-2.5"
      >
        o escríbenos por WhatsApp
      </a>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Checkout (solo se monta cuando PAYMENTS_ENABLED === true).
// Todo el cableado de Payphone está aquí, listo para activarse.
// ─────────────────────────────────────────────────────────────────────────────
function CheckoutCard({ tier, billing, onBack }: { tier: Tier; billing: Billing; onBack: () => void }) {
  const [form, setForm] = useState<LeadForm>(INITIAL);
  const [stage, setStage] = useState<Stage>("form");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [initData, setInitData] = useState<InitResult | null>(null);

  function update<K extends keyof LeadForm>(key: K, value: LeadForm[K]) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");
    setStage("loading");
    try {
      const res = await fetch("/api/payphone/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, planId: tier.id, billing }),
      });
      const data = (await res.json()) as Partial<InitResult> & { error?: string };
      if (
        !res.ok ||
        !data.clientTransactionId ||
        !data.phone ||
        !data.email ||
        typeof data.amount !== "number"
      ) {
        throw new Error(data.error || "No pudimos iniciar el pago.");
      }
      setInitData({
        clientTransactionId: data.clientTransactionId,
        phone: data.phone,
        email: data.email,
        amount: data.amount,
        amountWithTax: data.amountWithTax ?? 0,
        amountWithoutTax: data.amountWithoutTax ?? 0,
        tax: data.tax ?? 0,
        reference: data.reference ?? "",
      });
      setStage("pay");
    } catch (err) {
      setErrorMsg((err as Error).message);
      setStage("error");
    }
  }

  function resetForm() {
    setStage("form");
    setErrorMsg("");
    setInitData(null);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mx-auto max-w-5xl rounded-[24px] overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(19,27,46,0.95) 0%, rgba(14,21,37,0.95) 100%)",
        border: "1px solid #26304A",
        boxShadow: "0 40px 100px -24px rgba(0,0,0,0.65), 0 0 0 1px rgba(16,185,129,0.08) inset",
      }}
    >
      <CheckoutHeader stage={stage} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-0">
        <OrderSummary tier={tier} billing={billing} onBack={onBack} />

        <div className="p-7 sm:p-9 bg-[#0A0F1E]/40 border-t lg:border-t-0 lg:border-l border-[#26304A]">
          {stage === "form" && <FormStage form={form} update={update} onSubmit={handleSubmit} />}

          {stage === "loading" && (
            <div className="flex flex-col items-center justify-center text-center py-20">
              <Loader2 className="w-10 h-10 text-[#34D399] animate-spin mb-4" />
              <p className="font-inter text-[#A6B0C9]">Preparando tu pago seguro…</p>
            </div>
          )}

          {stage === "pay" && initData && (
            <PayStage
              init={initData}
              onError={(msg) => {
                setErrorMsg(msg);
                setStage("error");
              }}
              onBack={resetForm}
            />
          )}

          {stage === "error" && <ErrorStage message={errorMsg} onRetry={resetForm} />}
        </div>
      </div>

      <CheckoutFooter />
    </motion.div>
  );
}

function CheckoutHeader({ stage }: { stage: Stage }) {
  const steps = [
    { id: "form", label: "Tus datos" },
    { id: "pay", label: "Pago" },
    { id: "done", label: "Confirmación" },
  ];
  const activeIndex = stage === "form" ? 0 : stage === "loading" || stage === "pay" || stage === "error" ? 1 : 2;

  return (
    <div className="px-7 sm:px-9 py-5 border-b border-[#26304A] flex items-center justify-between gap-4 bg-[#0E1525]/60">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#10B981] to-[#0D9488] flex items-center justify-center shadow-[0_4px_16px_rgba(16,185,129,0.4)]">
          <ShieldCheck className="w-4 h-4 text-white" strokeWidth={2.2} />
        </div>
        <div className="leading-tight">
          <div className="font-display font-semibold text-white text-sm">Checkout seguro</div>
          <div className="font-mono text-[11px] text-[#A6B0C9]/55">Cifrado SSL · Payphone EC</div>
        </div>
      </div>

      <ol className="hidden sm:flex items-center gap-2 text-xs">
        {steps.map((s, i) => {
          const done = i < activeIndex;
          const current = i === activeIndex;
          return (
            <li key={s.id} className="flex items-center gap-2">
              <span
                className={`w-5 h-5 rounded-full inline-flex items-center justify-center font-mono text-[10px] font-bold transition-colors ${
                  done
                    ? "bg-[#10B981] text-[#0A0F1E]"
                    : current
                      ? "bg-[#10B981]/15 text-[#34D399] ring-1 ring-[#10B981]/50"
                      : "bg-[#1A2336] text-[#A6B0C9]/50"
                }`}
              >
                {done ? <Check className="w-3 h-3" strokeWidth={3} /> : i + 1}
              </span>
              <span
                className={`font-inter font-medium ${
                  current ? "text-white" : done ? "text-[#A6B0C9]" : "text-[#A6B0C9]/45"
                }`}
              >
                {s.label}
              </span>
              {i < steps.length - 1 && <span className="w-6 h-px bg-[#26304A]" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function OrderSummary({ tier, billing, onBack }: { tier: Tier; billing: Billing; onBack: () => void }) {
  const price = priceFor(tier, billing);
  const priceLabel = tier.custom || price === null ? "Cotización" : `${formatUSD(price)} / mes`;
  const periodLabel = billing === "annual" ? "facturación anual" : "facturación mensual";

  return (
    <div className="p-7 sm:p-9">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 font-inter text-sm text-[#A6B0C9]/70 hover:text-white transition-colors mb-5"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Ver todos los planes
      </button>

      <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#A6B0C9]/55 mb-4">
        Resumen de tu orden
      </div>

      <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#26304A]">
        <div className="flex-1 min-w-0">
          <div className="font-display font-semibold text-white text-base mb-0.5">
            Flujora — {tier.name}
          </div>
          <div className="font-inter text-sm text-[#A6B0C9]/70">{tier.tagline}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-mono font-semibold text-white text-lg">{priceLabel}</div>
          <div className="font-inter text-[11px] text-[#A6B0C9]/55">{periodLabel}</div>
        </div>
      </div>

      <ul className="space-y-2.5 py-5">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <span className="mt-1 w-4 h-4 shrink-0 rounded-full bg-[#10B981]/15 flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-[#34D399]" strokeWidth={3.5} />
            </span>
            <span className="font-inter text-[13px] text-[#D5DCEC] leading-snug">{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-2 flex items-center gap-2 px-3 py-2.5 rounded-lg bg-[#10B981]/8 border border-[#10B981]/20">
        <Lock className="w-3.5 h-3.5 text-[#34D399] shrink-0" strokeWidth={2} />
        <span className="font-inter text-[12px] text-[#D5DCEC] leading-tight">
          Tus datos de tarjeta nunca pasan por nuestros servidores.
        </span>
      </div>
    </div>
  );
}

function CheckoutFooter() {
  return (
    <div className="px-7 sm:px-9 py-4 border-t border-[#26304A] bg-[#0E1525]/40 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2 font-inter text-[11px] text-[#A6B0C9]/55">
        <Lock className="w-3 h-3" strokeWidth={2} /> Pago procesado por{" "}
        <span className="font-semibold text-[#A6B0C9]/80">Payphone Ecuador</span>
      </div>
      <div className="flex items-center gap-3 opacity-80">
        {["VISA", "Mastercard", "Diners", "Discover"].map((c) => (
          <span
            key={c}
            className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A6B0C9]/70 px-2 py-1 rounded border border-[#26304A] bg-[#0E1525]/80"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

function FormStage({
  form,
  update,
  onSubmit,
}: {
  form: LeadForm;
  update: <K extends keyof LeadForm>(k: K, v: LeadForm[K]) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <form onSubmit={onSubmit}>
      <h3 className="font-display font-semibold text-white text-lg mb-1">Información del titular</h3>
      <p className="font-inter text-[#A6B0C9]/65 text-sm mb-6">
        Usaremos estos datos para enviarte el comprobante y tus credenciales.
      </p>

      <div className="space-y-4">
        <Field
          label="Nombre completo"
          type="text"
          placeholder="Tu nombre"
          value={form.name}
          onChange={(v) => update("name", v)}
          required
          autoComplete="name"
        />
        <Field
          label="Correo electrónico"
          type="email"
          placeholder="tucorreo@email.com"
          value={form.email}
          onChange={(v) => update("email", v)}
          required
          autoComplete="email"
        />
        <PhoneField value={form.phone} onChange={(v) => update("phone", v)} />

        <div className="pt-3">
          <Button size="lg" className="w-full justify-center">
            <Lock className="w-4 h-4" strokeWidth={2.2} />
            Continuar al pago seguro
          </Button>
          <p className="font-inter text-[11px] text-[#A6B0C9]/50 text-center mt-3 leading-relaxed">
            Al continuar aceptas que Payphone procese tu pago de forma segura.
            <br />
            No guardamos información de tu tarjeta.
          </p>
        </div>
      </div>
    </form>
  );
}

function PayStage({
  init,
  onError,
  onBack,
}: {
  init: InitResult;
  onError: (m: string) => void;
  onBack: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-1.5 font-inter text-sm text-[#A6B0C9]/70 hover:text-white transition-colors mb-5"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Volver a editar mis datos
      </button>

      <h3 className="font-display font-semibold text-white text-lg mb-1">Método de pago</h3>
      <p className="font-inter text-[#A6B0C9]/65 text-sm mb-5">
        Completa los datos de tu tarjeta en la pasarela cifrada de Payphone.
      </p>

      <div className="rounded-xl border border-[#26304A] bg-[#0E1525]/60 p-4 sm:p-5 mb-4">
        <PayphoneBox
          clientTransactionId={init.clientTransactionId}
          email={init.email}
          phone={init.phone}
          amount={init.amount}
          amountWithTax={init.amountWithTax}
          amountWithoutTax={init.amountWithoutTax}
          tax={init.tax}
          reference={init.reference}
          onError={onError}
        />
      </div>

      <div className="flex items-center justify-between gap-3 px-1">
        <span className="inline-flex items-center gap-1.5 font-inter text-[11px] text-[#A6B0C9]/55">
          <Lock className="w-3 h-3" /> Conexión cifrada extremo a extremo
        </span>
        <span className="font-mono text-[10px] text-[#A6B0C9]/45">
          Ref: {init.clientTransactionId.slice(4, 22)}
        </span>
      </div>
    </div>
  );
}

function ErrorStage({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center text-center py-10">
      <div className="w-14 h-14 rounded-full bg-red-500/15 flex items-center justify-center mb-4 ring-1 ring-red-500/30">
        <AlertCircle className="w-7 h-7 text-red-400" />
      </div>
      <h3 className="font-display font-semibold text-white text-lg mb-2">No pudimos continuar</h3>
      <p className="font-inter text-sm text-[#A6B0C9] mb-6 max-w-sm leading-relaxed">
        {message ||
          "Hubo un problema procesando tu solicitud. Inténtalo de nuevo en unos segundos."}
      </p>
      <Button onClick={onRetry} variant="outline">
        Reintentar
      </Button>
    </div>
  );
}

function Field({
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
  autoComplete,
}: {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="block font-mono text-[12px] font-semibold uppercase tracking-wider text-[#A6B0C9]/75 mb-2">
        {label}
        {required && <span className="text-[#34D399]"> *</span>}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        className="w-full px-4 py-3 rounded-lg border border-[#26304A] bg-[#0A0F1E]/80 font-inter text-[15px] text-[#F4F6FB] placeholder:text-[#A6B0C9]/30 focus:outline-none focus:ring-2 focus:ring-[#10B981]/40 focus:border-[#10B981] transition-all"
      />
    </label>
  );
}

function PhoneField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  function handleChange(raw: string) {
    const cleaned = raw.replace(/[^\d]/g, "").slice(0, 10);
    onChange(cleaned);
  }

  const digits = value.replace(/\D/g, "");
  let local = digits;
  if (local.startsWith("593")) local = local.slice(3);
  if (local.startsWith("0")) local = local.slice(1);
  const valid = /^9\d{8}$/.test(local);

  const hint = !value
    ? "Ingresa tu celular (10 dígitos, ej. 0994312472)"
    : valid
      ? `Se enviará como +593${local}`
      : "Debe ser un celular ecuatoriano válido (empieza con 09)";

  return (
    <label className="block">
      <span className="block font-mono text-[12px] font-semibold uppercase tracking-wider text-[#A6B0C9]/75 mb-2">
        Celular <span className="text-[#34D399]">*</span>
      </span>
      <div className="relative flex items-stretch rounded-lg border border-[#26304A] bg-[#0A0F1E]/80 focus-within:ring-2 focus-within:ring-[#10B981]/40 focus-within:border-[#10B981] transition-all overflow-hidden">
        <span className="inline-flex items-center px-3 bg-[#131B2E] border-r border-[#26304A] font-mono text-sm text-[#A6B0C9] select-none">
          🇪🇨 +593
        </span>
        <input
          type="tel"
          inputMode="numeric"
          placeholder="0994312472"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          required
          autoComplete="tel-national"
          className="flex-1 px-4 py-3 bg-transparent font-inter text-[15px] text-[#F4F6FB] placeholder:text-[#A6B0C9]/30 focus:outline-none"
        />
      </div>
      <span className={`block font-inter text-[11px] mt-1.5 ${valid ? "text-[#34D399]" : "text-[#A6B0C9]/55"}`}>
        {hint}
      </span>
    </label>
  );
}
