// ============================================
// components/Seo.tsx
// Balises SEO communes a toutes les routes : titre, description,
// URL canonique, Open Graph, Twitter Card et donnees structurees.
// L'URL canonique est construite a partir d'un domaine unique
// (SITE_CONFIG.meta.url) et du chemin courant : changer de domaine
// ne demande qu'une seule modification dans config/site.ts.
// ============================================
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { SITE_CONFIG } from "../config/site";

interface SeoProps {
  title: string;
  description: string;
  // Image absolue de partage, si la page en a une qui lui est propre
  image?: string;
  // Pages a exclure de l'index Google (espace admin, page 404)
  noIndex?: boolean;
  // Donnees structurees JSON-LD propres a la page
  jsonLd?: Record<string, unknown>;
  // Chemin canonique force, pour les routes alias qui servent le meme contenu
  // (exemple : /resume est l'alias anglais de /cv, une seule URL doit etre indexee)
  canonicalPath?: string;
}

export function Seo({ title, description, image, noIndex, jsonLd, canonicalPath }: SeoProps) {
  const { pathname } = useLocation();
  const basePath = canonicalPath ?? pathname;

  // Une seule forme d'URL par page : pas de barre oblique finale hors racine.
  // Sans cette normalisation, /blog et /blog/ seraient deux URL canoniques
  // differentes pour un contenu identique (contenu duplique aux yeux de Google).
  const path = basePath !== "/" && basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
  const canonical = `${SITE_CONFIG.meta.url}${path}`;
  const shareImage = image ?? SITE_CONFIG.meta.image;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* URL de reference declaree a Google pour cette page */}
      <link rel="canonical" href={canonical} />

      {/* Open Graph : LinkedIn, Facebook, WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={shareImage} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={shareImage} />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}