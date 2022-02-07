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
}

export class TaskNotFoundError extends Error {
  code: TaskErrorCode;

  constructor(taskId: string) {
    super(`${taskId} not found.`);
    this.code = TaskErrorCode.NOT_FOUND;
  }
}
