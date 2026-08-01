// ============================================
// App.tsx — Structure principale de l'application
// Assemble : ErrorBoundary → LanguageProvider → BrowserRouter → MainLayout
// ============================================
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageContext";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { ProjectDetail } from "./pages/ProjectDetail";
import { InstalledDateProvider } from "./providers/InstalledDateProvider";
import { InstallPrompt } from "./components/InstallPrompt";

export default function App() {
  return (
    // Attrape toute erreur React pour eviter l'ecran blanc
    <ErrorBoundary>
      {/* Rend la langue et t() disponibles partout */}
      <LanguageProvider>
        {/* Gere la date de fermeture de la banniere PWA (localStorage) */}
        <InstalledDateProvider>
          {/* Active la navigation par URL (/, /project/:slug) */}
          <BrowserRouter>
            {/* Banniere d'installation PWA, au-dessus de tout le reste */}
            <InstallPrompt />
            {/* Navbar + Footer autour du contenu de chaque page */}
            <MainLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/project/:slug" element={<ProjectDetail />} />
              </Routes>
            </MainLayout>
          </BrowserRouter>
        </InstalledDateProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}