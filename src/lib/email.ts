import type { StoredTransaction } from "./payphone";
import { PLAN_LABEL } from "./payphone";
import { WHATSAPP_DISPLAY } from "./contact";

interface SendArgs {
  to: string | string[];
  subject: string;
  html: string;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendViaResend(args: SendArgs): Promise<{ ok: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || "Flujora <no-reply@flujora.com>";
  if (!apiKey) {
    console.log(`[email] saltado (RESEND_API_KEY vacío) → ${args.to} :: ${args.subject}`);
    return { ok: false, reason: "no-api-key" };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: args.to, subject: args.subject, html: args.html }),
    });
    if (!res.ok) {
      let detail = "";
      try {
        detail = JSON.stringify(await res.json());
      } catch {}
      console.error(`[email] Resend respondió ${res.status} :: ${detail.slice(0, 200)}`);
      return { ok: false, reason: `resend-${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    console.error("[email] error enviando vía Resend:", (err as Error).message);
    return { ok: false, reason: "network" };
  }
}

const BRAND_COLOR = "#10B981";
const ACCENT = "#8B5CF6";
const BG = "#0A0F1E";

function shell(title: string, body: string): string {
  return `<!doctype html>
<html lang="es">
  <body style="margin:0;padding:0;background:${BG};font-family:Inter,Arial,sans-serif;color:#F4F6FB">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${BG};padding:32px 16px">
      <tr><td align="center">
        <table role="presentation" width="560" cellspacing="0" cellpadding="0" style="max-width:560px;background:#131B2E;border:1px solid #26304A;border-radius:16px;overflow:hidden">
          <tr><td style="height:4px;background:linear-gradient(90deg,${BRAND_COLOR},${ACCENT})"></td></tr>
          <tr><td style="padding:26px 32px;border-bottom:1px solid #26304A">
            <div style="font-size:20px;font-weight:700;color:${BRAND_COLOR};letter-spacing:-0.01em">Flujora</div>
          </td></tr>
          <tr><td style="padding:28px 32px">
            <h1 style="margin:0 0 16px;font-size:22px;color:#FFFFFF;font-weight:700">${title}</h1>
            <div style="font-size:15px;line-height:1.6;color:#A6B0C9">${body}</div>
          </td></tr>
          <tr><td style="padding:20px 32px;border-top:1px solid #26304A;font-size:12px;color:#7d889f">
            Flujora · gestión de proyectos · Latinoamérica
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 0;color:#7d889f;font-size:13px;width:42%">${escapeHtml(label)}</td>
    <td style="padding:8px 0;color:#FFFFFF;font-size:14px;font-weight:600">${escapeHtml(value)}</td>
  </tr>`;
}

export async function sendCustomerReceipt(tx: StoredTransaction): Promise<void> {
  const body = `
    <p>¡Hola ${escapeHtml(tx.lead.name)}! Recibimos tu pago correctamente.</p>
    <p>En las próximas <strong>24 horas hábiles</strong> te enviaremos tus credenciales de acceso y los pasos para empezar a usar Flujora.</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:20px 0;border-top:1px solid #26304A">
      ${row("Plan", PLAN_LABEL)}
      ${row("Referencia", tx.clientTransactionId)}
      ${tx.authorizationCode ? row("Autorización", tx.authorizationCode) : ""}
      ${tx.cardBrand && tx.lastDigits ? row("Tarjeta", `${tx.cardBrand} ···· ${tx.lastDigits}`) : ""}
    </table>
    <p style="color:#7d889f;font-size:13px">Guarda este correo como comprobante. Si tienes dudas, escríbenos por WhatsApp al <strong>${WHATSAPP_DISPLAY}</strong>.</p>
  `;
  await sendViaResend({
    to: tx.lead.email,
    subject: "Pago recibido — Flujora",
    html: shell("¡Gracias por tu pago!", body),
  });
}

export async function sendInternalNotification(tx: StoredTransaction): Promise<void> {
  // NOTIFY_EMAIL admite varios correos separados por coma (ej: "a@x.com,b@y.com").
  const recipients = (process.env.NOTIFY_EMAIL || "")
    .split(/[,;\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (recipients.length === 0) {
    console.log("[email] NOTIFY_EMAIL vacío, no se envía aviso interno");
    return;
  }
  const body = `
    <p>Nuevo pago aprobado en la landing. Genera y envía las credenciales al cliente.</p>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:20px 0;border-top:1px solid #26304A">
      ${row("Nombre", tx.lead.name)}
      ${row("Email", tx.lead.email)}
      ${row("Teléfono", tx.lead.phone)}
      ${row("Referencia", tx.clientTransactionId)}
      ${tx.payphoneTransactionId ? row("ID Payphone", String(tx.payphoneTransactionId)) : ""}
      ${tx.authorizationCode ? row("Autorización", tx.authorizationCode) : ""}
      ${tx.cardBrand && tx.lastDigits ? row("Tarjeta", `${tx.cardBrand} ···· ${tx.lastDigits}`) : ""}
      ${row("Confirmado", tx.confirmedAt || new Date().toISOString())}
    </table>
  `;
  await sendViaResend({
    to: recipients,
    subject: `Nueva venta Flujora — ${tx.lead.name}`,
    html: shell("Nueva venta confirmada", body),
  });
}
