import { ApplicationServer } from '../../application';
import TaskRouter from './task-router';
import SharedTaskRouter from '../../shared-task/rest-api/shared-task-router';

export default class TaskServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const taskRouter = new TaskRouter();
    const sharedTaskRouter = SharedTaskRouter;

    server.use('/tasks', taskRouter.router);
    server.use('/', sharedTaskRouter);
  }
}
