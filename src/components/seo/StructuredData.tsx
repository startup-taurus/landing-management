import { WHATSAPP_DISPLAY, CONTACT_EMAIL } from "@/lib/contact";
import { FAQS } from "@/lib/faq";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

export default function StructuredData() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    image: `${SITE_URL}/opengraph-image`,
    description: SITE_DESCRIPTION,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: WHATSAPP_DISPLAY,
        email: CONTACT_EMAIL,
        areaServed: ["EC", "MX", "CO", "PE", "AR", "CL", "BO"],
        availableLanguage: ["Spanish"],
      },
    ],
    areaServed: {
      "@type": "Place",
      name: "Latinoamérica",
    },
    sameAs: [],
  };

  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Project Management",
    operatingSystem: "Web",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    audience: {
      "@type": "Audience",
      audienceType: "Equipos, empresas y profesionales que gestionan proyectos",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "79.90",
      highPrice: "199.80",
      offerCount: 3,
      availability: "https://schema.org/InStock",
      description:
        "Planes por equipo: Equipo Base desde $79.90/mes (anual), Equipo Pro con IA y Enterprise a medida.",
    },
    featureList: [
      "Tareas y subtareas con responsable, fecha y prioridad",
      "Vistas múltiples: lista, tablero Kanban, calendario y cronograma (Gantt)",
      "Colaboración en equipo con asignaciones, comentarios y menciones",
      "Dashboards y reportes de productividad",
      "Automatizaciones de flujo de trabajo",
      "Seguimiento de tiempo",
      "Documentos y notas",
      "Metas y objetivos",
    ],
    inLanguage: "es",
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "es",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(software) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
    </>
  );
}
