// ============================================
// components/PdfViewer.tsx
// Visionneuse PDF responsive basée sur PDF.js
// ============================================

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "./PdfViewer.css";

// Configure le Worker PDF.js utilisé pour le traitement des fichiers PDF.
// Le Worker permet d'effectuer le traitement PDF en dehors du thread principal.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

// Options de chargement de PDF.js.
const PDF_OPTIONS = {
  disableAutoFetch: false,
  disableStream: false,
};

// Limite la largeur maximale d'affichage d'une page PDF.
const LARGEUR_MAX = 900;

interface PdfViewerProps {
  file: string;
  title: string;
  labels: {
    loading: string;
    error: string;
    openInNewTab: string;
    page: string;
  };
}

export function PdfViewer({ file, title, labels }: PdfViewerProps) {
  // Référence vers le conteneur afin de mesurer sa largeur réelle.
  const containerRef = useRef<HTMLDivElement>(null);

  // Largeur utilisée pour adapter dynamiquement les pages PDF au conteneur.
  const [largeur, setLargeur] = useState(0);

  // Nombre total de pages du document chargé.
  const [nbPages, setNbPages] = useState(0);

  // Indique si le chargement du document PDF a échoué.
  const [erreur, setErreur] = useState(false);

  // Observe les changements de largeur du conteneur afin de rendre
  // la visionneuse responsive, notamment lors du redimensionnement
  // de la fenêtre ou du passage en mode mobile.
  useEffect(() => {
    const element = containerRef.current;

    if (!element) return;

    const mesurer = () => {
      setLargeur(Math.min(element.clientWidth, LARGEUR_MAX));
    };

    // Mesure initiale du conteneur.
    mesurer();

    // Surveille automatiquement les changements de dimensions.
    const observateur = new ResizeObserver(mesurer);
    observateur.observe(element);

    // Nettoie l'observateur lorsque le composant est démonté.
    return () => observateur.disconnect();
  }, []);

  const onLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNbPages(numPages);
    },
    [],
  );

  // Callback exécuté lorsqu'une erreur survient pendant le chargement du PDF.
  const onLoadError = useCallback(() => setErreur(true), []);

  // Génère la liste des numéros de pages à afficher.
  // useMemo évite de recréer cette liste lorsque nbPages n'a pas changé.
  const pages = useMemo(
    () => Array.from({ length: nbPages }, (_, i) => i + 1),
    [nbPages],
  );

  // Affiche un état d'erreur avec une solution de secours permettant
  // d'ouvrir directement le fichier PDF dans un nouvel onglet.
  if (erreur) {
    return (
      <div className="pdf-viewer" ref={containerRef}>
        <div className="pdf-viewer__message">
          <p>{labels.error}</p>

          <a
            href={file}
            target="_blank"
            rel="noopener noreferrer"
            className="pdf-viewer__link"
          >
            {labels.openInNewTab}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="pdf-viewer" ref={containerRef}>
      <Document
        file={file}
        options={PDF_OPTIONS}
        onLoadSuccess={onLoadSuccess}
        onLoadError={onLoadError}
        loading={
          <div className="pdf-viewer__message">
            {labels.loading}
          </div>
        }
        error={
          <div className="pdf-viewer__message">
            {labels.error}
          </div>
        }
        // Les liens présents dans le PDF sont ouverts dans un nouvel onglet.
        externalLinkTarget="_blank"
      >
        {largeur > 0 &&
          pages.map((numero) => (
            <div key={numero} className="pdf-viewer__page">
              <Page
                pageNumber={numero}
                width={largeur}
                // Affiche les liens et annotations présents dans le PDF.
                renderAnnotationLayer
                // Permet de sélectionner et rechercher le texte du PDF.
                renderTextLayer
                loading=""
              />

              {/* Indicateur visuel du numéro de page courant. */}
              <span className="pdf-viewer__page-number">
                {labels.page} {numero} / {nbPages}
              </span>
            </div>
          ))}
      </Document>

      {/* Texte destiné aux technologies d'assistance, masqué visuellement. */}
      <span className="pdf-viewer__sr-only">{title}</span>
    </div>
  );
}