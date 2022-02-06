// eslint-disable-next-line max-classes-per-file
export type Task = {
  id: string;
  accountId: string;
  active: boolean;
  name: string;
};

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
  UNAUTHORIZED_ACCESS = 'TASK_ERR_02',
}

export class TaskNotFoundError extends Error {
  code: TaskErrorCode;

  constructor(taskId: string) {
    super(`${taskId} not found.`);
    this.code = TaskErrorCode.NOT_FOUND;
  }
}

export class TaskUnAuthorizedAccessError extends Error {
  code: TaskErrorCode;

  constructor(accountId: string, taskId: string) {
    super(`${accountId} is not authorized to access ${taskId}.`);
    this.code = TaskErrorCode.UNAUTHORIZED_ACCESS;
  }
}
