// ============================================
// pages/Dashboard.tsx
// Dashboard admin simple — affiche les stats et messages
// Accessible via /admin (pas dans la nav publique)
// Prouve que le backend est fonctionnel et exploite Prisma
// ============================================
import { useState } from "react";
import { RefreshCw, MessageSquare, Activity, Clock, LogIn } from "lucide-react";
import { Card } from "../components/ui/Card";
import { useLanguage } from "../i18n/useLanguage";
import { SITE_CONFIG } from "../config/site";
import "./Dashboard.css";

// Types pour les donnees du dashboard
interface Stats {
  totalMessages: number;
  lastMessage: { createdAt: string; name: string; subject: string } | null;
  byMethod: Array<{ contactMethod: string; _count: number }>;
  totalAuditLogs: number;
  serverTime: string;
}

interface Message {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  contactMethod: string;
  subject: string;
  message: string;
  createdAt: string;
}

export function Dashboard() {
  const { t } = useLanguage();

  // Etats pour l'authentification
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [authError, setAuthError] = useState(false);

  // Etats pour les donnees
  const [stats, setStats] = useState<Stats | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ---- Charger les donnees avec le token ----
  const fetchData = async (authToken: string) => {
    setLoading(true);
    setError(null);

    try {
      const baseUrl = SITE_CONFIG.api.baseUrl;
      const headers = { Authorization: `Bearer ${authToken}` };

      // Charger stats et messages en parallele
      const [statsRes, msgsRes] = await Promise.all([
        fetch(`${baseUrl}/api/dashboard/stats`, { headers }),
        fetch(`${baseUrl}/api/dashboard/messages?limit=20`, { headers }),
      ]);

      // Si 401, le mot de passe est incorrect
      if (statsRes.status === 401 || msgsRes.status === 401) {
        setToken(null);
        setAuthError(true);
        setLoading(false);
        return;
      }

      if (!statsRes.ok || !msgsRes.ok) {
        throw new Error("Erreur API");
      }

      const statsData = await statsRes.json();
      const msgsData = await msgsRes.json();

      setStats(statsData.data);
      setMessages(msgsData.data.messages);
    } catch {
      setError(t("dashboard.error"));
    } finally {
      setLoading(false);
    }
  };

  // ---- Se connecter avec le mot de passe ----
  const handleLogin = () => {
    setAuthError(false);
    setToken(password);
    fetchData(password);
  };

  // ---- Rafraichir les donnees ----
  const handleRefresh = () => {
    if (token) fetchData(token);
  };

  // ---- Ecran de connexion ----
  if (!token) {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="dashboard__login">
            <LogIn size={32} strokeWidth={1.5} />
            <h1>{t("dashboard.title")}</h1>
            <p>{t("dashboard.loginPrompt")}</p>

            <div className="dashboard__login-form">
              <input
                type="password"
                placeholder={t("dashboard.passwordPlaceholder")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <button className="btn btn--primary" onClick={handleLogin}>
                {t("dashboard.loginBtn")}
              </button>
            </div>

            {authError && (
              <p className="dashboard__auth-error">
                {t("dashboard.authError")}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className="dashboard">
        <div className="container">
          <p className="dashboard__loading">{t("dashboard.loading")}</p>
        </div>
      </div>
    );
  }

  // Affichage en cas d'erreur
  if (error) {
    return (
      <div className="dashboard">
        <div className="container">
          <p className="dashboard__error">{error}</p>
          <button className="btn btn--secondary" onClick={handleRefresh}>
            {t("dashboard.retry")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        {/* En-tete avec bouton de rafraichissement */}
        <div className="dashboard__header">
          <h1>{t("dashboard.title")}</h1>
          <button className="btn btn--ghost" onClick={handleRefresh}>
            <RefreshCw size={16} /> {t("dashboard.refresh")}
          </button>
        </div>

        {/* Cartes de statistiques */}
        <div className="dashboard__stats-grid">
          <Card hoverable={false}>
            <div className="dashboard__stat">
              <MessageSquare size={24} strokeWidth={1.5} />
              <span className="dashboard__stat-number">
                {stats?.totalMessages ?? 0}
              </span>
              <span className="dashboard__stat-label">
                {t("dashboard.totalMessages")}
              </span>
            </div>
          </Card>

          <Card hoverable={false}>
            <div className="dashboard__stat">
              <Activity size={24} strokeWidth={1.5} />
              <span className="dashboard__stat-number">
                {stats?.totalAuditLogs ?? 0}
              </span>
              <span className="dashboard__stat-label">
                {t("dashboard.totalLogs")}
              </span>
            </div>
          </Card>

          <Card hoverable={false}>
            <div className="dashboard__stat">
              <Clock size={24} strokeWidth={1.5} />
              <span className="dashboard__stat-number">
                {stats?.lastMessage
                  ? new Date(stats.lastMessage.createdAt).toLocaleDateString()
                  : "—"}
              </span>
              <span className="dashboard__stat-label">
                {t("dashboard.lastMessage")}
              </span>
            </div>
          </Card>
        </div>

        {/* Table des messages */}
        <h2 className="dashboard__section-title">
          {t("dashboard.messagesTitle")}
        </h2>

        {messages.length === 0 ? (
          <p className="dashboard__empty">{t("dashboard.noMessages")}</p>
        ) : (
          <div className="dashboard__table-wrap">
            <table className="dashboard__table">
              <thead>
                <tr>
                  <th>{t("dashboard.col.date")}</th>
                  <th>{t("dashboard.col.name")}</th>
                  <th>{t("dashboard.col.method")}</th>
                  <th>{t("dashboard.col.subject")}</th>
                  <th>{t("dashboard.col.message")}</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg.id}>
                    <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                    <td>{msg.name}</td>
                    <td>{msg.contactMethod}</td>
                    <td>{msg.subject}</td>
                    <td className="dashboard__msg-cell">
                      {msg.message.length > 80
                        ? msg.message.slice(0, 80) + "..."
                        : msg.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}