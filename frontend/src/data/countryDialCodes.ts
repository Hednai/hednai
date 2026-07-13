// ============================================
// data/countryDialCodes.ts
// Liste des indicatifs telephoniques pour le champ WhatsApp
// Cote d'Ivoire en premier (marche principale), puis pays cibles,
// puis le reste par ordre alphabetique
// ============================================

// Structure d'un indicatif : code (+225), nom du pays, drapeau emoji, code ISO
export interface CountryCode {
  code: string;
  country: string;
  flag: string;
  iso: string;
}

export const countryCodes: CountryCode[] = [
  // ── Pays prioritaires ──
  { code: "+225", country: "Côte d'Ivoire", flag: "🇨🇮", iso: "CI" },
  { code: "+221", country: "Sénégal", flag: "🇸🇳", iso: "SN" },
  { code: "+237", country: "Cameroun", flag: "🇨🇲", iso: "CM" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬", iso: "NG" },
  { code: "+233", country: "Ghana", flag: "🇬🇭", iso: "GH" },
  { code: "+33", country: "France", flag: "🇫🇷", iso: "FR" },
  { code: "+1", country: "Canada", flag: "🇨🇦", iso: "CA" },
  { code: "+1", country: "États-Unis", flag: "🇺🇸", iso: "US" },
  { code: "+44", country: "Royaume-Uni", flag: "🇬🇧", iso: "GB" },
  { code: "+212", country: "Maroc", flag: "🇲🇦", iso: "MA" },

  // ── Reste, ordre alphabetique ──
  { code: "+213", country: "Algérie", flag: "🇩🇿", iso: "DZ" },
  { code: "+49", country: "Allemagne", flag: "🇩🇪", iso: "DE" },
  { code: "+244", country: "Angola", flag: "🇦🇴", iso: "AO" },
  { code: "+32", country: "Belgique", flag: "🇧🇪", iso: "BE" },
  { code: "+229", country: "Bénin", flag: "🇧🇯", iso: "BJ" },
  { code: "+226", country: "Burkina Faso", flag: "🇧🇫", iso: "BF" },
  { code: "+257", country: "Burundi", flag: "🇧🇮", iso: "BI" },
  { code: "+34", country: "Espagne", flag: "🇪🇸", iso: "ES" },
  { code: "+241", country: "Gabon", flag: "🇬🇦", iso: "GA" },
  { code: "+224", country: "Guinée", flag: "🇬🇳", iso: "GN" },
  { code: "+39", country: "Italie", flag: "🇮🇹", iso: "IT" },
  { code: "+223", country: "Mali", flag: "🇲🇱", iso: "ML" },
  { code: "+222", country: "Mauritanie", flag: "🇲🇷", iso: "MR" },
  { code: "+227", country: "Niger", flag: "🇳🇪", iso: "NE" },
  { code: "+31", country: "Pays-Bas", flag: "🇳🇱", iso: "NL" },
  { code: "+351", country: "Portugal", flag: "🇵🇹", iso: "PT" },
  { code: "+41", country: "Suisse", flag: "🇨🇭", iso: "CH" },
  { code: "+228", country: "Togo", flag: "🇹🇬", iso: "TG" },
  { code: "+216", country: "Tunisie", flag: "🇹🇳", iso: "TN" },
];