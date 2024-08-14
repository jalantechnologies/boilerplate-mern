import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import TaskService from '../task-service';
import {
  Task,
  CreateTaskParams,
  GetAllTaskParams,
  DeleteTaskParams,
  GetTaskParams,
  UpdateTaskParams,
} from '../types';

import { serializeTaskAsJSON } from './task-serializer';

export class TaskController {
  createTask = applicationController(async (
    req: Request<CreateTaskParams>,
    res: Response,
  ) => {
    const { accountId, description, title } = req.body;
    const task: Task = await TaskService.createTask({
      accountId,
      description,
      title,
    });
    const taskJSON = serializeTaskAsJSON(task);

    res
      .status(HttpStatusCodes.CREATED)
      .send(taskJSON);
  });

  deleteTask = applicationController(async (
    req: Request<DeleteTaskParams>,
    res: Response,
  ) => {
    const { accountId, taskId } = req.params;
    await TaskService.deleteTask({
      accountId,
      taskId,
    });

    res
      .status(HttpStatusCodes.NO_CONTENT)
      .send();
  });

  getTask = applicationController(async (
    req: Request<GetTaskParams>,
    res: Response,
  ) => {
    const { accountId, taskId } = req.params;
    const task = await TaskService.getTaskForAccount({
      accountId,
      taskId,
    });
    const taskJSON = serializeTaskAsJSON(task);

    res
      .status(HttpStatusCodes.OK)
      .send(taskJSON);
  });

  getTasks = applicationController(async (
    req: Request,
    res: Response,
  ) => {
    const page = req.query.page ? +req.query.page : 1; // Default to page 1 if not provided
    const size = req.query.size ? +req.query.size : 10; // Default to size 10 if not provided
    const { accountId } = req.params;
    const params: GetAllTaskParams = {
      accountId,
      page,
      size,
    };

    const tasks = await TaskService.getTasksForAccount(params);
    const tasksJSON = tasks.map((task) => serializeTaskAsJSON(task));

    res
      .status(HttpStatusCodes.OK)
      .send(tasksJSON);
  });

  updateTask = applicationController(async (
    req: Request<UpdateTaskParams>,
    res: Response,
  ) => {
    const { taskId, description, title } = req.body;
    const { accountId } = req.params;
    const updatedTask: Task = await TaskService.updateTask({
      accountId,
      description,
      taskId,
      title,
    });
    const taskJSON = serializeTaskAsJSON(updatedTask);

    res
      .status(HttpStatusCodes.OK)
      .send(taskJSON);
  });
}
