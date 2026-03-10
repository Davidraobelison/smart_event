-- # core est le schema des donnee partager entre les autres schema
CREATE SCHEMA IF NOT EXISTS core;

-- USER
CREATE TABLE core.users (
    user_id     UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name   VARCHAR(255)  NOT NULL,
    email       VARCHAR(255)  NOT NULL UNIQUE,
    role        VARCHAR(50)   NOT NULL,
    phone       VARCHAR(50),
    created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

-- la contrainte UNIQUE pour email cree implicitement deja une indexation
-- CREATE INDEX idx_users_email ON timeline.users(email);

ALTER TABLE core.users
ADD CONSTRAINT chk_user_role CHECK (role IN ('admin', 'organizer', 'client', 'assistant'));

-- pour verifier si l'implementation de check sont reussi on fait :
-- SELECT constraint_name, check_clause
-- FROM information_schema.check_constraints
-- WHERE constraint_name = 'chk_user_role';

CREATE INDEX idx_users_role  ON core.users(role);

-- PROVIDER
CREATE TABLE core.providers (
    provider_id   UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name  VARCHAR(255)  NOT NULL,
    service_type  VARCHAR(100)  NOT NULL,
    email  VARCHAR(255) NOT NULL UNIQUE,
    phone  VARCHAR(50) NOT NULL,
    level         INTEGER       NOT NULL DEFAULT 1,
    region        VARCHAR(255),
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

ALTER TABLE core.providers
ADD CONSTRAINT chk_service_type CHECK (service_type IN ('caterer', 'photographer', 'videographer',
                                    'dj', 'florist', 'decorator', 'baker',
                                    'transport', 'security', 'mc_host',
                                    'wedding_planner', 'venue_manager', 'other'));
ALTER TABLE core.providers
ADD CONSTRAINT chk_level CHECK (level BETWEEN 1 AND 5);

CREATE INDEX idx_providers_phone   ON core.providers(phone);
CREATE INDEX idx_providers_service ON core.providers(service_type);
CREATE INDEX idx_providers_region  ON core.providers(region);
CREATE INDEX idx_providers_level   ON core.providers(level);

--EVENTS
CREATE TABLE core.events (
    event_id      UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    created_by    UUID          NOT NULL REFERENCES core.users(user_id),
    title         VARCHAR(255)  NOT NULL,
    event_date    DATE          NOT NULL,
    location      VARCHAR(255),
    guests_count  INTEGER       CHECK (guests_count > 0),
    status        VARCHAR(50)   NOT NULL DEFAULT 'planning',
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ
);

ALTER TABLE core.events
ADD CONSTRAINT chk_event_status CHECK (status IN ('planning', 'in_progress', 'completed', 'cancelled'));

CREATE INDEX idx_events_created_by ON core.events(created_by);
CREATE INDEX idx_events_status     ON core.events(status);
CREATE INDEX idx_events_date       ON core.events(event_date);


-- ============================================================
-- DÉCISIONS À REVOIR PLUS TARD
-- ============================================================
-- 1. providers.phone : actuellement NOT NULL → revoir si optionnel
-- 2. events.updated_at : pas de mise à jour auto → choisir Option A (backend) ou B (trigger)
-- ============================================================