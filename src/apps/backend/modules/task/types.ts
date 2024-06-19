// types.ts
import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

export class Task {
  id: string;
  account: string;
  description: string;
  title: string;
  shared_with?: string[]; // Include shared_with field

  // Other fields and methods as needed
}

export type GetAllTaskParams = {
  accountId: string;
  page?: number;
  size?: number;
};

export type GetTaskParams = {
  accountId: string;
  taskId: string;
};

export type CreateTaskParams = {
  accountId: string;
  description: string;
  title: string;
  shared_with?: string[]; // Include shared_with field in create params
};

export type UpdateTaskParams = {
  accountId: string;
  description: string;
  taskId: string;
  title: string;
  shared_with?: string[]; // Include shared_with field in update params
};

export type DeleteTaskParams = {
  accountId: string;
  taskId: string;
};

// Add ShareTaskParams
export type ShareTaskParams = {
  accountId: string;
  taskId: string;
  userIds: string[]; // IDs of users to share the task with
};

export type PaginationParams = {
  page: number;
  size: number;
};

export enum TaskErrorCode {
  NOT_FOUND = 'TASK_ERR_01',
}

export class TaskNotFoundError extends ApplicationError {
  code: TaskErrorCode;

  constructor(taskId: string) {
    super(`Task with taskId ${taskId} not found.`);
    this.code = TaskErrorCode.NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}
export class PermissionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PermissionError';
  }
}
