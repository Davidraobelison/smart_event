"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { UserRole } from "@/app/lib/auth/AuthContext";
import { useTranslation } from "@/app/lib/i18n/I18nContext";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import styles from "./Home.module.css";
import {
  Sparkles,
  Calendar,
  Briefcase,
  User,
  MessageSquare,
  TrendingUp,
  Clock,
  PieChart,
  Bell,
  Smartphone,
  Globe,
  ChevronRight,
  Shield,
  X,
} from "lucide-react";

const demoRoles = [
  {
    id: UserRole.CLIENT,
    label: "Client (Marié·e)",
    desc: "Suivez l'organisation de votre événement spécial.",
    Icon: User,
    color: "#10b981",
    bg: "rgba(16,185,129,0.1)",
    redirect: "/Client/dashboard",
  },
  {
    id: UserRole.ORGANIZER,
    label: "Organisateur",
    desc: "Gérez plusieurs événements et coordonnez vos équipes.",
    Icon: Calendar,
    color: "var(--color-primary)",
    bg: "rgba(255,147,79,0.1)",
    redirect: "/Organisateur/dashboard",
  },
  {
    id: UserRole.PROVIDER,
    label: "Prestataire",
    desc: "Proposez vos services et recevez des missions.",
    Icon: Briefcase,
    color: "#7c5cff",
    bg: "rgba(124,92,255,0.1)",
    redirect: "/Prestataire/dashboard",
  },
  {
    id: UserRole.ADMIN,
    label: "Administrateur",
    desc: "Supervisez et gérez l'ensemble de la plateforme.",
    Icon: Shield,
    color: "#ef5350",
    bg: "rgba(239,83,80,0.1)",
    redirect: "/Admin/dashboard",
  },
];

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation();
  const { isLoaded, isSignedIn } = useUser();

  // Role selection state
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"login" | "signup">("signup");

  const openRoleModal = (mode: "login" | "signup") => {
    setModalMode(mode);
    setIsRoleModalOpen(true);
  };

  const handleRoleSelect = (role: string) => {
    const destination = modalMode === "signup" ? "/sign-up" : "/sign-in";
    router.push(`${destination}?role=${role.toLowerCase()}`);
    setIsRoleModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <header className={styles.navbar}>
        <div className={styles.logo}>
          <Sparkles size={24} />
          <span>SmartEvent</span>
        </div>
        <nav className={styles.navLinks}>
          <a href="#features" className={styles.navLink}>Fonctionnalités</a>
          <a href="#personas" className={styles.navLink}>Solutions</a>
          <a href="#pricing" className={styles.navLink}>Tarifs</a>

          {isLoaded && !isSignedIn && (
            <>
              <Link
                href="/sign-in"
                className={styles.btnSecondary}
                style={{ padding: "8px 20px", fontSize: "var(--fs-sm)" }}
              >
                Connexion
              </Link>
              <button
                className={styles.btnPrimary}
                style={{ padding: "8px 20px", fontSize: "var(--fs-sm)" }}
                onClick={() => openRoleModal("signup")}
              >
                Inscription
              </button>
            </>
          )}

          {isLoaded && isSignedIn && (
            <UserButton />
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>{t("home.hero.badge")}</span>
          <h1 className={styles.heroTitle}>{t("home.hero.title")}</h1>
          <p className={styles.heroSubtitle}>{t("home.hero.subtitle")}</p>
          <div className={styles.heroActions}>
            {!isSignedIn ? (
              <>
                <button
                  className={styles.btnPrimary}
                  onClick={() => openRoleModal("signup")}
                >
                  {t("home.hero.cta_primary")}
                </button>
                <Link
                  href="/sign-in"
                  className={`${styles.btnSecondary} ${styles.btnSecondaryHero}`}
                >
                  {t("home.hero.cta_secondary")}
                </Link>
              </>
            ) : (
              <Link href="/sync-role" className={styles.btnPrimary}>
                Accéder à mon espace
              </Link>
            )}
          </div>
        </div>
        <div className={styles.heroImageWrap}>
          <img src="/images/hero-events.png" alt="SmartEvent — Organisation d'événements" className={styles.heroImg} />
          <div className={styles.heroImageOverlay} />
          {/* Floating cards */}
          <div className={styles.floatCard} style={{ top: "20%", left: "-60px" }}>
            <span style={{ fontSize: "20px" }}>✅</span>
            <div>
              <p style={{ margin: 0, fontWeight: "700", fontSize: "13px", color: "var(--color-heading)" }}>Tâche validée</p>
              <p style={{ margin: 0, fontSize: "11px", color: "var(--color-muted)" }}>Traiteur confirmé</p>
            </div>
          </div>
          <div className={styles.floatCard} style={{ bottom: "15%", right: "-50px" }}>
            <span style={{ fontSize: "20px" }}>📅</span>
            <div>
              <p style={{ margin: 0, fontWeight: "700", fontSize: "13px", color: "var(--color-heading)" }}>15 Août 2024</p>
              <p style={{ margin: 0, fontSize: "11px", color: "var(--color-muted)" }}>J-124 — Mariage Julie</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem → Solution */}
      <section id="features" className={styles.section}>
        <div style={{ textAlign: "center", marginBottom: "var(--space-xl)" }}>
          <h2 className={styles.sectionTitle}>{t("home.problem.title")}</h2>
          <p className={styles.sectionSubtitle}>{t("home.problem.subtitle")}</p>
        </div>
        <div className={styles.valueProp}>
          {[
            { icon: Clock, key: "stress" },
            { icon: MessageSquare, key: "communication" },
            { icon: PieChart, key: "budget" },
          ].map(({ icon: Icon, key }) => (
            <div key={key} className={styles.propCard}>
              <div className={styles.iconWrapper}><Icon size={30} /></div>
              <h3>{t(`home.problem.items.${key}.title`)}</h3>
              <p>{t(`home.problem.items.${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className={styles.featuresSection}>
        <div className={styles.section}>
          <div style={{ textAlign: "center", marginBottom: "var(--space-xl)" }}>
            <h2 className={styles.sectionTitle}>{t("home.features.title")}</h2>
            <p className={styles.sectionSubtitle}>{t("home.features.subtitle")}</p>
          </div>
          <div className={styles.featuresGrid}>
            {[
              { Icon: Calendar, key: "timeline" }, { Icon: TrendingUp, key: "budget" },
              { Icon: Briefcase, key: "marketplace" }, { Icon: MessageSquare, key: "chat" },
              { Icon: Bell, key: "notifications" }, { Icon: Sparkles, key: "ai" },
            ].map(({ Icon, key }) => (
              <div key={key} className={styles.featureCard} onClick={() => openRoleModal("signup")}>
                <Icon className={styles.iconStyle} />
                <h3>{t(`home.features.items.${key}.title`)}</h3>
                <p>{t(`home.features.items.${key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personas */}
      <section id="personas" className={styles.personasSection}>
        <div className={styles.section}>
          <div style={{ textAlign: "center", marginBottom: "var(--space-xl)" }}>
            <h2 className={styles.sectionTitle}>{t("home.personas.title")}</h2>
          </div>
          <div className={styles.personaGrid}>
            {demoRoles.slice(0, 3).map((role) => (
              <div key={role.id} className={styles.personaCard} style={{ cursor: "pointer" }} onClick={() => handleRoleSelect(role.id)}>
                <div style={{ height: "160px", background: role.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <role.Icon size={64} color={role.color} />
                </div>
                <div className={styles.personaBody}>
                  <h3 style={{ color: "var(--color-heading)" }}>{role.label}</h3>
                  <p style={{ color: "var(--color-muted)", fontSize: "var(--fs-sm)" }}>{role.desc}</p>
                  <div className={styles.navLink} style={{ border: "none", background: "none", padding: 0, fontWeight: "700", marginTop: "16px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", color: role.color, fontFamily: "var(--font-family-base)" }}>
                    S'inscrire comme {role.label} <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className={styles.ctaBand}>
        <div className={styles.section} style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: "800", color: "white", margin: "0 0 var(--space-md)" }}>
            Prêt à révolutionner vos événements ?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "var(--space-xl)", fontSize: "var(--fs-md)" }}>
            Rejoignez plus de 1 200 utilisateurs qui font confiance à SmartEvent.
          </p>
          <button className={styles.btnWhite} onClick={() => openRoleModal("signup")}>
            Démarrer gratuitement
          </button>
        </div>
      </section>

      {/* Role Selection Modal */}
      {isRoleModalOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsRoleModalOpen(false)}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h2 className={styles.modalTitle}>
                  {modalMode === "signup" ? "Créez votre compte" : "Connectez-vous"}
                </h2>
                <p style={{ color: "var(--color-muted)", marginTop: "4px" }}>
                  Sélectionnez votre profil pour continuer
                </p>
              </div>
              <button className={styles.modalClose} onClick={() => setIsRoleModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className={styles.roleGrid}>
              {demoRoles.slice(0, 3).map((role) => (
                <div
                  key={role.id}
                  className={styles.roleCard}
                  onClick={() => handleRoleSelect(role.id)}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "12px",
                      background: role.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <role.Icon size={24} color={role.color} />
                  </div>
                  <h3 style={{ margin: "0 0 8px", color: "var(--color-heading)" }}>{role.label}</h3>
                  <p style={{ margin: 0, fontSize: "var(--fs-xs)", color: "var(--color-muted)", lineHeight: "1.5" }}>
                    {role.desc}
                  </p>
                  <div
                    style={{
                      marginTop: "auto",
                      paddingTop: "16px",
                      fontSize: "var(--fs-xs)",
                      fontWeight: "700",
                      color: role.color,
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    Choisir ce profil <ChevronRight size={14} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div>
            <div className={styles.logo} style={{ color: "white", marginBottom: "var(--space-md)" }}>
              <Sparkles size={24} /><span>SmartEvent</span>
            </div>
            <p style={{ maxWidth: "300px", fontSize: "var(--fs-sm)", opacity: 0.6 }}>
              La plateforme de référence pour l'organisation d'événements.
            </p>
          </div>
          <div style={{ display: "flex", gap: "var(--space-xxl)" }}>
            <div>
              <h4 style={{ marginBottom: "var(--space-md)", color: "white" }}>Produit</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
                {["Fonctionnalités", "Tarifs", "Application"].map((l) => (
                  <li key={l}><a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "var(--fs-sm)" }}>{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ marginBottom: "var(--space-md)", color: "white" }}>Aide</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
                {["Support", "Contact", "FAQ"].map((l) => (
                  <li key={l}><a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "var(--fs-sm)" }}>{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <span>{t("home.footer.rights")}</span>
          <div style={{ display: "flex", gap: "var(--space-md)" }}>
            {["Twitter", "LinkedIn", "Instagram"].map((s) => (
              <a key={s} href="#" style={{ color: "rgba(255,255,255,0.5)", fontSize: "var(--fs-xs)" }}>{s}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

