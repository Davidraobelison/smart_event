"use client";

import React, { useState } from "react";
import { Star, CheckCircle, XCircle, Search, Plus, Eye, AlertCircle } from "lucide-react";
import styles from "@/app/components/shared/page.module.css";
import Badge from "@/app/components/UI/Badge/Badge";

const providers = [
    { id: "1", name: "Luxe Traiteur SARL", category: "Traiteur", rating: 4.9, reviews: 124, status: "verified", plan: "Pro", joined: "05 Fev 2024" },
    { id: "2", name: "Photo Studio Art", category: "Photographie", rating: 4.8, reviews: 89, status: "verified", plan: "Pro", joined: "18 Fev 2024" },
    { id: "3", name: "DJ StarSound", category: "Animation", rating: 4.7, reviews: 201, status: "verified", plan: "Pro", joined: "10 Mar 2024" },
    { id: "4", name: "Fleurs & Création", category: "Décoration", rating: 4.6, reviews: 67, status: "pending", plan: "Free", joined: "20 Mar 2024" },
    { id: "5", name: "Domaine Vue Mer", category: "Lieu", rating: 0, reviews: 0, status: "pending", plan: "Free", joined: "25 Mar 2024" },
    { id: "6", name: "Navette VIP Event", category: "Transport", rating: 4.5, reviews: 38, status: "suspended", plan: "Pro", joined: "01 Avr 2024" },
];

export default function GestionPrestatairesPage() {
    const [search, setSearch] = useState("");
    const filtered = providers.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>Gestion des Prestataires</h1>
                    <p className={styles.pageSubtitle}>Modérez les profils, vérifiez les inscriptions et gérez les accès marketplace.</p>
                </div>
            </div>

            <div className={styles.statGrid}>
                <div className={styles.statCard}><div className={styles.statIconBox} style={{ background: 'rgba(36,180,126,0.1)', color: 'var(--color-success)' }}><CheckCircle size={26} /></div><div><p className={styles.statLabel}>Vérifiés</p><p className={styles.statValue}>{providers.filter(p => p.status === 'verified').length}</p></div></div>
                <div className={styles.statCard}><div className={styles.statIconBox} style={{ background: 'rgba(255,176,32,0.1)', color: 'var(--color-warning)' }}><AlertCircle size={26} /></div><div><p className={styles.statLabel}>En attente</p><p className={styles.statValue}>{providers.filter(p => p.status === 'pending').length}</p></div></div>
                <div className={styles.statCard}><div className={styles.statIconBox} style={{ background: 'rgba(239,83,80,0.1)', color: 'var(--color-danger)' }}><XCircle size={26} /></div><div><p className={styles.statLabel}>Suspendus</p><p className={styles.statValue}>{providers.filter(p => p.status === 'suspended').length}</p></div></div>
                <div className={styles.statCard}><div className={styles.statIconBox} style={{ background: 'rgba(255,147,79,0.1)', color: 'var(--color-primary)' }}><Star size={26} /></div><div><p className={styles.statLabel}>Total prestataires</p><p className={styles.statValue}>{providers.length}</p></div></div>
            </div>

            <div className={styles.tableCard}>
                <div className={styles.tableCardHeader}>
                    <span className={styles.tableCardTitle}>Annuaire prestataires ({filtered.length})</span>
                    <div className={styles.searchBar}><Search size={16} /><input className={styles.searchInput} placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                </div>
                <table className={styles.table}>
                    <thead className={styles.thead}><tr><th>Prestataire</th><th>Catégorie</th><th>Note</th><th>Plan</th><th>Inscription</th><th style={{ textAlign: 'center' }}>Statut</th><th></th></tr></thead>
                    <tbody className={styles.tbody}>
                        {filtered.map(p => (
                            <tr key={p.id}>
                                <td style={{ fontWeight: 'var(--fw-semibold)' }}>{p.name}</td>
                                <td><span style={{ fontSize: '11px', background: 'var(--color-surface-2)', padding: '3px 10px', borderRadius: '999px', color: 'var(--color-muted)', fontWeight: 'var(--fw-bold)' }}>{p.category}</span></td>
                                <td>
                                    {p.rating > 0 ? (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <Star size={12} color="var(--color-warning)" fill="var(--color-warning)" />
                                            <span style={{ fontWeight: 'var(--fw-bold)', fontSize: 'var(--fs-xs)' }}>{p.rating}</span>
                                            <span style={{ color: 'var(--color-muted)', fontSize: 'var(--fs-xxs)' }}>({p.reviews})</span>
                                        </div>
                                    ) : <span style={{ color: 'var(--color-muted)', fontSize: 'var(--fs-xs)' }}>Nouveau</span>}
                                </td>
                                <td><span style={{ fontSize: '11px', fontWeight: 'var(--fw-bold)', padding: '3px 10px', borderRadius: '999px', background: p.plan === 'Pro' ? 'rgba(255,147,79,0.1)' : 'var(--color-surface-2)', color: p.plan === 'Pro' ? 'var(--color-primary)' : 'var(--color-muted)' }}>{p.plan}</span></td>
                                <td style={{ color: 'var(--color-muted)', fontSize: 'var(--fs-xs)' }}>{p.joined}</td>
                                <td style={{ textAlign: 'center' }}><Badge variant={p.status === 'verified' ? 'success' : p.status === 'suspended' ? 'danger' : 'warning'} dot>{p.status === 'verified' ? 'Vérifié' : p.status === 'pending' ? 'En attente' : 'Suspendu'}</Badge></td>
                                <td style={{ textAlign: 'right' }}>
                                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                                        <button className={styles.actionBtnGhost} style={{ padding: '4px 10px', fontSize: '11px' }}><Eye size={12} /></button>
                                        {p.status === 'pending' && <button className={styles.actionBtn} style={{ padding: '4px 10px', fontSize: '11px' }}>Valider</button>}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
