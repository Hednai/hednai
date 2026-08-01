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

// Methode de contact choisie par le visiteur
export type ContactMethod = "email" | "whatsapp";

// Formulaire de contact — ce qui est stocke dans le state du composant
// Tous les champs sont presents (meme vides) pour que les inputs
// controles React ne passent jamais de undefined a value=
export interface ContactForm {
  contactMethod: ContactMethod;
  name: string;
  email: string;
  phone: string;
  dialCode: string;
  subject: string;
  message: string;
  honeypot: string;
}

// Ce qui est REELLEMENT envoye au backend — union discriminee
// Correspond exactement au schema Zod cote backend (contact.validation.ts)
// Variante email : pas de phone
// Variante whatsapp : pas de email
export type ContactPayload =
  | {
      contactMethod: "email";
      name: string;
      email: string;
      subject: string;
      message: string;
      honeypot: string;
    }
  | {
      contactMethod: "whatsapp";
      name: string;
      phone: string;
      subject: string;
      message: string;
      honeypot: string;
    };

// Lien de navigation
export interface NavLink {
  key: string;
  href: string;
  labelKey: string;
  icon: string;
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