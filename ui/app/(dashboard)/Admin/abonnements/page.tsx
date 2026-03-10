"use client";

import React, { useState } from "react";
import { CreditCard, TrendingUp, Users, CheckCircle, X, Eye } from "lucide-react";
import styles from "@/app/components/shared/page.module.css";
import Badge from "@/app/components/UI/Badge/Badge";
import Card from "@/app/components/UI/Card/Card";

const subscriptions = [
    { id: "1", user: "Marie Curie", email: "m.curie@smart.fr", plan: "Pro Annuel", amount: 199, status: "active", nextBilling: "15 Jan 2025" },
    { id: "2", user: "Luxe Traiteur SARL", email: "contact@luxe-traiteur.fr", plan: "Pro Annuel", amount: 199, status: "active", nextBilling: "05 Fev 2025" },
    { id: "3", user: "Studio Photo Art", email: "studio@photoart.fr", plan: "Pro Mensuel", amount: 19, status: "active", nextBilling: "18 Mar 2024" },
    { id: "4", user: "Alice Rousseau", email: "alice.r@outlook.fr", plan: "Pro Annuel", amount: 199, status: "active", nextBilling: "01 Mar 2025" },
    { id: "5", user: "Bertrand Morel", email: "b.morel@gmail.com", plan: "Pro Mensuel", amount: 19, status: "cancelled", nextBilling: "—" },
];

const plans = [
    { name: "Free", price: "0€", features: ["1 événement", "5 invités max", "Messagerie basique"], color: "var(--color-muted)", activeUsers: 850 },
    { name: "Pro Mensuel", price: "19€/mois", features: ["Événements illimités", "Invités illimités", "Messagerie avancée", "Export PDF"], color: "var(--color-primary)", activeUsers: 280 },
    { name: "Pro Annuel", price: "199€/an", features: ["Tout Pro Mensuel", "Économie 12%", "Support prioritaire", "Analytics avancées"], color: "var(--color-info)", activeUsers: 120 },
];

export default function AbonnementsPage() {
    const active = subscriptions.filter(s => s.status === 'active');
    const mrr = active.reduce((a, c) => a + (c.plan.includes('Annuel') ? c.amount / 12 : c.amount), 0);

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>Gestion des Abonnements</h1>
                    <p className={styles.pageSubtitle}>Suivez les revenus, plans actifs et renouvellements.</p>
                </div>
            </div>

            <div className={styles.statGrid}>
                <div className={styles.statCard}><div className={styles.statIconBox} style={{ background: 'rgba(36,180,126,0.1)', color: 'var(--color-success)' }}><CheckCircle size={28} /></div><div><p className={styles.statLabel}>Abonnements actifs</p><p className={styles.statValue}>{active.length}</p></div></div>
                <div className={styles.statCard}><div className={styles.statIconBox} style={{ background: 'rgba(47,107,255,0.1)', color: 'var(--color-blue)' }}><TrendingUp size={28} /></div><div><p className={styles.statLabel}>MRR</p><p className={styles.statValue}>{Math.round(mrr)}€</p></div></div>
                <div className={styles.statCard}><div className={styles.statIconBox} style={{ background: 'rgba(255,147,79,0.1)', color: 'var(--color-primary)' }}><CreditCard size={28} /></div><div><p className={styles.statLabel}>ARR (estimé)</p><p className={styles.statValue}>{Math.round(mrr * 12)}€</p></div></div>
                <div className={styles.statCard}><div className={styles.statIconBox} style={{ background: 'rgba(239,83,80,0.1)', color: 'var(--color-danger)' }}><X size={28} /></div><div><p className={styles.statLabel}>Annulés</p><p className={styles.statValue}>{subscriptions.filter(s => s.status === 'cancelled').length}</p></div></div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-lg)' }}>
                {plans.map(plan => (
                    <Card key={plan.name}>
                        <Card.Body>
                            <h3 style={{ margin: '0 0 var(--space-xs)', color: plan.color, fontWeight: 'var(--fw-bold)' }}>{plan.name}</h3>
                            <p style={{ fontSize: 'var(--fs-xl)', fontWeight: 'var(--fw-bold)', color: 'var(--color-heading)', margin: '0 0 var(--space-md)' }}>{plan.price}</p>
                            <p style={{ fontSize: 'var(--fs-xxs)', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: 'var(--space-sm)' }}>{plan.activeUsers} utilisateurs actifs</p>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {plan.features.map(f => (
                                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--fs-xs)' }}>
                                        <CheckCircle size={12} color={plan.color} /> {f}
                                    </li>
                                ))}
                            </ul>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            <div className={styles.tableCard}>
                <div className={styles.tableCardHeader}>
                    <span className={styles.tableCardTitle}>Abonnements en cours ({subscriptions.length})</span>
                </div>
                <table className={styles.table}>
                    <thead className={styles.thead}><tr><th>Utilisateur</th><th>Plan</th><th style={{ textAlign: 'right' }}>Montant</th><th>Prochain renouvellement</th><th style={{ textAlign: 'center' }}>Statut</th><th></th></tr></thead>
                    <tbody className={styles.tbody}>
                        {subscriptions.map(s => (
                            <tr key={s.id}>
                                <td><p style={{ margin: 0, fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-sm)' }}>{s.user}</p><p style={{ margin: 0, fontSize: 'var(--fs-xxs)', color: 'var(--color-muted)' }}>{s.email}</p></td>
                                <td><span style={{ fontSize: '11px', fontWeight: 'var(--fw-bold)', padding: '3px 10px', borderRadius: '999px', background: 'rgba(255,147,79,0.1)', color: 'var(--color-primary)' }}>{s.plan}</span></td>
                                <td style={{ textAlign: 'right', fontWeight: 'var(--fw-bold)', fontFamily: 'monospace' }}>{s.amount}€</td>
                                <td style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-muted)' }}>{s.nextBilling}</td>
                                <td style={{ textAlign: 'center' }}><Badge variant={s.status === 'active' ? 'success' : 'danger'} dot>{s.status === 'active' ? 'Actif' : 'Annulé'}</Badge></td>
                                <td style={{ textAlign: 'right' }}><button className={styles.actionBtnGhost} style={{ padding: '4px 10px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}><Eye size={12} /> Détails</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
