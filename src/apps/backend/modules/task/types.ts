import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

export class Task {
  id: string;
  account: string;
  description: string;
  title: string;
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

export type GetTaskByTitleParams = {
  accountId: string;
  title: string;
};

export type CreateTaskParams = {
  accountId: string;
  description: string;
  title: string;
};

export type UpdateTaskParams = {
  accountId: string;
  description: string;
  taskId: string;
  title: string;
};

export type DeleteTaskParams = {
  accountId: string;
  taskId: string;
};

export type PaginationParams = {
  page: number;
  size: number;
};

export enum TaskErrorCode {
  NOT_FOUND = 'TASK_ERR_01',
  TASK_ALREADY_EXISTS = 'TASK_ERR_02',
}

export class TaskWithTitleExistsError extends ApplicationError {
  code: TaskErrorCode;

  constructor(title: string) {
    super(`Task with Title ${title} already exists.`);
    this.code = TaskErrorCode.TASK_ALREADY_EXISTS;
    this.httpStatusCode = HttpStatusCodes.CONFLICT;
  }
}

export class TaskNotFoundError extends ApplicationError {
  code: TaskErrorCode;

  constructor(taskId: string) {
    super(`Task with taskId ${taskId} not found.`);
    this.code = TaskErrorCode.NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}

export class TaskWithTitleNotFoundError extends ApplicationError {
  code: TaskErrorCode;

  constructor(taskTitle: string) {
    super(`Task with title ${taskTitle} not found.`);
    this.code = TaskErrorCode.NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}
