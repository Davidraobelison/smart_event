import React from "react";
import { Sparkles } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import styles from "@/app/Home.module.css";

const productLinks = ["Fonctionnalités", "Tarifs", "Application"];
const helpLinks    = ["Support", "Contact", "FAQ"];
const socials      = ["Twitter", "LinkedIn", "Instagram"];

export default function HomeFooter() {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div>
          <div className={styles.logo} style={{ color: "white", marginBottom: "var(--space-md)" }}>
            <Sparkles size={24} />
            <span>SmartEvent</span>
          </div>
          <p style={{ maxWidth: "300px", fontSize: "var(--fs-sm)", opacity: 0.6 }}>
            La plateforme de référence pour l'organisation d'événements.
          </p>
        </div>

        <div style={{ display: "flex", gap: "var(--space-xxl)" }}>
          <div>
            <h4 style={{ marginBottom: "var(--space-md)", color: "white" }}>Produit</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
              {productLinks.map((l) => (
                <li key={l}>
                  <a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "var(--fs-sm)" }}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: "var(--space-md)", color: "white" }}>Aide</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
              {helpLinks.map((l) => (
                <li key={l}>
                  <a href="#" style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "var(--fs-sm)" }}>
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span>{t("home.footer.rights")}</span>
        <div style={{ display: "flex", gap: "var(--space-md)" }}>
          {socials.map((s) => (
            <a key={s} href="#" style={{ color: "rgba(255,255,255,0.5)", fontSize: "var(--fs-xs)" }}>
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
