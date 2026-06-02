import { NextResponse } from "next/server";
import {
  generateClientTransactionId,
  normalizeEcuadorPhone,
  getPlanTotalCents,
  getPlanLabel,
  computeAmounts,
  type Billing,
  type LeadInput,
} from "@/lib/payphone";
import { saveTransaction } from "@/lib/transactions";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isEmail(s: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  // Guard: la pasarela está cableada pero DESACTIVADA hasta tener planes/credenciales.
  // Cambia NEXT_PUBLIC_PAYMENTS_ENABLED a "true" en .env para activarla.
  if (process.env.NEXT_PUBLIC_PAYMENTS_ENABLED !== "true") {
    return NextResponse.json({ error: "Pagos próximamente" }, { status: 503 });
  }

  const limit = rateLimit(`init:${clientIp(req)}`, { capacity: 5, refillPerSec: 0.2 });
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Demasiados intentos. Espera un momento e intenta de nuevo." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let body: Partial<LeadInput> & { planId?: string; billing?: string };
  try {
    body = (await req.json()) as Partial<LeadInput> & { planId?: string; billing?: string };
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const name = (body.name || "").toString().trim();
  const email = (body.email || "").toString().trim().toLowerCase();
  const phoneRaw = (body.phone || "").toString().trim();
  const phone = normalizeEcuadorPhone(phoneRaw);
  const planId = (body.planId || "").toString().trim();
  const billing: Billing = body.billing === "annual" ? "annual" : "monthly";

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json({ error: "Nombre inválido" }, { status: 400 });
  }
  if (!isEmail(email) || email.length > 120) {
    return NextResponse.json({ error: "Email inválido" }, { status: 400 });
  }
  if (!phone) {
    return NextResponse.json(
      { error: "Teléfono inválido. Usa un celular ecuatoriano (ej. 0994312472)." },
      { status: 400 }
    );
  }

  // Monto del plan: la fuente de verdad vive en el servidor (no se confía en el cliente).
  const totalCents = getPlanTotalCents(planId, billing);
  if (totalCents === null || totalCents <= 0) {
    return NextResponse.json({ error: "Plan inválido" }, { status: 400 });
  }
  const amounts = computeAmounts(totalCents);
  const planLabel = getPlanLabel(planId, billing);

  let clientTransactionId: string;
  try {
    clientTransactionId = generateClientTransactionId();
  } catch (err) {
    console.error("[payphone/init]", (err as Error).message);
    return NextResponse.json({ error: "Configuración del servidor incompleta" }, { status: 500 });
  }

  try {
    await saveTransaction({
      clientTransactionId,
      status: "pending",
      createdAt: new Date().toISOString(),
      lead: { name, email, phone },
      planId,
      billing,
      planLabel,
      amount: amounts.amount,
    });
  } catch (err) {
    console.error("[payphone/init] error guardando lead:", (err as Error).message);
  }

  return NextResponse.json({
    clientTransactionId,
    phone,
    email,
    reference: planLabel,
    amount: amounts.amount,
    amountWithTax: amounts.amountWithTax,
    amountWithoutTax: amounts.amountWithoutTax,
    tax: amounts.tax,
  });
}
