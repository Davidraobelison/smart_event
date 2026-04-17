"use client";

import React from "react";
import { useTranslation } from "@/lib/i18n/I18nContext";
import styles from "./page.module.css";

export default function Page() {
    const { t } = useTranslation();
    
    return (
        <div className={styles.container}>
            <h1>{t("common.nav.gestion-ressource") || "Gestion ressource"}</h1>
            <p>Contenu en cours de developpement pour Gestion ressource.</p>
        </div>
    );
}
