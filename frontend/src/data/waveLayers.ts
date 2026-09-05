// ============================================
// data/waveLayers.ts
// Definition des couches animees du composant WaveAnimation.
//
// Pourquoi un fichier de donnees plutot que six blocs JSX dupliques :
//   - les six <motion.path> etaient identiques a l'attribut "fill" et aux
//     chaines de trace pres : 120 lignes de JSX pour six variations
//   - toute modification (ajouter une couche, changer une duree) demandait
//     de copier-coller un bloc entier, avec le risque d'oublier un champ
//   - c'est le point qui a cause le bug des six erreurs console : chaque bloc
//     definissait "animate.d" sans jamais definir la valeur initiale "d"
//
// Ici, la valeur initiale est DERIVEE de la premiere image cle (voir
// WaveAnimation.tsx). Le bug ne peut donc plus se reproduire sur une
// nouvelle couche : la structure elle-meme l'empeche.
// ============================================

// Une couche de vague : apparence + trajectoire animee
export interface WaveLayer {
  // Identifiant stable, sert de cle React
  id: string;
  // Couleur de remplissage (chaine CSS, jamais une valeur en dur ailleurs)
  fill: string;
  // Contour optionnel : seule la couche de crete en a un
  stroke?: string;
  strokeWidth?: string;
  strokeOpacity?: string;
  // Images cles du trace SVG. La PREMIERE sert de valeur initiale.
  keyframes: string[];
  // Duree d'un cycle complet, en secondes
  duration: number;
  // Repartition des images cles sur la duree (0 a 1)
  times: number[];
  // Decalage avant demarrage, en secondes
  delay: number;
}

export const WAVE_LAYERS: WaveLayer[] = [
  {
    id: "fond",
    fill: "hsl(195 100% 35% / 0.06)",
    keyframes: [
      "M0,580 C180,575 360,585 540,580 C720,575 900,570 1080,575 C1260,580 1380,585 1440,580 L1440,600 L0,600 Z",
      "M0,140 C260,90 440,160 620,100 C800,55 980,140 1160,85 C1300,110 1400,65 1440,120 L1440,600 L0,600 Z",
      "M0,120 C100,80 280,150 460,100 C640,60 820,130 1000,90 C1180,120 1360,70 1440,110 L1440,600 L0,600 Z",
      "M0,150 C220,95 400,165 580,105 C760,58 940,135 1120,88 C1280,115 1390,68 1440,115 L1440,600 L0,600 Z",
      "M0,580 C180,575 360,585 540,580 C720,575 900,570 1080,575 C1260,580 1380,585 1440,580 L1440,600 L0,600 Z",
    ],
    duration: 12,
    times: [0, 0.3, 0.45, 0.6, 1],
    delay: 0,
  },
  {
    id: "arriere",
    fill: "hsl(195 100% 35% / 0.12)",
    keyframes: [
      "M0,585 C200,580 400,590 600,585 C800,580 1000,575 1200,580 C1350,585 1420,582 1440,585 L1440,600 L0,600 Z",
      "M0,210 C280,155 460,235 680,175 C880,135 1060,215 1280,165 C1380,190 1430,150 1440,195 L1440,600 L0,600 Z",
      "M0,195 C120,165 300,225 520,185 C720,145 900,210 1120,175 C1300,200 1410,158 1440,185 L1440,600 L0,600 Z",
      "M0,220 C240,160 420,240 640,180 C840,138 1020,218 1240,168 C1360,192 1425,152 1440,192 L1440,600 L0,600 Z",
      "M0,585 C200,580 400,590 600,585 C800,580 1000,575 1200,580 C1350,585 1420,582 1440,585 L1440,600 L0,600 Z",
    ],
    duration: 10,
    times: [0, 0.28, 0.42, 0.58, 1],
    delay: 0.8,
  },
  {
    id: "milieu",
    fill: "hsl(195 100% 35% / 0.22)",
    keyframes: [
      "M0,588 C240,584 480,592 720,588 C960,584 1200,580 1440,588 L1440,600 L0,600 Z",
      "M0,330 C320,275 560,355 800,295 C1040,265 1280,345 1440,305 L1440,600 L0,600 Z",
      "M0,310 C160,285 400,345 640,305 C880,272 1120,340 1440,315 L1440,600 L0,600 Z",
      "M0,325 C280,280 520,350 760,300 C1000,268 1240,342 1440,310 L1440,600 L0,600 Z",
      "M0,588 C240,584 480,592 720,588 C960,584 1200,580 1440,588 L1440,600 L0,600 Z",
    ],
    duration: 9,
    times: [0, 0.25, 0.4, 0.55, 1],
    delay: 1.5,
  },
  {
    id: "avant",
    fill: "hsl(195 100% 35% / 0.35)",
    keyframes: [
      "M0,592 C300,588 600,596 900,592 C1100,588 1300,590 1440,592 L1440,600 L0,600 Z",
      "M0,435 C380,398 660,455 980,415 C1160,390 1340,445 1440,420 L1440,600 L0,600 Z",
      "M0,425 C200,405 480,448 760,422 C1000,398 1260,442 1440,430 L1440,600 L0,600 Z",
      "M0,440 C340,402 620,452 940,418 C1120,393 1320,443 1440,425 L1440,600 L0,600 Z",
      "M0,592 C300,588 600,596 900,592 C1100,588 1300,590 1440,592 L1440,600 L0,600 Z",
    ],
    duration: 8,
    times: [0, 0.27, 0.43, 0.58, 1],
    delay: 2,
  },
  {
    id: "crete",
    fill: "none",
    stroke: "hsl(195 100% 35%)",
    strokeWidth: "1.2",
    strokeOpacity: "0.25",
    keyframes: [
      "M0,592 C300,588 600,596 900,592 C1100,588 1300,590 1440,592",
      "M0,435 C380,398 660,455 980,415 C1160,390 1340,445 1440,420",
      "M0,425 C200,405 480,448 760,422 C1000,398 1260,442 1440,430",
      "M0,440 C340,402 620,452 940,418 C1120,393 1320,443 1440,425",
      "M0,592 C300,588 600,596 900,592 C1100,588 1300,590 1440,592",
    ],
    duration: 8,
    times: [0, 0.27, 0.43, 0.58, 1],
    delay: 2,
  },
  {
    id: "reflet",
    fill: "hsl(185 100% 45% / 0.08)",
    keyframes: [
      "M0,590 C360,586 720,594 1080,590 C1260,587 1380,592 1440,590 L1440,600 L0,600 Z",
      "M0,290 C440,238 800,315 1160,255 C1300,235 1400,285 1440,265 L1440,600 L0,600 Z",
      "M0,275 C200,245 560,305 920,268 C1120,242 1340,295 1440,275 L1440,600 L0,600 Z",
      "M0,285 C380,242 740,312 1100,258 C1280,238 1390,288 1440,268 L1440,600 L0,600 Z",
      "M0,590 C360,586 720,594 1080,590 C1260,587 1380,592 1440,590 L1440,600 L0,600 Z",
    ],
    duration: 13,
    times: [0, 0.3, 0.47, 0.62, 1],
    delay: 0.3,
  },
];