// ============================================
// hooks/useBodyScrollLock.ts
// Verrouille le scroll de la page pendant qu'une surface modale est ouverte
// (menu mobile, carte portfolio, carte service, carte about, modal contact).
//
// Pourquoi un hook partage plutot que document.body.style.overflow en ligne :
//   - trois composants faisaient la meme chose chacun de leur cote (duplication)
//   - ils remettaient tous "auto" a la fermeture, alors que la valeur initiale
//     du body n'est pas "auto" mais "" : le style etait donc modifie durablement
//   - deux surfaces ouvertes en meme temps se marchaient dessus : fermer la
//     premiere deverrouillait le scroll alors que la seconde etait encore ouverte
//
// Solution : un compteur au niveau du module. Le scroll n'est rendu que lorsque
// la DERNIERE surface ouverte se ferme, et la valeur d'origine est restauree.
//
// Le padding compensatoire evite le decalage horizontal du contenu quand la
// barre de defilement disparait (source : bonne pratique Bootstrap / Radix UI).
// ============================================
import { useEffect } from "react";

// Nombre de surfaces modales actuellement ouvertes
let compteurVerrous = 0;

// Styles du body memorises avant le premier verrou
let overflowInitial = "";
let paddingInitial = "";

/**
 * Verrouille le scroll du body tant que `locked` vaut true.
 * @param locked true quand la surface modale est ouverte
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    // Premier verrou : memoriser l'etat initial et l'appliquer
    if (compteurVerrous === 0) {
      overflowInitial = document.body.style.overflow;
      paddingInitial = document.body.style.paddingRight;

      // Largeur de la barre de defilement qui va disparaitre
      const largeurScrollbar =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      if (largeurScrollbar > 0) {
        document.body.style.paddingRight = `${largeurScrollbar}px`;
      }
    }

    compteurVerrous += 1;

    return () => {
      compteurVerrous -= 1;

      // Dernier verrou libere : restaurer exactement l'etat d'origine
      if (compteurVerrous === 0) {
        document.body.style.overflow = overflowInitial;
        document.body.style.paddingRight = paddingInitial;
      }
    };
  }, [locked]);
}