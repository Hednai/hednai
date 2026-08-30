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
// L'echappement HTML par defaut de la librairie est actif (defense en profondeur)
// Source : github.com/leizongmin/js-xss
const xssOptions = {
  whiteList: {},
  stripIgnoreTag: true,
  stripIgnoreTagBody: ["script", "style"],
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
  // Le body peut etre remplace directement, pas de probleme ici
  if (req.body) {
    req.body = nettoyerObjet(req.body);
  }

  // req.query est en lecture seule dans les versions recentes d'Express/Node.
  // On ne peut plus faire "req.query = ...", il faut modifier l'objet
  // existant de l'interieur : on vide chaque cle puis on remet la valeur nettoyee
  if (req.query) {
    const nettoye = nettoyerObjet(req.query) as Record<string, unknown>;
    for (const cle of Object.keys(req.query)) {
      delete (req.query as Record<string, unknown>)[cle];
    }
    Object.assign(req.query, nettoye);
  }

  // Meme chose pour req.params, par securite
  if (req.params) {
    const nettoye = nettoyerObjet(req.params) as Record<string, unknown>;
    for (const cle of Object.keys(req.params)) {
      delete (req.params as Record<string, unknown>)[cle];
    }
    Object.assign(req.params, nettoye);
  }

  next();
};

export default xssClean;