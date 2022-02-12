// eslint-disable-next-line max-classes-per-file
export class Task {
  id: string;

  account: string;

  name: string;
}

export type GetAllTaskParams = {
  accountId: string;
  page: number;
  size: number;
};

export type GetTaskParams = {
  accountId: string;
  taskId: string;
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
  UNAUTHORIZED_TASK_ACCESS = 'TASK_ERR_03',
}

export class TaskWithNameExistsError extends Error {
  code: TaskErrorCode;

  constructor(name: string) {
    super(`Task with name ${name} already exists.`);
    this.code = TaskErrorCode.TASK_ALREADY_EXISTS;
  }
}

export class UnAuthorizedTaskAccessError extends Error {
  code: TaskErrorCode;

  constructor(taskId: string) {
    super(`Cannot access task with taskId ${taskId}`);
    this.code = TaskErrorCode.UNAUTHORIZED_TASK_ACCESS;
  }
}

export class TaskNotFoundError extends Error {
  code: TaskErrorCode;

  constructor(taskId: string) {
    super(`Task with taskId ${taskId} not found.`);
    this.code = TaskErrorCode.NOT_FOUND;
  }
}
