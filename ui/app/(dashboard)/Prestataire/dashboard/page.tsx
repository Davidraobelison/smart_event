"use client";

import React from "react";
import Card from "@/components/ui/Card/Card";
import Badge from "@/components/ui/Badge/Badge";
import { useTranslation } from "@/lib/i18n/I18nContext";
import { useAuth } from "@/lib/auth/AuthContext";
import { Briefcase, Calendar, CheckCircle, TrendingUp } from "lucide-react";

export default function PrestataireDashboard() {
    const { t } = useTranslation();
    const { user } = useAuth();

    const stats = [
        { title: t("nav.missions"), value: "8", icon: Briefcase, color: "blue" },
        { title: "Missions acceptées", value: "5", icon: CheckCircle, color: "green" },
        { title: "Nouveaux Devis", value: "3", icon: Calendar, color: "purple" },
        { title: "Revenus", value: "12k €", icon: TrendingUp, color: "emerald" },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)', animation: 'fadeIn 0.5s ease-out' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--space-md)' }}>
                <div>
                    <h1 style={{ fontSize: 'var(--fs-xxl)', fontWeight: 'var(--fw-bold)', color: 'var(--color-heading)', margin: 0 }}>
                        {t("common.dashboard")} - {t("roles.provider")}
                    </h1>
                    <p style={{ color: 'var(--color-muted)', marginTop: 'var(--space-xxs)', fontWeight: 'var(--fw-medium)' }}>
                        Bienvenue, {user?.name}. Gérez vos missions et devis ici.
                    </p>
                </div>
                <Badge variant="info">Profil certifié</Badge>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-md)' }}>
                {stats.map((stat, idx) => (
                    <Card key={idx} variant="default" shadow="sm" hoverable>
                        <Card.Body>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                                <div style={{
                                    padding: 'var(--space-sm)',
                                    borderRadius: 'var(--radius-md)',
                                    backgroundColor: `rgba(var(--color-${stat.color}-rgb, 255, 147, 79), 0.1)`,
                                    color: `var(--color-${stat.color}, #ff934f)`
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
                        <Card.Title>Mes prochaines missions</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center' }}>
                                        <div style={{ padding: 'var(--space-xxs)', backgroundColor: 'var(--color-surface-2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)', width: '40px', textAlign: 'center' }}>
                                            <p style={{ margin: 0, fontSize: 'var(--fs-xxs)', fontWeight: 'var(--fw-bold)', color: 'var(--color-primary)' }}>AOÛT</p>
                                            <p style={{ margin: 0, fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-black)' }}>1{i}</p>
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: 'var(--fw-semibold)', color: 'var(--color-heading)', marginBottom: 'var(--space-xxs)', fontSize: 'var(--fs-sm)' }}>Traiteur - Mariage Julie & Marc</p>
                                            <p style={{ fontSize: 'var(--fs-xxs)', color: 'var(--color-muted)' }}>Marseille • 4000 €</p>
                                        </div>
                                    </div>
                                    <Badge variant="success">Accepté</Badge>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                    <Card.Footer align="center">
                        <button style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 'var(--fw-bold)', cursor: 'pointer', fontSize: 'var(--fs-sm)' }}>Voir planning complet</button>
                    </Card.Footer>
                </Card>

                <Card>
                    <Card.Header divider>
                        <Card.Title>Dernières demandes</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                            {[1, 2].map(i => (
                                <div key={i} style={{ display: 'flex', gap: 'var(--space-md)', padding: 'var(--space-sm)', backgroundColor: 'var(--color-surface-2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontWeight: 'var(--fw-bold)', color: 'var(--color-heading)', marginBottom: 'var(--space-xxs)', fontSize: 'var(--fs-sm)' }}>Conférence Digital Innov</p>
                                        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-muted)', marginBottom: 'var(--space-sm)' }}>Besoin : Cocktail dinatoire pou 150 pers.</p>
                                        <div style={{ display: 'flex', gap: 'var(--space-xs)' }}>
                                            <button style={{ padding: '6px 12px', border: 'none', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-bg)', color: 'var(--color-heading)', fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-xxs)', cursor: 'pointer' }}>Ignorer</button>
                                            <button style={{ padding: '6px 12px', border: 'none', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-primary)', color: '#fff', fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-xxs)', cursor: 'pointer' }}>Voir détails</button>
                                        </div>
                                    </div>
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
