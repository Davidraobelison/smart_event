-- ============================================================
-- PROCÉDURE : Créer une tâche
-- Appel : CALL timeline.sp_create_task(
--             p_phase_id, p_created_by, p_title, p_due_date,
--             p_description, p_priority, p_assigned_to, p_provider_id
--         );
-- Fait :
--   1. Vérifie que la phase existe
--   2. Vérifie que le créateur existe
--   3. Insère la tâche
--   4. Recalcule le progress de la phase
-- ============================================================

CREATE OR REPLACE PROCEDURE timeline.sp_create_task(
    p_phase_id      UUID,
    p_created_by    UUID,
    p_title         VARCHAR(255),
    p_due_date      DATE,
    p_description   TEXT          DEFAULT NULL,
    p_priority      VARCHAR(20)   DEFAULT 'medium',
    p_assigned_to   UUID          DEFAULT NULL,
    p_provider_id   UUID          DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_new_task_id   UUID;
    v_total         INTEGER;
    v_done          INTEGER;
    v_new_progress  DECIMAL(5,2);
    v_new_status    VARCHAR(50);
BEGIN
    -- ──────────────────────────────────────
    -- VALIDATION
    -- ──────────────────────────────────────

    -- La phase existe ?
    IF NOT EXISTS (SELECT 1 FROM timeline.timeline_phases WHERE phase_id = p_phase_id) THEN
        RAISE EXCEPTION 'Phase % inexistante', p_phase_id;
    END IF;

    -- Le créateur existe ?
    IF NOT EXISTS (SELECT 1 FROM core.users WHERE user_id = p_created_by) THEN
        RAISE EXCEPTION 'Utilisateur créateur % inexistant', p_created_by;
    END IF;

    -- L'assigné existe ? (si fourni)
    IF p_assigned_to IS NOT NULL AND NOT EXISTS (SELECT 1 FROM core.users WHERE user_id = p_assigned_to) THEN
        RAISE EXCEPTION 'Utilisateur assigné % inexistant', p_assigned_to;
    END IF;

    -- Le provider existe ? (si fourni)
    IF p_provider_id IS NOT NULL AND NOT EXISTS (SELECT 1 FROM core.providers WHERE provider_id = p_provider_id) THEN
        RAISE EXCEPTION 'Prestataire % inexistant', p_provider_id;
    END IF;

    -- Priority valide ?
    IF p_priority NOT IN ('low', 'medium', 'high', 'critical') THEN
        RAISE EXCEPTION 'Priorité invalide : %. Valeurs acceptées : low, medium, high, critical', p_priority;
    END IF;

    -- ──────────────────────────────────────
    -- INSERTION
    -- ──────────────────────────────────────

    INSERT INTO timeline.tasks (
        phase_id, created_by, title, due_date,
        description, priority, assigned_to, provider_id
    )
    VALUES (
        p_phase_id, p_created_by, p_title, p_due_date,
        p_description, p_priority, p_assigned_to, p_provider_id
    )
    RETURNING task_id INTO v_new_task_id;

    RAISE NOTICE 'Tâche créée : % (ID: %)', p_title, v_new_task_id;

    -- ──────────────────────────────────────
    -- RECALCUL DE LA PHASE
    -- ──────────────────────────────────────

    SELECT
        COUNT(*),
        COUNT(*) FILTER (WHERE status = 'done')
    INTO v_total, v_done
    FROM timeline.tasks
    WHERE phase_id = p_phase_id
      AND status != 'cancelled';

    IF v_total = 0 THEN
        v_new_progress := 0;
        v_new_status   := 'not_started';
    ELSIF v_done = v_total THEN
        v_new_progress := 100;
        v_new_status   := 'completed';
    ELSE
        v_new_progress := ROUND((v_done * 100.0) / v_total, 2);
        v_new_status   := 'in_progress';
    END IF;

    UPDATE timeline.timeline_phases
    SET progress_pct = v_new_progress,
        status       = v_new_status
    WHERE phase_id   = p_phase_id;

    RAISE NOTICE 'Phase mise à jour : progress = % %%, status = %', v_new_progress, v_new_status;
END;
$$;



-- #############################################################################################
-- TEST creation task 
-- Dale(f3b792ae-3505-4609-a30e-d87d565dd61b)-> Sophie et Dale(de7b09d8-2ddf-4146-9b50-00b33bd0e358)->
-- phase_ID:
-- cb2dfeda-1ca0-4c72-9d48-3fa58125b26f Préparatifs
-- 76f3b4a5-dbfa-4262-9472-d4312bbc17b8 Confirmation
-- c5bc6ca6-7cbe-4f52-ab50-9947c095532e Organisation finale
-- 3421efa2-c97f-466e-8255-e56c64936fb0 Événement
-- dae41f34-2104-493a-9f5d-2fa62ed82a1f Clôture

-- Reserver une salle (omena an'i Cyndy Driffield manao azy )
CALL timeline.sp_create_task(
    'cb2dfeda-1ca0-4c72-9d48-3fa58125b26f',          -- p_phase_id <preparatif>
    'f3b792ae-3505-4609-a30e-d87d565dd61b',             -- p_created_by <Dale>
    'Réserver la salle',     -- p_title
    '2026-03-01',            -- p_due_date
    'Visiter et réserver',   -- p_description
    'critical',              -- p_priority
    '3864987a-7562-4e04-bcf9-81d5d048be6e',             -- p_assigned_to <(user)Cyndy Driffield>
    NULL                     -- p_provider_id 
);

-- Choisir le traiteur (assignée à Cyndy, liée au provider)
CALL timeline.sp_create_task(
    'cb2dfeda-1ca0-4c72-9d48-3fa58125b26f',
    'f3b792ae-3505-4609-a30e-d87d565dd61b',
    'Choisir le traiteur',
    '2026-03-15',
    'Comparer 3 devis minimum',
    'high',
    '3864987a-7562-4e04-bcf9-81d5d048be6e',
    'd4fc4bc4-c988-4df6-ad1f-f943d29a44ca'   -- Traiteur <Sweet Bliss Bakery>
);

-- VÉRIFICATION : toujours 0% mais 2 tâches maintenant // la progression est gerer par update_task_stattus
SELECT name, progress_pct, status FROM timeline.timeline_phases WHERE phase_id = 'cb2dfeda-1ca0-4c72-9d48-3fa58125b26f';

-- Tâche 3 : Confirmer le traiteur (assignée à Cyndy)
CALL timeline.sp_create_task(
    'cb2dfeda-1ca0-4c72-9d48-3fa58125b26f',
    'f3b792ae-3505-4609-a30e-d87d565dd61b',
    'Confirmer le traiteur',
    '2026-04-01',
    'Signer le contrat',
    'high',
    '3864987a-7562-4e04-bcf9-81d5d048be6e',
    'd4fc4bc4-c988-4df6-ad1f-f943d29a44ca'
);

-- VÉRIFICATION TASKS
SELECT task_id, title, status, priority, due_date
FROM timeline.tasks
WHERE phase_id = 'cb2dfeda-1ca0-4c72-9d48-3fa58125b26f' -- UUID_PHASE_ID
ORDER BY due_date;

-- VÉRIFICATION PHASE
SELECT name, progress_pct, status
FROM timeline.timeline_phases WHERE phase_id = 'cb2dfeda-1ca0-4c72-9d48-3fa58125b26f';
-- Attendu : progress = 0.00%, status = 'in_progress' (3 tâches, 0 done)