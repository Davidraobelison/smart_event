"use client";

import React from "react";
import Card from "@/app/components/UI/Card/Card";
import Badge from "@/app/components/UI/Badge/Badge";
import { useTranslation } from "@/app/lib/i18n/I18nContext";
import { useAuth } from "@/app/lib/auth/AuthContext";
import { Calendar, Users, Briefcase, TrendingUp } from "lucide-react";
import styles from "./Dashboard.module.css";

export default function OrganisateurDashboard() {
    const { t } = useTranslation();
    const { user } = useAuth();

    const stats = [
        { title: t("nav.events"), value: "12", icon: Calendar, color: "blue" },
        { title: t("nav.vendors"), value: "48", icon: Users, color: "orange" },
        { title: t("organisateur.dashboard.stats.pending_tasks"), value: "85", icon: Briefcase, color: "purple" },
        { title: t("organisateur.dashboard.stats.global_budget"), value: "45k €", icon: TrendingUp, color: "green" },
    ];

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>
                        {t("organisateur.dashboard.title")}
                    </h1>
                    <p className={styles.subtitle}>
                        {t("organisateur.dashboard.welcome").replace("{name}", user?.name || "Invité")}
                    </p>
                </div>
                <Badge variant="success" dot>Système Opérationnel</Badge>
            </header>

            <div className={styles.statsGrid}>
                {stats.map((stat, idx) => (
                    <Card key={idx} variant="default" shadow="sm" hoverable>
                        <Card.Body>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                                <div
                                    className={styles.statIconBox}
                                    style={{
                                        backgroundColor: `rgba(var(--color-${stat.color}-rgb), 0.1)`,
                                        color: `var(--color-${stat.color})`
                                    }}
                                >
                                    <stat.icon size={24} />
                                </div>
                                <div>
                                    <p className={styles.statLabel}>{stat.title}</p>
                                    <p className={styles.statValue}>{stat.value}</p>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            <div className={styles.contentGrid}>
                <Card>
                    <Card.Header divider>
                        <Card.Title>{t("organisateur.dashboard.recent_events")}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} className={styles.eventItem}>
                                    <div>
                                        <p style={{ fontWeight: 'var(--fw-semibold)', color: 'var(--color-heading)', marginBottom: 'var(--space-xxs)' }}>Mariage Julie & Marc</p>
                                        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-muted)' }}>15 Août 2024 • Domaine de la Source</p>
                                    </div>
                                    <Badge variant="primary">En cours</Badge>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                    <Card.Footer align="center">
                        <button className={styles.viewAllBtn}>Voir tout</button>
                    </Card.Footer>
                </Card>

                <Card>
                    <Card.Header divider>
                        <Card.Title>{t("organisateur.dashboard.priority_tasks")}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} className={styles.taskItem}>
                                    <input type="checkbox" style={{ marginTop: 'var(--space-xxs)' }} />
                                    <div>
                                        <p style={{ fontWeight: 'var(--fw-medium)', color: 'var(--color-heading)', marginBottom: 'var(--space-xxxs)' }}>Confirmer le traiteur principal</p>
                                        <p style={{ fontSize: 'var(--fs-xxs)', color: 'var(--color-danger)', fontWeight: 'var(--fw-bold)' }}>Urgente</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}
