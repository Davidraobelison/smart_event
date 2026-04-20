"use client";

import React from "react";
import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import styles from "@/app/(home)/Home.module.css";

interface HomeNavbarProps {
  isLoaded: boolean;
  isSignedIn: boolean;
  onOpenModal: (mode: "login" | "signup") => void;
}

export default function HomeNavbar({ isLoaded, isSignedIn, onOpenModal }: HomeNavbarProps) {
  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="SmartEvent" style={{ height: "36px", width: "36px" }} />
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
              onClick={() => onOpenModal("signup")}
            >
              Inscription
            </button>
          </>
        )}

        {isLoaded && isSignedIn && <UserButton />}
      </nav>
    </header>
  );
}
