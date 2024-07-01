import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

// Define the TaskSharing class
export class TaskSharing {
  id: string;
  taskId: string;
  userId: string;

  constructor(id: string, taskId: string, userId: string) {
    this.id = id;
    this.taskId = taskId;
    this.userId = userId;
  }
}

// Define the parameters for getting shared tasks
export type GetTaskSharingParams = {
  userId: string;
};

// Define the parameters for creating a shared task
export type CreateTaskSharingParams = {
  userId: string;
  taskId: string;
};

// Enum for task sharing error codes
export enum TaskSharingErrorCode {
  NOT_FOUND = 'TASK_SHARING_ERR_01',
}

// Custom error class for task sharing not found
export class TaskSharingNotFoundError extends ApplicationError {
  code: TaskSharingErrorCode;

  constructor(taskId: string) {
    super(`Shared Task with taskId ${taskId} not found.`);
    this.code = TaskSharingErrorCode.NOT_FOUND;
    this.httpStatusCode = HttpStatusCodes.NOT_FOUND;
  }
}
