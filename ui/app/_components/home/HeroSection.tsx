"use client";

import React from "react";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";
import styles from "@/app/Home.module.css";

interface HeroSectionProps {
  isSignedIn: boolean;
  onOpenModal: (mode: "login" | "signup") => void;
}

export default function HeroSection({ isSignedIn, onOpenModal }: HeroSectionProps) {
  const { t } = useTranslation();

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroInner}>
        <span className={styles.heroBadge}>{t("home.hero.badge")}</span>
        <h1 className={styles.heroTitle}>{t("home.hero.title")}</h1>
        <p className={styles.heroSubtitle}>{t("home.hero.subtitle")}</p>
        <div className={styles.heroActions}>
          {!isSignedIn ? (
            <>
              <button className={styles.btnPrimary} onClick={() => onOpenModal("signup")}>
                {t("home.hero.cta_primary")}
              </button>
              <Link href="/sign-in" className={`${styles.btnSecondary} ${styles.btnSecondaryHero}`}>
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
        <img
          src="/images/hero-events.png"
          alt="SmartEvent — Organisation d'événements"
          className={styles.heroImg}
        />
        <div className={styles.heroImageOverlay} />

        <div className={styles.floatCard} style={{ top: "20%", left: "-60px" }}>
          <span style={{ fontSize: "20px" }}>✅</span>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: "13px", color: "var(--color-heading)" }}>
              Tâche validée
            </p>
            <p style={{ margin: 0, fontSize: "11px", color: "var(--color-muted)" }}>Traiteur confirmé</p>
          </div>
        </div>

        <div className={styles.floatCard} style={{ bottom: "15%", right: "-50px" }}>
          <span style={{ fontSize: "20px" }}>📅</span>
          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: "13px", color: "var(--color-heading)" }}>
              15 Août 2024
            </p>
            <p style={{ margin: 0, fontSize: "11px", color: "var(--color-muted)" }}>J-124 — Mariage Julie</p>
          </div>
        </div>
      </div>
    </section>
  );
}
