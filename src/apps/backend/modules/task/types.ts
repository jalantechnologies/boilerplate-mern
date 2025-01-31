import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';
import { Types } from 'mongoose';

export class Task {
  id: string;
  account: string;
  description: string;
  title: string;
  comments: string[];
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
}

export class TaskNotFoundError extends ApplicationError {
  code: TaskErrorCode;

  constructor(taskId: string) {
    super(`Task with taskId ${taskId} not found.`);
    this.code = TaskErrorCode.NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}

// Comment Types
export interface CommentDB {
  _id: Types.ObjectId;
  taskId: Types.ObjectId;
  userId: Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateCommentParams = {
  taskId: string;
  userId: string;
  content: string;
};

export type UpdateCommentParams = {
  commentId: string;
  content: string;
};

export type DeleteCommentParams = {
  commentId: string;
};