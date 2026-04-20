import {
  LayoutDashboard, Calendar, CheckSquare, PieChart, Users,
  MessageSquare, Briefcase, UserCheck, TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type RoleSlug = "organisateur" | "prestataire" | "client" | "admin";

export type FeatureSlug =
  | "dashboard" | "evenement" | "timeline-tache" | "budget"
  | "message"   | "invitation" | "gestion-ressource" | "marketplace"
  | "gestion-utilisateurs" | "abonnements" | "gestion-prestataires" | "statistiques";

export interface NavItem {
  feature:  FeatureSlug;
  labelKey: string;
  icon:     LucideIcon;
}

export interface RoleConfig {
  label:    string;
  features: FeatureSlug[];
  nav:      NavItem[];
}

export const ROLE_ENUM_TO_SLUG: Record<string, RoleSlug> = {
  ORGANIZER: "organisateur",
  PROVIDER:  "prestataire",
  CLIENT:    "client",
  ADMIN:     "admin",
};

export const ROLE_SLUG_TO_ENUM: Record<RoleSlug, string> = {
  organisateur: "ORGANIZER",
  prestataire:  "PROVIDER",
  client:       "CLIENT",
  admin:        "ADMIN",
};

export const ROLES_CONFIG: Record<RoleSlug, RoleConfig> = {
  organisateur: {
    label: "Organisateur",
    features: ["dashboard", "evenement", "timeline-tache", "budget", "message", "invitation", "gestion-ressource", "marketplace"],
    nav: [
      { feature: "dashboard",         labelKey: "nav.dashboard",         icon: LayoutDashboard },
      { feature: "evenement",         labelKey: "nav.evenement",         icon: Calendar        },
      { feature: "timeline-tache",    labelKey: "nav.timeline-tache",    icon: CheckSquare     },
      { feature: "budget",            labelKey: "nav.budget",            icon: PieChart        },
      { feature: "message",           labelKey: "nav.message",           icon: MessageSquare   },
      { feature: "invitation",        labelKey: "nav.invitation",        icon: Users           },
      { feature: "gestion-ressource", labelKey: "nav.gestion-ressource", icon: Briefcase       },
      { feature: "marketplace",       labelKey: "nav.marketplace",       icon: TrendingUp      },
    ],
  },

  prestataire: {
    label: "Prestataire",
    features: ["dashboard", "evenement", "timeline-tache", "message", "gestion-ressource", "marketplace"],
    nav: [
      { feature: "dashboard",         labelKey: "nav.dashboard",         icon: LayoutDashboard },
      { feature: "evenement",         labelKey: "nav.evenement",         icon: Calendar        },
      { feature: "timeline-tache",    labelKey: "nav.timeline-tache",    icon: CheckSquare     },
      { feature: "message",           labelKey: "nav.message",           icon: MessageSquare   },
      { feature: "gestion-ressource", labelKey: "nav.gestion-ressource", icon: Briefcase       },
      { feature: "marketplace",       labelKey: "nav.marketplace",       icon: TrendingUp      },
    ],
  },

  client: {
    label: "Client",
    features: ["dashboard", "evenement", "timeline-tache", "budget", "message", "invitation"],
    nav: [
      { feature: "dashboard",      labelKey: "nav.dashboard",      icon: LayoutDashboard },
      { feature: "evenement",      labelKey: "nav.evenement",      icon: Calendar        },
      { feature: "timeline-tache", labelKey: "nav.timeline-tache", icon: CheckSquare     },
      { feature: "budget",         labelKey: "nav.budget",         icon: PieChart        },
      { feature: "message",        labelKey: "nav.message",        icon: MessageSquare   },
      { feature: "invitation",     labelKey: "nav.invitation",     icon: Users           },
    ],
  },

  admin: {
    label: "Admin",
    features: ["dashboard", "gestion-utilisateurs", "abonnements", "gestion-prestataires", "statistiques"],
    nav: [
      { feature: "dashboard",            labelKey: "nav.dashboard",            icon: LayoutDashboard },
      { feature: "gestion-utilisateurs", labelKey: "nav.gestion-utilisateurs", icon: Users           },
      { feature: "abonnements",          labelKey: "nav.abonnements",          icon: UserCheck       },
      { feature: "gestion-prestataires", labelKey: "nav.gestion-prestataires", icon: Briefcase       },
      { feature: "statistiques",         labelKey: "nav.statistiques",         icon: PieChart        },
    ],
  },
};
