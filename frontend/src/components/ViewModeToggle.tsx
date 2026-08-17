// ============================================
// components/ViewModeToggle.tsx
// Toggle visuel Client / Recruteur dans la Navbar
// Change le contexte global quand on clique
// ============================================
import { useViewMode } from "../context/useViewMode";
import { useLanguage } from "../i18n/useLanguage";
import "./ViewModeToggle.css";

export function ViewModeToggle() {
  const { mode, toggleMode } = useViewMode();
  const { t } = useLanguage();

  return (
    <button
      className="view-toggle"
      onClick={toggleMode}
      aria-label={t("viewMode.toggle")}
      title={mode === "client" ? t("viewMode.switchRecruiter") : t("viewMode.switchClient")}
    >
      {/* Texte court */}
      <span className="view-toggle__label">
        {mode === "client" ? t("viewMode.client") : t("viewMode.recruiter")}
      </span>
    </button>
  );
}