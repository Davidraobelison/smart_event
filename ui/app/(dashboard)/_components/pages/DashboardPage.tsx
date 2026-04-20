"use client";

import { useAuth } from "@/hooks/useAuth";
import { UserRole } from "@/providers/AuthProvider";
import AdminDashboard       from "./dashboards/AdminDashboard";
import ClientDashboard      from "./dashboards/ClientDashboard";
import OrganizerDashboard   from "./dashboards/OrganizerDashboard";
import PrestataireDashboard from "./dashboards/PrestataireDashboard";

export default function DashboardPage() {
    const { user } = useAuth();

    switch (user?.role) {
        case UserRole.ADMIN:    return <AdminDashboard />;
        case UserRole.CLIENT:   return <ClientDashboard />;
        case UserRole.ORGANIZER: return <OrganizerDashboard />;
        case UserRole.PROVIDER:  return <PrestataireDashboard />;
        default:                 return null;
    }
}
