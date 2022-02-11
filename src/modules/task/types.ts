// eslint-disable-next-line max-classes-per-file
export class Task {
  id: string;

  account: string;

  active: boolean;

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

export enum TaskErrorCode {
  NOT_FOUND = 'TASK_ERR_01',
  TASK_ALREADY_EXISTS = 'TASK_ERR_02',
}

export class TaskWithNameExistsError extends Error {
  code: TaskErrorCode;

  httpStatusCode: number;

  constructor(name: string) {
    super(`Task with name ${name} already exists.`);
    this.code = TaskErrorCode.TASK_ALREADY_EXISTS;
    this.httpStatusCode = 409;
  }
}

export class TaskNotFoundError extends Error {
  code: TaskErrorCode;

  httpStatusCode: number;

  constructor(taskId: string) {
    super(`Task with taskId ${taskId} not found.`);
    this.code = TaskErrorCode.NOT_FOUND;
    this.httpStatusCode = 404;
  }
}
