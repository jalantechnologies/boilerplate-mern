import { ApplicationError } from '../application';
import { HttpStatusCodes } from '../http';

export class ShareTask {
    id: string;
    taskId: string;
    userId: string;
}
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