// ============================================
// components/AvailabilityBadge.tsx
// Petit badge qui indique la disponibilite actuelle
// Affiche une pastille verte + texte
// Configurable via i18n — peut etre change sans toucher le code
// ============================================
import { useLanguage } from "../i18n/useLanguage";
import "./AvailabilityBadge.css";

export function AvailabilityBadge() {
  const { t } = useLanguage();

  return (
    <div className="avail-badge">
      {/* Pastille verte animee */}
      <span className="avail-badge__dot" />
      {/* Texte de disponibilite */}
      <span className="avail-badge__text">{t("availability.text")}</span>
    </div>
  );
}