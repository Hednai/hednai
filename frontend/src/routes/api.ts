// ============================================
// routes/api.ts
// Client HTTP unique du frontend.
// Toutes les routes (contact, dashboard...) passent par fetchAPI().
// ============================================
import { SITE_CONFIG } from "../config/site";
import type { ApiResponse } from "../types";

// URL de base du backend, lue depuis config/site.ts
const API_URL = SITE_CONFIG.api.baseUrl;

// Delai maximum d'un appel API, en millisecondes.
// Une instance d'hebergement en veille peut mettre plus de 30 s a repondre :
// sans plafond, le formulaire resterait bloque sur "envoi en cours".
const DELAI_MAX_MS = SITE_CONFIG.api.timeoutMs;

// Lire le corps de la reponse en JSON.
// Un proxy ou une passerelle en erreur renvoie du HTML, pas du JSON :
// res.json() leverait alors une SyntaxError illisible pour l'utilisateur.
const lireJson = async (res: Response): Promise<Record<string, unknown>> => {
  try {
    return (await res.json()) as Record<string, unknown>;
  } catch {
    return {};
  }
};

// Traiter les reponses API de maniere uniforme (succes ou erreur)
const handleResponse = async <T>(res: Response): Promise<ApiResponse<T>> => {
  const data = await lireJson(res);

  // Si la reponse n'est pas OK (ex: erreur 400 ou 500), on lance une erreur
  if (!res.ok) {
    throw new Error(
      typeof data.message === "string" ? data.message : "Erreur serveur.",
    );
  }

  // Le corps a ete valide par le backend : il respecte le contrat ApiResponse
  return data as unknown as ApiResponse<T>;
};

// Fonction generique pour appeler n'importe quelle route de l'API
export const fetchAPI = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> => {
  // AbortController : coupe l'appel au bout de DELAI_MAX_MS.
  // On respecte un signal deja fourni par l'appelant s'il y en a un.
  const controleur = new AbortController();
  const minuteur = setTimeout(() => controleur.abort(), DELAI_MAX_MS);

  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      signal: options.signal ?? controleur.signal,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    // Traiter la reponse recue
    return await handleResponse<T>(res);
  } finally {
    clearTimeout(minuteur);
  }
};