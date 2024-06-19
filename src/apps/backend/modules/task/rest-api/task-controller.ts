// task-controller.ts
import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import TaskService from '../task-service';

import { TaskNotFoundError,PermissionError } from '../types';
import {
  Task,
  CreateTaskParams,
  GetAllTaskParams,
  DeleteTaskParams,
  GetTaskParams,
  UpdateTaskParams,
  ShareTaskParams, // Add import for ShareTaskParams
} from '../types';

import { serializeTaskAsJSON } from './task-serializer';

export class TaskController {
  createTask = applicationController(async (
    req: Request<CreateTaskParams>,
    res: Response,
  ) => {
    const task: Task = await TaskService.createTask({
      accountId: req.accountId,
      description: req.body.description,
      title: req.body.title,
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
    await TaskService.deleteTask({
      accountId: req.accountId,
      taskId: req.params.id,
    });

    res
      .status(HttpStatusCodes.NO_CONTENT)
      .send();
  });

  getTask = applicationController(async (
    req: Request<GetTaskParams>,
    res: Response,
  ) => {
    const task = await TaskService.getTaskForAccount({
      accountId: req.accountId,
      taskId: req.params.id,
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
    const page = +req.query.page;
    const size = +req.query.size;
    const params: GetAllTaskParams = {
      accountId: req.accountId,
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
    const updatedTask: Task = await TaskService.updateTask({
      accountId: req.accountId,
      taskId: req.params.id,
      description: req.body.description,
      title: req.body.title,
    });
    const taskJSON = serializeTaskAsJSON(updatedTask);

    res
      .status(HttpStatusCodes.OK)
      .send(taskJSON);
  });

  shareTask = applicationController(async (
    req: Request<ShareTaskParams>, // Define request type for shareTask endpoint
    res: Response
  ) => {
    try {
      const sharedTask: Task = await TaskService.shareTask({
        accountId: req.accountId,
        taskId: req.params.id,
        userIds: req.body.userIds, // Extract sharedWithUserIds from request body
      });
      const sharedTaskJSON = serializeTaskAsJSON(sharedTask);
  
      res.status(HttpStatusCodes.OK).send(sharedTaskJSON);
    } catch (error) {
      if (error instanceof PermissionError) {
        res.status(403).send({ message: error.message }); // Directly using the numeric value for Forbidden
      } else if (error instanceof TaskNotFoundError) {
        res.status(HttpStatusCodes.NOT_FOUND).send({ message: error.message });
      } else {
        res.status(500).send({ message: 'Internal Server Error' });
      }
    }
  });
  
}
