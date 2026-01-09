// Task entity interface
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

// Request payloads
export interface CreateTaskPayload {
  title: string;
  description: string;
}

export interface UpdateTaskPayload {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
}

// Delete payload
export interface DeleteTaskPayload {
  id: string;
}
