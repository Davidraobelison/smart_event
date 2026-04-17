"use client";

import React, { useState } from "react";
import { Users, Shield, UserCheck, UserX, Search, Plus } from "lucide-react";
import styles from "@/components/shared/page.module.css";
import Badge from "@/components/ui/Badge/Badge";

const users = [
    { id: "1", name: "Marie Curie", email: "m.curie@smart.fr", role: "ORGANIZER", status: "active", plan: "Pro", created: "15 Jan 2024" },
    { id: "2", name: "Jean Dupont", email: "j.dupont@event.fr", role: "CLIENT", status: "active", plan: "Free", created: "20 Jan 2024" },
    { id: "3", name: "Luxe Traiteur SARL", email: "contact@luxe-traiteur.fr", role: "PROVIDER", status: "active", plan: "Pro", created: "05 Fev 2024" },
    { id: "4", name: "Pierre Bernard", email: "p.bernard@gmail.com", role: "CLIENT", status: "suspended", plan: "Free", created: "10 Fev 2024" },
    { id: "5", name: "Studio Photo Art", email: "studio@photoart.fr", role: "PROVIDER", status: "active", plan: "Pro", created: "18 Fev 2024" },
    { id: "6", name: "Alice Rousseau", email: "alice.r@outlook.fr", role: "ORGANIZER", status: "active", plan: "Pro", created: "01 Mar 2024" },
];

const roleLabels: Record<string, string> = { ORGANIZER: "Organisateur", CLIENT: "Client", PROVIDER: "Prestataire" };
const roleBadge: Record<string, any> = { ORGANIZER: "primary", CLIENT: "info", PROVIDER: "success" };

export default function GestionUtilisateursPage() {
    const [search, setSearch] = useState("");
    const filtered = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>Gestion des Utilisateurs</h1>
                    <p className={styles.pageSubtitle}>Supervisez les comptes, rôles et statuts des utilisateurs de la plateforme.</p>
                </div>
                <button className={styles.actionBtn}><Plus size={18} /> Créer un compte</button>
            </div>

            <div className={styles.statGrid}>
                <div className={styles.statCard}><div className={styles.statIconBox} style={{ background: 'rgba(47,107,255,0.1)', color: 'var(--color-blue)' }}><Users size={28} /></div><div><p className={styles.statLabel}>Total utilisateurs</p><p className={styles.statValue}>{users.length}</p></div></div>
                <div className={styles.statCard}><div className={styles.statIconBox} style={{ background: 'rgba(36,180,126,0.1)', color: 'var(--color-success)' }}><UserCheck size={28} /></div><div><p className={styles.statLabel}>Actifs</p><p className={styles.statValue}>{users.filter(u => u.status === 'active').length}</p></div></div>
                <div className={styles.statCard}><div className={styles.statIconBox} style={{ background: 'rgba(239,83,80,0.1)', color: 'var(--color-danger)' }}><UserX size={28} /></div><div><p className={styles.statLabel}>Suspendus</p><p className={styles.statValue}>{users.filter(u => u.status === 'suspended').length}</p></div></div>
                <div className={styles.statCard}><div className={styles.statIconBox} style={{ background: 'rgba(255,147,79,0.1)', color: 'var(--color-primary)' }}><Shield size={28} /></div><div><p className={styles.statLabel}>Abonnés PRO</p><p className={styles.statValue}>{users.filter(u => u.plan === 'Pro').length}</p></div></div>
            </div>

            <div className={styles.tableCard}>
                <div className={styles.tableCardHeader}>
                    <span className={styles.tableCardTitle}>Tous les comptes ({filtered.length})</span>
                    <div className={styles.searchBar}><Search size={16} /><input className={styles.searchInput} placeholder="Rechercher par nom ou email..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                </div>
                <table className={styles.table}>
                    <thead className={styles.thead}><tr><th>Utilisateur</th><th>Rôle</th><th>Plan</th><th>Inscription</th><th style={{ textAlign: 'center' }}>Statut</th><th></th></tr></thead>
                    <tbody className={styles.tbody}>
                        {filtered.map(u => (
                            <tr key={u.id}>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                                        <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'var(--color-primary-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'var(--fw-bold)', color: 'var(--color-primary)', flexShrink: 0 }}>{u.name.substring(0, 2).toUpperCase()}</div>
                                        <div><p style={{ margin: 0, fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-sm)' }}>{u.name}</p><p style={{ margin: 0, fontSize: 'var(--fs-xxs)', color: 'var(--color-muted)' }}>{u.email}</p></div>
                                    </div>
                                </td>
                                <td><Badge variant={roleBadge[u.role]}>{roleLabels[u.role]}</Badge></td>
                                <td><span style={{ fontSize: '11px', fontWeight: 'var(--fw-bold)', padding: '3px 10px', borderRadius: '999px', background: u.plan === 'Pro' ? 'rgba(255,147,79,0.1)' : 'var(--color-surface-2)', color: u.plan === 'Pro' ? 'var(--color-primary)' : 'var(--color-muted)' }}>{u.plan}</span></td>
                                <td style={{ color: 'var(--color-muted)', fontSize: 'var(--fs-xs)' }}>{u.created}</td>
                                <td style={{ textAlign: 'center' }}><Badge variant={u.status === 'active' ? 'success' : 'danger'} dot>{u.status === 'active' ? 'Actif' : 'Suspendu'}</Badge></td>
                                <td style={{ textAlign: 'right' }}>
                                    <button className={styles.actionBtnGhost} style={{ padding: '4px 10px', fontSize: '11px' }}>Gérer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
