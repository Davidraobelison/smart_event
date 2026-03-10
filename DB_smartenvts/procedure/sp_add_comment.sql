-- ============================================================
-- PROCÉDURE : Ajouter un commentaire à une tâche
-- Appel : CALL timeline.sp_add_comment(
--             p_task_id, p_user_id, p_content
--         );
-- Fait :
--   1. Vérifie que la tâche existe
--   2. Vérifie que l'utilisateur existe
--   3. Vérifie que le contenu n'est pas vide
--   4. Insère le commentaire
-- ============================================================

CREATE OR REPLACE PROCEDURE timeline.sp_add_comment(
    p_task_id   UUID,
    p_user_id   UUID,
    p_content   TEXT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_comment_id UUID;
BEGIN
    -- ──────────────────────────────────────
    -- VALIDATION
    -- ──────────────────────────────────────

    -- La tâche existe ?
    IF NOT EXISTS (SELECT 1 FROM timeline.tasks WHERE task_id = p_task_id) THEN
        RAISE EXCEPTION 'Tâche % inexistante', p_task_id;
    END IF;

    -- L'utilisateur existe ?
    IF NOT EXISTS (SELECT 1 FROM core.users WHERE user_id = p_user_id) THEN
        RAISE EXCEPTION 'Utilisateur % inexistant', p_user_id;
    END IF;

    -- Contenu vide ?
    IF p_content IS NULL OR TRIM(p_content) = '' THEN
        RAISE EXCEPTION 'Le commentaire ne peut pas être vide';
    END IF;

    -- ──────────────────────────────────────
    -- INSERTION
    -- ──────────────────────────────────────

    INSERT INTO timeline.task_comments (task_id, user_id, content)
    VALUES (p_task_id, p_user_id, TRIM(p_content))
    RETURNING comment_id INTO v_comment_id;

    RAISE NOTICE 'Commentaire ajouté (ID: %) sur la tâche %', v_comment_id, p_task_id;
END;
$$;

--#################################################################################################
--TEST

CALL timeline.sp_add_comment(
    '4ed12d34-f458-41cd-ba77-80c652531148', --'UUID-TASK-CHOISIR',
    '3864987a-7562-4e04-bcf9-81d5d048be6e',--'UUID-CYNDY',
    'Sweet Bliss Bakery propose 2 menus : traditionnel 45.000AR et fusion 60.000AR'
);

CALL timeline.sp_add_comment(
    '4ed12d34-f458-41cd-ba77-80c652531148', --'UUID-TASK-CHOISIR',
    '3864987a-7562-4e04-bcf9-81d5d048be6e', --'UUID-CYNDY',
    'Je préfère le menu fusion !'
);

-- VÉRIFICATION
SELECT
    t.title,
    u.full_name AS auteur,
    tc.content,
    tc.created_at
FROM timeline.task_comments tc
JOIN timeline.tasks t ON t.task_id = tc.task_id
JOIN core.users u ON u.user_id = tc.user_id
ORDER BY tc.created_at;