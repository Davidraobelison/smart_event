import { UserRole } from "@/providers/AuthProvider";
import { User, Calendar, Briefcase, Shield } from "lucide-react";
import type { ComponentType } from "react";

export interface RoleOption {
  id: UserRole;
  label: string;
  desc: string;
  Icon: ComponentType<{ size?: number; color?: string }>;
  color: string;
  bg: string;
  redirect: string;
}

export const demoRoles: RoleOption[] = [
  {
    id: UserRole.CLIENT,
    label: "Client (Marié·e)",
    desc: "Suivez l'organisation de votre événement spécial.",
    Icon: User,
    color: "#10b981",
    bg: "rgba(16,185,129,0.1)",
    redirect: "/Client/dashboard",
  },
  {
    id: UserRole.ORGANIZER,
    label: "Organisateur",
    desc: "Gérez plusieurs événements et coordonnez vos équipes.",
    Icon: Calendar,
    color: "var(--color-primary)",
    bg: "rgba(255,147,79,0.1)",
    redirect: "/Organisateur/dashboard",
  },
  {
    id: UserRole.PROVIDER,
    label: "Prestataire",
    desc: "Proposez vos services et recevez des missions.",
    Icon: Briefcase,
    color: "#7c5cff",
    bg: "rgba(124,92,255,0.1)",
    redirect: "/Prestataire/dashboard",
  },
  {
    id: UserRole.ADMIN,
    label: "Administrateur",
    desc: "Supervisez et gérez l'ensemble de la plateforme.",
    Icon: Shield,
    color: "#ef5350",
    bg: "rgba(239,83,80,0.1)",
    redirect: "/Admin/dashboard",
  },
];
