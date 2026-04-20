"use client";

import React from "react";
import Card from "@/components/ui/Card/Card";
import Badge from "@/components/ui/Badge/Badge";
import { useTranslation } from "@/lib/i18n/I18nContext";
import { useAuth } from "@/lib/auth/AuthContext";
import { Heart, Calendar, PieChart, Users } from "lucide-react";

export default function ClientDashboard() {
    const { t } = useTranslation();
    const { user } = useAuth();

    const stats = [
        { title: "Jours restants", value: "124", icon: Heart,    color: "orange" },
        { title: t("nav.events"), value: "1",   icon: Calendar,  color: "blue"   },
        { title: "Prestataires",   value: "12",  icon: Users,     color: "purple" },
        { title: "Budget utilisé", value: "65%", icon: PieChart,  color: "green"  },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)", animation: "fadeIn 0.5s ease-out" }}>
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "var(--space-md)" }}>
                <div>
                    <h1 style={{ fontSize: "var(--fs-xxl)", fontWeight: "var(--fw-bold)", color: "var(--color-heading)", margin: 0 }}>
                        {t("dashboard")} - {t("roles.client")}
                    </h1>
                    <p style={{ color: "var(--color-muted)", marginTop: "var(--space-xxs)", fontWeight: "var(--fw-medium)" }}>
                        Félicitations, {user?.name} ! Votre événement approche.
                    </p>
                </div>
                <Badge variant="primary" dot>En préparation</Badge>
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
                                    <p style={{ fontSize: "var(--fs-xxs)", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-muted)", marginBottom: "var(--space-xxs)", fontWeight: "var(--fw-bold)" }}>{stat.title}</p>
                                    <p style={{ fontSize: "var(--fs-xl)", fontWeight: "var(--fw-bold)", color: "var(--color-heading)", margin: 0 }}>{stat.value}</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "var(--space-lg)" }}>
                <Card>
                    <Card.Header divider><Card.Title>Mon Événement</Card.Title></Card.Header>
                    <Card.Body>
                        <div style={{ textAlign: "center", padding: "var(--space-md)" }}>
                            <h2 style={{ color: "var(--color-primary)", margin: "0 0 var(--space-xs) 0" }}>Mariage Julie & Marc</h2>
                            <p style={{ color: "var(--color-muted)", marginBottom: "var(--space-lg)" }}>Samedi 15 Août 2024 • Domaine de la Source</p>
                            <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-xl)" }}>
                                <div>
                                    <p style={{ margin: 0, fontSize: "var(--fs-xl)", fontWeight: "var(--fw-bold)" }}>150</p>
                                    <p style={{ margin: 0, fontSize: "var(--fs-xxs)", color: "var(--color-muted)" }}>INVITÉS</p>
                                </div>
                                <div style={{ width: "1px", backgroundColor: "var(--color-border)" }} />
                                <div>
                                    <p style={{ margin: 0, fontSize: "var(--fs-xl)", fontWeight: "var(--fw-bold)" }}>12</p>
                                    <p style={{ margin: 0, fontSize: "var(--fs-xxs)", color: "var(--color-muted)" }}>PRESTATAIRES</p>
                                </div>
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Header divider><Card.Title>Derniers Messages</Card.Title></Card.Header>
                    <Card.Body>
                        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
                            {[1, 2].map(i => (
                                <div key={i} style={{ display: "flex", gap: "var(--space-sm)" }}>
                                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "var(--color-primary-100)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-primary)", fontWeight: "var(--fw-bold)", fontSize: "12px" }}>
                                        {i === 1 ? "O" : "P"}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ margin: 0, fontSize: "var(--fs-sm)", fontWeight: "var(--fw-semibold)" }}>{i === 1 ? "Organisateur" : "Traiteur Luxe"}</p>
                                        <p style={{ margin: "4px 0 0 0", fontSize: "var(--fs-xs)", color: "var(--color-muted)" }}>J'ai mis à jour le planning pour la cérémonie...</p>
                                    </div>
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
