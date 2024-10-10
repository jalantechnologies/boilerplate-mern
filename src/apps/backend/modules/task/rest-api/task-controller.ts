import { Request, Response } from '../../application';
import { Route } from '../../application/reflect-metadata';
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
  @Route('POST', '/tasks')
  async createTask(req: Request<CreateTaskParams>, res: Response) {
    const task: Task = await TaskService.createTask({
      accountId: req.accountId,
      description: req.body.description,
      title: req.body.title,
    });
    const taskJSON = serializeTaskAsJSON(task);

    res.status(HttpStatusCodes.CREATED).send(taskJSON);
  };

  // createTask(req: Request<CreateTaskParams>, res: Response) {
  //   return applicationController(async (req: Request<CreateTaskParams>, res: Response) => {
  //     const task: Task = await TaskService.createTask({
  //       accountId: req.accountId,
  //       description: req.body.description,
  //       title: req.body.title,
  //     });
  //     const taskJSON = serializeTaskAsJSON(task);

  //     res.status(HttpStatusCodes.CREATED).send(taskJSON);
  //   })(req, res);
  // }

  @Route('DELETE', '/tasks/:id')
  async deleteTask(req: Request<DeleteTaskParams>, res: Response) {
    await TaskService.deleteTask({
      accountId: req.accountId,
      taskId: req.params.id,
    });
    res.status(HttpStatusCodes.NO_CONTENT).send();
  }

  @Route('GET', '/tasks/:id')
  async getTask(req: Request<GetTaskParams>, res: Response) {
    const task: Task = await TaskService.getTaskForAccount({
      accountId: req.accountId,
      taskId: req.params.id,
    });
    const taskJSON = serializeTaskAsJSON(task);

    res.status(HttpStatusCodes.CREATED).send(taskJSON);
  }

  @Route('GET', '/tasks')
  async getTasks(req: Request<GetAllTaskParams>, res: Response) {
    const tasks: Task[] = await TaskService.getTasksForAccount({
      accountId: req.accountId,
    });

    const tasksJSON = tasks.map(serializeTaskAsJSON);

    res.status(HttpStatusCodes.CREATED).send(tasksJSON);
  }

  @Route('PATCH', '/tasks/:id')
  async updateTask(req: Request<UpdateTaskParams>, res: Response) {
    const updatedTask: Task = await TaskService.updateTask({
      accountId: req.accountId,
      taskId: req.params.id,
      description: req.body.description,
      title: req.body.title,
    });
    const taskJSON = serializeTaskAsJSON(updatedTask);

    res.status(HttpStatusCodes.CREATED).send(taskJSON);
  }
}
