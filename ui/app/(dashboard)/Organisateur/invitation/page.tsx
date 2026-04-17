"use client";

import React, { useState } from "react";
import { Plus, Search, Mail, Phone, UserCheck, UserX, Send } from "lucide-react";
import styles from "@/components/shared/page.module.css";
import Badge from "@/components/ui/Badge/Badge";

const invitations = [
    { id: "1", name: "Sophie Martin", email: "sophie.martin@email.fr", phone: "+33 6 12 34 56 78", status: "confirmed", table: "Table 1" },
    { id: "2", name: "Pierre Dupont", email: "p.dupont@gmail.com", phone: "+33 6 98 76 54 32", status: "pending", table: "Table 3" },
    { id: "3", name: "Isabelle Lefebvre", email: "i.lefebvre@outlook.fr", phone: "+33 7 11 22 33 44", status: "confirmed", table: "Table 2" },
    { id: "4", name: "Laurent Bernard", email: "l.bernard@yahoo.fr", phone: "+33 6 55 66 77 88", status: "declined", table: "—" },
    { id: "5", name: "Claire Rousseau", email: "claire.r@icloud.com", phone: "+33 7 44 33 22 11", status: "pending", table: "Table 4" },
    { id: "6", name: "Thomas Girard", email: "t.girard@proton.me", phone: "+33 6 77 88 99 00", status: "confirmed", table: "Table 1" },
];

export default function InvitationPage() {
    const [search, setSearch] = useState("");
    const filtered = invitations.filter(i =>
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        i.email.toLowerCase().includes(search.toLowerCase())
    );
    const confirmed = invitations.filter(i => i.status === 'confirmed').length;
    const pending = invitations.filter(i => i.status === 'pending').length;
    const declined = invitations.filter(i => i.status === 'declined').length;

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>Gestion des Invitations</h1>
                    <p className={styles.pageSubtitle}>Gérez vos invités, suivez les confirmations et planifiez le placement.</p>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-sm)' }}>
                    <button className={styles.actionBtnGhost}><Send size={16} /> Relancer en attente</button>
                    <button className={styles.actionBtn}><Plus size={18} /> Ajouter un invité</button>
                </div>
            </div>

            <div className={styles.statGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIconBox} style={{ background: 'rgba(36,180,126,0.1)', color: 'var(--color-success)' }}><UserCheck size={28} /></div>
                    <div><p className={styles.statLabel}>Confirmés</p><p className={styles.statValue}>{confirmed}</p></div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIconBox} style={{ background: 'rgba(255,176,32,0.1)', color: 'var(--color-warning)' }}><Mail size={28} /></div>
                    <div><p className={styles.statLabel}>En attente</p><p className={styles.statValue}>{pending}</p></div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIconBox} style={{ background: 'rgba(239,83,80,0.1)', color: 'var(--color-danger)' }}><UserX size={28} /></div>
                    <div><p className={styles.statLabel}>Déclinés</p><p className={styles.statValue}>{declined}</p></div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIconBox} style={{ background: 'rgba(255,147,79,0.1)', color: 'var(--color-primary)' }}><UserCheck size={28} /></div>
                    <div><p className={styles.statLabel}>Total invités</p><p className={styles.statValue}>{invitations.length}</p></div>
                </div>
            </div>

            <div className={styles.tableCard}>
                <div className={styles.tableCardHeader}>
                    <span className={styles.tableCardTitle}>Invités ({filtered.length})</span>
                    <div className={styles.searchBar}>
                        <Search size={16} /><input className={styles.searchInput} placeholder="Rechercher un invité..." value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                </div>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr><th>Nom</th><th>Email</th><th>Téléphone</th><th>Table</th><th style={{ textAlign: 'center' }}>Statut</th><th></th></tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {filtered.map(inv => (
                            <tr key={inv.id}>
                                <td style={{ fontWeight: 'var(--fw-semibold)' }}>{inv.name}</td>
                                <td style={{ color: 'var(--color-muted)', fontSize: 'var(--fs-xs)' }}>{inv.email}</td>
                                <td style={{ color: 'var(--color-muted)', fontSize: 'var(--fs-xs)' }}>{inv.phone}</td>
                                <td>{inv.table}</td>
                                <td style={{ textAlign: 'center' }}>
                                    <Badge variant={inv.status === 'confirmed' ? 'success' : inv.status === 'declined' ? 'danger' : 'warning'} dot>
                                        {inv.status === 'confirmed' ? 'Confirmé' : inv.status === 'declined' ? 'Décliné' : 'En attente'}
                                    </Badge>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <button className={styles.actionBtnGhost} style={{ padding: '4px 10px', fontSize: '11px' }}>Éditer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
