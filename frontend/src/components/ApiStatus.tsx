// ============================================
// components/ApiStatus.tsx
// Widget qui ping GET /api/health et affiche le statut backend
// Montre que le site a une vraie infrastructure (pas juste du HTML)
// ============================================
import { useState, useEffect } from "react";
import { useLanguage } from "../i18n/useLanguage";
import { SITE_CONFIG } from "../config/site";
import "./ApiStatus.css";

// Type de la reponse du health check (endpoint de liveness)
interface HealthResponse {
  success: boolean;
  // "ok" = tout va bien, "degraded" = l'API repond mais une dependance est KO
  status: "ok" | "degraded";
  checks?: Record<string, boolean>;
  uptime?: number;
  time: string;
}

// Delai au-dela duquel on considere l'API injoignable (millisecondes).
// Sans timeout, un backend endormi (Render free tier) laisse le widget bloque
// sur "chargement" pendant une trentaine de secondes.
const DELAI_MAX_MS = 8000;

// Intervalle entre deux verifications (millisecondes)
const INTERVALLE_MS = 60000;

export function ApiStatus() {
  const { t } = useLanguage();

  // Etat du widget.
  // "degraded" est un nouvel etat : l'API repond mais une dependance (la base)
  // est injoignable. Avant, ce cas etait affiche comme "hors ligne" alors que
  // l'API fonctionnait, ce qui etait faux et alarmant.
  const [status, setStatus] = useState<"loading" | "online" | "degraded" | "offline">("loading");

  // Temps de reponse en millisecondes
  const [responseTime, setResponseTime] = useState<number | null>(null);

  useEffect(() => {
    // Ping le backend au chargement du composant
    // AbortController : permet d'annuler la requete au demontage du composant
    // et d'appliquer un timeout. Sans cela, un setState pouvait survenir apres
    // le demontage (fuite memoire signalee par React).
    let annule = false;
    const controleurs = new Set<AbortController>();

    const checkHealth = async () => {
      const start = Date.now();
      const controleur = new AbortController();
      controleurs.add(controleur);
      const minuteur = setTimeout(() => controleur.abort(), DELAI_MAX_MS);

      try {
        const res = await fetch(`${SITE_CONFIG.api.baseUrl}/api/health`, {
          signal: controleur.signal,
        });
        const data: HealthResponse = await res.json();
        if (annule) return;

        setResponseTime(Date.now() - start);

        // L'API repond : elle n'est pas hors ligne. On distingue seulement
        // le fonctionnement nominal du fonctionnement degrade.
        setStatus(data.status === "degraded" ? "degraded" : "online");
      } catch {
        // Le fetch a echoue : serveur arrete, CORS, reseau ou timeout
        if (annule) return;
        setStatus("offline");
        setResponseTime(null);
      } finally {
        clearTimeout(minuteur);
        controleurs.delete(controleur);
      }
    };

    checkHealth();

    const interval = setInterval(checkHealth, INTERVALLE_MS);

    return () => {
      annule = true;
      clearInterval(interval);
      controleurs.forEach((c) => c.abort());
    };
  }, []);

  return (
    // role="status" : les lecteurs d'ecran annoncent le changement d'etat
    <div className="api-status" role="status" aria-live="polite">
      {/* Pastille de couleur (vert, orange ou rouge) */}
      <span className={`api-status__dot api-status__dot--${status}`} />

      {/* Texte du statut */}
      <span className="api-status__text">
        {status === "loading" && t("apiStatus.loading")}
        {status === "online" && t("apiStatus.online")}
        {status === "degraded" && t("apiStatus.degraded")}
        {status === "offline" && t("apiStatus.offline")}
      </span>

      {/* Temps de reponse (seulement si en ligne) */}
      {responseTime !== null && status === "online" && (
        <span className="api-status__time">{responseTime}ms</span>
      )}
    </div>
  );
}