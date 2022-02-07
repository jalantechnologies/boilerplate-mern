import {
  NextFunction, Request, Response,
} from 'express';
import { Task } from '../types';

export default class TaskController {
  public static createTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    // TODO: Implement this
    // After creating task using TaskService.createTask, it should serialize
    // the task using serializeTaskAsJSON function in this controller
  }

  public static deleteTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    // TODO: Implement this
  }

  public static getAllTasks(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    // TODO: Implement this
    // For all the tasks associated, call serializeTaskAsJSON function in this
    // controller to serialize it
  }

  public static getTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    // TODO: Implement this
    // Serialize the task using serializeTaskAsJSON function
  }

  private static serializeTaskAsJSON(task: Task): unknown {
    return {
      id: task.id,
      account: task.account,
      active: task.account,
      name: task.name,
    };
  }
}
