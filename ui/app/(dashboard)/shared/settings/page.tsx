"use client";

import React, { useState } from "react";
import Card from "@/app/components/UI/Card/Card";
import Select from "@/app/components/UI/Select/Select";
import { useTranslation } from "@/app/lib/i18n/I18nContext";

import { useTheme } from "@/app/lib/theme/ThemeContext";
import { useAuth, UserRole } from "@/app/lib/auth/AuthContext";
import {
    User,
    Shield,
    Bell,
    Globe,
    Moon,
    Sun,
    ChevronRight,
    Save,
    ShieldCheck,
    Smartphone,
    Eye
} from "lucide-react";

export default function SettingsPage() {
    const { t, language, setLanguage } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const { user, login } = useAuth();
    const [activeSection, setActiveSection] = useState('profile');

    const sections = [
        { id: 'profile', label: 'Profil', icon: User, desc: 'Informations personnelles et avatar' },
        { id: 'display', label: 'Affichage', icon: Eye, desc: 'Thème sombre/clair et langue' },
        { id: 'security', label: 'Sécurité', icon: Shield, desc: 'Mot de passe et accès' },
        { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Gérer vos alertes' },
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'profile':
                return (
                    <Card style={{ padding: 'var(--space-lg)' }}>
                        <h3 style={{ fontSize: 'var(--fs-lg)', fontWeight: 'var(--fw-bold)', marginBottom: 'var(--space-lg)', color: 'var(--color-heading)' }}>
                            Mon Profil
                        </h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)', marginBottom: 'var(--space-xl)' }}>
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={user?.avatar || "/images/avatars/avatar-default.jpg"}
                                    style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-lg)', objectFit: 'cover', border: '2px solid var(--color-primary)' }}
                                    alt="Avatar"
                                />
                            </div>
                            <div>
                                <button style={{ padding: '8px 16px', borderRadius: 'var(--radius-sm)', border: 'none', backgroundColor: 'var(--color-surface-2)', color: 'var(--color-heading)', fontWeight: 'bold', cursor: 'pointer' }}>
                                    Changer l'image
                                </button>
                                <p style={{ fontSize: 'var(--fs-xxs)', color: 'var(--color-muted)', marginTop: 'var(--space-xs)' }}>JPG, PNG. Max 2Mo.</p>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-md)' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xxs)' }}>
                                <label style={{ fontSize: 'var(--fs-sm)', fontWeight: 'bold' }}>Nom complet</label>
                                <input
                                    type="text"
                                    defaultValue={user?.name}
                                    style={{ padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-2)', outline: 'none' }}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xxs)' }}>
                                <label style={{ fontSize: 'var(--fs-sm)', fontWeight: 'bold' }}>Email</label>
                                <input
                                    type="email"
                                    defaultValue={user?.email || (user?.name ? `${user.name.toLowerCase().replace(' ', '.')}@example.com` : '')}
                                    style={{ padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-2)', outline: 'none' }}
                                />
                            </div>
                        </div>

                        <div style={{ marginTop: 'var(--space-xl)', paddingTop: 'var(--space-lg)', borderTop: '1px solid var(--color-border)', display: 'flex', justifySelf: 'flex-end' }}>
                            <button style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-xs)', padding: '10px 24px', borderRadius: 'var(--radius-md)', border: 'none', backgroundColor: 'var(--color-primary)', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
                                <Save size={18} /> Enregistrer
                            </button>
                        </div>
                    </Card>
                );
            case 'display':
                return (
                    <Card style={{ padding: 'var(--space-lg)' }}>
                        <h3 style={{ fontSize: 'var(--fs-lg)', fontWeight: 'var(--fw-bold)', marginBottom: 'var(--space-lg)', color: 'var(--color-heading)' }}>
                            Affichage & Langue
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ maxWidth: '70%' }}>
                                    <p style={{ fontWeight: 'bold', margin: 0 }}>Mode sombre</p>
                                    <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-muted)', margin: 0 }}>Basculez entre une interface claire ou sombre.</p>
                                </div>
                                <button
                                    onClick={toggleTheme}
                                    style={{
                                        width: '56px',
                                        height: '28px',
                                        borderRadius: '99px',
                                        border: 'none',
                                        backgroundColor: theme === 'dark' ? 'var(--color-primary)' : 'var(--color-surface-2)',
                                        position: 'relative',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <div style={{
                                        position: 'absolute',
                                        top: '4px',
                                        left: theme === 'dark' ? '32px' : '4px',
                                        width: '20px',
                                        height: '20px',
                                        borderRadius: '50%',
                                        backgroundColor: '#fff',
                                        boxShadow: 'var(--shadow-sm)',
                                        transition: 'all 0.3s cubic-bezier(0.2, 0.9, 0.2, 1)'
                                    }} />
                                </button>
                            </div>

                            <div style={{ height: '1px', backgroundColor: 'var(--color-border)' }} />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ maxWidth: '70%' }}>
                                    <p style={{ fontWeight: 'bold', margin: 0 }}>Langue du système</p>
                                    <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--color-muted)', margin: 0 }}>Traductions et formats régionaux.</p>
                                </div>
                                <div style={{ width: '200px' }}>
                                    <Select
                                        value={language}
                                        onChange={(val) => setLanguage(val as any)}
                                        options={[
                                            { value: 'fr', label: 'Français (FR)' },
                                            { value: 'en', label: 'English (EN)' }
                                        ]}
                                        fullWidth={true}
                                    />
                                </div>
                            </div>

                        </div>
                    </Card>
                );
            case 'security':
                return (
                    <Card style={{ padding: 'var(--space-lg)' }}>
                        <h3 style={{ fontSize: 'var(--fs-lg)', fontWeight: 'var(--fw-bold)', marginBottom: 'var(--space-lg)', color: 'var(--color-heading)', display: 'flex', alignItems: 'center', gap: 'var(--space-xs)' }}>
                            <ShieldCheck size={22} color="var(--color-primary)" /> Sécurité
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                            <div style={{ padding: 'var(--space-md)', backgroundColor: 'rgba(255, 147, 79, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 147, 79, 0.2)' }}>
                                <p style={{ fontSize: 'var(--fs-xxs)', fontWeight: 'bold', color: 'var(--color-primary)', textTransform: 'uppercase', marginBottom: '4px' }}>Dernière connexion</p>
                                <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text)' }}>Aujourd'hui à 11:54 (Chrome sur Windows)</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginTop: 'var(--space-sm)' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xxs)' }}>
                                    <label style={{ fontSize: 'var(--fs-sm)', fontWeight: 'bold' }}>Mot de passe actuel</label>
                                    <input type="password" placeholder="••••••••" style={{ padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-2)', outline: 'none' }} />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xxs)' }}>
                                        <label style={{ fontSize: 'var(--fs-sm)', fontWeight: 'bold' }}>Nouveau mot de passe</label>
                                        <input type="password" placeholder="••••••••" style={{ padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-2)', outline: 'none' }} />
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xxs)' }}>
                                        <label style={{ fontSize: 'var(--fs-sm)', fontWeight: 'bold' }}>Confirmer</label>
                                        <input type="password" placeholder="••••••••" style={{ padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface-2)', outline: 'none' }} />
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: 'var(--space-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                                <button style={{ padding: '12px', borderRadius: 'var(--radius-md)', border: 'none', backgroundColor: 'var(--color-primary)', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
                                    Mettre à jour le mot de passe
                                </button>
                                <button style={{ background: 'none', border: 'none', color: 'var(--color-danger)', fontSize: 'var(--fs-xxs)', fontWeight: 'bold', cursor: 'pointer', textAlign: 'center' }}>
                                    Déconnecter tous les autres appareils
                                </button>
                            </div>
                        </div>
                    </Card>
                );
            case 'notifications':
                return (
                    <Card style={{ padding: 'var(--space-lg)' }}>
                        <h3 style={{ fontSize: 'var(--fs-lg)', fontWeight: 'var(--fw-bold)', marginBottom: 'var(--space-lg)', color: 'var(--color-heading)' }}>
                            Préférences de notifications
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                            {[
                                { label: 'Alertes par Email', desc: 'Recevoir les résumés quotidiens.', icon: Globe },
                                { label: 'Notifications Push', desc: 'Alertes en temps réel.', icon: Bell },
                                { label: 'Messages SMS', desc: 'Alertes critiques événement J-J.', icon: Smartphone },
                            ].map((item, idx) => (
                                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center' }}>
                                        <div style={{ padding: '10px', backgroundColor: 'var(--color-surface-2)', borderRadius: 'var(--radius-md)', color: 'var(--color-muted)' }}>
                                            <item.icon size={20} />
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: 'bold', margin: 0 }}>{item.label}</p>
                                            <p style={{ fontSize: 'var(--fs-xxs)', color: 'var(--color-muted)', margin: 0 }}>{item.desc}</p>
                                        </div>
                                    </div>
                                    <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', accentColor: 'var(--color-primary)', cursor: 'pointer' }} />
                                </div>
                            ))}
                        </div>
                    </Card>
                );
            default:
                return null;
        }
    };

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
            <header>
                <h1 style={{ fontSize: 'var(--fs-xxl)', fontWeight: 'var(--fw-bold)', color: 'var(--color-heading)', margin: 0 }}>{t("common.settings")}</h1>
                <p style={{ color: 'var(--color-muted)', marginTop: '4px' }}>Configurez votre environnement de travail et vos préférences.</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 320px) 1fr', gap: 'var(--space-xl)', alignItems: 'start' }}>
                <aside style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
                    {sections.map(s => {
                        const isActive = activeSection === s.id;
                        return (
                            <button
                                key={s.id}
                                onClick={() => setActiveSection(s.id)}
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--space-md)',
                                    padding: '16px',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid transparent',
                                    backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                                    color: isActive ? '#fff' : 'var(--color-text)',
                                    textAlign: 'left',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    boxShadow: isActive ? '0 10px 20px -5px rgba(255, 147, 79, 0.4)' : 'none'
                                }}
                                onMouseEnter={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.backgroundColor = 'var(--color-surface-2)';
                                        e.currentTarget.style.borderColor = 'var(--color-border)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isActive) {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.borderColor = 'transparent';
                                    }
                                }}
                            >
                                <div style={{
                                    padding: '10px',
                                    borderRadius: '12px',
                                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'var(--color-surface-2)',
                                    color: isActive ? '#fff' : 'var(--color-primary)'
                                }}>
                                    <s.icon size={20} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontWeight: 'bold', fontSize: 'var(--fs-sm)', margin: 0 }}>{s.label}</p>
                                    <p style={{ fontSize: '10px', opacity: 0.8, margin: 0 }}>{s.desc}</p>
                                </div>
                                {isActive && <ChevronRight size={16} style={{ opacity: 0.6 }} />}
                            </button>
                        );
                    })}

                    <div style={{ marginTop: 'var(--space-xl)', padding: 'var(--space-md)', borderRadius: 'var(--radius-lg)', backgroundColor: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
                        <p style={{ fontSize: 'var(--fs-xxs)', fontWeight: 'bold', color: 'var(--color-muted)', textTransform: 'uppercase', marginBottom: 'var(--space-xs)' }}>Rôle actuel</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }} />
                            <span style={{ fontWeight: 'bold', fontSize: 'var(--fs-sm)' }}>{user?.role}</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: 'var(--space-md)' }}>
                            {Object.values(UserRole).map(role => (
                                <button
                                    key={role}
                                    onClick={() => login(role)}
                                    style={{
                                        padding: '4px 8px',
                                        borderRadius: '6px',
                                        border: '1px solid var(--color-border)',
                                        backgroundColor: user?.role === role ? 'rgba(255, 147, 79, 0.1)' : 'var(--color-surface)',
                                        color: user?.role === role ? 'var(--color-primary)' : 'var(--color-muted)',
                                        fontSize: '9px',
                                        fontWeight: 'bold',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                <main style={{ minHeight: '500px' }}>
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}

