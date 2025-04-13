export interface Task {
  assignee: {
    avatarUrl: string;
    email: string;
    fullName: string;
    id: number;
  };
  assigneeId: number;
  boardId: number;
  boardName: string;
  description: string;
  id: number;
  priority: Priority;
  status: Status;
  title: string;
}

export type Status = "Backlog" | "Done" | "InProgress";

export type Priority = "Low" | "Medium" | "High";

export interface Board {
  id: number;
  name: string;
  description: string;
  taskCount: number;
}

export type BoardInfo = Omit<Task, "assigneeId" | "boardId" | "boardName">;

export type TaskInfo = Omit<Task, "assigneeId">;

export interface NewTask {
  assigneeId: number;
  boardId: number;
  description: string;
  priority: Priority;
  title: string;
}

export type UpdatedTask = NewTask & { status: Status };

export interface User {
  id: number;
  fullName: string;
  email: string;
  description: string;
  avatarUrl: string;
  teamId: number;
  teamName: string;
  tasksCount: number;
}
