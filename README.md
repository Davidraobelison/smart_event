# SmartEvent

Application web intelligente dédiée à la gestion et à l'organisation de mariages — de la planification initiale jusqu'au suivi complet de l'événement.

---

## Aperçu

SmartEvent est une plateforme multi-rôles qui connecte les couples (clients), les organisateurs d'événements et les prestataires de services dans un espace de travail collaboratif. Elle centralise la gestion du budget, le suivi des tâches, les invitations, la messagerie et les fournisseurs.

## Stack technique

| Couche | Technologies |
|--------|-------------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS 4 |
| Auth | Clerk (gestion des rôles via `publicMetadata`) |
| Backend | Spring Boot 4 (Java 17), Spring Data JPA |
| Base de données | PostgreSQL (schémas `core` & `timeline`) |
| Build | Maven (backend), npm/yarn (frontend) |

## Structure du projet

```
smart_event/
├── ui/                     # Application Next.js (frontend)
│   ├── app/
│   │   ├── (dashboard)/
│   │   │   ├── Admin/      # Espace administrateur
│   │   │   ├── Client/     # Espace couple / client
│   │   │   └── Organisateur/ # Espace organisateur
│   │   ├── components/     # Composants réutilisables (UI, Layout)
│   │   └── lib/            # Auth context, i18n, thème
│   └── middleware.ts        # Protection des routes via Clerk
│
├── server/                 # API Spring Boot (backend)
│   └── src/main/java/com/smartevent/server/
│
└── DB_smartenvts/          # Scripts SQL PostgreSQL
    ├── Tables/
    │   ├── core.sql        # Utilisateurs, prestataires, événements
    │   └── timeline.sql    # Phases, tâches, dépendances, historique
    ├── procedure/          # Procédures stockées
    ├── trigger/            # Triggers
    └── MOCK_DATA.sql
```

## Rôles utilisateurs

| Rôle | Accès |
|------|-------|
| **Admin** | Gestion globale — utilisateurs, prestataires, abonnements, statistiques |
| **Client** | Tableau de bord événement, invitations, budget, timeline de tâches |
| **Organisateur** | Suivi des événements, ressources, marketplace prestataires |
| **Prestataire** | Profil, disponibilités, demandes |

## Fonctionnalités principales

- **Gestion d'événements** — Création et suivi du cycle de vie du mariage
- **Timeline & Tâches** — Phases planifiées, tâches avec priorités, dépendances et commentaires
- **Budget** — Suivi des dépenses par événement
- **Marketplace prestataires** — Mise en relation avec traiteurs, photographes, DJ, fleuristes, etc.
- **Invitations & RSVP** — Gestion des invités
- **Messagerie** — Communication entre rôles
- **Calendrier** — Visualisation via React Big Calendar
- **Internationalisation** — Architecture i18n prête (UI en français)

## Installation & démarrage

### Prérequis

- Node.js >= 18
- Java 17
- PostgreSQL

### Frontend

```bash
cd ui
npm install       # ou yarn
npm run dev       # Démarre sur http://localhost:3000
```

### Backend

```bash
cd server
./mvnw spring-boot:run
```

### Base de données

Exécuter les scripts dans l'ordre :

```bash
psql -U <user> -d <database> -f DB_smartenvts/Tables/core.sql
psql -U <user> -d <database> -f DB_smartenvts/Tables/timeline.sql
psql -U <user> -d <database> -f DB_smartenvts/MOCK_DATA.sql
```

## Variables d'environnement

Créer un fichier `.env.local` dans `ui/` :

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

Pour le backend, configurer `server/src/main/resources/application.properties` :

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/<database>
spring.datasource.username=<user>
spring.datasource.password=<password>
spring.jpa.hibernate.ddl-auto=validate
```

## Scripts utiles (frontend)

```bash
npm run dev      # Développement
npm run build    # Build de production
npm run start    # Démarrer en production
npm run lint     # Linter ESLint
```

---

> Projet développé par l'équipe SmartEvent.
