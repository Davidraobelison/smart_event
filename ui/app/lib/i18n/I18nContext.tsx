"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import frCommon from "./locales/fr/common.json";
import enCommon from "./locales/en/common.json";
import frOrgDashboard from "./locales/fr/organisateur/dashboard.json";
import enOrgDashboard from "./locales/en/organisateur/dashboard.json";
import frHome from "./locales/fr/home.json";
import enHome from "./locales/en/home.json";

type Language = "fr" | "en";
const translations: Record<Language, any> = {
    fr: {
        ...frCommon,
        organisateur: {
            dashboard: frOrgDashboard
        },
        home: frHome
    },
    en: {
        ...enCommon,
        organisateur: {
            dashboard: enOrgDashboard
        },
        home: enHome
    }
};

interface I18nContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>("fr");

    useEffect(() => {
        const savedLang = localStorage.getItem("se_lang") as Language;
        if (savedLang) {
            setLanguageState(savedLang);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("se_lang", lang);
    };

    const t = (key: string) => {
        const keys = key.split(".");
        let result: any = translations[language];
        for (const k of keys) {
            result = result?.[k];
        }
        return result || key;
    };

    return (
        <I18nContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useTranslation() {
    const context = useContext(I18nContext);
    if (context === undefined) {
        throw new Error("useTranslation must be used within an I18nProvider");
    }
    return context;
}
