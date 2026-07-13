// ============================================
// __tests__/ContactForm.test.tsx
// Test du formulaire Contact (interaction utilisateur)
// Verifie la validation front et le succes d'envoi (onglet Email actif par defaut)
// ============================================
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LanguageProvider } from "../i18n/LanguageContext";
import { Contact } from "../components/sections/Contact";

// Mocker l'appel API pour ne pas toucher au vrai backend pendant le test
vi.mock("../routes/contact", () => ({
  sendContactMessage: vi.fn(),
}));

// Importer le mock pour le configurer dans chaque test
import { sendContactMessage } from "../routes/contact";
const mockSend = sendContactMessage as ReturnType<typeof vi.fn>;

// Aide : rend le composant avec le LanguageProvider (necessaire pour t())
const renderContact = () => {
  return render(
    <LanguageProvider>
      <Contact />
    </LanguageProvider>,
  );
};

describe("Contact", () => {
  // Reinitialiser le mock avant chaque test pour eviter les interferences
  beforeEach(() => {
    mockSend.mockReset();
  });

  // --- Le formulaire s'affiche (onglet Email actif par defaut) ---
  it("affiche les champs du formulaire", () => {
    renderContact();

    // Verifier que les labels principaux existent bien a l'ecran
    expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sujet/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
  });

  // --- Les deux onglets sont presents ---
  it("affiche les onglets Email et WhatsApp", () => {
    renderContact();

    expect(screen.getByRole("button", { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /whatsapp/i })).toBeInTheDocument();
  });

  // --- Cliquer sur l'onglet WhatsApp affiche le champ telephone ---
  it("affiche le champ telephone quand on clique sur l'onglet WhatsApp", () => {
    renderContact();

    const ongletWhatsapp = screen.getByRole("button", { name: /whatsapp/i });
    fireEvent.click(ongletWhatsapp);

    // Le champ email disparait, le champ telephone apparait
    expect(screen.queryByLabelText(/^email$/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/telephone|phone/i)).toBeInTheDocument();
  });

  // --- Erreur si champs vides (onglet Email) ---
  it("affiche des erreurs si on soumet le formulaire vide", async () => {
    renderContact();

    // Cliquer sur le bouton envoyer sans remplir les champs
    const bouton = screen.getByRole("button", { name: /envoyer/i });
    fireEvent.click(bouton);

    // Attendre que les erreurs apparaissent a l'ecran
    await waitFor(() => {
      const erreurs = document.querySelectorAll(".field-error");
      expect(erreurs.length).toBeGreaterThan(0);
    });
  });

  // --- Succes apres soumission valide (Email) ---
  it("affiche le message de succes apres un envoi reussi par Email", async () => {
    // Simuler une reponse OK du backend (jamais vraiment appele)
    mockSend.mockResolvedValueOnce({ success: true, data: { id: 1 } });

    renderContact();

    // Remplir chaque champ avec des donnees valides
    fireEvent.change(screen.getByLabelText(/nom/i), {
      target: { value: "Jean Dupont", id: "name" },
    });
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: "jean@example.com", id: "email" },
    });
    fireEvent.change(screen.getByLabelText(/sujet/i), {
      target: { value: "Question projet", id: "subject" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "Bonjour, je voudrais en savoir plus sur vos services.", id: "message" },
    });

    // Soumettre le formulaire
    const bouton = screen.getByRole("button", { name: /envoyer/i });
    fireEvent.click(bouton);

    // Attendre l'apparition du message de succes
    await waitFor(() => {
      const succes = document.querySelector(".form-msg--ok");
      expect(succes).toBeInTheDocument();
    });

    // Verifier que la fonction d'envoi a bien ete appelee une seule fois
    expect(mockSend).toHaveBeenCalledTimes(1);

    // Verifier que le payload envoye correspond bien a la methode "email"
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({ contactMethod: "email" }),
    );
  });
});