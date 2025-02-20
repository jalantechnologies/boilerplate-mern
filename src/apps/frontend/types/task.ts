// task.ts
export interface Comment {  
  id: string;
  taskId: string;
  userId: string;
  text: string;
  createdAt: string;
  updatedAt?: string;
}

export enum TaskOperationType {
  ADD = 'add',
  EDIT = 'edit',
}

export interface Task {
  id: string;
  description: string;
  title: string;
  comments?: Comment[];  // Using the exported Comment
}

export class Task {
  id: string;
  description: string;
  title: string;
  comments?: Comment[] = [];  

  constructor(json: any) {
    this.id = json.id as string;
    this.description = json.description as string;
    this.title = json.title as string;
    this.comments = Array.isArray(json.comments)
      ? json.comments.map((comment: any) => comment as Comment)
      : [];  
  }
}
