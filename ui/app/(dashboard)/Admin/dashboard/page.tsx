"use client";

import React from "react";
import Card from "@/app/components/UI/Card/Card";
import Badge from "@/app/components/UI/Badge/Badge";
import { useTranslation } from "@/app/lib/i18n/I18nContext";
import { useAuth } from "@/app/lib/auth/AuthContext";
import { Users, UserCheck, Shield, PieChart } from "lucide-react";

export default function AdminDashboard() {
    const { t } = useTranslation();
    const { user } = useAuth();

    const stats = [
        { title: "Utilisateurs", value: "1,250", icon: Users, color: "blue" },
        { title: "Abonnés PRO", value: "480", icon: UserCheck, color: "orange" },
        { title: "Signalements", value: "3", icon: Shield, color: "danger" },
        { title: "Revenus Mensuels", value: "15k €", icon: PieChart, color: "green" },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', animation: 'fadeIn 0.5s ease-out' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-md)' }}>
                <div>
                    <h1 style={{ fontSize: 'var(--fs-xxl)', fontWeight: 'var(--fw-bold)', color: 'var(--color-heading)', margin: 0 }}>
                        {t("common.dashboard")} - {t("roles.admin")}
                    </h1>
                    <p style={{ color: 'var(--color-muted)', marginTop: 'var(--space-xxs)', fontWeight: 'var(--fw-medium)' }}>
                        Panneau d'administration global. Bienvenue {user?.name}.
                    </p>
                </div>
                <Badge variant="danger" dot>Maintenance prévue à 02:00</Badge>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-md)' }}>
                {stats.map((stat, idx) => (
                    <Card key={idx} variant="default" shadow="sm" hoverable>
                        <Card.Body>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                                <div style={{
                                    padding: 'var(--space-sm)',
                                    borderRadius: 'var(--radius-md)',
                                    backgroundColor: stat.color === 'danger' ? 'rgba(239, 83, 80, 0.1)' : `rgba(var(--color-${stat.color}-rgb, 255, 147, 79), 0.1)`,
                                    color: stat.color === 'danger' ? 'var(--color-danger)' : `var(--color-${stat.color}, #ff934f)`
                                }}>
                                    <stat.icon size={24} />
                                </div>
                                <div>
                                    <p style={{ fontSize: 'var(--fs-xxs)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-muted)', marginBottom: 'var(--space-xxs)', fontWeight: 'var(--fw-bold)' }}>{stat.title}</p>
                                    <p style={{ fontSize: 'var(--fs-xl)', fontWeight: 'var(--fw-bold)', color: 'var(--color-heading)', margin: 0 }}>{stat.value}</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-lg)' }}>
                <Card>
                    <Card.Header divider>
                        <Card.Title>Dernières inscriptions</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                            {['Jean Dupont', 'Marie Curie', 'Pierre Berger'].map((name, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-surface-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Users size={16} />
                                        </div>
                                        <div>
                                            <p style={{ margin: 0, fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-semibold)' }}>{name}</p>
                                            <p style={{ margin: 0, fontSize: 'var(--fs-xxs)', color: 'var(--color-muted)' }}>{i % 2 === 0 ? 'Organisateur' : 'Prestataire'}</p>
                                        </div>
                                    </div>
                                    <span style={{ fontSize: 'var(--fs-xxs)', color: 'var(--color-muted)' }}>Il y a {i + 1}h</span>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Header divider>
                        <Card.Title>Abonnements récents</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                            {['Luxe Traiteur', 'DJ Star', 'Photographe Pro'].map((name, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <p style={{ margin: 0, fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-medium)' }}>{name}</p>
                                    <Badge variant="success">PRO</Badge>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                </Card>
            </div>

            <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
