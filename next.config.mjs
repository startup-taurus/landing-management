/** @type {import('next').NextConfig} */

// ============================================================================
// Content Security Policy
// ----------------------------------------------------------------------------
// La Cajita de Payphone es un widget de terceros: carga un script desde su CDN,
// hace requests a su API y abre iframes (tarjeta / OTP / 3DS). El paso 3DS
// REDIRIGE al dominio del banco emisor (impredecible), por eso frame-src y
// form-action incluyen `https:`.
//
// La política ya está lista para Payphone, aunque la pasarela esté DESACTIVADA
// (ver NEXT_PUBLIC_PAYMENTS_ENABLED). Cuando actives los pagos, prueba un pago
// COMPLETO en modo Prueba y revisa que no haya violaciones de CSP en la consola.
// Si quieres probar sin bloquear, pon CSP_REPORT_ONLY = true temporalmente.
// ============================================================================
const CSP_REPORT_ONLY = false;

const contentSecurityPolicy = [
  "default-src 'self'",
  // 'unsafe-inline'/'unsafe-eval': Next.js (App Router) inyecta scripts inline +
  // framer-motion; cdn.payphonetodoesposible.com sirve la Cajita.
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.payphonetodoesposible.com",
  // 'unsafe-inline': estilos inline de framer-motion y de la Cajita.
  "style-src 'self' 'unsafe-inline'",
  // Fuentes self-hosted (next/font) + data: por si algún glyph embebido.
  "font-src 'self' data:",
  // data: para SVG/ruido inline; blob: para imágenes generadas; logos de Payphone.
  "img-src 'self' data: blob: https://*.payphonetodoesposible.com",
  // Nuestra API + API de Payphone.
  "connect-src 'self' https://*.payphonetodoesposible.com",
  // Iframes de la Cajita + redirección 3DS al banco (https: a propósito).
  "frame-src 'self' https://*.payphonetodoesposible.com https:",
  // El 3DS hace POST al ACS del banco (https: a propósito).
  "form-action 'self' https://*.payphonetodoesposible.com https:",
  // Anti-clickjacking de NUESTRO sitio (la Cajita es hija, no ancestro).
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  {
    key: CSP_REPORT_ONLY
      ? "Content-Security-Policy-Report-Only"
      : "Content-Security-Policy",
    value: contentSecurityPolicy,
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // HSTS: activar solo cuando el sitio esté servido por HTTPS en producción.
  // Añadir `; preload` únicamente si se enviará el dominio a la lista HSTS preload.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains",
  },
];

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
