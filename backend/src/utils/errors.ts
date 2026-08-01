// ============================================
// utils/errors.ts
// Classes d'erreurs personnalisees
// Chaque type d'erreur porte son propre code HTTP
// Le errorHandler les detecte automatiquement
// ============================================

// Classe de base — toutes les erreurs de l'application en heritent
export class AppError extends Error {
  public statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    // Necessaire pour que instanceof fonctionne correctement
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// Erreur de validation (donnees invalides, format incorrect)
export class ValidationError extends AppError {
  constructor(message = "Donnees invalides.") {
    super(message, 400);
  }
}

// Ressource non trouvee (projet inexistant, message introuvable)
export class NotFoundError extends AppError {
  constructor(message = "Ressource non trouvee.") {
    super(message, 404);
  }
}

// Erreur de base de donnees (connexion perdue, requete echouee)
export class DatabaseError extends AppError {
  constructor(message = "Erreur de base de donnees.") {
    super(message, 500);
  }
}

// Trop de requetes (rate limiting)
export class RateLimitError extends AppError {
  constructor(message = "Trop de requetes. Reessayez plus tard.") {
    super(message, 429);
  }
}