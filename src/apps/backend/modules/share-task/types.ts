import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

export class ShareTask {
  id: string;
  sharedWith: string;
  taskId: object;
}

export type CreateShareTaskParams = {
  accountId: string;
  sharedWith: string;
  taskId: string;
};

export enum ShareTaskErrorCode {
  NOT_FOUND = 'SHARE_TASK_ERR_01',
}
export enum CantShareCode {
  REQUEST_FAILED = 'CANT_SHARE_TASK_ERR_01',
}

export class ShareTaskNotFoundError extends ApplicationError {
  code: ShareTaskErrorCode;

  constructor(taskId: string) {
    super(`Task with taskId ${taskId} not found.`);
    this.code = ShareTaskErrorCode.NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}
export class CantShareTaskError extends ApplicationError {
  code: CantShareCode;

  constructor(message: string) {
    super(message);
    this.code = CantShareCode.REQUEST_FAILED;
    this.httpStatusCode = HttpStatusCodes.BAD_REQUEST;
  }
}
