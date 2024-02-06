import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

export class Task {
  id: string;
  account: string;
  name: string;
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

export type GetTaskByNameParams = {
  accountId: string,
  name: string;
};

export type CreateTaskParams = {
  accountId: string;
  name: string;
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

export class TaskWithNameExistsError extends ApplicationError {
  code: TaskErrorCode;

  constructor(name: string) {
    super(`Task with name ${name} already exists.`);
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

export class TaskWithNameNotFoundError extends ApplicationError {
  code: TaskErrorCode;

  constructor(taskName: string) {
    super(`Task with name ${taskName} not found.`);
    this.code = TaskErrorCode.NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}
