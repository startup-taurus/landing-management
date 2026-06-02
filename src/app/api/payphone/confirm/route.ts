import { NextResponse } from "next/server";
import {
  confirmTransactionWithPayphone,
  isApproved,
  sanitizeForClient,
  verifyClientTransactionId,
} from "@/lib/payphone";
import { getTransaction, saveTransaction } from "@/lib/transactions";
import { sendCustomerReceipt, sendInternalNotification } from "@/lib/email";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ConfirmBody {
  id?: number | string;
  clientTransactionId?: string;
}

export async function POST(req: Request) {
  // Guard: pasarela desactivada hasta tener planes/credenciales (ver init/route.ts).
  if (process.env.NEXT_PUBLIC_PAYMENTS_ENABLED !== "true") {
    return NextResponse.json({ success: false, error: "Pagos próximamente" }, { status: 503 });
  }

  const limit = rateLimit(`confirm:${clientIp(req)}`, { capacity: 10, refillPerSec: 0.5 });
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Demasiados intentos. Espera un momento e intenta de nuevo." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let body: ConfirmBody;
  try {
    body = (await req.json()) as ConfirmBody;
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const idNum = Number(body.id);
  const clientTransactionId = (body.clientTransactionId || "").toString();

  if (!Number.isFinite(idNum) || idNum <= 0) {
    return NextResponse.json({ error: "id inválido" }, { status: 400 });
  }
  if (!verifyClientTransactionId(clientTransactionId)) {
    return NextResponse.json({ error: "Referencia inválida" }, { status: 400 });
  }

  const stored = await getTransaction(clientTransactionId);

  if (stored?.status === "approved") {
    return NextResponse.json({
      success: true,
      alreadyConfirmed: true,
      reference: clientTransactionId,
    });
  }

  let payphoneResponse;
  try {
    payphoneResponse = await confirmTransactionWithPayphone({
      id: idNum,
      clientTransactionId,
    });
  } catch (err) {
    console.error("[payphone/confirm] fallo llamando a Payphone:", (err as Error).message);
    return NextResponse.json(
      { success: false, error: "No pudimos verificar el pago. Intenta nuevamente." },
      { status: 502 }
    );
  }

  // Verificación de estado + monto. payphoneResponse.amount es la fuente confiable
  // del monto cobrado (confirmación server-to-server autenticada). Lo comparamos
  // contra el monto que guardamos al iniciar el plan, para cerrar manipulaciones.
  const expectedAmount = stored?.amount;
  const statusApproved = isApproved(payphoneResponse);
  const amountOk =
    typeof expectedAmount === "number" && Number(payphoneResponse.amount) === expectedAmount;
  const approved = statusApproved && amountOk;

  if (statusApproved && !amountOk) {
    console.error(
      `[payphone/confirm] MONTO NO COINCIDE ref=${clientTransactionId} ` +
        `esperado=${expectedAmount} recibido=${payphoneResponse.amount} ` +
        `ppTxId=${payphoneResponse.transactionId}`
    );
  }

  if (stored) {
    const updated = {
      ...stored,
      status: (approved ? "approved" : "failed") as "approved" | "failed",
      confirmedAt: new Date().toISOString(),
      payphoneTransactionId:
        typeof payphoneResponse.transactionId === "number"
          ? payphoneResponse.transactionId
          : undefined,
      authorizationCode: payphoneResponse.authorizationCode,
      cardBrand: payphoneResponse.cardBrand,
      lastDigits: payphoneResponse.lastDigits,
    };
    try {
      await saveTransaction(updated);
    } catch (err) {
      console.error("[payphone/confirm] error guardando:", (err as Error).message);
    }

    if (approved) {
      try {
        await Promise.all([
          sendCustomerReceipt(updated),
          sendInternalNotification(updated),
        ]);
      } catch (err) {
        console.error("[payphone/confirm] error enviando emails:", (err as Error).message);
      }
    }
  }

  return NextResponse.json({
    success: approved,
    reference: clientTransactionId,
    payment: sanitizeForClient(payphoneResponse),
  });
}
