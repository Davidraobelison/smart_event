"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { demoRoles } from "./home.data";
import styles from "@/app/Home.module.css";

interface PersonasSectionProps {
  onRoleSelect: (roleId: string) => void;
}

export default function PersonasSection({ onRoleSelect }: PersonasSectionProps) {
  const { t } = useTranslation();

  return (
    <section id="personas" className={styles.personasSection}>
      <div className={styles.section}>
        <div style={{ textAlign: "center", marginBottom: "var(--space-xl)" }}>
          <h2 className={styles.sectionTitle}>{t("home.personas.title")}</h2>
        </div>
        <div className={styles.personaGrid}>
          {demoRoles.slice(0, 3).map((role) => (
            <div
              key={role.id}
              className={styles.personaCard}
              style={{ cursor: "pointer" }}
              onClick={() => onRoleSelect(role.id)}
            >
              <div
                style={{
                  height: "160px",
                  background: role.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <role.Icon size={64} color={role.color} />
              </div>
              <div className={styles.personaBody}>
                <h3 style={{ color: "var(--color-heading)" }}>{role.label}</h3>
                <p style={{ color: "var(--color-muted)", fontSize: "var(--fs-sm)" }}>{role.desc}</p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    marginTop: "16px",
                    fontWeight: 700,
                    fontSize: "var(--fs-sm)",
                    color: role.color,
                    cursor: "pointer",
                  }}
                >
                  S'inscrire comme {role.label} <ChevronRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
