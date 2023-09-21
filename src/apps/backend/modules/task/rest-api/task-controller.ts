import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import TaskService from '../task-service';
import {
  Task,
  CreateTaskParams,
  GetAllTaskParams,
  DeleteTaskParams,
  GetTaskParams,
} from '../types';

import { serializeTask } from './task-serializer';

export const createTask = applicationController(async (
  req: Request<CreateTaskParams>,
  res: Response,
) => {
  const task: Task = await TaskService.createTask({
    accountId: req.accountId,
    name: req.body.name,
  });
  const taskJSON = serializeTask(task);

  res
    .status(HttpStatusCodes.CREATED)
    .send(taskJSON);
});

export const deleteTask = applicationController(async (
  req: Request<DeleteTaskParams>,
  res: Response,
) => {
  await TaskService.deleteTask({
    accountId: req.accountId,
    taskId: req.params.id,
  });

  res
    .status(HttpStatusCodes.NO_CONTENT)
    .send();
});

export const getTask = applicationController(async (
  req: Request<GetTaskParams>,
  res: Response,
) => {
  const task = await TaskService.getTaskForAccount({
    accountId: req.accountId,
    taskId: req.params.id,
  });
  const taskJSON = serializeTask(task);

  res
    .status(HttpStatusCodes.OK)
    .send(taskJSON);
});

export const getTasks = applicationController(async (
  req: Request,
  res: Response,
) => {
  const page = +req.query.page;
  const size = +req.query.size;
  const params: GetAllTaskParams = {
    accountId: req.accountId,
    page,
    size,
  };

  const tasks = await TaskService.getTasksForAccount(params);
  const tasksJSON = tasks.map((task) => serializeTask(task));

  res
    .status(HttpStatusCodes.OK)
    .send(tasksJSON);
});
