// ============================================
// components/ApiStatus.tsx
// Widget qui ping GET /api/health et affiche le statut backend
// Montre que le site a une vraie infrastructure (pas juste du HTML)
// ============================================
import { useState, useEffect } from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { SITE_CONFIG } from "../config/site";
import "./ApiStatus.css";

// Type de la reponse du health check
interface HealthResponse {
  success: boolean;
  status: string;
  time: string;
}

export function ApiStatus() {
  const { t } = useLanguage();

  // Etat du widget : chargement, en ligne, hors ligne
  const [status, setStatus] = useState<"loading" | "online" | "offline">("loading");

  // Temps de reponse en millisecondes
  const [responseTime, setResponseTime] = useState<number | null>(null);

  useEffect(() => {
    // Ping le backend au chargement du composant
    const checkHealth = async () => {
      const start = Date.now();

      try {
        const res = await fetch(`${SITE_CONFIG.api.baseUrl}/api/health`);
        const data: HealthResponse = await res.json();

        // Calculer le temps de reponse
        const duration = Date.now() - start;
        setResponseTime(duration);

        // Verifier que la reponse est valide
        setStatus(data.success ? "online" : "offline");
      } catch {
        // Si le fetch echoue (serveur down, CORS, etc.)
        setStatus("offline");
        setResponseTime(null);
      }
    };

    checkHealth();

    // Re-verifier toutes les 60 secondes
    const interval = setInterval(checkHealth, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="api-status">
      {/* Pastille de couleur (vert, orange ou rouge) */}
      <span className={`api-status__dot api-status__dot--${status}`} />

      {/* Texte du statut */}
      <span className="api-status__text">
        {status === "loading" && t("apiStatus.loading")}
        {status === "online" && t("apiStatus.online")}
        {status === "offline" && t("apiStatus.offline")}
      </span>

      {/* Temps de reponse (seulement si en ligne) */}
      {responseTime !== null && status === "online" && (
        <span className="api-status__time">{responseTime}ms</span>
      )}
    </div>
  );
}