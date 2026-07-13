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

export default function App() {
  return (
    // Attrape toute erreur React pour eviter l'ecran blanc
    <ErrorBoundary>
      {/* Rend la langue et t() disponibles partout */}
      <LanguageProvider>
        {/* Active la navigation par URL (/, /project/:slug) */}
        <BrowserRouter>
          {/* Navbar + Footer autour du contenu de chaque page */}
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:slug" element={<ProjectDetail />} />
            </Routes>
          </MainLayout>
        </BrowserRouter>
      </LanguageProvider>
    </ErrorBoundary>
  );
}