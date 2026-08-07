// ============================================
// data/solutions.ts
// Donnees des solutions Hednai — chaque solution decrit
// un probleme, une solution, les benefices et le public cible
// Utilise dans la page /solutions
// ============================================

// ---- Interface TypeScript ----
// Definit la structure d'une solution :
// - id : identifiant numerique unique
// - slug : version URL-friendly du titre (ex: "fleet-management")
// - iconName : nom de l'icone Lucide a afficher
// - titleKey : cle de traduction pour le titre
// - problemKey : cle de traduction pour decrire le probleme
// - solutionKey : cle de traduction pour la solution proposee
// - benefitsKeys : tableau de 3 cles de traduction pour les benefices
// - audienceKey : cle de traduction pour le public cible
// - status : etat du projet ("available", "development", "planned")
export interface Solution {
  id: number;
  slug: string;
  iconName: string;
  titleKey: string;
  problemKey: string;
  solutionKey: string;
  benefitsKeys: string[];
  audienceKey: string;
  status: "available" | "development" | "planned";
}

// ---- Donnees des solutions ----
// Chaque objet represente une solution maritime proposee par Hednai
// Les textes sont stockes dans les fichiers de traduction (fr/en)
// pour permettre le multilinguisme
export const solutions: Solution[] = [
  {
    id: 1,
    slug: "fleet-management",
    iconName: "Ship",
    titleKey: "solutions.fleet.title",
    problemKey: "solutions.fleet.problem",
    solutionKey: "solutions.fleet.solution",
    benefitsKeys: [
      "solutions.fleet.b1",
      "solutions.fleet.b2",
      "solutions.fleet.b3",
    ],
    audienceKey: "solutions.fleet.audience",
    status: "development", // En cours de developpement
  },
  {
    id: 2,
    slug: "port-platform",
    iconName: "Anchor",
    titleKey: "solutions.port.title",
    problemKey: "solutions.port.problem",
    solutionKey: "solutions.port.solution",
    benefitsKeys: [
      "solutions.port.b1",
      "solutions.port.b2",
      "solutions.port.b3",
    ],
    audienceKey: "solutions.port.audience",
    status: "planned", // Planifie pour le futur
  },
  {
    id: 3,
    slug: "maritime-inspection",
    iconName: "ClipboardCheck",
    titleKey: "solutions.inspection.title",
    problemKey: "solutions.inspection.problem",
    solutionKey: "solutions.inspection.solution",
    benefitsKeys: [
      "solutions.inspection.b1",
      "solutions.inspection.b2",
      "solutions.inspection.b3",
    ],
    audienceKey: "solutions.inspection.audience",
    status: "planned",
  },
  {
    id: 4,
    slug: "predictive-maintenance",
    iconName: "Brain",
    titleKey: "solutions.maintenance.title",
    problemKey: "solutions.maintenance.problem",
    solutionKey: "solutions.maintenance.solution",
    benefitsKeys: [
      "solutions.maintenance.b1",
      "solutions.maintenance.b2",
      "solutions.maintenance.b3",
    ],
    audienceKey: "solutions.maintenance.audience",
    status: "planned",
  },
];