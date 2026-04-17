export const ROUTES = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  inscription: "/inscription",
  syncRole: "/sync-role",

  admin: {
    root:               "/Admin",
    dashboard:          "/Admin/dashboard",
    users:              "/Admin/gestion-utilisateurs",
    providers:          "/Admin/gestion-prestataires",
    subscriptions:      "/Admin/abonnements",
    statistics:         "/Admin/statistiques",
  },

  organizer: {
    root:               "/Organisateur",
    dashboard:          "/Organisateur/dashboard",
    events:             "/Organisateur/evenement",
    timeline:           "/Organisateur/timeline-tache",
    budget:             "/Organisateur/budget",
    messages:           "/Organisateur/message",
    invitations:        "/Organisateur/invitation",
    resources:          "/Organisateur/gestion-ressource",
    marketplace:        "/Organisateur/marketplace",
  },

  client: {
    root:               "/Client",
    dashboard:          "/Client/dashboard",
    events:             "/Client/evenement",
    timeline:           "/Client/timeline-tache",
    budget:             "/Client/budget",
    messages:           "/Client/message",
    invitations:        "/Client/invitation",
  },

  provider: {
    root:               "/Prestataire",
    dashboard:          "/Prestataire/dashboard",
    events:             "/Prestataire/evenement",
    timeline:           "/Prestataire/timeline-tache",
    messages:           "/Prestataire/message",
    resources:          "/Prestataire/gestion-ressource",
    marketplace:        "/Prestataire/marketplace",
  },

  shared: {
    settings:           "/shared/settings",
  },
} as const;
