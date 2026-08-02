// ============================================
// components/sections/QuoteCalculator.tsx
// Calculateur de devis interactif
// Le visiteur selectionne des options et voit un prix estime
// Les prix sont indicatifs — pas de paiement, juste de l'engagement
// ============================================
import { useState } from "react";
import { Calculator, Send } from "lucide-react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Card } from "../ui/Card";
import { useLanguage } from "../../i18n/useLanguage";
import "./QuoteCalculator.css";

// Options de type de projet avec leur prix de base
const PROJECT_TYPES = [
  { key: "website", priceBase: 2000 },
  { key: "webapp", priceBase: 5000 },
  { key: "maritime", priceBase: 8000 },
  { key: "ia", priceBase: 10000 },
];

// Options supplementaires avec leur cout additionnel
const ADDONS = [
  { key: "responsive", price: 500 },
  { key: "i18n", price: 800 },
  { key: "auth", price: 1200 },
  { key: "api", price: 1500 },
  { key: "dashboard", price: 2000 },
  { key: "ia_module", price: 3000 },
];

export function QuoteCalculator() {
  const { t } = useLanguage();

  // Type de projet selectionne
  const [projectType, setProjectType] = useState<string>("");

  // Options supplementaires cochees
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Calculer le prix total
  const basePrice =
    PROJECT_TYPES.find((p) => p.key === projectType)?.priceBase ?? 0;

  const addonsPrice = selectedAddons.reduce((total, addonKey) => {
    const addon = ADDONS.find((a) => a.key === addonKey);
    return total + (addon?.price ?? 0);
  }, 0);

  const totalPrice = basePrice + addonsPrice;

  // Cocher / decocher un addon
  const toggleAddon = (key: string) => {
    setSelectedAddons((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  return (
    <SectionWrapper
      id="devis"
      title={t("quote.title")}
      subtitle={t("quote.subtitle")}
    >
      <div className="quote-calc">
        {/* Etape 1 : Type de projet */}
        <div className="quote-calc__step">
          <h3>
            <Calculator size={20} /> {t("quote.step1")}
          </h3>
          <div className="quote-calc__options">
            {PROJECT_TYPES.map((type) => (
              <button
                key={type.key}
                className={`quote-calc__option ${
                  projectType === type.key ? "quote-calc__option--active" : ""
                }`}
                onClick={() => setProjectType(type.key)}
              >
                <span>{t(`quote.type.${type.key}`)}</span>
                <span className="quote-calc__option-price">
                  {t("quote.from")} {type.priceBase.toLocaleString()} $
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Etape 2 : Options supplementaires */}
        {projectType && (
          <div className="quote-calc__step">
            <h3>{t("quote.step2")}</h3>
            <div className="quote-calc__addons">
              {ADDONS.map((addon) => (
                <label
                  key={addon.key}
                  className={`quote-calc__addon ${
                    selectedAddons.includes(addon.key)
                      ? "quote-calc__addon--checked"
                      : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedAddons.includes(addon.key)}
                    onChange={() => toggleAddon(addon.key)}
                  />
                  <span>{t(`quote.addon.${addon.key}`)}</span>
                  <span className="quote-calc__addon-price">
                    +{addon.price.toLocaleString()} $
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Resultat : estimation */}
        {projectType && (
          <Card hoverable={false}>
            <div className="quote-calc__result">
              <div>
                <p className="quote-calc__result-label">
                  {t("quote.estimate")}
                </p>
                <p className="quote-calc__result-price">
                  {totalPrice.toLocaleString()} $
                </p>
                <p className="quote-calc__result-note">{t("quote.note")}</p>
              </div>
              <a href="#contact" className="btn btn--primary">
                <Send size={16} /> {t("quote.cta")}
              </a>
            </div>
          </Card>
        )}
      </div>
    </SectionWrapper>
  );
}