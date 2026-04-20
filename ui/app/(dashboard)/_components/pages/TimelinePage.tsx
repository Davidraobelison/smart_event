"use client";

import React, { useState } from "react";
import { Plus, Clock, AlertCircle, MoreHorizontal, Calendar, ArrowLeft, ArrowRight, List, X } from "lucide-react";
import styles from "@/components/shared/page.module.css";
import taskStyles from "./tasks.module.css";
import Card from "@/components/ui/Card/Card";
import Badge from "@/components/ui/Badge/Badge";

type Status   = "TODO" | "IN_PROGRESS" | "DONE";
type Priority = "Haute" | "Moyenne" | "Basse";

interface Task {
    id: string; title: string; desc: string; status: Status;
    priority: Priority; deadline: string; assignee: string; eventName: string;
}

const initialTasks: Task[] = [
    { id: "1", title: "Confirmer le traiteur principal",   desc: "Valider le menu et les quantités pour 150 personnes.", status: "TODO",        priority: "Haute",   deadline: "2024-07-20", assignee: "JD", eventName: "Mariage Julie & Marc"   },
    { id: "2", title: "Envoyer les invitations",           desc: "150 invitations par courrier et email.",               status: "IN_PROGRESS", priority: "Haute",   deadline: "2024-07-10", assignee: "MB", eventName: "Mariage Julie & Marc"   },
    { id: "3", title: "Réserver le photographe",          desc: "Contrat signé avec Studio Photo Art.",                 status: "DONE",        priority: "Haute",   deadline: "2024-06-15", assignee: "JD", eventName: "Mariage Julie & Marc"   },
    { id: "4", title: "Commander les fleurs",             desc: "Pivoines et roses blanches, livraison J-1.",           status: "TODO",        priority: "Moyenne", deadline: "2024-08-10", assignee: "AB", eventName: "Mariage Julie & Marc"   },
    { id: "5", title: "Organiser le transport invités",   desc: "Navette depuis la gare, 3 allers-retours.",            status: "IN_PROGRESS", priority: "Moyenne", deadline: "2024-08-01", assignee: "MB", eventName: "Conférence Digital"     },
    { id: "6", title: "Tester la sono et lumières",       desc: "Répétition avec le DJ samedi matin.",                 status: "DONE",        priority: "Basse",   deadline: "2024-08-14", assignee: "JD", eventName: "Conférence Digital"     },
    { id: "7", title: "Préparer le programme",            desc: "Agenda détaillé et ordre du jour.",                   status: "TODO",        priority: "Haute",   deadline: "2024-08-05", assignee: "AB", eventName: "Soirée Gala"            },
    { id: "8", title: "Sécuriser le lieu",                desc: "Confirmer le contrat avec le Domaine Vue Mer.",       status: "IN_PROGRESS", priority: "Haute",   deadline: "2024-07-25", assignee: "JD", eventName: "Soirée Gala"            },
];

const columns: { id: Status; title: string; color: string }[] = [
    { id: "TODO",        title: "À Faire",   color: "#94a3b8"              },
    { id: "IN_PROGRESS", title: "En Cours",  color: "var(--color-primary)" },
    { id: "DONE",        title: "Terminé",   color: "var(--color-success)" },
];

const priorityColors: Record<Priority, { bg: string; text: string }> = {
    Haute:   { bg: "rgba(239,83,80,0.1)",   text: "var(--color-danger)"  },
    Moyenne: { bg: "rgba(255,176,32,0.1)",  text: "var(--color-warning)" },
    Basse:   { bg: "rgba(47,107,255,0.1)",  text: "var(--color-blue)"    },
};

const MONTHS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const DAYS   = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];

