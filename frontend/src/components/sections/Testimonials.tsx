// ============================================
// components/sections/Testimonials.tsx
// Section temoignages — retours de professeurs, collegues, mentors
// Pas de faux temoignages clients — on reste honnete
// Chaque temoignage a un contexte (universitaire, prototype, etc.)
// ============================================
import { Quote } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Card } from "../ui/Card";
import { FadeIn } from "../FadeIn";
import { useLanguage } from "../../i18n/useLanguage";
import "./Testimonials.css";

// Structure d'un temoignage
interface Testimonial {
  nameKey: string;
  roleKey: string;
  contextKey: string;
  quoteKey: string;
}

// Donnees des temoignages
const TESTIMONIALS: Testimonial[] = [
  {
    nameKey: "testimonials.t1.name",
    roleKey: "testimonials.t1.role",
    contextKey: "testimonials.t1.context",
    quoteKey: "testimonials.t1.quote",
  },
  {
    nameKey: "testimonials.t2.name",
    roleKey: "testimonials.t2.role",
    contextKey: "testimonials.t2.context",
    quoteKey: "testimonials.t2.quote",
  },
  {
    nameKey: "testimonials.t3.name",
    roleKey: "testimonials.t3.role",
    contextKey: "testimonials.t3.context",
    quoteKey: "testimonials.t3.quote",
  },
];

export function Testimonials() {
  const { t } = useLanguage();

  return (
    <SectionWrapper
      id="temoignages"
      title={t("testimonials.title")}
      subtitle={t("testimonials.subtitle")}
    >
      <div className="testimonials-grid">
        {TESTIMONIALS.map((item, index) => (
          <FadeIn key={item.nameKey} delay={index * 0.1}>
            <Card>
              <div className="testimonial">
                <Quote size={24} strokeWidth={1} className="testimonial__icon" />
                <p className="testimonial__quote">{t(item.quoteKey)}</p>
                <div className="testimonial__author">
                  <span className="testimonial__name">{t(item.nameKey)}</span>
                  <span className="testimonial__role">{t(item.roleKey)}</span>
                  <span className="testimonial__context">{t(item.contextKey)}</span>
                </div>
              </div>
            </Card>
          </FadeIn>
        ))}
      </div>
    </SectionWrapper>
  );
}