// ============================================
// data/services.ts
// Donnees des services avec cles i18n
// Le champ "icon" correspond au nom d'une icone Lucide React
// ============================================
import type { Service } from "../types";

export const services: Service[] = [
  {
    id: 1,
    icon: "Ship",
    titleKey: "services.maritime.title",
    descriptionKey: "services.maritime.desc",
    featureKeys: [
      "services.maritime.f1",
      "services.maritime.f2",
      "services.maritime.f3",
      "services.maritime.f4",
    ],
  },
  {
    id: 2,
    icon: "Globe",
    titleKey: "services.web.title",
    descriptionKey: "services.web.desc",
    featureKeys: [
      "services.web.f1",
      "services.web.f2",
      "services.web.f3",
      "services.web.f4",
    ],
  },
  {
    id: 3,
    icon: "Brain",
    titleKey: "services.ia.title",
    descriptionKey: "services.ia.desc",
    featureKeys: [
      "services.ia.f1",
      "services.ia.f2",
      "services.ia.f3",
      "services.ia.f4",
    ],
  },
  {
    id: 4,
    icon: "Database",
    titleKey: "services.data.title",
    descriptionKey: "services.data.desc",
    featureKeys: [
      "services.data.f1",
      "services.data.f2",
      "services.data.f3",
      "services.data.f4",
    ],
  },
  {
    id: 5,
    icon: "Cloud",
    titleKey: "services.cloud.title",
    descriptionKey: "services.cloud.desc",
    featureKeys: [
      "services.cloud.f1",
      "services.cloud.f2",
      "services.cloud.f3",
      "services.cloud.f4",
    ],
  },
  {
    id: 6,
    icon: "Zap",
    titleKey: "services.auto.title",
    descriptionKey: "services.auto.desc",
    featureKeys: [
      "services.auto.f1",
      "services.auto.f2",
      "services.auto.f3",
      "services.auto.f4",
    ],
  },
];