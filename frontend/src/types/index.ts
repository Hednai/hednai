// ============================================
// types/index.ts
// Interfaces TypeScript centralisees
// Un seul endroit a modifier si un type change
// ============================================

// Service affiche dans la section Services
export interface Service {
  id: number;
  icon: string;
  titleKey: string;
  descriptionKey: string;
  featureKeys: string[];
}

// Projet affiche dans le Portfolio
export interface Project {
  id: number;
  slug: string;
  categoryKey: string;
  titleKey: string;
  descriptionKey: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  longDescriptionKey?: string;
  featureKeys?: string[];
}

// Formulaire de contact
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
}

// Lien de navigation
export interface NavLink {
  key: string;
  href: string;
  labelKey: string;
}

// Reponse API generique
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  details?: Array<{ path: string[]; message: string }>;
}

// Statut du formulaire contact
export type FormStatus = "idle" | "loading" | "success" | "error";