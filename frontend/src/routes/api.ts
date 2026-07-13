// ============================================
// routes/api.ts
// Base des appels API
// Toutes les autres routes (contact, etc.) importent fetchAPI()
// ============================================
import { SITE_CONFIG } from "../config/site";
import type { ApiResponse } from "../types";

// URL de base du backend, lue depuis config/site.ts
const API_URL = SITE_CONFIG.api.baseUrl;

// Traiter les reponses API de maniere uniforme (succes ou erreur)
const handleResponse = async <T>(res: Response): Promise<ApiResponse<T>> => {
  // Convertir la reponse en JSON
  const data = await res.json();

  // Si la reponse n'est pas OK (ex: erreur 400 ou 500), on lance une erreur
  if (!res.ok) {
    throw new Error(data.message || "Erreur serveur.");
  }

  return data;
};

// Fonction generique pour appeler n'importe quelle route de l'API
export const fetchAPI = async <T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> => {
  // Appeler le backend a l'URL demandee
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  // Traiter la reponse recue
  return handleResponse<T>(res);
};