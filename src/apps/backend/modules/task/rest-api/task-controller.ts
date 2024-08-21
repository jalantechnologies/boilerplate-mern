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
    const { accountId } = req;
    const { description, title } = req.body;
    const params: CreateTaskParams = {
      accountId: accountId as string,
      description,
      title,
    };
    const task: Task = await TaskService.createTask(params);
    const taskJSON = serializeTaskAsJSON(task);

    res
      .status(HttpStatusCodes.CREATED)
      .send(taskJSON);
  });

  deleteTask = applicationController(async (
    req: Request<DeleteTaskParams>,
    res: Response,
  ) => {
    const { accountId } = req;
    const { id } = req.params;
    const params: DeleteTaskParams = {
      accountId: accountId as string,
      taskId: id,
    };
    await TaskService.deleteTask(params);

    res
      .status(HttpStatusCodes.NO_CONTENT)
      .send();
  });

  getTask = applicationController(async (
    req: Request<GetTaskParams>,
    res: Response,
  ) => {
    const { accountId } = req;
    const { taskId } = req.params;
    const params: GetTaskParams = {
      accountId: accountId as string,
      taskId,
    };
    const task = await TaskService.getTaskForAccount(params);
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
    const { accountId } = req;
    const params: GetAllTaskParams = {
      accountId: accountId as string,
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
    const { accountId } = req;
    const { id } = req.params;
    const { description, title } = req.body;
    const params: UpdateTaskParams = {
      accountId: accountId as string,
      description,
      taskId: id,
      title,
    };
    const updatedTask: Task = await TaskService.updateTask(params);
    const taskJSON = serializeTaskAsJSON(updatedTask);

    res
      .status(HttpStatusCodes.OK)
      .send(taskJSON);
  });
}
