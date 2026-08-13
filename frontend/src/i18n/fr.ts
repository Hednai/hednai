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
  "nav.blog": "Blog",

  // Accessibilite Navbar (aria-labels)
  "nav.openMenu": "Ouvrir le menu",
  "nav.closeMenu": "Fermer le menu",
  "nav.lightMode": "Mode clair",
  "nav.darkMode": "Mode sombre",
  "nav.why": "Pourquoi",
  "nav.about": "A propos",

  // Hero (section d'introduction en haut de page)
  "hero.title": "Logiciels IA pour digitaliser le maritime",
  "hero.subtitle": "Hednai developpe des solutions sur mesure pour les ports, armateurs et compagnies maritimes — gestion de flotte, maintenance predictive et optimisation des operations grace a l'intelligence artificielle.",
  "hero.cta1": "Discutons de votre projet",
  "hero.cta2": "Voir nos solutions",

  // Section Services
  "services.title": "Nos Solutions",
  "services.subtitle": "Des logiciels concus pour les besoins reels du secteur maritime",
  "services.maritime.title": "Applications Maritimes",
  "services.maritime.desc": "Developpement de logiciels sur mesure pour la gestion de flotte, suivi de cargaisons, maintenance navale et conformite reglementaire.",
  "services.maritime.f1": "Gestion de flotte",
  "services.maritime.f2": "Suivi GPS",
  "services.maritime.f3": "Maintenance predictive",
  "services.maritime.f4": "Conformite SOLAS",
  "services.web.title": "Plateformes Portuaires",
  "services.web.desc": "Applications web pour la gestion des terminaux, escales et operations portuaires en temps reel.",
  "services.web.f1": "Gestion des escales",
  "services.web.f2": "Suivi des operations",
  "services.web.f3": "Tableaux de bord",
  "services.web.f4": "Reporting automatise",
  "services.ia.title": "Solutions IA Maritime",
  "services.ia.desc": "Intelligence artificielle appliquee au secteur maritime : optimisation de routes, prediction de consommation, analyse de donnees.",
  "services.ia.f1": "Optimisation de routes",
  "services.ia.f2": "Analyse predictive",
  "services.ia.f3": "Vision par ordinateur",
  "services.ia.f4": "Traitement de donnees",
  "services.data.title": "Inspection Maritime",
  "services.data.desc": "Logiciels de suivi des inspections, conformite reglementaire et documentation technique des navires.",
  "services.data.f1": "Inspections PSC/FSI",
  "services.data.f2": "Gestion des certificats",
  "services.data.f3": "Rapports de conformite",
  "services.data.f4": "Historique navire",
  "services.cloud.title": "ERP Maritime",
  "services.cloud.desc": "Systemes integres pour la gestion complete d'une compagnie maritime — equipage, finances, operations.",
  "services.cloud.f1": "Gestion d'equipage",
  "services.cloud.f2": "Suivi budgetaire",
  "services.cloud.f3": "Planification voyages",
  "services.cloud.f4": "Documentation reglementaire",
  "services.auto.title": "Developpement sur mesure",
  "services.auto.desc": "Applications web et mobiles personnalisees pour tout type d'entreprise — pas seulement le maritime.",
  "services.auto.f1": "Sites vitrines",
  "services.auto.f2": "Applications metier",
  "services.auto.f3": "API et integrations",
  "services.auto.f4": "Conseil technique",

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

  // Footer — credit
  "footer.poweredBy": "Propulse par",

  // PWA — banniere d'installation
  "pwa.install": "Installer l'application Hednai",
  "pwa.close": "Fermer",

  // Page 404
  "notFound.message": "Cette page n'existe pas ou a ete deplacee.",
  "notFound.back": "Retour a l'accueil",

  // Section Pourquoi Hednai
  "why.title": "Pourquoi Hednai ?",
  "why.subtitle": "Une startup nee de l'experience terrain pour repondre aux defis du maritime moderne",
  "why.mission.title": "Notre mission",
  "why.mission.desc": "Digitaliser les operations maritimes en Afrique et dans le monde grace a des logiciels sur mesure, accessibles et performants.",
  "why.vision.title": "Notre vision",
  "why.vision.desc": "Devenir le partenaire technologique de reference pour les ports, armateurs et compagnies maritimes en pleine transformation numerique.",
  "why.values.title": "Nos valeurs",
  "why.values.desc": "Fiabilite, innovation et proximite terrain. Chaque solution est concue par un developpeur qui comprend la realite du metier maritime.",
  "why.edge.title": "Notre avantage",
  "why.edge.desc": "Plus de 10 ans d'experience en mer combines a une expertise en developpement logiciel et intelligence artificielle.",

  // Section A propos
  "about.title": "A propos",
  "about.subtitle": "Du pont d'un navire au code d'une startup",
  "about.intro": "Je m'appelle Daren, fondateur de Hednai. Ancien officier de marine avec plus de 10 ans d'experience en mer, j'ai cree Hednai pour developper des logiciels IA adaptes aux realites du secteur maritime — parce que nous connaissons le terrain de l'interieur.",
  "about.step1.period": "2010 — 2022",
  "about.step1.title": "Officier de marine",
  "about.step1.desc": "Plus de 10 ans a bord de navires — gestion d'equipage, navigation, operations portuaires. Une connaissance profonde des defis du maritime au quotidien.",
  "about.step2.period": "2023 — 2025",
  "about.step2.title": "Formation en programmation",
  "about.step2.desc": "Reconversion au College La Cite (Ottawa) en Programmation Web Avancee. Specialisation prevue en intelligence artificielle a Algonquin College.",
  "about.step3.period": "2025 — Aujourd'hui",
  "about.step3.title": "Fondateur de Hednai",
  "about.step3.desc": "Creation d'une startup de solutions logicielles IA pour le maritime. Chaque produit est concu par quelqu'un qui a vecu les problemes qu'il resout.",

  // Footer enrichi
  "footer.mission.title": "Mission",
  "footer.mission.text": "Digitaliser le maritime grace a l'intelligence artificielle et au developpement logiciel sur mesure.",
  "footer.tech.title": "Technologies",
  "footer.tech.text": "React, TypeScript, Node.js, Express, PostgreSQL, Python, TensorFlow",
  "footer.contact.title": "Contact",

  // SEO meta
  "seo.home.title": "Hednai — Logiciels IA pour le Maritime",
  "seo.home.desc": "Hednai developpe des solutions logicielles sur mesure pour les ports, armateurs et compagnies maritimes. Gestion de flotte, maintenance predictive, IA.",

  // Widget statut API
  "apiStatus.loading": "Connexion API...",
  "apiStatus.online": "API en ligne",
  "apiStatus.offline": "API hors ligne",

  // Bandeau CTA double
  "cta.client.title": "Vous etes un armateur ou un port ?",
  "cta.client.desc": "Contactez Hednai pour une solution logicielle sur mesure adaptee a vos operations maritimes.",
  "cta.client.btn": "Discutons de votre projet",
  "cta.recruiter.title": "Vous recrutez un developpeur ?",
  "cta.recruiter.desc": "Decouvrez mon parcours, mes projets et mes competences techniques. Disponible pour un stage ou un poste.",
  "cta.recruiter.btn": "Voir mon profil",

  // Badge de disponibilite
  "availability.text": "Disponible pour stage et missions freelance",

  // Toggle mode client / recruteur
  "viewMode.toggle": "Changer le mode d'affichage",
  "viewMode.client": "Mode Client",
  "viewMode.recruiter": "Mode Recruteur",
  "viewMode.switchRecruiter": "Passer en mode recruteur",
  "viewMode.switchClient": "Passer en mode client",

  // Dashboard admin
  "dashboard.title": "Tableau de bord",
  "dashboard.loading": "Chargement des donnees...",
  "dashboard.error": "Impossible de charger les donnees du dashboard.",
  "dashboard.retry": "Reessayer",
  "dashboard.refresh": "Rafraichir",
  "dashboard.totalMessages": "Messages recus",
  "dashboard.totalLogs": "Logs d'audit",
  "dashboard.lastMessage": "Dernier message",
  "dashboard.messagesTitle": "Messages",
  "dashboard.noMessages": "Aucun message recu pour le moment.",
  "dashboard.col.date": "Date",
  "dashboard.col.name": "Nom",
  "dashboard.col.method": "Methode",
  "dashboard.col.subject": "Sujet",
  "dashboard.col.message": "Message",

  // Blog
  "blog.title": "Blog",
  "blog.subtitle": "Articles techniques sur le developpement, le maritime et l'IA",
  "blog.readMore": "Lire l'article",
  "blog.notFound": "Article introuvable.",
  "blog.backToList": "Retour au blog",
  "blog.seo.title": "Blog — Hednai",
  "blog.seo.desc": "Articles techniques sur le developpement web, l'intelligence artificielle et le secteur maritime.",
  "blog.article1.title": "Pourquoi digitaliser le maritime en 2025 ?",
  "blog.article1.summary": "Le secteur maritime est l'un des moins digitalises au monde. Voici pourquoi ca doit changer et comment Hednai y contribue.",
  "blog.article1.content": "Le secteur maritime represente 90% du commerce mondial, mais reste l'un des moins digitalises. Les processus papier, les communications radio et les systemes legacy freinent l'efficacite des ports et des compagnies maritimes. Chez Hednai, nous croyons que la technologie peut transformer ce secteur — pas en remplacant l'expertise humaine, mais en l'augmentant. Nos solutions IA permettent d'optimiser les routes, de predire les pannes et de digitaliser les inspections. La question n'est plus de savoir si le maritime va se digitaliser, mais quand — et avec qui.",
  "blog.article2.title": "Architecture React + TypeScript pour un projet professionnel",
  "blog.article2.summary": "Comment structurer un projet React avec TypeScript, des composants reutilisables et une architecture scalable.",
  "blog.article2.content": "Quand on demarre un projet React professionnel, la structure du code est aussi importante que le code lui-meme. Chez Hednai, nous utilisons une architecture par features avec des composants UI reutilisables, un systeme i18n type, et une separation claire entre les pages, les donnees et la logique metier. TypeScript n'est pas juste un bonus — c'est une assurance qualite qui detecte les erreurs avant qu'elles arrivent en production. Dans cet article, je partage les patterns que j'utilise au quotidien.",
  "blog.article3.title": "IA et maintenance predictive des navires",
  "blog.article3.summary": "Comment l'intelligence artificielle peut predire les pannes moteur et reduire les couts de maintenance en mer.",
  "blog.article3.content": "La maintenance non planifiee en mer coute des millions chaque annee aux compagnies maritimes. Les capteurs IoT modernes generent des teraoctets de donnees — temperature moteur, vibrations, consommation de carburant — mais sans analyse intelligente, ces donnees restent inutiles. L'IA de maintenance predictive analyse ces flux en temps reel pour detecter les anomalies avant qu'elles deviennent des pannes. Resultat : moins d'immobilisations, moins de couts, plus de securite. C'est exactement le type de solution que Hednai developpe pour le secteur maritime.",

  // Hero — variante mode recruteur
  "hero.title.recruiter": "Developpeur Full Stack passionne par le maritime et l'IA",
  "hero.subtitle.recruiter": "Ancien officier de marine reconverti en developpeur React, Node.js et TypeScript. Fondateur de Hednai, une startup de logiciels IA pour le maritime.",
  "hero.cta1.recruiter": "Voir mon profil complet",
  "hero.cta2.recruiter": "Voir mes projets",

  // Services — variante mode recruteur
  "services.title.recruiter": "Ce que je developpe",
  "services.subtitle.recruiter": "Un apercu de mes competences a travers les solutions Hednai",
  "services.recruiterLink": "Voir toutes mes competences techniques →",

  // Calendrier de rendez-vous
  "calendar.title": "Reservez un creneau",
  "calendar.desc": "Choisissez un moment qui vous convient pour une consultation gratuite de 15 minutes.",

  // Calculateur de devis
  "quote.title": "Estimez votre projet",
  "quote.subtitle": "Selectionnez vos besoins pour obtenir une estimation indicative",
  "quote.step1": "Type de projet",
  "quote.step2": "Options supplementaires",
  "quote.from": "A partir de",
  "quote.estimate": "Estimation indicative",
  "quote.note": "Prix final determine apres echange sur les details du projet.",
  "quote.cta": "Demander un devis precis",
  "quote.type.website": "Site vitrine",
  "quote.type.webapp": "Application web",
  "quote.type.maritime": "Solution maritime",
  "quote.type.ia": "Solution IA",
  "quote.addon.responsive": "Design responsive",
  "quote.addon.i18n": "Multilingue (FR/EN)",
  "quote.addon.auth": "Authentification utilisateurs",
  "quote.addon.api": "API REST",
  "quote.addon.dashboard": "Tableau de bord admin",
  "quote.addon.ia_module": "Module intelligence artificielle",

  // Navigation — Roadmap
  "nav.roadmap": "Roadmap",

  // Roadmap publique
  "roadmap.title": "Feuille de route",
  "roadmap.subtitle": "La vision Hednai, etape par etape",
  "roadmap.m1.title": "Site officiel et portfolio",
  "roadmap.m1.desc": "Lancement du site vitrine Hednai avec positionnement 2-en-1 (startup + portfolio).",
  "roadmap.m2.title": "Architecture backend",
  "roadmap.m2.desc": "API Express, PostgreSQL, Redis, tests, CI/CD — fondation technique solide.",
  "roadmap.m3.title": "Premiers projets clients",
  "roadmap.m3.desc": "Developpement des premieres solutions pour des partenaires maritimes.",
  "roadmap.m4.title": "MVP SaaS",
  "roadmap.m4.desc": "Premiere version de la plateforme de gestion de flotte en mode SaaS.",
  "roadmap.m5.title": "Intelligence artificielle",
  "roadmap.m5.desc": "Integration de modules IA — maintenance predictive, optimisation de routes.",
  "roadmap.m6.title": "Expansion Afrique",
  "roadmap.m6.desc": "Deploiement aupres des ports et compagnies maritimes d'Afrique de l'Ouest.",

  // Page Solutions
  "solutions.page.title": "Nos Solutions",
  "solutions.page.subtitle": "Logiciels concus pour les besoins reels du secteur maritime",
  "solutions.seo.title": "Solutions — Hednai",
  "solutions.seo.desc": "Decouvrez les solutions logicielles Hednai pour le maritime : gestion de flotte, inspection, maintenance predictive.",
  "solutions.cta": "Discutons de votre projet",
  "solutions.label.problem": "Le probleme",
  "solutions.label.solution": "Notre solution",
  "solutions.label.benefits": "Benefices",
  "solutions.label.audience": "Pour qui",
  "solutions.status.available": "Disponible",
  "solutions.status.development": "En developpement",
  "solutions.status.planned": "Prevu",
  "solutions.fleet.title": "Gestion de flotte",
  "solutions.fleet.problem": "Les compagnies maritimes gerent souvent leurs navires avec des tableurs Excel, des emails et du papier. Les informations sont dispersees et difficiles a consolider.",
  "solutions.fleet.solution": "Une plateforme centralisee qui regroupe le suivi GPS, la planification des voyages, la gestion d'equipage et les documents reglementaires en un seul endroit.",
  "solutions.fleet.b1": "Visibilite en temps reel sur toute la flotte",
  "solutions.fleet.b2": "Reduction du temps administratif de 40%",
  "solutions.fleet.b3": "Conformite reglementaire automatisee",
  "solutions.fleet.audience": "Armateurs, compagnies maritimes, gestionnaires de flotte",
  "solutions.port.title": "Plateforme portuaire",
  "solutions.port.problem": "Les ports gerent des centaines d'escales par mois avec des systemes fragmentes. La coordination entre les acteurs (pilotage, remorquage, manutention) reste largement manuelle.",
  "solutions.port.solution": "Un logiciel de gestion des escales et des operations portuaires avec tableaux de bord en temps reel et reporting automatise.",
  "solutions.port.b1": "Planification des escales optimisee",
  "solutions.port.b2": "Communication fluide entre les acteurs",
  "solutions.port.b3": "Reporting automatise pour les autorites",
  "solutions.port.audience": "Autorites portuaires, operateurs de terminaux",
  "solutions.inspection.title": "Inspection maritime numerique",
  "solutions.inspection.problem": "Les inspections de navires (PSC, FSI) generent des montagnes de papier. Les certificats expirent sans alerte, les rapports sont difficiles a retrouver.",
  "solutions.inspection.solution": "Un logiciel de suivi des inspections avec alertes automatiques, gestion des certificats et historique complet par navire.",
  "solutions.inspection.b1": "Zero certificat expire grace aux alertes",
  "solutions.inspection.b2": "Historique d'inspection accessible en 2 clics",
  "solutions.inspection.b3": "Rapports de conformite generes automatiquement",
  "solutions.inspection.audience": "Inspecteurs, societes de classification, armateurs",
  "solutions.maintenance.title": "Maintenance predictive IA",
  "solutions.maintenance.problem": "Les pannes en mer coutent des millions. La maintenance planifiee ne tient pas compte de l'etat reel des equipements.",
  "solutions.maintenance.solution": "Un module IA qui analyse les donnees des capteurs (temperature, vibrations, consommation) pour predire les pannes avant qu'elles surviennent.",
  "solutions.maintenance.b1": "Reduction des pannes imprevues de 60%",
  "solutions.maintenance.b2": "Optimisation des couts de maintenance",
  "solutions.maintenance.b3": "Decisions basees sur des donnees, pas sur des calendriers",
  "solutions.maintenance.audience": "Directeurs techniques, superintendants, armateurs",

  // Page recruteur
  "recruiter.seo.title": "Recruteur — Daren | Hednai",
  "recruiter.seo.desc": "Profil developpeur : parcours marine, competences React/Node/IA, projets realises.",
  "recruiter.back": "Retour au site",
  "recruiter.title": "Daren — Developpeur Full Stack",
  "recruiter.tagline": "Ancien officier de marine | React, Node.js, TypeScript, IA | Fondateur de Hednai",
  "recruiter.contact": "Me contacter",
  "recruiter.about.title": "Parcours",
  "recruiter.about.text": "Apres plus de 10 ans comme officier dans la marine marchande, je me suis reconverti dans le developpement logiciel au College La Cite (Ottawa). Je combine aujourd'hui ma connaissance du terrain maritime avec des competences en React, Node.js, TypeScript et intelligence artificielle. J'ai fonde Hednai pour developper des solutions logicielles adaptees aux realites du secteur maritime.",
  "recruiter.skills.title": "Competences techniques",
  "recruiter.skills.frontend": "Frontend",
  "recruiter.skills.backend": "Backend",
  "recruiter.skills.tools": "Outils et DevOps",
  "recruiter.skills.other": "Qualite et bonnes pratiques",
  "recruiter.diff.title": "Ce qui me differencie",
  "recruiter.diff.text": "Je ne suis pas juste un developpeur qui a appris a coder. Mon experience de plus de 10 ans en mer me donne une comprehension unique des problemes metier. Quand je developpe un logiciel de gestion de flotte, je sais exactement quelles donnees comptent, quels workflows sont critiques et quelles erreurs sont inacceptables — parce que j'ai vecu ces situations.",
  "recruiter.cta": "Discutons ensemble",

  // Temoignages
  "testimonials.title": "Retours",
  "testimonials.subtitle": "Ce que disent les personnes avec qui j'ai travaille",
  "testimonials.t1.name": "Professeur X",
  "testimonials.t1.role": "Enseignant en programmation, College La Cite",
  "testimonials.t1.context": "Projet universitaire",
  "testimonials.t1.quote": "Daren se distingue par sa rigueur et sa capacite a structurer des projets complexes. Son experience professionnelle apporte une maturite rare chez un etudiant.",
  "testimonials.t2.name": "Collegue Y",
  "testimonials.t2.role": "Etudiant en programmation, College La Cite",
  "testimonials.t2.context": "Projet d'equipe",
  "testimonials.t2.quote": "Travailler avec Daren sur notre projet de groupe a ete une experience enrichissante. Il prend le temps d'expliquer ses choix techniques et pousse l'equipe vers le haut.",
  "testimonials.t3.name": "Mentor Z",
  "testimonials.t3.role": "Developpeur senior",
  "testimonials.t3.context": "Mentorat technique",
  "testimonials.t3.quote": "Le niveau d'architecture de Hednai est impressionnant pour un projet etudiant. Prisma, Zod, Express 5, tests, CI/CD — c'est du niveau professionnel.",

  // Dashboard — authentification
  "dashboard.loginPrompt": "Entrez le mot de passe administrateur pour acceder au tableau de bord.",
  "dashboard.passwordPlaceholder": "Mot de passe",
  "dashboard.loginBtn": "Se connecter",
  "dashboard.authError": "Mot de passe incorrect.",
};

// Type derive automatiquement des cles du fichier francais
// Utilise dans LanguageContext.tsx pour empecher les fautes de frappe
// Si tu ajoutes une cle ici, elle sera automatiquement disponible partout
export type TranslationKey = keyof typeof fr;