import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

export class Todo {
  id: string;
  accountId: string;
  description: string;
  title: string;
  dueDate: Date;
  type: string;
  isCompleted: boolean;
}

export type CreateTodoParams = {
  accountId: string;
  description: string;
  title: string;
  type: string;
  dueDate: Date;
};

export type UpdateTodoParams = {
  accountId: string;
  todoId: string;
  description?: string;
  title?: string;
  dueDate?: Date;
  type?: string;
  isCompleted?: boolean;
};

export type DeleteTodoParams = {
  accountId: string;
  todoId: string;
};

export type GetTodoParams = {
  accountId: string;
  todoId: string;
};

export type GetAllTodoParams = {
  accountId: string;
};

export enum TodoErrorCode {
  NOT_FOUND = 'TODO_ERR_01',
  SERVER_ERROR = 'TODO_ERR_02',
}

export class TodoNotFoundError extends ApplicationError {
  code: TodoErrorCode;

  constructor(todoId: string) {
    super(`Todo with todoId ${todoId} not found.`);
    this.code = TodoErrorCode.NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}

export class TodoDbError extends ApplicationError {
  code: TodoErrorCode;

  constructor() {
    super(`Todo DB error`);
    this.code = TodoErrorCode.SERVER_ERROR;
    this.httpStatusCode = HttpStatusCodes.SERVER_ERROR;
  }
}
