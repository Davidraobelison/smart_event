"use client";

import React, { useState } from "react";
import { Calendar, Plus, MapPin, Search, Users, TrendingUp, Edit, Trash2, Eye } from "lucide-react";
import styles from "@/components/shared/page.module.css";
import Card from "@/components/ui/Card/Card";
import Badge from "@/components/ui/Badge/Badge";

const mockEvents = [
    { id: "1", title: "Mariage Julie & Marc",     date: "2024-08-15", location: "Domaine de la Source, Marseille",   status: "published", progress: 72, guests: 150, budget: 25000, category: "Mariage"  },
    { id: "2", title: "Conférence Digital Innov", date: "2024-09-22", location: "Parc des Expositions, Lyon",        status: "draft",      progress: 35, guests: 300, budget: 15000, category: "Corporate" },
    { id: "3", title: "Soirée Gala Corporate",   date: "2024-10-10", location: "Hôtel du Palais, Biarritz",         status: "published", progress: 90, guests: 80,  budget: 18000, category: "Gala"      },
];

type FormData = { title: string; date: string; location: string; budget: string; description: string; category: string };
const emptyForm: FormData = { title: "", date: "", location: "", budget: "", description: "", category: "Mariage" };

export default function EvenementPage() {
    const [events, setEvents] = useState(mockEvents);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState<typeof mockEvents[0] | null>(null);
    const [editEvent, setEditEvent] = useState<typeof mockEvents[0] | null>(null);
    const [form, setForm] = useState<FormData>(emptyForm);

    const filtered = events.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));

    const openCreate = () => { setEditEvent(null); setForm(emptyForm); setShowModal(true); };
    const openEdit   = (ev: typeof mockEvents[0]) => { setEditEvent(ev); setForm({ title: ev.title, date: ev.date, location: ev.location, budget: String(ev.budget), description: "", category: ev.category }); setShowModal(true); };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editEvent) {
            setEvents(prev => prev.map(ev => ev.id === editEvent.id ? { ...ev, ...form, budget: Number(form.budget) } : ev));
        } else {
            setEvents(prev => [...prev, { id: String(Date.now()), title: form.title, date: form.date, location: form.location, status: "draft", progress: 0, guests: 0, budget: Number(form.budget), category: form.category }]);
        }
        setShowModal(false);
    };

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>Mes Événements</h1>
                    <p className={styles.pageSubtitle}>Planifiez et pilotez la réussite de vos projets événementiels.</p>
                </div>
                <button className={styles.actionBtn} onClick={openCreate}><Plus size={18} /> Nouvel Événement</button>
            </div>

            <div className={styles.statGrid}>
                <div className={styles.statCard}><div className={styles.statIconBox} style={{ background: "rgba(47,107,255,0.1)", color: "var(--color-blue)" }}><Calendar size={26} /></div><div><p className={styles.statLabel}>Total</p><p className={styles.statValue}>{events.length}</p></div></div>
                <div className={styles.statCard}><div className={styles.statIconBox} style={{ background: "rgba(36,180,126,0.1)", color: "var(--color-success)" }}><TrendingUp size={26} /></div><div><p className={styles.statLabel}>Publiés</p><p className={styles.statValue}>{events.filter(e => e.status === "published").length}</p></div></div>
                <div className={styles.statCard}><div className={styles.statIconBox} style={{ background: "rgba(255,147,79,0.1)", color: "var(--color-primary)" }}><Users size={26} /></div><div><p className={styles.statLabel}>Total invités</p><p className={styles.statValue}>{events.reduce((a, e) => a + e.guests, 0)}</p></div></div>
            </div>

            <div className={styles.tableCard}>
                <div className={styles.tableCardHeader}>
                    <span className={styles.tableCardTitle}>Projets ({filtered.length})</span>
                    <div className={styles.searchBar}><Search size={16} /><input className={styles.searchInput} placeholder="Rechercher un événement..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "var(--space-lg)", padding: "var(--space-lg)" }}>
                    {filtered.map(event => (
                        <Card key={event.id} shadow="sm" style={{ overflow: "hidden" }}>
                            <Card.Body>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-xs)" }}>
                                    <h3 style={{ fontWeight: "var(--fw-bold)", color: "var(--color-heading)", fontSize: "var(--fs-md)", margin: 0 }}>{event.title}</h3>
                                    <Badge variant={event.status === "published" ? "success" : "default"}>{event.status === "published" ? "Publié" : "Brouillon"}</Badge>
                                </div>
                                <div style={{ display: "flex", gap: "var(--space-sm)", color: "var(--color-muted)", fontSize: "var(--fs-xs)", marginBottom: "var(--space-xs)" }}>
                                    <span style={{ display: "flex", gap: "4px", alignItems: "center" }}><Calendar size={12} /> {new Date(event.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</span>
                                </div>
                                <div style={{ display: "flex", gap: "4px", alignItems: "center", color: "var(--color-muted)", fontSize: "var(--fs-xs)", marginBottom: "var(--space-md)" }}>
                                    <MapPin size={12} color="var(--color-danger)" /> {event.location}
                                </div>
                                <div style={{ marginBottom: "var(--space-md)" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                                        <span style={{ fontSize: "10px", textTransform: "uppercase", fontWeight: "var(--fw-bold)", color: "var(--color-muted)" }}>Avancement</span>
                                        <span style={{ fontSize: "12px", fontWeight: "var(--fw-bold)", color: "var(--color-primary)" }}>{event.progress}%</span>
                                    </div>
                                    <div className={styles.progress}><div className={styles.progressBar} style={{ width: `${event.progress}%` }} /></div>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "var(--space-sm)", borderTop: "1px solid var(--color-border)" }}>
                                    <div style={{ display: "flex", gap: "var(--space-xs)" }}>
                                        <button onClick={() => setShowDetailModal(event)} className={styles.actionBtnGhost} style={{ padding: "6px 12px", fontSize: "11px", display: "flex", alignItems: "center", gap: "4px" }}><Eye size={12} /> Voir</button>
                                        <button onClick={() => openEdit(event)} className={styles.actionBtnGhost} style={{ padding: "6px 12px", fontSize: "11px" }}><Edit size={12} /></button>
                                        <button onClick={() => setEvents(prev => prev.filter(e => e.id !== event.id))} style={{ background: "rgba(239,83,80,0.1)", border: "none", borderRadius: "var(--radius-sm)", padding: "6px 8px", cursor: "pointer", color: "var(--color-danger)" }}><Trash2 size={12} /></button>
                                    </div>
                                    <span style={{ fontSize: "var(--fs-xxs)", color: "var(--color-muted)" }}>{event.guests} invités — {event.budget.toLocaleString("fr-FR")}€</span>
                                </div>
                            </Card.Body>
                        </Card>
                    ))}
                    {filtered.length === 0 && (
                        <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "var(--space-xxl)", color: "var(--color-muted)" }}>
                            <Calendar size={48} style={{ display: "block", margin: "0 auto var(--space-md)", opacity: 0.3 }} />
                            <p>Aucun événement ne correspond à votre recherche.</p>
                            <button className={styles.actionBtn} style={{ marginTop: "var(--space-sm)" }} onClick={openCreate}>Créer un événement</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Create/Edit Modal */}
            {showModal && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-md)" }}>
                    <Card style={{ width: "560px", maxWidth: "95vw", maxHeight: "90vh", overflowY: "auto" }}>
                        <Card.Header divider><Card.Title>{editEvent ? "Modifier l'événement" : "Créer un nouvel événement"}</Card.Title></Card.Header>
                        <Card.Body>
                            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
                                {[{ label: "Titre de l'événement", key: "title", placeholder: "Ex: Mariage, Conférence...", type: "text" }, { label: "Date", key: "date", placeholder: "", type: "date" }, { label: "Lieu", key: "location", placeholder: "Ville ou salle...", type: "text" }, { label: "Budget (€)", key: "budget", placeholder: "0", type: "number" }].map(f => (
                                    <div key={f.key}>
                                        <label style={{ fontSize: "var(--fs-xs)", fontWeight: "var(--fw-bold)", color: "var(--color-muted)", display: "block", marginBottom: "6px", textTransform: "uppercase" }}>{f.label}</label>
                                        <input type={f.type} value={(form as Record<string, string>)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} required style={{ width: "100%", padding: "10px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface-2)", color: "var(--color-text)", fontSize: "var(--fs-sm)", outline: "none", boxSizing: "border-box", fontFamily: "var(--font-family-base)" }} />
                                    </div>
                                ))}
                                <div style={{ display: "flex", gap: "var(--space-sm)", justifyContent: "flex-end", paddingTop: "var(--space-sm)" }}>
                                    <button type="button" className={styles.actionBtnGhost} onClick={() => setShowModal(false)}>Annuler</button>
                                    <button type="submit" className={styles.actionBtn}>{editEvent ? "Enregistrer" : "Créer le projet"}</button>
                                </div>
                            </form>
                        </Card.Body>
                    </Card>
                </div>
            )}

            {/* Detail Modal */}
            {showDetailModal && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-md)" }}>
                    <Card style={{ width: "600px", maxWidth: "95vw" }}>
                        <Card.Body>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <h2 style={{ margin: 0, color: "var(--color-heading)" }}>{showDetailModal.title}</h2>
                                <Badge variant={showDetailModal.status === "published" ? "success" : "default"}>{showDetailModal.status === "published" ? "Publié" : "Brouillon"}</Badge>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "var(--space-md)", marginTop: "var(--space-lg)", textAlign: "center" }}>
                                {[{ label: "Date", value: new Date(showDetailModal.date).toLocaleDateString("fr-FR") }, { label: "Invités", value: showDetailModal.guests }, { label: "Budget", value: `${showDetailModal.budget.toLocaleString("fr-FR")}€` }].map(i => (
                                    <div key={i.label} style={{ background: "var(--color-surface-2)", borderRadius: "var(--radius-md)", padding: "var(--space-md)" }}>
                                        <p style={{ margin: 0, fontSize: "var(--fs-xxs)", color: "var(--color-muted)", textTransform: "uppercase", fontWeight: "700" }}>{i.label}</p>
                                        <p style={{ margin: "4px 0 0", fontWeight: "var(--fw-bold)", fontSize: "var(--fs-sm)", color: "var(--color-heading)" }}>{i.value}</p>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: "flex", gap: "var(--space-sm)", marginTop: "var(--space-lg)", justifyContent: "flex-end" }}>
                                <button className={styles.actionBtnGhost} onClick={() => setShowDetailModal(null)}>Fermer</button>
                                <button className={styles.actionBtn} onClick={() => { openEdit(showDetailModal); setShowDetailModal(null); }}>Modifier</button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </div>
    );
}
