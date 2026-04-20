"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import type { MenuItem } from "@/components/layout/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/hooks/useTranslation";
import { Settings } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./DashboardLayout.module.css";
import { ROLES_CONFIG, ROLE_ENUM_TO_SLUG } from "./_config/roles.config";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, logout: localLogout } = useAuth();
    const { signOut } = useClerk();
    const { theme, toggleTheme } = useTheme();
    const { language, setLanguage, t } = useTranslation();
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        localLogout();
        await signOut({ redirectUrl: "/" });
    };

    const roleSlug = user ? ROLE_ENUM_TO_SLUG[user.role] : null;
    const config   = roleSlug ? ROLES_CONFIG[roleSlug] : null;

    const menuItems: MenuItem[] = [
        ...(config?.nav.map(item => ({
            path:  `/${roleSlug}/${item.feature}`,
            label: t(item.labelKey),
            icon:  item.icon,
        })) ?? []),
        { path: "/shared/settings", label: t("settings"), icon: Settings },
    ];

    const handleLanguageToggle = () => {
        setLanguage(language === "fr" ? "en" : "fr");
    };

    return (
        <div className={styles.root}>
            <Sidebar
                menuItems={menuItems}
                user={user || { name: 'Invité', role: 'GUEST' }}
                currentPath={pathname}
                mobileOpen={mobileMenuOpen}
                onCloseMobile={() => setMobileMenuOpen(false)}
                onLogout={handleLogout}
                LinkComponent={({ to, children, className }) => (
                    <Link href={to} className={className}>
                        {children}
                    </Link>
                )}
            />
            <div className={styles.content}>
                <Header
                    onMenuClick={() => setMobileMenuOpen(true)}
                    theme={theme}
                    onToggleTheme={toggleTheme}
                    language={language}
                    onLanguageClick={handleLanguageToggle}
                    title={menuItems.find(item => item.path === pathname)?.label || "SmartEvent"}
                />
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </div>
    );
}
