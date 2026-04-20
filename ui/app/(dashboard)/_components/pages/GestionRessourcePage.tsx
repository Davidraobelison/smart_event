"use client";

import React, { useState } from "react";
import { Plus, Search, Package, Truck, Wifi, AlertTriangle, CheckCircle } from "lucide-react";
import styles from "@/components/shared/page.module.css";
import Badge from "@/components/ui/Badge/Badge";

const resources = [
    { id: "1", name: "Tables rondes (x20)",              category: "Mobilier",   quantity: 20,  available: 20, status: "available", event: "Mariage Julie & Marc"   },
    { id: "2", name: "Système sonorisation L-Acoustics", category: "Technique",  quantity: 1,   available: 1,  status: "available", event: "—"                      },
    { id: "3", name: "Projecteur HD 4K",                 category: "Technique",  quantity: 2,   available: 1,  status: "partial",   event: "Conférence Digital Innov"},
    { id: "4", name: "Chaises Chiavari blanches (x200)", category: "Mobilier",   quantity: 200, available: 200,status: "available", event: "—"                      },
    { id: "5", name: "Camion de transport",              category: "Logistique", quantity: 1,   available: 0,  status: "busy",      event: "Soirée Gala Corporate"  },
    { id: "6", name: "Tente extérieure 10x15m",          category: "Structure",  quantity: 1,   available: 1,  status: "available", event: "—"                      },
];

const categories = ["Tous", "Mobilier", "Technique", "Logistique", "Structure"];
const iconMap: Record<string, React.ElementType> = { Mobilier: Package, Technique: Wifi, Logistique: Truck, Structure: CheckCircle };

export default function GestionRessourcePage() {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("Tous");

    const filtered = resources.filter(r => {
        const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
        const matchCat    = activeCategory === "Tous" || r.category === activeCategory;
        return matchSearch && matchCat;
    });

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>Gestion des Ressources</h1>
                    <p className={styles.pageSubtitle}>Suivez la disponibilité de vos équipements et ressources matérielles.</p>
                </div>
                <button className={styles.actionBtn}><Plus size={18} /> Ajouter une ressource</button>
            </div>

            <div className={styles.statGrid}>
                <div className={styles.statCard}><div className={styles.statIconBox} style={{ background: "rgba(36,180,126,0.1)", color: "var(--color-success)" }}><CheckCircle size={26} /></div><div><p className={styles.statLabel}>Disponibles</p><p className={styles.statValue}>{resources.filter(r => r.status === "available").length}</p></div></div>
                <div className={styles.statCard}><div className={styles.statIconBox} style={{ background: "rgba(255,176,32,0.1)", color: "var(--color-warning)" }}><AlertTriangle size={26} /></div><div><p className={styles.statLabel}>Partiels</p><p className={styles.statValue}>{resources.filter(r => r.status === "partial").length}</p></div></div>
                <div className={styles.statCard}><div className={styles.statIconBox} style={{ background: "rgba(239,83,80,0.1)", color: "var(--color-danger)" }}><Package size={26} /></div><div><p className={styles.statLabel}>Occupés</p><p className={styles.statValue}>{resources.filter(r => r.status === "busy").length}</p></div></div>
                <div className={styles.statCard}><div className={styles.statIconBox} style={{ background: "rgba(255,147,79,0.1)", color: "var(--color-primary)" }}><Package size={26} /></div><div><p className={styles.statLabel}>Total ressources</p><p className={styles.statValue}>{resources.length}</p></div></div>
            </div>

            <div style={{ display: "flex", gap: "var(--space-md)", alignItems: "center", flexWrap: "wrap" }}>
                <div className={styles.searchBar} style={{ flex: 1, maxWidth: "400px" }}>
                    <Search size={16} /><input className={styles.searchInput} style={{ width: "100%" }} placeholder="Rechercher une ressource..." value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                {categories.map(cat => (
                    <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: "6px 14px", borderRadius: "999px", border: "1px solid var(--color-border)", background: activeCategory === cat ? "var(--color-primary)" : "var(--color-surface)", color: activeCategory === cat ? "white" : "var(--color-text)", cursor: "pointer", fontSize: "var(--fs-xs)", fontWeight: "var(--fw-bold)", fontFamily: "var(--font-family-base)", transition: "all 0.2s" }}>
                        {cat}
                    </button>
                ))}
            </div>

            <div className={styles.tableCard}>
                <div className={styles.tableCardHeader}><span className={styles.tableCardTitle}>Inventaire ({filtered.length})</span></div>
                <table className={styles.table}>
                    <thead className={styles.thead}><tr><th>Ressource</th><th>Catégorie</th><th style={{ textAlign: "center" }}>Quantité</th><th>Événement assigné</th><th style={{ textAlign: "center" }}>Disponibilité</th><th></th></tr></thead>
                    <tbody className={styles.tbody}>
                        {filtered.map(r => {
                            const IconComp = iconMap[r.category] || Package;
                            return (
                                <tr key={r.id}>
                                    <td>
                                        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
                                            <div style={{ padding: "6px", background: "var(--color-surface-2)", borderRadius: "var(--radius-sm)" }}><IconComp size={16} color="var(--color-primary)" /></div>
                                            <span style={{ fontWeight: "var(--fw-semibold)" }}>{r.name}</span>
                                        </div>
                                    </td>
                                    <td><span style={{ fontSize: "11px", background: "var(--color-surface-2)", padding: "3px 10px", borderRadius: "999px", color: "var(--color-muted)", fontWeight: "var(--fw-bold)" }}>{r.category}</span></td>
                                    <td style={{ textAlign: "center", fontWeight: "var(--fw-bold)" }}>{r.available}/{r.quantity}</td>
                                    <td style={{ color: r.event === "—" ? "var(--color-muted)" : "var(--color-text)", fontSize: "var(--fs-xs)" }}>{r.event}</td>
                                    <td style={{ textAlign: "center" }}>
                                        <Badge variant={r.status === "available" ? "success" : r.status === "busy" ? "danger" : "warning"} dot>
                                            {r.status === "available" ? "Disponible" : r.status === "busy" ? "Occupé" : "Partiel"}
                                        </Badge>
                                    </td>
                                    <td style={{ textAlign: "right" }}><button className={styles.actionBtnGhost} style={{ padding: "4px 10px", fontSize: "11px" }}>Détails</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
