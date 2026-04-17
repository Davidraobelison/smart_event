"use client";

import React, { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import type { MenuItem } from "@/components/layout/Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "@/hooks/useTranslation";
import {
    LayoutDashboard,
    Calendar,
    CheckSquare,
    PieChart,
    Users,
    Settings,
    MessageSquare,
    Briefcase,
    UserCheck,
    TrendingUp
} from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./DashboardLayout.module.css";

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

    const menuItems: MenuItem[] = [
        // ORGANISATEUR
        { path: "/Organisateur/dashboard", label: t("nav.dashboard"), icon: LayoutDashboard, roles: ["ORGANIZER"] },
        { path: "/Organisateur/evenement", label: t("nav.evenement"), icon: Calendar, roles: ["ORGANIZER"] },
        { path: "/Organisateur/timeline-tache", label: t("nav.timeline-tache"), icon: CheckSquare, roles: ["ORGANIZER"] },
        { path: "/Organisateur/budget", label: t("nav.budget"), icon: PieChart, roles: ["ORGANIZER"] },
        { path: "/Organisateur/message", label: t("nav.message"), icon: MessageSquare, roles: ["ORGANIZER"] },
        { path: "/Organisateur/invitation", label: t("nav.invitation"), icon: Users, roles: ["ORGANIZER"] },
        { path: "/Organisateur/gestion-ressource", label: t("nav.gestion-ressource"), icon: Briefcase, roles: ["ORGANIZER"] },
        { path: "/Organisateur/marketplace", label: t("nav.marketplace"), icon: TrendingUp, roles: ["ORGANIZER"] },

        // PRESTATAIRE
        { path: "/Prestataire/dashboard", label: t("nav.dashboard"), icon: LayoutDashboard, roles: ["PROVIDER"] },
        { path: "/Prestataire/evenement", label: t("nav.evenement"), icon: Calendar, roles: ["PROVIDER"] },
        { path: "/Prestataire/timeline-tache", label: t("nav.timeline-tache"), icon: CheckSquare, roles: ["PROVIDER"] },
        { path: "/Prestataire/message", label: t("nav.message"), icon: MessageSquare, roles: ["PROVIDER"] },
        { path: "/Prestataire/gestion-ressource", label: t("nav.gestion-ressource"), icon: Briefcase, roles: ["PROVIDER"] },
        { path: "/Prestataire/marketplace", label: t("nav.marketplace"), icon: TrendingUp, roles: ["PROVIDER"] },

        // CLIENT
        { path: "/Client/dashboard", label: t("nav.dashboard"), icon: LayoutDashboard, roles: ["CLIENT"] },
        { path: "/Client/evenement", label: t("nav.evenement"), icon: Calendar, roles: ["CLIENT"] },
        { path: "/Client/timeline-tache", label: t("nav.timeline-tache"), icon: CheckSquare, roles: ["CLIENT"] },
        { path: "/Client/budget", label: t("nav.budget"), icon: PieChart, roles: ["CLIENT"] },
        { path: "/Client/message", label: t("nav.message"), icon: MessageSquare, roles: ["CLIENT"] },
        { path: "/Client/invitation", label: t("nav.invitation"), icon: Users, roles: ["CLIENT"] },

        // ADMIN
        { path: "/Admin/dashboard", label: t("nav.dashboard"), icon: LayoutDashboard, roles: ["ADMIN"] },
        { path: "/Admin/gestion-utilisateurs", label: t("nav.gestion-utilisateurs"), icon: Users, roles: ["ADMIN"] },
        { path: "/Admin/abonnements", label: t("nav.abonnements"), icon: UserCheck, roles: ["ADMIN"] },
        { path: "/Admin/gestion-prestataires", label: t("nav.gestion-prestataires"), icon: Briefcase, roles: ["ADMIN"] },
        { path: "/Admin/statistiques", label: t("nav.statistiques"), icon: PieChart, roles: ["ADMIN"] },

        // Shared
        { path: "/shared/settings", label: t("common.settings"), icon: Settings },
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
