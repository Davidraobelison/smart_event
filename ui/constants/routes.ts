export const ROUTES = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  inscription: "/inscription",
  syncRole: "/sync-role",

  admin: {
    root:               "/admin",
    dashboard:          "/admin/dashboard",
    users:              "/admin/gestion-utilisateurs",
    providers:          "/admin/gestion-prestataires",
    subscriptions:      "/admin/abonnements",
    statistics:         "/admin/statistiques",
  },

  organizer: {
    root:               "/organisateur",
    dashboard:          "/organisateur/dashboard",
    events:             "/organisateur/evenement",
    timeline:           "/organisateur/timeline-tache",
    budget:             "/organisateur/budget",
    messages:           "/organisateur/message",
    invitations:        "/organisateur/invitation",
    resources:          "/organisateur/gestion-ressource",
    marketplace:        "/organisateur/marketplace",
  },

  client: {
    root:               "/client",
    dashboard:          "/client/dashboard",
    events:             "/client/evenement",
    timeline:           "/client/timeline-tache",
    budget:             "/client/budget",
    messages:           "/client/message",
    invitations:        "/client/invitation",
  },

  provider: {
    root:               "/prestataire",
    dashboard:          "/prestataire/dashboard",
    events:             "/prestataire/evenement",
    timeline:           "/prestataire/timeline-tache",
    messages:           "/prestataire/message",
    resources:          "/prestataire/gestion-ressource",
    marketplace:        "/prestataire/marketplace",
  },

  shared: {
    settings:           "/shared/settings",
  },
} as const;
