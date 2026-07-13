// ============================================
// middleware/xssClean.ts
// Protection XSS — seule couche de sanitization
// Pattern : Karibou Market xssClean.js
// Preserve les accents et apostrophes francais
// Exemple : "Hednai c'est génial" reste intact
// mais "<script>alert(1)</script>" est supprime
// ============================================
import xss from "xss";
import type { Request, Response, NextFunction } from "express";

// Configuration adaptee au francais
const xssOptions = {
  whiteList: {},
  stripIgnoreTag: true,
  stripIgnoreTagBody: ["script", "style"],
  escapeHtml: (html: string) => html,
};

// Fonction recursive qui nettoie toutes les strings d'un objet
function nettoyerObjet(objet: unknown): unknown {
  // Si c'est une string, la nettoyer
  if (typeof objet === "string") {
    return xss(objet, xssOptions);
  }

  // Si c'est un tableau, nettoyer chaque element
  if (Array.isArray(objet)) {
    return objet.map((element) => nettoyerObjet(element));
  }

  // Si c'est un objet, nettoyer chaque propriete
  if (objet !== null && typeof objet === "object") {
    const objetNettoye: Record<string, unknown> = {};

    for (const cle of Object.keys(objet as Record<string, unknown>)) {
      objetNettoye[cle] = nettoyerObjet(
        (objet as Record<string, unknown>)[cle],
      );
    }

    return objetNettoye;
  }

  // Sinon (nombre, boolean, null), retourner tel quel
  return objet;
}

// Middleware Express
const xssClean = (req: Request, _res: Response, next: NextFunction) => {
  // Nettoyer le body, les query params et les params d'URL
  if (req.body) {
    req.body = nettoyerObjet(req.body);
  }
  if (req.query) {
    req.query = nettoyerObjet(req.query) as typeof req.query;
  }
  if (req.params) {
    req.params = nettoyerObjet(req.params) as typeof req.params;
  }

  next();
};

export default xssClean;