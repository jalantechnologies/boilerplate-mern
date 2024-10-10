import { ApplicationServer } from '../../application';
import { listRoutes } from '../../application/list-routes';
import { TaskController } from './task-controller';

import TaskRouter from './task-router';

export default class TaskServer extends ApplicationServer {
  configure(): void {
    const { server } = this;
    const router = new TaskRouter();

    server.use('/tasks', router.router);

    // List routes and write to file
    listRoutes(TaskController);
  }
}
