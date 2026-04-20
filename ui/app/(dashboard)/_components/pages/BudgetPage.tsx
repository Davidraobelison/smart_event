"use client";

import React, { useState } from "react";
import { Wallet, TrendingUp, AlertCircle, Plus, Trash2, Search } from "lucide-react";
import styles from "@/components/shared/page.module.css";
import Card from "@/components/ui/Card/Card";
import Badge from "@/components/ui/Badge/Badge";

const initialItems = [
    { id: "1", category: "Lieu & Logistique",  item: "Location Domaine de la Source",     planned: 8000,  actual: 7500, status: "paid"    },
    { id: "2", category: "Traiteur",            item: "Cocktail dinatoire 150 pers.",      planned: 12000, actual: 4000, status: "pending" },
    { id: "3", category: "Animation",           item: "DJ & Système Sono",                 planned: 3000,  actual: 3000, status: "paid"    },
    { id: "4", category: "Décoration",          item: "Fleurs de saison & présentation",   planned: 2000,  actual: 500,  status: "pending" },
    { id: "5", category: "Photographie",        item: "Photographe + Vidéaste",            planned: 4500,  actual: 4500, status: "paid"    },
];

export default function BudgetPage() {
    const [items, setItems] = useState(initialItems);
    const [search, setSearch] = useState("");

    const totalPlanned = items.reduce((a, c) => a + c.planned, 0);
    const totalActual  = items.reduce((a, c) => a + c.actual,  0);
    const remaining    = totalPlanned - totalActual;

    const filtered = items.filter(i =>
        i.item.toLowerCase().includes(search.toLowerCase()) ||
        i.category.toLowerCase().includes(search.toLowerCase())
    );

    const deleteItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>Pilotage Financier</h1>
                    <p className={styles.pageSubtitle}>Contrôlez vos marges et vos dépenses opérationnelles.</p>
                </div>
                <button className={styles.actionBtn}><Plus size={18} /> Nouvelle Dépense</button>
            </div>

            <div className={styles.statGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIconBox} style={{ background: "rgba(47,107,255,0.1)", color: "var(--color-blue)" }}><Wallet size={28} /></div>
                    <div><p className={styles.statLabel}>Budget Prévu</p><p className={styles.statValue}>{totalPlanned.toLocaleString("fr-FR")} €</p></div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIconBox} style={{ background: "rgba(36,180,126,0.1)", color: "var(--color-success)" }}><TrendingUp size={28} /></div>
                    <div><p className={styles.statLabel}>Réel Décaissé</p><p className={styles.statValue}>{totalActual.toLocaleString("fr-FR")} €</p></div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIconBox} style={{ background: "rgba(255,176,32,0.1)", color: "var(--color-warning)" }}><AlertCircle size={28} /></div>
                    <div><p className={styles.statLabel}>Solde Restant</p><p className={styles.statValue} style={{ color: remaining < 0 ? "var(--color-danger)" : "inherit" }}>{remaining.toLocaleString("fr-FR")} €</p></div>
                </div>
            </div>

            <Card>
                <Card.Body>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "var(--space-sm)" }}>
                        <span style={{ fontWeight: "var(--fw-semibold)" }}>Consommation budgétaire</span>
                        <span style={{ fontWeight: "var(--fw-bold)", color: "var(--color-primary)" }}>{Math.round((totalActual / totalPlanned) * 100)}%</span>
                    </div>
                    <div className={styles.progress} style={{ height: "10px" }}>
                        <div className={styles.progressBar} style={{ width: `${Math.min((totalActual / totalPlanned) * 100, 100)}%` }} />
                    </div>
                </Card.Body>
            </Card>

            <div className={styles.tableCard}>
                <div className={styles.tableCardHeader}>
                    <span className={styles.tableCardTitle}>Lignes de dépenses ({filtered.length})</span>
                    <div className={styles.searchBar}>
                        <Search size={16} />
                        <input className={styles.searchInput} placeholder="Filtrer les écritures..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                </div>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr><th>Article / Description</th><th>Catégorie</th><th style={{ textAlign: "right" }}>Prévu</th><th style={{ textAlign: "right" }}>Réel</th><th style={{ textAlign: "center" }}>Statut</th><th></th></tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {filtered.map(item => (
                            <tr key={item.id}>
                                <td style={{ fontWeight: "var(--fw-semibold)" }}>{item.item}</td>
                                <td><span className={`${styles.badge} ${styles.muted}`}>{item.category}</span></td>
                                <td style={{ textAlign: "right", fontFamily: "monospace", color: "var(--color-muted)" }}>{item.planned.toLocaleString("fr-FR")} €</td>
                                <td style={{ textAlign: "right", fontFamily: "monospace", fontWeight: "var(--fw-bold)" }}>{item.actual.toLocaleString("fr-FR")} €</td>
                                <td style={{ textAlign: "center" }}>
                                    <Badge variant={item.status === "paid" ? "success" : "warning"} dot>{item.status === "paid" ? "Payé" : "En attente"}</Badge>
                                </td>
                                <td style={{ textAlign: "right" }}>
                                    <button onClick={() => deleteItem(item.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", padding: "4px" }}>
                                        <Trash2 size={15} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
