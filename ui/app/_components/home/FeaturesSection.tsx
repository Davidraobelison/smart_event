"use client";

import React from "react";
import { Calendar, TrendingUp, Briefcase, MessageSquare, Bell, Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import styles from "@/app/Home.module.css";

const features = [
  { Icon: Calendar,      key: "timeline" },
  { Icon: TrendingUp,    key: "budget" },
  { Icon: Briefcase,     key: "marketplace" },
  { Icon: MessageSquare, key: "chat" },
  { Icon: Bell,          key: "notifications" },
  { Icon: Sparkles,      key: "ai" },
] as const;

interface FeaturesSectionProps {
  onOpenModal: (mode: "login" | "signup") => void;
}

export default function FeaturesSection({ onOpenModal }: FeaturesSectionProps) {
  const { t } = useTranslation();

  return (
    <section className={styles.featuresSection}>
      <div className={styles.section}>
        <div style={{ textAlign: "center", marginBottom: "var(--space-xl)" }}>
          <h2 className={styles.sectionTitle}>{t("home.features.title")}</h2>
          <p className={styles.sectionSubtitle}>{t("home.features.subtitle")}</p>
        </div>
        <div className={styles.featuresGrid}>
          {features.map(({ Icon, key }) => (
            <div key={key} className={styles.featureCard} onClick={() => onOpenModal("signup")}>
              <Icon className={styles.iconStyle} />
              <h3>{t(`home.features.items.${key}.title`)}</h3>
              <p>{t(`home.features.items.${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
