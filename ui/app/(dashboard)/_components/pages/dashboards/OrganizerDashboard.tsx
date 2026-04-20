"use client";

import React from "react";
import Card from "@/components/ui/Card/Card";
import Badge from "@/components/ui/Badge/Badge";
import { useTranslation } from "@/lib/i18n/I18nContext";
import { useAuth } from "@/lib/auth/AuthContext";
import { Calendar, Users, Briefcase, TrendingUp } from "lucide-react";

export default function OrganizerDashboard() {
    const { t } = useTranslation();
    const { user } = useAuth();

    const stats = [
        { key: "events",    value: "12",   icon: Calendar,   color: "blue"   },
        { key: "vendors",   value: "48",   icon: Users,      color: "orange" },
        { key: "tasks",     value: "85",   icon: Briefcase,  color: "purple" },
        { key: "budget",    value: "45k €",icon: TrendingUp, color: "green"  },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)", animation: "fadeIn 0.5s ease-out" }}>
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "var(--space-md)" }}>
                <div>
                    <h1 style={{ fontSize: "var(--fs-xxl)", fontWeight: "var(--fw-bold)", color: "var(--color-heading)", margin: 0 }}>
                        {t("dashboard")} - {t("roles.organizer")}
                    </h1>
                    <p style={{ color: "var(--color-muted)", marginTop: "var(--space-xxs)", fontWeight: "var(--fw-medium)" }}>
                        Bienvenue, {user?.name}. Voici un aperçu de vos projets.
                    </p>
                </div>
                <Badge variant="success" dot>Système Opérationnel</Badge>
            </header>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "var(--space-md)" }}>
                {stats.map((stat, idx) => (
                    <Card key={idx} variant="default" shadow="sm" hoverable>
                        <Card.Body>
                            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-md)" }}>
                                <div style={{ padding: "var(--space-sm)", borderRadius: "var(--radius-md)", backgroundColor: `rgba(var(--color-${stat.color}-rgb, 255,147,79), 0.1)`, color: `var(--color-${stat.color}, #ff934f)` }}>
                                    <stat.icon size={24} />
                                </div>
                                <div>
                                    <p style={{ fontSize: "var(--fs-xxs)", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-muted)", marginBottom: "var(--space-xxs)", fontWeight: "var(--fw-bold)" }}>{t(`nav.${stat.key}`) || stat.key}</p>
                                    <p style={{ fontSize: "var(--fs-xl)", fontWeight: "var(--fw-bold)", color: "var(--color-heading)", margin: 0 }}>{stat.value}</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "var(--space-lg)" }}>
                <Card>
                    <Card.Header divider><Card.Title>Événements récents</Card.Title></Card.Header>
                    <Card.Body>
                        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
                            {["Mariage Julie & Marc", "Conférence Digital Innov", "Soirée Gala Corporate"].map((name, i) => (
                                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div>
                                        <p style={{ margin: 0, fontSize: "var(--fs-sm)", fontWeight: "var(--fw-semibold)" }}>{name}</p>
                                        <p style={{ margin: 0, fontSize: "var(--fs-xxs)", color: "var(--color-muted)" }}>Marseille • Août 2024</p>
                                    </div>
                                    <Badge variant="primary">En cours</Badge>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Header divider><Card.Title>Tâches prioritaires</Card.Title></Card.Header>
                    <Card.Body>
                        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
                            {["Confirmer le traiteur principal", "Envoyer les invitations", "Vérifier la sonorisation"].map((task, i) => (
                                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <p style={{ margin: 0, fontSize: "var(--fs-sm)" }}>{task}</p>
                                    <Badge variant="danger">Urgente</Badge>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                </Card>
            </div>

            <style jsx global>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </div>
    );
}
