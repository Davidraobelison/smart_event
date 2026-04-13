-- ============================================================
-- PROCÉDURE : Créer une dépendance entre 2 tâches
-- Appel : CALL timeline.sp_create_dependency(
--             p_task_id, p_depends_on_task_id, p_dependency_type
--         );
-- Fait :
--   1. Vérifie que les 2 tâches existent
--   2. Vérifie qu'elles sont dans le même event
--   3. Vérifie pas d'auto-dépendance
--   4. Vérifie pas de doublon
--   5. Vérifie pas de dépendance circulaire
--   6. Insère la dépendance
--   7. Bloque la tâche si la dépendance n'est pas done
-- ============================================================

CREATE OR REPLACE PROCEDURE timeline.sp_create_dependency(
    p_task_id             UUID,
    p_depends_on_task_id  UUID,
    p_dependency_type     VARCHAR(30) DEFAULT 'finish_to_start'
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_event_1     UUID;
    v_event_2     UUID;
    v_dep_status  VARCHAR(20);
    v_is_circular BOOLEAN;
BEGIN
    -- ──────────────────────────────────────
    -- VALIDATION
    -- ──────────────────────────────────────

    -- Pas d'auto-dépendance
    IF p_task_id = p_depends_on_task_id THEN
        RAISE EXCEPTION 'Une tâche ne peut pas dépendre d''elle-même';
    END IF;

    -- Les 2 tâches existent ?
    IF NOT EXISTS (SELECT 1 FROM timeline.tasks WHERE task_id = p_task_id) THEN
        RAISE EXCEPTION 'Tâche % inexistante', p_task_id;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM timeline.tasks WHERE task_id = p_depends_on_task_id) THEN
        RAISE EXCEPTION 'Tâche dépendance % inexistante', p_depends_on_task_id;
    END IF;

    -- Même event ?
    SELECT tp.event_id INTO v_event_1
    FROM timeline.tasks t
    JOIN timeline.timeline_phases tp ON tp.phase_id = t.phase_id
    WHERE t.task_id = p_task_id;

    SELECT tp.event_id INTO v_event_2
    FROM timeline.tasks t
    JOIN timeline.timeline_phases tp ON tp.phase_id = t.phase_id
    WHERE t.task_id = p_depends_on_task_id;

    IF v_event_1 != v_event_2 THEN
        RAISE EXCEPTION 'Les 2 tâches doivent appartenir au même événement';
    END IF;

    -- Doublon ?
    IF EXISTS (
        SELECT 1 FROM timeline.task_dependencies
        WHERE task_id = p_task_id AND depends_on_task_id = p_depends_on_task_id
    ) THEN
        RAISE EXCEPTION 'Cette dépendance existe déjà';
    END IF;

    -- Type valide ?
    IF p_dependency_type NOT IN ('finish_to_start', 'start_to_start') THEN
        RAISE EXCEPTION 'Type de dépendance invalide : %. Valeurs acceptées : finish_to_start, start_to_start', p_dependency_type;
    END IF;

    -- Dépendance circulaire ?
    -- On vérifie si p_depends_on_task_id dépend (directement ou indirectement) de p_task_id
    WITH RECURSIVE dep_chain AS (
        -- Point de départ : les dépendances directes de depends_on_task_id
        SELECT depends_on_task_id
        FROM timeline.task_dependencies
        WHERE task_id = p_depends_on_task_id

        UNION

        -- Remonter la chaîne
        SELECT td.depends_on_task_id
        FROM timeline.task_dependencies td
        JOIN dep_chain dc ON dc.depends_on_task_id = td.task_id
    )
    SELECT EXISTS (
        SELECT 1 FROM dep_chain WHERE depends_on_task_id = p_task_id
    ) INTO v_is_circular;

    IF v_is_circular THEN
        RAISE EXCEPTION 'Dépendance circulaire détectée ! La tâche % dépend déjà (directement ou indirectement) de %',
            p_depends_on_task_id, p_task_id;
    END IF;

    -- ──────────────────────────────────────
    -- INSERTION
    -- ──────────────────────────────────────

    INSERT INTO timeline.task_dependencies (task_id, depends_on_task_id, dependency_type)
    VALUES (p_task_id, p_depends_on_task_id, p_dependency_type);

    -- ──────────────────────────────────────
    -- BLOQUER LA TÂCHE SI NÉCESSAIRE
    -- ──────────────────────────────────────

    -- Si la tâche dont on dépend n'est pas done → bloquer la tâche
    SELECT status INTO v_dep_status
    FROM timeline.tasks
    WHERE task_id = p_depends_on_task_id;

    IF v_dep_status != 'done' THEN
        UPDATE timeline.tasks
        SET status = 'blocked'
        WHERE task_id = p_task_id
          AND status = 'todo';  -- on ne bloque que les tâches en 'todo'

        RAISE NOTICE 'Tâche % bloquée car % n''est pas terminée', p_task_id, p_depends_on_task_id;
    END IF;

    RAISE NOTICE 'Dépendance créée : % dépend de %', p_task_id, p_depends_on_task_id;
END;
$$;


-- #########################################################################################
-- TEST 

CALL timeline.sp_create_dependency(
    '82e656cf-fc7f-4060-ad39-2d45dd468a82',   -- 'UUID-TASK-CONFIRMER',    -- cette tâche
    '4ed12d34-f458-41cd-ba77-80c652531148'    -- 'UUID-TASK-CHOISIR'       -- dépend de celle-ci
);

-- VÉRIFICATION 1 : la dépendance existe ?
SELECT
    t1.title AS tache,
    t2.title AS depend_de,
    td.dependency_type
FROM timeline.task_dependencies td
JOIN timeline.tasks t1 ON t1.task_id = td.task_id
JOIN timeline.tasks t2 ON t2.task_id = td.depends_on_task_id;

-- VÉRIFICATION 2 : "Confirmer" est passée à 'blocked' ?
SELECT title, status 
FROM timeline.tasks WHERE task_id = '82e656cf-fc7f-4060-ad39-2d45dd468a82';       -- 'UUID-TASK-CONFIRMER'
-- Attendu : status = 'blocked'

-- VÉRIFICATION 3 : le trigger a enregistré le changement ?
SELECT
    t.title,
    th.field_changed,
    th.old_value,
    th.new_value,
    th.changed_at
FROM timeline.task_history th
JOIN timeline.tasks t ON t.task_id = th.task_id
ORDER BY th.changed_at;
-- Attendu : 1 ligne => "Confirmer le traiteur", status, todo => blocked