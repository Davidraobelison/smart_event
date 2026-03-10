CREATE OR REPLACE FUNCTION timeline.fn_record_task_history()
RETURNS TRIGGER AS $$
BEGIN
    -- Status
    IF OLD.status IS DISTINCT FROM NEW.status THEN
        INSERT INTO timeline.task_history (task_id, changed_by, field_changed, old_value, new_value)
        VALUES (NEW.task_id, NEW.created_by, 'status', OLD.status, NEW.status);
    END IF;

    -- Priority
    IF OLD.priority IS DISTINCT FROM NEW.priority THEN
        INSERT INTO timeline.task_history (task_id, changed_by, field_changed, old_value, new_value)
        VALUES (NEW.task_id, NEW.created_by, 'priority', OLD.priority, NEW.priority);
    END IF;

    -- Assigned_to
    IF OLD.assigned_to IS DISTINCT FROM NEW.assigned_to THEN
        INSERT INTO timeline.task_history (task_id, changed_by, field_changed, old_value, new_value)
        VALUES (NEW.task_id, NEW.created_by, 'assigned_to', OLD.assigned_to::TEXT, NEW.assigned_to::TEXT);
    END IF;

    -- Due_date
    IF OLD.due_date IS DISTINCT FROM NEW.due_date THEN
        INSERT INTO timeline.task_history (task_id, changed_by, field_changed, old_value, new_value)
        VALUES (NEW.task_id, NEW.created_by, 'due_date', OLD.due_date::TEXT, NEW.due_date::TEXT);
    END IF;

    -- Title
    IF OLD.title IS DISTINCT FROM NEW.title THEN
        INSERT INTO timeline.task_history (task_id, changed_by, field_changed, old_value, new_value)
        VALUES (NEW.task_id, NEW.created_by, 'title', OLD.title, NEW.title);
    END IF;

    -- Provider
    IF OLD.provider_id IS DISTINCT FROM NEW.provider_id THEN
        INSERT INTO timeline.task_history (task_id, changed_by, field_changed, old_value, new_value)
        VALUES (NEW.task_id, NEW.created_by, 'provider_id', OLD.provider_id::TEXT, NEW.provider_id::TEXT);
    END IF;

    -- Completed_at
    IF OLD.completed_at IS DISTINCT FROM NEW.completed_at THEN
        INSERT INTO timeline.task_history (task_id, changed_by, field_changed, old_value, new_value)
        VALUES (NEW.task_id, NEW.created_by, 'completed_at', OLD.completed_at::TEXT, NEW.completed_at::TEXT);
    END IF;

    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_tasks_history
    AFTER UPDATE ON timeline.tasks
    FOR EACH ROW
    EXECUTE FUNCTION timeline.fn_record_task_history();