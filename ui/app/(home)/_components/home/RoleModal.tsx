"use client";

import React from "react";
import { X, ChevronRight } from "lucide-react";
import { demoRoles } from "./home.data";
import styles from "@/app/(home)/Home.module.css";

interface RoleModalProps {
  isOpen: boolean;
  mode: "login" | "signup";
  onClose: () => void;
  onRoleSelect: (roleId: string) => void;
}

export default function RoleModal({ isOpen, mode, onClose, onRoleSelect }: RoleModalProps) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <h2 className={styles.modalTitle}>
              {mode === "signup" ? "Créez votre compte" : "Connectez-vous"}
            </h2>
            <p style={{ color: "var(--color-muted)", marginTop: "4px" }}>
              Sélectionnez votre profil pour continuer
            </p>
          </div>
          <button className={styles.modalClose} onClick={onClose} aria-label="Fermer">
            <X size={20} />
          </button>
        </div>

        <div className={styles.roleGrid}>
          {demoRoles.slice(0, 3).map((role) => (
            <div key={role.id} className={styles.roleCard} onClick={() => onRoleSelect(role.id)}>
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
              <p style={{ margin: 0, fontSize: "var(--fs-xs)", color: "var(--color-muted)", lineHeight: 1.5 }}>
                {role.desc}
              </p>
              <div
                style={{
                  marginTop: "auto",
                  paddingTop: "16px",
                  fontSize: "var(--fs-xs)",
                  fontWeight: 700,
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
  );
}
