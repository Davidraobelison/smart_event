export type EventStatus = "draft" | "active" | "completed" | "cancelled";

export interface SmartEvent {
  id: string;
  title: string;
  date: string;
  location?: string;
  budget: number;
  status: EventStatus;
  organizerId: string;
  clientId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TimelinePhase {
  id: string;
  eventId: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  order: number;
  progress: number;
}

export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type TaskStatus   = "todo" | "in_progress" | "review" | "done";

export interface Task {
  id: string;
  phaseId: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  assigneeId?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}
