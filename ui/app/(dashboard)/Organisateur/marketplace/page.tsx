"use client";

import React, { useState } from "react";
import { Plus, Star, MapPin, Phone, Search, X, Send } from "lucide-react";
import styles from "@/app/components/shared/page.module.css";
import Badge from "@/app/components/UI/Badge/Badge";
import Card from "@/app/components/UI/Card/Card";

const vendorImages: Record<string, string> = {
    "1": "/images/vendors/vendor-1-traiteur.jpg",
    "2": "/images/vendors/vendor-2-photo.jpg",
    "3": "/images/vendors/vendor-3-dj.jpg",
    "4": "/images/vendors/vendor-4-deco.jpg",
    "5": "/images/vendors/vendor-5-lieu.jpg",
    "6": "/images/vendors/vendor-6-transport.jpg",
};

const initialVendors = [
    { id: "1", name: "Luxe Traiteur", category: "Traiteur", rating: 4.9, reviews: 124, price: "€€€", location: "Marseille", status: "available", desc: "Spécialiste des cocktails et buffets pour événements premium. Plus de 10 ans d'expérience.", phone: "+33 4 91 12 34 56", email: "contact@luxe-traiteur.fr" },
    { id: "2", name: "Photo Studio Art", category: "Photographie", rating: 4.8, reviews: 89, price: "€€€", location: "Aix-en-Provence", status: "available", desc: "Reportages photo et vidéo pour mariages et corporate. Équipe de 3 photographes.", phone: "+33 4 91 98 76 54", email: "studio@photoart.fr" },
    { id: "3", name: "DJ StarSound", category: "Animation", rating: 4.7, reviews: 201, price: "€€", location: "Marseille", status: "busy", desc: "DJ professionnel + système son haut de gamme inclus. Spécialiste mariages et soirées.", phone: "+33 6 12 34 56 78", email: "djstar@sound.fr" },
    { id: "4", name: "Fleurs & Création", category: "Décoration", rating: 4.6, reviews: 67, price: "€€", location: "Aubagne", status: "available", desc: "Décoration florale et scénographique sur mesure. Compositions uniques et originales.", phone: "+33 4 42 11 22 33", email: "info@fleurs-creation.fr" },
    { id: "5", name: "Domaine Vue Mer", category: "Lieu", rating: 5.0, reviews: 43, price: "€€€€", location: "Cassis", status: "available", desc: "Domaine exception avec vue panoramique sur la Méditerranée. Capacité 200 personnes.", phone: "+33 4 42 98 76 54", email: "reservations@domainevuemer.fr" },
    { id: "6", name: "Navette VIP", category: "Transport", rating: 4.5, reviews: 38, price: "€€", location: "Marseille", status: "available", desc: "Minibus et limousines pour vos convois d'invités. Service 7j/7 disponible.", phone: "+33 6 98 76 54 32", email: "vip@navette-events.fr" },
];

const categories = ["Tous", "Traiteur", "Photographie", "Animation", "Décoration", "Lieu", "Transport"];

