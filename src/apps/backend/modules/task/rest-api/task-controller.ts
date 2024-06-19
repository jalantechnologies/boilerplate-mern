import { applicationController, Request, Response } from '../../application';
import { HttpStatusCodes } from '../../http';
import TaskService from '../task-service';
import { Types } from 'mongoose';
import {
  Task,
  CreateTaskParams,
  GetAllTaskParams,
  DeleteTaskParams,
  GetTaskParams,
  UpdateTaskParams,
} from '../types';

import { serializeTaskAsJSON } from './task-serializer';
import TaskReader from '../internal/task-reader';

export class TaskController {
  createTask = applicationController(
    async (req: Request<CreateTaskParams>, res: Response) => {
      const task: Task = await TaskService.createTask({
        accountId: req.accountId,
        description: req.body.description,
        title: req.body.title,
      });
      const taskJSON = serializeTaskAsJSON(task);

      res.status(HttpStatusCodes.CREATED).send(taskJSON);
    },
  );

  deleteTask = applicationController(
    async (req: Request<DeleteTaskParams>, res: Response) => {
      await TaskService.deleteTask({
        accountId: req.accountId,
        taskId: req.params.id,
      });

      res.status(HttpStatusCodes.NO_CONTENT).send();
    },
  );

  getTask = applicationController(
    async (req: Request<GetTaskParams>, res: Response) => {
      const task = await TaskService.getTaskForAccount({
        accountId: req.accountId,
        taskId: req.params.id,
      });
      const taskJSON = serializeTaskAsJSON(task);

      res.status(HttpStatusCodes.OK).send(taskJSON);
    },
  );

  getTasks = applicationController(async (req: Request, res: Response) => {
    const page = +req.query.page;
    const size = +req.query.size;
    const params: GetAllTaskParams = {
      accountId: req.accountId,
      page,
      size,
    };

    const tasks = await TaskService.getTasksForAccount(params);
    const tasksJSON = tasks.map((task) => serializeTaskAsJSON(task));

    res.status(HttpStatusCodes.OK).send(tasksJSON);
  });

  updateTask = applicationController(
    async (req: Request<UpdateTaskParams>, res: Response) => {
      const updatedTask: Task = await TaskService.updateTask({
        accountId: req.accountId,
        taskId: req.params.id,
        description: req.body.description,
        title: req.body.title,
      });
      const taskJSON = serializeTaskAsJSON(updatedTask);

      res.status(HttpStatusCodes.OK).send(taskJSON);
    },
  );

  getSharedTasks = applicationController(
    async (req: Request, res: Response) => {
      const accountId = new Types.ObjectId(req.accountId);
      const sharedTasks = await TaskReader.getSharedTasks({ accountId });
      const sharedTasksJSON = sharedTasks.map(serializeTaskAsJSON);

      res.status(HttpStatusCodes.OK).send(sharedTasksJSON);
    },
  );

  shareTask = applicationController(
    async (req: Request<{ userIds: Types.ObjectId[] }>, res: Response) => {
      const taskId = new Types.ObjectId(req.params.id);
      const userIds = req.body.userIds.map((id) => new Types.ObjectId(id));

      const taskExists = await TaskService.taskExists(taskId);
      if (!taskExists) {
        res
          .status(HttpStatusCodes.NOT_FOUND)
          .send({ message: 'Task not found' });
        return;
      }

      await TaskService.shareTask(taskId, userIds);
      res
        .status(HttpStatusCodes.OK)
        .send({ message: 'Task shared successfully' });
    },
  );
}
