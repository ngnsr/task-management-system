export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in-progress",
  IN_REVIEW = "in-review",
  DONE = "done",
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  assignee?: string;
  reporter?: string;
  groupId: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Group {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// DTOs
export interface CreateTaskDto {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  assignee?: string | null;
  reporter?: string | null;
  groupId: string;
  tags?: string[];
}

export interface UpdateTaskDto {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string | null;
  assignee?: string | null;
  reporter?: string | null;
  groupId?: string;
  tags?: string[];
}

export interface CreateGroupDto {
  name: string;
  description: string;
}

export interface UpdateGroupDto {
  name?: string;
  description?: string;
}
