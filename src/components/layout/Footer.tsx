import { Mail, MessageCircle } from "lucide-react";
import Logo from "@/components/ui/Logo";
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/contact";

const productLinks = [
  { label: "Características", href: "#caracteristicas" },
  { label: "Vistas", href: "#vistas" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Planes", href: "#planes" },
];

const resourceLinks = [
  { label: "Preguntas frecuentes", href: "#faq" },
  { label: "Contacto", href: "#contacto" },
];

const legalLinks = [
  { label: "Privacidad", href: "#" },
  { label: "Términos", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-[#26304A]/60 bg-[#0A0F1E]/40 text-white pt-16 pb-10 overflow-hidden">
      <div className="relative max-w-7xl 2xl:max-w-[1500px] mx-auto px-6 sm:px-8 2xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Logo className="mb-4" markClassName="h-10 w-10" />
            <p className="text-white/65 text-sm font-inter leading-relaxed max-w-sm mb-6">
              Flujora es la gestión de proyectos simple para equipos. Reúne tareas,
              tableros, calendario y cronograma en un solo lugar — sin la complejidad
              de las herramientas pesadas.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-btn text-white text-sm font-medium transition-all hover:-translate-y-0.5"
                style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
              >
                <MessageCircle className="w-4 h-4" />
                {WHATSAPP_DISPLAY}
              </a>
              <a
                href={CONTACT_EMAIL_HREF}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-btn bg-white/8 border border-[#26304A] text-white text-sm font-medium transition-all hover:bg-white/12 hover:border-[#10B981]/50 hover:-translate-y-0.5"
              >
                <Mail className="w-4 h-4" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="font-display font-semibold text-sm mb-4 text-white/85">Producto</p>
            <ul className="space-y-2.5 text-sm font-inter text-white/60">
              {productLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-[#34D399] transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-display font-semibold text-sm mb-4 text-white/85">Recursos</p>
            <ul className="space-y-2.5 text-sm font-inter text-white/60">
              {resourceLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-[#34D399] transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-display font-semibold text-sm mb-4 text-white/85">Legal</p>
            <ul className="space-y-2.5 text-sm font-inter text-white/60">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="hover:text-[#34D399] transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm font-inter text-white/45">
          <p>© {year} Flujora. Todos los derechos reservados.</p>
          <p className="flex items-center gap-2">
            <span>Hecho en Latinoamérica</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
