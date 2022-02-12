import { Request, Response, NextFunction } from 'express';
import TaskService from '../task-service';
import { Task, UnAuthorizedTaskAccessError } from '../types';

export default class TaskAccessMiddleware {
  public static async ensureTaskAccess(
    _req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    const task: Task = await TaskService.getTaskById(_req.params.id);
    if (task.account !== _req.params.accountId) {
      throw new UnAuthorizedTaskAccessError(_req.params.id);
    }
    next();
  }
}
