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

type Status = "Backlog" | "Done" | "InProgress";

type Priority = "Low" | "Medium" | "High";

export interface Board {
  id: number;
  name: string;
  description: string;
  taskCount: number;
}

export type BoardInfo = Omit<Task, "assigneeId" | "boardId" | "boardName">;
