"use client";

import React, { createContext, useEffect, useState } from "react";
import frCommon       from "@/app/lib/i18n/locales/fr/common.json";
import enCommon       from "@/app/lib/i18n/locales/en/common.json";
import frOrgDashboard from "@/app/lib/i18n/locales/fr/organisateur/dashboard.json";
import enOrgDashboard from "@/app/lib/i18n/locales/en/organisateur/dashboard.json";
import frHome         from "@/app/lib/i18n/locales/fr/home.json";
import enHome         from "@/app/lib/i18n/locales/en/home.json";

export type Language = "fr" | "en";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const translations: Record<Language, any> = {
  fr: { ...frCommon, organisateur: { dashboard: frOrgDashboard }, home: frHome },
  en: { ...enCommon, organisateur: { dashboard: enOrgDashboard }, home: enHome },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr");

  useEffect(() => {
    const saved = localStorage.getItem("se_lang") as Language;
    if (saved) setLanguageState(saved);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("se_lang", lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let result: any = translations[language];
    for (const k of keys) result = result?.[k];
    return result ?? key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}
