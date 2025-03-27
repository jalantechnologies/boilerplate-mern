import {
  applicationController,
  HttpStatusCodes,
  Request,
  Response,
} from 'backend/modules/application';
import {
  Task,
  TaskService,
  CreateTaskParams,
  GetAllTaskParams,
  DeleteTaskParams,
  GetTaskParams,
  UpdateTaskParams,
} from 'backend/modules/task';
import { serializeTaskAsJSON } from 'backend/modules/task/rest-api/task-serializer';

export class TaskController {
  createTask = applicationController(
    async (req: Request<CreateTaskParams>, res: Response) => {
      const task: Task = await TaskService.createTask({
        accountId: req.accountId!,
        description: req.body.description,
        title: req.body.title,
      });
      const taskJSON = serializeTaskAsJSON(task);

      res.status(HttpStatusCodes.CREATED).send(taskJSON);
    }
  );

  deleteTask = applicationController(
    async (req: Request<DeleteTaskParams>, res: Response) => {
      await TaskService.deleteTask({
        accountId: req.accountId!,
        taskId: req.params.id,
      });

      res.status(HttpStatusCodes.NO_CONTENT).send();
    }
  );

  getTask = applicationController(
    async (req: Request<GetTaskParams>, res: Response) => {
      const task = await TaskService.getTaskForAccount({
        accountId: req.accountId!,
        taskId: req.params.id,
      });
      const taskJSON = serializeTaskAsJSON(task);

      res.status(HttpStatusCodes.OK).send(taskJSON);
    }
  );

  getTasks = applicationController(async (req: Request, res: Response) => {
    const page = req.query.page ? +req.query.page : 1; // Default to page 1 if not provided
    const size = req.query.size ? +req.query.size : 10; // Default to size 10 if not provided
    const params: GetAllTaskParams = {
      accountId: req.accountId!,
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
        accountId: req.accountId!,
        taskId: req.params.id,
        description: req.body.description,
        title: req.body.title,
      });
      const taskJSON = serializeTaskAsJSON(updatedTask);

      res.status(HttpStatusCodes.OK).send(taskJSON);
    }
  );
}
