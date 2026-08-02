// ============================================
// components/CalendlyEmbed.tsx
// Embed d'un calendrier Cal.com pour la prise de rendez-vous
// Se charge en iframe pour ne pas alourdir le bundle
// Le lien Cal.com est configurable dans site.ts
// ============================================
import { useLanguage } from "../i18n/useLanguage";
import { SITE_CONFIG } from "../config/site";
import "./CalendlyEmbed.css";

export function CalendlyEmbed() {
  const { t } = useLanguage();

  // URL Cal.com depuis la config centralisee
  const calUrl = SITE_CONFIG.calendar?.url;

  // Si pas de calendrier configure, ne rien afficher
  if (!calUrl) return null;

  return (
    <div className="cal-embed">
      <h3 className="cal-embed__title">{t("calendar.title")}</h3>
      <p className="cal-embed__desc">{t("calendar.desc")}</p>

      {/* Iframe Cal.com */}
      <div className="cal-embed__frame">
        <iframe
          src={calUrl}
          title={t("calendar.title")}
          width="100%"
          height="600"
          frameBorder="0"
          loading="lazy"
        />
      </div>
    </div>
  );
}