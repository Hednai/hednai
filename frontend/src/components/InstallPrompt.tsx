// ============================================
// components/InstallPrompt.tsx
// Banniere d'installation PWA — apparait quand le navigateur
// detecte que le site est installable (manifest + HTTPS)
// Se masque pendant 7 jours si l'utilisateur la ferme
// ============================================
import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { useInstalledDate } from "../providers/InstalledDateProvider";
import "./InstallPrompt.css";

// Type de l'evenement beforeinstallprompt (non standard dans les libs DOM)
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

// Delai avant de re-afficher la banniere : 7 jours en secondes
const DISMISS_DELAY = 7 * 24 * 60 * 60; // 604800 secondes

export function InstallPrompt() {
  const { t } = useLanguage();
  // L'evenement capture pour declencher l'installation plus tard
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  // Date de derniere fermeture de la banniere (epoch en secondes)
  const [installDate, setInstallDate] = useInstalledDate();
  // Horodatage courant au montage
  const [currentDate] = useState(() => Math.floor(Date.now() / 1000));

  useEffect(() => {
    // Intercepte l'evenement PWA avant que le navigateur n'affiche son propre prompt
    const getInstallPrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", getInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", getInstallPrompt);
  }, []);

  // Fermeture manuelle : masque la banniere pendant 7 jours
  const handleClose = () => {
    setInstallPrompt(null);
    setInstallDate(currentDate);
  };

  // Lance le dialogue d'installation du navigateur
  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      setInstallPrompt(null);
    }
  };

  // Masque si : pas d'evenement PWA, OU moins de 7 jours depuis la fermeture
  if (!installPrompt || currentDate - installDate < DISMISS_DELAY) {
    return null;
  }

  return (
    <div className="install-prompt">
      <button type="button" className="install-prompt__btn" onClick={handleInstall}>
        <Download size={18} />
        {t("pwa.install")}
      </button>
      <button type="button" className="install-prompt__close" onClick={handleClose} aria-label={t("pwa.close")}>
        <X size={18} />
      </button>
    </div>
  );
}