function MiniCalendar({ tasks }: { tasks: Task[] }) {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(new Date(2024, 7, 1));
    const year  = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay    = new Date(year, month, 1).getDay();
    const adjustedFirst = firstDay === 0 ? 6 : firstDay - 1;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const getTasksForDay = (day: number) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        return tasks.filter(t => t.deadline === dateStr);
    };

    const cells: (number | null)[] = [];
    for (let i = 0; i < adjustedFirst; i++) cells.push(null);
    for (let i = 1; i <= daysInMonth; i++) cells.push(i);

    return (
        <div className={taskStyles.calendarBox}>
            <div className={taskStyles.calHeader}>
                <button className={taskStyles.calNav} onClick={() => setCurrentDate(new Date(year, month - 1, 1))}><ArrowLeft size={16} /></button>
                <span className={taskStyles.calMonthTitle}>{MONTHS[month]} {year}</span>
                <button className={taskStyles.calNav} onClick={() => setCurrentDate(new Date(year, month + 1, 1))}><ArrowRight size={16} /></button>
            </div>
            <div className={taskStyles.calDays}>{DAYS.map(d => <div key={d} className={taskStyles.calDayLabel}>{d}</div>)}</div>
            <div className={taskStyles.calGrid}>
                {cells.map((day, i) => {
                    if (!day) return <div key={`e${i}`} className={taskStyles.calCell} />;
                    const dayTasks = getTasksForDay(day);
                    const isToday  = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                    return (
                        <div key={day} className={`${taskStyles.calCell} ${isToday ? taskStyles.calCellToday : ""} ${dayTasks.length ? taskStyles.calCellHasTasks : ""}`}>
                            <span className={taskStyles.calDayNum}>{day}</span>
                            {dayTasks.slice(0, 2).map(t => (
                                <div key={t.id} className={taskStyles.calTaskDot} style={{ background: t.status === "DONE" ? "var(--color-success)" : t.priority === "Haute" ? "var(--color-danger)" : "var(--color-primary)" }} title={t.title} />
                            ))}
                            {dayTasks.length > 2 && <span className={taskStyles.calMore}>+{dayTasks.length - 2}</span>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

type TaskForm = { title: string; desc: string; priority: Priority; deadline: string; assignee: string; status: Status; eventName: string };
const emptyForm: TaskForm = { title: "", desc: "", priority: "Moyenne", deadline: "", assignee: "", status: "TODO", eventName: "Mariage Julie & Marc" };

export default function TimelinePage() {
    const [tasks, setTasks]       = useState<Task[]>(initialTasks);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm]         = useState<TaskForm>(emptyForm);
    const [editId, setEditId]     = useState<string | null>(null);
    const [view, setView]         = useState<"kanban" | "calendar">("kanban");

    const moveTask  = (id: string, newStatus: Status) => setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    const deleteTask = (id: string) => setTasks(prev => prev.filter(t => t.id !== id));

    const openCreate = (status: Status = "TODO") => { setEditId(null); setForm({ ...emptyForm, status }); setShowModal(true); };
    const openEdit   = (task: Task) => { setEditId(task.id); setForm({ title: task.title, desc: task.desc, priority: task.priority, deadline: task.deadline, assignee: task.assignee, status: task.status, eventName: task.eventName }); setShowModal(true); };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editId) {
            setTasks(prev => prev.map(t => t.id === editId ? { ...t, ...form } : t));
        } else {
            setTasks(prev => [...prev, { id: String(Date.now()), ...form }]);
        }
        setShowModal(false);
    };

    return (
        <div className={styles.page}>
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.pageTitle}>Timeline & Tâches</h1>
                    <p className={styles.pageSubtitle}>Gérez vos tâches en Kanban ou visualisez les échéances dans le calendrier.</p>
                </div>
                <div style={{ display: "flex", gap: "var(--space-sm)" }}>
                    <button className={view === "kanban" ? styles.actionBtn : styles.actionBtnGhost} onClick={() => setView("kanban")} style={{ display: "flex", alignItems: "center", gap: "6px" }}><List size={16} /> Kanban</button>
                    <button className={view === "calendar" ? styles.actionBtn : styles.actionBtnGhost} onClick={() => setView("calendar")} style={{ display: "flex", alignItems: "center", gap: "6px" }}><Calendar size={16} /> Calendrier</button>
                    <button className={styles.actionBtn} onClick={() => openCreate()}><Plus size={18} /> Nouvelle Tâche</button>
                </div>
            </div>

            <div className={styles.statGrid}>
                {[
                    { label: "Total",     value: tasks.length,                                    color: "var(--color-blue)",    bg: "rgba(47,107,255,0.1)"  },
                    { label: "À faire",   value: tasks.filter(t => t.status === "TODO").length,        color: "var(--color-muted)",   bg: "var(--color-surface-2)" },
                    { label: "En cours",  value: tasks.filter(t => t.status === "IN_PROGRESS").length, color: "var(--color-primary)", bg: "rgba(255,147,79,0.1)"  },
                    { label: "Terminées", value: tasks.filter(t => t.status === "DONE").length,        color: "var(--color-success)", bg: "rgba(36,180,126,0.1)"  },
                ].map(s => (
                    <div key={s.label} className={styles.statCard}>
                        <div className={styles.statIconBox} style={{ background: s.bg, color: s.color }}><Clock size={22} /></div>
                        <div><p className={styles.statLabel}>{s.label}</p><p className={styles.statValue} style={{ fontSize: "var(--fs-xl)" }}>{s.value}</p></div>
                    </div>
                ))}
            </div>

            {view === "calendar" && (
                <div className={taskStyles.calendarWrapper}>
                    <MiniCalendar tasks={tasks} />
                    <div className={taskStyles.calLegend}>
                        <h3 style={{ margin: "0 0 var(--space-md)", color: "var(--color-heading)" }}>Légende</h3>
                        {[{ color: "var(--color-danger)", label: "Haute priorité" }, { color: "var(--color-primary)", label: "Priorité normale" }, { color: "var(--color-success)", label: "Terminée" }].map(l => (
                            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "var(--space-sm)", marginBottom: "var(--space-xs)" }}>
                                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: l.color, flexShrink: 0 }} />
                                <span style={{ fontSize: "var(--fs-sm)", color: "var(--color-text)" }}>{l.label}</span>
                            </div>
                        ))}
                        <div style={{ marginTop: "var(--space-lg)" }}>
                            <h4 style={{ margin: "0 0 var(--space-sm)", color: "var(--color-heading)", fontSize: "var(--fs-sm)" }}>Tâches urgentes</h4>
                            {tasks.filter(t => t.priority === "Haute" && t.status !== "DONE").map(t => (
                                <div key={t.id} style={{ padding: "var(--space-sm)", background: "var(--color-surface-2)", borderRadius: "var(--radius-sm)", marginBottom: "var(--space-xs)", borderLeft: "3px solid var(--color-danger)" }}>
                                    <p style={{ margin: 0, fontSize: "var(--fs-xs)", fontWeight: "700", color: "var(--color-heading)" }}>{t.title}</p>
                                    <p style={{ margin: 0, fontSize: "10px", color: "var(--color-muted)" }}>{t.deadline}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {view === "kanban" && (
                <div style={{ display: "flex", gap: "var(--space-md)", overflowX: "auto", paddingBottom: "var(--space-md)" }}>
                    {columns.map(col => {
                        const colTasks = tasks.filter(t => t.status === col.id);
                        return (
                            <div key={col.id} style={{ minWidth: "300px", flex: 1, background: "var(--color-surface-2)", borderRadius: "var(--radius-lg)", padding: "var(--space-md)", display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-xs)" }}>
                                    <h3 style={{ display: "flex", alignItems: "center", gap: "var(--space-xs)", fontWeight: "var(--fw-bold)", fontSize: "var(--fs-sm)", margin: 0, color: "var(--color-heading)" }}>
                                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: col.color, display: "inline-block" }} />
                                        {col.title}
                                        <span style={{ fontSize: "11px", background: "var(--color-surface)", borderRadius: "999px", padding: "2px 8px", fontWeight: "var(--fw-semibold)", color: "var(--color-muted)" }}>{colTasks.length}</span>
                                    </h3>
                                    <button onClick={() => openCreate(col.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", padding: "4px" }}><Plus size={16} /></button>
                                </div>
                                {colTasks.map(task => (
                                    <div key={task.id} style={{ background: "var(--color-surface)", borderRadius: "var(--radius-md)", padding: "var(--space-md)", borderLeft: `3px solid ${col.color}` }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "var(--space-xs)" }}>
                                            <span style={{ fontSize: "10px", fontWeight: "var(--fw-bold)", padding: "2px 8px", borderRadius: "999px", background: priorityColors[task.priority].bg, color: priorityColors[task.priority].text }}>{task.priority}</span>
                                            <div style={{ display: "flex", gap: "4px" }}>
                                                <button onClick={() => openEdit(task)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", padding: "2px" }}><MoreHorizontal size={14} /></button>
                                                <button onClick={() => deleteTask(task.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-muted)", padding: "2px" }}><X size={12} /></button>
                                            </div>
                                        </div>
                                        <h4 style={{ fontSize: "var(--fs-sm)", fontWeight: "var(--fw-semibold)", color: "var(--color-heading)", marginBottom: "4px" }}>{task.title}</h4>
                                        <p style={{ fontSize: "var(--fs-xxs)", color: "var(--color-muted)", marginBottom: "var(--space-sm)" }}>{task.desc}</p>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span style={{ display: "flex", gap: "4px", alignItems: "center", fontSize: "11px", color: "var(--color-muted)" }}><Clock size={11} /> {task.deadline || "Sans date"}</span>
                                            <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "var(--color-primary-100)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: "700", color: "var(--color-primary)" }}>{task.assignee || "?"}</div>
                                        </div>
                                        <div style={{ display: "flex", gap: "var(--space-xs)", marginTop: "var(--space-sm)", paddingTop: "var(--space-xs)", borderTop: "1px solid var(--color-border)" }}>
                                            {col.id !== "TODO"        && <button onClick={() => moveTask(task.id, "TODO")}        style={{ background: "none", border: "none", cursor: "pointer", fontSize: "10px", color: "var(--color-muted)",   fontWeight: "700", fontFamily: "var(--font-family-base)", padding: 0 }}>À faire</button>}
                                            {col.id !== "IN_PROGRESS" && <button onClick={() => moveTask(task.id, "IN_PROGRESS")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "10px", color: "var(--color-primary)", fontWeight: "700", fontFamily: "var(--font-family-base)", padding: 0 }}>En cours</button>}
                                            {col.id !== "DONE"        && <button onClick={() => moveTask(task.id, "DONE")}        style={{ background: "none", border: "none", cursor: "pointer", fontSize: "10px", color: "var(--color-success)", fontWeight: "700", fontFamily: "var(--font-family-base)", padding: 0 }}>Terminé</button>}
                                        </div>
                                    </div>
                                ))}
                                {colTasks.length === 0 && (
                                    <div style={{ textAlign: "center", padding: "var(--space-xl)", color: "var(--color-muted)", border: "2px dashed var(--color-border)", borderRadius: "var(--radius-md)", fontSize: "var(--fs-xs)" }}>
                                        <AlertCircle size={24} style={{ display: "block", margin: "0 auto var(--space-xs)", opacity: 0.3 }} /> Aucune tâche
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {showModal && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "var(--space-md)" }}>
                    <Card style={{ width: "500px", maxWidth: "95vw" }}>
                        <Card.Header divider><Card.Title>{editId ? "Modifier la tâche" : "Nouvelle tâche"}</Card.Title></Card.Header>
                        <Card.Body>
                            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
                                {[{ label: "Titre", key: "title", type: "text", placeholder: "Ex: Confirmer la salle..." }, { label: "Description", key: "desc", type: "text", placeholder: "Détails de la tâche..." }, { label: "Responsable", key: "assignee", type: "text", placeholder: "Ex: JD" }, { label: "Échéance", key: "deadline", type: "date", placeholder: "" }].map(f => (
                                    <div key={f.key}>
                                        <label style={{ fontSize: "var(--fs-xs)", fontWeight: "700", color: "var(--color-muted)", display: "block", marginBottom: "6px", textTransform: "uppercase" }}>{f.label}</label>
                                        <input type={f.type} value={(form as Record<string, string>)[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })} placeholder={f.placeholder} required={f.key === "title"} style={{ width: "100%", padding: "10px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface-2)", color: "var(--color-text)", fontSize: "var(--fs-sm)", outline: "none", boxSizing: "border-box", fontFamily: "var(--font-family-base)" }} />
                                    </div>
                                ))}
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-sm)" }}>
                                    <div>
                                        <label style={{ fontSize: "var(--fs-xs)", fontWeight: "700", color: "var(--color-muted)", display: "block", marginBottom: "6px", textTransform: "uppercase" }}>Priorité</label>
                                        <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value as Priority })} style={{ width: "100%", padding: "10px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface-2)", color: "var(--color-text)", fontSize: "var(--fs-sm)", outline: "none", cursor: "pointer", fontFamily: "var(--font-family-base)" }}>
                                            <option value="Haute">Haute</option><option value="Moyenne">Moyenne</option><option value="Basse">Basse</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: "var(--fs-xs)", fontWeight: "700", color: "var(--color-muted)", display: "block", marginBottom: "6px", textTransform: "uppercase" }}>Statut</label>
                                        <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as Status })} style={{ width: "100%", padding: "10px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border)", background: "var(--color-surface-2)", color: "var(--color-text)", fontSize: "var(--fs-sm)", outline: "none", cursor: "pointer", fontFamily: "var(--font-family-base)" }}>
                                            <option value="TODO">À faire</option><option value="IN_PROGRESS">En cours</option><option value="DONE">Terminé</option>
                                        </select>
                                    </div>
                                </div>
                                <div style={{ display: "flex", gap: "var(--space-sm)", justifyContent: "flex-end", paddingTop: "var(--space-xs)" }}>
                                    <button type="button" className={styles.actionBtnGhost} onClick={() => setShowModal(false)}>Annuler</button>
                                    <button type="submit" className={styles.actionBtn}>{editId ? "Enregistrer" : "Créer la tâche"}</button>
                                </div>
                            </form>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </div>
    );
}
