-- ============================================================
-- PROCÉDURE : Mettre à jour le status d'une tâche
-- Appel : CALL timeline.sp_update_task_status(
--             p_task_id, p_new_status, p_changed_by
--         );
-- Fait :
--   1. Vérifie que la tâche existe
--   2. Vérifie que la transition est valide
--   3. Vérifie les dépendances si on veut démarrer
--   4. Met à jour le status
--   5. Remplit completed_at si done
--   6. Recalcule le progress de la phase
--   7. Débloque les tâches dépendantes si done
--      → Le trigger enregistre tout dans task_history
-- ============================================================

CREATE OR REPLACE PROCEDURE timeline.sp_update_task_status(
    p_task_id      UUID,
    p_new_status   VARCHAR(20),
    p_changed_by   UUID
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_current_status   VARCHAR(20);
    v_phase_id         UUID;
    v_total            INTEGER;
    v_done             INTEGER;
    v_new_progress     DECIMAL(5,2);
    v_new_phase_status VARCHAR(50);
    v_dep              RECORD;
    v_all_deps_done    BOOLEAN;
BEGIN
    -- ──────────────────────────────────────
    -- VALIDATION
    -- ──────────────────────────────────────

    -- La tâche existe ?
    SELECT status, phase_id
    INTO v_current_status, v_phase_id
    FROM timeline.tasks
    WHERE task_id = p_task_id;

    IF v_current_status IS NULL THEN
        RAISE EXCEPTION 'Tâche % inexistante', p_task_id;
    END IF;

    -- Même status ?
    IF v_current_status = p_new_status THEN
        RAISE NOTICE 'La tâche est déjà en status %', p_new_status;
        RETURN;
    END IF;

    -- Status valide ?
    IF p_new_status NOT IN ('todo', 'in_progress', 'done', 'blocked', 'cancelled') THEN
        RAISE EXCEPTION 'Status invalide : %', p_new_status;
    END IF;

    -- Transition valide ?
    -- Règles :
    --   todo         → in_progress, blocked, cancelled
    --   in_progress  → done, blocked, cancelled
    --   blocked      → todo (quand débloqué), cancelled
    --   done         → RIEN (une tâche terminée ne revient pas)
    --   cancelled    → todo (on peut réactiver)
    IF v_current_status = 'done' THEN
        RAISE EXCEPTION 'Une tâche terminée ne peut pas changer de status (actuel: done, demandé: %)', p_new_status;
    END IF;

    IF v_current_status = 'blocked' AND p_new_status NOT IN ('todo', 'cancelled') THEN
        RAISE EXCEPTION 'Une tâche bloquée ne peut passer qu''à todo ou cancelled (demandé: %)', p_new_status;
    END IF;

    -- Si on veut passer à in_progress ou done → vérifier les dépendances
    IF p_new_status IN ('in_progress', 'done') THEN
        IF EXISTS (
            SELECT 1
            FROM timeline.task_dependencies td
            JOIN timeline.tasks t ON t.task_id = td.depends_on_task_id
            WHERE td.task_id = p_task_id
              AND t.status != 'done'
        ) THEN
            RAISE EXCEPTION 'Impossible : des dépendances ne sont pas terminées';
        END IF;
    END IF;

    -- ──────────────────────────────────────
    -- MISE À JOUR
    -- ──────────────────────────────────────

    -- Mettre à jour le status + completed_at
    -- → Le trigger trg_tasks_history enregistre automatiquement le changement
    IF p_new_status = 'done' THEN
        UPDATE timeline.tasks
        SET status       = p_new_status,
            completed_at = NOW(),
            updated_at   = NOW()
        WHERE task_id = p_task_id;
    ELSE
        UPDATE timeline.tasks
        SET status       = p_new_status,
            completed_at = NULL,
            updated_at   = NOW()
        WHERE task_id = p_task_id;
    END IF;

    RAISE NOTICE 'Tâche % : % → %', p_task_id, v_current_status, p_new_status;

    -- ──────────────────────────────────────
    -- DÉBLOQUER LES DÉPENDANCES (si done)
    -- ──────────────────────────────────────

    IF p_new_status = 'done' THEN
        FOR v_dep IN
            SELECT td.task_id AS dependent_task_id
            FROM timeline.task_dependencies td
            WHERE td.depends_on_task_id = p_task_id
        LOOP
            -- Toutes les dépendances de cette tâche sont-elles done ?
            SELECT NOT EXISTS (
                SELECT 1
                FROM timeline.task_dependencies td2
                JOIN timeline.tasks t2 ON t2.task_id = td2.depends_on_task_id
                WHERE td2.task_id = v_dep.dependent_task_id
                  AND t2.status != 'done'
            ) INTO v_all_deps_done;

            IF v_all_deps_done THEN
                UPDATE timeline.tasks
                SET status     = 'todo',
                    updated_at = NOW()
                WHERE task_id = v_dep.dependent_task_id
                  AND status  = 'blocked';

                RAISE NOTICE 'Tâche % débloquée !', v_dep.dependent_task_id;
            END IF;
        END LOOP;
    END IF;

    -- ──────────────────────────────────────
    -- RECALCUL DE LA PHASE
    -- ──────────────────────────────────────

    SELECT
        COUNT(*),
        COUNT(*) FILTER (WHERE status = 'done')
    INTO v_total, v_done
    FROM timeline.tasks
    WHERE phase_id = v_phase_id
      AND status != 'cancelled';

    IF v_total = 0 THEN
        v_new_progress     := 0;
        v_new_phase_status := 'not_started';
    ELSIF v_done = v_total THEN
        v_new_progress     := 100;
        v_new_phase_status := 'completed';
    ELSE
        v_new_progress     := ROUND((v_done * 100.0) / v_total, 2);
        v_new_phase_status := 'in_progress';
    END IF;

    UPDATE timeline.timeline_phases
    SET progress_pct = v_new_progress,
        status       = v_new_phase_status
    WHERE phase_id   = v_phase_id;

    RAISE NOTICE 'Phase mise à jour : progress = % %%, status = %', v_new_progress, v_new_phase_status;
END;
$$;

--######################################################################################################
-- TEST 

-- Cyndy commence "Réserver la salle"
CALL timeline.sp_update_task_status(
    'd115c739-4e45-4fe2-aaa9-fc9a4e0a4e2e',   --'UUID-TASK-SALLE'
    'in_progress',
    '3864987a-7562-4e04-bcf9-81d5d048be6e' -- UUID Cyndy
);


-- VÉRIFICATION trigger tokony nanao Maj 
SELECT * 
FROM timeline.task_history ORDER BY changed_at;
-- Attendu : nouvelle ligne → status todo → in_progress

-- ────────────────────────────────────────

-- Cyndy termine "Réserver la salle"
CALL timeline.sp_update_task_status(
    'd115c739-4e45-4fe2-aaa9-fc9a4e0a4e2e',
    'done',
    '3864987a-7562-4e04-bcf9-81d5d048be6e'
);

-- VÉRIFICATION : completed_at doit être rempli
SELECT title, status, completed_at 
FROM timeline.tasks WHERE task_id = 'd115c739-4e45-4fe2-aaa9-fc9a4e0a4e2e';    --'UUID-TASK-SALLE'
-- Attendu : status = 'done', completed_at = une date

-- VÉRIFICATION phase : progress doit avoir changé
SELECT name, progress_pct, status 
FROM timeline.timeline_phases WHERE phase_id = 'cb2dfeda-1ca0-4c72-9d48-3fa58125b26f'; --'UUID-PHASE-1';
-- Attendu : progress = 33.33% (1 done sur 3), status = 'in_progress'

-- ────────────────────────────────────────

-- cyndy termine "Choisir le traiteur"
CALL timeline.sp_update_task_status(
    '4ed12d34-f458-41cd-ba77-80c652531148',  --'UUID-TASK-CHOISIR',
    'done',
    '3864987a-7562-4e04-bcf9-81d5d048be6e'
);

-- VÉRIFICATION : "Confirmer" doit être débloquée !
SELECT title, status 
FROM timeline.tasks WHERE task_id = '82e656cf-fc7f-4060-ad39-2d45dd468a82'; --'UUID-TASK-CONFIRMER';
-- Attendu : status = 'todo' (était 'blocked', maintenant débloquée en mode 'todo')

-- VÉRIFICATION phase
SELECT name, progress_pct, status 
FROM timeline.timeline_phases WHERE phase_id = 'cb2dfeda-1ca0-4c72-9d48-3fa58125b26f'; --'UUID-PHASE-1';
-- Attendu : progress = 66.67% (2 done sur 3), status = 'in_progress'

-- VÉRIFICATION trigger : doit avoir enregistré le déblocage
SELECT t.title, th.field_changed, th.old_value, th.new_value
FROM timeline.task_history th
JOIN timeline.tasks t ON t.task_id = th.task_id
ORDER BY th.changed_at;

-- ────────────────────────────────────────

-- Cyndy termine "Confirmer le traiteur"
CALL timeline.sp_update_task_status(
    '82e656cf-fc7f-4060-ad39-2d45dd468a82',--'UUID-TASK-CONFIRMER',
    'done',
    '3864987a-7562-4e04-bcf9-81d5d048be6e'
);

-- VÉRIFICATION phase : doit être complète !
SELECT name, progress_pct, status 
FROM timeline.timeline_phases WHERE phase_id = 'cb2dfeda-1ca0-4c72-9d48-3fa58125b26f'; --'UUID-PHASE-1';
-- progress = 100%, status = 'completed'