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
        { path: "/organisateur/dashboard", label: t("nav.dashboard"), icon: LayoutDashboard, roles: ["ORGANIZER"] },
        { path: "/organisateur/evenement", label: t("nav.evenement"), icon: Calendar, roles: ["ORGANIZER"] },
        { path: "/organisateur/timeline-tache", label: t("nav.timeline-tache"), icon: CheckSquare, roles: ["ORGANIZER"] },
        { path: "/organisateur/budget", label: t("nav.budget"), icon: PieChart, roles: ["ORGANIZER"] },
        { path: "/organisateur/message", label: t("nav.message"), icon: MessageSquare, roles: ["ORGANIZER"] },
        { path: "/organisateur/invitation", label: t("nav.invitation"), icon: Users, roles: ["ORGANIZER"] },
        { path: "/organisateur/gestion-ressource", label: t("nav.gestion-ressource"), icon: Briefcase, roles: ["ORGANIZER"] },
        { path: "/organisateur/marketplace", label: t("nav.marketplace"), icon: TrendingUp, roles: ["ORGANIZER"] },

        // PRESTATAIRE
        { path: "/prestataire/dashboard", label: t("nav.dashboard"), icon: LayoutDashboard, roles: ["PROVIDER"] },
        { path: "/prestataire/evenement", label: t("nav.evenement"), icon: Calendar, roles: ["PROVIDER"] },
        { path: "/prestataire/timeline-tache", label: t("nav.timeline-tache"), icon: CheckSquare, roles: ["PROVIDER"] },
        { path: "/prestataire/message", label: t("nav.message"), icon: MessageSquare, roles: ["PROVIDER"] },
        { path: "/prestataire/gestion-ressource", label: t("nav.gestion-ressource"), icon: Briefcase, roles: ["PROVIDER"] },
        { path: "/prestataire/marketplace", label: t("nav.marketplace"), icon: TrendingUp, roles: ["PROVIDER"] },

        // CLIENT
        { path: "/client/dashboard", label: t("nav.dashboard"), icon: LayoutDashboard, roles: ["CLIENT"] },
        { path: "/client/evenement", label: t("nav.evenement"), icon: Calendar, roles: ["CLIENT"] },
        { path: "/client/timeline-tache", label: t("nav.timeline-tache"), icon: CheckSquare, roles: ["CLIENT"] },
        { path: "/client/budget", label: t("nav.budget"), icon: PieChart, roles: ["CLIENT"] },
        { path: "/client/message", label: t("nav.message"), icon: MessageSquare, roles: ["CLIENT"] },
        { path: "/client/invitation", label: t("nav.invitation"), icon: Users, roles: ["CLIENT"] },

        // ADMIN
        { path: "/admin/dashboard", label: t("nav.dashboard"), icon: LayoutDashboard, roles: ["ADMIN"] },
        { path: "/admin/gestion-utilisateurs", label: t("nav.gestion-utilisateurs"), icon: Users, roles: ["ADMIN"] },
        { path: "/admin/abonnements", label: t("nav.abonnements"), icon: UserCheck, roles: ["ADMIN"] },
        { path: "/admin/gestion-prestataires", label: t("nav.gestion-prestataires"), icon: Briefcase, roles: ["ADMIN"] },
        { path: "/admin/statistiques", label: t("nav.statistiques"), icon: PieChart, roles: ["ADMIN"] },

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
