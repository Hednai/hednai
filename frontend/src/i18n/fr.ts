// ============================================
// i18n/fr.ts — Traductions francaises COMPLETES
// TOUTES les traductions du site (hero, nav, services, projets, contact, footer)
// Chaque cle correspond a un texte affiche quelque part sur le site
// ============================================
export const fr: Record<string, string> = {
  // Navigation
  "nav.home": "Accueil",
  "nav.services": "Services",
  "nav.portfolio": "Portfolio",
  "nav.contact": "Contact",

  // Hero (section d'introduction en haut de page)
  "hero.title": "Solutions Digitales pour le Maritime",
  "hero.subtitle": "Developpeur freelance specialise en applications logicielles maritimes, developpement web et solutions d'intelligence artificielle.",
  "hero.cta1": "Demarrer un projet",
  "hero.cta2": "Decouvrir mes services",

  // Section Services
  "services.title": "Mes Services",
  "services.subtitle": "Une expertise complete pour transformer vos projets en solutions digitales performantes",
  "services.maritime.title": "Applications Maritimes",
  "services.maritime.desc": "Developpement de logiciels sur mesure pour la gestion de flotte, suivi de cargaisons, maintenance navale et conformite reglementaire.",
  "services.maritime.f1": "Gestion de flotte",
  "services.maritime.f2": "Suivi GPS",
  "services.maritime.f3": "Maintenance predictive",
  "services.maritime.f4": "Conformite SOLAS",
  "services.web.title": "Developpement Web",
  "services.web.desc": "Creation de sites web et applications web modernes, responsive et performantes adaptees a vos besoins metiers.",
  "services.web.f1": "React & TypeScript",
  "services.web.f2": "Design responsive",
  "services.web.f3": "SEO optimise",
  "services.web.f4": "Performance maximale",
  "services.ia.title": "Solutions IA Maritime",
  "services.ia.desc": "Intelligence artificielle appliquee au secteur maritime : optimisation de routes, prediction de consommation, analyse de donnees.",
  "services.ia.f1": "Optimisation de routes",
  "services.ia.f2": "Analyse predictive",
  "services.ia.f3": "Vision par ordinateur",
  "services.ia.f4": "Traitement de donnees",
  "services.data.title": "Gestion de Donnees",
  "services.data.desc": "Architecture et gestion de bases de donnees robustes pour le stockage et l'analyse de vos donnees operationnelles.",
  "services.data.f1": "PostgreSQL",
  "services.data.f2": "MongoDB",
  "services.data.f3": "API REST",
  "services.data.f4": "Cloud storage",
  "services.cloud.title": "Solutions Cloud",
  "services.cloud.desc": "Deploiement et maintenance d'applications dans le cloud avec haute disponibilite et securite.",
  "services.cloud.f1": "AWS / Azure",
  "services.cloud.f2": "Scalabilite",
  "services.cloud.f3": "Monitoring 24/7",
  "services.cloud.f4": "Securite renforcee",
  "services.auto.title": "Automatisation",
  "services.auto.desc": "Automatisation de processus metiers et integration de systemes pour ameliorer votre productivite.",
  "services.auto.f1": "Workflows automatises",
  "services.auto.f2": "Integrations API",
  "services.auto.f3": "Scripts personnalises",
  "services.auto.f4": "Reporting automatique",

  // Section Portfolio
  "portfolio.title": "Portfolio",
  "portfolio.subtitle": "Decouvrez quelques-uns de mes projets recents",
  "portfolio.view": "Voir le projet",
  "portfolio.code": "Code source",
  "portfolio.filter.all": "Tous",
  "portfolio.filter.maritime": "Application Maritime",
  "portfolio.filter.ia": "Solution IA",
  "portfolio.filter.web": "Developpement Web",

  // Projets affiches dans le portfolio
  "projects.fleet.title": "FleetManager Pro",
  "projects.fleet.desc": "Systeme de gestion de flotte en temps reel avec suivi GPS, maintenance et conformite reglementaire.",
  "projects.fleet.long": "Application complete de gestion de flotte maritime permettant le suivi en temps reel de navires.",
  "projects.fleet.f1": "Dashboard temps reel",
  "projects.fleet.f2": "Suivi GPS multi-navires",
  "projects.fleet.f3": "Alertes maintenance",
  "projects.fleet.f4": "Export rapports PDF",
  "projects.route.title": "RouteOptimizer AI",
  "projects.route.desc": "Optimisation intelligente des routes maritimes basee sur IA pour reduire la consommation.",
  "projects.portal.title": "PortalWeb Maritime",
  "projects.portal.desc": "Portail web pour compagnie maritime avec reservation en ligne et suivi de cargaisons.",

  // Section Contact
  "contact.title": "Contactez-moi",
  "contact.subtitle": "Discutons de votre projet et voyons comment je peux vous aider",
  "contact.info.title": "Informations de contact",
  "contact.info.email": "Email",
  "contact.info.phone": "Telephone",
  "contact.info.location": "Localisation",
  "contact.info.available": "Disponible a distance",
  "contact.info.follow": "Suivez-moi",

  // Onglets Email / WhatsApp
  "contact.tab.email": "Email",
  "contact.tab.whatsapp": "WhatsApp",

  // Champs du formulaire
  "contact.form.name": "Nom complet",
  "contact.form.name.placeholder": "Jean Dupont",
  "contact.form.email": "Email",
  "contact.form.email.placeholder": "jean@example.com",
  "contact.form.phone": "Telephone",
  "contact.form.phone.placeholder": "01 02 91 90 65",
  "contact.form.dialCode": "Indicatif",
  "contact.form.subject": "Sujet",
  "contact.form.subject.placeholder": "Developpement d'une application maritime",
  "contact.form.message": "Message",
  "contact.form.message.placeholder": "Decrivez votre projet...",
  "contact.form.send": "Envoyer le message",
  "contact.form.sending": "Envoi...",
  "contact.form.success": "Message envoye !",
  "contact.form.error.name": "Nom trop court (min 2 caracteres)",
  "contact.form.error.email": "Email invalide",
  "contact.form.error.phone": "Numero de telephone invalide",
  "contact.form.error.subject": "Sujet trop court (min 2 caracteres)",
  "contact.form.error.message": "Message trop court (min 10 caracteres)",
  "contact.form.error.network": "Erreur reseau — verifiez votre connexion.",

  // Footer (pied de page)
  "footer.rights": "Tous droits reserves.",

  // Bouton retour en haut (boussole maritime)
  "scrollToTop": "Retour en haut",

  // Page detail d'un projet
  "project.notFound": "Projet non trouve",
  "project.backHome": "Retour a l'accueil",
  "project.back": "Retour",
  "project.features": "Fonctionnalites",
  "project.viewLive": "Voir le projet",
  "project.viewCode": "Code source",

   // Navbar — accessibilite
  "nav.openMenu": "Ouvrir le menu",
  "nav.closeMenu": "Fermer le menu",
  "nav.lightMode": "Mode clair",
  "nav.darkMode": "Mode sombre",
  // Footer — credit
  "footer.poweredBy": "Propulse par",

  // PWA — banniere d'installation
  "pwa.install": "Installer l'application Hednai",
  "pwa.close": "Fermer",
};