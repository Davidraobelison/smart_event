import React from "react";
import { Clock, MessageSquare, PieChart } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import styles from "@/app/(home)/Home.module.css";

const items = [
  { icon: Clock,         key: "stress" },
  { icon: MessageSquare, key: "communication" },
  { icon: PieChart,      key: "budget" },
] as const;

export default function ProblemSection() {
  const { t } = useTranslation();

  return (
    <section id="features" className={styles.section}>
      <div style={{ textAlign: "center", marginBottom: "var(--space-xl)" }}>
        <h2 className={styles.sectionTitle}>{t("home.problem.title")}</h2>
        <p className={styles.sectionSubtitle}>{t("home.problem.subtitle")}</p>
      </div>
      <div className={styles.valueProp}>
        {items.map(({ icon: Icon, key }) => (
          <div key={key} className={styles.propCard}>
            <div className={styles.iconWrapper}><Icon size={30} /></div>
            <h3>{t(`home.problem.items.${key}.title`)}</h3>
            <p>{t(`home.problem.items.${key}.desc`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
