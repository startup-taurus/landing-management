# Matriarca — Landing (Gestión de Proyectos)

Landing de **Matriarca**, un gestor de proyectos simple (estilo ClickUp pero más
liviano): tareas, tableros, calendario y cronograma en un solo lugar.

Construido con **Next.js 14 (App Router) + React 18 + TypeScript + Tailwind CSS**,
con animaciones livianas (Framer Motion + GSAP + Lenis) y efectos 3D basados solo
en CSS/transform (sin WebGL). Incluye la pasarela de pago **Payphone cableada pero
desactivada** hasta tener planes y credenciales reales.

---

## Requisitos

- Node.js 18.18+ (recomendado 20+)
- npm

## Puesta en marcha

```bash
npm install
npm run dev          # http://localhost:3000
```

En **Windows**, para evitar el bug de tener dos servidores pisándose el caché
`.next` (páginas sin estilos / errores 500 de `/_next/...`), usa el helper:

```powershell
.\reset-dev.ps1      # cierra servidores previos, limpia .next y arranca UNO
```

> Regla de oro: corre **un solo** `npm run dev` a la vez.

### Scripts

| Script          | Qué hace                          |
| --------------- | --------------------------------- |
| `npm run dev`   | Servidor de desarrollo            |
| `npm run build` | Build de producción               |
| `npm start`     | Sirve el build de producción      |
| `npm run lint`  | Linter (eslint-config-next)       |

---

## Variables de entorno

La configuración vive en un único archivo **`.env`** (no `.env.local` ni
`.env.example`). Está en `.gitignore`, así que **no se sube a git**: si clonas el
proyecto en otra máquina, recréalo con estas variables.

| Variable                          | Tipo     | Para qué sirve                                                        |
| --------------------------------- | -------- | --------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`            | pública  | URL base del sitio (metadata, sitemap, robots, JSON-LD).              |
| `NEXT_PUBLIC_PAYMENTS_ENABLED`    | pública  | `"true"` activa la pasarela de pago. Por defecto `"false"`.           |
| `NEXT_PUBLIC_PAYPHONE_TOKEN`      | pública  | Token de la Cajita de Payphone (lo expone el cliente, es lo esperado).|
| `NEXT_PUBLIC_PAYPHONE_STORE_ID`   | pública  | StoreId (UUID) de tu tienda en Payphone.                              |
| `PAYPHONE_TOKEN`                  | secreta  | Token de servidor para la confirmación server-to-server.             |
| `PAYPHONE_HMAC_SECRET`            | secreta  | Secreto para firmar/verificar el `clientTransactionId` (mín. 16).    |
| `RESEND_API_KEY`                  | secreta  | API key de Resend para emails. Si está vacío, los correos se omiten. |
| `RESEND_FROM`                     | pública  | Remitente de los correos (ej. `Matriarca <no-reply@matriarca.app>`). |
| `NOTIFY_EMAIL`                    | pública  | Destinatarios internos del aviso de venta (separados por coma).      |

---

## Pagos con Payphone (cómo activarlos)

La integración ya está **completa en el código** pero **desactivada**. Mientras
`NEXT_PUBLIC_PAYMENTS_ENABLED` sea `"false"`:

- La sección **Planes** muestra los planes con el botón **"Próximamente"** y no
  monta la Cajita de Payphone (no se carga su script).
- Los endpoints `/api/payphone/init` y `/api/payphone/confirm` responden **503
  "Pagos próximamente"**.

Para activarla cuando tengas todo listo:

1. Crea la aplicación (Cajita de Pago) en el panel de **Payphone** y obtén el
   **Token** y el **StoreId**.
2. En `.env`, completa `NEXT_PUBLIC_PAYPHONE_TOKEN`, `NEXT_PUBLIC_PAYPHONE_STORE_ID`
   y `PAYPHONE_TOKEN`, y define un `PAYPHONE_HMAC_SECRET` aleatorio
   (ej. `openssl rand -hex 24`).
3. Define los **montos reales del plan (en centavos USD)** en
   [`src/lib/payphone.ts`](src/lib/payphone.ts) (`PLAN_AMOUNT_TOTAL`,
   `PLAN_AMOUNT_WITH_TAX`, `PLAN_TAX`, etc.). Están marcados con `TODO`.
4. Ajusta los precios mostrados en los planes en
   [`src/components/sections/Pricing.tsx`](src/components/sections/Pricing.tsx)
   (array `TIERS`).
5. Cambia `NEXT_PUBLIC_PAYMENTS_ENABLED="true"` y reinicia el servidor.
6. Prueba un pago **completo** en modo Prueba y revisa que no haya violaciones de
   CSP en la consola (la política en `next.config.mjs` ya permite los dominios de
   Payphone). Si quieres probar sin bloquear, pon `CSP_REPORT_ONLY = true`
   temporalmente en `next.config.mjs`.

Los pagos confirmados se registran en `data/transactions.json` (ignorado por git)
y disparan correos vía Resend si `RESEND_API_KEY` está configurado.

---

## Estructura

```
src/
├── app/                 # App Router: layout, page, rutas API, OG/manifest/robots/sitemap
│   ├── api/payphone/    # init + confirm (server-side, con guard de flag)
│   └── payphone/        # página de respuesta del pago
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── sections/        # Hero, Differentiators, Comparison, Features,
│   │                    #   ModuleShowcase, HowItWorks, Pricing, FAQ, Contact
│   ├── ui/              # Button, Badge, Card, Logo, Reveal, TiltCard, etc.
│   ├── payphone/        # PayphoneBox (Cajita)
│   └── seo/             # StructuredData (JSON-LD)
├── hooks/               # useLenis, useActiveSection, useScrollAnimation
└── lib/                 # utils, animations, seo, contact, faq, payphone, email, ...
```

## Notas de marca

- **Nombre:** Matriarca. **Contacto/WhatsApp** en
  [`src/lib/contact.ts`](src/lib/contact.ts) son placeholders editables.
- **Paleta:** tema oscuro, base esmeralda/teal + acento violeta. Tokens en
  [`tailwind.config.ts`](tailwind.config.ts) y variables CSS en
  [`src/app/globals.css`](src/app/globals.css).
