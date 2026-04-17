"use client";

import React from "react";
import styles from "@/app/(home)/Home.module.css";

interface CtaBandProps {
  onOpenModal: (mode: "login" | "signup") => void;
}

export default function CtaBand({ onOpenModal }: CtaBandProps) {
  return (
    <section className={styles.ctaBand}>
      <div className={styles.section} style={{ textAlign: "center" }}>
        <h2
          style={{
            fontSize: "clamp(24px, 4vw, 40px)",
            fontWeight: 800,
            color: "white",
            margin: "0 0 var(--space-md)",
          }}
        >
          Prêt à révolutionner vos événements ?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: "var(--space-xl)", fontSize: "var(--fs-md)" }}>
          Rejoignez plus de 1 200 utilisateurs qui font confiance à SmartEvent.
        </p>
        <button className={styles.btnWhite} onClick={() => onOpenModal("signup")}>
          Démarrer gratuitement
        </button>
      </div>
    </section>
  );
}