export default function MarketplacePage() {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("Tous");
    const [selectedVendor, setSelectedVendor] = useState<typeof initialVendors[0] | null>(null);
    const [showContact, setShowContact] = useState(false);
    const [contactMsg, setContactMsg] = useState("");
    const [contactSent, setContactSent] = useState(false);

    const filtered = initialVendors.filter(v => {
        const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.desc.toLowerCase().includes(search.toLowerCase());
        const matchCat = activeCategory === "Tous" || v.category === activeCategory;
        return matchSearch && matchCat;
    });

    const sendContact = () => {
        if (!contactMsg.trim()) return;
        setContactSent(true);
        setTimeout(() => { setShowContact(false); setContactSent(false); setContactMsg(""); }, 2000);
    };

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>Marketplace Prestataires</h1>
                    <p className={styles.pageSubtitle}>Trouvez et contactez les meilleurs prestataires pour votre événement.</p>
                </div>
            </div>

            <div style={{ display: "flex", gap: "var(--space-md)", flexWrap: "wrap", alignItems: "center" }}>
                <div className={styles.searchBar} style={{ flex: 1, maxWidth: "380px" }}>
                    <Search size={16} />
                    <input className={styles.searchInput} placeholder="Rechercher un prestataire..." style={{ width: "100%" }} value={search} onChange={e => setSearch(e.target.value)} />
                </div>
                <div style={{ display: "flex", gap: "var(--space-xs)", flexWrap: "wrap" }}>
                    {categories.map(cat => (
                        <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: "6px 16px", borderRadius: "999px", border: "1px solid var(--color-border)", background: activeCategory === cat ? "var(--color-primary)" : "var(--color-surface)", color: activeCategory === cat ? "white" : "var(--color-text)", cursor: "pointer", fontSize: "var(--fs-xs)", fontWeight: "var(--fw-bold)", fontFamily: "var(--font-family-base)", transition: "all 0.2s" }}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "var(--space-lg)" }}>
                {filtered.map(vendor => (
                    <Card key={vendor.id} shadow="sm" style={{ overflow: "hidden", cursor: "pointer" }} onClick={() => setSelectedVendor(vendor)}>
                        <div style={{ height: "180px", overflow: "hidden", position: "relative" }}>
                            <img
                                src={vendorImages[vendor.id] || "/images/vendors/vendor-default.jpg"}
                                alt={vendor.name}
                                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                                onMouseOver={e => (e.currentTarget.style.transform = "scale(1.07)")}
                                onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
                            />
                            <div style={{ position: "absolute", top: "var(--space-sm)", right: "var(--space-sm)" }}>
                                <Badge variant={vendor.status === "available" ? "success" : "warning"} dot>{vendor.status === "available" ? "Disponible" : "Occupé"}</Badge>
                            </div>
                            <div style={{ position: "absolute", bottom: "var(--space-sm)", left: "var(--space-sm)", background: "rgba(0,0,0,0.55)", borderRadius: "999px", padding: "3px 12px", fontSize: "11px", color: "white", fontWeight: "700" }}>{vendor.category}</div>
                        </div>
                        <Card.Body>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-xs)" }}>
                                <h3 style={{ margin: 0, fontWeight: "var(--fw-bold)", color: "var(--color-heading)", fontSize: "var(--fs-md)" }}>{vendor.name}</h3>
                                <span style={{ fontWeight: "var(--fw-bold)", color: "var(--color-primary)", fontSize: "var(--fs-sm)" }}>{vendor.price}</span>
                            </div>
                            <p style={{ fontSize: "var(--fs-xs)", color: "var(--color-muted)", margin: "0 0 var(--space-sm)", lineHeight: "1.5" }}>{vendor.desc}</p>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-md)" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "var(--fs-xs)" }}>
                                    <Star size={12} color="var(--color-warning)" fill="var(--color-warning)" />
                                    <span style={{ fontWeight: "var(--fw-bold)" }}>{vendor.rating}</span>
                                    <span style={{ color: "var(--color-muted)" }}>({vendor.reviews})</span>
                                </div>
                                <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "var(--fs-xs)", color: "var(--color-muted)" }}><MapPin size={11} /> {vendor.location}</span>
                            </div>
                            <button className={styles.actionBtn} style={{ width: "100%", justifyContent: "center" }} onClick={e => { e.stopPropagation(); setSelectedVendor(vendor); setShowContact(true); }}>
                                Contacter
                            </button>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            {/* Vendor Detail Modal */}
            {selectedVendor && !showContact && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-md)" }} onClick={() => setSelectedVendor(null)}>
                    <Card style={{ width: "600px", maxWidth: "95vw", maxHeight: "90vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
                        <div style={{ height: "220px", overflow: "hidden", position: "relative" }}>
                            <img src={vendorImages[selectedVendor.id]} alt={selectedVendor.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            <button onClick={() => setSelectedVendor(null)} style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(0,0,0,0.5)", border: "none", borderRadius: "50%", padding: "6px", cursor: "pointer", color: "white", display: "flex" }}><X size={16} /></button>
                        </div>
                        <Card.Body>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-md)" }}>
                                <div>
                                    <h2 style={{ margin: "0 0 4px", color: "var(--color-heading)" }}>{selectedVendor.name}</h2>
                                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)" }}>
                                        <Star size={14} color="var(--color-warning)" fill="var(--color-warning)" />
                                        <span style={{ fontWeight: "var(--fw-bold)", fontSize: "var(--fs-sm)" }}>{selectedVendor.rating}</span>
                                        <span style={{ color: "var(--color-muted)", fontSize: "var(--fs-xs)" }}>({selectedVendor.reviews} avis)</span>
                                    </div>
                                </div>
                                <Badge variant={selectedVendor.status === "available" ? "success" : "warning"} dot>{selectedVendor.status === "available" ? "Disponible" : "Occupé"}</Badge>
                            </div>
                            <p style={{ color: "var(--color-muted)", fontSize: "var(--fs-sm)", lineHeight: "1.6", marginBottom: "var(--space-lg)" }}>{selectedVendor.desc}</p>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-sm)", marginBottom: "var(--space-lg)" }}>
                                <div style={{ background: "var(--color-surface-2)", borderRadius: "var(--radius-md)", padding: "var(--space-md)" }}>
                                    <p style={{ margin: 0, fontSize: "10px", textTransform: "uppercase", fontWeight: "700", color: "var(--color-muted)" }}>Lieu</p>
                                    <p style={{ margin: "4px 0 0", fontWeight: "700", fontSize: "var(--fs-sm)" }}>{selectedVendor.location}</p>
                                </div>
                                <div style={{ background: "var(--color-surface-2)", borderRadius: "var(--radius-md)", padding: "var(--space-md)" }}>
                                    <p style={{ margin: 0, fontSize: "10px", textTransform: "uppercase", fontWeight: "700", color: "var(--color-muted)" }}>Tarifs</p>
                                    <p style={{ margin: "4px 0 0", fontWeight: "700", fontSize: "var(--fs-sm)", color: "var(--color-primary)" }}>{selectedVendor.price}</p>
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: "var(--space-sm)" }}>
                                <button className={styles.actionBtnGhost} onClick={() => setSelectedVendor(null)}>Fermer</button>
                                <button className={styles.actionBtn} style={{ flex: 1, justifyContent: "center" }} onClick={() => setShowContact(true)}>Envoyer un message</button>
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            )}

            {/* Contact Modal */}
            {showContact && selectedVendor && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1100, display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-md)" }}>
                    <Card style={{ width: "480px", maxWidth: "95vw" }}>
                        <Card.Header divider><Card.Title>Contacter {selectedVendor.name}</Card.Title></Card.Header>
                        <Card.Body>
                            {contactSent ? (
                                <div style={{ textAlign: "center", padding: "var(--space-xl)", color: "var(--color-success)" }}>
                                    <Send size={48} style={{ display: "block", margin: "0 auto var(--space-md)" }} />
                                    <p style={{ fontWeight: "var(--fw-bold)", fontSize: "var(--fs-lg)" }}>Message envoyé !</p>
                                    <p style={{ color: "var(--color-muted)" }}>Le prestataire vous répondra rapidement.</p>
                                </div>
                            ) : (
                                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
                                    <div style={{ background: "var(--color-surface-2)", borderRadius: "var(--radius-md)", padding: "var(--space-md)", display: "flex", gap: "var(--space-sm)" }}>
                                        <Phone size={16} color="var(--color-primary)" />
                                        <span style={{ fontSize: "var(--fs-sm)" }}>{selectedVendor.phone}</span>
                                    </div>
                                    <textarea rows={5} value={contactMsg} onChange={e => setContactMsg(e.target.value)} placeholder={`Bonjour ${selectedVendor.name},\n\nJe suis intéressé(e) par vos services pour mon événement...`} style={{ width: "100%", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface-2)", color: "var(--color-text)", fontSize: "var(--fs-sm)", outline: "none", resize: "vertical", fontFamily: "var(--font-family-base)", boxSizing: "border-box" }} />
                                    <div style={{ display: "flex", gap: "var(--space-sm)", justifyContent: "flex-end" }}>
                                        <button className={styles.actionBtnGhost} onClick={() => setShowContact(false)}>Annuler</button>
                                        <button className={styles.actionBtn} onClick={sendContact} style={{ display: "flex", alignItems: "center", gap: "6px" }}><Send size={14} /> Envoyer</button>
                                    </div>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </div>
            )}
        </div>
    );
}
