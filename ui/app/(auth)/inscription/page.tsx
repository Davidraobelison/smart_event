"use client";

import React from "react";
import Link from "next/link";
import { User, Calendar, Briefcase, ChevronRight, Shield } from "lucide-react";

export default function InscriptionPage() {
    const roles = [
        {
            id: "client",
            label: "Client (Marié·e)",
            desc: "Suivez l'organisation de votre événement spécial.",
            Icon: User,
            color: "#10b981",
            bg: "rgba(16,185,129,0.1)",
        },
        {
            id: "organisateur",
            label: "Organisateur",
            desc: "Gérez plusieurs événements et coordonnez vos équipes.",
            Icon: Calendar,
            color: "#ff934f",
            bg: "rgba(255,147,79,0.1)",
        },
        {
            id: "prestataire",
            label: "Prestataire",
            desc: "Proposez vos services et recevez des missions.",
            Icon: Briefcase,
            color: "#7c5cff",
            bg: "rgba(124,92,255,0.1)",
        },
        {
            id: "admin",
            label: "Administrateur",
            desc: "Supervisez et gérez l'ensemble de la plateforme.",
            Icon: Shield,
            color: "#ef5350",
            bg: "rgba(239,83,80,0.1)",
        }
    ];

    return (
        <div style={{ backgroundColor: "var(--bg-deep)", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
            <div style={{ maxWidth: "800px", width: "100%", textAlign: "center", marginBottom: "3rem" }}>
                <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "white", marginBottom: "1rem" }}>
                    Choisissez votre rôle
                </h1>
                <p style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "1.2rem" }}>
                    Sélectionnez le type de compte que vous souhaitez créer pour continuer vers l'inscription.
                </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem", width: "100%", maxWidth: "1200px" }}>
                {roles.map((role) => (
                    <Link
                        key={role.id}
                        href={`/sign-up?role=${role.id}`}
                        style={{ textDecoration: "none" }}
                    >
                        <div style={{
                            backgroundColor: "var(--bg-surface)",
                            borderRadius: "16px",
                            padding: "2rem",
                            border: "1px solid rgba(255,255,255,0.1)",
                            transition: "transform 0.2s, box-shadow 0.2s",
                            cursor: "pointer",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column"
                        }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = "translateY(-5px)";
                                e.currentTarget.style.boxShadow = `0 10px 20px -10px ${role.color}`;
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = "none";
                                e.currentTarget.style.boxShadow = "none";
                            }}>
                            <div style={{
                                height: "80px",
                                width: "80px",
                                background: role.bg,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: "1.5rem"
                            }}>
                                <role.Icon size={40} color={role.color} />
                            </div>
                            <h3 style={{ color: "white", fontSize: "1.5rem", marginBottom: "1rem" }}>{role.label}</h3>
                            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", marginBottom: "1.5rem", flexGrow: 1 }}>{role.desc}</p>

                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                color: role.color,
                                fontWeight: "bold",
                                marginTop: "auto"
                            }}>
                                Continuer <ChevronRight size={20} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div style={{ marginTop: "3rem" }}>
                <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "1rem" }}>
                    ← Retour à l'accueil
                </Link>
            </div>
        </div>
    );
}
