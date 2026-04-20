"use client";

import React from "react";
import { Users, TrendingUp, Calendar, CreditCard, ArrowUp } from "lucide-react";
import styles from "@/components/shared/page.module.css";
import Card from "@/components/ui/Card/Card";
import Badge from "@/components/ui/Badge/Badge";

const monthlyData = [
    { month: "Jan", users: 80,  revenue: 1520,  events: 12 },
    { month: "Fév", users: 120, revenue: 2280,  events: 18 },
    { month: "Mar", users: 200, revenue: 3800,  events: 29 },
    { month: "Avr", users: 320, revenue: 6080,  events: 45 },
    { month: "Mai", users: 480, revenue: 9120,  events: 67 },
    { month: "Juin",users: 650, revenue: 12350, events: 89 },
];

const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

const topEvents = [
    { name: "Mariage Julie & Marc",      org: "Marie Curie",   revenue: 1500, status: "published" },
    { name: "Conférence Digital Innov",  org: "Alice Rousseau",revenue: 800,  status: "published" },
    { name: "Soirée Gala Corporate",     org: "Marie Curie",   revenue: 600,  status: "draft"     },
];

export default function StatistiquesPage() {
    const latest = monthlyData[monthlyData.length - 1];
    const prev   = monthlyData[monthlyData.length - 2];
    const growthUsers   = Math.round(((latest.users   - prev.users)   / prev.users)   * 100);
    const growthRevenue = Math.round(((latest.revenue - prev.revenue) / prev.revenue) * 100);

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>Statistiques de la Plateforme</h1>
                    <p className={styles.pageSubtitle}>Vue d'ensemble des KPIs, croissance et performance globale.</p>
                </div>
                <Badge variant="success" dot>Données en temps réel</Badge>
            </div>

            <div className={styles.statGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIconBox} style={{ background: "rgba(47,107,255,0.1)", color: "var(--color-blue)" }}><Users size={28} /></div>
                    <div>
                        <p className={styles.statLabel}>Utilisateurs totaux</p>
                        <p className={styles.statValue}>1 250</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                            <ArrowUp size={12} color="var(--color-success)" />
                            <span style={{ fontSize: "11px", color: "var(--color-success)", fontWeight: "var(--fw-bold)" }}>+{growthUsers}% ce mois</span>
                        </div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIconBox} style={{ background: "rgba(36,180,126,0.1)", color: "var(--color-success)" }}><TrendingUp size={28} /></div>
                    <div>
                        <p className={styles.statLabel}>MRR</p>
                        <p className={styles.statValue}>12 350€</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                            <ArrowUp size={12} color="var(--color-success)" />
                            <span style={{ fontSize: "11px", color: "var(--color-success)", fontWeight: "var(--fw-bold)" }}>+{growthRevenue}% vs mois dernier</span>
                        </div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIconBox} style={{ background: "rgba(255,147,79,0.1)", color: "var(--color-primary)" }}><Calendar size={28} /></div>
                    <div>
                        <p className={styles.statLabel}>Événements actifs</p>
                        <p className={styles.statValue}>89</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                            <ArrowUp size={12} color="var(--color-success)" />
                            <span style={{ fontSize: "11px", color: "var(--color-success)", fontWeight: "var(--fw-bold)" }}>+33% ce mois</span>
                        </div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIconBox} style={{ background: "rgba(124,92,255,0.1)", color: "var(--color-info)" }}><CreditCard size={28} /></div>
                    <div>
                        <p className={styles.statLabel}>Abonnés PRO</p>
                        <p className={styles.statValue}>400</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
                            <ArrowUp size={12} color="var(--color-success)" />
                            <span style={{ fontSize: "11px", color: "var(--color-success)", fontWeight: "var(--fw-bold)" }}>+12% ce mois</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.grid2}>
                <Card>
                    <Card.Header divider><Card.Title>Revenus Mensuels (€)</Card.Title></Card.Header>
                    <Card.Body>
                        <div style={{ display: "flex", alignItems: "flex-end", gap: "var(--space-sm)", height: "200px", padding: "0 var(--space-xs)" }}>
                            {monthlyData.map(d => (
                                <div key={d.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", height: "100%", justifyContent: "flex-end" }}>
                                    <span style={{ fontSize: "10px", color: "var(--color-muted)", fontWeight: "var(--fw-bold)" }}>{d.revenue >= 1000 ? `${(d.revenue / 1000).toFixed(1)}k` : d.revenue}</span>
                                    <div style={{ width: "100%", background: "var(--color-primary)", borderRadius: "4px 4px 0 0", height: `${(d.revenue / maxRevenue) * 160}px`, transition: "height 0.8s ease", minHeight: "4px" }} />
                                    <span style={{ fontSize: "11px", color: "var(--color-muted)", fontWeight: "var(--fw-semibold)" }}>{d.month}</span>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Header divider><Card.Title>Top Événements</Card.Title></Card.Header>
                    <Card.Body>
                        <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
                            {topEvents.map((e, i) => (
                                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ margin: 0, fontWeight: "var(--fw-semibold)", fontSize: "var(--fs-sm)" }}>{e.name}</p>
                                        <p style={{ margin: 0, fontSize: "var(--fs-xxs)", color: "var(--color-muted)" }}>par {e.org}</p>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
                                        <span style={{ fontWeight: "var(--fw-bold)", color: "var(--color-success)", fontSize: "var(--fs-sm)" }}>{e.revenue}€</span>
                                        <Badge variant={e.status === "published" ? "success" : "default"}>{e.status === "published" ? "Live" : "Draft"}</Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card.Body>
                </Card>
            </div>

            <div className={styles.tableCard}>
                <div className={styles.tableCardHeader}><span className={styles.tableCardTitle}>Croissance mensuelle</span></div>
                <table className={styles.table}>
                    <thead className={styles.thead}><tr><th>Mois</th><th style={{ textAlign: "right" }}>Nouveaux utilisateurs</th><th style={{ textAlign: "right" }}>Revenus (€)</th><th style={{ textAlign: "right" }}>Événements</th></tr></thead>
                    <tbody className={styles.tbody}>
                        {[...monthlyData].reverse().map(d => (
                            <tr key={d.month}>
                                <td style={{ fontWeight: "var(--fw-semibold)" }}>{d.month} 2024</td>
                                <td style={{ textAlign: "right" }}>{d.users}</td>
                                <td style={{ textAlign: "right", fontFamily: "monospace", fontWeight: "var(--fw-bold)" }}>{d.revenue.toLocaleString("fr-FR")} €</td>
                                <td style={{ textAlign: "right" }}>{d.events}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
