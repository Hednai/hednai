// ============================================
// components/sections/Services.tsx
// Section services : grille generee depuis data/services.ts
// ============================================
import { Ship, Anchor, Brain, ClipboardCheck, Building, Code } from "lucide-react";
import { services } from "../../data/services";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Card } from "../ui/Card";
import { FadeIn } from "../FadeIn";
import { useLanguage } from "../../i18n/LanguageContext";
import "./Services.css";

// Table de correspondance entre le nom d'icone (string) et le vrai composant icone
const icons: Record<string, React.ElementType> = {
  Ship, Anchor, Brain, ClipboardCheck, Building, Code,
};

export function Services() {
  const { t } = useLanguage();

  return (
    <SectionWrapper
      id="services"
      title={t("services.title")}
      subtitle={t("services.subtitle")}
      gray
    >
      <div className="services-grid">
        {services.map((s, index) => {
          const Icon = icons[s.icon];

          return (
            <FadeIn key={s.id} delay={index * 0.1}>
              <Card>
                <div className="svc">
                  <div className="svc__icon">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3>{t(s.titleKey)}</h3>
                  <p>{t(s.descriptionKey)}</p>
                  <ul>
                    {s.featureKeys.map((fk) => (
                      <li key={fk}>{t(fk)}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            </FadeIn>
          );
        })}
      </div>
    </SectionWrapper>
  );
}