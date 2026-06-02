// NOTA: número y correo de contacto son PLACEHOLDERS editables.
// Cámbialos por los reales de Flujora cuando los tengas.
export const WHATSAPP_NUMBER = "593995923599";

export const WHATSAPP_DISPLAY = "+593 99 592 3599";

const DEFAULT_WHATSAPP_MESSAGE =
  "Hola, me interesa conocer más sobre Flujora para gestionar los proyectos de mi equipo.";

export function whatsappUrl(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const WHATSAPP_URL = whatsappUrl();

export const CONTACT_EMAIL = "ridencedenods@gmail.com";

export const CONTACT_EMAIL_HREF = `mailto:${CONTACT_EMAIL}`;

export interface LeadFormData {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  message?: string;
}

export function buildLeadMessage(data: LeadFormData): string {
  const lines: string[] = [];

  lines.push("👋 *Nueva solicitud desde la web*", "");

  const intro = data.company
    ? `Hola, soy *${data.name}* de *${data.company}* y me interesa conocer Flujora.`
    : `Hola, soy *${data.name}* y me interesa conocer Flujora para mi equipo.`;
  lines.push(intro, "");

  lines.push("📋 *Mis datos*");
  lines.push(`• Nombre: ${data.name}`);
  if (data.company) lines.push(`• Empresa / equipo: ${data.company}`);
  lines.push(`• Email: ${data.email}`);
  if (data.phone) lines.push(`• Teléfono: ${data.phone}`);
  lines.push("");

  lines.push("💬 *Mensaje*");
  lines.push(
    data.message?.trim() ||
      "Me gustaría ver una demo y entender cómo Flujora puede ordenar el trabajo de mi equipo."
  );

  lines.push("", "— Enviado desde la web de Flujora");

  return lines.join("\n");
}
