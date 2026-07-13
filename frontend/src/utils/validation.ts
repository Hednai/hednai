// ============================================
// utils/validation.ts
// Regles de validation cote frontend
// Utilisees par useContactForm pour valider avant l'envoi
// ============================================

// Verifier si un email est basiquement valide
export const isValidEmail = (email: string): boolean => {
  return email.includes("@") && email.includes(".");
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