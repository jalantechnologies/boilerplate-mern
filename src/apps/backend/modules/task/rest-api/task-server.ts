import { ApplicationServer } from '../../application';

import TaskRouter from './task-router';

export default class TaskServer extends ApplicationServer {
  routerFilePath: string;

  configure(): void {
    const { server } = this;
    const router = new TaskRouter();

    server.use('/tasks', router.router);

    this.routerFilePath = TaskRouter.currentFilePath();
  }
}
