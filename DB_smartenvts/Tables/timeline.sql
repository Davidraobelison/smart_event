CREATE SCHEMA IF NOT EXISTS timeline;

-- ============================================================
--TIMELINE_PHASE
CREATE TABLE timeline.timeline_phases (
    phase_id      UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id      UUID          NOT NULL REFERENCES core.events(event_id) ON DELETE CASCADE,
    name          VARCHAR(255)  NOT NULL,
    description   TEXT,
    start_date    DATE          NOT NULL,
    end_date      DATE          NOT NULL,
    phase_order   INTEGER       NOT NULL,
    status        VARCHAR(50)   NOT NULL DEFAULT 'not_started',
    progress_pct  DECIMAL(5,2)  NOT NULL DEFAULT 0.00,
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);


ALTER TABLE timeline.timeline_phases
ADD CONSTRAINT chk_phase_dates CHECK (end_date >= start_date);

ALTER TABLE timeline.timeline_phases
ADD CONSTRAINT uq_phase_order_per_event UNIQUE (event_id, phase_order);

ALTER TABLE timeline.timeline_phases
ADD CONSTRAINT chk_timeline_phases_status CHECK (status IN ('not_started', 'in_progress', 'completed'));

ALTER TABLE timeline.timeline_phases
ADD CONSTRAINT chk_timeline_phase_progress CHECK (progress_pct BETWEEN 0 AND 100);

CREATE INDEX idx_phases_event  ON timeline.timeline_phases(event_id);
CREATE INDEX idx_phases_status ON timeline.timeline_phases(status);

-- ============================================================
--TASKS
CREATE TABLE timeline.tasks (
    task_id         UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    phase_id        UUID          NOT NULL REFERENCES timeline.timeline_phases(phase_id) ON DELETE CASCADE,
    assigned_to     UUID          REFERENCES core.users(user_id) ON DELETE SET NULL,
    created_by      UUID          NOT NULL REFERENCES core.users(user_id),
    provider_id     UUID          REFERENCES core.providers(provider_id) ON DELETE SET NULL,

    -- Attributs
    title           VARCHAR(255)  NOT NULL,
    description     TEXT,
    priority        VARCHAR(20)   NOT NULL DEFAULT 'medium',
    status          VARCHAR(20)   NOT NULL DEFAULT 'todo',
    due_date        DATE          NOT NULL,
    completed_at    TIMESTAMPTZ,
    estimated_hours DECIMAL(8,2),
    actual_hours    DECIMAL(8,2),
    created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ
);

ALTER TABLE timeline.tasks
ADD CONSTRAINT chk_completed_status CHECK (
        (status = 'done' AND completed_at IS NOT NULL)
        OR
        (status != 'done' AND completed_at IS NULL)
);

ALTER TABLE timeline.tasks
ADD CONSTRAINT chk_tasks_priority CHECK (priority IN ('low', 'medium', 'high', 'critical'));

ALTER TABLE timeline.tasks
ADD CONSTRAINT chk_tasks_status CHECK (status IN ('todo', 'in_progress', 'done', 'blocked', 'cancelled'));

CREATE INDEX idx_tasks_phase      ON timeline.tasks(phase_id);
CREATE INDEX idx_tasks_assigned   ON timeline.tasks(assigned_to);
CREATE INDEX idx_tasks_created_by ON timeline.tasks(created_by);
CREATE INDEX idx_tasks_provider   ON timeline.tasks(provider_id);
CREATE INDEX idx_tasks_status     ON timeline.tasks(status);
CREATE INDEX idx_tasks_priority   ON timeline.tasks(priority);
CREATE INDEX idx_tasks_due_date   ON timeline.tasks(due_date);

-- Index partiel : tâches en retard (requête fréquente pour Data/IA)
CREATE INDEX idx_tasks_overdue ON timeline.tasks(status, due_date)
    WHERE status NOT IN ('done', 'cancelled');

-- ============================================================
--TASK_DEPENDENCIES

CREATE TABLE timeline.task_dependencies (
    dependency_id       UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id             UUID        NOT NULL REFERENCES timeline.tasks(task_id) ON DELETE CASCADE,
    depends_on_task_id  UUID        NOT NULL REFERENCES timeline.tasks(task_id) ON DELETE CASCADE,
    dependency_type     VARCHAR(30) NOT NULL DEFAULT 'finish_to_start'
);

ALTER TABLE timeline.task_dependencies
ADD CONSTRAINT chk_dependency_type_task_dependencies CHECK (dependency_type IN ('finish_to_start', 'start_to_start'));

ALTER TABLE timeline.task_dependencies
ADD CONSTRAINT chk_no_self_dependency CHECK (task_id != depends_on_task_id);

ALTER TABLE timeline.task_dependencies
ADD CONSTRAINT uq_task_dependency UNIQUE (task_id, depends_on_task_id);

CREATE INDEX idx_deps_task       ON timeline.task_dependencies(task_id);
CREATE INDEX idx_deps_depends_on ON timeline.task_dependencies(depends_on_task_id);

-- ============================================================
--TASK_COMMENTS

CREATE TABLE timeline.task_comments (
    comment_id  UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id     UUID          NOT NULL REFERENCES timeline.tasks(task_id) ON DELETE CASCADE,
    user_id     UUID          NOT NULL REFERENCES core.users(user_id),
    content     TEXT          NOT NULL,
    created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_comments_task ON timeline.task_comments(task_id);
CREATE INDEX idx_comments_user ON timeline.task_comments(user_id);
CREATE INDEX idx_comments_date ON timeline.task_comments(created_at);

-- ============================================================
--TASK_HISTORY

CREATE TABLE timeline.task_history (
    history_id    UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id       UUID          NOT NULL REFERENCES timeline.tasks(task_id)
                                ON DELETE CASCADE,
    changed_by    UUID          NOT NULL REFERENCES core.users(user_id),
    field_changed VARCHAR(100)  NOT NULL,
    old_value     TEXT,
    new_value     TEXT,
    changed_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_history_task  ON timeline.task_history(task_id);
CREATE INDEX idx_history_user  ON timeline.task_history(changed_by);
CREATE INDEX idx_history_date  ON timeline.task_history(changed_at);
CREATE INDEX idx_history_field ON timeline.task_history(field_changed);
