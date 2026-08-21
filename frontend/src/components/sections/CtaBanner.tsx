// ============================================
// components/sections/CtaBanner.tsx
// Bento grid : client, recruteur, devis (modal), calendrier
// Inspire de sertica.com — 4 blocs dans une grille asymetrique
// ============================================
import { useState } from "react";
import { Ship, FileUser, Calculator, Calendar, X } from "lucide-react";
import { FadeIn } from "../FadeIn";
import { CalendlyEmbed } from "../CalendlyEmbed";
import { QuoteCalculator } from "./QuoteCalculator";
import { useLanguage } from "../../i18n/useLanguage";
import { useViewMode } from "../../context/useViewMode";
import "./CtaBanner.css";

export function CtaBanner() {
  const { t } = useLanguage();
  const { isRecruiter, setMode } = useViewMode();
  // Modal du calculateur de devis
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <section className="cta-bento">
      <div className="container">
        <div className={`cta-bento__grid ${isRecruiter ? "cta-bento__grid--recruiter" : ""}`}>

          {/* ===== MODE RECRUTEUR : CTA simplifie ===== */}
          {isRecruiter ? (
            <FadeIn delay={0}>
              <div className="cta-bento__card cta-bento__card--recruiter-mode">
                <FileUser size={32} strokeWidth={1.5} />
                <h3>{t("cta.recruiter.title.mode")}</h3>
                <p>{t("cta.recruiter.desc.mode")}</p>
                <a href="#contact" className="btn btn--primary">
                  {t("cta.recruiter.btn.mode")}
                </a>
              </div>
            </FadeIn>
          ) : (
            <>
              {/* ===== MODE CLIENT : bento complet ===== */}

              {/* Carte client maritime */}
              <FadeIn delay={0}>
                <div className="cta-bento__card cta-bento__card--client">
                  <Ship size={32} strokeWidth={1.5} />
                  <h3>{t("cta.client.title")}</h3>
                  <p>{t("cta.client.desc")}</p>
                  <a href="#contact" className="btn btn--primary">
                    {t("cta.client.btn")}
                  </a>
                </div>
              </FadeIn>

              {/* Carte recruteur — bascule en mode recruteur au clic */}
              <FadeIn delay={0.1}>
                <div className="cta-bento__card cta-bento__card--recruiter">
                  <FileUser size={32} strokeWidth={1.5} />
                  <h3>{t("cta.recruiter.title")}</h3>
                  <p>{t("cta.recruiter.desc")}</p>
                  <button
                    className="btn btn--secondary"
                    onClick={() => setMode("recruiter")}
                  >
                    {t("cta.recruiter.btn")}
                  </button>
                </div>
              </FadeIn>

              {/* Carte devis — ouvre le calculateur en modal */}
              <FadeIn delay={0.2}>
                <button
                  className="cta-bento__card cta-bento__card--quote"
                  onClick={() => setQuoteOpen(true)}
                >
                  <Calculator size={32} strokeWidth={1.5} />
                  <h3>{t("quote.title")}</h3>
                  <p>{t("quote.subtitle")}</p>
                  <span className="btn btn--primary">{t("quote.cta")}</span>
                </button>
              </FadeIn>

              {/* Carte calendrier — ouvre le calendrier en modal */}
              <FadeIn delay={0.3}>
                <button
                  className="cta-bento__card cta-bento__card--calendar"
                  onClick={() => setCalendarOpen(true)}
                >
                  <Calendar size={32} strokeWidth={1.5} />
                  <h3>{t("cta.calendar.title")}</h3>
                  <p>{t("cta.calendar.desc")}</p>
                  <span className="btn btn--secondary">{t("cta.calendar.btn")}</span>
                </button>
              </FadeIn>
            </>
          )}
        </div>
      </div>

      {/* ===== MODAL CALENDRIER ===== */}
      {calendarOpen && (
        <div className="quote-modal__overlay" onClick={() => setCalendarOpen(false)}>
          <div className="quote-modal__content" onClick={(e) => e.stopPropagation()}>
            <button
              className="quote-modal__close"
              onClick={() => setCalendarOpen(false)}
              aria-label="Fermer"
            >
              <X size={24} />
            </button>
            <CalendlyEmbed />
          </div>
        </div>
      )}

      {/* ===== MODAL CALCULATEUR DE DEVIS ===== */}
      {quoteOpen && (
        <div className="quote-modal__overlay" onClick={() => setQuoteOpen(false)}>
          <div className="quote-modal__content" onClick={(e) => e.stopPropagation()}>
            <button
              className="quote-modal__close"
              onClick={() => setQuoteOpen(false)}
              aria-label="Fermer"
            >
              <X size={24} />
            </button>
            <QuoteCalculator />
          </div>
        </div>
      )}
    </section>
  );
}