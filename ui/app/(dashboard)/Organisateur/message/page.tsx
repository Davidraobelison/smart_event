"use client";

import React, { useState } from "react";
import { Send, Search, User } from "lucide-react";
import styles from "@/components/shared/page.module.css";

const contacts = [
    { id: "1", name: "Julie Moreau (Cliente)", role: "Client", avatar: "JM", lastMsg: "Super, merci pour la mise à jour !", time: "10:30", unread: 2 },
    { id: "2", name: "Luxe Traiteur", role: "Prestataire", avatar: "LT", lastMsg: "Je vous envoie le devis demain.", time: "Hier", unread: 0 },
    { id: "3", name: "Photo Studio Art", role: "Prestataire", avatar: "PS", lastMsg: "La session photo est confirmée pour le 14.", time: "Lundi", unread: 0 },
    { id: "4", name: "DJ StarSound", role: "Prestataire", avatar: "DJ", lastMsg: "Playlist envoyée sur votre email.", time: "22/07", unread: 1 },
];

const initialMessages: Record<string, { from: "me" | "them"; text: string; time: string }[]> = {
    "1": [
        { from: "them", text: "Bonjour, avez-vous validé le menu pour le cocktail ?", time: "10:15" },
        { from: "me", text: "Oui ! Le menu est confirmé. 3 entrées, 1 plat, dessert maison.", time: "10:22" },
        { from: "them", text: "Super, merci pour la mise à jour !", time: "10:30" },
    ],
    "2": [
        { from: "them", text: "Bonjour. Je vous prépare un devis détaillé pour 150 personnes.", time: "09:00" },
        { from: "me", text: "Parfait, n'oubliez pas d'inclure les options végétariennes.", time: "09:45" },
        { from: "them", text: "Je vous envoie le devis demain.", time: "Hier" },
    ],
};

export default function MessagePage() {
    const [selectedContact, setSelectedContact] = useState(contacts[0]);
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState("");

    const send = () => {
        if (!input.trim()) return;
        const now = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        setMessages(prev => ({
            ...prev,
            [selectedContact.id]: [...(prev[selectedContact.id] || []), { from: "me", text: input, time: now }]
        }));
        setInput("");
    };

    const msgs = messages[selectedContact.id] || [];

    return (
        <div className={styles.page} style={{ height: 'calc(100vh - 120px)' }}>
            <h1 className={styles.pageTitle}>Messagerie</h1>

            <div style={{ display: 'flex', flex: 1, gap: 0, background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', overflow: 'hidden', height: '100%' }}>
                {/* Contacts list */}
                <div style={{ width: '280px', borderRight: '1px solid var(--color-border)', flexShrink: 0, overflowY: 'auto' }}>
                    <div style={{ padding: 'var(--space-md)', borderBottom: '1px solid var(--color-border)' }}>
                        <div className={styles.searchBar} style={{ width: '100%' }}>
                            <Search size={14} />
                            <input className={styles.searchInput} placeholder="Rechercher..." style={{ width: '100%' }} />
                        </div>
                    </div>
                    {contacts.map(c => (
                        <div key={c.id} onClick={() => setSelectedContact(c)} style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center', padding: 'var(--space-md)', cursor: 'pointer', background: c.id === selectedContact.id ? 'var(--color-primary-100)' : 'transparent', borderLeft: c.id === selectedContact.id ? '3px solid var(--color-primary)' : '3px solid transparent', transition: 'all 0.15s' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-primary-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'var(--fw-bold)', color: 'var(--color-primary)', flexShrink: 0 }}>{c.avatar}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-semibold)', color: 'var(--color-heading)' }}>{c.name}</span>
                                    <span style={{ fontSize: '10px', color: 'var(--color-muted)' }}>{c.time}</span>
                                </div>
                                <p style={{ fontSize: 'var(--fs-xxs)', color: 'var(--color-muted)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.lastMsg}</p>
                            </div>
                            {c.unread > 0 && <span style={{ background: 'var(--color-primary)', color: 'white', borderRadius: '999px', fontSize: '10px', padding: '2px 7px', fontWeight: 'var(--fw-bold)' }}>{c.unread}</span>}
                        </div>
                    ))}
                </div>

                {/* Chat area */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ padding: 'var(--space-md)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-primary-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'var(--fw-bold)', color: 'var(--color-primary)' }}>{selectedContact.avatar}</div>
                        <div>
                            <p style={{ margin: 0, fontWeight: 'var(--fw-semibold)', fontSize: 'var(--fs-sm)', color: 'var(--color-heading)' }}>{selectedContact.name}</p>
                            <p style={{ margin: 0, fontSize: '10px', color: 'var(--color-muted)' }}>{selectedContact.role}</p>
                        </div>
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto', padding: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                        {msgs.map((m, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
                                <div style={{ maxWidth: '70%', padding: '10px 14px', borderRadius: m.from === 'me' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: m.from === 'me' ? 'var(--color-primary)' : 'var(--color-surface-2)', color: m.from === 'me' ? 'white' : 'var(--color-text)', fontSize: 'var(--fs-sm)' }}>
                                    <p style={{ margin: '0 0 4px 0' }}>{m.text}</p>
                                    <p style={{ margin: 0, fontSize: '10px', opacity: 0.7 }}>{m.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ padding: 'var(--space-md)', borderTop: '1px solid var(--color-border)', display: 'flex', gap: 'var(--space-sm)' }}>
                        <input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && send()}
                            placeholder="Écrire un message..."
                            style={{ flex: 1, padding: '10px 16px', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', background: 'var(--color-surface-2)', color: 'var(--color-text)', fontSize: 'var(--fs-sm)', outline: 'none' }}
                        />
                        <button onClick={send} className={styles.actionBtn} style={{ borderRadius: '50%', width: '42px', height: '42px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
