import { Account } from '../account';
import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';
import { Task } from '../task';

export class ShareTaskRequest {
  id: string;
  task: string | Task;
  account: string | Account;
}

export type CreateShareTaskRequestParams = {
  taskId: string;
  accountId: string;
};

export type CreateShareTasksRequestParams = {
  taskId: string;
  accountIds: string[];
};

export interface GetShareTaskRequestParams {
  sharedTaskId: string;
  accountId: string;
}

export interface GetAllShareTasksRequestParams {
  accountId: string;
}

export enum ShareTaskRequestStatus {
  Pending = 'pending',
  Approved = 'approved',
  Declined = 'declined',
}

export class ShareTaskRequestNotFoundError extends ApplicationError {
  code: string;

  constructor(sharedTaskId: string) {
    super(`Shared task with ID ${sharedTaskId} not found.`);
    this.code = 'SHARED_TASK_NOT_FOUND';
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}