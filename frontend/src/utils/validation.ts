// ============================================
// utils/validation.ts
// Regles de validation cote frontend
// Utilisees par useContactForm pour valider avant l'envoi
// ============================================

// Validation basique cote frontend (la validation stricte est cote backend avec Zod)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email.trim());
};

// Verifier la longueur minimale d'un texte
export const isMinLength = (text: string, min: number): boolean => {
  return text.trim().length >= min;
};

// Verifier la longueur maximale d'un texte
export const isMaxLength = (text: string, max: number): boolean => {
  return text.trim().length <= max;
};

// Verifier qu'un numero de telephone est plausible (sans l'indicatif)
// Entre 6 et 15 chiffres une fois les espaces retires
export const isValidPhone = (phone: string): boolean => {
  const clean = phone.replace(/\s/g, "");
  return /^\d{6,15}$/.test(clean);
};